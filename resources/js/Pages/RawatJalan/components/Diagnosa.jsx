import React, { useEffect, useState } from 'react';

export default function Diagnosa({ token = '', noRkmMedis = '', noRawat = '' }) {
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [saveStatus, setSaveStatus] = useState(null); // { type: 'success'|'error', message: string }

    useEffect(() => {
        const handle = setTimeout(async () => {
            try {
                const trimmed = query.trim();
                if (trimmed === '') {
                    setResults([]);
                    setErrorMsg('');
                    return;
                }
                setLoading(true);
                setErrorMsg('');
                const params = new URLSearchParams({ q: query });
                const res = await fetch(`/api/penyakit?${params.toString()}`, {
                    headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
                    credentials: 'include',
                });
                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.message || `HTTP ${res.status}: ${res.statusText}`);
                }
                const json = await res.json();
                const list = json?.data || [];
                const mapped = list.map((it) => ({ kode: it.kode || '', nama: it.nama || '' }));
                setResults(mapped);
                setErrorMsg('');
            } catch (e) {
                setErrorMsg(e?.message || 'Gagal memuat data diagnosa');
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 350);

        return () => clearTimeout(handle);
    }, [query]);

    useEffect(() => {
        const loadSavedDiagnosa = async () => {
            if (!noRawat) return;
            try {
                setSaveStatus(null);
                const params = new URLSearchParams({ no_rawat: noRawat });
                const res = await fetch(`/api/rawat-jalan/diagnosa?${params.toString()}`, {
                    headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
                    credentials: 'include',
                });
                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.message || `HTTP ${res.status}: ${res.statusText}`);
                }
                const json = await res.json();
                const list = json?.data || [];
                const mapped = list.map((it) => ({ kode: it.kode, nama: it.nama, type: it.type }));
                setSelected(mapped);
            } catch (e) {
                console.warn('Gagal memuat diagnosa tersimpan:', e?.message);
            }
        };
        loadSavedDiagnosa();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [noRawat]);

    const addDiagnosis = (diag) => {
        if (!diag?.kode) return;
        if (selected.find((s) => s.kode === diag.kode)) return;
        setSelected((prev) => [...prev, { ...diag, status_penyakit: 'Baru' }]);
    };

    const removeDiagnosis = (kode) => {
        setSelected((prev) => prev.filter((s) => s.kode !== kode));
    };

    const updateStatusPenyakit = (kode, value) => {
        setSelected((prev) =>
            prev.map((s) => (s.kode === kode ? { ...s, status_penyakit: value } : s))
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            setSaveStatus(null);
            const payloadList = selected.map((item, index) => ({
                kode: item.kode,
                type: index === 0 ? 'utama' : 'sekunder',
                status_penyakit: item.status_penyakit || null,
            }));

            const res = await fetch('/api/rawat-jalan/diagnosa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({ no_rawat: noRawat, list: payloadList }),
            });
            const json = await res.json();
            if (!res.ok) {
                throw new Error(json?.message || 'Gagal menyimpan diagnosa');
            }
            const list = json?.data || [];
            const mapped = list.map((it) => ({
                kode: it.kode,
                nama: it.nama,
                status_penyakit: it.status_penyakit || null,
            }));
            setSelected(mapped);
            setSaveStatus({ type: 'success', message: 'Diagnosa berhasil disimpan' });
        } catch (e) {
            setSaveStatus({ type: 'error', message: e?.message || 'Gagal menyimpan diagnosa' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextType = selected.length === 0 ? 'utama' : 'sekunder';

    return (
        <div className="space-y-6 p-4 md:p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                {saveStatus?.message && (
                    <div className={`px-4 py-2 rounded-md border text-sm ${
                        saveStatus.type === 'success'
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : 'bg-red-50 text-red-700 border-red-200'
                    }`}>
                        {saveStatus.message}
                    </div>
                )}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="lg:col-span-7">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Pencarian ICD
                        </label>
                        <div className="relative">
                            <input 
                                type="text" 
                                value={query} 
                                onChange={(e) => setQuery(e.target.value)} 
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                                placeholder="Ketik kode ICD atau nama penyakit..." 
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-5">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            Jenis Diagnosa
                        </label>
                        <select 
                            value={nextType}
                            disabled
                            className="w-full py-2.5 px-3 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        >
                            <option value="utama">🎯 Diagnosa Utama</option>
                            <option value="sekunder">📋 Diagnosa Sekunder</option>
                        </select>
                    </div>
                </div>

                {query && (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">Hasil Pencarian</h4>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{results.length} hasil ditemukan</span>
                        </div>
                        {loading ? (
                            <div className="px-4 py-6 text-sm text-gray-500 dark:text-gray-400">Memuat…</div>
                        ) : errorMsg ? (
                            <div className="px-4 py-6 text-sm text-red-600 dark:text-red-400">{errorMsg}</div>
                        ) : results.length > 0 ? (
                            <div className="bg-gray-50 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-600 rounded-lg divide-y divide-gray-200 dark:divide-gray-600 max-h-64 overflow-y-auto">
                                {results.map((d) => {
                                    const isSelected = selected.find((s) => s.kode === d.kode);
                                    return (
                                        <button
                                            key={d.kode}
                                            type="button"
                                            onClick={() => addDiagnosis(d)}
                                            disabled={isSelected}
                                            className={`w-full text-left px-4 py-3 transition-colors ${
                                                isSelected
                                                    ? 'bg-green-50 dark:bg-green-900/20 cursor-not-allowed'
                                                    : 'hover:bg-white dark:hover:bg-gray-600/50 cursor-pointer'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-2">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                            {d.kode}
                                                        </span>
                                                        <span className="text-gray-900 dark:text-white font-medium">{d.nama}</span>
                                                    </div>
                                                </div>
                                                {isSelected ? (
                                                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="mt-2 text-sm">Tidak ada ICD yang cocok dengan pencarian "{query}"</p>
                                <p className="text-xs text-gray-400 mt-1">Coba gunakan kata kunci yang berbeda</p>
                            </div>
                        )}
                    </div>
                )}

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Daftar Diagnosa Terpilih
                        </h4>
                        {selected.length > 0 && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                                {selected.length} diagnosa
                            </span>
                        )}
                    </div>
                    {selected.length === 0 ? (
                        <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Belum ada diagnosa</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Mulai dengan mencari dan menambahkan kode ICD di atas.</p>
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
                            {selected.map((s, index) => {
                                const isPrimary = index === 0;
                                return (
                                    <div key={s.kode} className="flex items-center justify-between px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                        <div className="flex items-center space-x-3 flex-1">
                                            <div className="flex-shrink-0">
                                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 text-sm font-medium">
                                                    {index + 1}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                        {s.kode}
                                                    </span>
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                        isPrimary
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                                                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                                    }`}>
                                                        {isPrimary ? '🎯 Utama' : '📋 Sekunder'}
                                                    </span>
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700/60 dark:text-gray-200">
                                                        {s.status_penyakit || 'Baru'}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-900 dark:text-white font-medium truncate">{s.nama}</p>
                                                <div className="mt-2">
                                                    <select
                                                        value={s.status_penyakit || 'Baru'}
                                                        onChange={(e) => updateStatusPenyakit(s.kode, e.target.value)}
                                                        className="w-32 py-1.5 px-2 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-xs focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                    >
                                                        <option value="Baru">Baru</option>
                                                        <option value="Lama">Lama</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <button 
                                            type="button" 
                                            onClick={() => removeDiagnosis(s.kode)} 
                                            className="ml-4 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50 transition-colors"
                                            title="Hapus diagnosa"
                                        >
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Hapus
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        {selected.length > 0 && (
                            <span>Total: {selected.length} diagnosa terpilih</span>
                        )}
                    </div>
                    <div className="flex items-center space-x-3">
                        {selected.length > 0 && (
                            <button 
                                type="button" 
                                onClick={() => setSelected([])} 
                                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Hapus Semua
                            </button>
                        )}
                        <button 
                            type="submit" 
                            className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" 
                            disabled={isSubmitting || selected.length === 0}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Menyimpan...
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Simpan Diagnosa
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
