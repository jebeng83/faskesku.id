import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import SidebarBriding from '@/Layouts/SidebarBriding';

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

function toDdMmYyyy(from) {
  // from can be 'yyyy-MM' or 'yyyy-MM-dd' or 'dd-mm-yyyy'
  if (!from) return '';
  if (/^\d{2}-\d{2}-\d{4}$/.test(from)) return from;
  if (/^\d{4}-\d{2}-\d{2}$/.test(from)) {
    const [y, m, d] = from.split('-');
    return `${d}-${m}-${y}`;
  }
  if (/^\d{4}-\d{2}$/.test(from)) {
    const [y, m] = from.split('-');
    return `01-${m}-${y}`;
  }
  return from;
}

export default function KegiatanKelompok() {
  const today = useMemo(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    return `${y}-${m}`; // type="month"
  }, []);

  const [bulan, setBulan] = useState(today); // yyyy-MM
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    setData(null);
    const ddmmyyyy = toDdMmYyyy(bulan);
    try {
      const res = await fetch(`/pcare/api/kelompok/kegiatan/${encodeURIComponent(ddmmyyyy)}`);
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
        <h1 className="text-xl font-semibold text-slate-800">Kegiatan Kelompok</h1>
        <p className="text-xs text-slate-500">Katalog BPJS: GET /kelompok/kegiatan/{'{tanggal dd-mm-yyyy}'}</p>
      </div>

      <div className="mb-4 rounded-xl border border-gray-200/60 bg-white/90 backdrop-blur-sm shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="col-span-1">
            <label className="block text-xs font-medium text-slate-700 mb-1">Bulan</label>
            <input
              type="month"
              value={bulan}
              onChange={(e) => setBulan(e.target.value)}
              className="mt-1 w-full rounded-md border-2 border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-600 shadow-sm"
            />
            <p className="text-[10px] text-slate-400 mt-1">Akan dikonversi ke dd-mm-yyyy (tanggal 01).</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-3">
        {data?.response?.list?.map((item, idx) => (
          <motion.div
            key={item.eduId || idx}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold text-slate-800">{item?.kegiatan?.nama || '—'}</div>
              <span className="text-[10px] rounded bg-emerald-50 text-emerald-700 px-2 py-0.5">
                {item?.kelompok?.nama} ({item?.kelompok?.kode})
              </span>
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <div>Edu ID: <span className="font-medium text-slate-800">{item?.eduId}</span></div>
              <div>Tgl Pelayanan: {item?.tglPelayanan || '-'}</div>
              <div>Materi: {item?.materi || '-'}</div>
              <div>Pembicara: {item?.pembicara || '-'}</div>
              <div>Lokasi: {item?.lokasi || '-'}</div>
              <div>Keterangan: {item?.keterangan || '-'}</div>
              <div>Biaya: {typeof item?.biaya !== 'undefined' ? new Intl.NumberFormat('id-ID').format(item.biaya) : '-'}</div>
            </div>
            <div className="mt-2 rounded bg-slate-50 p-2 text-[11px] text-slate-600">
              <div className="font-medium text-slate-700 mb-1">Club Prolanis</div>
              <div>Nama Club: {item?.clubProl?.nama || '-'}</div>
              <div>Program: {item?.clubProl?.jnsKelompok?.nmProgram} ({item?.clubProl?.jnsKelompok?.kdProgram})</div>
              <div>Ketua: {item?.clubProl?.ketua_nama || '-'} <span className="text-slate-400">({item?.clubProl?.ketua_noHP || '-'})</span></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

KegiatanKelompok.layout = (page) => <SidebarBriding title="Briding Pcare">{page}</SidebarBriding>;
