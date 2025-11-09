import React, { useEffect, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowPathIcon, CheckCircleIcon, ExclamationTriangleIcon, IdentificationIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

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

export default function ReferensiKhusus() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({ response: { count: 0, list: [] }, metaData: { message: '', code: null } });

  // Pencarian & pagination state
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);

  // Derived data
  const list = data?.response?.list || [];
  const total = data?.response?.count ?? list.length;
  const filteredList = query
    ? list.filter((item) => {
        const k = String(item?.kdKhusus || '').toLowerCase();
        const n = String(item?.nmKhusus || '').toLowerCase();
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

  const fetchKhusus = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/pcare/spesialis/khusus`, { headers: { Accept: 'application/json' } });
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError(e?.message || 'Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKhusus();
  }, []);

  // Reset halaman ketika query/perPage berubah
  useEffect(() => {
    setPage(1);
  }, [query, perPage]);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="p-4">
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-4">
        <div className="rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-600 to-purple-600 text-white p-5 shadow">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-semibold">Referensi Khusus PCare</h1>
              <p className="text-sm opacity-90">Daftar referensi khusus dari katalog BPJS PCare.</p>
            </div>
            <div className="flex items-center gap-2">
              {badge('GET', 'bg-white/20 text-white')}
              {badge('JSON', 'bg-white/20 text-white')}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Card: Total Item + Status + Pencarian */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
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
                  <ArrowPathIcon className="h-4 w-4 animate-spin text-indigo-600" />
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
            <label className="block text-xs text-slate-500 mb-1">Cari khusus</label>
            <div className="relative">
              <MagnifyingGlassIcon className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari khusus (kode/nama)…"
                className="w-full rounded-md border border-slate-300 bg-white pl-8 pr-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Results */}
      <motion.div variants={itemVariants} className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <AnimatePresence>
            {loading && !hasResult ? (
              Array.from({ length: Math.min(4, 6) }).map((_, i) => (
                <motion.div key={`sk-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 w-24 bg-slate-200 rounded" />
                    <div className="h-5 w-full bg-slate-200 rounded" />
                    <div className="h-3 w-1/2 bg-slate-200 rounded" />
                  </div>
                </motion.div>
              ))
            ) : hasResult ? (
              pageItems.map((item, idx) => (
                <motion.div key={`${item.kdKhusus || idx}-${idx}`} variants={itemVariants} initial="hidden" animate="show" exit={{ opacity: 0 }} className="group relative flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{item.kdKhusus || '-'}</div>
                      <div className="mt-0.5 text-sm text-slate-700 leading-snug">{item.nmKhusus || '-'}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      {badge('Khusus', 'bg-slate-100 text-slate-700')}
                      <IdentificationIcon className="h-4 w-4 text-slate-500" />
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

      {/* Pagination */}
      <motion.div variants={itemVariants} className="mt-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="text-xs text-slate-600">
            Menampilkan <span className="font-medium text-slate-800">{filteredTotal === 0 ? 0 : startIndex + 1}</span>
            –
            <span className="font-medium text-slate-800">{filteredTotal === 0 ? 0 : endIndex}</span>
            dari <span className="font-medium text-slate-800">{filteredTotal}</span> item
            {query && <span className="ml-1 text-slate-500">(hasil pencarian)</span>}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className={`px-3 py-1.5 text-xs rounded-md border ${currentPage <= 1 ? 'bg-slate-50 text-slate-400 border-slate-200' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}
            >
              Prev
            </button>
            <div className="text-[11px] text-slate-500">
              Halaman <span className="font-semibold text-slate-700">{currentPage}</span>/<span className="text-slate-700">{pageCount}</span>
            </div>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={currentPage >= pageCount}
              className={`px-3 py-1.5 text-xs rounded-md border ${currentPage >= pageCount ? 'bg-slate-50 text-slate-400 border-slate-200' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}
            >
              Next
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-500">Per halaman</label>
            <select
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
              className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700 focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value={9}>9</option>
              <option value={12}>12</option>
              <option value={18}>18</option>
              <option value={24}>24</option>
            </select>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Render dalam AppLayout
ReferensiKhusus.layout = (page) => <AppLayout title="Referensi Khusus" children={page} />;