import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, PlusIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

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

  const loadJenis = async () => {
    setJenisLoading(true);
    setJenisError(null);
    try {
      let res = await fetch(`/api/alergi/jenis?per_page=100`, { headers: { Accept: 'application/json' }, credentials: 'same-origin' });
      if (res.status === 419) {
        await fetch('/sanctum/csrf-cookie', { credentials: 'same-origin' }).catch(() => {});
        res = await fetch(`/api/alergi/jenis?per_page=100`, { headers: { Accept: 'application/json' }, credentials: 'same-origin' });
      }
      if (res.status === 401) {
        throw new Error('Unauthenticated. Silakan login kembali.');
      }
      const json = await res.json();
      const data = Array.isArray(json?.data) ? json.data : [];
      setJenisList(data);
      if (!selectedKodeJenis && data.length > 0) {
        setSelectedKodeJenis(String(data[0].kode_jenis));
      }
    } catch (e) {
      setJenisError(e?.message || 'Gagal memuat jenis alergi');
    } finally {
      setJenisLoading(false);
    }
  };

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const kode_jenis = selectedKodeJenis ?? (jenis ? String(jenis) : '');
      const params = new URLSearchParams({ kode_jenis });
      let res = await fetch(`/api/alergi?${params.toString()}`, { headers: { Accept: 'application/json' }, credentials: 'same-origin' });
      if (res.status === 419) {
        await fetch('/sanctum/csrf-cookie', { credentials: 'same-origin' }).catch(() => {});
        res = await fetch(`/api/alergi?${params.toString()}`, { headers: { Accept: 'application/json' }, credentials: 'same-origin' });
      }
      if (res.status === 401) {
        throw new Error('Unauthenticated. Silakan login kembali.');
      }
      const json = await res.json();
      const data = Array.isArray(json?.data) ? json.data : [];
      setItems(data);
    } catch (e) {
      setError(e?.message || 'Gagal memuat data');
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
  }, [selectedKodeJenis]);

  const createItem = async () => {
    if (!form.kd_alergi || !form.nm_alergi) return;
    const kd = form.kd_alergi.toUpperCase().trim();
    if (kd.length > 5) return setError('Kode maksimal 5 karakter');
    setSaving(true);
    try {
      const res = await fetch('/api/alergi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ kd_alergi: kd, nm_alergi: form.nm_alergi.trim(), kode_jenis: Number(selectedKodeJenis) }),
      });
      if (!res.ok) throw new Error('Gagal menyimpan');
      setForm({ kd_alergi: '', nm_alergi: '' });
      await load();
    } catch (e) {
      setError(e?.message || 'Gagal menyimpan');
    } finally {
      setSaving(false);
    }
  };

  const generateKodeAlergi = async () => {
    setSaving(true);
    try {
      let res = await fetch('/api/alergi/next-code', { headers: { Accept: 'application/json' }, credentials: 'same-origin' });
      if (res.status === 419) {
        await fetch('/sanctum/csrf-cookie', { credentials: 'same-origin' }).catch(() => {});
        res = await fetch('/api/alergi/next-code', { headers: { Accept: 'application/json' }, credentials: 'same-origin' });
      }
      if (!res.ok) throw new Error('Gagal generate kode');
      const js = await res.json();
      const next = js?.next_code || js?.kode || '';
      if (next) {
        setForm((f) => ({ ...f, kd_alergi: String(next).toUpperCase().trim() }));
      }
    } catch (e) {
      setError(e?.message || 'Gagal generate kode');
    } finally {
      setSaving(false);
    }
  };

  const updateItem = async (item) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/alergi/${encodeURIComponent(item.kd_alergi)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ nm_alergi: String(item.nm_alergi || '').trim() }),
      });
      if (!res.ok) throw new Error('Gagal memperbarui');
      setEditing(null);
      await load();
    } catch (e) {
      setError(e?.message || 'Gagal memperbarui');
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async (id) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/alergi/${encodeURIComponent(id)}`, { method: 'DELETE', headers: { Accept: 'application/json' }, credentials: 'same-origin' });
      if (!res.ok) throw new Error('Gagal menghapus');
      await load();
    } catch (e) {
      setError(e?.message || 'Gagal menghapus');
    } finally {
      setSaving(false);
    }
  };

  const tambahJenis = async () => {
    const nama = newJenisName.trim();
    if (!nama) return;
    setSaving(true);
    try {
      const res = await fetch('/api/alergi/jenis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ nama_jenis: nama }),
      });
      if (!res.ok) throw new Error('Gagal menambah jenis');
      setNewJenisName('');
      await loadJenis();
    } catch (e) {
      setError(e?.message || 'Gagal menambah jenis');
    } finally {
      setSaving(false);
    }
  };

  const renameJenis = async () => {
    const nama = newJenisName.trim();
    if (!nama || !selectedKodeJenis) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/alergi/jenis/${encodeURIComponent(selectedKodeJenis)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ nama_jenis: nama }),
      });
      if (!res.ok) throw new Error('Gagal memperbarui jenis');
      setNewJenisName('');
      await loadJenis();
    } catch (e) {
      setError(e?.message || 'Gagal memperbarui jenis');
    } finally {
      setSaving(false);
    }
  };

  const hapusJenis = async () => {
    if (!selectedKodeJenis) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/alergi/jenis/${encodeURIComponent(selectedKodeJenis)}`, { method: 'DELETE', headers: { Accept: 'application/json' }, credentials: 'same-origin' });
      if (res.status === 409) {
        const js = await res.json().catch(() => ({}));
        throw new Error(js?.message || 'Jenis tidak dapat dihapus');
      }
      if (!res.ok) throw new Error('Gagal menghapus jenis');
      await loadJenis();
    } catch (e) {
      setError(e?.message || 'Gagal menghapus jenis');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[99999] flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-[oklch(14.5%_0_0_/_0.6)] backdrop-blur-sm" onClick={onClose} />
          <motion.div className="relative z-[100000] w-full max-w-2xl rounded-2xl bg-[oklch(14.5%_0_0)] text-[oklch(84.1%_0.238_128.85)] border border-[oklch(84.1%_0.238_128.85_/_0.45)] shadow-[0_0_18px_oklch(84.1%_0.238_128.85_/_0.35)] p-4 font-mono" initial={{ scale: 0.98, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.98, opacity: 0, y: 20 }}>
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">Manajemen Data Alergi</div>
              <button onClick={onClose} className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-[oklch(84.1%_0.238_128.85_/_0.45)] text-[oklch(84.1%_0.238_128.85)] hover:bg-[oklch(14.5%_0_0_/_0.9)]">
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Jenis Alergi:</span>
                <select
                  value={selectedKodeJenis || ''}
                  onChange={(e) => setSelectedKodeJenis(e.target.value)}
                  className="h-8 px-2 rounded-md bg-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.45)]"
                >
                  {jenisLoading ? (
                    <option value="">Memuat…</option>
                  ) : jenisList.length === 0 ? (
                    <option value="">Belum ada jenis</option>
                  ) : (
                    jenisList.map((j) => (
                      <option key={j.kode_jenis} value={String(j.kode_jenis)}>{j.nama_jenis}</option>
                    ))
                  )}
                </select>
                <input
                  value={newJenisName}
                  onChange={(e) => setNewJenisName(e.target.value)}
                  className="h-8 px-2 rounded-md bg-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.45)] flex-1"
                  placeholder="Nama jenis baru / ubah nama"
                />
                <button onClick={tambahJenis} disabled={saving} className="h-8 px-3 rounded-md bg-[oklch(84.1%_0.238_128.85)] text-[oklch(14.5%_0_0)] text-xs border border-[oklch(84.1%_0.238_128.85)]">Tambah Jenis</button>
                <button onClick={renameJenis} disabled={saving || !selectedKodeJenis} className="h-8 px-3 rounded-md bg-[oklch(84.1%_0.238_128.85)] text-[oklch(14.5%_0_0)] text-xs border border-[oklch(84.1%_0.238_128.85)]">Ubah Nama</button>
                <button onClick={hapusJenis} disabled={saving || !selectedKodeJenis} className="h-8 px-3 rounded-md border border-red-500 text-red-500 text-xs hover:bg-[oklch(14.5%_0_0_/_0.9)]">Hapus Jenis</button>
              </div>
              {jenisError && <div className="mt-1 text-xs text-red-500">{jenisError}</div>}
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-end gap-2">
                <div className="flex-1 grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] mb-1">Kode Alergi</label>
                    <input value={form.kd_alergi} onChange={(e) => setForm((f) => ({ ...f, kd_alergi: e.target.value }))} className="w-full h-9 px-2 rounded-md bg-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.45)]" placeholder="Maks. 5 karakter" maxLength={5} />
                    <div className="mt-2">
                      <button onClick={generateKodeAlergi} disabled={saving} className="h-8 px-3 rounded-md border border-[oklch(84.1%_0.238_128.85_/_0.45)] text-[oklch(84.1%_0.238_128.85)]">Otomatis</button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] mb-1">Nama Alergi</label>
                    <input value={form.nm_alergi} onChange={(e) => setForm((f) => ({ ...f, nm_alergi: e.target.value }))} className="w-full h-9 px-2 rounded-md bg-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.45)]" placeholder="Masukkan nama" />
                  </div>
                </div>
                <button onClick={createItem} disabled={saving || !selectedKodeJenis} className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-[oklch(84.1%_0.238_128.85)] text-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85)]">
                  <PlusIcon className="h-4 w-4" />
                  Tambah
                </button>
              </div>
              <div className="rounded-xl border border-[oklch(84.1%_0.238_128.85_/_0.35)] overflow-hidden">
                <div className="divide-y divide-[oklch(84.1%_0.238_128.85_/_0.25)]">
                  {loading ? (
                    <div className="p-4 text-sm">Memuat…</div>
                  ) : items.length === 0 ? (
                    <div className="p-4 text-sm">Belum ada data.</div>
                  ) : (
                    items.map((it) => (
                      <div key={it.kd_alergi} className="p-3 flex items-center gap-3">
                        <div className="w-24 text-sm font-semibold">{it.kd_alergi}</div>
                        <div className="flex-1">
                          {editing === it.kd_alergi ? (
                            <input value={it.nm_alergi} onChange={(e) => setItems((arr) => arr.map((x) => (x.kd_alergi === it.kd_alergi ? { ...x, nm_alergi: e.target.value } : x)))} className="w-full h-9 px-2 rounded-md bg-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.45)]" />
                          ) : (
                            <div className="text-sm">{it.nm_alergi}</div>
                          )}
                        </div>
                        {editing === it.kd_alergi ? (
                          <button onClick={() => updateItem(it)} disabled={saving} className="h-8 px-3 rounded-md bg-[oklch(84.1%_0.238_128.85)] text-[oklch(14.5%_0_0)] text-xs border border-[oklch(84.1%_0.238_128.85)]">Simpan</button>
                        ) : (
                          <button onClick={() => setEditing(it.kd_alergi)} className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-[oklch(84.1%_0.238_128.85_/_0.45)] text-[oklch(84.1%_0.238_128.85)] hover:bg-[oklch(14.5%_0_0_/_0.9)]">
                            <PencilSquareIcon className="h-4 w-4" />
                          </button>
                        )}
                        <button onClick={() => deleteItem(it.kd_alergi)} disabled={saving} className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-red-500 text-red-500 hover:bg-[oklch(14.5%_0_0_/_0.9)]">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
              {error && <div className="text-xs text-red-500">{error}</div>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
