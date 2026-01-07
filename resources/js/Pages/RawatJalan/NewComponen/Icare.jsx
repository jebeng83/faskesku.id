import React, { useState } from "react";

export default function Icare({ noPeserta = "", kodeDokter = "", noRawat = "", label = "i-Care BPJS", buttonClassName = "inline-flex items-center px-2 py-0.5 rounded-md text-[11px] bg-black text-white border border-[oklch(29.1%_0.149_302.717)]" }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [iframeUrl, setIframeUrl] = useState("");
  const [status, setStatus] = useState(null);
  const [meta, setMeta] = useState(null);

  const showIcare = async () => {
    const noka = (noPeserta || "").toString().trim();
    if (!noka) {
      if (typeof window !== "undefined") {
        alert("Pasien ini tidak memiliki nomor BPJS yang valid");
      }
      return;
    }
    setOpen(true);
    setLoading(true);
    setError("");
    setIframeUrl("");
    const kd = (kodeDokter || "").toString().trim() || "102";
    try {
      let res = await fetch(`/api/icare/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
        credentials: "omit",
        body: JSON.stringify({ param: noka, kodedokter: kd, no_rawat: noRawat }),
      });
      if (res.status === 419 || res.status === 401 || (res.status >= 500)) {
        try {
                  res = await fetch(`/api/icare/proxy/test/${encodeURIComponent('api/pcare/validate')}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
                    credentials: "omit",
                    body: JSON.stringify({ param: noka, kodedokter: kd, no_rawat: noRawat }),
                  });
        } catch (_) {}
      }
      const text = await res.text();
      let json; try { json = text ? JSON.parse(text) : {}; } catch { json = {}; }
      const data = json?.data || {};
      const url = data?.response?.url || "";
      setStatus(json?.status ?? null);
      setMeta(data?.metaData ?? null);
      if (res.ok && url) {
        setIframeUrl(url);
      } else {
        setError((data?.metaData?.message) || "Gagal mendapatkan riwayat pelayanan.");
      }
    } catch (e) {
      setError(String(e?.message || e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inline-block">
      <button type="button" onClick={showIcare} className={buttonClassName}>
        {label}
      </button>
      {open && (
        <div className="fixed inset-0 z-[10040] flex items-start justify-center overflow-y-auto">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)}></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full xl:max-w-5xl 2xl:max-w-6xl mx-2 sm:mx-4 my-6 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-emerald-600 to-teal-600">
              <h3 className="text-base md:text-lg font-semibold text-white">Riwayat Pelayanan BPJS</h3>
              <button onClick={() => setOpen(false)} className="text-white/90 hover:text-white rounded-md p-2 hover:bg-white/10">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-0">
              {loading ? (
                <div className="text-center py-10">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent bg-emerald-600"></div>
                  <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">Memuat riwayat pelayanan...</p>
                </div>
              ) : error ? (
                <div className="m-3">
                  <div className="rounded-md border border-red-200 bg-red-50 text-red-700 text-xs px-3 py-2">{error}</div>
                  <div className="mt-2">
                    <button type="button" onClick={() => window.open('https://vclaim.bpjs-kesehatan.go.id/icare/', '_blank')} className="inline-flex items-center rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-1">Buka i-Care</button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="alert-info m-3">
                    <div className="rounded-md border border-sky-200 bg-sky-50 text-sky-700 text-xs px-3 py-2">Silakan login dengan akun BPJS Anda jika diminta. Riwayat akan ditampilkan setelah login berhasil.</div>
                  </div>
                  <div className="mx-3 mb-3">
                    <div style={{ height: 600, width: "100%" }} className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <iframe title="icare" allowFullScreen frameBorder="0" style={{ width: "100%", height: "100%", border: "none" }} src={iframeUrl || undefined}></iframe>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/80 backdrop-blur">
              <div className="text-xs text-gray-500 dark:text-gray-400">Status: {status ?? '-'}{meta?.code ? `, Kode: ${meta.code}` : ''}{meta?.message ? `, Pesan: ${meta.message}` : ''}</div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 rounded-md text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300">Tutup</button>
                {iframeUrl ? (
                  <button type="button" onClick={() => window.open(iframeUrl, '_blank')} className="inline-flex items-center rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-1">Buka di Tab Baru</button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
