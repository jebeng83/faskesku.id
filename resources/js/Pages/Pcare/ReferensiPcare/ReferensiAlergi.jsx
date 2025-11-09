import React, { useEffect, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
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
        <div className="rounded-xl bg-gradient-to-r from-rose-500 via-red-600 to-pink-600 text-white p-5 shadow">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-semibold">Referensi Alergi PCare</h1>
              <p className="text-sm opacity-90">Daftar alergi dari katalog BPJS PCare. Pilih jenis: Makanan, Udara, atau Obat.</p>
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
        <div className="flex items-center justify-between">
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
          <button onClick={() => fetchAlergi()} className="inline-flex items-center gap-2 rounded-md bg-indigo-600 text-white px-3 py-2 text-sm shadow hover:bg-indigo-700">
            <ArrowPathIcon className="h-4 w-4" />
            Muat Ulang
          </button>
        </div>
      </motion.div>

      {/* Status */}
      <motion.div variants={itemVariants} className="mt-3">
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

      {/* Results */}
      <motion.div variants={itemVariants} className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <AnimatePresence>
            {loading && list.length === 0 ? (
              Array.from({ length: Math.min(4, 6) }).map((_, i) => (
                <motion.div key={`sk-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 w-24 bg-slate-200 rounded" />
                    <div className="h-5 w-full bg-slate-200 rounded" />
                    <div className="h-3 w-1/2 bg-slate-200 rounded" />
                  </div>
                </motion.div>
              ))
            ) : list.length > 0 ? (
              list.map((item, idx) => (
                <motion.div key={`${item.kdAlergi || idx}-${idx}`} variants={itemVariants} initial="hidden" animate="show" exit={{ opacity: 0 }} className="group relative flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md">
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
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-500">
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
ReferensiAlergi.layout = (page) => <AppLayout title="Referensi Alergi" children={page} />;