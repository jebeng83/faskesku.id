import React, { useEffect, useMemo, useState } from 'react';
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

const Badge = ({ text, color }) => (
  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${color}`}>
    {text}
  </span>
);

export default function ReferensiSubSpesialis() {
  const [spesialisList, setSpesialisList] = useState([]);
  const [kdSpesialis, setKdSpesialis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({ response: { count: 0, list: [] }, metaData: { message: '', code: null } });

  // Tambahkan state untuk pencarian spesialis (typeahead)
  const [spQuery, setSpQuery] = useState('');
  const [showSpDropdown, setShowSpDropdown] = useState(false);
  const [activeSpIndex, setActiveSpIndex] = useState(0);
  const hasResult = (data?.response?.list || []).length > 0;
  const total = data?.response?.count || 0;

  const selectedSp = useMemo(() => spesialisList.find((sp) => sp.kdSpesialis === kdSpesialis), [spesialisList, kdSpesialis]);

  // Saran spesialis berdasarkan ketikan (nama/kode)
  const spesialisSuggestions = useMemo(() => {
    const q = (spQuery || '').toLowerCase().trim();
    if (!q) return spesialisList.slice(0, 8);
    return spesialisList
      .filter((sp) =>
        (sp.kdSpesialis || '').toLowerCase().includes(q) ||
        (sp.nmSpesialis || '').toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [spQuery, spesialisList]);

  const handleSpKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setShowSpDropdown(true);
      setActiveSpIndex((i) => Math.min(i + 1, Math.max(0, spesialisSuggestions.length - 1)));
    } else if (e.key === 'ArrowUp') {
      setActiveSpIndex((i) => Math.max(0, i - 1));
    } else if (e.key === 'Enter') {
      const choice = spesialisSuggestions[activeSpIndex];
      if (choice) {
        setKdSpesialis(choice.kdSpesialis);
        setSpQuery(choice.nmSpesialis);
        setShowSpDropdown(false);
      }
    }
  };

  const loadSpesialis = async () => {
    try {
      const res = await fetch('/api/pcare/spesialis', { headers: { Accept: 'application/json' } });
      const json = await res.json();
      const list = json?.response?.list || [];
      setSpesialisList(list);
      if (!kdSpesialis && list.length > 0) {
        setKdSpesialis(list[0]?.kdSpesialis || '');
        setSpQuery(list[0]?.nmSpesialis || '');
      }
    } catch (e) {
      // ignore
    }
  };

  // Sinkronkan tampilan input dengan spesialis terpilih
  useEffect(() => {
    if (kdSpesialis && selectedSp) {
      setSpQuery(selectedSp.nmSpesialis || '');
    }
  }, [kdSpesialis, selectedSp]);

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
    loadSpesialis();
  }, []);

  useEffect(() => {
    if (kdSpesialis) fetchSubSpesialis(kdSpesialis);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kdSpesialis]);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="p-4">
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-4">
        <div className="rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white p-5 shadow">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-semibold">Referensi Sub Spesialis PCare</h1>
              <p className="text-sm opacity-90">Daftar sub-spesialis dari katalog BPJS PCare berdasarkan spesialis.</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge text="GET" color="bg-white/20 text-white" />
              <Badge text="JSON" color="bg-white/20 text-white" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-stretch">
           <div className="relative md:col-span-2">
             <label className="text-xs text-slate-500">Spesialis</label>
             <input
               value={spQuery}
               onChange={(e) => { setSpQuery(e.target.value); setShowSpDropdown(true); setActiveSpIndex(0); }}
               onKeyDown={handleSpKeyDown}
               onFocus={() => setShowSpDropdown(true)}
               onBlur={() => setTimeout(() => setShowSpDropdown(false), 120)}
               className="mt-1 w-full rounded-md border-slate-300 text-sm"
               placeholder="Ketik nama/kode spesialis"
             />
             <AnimatePresence>
               {showSpDropdown && spesialisSuggestions.length > 0 && (
                 <motion.ul initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="absolute z-50 mt-1 w-full max-h-52 overflow-auto rounded border bg-white shadow">
                   {spesialisSuggestions.map((sp, i) => (
                     <li
                       key={sp.kdSpesialis}
                       className={`px-3 py-2 text-sm cursor-pointer ${i === activeSpIndex ? 'bg-emerald-50' : 'hover:bg-gray-50'}`}
                       onMouseDown={(evt) => { evt.preventDefault(); setKdSpesialis(sp.kdSpesialis); setSpQuery(sp.nmSpesialis); setShowSpDropdown(false); }}
                     >
                       <span className="font-mono mr-2">{sp.kdSpesialis}</span>
                       <span>{sp.nmSpesialis}</span>
                     </li>
                   ))}
                 </motion.ul>
               )}
             </AnimatePresence>
           </div>
           {/* Muat Ulang button removed: auto-fetch runs on kdSpesialis change */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm h-full min-h-[88px] flex flex-col justify-center">
               <div className="text-xs text-slate-500">Total</div>
               <div className="mt-1 text-lg font-semibold text-slate-800">{total}</div>
             </div>
           </div>
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm h-full min-h-[88px] flex flex-col justify-center">
               <div className="text-xs text-slate-500">Spesialis</div>
               <div className="mt-1 text-sm text-slate-800">{kdSpesialis || '-'}</div>
             </div>
           </div>
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm h-full min-h-[88px] flex flex-col justify-center">
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
         {selectedSp && (
           <div className="mt-2 text-[11px] text-slate-500">Terpilih: <span className="font-semibold text-slate-700">{selectedSp.nmSpesialis}</span> ({selectedSp.kdSpesialis})</div>
         )}
       </motion.div>

      {/* Status Bar (dipindahkan ke samping kanan tombol Muat Ulang) */}
      <motion.div variants={itemVariants} className="hidden"></motion.div>

      {/* Results */}
      <motion.div variants={itemVariants} className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <AnimatePresence>
            {loading && !hasResult ? (
              Array.from({ length: 6 }).map((_, i) => (
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
                <motion.div key={`${item.kdSubSpesialis || idx}-${idx}`} variants={itemVariants} initial="hidden" animate="show" exit={{ opacity: 0 }} className="group relative flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md">
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
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-500">
                Tidak ada data. Pilih spesialis lalu muat ulang.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

ReferensiSubSpesialis.layout = (page) => <AppLayout title="Referensi Sub Spesialis PCare" children={page} />;