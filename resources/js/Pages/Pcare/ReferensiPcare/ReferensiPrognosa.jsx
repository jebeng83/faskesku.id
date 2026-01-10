import React, { useEffect, useState } from 'react';
import SidebarBriding from '@/Layouts/SidebarBriding';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowPathIcon, CheckCircleIcon, ExclamationTriangleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

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

export default function ReferensiPrognosa() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({ response: { list: [] }, metaData: { message: '', code: null } });

  // Pencarian & pagination state
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);

  // Derived data
  const list = Array.isArray(data?.response?.list) ? data.response.list : [];
  const total = data?.response?.count ?? list.length;
  const filteredList = query
    ? list.filter((item) => {
        const k = String(item?.kdPrognosa || '').toLowerCase();
        const n = String(item?.nmPrognosa || '').toLowerCase();
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

  const fetchPrognosa = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/pcare/prognosa`, { headers: { Accept: 'application/json' } });
      const json = await res.json();
      setData(json);
    } catch {
      setError('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrognosa();
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
                Referensi Prognosa PCare
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
                  <ArrowPathIcon className="h-4 w-4 animate-spin text-violet-600" />
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
            <label className="block text-xs text-slate-500 mb-1">Cari prognosa</label>
            <div className="relative">
              <MagnifyingGlassIcon className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ketik kode/nama prognosa…"
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white pl-8 pr-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
              />
            </div>
          </div>

          {/* PerPage */}
          <div className="w-full md:w-40">
            <label className="block text-xs text-slate-500 mb-1">Item per halaman</label>
            <select
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              {[6, 9, 12, 18, 24, 36].map((n) => (
                <option key={`pp-${n}`} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* Refresh */}
          <div className="w-full md:w-32">
            <label className="block text-xs text-slate-500 mb-1">Aksi</label>
            <button
              type="button"
              onClick={fetchPrognosa}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-3 py-2 text-sm shadow transition-all duration-200 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700"
            >
              <ArrowPathIcon className="h-4 w-4" /> Muat ulang
            </button>
          </div>
        </div>
      </motion.div>

      {/* Grid data */}
      <motion.div variants={itemVariants} className="mt-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        <AnimatePresence mode="popLayout">
          {loading ? (
            Array.from({ length: Math.min(4, perPage) }).map((_, i) => (
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
              <motion.div key={`${item.kdPrognosa || idx}-${idx}`} variants={itemVariants} initial="hidden" animate="show" exit={{ opacity: 0 }} whileHover={{ scale: 1.01, y: -2 }} className="group relative flex flex-col rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-4 shadow-xl shadow-blue-500/5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-800">{item.kdPrognosa || '-'}</div>
                    <div className="mt-0.5 text-sm text-slate-700 leading-snug">{item.nmPrognosa || '-'}</div>
                  </div>
                  <div>
                    {badge('PCare', 'bg-slate-100 text-slate-700')}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div variants={itemVariants} className="rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-6 text-center">
              <div className="text-sm text-slate-600">Tidak ada data ditampilkan.</div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Footer MetaData */}
      <motion.div variants={itemVariants} className="mt-3 text-[11px] text-slate-400">
        <div>Meta: kode {String(data?.metaData?.code ?? '')} · pesan: {String(data?.metaData?.message ?? '')}</div>
      </motion.div>
    </motion.div>
  );
}

ReferensiPrognosa.layout = (page) => <SidebarBriding title="Briding Pcare">{page}</SidebarBriding>;
