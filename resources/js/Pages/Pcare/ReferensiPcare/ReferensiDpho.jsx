import React, { useEffect, useMemo, useState } from 'react';
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

export default function ReferensiDpho() {
  const [q, setQ] = useState('');
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(25);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const url = useMemo(() => {
    const params = new URLSearchParams();
    if (q && q.trim() !== '') params.set('q', q.trim());
    params.set('start', String(start));
    params.set('limit', String(limit));
    return `/api/pcare/dpho?${params.toString()}`;
  }, [q, start, limit]);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(url);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.metaData?.message || 'Gagal memuat data DPHO');
      const list = json?.response?.list || [];
      setData(list);
      setCount(json?.response?.count || list.length);
    } catch (e) {
      setError(e.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const canPrev = start > 0;
  const canNext = start + limit < count;

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="p-4">
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
                Referensi DPHO PCare
              </motion.h1>
            </div>
            <div className="flex items-center gap-2">
              {badge('GET', 'bg-white/20 text-white')}
              {badge('JSON', 'bg-white/20 text-white')}
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 p-6 shadow-xl shadow-blue-500/5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8">
            <label className="block text-xs font-medium text-slate-600 mb-1">Kata kunci DPHO</label>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Masukkan kode/nama obat"
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1">Start</label>
            <input
              type="number"
              value={start}
              min={0}
              onChange={(e) => setStart(Number(e.target.value) || 0)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1">Limit</label>
            <input
              type="number"
              value={limit}
              min={1}
              onChange={(e) => setLimit(Number(e.target.value) || 25)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-slate-600">Total ditemukan: <span className="font-semibold text-slate-800">{count}</span></div>
          <button
            type="button"
            onClick={fetchData}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-3 py-2 text-sm shadow transition-all duration-200 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700"
          >
            <ArrowPathIcon className="h-4 w-4" />
            Muat Data
          </button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 p-4 shadow-xl shadow-blue-500/5">
          <div className="text-xs text-slate-500">Range</div>
          <div className="mt-1 text-sm text-slate-800">{start} – {Math.min(start + limit, count)}</div>
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
        <div className="rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 p-4 shadow-xl shadow-blue-500/5">
          <div className="text-xs text-slate-500">Kontrol</div>
          <div className="mt-1 flex items-center gap-2">
            <button onClick={() => setStart(Math.max(0, start - limit))} disabled={!canPrev || loading} className={`px-3 py-1.5 text-xs rounded-md border ${canPrev && !loading ? 'bg-white text-slate-700 border-gray-300 hover:bg-slate-50' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>Prev</button>
            <button onClick={() => setStart(start + limit)} disabled={!canNext || loading} className={`px-3 py-1.5 text-xs rounded-md border ${canNext && !loading ? 'bg-white text-slate-700 border-gray-300 hover:bg-slate-50' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>Next</button>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <AnimatePresence>
            {loading && data.length === 0 ? (
              Array.from({ length: Math.min(6, limit) }).map((_, i) => (
                <motion.div key={`sk-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-4 shadow-xl shadow-blue-500/5">
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 w-24 bg-slate-200 rounded" />
                    <div className="h-5 w-full bg-slate-200 rounded" />
                    <div className="h-3 w-1/2 bg-slate-200 rounded" />
                  </div>
                </motion.div>
              ))
            ) : data.length > 0 ? (
              data.map((item) => (
                <motion.div
                  key={`${item.kdObat}-${item.nmObat}`}
                  variants={itemVariants}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.01, y: -2 }}
                  className="group relative flex flex-col rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-4 shadow-xl shadow-blue-500/5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-800 leading-tight">{item.nmObat}</div>
                      <div className="text-[11px] text-slate-500">Kode: <span className="font-mono">{item.kdObat}</span></div>
                    </div>
                    <div className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">Sedia: {item.sedia}</div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-6 text-center text-slate-500">
                Tidak ada data untuk filter saat ini.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

ReferensiDpho.layout = (page) => <SidebarBriding title="Briding Pcare">{page}</SidebarBriding>;
