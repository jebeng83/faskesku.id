import React, { useEffect, useState } from 'react';
import LayoutUtama from '@/Pages/LayoutUtama';
import { BridingMenu } from '@/Layouts/SidebarBriding';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowPathIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import SearchableSelect from '@/Components/SearchableSelect';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 }
};

const Badge = ({ text, color }) => (
  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${color}`}>
    {text}
  </span>
);

export default function ReferensiSubSpesialis() {
  const [kdSpesialis, setKdSpesialis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({ response: { count: 0, list: [] }, metaData: { message: '', code: null } });

  const hasResult = (data?.response?.list || []).length > 0;
  const total = data?.response?.count || 0;

  const fetchSubSpesialis = async (code = kdSpesialis) => {
    if (!code) return;
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ kdSpesialis: code });
      const res = await fetch(`/api/pcare/spesialis/subspesialis?${params.toString()}`, { headers: { Accept: 'application/json' } });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.metaData?.message || 'Gagal memuat sub-spesialis');
      setData(json);
    } catch (e) {
      setError(e?.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial load removed as SearchableSelect handles it or the effect below triggers it
  }, []);

  useEffect(() => {
    if (kdSpesialis) fetchSubSpesialis(kdSpesialis);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kdSpesialis]);

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
                Referensi Sub Spesialis PCare
              </motion.h1>
            </div>
            <div className="flex items-center gap-2">
              <Badge text="GET" color="bg-white/20 text-white" />
              <Badge text="JSON" color="bg-white/20 text-white" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Controls */}
      <motion.div variants={itemVariants} className="relative rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 p-6 shadow-xl shadow-blue-500/5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
          <div className="relative md:col-span-6">
            <label className="text-xs text-slate-500">Spesialis</label>
            <SearchableSelect
              source="spesialis"
              value={kdSpesialis}
              onChange={(val) => setKdSpesialis(val)}
              placeholder="Pilih spesialis..."
              className="mt-1"
            />
          </div>
          {/* Muat Ulang button removed: auto-fetch runs on kdSpesialis change */}
          <div className="md:col-span-2">
            <div className="rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 p-4 shadow-xl shadow-blue-500/5 h-full min-h-[88px] flex flex-col justify-center">
              <div className="text-xs text-slate-500">Total</div>
              <div className="mt-1 text-lg font-semibold text-slate-800">{total}</div>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 p-4 shadow-xl shadow-blue-500/5 h-full min-h-[88px] flex flex-col justify-center">
              <div className="text-xs text-slate-500">Spesialis</div>
              <div className="mt-1 text-sm text-slate-800">{kdSpesialis || '-'}</div>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 p-4 shadow-xl shadow-blue-500/5 h-full min-h-[88px] flex flex-col justify-center">
              <div className="text-xs text-slate-500">Status</div>
              <div className="mt-1 flex items-center gap-2">
                {loading ? (
                  <>
                    <ArrowPathIcon className="h-4 w-4 animate-spin text-cyan-600" />
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
          </div>
        </div>
      </motion.div>

      {/* Status Bar (dipindahkan ke samping kanan tombol Muat Ulang) */}
      <motion.div variants={itemVariants} className="hidden"></motion.div>

      {/* Results */}
      <motion.div variants={itemVariants} className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <AnimatePresence>
            {loading && !hasResult ? (
              Array.from({ length: 6 }).map((_, i) => (
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
                <motion.div key={`${item.kdSubSpesialis || idx}-${idx}`} variants={itemVariants} initial="hidden" animate="show" exit={{ opacity: 0 }} whileHover={{ scale: 1.01, y: -2 }} className="group relative flex flex-col rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-4 shadow-xl shadow-blue-500/5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                        {item.kdSubSpesialis || '-'}
                      </div>
                      <div className="mt-0.5 text-sm text-slate-700 leading-snug">{item.nmSubSpesialis || '-'}</div>
                      <div className="mt-0.5 text-[11px] text-slate-500">Poli Rujuk: <span className="font-mono">{item.kdPoliRujuk || '-'}</span></div>
                    </div>
                    <div>
                      <Badge text="SubSpesialis" color="bg-slate-100 text-slate-700" />
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-6 text-center text-slate-500">
                Tidak ada data. Pilih spesialis lalu muat ulang.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

ReferensiSubSpesialis.layout = (page) => <LayoutUtama title="Briding Pcare" left={<BridingMenu />}>{page}</LayoutUtama>;
