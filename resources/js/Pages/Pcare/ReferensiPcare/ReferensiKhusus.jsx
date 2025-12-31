import React, { useEffect, useState } from 'react';
import SidebarBriding from '@/Layouts/SidebarBriding';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowPathIcon, CheckCircleIcon, ExclamationTriangleIcon, IdentificationIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 }
};

const badge = (text, color) => (
  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${color}`}>
    {text}
  </span>
);

export default function ReferensiKhusus() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({ response: { count: 0, list: [] }, metaData: { message: '', code: null } });

  // Pencarian & pagination state
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);

  // Derived data
  const list = data?.response?.list || [];
  const total = data?.response?.count ?? list.length;
  const filteredList = query
    ? list.filter((item) => {
        const k = String(item?.kdKhusus || '').toLowerCase();
        const n = String(item?.nmKhusus || '').toLowerCase();
        const q = query.toLowerCase();
        return k.includes(q) || n.includes(q);
      })
    : list;
  const filteredTotal = filteredList.length;
  const pageCount = Math.max(1, Math.ceil(filteredTotal / perPage));
  const currentPage = Math.min(page, pageCount);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, filteredTotal);
  const pageItems = filteredList.slice(startIndex, endIndex);
  const hasResult = pageItems.length > 0;

  const fetchKhusus = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/pcare/spesialis/khusus`, { headers: { Accept: 'application/json' } });
      const json = await res.json();
      setData(json);
    } catch {
      setError('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKhusus();
  }, []);

  // Reset halaman ketika query/perPage berubah
  useEffect(() => {
    setPage(1);
  }, [query, perPage]);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="p-4">
  {/* Header */}
  <motion.div variants={itemVariants} className="mb-4">
        <motion.div
          variants={itemVariants}
          className="relative px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm rounded-lg"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <motion.h1
                className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Referensi Khusus PCare
              </motion.h1>
            </div>
            <div className="flex items-center gap-2">
              {badge('GET', 'bg-white/20 text-white')}
              {badge('JSON', 'bg-white/20 text-white')}
            </div>
          </div>
        </motion.div>
  </motion.div>

      {/* Card: Total Item + Status + Pencarian */}
      <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 p-6 shadow-xl shadow-blue-500/5">
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
                  <ArrowPathIcon className="h-4 w-4 animate-spin text-indigo-600" />
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

          {/* Search */}
          <div className="w-full md:w-80">
            <label className="block text-xs text-slate-500 mb-1">Cari khusus</label>
            <div className="relative">
              <MagnifyingGlassIcon className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari khusus (kode/nama)…"
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white pl-8 pr-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Results */}
      <motion.div variants={itemVariants} className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <AnimatePresence>
            {loading && !hasResult ? (
              Array.from({ length: Math.min(4, 6) }).map((_, i) => (
                <motion.div key={`sk-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-4 shadow-xl shadow-blue-500/5">
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 w-24 bg-slate-200 rounded" />
                    <div className="h-5 w-full bg-slate-200 rounded" />
                    <div className="h-3 w-1/2 bg-slate-200 rounded" />
                  </div>
                </motion.div>
              ))
            ) : hasResult ? (
              pageItems.map((item, idx) => (
                <motion.div key={`${item.kdKhusus || idx}-${idx}`} variants={itemVariants} initial="hidden" animate="show" exit={{ opacity: 0 }} whileHover={{ scale: 1.01, y: -2 }} className="group relative flex flex-col rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-4 shadow-xl shadow-blue-500/5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{item.kdKhusus || '-'}</div>
                      <div className="mt-0.5 text-sm text-slate-700 leading-snug">{item.nmKhusus || '-'}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      {badge('Khusus', 'bg-slate-100 text-slate-700')}
                      <IdentificationIcon className="h-4 w-4 text-slate-500" />
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-6 text-center text-slate-500">
                Tidak ada data.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Pagination */}
      <motion.div variants={itemVariants} className="mt-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-4 shadow-xl shadow-blue-500/5">
          <div className="text-xs text-slate-600">
            Menampilkan <span className="font-medium text-slate-800">{filteredTotal === 0 ? 0 : startIndex + 1}</span>
            –
            <span className="font-medium text-slate-800">{filteredTotal === 0 ? 0 : endIndex}</span>
            dari <span className="font-medium text-slate-800">{filteredTotal}</span> item
            {query && <span className="ml-1 text-slate-500">(hasil pencarian)</span>}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className={`px-3 py-1.5 text-xs rounded-md border ${currentPage <= 1 ? 'bg-slate-50 text-slate-400 border-slate-200' : 'bg-white text-slate-700 border-gray-300 hover:bg-slate-50'}`}
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
              className={`px-3 py-1.5 text-xs rounded-md border ${currentPage >= pageCount ? 'bg-slate-50 text-slate-400 border-slate-200' : 'bg-white text-slate-700 border-gray-300 hover:bg-slate-50'}`}
            >
              Next
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-500">Per halaman</label>
            <select
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
              className="rounded-md border border-gray-300 dark:border-gray-600 bg-white px-2 py-1 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value={9}>9</option>
            <option value={12}>12</option>
            <option value={18}>18</option>
            <option value={24}>24</option>
          </select>
        </div>
      </div>
    </motion.div>
    </motion.div>
  );
}

// Render dalam AppLayout
ReferensiKhusus.layout = (page) => <SidebarBriding title="Briding Pcare">{page}</SidebarBriding>;
