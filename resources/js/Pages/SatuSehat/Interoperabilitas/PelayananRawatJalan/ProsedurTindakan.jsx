import React, { useEffect, useMemo, useState } from "react";
import LayoutUtama from "@/Pages/LayoutUtama";
import { BridingMenu } from "@/Layouts/SidebarBriding";
import ResponsiveTable from "@/Components/ResponsiveTable";
import axios from "axios";
import Toaster from "@/Components/ui/Toaster";

function dateToYmd(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function ProsedurTindakan() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [kdDokter, setKdDokter] = useState("");
  const [kdPoli, setKdPoli] = useState("");
  const [dokters, setDokters] = useState([]);
  const [polikliniks, setPolikliniks] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sendingAll, setSendingAll] = useState(false);
  const [sendingByKey, setSendingByKey] = useState({});

  const [toasts, setToasts] = useState([]);
  const addToast = (type = "info", title = "", message = "", duration = 4000) => {
    const id = `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);
  };
  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const formatError = (err, fallback = "Terjadi kesalahan") => {
    const status = err?.response?.status;
    const data = err?.response?.data || {};
    let detail = data?.detail || data?.message || err?.message || fallback;
    const parts = [];
    if (data?.code) parts.push(`Kode ${data.code}`);
    if (data?.no_rawat) parts.push(`No. Rawat ${data.no_rawat}`);
    if (status) parts.push(`Status ${status}`);
    if (parts.length) detail = `${detail} (${parts.join(", ")})`;
    return detail;
  };

  useEffect(() => {
    axios
      .get("/api/dokter", { params: { per_page: 200 } })
      .then((r) => {
        const raw = r?.data?.data;
        const list = Array.isArray(raw) ? raw : Array.isArray(raw?.data) ? raw.data : [];
        setDokters(list);
      })
      .catch(() => {});
    axios
      .get("/pcare/api/rs/poliklinik", { params: { q: "" } })
      .then((r) => {
        const list = Array.isArray(r?.data?.data) ? r.data.data : [];
        setPolikliniks(list);
      })
      .catch(() => {});
  }, []);

  const dateRange = useMemo(() => {
    if (!startDate && !endDate) return [];
    const s = startDate ? new Date(startDate) : new Date();
    const e = endDate ? new Date(endDate) : s;
    const arr = [];
    const cur = new Date(s.getTime());
    while (cur <= e) {
      arr.push(dateToYmd(cur));
      cur.setDate(cur.getDate() + 1);
    }
    return arr;
  }, [startDate, endDate]);

  function sortRows(list) {
    const toKey = (r) => `${r.tgl_registrasi || ""}T${String(r.jam_registrasi || "").slice(0, 8)}|${String(r.no_rawat || "")}`;
    return [...list].sort((a, b) => toKey(a).localeCompare(toKey(b)));
  }

  async function loadData() {
    setLoading(true);
    try {
      const all = [];
      const dates = dateRange.length ? dateRange : [dateToYmd(new Date())];
      for (const d of dates) {
        const res = await axios.get("/registration/get-registrations", {
          params: {
            date: d,
            kd_poli: kdPoli || undefined,
            kd_dokter: kdDokter || undefined,
            per_page: 100,
          },
        });
        const paged = res?.data?.data;
        const items = Array.isArray(paged?.data) ? paged.data : [];
        items.forEach((reg) => {
          all.push({
            key: `${reg.no_rawat}`,
            no: 0,
            no_rawat: reg.no_rawat,
            tgl_registrasi: reg.tgl_registrasi,
            jam_registrasi: reg.jam_reg,
            pasien_nama: reg?.pasien?.nm_pasien || "",
            dokter_nama: reg?.dokter?.nm_dokter || "",
            poliklinik_nama: reg?.poliklinik?.nm_poli || "",
            last_action: "",
            last_message: "",
            sent_count: "",
          });
        });
      }
      all.forEach((it, idx) => {
        it.no = idx + 1;
      });
      setRows(all);
    } catch {
    } finally {
      setLoading(false);
    }
  }

  async function sendOne(row) {
    const key = row?.key;
    const noRawat = String(row?.no_rawat || "");
    if (!key || !noRawat) return;

    setSendingByKey((prev) => ({ ...prev, [key]: true }));
    try {
      const res = await axios.post(`/api/satusehat/rajal/procedure/by-rawat/${encodeURIComponent(noRawat)}`, {
        status: "Ralan",
      });
      const ok = !!res?.data?.ok;
      const results = Array.isArray(res?.data?.results) ? res.data.results : [];
      const msg = ok ? `Terkirim: ${results.length}` : String(res?.data?.message || "Gagal");
      setRows((prev) =>
        prev.map((r) =>
          r.key === key
            ? {
                ...r,
                last_action: ok ? "OK" : "FAILED",
                last_message: msg,
                sent_count: String(results.length || ""),
              }
            : r
        )
      );
      if (ok) {
        addToast("success", "Prosedur terkirim", `No. Rawat ${noRawat} (${results.length})`);
      } else {
        addToast("error", "Prosedur gagal", msg);
      }
    } catch (e) {
      const msg = formatError(e);
      setRows((prev) => prev.map((r) => (r.key === key ? { ...r, last_action: "FAILED", last_message: msg } : r)));
      addToast("error", "Prosedur gagal", msg);
    } finally {
      setSendingByKey((prev) => ({ ...prev, [key]: false }));
    }
  }

  async function sendAll() {
    if (rows.length === 0) return;
    setSendingAll(true);
    try {
      const ordered = sortRows(rows);
      for (const r of ordered) {
        const key = r.key;
        if (!key) continue;
        await sendOne(r);
      }
    } finally {
      setSendingAll(false);
    }
  }

  const columns = [
    { key: "no", header: "No" },
    { key: "tgl_registrasi", header: "Tanggal" },
    { key: "jam_registrasi", header: "Jam" },
    { key: "no_rawat", header: "No. Rawat" },
    { key: "pasien_nama", header: "Nama Pasien" },
    { key: "dokter_nama", header: "Dokter" },
    { key: "poliklinik_nama", header: "Poliklinik" },
    { key: "sent_count", header: "Terkirim" },
    { key: "last_action", header: "Status" },
    { key: "last_message", header: "Pesan" },
    {
      key: "aksi",
      header: "Aksi",
      render: (item) => (
        <button
          type="button"
          onClick={() => sendOne(item)}
          disabled={loading || sendingAll || !!sendingByKey[item.key]}
          className="px-3 py-1.5 rounded-md bg-blue-600 text-white disabled:opacity-50"
        >
          {sendingByKey[item.key] ? "Mengirim..." : "Kirim"}
        </button>
      ),
      hideOnMobile: true,
    },
  ];

  return (
    <LayoutUtama title="Interoperabilitas" left={<BridingMenu />}>
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium">Tanggal dari</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Tanggal sampai</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Dokter</label>
              <select
                value={kdDokter}
                onChange={(e) => setKdDokter(e.target.value)}
                className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900"
              >
                <option value="">Semua</option>
                {dokters.map((d) => (
                  <option key={d.kd_dokter} value={d.kd_dokter}>
                    {d.nm_dokter}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Poli</label>
              <select
                value={kdPoli}
                onChange={(e) => setKdPoli(e.target.value)}
                className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900"
              >
                <option value="">Semua</option>
                {polikliniks.map((p) => (
                  <option key={p.kd_poli} value={p.kd_poli}>
                    {p.nm_poli}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={loadData}
              disabled={loading || sendingAll}
              className="px-4 py-2 rounded-md bg-blue-600 text-white disabled:opacity-50"
            >
              {loading ? "Memuat..." : "Muat Data"}
            </button>
            <button
              onClick={sendAll}
              disabled={loading || sendingAll || rows.length === 0}
              className="px-4 py-2 rounded-md bg-green-600 text-white disabled:opacity-50"
            >
              {sendingAll ? "Mengirim..." : "Kirim Semua"}
            </button>
            <span className="text-sm">Total: {rows.length}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <ResponsiveTable columns={columns} data={rows} keyField="key" className="min-w-full" />
        </div>
      </div>
      <Toaster toasts={toasts} onRemove={removeToast} />
    </LayoutUtama>
  );
}
