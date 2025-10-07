import React, { useEffect, useState, useCallback } from 'react';
import { BeakerIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default function RiwayatKunjungan({ token, noRkmMedis }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [expandedVisit, setExpandedVisit] = useState(null);
    const [medicationData, setMedicationData] = useState({});
    const [loadingMedication, setLoadingMedication] = useState({});

    const fetchMedicationData = useCallback(async (noRawat) => {
        if (medicationData[noRawat]) {
            return; // Data sudah ada
        }

        setLoadingMedication(prev => ({ ...prev, [noRawat]: true }));

        try {
            const url = `/rawat-jalan/obat-ralan/${encodeURIComponent(noRawat)}`;

            const res = await fetch(url, {
                headers: { 'Accept': 'application/json' }
            });
            
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}: ${res.statusText}`);
            }
            
            const json = await res.json();
            const data = Array.isArray(json.data) ? json.data : [];
            
            setMedicationData(prev => ({ ...prev, [noRawat]: data }));
        } catch (e) {
            console.error('Error fetching medication data:', e);
            setMedicationData(prev => ({ ...prev, [noRawat]: [] }));
        } finally {
            setLoadingMedication(prev => ({ ...prev, [noRawat]: false }));
        }
    }, [medicationData]);

    useEffect(() => {
        const controller = new AbortController();
        async function fetchData() {
            try {
                setLoading(true);
                setError('');
                const qs = token
                    ? `t=${encodeURIComponent(token)}`
                    : `no_rkm_medis=${encodeURIComponent(noRkmMedis || '')}`;
                const res = await fetch(`/rawat-jalan/riwayat?${qs}`, {
                    signal: controller.signal,
                    headers: { 'Accept': 'application/json' }
                });
                if (!res.ok) throw new Error('Gagal memuat riwayat');
                const json = await res.json();
                setItems(Array.isArray(json.data) ? json.data : []);
                
                // Set the first visit as expanded by default if there are items
                if (Array.isArray(json.data) && json.data.length > 0) {
                    setExpandedVisit(json.data[0]);
                }
            } catch (e) {
                if (e.name !== 'AbortError') setError(e.message || 'Terjadi kesalahan');
            } finally {
                setLoading(false);
            }
        }
        fetchData();
        return () => controller.abort();
    }, [token, noRkmMedis]);

    // Effect to fetch medication data when expandedVisit changes
    useEffect(() => {
        if (expandedVisit && expandedVisit.no_rawat) {
            fetchMedicationData(expandedVisit.no_rawat);
        }
    }, [expandedVisit, fetchMedicationData]);

    const toggleVisitDetails = (visit) => {
        if (expandedVisit && expandedVisit.no_rawat === visit.no_rawat) {
            setExpandedVisit(null);
        } else {
            setExpandedVisit(visit);
        }
    };

    const renderMedicationTable = (noRawat) => {
        const medications = medicationData[noRawat] || [];
        const isLoading = loadingMedication[noRawat];

        if (isLoading) {
            return (
                <div className="text-center py-6 text-gray-500">
                    <div className="flex items-center justify-center space-x-2">
                        <svg className="animate-spin h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-xs">Memuat data obat...</span>
                    </div>
                </div>
            );
        }

        if (medications.length === 0) {
            return (
                <div className="text-center py-6 text-gray-500">
                    <BeakerIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-xs">Belum ada data obat untuk kunjungan ini</p>
                </div>
            );
        }

        // Group by date (tgl_perawatan)
        const groupedByDate = medications.reduce((acc, item) => {
            const key = item.tgl_perawatan || '-';
            if (!acc[key]) acc[key] = [];
            acc[key].push(item);
            return acc;
        }, {});

        const sortedDates = Object.keys(groupedByDate).sort((a, b) => {
            if (a === '-') return 1;
            if (b === '-') return -1;
            return new Date(b) - new Date(a);
        });

        const formatDateId = (date) => {
            if (!date || date === '-') return '-';
            try {
                return new Date(date).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            } catch (e) {
                return date;
            }
        };

        const totalItems = medications.length;

        return (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 px-4 py-3 border-b">
                    <div className="flex items-center space-x-3">
                        <div className="p-1.5 rounded-md bg-white/80 text-green-600">
                            <BeakerIcon className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                            <h3 className="font-semibold text-gray-900 text-sm">Riwayat Obat</h3>
                            <p className="text-xs text-gray-600">{totalItems} item obat</p>
                        </div>
                    </div>
                </div>

                <div>
                    {sortedDates.map((dateKey) => {
                        const items = groupedByDate[dateKey].slice().sort((a, b) => (a.jam || '').localeCompare(b.jam || ''));
                        return (
                            <div key={dateKey} className="border-t border-gray-100">
                                <div className="px-4 py-2 bg-gray-50 flex items-center justify-between">
                                    <div className="text-xs font-medium text-gray-700">
                                        {formatDateId(dateKey)}
                                    </div>
                                    <div className="text-[11px] text-gray-500">{items.length} item</div>
                                </div>

                                {/* Mobile list */}
                                <div className="md:hidden divide-y divide-gray-100">
                                    {items.map((item, index) => (
                                        <div key={`${item.kode_brng}-${item.jam}-${index}`} className="px-4 py-3 flex items-start justify-between gap-4">
                                            <div className="min-w-0">
                                                <div className="text-sm text-gray-900">{item.nama_brng || '-'}</div>
                                                <div className="mt-1 text-xs text-gray-500">{item.aturan || '-'}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm text-gray-900">{item.jml || '-'}</div>
                                                <div className="text-[11px] text-gray-400">{item.jam || ''}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Desktop table */}
                                <div className="hidden md:block overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Obat</th>
                                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aturan Pakai</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-100">
                                            {items.map((item, index) => (
                                                <tr key={`${item.kode_brng}-${item.jam}-${index}`}>
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                                        <div className="text-sm text-gray-900">{item.nama_brng || '-'}</div>
                                                        <div className="text-[11px] text-gray-400 mt-0.5">{item.jam || ''}</div>
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.jml || '-'}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.aturan || '-'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="p-4">
                {/* Mobile skeleton cards */}
                <div className="grid gap-3 md:hidden">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-800 animate-pulse">
                            <div className="flex items-center justify-between mb-2">
                                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                                <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
                {/* Desktop skeleton table */}
                <div className="hidden md:block">
                    <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                            <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="grid grid-cols-5 gap-2 px-4 py-3">
                                    {Array.from({ length: 5 }).map((__, j) => (
                                        <div key={j} className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4">
                <div className="text-center">
                    <div className="flex flex-col items-center space-y-2">
                        <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <div className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</div>
                        <button
                            onClick={() => window.location.reload()}
                            className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            Muat ulang
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="p-4">
                <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-8 text-center bg-white dark:bg-gray-900">
                    <div className="mx-auto w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Belum ada riwayat</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Data riwayat kunjungan akan muncul di sini.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden">
            {/* Mobile: Card list */}
            <div className="md:hidden grid gap-3">
                {items.map((row, index) => {
                    const isOpen = expandedVisit && expandedVisit.no_rawat === row.no_rawat;
                    return (
                        <div
                            key={row.no_rawat}
                            className={`rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-shadow ${isOpen ? 'shadow-md' : 'shadow-sm'}`}
                        >
                            <button
                                onClick={() => toggleVisitDetails(row)}
                                className="w-full text-left px-3 py-3 flex items-start justify-between gap-3"
                                aria-expanded={isOpen}
                                aria-controls={`visit-${index}`}
                            >
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">{row.no_rawat}</div>
                                        <div className="text-[11px] text-gray-500 dark:text-gray-400">#{index + 1}</div>
                                    </div>
                                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                                        <div className="inline-flex items-center gap-1">
                                            <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4M12 11v6m0 0l-3-3m3 3l3-3" /></svg>
                                            {row.tgl_registrasi ? new Date(row.tgl_registrasi).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                                        </div>
                                        <div className="inline-flex items-center gap-1">
                                            <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2" /></svg>
                                            {row.kd_poli || '-'}
                                        </div>
                                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full ${
                                            row.stts === 'Selesai' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                            row.stts === 'Proses' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                            'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                        }`}>{row.stts || '-'}</span>
                                    </div>
                                </div>
                                <svg className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div
                                id={`visit-${index}`}
                                className={`px-3 pb-3 transition-all duration-200 ease-out ${isOpen ? 'block' : 'hidden'}`}
                            >
                                {renderMedicationTable(row.no_rawat)}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Desktop: Table with sticky header */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700/30 sticky top-0 z-10">
                        <tr>
                            <th className="px-2 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider w-10">No</th>
                            <th className="px-2 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">No. Rawat</th>
                            <th className="px-2 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Tanggal</th>
                            <th className="px-2 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Poli</th>
                            <th className="px-2 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {items.map((row, index) => (
                            <React.Fragment key={row.no_rawat}>
                                <tr 
                                    className={`hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer ${
                                        expandedVisit && expandedVisit.no_rawat === row.no_rawat 
                                            ? 'bg-blue-50/30 dark:bg-blue-900/10' 
                                            : ''
                                    }`}
                                    onClick={() => toggleVisitDetails(row)}
                                >
                                    <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-700 dark:text-gray-300">
                                        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-medium text-[10px]">
                                            {index + 1}
                                        </span>
                                    </td>
                                    <td className="px-2 py-2 whitespace-nowrap text-xs font-medium text-gray-900 dark:text-white">
                                        {row.no_rawat}
                                    </td>
                                    <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-700 dark:text-gray-300">
                                        {row.tgl_registrasi ? new Date(row.tgl_registrasi).toLocaleDateString('id-ID', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric'
                                        }) : '-'}
                                    </td>
                                    <td className="px-2 py-2 whitespace-nowrap text-xs">
                                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                                            {row.kd_poli || '-'}
                                        </span>
                                    </td>
                                    <td className="px-2 py-2 whitespace-nowrap text-xs">
                                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full ${
                                            row.stts === 'Selesai' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                            row.stts === 'Proses' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                            'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                        }`}>
                                            {row.stts || '-'}
                                        </span>
                                    </td>
                                </tr>
                                {expandedVisit && expandedVisit.no_rawat === row.no_rawat && (
                                    <tr>
                                        <td colSpan="5" className="px-2 py-2 bg-gray-50 dark:bg-gray-700/20 border-t border-b border-gray-200 dark:border-gray-700">
                                            <div className="rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                                                <div className="px-2 py-2 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-50 to-green-50 dark:from-green-900/10 dark:to-green-900/10">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-1.5">
                                                            <svg className="w-3.5 h-3.5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                                            </svg>
                                                            <h4 className="text-xs font-semibold text-gray-900 dark:text-white">
                                                                Detail: {row.no_rawat}
                                                            </h4>
                                                        </div>
                                                        <button 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setExpandedVisit(null);
                                                            }}
                                                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                                            aria-label="Tutup detail"
                                                        >
                                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="p-2 space-y-3">
                                                    {renderMedicationTable(row.no_rawat)}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}