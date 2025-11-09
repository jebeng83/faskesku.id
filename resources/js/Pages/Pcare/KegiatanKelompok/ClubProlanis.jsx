import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/Layouts/AppLayout';

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export default function ClubProlanis() {
  const [kdProgram, setKdProgram] = useState('01');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    setData(null);
    try {
      const res = await fetch(`/pcare/api/kelompok/club/${encodeURIComponent(kdProgram)}`);
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
        <h1 className="text-xl font-semibold text-slate-800">Club Prolanis</h1>
        <p className="text-xs text-slate-500">Katalog BPJS: GET /kelompok/club/{'{kdProgram}'}</p>
      </div>

      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="col-span-1">
          <label className="block text-xs text-slate-600 mb-1">Jenis Kelompok (kdProgram)</label>
          <select
            value={kdProgram}
            onChange={(e) => setKdProgram(e.target.value)}
            className="w-full rounded-md border-slate-300 text-sm"
          >
            <option value="01">01 - Diabetes Melitus</option>
            <option value="02">02 - Hipertensi</option>
          </select>
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
        {data?.response?.list?.map((item, idx) => (
          <motion.div
            key={item.clubId || idx}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold text-slate-800">{item?.nama || '—'}</div>
              <span className="text-[10px] rounded bg-indigo-50 text-indigo-700 px-2 py-0.5">
                {item?.jnsKelompok?.nmProgram} ({item?.jnsKelompok?.kdProgram})
              </span>
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <div>Club ID: <span className="font-medium text-slate-800">{item?.clubId}</span></div>
              <div>Tgl Mulai: {item?.tglMulai || '-'}</div>
              <div>Tgl Akhir: {item?.tglAkhir || '-'}</div>
              <div>Alamat: {item?.alamat || '-'}</div>
              <div>Ketua: {item?.ketua_nama || '-'} <span className="text-slate-400">({item?.ketua_noHP || '-'})</span></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

ClubProlanis.layout = (page) => <AppLayout title="Club Prolanis" children={page} />;