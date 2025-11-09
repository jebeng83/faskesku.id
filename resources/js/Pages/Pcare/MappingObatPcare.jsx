import React, { useEffect, useMemo, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Toaster, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/Components/ui';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowPathIcon, CheckCircleIcon, ExclamationTriangleIcon, MagnifyingGlassIcon, PlusIcon, PencilSquareIcon, TrashIcon, XMarkIcon, ArrowsUpDownIcon, BeakerIcon } from '@heroicons/react/24/outline';

const containerVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

const dropdownVariants = {
  initial: { opacity: 0, y: 8, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, y: 4, scale: 0.98, transition: { duration: 0.12 } },
};

export default function MappingObatPcare() {
  // Toast state
  const [toasts, setToasts] = useState([]);
  const showToast = ({ type = 'info', title, message, duration = 3000 }) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);
  };
  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  // Search inputs
  const [qRs, setQRs] = useState('');
  const [qBpjs, setQBpjs] = useState('');

  // RS Obat state (databarang)
  const [rsLoading, setRsLoading] = useState(false);
  const [rsError, setRsError] = useState(null);
  const [rsList, setRsList] = useState([]); // items: { kode_brng, nama_brng }
  const [selectedRs, setSelectedRs] = useState(null);
  const [showRsDropdown, setShowRsDropdown] = useState(false);
  const [rsAutoFetchLocked, setRsAutoFetchLocked] = useState(false);

  // BPJS DPHO state
  const [bpjsLoading, setBpjsLoading] = useState(false);
  const [bpjsError, setBpjsError] = useState(null);
  const [bpjsList, setBpjsList] = useState([]); // items: { kdObat, nmObat }
  const [selectedBpjs, setSelectedBpjs] = useState(null);
  const [showBpjsDropdown, setShowBpjsDropdown] = useState(false);

  // Mapping table
  const [mapLoading, setMapLoading] = useState(false);
  const [mapError, setMapError] = useState(null);
  const [mappings, setMappings] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  // Query for filtering Data Mapping list
  const [mapQuery, setMapQuery] = useState('');

  // Pagination
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const q = mapQuery.trim().toLowerCase();
  const filteredRows = useMemo(() => {
    if (!q) return mappings;
    return (mappings || []).filter((row) => (
      String(row?.kode_brng || '').toLowerCase().includes(q) ||
      String(row?.kode_brng_pcare || '').toLowerCase().includes(q) ||
      String(row?.nama_brng_pcare || '').toLowerCase().includes(q)
    ));
  }, [mappings, q]);
  const totalRows = filteredRows.length;
  const pageCount = Math.max(1, Math.ceil(totalRows / perPage || 1));
  const startIndex = Math.min((page - 1) * perPage, Math.max(0, totalRows - 1));
  const endIndexExclusive = Math.min(startIndex + perPage, totalRows);
  const visibleRows = useMemo(() => filteredRows.slice(startIndex, endIndexExclusive), [filteredRows, startIndex, endIndexExclusive]);
  useEffect(() => { if (page > pageCount) setPage(pageCount); }, [pageCount]);
  useEffect(() => { setPage(1); }, [perPage, mapQuery]);

  // Save status
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  const fetchRs = async (keyword = '') => {
    setRsLoading(true);
    setRsError(null);
    try {
      const params = new URLSearchParams();
      if (keyword) params.set('q', keyword);
      const res = await fetch(`/pcare/api/rs/obat?${params.toString()}`, { headers: { Accept: 'application/json' } });
      const json = await res.json();
      setRsList(Array.isArray(json?.data) ? json.data : []);
    } catch (e) {
      setRsError(e?.message || 'Gagal memuat obat RS');
      showToast({ type: 'error', title: 'Gagal Memuat', message: e?.message || 'Tidak dapat memuat data obat RS' });
    } finally {
      setRsLoading(false);
    }
  };

  const fetchBpjs = async () => {
    setBpjsLoading(true);
    setBpjsError(null);
    try {
      // Ambil daftar DPHO (100 item pertama untuk pencarian cepat)
      const res = await fetch(`/api/pcare/dpho?start=0&limit=100`, { headers: { Accept: 'application/json' } });
      const json = await res.json();
      const list = json?.response?.list || [];
      setBpjsList(Array.isArray(list) ? list : []);
    } catch (e) {
      setBpjsError(e?.message || 'Gagal memuat referensi DPHO');
      showToast({ type: 'error', title: 'Gagal Memuat', message: e?.message || 'Tidak dapat memuat referensi DPHO' });
    } finally {
      setBpjsLoading(false);
    }
  };

  const fetchMappings = async () => {
    setMapLoading(true);
    setMapError(null);
    try {
      const res = await fetch(`/pcare/api/mapping/obat`, { headers: { Accept: 'application/json' } });
      const json = await res.json();
      setMappings(Array.isArray(json?.data) ? json.data : []);
    } catch (e) {
      setMapError(e?.message || 'Gagal memuat data mapping');
      showToast({ type: 'error', title: 'Gagal Memuat', message: e?.message || 'Tidak dapat memuat data mapping obat' });
    } finally {
      setMapLoading(false);
    }
  };

  useEffect(() => {
    fetchRs('');
    fetchBpjs();
    fetchMappings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredBpjs = useMemo(() => {
    if (!qBpjs) return bpjsList;
    const q = qBpjs.toLowerCase();
    return (bpjsList || []).filter((it) => (
      String(it?.kdObat || '').toLowerCase().includes(q) ||
      String(it?.nmObat || '').toLowerCase().includes(q)
    ));
  }, [bpjsList, qBpjs]);

  const handleSelectRs = (it) => {
    setSelectedRs(it);
    setQRs(`${it.kode_brng} — ${it.nama_brng}`);
    setShowRsDropdown(false);
    setRsAutoFetchLocked(true);
  };

  const handleSelectBpjs = (it) => {
    setSelectedBpjs(it);
    setQBpjs(`${it.kdObat || '-'} — ${it.nmObat || '-'}`);
    setShowBpjsDropdown(false);
  };

  // Auto fetch RS obat when typing 2+ characters (debounced)
  useEffect(() => {
    if (rsAutoFetchLocked) return;
    const term = qRs.trim();
    const t = setTimeout(() => {
      if (term.length >= 2) {
        fetchRs(term);
      } else if (term.length === 0) {
        fetchRs('');
      }
    }, 300);
    return () => clearTimeout(t);
  }, [qRs, rsAutoFetchLocked]);

  const onSave = async () => {
    if (!selectedRs || !selectedBpjs) {
      setSaveMsg('Pilih obat RS dan obat BPJS (DPHO) terlebih dahulu');
      showToast({ type: 'warning', title: 'Validasi', message: 'Pilih obat RS dan obat BPJS (DPHO) terlebih dahulu' });
      return;
    }
    setSaving(true);
    setSaveMsg('');
    try {
      const payload = {
        kode_brng: selectedRs.kode_brng,
        kode_brng_pcare: selectedBpjs.kdObat,
        nama_brng_pcare: selectedBpjs.nmObat || '',
      };
      const csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
      const res = await fetch('/pcare/api/mapping/obat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-CSRF-TOKEN': csrf, 'X-Requested-With': 'XMLHttpRequest' },
        credentials: 'same-origin',
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (res.ok) {
        setSaveMsg(json?.metaData?.message || (editingRow ? 'Berhasil menyimpan perubahan' : 'Berhasil menyimpan mapping'));
        fetchMappings();
        setEditingRow(null);
        showToast({ type: 'success', title: 'Tersimpan', message: json?.metaData?.message || (editingRow ? 'Perubahan mapping obat tersimpan' : 'Mapping obat berhasil ditambahkan') });
      } else {
        setSaveMsg(json?.metaData?.message || 'Gagal menyimpan mapping');
        showToast({ type: 'error', title: 'Gagal Menyimpan', message: json?.metaData?.message || 'Terjadi kesalahan saat menyimpan mapping' });
      }
    } catch (e) {
      setSaveMsg(e?.message || 'Gagal menyimpan mapping');
      showToast({ type: 'error', title: 'Gagal Menyimpan', message: e?.message || 'Terjadi kesalahan saat menyimpan mapping' });
    } finally {
      setSaving(false);
    }
  };

  const onEdit = (row) => {
    setEditingRow(row);
    const rs = (rsList || []).find((r) => r.kode_brng === row.kode_brng) || { kode_brng: row.kode_brng, nama_brng: '' };
    setSelectedRs(rs);
    setQRs(rs.nama_brng ? `${rs.kode_brng} — ${rs.nama_brng}` : `${rs.kode_brng}`);
    setShowRsDropdown(false);
    setRsAutoFetchLocked(true);

    const bp = (bpjsList || []).find((b) => (b.kdObat || '') === (row.kode_brng_pcare || '')) || { kdObat: row.kode_brng_pcare, nmObat: row.nama_brng_pcare };
    setSelectedBpjs(bp);
    const nmBpjs = bp.nmObat || row.nama_brng_pcare || '';
    setQBpjs(nmBpjs ? `${bp.kdObat} — ${nmBpjs}` : `${bp.kdObat || ''}`);
    setShowBpjsDropdown(false);
  };

  const onCancelEdit = () => {
    setEditingRow(null);
    setSelectedRs(null);
    setSelectedBpjs(null);
    setSaveMsg('');
  };

  const onDelete = async (row) => {
    if (!confirm(`Hapus mapping untuk RS ${row.kode_brng} -> BPJS ${row.kode_brng_pcare}?`)) return;
    setSaving(true);
    setSaveMsg('');
    try {
      const csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
      const res = await fetch('/pcare/api/mapping/obat', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-CSRF-TOKEN': csrf, 'X-Requested-With': 'XMLHttpRequest' },
        credentials: 'same-origin',
        body: JSON.stringify({ kode_brng: row.kode_brng, kode_brng_pcare: row.kode_brng_pcare }),
      });
      const json = await res.json();
      if (res.ok) {
        setSaveMsg(json?.metaData?.message || 'Berhasil menghapus mapping');
        fetchMappings();
        if (editingRow && editingRow.kode_brng === row.kode_brng) {
          onCancelEdit();
        }
        showToast({ type: 'success', title: 'Terhapus', message: json?.metaData?.message || 'Mapping obat berhasil dihapus' });
      } else {
        setSaveMsg(json?.metaData?.message || 'Gagal menghapus mapping');
        showToast({ type: 'error', title: 'Gagal Menghapus', message: json?.metaData?.message || 'Terjadi kesalahan saat menghapus mapping' });
      }
    } catch (e) {
      setSaveMsg(e?.message || 'Gagal menghapus mapping');
      showToast({ type: 'error', title: 'Gagal Menghapus', message: e?.message || 'Terjadi kesalahan saat menghapus mapping' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="p-4">
      {/* Toaster */}
      <Toaster toasts={toasts} onRemove={removeToast} />
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-4">
        <div className="rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 text-white p-5 shadow">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-semibold">Mapping Obat PCare</h1>
              <p className="text-sm opacity-90">Hubungkan obat RS (databarang) ke DPHO PCare.</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex items-center rounded-full bg-white/20 px-2 py-0.5">Form</span>
              <span className="inline-flex items-center rounded-full bg-white/20 px-2 py-0.5">Datatable</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search Inputs */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* RS Obat */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-teal-200 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-800">Obat RS</div>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => fetchRs(qRs)}
              className="inline-flex items-center gap-2 rounded-md bg-slate-800 text-white px-3 py-1.5 text-xs shadow hover:bg-slate-700"
            >
              <ArrowPathIcon className="h-4 w-4" /> Muat
            </motion.button>
          </div>
          <div className="mt-2 relative">
            <div className="flex items-center gap-2 group">
              <MagnifyingGlassIcon className="h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={qRs}
                onChange={(e) => { setQRs(e.target.value); setShowRsDropdown(true); setRsAutoFetchLocked(false); }}
                onKeyDown={(e) => { if (e.key === 'Enter') fetchRs(qRs); if (e.key === 'Escape') setShowRsDropdown(false); }}
                onFocus={() => setShowRsDropdown(true)}
                placeholder="Cari kode/nama obat RS…"
                className="w-full rounded-xl border-2 border-slate-300 text-base px-3 py-2 placeholder-slate-400 shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition"
              />
            </div>
            <AnimatePresence>
              {showRsDropdown && (
                <motion.div
                  variants={dropdownVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute left-0 right-0 mt-1 z-20 bg-white/95 backdrop-blur border-2 border-slate-200 rounded-xl shadow-lg ring-1 ring-black/5 max-h-56 overflow-y-auto"
                >
                {rsLoading ? (
                  <div className="p-3 text-sm text-slate-500">Memuat…</div>
                ) : rsError ? (
                  <div className="p-3 text-sm text-red-600">{rsError}</div>
                ) : (rsList || []).length > 0 ? (
                  rsList.map((it) => (
                    <motion.button
                      whileHover={{ backgroundColor: 'rgba(13,148,136,0.08)' }}
                      type="button"
                      key={it.kode_brng}
                      onClick={() => handleSelectRs(it)}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors ${selectedRs?.kode_brng === it.kode_brng ? 'bg-slate-100' : ''}`}
                    >
                      <div className="font-medium text-slate-800">{it.kode_brng}</div>
                      <div className="text-slate-600">{it.nama_brng}</div>
                    </motion.button>
                  ))
                ) : (
                  <div className="p-3 text-sm text-slate-500">Tidak ada data</div>
                )}
                </motion.div>
              )}
            </AnimatePresence>
            {selectedRs && (
              <div className="mt-2 text-xs text-slate-600">Dipilih: {selectedRs.kode_brng} — {selectedRs.nama_brng}</div>
            )}
          </div>
        </div>

        {/* BPJS DPHO */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-teal-200 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-800">Obat BPJS (DPHO)</div>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => fetchBpjs()}
              className="inline-flex items-center gap-2 rounded-md bg-slate-800 text-white px-3 py-1.5 text-xs shadow hover:bg-slate-700"
            >
              <ArrowPathIcon className="h-4 w-4" /> Muat
            </motion.button>
          </div>
          <div className="mt-2">
            <div className="flex items-center gap-2 group">
              <MagnifyingGlassIcon className="h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={qBpjs}
                onChange={(e) => { setQBpjs(e.target.value); setShowBpjsDropdown(true); }}
                onKeyDown={(e) => { if (e.key === 'Escape') setShowBpjsDropdown(false); }}
                onFocus={() => setShowBpjsDropdown(true)}
                placeholder="Cari kode/nama obat BPJS…"
                className="w-full rounded-xl border-2 border-slate-300 text-base px-3 py-2 placeholder-slate-400 shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition"
              />
            </div>
            <AnimatePresence>
              {showBpjsDropdown && (
                <motion.div
                  variants={dropdownVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="mt-1 z-20 bg-white/95 backdrop-blur border-2 border-slate-200 rounded-xl shadow-lg ring-1 ring-black/5 max-h-56 overflow-y-auto"
                >
                {bpjsLoading ? (
                  <div className="p-3 text-sm text-slate-500">Memuat…</div>
                ) : bpjsError ? (
                  <div className="p-3 text-sm text-red-600">{bpjsError}</div>
                ) : filteredBpjs.length > 0 ? (
                  filteredBpjs.map((it, idx) => (
                    <motion.button
                      whileHover={{ backgroundColor: 'rgba(13,148,136,0.08)' }}
                      type="button"
                      key={`${it.kdObat || idx}-${idx}`}
                      onClick={() => handleSelectBpjs(it)}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors ${selectedBpjs?.kdObat === it.kdObat ? 'bg-slate-100' : ''}`}
                    >
                      <div className="font-medium text-slate-800">{it.kdObat || '-'}</div>
                      <div className="text-slate-600">{it.nmObat || '-'}</div>
                    </motion.button>
                  ))
                ) : (
                  <div className="p-3 text-sm text-slate-500">Tidak ada data</div>
                )}
                </motion.div>
              )}
            </AnimatePresence>
            {selectedBpjs && (
              <div className="mt-2 text-xs text-slate-600">Dipilih: {selectedBpjs.kdObat} — {selectedBpjs.nmObat}</div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Action Save */}
      <motion.div variants={itemVariants} className="mt-3 flex items-center gap-2">
        <motion.button
          type="button"
          onClick={onSave}
          disabled={saving || !selectedRs || !selectedBpjs}
          className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm shadow ${saving || !selectedRs || !selectedBpjs ? 'bg-slate-200 text-slate-500 cursor-not-allowed' : (editingRow ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-teal-600 text-white hover:bg-teal-700')}`}
          whileHover={{ scale: (saving || !selectedRs || !selectedBpjs) ? 1 : 1.02 }}
          whileTap={{ scale: (saving || !selectedRs || !selectedBpjs) ? 1 : 0.97 }}
        >
          {editingRow ? <CheckCircleIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />} {editingRow ? 'Simpan Perubahan' : 'Tambah Mapping'}
        </motion.button>
        {editingRow && (
          <motion.button
            type="button"
            onClick={onCancelEdit}
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm shadow bg-slate-100 text-slate-700 hover:bg-slate-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <XMarkIcon className="h-4 w-4" /> Batal Edit
          </motion.button>
        )}
        {saveMsg && (
          <div className="text-xs text-slate-600">{saveMsg}</div>
        )}
      </motion.div>

      {/* Data Mapping - card model */}
      <motion.div variants={itemVariants} className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-slate-800">Data Mapping</div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            {mapLoading ? (
              <span className="inline-flex items-center gap-1"><ArrowPathIcon className="h-4 w-4 animate-spin" /> Memuat…</span>
            ) : mapError ? (
              <span className="inline-flex items-center gap-1 text-red-600"><ExclamationTriangleIcon className="h-4 w-4" /> {mapError}</span>
            ) : (
              <span className="inline-flex items-center gap-1"><CheckCircleIcon className="h-4 w-4 text-emerald-600" /> Siap</span>
            )}
          </div>
        </div>

        {/* Toolbar: Cari & Tampilkan */}
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex-1 max-w-md">
            <div className="flex items-center gap-2">
              <span className="text-sm">Cari mapping:</span>
              <div className="flex items-center gap-2 flex-1">
                <MagnifyingGlassIcon className="h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  value={mapQuery}
                  onChange={(e) => { setMapQuery(e.target.value); setPage(1); }}
                  placeholder="Cari obat RS/BPJS…"
                  className="w-full rounded-xl border-2 border-slate-300 text-sm px-3 py-1.5 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Tampilkan</span>
            <Select value={String(perPage)} onValueChange={(val) => { setPerPage(Number(val)); setPage(1); }}>
              <SelectTrigger className="w-[90px] h-8 text-xs">
                <SelectValue placeholder="Jumlah" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm">data</span>
          </div>
        </div>

        {/* Header columns (responsive) */}
        <div className="mt-3 hidden md:grid grid-cols-12 gap-2 text-xs text-slate-600">
          <div className="col-span-1 px-2 flex items-center gap-1">No <ArrowsUpDownIcon className="h-3 w-3" /></div>
          <div className="col-span-3 px-2 flex items-center gap-1">Kode Obat RS <ArrowsUpDownIcon className="h-3 w-3" /></div>
          <div className="col-span-3 px-2 flex items-center gap-1">Kode Obat BPJS <ArrowsUpDownIcon className="h-3 w-3" /></div>
          <div className="col-span-4 px-2">Nama Obat BPJS</div>
          <div className="col-span-1 px-2 text-right">Aksi</div>
        </div>

        {/* Card list */}
        <div className="mt-1 space-y-2">
          {visibleRows.map((row, idx) => (
            <div
              key={`${row.kode_brng}-${row.kode_brng_pcare || ''}-${idx}`}
              className="grid grid-cols-12 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm hover:shadow transition"
            >
              {/* No */}
              <div className="col-span-1">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
                  {startIndex + idx + 1}
                </span>
              </div>
              {/* Kode Obat RS */}
              <div className="col-span-12 md:col-span-3">
                <div className="flex items-center gap-2">
                  <BeakerIcon className="h-5 w-5 text-slate-500" />
                  <div className="text-sm font-medium text-slate-800">{row.kode_brng}</div>
                </div>
              </div>
              {/* Kode Obat BPJS */}
              <div className="col-span-6 md:col-span-3">
                <span className="inline-flex items-center rounded-full bg-sky-100 text-sky-700 px-2 py-0.5 text-xs">
                  {row.kode_brng_pcare}
                </span>
              </div>
              {/* Nama Obat BPJS */}
              <div className="col-span-6 md:col-span-4">
                <span className="text-sm text-slate-700">
                  {row.nama_brng_pcare || '-'}
                </span>
              </div>
              {/* Aksi */}
              <div className="col-span-12 md:col-span-1 md:text-right">
                <div className="flex md:justify-end items-center gap-2">
                  <motion.button
                    type="button"
                    onClick={() => onEdit(row)}
                    className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs bg-sky-600 text-white hover:bg-sky-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <PencilSquareIcon className="h-4 w-4" /> Edit
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => onDelete(row)}
                    className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs bg-red-600 text-white hover:bg-red-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <TrashIcon className="h-4 w-4" /> Hapus
                  </motion.button>
                </div>
              </div>
            </div>
          ))}

          {!totalRows && (
            <div className="rounded-lg border border-slate-200 bg-white px-3 py-4 text-center text-slate-500">
              Belum ada mapping
            </div>
          )}
        </div>

        {/* Pagination controls */}
        <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
          <div>
            Menampilkan {totalRows === 0 ? 0 : startIndex + 1}–{totalRows === 0 ? 0 : endIndexExclusive} dari {totalRows} data
          </div>
          <div className="inline-flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className={`px-2 py-1 rounded-md border ${page <= 1 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
            >
              Prev
            </button>
            <span className="px-2 py-1 rounded-md border bg-white text-slate-700">{page}</span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={page >= pageCount}
              className={`px-2 py-1 rounded-md border ${page >= pageCount ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
            >
              Next
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

MappingObatPcare.layout = (page) => <AppLayout title="Mapping Obat PCare" children={page} />;