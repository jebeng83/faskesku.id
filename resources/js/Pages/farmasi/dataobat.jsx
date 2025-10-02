import React, { useEffect, useState } from 'react';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import AppLayout from '../../Layouts/AppLayout.jsx';

const PageHeader = () => (
  <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 p-6 text-white shadow-lg">
    <div className="relative z-10">
      <h1 className="text-2xl font-bold tracking-tight">Data Obat</h1>
      <p className="mt-1 opacity-90">Kelola master data obat dari tabel databarang secara cepat dan mudah.</p>
    </div>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white" />
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-white" />
  </div>
);

const Input = ({ label, id, type = 'text', value, onChange, maxLength, placeholder, disabled, error }) => (
  <div className="space-y-1">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:text-gray-500 ${error ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-indigo-300'}`}
    />
    {error && <p className="text-xs text-red-600">{error}</p>}
  </div>
);

const ConfirmDelete = ({ open, onClose, onConfirm, item }) => (
  <AnimatePresence>
    {open && (
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }} className="mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
          <h3 className="text-lg font-semibold">Hapus Obat</h3>
          <p className="mt-2 text-sm text-gray-600">Anda yakin ingin menghapus <span className="font-medium text-gray-900">{item?.nama_brng}</span> ({item?.kode_brng})?</p>
          <div className="mt-6 flex justify-end gap-3">
            <button onClick={onClose} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Batal</button>
            <button onClick={onConfirm} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">Hapus</button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default function DataObatPage() {
  const { props } = usePage();
  const { items, filters, flash, nextCode } = props;

  const [query, setQuery] = useState(filters?.q || '');
  const [perPage, setPerPage] = useState(filters?.perPage || 10);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selected, setSelected] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    kode_brng: '',
    nama_brng: '',
    kode_sat: '',
    kode_satbesar: '',
    dasar: 0,
    h_beli: '',
    ralan: '',
    kelas1: '',
    kelas2: '',
    kelas3: '',
    utama: '',
    vip: '',
    vvip: '',
    beliluar: '',
    jualbebas: '',
    karyawan: '',
    isi: 1,
    kapasitas: 0,
    status: '1',
    letak_barang: 'Apotek',
    stokminimal: '',
    kdjns: '',
    expire: '',
    kode_industri: '',
    kode_kategori: '',
    kode_golongan: ''
  });

  useEffect(() => {
    if (flash?.success) {
      const t = setTimeout(() => {}, 2000);
      return () => clearTimeout(t);
    }
  }, [flash]);

  const openCreate = () => {
    reset();
    setIsEdit(false);
    setSelected(null);
    setData('kode_brng', (nextCode || '').toUpperCase());
    setData('dasar', 0);
    setData('isi', 1);
    setData('kapasitas', 0);
    setData('status', '1');
    setData('letak_barang', 'Apotek');
    setData('ralan', 0);
    setData('kelas1', 0);
    setData('kelas2', 0);
    setData('kelas3', 0);
    setData('utama', 0);
    setData('vip', 0);
    setData('vvip', 0);
    setData('beliluar', 0);
    setData('jualbebas', 0);
    setData('karyawan', 0);
    setData('stokminimal', 0);
    setData('kdjns', '');
    setData('expire', '');
    setData('kode_industri', '');
    setData('kode_kategori', '');
    setData('kode_golongan', '');
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setIsEdit(true);
    setSelected(item);
    setData({
      kode_brng: item.kode_brng || '',
      nama_brng: item.nama_brng || '',
      kode_sat: item.kode_sat || '',
      kode_satbesar: item.kode_satbesar || '',
      dasar: item.dasar ?? 0,
      h_beli: item.h_beli ?? '',
      ralan: item.ralan ?? '',
      kelas1: item.kelas1 ?? '',
      kelas2: item.kelas2 ?? '',
      kelas3: item.kelas3 ?? '',
      utama: item.utama ?? '',
      vip: item.vip ?? '',
      vvip: item.vvip ?? '',
      beliluar: item.beliluar ?? '',
      jualbebas: item.jualbebas ?? '',
      karyawan: item.karyawan ?? '',
      isi: item.isi ?? 1,
      kapasitas: item.kapasitas ?? 0,
      status: item.status ?? '1',
      letak_barang: item.letak_barang ?? 'Apotek',
      stokminimal: item.stokminimal ?? '',
      kdjns: item.kdjns ?? '',
      expire: item.expire ?? '',
      kode_industri: item.kode_industri ?? '',
      kode_kategori: item.kode_kategori ?? '',
      kode_golongan: item.kode_golongan ?? ''
    });
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const submitForm = (e) => {
    e.preventDefault();
    if (isEdit && selected) {
      const kodeBrng = selected.kode_brng?.trim();
      if (!kodeBrng) {
        alert('Kode barang kosong. Pilih data yang benar sebelum menyimpan perubahan.');
        return;
      }
      const updateUrl = route('farmasi.data-obat.update', { kode_brng: kodeBrng });
      router.post(updateUrl, { ...data, _method: 'PUT' }, {
        forceFormData: true,
        preserveScroll: true,
        preserveState: false,
        onSuccess: () => setModalOpen(false)
      });
    } else {
      post(route('farmasi.data-obat.store'), {
        preserveScroll: true,
        onSuccess: () => setModalOpen(false)
      });
    }
  };

  const confirmDelete = (item) => {
    setSelected(item);
    setConfirmOpen(true);
  };

  const performDelete = () => {
    if (!selected?.kode_brng) return;
    router.delete(route('farmasi.data-obat.destroy', { kode_brng: selected.kode_brng }), {
      preserveScroll: true,
      onSuccess: () => setConfirmOpen(false)
    });
  };

  const onSearch = (e) => {
    e.preventDefault();
    router.get(route('farmasi.data-obat'), { q: query, perPage }, { preserveState: true, replace: true });
  };

  const onChangePerPage = (e) => {
    const val = Number(e.target.value);
    setPerPage(val);
    router.get(route('farmasi.data-obat'), { q: query, perPage: val }, { preserveState: true, replace: true });
  };

  return (
    <div>
      <Head title="Data Obat" />
      <div className="space-y-6">
        <PageHeader />

        {flash?.success && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg bg-green-50 p-3 text-sm text-green-800">
            {flash.success}
          </motion.div>
        )}

        <div className="rounded-xl bg-white p-4 shadow-sm">
          {modalOpen && (
            <div className="mb-5 rounded-lg border border-indigo-200 bg-indigo-50/40 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{isEdit ? 'Edit Obat' : 'Tambah Obat'}</h3>
                  <p className="text-sm text-gray-600">Form berada di dalam layout utama (inline).</p>
                </div>
                <button onClick={closeModal} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100" aria-label="Tutup">✕</button>
              </div>

              <form onSubmit={submitForm} className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input label="Kode Barang" id="kode_brng" value={data.kode_brng} onChange={(e) => setData('kode_brng', e.target.value.toUpperCase())} maxLength={15} placeholder="Mis. B0001" disabled={isEdit} error={errors?.kode_brng} />
                <Input label="Nama Barang" id="nama_brng" value={data.nama_brng} onChange={(e) => setData('nama_brng', e.target.value)} maxLength={80} placeholder="Nama obat" error={errors?.nama_brng} />
                <Input label="Kode Satuan" id="kode_sat" value={data.kode_sat} onChange={(e) => setData('kode_sat', e.target.value.toUpperCase())} maxLength={4} placeholder="Mis. PCS" error={errors?.kode_sat} />
                <Input label="Kode Satuan Besar" id="kode_satbesar" value={data.kode_satbesar} onChange={(e) => setData('kode_satbesar', e.target.value.toUpperCase())} maxLength={4} placeholder="Mis. BOX" error={errors?.kode_satbesar} />
                <Input label="Harga Dasar" id="dasar" type="number" value={data.dasar} onChange={(e) => setData('dasar', e.target.value)} placeholder="0" error={errors?.dasar} />
                <Input label="Harga Beli" id="h_beli" type="number" value={data.h_beli} onChange={(e) => setData('h_beli', e.target.value)} placeholder="0" error={errors?.h_beli} />
                <Input label="Harga Ralan" id="ralan" type="number" value={data.ralan} onChange={(e) => setData('ralan', e.target.value)} placeholder="0" error={errors?.ralan} />
                <Input label="Harga Kelas 1" id="kelas1" type="number" value={data.kelas1} onChange={(e) => setData('kelas1', e.target.value)} placeholder="0" error={errors?.kelas1} />
                <Input label="Harga Kelas 2" id="kelas2" type="number" value={data.kelas2} onChange={(e) => setData('kelas2', e.target.value)} placeholder="0" error={errors?.kelas2} />
                <Input label="Harga Kelas 3" id="kelas3" type="number" value={data.kelas3} onChange={(e) => setData('kelas3', e.target.value)} placeholder="0" error={errors?.kelas3} />
                <Input label="Harga Utama" id="utama" type="number" value={data.utama} onChange={(e) => setData('utama', e.target.value)} placeholder="0" error={errors?.utama} />
                <Input label="Harga VIP" id="vip" type="number" value={data.vip} onChange={(e) => setData('vip', e.target.value)} placeholder="0" error={errors?.vip} />
                <Input label="Harga VVIP" id="vvip" type="number" value={data.vvip} onChange={(e) => setData('vvip', e.target.value)} placeholder="0" error={errors?.vvip} />
                <Input label="Harga Beli Luar" id="beliluar" type="number" value={data.beliluar} onChange={(e) => setData('beliluar', e.target.value)} placeholder="0" error={errors?.beliluar} />
                <Input label="Harga Jual Bebas" id="jualbebas" type="number" value={data.jualbebas} onChange={(e) => setData('jualbebas', e.target.value)} placeholder="0" error={errors?.jualbebas} />
                <Input label="Harga Karyawan" id="karyawan" type="number" value={data.karyawan} onChange={(e) => setData('karyawan', e.target.value)} placeholder="0" error={errors?.karyawan} />
                <Input label="Isi" id="isi" type="number" value={data.isi} onChange={(e) => setData('isi', e.target.value)} placeholder="1" error={errors?.isi} />
                <Input label="Kapasitas" id="kapasitas" type="number" value={data.kapasitas} onChange={(e) => setData('kapasitas', e.target.value)} placeholder="0" error={errors?.kapasitas} />
                <Input label="Status (0/1)" id="status" value={data.status} onChange={(e) => setData('status', e.target.value)} maxLength={1} placeholder="1" error={errors?.status} />
                <Input label="Letak Barang" id="letak_barang" value={data.letak_barang} onChange={(e) => setData('letak_barang', e.target.value)} maxLength={100} placeholder="Apotek" error={errors?.letak_barang} />
                <Input label="Stok Minimal" id="stokminimal" type="number" value={data.stokminimal} onChange={(e) => setData('stokminimal', e.target.value)} placeholder="" error={errors?.stokminimal} />
                <Input label="Jenis Obat (kdjns)" id="kdjns" value={data.kdjns} onChange={(e) => setData('kdjns', e.target.value.toUpperCase())} maxLength={4} placeholder="Mis. OBT" error={errors?.kdjns} />
                <Input label="Tanggal Expire" id="expire" type="date" value={data.expire} onChange={(e) => setData('expire', e.target.value)} placeholder="" error={errors?.expire} />
                <Input label="Kode Industri" id="kode_industri" value={data.kode_industri} onChange={(e) => setData('kode_industri', e.target.value.toUpperCase())} maxLength={5} placeholder="Mis. IND01" error={errors?.kode_industri} />
                <Input label="Kode Kategori" id="kode_kategori" value={data.kode_kategori} onChange={(e) => setData('kode_kategori', e.target.value.toUpperCase())} maxLength={4} placeholder="Mis. KAT1" error={errors?.kode_kategori} />
                <Input label="Kode Golongan" id="kode_golongan" value={data.kode_golongan} onChange={(e) => setData('kode_golongan', e.target.value.toUpperCase())} maxLength={4} placeholder="Mis. G01" error={errors?.kode_golongan} />

                <div className="md:col-span-2 mt-2 flex justify-end gap-3">
                  <button type="button" onClick={closeModal} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Batal</button>
                  <button type="submit" disabled={processing} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50">{isEdit ? 'Simpan Perubahan' : 'Simpan'}</button>
                </div>
              </form>
            </div>
          )}

          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <form onSubmit={onSearch} className="flex w-full max-w-xl items-center gap-2">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-600">Pencarian</label>
                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari kode/nama/satuan..." className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-300" />
              </div>
              <button type="submit" className="mt-6 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Cari</button>
            </form>
            <div className="flex items-center gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600">Baris per halaman</label>
                <select value={perPage} onChange={onChangePerPage} className="mt-1 rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-300">
                  {[10, 20, 50].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <button onClick={openCreate} className="mt-6 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700">+ Tambah Obat</button>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-600">Kode</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-600">Nama Barang</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-600">Satuan</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-600">Harga Beli</th>
                  <th className="px-4 py-2 text-right text-xs font-medium uppercase tracking-wider text-gray-600">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items?.data?.length ? items.data.map((item) => (
                  <tr key={item.kode_brng} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm font-mono">{item.kode_brng}</td>
                    <td className="px-4 py-2 text-sm">{item.nama_brng}</td>
                    <td className="px-4 py-2 text-sm">{item.kode_sat}</td>
                    <td className="px-4 py-2 text-sm">{item.h_beli ?? 0}</td>
                    <td className="px-4 py-2 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openEdit(item)} className="rounded-lg border border-indigo-200 px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-50">Edit</button>
                        <button onClick={() => confirmDelete(item)} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50">Hapus</button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-sm text-gray-500">Tidak ada data.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {items?.links && (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-gray-600">Menampilkan {items?.from ?? 0}-{items?.to ?? 0} dari {items?.total ?? 0} data</p>
              <div className="flex flex-wrap gap-2">
                {items.links.map((link, idx) => (
                  <Link key={idx} href={link.url || '#'} preserveState replace className={`rounded-lg px-3 py-1.5 text-xs ${link.active ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border'} ${!link.url ? 'pointer-events-none opacity-50' : ''}`} dangerouslySetInnerHTML={{ __html: link.label }} />
                ))}
              </div>
            </div>
          )}
        </div>

        <ConfirmDelete open={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={performDelete} item={selected} />
      </div>
    </div>
  );
}

DataObatPage.layout = (page) => <AppLayout title="Farmasi" children={page} />;