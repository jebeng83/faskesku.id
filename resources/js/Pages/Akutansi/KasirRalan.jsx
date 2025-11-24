import React from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import SidebarKeuangan from '@/Layouts/SidebarKeuangan';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const currency = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });

function Field({ label, children }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-gray-600 dark:text-gray-300">{label}</label>
      {children}
    </div>
  );
}

function useDateRangeDefaults() {
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);
  const fmt = (d) => d.toISOString().slice(0, 10);
  return { start: fmt(sevenDaysAgo), end: fmt(today) };
}

export default function KasirRalanPage() {
  const defaults = useDateRangeDefaults();
  const [startDate, setStartDate] = React.useState(defaults.start);
  const [endDate, setEndDate] = React.useState(defaults.end);
  const [caripenjab, setCariPenjab] = React.useState(''); // filter penjamin (png_jawab)
  const [crPoli, setCrPoli] = React.useState(''); // filter nama poliklinik
  const [crPtg, setCrPtg] = React.useState(''); // filter nama dokter/petugas
  const [status, setStatus] = React.useState('Semua');
  const [statusBayar, setStatusBayar] = React.useState('Semua');
  const [q, setQ] = React.useState('');
  const [order, setOrder] = React.useState('terbaru'); // terbaru | terlama

  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  // Buat daftar tanggal di antara startDate dan endDate (inklusif)
  const makeDateList = React.useCallback((start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    const days = [];
    const cur = new Date(s);
    while (cur <= e) {
      days.push(cur.toISOString().slice(0, 10));
      cur.setDate(cur.getDate() + 1);
    }
    return days;
  }, []);

  const loadData = React.useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const days = makeDateList(startDate, endDate);
      // Batasi maksimal 14 hari agar tidak terlalu berat
      if (days.length > 14) {
        throw new Error('Rentang tanggal terlalu panjang. Maksimal 14 hari.');
      }

      const requests = days.map((date) =>
        axios.get('/registration/get-registrations', {
          params: {
            date,
            // gunakan sebagian filter server-side agar respons lebih ringan
            kd_poli: crPoli ? undefined : undefined, // server tidak mendukung nama poli, hanya kode
            kd_dokter: crPtg ? undefined : undefined, // server tidak mendukung nama dokter, hanya kode
            status: status !== 'Semua' ? status : undefined,
            status_poli: undefined,
            search: q || undefined,
            per_page: 100,
          },
        })
      );

      const responses = await Promise.all(requests);
      // Flatten semua item dari pagination: response.data.data.data
      const items = responses.flatMap((res) => {
        const payload = res?.data?.data;
        if (!payload) return [];
        return Array.isArray(payload?.data) ? payload.data : [];
      });

      // Filter client-side: hanya Ralan
      const ralanOnly = items.filter((it) => (it?.status_lanjut || it?.status_lanjut) === 'Ralan');
      setRows(ralanOnly);
    } catch (e) {
      setError(e?.message || 'Gagal memuat data');
    } finally {
      setLoading(false);
    }
  }, [makeDateList, startDate, endDate, crPoli, crPtg, status, q]);

  React.useEffect(() => {
    // Load awal
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Terapkan filter tambahan di sisi klien (nama poli, dokter, penjamin, status bayar, dll.)
  const filtered = React.useMemo(() => {
    let data = [...rows];

    // Penjamin (png_jawab)
    if (caripenjab.trim() !== '') {
      const needle = caripenjab.toLowerCase();
      data = data.filter((r) => (r?.penjab?.png_jawab || '').toLowerCase().includes(needle) || (r?.kd_pj || '').toLowerCase().includes(needle));
    }

    // Nama Poli
    if (crPoli.trim() !== '') {
      const needle = crPoli.toLowerCase();
      data = data.filter((r) => (r?.poliklinik?.nm_poli || '').toLowerCase().includes(needle) || (r?.kd_poli || '').toLowerCase().includes(needle));
    }

    // Nama Dokter
    if (crPtg.trim() !== '') {
      const needle = crPtg.toLowerCase();
      data = data.filter((r) => (r?.dokter?.nm_dokter || '').toLowerCase().includes(needle) || (r?.kd_dokter || '').toLowerCase().includes(needle));
    }

    // Status (reg_periksa.stts)
    if (status !== 'Semua') {
      data = data.filter((r) => (r?.stts || '') === status);
    }

    // Status Bayar
    if (statusBayar !== 'Semua') {
      data = data.filter((r) => (r?.status_bayar || '') === statusBayar);
    }

    // TCari: cari di banyak kolom
    if (q.trim() !== '') {
      const needle = q.toLowerCase();
      data = data.filter((r) => {
        const fields = [
          r?.no_reg,
          r?.no_rawat,
          r?.tgl_registrasi,
          r?.jam_reg,
          r?.kd_dokter,
          r?.dokter?.nm_dokter,
          r?.no_rkm_medis,
          r?.pasien?.nm_pasien,
          r?.poliklinik?.nm_poli,
          r?.p_jawab,
          r?.almt_pj,
          r?.hubunganpj,
          r?.penjab?.png_jawab,
          r?.status_bayar,
          r?.status_poli,
        ];
        return fields.some((f) => (String(f || '').toLowerCase()).includes(needle));
      });
    }

    // Urutkan
    data.sort((a, b) => {
      const da = `${a?.tgl_registrasi || ''} ${a?.jam_reg || ''}`;
      const db = `${b?.tgl_registrasi || ''} ${b?.jam_reg || ''}`;
      if (order === 'terbaru') return db.localeCompare(da);
      return da.localeCompare(db);
    });

    return data;
  }, [rows, caripenjab, crPoli, crPtg, status, statusBayar, q, order]);

  const LCount = filtered.length;

  const statusOptions = [
    'Semua',
    'Belum',
    'Sudah',
    'Batal',
    'Berkas Diterima',
    'Dirujuk',
    'Meninggal',
    'Dirawat',
    'Pulang Paksa',
  ];

  const statusBayarOptions = ['Semua', 'Sudah Bayar', 'Belum Bayar'];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="p-4 md:p-6">
      <motion.div variants={itemVariants} className="mb-4">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">Kasir Rawat Jalan</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">Daftar pasien sesuai filter. Sumber data: reg_periksa (server-side) dengan join pasien/dokter/poliklinik/penjamin.</p>
      </motion.div>

      <motion.div variants={itemVariants} className="rounded-2xl bg-white/90 dark:bg-gray-800/80 backdrop-blur border border-white/20 dark:border-gray-700/50 shadow p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Tanggal Awal">
            <input type="date" className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 px-3 py-2 text-sm" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </Field>
          <Field label="Tanggal Akhir">
            <input type="date" className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 px-3 py-2 text-sm" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </Field>
          <Field label="Pencarian (No Rawat/RM/Nama)">
            <input placeholder="Cari…" className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 px-3 py-2 text-sm" value={q} onChange={(e) => setQ(e.target.value)} />
          </Field>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <Field label="Filter Penjamin">
            <input placeholder="Nama penjamin / kode" className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 px-3 py-2 text-sm" value={caripenjab} onChange={(e) => setCariPenjab(e.target.value)} />
          </Field>
          <Field label="Filter Poli">
            <input placeholder="Nama/Kode poli" className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 px-3 py-2 text-sm" value={crPoli} onChange={(e) => setCrPoli(e.target.value)} />
          </Field>
          <Field label="Filter Dokter/Petugas">
            <input placeholder="Nama/Kode dokter" className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 px-3 py-2 text-sm" value={crPtg} onChange={(e) => setCrPtg(e.target.value)} />
          </Field>
          <Field label="Urutan">
            <select className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 px-3 py-2 text-sm" value={order} onChange={(e) => setOrder(e.target.value)}>
              <option value="terbaru">Terbaru</option>
              <option value="terlama">Terlama</option>
            </select>
          </Field>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Field label="Status Registrasi">
            <select className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 px-3 py-2 text-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
              {statusOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </Field>
          <Field label="Status Bayar">
            <select className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 px-3 py-2 text-sm" value={statusBayar} onChange={(e) => setStatusBayar(e.target.value)}>
              {statusBayarOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </Field>
          <div className="flex items-end">
            <button onClick={loadData} disabled={loading} className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow hover:bg-blue-700 disabled:opacity-50 w-full">{loading ? 'Memuat…' : 'Muat'}</button>
          </div>
        </div>
        {error && (
          <div className="mt-3 text-sm text-red-600">{error}</div>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="flex items-center justify-between mb-2">
        <div className="text-sm text-gray-600 dark:text-gray-300">Total data: <span className="font-semibold text-gray-900 dark:text-white">{LCount}</span></div>
        <div className="text-xs text-gray-500">Catatan: maksimal rentang 14 hari.</div>
      </motion.div>

      <motion.div variants={itemVariants} className="overflow-auto rounded-2xl bg-white/90 dark:bg-gray-800/80 backdrop-blur border border-white/20 dark:border-gray-700/50 shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-900/40">
              <th className="px-3 py-2 text-left">Kode Dokter</th>
              <th className="px-3 py-2 text-left">Nama Dokter</th>
              <th className="px-3 py-2 text-left">No. RM</th>
              <th className="px-3 py-2 text-left">Pasien (Umur)</th>
              <th className="px-3 py-2 text-left">Poliklinik</th>
              <th className="px-3 py-2 text-left">Penanggung Jawab</th>
              <th className="px-3 py-2 text-left">Alamat PJ</th>
              <th className="px-3 py-2 text-left">Hubungan PJ</th>
              <th className="px-3 py-2 text-left">Biaya Reg</th>
              <th className="px-3 py-2 text-left">Penjamin</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">No. Rawat</th>
              <th className="px-3 py-2 text-left">Tgl</th>
              <th className="px-3 py-2 text-left">Jam</th>
              <th className="px-3 py-2 text-left">No. Reg</th>
              <th className="px-3 py-2 text-left">Status Bayar</th>
              <th className="px-3 py-2 text-left">Status Poli</th>
              <th className="px-3 py-2 text-left">Kd PJ</th>
              <th className="px-3 py-2 text-left">Kd Poli</th>
              <th className="px-3 py-2 text-left">No. Tlp</th>
              <th className="px-3 py-2 text-left">Keputusan</th>
              <th className="px-3 py-2 text-left">Umur</th>
              <th className="px-3 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => {
              const umurText = r?.umurdaftar != null && r?.sttsumur ? `${r.umurdaftar} ${r.sttsumur}` : (r?.pasien?.umur || '-');
              return (
                <tr key={r.no_rawat} className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50/60 dark:hover:bg-gray-900/40">
                  <td className="px-3 py-2">{r?.kd_dokter || '-'}</td>
                  <td className="px-3 py-2">{r?.dokter?.nm_dokter || '-'}</td>
                  <td className="px-3 py-2">{r?.no_rkm_medis || '-'}</td>
                  <td className="px-3 py-2">{(r?.pasien?.nm_pasien || '-') + (umurText ? ` (${umurText})` : '')}</td>
                  <td className="px-3 py-2">{r?.poliklinik?.nm_poli || '-'}</td>
                  <td className="px-3 py-2">{r?.p_jawab || '-'}</td>
                  <td className="px-3 py-2">{r?.almt_pj || '-'}</td>
                  <td className="px-3 py-2">{r?.hubunganpj || '-'}</td>
                  <td className="px-3 py-2">{currency.format(Number(r?.biaya_reg || 0))}</td>
                  <td className="px-3 py-2">{r?.penjab?.png_jawab || r?.kd_pj || '-'}</td>
                  <td className="px-3 py-2">{r?.stts || '-'}</td>
                  <td className="px-3 py-2 font-medium">{r?.no_rawat || '-'}</td>
                  <td className="px-3 py-2">{r?.tgl_registrasi || '-'}</td>
                  <td className="px-3 py-2">{r?.jam_reg || '-'}</td>
                  <td className="px-3 py-2">{r?.no_reg || '-'}</td>
                  <td className="px-3 py-2">{r?.status_bayar || '-'}</td>
                  <td className="px-3 py-2">{r?.status_poli || '-'}</td>
                  <td className="px-3 py-2">{r?.kd_pj || '-'}</td>
                  <td className="px-3 py-2">{r?.kd_poli || '-'}</td>
                  <td className="px-3 py-2">{r?.pasien?.no_tlp || '-'}</td>
                  <td className="px-3 py-2">{r?.keputusan || '-'}</td>
                  <td className="px-3 py-2">{umurText || '-'}</td>
                  <td className="px-3 py-2">
                    <div className="flex gap-2">
                      <a href={`/pembayaran/ralan/${encodeURIComponent(r.no_rawat || '')}`} className="px-2 py-1 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700">Detail</a>
                      <a href={`/akutansi/billing?no_rawat=${encodeURIComponent(r.no_rawat || '')}`} className="px-2 py-1 rounded-lg bg-slate-600 text-white text-xs font-semibold hover:bg-slate-700">Billing</a>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={23} className="px-3 py-6 text-center text-gray-500">Tidak ada data untuk filter saat ini.</td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}

KasirRalanPage.layout = (page) => (
  <SidebarKeuangan title="Keuangan">{page}</SidebarKeuangan>
);