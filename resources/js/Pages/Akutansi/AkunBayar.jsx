import React, { useEffect, useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import SidebarKeuangan from '@/Layouts/SidebarKeuangan';
import SearchableSelect from '@/Components/SearchableSelect';
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

export default function AkunBayarPage() {
  const [form, setForm] = useState({ nama_bayar: '', kd_rek: '', ppn: 0 });
  const [errors, setErrors] = useState({});
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1, total: 0, per_page: 20 });
  const [rekOptions, setRekOptions] = useState([]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/akutansi/akun-bayar', { params: { q, page, per_page: perPage } });
      const payload = res.data || {};
      setItems(payload.data || []);
      if (payload.meta) setMeta(payload.meta);
    } catch (e) {
      console.error('Gagal memuat akun bayar:', e);
    } finally {
      setLoading(false);
    }
  };

  const fetchRekOptions = async () => {
    try {
      // Ambil daftar rekening untuk opsi kd_rek. Muat banyak agar bisa dicari lokal
      const res = await axios.get('/api/akutansi/rekening', { params: { per_page: 200 } });
      const payload = res.data || {};
      const rows = payload.data || [];
      setRekOptions(rows.map((r) => ({ value: r.kd_rek, label: `${r.kd_rek} — ${r.nm_rek ?? ''}`.trim() })));
    } catch (e) {
      console.error('Gagal memuat opsi rekening:', e);
    }
  };

  useEffect(() => { fetchItems(); }, [page, perPage]);
  useEffect(() => { fetchRekOptions(); }, []);

  const validate = () => {
    const errs = {};
    if (!form.nama_bayar?.trim()) errs.nama_bayar = 'Nama Akun wajib diisi';
    if (!form.kd_rek?.trim()) errs.kd_rek = 'Kode Rekening wajib dipilih';
    const n = Number(form.ppn);
    if (Number.isNaN(n) || n < 0 || n > 100) errs.ppn = 'PPN/MDR harus angka 0–100';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const resetForm = () => {
    setForm({ nama_bayar: '', kd_rek: '', ppn: 0 });
    setErrors({});
    setEditingKey(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      if (editingKey) {
        await axios.put(`/api/akutansi/akun-bayar/${encodeURIComponent(editingKey)}`, {
          kd_rek: form.kd_rek,
          ppn: Number(form.ppn) || 0,
        });
      } else {
        await axios.post('/api/akutansi/akun-bayar', {
          nama_bayar: form.nama_bayar,
          kd_rek: form.kd_rek,
          ppn: Number(form.ppn) || 0,
        });
      }
      await fetchItems();
      resetForm();
    } catch (e) {
      const data = e?.response?.data;
      if (data && typeof data === 'object') {
        setErrors(data.errors || {});
      }
      console.error('Simpan akun bayar gagal:', e);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingKey(item.nama_bayar);
    setForm({
      nama_bayar: item.nama_bayar || '',
      kd_rek: item.kd_rek || '',
      ppn: typeof item.ppn === 'number' ? item.ppn : Number(item.ppn) || 0,
    });
  };

  const handleDelete = async (item) => {
    if (!item?.nama_bayar) return;
    if (!confirm(`Hapus akun bayar "${item.nama_bayar}"?`)) return;
    try {
      await axios.delete(`/api/akutansi/akun-bayar/${encodeURIComponent(item.nama_bayar)}`);
      await fetchItems();
      if (editingKey === item.nama_bayar) resetForm();
    } catch (e) {
      console.error('Hapus akun bayar gagal:', e);
      const msg = e?.response?.data?.message || 'Gagal menghapus akun bayar. Periksa konsol untuk detail.';
      alert(msg);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setPage(1);
    await fetchItems();
  };

  // display fallback untuk SearchableSelect jika opsi belum dimuat
  const kdRekFallback = useMemo(() => {
    if (!form.kd_rek) return null;
    const found = rekOptions.find((o) => o.value === form.kd_rek);
    return found ? found.label : form.kd_rek;
  }, [form.kd_rek, rekOptions]);

  return (
    <div>
      <Head title="Keuangan - Akun Bayar" />
      <div className="space-y-6">
        {/* Card 1: Form Input */}
        <Card title={editingKey ? `Edit Akun Bayar (${editingKey})` : 'Input Akun Bayar'}>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Akun</label>
              <input
                type="text"
                value={form.nama_bayar}
                onChange={(e) => setForm({ ...form, nama_bayar: e.target.value })}
                placeholder="Mis. Bayar Via BRI, Bank BCA, Kas Kecil"
                maxLength={50}
                disabled={!!editingKey}
                className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 ${errors.nama_bayar ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
              />
              {errors.nama_bayar && <p className="mt-1 text-xs text-red-600">{errors.nama_bayar}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">PPN/MDR (%)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={form.ppn}
                onChange={(e) => setForm({ ...form, ppn: e.target.value })}
                placeholder="Mis. 0, 1, 2"
                className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 ${errors.ppn ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
              />
              {errors.ppn && <p className="mt-1 text-xs text-red-600">{errors.ppn}</p>}
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Info className="w-3 h-3" />
                Nilai ini umumnya dipakai sebagai persentase biaya tambahan (MDR/biaya admin) per metode bayar, bukan pajak 11%. Contoh: 0 = 0%, 1 = 1%, 2 = 2%.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Kode Rekening</label>
              <SearchableSelect
                options={rekOptions}
                value={form.kd_rek}
                onChange={(val) => setForm({ ...form, kd_rek: val })}
                placeholder="Pilih Rekening"
                searchPlaceholder="Cari rekening..."
                defaultDisplay={kdRekFallback}
              />
              {errors.kd_rek && <p className="mt-1 text-xs text-red-600">{errors.kd_rek}</p>}
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

        {/* Card 2: Tabel Data Akun Bayar */}
        <Card title="Data Akun Bayar">
          <form onSubmit={handleSearch} className="mb-3 flex items-end gap-2">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Pencarian</label>
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari nama akun/kode rekening/nama rekening..."
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
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Nama Akun</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Kode Rekening</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Nama Rekening</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">PPN/MDR (%)</th>
                  <th className="px-4 py-2 text-right text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {loading ? (
                  <tr><td colSpan={5} className="px-4 py-6 text-center text-sm text-gray-500">Memuat data...</td></tr>
                ) : items.length ? (
                  items.map((item) => (
                    <tr key={item.nama_bayar} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-2 text-sm">{item.nama_bayar}</td>
                      <td className="px-4 py-2 text-sm font-mono">{item.kd_rek}</td>
                      <td className="px-4 py-2 text-sm">{item.nm_rek ?? '-'}</td>
                      <td className="px-4 py-2 text-sm">{typeof item.ppn === 'number' ? item.ppn : Number(item.ppn) || 0}</td>
                      <td className="px-4 py-2 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleEdit(item)} className="rounded-lg border border-blue-200 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-50">Edit</button>
                          <button onClick={() => handleDelete(item)} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50">Hapus</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={5} className="px-4 py-6 text-center text-sm text-gray-500">Tidak ada data.</td></tr>
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

AkunBayarPage.layout = (page) => <SidebarKeuangan title="Keuangan" children={page} />;