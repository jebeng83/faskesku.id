import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import SidebarKeuangan from '@/Layouts/SidebarKeuangan';
import { Info } from 'lucide-react';

const Card = ({ title, children }) => (
  <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
    {title && (
      <div className="relative px-4 py-3 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-600/50">
        <h2 className="text-base font-semibold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">{title}</h2>
      </div>
    )}
    <div className="relative p-6">{children}</div>
  </div>
);

export default function RekeningPage() {
  const [form, setForm] = useState({ kd_rek: '', tipe: 'N', balance: 'Debet', nm_rek: '' });
  const [errors, setErrors] = useState({});
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1, total: 0, per_page: 20 });

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/akutansi/rekening', { params: { q, page, per_page: perPage } });
      const payload = res.data || {};
      setItems(payload.data || []);
      if (payload.meta) setMeta(payload.meta);
    } catch (e) {
      console.error('Gagal memuat rekening:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, [page, perPage]);

  const validate = () => {
    const errs = {};
    if (!form.kd_rek?.trim()) errs.kd_rek = 'Kode Rekening wajib diisi';
    if (!form.nm_rek?.trim()) errs.nm_rek = 'Nama Rekening wajib diisi';
    if (!['N','R','M'].includes(form.tipe)) errs.tipe = 'Tipe tidak valid';
    if (!['Debet','Kredit'].includes(form.balance)) errs.balance = 'Balance tidak valid';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const resetForm = () => {
    setForm({ kd_rek: '', tipe: 'N', balance: 'Debet', nm_rek: '' });
    setErrors({});
    setEditingKey(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      if (editingKey) {
        await axios.put(`/api/akutansi/rekening/${encodeURIComponent(editingKey)}`, {
          tipe: form.tipe,
          // Map UI value to code for storage: Debet -> D, Kredit -> K
          balance: form.balance === 'Debet' ? 'D' : 'K',
          nm_rek: form.nm_rek,
          // Set level otomatis ke 1 saat edit
          level: 1,
        });
      } else {
        await axios.post('/api/akutansi/rekening', {
          ...form,
          // Override balance to code for storage
          balance: form.balance === 'Debet' ? 'D' : 'K',
          // Set level otomatis ke 1 saat simpan
          level: 1,
        });
      }
      await fetchItems();
      resetForm();
    } catch (e) {
      // Map validation errors jika ada
      const data = e?.response?.data;
      if (data && typeof data === 'object') {
        setErrors(data.errors || {});
      }
      console.error('Simpan rekening gagal:', e);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingKey(item.kd_rek);
    setForm({
      kd_rek: item.kd_rek || '',
      tipe: item.tipe || 'N',
      // Normalize stored code/value to UI label
      balance: (item.balance === 'K' || item.balance === 'Kredit') ? 'Kredit' : 'Debet',
      nm_rek: item.nm_rek || '',
    });
  };

  const handleDelete = async (item) => {
    if (!item?.kd_rek) return;
    if (!confirm(`Hapus rekening ${item.kd_rek} - ${item.nm_rek}?`)) return;
    try {
      await axios.delete(`/api/akutansi/rekening/${encodeURIComponent(item.kd_rek)}`);
      await fetchItems();
      if (editingKey === item.kd_rek) resetForm();
    } catch (e) {
      console.error('Hapus rekening gagal:', e);
      const msg = e?.response?.data?.message || 'Gagal menghapus rekening. Periksa konsol untuk detail.';
      alert(msg);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setPage(1);
    await fetchItems();
  };

  return (
    <div>
      <Head title="Keuangan - Rekening" />
      <div className="space-y-6">
        {/* Card 1: Form Input */}
        <Card title={editingKey ? `Edit Rekening (${editingKey})` : 'Input Rekening'}>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Kode Rekening</label>
              <input
                type="text"
                value={form.kd_rek}
                onChange={(e) => setForm({ ...form, kd_rek: e.target.value.toUpperCase() })}
                placeholder="Mis. 1001"
                maxLength={20}
                disabled={!!editingKey}
                className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 ${errors.kd_rek ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
              />
              {errors.kd_rek && <p className="mt-1 text-xs text-red-600">{errors.kd_rek}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tipe</label>
              <select
                value={form.tipe}
                onChange={(e) => setForm({ ...form, tipe: e.target.value })}
                title="Tipe laporan: N=Neraca, R=Rugi/Laba, M=Perubahan Modal"
                className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 ${errors.tipe ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
              >
                <option value="N">N (Neraca)</option>
                <option value="R">R (Rugi/Laba)</option>
                <option value="M">M (Perubahan Modal)</option>
              </select>
              {errors.tipe && <p className="mt-1 text-xs text-red-600">{errors.tipe}</p>}
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Info className="w-3 h-3" />
                Pilih tipe sesuai jenis akun: Neraca (aset/kewajiban/ekuitas), Rugi/Laba (pendapatan/biaya), Perubahan Modal.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Balance</label>
              <select
                value={form.balance}
                onChange={(e) => setForm({ ...form, balance: e.target.value })}
                title="Saldo normal akun: Debet atau Kredit"
                className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 ${errors.balance ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
              >
                <option value="Debet">Debet</option>
                <option value="Kredit">Kredit</option>
              </select>
              {errors.balance && <p className="mt-1 text-xs text-red-600">{errors.balance}</p>}
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Info className="w-3 h-3" />
                Balance menunjukkan saldo normal akun. Contoh: Aset biasanya Debet, Pendapatan biasanya Kredit.
              </p>
            </div>

            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Rekening</label>
              <input
                type="text"
                value={form.nm_rek}
                onChange={(e) => setForm({ ...form, nm_rek: e.target.value })}
                placeholder="Mis. Kas, Piutang Usaha"
                maxLength={100}
                className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 ${errors.nm_rek ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
              />
              {errors.nm_rek && <p className="mt-1 text-xs text-red-600">{errors.nm_rek}</p>}
            </div>

            <div className="md:col-span-3 mt-2 flex items-center gap-3">
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {editingKey ? 'Simpan Perubahan' : 'Simpan'}
              </button>
              {editingKey && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Batal Edit
                </button>
              )}
            </div>
          </form>
        </Card>

        {/* Card 2: Tabel Data Rekening */}
        <Card title="Data Rekening">
          <form onSubmit={handleSearch} className="mb-3 flex items-end gap-2">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Pencarian</label>
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari kode/nama/tipe/balance..."
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Cari</button>
            <button type="button" onClick={fetchItems} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Refresh</button>
          </form>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Kode</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Nama Rekening</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Tipe</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Balance</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Level</th>
                  <th className="px-4 py-2 text-right text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {loading ? (
                  <tr><td colSpan={6} className="px-4 py-6 text-center text-sm text-gray-500">Memuat data...</td></tr>
                ) : items.length ? (
                  items.map((item) => (
                    <tr key={item.kd_rek} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-2 text-sm font-mono">{item.kd_rek}</td>
                      <td className="px-4 py-2 text-sm">{item.nm_rek}</td>
                      <td className="px-4 py-2 text-sm">{item.tipe}</td>
                      <td className="px-4 py-2 text-sm">{(item.balance === 'K' || item.balance === 'Kredit') ? 'Kredit' : (item.balance === 'D' || item.balance === 'Debet') ? 'Debet' : (item.balance ?? '-')}</td>
                      <td className="px-4 py-2 text-sm">{item.level ?? '-'}</td>
                      <td className="px-4 py-2 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleEdit(item)} className="rounded-lg border border-blue-200 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-50">Edit</button>
                          <button onClick={() => handleDelete(item)} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50">Hapus</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={6} className="px-4 py-6 text-center text-sm text-gray-500">Tidak ada data.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Halaman {meta.current_page} dari {meta.last_page} • Total {meta.total} data
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={meta.current_page <= 1}
                className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(meta.last_page, p + 1))}
                disabled={meta.current_page >= meta.last_page}
                className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
              <select
                value={perPage}
                onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
                className="rounded-lg border border-gray-300 px-2 py-1.5 text-xs shadow-sm"
              >
                {[10,20,30,50].map((n) => (
                  <option key={n} value={n}>{n}/halaman</option>
                ))}
              </select>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

RekeningPage.layout = (page) => <SidebarKeuangan title="Keuangan" children={page} />;