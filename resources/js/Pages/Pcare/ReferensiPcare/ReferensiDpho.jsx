import React, { useEffect, useMemo, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ReferensiDpho() {
  const [q, setQ] = useState('');
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(25);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const url = useMemo(() => {
    const params = new URLSearchParams();
    if (q && q.trim() !== '') params.set('q', q.trim());
    params.set('start', String(start));
    params.set('limit', String(limit));
    return `/api/pcare/dpho?${params.toString()}`;
  }, [q, start, limit]);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(url);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.metaData?.message || 'Gagal memuat data DPHO');
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500">Referensi PCare</div>
            <h1 className="text-xl font-semibold text-slate-800 tracking-tight">Referensi DPHO</h1>
          </div>
          <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700">PCare</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-slate-600 mb-1">Kata kunci DPHO</label>
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Masukkan kode/nama obat"
            className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Start</label>
          <input
            type="number"
            value={start}
            min={0}
            onChange={(e) => setStart(Number(e.target.value) || 0)}
            className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Limit</label>
          <input
            type="number"
            value={limit}
            min={1}
            onChange={(e) => setLimit(Number(e.target.value) || 25)}
            className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mb-3 flex items-center gap-2">
        <button
          type="button"
          onClick={fetchData}
          className={classNames(
            'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium',
            'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500',
          )}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h10M4 18h7" />
          </svg>
          Muat Data
        </button>
        <div className="text-[11px] text-slate-500">Total ditemukan: <span className="font-semibold text-slate-700">{count}</span></div>
      </div>

      {/* Status */}
      {loading && (
        <div className="mb-3 text-xs text-slate-500">Memuat data DPHO...</div>
      )}
      {error && (
        <div className="mb-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2">{error}</div>
      )}

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.map((item) => (
          <div
            key={`${item.kdObat}-${item.nmObat}`}
            className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-800 leading-tight">{item.nmObat}</div>
                <div className="text-[11px] text-slate-500">Kode: <span className="font-mono">{item.kdObat}</span></div>
              </div>
              <div className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">Sedia: {item.sedia}</div>
            </div>
          </div>
        ))}
        {!loading && !error && data.length === 0 && (
          <div className="text-[11px] text-slate-500">Tidak ada data untuk filter saat ini.</div>
        )}
      </div>
    </div>
  );
}

ReferensiDpho.layout = (page) => <AppLayout title="Referensi DPHO PCare" children={page} />;