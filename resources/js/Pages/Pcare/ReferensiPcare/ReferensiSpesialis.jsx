import React, { useEffect, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';

export default function ReferensiSpesialis() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/pcare/spesialis');
      const json = await res.json();
      if (!res.ok) throw new Error(json?.metaData?.message || 'Gagal memuat data spesialis');
      const list = json?.response?.list || [];
      setData(list);
      setCount(json?.response?.count || list.length);
    } catch (e) {
      setError(e.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500">Referensi PCare</div>
            <h1 className="text-xl font-semibold text-slate-800 tracking-tight">Referensi Spesialis</h1>
          </div>
          <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700">PCare</span>
        </div>
      </div>

      <div className="mb-3 flex items-center gap-2">
        <button
          type="button"
          onClick={fetchData}
          className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h10M4 18h7" />
          </svg>
          Muat Ulang
        </button>
        <div className="text-[11px] text-slate-500">Total ditemukan: <span className="font-semibold text-slate-700">{count}</span></div>
      </div>

      {/* Status */}
      {loading && (
        <div className="mb-3 text-xs text-slate-500">Memuat data spesialis...</div>
      )}
      {error && (
        <div className="mb-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2">{error}</div>
      )}

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.map((item) => (
          <div
            key={`${item.kdSpesialis}-${item.nmSpesialis}`}
            className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-800 leading-tight">{item.nmSpesialis}</div>
                <div className="text-[11px] text-slate-500">Kode: <span className="font-mono">{item.kdSpesialis}</span></div>
              </div>
            </div>
          </div>
        ))}
        {!loading && !error && data.length === 0 && (
          <div className="text-[11px] text-slate-500">Tidak ada data untuk saat ini.</div>
        )}
      </div>
    </div>
  );
}

ReferensiSpesialis.layout = (page) => <AppLayout title="Referensi Spesialis PCare" children={page} />;