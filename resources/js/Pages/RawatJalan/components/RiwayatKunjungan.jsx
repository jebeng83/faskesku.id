import React, { useEffect, useState } from 'react';
import RiwayatPemeriksaan from './RiwayatPemeriksaan';

export default function RiwayatKunjungan({ token, noRkmMedis }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [expandedVisit, setExpandedVisit] = useState(null);

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

    const toggleVisitDetails = (visit) => {
        if (expandedVisit && expandedVisit.no_rawat === visit.no_rawat) {
            setExpandedVisit(null);
        } else {
            setExpandedVisit(visit);
        }
    };

    if (loading) {
        return (
            <div className="p-4">
                <div className="flex items-center justify-center">
                    <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-sm">Memuat riwayat...</span>
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
                    </div>
                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="p-4">
                <div className="text-center">
                    <div className="flex flex-col items-center space-y-2">
                        <svg className="w-12 h-12 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">Belum Ada Riwayat Kunjungan</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Pasien belum memiliki riwayat kunjungan.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700/30">
                        <tr>
                            <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider w-10">No</th>
                            <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">No. Rawat</th>
                            <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Tanggal</th>
                            <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Poli</th>
                            <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
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
                                    <td className="px-2 py-1.5 whitespace-nowrap text-xs text-gray-700 dark:text-gray-300">
                                        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-medium text-[10px]">
                                            {index + 1}
                                        </span>
                                    </td>
                                    <td className="px-2 py-1.5 whitespace-nowrap text-xs font-medium text-gray-900 dark:text-white">
                                        {row.no_rawat}
                                    </td>
                                    <td className="px-2 py-1.5 whitespace-nowrap text-xs text-gray-700 dark:text-gray-300">
                                        {row.tgl_registrasi ? new Date(row.tgl_registrasi).toLocaleDateString('id-ID', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric'
                                        }) : '-'}
                                    </td>
                                    <td className="px-2 py-1.5 whitespace-nowrap text-xs">
                                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                                            {row.kd_poli || '-'}
                                        </span>
                                    </td>
                                    <td className="px-2 py-1.5 whitespace-nowrap text-xs">
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
                                        <td colSpan="5" className="px-2 py-1.5 bg-gray-50 dark:bg-gray-700/20 border-t border-b border-gray-200 dark:border-gray-700">
                                            <div className="rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm mb-1.5">
                                                <div className="px-2 py-1.5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-50 to-green-50 dark:from-green-900/10 dark:to-green-900/10">
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
                                                        >
                                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="p-2">
                                                    <RiwayatPemeriksaan 
                                                        key={row.no_rawat} // Add key to force re-render when noRawat changes
                                                        token={token} 
                                                        noRawat={row.no_rawat}
                                                        noRkmMedis={noRkmMedis}
                                                    />
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