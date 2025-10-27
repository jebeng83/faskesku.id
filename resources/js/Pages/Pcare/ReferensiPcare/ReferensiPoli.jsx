import React, { useEffect, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowPathIcon, CheckCircleIcon, ExclamationTriangleIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

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

export default function ReferensiPoli() {
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(25);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({ response: { count: 0, list: [] }, metaData: { message: '', code: null } });

  const hasResult = (data?.response?.list || []).length > 0;
  const total = data?.response?.count || 0;

  const fetchPoli = async (opts = {}) => {
    const { rowStart = start, rowLimit = limit } = opts;
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ start: rowStart, limit: rowLimit });
      const res = await fetch(`/api/pcare/poli?${params.toString()}`, { headers: { Accept: 'application/json' } });
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError(e?.message || 'Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoli();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onNext = () => {
    const ns = start + limit;
    setStart(ns);
    fetchPoli({ rowStart: ns, rowLimit: limit });
  };

  const onPrev = () => {
    const ps = Math.max(0, start - limit);
    setStart(ps);
    fetchPoli({ rowStart: ps, rowLimit: limit });
  };

  const onReload = () => fetchPoli({ rowStart: start, rowLimit: limit });

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="p-4">
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-4">
        <div className="rounded-xl bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 text-white p-5 shadow">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-semibold">Referensi Poli PCare</h1>
              <p className="text-sm opacity-90">Daftar poli FKTP dari katalog BPJS PCare.</p>
            </div>
            <div className="flex items-center gap-2">
              {badge('GET', 'bg-white/20 text-white')}
              {badge('JSON', 'bg-white/20 text-white')}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-slate-500" htmlFor="limit">Limit</label>
              <select id="limit" className="mt-1 w-full rounded-md border-slate-300 text-sm" value={limit} onChange={(e) => setLimit(parseInt(e.target.value))}>
                {[10, 25, 50, 100].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500" htmlFor="start">Start</label>
              <input id="start" type="number" min={0} className="mt-1 w-full rounded-md border-slate-300 text-sm" value={start} onChange={(e) => setStart(parseInt(e.target.value) || 0)} />
            </div>
          </div>
          <div className="md:col-span-1 flex items-end">
            <button onClick={onReload} className="inline-flex items-center gap-2 rounded-md bg-indigo-600 text-white px-3 py-2 text-sm shadow hover:bg-indigo-700">
              <ArrowPathIcon className="h-4 w-4" />
              Muat Ulang
            </button>
          </div>
        </div>
      </motion.div>

      {/* Status Bar */}
      <motion.div variants={itemVariants} className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <div className="text-xs text-slate-500">Total</div>
          <div className="mt-1 text-lg font-semibold text-slate-800">{total}</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <div className="text-xs text-slate-500">Range</div>
          <div className="mt-1 text-sm text-slate-800">{start} – {Math.min(start + limit, total)}</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
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
        <button onClick={onPrev} disabled={start <= 0 || loading} className={`px-3 py-2 text-sm rounded-md border ${start > 0 && !loading ? 'bg-white border-slate-300 hover:bg-slate-50' : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'}`}>Prev</button>
        <button onClick={onNext} disabled={start + limit >= total || loading} className={`px-3 py-2 text-sm rounded-md border ${(start + limit < total) && !loading ? 'bg-white border-slate-300 hover:bg-slate-50' : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'}`}>Next</button>
      </motion.div>

      {/* Results */}
      <motion.div variants={itemVariants} className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <AnimatePresence>
            {loading && !hasResult ? (
              Array.from({ length: Math.min(6, limit) }).map((_, i) => (
                <motion.div key={`sk-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 w-24 bg-slate-200 rounded" />
                    <div className="h-5 w-full bg-slate-200 rounded" />
                    <div className="h-3 w-1/2 bg-slate-200 rounded" />
                  </div>
                </motion.div>
              ))
            ) : hasResult ? (
              (data.response.list || []).map((item, idx) => (
                <motion.div key={`${item.kdPoli || idx}-${idx}`} variants={itemVariants} initial="hidden" animate="show" exit={{ opacity: 0 }} className="group relative flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                        <BuildingOfficeIcon className="h-4 w-4 text-slate-500" />
                        {item.kdPoli || '-'}
                      </div>
                      <div className="mt-0.5 text-sm text-slate-700 leading-snug">{item.nmPoli || item.nama || '-'}</div>
                    </div>
                    <div>
                      {badge('Poli', 'bg-slate-100 text-slate-700')}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-500">
                Tidak ada data. Coba muat ulang atau ubah limit.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Render dalam AppLayout
ReferensiPoli.layout = (page) => <AppLayout title="Referensi Poli" children={page} />;