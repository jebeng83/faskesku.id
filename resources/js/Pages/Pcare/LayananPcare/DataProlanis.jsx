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

export default function DataProlanis() {
  const [activeTab, setActiveTab] = useState('dm'); // 'dm' atau 'ht'
  const [nomorPeserta, setNomorPeserta] = useState('');
  const [start, setStart] = useState(1); // BPJS API tidak menerima start=0, minimal 1
  const [limit, setLimit] = useState(25);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const url = useMemo(() => {
    if (!nomorPeserta || nomorPeserta.trim() === '') return null;
    const encoded = encodeURIComponent(nomorPeserta.trim());
    const endpoint = activeTab === 'dm' ? 'prolanis/dm' : 'prolanis/ht';
    return `/api/pcare/${endpoint}/${encoded}/${start}/${limit}`;
  }, [activeTab, nomorPeserta, start, limit]);

  const fetchData = async () => {
    if (!url) {
      setData([]);
      setCount(0);
      setError('');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await fetch(url, { 
        headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        credentials: 'include',
      });
      const json = await res.json();
      
      // Parse response sesuai struktur BPJS
      const list = json?.response?.list || (Array.isArray(json?.response) ? json?.response : []);
      const finalList = Array.isArray(list) ? list : [];
      
      // Count dari response atau panjang array
      const total = json?.response?.count ?? finalList.length;
      setCount(typeof total === 'number' ? total : 0);
      setData(finalList);
      
      // Handle error messages
      // BPJS API bisa mengembalikan status 500 dengan metaData code 204 untuk "peserta tidak ditemukan"
      if (!res.ok || (json?.metaData && json.metaData.code !== 200 && json.metaData.code !== 201)) {
        const errorMsg = json?.metaData?.message || `Gagal memuat data Prolanis ${activeTab === 'dm' ? 'DM' : 'Hipertensi'}`;
        setError(errorMsg);
        setData([]);
        setCount(0);
      } else if (finalList.length === 0 && json?.metaData?.message) {
        // Jika tidak ada data tapi status OK, tampilkan pesan info
        const message = json.metaData.message;
        if (message.includes('tidak tersedia') || message.includes('tidak ditemukan')) {
          setError(message);
        } else {
          setError('');
        }
      } else {
        setError('');
      }
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Terjadi kesalahan saat memuat data';
      setError(errorMsg);
      setData([]);
      setCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handle = setTimeout(() => {
      setStart(1); // Reset ke 1 karena BPJS API tidak menerima start=0
      fetchData();
    }, 400);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nomorPeserta, limit, activeTab]);

  useEffect(() => {
    if (url) {
      fetchData();
    } else {
      setData([]);
      setCount(0);
      setError('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const onPrev = () => {
    const ps = Math.max(1, start - limit); // Minimal 1 karena BPJS API tidak menerima start=0
    setStart(ps);
  };

  const onNext = () => {
    const ns = start + limit;
    setStart(ns);
  };

  // Columns untuk tabel
  const columns = useMemo(() => {
    const defaults = ['nomor_peserta', 'nama', 'usia', 'jenis_kelamin', 'diagnosa_terakhir', 'status_prolanis'];
    const first = data && data.length > 0 ? data[0] : null;
    if (!first || typeof first !== 'object') return defaults;
    const keys = Object.keys(first);
    const hasDefaults = defaults.some((k) => keys.includes(k));
    return hasDefaults ? defaults.filter((k) => keys.includes(k)) : keys;
  }, [data]);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="p-4">
      <motion.div variants={itemVariants} className="mb-4">
        <motion.div
          variants={itemVariants}
          className="relative px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-purple-50/80 via-pink-50/80 to-rose-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm rounded-lg"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <motion.h1
                className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Data Prolanis
              </motion.h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium text-white">GET</span>
              <span className="inline-flex items-center rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium text-white">JSON</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants} className="mb-4 flex gap-2">
        <button
          type="button"
          onClick={() => {
            setActiveTab('dm');
            setStart(0);
            setData([]);
            setCount(0);
            setError('');
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'dm'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          Prolanis Diabetes Mellitus
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('ht');
            setStart(0);
            setData([]);
            setCount(0);
            setError('');
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'ht'
              ? 'bg-pink-600 text-white shadow-lg'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          Prolanis Hipertensi
        </button>
      </motion.div>

      {/* Form Pencarian */}
      <motion.form 
        variants={itemVariants} 
        onSubmit={(e) => { 
          e.preventDefault(); 
          setStart(0); 
          fetchData(); 
        }} 
        className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 p-6 shadow-xl shadow-purple-500/5"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-2">
          <div className="md:col-span-6">
            <label className="block text-xs font-medium text-slate-600 mb-1">Nomor atau Nama Peserta</label>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={nomorPeserta}
                onChange={(e) => setNomorPeserta(e.target.value)}
                placeholder="Masukkan nomor peserta atau nama"
                className="w-full pl-8 rounded-md border border-gray-300 dark:border-gray-600 px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
              />
            </div>
          </div>
          <div className="md:col-span-3">
            <label className="block text-xs font-medium text-slate-600 mb-1">Start</label>
            <input
              type="number"
              value={start}
              min={1}
              onChange={(e) => setStart(Math.max(1, Number(e.target.value) || 1))}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
            />
          </div>
          <div className="md:col-span-3">
            <label className="block text-xs font-medium text-slate-600 mb-1">Limit</label>
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value) || 25)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
            >
              {[10, 25, 50, 100].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-600">
            Total ditemukan: <span className="font-semibold text-slate-800">{count}</span>
          </div>
          <button
            type="button"
            onClick={fetchData}
            disabled={!nomorPeserta || nomorPeserta.trim() === ''}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white px-3 py-2 text-sm shadow transition-all duration-200 hover:from-purple-700 hover:via-pink-700 hover:to-rose-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
          >
            <ArrowPathIcon className="h-4 w-4" />
            Muat Data
          </button>
        </div>
      </motion.form>

      {/* Pagination */}
      <motion.div variants={itemVariants} className="mt-3 flex items-center gap-2">
        <button 
          onClick={onPrev} 
          disabled={loading || start <= 1 || !nomorPeserta} 
          className={`px-3 py-2 text-sm rounded-md border ${
            start > 1 && !loading && nomorPeserta 
              ? 'bg-white border-slate-300 hover:bg-slate-50 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700' 
              : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed dark:bg-gray-800 dark:border-gray-700'
          }`}
        >
          Prev
        </button>
        <button 
          onClick={onNext} 
          disabled={loading || (start + limit >= count && count > 0) || !nomorPeserta} 
          className={`px-3 py-2 text-sm rounded-md border ${
            (start + limit < count || count === 0) && !loading && nomorPeserta 
              ? 'bg-white border-slate-300 hover:bg-slate-50 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700' 
              : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed dark:bg-gray-800 dark:border-gray-700'
          }`}
        >
          Next
        </button>
      </motion.div>

      {/* Loading */}
      {loading && (
        <motion.div variants={itemVariants} className="mt-3 rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-4 text-xs text-slate-500">
          Memuat data Prolanis {activeTab === 'dm' ? 'Diabetes Mellitus' : 'Hipertensi'}...
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <motion.div 
          variants={itemVariants} 
          className={`mt-3 rounded-2xl border p-4 text-xs ${
            error.includes('tidak tersedia') || error.includes('tidak ditemukan')
              ? 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
              : 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300'
          }`}
        >
          <div className="flex items-start gap-2">
            {error.includes('tidak tersedia') || error.includes('tidak ditemukan') ? (
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <div>
              <strong className="font-semibold">
                {error.includes('tidak tersedia') || error.includes('tidak ditemukan') ? 'Informasi:' : 'Error:'}
              </strong>
              <span className="ml-1">{error}</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Table */}
      <motion.div variants={itemVariants} className="mt-3 overflow-x-auto rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50/60 dark:bg-gray-700/50">
            <tr>
              {columns.map((c) => {
                let label = c;
                if (c === 'nomor_peserta') label = 'Nomor Peserta';
                else if (c === 'nama') label = 'Nama';
                else if (c === 'usia') label = 'Usia';
                else if (c === 'jenis_kelamin') label = 'Jenis Kelamin';
                else if (c === 'diagnosa_terakhir') label = 'Diagnosa Terakhir';
                else if (c === 'status_prolanis') label = 'Status Prolanis';
                else label = c.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
                
                const isNumeric = c === 'usia';
                const isCenter = c === 'status_prolanis';
                return (
                  <th 
                    key={c} 
                    className={`px-3 py-2 font-semibold text-slate-700 dark:text-gray-300 ${
                      isNumeric ? 'text-right' : isCenter ? 'text-center' : 'text-left'
                    }`}
                  >
                    {label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={`row-${idx}`} className="border-t border-slate-100 dark:border-gray-700 hover:bg-slate-50/50 dark:hover:bg-gray-700/30">
                {columns.map((c) => {
                  const value = row?.[c];
                  const isNumeric = c === 'usia';
                  
                  // Format khusus untuk status_prolanis
                  if (c === 'status_prolanis') {
                    const statusColor = value === 'Sudah' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700/50 dark:text-gray-400';
                    return (
                      <td key={`${c}-${idx}`} className="px-3 py-2 text-center">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusColor}`}>
                          {value || '-'}
                        </span>
                      </td>
                    );
                  }
                  
                  // Format untuk diagnosa_terakhir (bisa berisi kode dan nama)
                  if (c === 'diagnosa_terakhir') {
                    return (
                      <td key={`${c}-${idx}`} className="px-3 py-2 text-slate-800 dark:text-gray-200">
                        <div className="max-w-md">
                          {value ? (
                            <div className="text-xs">
                              {value.split(';').map((part, i) => (
                                <div key={i} className={i === 0 ? 'font-medium' : 'text-gray-600 dark:text-gray-400'}>
                                  {part.trim()}
                                </div>
                              ))}
                            </div>
                          ) : '-'}
                        </div>
                      </td>
                    );
                  }
                  
                  // Format angka untuk usia
                  if (isNumeric) {
                    const numValue = typeof value === 'number' ? value : (typeof value === 'string' ? parseInt(value, 10) : 0);
                    return (
                      <td key={`${c}-${idx}`} className="px-3 py-2 text-slate-800 dark:text-gray-200 text-right">
                        {isNaN(numValue) ? '-' : numValue}
                      </td>
                    );
                  }
                  
                  // Default formatting
                  return (
                    <td key={`${c}-${idx}`} className="px-3 py-2 text-slate-800 dark:text-gray-200">
                      {value != null ? value.toString() : '-'}
                    </td>
                  );
                })}
              </tr>
            ))}
            {!loading && !error && data.length === 0 && nomorPeserta && (
              <tr>
                <td colSpan={columns.length || 1} className="px-3 py-6 text-center text-slate-500 text-sm">
                  Tidak ada data yang ditemukan untuk nomor/nama peserta "{nomorPeserta}".
                </td>
              </tr>
            )}
            {!loading && !error && !nomorPeserta && (
              <tr>
                <td colSpan={columns.length || 1} className="px-3 py-6 text-center text-slate-500 text-sm">
                  Masukkan nomor atau nama peserta untuk mencari data Prolanis.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}

DataProlanis.layout = (page) => <SidebarBriding title="Briding Pcare">{page}</SidebarBriding>;
