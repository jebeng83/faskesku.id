import React, { useEffect, useMemo, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowPathIcon, CheckCircleIcon, ExclamationTriangleIcon, MagnifyingGlassIcon, PlusIcon, PencilSquareIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';

const containerVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

// Smooth dropdown animation
const dropdownVariants = {
  initial: { opacity: 0, y: 8, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, y: 4, scale: 0.98, transition: { duration: 0.12 } },
};

export default function MappingPoliPcare() {
  // Search inputs
  const [qRs, setQRs] = useState('');
  const [qBpjs, setQBpjs] = useState('');

  // RS Poliklinik state
  const [rsLoading, setRsLoading] = useState(false);
  const [rsError, setRsError] = useState(null);
  const [rsList, setRsList] = useState([]);
  const [selectedRs, setSelectedRs] = useState(null); // { kd_poli, nm_poli }
  const [showRsDropdown, setShowRsDropdown] = useState(false);
  const [rsAutoFetchLocked, setRsAutoFetchLocked] = useState(false);

  // BPJS PCare Poli state
  const [bpjsLoading, setBpjsLoading] = useState(false);
  const [bpjsError, setBpjsError] = useState(null);
  const [bpjsList, setBpjsList] = useState([]); // items: { kdPoli, nmPoli }
  const [selectedBpjs, setSelectedBpjs] = useState(null); // { kdPoli, nmPoli }
  const [showBpjsDropdown, setShowBpjsDropdown] = useState(false);

  // Mapping table
  const [mapLoading, setMapLoading] = useState(false);
  const [mapError, setMapError] = useState(null);
  const [mappings, setMappings] = useState([]);
  const [editingRow, setEditingRow] = useState(null); // row being edited

  // Save status
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  const fetchRs = async (keyword = '') => {
    setRsLoading(true);
    setRsError(null);
    try {
      const params = new URLSearchParams();
      if (keyword) params.set('q', keyword);
      const res = await fetch(`/pcare/api/rs/poliklinik?${params.toString()}`, { headers: { Accept: 'application/json' } });
      const json = await res.json();
      setRsList(Array.isArray(json?.data) ? json.data : []);
    } catch (e) {
      setRsError(e?.message || 'Gagal memuat poliklinik RS');
    } finally {
      setRsLoading(false);
    }
  };

  const fetchBpjs = async () => {
    setBpjsLoading(true);
    setBpjsError(null);
    try {
      // Ambil data poli dari PCare (paged). Untuk kebutuhan pencarian sederhana, ambil 100 item pertama.
      const res = await fetch(`/pcare/api/poli?start=0&limit=100`, { headers: { Accept: 'application/json' } });
      const json = await res.json();
      const list = json?.response?.list || [];
      setBpjsList(Array.isArray(list) ? list : []);
    } catch (e) {
      setBpjsError(e?.message || 'Gagal memuat referensi poli BPJS');
    } finally {
      setBpjsLoading(false);
    }
  };

  const fetchMappings = async () => {
    setMapLoading(true);
    setMapError(null);
    try {
      const res = await fetch(`/pcare/api/mapping/poli`, { headers: { Accept: 'application/json' } });
      const json = await res.json();
      setMappings(Array.isArray(json?.data) ? json.data : []);
    } catch (e) {
      setMapError(e?.message || 'Gagal memuat data mapping');
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

  // Filter BPJS list by qBpjs in-memory
  const filteredBpjs = useMemo(() => {
    if (!qBpjs) return bpjsList;
    const q = qBpjs.toLowerCase();
    return (bpjsList || []).filter((it) => (
      String(it?.kdPoli || '').toLowerCase().includes(q) ||
      String(it?.nmPoli || it?.nama || '').toLowerCase().includes(q)
    ));
  }, [bpjsList, qBpjs]);

  const handleSelectRs = (it) => {
    setSelectedRs(it);
    setQRs(`${it.kd_poli} — ${it.nm_poli}`);
    setShowRsDropdown(false);
    setRsAutoFetchLocked(true);
  };

  const handleSelectBpjs = (it) => {
    setSelectedBpjs(it);
    setQBpjs(`${it.kdPoli || '-'} — ${it.nmPoli || it.nama || '-'}`);
    setShowBpjsDropdown(false);
  };

  // Auto fetch RS when typing 2+ characters (debounced)
  useEffect(() => {
    if (rsAutoFetchLocked) return; // prevent immediate refetch right after selecting
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
      setSaveMsg('Pilih poli RS dan poli BPJS terlebih dahulu');
      return;
    }
    setSaving(true);
    setSaveMsg('');
    try {
      const payload = {
        kd_poli_rs: selectedRs.kd_poli,
        kd_poli_pcare: selectedBpjs.kdPoli,
        nm_poli_pcare: selectedBpjs.nmPoli || selectedBpjs.nama || '',
      };
      const csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
      const res = await fetch('/pcare/api/mapping/poli', {
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
      } else {
        setSaveMsg(json?.metaData?.message || 'Gagal menyimpan mapping');
      }
    } catch (e) {
      setSaveMsg(e?.message || 'Gagal menyimpan mapping');
    } finally {
      setSaving(false);
    }
  };

  const onEdit = (row) => {
    // Set mode edit dan preload pilihan berdasarkan baris
    setEditingRow(row);
    const rs = (rsList || []).find((r) => r.kd_poli === row.kd_poli_rs) || { kd_poli: row.kd_poli_rs, nm_poli: '' };
    setSelectedRs(rs);
    // Isi textbox RS dengan nilai dari baris yang diedit
    setQRs(rs.nm_poli ? `${rs.kd_poli} — ${rs.nm_poli}` : `${rs.kd_poli}`);
    setShowRsDropdown(false);
    setRsAutoFetchLocked(true);
    const bp = (bpjsList || []).find((b) => (b.kdPoli || '') === (row.kd_poli_pcare || '')) || { kdPoli: row.kd_poli_pcare, nmPoli: row.nm_poli_pcare };
    setSelectedBpjs(bp);
    // Isi textbox BPJS dengan nilai dari baris yang diedit
    const nmBpjs = bp.nmPoli || bp.nama || row.nm_poli_pcare || '';
    setQBpjs(nmBpjs ? `${bp.kdPoli} — ${nmBpjs}` : `${bp.kdPoli || ''}`);
    setShowBpjsDropdown(false);
  };

  const onCancelEdit = () => {
    setEditingRow(null);
    setSelectedRs(null);
    setSelectedBpjs(null);
    setSaveMsg('');
  };

  const onDelete = async (row) => {
    if (!confirm(`Hapus mapping untuk RS ${row.kd_poli_rs} -> BPJS ${row.kd_poli_pcare}?`)) return;
    setSaving(true);
    setSaveMsg('');
    try {
      const csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
      const res = await fetch('/pcare/api/mapping/poli', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-CSRF-TOKEN': csrf, 'X-Requested-With': 'XMLHttpRequest' },
        credentials: 'same-origin',
        body: JSON.stringify({ kd_poli_rs: row.kd_poli_rs, kd_poli_pcare: row.kd_poli_pcare }),
      });
      const json = await res.json();
      if (res.ok) {
        setSaveMsg(json?.metaData?.message || 'Berhasil menghapus mapping');
        fetchMappings();
        if (editingRow && editingRow.kd_poli_rs === row.kd_poli_rs) {
          onCancelEdit();
        }
      } else {
        setSaveMsg(json?.metaData?.message || 'Gagal menghapus mapping');
      }
    } catch (e) {
      setSaveMsg(e?.message || 'Gagal menghapus mapping');
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="p-4">
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-4">
        <div className="rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 text-white p-5 shadow">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-semibold">Mapping Poli PCare</h1>
              <p className="text-sm opacity-90">Hubungkan kode poli RS ke referensi poli BPJS PCare.</p>
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
        {/* RS Poliklinik */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-indigo-200 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-800">Poli RS</div>
              
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
                placeholder="Cari kode/nama poli RS…"
                className="w-full rounded-xl border-2 border-slate-300 text-base px-3 py-2 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
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
                      whileHover={{ backgroundColor: 'rgba(99,102,241,0.08)' }}
                      type="button"
                      key={it.kd_poli}
                      onClick={() => handleSelectRs(it)}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors ${selectedRs?.kd_poli === it.kd_poli ? 'bg-slate-100' : ''}`}
                    >
                      <div className="font-medium text-slate-800">{it.kd_poli}</div>
                      <div className="text-slate-600">{it.nm_poli}</div>
                    </motion.button>
                  ))
                ) : (
                  <div className="p-3 text-sm text-slate-500">Tidak ada data</div>
                )}
                </motion.div>
              )}
            </AnimatePresence>
            {selectedRs && (
              <div className="mt-2 text-xs text-slate-600">Dipilih: {selectedRs.kd_poli} — {selectedRs.nm_poli}</div>
            )}
          </div>
        </div>

        {/* BPJS Poli */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-indigo-200 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-800">Poli BPJS</div>
             
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
                placeholder="Cari kode/nama poli BPJS…"
                className="w-full rounded-xl border-2 border-slate-300 text-base px-3 py-2 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
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
                      whileHover={{ backgroundColor: 'rgba(99,102,241,0.08)' }}
                      type="button"
                      key={`${it.kdPoli || idx}-${idx}`}
                      onClick={() => handleSelectBpjs(it)}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors ${selectedBpjs?.kdPoli === it.kdPoli ? 'bg-slate-100' : ''}`}
                    >
                      <div className="font-medium text-slate-800">{it.kdPoli || '-'}</div>
                      <div className="text-slate-600">{it.nmPoli || it.nama || '-'}</div>
                    </motion.button>
                  ))
                ) : (
                  <div className="p-3 text-sm text-slate-500">Tidak ada data</div>
                )}
                </motion.div>
              )}
            </AnimatePresence>
            {selectedBpjs && (
              <div className="mt-2 text-xs text-slate-600">Dipilih: {selectedBpjs.kdPoli} — {selectedBpjs.nmPoli || selectedBpjs.nama}</div>
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
          className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm shadow ${saving || !selectedRs || !selectedBpjs ? 'bg-slate-200 text-slate-500 cursor-not-allowed' : (editingRow ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-indigo-600 text-white hover:bg-indigo-700')}`}
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

      {/* Datatable */}
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
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-slate-600">
                <th className="px-3 py-2 border-b">Kode Poli RS</th>
                <th className="px-3 py-2 border-b">Kode Poli BPJS</th>
                <th className="px-3 py-2 border-b">Nama Poli BPJS</th>
                <th className="px-3 py-2 border-b">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {mappings.map((row, idx) => (
                <tr key={`${row.kd_poli_rs}-${row.kd_poli_pcare}-${idx}`} className="border-b last:border-b-0">
                  <td className="px-3 py-2">{row.kd_poli_rs}</td>
                  <td className="px-3 py-2">{row.kd_poli_pcare}</td>
                  <td className="px-3 py-2">{row.nm_poli_pcare}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
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
                  </td>
                </tr>
              ))}
              {!mapLoading && !mapError && mappings.length === 0 && (
                <tr>
                  <td className="px-3 py-4 text-center text-slate-500" colSpan={4}>Belum ada mapping</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}

MappingPoliPcare.layout = (page) => <AppLayout title="Mapping Poli PCare" children={page} />;