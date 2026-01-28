import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Modal from '@/Components/Modal';
import { Button, Input, Label, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/Components/ui';
import { Plus, Pencil, Trash2, Search, Globe, Info, Save, Sparkles } from 'lucide-react';

export default function DataAlergi({ open, onClose, jenis }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ kd_alergi: '', nm_alergi: '' });
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null);

  const [jenisList, setJenisList] = useState([]);
  const [jenisLoading, setJenisLoading] = useState(false);
  const [jenisError, setJenisError] = useState(null);
  const [selectedKodeJenis, setSelectedKodeJenis] = useState(null);
  const [newJenisName, setNewJenisName] = useState('');
  const [q, setQ] = useState('');

  const loadJenis = async () => {
    setJenisLoading(true);
    setJenisError(null);
    try {
      const res = await axios.get('/api/alergi/jenis', { params: { per_page: 100 } });
      const data = Array.isArray(res?.data?.data) ? res.data.data : [];
      setJenisList(data);
      if (!selectedKodeJenis && data.length > 0) {
        setSelectedKodeJenis(String(data[0].kode_jenis));
      }
    } catch (e) {
      setJenisError(e?.response?.data?.message || e?.message || 'Gagal memuat jenis alergi');
    } finally {
      setJenisLoading(false);
    }
  };

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const kode_jenis = selectedKodeJenis ?? (jenis ? String(jenis) : '');
      const res = await axios.get('/api/alergi', { params: { kode_jenis, q } });
      const data = Array.isArray(res?.data?.data) ? res.data.data : [];
      setItems(data);
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || 'Gagal memuat data';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      loadJenis().then(() => {
        setTimeout(() => {
          load();
        }, 0);
      });
    }
  }, [open]);

  useEffect(() => {
    if (open && selectedKodeJenis) {
      load();
    }
  }, [selectedKodeJenis, q]);

  const createItem = async () => {
    if (!form.kd_alergi || !form.nm_alergi) return;
    const kd = form.kd_alergi.toUpperCase().trim();
    if (kd.length > 5) return setError('Kode maksimal 5 karakter');
    setSaving(true);
    try {
      try {
        await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (_) {}
      await axios.post('/api/alergi', { kd_alergi: kd, nm_alergi: form.nm_alergi.trim(), kode_jenis: Number(selectedKodeJenis) });
      setForm({ kd_alergi: '', nm_alergi: '' });
      await load();
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || 'Gagal menyimpan';
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const generateKodeAlergi = async () => {
    setSaving(true);
    try {
      const res = await axios.get('/api/alergi/next-code');
      const js = res?.data || {};
      const next = js?.next_code || js?.kode || '';
      if (next) {
        setForm((f) => ({ ...f, kd_alergi: String(next).toUpperCase().trim() }));
      }
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || 'Gagal generate kode';
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const updateItem = async (item) => {
    setSaving(true);
    try {
      try {
        await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (_) {}
      await axios.put(`/api/alergi/${encodeURIComponent(item.kd_alergi)}`, { nm_alergi: String(item.nm_alergi || '').trim() });
      setEditing(null);
      await load();
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || 'Gagal memperbarui';
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async (id) => {
    setSaving(true);
    try {
      try {
        await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (_) {}
      await axios.delete(`/api/alergi/${encodeURIComponent(id)}`);
      await load();
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || 'Gagal menghapus';
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const tambahJenis = async () => {
    const nama = newJenisName.trim();
    if (!nama) return;
    setSaving(true);
    try {
      try {
        await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (_) {}
      await axios.post('/api/alergi/jenis', { nama_jenis: nama });
      setNewJenisName('');
      await loadJenis();
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || 'Gagal menambah jenis';
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const renameJenis = async () => {
    const nama = newJenisName.trim();
    if (!nama || !selectedKodeJenis) return;
    setSaving(true);
    try {
      try {
        await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (_) {}
      await axios.put(`/api/alergi/jenis/${encodeURIComponent(selectedKodeJenis)}`, { nama_jenis: nama });
      setNewJenisName('');
      await loadJenis();
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || 'Gagal memperbarui jenis';
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const hapusJenis = async () => {
    if (!selectedKodeJenis) return;
    setSaving(true);
    try {
      try {
        await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (_) {}
      await axios.delete(`/api/alergi/jenis/${encodeURIComponent(selectedKodeJenis)}`);
      await loadJenis();
    } catch (e) {
      if (e?.response?.status === 409) {
        const js = e?.response?.data || {};
        const msg409 = js?.message || 'Jenis tidak dapat dihapus';
        setError(msg409);
      } else {
        const msg = e?.response?.data?.message || e?.message || 'Gagal menghapus jenis';
        setError(msg);
      }
    } finally {
      setSaving(false);
    }
  };

  const selectedJenisLabel = selectedKodeJenis ? (jenisList.find((j) => String(j.kode_jenis) === String(selectedKodeJenis))?.nama_jenis || '') : '';

  return (
    <Modal show={open} onClose={onClose} title="Manajemen Data Alergi" size="xl" showTopGradient>
      <motion.div className="space-y-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-3 items-end">
          <div>
            <Label className="text-sm font-semibold">Jenis Alergi</Label>
            <Select value={selectedKodeJenis || ''} onValueChange={(v) => setSelectedKodeJenis(v)}>
              <SelectTrigger className="h-9 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                <SelectValue placeholder={jenisLoading ? 'Memuat…' : 'Pilih'} selectedValue={selectedJenisLabel} />
              </SelectTrigger>
              <SelectContent>
                {jenisList.length === 0 ? (
                  <SelectItem value="">Belum ada jenis</SelectItem>
                ) : (
                  jenisList.map((j) => (
                    <SelectItem key={j.kode_jenis} value={String(j.kode_jenis)}>{j.nama_jenis}</SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Label className="text-sm font-semibold">Cari Alergi</Label>
              <div className="relative">
                <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari alergi (nama)…" className="h-9 pl-9 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm" />
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="flex-1">
              <Label className="text-sm font-semibold">Jenis Baru / Ubah Nama</Label>
              <Input value={newJenisName} onChange={(e) => setNewJenisName(e.target.value)} placeholder="Nama jenis" className="h-9 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm" />
            </div>
            <Button type="button" onClick={tambahJenis} disabled={saving} className="h-9 px-3 bg-blue-600 hover:bg-blue-700 text-white inline-flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Tambah Jenis
            </Button>
            <Button type="button" onClick={renameJenis} disabled={saving || !selectedKodeJenis} className="h-9 px-3 bg-indigo-600 hover:bg-indigo-700 text-white inline-flex items-center gap-2">
              <Pencil className="w-4 h-4" />
              Ubah Nama
            </Button>
            <Button type="button" onClick={hapusJenis} disabled={saving || !selectedKodeJenis} className="h-9 px-3 border border-red-500 text-red-600 inline-flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Hapus Jenis
            </Button>
          </div>
        </div>

        {jenisError && (
          <div className="flex items-center gap-2 text-xs text-red-600">
            <Info className="w-3 h-3" />
            {jenisError}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_auto] gap-3 items-end">
          <div>
            <Label className="text-sm font-semibold">Kode Alergi</Label>
            <Input value={form.kd_alergi} onChange={(e) => setForm((f) => ({ ...f, kd_alergi: e.target.value }))} placeholder="Maks. 5 karakter" maxLength={5} className="h-9 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm" />
          </div>
          <div>
            <Label className="text-sm font-semibold">Nama Alergi</Label>
            <Input value={form.nm_alergi} onChange={(e) => setForm((f) => ({ ...f, nm_alergi: e.target.value }))} placeholder="Masukkan nama" className="h-9 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm" />
          </div>
          <div className="flex items-center gap-2">
            <Button type="button" onClick={generateKodeAlergi} disabled={saving} variant="outline" className="h-9 px-3 inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Otomatis
            </Button>
            <Button type="button" onClick={createItem} disabled={saving || !selectedKodeJenis} className="h-9 px-3 bg-emerald-600 hover:bg-emerald-700 text-white inline-flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Tambah
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
          {loading ? (
            <div className="p-4 text-sm">Memuat…</div>
          ) : items.length === 0 ? (
            <div className="p-8 text-sm flex flex-col items-center justify-center gap-2">
              <Globe className="w-10 h-10 text-gray-400" />
              <span>Tidak ada data.</span>
            </div>
          ) : (
            items.map((it) => (
              <div key={it.kd_alergi} className="p-3 flex items-center gap-3 border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="w-24 text-sm font-semibold">{it.kd_alergi}</div>
                <div className="flex-1">
                  {editing === it.kd_alergi ? (
                    <Input value={it.nm_alergi} onChange={(e) => setItems((arr) => arr.map((x) => (x.kd_alergi === it.kd_alergi ? { ...x, nm_alergi: e.target.value } : x)))} className="h-9 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm" />
                  ) : (
                    <div className="text-sm">{it.nm_alergi}</div>
                  )}
                </div>
                {editing === it.kd_alergi ? (
                  <Button type="button" onClick={() => updateItem(it)} disabled={saving} aria-label="Simpan" size="icon" className="h-8 w-8 bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Save className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button type="button" onClick={() => setEditing(it.kd_alergi)} variant="outline" size="icon" className="h-8 w-8">
                    <Pencil className="w-4 h-4 text-blue-600" />
                  </Button>
                )}
                <Button type="button" onClick={() => deleteItem(it.kd_alergi)} disabled={saving} variant="outline" size="icon" className="h-8 w-8 border-red-500 text-red-600">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))
          )}
        </div>

        {error && (
          <div className="flex items-center gap-2 text-xs text-red-600">
            <Info className="w-3 h-3" />
            {error}
          </div>
        )}
      </motion.div>
    </Modal>
  );
}
