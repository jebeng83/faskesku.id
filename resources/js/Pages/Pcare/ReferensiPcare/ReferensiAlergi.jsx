import React, { useEffect, useState } from 'react';
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

const badge = (text, color) => (
  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${color}`}>
    {text}
  </span>
);

const jenisOptions = [
  { code: '01', label: 'Makanan' },
  { code: '02', label: 'Udara' },
  { code: '03', label: 'Obat' },
];

export default function ReferensiAlergi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jenis, setJenis] = useState('01'); // default: Makanan
  const [data, setData] = useState({ response: { list: [] }, metaData: { message: '', code: null } });

  const list = Array.isArray(data?.response?.list) ? data.response.list : [];
  const total = data?.response?.count ?? list.length;

  const fetchAlergi = async (overrideJenis = jenis) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/pcare/alergi?jenis=${encodeURIComponent(overrideJenis)}`, { headers: { Accept: 'application/json' } });
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError(e?.message || 'Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlergi(jenis);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jenis]);

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
                Referensi Alergi PCare
              </motion.h1>
            </div>
            <div className="flex items-center gap-2">
              {badge('GET', 'bg-white/20 text-white')}
              {badge('JSON', 'bg-white/20 text-white')}
            </div>
          </div>
        </motion.div>
  </motion.div>

      {/* Controls */}
      <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 p-6 shadow-xl shadow-blue-500/5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-10">
            <div className="flex items-center gap-3">
              <div className="text-sm text-slate-600">Total item: <span className="font-semibold text-slate-800">{total}</span></div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Jenis:</span>
                <div className="inline-flex items-center rounded-full border border-slate-300 overflow-hidden">
                  {jenisOptions.map((opt) => (
                    <button
                      key={opt.code}
                      type="button"
                      onClick={() => setJenis(opt.code)}
                      className={`px-3 py-1.5 text-xs ${jenis === opt.code ? 'bg-slate-100 text-slate-800' : 'bg-white text-slate-600'}`}
                    >{opt.label}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-2 flex items-end">
            <button onClick={() => fetchAlergi()} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-3 py-2 text-sm shadow transition-all duration-200 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700">
              <ArrowPathIcon className="h-4 w-4" />
              Muat Ulang
            </button>
          </div>
        </div>
      </motion.div>

      {/* Status */}
      <motion.div variants={itemVariants} className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
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
          <div className="text-xs text-slate-500">Jenis</div>
          <div className="mt-1 text-sm text-slate-800">{jenisOptions.find(j => j.code === jenis)?.label || '-'}</div>
        </div>
        <div className="rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 p-4 shadow-xl shadow-blue-500/5">
          <div className="text-xs text-slate-500">Total</div>
          <div className="mt-1 text-lg font-semibold text-slate-800">{total}</div>
        </div>
      </motion.div>

      {/* Results */}
      <motion.div variants={itemVariants} className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <AnimatePresence>
            {loading && list.length === 0 ? (
              Array.from({ length: Math.min(4, 6) }).map((_, i) => (
                <motion.div key={`sk-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-4 shadow-xl shadow-blue-500/5">
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 w-24 bg-slate-200 rounded" />
                    <div className="h-5 w-full bg-slate-200 rounded" />
                    <div className="h-3 w-1/2 bg-slate-200 rounded" />
                  </div>
                </motion.div>
              ))
            ) : list.length > 0 ? (
              list.map((item, idx) => (
                <motion.div key={`${item.kdAlergi || idx}-${idx}`} variants={itemVariants} initial="hidden" animate="show" exit={{ opacity: 0 }} whileHover={{ scale: 1.01, y: -2 }} className="group relative flex flex-col rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-4 shadow-xl shadow-blue-500/5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{item.kdAlergi || '-'}</div>
                      <div className="mt-0.5 text-sm text-slate-700 leading-snug">{item.nmAlergi || '-'}</div>
                    </div>
                    <div>
                      {badge(jenisOptions.find(j => j.code === jenis)?.label || '-', 'bg-slate-100 text-slate-700')}
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
    </motion.div>
  );
}

// Render dalam AppLayout
ReferensiAlergi.layout = (page) => <SidebarBriding title="Briding Pcare">{page}</SidebarBriding>;
