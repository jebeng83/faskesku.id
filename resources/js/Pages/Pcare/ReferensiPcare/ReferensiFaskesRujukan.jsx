import React, { useEffect, useMemo, useState } from 'react';
import SidebarBriding from '@/Layouts/SidebarBriding';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowPathIcon, CheckCircleIcon, ExclamationTriangleIcon, BuildingOfficeIcon, MagnifyingGlassIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

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

function toDdMmYyyy(input) {
  if (!input) return '';
  // Accept dd-mm-yyyy as is
  if (/^\d{2}-\d{2}-\d{4}$/.test(input)) return input;
  // Convert yyyy-mm-dd from HTML date to dd-mm-yyyy
  if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
    const [y, m, d] = input.split('-');
    return `${d}-${m}-${y}`;
  }
  return input;
}

export default function ReferensiFaskesRujukan() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({ response: { count: 0, list: [] }, metaData: { message: '', code: null } });

  // Tambahan: Spesialis/Subspesialis/Sarana cascading
  const [spesialisList, setSpesialisList] = useState([]);
  const [kdSpesialis, setKdSpesialis] = useState('');
  const [spQuery, setSpQuery] = useState('');
  const [showSpDropdown, setShowSpDropdown] = useState(false);
  const [activeSpIndex, setActiveSpIndex] = useState(0);
  const [subSpList, setSubSpList] = useState([]);
  const [saranaList, setSaranaList] = useState([]);

  // Form input
  const [kdSubSpesialis, setKdSubSpesialis] = useState('');
  const [kdSarana, setKdSarana] = useState('');
  const [tglEstRujuk, setTglEstRujuk] = useState(''); // yyyy-mm-dd from <input type="date">

  // Pencarian & pagination state
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);

  const list = data?.response?.list || [];
  const filteredList = useMemo(() => {
    if (!query) return list;
    const q = query.toLowerCase();
    return list.filter((item) => {
      const kd = String(item?.kdppk || '').toLowerCase();
      const nm = String(item?.nmppk || '').toLowerCase();
      const kc = String(item?.nmkc || '').toLowerCase();
      return kd.includes(q) || nm.includes(q) || kc.includes(q);
    });
  }, [list, query]);

  const filteredTotal = filteredList.length;
  const pageCount = Math.max(1, Math.ceil(filteredTotal / perPage));
  const currentPage = Math.min(page, pageCount);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, filteredTotal);
  const pageItems = filteredList.slice(startIndex, endIndex);
  const hasResult = pageItems.length > 0;

  const canSearch = kdSubSpesialis && kdSarana && tglEstRujuk;

  const fetchFaskesRujukan = async () => {
    if (!canSearch) {
      setError('Lengkapi input: Spesialis, Sub Spesialis, Sarana, dan Tanggal Estimasi Rujuk');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const tglParam = toDdMmYyyy(tglEstRujuk);
      const url = `/api/pcare/spesialis/rujuk/subspesialis/${encodeURIComponent(kdSubSpesialis)}/sarana/${encodeURIComponent(kdSarana)}/tglEstRujuk/${encodeURIComponent(tglParam)}`;
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      const json = await res.json();
      setData(json);
      setPage(1);
    } catch {
      setError('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  // Reset halaman ketika query/perPage berubah
  useEffect(() => {
    setPage(1);
  }, [query, perPage]);

  // Derivasi: selectedSp & saran typeahead
  const selectedSp = useMemo(() => spesialisList.find((sp) => sp.kdSpesialis === kdSpesialis), [spesialisList, kdSpesialis]);
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
    } catch {
      // ignore
    }
  };

  const fetchSubSpesialis = async (code) => {
    if (!code) return;
    try {
      const params = new URLSearchParams({ kdSpesialis: code });
      const res = await fetch(`/api/pcare/spesialis/subspesialis?${params.toString()}`, { headers: { Accept: 'application/json' } });
      const json = await res.json();
      const list = json?.response?.list || [];
      setSubSpList(list);
    } catch {
      // ignore
    }
  };

  const fetchSarana = async () => {
    try {
      const res = await fetch(`/api/pcare/spesialis/sarana`, { headers: { Accept: 'application/json' } });
      const json = await res.json();
      const list = json?.response?.list || [];
      setSaranaList(list);
    } catch {
      // ignore
    }
  };

  useEffect(() => { loadSpesialis(); }, []);

  useEffect(() => {
    // Ketika spesialis berubah, reset field berikutnya dan muat sub-spesialis
    setKdSubSpesialis('');
    setKdSarana('');
    setTglEstRujuk('');
    if (kdSpesialis) fetchSubSpesialis(kdSpesialis);
  }, [kdSpesialis]);

  useEffect(() => {
    // Ketika subspesialis dipilih, reset sarana dan tanggal, lalu muat sarana
    setKdSarana('');
    setTglEstRujuk('');
    if (kdSubSpesialis) fetchSarana();
  }, [kdSubSpesialis]);

  useEffect(() => {
    // Sinkronkan tampilan input dengan spesialis terpilih
    if (kdSpesialis && selectedSp) {
      setSpQuery(selectedSp.nmSpesialis || '');
    }
  }, [kdSpesialis, selectedSp]);

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
                Referensi Faskes Rujukan PCare
              </motion.h1>
            </div>
            <div className="flex items-center gap-2">
              {badge('GET', 'bg-white/20 text-white')}
              {badge('JSON', 'bg-white/20 text-white')}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Form Pencarian */}
      <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 p-6 shadow-xl shadow-blue-500/5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Spesialis (typeahead) */}
          <div className="relative md:col-span-4">
            <label className="block text-xs text-slate-500 mb-1">Spesialis</label>
            <input
              type="text"
              value={spQuery}
              onChange={(e) => { setSpQuery(e.target.value); setShowSpDropdown(true); setActiveSpIndex(0); }}
              onKeyDown={handleSpKeyDown}
              onFocus={() => setShowSpDropdown(true)}
              onBlur={() => setTimeout(() => setShowSpDropdown(false), 120)}
              placeholder="Ketik nama/kode spesialis"
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
            />
            <AnimatePresence>
              {showSpDropdown && spesialisSuggestions.length > 0 && (
                <motion.ul initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="absolute z-50 mt-1 w-full max-h-52 overflow-auto rounded border bg-white shadow">
                  {spesialisSuggestions.map((sp, i) => (
                    <li
                      key={sp.kdSpesialis}
                      className={`px-3 py-2 text-sm cursor-pointer ${i === activeSpIndex ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}
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

          {/* Sub Spesialis (pilih setelah Spesialis) */}
          <div className="md:col-span-3">
            <label className="block text-xs text-slate-500 mb-1">Sub Spesialis</label>
            <select
              value={kdSubSpesialis}
              onChange={(e) => setKdSubSpesialis(e.target.value)}
              disabled={!kdSpesialis || subSpList.length === 0}
              className={`w-full rounded-md border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${!kdSpesialis || subSpList.length === 0 ? 'border-slate-200 text-slate-400' : 'border-gray-300 dark:border-gray-600 text-slate-700'}`}
            >
              <option value="" disabled>Pilih sub spesialis…</option>
              {subSpList.map((ss) => (
                <option key={ss.kdSubSpesialis} value={ss.kdSubSpesialis}>
                  {ss.nmSubSpesialis} ({ss.kdSubSpesialis})
                </option>
              ))}
            </select>
          </div>

          {/* Sarana (aktif setelah Sub Spesialis terpilih) */}
          <div className="md:col-span-3">
            <label className="block text-xs text-slate-500 mb-1">Sarana</label>
            <select
              value={kdSarana}
              onChange={(e) => setKdSarana(e.target.value)}
              disabled={!kdSubSpesialis || saranaList.length === 0}
              className={`w-full rounded-md border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${!kdSubSpesialis || saranaList.length === 0 ? 'border-slate-200 text-slate-400' : 'border-gray-300 dark:border-gray-600 text-slate-700'}`}
            >
              <option value="" disabled>Pilih sarana…</option>
              {saranaList.map((s) => (
                <option key={s.kdSarana} value={s.kdSarana}>
                  {s.nmSarana} ({s.kdSarana})
                </option>
              ))}
            </select>
          </div>

          {/* Tanggal Estimasi Rujuk (aktif setelah Sarana terpilih) */}
          <div className="md:col-span-2">
            <label className="block text-xs text-slate-500 mb-1">Tanggal Estimasi Rujuk</label>
            <div className="relative">
              <CalendarDaysIcon className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="date"
                value={tglEstRujuk}
                onChange={(e) => setTglEstRujuk(e.target.value)}
                disabled={!kdSarana}
                className={`w-full rounded-md border bg-white pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${!kdSarana ? 'border-slate-200 text-slate-400' : 'border-gray-300 dark:border-gray-600 text-slate-700'}`}
              />
            </div>
            <div className="mt-1 text-[10px] text-slate-400">Format dikirim: dd-mm-yyyy</div>
          </div>

          {/* Tombol Cari */}
          <div className="md:col-span-12 lg:col-span-2 flex items-end">
            <button
              type="button"
              onClick={fetchFaskesRujukan}
              disabled={!canSearch || loading}
              className={`w-full md:w-auto inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs shadow transition-all duration-200 ${!canSearch || loading ? 'bg-slate-50 text-slate-400 border border-slate-200' : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white'}`}
            >
              {loading ? 'Memuat…' : 'Cari Faskes Rujukan'}
            </button>
          </div>
        </div>

        {/* Status & Search */}
        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
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

          <div className="w-full md:w-80">
            <label className="block text-xs text-slate-500 mb-1">Cari faskes</label>
            <div className="relative">
              <MagnifyingGlassIcon className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari faskes (kode/nama/kotamadya)…"
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white pl-8 pr-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
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
                <motion.div key={`sk-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-4 shadow-xl shadow-blue-500/5">
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 w-24 bg-slate-200 rounded" />
                    <div className="h-5 w-full bg-slate-200 rounded" />
                    <div className="h-3 w-1/2 bg-slate-200 rounded" />
                  </div>
                </motion.div>
              ))
            ) : hasResult ? (
              pageItems.map((item, idx) => (
                <motion.div key={`${item.kdppk || idx}-${idx}`} variants={itemVariants} initial="hidden" animate="show" exit={{ opacity: 0 }} whileHover={{ scale: 1.01, y: -2 }} className="group relative flex flex-col rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-4 shadow-xl shadow-blue-500/5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{item.kdppk || '-'}</div>
                      <div className="mt-0.5 text-sm text-slate-700 leading-snug">{item.nmppk || '-'}</div>
                      <div className="mt-1 text-xs text-slate-500">{item.alamatPpk || '-'}</div>
                      <div className="mt-1 text-[11px] text-slate-500">Telp: {item.telpPpk || '-'}</div>
                      <div className="mt-1 text-[11px] text-slate-500">Kelas: {item.kelas || '-'} • {item.nmkc || '-'}</div>
                      {item.jadwal && (
                        <div className="mt-1 text-[11px] text-slate-500">Jadwal: {item.jadwal}</div>
                      )}
                      <div className="mt-1 text-[11px] text-slate-500">Jarak: {item.distance ? `${Number(item.distance).toFixed(0)} m` : '-'}</div>
                      <div className="mt-1 text-[11px] text-slate-500">Kapasitas: {item.kapasitas ?? '-'} • Rujuk: {item.jmlRujuk ?? '-'} • %: {item.persentase ?? '-'}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      {badge('Faskes', 'bg-slate-100 text-slate-700')}
                      <BuildingOfficeIcon className="h-4 w-4 text-slate-500" />
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-6 text-center text-slate-500">
                Tidak ada data. Isi parameter dan klik "Cari Faskes Rujukan".
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Pagination */}
      <motion.div variants={itemVariants} className="mt-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-4 shadow-xl shadow-blue-500/5">
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
              className={`px-3 py-1.5 text-xs rounded-md border ${currentPage <= 1 ? 'bg-slate-50 text-slate-400 border-slate-200' : 'bg-white text-slate-700 border-gray-300 hover:bg-slate-50'}`}
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
              className={`px-3 py-1.5 text-xs rounded-md border ${currentPage >= pageCount ? 'bg-slate-50 text-slate-400 border-slate-200' : 'bg-white text-slate-700 border-gray-300 hover:bg-slate-50'}`}
            >
              Next
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-500">Per halaman</label>
            <select
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
              className="rounded-md border border-gray-300 dark:border-gray-600 bg-white px-2 py-1 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
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
ReferensiFaskesRujukan.layout = (page) => <SidebarBriding title="Briding Pcare">{page}</SidebarBriding>;
