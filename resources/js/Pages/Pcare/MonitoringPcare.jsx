import React, { useEffect, useMemo, useState } from "react";
import SidebarBriding from "@/Layouts/SidebarBriding";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export default function MonitoringPcare() {
  const [summary, setSummary] = useState({ success: 0, failed: 0 });
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [selected, setSelected] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [resendingNo, setResendingNo] = useState("");
  const [debugOpen, setDebugOpen] = useState(false);
  const [debugInfo, setDebugInfo] = useState({ queued: null, raw: null, status: "", noKunjungan: "", metaCode: "", metaMessage: "" });

  const load = async () => {
    setLoading(true);
    try {
      const qs = [];
      if (start) qs.push(`start=${encodeURIComponent(start)}`);
      if (end) qs.push(`end=${encodeURIComponent(end)}`);
      const s = await fetch(`/pcare/api/pendaftaran/summary${qs.length ? `?${qs.join('&')}` : ''}`, { headers: { Accept: "application/json" }, credentials: 'include' });
      const sj = await s.json();
      setSummary({ success: sj.success || 0, failed: sj.failed || 0 });
      const qa = [];
      if (statusFilter) qa.push(`status=${encodeURIComponent(statusFilter)}`);
      if (start) qa.push(`start=${encodeURIComponent(start)}`);
      if (end) qa.push(`end=${encodeURIComponent(end)}`);
      const a = await fetch(`/pcare/api/pendaftaran/list${qa.length ? `?${qa.join('&')}` : ""}`, { headers: { Accept: "application/json" }, credentials: 'include' });
      const aj = await a.json();
      setAttempts(Array.isArray(aj?.data) ? aj.data : []);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [statusFilter, start, end]);

  const toggleSel = (no) => {
    setSelected((prev) => (prev.includes(no) ? prev.filter((x) => x !== no) : [...prev, no]));
  };

  const csrfToken = typeof document !== 'undefined' ? (document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '') : '';

  const resend = async (no) => {
    setResendingNo(no);
    try {
      const r = await fetch(`/pcare/api/resend/${encodeURIComponent(no)}`, { method: "POST", headers: { "X-Requested-With": "XMLHttpRequest", ...(csrfToken ? { 'X-CSRF-TOKEN': csrfToken } : {}) }, credentials: 'include' });
      const j = await r.json().catch(() => ({}));
      setDebugInfo((prev) => ({ ...prev, queued: !!j?.queued }));
      setDebugOpen(true);
      for (let i = 0; i < 10; i++) {
        await new Promise((res) => setTimeout(res, 1000));
        const m = await fetch(`/pcare/api/monitoring/raw/${encodeURIComponent(no)}`, { headers: { Accept: "application/json" }, credentials: 'include' });
        const mj = await m.json().catch(() => ({}));
        const data = mj?.data || {};
        let raw = null;
        try { raw = data?.raw ? JSON.parse(data.raw) : null; } catch { raw = data?.raw || null; }
        const status = String(data?.status || "");
        let nk = raw && typeof raw === 'object' ? (raw.noKunjungan || (raw.response?.noKunjungan) || "") : "";
        if (!nk && data?.noKunjungan) nk = String(data.noKunjungan);
        const metaCode = raw && typeof raw === 'object' && raw.metaData ? String(raw.metaData.code || "") : "";
        const metaMessage = raw && typeof raw === 'object' && raw.metaData ? String(raw.metaData.message || "") : "";
        setDebugInfo({ queued: !!j?.queued, raw, status, noKunjungan: String(nk || ""), metaCode, metaMessage });
        if (status === 'sent' || status === 'Terkirim' || status === 'failed' || status === 'Gagal') break;
      }
    } catch {}
    setResendingNo("");
    load();
  };

  const massSend = async () => {
    const body = selected.length ? { no_rawat: selected } : {};
    await fetch(`/pcare/api/mass-send`, { method: "POST", headers: { "Content-Type": "application/json", "X-Requested-With": "XMLHttpRequest", ...(csrfToken ? { 'X-CSRF-TOKEN': csrfToken } : {}) }, credentials: 'include', body: JSON.stringify(body) });
    setSelected([]);
    load();
  };

  const rows = useMemo(() => attempts, [attempts]);

  const fmtDate = (s) => {
    if (!s) return '';
    const parts = String(s).split('-');
    if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
    return s;
  };

  const statusClass = (st) => {
    if (st === 'Terkirim') return 'inline-flex px-2 py-0.5 rounded text-xs bg-green-100 text-green-700';
    if (st === 'Gagal') return 'inline-flex px-2 py-0.5 rounded text-xs bg-red-100 text-red-700';
    return 'inline-flex px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-none mx-auto px-6 py-6">
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
          <div className="relative px-4 py-3 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-600/50 flex items-center justify-between">
            <h2 className="text-base font-semibold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Monitoring Pengiriman PCare</h2>
            <div className="flex items-center gap-2">
              <input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="h-8 rounded-lg border border-gray-300/60 bg-white/80 dark:bg-gray-800/80 text-sm px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
              <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="h-8 rounded-lg border border-gray-300/60 bg-white/80 dark:bg-gray-800/80 text-sm px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-8 rounded-lg border border-gray-300/60 bg-white/80 dark:bg-gray-800/80 text-sm px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/30">
                <option value="">Semua</option>
                <option value="Terkirim">Terkirim</option>
                <option value="Gagal">Gagal</option>
              </select>
              <button onClick={load} className="h-8 rounded-lg border border-gray-300/60 bg-white/80 dark:bg-gray-800/80 px-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Refresh</button>
              <button onClick={massSend} className="h-8 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 text-sm hover:from-indigo-500 hover:to-purple-500 transition-colors">Kirim Massal</button>
            </div>
          </div>
          <div className="relative p-6">
            <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div variants={itemVariants} className="rounded-xl border border-white/30 dark:border-gray-700/50 bg-white/70 dark:bg-gray-800/70 backdrop-blur p-4 shadow-sm">
                <div className="text-xs text-slate-600 dark:text-slate-400">Berhasil</div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{summary.success}</div>
              </motion.div>
              <motion.div variants={itemVariants} className="rounded-xl border border-white/30 dark:border-gray-700/50 bg-white/70 dark:bg-gray-800/70 backdrop-blur p-4 shadow-sm">
                <div className="text-xs text-slate-600 dark:text-slate-400">Gagal</div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{summary.failed}</div>
              </motion.div>
            </div>
            <div className="overflow-x-auto overflow-y-auto max-h-[60vh] rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/60 dark:bg-gray-800/60 backdrop-blur">
              <table className="relative w-full text-sm">
                <thead>
                  <tr>
                    <th className="sticky top-0 z-10 px-3 py-2 text-left font-medium bg-gradient-to-r from-gray-50/80 via-gray-100/80 to-gray-50/80 dark:from-gray-800/80 dark:via-gray-800/80 dark:to-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">Pilih</th>
                    <th className="sticky top-0 z-10 px-3 py-2 text-left font-medium bg-gradient-to-r from-gray-50/80 via-gray-100/80 to-gray-50/80 dark:from-gray-800/80 dark:via-gray-800/80 dark:to-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">Tanggal</th>
                    <th className="sticky top-0 z-10 px-3 py-2 text-left font-medium bg-gradient-to-r from-gray-50/80 via-gray-100/80 to-gray-50/80 dark:from-gray-800/80 dark:via-gray-800/80 dark:to-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">No Rawat</th>
                    <th className="sticky top-0 z-10 px-3 py-2 text-left font-medium bg-gradient-to-r from-gray-50/80 via-gray-100/80 to-gray-50/80 dark:from-gray-800/80 dark:via-gray-800/80 dark:to-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">Nama (No RM)</th>
                    <th className="sticky top-0 z-10 px-3 py-2 text-left font-medium bg-gradient-to-r from-gray-50/80 via-gray-100/80 to-gray-50/80 dark:from-gray-800/80 dark:via-gray-800/80 dark:to-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">Poli</th>
                    <th className="sticky top-0 z-10 px-3 py-2 text-left font-medium bg-gradient-to-r from-gray-50/80 via-gray-100/80 to-gray-50/80 dark:from-gray-800/80 dark:via-gray-800/80 dark:to-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">Nama Poli</th>
                    <th className="sticky top-0 z-10 px-3 py-2 text-left font-medium bg-gradient-to-r from-gray-50/80 via-gray-100/80 to-gray-50/80 dark:from-gray-800/80 dark:via-gray-800/80 dark:to-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">No Urut</th>
                    <th className="sticky top-0 z-10 px-3 py-2 text-left font-medium bg-gradient-to-r from-gray-50/80 via-gray-100/80 to-gray-50/80 dark:from-gray-800/80 dark:via-gray-800/80 dark:to-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">Status</th>
                    <th className="sticky top-0 z-10 px-3 py-2 text-left font-medium bg-gradient-to-r from-gray-50/80 via-gray-100/80 to-gray-50/80 dark:from-gray-800/80 dark:via-gray-800/80 dark:to-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">Aksi</th>
                  </tr>
                </thead>
                <motion.tbody variants={containerVariants} initial="hidden" animate="show">
                  {rows.map((r) => (
                    <motion.tr key={r.no_rawat} variants={itemVariants} className="border-t border-gray-100/50 dark:border-gray-700/30 odd:bg-white/40 even:bg-white/60 dark:odd:bg-gray-800/40 dark:even:bg-gray-800/60 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-gray-700/50 dark:hover:to-gray-800/50 transition-colors">
                      <td className="p-2"><input type="checkbox" checked={selected.includes(r.no_rawat)} onChange={() => toggleSel(r.no_rawat)} /></td>
                      <td className="p-2">{fmtDate(r.tglDaftar)}</td>
                      <td className="p-2">{r.no_rawat || ''}</td>
                      <td className="p-2">{(r.nm_pasien || '') + (r.no_rkm_medis ? ` (${r.no_rkm_medis})` : '')}</td>
                      <td className="p-2">{r.kdPoli || ''}</td>
                      <td className="p-2">{r.nmPoli || ''}</td>
                      <td className="p-2">{r.noUrut || ''}</td>
                      <td className="p-2"><span className={statusClass(r.status)}>{r.status || ''}</span></td>
                      <td className="p-2">
                        <button onClick={() => resend(r.no_rawat)} disabled={r.status === 'Terkirim' || resendingNo === r.no_rawat} className="inline-flex items-center gap-2 border rounded px-2 py-1 disabled:opacity-50">
                          {resendingNo === r.no_rawat ? (
                            <span className="inline-block w-3 h-3 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
                          ) : null}
                          <span>Kirim Ulang</span>
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                  {rows.length === 0 && (
                    <tr><td className="p-4 text-center" colSpan={9}>{loading ? 'Memuat...' : 'Tidak ada data'}</td></tr>
                  )}
                </motion.tbody>
              </table>
            </div>
            <div className="mt-4">
              {debugOpen && (
                <div className="rounded-xl border border-white/30 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-semibold">Debug Resend</div>
                    <button onClick={() => setDebugOpen(false)} className="text-xs rounded px-2 py-1 border">Tutup</button>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><div className="text-xs text-slate-600 dark:text-slate-400">Queued</div><div className="font-mono">{String(!!debugInfo.queued)}</div></div>
                    <div><div className="text-xs text-slate-600 dark:text-slate-400">Status</div><div className="font-mono">{debugInfo.status || ''}</div></div>
                    <div><div className="text-xs text-slate-600 dark:text-slate-400">No Kunjungan</div><div className="font-mono">{debugInfo.noKunjungan || ''}</div></div>
                    <div><div className="text-xs text-slate-600 dark:text-slate-400">metaData.code</div><div className="font-mono">{debugInfo.metaCode || ''}</div></div>
                    <div><div className="text-xs text-slate-600 dark:text-slate-400">metaData.message</div><div className="font-mono break-all">{debugInfo.metaMessage || ''}</div></div>
                  </div>
                  <div className="mt-3">
                    <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">Raw Response</div>
                    <pre className="text-xs leading-relaxed p-3 rounded bg-slate-50/70 dark:bg-gray-900/40 border border-slate-200/50 dark:border-gray-700/50 overflow-auto max-h-64">{debugInfo.raw ? JSON.stringify(debugInfo.raw, null, 2) : 'Tidak ada data'}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

MonitoringPcare.layout = (page) => (
  <SidebarBriding title="Briding Pcare" wide={true}>{page}</SidebarBriding>
);
