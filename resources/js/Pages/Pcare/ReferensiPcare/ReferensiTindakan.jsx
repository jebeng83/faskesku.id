import React, { useEffect, useMemo, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ReferensiTindakan() {
  const [kdTkp, setKdTkp] = useState('10'); // 10=RJTP, 20=RITP, 50=Promotif
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(25);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const url = useMemo(() => {
    const params = new URLSearchParams();
    params.set('kdTkp', kdTkp);
    params.set('start', String(start));
    params.set('limit', String(limit));
    return `/api/pcare/tindakan?${params.toString()}`;
  }, [kdTkp, start, limit]);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.metaData?.message || 'Gagal memuat data Referensi Tindakan');
      const list = json?.response?.list || [];
      setData(list);
      setCount(json?.response?.count || list.length || 0);
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
            <h1 className="text-xl font-semibold text-slate-800 tracking-tight">Referensi Tindakan</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700">GET</span>
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700">JSON</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-3">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">KD TKP</label>
          <select
            value={kdTkp}
            onChange={(e) => setKdTkp(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="10">RJTP (10)</option>
            <option value="20">RITP (20)</option>
            <option value="50">Promotif (50)</option>
          </select>
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
        <div className="md:col-span-2 flex items-end">
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
          <div className="ml-3 text-[11px] text-slate-500">Total ditemukan: <span className="font-semibold text-slate-700">{count}</span></div>
        </div>
      </div>

      {/* Status */}
      {loading && (
        <div className="mb-3 text-xs text-slate-500">Memuat data Referensi Tindakan...</div>
      )}
      {error && (
        <div className="mb-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2">{error}</div>
      )}

      {/* List */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left px-3 py-2 font-semibold text-slate-700">Kode</th>
              <th className="text-left px-3 py-2 font-semibold text-slate-700">Nama Tindakan</th>
              <th className="text-right px-3 py-2 font-semibold text-slate-700">Max Tarif</th>
              <th className="text-center px-3 py-2 font-semibold text-slate-700">With Value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={`${item.kdTindakan || idx}-${idx}`} className="border-t border-slate-100">
                <td className="px-3 py-2 font-mono text-slate-800">{item.kdTindakan || '-'}</td>
                <td className="px-3 py-2 text-slate-800">{(item.nmTindakan || '').toString().replace(/\r\n/g, ' ').trim()}</td>
                <td className="px-3 py-2 text-right text-slate-800">{typeof item.maxTarif === 'number' ? item.maxTarif.toLocaleString('id-ID') : '-'}</td>
                <td className="px-3 py-2 text-center">
                  <span className={classNames('inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium', item.withValue ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700')}>
                    {item.withValue ? 'Ya' : 'Tidak'}
                  </span>
                </td>
              </tr>
            ))}
            {!loading && !error && data.length === 0 && (
              <tr>
                <td colSpan={4} className="px-3 py-6 text-center text-slate-500 text-sm">Tidak ada data untuk filter saat ini.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

ReferensiTindakan.layout = (page) => <AppLayout title="Referensi Tindakan PCare" children={page} />;