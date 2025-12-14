import React, { useEffect, useMemo, useState } from 'react';
import SidebarBriding from '@/Layouts/SidebarBriding';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';

const containerVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

const badge = (text, className = 'bg-slate-100 text-slate-700') => (
  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${className}`}>{text}</span>
);

export default function ReferensiPoliMobileJkn() {
  const [tanggal, setTanggal] = useState(() => new Date().toISOString().slice(0, 10));
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);

  const total = list.length;
  const filtered = useMemo(() => {
    if (!query) return list;
    const q = query.toLowerCase();
    return list.filter((it) =>
      (it.namapoli || '').toLowerCase().includes(q) ||
      (it.kodepoli || '').toLowerCase().includes(q) ||
      (it.nmsubspesialis || '').toLowerCase().includes(q) ||
      (it.kdsubspesialis || '').toLowerCase().includes(q)
    );
  }, [list, query]);
  const filteredTotal = filtered.length;

  const pageCount = Math.max(1, Math.ceil(filteredTotal / perPage));
  const currentPage = Math.min(page, pageCount);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    return filtered.slice(start, end);
  }, [filtered, currentPage, perPage]);

  const fetchPoli = async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ tanggal });
      const res = await fetch(`/api/mobilejkn/ref/poli?${params.toString()}`, {
        headers: { Accept: 'application/json' },
      });
      const json = await res.json();
      // Dukungan dua bentuk respons:
      // 1) { metadata, response: [ ... ] }
      // 2) { metadata, response: { list: [ ... ] } }
      const resp = json?.response;
      let items = [];
      if (Array.isArray(resp)) {
        items = resp;
      } else if (resp && Array.isArray(resp.list)) {
        items = resp.list;
      }
      setList(items);
      if (!res.ok) {
        setError(json?.metadata?.message || 'Gagal mengambil data');
      }
    } catch (e) {
      setError(e?.message || 'Terjadi kesalahan jaringan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoli();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tanggal]);

  useEffect(() => {
    setPage(1);
  }, [query, perPage]);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="p-4">
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-4">
        <div className="rounded-xl bg-gradient-to-r from-emerald-500 via-teal-600 to-green-600 text-white p-5 shadow">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-semibold">Referensi Poli Mobile JKN</h1>
              <p className="text-sm opacity-90">Daftar poli dari katalog BPJS Mobile JKN, berdasarkan tanggal layanan.</p>
            </div>
            <div className="flex items-center gap-2">
              {badge('GET', 'bg-white/20 text-white')}
              {badge('JSON', 'bg-white/20 text-white')}
              {badge('MobileJKN', 'bg-white/20 text-white')}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Card: Total Item + Status + Pencarian + Tanggal */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-600">
              Total item: <span className="font-semibold text-slate-800">{total}</span>
              {query && (
                <span className="ml-2 text-xs text-slate-500">Terfilter: {filteredTotal}</span>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm">
              {loading ? (
                <>
                  <ArrowPathIcon className="h-4 w-4 animate-spin text-emerald-600" />
                  <span className="text-slate-700">Memuat…</span>
                </>
              ) : error ? (
                <>
                  <ExclamationTriangleIcon className="h-4 w-4 text-red-600" />
                  <span className="text-red-700">{error}</span>
                </>
              ) : (
                <>
                  <CheckCircleIcon className="h-4 w-4 text-emerald-600" />
                  <span className="text-slate-700">Siap</span>
                </>
              )}
            </div>
          </div>

          {/* Tanggal */}
          <div className="w-full md:w-64">
            <label className="block text-xs text-slate-500 mb-1">Tanggal</label>
            <div className="relative">
              <CalendarDaysIcon className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className="w-full rounded-md border border-slate-300 bg-white pl-8 pr-3 py-2 text-sm text-slate-700 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Search */}
          <div className="w-full md:w-80">
            <label className="block text-xs text-slate-500 mb-1">Cari poli</label>
            <div className="relative">
              <MagnifyingGlassIcon className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Nama/kode/subspesialis…"
                className="w-full rounded-md border border-slate-300 bg-white pl-8 pr-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grid List */}
      <motion.div variants={itemVariants} className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        <AnimatePresence>
          {paginated.map((poli) => (
            <motion.div
              key={`${poli.kodepoli}-${poli.namapoli}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-800">{poli.namapoli || '-'}</div>
                <span className="text-[10px] rounded-md bg-emerald-50 text-emerald-700 px-2 py-0.5 border border-emerald-200">{poli.kodepoli || '-'}</span>
              </div>
              <div className="mt-1 text-xs text-slate-600">
                {poli.nmsubspesialis ? (
                  <>
                    Subspesialis: <span className="font-medium text-slate-700">{poli.nmsubspesialis}</span>
                    {poli.kdsubspesialis && (
                      <span className="ml-1 text-slate-500">({poli.kdsubspesialis})</span>
                    )}
                  </>
                ) : (
                  <span className="text-slate-500">—</span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Pagination */}
      <motion.div variants={itemVariants} className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
            className={`px-3 py-1.5 text-xs rounded-md border ${currentPage <= 1 ? 'bg-slate-50 text-slate-400 border-slate-200' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}
          >
            Prev
          </button>
          <div className="text-[11px] text-slate-500">
            Halaman <span className="font-semibold text-slate-700">{currentPage}</span>/<span className="text-slate-700">{pageCount}</span>
          </div>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={currentPage >= pageCount}
            className={`px-3 py-1.5 text-xs rounded-md border ${currentPage >= pageCount ? 'bg-slate-50 text-slate-400 border-slate-200' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}
          >
            Next
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-500">Per halaman</label>
          <select
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
            className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700 focus:border-emerald-500 focus:ring-emerald-500"
          >
            <option value={12}>12</option>
            <option value={18}>18</option>
            <option value={24}>24</option>
            <option value={30}>30</option>
          </select>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Render dalam AppLayout
ReferensiPoliMobileJkn.layout = (page) => <SidebarBriding title="Briding Pcare">{page}</SidebarBriding>;
