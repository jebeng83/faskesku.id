import React, { useEffect, useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import SidebarKeuangan from '@/Layouts/SidebarKeuangan';
import { BookOpen, Calendar, Clock, Info, Plus, RefreshCcw, Search, Trash2 } from 'lucide-react';
import usePermission from '@/hooks/usePermission';

const Card = ({ title, children, right }) => (
  <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
    {(title || right) && (
      <div className="relative px-4 py-3 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-600/50 flex items-center justify-between">
        {title && (
          <h2 className="text-base font-semibold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">{title}</h2>
        )}
        {right}
      </div>
    )}
    <div className="relative p-6">{children}</div>
  </div>
);

const formatDate = (v) => {
  if (!v) return '';
  try { return new Date(v).toISOString().slice(0, 10); } catch { return v; }
};

const formatTime = (v) => {
  if (!v) return '';
  try { return (typeof v === 'string' && v.length >= 8) ? v.slice(0,8) : new Date(v).toTimeString().slice(0,8); } catch { return v; }
};

export default function JurnalPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1, total: 0, per_page: 20 });
  const [q, setQ] = useState('');
  const [jenis, setJenis] = useState(''); // '' | 'U' | 'P'
  const today = useMemo(() => new Date().toISOString().slice(0,10), []);
  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(today);
  const { can } = usePermission();

  const [rekeningOptions, setRekeningOptions] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createForm, setCreateForm] = useState({
    no_bukti: '',
    tgl_jurnal: today,
    jam_jurnal: new Date().toTimeString().slice(0,8),
    jenis: 'U',
    keterangan: '',
    details: [
      { kd_rek: '', debet: 0, kredit: 0 },
      { kd_rek: '', debet: 0, kredit: 0 },
    ],
  });
  const [errors, setErrors] = useState({});

  const [selected, setSelected] = useState(null); // { header, details, totals }
  const [showDetail, setShowDetail] = useState(false);
  const [updating, setUpdating] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/akutansi/jurnal', { params: { q, from, to, jenis, page, per_page: perPage } });
      const payload = res.data || {};
      setItems(payload.data || []);
      if (payload.meta) setMeta(payload.meta);
    } catch (e) {
      console.error('Gagal memuat jurnal:', e);
    } finally {
      setLoading(false);
    }
  };

  const fetchRekeningOptions = async () => {
    try {
      const res = await axios.get('/api/akutansi/rekening', { params: { per_page: 1000 } });
      const data = (res?.data?.data || []).map((r) => ({ kd_rek: r.kd_rek, nm_rek: r.nm_rek }));
      setRekeningOptions(data);
    } catch (e) {
      console.error('Gagal memuat daftar rekening:', e);
    }
  };

  useEffect(() => { fetchItems(); }, [page, perPage]);
  useEffect(() => { fetchRekeningOptions(); }, []);

  const handleSearch = async (e) => {
    e?.preventDefault?.();
    setPage(1);
    await fetchItems();
  };

  const resetCreateForm = () => {
    setCreateForm({
      no_bukti: '',
      tgl_jurnal: today,
      jam_jurnal: new Date().toTimeString().slice(0,8),
      jenis: 'U',
      keterangan: '',
      details: [ { kd_rek: '', debet: 0, kredit: 0 }, { kd_rek: '', debet: 0, kredit: 0 } ],
    });
    setErrors({});
  };

  const addDetailRow = () => {
    setCreateForm((f) => ({ ...f, details: [...f.details, { kd_rek: '', debet: 0, kredit: 0 }] }));
  };

  const removeDetailRow = (idx) => {
    setCreateForm((f) => ({ ...f, details: f.details.filter((_, i) => i !== idx) }));
  };

  const totalsCreate = useMemo(() => {
    const d = createForm.details || [];
    const debet = d.reduce((acc, it) => acc + Number(it.debet || 0), 0);
    const kredit = d.reduce((acc, it) => acc + Number(it.kredit || 0), 0);
    return { debet, kredit, balanced: Math.round(debet * 100) === Math.round(kredit * 100) };
  }, [createForm.details]);

  const validateCreate = () => {
    const errs = {};
    if (!createForm.tgl_jurnal) errs.tgl_jurnal = 'Tanggal wajib diisi';
    if (createForm.details.length < 1) errs.details = 'Minimal 1 baris';
    createForm.details.forEach((d, i) => {
      if (!d.kd_rek) errs[`details.${i}.kd_rek`] = 'Pilih rekening';
      if ((Number(d.debet || 0) <= 0) && (Number(d.kredit || 0) <= 0)) errs[`details.${i}.amount`] = 'Isi debet atau kredit';
      if (Number(d.debet || 0) > 0 && Number(d.kredit || 0) > 0) errs[`details.${i}.amount2`] = 'Tidak boleh keduanya > 0';
    });
    if (!totalsCreate.balanced) errs.balanced = 'Debet harus sama dengan Kredit';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!validateCreate()) return;
    setCreating(true);
    try {
      const payload = { ...createForm, details: createForm.details.map((d) => ({ kd_rek: d.kd_rek, debet: Number(d.debet || 0), kredit: Number(d.kredit || 0) })) };
      const res = await axios.post('/api/akutansi/jurnal', payload);
      if (res?.status === 201) {
        setShowCreate(false);
        resetCreateForm();
        await fetchItems();
      }
    } catch (e) {
      const data = e?.response?.data;
      if (data && typeof data === 'object') setErrors(data.errors || { _global: data.message || 'Gagal menyimpan' });
      console.error('Simpan jurnal gagal:', e);
    } finally {
      setCreating(false);
    }
  };

  const openDetail = async (item) => {
    try {
      const res = await axios.get(`/api/akutansi/jurnal/${encodeURIComponent(item.no_jurnal)}`);
      const payload = res.data || {};
      setSelected(payload);
      setShowDetail(true);
    } catch (e) {
      console.error('Gagal memuat detail jurnal:', e);
    }
  };

  const canEditSelectedDetails = selected?.header?.jenis === 'U';

  const totalsSelected = useMemo(() => {
    const d = selected?.details || [];
    const debet = d.reduce((acc, it) => acc + Number(it.debet || 0), 0);
    const kredit = d.reduce((acc, it) => acc + Number(it.kredit || 0), 0);
    return { debet, kredit, balanced: Math.round(debet * 100) === Math.round(kredit * 100) };
  }, [selected]);

  const updateSelectedDetail = (idx, patch) => {
    setSelected((s) => ({ ...s, details: (s.details || []).map((row, i) => i === idx ? { ...row, ...patch } : row) }));
  };

  const addSelectedDetailRow = () => {
    setSelected((s) => ({ ...s, details: [...(s.details || []), { kd_rek: '', nm_rek: '', debet: 0, kredit: 0 }] }));
  };

  const removeSelectedDetailRow = (idx) => {
    setSelected((s) => ({ ...s, details: (s.details || []).filter((_, i) => i !== idx) }));
  };

  const handleUpdateSelected = async () => {
    if (!selected?.header?.no_jurnal) return;
    const errs = {};
    if (canEditSelectedDetails) {
      const d = selected.details || [];
      if (d.length < 1) errs.details = 'Minimal 1 baris';
      d.forEach((row, i) => {
        if (!row.kd_rek) errs[`details.${i}.kd_rek`] = 'Pilih rekening';
        const deb = Number(row.debet || 0), kre = Number(row.kredit || 0);
        if (deb <= 0 && kre <= 0) errs[`details.${i}.amount`] = 'Isi debet atau kredit';
        if (deb > 0 && kre > 0) errs[`details.${i}.amount2`] = 'Tidak boleh keduanya > 0';
      });
      if (!totalsSelected.balanced) errs.balanced = 'Debet harus sama dengan Kredit';
    }
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setUpdating(true);
    try {
      const payload = {
        no_bukti: selected?.header?.no_bukti || null,
        tgl_jurnal: formatDate(selected?.header?.tgl_jurnal),
        jam_jurnal: formatTime(selected?.header?.jam_jurnal),
        keterangan: selected?.header?.keterangan || null,
      };
      if (canEditSelectedDetails) {
        payload.details = (selected?.details || []).map((d) => ({ kd_rek: d.kd_rek, debet: Number(d.debet || 0), kredit: Number(d.kredit || 0) }));
      }
      await axios.put(`/api/akutansi/jurnal/${encodeURIComponent(selected.header.no_jurnal)}`, payload);
      await fetchItems();
      setShowDetail(false);
    } catch (e) {
      const data = e?.response?.data;
      if (data && typeof data === 'object') setErrors(data.errors || { _global: data.message || 'Gagal memperbarui' });
      console.error('Update jurnal gagal:', e);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (item) => {
    if (!item?.no_jurnal) return;
    if (!confirm(`Hapus jurnal ${item.no_jurnal}?`)) return;
    try {
      await axios.delete(`/api/akutansi/jurnal/${encodeURIComponent(item.no_jurnal)}`);
      await fetchItems();
    } catch (e) {
      const msg = e?.response?.data?.message || 'Gagal menghapus jurnal. Periksa konsol.';
      alert(msg);
      console.error('Hapus jurnal gagal:', e);
    }
  };

  return (
    <div>
      <Head title="Keuangan - Jurnal" />
      <div className="space-y-6">
        {/* Card: Filter & Actions */}
        <Card
          title="Jurnal"
          right={(
            <div className="flex items-center gap-2">
              {can('akutansi.jurnal') && (
                <button onClick={() => setShowCreate(true)} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  <Plus className="w-4 h-4" /> Tambah Jurnal Umum
                </button>
              )}
              <button onClick={fetchItems} className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                <RefreshCcw className="w-4 h-4" /> Refresh
              </button>
            </div>
          )}
        >
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Pencarian</label>
              <div className="mt-1 flex items-center gap-2">
                <div className="relative flex-1">
                  <input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari no jurnal/bukti/keterangan" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-300" />
                  <Search className="absolute right-2 top-2.5 w-4 h-4 text-gray-400" />
                </div>
                <button type="submit" className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700">Cari</button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Dari</label>
              <div className="mt-1 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-300" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Sampai</label>
              <div className="mt-1 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-300" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Jenis</label>
              <select value={jenis} onChange={(e) => setJenis(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-300">
                <option value="">Semua</option>
                <option value="U">U (Umum/Manual)</option>
                <option value="P">P (Posting Transaksi)</option>
              </select>
            </div>
            <div className="flex items-end">
              <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Terapkan</button>
            </div>
          </form>
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1"><Info className="w-3 h-3" /> Jenis P adalah jurnal hasil posting otomatis transaksi layanan; bersifat read-only. Jenis U adalah jurnal umum (manual) yang dapat diubah/hapus.</p>
        </Card>

        {/* Card: Data Jurnal */}
        <Card title="Data Jurnal">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">No. Jurnal</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Tanggal</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Waktu</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">No. Bukti</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Jenis</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Keterangan</th>
                  <th className="px-4 py-2 text-right text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Debet</th>
                  <th className="px-4 py-2 text-right text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Kredit</th>
                  <th className="px-4 py-2 text-right text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {loading ? (
                  <tr><td colSpan={9} className="px-4 py-6 text-center text-sm text-gray-500">Memuat data...</td></tr>
                ) : items.length ? (
                  items.map((item) => (
                    <tr key={item.no_jurnal} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-2 text-sm font-mono">{item.no_jurnal}</td>
                      <td className="px-4 py-2 text-sm">{formatDate(item.tgl_jurnal)}</td>
                      <td className="px-4 py-2 text-sm">{formatTime(item.jam_jurnal)}</td>
                      <td className="px-4 py-2 text-sm">{item.no_bukti || '-'}</td>
                      <td className="px-4 py-2 text-sm">{item.jenis}</td>
                      <td className="px-4 py-2 text-sm">{item.keterangan || '-'}</td>
                      <td className="px-4 py-2 text-sm text-right">{Number(item.debet_total || 0).toLocaleString('id-ID')}</td>
                      <td className="px-4 py-2 text-sm text-right">{Number(item.kredit_total || 0).toLocaleString('id-ID')}</td>
                      <td className="px-4 py-2 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => openDetail(item)} className="rounded-lg border border-blue-200 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-50">Detail</button>
                          {item.jenis === 'U' && can('akutansi.jurnal') ? (
                            <button onClick={() => handleDelete(item)} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"><Trash2 className="w-4 h-4 inline-block" /> Hapus</button>
                          ) : (
                            <span className="text-xs text-gray-500">-</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={9} className="px-4 py-6 text-center text-sm text-gray-500">Tidak ada data.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="text-xs text-gray-600 dark:text-gray-400">Halaman {meta.current_page} dari {meta.last_page} • Total {meta.total} data</div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={meta.current_page <= 1} className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50">Prev</button>
              <button type="button" onClick={() => setPage((p) => Math.min(meta.last_page, p + 1))} disabled={meta.current_page >= meta.last_page} className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50">Next</button>
              <select value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }} className="rounded-lg border border-gray-300 px-2 py-1.5 text-xs shadow-sm">
                {[10,20,30,50].map((n) => (<option key={n} value={n}>{n}/halaman</option>))}
              </select>
            </div>
          </div>
        </Card>

        {/* Modal Create */}
        {showCreate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={(e) => { if (e.target === e.currentTarget) setShowCreate(false); }}>
            <div className="w-full max-w-3xl rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-800">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Tambah Jurnal Umum</h3>
                <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowCreate(false)}>✕</button>
              </div>
              <div className="p-6 space-y-4">
                <form onSubmit={handleCreate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium">Tanggal</label>
                      <input type="date" value={createForm.tgl_jurnal} onChange={(e) => setCreateForm((f) => ({ ...f, tgl_jurnal: e.target.value }))} className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm ${errors.tgl_jurnal ? 'border-red-500' : 'border-gray-300'}`} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Waktu</label>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <input type="text" value={createForm.jam_jurnal} onChange={(e) => setCreateForm((f) => ({ ...f, jam_jurnal: e.target.value }))} placeholder="HH:MM:SS" className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium">No. Bukti (opsional)</label>
                      <input type="text" value={createForm.no_bukti} onChange={(e) => setCreateForm((f) => ({ ...f, no_bukti: e.target.value }))} maxLength={30} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Keterangan</label>
                    <input type="text" value={createForm.keterangan} onChange={(e) => setCreateForm((f) => ({ ...f, keterangan: e.target.value }))} maxLength={350} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-semibold">Detail Jurnal</label>
                      <button type="button" onClick={addDetailRow} className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"><Plus className="w-4 h-4" /> Tambah Baris</button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-600">Rekening</th>
                            <th className="px-3 py-2 text-right text-xs font-medium uppercase tracking-wider text-gray-600">Debet</th>
                            <th className="px-3 py-2 text-right text-xs font-medium uppercase tracking-wider text-gray-600">Kredit</th>
                            <th className="px-3 py-2 text-right text-xs font-medium uppercase tracking-wider text-gray-600">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {createForm.details.map((row, idx) => (
                            <tr key={idx}>
                              <td className="px-3 py-2">
                                <select value={row.kd_rek} onChange={(e) => setCreateForm((f) => ({ ...f, details: f.details.map((r, i) => i === idx ? { ...r, kd_rek: e.target.value } : r) }))} className={`w-full rounded-lg border px-3 py-2 text-sm ${errors[`details.${idx}.kd_rek`] ? 'border-red-500' : 'border-gray-300'}`}>
                                  <option value="">-- pilih rekening --</option>
                                  {rekeningOptions.map((opt) => (
                                    <option key={opt.kd_rek} value={opt.kd_rek}>{opt.kd_rek} - {opt.nm_rek}</option>
                                  ))}
                                </select>
                                {(errors[`details.${idx}.kd_rek`] || errors[`details.${idx}.amount`] || errors[`details.${idx}.amount2`]) && (
                                  <p className="mt-1 text-xs text-red-600">{errors[`details.${idx}.kd_rek`] || errors[`details.${idx}.amount`] || errors[`details.${idx}.amount2`]}</p>
                                )}
                              </td>
                              <td className="px-3 py-2 text-right">
                                <input type="number" step="0.01" value={row.debet} onChange={(e) => setCreateForm((f) => ({ ...f, details: f.details.map((r, i) => i === idx ? { ...r, debet: Number(e.target.value), kredit: 0 } : r) }))} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-right" />
                              </td>
                              <td className="px-3 py-2 text-right">
                                <input type="number" step="0.01" value={row.kredit} onChange={(e) => setCreateForm((f) => ({ ...f, details: f.details.map((r, i) => i === idx ? { ...r, kredit: Number(e.target.value), debet: 0 } : r) }))} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-right" />
                              </td>
                              <td className="px-3 py-2 text-right">
                                <button type="button" onClick={() => removeDetailRow(idx)} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50">Hapus</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td className="px-3 py-2 text-right font-semibold">Total</td>
                            <td className="px-3 py-2 text-right font-semibold">{Number(totalsCreate.debet || 0).toLocaleString('id-ID')}</td>
                            <td className="px-3 py-2 text-right font-semibold">{Number(totalsCreate.kredit || 0).toLocaleString('id-ID')}</td>
                            <td className="px-3 py-2 text-right"><span className={`inline-flex items-center px-2 py-1 rounded-md text-xs ${totalsCreate.balanced ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{totalsCreate.balanced ? 'Seimbang' : 'Tidak seimbang'}</span></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>

                  {errors._global && <p className="text-sm text-red-600">{errors._global}</p>}
                  {errors.balanced && <p className="text-sm text-red-600">{errors.balanced}</p>}

                  <div className="flex items-center justify-end gap-2">
                    <button type="button" onClick={resetCreateForm} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Reset</button>
                    <button type="submit" disabled={creating} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">Simpan</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Modal Detail */}
        {showDetail && selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={(e) => { if (e.target === e.currentTarget) setShowDetail(false); }}>
            <div className="w-full max-w-5xl rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-800">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <h3 className="text-lg font-semibold">Detail Jurnal {selected?.header?.no_jurnal}</h3>
                </div>
                <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowDetail(false)}>✕</button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-medium">Tanggal</label>
                    <input type="date" value={formatDate(selected?.header?.tgl_jurnal)} onChange={(e) => setSelected((s) => ({ ...s, header: { ...s.header, tgl_jurnal: e.target.value } }))} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium">Waktu</label>
                    <input type="text" value={formatTime(selected?.header?.jam_jurnal)} onChange={(e) => setSelected((s) => ({ ...s, header: { ...s.header, jam_jurnal: e.target.value } }))} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium">No. Bukti</label>
                    <input type="text" value={selected?.header?.no_bukti || ''} onChange={(e) => setSelected((s) => ({ ...s, header: { ...s.header, no_bukti: e.target.value } }))} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium">Jenis</label>
                    <input type="text" value={selected?.header?.jenis || ''} disabled className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm bg-gray-50" />
                  </div>
                  <div className="md:col-span-4">
                    <label className="block text-xs font-medium">Keterangan</label>
                    <input type="text" value={selected?.header?.keterangan || ''} onChange={(e) => setSelected((s) => ({ ...s, header: { ...s.header, keterangan: e.target.value } }))} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold">Detail Jurnal</label>
                    {canEditSelectedDetails && (
                      <button type="button" onClick={addSelectedDetailRow} className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"><Plus className="w-4 h-4" /> Tambah Baris</button>
                    )}
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-600">Rekening</th>
                          <th className="px-3 py-2 text-right text-xs font-medium uppercase tracking-wider text-gray-600">Debet</th>
                          <th className="px-3 py-2 text-right text-xs font-medium uppercase tracking-wider text-gray-600">Kredit</th>
                          <th className="px-3 py-2 text-right text-xs font-medium uppercase tracking-wider text-gray-600">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {(selected?.details || []).map((row, idx) => (
                          <tr key={idx}>
                            <td className="px-3 py-2">
                              {canEditSelectedDetails ? (
                                <select value={row.kd_rek || ''} onChange={(e) => updateSelectedDetail(idx, { kd_rek: e.target.value })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
                                  <option value="">-- pilih rekening --</option>
                                  {rekeningOptions.map((opt) => (
                                    <option key={opt.kd_rek} value={opt.kd_rek}>{opt.kd_rek} - {opt.nm_rek}</option>
                                  ))}
                                </select>
                              ) : (
                                <div className="text-sm">{row.kd_rek} - {row.nm_rek || ''}</div>
                              )}
                            </td>
                            <td className="px-3 py-2 text-right">
                              {canEditSelectedDetails ? (
                                <input type="number" step="0.01" value={row.debet} onChange={(e) => updateSelectedDetail(idx, { debet: Number(e.target.value), kredit: 0 })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-right" />
                              ) : (
                                <div className="text-sm">{Number(row.debet || 0).toLocaleString('id-ID')}</div>
                              )}
                            </td>
                            <td className="px-3 py-2 text-right">
                              {canEditSelectedDetails ? (
                                <input type="number" step="0.01" value={row.kredit} onChange={(e) => updateSelectedDetail(idx, { kredit: Number(e.target.value), debet: 0 })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-right" />
                              ) : (
                                <div className="text-sm">{Number(row.kredit || 0).toLocaleString('id-ID')}</div>
                              )}
                            </td>
                            <td className="px-3 py-2 text-right">
                              {canEditSelectedDetails ? (
                                <button type="button" onClick={() => removeSelectedDetailRow(idx)} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50">Hapus</button>
                              ) : (
                                <span className="text-xs text-gray-500">-</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td className="px-3 py-2 text-right font-semibold">Total</td>
                          <td className="px-3 py-2 text-right font-semibold">{Number(totalsSelected.debet || 0).toLocaleString('id-ID')}</td>
                          <td className="px-3 py-2 text-right font-semibold">{Number(totalsSelected.kredit || 0).toLocaleString('id-ID')}</td>
                          <td className="px-3 py-2 text-right"><span className={`inline-flex items-center px-2 py-1 rounded-md text-xs ${totalsSelected.balanced ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{totalsSelected.balanced ? 'Seimbang' : 'Tidak seimbang'}</span></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {errors._global && <p className="text-sm text-red-600">{errors._global}</p>}
                {errors.balanced && <p className="text-sm text-red-600">{errors.balanced}</p>}

                <div className="flex items-center justify-end gap-2">
                  <button type="button" onClick={() => setShowDetail(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Tutup</button>
                  <button type="button" onClick={handleUpdateSelected} disabled={updating || !canEditSelectedDetails} className={`rounded-lg px-4 py-2 text-sm font-medium ${canEditSelectedDetails ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}>Simpan Perubahan</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

JurnalPage.layout = (page) => <SidebarKeuangan title="Keuangan" children={page} />;
