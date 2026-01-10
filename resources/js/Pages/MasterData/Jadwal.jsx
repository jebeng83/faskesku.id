import React, { useEffect, useRef, useState } from 'react';
import SidebarBriding from "@/Layouts/SidebarBriding";
import { Head } from "@inertiajs/react";
import {
  CalendarDaysIcon,
  IdentificationIcon,
  BuildingOffice2Icon,
  ClockIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

// Helper: typeahead dropdown yang lebih elegan
function Typeahead({ placeholder, fetchUrl, labelKey, valueKey, onSelect, defaultValue }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (defaultValue) {
      setQuery(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      if (!open) return;
      setLoading(true);
      try {
        const candidates = (Array.isArray(fetchUrl) ? fetchUrl : [fetchUrl]).map((u) => (
          query ? `${u}?q=${encodeURIComponent(query)}` : u
        ));
        let loaded = false;
        for (const url of candidates) {
          const res = await fetch(url, { signal: controller.signal, headers: { Accept: 'application/json' } }).catch(() => null);
          if (!res || !res.ok) {
            continue;
          }
          const data = await res.json().catch(() => null);
          const arr = Array.isArray(data?.data) ? data.data : [];
          setItems(arr);
          loaded = true;
          break;
        }
        if (!loaded) {
          setItems([]);
        }
      } catch (_) {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [open, query, fetchUrl]);

  return (
    <div ref={containerRef} className="relative w-full">
      <span className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
        <MagnifyingGlassIcon className="h-4 w-4" />
      </span>
      <input
        type="text"
        className="w-full border rounded-lg pl-9 pr-3 py-2 bg-white/90 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-400"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setOpen(true)}
      />
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white/95 backdrop-blur-sm border rounded-lg shadow-xl max-h-56 overflow-auto">
          {loading && (
            <div className="px-3 py-2 text-sm text-slate-500">Memuat...</div>
          )}
          {!loading && items.length === 0 && (
            <div className="px-3 py-2 text-sm text-slate-500">Tidak ada data</div>
          )}
          {!loading && items.map((it, idx) => (
            <button
              key={idx}
              type="button"
              className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-blue-50/60"
              onClick={() => {
                setQuery(`${it[valueKey]}  ${it[labelKey]}`);
                setOpen(false);
                onSelect?.(it);
              }}
            >
              <span className="inline-flex items-center justify-center min-w-[72px] px-2 py-1 rounded bg-slate-100 text-slate-700 font-mono text-xs border">{it[valueKey]}</span>
              <span className="text-slate-800 text-sm">{it[labelKey]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Jadwal() {
  const [hariOptions, setHariOptions] = useState([]);
  const [form, setForm] = useState({
    kd_dokter: '',
    nm_dokter: '',
    kd_poli: '',
    nm_poli: '',
    hari_kerja: '',
    jam_mulai: '08:00',
    jam_selesai: '12:00',
    kuota: 20,
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [tableData, setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [tableQ, setTableQ] = useState('');
  const [tableHari, setTableHari] = useState('');
  const [schemaOpen] = useState(false);
  const [schema] = useState([]);

  // Edit modal state
  const [editOpen, setEditOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editForm, setEditForm] = useState({
    hari_kerja: '',
    jam_mulai: '',
    jam_selesai: '',
    kd_poli: '',
    nm_poli: '',
    kuota: 0,
  });
  const [editSaving, setEditSaving] = useState(false);
  const [editMessage, setEditMessage] = useState('');

  useEffect(() => {
    async function loadHari() {
      try {
        const res = await fetch('/api/jadwal/hari');
        const data = await res.json();
        setHariOptions(Array.isArray(data?.data) ? data.data : []);
      } catch {
        setHariOptions(['SENIN','SELASA','RABU','KAMIS','JUMAT','SABTU','AKHAD']);
      }
    }
    loadHari();
  }, []);

  async function reloadTable(page = 1) {
    setTableLoading(true);
    try {
      const params = new URLSearchParams();
      if (tableQ) params.set('q', tableQ);
      if (tableHari) params.set('hari', tableHari);
      params.set('page', String(page));
      params.set('per_page', '15');
      const res = await fetch(`/api/jadwal?${params.toString()}`);
      const json = await res.json();
      setTableData(Array.isArray(json?.data) ? json.data : []);
    } catch (_) {
      // ignore
    } finally {
      setTableLoading(false);
    }
  }

  

  useEffect(() => {
    reloadTable(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSave() {
    setSaving(true);
    setMessage('');
    try {
      const payload = {
        kd_dokter: form.kd_dokter,
        hari_kerja: form.hari_kerja,
        jam_mulai: form.jam_mulai,
        jam_selesai: form.jam_selesai,
        kd_poli: form.kd_poli,
        kuota: Number(form.kuota || 0),
      };
      const res = await fetch('/api/jadwal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (res.status === 201) {
        setMessage('Berhasil menyimpan jadwal');
        reloadTable(1);
      } else {
        setMessage(json?.message || 'Gagal menyimpan jadwal');
      }
    } catch {
      setMessage('Terjadi kesalahan saat menyimpan jadwal');
    } finally {
      setSaving(false);
    }
  }

  const canSave = form.kd_dokter && form.kd_poli && form.hari_kerja && form.jam_mulai && form.jam_selesai;

  function resetForm() {
    setForm({
      kd_dokter: '',
      nm_dokter: '',
      kd_poli: '',
      nm_poli: '',
      hari_kerja: '',
      jam_mulai: '08:00',
      jam_selesai: '12:00',
      kuota: 20,
    });
    setMessage('');
  }

  function openEdit(row) {
    setEditItem(row);
    setEditForm({
      hari_kerja: row.hari_kerja || '',
      jam_mulai: (row.jam_mulai || '').slice(0,5),
      jam_selesai: (row.jam_selesai || '').slice(0,5),
      kd_poli: row.kd_poli || '',
      nm_poli: row.nm_poli || '',
      kuota: Number(row.kuota || 0),
    });
    setEditMessage('');
    setEditOpen(true);
  }

  async function handleEditSave() {
    if (!editItem) return;
    setEditSaving(true);
    setEditMessage('');
    try {
      // Gunakan method spoofing untuk menghindari 405 dengan PUT
      const formData = new FormData();
      formData.append('_method', 'PUT');
      formData.append('old_kd_dokter', editItem.kd_dokter);
      formData.append('old_kd_poli', editItem.kd_poli);
      formData.append('old_hari_kerja', editItem.hari_kerja);
      formData.append('old_jam_mulai', editItem.jam_mulai);
      formData.append('kd_dokter', editItem.kd_dokter);
      formData.append('kd_poli', editForm.kd_poli);
      formData.append('hari_kerja', editForm.hari_kerja);
      formData.append('jam_mulai', editForm.jam_mulai);
      formData.append('jam_selesai', editForm.jam_selesai);
      formData.append('kuota', String(Number(editForm.kuota || 0)));
      const res = await fetch('/api/jadwal', {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      if (res.ok) {
        setEditMessage('Berhasil menyimpan perubahan');
        setEditOpen(false);
        reloadTable(1);
      } else {
        setEditMessage(json?.message || 'Gagal menyimpan perubahan');
      }
    } catch {
      setEditMessage('Terjadi kesalahan saat menyimpan perubahan');
    } finally {
      setEditSaving(false);
    }
  }

  async function handleDelete(row) {
    if (!window.confirm('Hapus jadwal ini?')) return;
    try {
      // Gunakan method spoofing untuk menghindari 405 dengan DELETE
      const formData = new FormData();
      formData.append('_method', 'DELETE');
      formData.append('kd_dokter', row.kd_dokter);
      formData.append('kd_poli', row.kd_poli);
      formData.append('hari_kerja', row.hari_kerja);
      formData.append('jam_mulai', row.jam_mulai);
      const res = await fetch('/api/jadwal', {
        method: 'POST',
        body: formData,
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        reloadTable(1);
      } else {
        alert(json?.message || 'Gagal menghapus jadwal');
      }
    } catch {
      alert('Terjadi kesalahan saat menghapus jadwal');
    }
  }

  return (
    <SidebarBriding title="Briding Pcare">
      <Head title="Jadwal Dokter" />
      <div className="px-4 sm:px-6 lg:px-8 py-4 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-2 shadow">
              <CalendarDaysIcon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Jadwal Praktik Dokter</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Kelola jadwal praktik, poliklinik, waktu, dan kuota secara terstruktur.</p>
            </div>
          </div>
          <div className="flex items-center gap-2"></div>
        </div>

        {/* Card Input Data */}
        <div className="relative z-10 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm">
          <div className="border-b px-4 py-3 sm:px-6">
            <div className="flex items-center gap-2 text-slate-800">
              <IdentificationIcon className="h-5 w-5 text-blue-600" />
              <span className="font-semibold">Input Jadwal</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">Pilih dokter, hari dan jam kerja, serta poliklinik tujuan dan kuota pasien.</p>
          </div>
          <div className="p-4 sm:p-6">
            {/* Baris 1: Dokter & Poliklinik berdampingan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-700">Pencarian Dokter</label>
                <Typeahead
                  placeholder="Cari kode/nama dokter"
                  fetchUrl={["/api/v1/rs/dokter", "/api/rs/dokter"]}
                  labelKey="nm_dokter"
                  valueKey="kd_dokter"
                  onSelect={(it) => setForm((f) => ({ ...f, kd_dokter: it.kd_dokter, nm_dokter: it.nm_dokter }))}
                />
                {form.kd_dokter && (
                  <div className="mt-1 text-[12px] text-slate-600">Terpilih: {form.kd_dokter} - {form.nm_dokter}</div>
                )}
              </div>
              <div>
                <label className="text-sm text-slate-700">Pencarian Poliklinik</label>
                <Typeahead
                  placeholder="Cari kode/nama poliklinik"
                  fetchUrl={["/api/v1/rs/poliklinik", "/api/rs/poliklinik"]}
                  labelKey="nm_poli"
                  valueKey="kd_poli"
                  onSelect={(it) => setForm((f) => ({ ...f, kd_poli: it.kd_poli, nm_poli: it.nm_poli }))}
                />
                {form.kd_poli && (
                  <div className="mt-1 text-[12px] text-slate-600">Terpilih: {form.kd_poli} - {form.nm_poli}</div>
                )}
              </div>
            </div>

            {/* Baris 2: Hari Kerja, Jam Mulai, Jam Selesai, Kuota dalam satu baris */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm text-slate-700">Hari Kerja</label>
                <select
                  className="w-full border rounded-lg px-3 py-2 bg-white/90 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-400"
                  value={form.hari_kerja}
                  onChange={(e) => setForm((f) => ({ ...f, hari_kerja: e.target.value }))}
                >
                  <option value="">-- Pilih Hari --</option>
                  {hariOptions.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-700">Jam Mulai</label>
                <input
                  type="time"
                  className="w-full border rounded-lg px-3 py-2 bg-white/90 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-400"
                  value={form.jam_mulai}
                  onChange={(e) => setForm((f) => ({ ...f, jam_mulai: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm text-slate-700">Jam Selesai</label>
                <input
                  type="time"
                  className="w-full border rounded-lg px-3 py-2 bg-white/90 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-400"
                  value={form.jam_selesai}
                  onChange={(e) => setForm((f) => ({ ...f, jam_selesai: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm text-slate-700">Kuota</label>
                <input
                  type="number"
                  min={1}
                  className="w-full border rounded-lg px-3 py-2 bg-white/90 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-400"
                  value={form.kuota}
                  onChange={(e) => setForm((f) => ({ ...f, kuota: e.target.value }))}
                />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg shadow"
                onClick={handleSave}
                disabled={saving || !canSave}
              >
                <ClockIcon className="h-5 w-5 text-white/90" />
                {saving ? 'Menyimpan...' : 'Simpan Jadwal'}
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border px-4 py-2 rounded-lg"
                onClick={resetForm}
                disabled={saving}
              >
                Reset
              </button>
              {message && <span className="text-sm text-slate-700">{message}</span>}
            </div>
          </div>
        </div>

        {/* Card Datatable */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm">
          <div className="border-b px-4 py-3 sm:px-6">
            <div className="flex items-center gap-2 text-slate-800">
              <BuildingOffice2Icon className="h-5 w-5 text-indigo-600" />
              <span className="font-semibold">Daftar Jadwal</span>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <input
                type="text"
                placeholder="Cari dokter/poliklinik"
                className="border rounded-lg px-3 py-2 bg-white/90 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-400"
                value={tableQ}
                onChange={(e) => setTableQ(e.target.value)}
              />
              <select
                className="border rounded-lg px-3 py-2 bg-white/90 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-400"
                value={tableHari}
                onChange={(e) => setTableHari(e.target.value)}
              >
                <option value="">Semua Hari</option>
                {hariOptions.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
              <button
                type="button"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border px-3 py-2 rounded-lg"
                onClick={() => reloadTable(1)}
              >
                <ArrowPathIcon className="h-4 w-4 text-indigo-600" /> Refresh
              </button>
            </div>
            <div className="overflow-auto">
              <table className="min-w-full border text-sm">
                <thead className="bg-slate-50 sticky top-0">
                  <tr>
                    <th className="border px-2 py-1 text-left">Dokter</th>
                    <th className="border px-2 py-1 text-left">Poliklinik</th>
                    <th className="border px-2 py-1 text-left">Hari</th>
                    <th className="border px-2 py-1 text-left">Mulai</th>
                    <th className="border px-2 py-1 text-left">Selesai</th>
                    <th className="border px-2 py-1 text-right">Kuota</th>
                    <th className="border px-2 py-1 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {tableLoading && (
                    <tr>
                      <td colSpan={6} className="text-center py-4 text-slate-500">Memuat data...</td>
                    </tr>
                  )}
                  {!tableLoading && tableData.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-4 text-slate-500">Belum ada data jadwal</td>
                    </tr>
                  )}
                  {!tableLoading && tableData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="border px-2 py-1">
                        <span className="inline-flex items-center gap-2">
                          <span className="inline-flex items-center justify-center min-w-[60px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[11px] border">{row.kd_dokter}</span>
                          <span>{row.nm_dokter}</span>
                        </span>
                      </td>
                      <td className="border px-2 py-1">
                        <span className="inline-flex items-center gap-2">
                          <span className="inline-flex items-center justify-center min-w-[48px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[11px] border">{row.kd_poli}</span>
                          <span>{row.nm_poli}</span>
                        </span>
                      </td>
                      <td className="border px-2 py-1">
                        <span className="inline-flex items-center gap-1">
                          <CalendarDaysIcon className="h-4 w-4 text-indigo-600" />
                          {row.hari_kerja}
                        </span>
                      </td>
                      <td className="border px-2 py-1">
                        <span className="inline-flex items-center gap-1">
                          <ClockIcon className="h-4 w-4 text-sky-600" />
                          {row.jam_mulai}
                        </span>
                      </td>
                      <td className="border px-2 py-1">
                        <span className="inline-flex items-center gap-1">
                          <ClockIcon className="h-4 w-4 text-rose-600" />
                          {row.jam_selesai}
                        </span>
                      </td>
                      <td className="border px-2 py-1 text-right">{row.kuota}</td>
                      <td className="border px-2 py-1 text-center">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 px-2 py-1 rounded border bg-white hover:bg-slate-50"
                            onClick={() => openEdit(row)}
                          >
                            <PencilSquareIcon className="h-4 w-4 text-indigo-600" /> Edit
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 px-2 py-1 rounded border bg-white hover:bg-slate-50"
                            onClick={() => handleDelete(row)}
                          >
                            <TrashIcon className="h-4 w-4 text-rose-600" /> Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Edit Modal */}
            {editOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/30" onClick={() => setEditOpen(false)} />
                <div className="relative z-10 w-full max-w-lg rounded-xl border bg-white p-4 shadow-xl">
                  <div className="text-lg font-semibold mb-2">Edit Jadwal</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-slate-700">Hari Kerja</label>
                      <select
                        className="w-full border rounded-lg px-3 py-2 bg-white/90 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-400"
                        value={editForm.hari_kerja}
                        onChange={(e) => setEditForm((f) => ({ ...f, hari_kerja: e.target.value }))}
                      >
                        <option value="">-- Pilih Hari --</option>
                        {hariOptions.map((h) => (
                          <option key={h} value={h}>{h}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-slate-700">Poliklinik</label>
                      <Typeahead
                        placeholder="Cari kode/nama poliklinik"
                        fetchUrl={["/api/v1/rs/poliklinik", "/api/rs/poliklinik"]}
                        labelKey="nm_poli"
                        valueKey="kd_poli"
                        defaultValue={editForm.kd_poli && editForm.nm_poli ? `${editForm.kd_poli}  ${editForm.nm_poli}` : ''}
                        onSelect={(it) => setEditForm((f) => ({ ...f, kd_poli: it.kd_poli, nm_poli: it.nm_poli }))}
                      />
                      {editForm.kd_poli && (
                        <div className="mt-1 text-[12px] text-slate-600">Terpilih: {editForm.kd_poli} - {editForm.nm_poli}</div>
                      )}
                    </div>
                    <div>
                      <label className="text-sm text-slate-700">Jam Mulai</label>
                      <input
                        type="time"
                        className="w-full border rounded-lg px-3 py-2 bg-white/90 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-400"
                        value={editForm.jam_mulai}
                        onChange={(e) => setEditForm((f) => ({ ...f, jam_mulai: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-700">Jam Selesai</label>
                      <input
                        type="time"
                        className="w-full border rounded-lg px-3 py-2 bg-white/90 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-400"
                        value={editForm.jam_selesai}
                        onChange={(e) => setEditForm((f) => ({ ...f, jam_selesai: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-700">Kuota</label>
                      <input
                        type="number"
                        min={1}
                        className="w-full border rounded-lg px-3 py-2 bg-white/90 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-400"
                        value={editForm.kuota}
                        onChange={(e) => setEditForm((f) => ({ ...f, kuota: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg shadow"
                      onClick={handleEditSave}
                      disabled={editSaving}
                    >
                      <PencilSquareIcon className="h-5 w-5 text-white/90" />
                      {editSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border px-4 py-2 rounded-lg"
                      onClick={() => setEditOpen(false)}
                      disabled={editSaving}
                    >
                      Tutup
                    </button>
                    {editMessage && <span className="text-sm text-slate-700">{editMessage}</span>}
                  </div>
                </div>
              </div>
            )}
            {schemaOpen && (
              <div className="mt-4">
                <div className="text-slate-700 font-semibold mb-2">Struktur Tabel: jadwal</div>
                <div className="overflow-auto">
                  <table className="min-w-full border text-xs">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="border px-2 py-1 text-left">Field</th>
                        <th className="border px-2 py-1 text-left">Type</th>
                        <th className="border px-2 py-1 text-left">Null</th>
                        <th className="border px-2 py-1 text-left">Key</th>
                        <th className="border px-2 py-1 text-left">Default</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schema.length === 0 && (
                        <tr>
                          <td colSpan={5} className="text-center py-2 text-slate-500">Tidak ada data struktur</td>
                        </tr>
                      )}
                      {schema.map((col, idx) => (
                        <tr key={idx}>
                          <td className="border px-2 py-1">{col.Field || col.field || '-'}</td>
                          <td className="border px-2 py-1">{col.Type || col.type || '-'}</td>
                          <td className="border px-2 py-1">{String(col.Null ?? col.null ?? '')}</td>
                          <td className="border px-2 py-1">{col.Key || col.key || ''}</td>
                          <td className="border px-2 py-1">{String(col.Default ?? col.default ?? '')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarBriding>
  );
}
