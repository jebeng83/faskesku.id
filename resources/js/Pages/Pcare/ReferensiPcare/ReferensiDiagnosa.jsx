import React, { useEffect, useState } from 'react';
import SidebarBriding from '@/Layouts/SidebarBriding';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, ArrowPathIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

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

export default function ReferensiDiagnosa() {
  const [q, setQ] = useState('');
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(25);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({ response: { count: 0, list: [] }, metaData: { message: '', code: null } });

  const hasResult = (data?.response?.list || []).length > 0;
  const total = data?.response?.count || 0;

  const canPrev = start > 0;
  const canNext = start + limit < total;

  const fetchDiagnosa = async (opts = {}) => {
    const { query = q, rowStart = start, rowLimit = limit } = opts;
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ q: query, start: rowStart, limit: rowLimit });
      const res = await fetch(`/pcare/api/diagnosa?${params.toString()}`, { headers: { Accept: 'application/json' } });
      const json = await res.json();
      setData(json);
    } catch {
      setError('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  // Debounce pencarian saat q berubah
  useEffect(() => {
    const handle = setTimeout(() => {
      fetchDiagnosa({ query: q, rowStart: 0, rowLimit: limit });
      setStart(0);
    }, 400);
    return () => clearTimeout(handle);
  }, [q, limit]);

  // First load
  useEffect(() => {
    fetchDiagnosa();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    fetchDiagnosa({ query: q, rowStart: 0, rowLimit: limit });
    setStart(0);
  };

  const onNext = () => {
    const ns = start + limit;
    setStart(ns);
    fetchDiagnosa({ query: q, rowStart: ns, rowLimit: limit });
  };

  const onPrev = () => {
    const ps = Math.max(0, start - limit);
    setStart(ps);
    fetchDiagnosa({ query: q, rowStart: ps, rowLimit: limit });
  };

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
                Referensi Diagnosa PCare
              </motion.h1>
            </div>
            <div className="flex items-center gap-2">
              {badge('GET', 'bg-white/20 text-white')}
              {badge('JSON', 'bg-white/20 text-white')}
            </div>
          </div>
        </motion.div>
  </motion.div>

      {/* Search Form */}
      <motion.form variants={itemVariants} onSubmit={onSubmit} className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-9">
            <label className="text-xs text-slate-500" htmlFor="q">Kode/Nama Diagnosa</label>
            <div className="mt-1 flex items-center gap-2">
              <div className="relative flex-1">
                <MagnifyingGlassIcon className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  id="q"
                  type="text"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="mis. A001 atau Herpesviral..."
                  className="w-full pl-8 pr-3 py-2 rounded-md border-gray-300 dark:border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                />
              </div>
              <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-3 py-2 text-sm shadow transition-all duration-200 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700">
                <MagnifyingGlassIcon className="h-4 w-4" />
                Cari
              </button>
            </div>
          </div>
          <div className="md:col-span-3 grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-slate-500" htmlFor="limit">Limit</label>
              <select id="limit" className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500" value={limit} onChange={(e) => setLimit(parseInt(e.target.value))}>
                {[10, 25, 50, 100].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500" htmlFor="start">Start</label>
              <input id="start" type="number" min={0} className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500" value={start} onChange={(e) => setStart(parseInt(e.target.value) || 0)} />
            </div>
          </div>
        </div>
        
      </motion.form>

      {/* Status Bar */}
      <motion.div variants={itemVariants} className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 p-4 shadow-xl shadow-blue-500/5">
          <div className="text-xs text-slate-500">Total</div>
          <div className="mt-1 text-lg font-semibold text-slate-800">{total}</div>
        </div>
        <div className="rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 p-4 shadow-xl shadow-blue-500/5">
          <div className="text-xs text-slate-500">Range</div>
          <div className="mt-1 text-sm text-slate-800">{start} – {Math.min(start + limit, total)}</div>
        </div>
        <div className="rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 p-4 shadow-xl shadow-blue-500/5">
          <div className="text-xs text-slate-500">Status</div>
          <div className="mt-1 flex items-center gap-2">
            {loading ? (
              <>
                <ArrowPathIcon className="h-4 w-4 animate-spin text-indigo-600" />
                <span className="text-slate-700 text-sm">Memuat…</span>
              </>
            ) : error ? (
              <>
                <ExclamationTriangleIcon className="h-4 w-4 text-red-600" />
                <span className="text-red-700 text-sm">{error}</span>
              </>
            ) : (
              <>
                <CheckCircleIcon className="h-4 w-4 text-emerald-600" />
                <span className="text-slate-700 text-sm">Siap</span>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Pager */}
      <motion.div variants={itemVariants} className="mt-3 flex items-center gap-2">
        <button onClick={onPrev} disabled={!canPrev || loading} className={`px-3 py-2 text-sm rounded-md border ${canPrev && !loading ? 'bg-white border-slate-300 hover:bg-slate-50' : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'}`}>Prev</button>
        <button onClick={onNext} disabled={!canNext || loading} className={`px-3 py-2 text-sm rounded-md border ${canNext && !loading ? 'bg-white border-slate-300 hover:bg-slate-50' : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'}`}>Next</button>
      </motion.div>

      {/* Results */}
      <motion.div variants={itemVariants} className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <AnimatePresence>
            {loading && !hasResult ? (
              Array.from({ length: Math.min(6, limit) }).map((_, i) => (
                <motion.div key={`sk-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-4 shadow-xl shadow-blue-500/5">
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 w-24 bg-slate-200 rounded" />
                    <div className="h-5 w-full bg-slate-200 rounded" />
                    <div className="h-3 w-1/2 bg-slate-200 rounded" />
                  </div>
                </motion.div>
              ))
            ) : hasResult ? (
              (data.response.list || []).map((item, idx) => (
                <motion.div key={`${item.kdDiag}-${idx}`} variants={itemVariants} initial="hidden" animate="show" exit={{ opacity: 0 }} whileHover={{ scale: 1.01, y: -2 }} className="group relative flex flex-col rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-4 shadow-xl shadow-blue-500/5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{item.kdDiag}</div>
                      <div className="mt-0.5 text-sm text-slate-700 leading-snug">{item.nmDiag}</div>
                    </div>
                    <div>
                      {item.nonSpesialis ? badge('Non Spesialis', 'bg-amber-100 text-amber-700') : badge('Spesialis', 'bg-emerald-100 text-emerald-700')}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-6 text-center text-slate-500">
                Tidak ada data. Coba kata kunci lain.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Render dalam AppLayout
ReferensiDiagnosa.layout = (page) => <SidebarBriding title="Briding Pcare">{page}</SidebarBriding>;
