import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Diagnosa({ noRawat = '' }) {
    const [doctorName, setDoctorName] = useState('');
    const [rows, setRows] = useState([{ kode: '', nama: '' }]);
    const [savedList, setSavedList] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [saveStatus, setSaveStatus] = useState(null);

    useEffect(() => {
        const loadDoctor = async () => {
            if (!noRawat) return;
            try {
                const resp = await axios.get('/api/reg-periksa/by-rawat', {
                    params: { no_rawat: noRawat },
                    withCredentials: true,
                    headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
                });
                const d = resp?.data?.data || {};
                const nm = d?.dokter?.nm_dokter || d?.nm_dokter || '';
                setDoctorName(nm);
            } catch {}
        };
        loadDoctor();
    }, [noRawat]);

    useEffect(() => {
        const loadSaved = async () => {
            if (!noRawat) return;
            try {
                try { await axios.get('/sanctum/csrf-cookie', { withCredentials: true }); } catch {}
                const response = await axios.get('/api/rawat-jalan/diagnosa', {
                    params: { no_rawat: noRawat },
                    withCredentials: true,
                    headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
                });
                const list = response?.data?.data || [];
                const mapped = list.map((it) => ({ kode: it.kode, nama: it.nama, type: it.type }));
                setSavedList(mapped);
            } catch {}
        };
        loadSaved();
    }, [noRawat]);

    const updateRow = (idx, key, value) => {
        setRows((prev) => prev.map((r, i) => (i === idx ? { ...r, [key]: key === 'kode' ? String(value).toUpperCase() : value } : r)));
    };

    const resolveNamaByKode = async (idx) => {
        const code = String(rows[idx]?.kode || '').trim();
        if (!code) {
            updateRow(idx, 'nama', '');
            return;
        }
        try {
            const response = await axios.get('/api/pcare/diagnosa', {
                params: { q: code, start: 0, limit: 50 },
                withCredentials: true,
                headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
            });
            const data = response?.data || {};
            const list = data?.response?.list || data?.list || data?.data || [];
            const match = list.find((it) => String(it?.kdDiag || it?.kode || '').toUpperCase() === code.toUpperCase());
            const name = match ? (match?.nmDiag || match?.nama || '') : '';
            updateRow(idx, 'nama', name);
        } catch {
            updateRow(idx, 'nama', '');
        }
    };

    const addRow = () => {
        setRows((prev) => [...prev, { kode: '', nama: '' }]);
    };

    const removeRow = (idx) => {
        setRows((prev) => prev.filter((_, i) => i !== idx));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            setSaveStatus(null);
            try { await axios.get('/sanctum/csrf-cookie', { withCredentials: true }); } catch {}
            const list = rows.filter((r) => r.kode && r.nama).map((r, i) => ({ kode: r.kode, nama: r.nama, type: i === 0 ? 'utama' : 'sekunder' }));
            const response = await axios.post('/api/rawat-jalan/diagnosa', { no_rawat: noRawat, list }, {
                withCredentials: true,
                headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
            });
            const saved = response?.data?.data || [];
            const mapped = saved.map((it) => ({ kode: it.kode, nama: it.nama, type: it.type }));
            setSavedList(mapped);
            setRows([{ kode: '', nama: '' }]);
            setSaveStatus({ type: 'success', message: 'Diagnosa berhasil disimpan' });
        } catch (e) {
            setSaveStatus({ type: 'error', message: e?.message || 'Gagal menyimpan diagnosa' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const jenisLabel = (i) => (i === 0 ? 'Utama' : 'Sekunder');

    return (
        <div className="space-y-6 p-4 md:p-6">
            <form onSubmit={handleSubmit} className="space-y-6 bg-[oklch(98.5%_0_0)]">
                {saveStatus?.message && (
                    <div className={`px-4 py-2 rounded-md border text-sm ${
                        saveStatus.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                    }`}>
                        {saveStatus.message}
                    </div>
                )}

                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-sm font-semibold">Diagnosa</div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300">
                                <tr>
                                    <th className="px-3 py-2 text-left w-56">Dokter</th>
                                    <th className="px-3 py-2 text-left w-32">ICD-X</th>
                                    <th className="px-3 py-2 text-left">Diagnosa</th>
                                    <th className="px-3 py-2 text-left w-28">Jenis</th>
                                    <th className="px-3 py-2 text-left w-24">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {rows.map((row, idx) => (
                                    <tr key={idx} className="bg-white dark:bg-gray-800">
                                        <td className="px-3 py-2">
                                            <input type="text" value={doctorName} readOnly className="w-full border rounded px-2 py-1 text-sm bg-gray-50 dark:bg-gray-700 dark:text-white" />
                                        </td>
                                        <td className="px-3 py-2">
                                            <input type="text" value={row.kode} onChange={(e) => updateRow(idx, 'kode', e.target.value)} onBlur={() => resolveNamaByKode(idx)} className="w-full border rounded px-2 py-1 text-sm" placeholder="Kode ICD" />
                                        </td>
                                        <td className="px-3 py-2">
                                            <input type="text" value={row.nama} readOnly className="w-full border rounded px-2 py-1 text-sm bg-gray-50 dark:bg-gray-700 dark:text-white" placeholder="Nama diagnosa" />
                                        </td>
                                        <td className="px-3 py-2">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${idx === 0 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'}`}>{jenisLabel(idx)}</span>
                                        </td>
                                        <td className="px-3 py-2">
                                            <button type="button" onClick={() => removeRow(idx)} aria-label="Hapus" className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-red-600 hover:bg-red-700 text-white disabled:opacity-50" disabled={rows.length <= 1 && idx === 0}>
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M8 6V4h8v2M6 6h12l-1 14H7L6 6m4 4v6m4-6v6"/>
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700">
                        <button type="button" onClick={addRow} className="inline-flex items-center gap-1 px-3 py-1.5 text-xs rounded bg-black text-white">+ Diagnosa</button>
                    </div>
                </div>

                <div className="flex items-center justify-end pt-2">
                    <button 
                        type="submit" 
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" 
                        disabled={isSubmitting || rows.filter((r) => r.kode && r.nama).length === 0}
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-1.5 h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Menyimpan...
                            </>
                        ) : (
                            <>
                                <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Simpan Diagnosa
                            </>
                        )}
                    </button>
                </div>

                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-sm font-semibold">Diagnosa Tersimpan</div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300">
                                <tr>
                                    <th className="px-3 py-2 text-left w-32">ICD-X</th>
                                    <th className="px-3 py-2 text-left">Diagnosa</th>
                                    <th className="px-3 py-2 text-left w-28">Jenis</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {savedList.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="px-3 py-4 text-center text-gray-500 dark:text-gray-400">Belum ada diagnosa tersimpan</td>
                                    </tr>
                                ) : (
                                    savedList.map((row, idx) => (
                                        <tr key={`${row.kode}-${idx}`} className="bg-white dark:bg-gray-800">
                                            <td className="px-3 py-2">
                                                <span className="font-mono">{row.kode}</span>
                                            </td>
                                            <td className="px-3 py-2">
                                                <span>{row.nama}</span>
                                            </td>
                                            <td className="px-3 py-2">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${String(row.type).toLowerCase() === 'utama' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'}`}>
                                                    {String(row.type).toLowerCase() === 'utama' ? 'Utama' : 'Sekunder'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </form>
        </div>
    );
}
