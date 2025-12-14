import React, { useEffect, useMemo, useState } from 'react';
import SidebarBriding from '@/Layouts/SidebarBriding';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowPathIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 }
};

export default function ReferensiTindakan() {
  const [kdTkp, setKdTkp] = useState('10'); // 10=RJTP, 20=RITP, 50=Promotif
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(25);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const url = useMemo(() => {
    const params = new URLSearchParams();
    params.set('kdTkp', kdTkp);
    params.set('start', String(start));
    params.set('limit', String(limit));
    return `/api/pcare/tindakan?${params.toString()}`;
  }, [kdTkp, start, limit]);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.metaData?.message || 'Gagal memuat data Referensi Tindakan');
      const list = json?.response?.list || [];
      setData(list);
      setCount(json?.response?.count || list.length || 0);
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
                Referensi Tindakan PCare
              </motion.h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium text-white">GET</span>
              <span className="inline-flex items-center rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium text-white">JSON</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 p-6 shadow-xl shadow-blue-500/5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-2">
          <div className="md:col-span-4">
            <label className="block text-xs font-medium text-slate-600 mb-1">KD TKP</label>
            <select
              value={kdTkp}
              onChange={(e) => setKdTkp(e.target.value)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
            >
              <option value="10">RJTP (10)</option>
              <option value="20">RITP (20)</option>
              <option value="50">Promotif (50)</option>
            </select>
          </div>
          <div className="md:col-span-4">
            <label className="block text-xs font-medium text-slate-600 mb-1">Start</label>
            <input
              type="number"
              value={start}
              min={0}
              onChange={(e) => setStart(Number(e.target.value) || 0)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
            />
          </div>
          <div className="md:col-span-4">
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
      </motion.div>

      {loading && (
        <motion.div variants={itemVariants} className="mt-3 rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-4 text-xs text-slate-500">Memuat data Referensi Tindakan...</motion.div>
      )}
      {error && (
        <motion.div variants={itemVariants} className="mt-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-700">{error}</motion.div>
      )}

      <motion.div variants={itemVariants} className="mt-3 overflow-x-auto rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50/60">
            <tr>
              <th className="text-left px-3 py-2 font-semibold text-slate-700">Kode</th>
              <th className="text-left px-3 py-2 font-semibold text-slate-700">Nama Tindakan</th>
              <th className="text-right px-3 py-2 font-semibold text-slate-700">Max Tarif</th>
              <th className="text-center px-3 py-2 font-semibold text-slate-700">With Value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={`${item.kdTindakan || idx}-${idx}`} className="border-t border-slate-100">
                <td className="px-3 py-2 font-mono text-slate-800">{item.kdTindakan || '-'}</td>
                <td className="px-3 py-2 text-slate-800">{(item.nmTindakan || '').toString().replace(/\r\n/g, ' ').trim()}</td>
                <td className="px-3 py-2 text-right text-slate-800">{typeof item.maxTarif === 'number' ? item.maxTarif.toLocaleString('id-ID') : '-'}</td>
                <td className="px-3 py-2 text-center">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${item.withValue ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
                    {item.withValue ? 'Ya' : 'Tidak'}
                  </span>
                </td>
              </tr>
            ))}
            {!loading && !error && data.length === 0 && (
              <tr>
                <td colSpan={4} className="px-3 py-6 text-center text-slate-500 text-sm">Tidak ada data untuk filter saat ini.</td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}

ReferensiTindakan.layout = (page) => <SidebarBriding title="Briding Pcare">{page}</SidebarBriding>;
