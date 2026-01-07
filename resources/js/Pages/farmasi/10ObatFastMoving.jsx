import React, { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import { route } from "ziggy-js";
import SidebarFarmasi from "@/Layouts/SidebarFarmasi";

export default function ObatFastMoving() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [columns] = useState([]);
  const [showDescribe, setShowDescribe] = useState(false);
  const [period, setPeriod] = useState("week");

  const loadData = async (p) => {
    setLoading(true);
    setError("");
    try {
      const sel = p || period;
      let url = "";
      try {
        url = route("farmasi.fast-moving.data", { period: sel }, false);
      } catch {
        url = `http://127.0.0.1:8000/farmasi/obat-fast-moving/data?period=${encodeURIComponent(sel)}`;
      }
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      const json = await res.json();
      setItems(Array.isArray(json?.data) ? json.data : []);
    } catch (e) {
      setError(e?.message || "Gagal memuat data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData("week");
  }, []);

  return (
    <SidebarFarmasi title="10 Obat Fast Moving">
      <Head title="10 Obat Fast Moving" />
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">10 Obat Fast Moving</h1>
          <div className="flex items-center gap-2">
            <select
              value={period}
              onChange={(e) => {
                const v = e.target.value;
                setPeriod(v);
                loadData(v);
              }}
              className="rounded-md border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900"
            >
              <option value="week">Minggu</option>
              <option value="month">Bulan</option>
              <option value="3m">3 Bulan</option>
              <option value="6m">6 Bulan</option>
              <option value="year">Tahun</option>
            </select>
            <button onClick={() => loadData()} disabled={loading} className="rounded-md bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 text-sm">
              {loading ? "Memuat..." : "Muat Ulang"}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 border border-red-200 text-red-700 px-3 py-2 text-sm">{error}</div>
        )}

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-gray-800">
            <h2 className="font-semibold text-gray-900 dark:text-white">Top 10 Barang</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-left">#</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-left">Kode Barang</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-left">Nama Barang</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-right">Jumlah</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {items.map((it, idx) => (
                  <tr key={it.kode_brng + idx}>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{idx + 1}</td>
                    <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-white">{it.kode_brng || "-"}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{it.nama_brng || "-"}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-900 dark:text-white">{it.jumlah ?? 0}</td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">Tidak ada data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showDescribe && (
          <div className="mt-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 dark:text-white">Struktur Tabel resep_dokter</h2>
              <button onClick={() => setShowDescribe(false)} className="rounded-md border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm text-gray-700 dark:text-gray-300">Tutup</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-left">Field</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-left">Type</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-left">Null</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-left">Key</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-left">Default</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-left">Extra</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {columns.map((c, idx) => (
                    <tr key={(c.Field || "col") + idx}>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{c.Field || "-"}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{c.Type || "-"}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{c.Null || "-"}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{c.Key || "-"}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{c.Default ?? "-"}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{c.Extra || "-"}</td>
                    </tr>
                  ))}
                  {columns.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">Tidak ada data struktur</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </SidebarFarmasi>
  );
}
