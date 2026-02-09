import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Head } from "@inertiajs/react";
import LayoutUtama from "@/Pages/LayoutUtama";
import SidebarLaporanMenu from "@/Components/SidebarLaporanMenu";
import { Calendar, Filter, Loader2, Search, X, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown, Printer } from "lucide-react";

function toDateInputValue(date) {
  const d = new Date(date);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function formatDateDMY(s) {
  if (!s) return "-";
  const parts = s.split("-");
  if (parts.length !== 3) return s;
  const [y, m, d] = parts;
  return `${d}-${m}-${y}`;
}

export default function KunjunganRalan({ listPoli = [], listDokter = [], listPenjab = [] }) {
  const today = useMemo(() => new Date(), []);
  const defaultStart = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d;
  }, []);

  const [startDate, setStartDate] = useState(toDateInputValue(defaultStart));
  const [endDate, setEndDate] = useState(toDateInputValue(today));
  const [poli, setPoli] = useState("");
  const [dokter, setDokter] = useState("");
  const [penjab, setPenjab] = useState("");
  const [status, setStatus] = useState("");
  const [excludeBatal, setExcludeBatal] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [kabupaten, setKabupaten] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kelurahan, setKelurahan] = useState("");

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(50);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    from: 0,
    to: 0,
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [sortBy, setSortBy] = useState("");
  const [sortDir, setSortDir] = useState("asc");

  const onSort = (key) => {
    setPage(1);
    setSortDir((prev) => (sortBy === key ? (prev === "asc" ? "desc" : "asc") : "asc"));
    setSortBy(key);
  };

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      params.set("page", page);
      params.set("per_page", perPage);
      params.set("start_date", startDate);
      params.set("end_date", endDate);
      if (sortBy) params.set("sort_by", sortBy);
      if (sortDir) params.set("sort_dir", sortDir);
      if (poli) params.set("poli", poli);
      if (dokter) params.set("dokter", dokter);
      if (penjab) params.set("penjab", penjab);
      if (status) params.set("status", status);
      if (excludeBatal) params.set("exclude_batal", "true");
      if (keyword) params.set("q", keyword);
      if (kabupaten) params.set("kabupaten", kabupaten);
      if (kecamatan) params.set("kecamatan", kecamatan);
      if (kelurahan) params.set("kelurahan", kelurahan);

      const res = await fetch(`/laporan/ralan/kunjungan/data?${params.toString()}`, {
        headers: { Accept: "application/json" },
      });
      const json = await res.json();

      if (json.data) {
        setData(json.data);
        setPagination({
          current_page: json.current_page,
          last_page: json.last_page,
          total: json.total,
          from: json.from,
          to: json.to,
        });
      } else {
        setData([]);
        setPagination({ current_page: 1, last_page: 1, total: 0, from: 0, to: 0 });
      }
    } catch (e) {
      setError(e?.message || "Gagal memuat data");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when page changes
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, sortDir]);

  const handleApplyFilters = () => {
    if (page === 1) {
      fetchData();
    } else {
      setPage(1);
    }
  };

  const handlePrint = () => {
    const params = new URLSearchParams();
    params.set("start_date", startDate);
    params.set("end_date", endDate);
    if (sortBy) params.set("sort_by", sortBy);
    if (sortDir) params.set("sort_dir", sortDir);
    if (poli) params.set("poli", poli);
    if (dokter) params.set("dokter", dokter);
    if (penjab) params.set("penjab", penjab);
    if (status) params.set("status", status);
    if (excludeBatal) params.set("exclude_batal", "true");
    if (keyword) params.set("q", keyword);
    if (kabupaten) params.set("kabupaten", kabupaten);
    if (kecamatan) params.set("kecamatan", kecamatan);
    if (kelurahan) params.set("kelurahan", kelurahan);
    const url = `/laporan/ralan/kunjungan/print?${params.toString()}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleResetFilters = () => {
    setStartDate(toDateInputValue(defaultStart));
    setEndDate(toDateInputValue(today));
    setPoli("");
    setDokter("");
    setPenjab("");
    setStatus("");
    setExcludeBatal(true);
    setKeyword("");
    setKabupaten("");
    setKecamatan("");
    setKelurahan("");
    if (page === 1) fetchData();
    else setPage(1);
  };

  return (
    <LayoutUtama title="Laporan" left={<SidebarLaporanMenu title="Laporan" />}> 
      <Head title="Kunjungan Ralan" />

      <div className="px-2 sm:px-4 lg:px-6">
        <motion.div
          className="relative px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm rounded-lg mb-4"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Kunjungan Ralan</h1>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">Daftar kunjungan rawat jalan dengan filter periode dan kriteria.</p>
        </motion.div>

        <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm ring-1 ring-gray-200/70 dark:ring-gray-700/60 shadow-sm mb-6">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
          <div className="p-4 space-y-4">
            {/* Filter Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Date Range */}
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Tanggal Registrasi Mulai
                </label>
                <div className="relative mt-1">
                  <span className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <Calendar className="h-4 w-4" />
                  </span>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none pl-9 pr-3 py-2 text-sm text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Tanggal Registrasi Selesai
                </label>
                <div className="relative mt-1">
                  <span className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <Calendar className="h-4 w-4" />
                  </span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none pl-9 pr-3 py-2 text-sm text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Main Filters */}
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Poliklinik
                </label>
                <div className="relative mt-1">
                  <span className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <Filter className="h-4 w-4" />
                  </span>
                  <select
                    value={poli}
                    onChange={(e) => setPoli(e.target.value)}
                    className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none pl-9 pr-3 py-2 text-sm text-gray-900 dark:text-white appearance-none"
                  >
                    <option value="">Semua Poli</option>
                    {listPoli.map((item) => (
                      <option key={item.kd_poli} value={item.kd_poli}>
                        {item.nm_poli}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Dokter
                </label>
                <div className="relative mt-1">
                  <span className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <Filter className="h-4 w-4" />
                  </span>
                  <select
                    value={dokter}
                    onChange={(e) => setDokter(e.target.value)}
                    className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none pl-9 pr-3 py-2 text-sm text-gray-900 dark:text-white appearance-none"
                  >
                    <option value="">Semua Dokter</option>
                    {listDokter.map((item) => (
                      <option key={item.kd_dokter} value={item.kd_dokter}>
                        {item.nm_dokter}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Secondary Filters */}
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Cara Bayar
                </label>
                <div className="relative mt-1">
                  <span className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <Filter className="h-4 w-4" />
                  </span>
                  <select
                    value={penjab}
                    onChange={(e) => setPenjab(e.target.value)}
                    className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none pl-9 pr-3 py-2 text-sm text-gray-900 dark:text-white appearance-none"
                  >
                    <option value="">Semua Cara Bayar</option>
                    {listPenjab.map((item) => (
                      <option key={item.kd_pj} value={item.kd_pj}>
                        {item.png_jawab}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Status Kunjungan
                </label>
                <div className="mt-1">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none px-3 py-2 text-sm text-gray-900 dark:text-white"
                  >
                    <option value="">Semua</option>
                    <option value="Baru">Baru</option>
                    <option value="Lama">Lama</option>
                  </select>
                </div>
              </div>
              
              {/* Location Filters */}
              <div className="md:col-span-2">
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Filter Wilayah
                </label>
                <div className="mt-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={kabupaten}
                    onChange={(e) => setKabupaten(e.target.value)}
                    placeholder="Kabupaten"
                    className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none px-3 py-2 text-sm text-gray-900 dark:text-white"
                  />
                  <input
                    type="text"
                    value={kecamatan}
                    onChange={(e) => setKecamatan(e.target.value)}
                    placeholder="Kecamatan"
                    className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none px-3 py-2 text-sm text-gray-900 dark:text-white"
                  />
                  <input
                    type="text"
                    value={kelurahan}
                    onChange={(e) => setKelurahan(e.target.value)}
                    placeholder="Kelurahan"
                    className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none px-3 py-2 text-sm text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Keyword & Exclude Batal */}
              <div className="md:col-span-2">
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Keyword
                </label>
                <div className="relative mt-1">
                  <span className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <Search className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Poli, dokter, no RM, nama, alamat"
                    className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none pl-9 pr-3 py-2 text-sm text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="flex items-end">
                <label className="inline-flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300 mb-2.5">
                  <input
                    type="checkbox"
                    checked={excludeBatal}
                    onChange={(e) => setExcludeBatal(e.target.checked)}
                    className="rounded border-gray-300 dark:border-gray-600 text-emerald-600 focus:ring-emerald-500"
                  />
                  Kecualikan status “Batal”
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 rounded-lg bg-white/90 dark:bg-gray-800/90 ring-1 ring-gray-300/70 dark:ring-gray-700/60 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50/90 dark:hover:bg-gray-700/90 transition-colors"
              >
                <X className="h-4 w-4" />
                Reset
              </button>
              <button
                type="button"
                onClick={handlePrint}
                aria-label="Cetak Laporan"
                className="inline-flex items-center gap-2 rounded-lg bg-white/90 dark:bg-gray-800/90 ring-1 ring-gray-300/70 dark:ring-gray-700/60 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50/90 dark:hover:bg-gray-700/90 transition-colors"
              >
                <Printer className="h-4 w-4" />
                Print
              </button>
              <button
                type="button"
                onClick={handleApplyFilters}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-sm font-medium transition-colors shadow-sm"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                Terapkan Filter
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 dark:text-white">Data Kunjungan Ralan</h2>
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-sm text-gray-500">
                Total: <span className="font-semibold text-gray-900 dark:text-white">{pagination.total}</span> data
              </div>
              <div>
                <select
                  value={perPage}
                  onChange={(e) => {
                    setPerPage(parseInt(e.target.value, 10) || 50);
                    setPage(1);
                  }}
                  className="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-2 py-1 text-xs text-gray-700 dark:text-gray-200"
                >
                  <option value={25}>25 / halaman</option>
                  <option value={50}>50 / halaman</option>
                  <option value={100}>100 / halaman</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-left whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onSort("tgl_registrasi")}
                      className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                      <span>Tgl Reg</span>
                      {sortBy === "tgl_registrasi" ? (
                        sortDir === "asc" ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3" />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-left whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onSort("no_rawat")}
                      className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                      <span>No. Rawat</span>
                      {sortBy === "no_rawat" ? (
                        sortDir === "asc" ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3" />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-left whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onSort("nm_pasien")}
                      className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                      <span>Pasien</span>
                      {sortBy === "nm_pasien" ? (
                        sortDir === "asc" ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3" />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-left whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onSort("no_rkm_medis")}
                      className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                      <span>No. RM</span>
                      {sortBy === "no_rkm_medis" ? (
                        sortDir === "asc" ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3" />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-left whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onSort("jk")}
                      className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                      <span>JK</span>
                      {sortBy === "jk" ? (
                        sortDir === "asc" ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3" />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-left whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onSort("umur")}
                      className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                      <span>Umur</span>
                      {sortBy === "umur" ? (
                        sortDir === "asc" ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3" />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-left whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onSort("nm_dokter")}
                      className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                      <span>Dokter</span>
                      {sortBy === "nm_dokter" ? (
                        sortDir === "asc" ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3" />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-left whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onSort("nm_poli")}
                      className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                      <span>Poli</span>
                      {sortBy === "nm_poli" ? (
                        sortDir === "asc" ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3" />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-left whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onSort("penjab")}
                      className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                      <span>Cara Bayar</span>
                      {sortBy === "penjab" ? (
                        sortDir === "asc" ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3" />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-left min-w-[200px]">
                    <button
                      type="button"
                      onClick={() => onSort("alamat")}
                      className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                      <span>Alamat</span>
                      {sortBy === "alamat" ? (
                        sortDir === "asc" ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3" />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-left whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onSort("stts_daftar")}
                      className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                      <span>Status</span>
                      {sortBy === "stts_daftar" ? (
                        sortDir === "asc" ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3" />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-left whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onSort("kd_penyakit")}
                      className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                      <span>Kode Diagnosa</span>
                      {sortBy === "kd_penyakit" ? (
                        sortDir === "asc" ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3" />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-left min-w-[200px]">
                    <button
                      type="button"
                      onClick={() => onSort("nm_penyakit")}
                      className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                      <span>Diagnosa</span>
                      {sortBy === "nm_penyakit" ? (
                        sortDir === "asc" ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3" />
                      )}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
                {loading ? (
                  <tr>
                    <td colSpan={13} className="px-4 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
                        <p>Sedang memuat data...</p>
                      </div>
                    </td>
                  </tr>
                ) : data.length > 0 ? (
                  data.map((row, idx) => (
                    <tr
                      key={`${row.no_rawat}-${idx}`}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white whitespace-nowrap">
                        {formatDateDMY(row.tgl_registrasi)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white whitespace-nowrap font-medium">
                        {row.no_rawat}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white whitespace-nowrap">
                        {row.nm_pasien}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {row.no_rkm_medis}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white whitespace-nowrap">
                        {row.jk}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white whitespace-nowrap">
                        {row.umur}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white whitespace-nowrap">
                        {row.nm_dokter}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white whitespace-nowrap">
                        {row.nm_poli}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white whitespace-nowrap">
                        {row.penjab || row.png_jawab}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        <span className="line-clamp-2" title={row.alamat}>
                          {row.alamat}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            row.stts_daftar === "Baru"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                          }`}
                        >
                          {row.stts_daftar}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white whitespace-nowrap font-mono">
                        {row.kd_penyakit || "-"}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        <span className="line-clamp-2" title={row.nm_penyakit}>
                          {row.nm_penyakit || "-"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={13} className="px-4 py-12 text-center text-gray-500 dark:text-gray-400">
                      Tidak ada data yang ditemukan untuk kriteria filter ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {pagination.total > 0 && (
            <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Menampilkan <span className="font-medium">{pagination.from}</span> sampai{" "}
                    <span className="font-medium">{pagination.to}</span> dari{" "}
                    <span className="font-medium">{pagination.total}</span> hasil
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1 || loading}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200">
                      Halaman {page} dari {pagination.last_page}
                    </span>
                    <button
                      onClick={() => setPage((p) => Math.min(pagination.last_page, p + 1))}
                      disabled={page === pagination.last_page || loading}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              </div>
              {/* Mobile Pagination */}
              <div className="flex items-center justify-between w-full sm:hidden">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1 || loading}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-700">
                  {page} / {pagination.last_page}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(pagination.last_page, p + 1))}
                  disabled={page === pagination.last_page || loading}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </LayoutUtama>
  );
}
