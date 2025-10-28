import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/Layouts/AppLayout';

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export default function PesertaKegiatan() {
  const [eduId, setEduId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  const fetchData = async () => {
    if (!eduId) {
      setError('Mohon isi eduId terlebih dahulu');
      return;
    }
    setLoading(true);
    setError('');
    setData(null);
    try {
      const res = await fetch(`/pcare/api/kelompok/peserta/${encodeURIComponent(eduId.trim())}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.metaData?.message || 'Gagal mengambil data');
      setData(json);
    } catch (e) {
      setError(e.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-slate-800">Peserta Kegiatan</h1>
        <p className="text-xs text-slate-500">Katalog BPJS: GET /kelompok/peserta/{'{eduId}'}</p>
      </div>

      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="col-span-1">
          <label className="block text-xs text-slate-600 mb-1">eduId</label>
          <input
            type="text"
            value={eduId}
            onChange={(e) => setEduId(e.target.value)}
            placeholder="Misal: 16020000001"
            className="w-full rounded-md border-slate-300 text-sm"
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={fetchData}
            disabled={loading}
            className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Memuat...' : 'Ambil Data'}
          </button>
        </div>
      </div>

      {/* Status */}
      {error && (
        <div className="mb-3 rounded-md border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</div>
      )}

      {data?.metaData && (
        <div className="mb-3 flex items-center justify-between rounded-md border border-slate-200 bg-white p-3 text-xs text-slate-600">
          <div>Meta: {data.metaData.message} (code {data.metaData.code})</div>
          <div>Count: {data.response?.count ?? '-'}</div>
        </div>
      )}

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {data?.response?.list?.map((row, idx) => (
          <motion.div
            key={`${row.peserta?.noKartu || idx}-${idx}`}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold text-slate-800">{row?.peserta?.nama || '—'}</div>
              <span className="text-[10px] rounded bg-indigo-50 text-indigo-700 px-2 py-0.5">
                {row?.eduId || eduId}
              </span>
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <div>No. Kartu: <span className="font-medium text-slate-800">{row?.peserta?.noKartu || '-'}</span></div>
              <div>Hub. Keluarga: {row?.peserta?.hubunganKeluarga || '-'}</div>
              <div>Jenis Kelamin: {row?.peserta?.sex || '-'}</div>
              <div>Tgl Lahir: {row?.peserta?.tglLahir || '-'}</div>
              <div>Status Aktif: {row?.peserta?.aktif ? 'Aktif' : 'Nonaktif'}
                {row?.peserta?.ketAktif ? ` (${row.peserta.ketAktif})` : ''}
              </div>
              <div>Tgl Mulai Aktif: {row?.peserta?.tglMulaiAktif || '-'}</div>
              <div>Tgl Akhir Berlaku: {row?.peserta?.tglAkhirBerlaku || '-'}</div>
              <div>Provider PST: {row?.peserta?.kdProviderPst?.nmProvider || '-'} <span className="text-slate-400">({row?.peserta?.kdProviderPst?.kdProvider || '-'})</span></div>
              <div>Provider Gigi: {row?.peserta?.kdProviderGigi?.nmProvider || '-'} <span className="text-slate-400">({row?.peserta?.kdProviderGigi?.kdProvider || '-'})</span></div>
              <div>Kelas: {row?.peserta?.jnsKelas?.nama || '-'} <span className="text-slate-400">(kode {row?.peserta?.jnsKelas?.kode || '-'})</span></div>
              <div>Jenis Peserta: {row?.peserta?.jnsPeserta?.nama || '-'} <span className="text-slate-400">(kode {row?.peserta?.jnsPeserta?.kode || '-'})</span></div>
              <div>Gol. Darah: {row?.peserta?.golDarah || '-'}</div>
              <div>COB: {row?.peserta?.asuransi?.cob ? 'Ya' : 'Tidak'}</div>
              <div>Tunggakan: {typeof row?.peserta?.tunggakan !== 'undefined' ? new Intl.NumberFormat('id-ID').format(row?.peserta?.tunggakan) : '-'}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

PesertaKegiatan.layout = (page) => <AppLayout title="Peserta Kegiatan" children={page} />;