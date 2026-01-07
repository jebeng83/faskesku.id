import React, { useEffect, useMemo, useState } from 'react';
import SidebarBriding from '@/Layouts/SidebarBriding';
import { motion } from 'framer-motion';
import { ArrowPathIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 }
};

export default function ReferensiSRK() {
  const [q, setQ] = useState('');
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(25);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const url = useMemo(() => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    params.set('start', String(start));
    params.set('limit', String(limit));
    return `/pcare/api/srk/rekap?${params.toString()}`;
  }, [q, start, limit]);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.metaData?.message || 'Gagal memuat data Referensi SRK');
      const list = json?.response?.list || (Array.isArray(json?.response) ? json.response : []);
      const finalList = Array.isArray(list) ? list : [];
      setData(finalList);
      const total = json?.response?.count ?? (Array.isArray(finalList) ? finalList.length : 0);
      setCount(typeof total === 'number' ? total : 0);
    } catch (_e) {
      setError('Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handle = setTimeout(() => {
      setStart(0);
      fetchData();
    }, 400);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, limit]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const onPrev = () => {
    const ps = Math.max(0, start - limit);
    setStart(ps);
  };

  const onNext = () => {
    const ns = start + limit;
    setStart(ns);
  };

  // Derive available columns dynamically with sensible defaults
  const columns = useMemo(() => {
    const defaults = ['kdPenyakit', 'nmPenyakit', 'jumlah'];
    const first = data && data.length > 0 ? data[0] : null;
    if (!first || typeof first !== 'object') return defaults;
    const keys = Object.keys(first);
    if (keys.length <= 3) return keys;
    return defaults.filter((k) => keys.includes(k)).length > 0 ? defaults.filter((k) => keys.includes(k)) : keys.slice(0, 6);
  }, [data]);

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
                Referensi Penyakit SRK (PCare)
              </motion.h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium text-white">GET</span>
              <span className="inline-flex items-center rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium text-white">JSON</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.form variants={itemVariants} onSubmit={(e) => { e.preventDefault(); setStart(0); fetchData(); }} className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 p-6 shadow-xl shadow-blue-500/5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-2">
          <div className="md:col-span-6">
            <label className="block text-xs font-medium text-slate-600 mb-1">Kata Kunci</label>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="mis. DM/HT atau nama penyakit"
                className="w-full pl-8 rounded-md border border-gray-300 dark:border-gray-600 px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="md:col-span-3">
            <label className="block text-xs font-medium text-slate-600 mb-1">Start</label>
            <input
              type="number"
              value={start}
              min={0}
              onChange={(e) => setStart(Number(e.target.value) || 0)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
            />
          </div>
          <div className="md:col-span-3">
            <label className="block text-xs font-medium text-slate-600 mb-1">Limit</label>
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value) || 25)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
            >
              {[10, 25, 50, 100].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between">
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
      </motion.form>

      <motion.div variants={itemVariants} className="mt-3 flex items-center gap-2">
        <button onClick={onPrev} disabled={loading || start <= 0} className={`px-3 py-2 text-sm rounded-md border ${start > 0 && !loading ? 'bg-white border-slate-300 hover:bg-slate-50' : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'}`}>Prev</button>
        <button onClick={onNext} disabled={loading || (start + limit >= count && count > 0)} className={`px-3 py-2 text-sm rounded-md border ${(start + limit < count || count === 0) && !loading ? 'bg-white border-slate-300 hover:bg-slate-50' : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'}`}>Next</button>
      </motion.div>

      {loading && (
        <motion.div variants={itemVariants} className="mt-3 rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-4 text-xs text-slate-500">Memuat data Referensi SRK...</motion.div>
      )}
      {error && (
        <motion.div variants={itemVariants} className="mt-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-700">{error}</motion.div>
      )}

      <motion.div variants={itemVariants} className="mt-3 overflow-x-auto rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50/60">
            <tr>
              {columns.map((c) => (
                <th key={c} className="text-left px-3 py-2 font-semibold text-slate-700">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={`row-${idx}`} className="border-t border-slate-100">
                {columns.map((c) => (
                  <td key={`${c}-${idx}`} className="px-3 py-2 text-slate-800">{(row?.[c] ?? '-').toString()}</td>
                ))}
              </tr>
            ))}
            {!loading && !error && data.length === 0 && (
              <tr>
                <td colSpan={columns.length || 1} className="px-3 py-6 text-center text-slate-500 text-sm">Tidak ada data untuk filter saat ini.</td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}

ReferensiSRK.layout = (page) => <SidebarBriding title="Briding Pcare">{page}</SidebarBriding>;
