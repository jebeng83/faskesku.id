import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Diagnosa({ noRawat = '', onDiagnosaSaved = null }) {
    const [query, setQuery] = useState('');
    const [type, setType] = useState('utama');
    const [selected, setSelected] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [warningMsg, setWarningMsg] = useState('');
    const [saveStatus, setSaveStatus] = useState(null);
    const [searchHistory, setSearchHistory] = useState([]);
    const [freqDiagnosa, setFreqDiagnosa] = useState([]);

    const icdCategoryOf = (kode) => {
        const c = (kode || '').trim().charAt(0).toUpperCase();
        if (!c) {
            return { id: 'UNKNOWN', label: 'Kategori tidak diketahui' };
        }
        if (c === 'A' || c === 'B') {
            return { id: 'AB', label: 'Penyakit infeksi dan parasit tertentu (A-B)' };
        }
        if (c === 'C' || c === 'D') {
            return { id: 'CD', label: 'Neoplasma dan penyakit darah (C-D)' };
        }
        if (c === 'E') {
            return { id: 'E', label: 'Penyakit endokrin, nutrisi, dan metabolik (E)' };
        }
        if (c === 'F') {
            return { id: 'F', label: 'Gangguan mental dan perilaku (F)' };
        }
        if (c === 'G') {
            return { id: 'G', label: 'Penyakit sistem saraf (G)' };
        }
        if (c === 'H') {
            return { id: 'H', label: 'Penyakit mata, telinga, dan terkait (H)' };
        }
        if (c === 'I') {
            return { id: 'I', label: 'Penyakit sistem peredaran darah (I)' };
        }
        if (c === 'J') {
            return { id: 'J', label: 'Penyakit sistem pernapasan (J)' };
        }
        if (c === 'K') {
            return { id: 'K', label: 'Penyakit sistem pencernaan (K)' };
        }
        if (c === 'L') {
            return { id: 'L', label: 'Penyakit kulit dan jaringan subkutan (L)' };
        }
        if (c === 'M') {
            return { id: 'M', label: 'Penyakit sistem muskuloskeletal (M)' };
        }
        if (c === 'N') {
            return { id: 'N', label: 'Penyakit sistem genitourinarius (N)' };
        }
        if (c === 'O') {
            return { id: 'O', label: 'Kehamilan, persalinan, nifas (O)' };
        }
        if (c === 'P') {
            return { id: 'P', label: 'Keadaan perinatal (P)' };
        }
        if (c === 'Q') {
            return { id: 'Q', label: 'Kelainan bawaan (Q)' };
        }
        if (c === 'R') {
            return { id: 'R', label: 'Gejala dan temuan klinis (R)' };
        }
        if (c === 'S' || c === 'T') {
            return { id: 'ST', label: 'Cedera, keracunan, konsekuensi eksternal (S-T)' };
        }
        if (c === 'V' || c === 'W' || c === 'X' || c === 'Y') {
            return { id: 'VWXY', label: 'Penyebab luar morbiditas dan mortalitas (V-Y)' };
        }
        if (c === 'Z') {
            return { id: 'Z', label: 'Faktor yang mempengaruhi status kesehatan (Z)' };
        }
        return { id: c, label: 'Kategori lain' };
    };

    const loadHistory = () => {
        if (typeof window === 'undefined') {
            return;
        }
        try {
            const rawSearch = window.localStorage.getItem('icdSearchHistory_v1');
            if (rawSearch) {
                const parsed = JSON.parse(rawSearch);
                if (Array.isArray(parsed)) {
                    setSearchHistory(parsed);
                }
            }
        } catch (_e) {
        }
        try {
            const rawDiag = window.localStorage.getItem('icdDiagHistory_v1');
            if (rawDiag) {
                const parsed = JSON.parse(rawDiag);
                if (Array.isArray(parsed)) {
                    setFreqDiagnosa(parsed);
                }
            }
        } catch (_e) {
        }
    };

    const pushSearchHistory = (term) => {
        if (typeof window === 'undefined') {
            return;
        }
        const t = (term || '').trim();
        if (!t) {
            return;
        }
        setSearchHistory((prev) => {
            const filtered = prev.filter((x) => x !== t);
            const next = [t, ...filtered].slice(0, 10);
            try {
                window.localStorage.setItem('icdSearchHistory_v1', JSON.stringify(next));
            } catch (_e) {
            }
            return next;
        });
    };

    const pushDiagHistory = (diag) => {
        if (typeof window === 'undefined') {
            return;
        }
        const kode = (diag?.kode || '').trim();
        if (!kode) {
            return;
        }
        const nama = diag?.nama || '';
        setFreqDiagnosa((prev) => {
            const existingIndex = prev.findIndex((x) => x.kode === kode);
            let next;
            if (existingIndex >= 0) {
                next = prev.map((x, idx) =>
                    idx === existingIndex ? { ...x, count: (x.count || 0) + 1 } : x
                );
            } else {
                next = [{ kode, nama, count: 1 }, ...prev];
            }
            next = next
                .slice()
                .sort((a, b) => (b.count || 0) - (a.count || 0))
                .slice(0, 20);
            try {
                window.localStorage.setItem('icdDiagHistory_v1', JSON.stringify(next));
            } catch (_e) {
            }
            return next;
        });
    };

    useEffect(() => {
        loadHistory();
    }, []);

    useEffect(() => {
        const handle = setTimeout(async () => {
            try {
                setLoading(true);
                setErrorMsg('');
                setWarningMsg('');
                const response = await axios.get('/api/pcare/diagnosa', {
                    params: { q: query, start: 0, limit: 25 },
                    withCredentials: true,
                    headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
                });
                const data = response?.data || {};
                if (data?.metaData?.bpjs_offline && data?.metaData?.message) {
                    setWarningMsg(data.metaData.message);
                }
                const list = data?.response?.list || data?.list || data?.data || [];
                const mapped = list.map((it) => {
                    const kode = it?.kdDiag || it?.kode || '';
                    const kategori = icdCategoryOf(kode);
                    return {
                        kode,
                        nama: it?.nmDiag || it?.nama || '',
                        source: it?.source || 'bpjs',
                        categoryId: kategori.id,
                        categoryLabel: kategori.label,
                    };
                });
                setResults(mapped);
                if (query && query.trim().length >= 2) {
                    pushSearchHistory(query);
                }
            } catch (e) {
                setErrorMsg(e?.message || 'Gagal memuat data diagnosa');
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 350);

        return () => clearTimeout(handle);
    }, [query]);

    // Load diagnosa yang sudah tersimpan dari backend saat komponen mount atau noRawat berubah
    useEffect(() => {
        const loadSavedDiagnosa = async () => {
            if (!noRawat) return;
            try {
                setSaveStatus(null);
                try { await axios.get('/sanctum/csrf-cookie', { withCredentials: true }); } catch {}
                const response = await axios.get('/api/rawat-jalan/diagnosa', {
                    params: { no_rawat: noRawat },
                    withCredentials: true,
                    headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
                });
                const list = response?.data?.data || [];
                const mapped = list.map((it) => ({ kode: it.kode, nama: it.nama, type: it.type }));
                setSelected(mapped);
            } catch (e) {
                console.warn('Gagal memuat diagnosa tersimpan:', e?.message);
            }
        };
        loadSavedDiagnosa();
    }, [noRawat]);

    const addDiagnosis = (diag) => {
        if (!diag?.kode) return;
        if (selected.find((s) => s.kode === diag.kode)) return;
        const normalized = {
            kode: diag.kode,
            nama: diag.nama,
            type,
        };
        setSelected((prev) => [...prev, normalized]);
        pushDiagHistory(normalized);
    };

    const removeDiagnosis = (kode) => {
        setSelected((prev) => prev.filter((s) => s.kode !== kode));
    };

    const setAsPrimary = (kode) => {
        setSelected((prev) =>
            prev.map((item) => ({
                ...item,
                type: item.kode === kode ? 'utama' : 'sekunder',
            }))
        );
    };

    const primary = selected.find((s) => s.type === 'utama');
    const secondaries = selected.filter((s) => s.type !== 'utama');
    const primaryCount = selected.filter((s) => s.type === 'utama').length;

    const icdPattern = /^[A-Z][0-9][0-9][A-Z0-9]?(\.[A-Z0-9]{1,4})?$/;

    const invalidCodes = selected
        .map((s) => s.kode)
        .filter((kode) => !icdPattern.test(String(kode || '').toUpperCase()));

    const validationWarning =
        primaryCount > 1
            ? 'Hanya satu diagnosa utama yang diperbolehkan. Silakan pilih salah satu saja sebagai utama.'
            : null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selected.length === 0) {
            setSaveStatus({ type: 'error', message: 'Tambahkan minimal satu diagnosa sebelum menyimpan.' });
            return;
        }
        if (primaryCount !== 1) {
            setSaveStatus({
                type: 'error',
                message:
                    primaryCount === 0
                        ? 'Diagnosa utama wajib dipilih sebelum menyimpan.'
                        : 'Tidak boleh lebih dari satu diagnosa utama. Pilih hanya satu sebagai utama.',
            });
            return;
        }
        if (invalidCodes.length > 0) {
            setSaveStatus({
                type: 'error',
                message: 'Format ICD-10 tidak valid untuk kode: ' + invalidCodes.join(', '),
            });
            return;
        }
        setIsSubmitting(true);
        try {
            setSaveStatus(null);
            try { await axios.get('/sanctum/csrf-cookie', { withCredentials: true }); } catch {}
            const response = await axios.post('/api/rawat-jalan/diagnosa', { no_rawat: noRawat, list: selected }, {
                withCredentials: true,
                headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
            });
            const list = response?.data?.data || [];
            const mapped = list.map((it) => ({ kode: it.kode, nama: it.nama, type: it.type }));
            setSelected(mapped);
            setSaveStatus({ type: 'success', message: 'Diagnosa berhasil disimpan' });
            
            if (typeof onDiagnosaSaved === 'function') {
                onDiagnosaSaved(mapped);
            }
        } catch (e) {
            setSaveStatus({ type: 'error', message: e?.message || 'Gagal menyimpan diagnosa' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6 p-4 md:p-6 rounded-2xl bg-gradient-to-br from-sky-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-950 dark:to-indigo-950 border border-sky-100/70 dark:border-slate-700 shadow-sm">
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
                    <div className="lg:col-span-7 space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Pencarian ICD
                        </label>
                        <div className="relative rounded-xl bg-white/80 dark:bg-gray-900/40 border border-sky-100/70 dark:border-gray-700 shadow-sm">
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r-full"></div>
                            <input 
                                type="text" 
                                value={query} 
                                onChange={(e) => setQuery(e.target.value)} 
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-0 bg-transparent dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                                placeholder="Ketik kode ICD atau nama penyakit..." 
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-5 space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            Jenis Diagnosa
                        </label>
                        <select 
                            value={type} 
                            onChange={(e) => setType(e.target.value)} 
                            className="w-full py-2.5 px-3 rounded-xl border border-indigo-100 dark:border-gray-700 bg-white/80 dark:bg-gray-900/40 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        >
                            <option value="utama">🎯 Diagnosa Utama</option>
                            <option value="sekunder">📋 Diagnosa Sekunder</option>
                        </select>
                    </div>
                </div>

                {(searchHistory.length > 0 || freqDiagnosa.length > 0) && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                        <div className="lg:col-span-7 space-y-2">
                            {searchHistory.length > 0 && (
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Riwayat pencarian</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {searchHistory.slice(0, 8).map((term) => (
                                            <button
                                                key={term}
                                                type="button"
                                                onClick={() => setQuery(term)}
                                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                                            >
                                                {term}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="lg:col-span-5 space-y-2">
                            {freqDiagnosa.length > 0 && (
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Diagnosa sering digunakan</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {freqDiagnosa.slice(0, 6).map((item) => (
                                            <button
                                                key={item.kode}
                                                type="button"
                                                onClick={() => addDiagnosis({ kode: item.kode, nama: item.nama })}
                                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60"
                                            >
                                                <span className="mr-1">{item.kode}</span>
                                                <span className="truncate max-w-[10rem]">{item.nama}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {query && (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">Hasil Pencarian</h4>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {results.length} hasil ditemukan
                            </span>
                        </div>
                        {loading ? (
                            <div className="px-4 py-6 text-sm text-gray-500 dark:text-gray-400">Memuat…</div>
                        ) : errorMsg ? (
                            <div className="px-4 py-6 text-sm text-red-600 dark:text-red-400">{errorMsg}</div>
                        ) : results.length > 0 ? (
                            <>
                                {warningMsg && (
                                    <div className="px-4 py-3 bg-yellow-50 border-b border-yellow-200 text-sm text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200 dark:border-yellow-800">
                                        <span className="font-semibold mr-1">Info:</span> {warningMsg}
                                    </div>
                                )}
                                <div className="bg-gray-50 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-600 rounded-lg divide-y divide-gray-200 dark:divide-gray-600 max-h-64 overflow-y-auto">
                                    {results
                                        .map((d) => {
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
                                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border ${
                                                                d.source === 'local'
                                                                    ? 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700'
                                                                    : 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700'
                                                            }`}>
                                                                {d.source === 'local' ? 'Lokal' : 'BPJS'}
                                                            </span>
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                                                {d.kode}
                                                            </span>
                                                            <span className="text-gray-900 dark:text-white font-medium">{d.nama}</span>
                                                        </div>
                                                        <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                                                            {d.categoryLabel}
                                                        </p>
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
                            </>
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
                        <div className="space-y-4">
                            {primary && (
                                <div className="rounded-lg border-2 border-emerald-400/70 bg-emerald-50 dark:bg-emerald-950/40 dark:border-emerald-500/70 px-4 py-3 shadow-sm">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center space-x-2">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-sm ring-1 ring-emerald-600/20">
                                                <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Utama
                                            </span>
                                            <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-200">
                                                Diagnosa utama saat ini
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3 flex-1">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200">
                                                {primary.kode}
                                            </span>
                                            <p className="text-sm text-gray-900 dark:text-white font-medium truncate">
                                                {primary.nama}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeDiagnosis(primary.kode)}
                                            className="ml-4 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50 transition-colors"
                                            title="Hapus diagnosa utama"
                                        >
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            )}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                                        Diagnosa sekunder
                                    </span>
                                    {secondaries.length === 0 && selected.length > 0 && (
                                        <span className="text-[11px] text-gray-500 dark:text-gray-400">
                                            Belum ada diagnosa sekunder.
                                        </span>
                                    )}
                                </div>
                                {secondaries.length > 0 && (
                                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
                                        {secondaries.map((s, index) => (
                                            <div
                                                key={s.kode}
                                                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                                            >
                                                <div className="flex items-center space-x-3 flex-1">
                                                    <div className="flex-shrink-0">
                                                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 text-xs font-medium">
                                                            {index + 1}
                                                        </span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center space-x-2 mb-1">
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                                {s.kode}
                                                            </span>
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                                                                📋 Sekunder
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-900 dark:text-white font-medium truncate">
                                                            {s.nama}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2 ml-4">
                                                    <button
                                                        type="button"
                                                        onClick={() => setAsPrimary(s.kode)}
                                                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/40 dark:text-indigo-200 dark:hover:bg-indigo-900/70 transition-colors"
                                                    >
                                                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                        </svg>
                                                        Jadikan Utama
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeDiagnosis(s.kode)}
                                                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50 transition-colors"
                                                        title="Hapus diagnosa"
                                                    >
                                                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                        Hapus
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {validationWarning && (
                    <div className="mt-2 text-xs text-yellow-800 bg-yellow-50 border border-yellow-200 rounded-md px-3 py-2 dark:bg-yellow-900/30 dark:text-yellow-200 dark:border-yellow-700">
                        {validationWarning}
                    </div>
                )}

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
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" 
                            disabled={isSubmitting || selected.length === 0}
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
                </div>
            </form>
        </div>
    );
}
