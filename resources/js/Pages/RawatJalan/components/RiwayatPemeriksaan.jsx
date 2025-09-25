import React, { useEffect, useState, useMemo } from 'react';
import { route } from 'ziggy-js';
import VitalSignsChart from './VitalSignsChart';

export default function RiwayatPemeriksaan({ token = '', noRawat = '', noRkmMedis = '' }) {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState({ pemeriksaan: true, obat: false, lab: false, radiologi: false });
    
    // Search and filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [sortBy, setSortBy] = useState('newest'); // newest, oldest
    const [showFilters, setShowFilters] = useState(false);
    const [activeView, setActiveView] = useState('table'); // table, chart

    const fetchData = async () => {
        if (!noRawat) return;
        setLoading(true);
        setError(null);
        try {
            const url = route('rawat-jalan.pemeriksaan-ralan', { no_rawat: noRawat, t: token });
            const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
            const json = await res.json();
            setRows(json.data || []);
        } catch (e) {
            setError(e.message || 'Gagal memuat riwayat pemeriksaan');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [noRawat]);

    // Filter and search logic
    const filteredRows = useMemo(() => {
        let filtered = [...rows];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(row => 
                row.kesadaran?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                row.keluhan?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                row.pemeriksaan?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                row.penilaian?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Date filter
        if (dateFilter) {
            filtered = filtered.filter(row => {
                const rowDate = new Date(row.tgl_perawatan).toISOString().split('T')[0];
                return rowDate === dateFilter;
            });
        }

        // Sort
        filtered.sort((a, b) => {
            const dateA = new Date(`${a.tgl_perawatan} ${a.jam_rawat}`);
            const dateB = new Date(`${b.tgl_perawatan} ${b.jam_rawat}`);
            return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
        });

        return filtered;
    }, [rows, searchTerm, dateFilter, sortBy]);

    const clearFilters = () => {
        setSearchTerm('');
        setDateFilter('');
        setSortBy('newest');
    };

    return (
        <div className="space-y-4">
            {/* Riwayat Pemeriksaan */}
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="px-4 md:px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700">
                    <button
                        onClick={() => setOpen((p) => ({ ...p, pemeriksaan: !p.pemeriksaan }))}
                        className="w-full flex items-center justify-between group"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                    Riwayat Pemeriksaan
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {filteredRows.length} dari {rows.length} entri pemeriksaan
                                    {(searchTerm || dateFilter) && (
                                        <span className="ml-1 text-blue-600 dark:text-blue-400">(difilter)</span>
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                                {filteredRows.length} data
                            </span>
                            <svg
                                className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform group-hover:text-emerald-600 dark:group-hover:text-emerald-400 ${open.pemeriksaan ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </button>
                </div>
                {open.pemeriksaan && (
                    <div className="px-4 md:px-6 pb-6 max-h-96 overflow-y-auto">
                    {/* Search and Filter Controls */}
                    <div className="py-3 space-y-3">
                        <div className="space-y-3">
                            <div className="text-sm text-gray-600 dark:text-gray-300">Berikut riwayat pemeriksaan berdasarkan no. rawat</div>
                            
                            <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-start sm:items-center">
                                {/* View Toggle */}
                                <div className="w-full sm:w-auto inline-flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                                    <button
                                        onClick={() => setActiveView('table')}
                                        className={`flex-1 sm:flex-none inline-flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                                            activeView === 'table'
                                                ? 'bg-white dark:bg-gray-600 text-emerald-600 dark:text-emerald-400 shadow-sm'
                                                : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white/50 dark:hover:bg-gray-600/50'
                                        }`}
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 6h18m-9 8h9" />
                                        </svg>
                                        <span className="whitespace-nowrap">Tabel</span>
                                    </button>
                                    <button
                                        onClick={() => setActiveView('chart')}
                                        className={`flex-1 sm:flex-none inline-flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                                            activeView === 'chart'
                                                ? 'bg-white dark:bg-gray-600 text-emerald-600 dark:text-emerald-400 shadow-sm'
                                                : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white/50 dark:hover:bg-gray-600/50'
                                        }`}
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                        <span className="whitespace-nowrap">Grafik</span>
                                    </button>
                                </div>
                                
                                {/* Filter and Refresh Buttons */}
                                <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
                                    <button 
                                        onClick={() => setShowFilters(!showFilters)}
                                        className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 shadow-sm hover:shadow-md ${
                                            showFilters 
                                                ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-600' 
                                                : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                                        }`}
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                        </svg>
                                        <span className="whitespace-nowrap">Filter</span>
                                        {showFilters && (
                                            <span className="ml-2 inline-flex items-center justify-center w-2 h-2 bg-emerald-500 rounded-full"></span>
                                        )}
                                    </button>
                                    <button 
                                        onClick={fetchData} 
                                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-200 shadow-sm hover:shadow-md"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        <span className="whitespace-nowrap">Refresh</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        {/* Filter Panel - only show for table view */}
                        {showFilters && activeView === 'table' && (
                            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 space-y-3">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {/* Search Input */}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Cari</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                placeholder="Cari kesadaran, keluhan, pemeriksaan..."
                                                className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                            <svg className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    {/* Date Filter */}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal</label>
                                        <input
                                            type="date"
                                            value={dateFilter}
                                            onChange={(e) => setDateFilter(e.target.value)}
                                            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    
                                    {/* Sort Options */}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Urutkan</label>
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="newest">Terbaru</option>
                                            <option value="oldest">Terlama</option>
                                        </select>
                                    </div>
                                </div>
                                
                                {/* Clear Filters */}
                                {(searchTerm || dateFilter || sortBy !== 'newest') && (
                                    <div className="flex justify-end">
                                        <button
                                            onClick={clearFilters}
                                            className="text-xs px-3 py-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 underline"
                                        >
                                            Hapus semua filter
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    {loading && <div className="text-sm text-gray-500 dark:text-gray-400">Memuat...</div>}
                    {error && <div className="text-sm text-red-700 dark:text-red-300">{error}</div>}
                    {!loading && !error && (
                        activeView === 'chart' ? (
                            <div className="mt-4">
                                <VitalSignsChart data={rows} />
                            </div>
                        ) : (
                            filteredRows.length === 0 ? (
                                <div className="text-center py-8">
                                    {rows.length === 0 ? (
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Belum ada pemeriksaan.</div>
                                    ) : (
                                        <div className="space-y-2">
                                            <div className="text-sm text-gray-500 dark:text-gray-400">Tidak ada hasil yang sesuai dengan filter.</div>
                                            <button
                                                onClick={clearFilters}
                                                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                                            >
                                                Hapus filter
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-sm">
                                        <thead>
                                            <tr className="text-left text-gray-600 dark:text-gray-300">
                                                <th className="pr-4 py-2">Tanggal</th>
                                                <th className="pr-4 py-2">Jam</th>
                                                <th className="pr-4 py-2">TTV</th>
                                                <th className="pr-4 py-2">Kesadaran</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {filteredRows.map((row, idx) => (
                                                <tr key={idx} className="align-top hover:bg-gray-50 dark:hover:bg-gray-700/30">
                                                    <td className="pr-4 py-2 text-gray-900 dark:text-white">{new Date(row.tgl_perawatan).toLocaleDateString('id-ID')}</td>
                                                    <td className="pr-4 py-2 text-gray-900 dark:text-white">{String(row.jam_rawat).substring(0,5)}</td>
                                                    <td className="pr-4 py-2 text-gray-700 dark:text-gray-300">
                                                        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                                            <span>Suhu: {row.suhu_tubuh || '-'}</span>
                                                            <span>Tensi: {row.tensi || '-'}</span>
                                                            <span>Nadi: {row.nadi || '-'}</span>
                                                            <span>RR: {row.respirasi || '-'}</span>
                                                            <span>BB: {row.berat || '-'}</span>
                                                            <span>TB: {row.tinggi || '-'}</span>
                                                            <span>SpO2: {row.spo2 || '-'}</span>
                                                            <span>GCS: {row.gcs || '-'}</span>
                                                        </div>
                                                    </td>
                                                    <td className="pr-4 py-2 text-gray-700 dark:text-gray-300">{row.kesadaran}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )
                        )
                    )}
                    </div>
                 )}

            {/* Riwayat Obat */}
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="px-4 md:px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
                    <button
                        onClick={() => setOpen((p) => ({ ...p, obat: !p.obat }))}
                        className="w-full flex items-center justify-between group"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    Riwayat Obat
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Daftar obat yang pernah diberikan
                                </p>
                            </div>
                        </div>
                        <svg
                            className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform group-hover:text-blue-600 dark:group-hover:text-blue-400 ${open.obat ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
                {open.obat && (
                    <div className="px-4 md:px-6 pb-6">
                        <div className="text-sm text-gray-500 dark:text-gray-400 py-8 text-center">
                            <svg className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                            Riwayat obat akan ditampilkan di sini.
                        </div>
                    </div>
                )}
            </div>

            {/* Riwayat Lab */}
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="px-4 md:px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700">
                    <button
                        onClick={() => setOpen((p) => ({ ...p, lab: !p.lab }))}
                        className="w-full flex items-center justify-between group"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                    Riwayat Lab
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Hasil pemeriksaan laboratorium
                                </p>
                            </div>
                        </div>
                        <svg
                            className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform group-hover:text-purple-600 dark:group-hover:text-purple-400 ${open.lab ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
                {open.lab && (
                    <div className="px-4 md:px-6 pb-6">
                        <div className="text-sm text-gray-500 dark:text-gray-400 py-8 text-center">
                            <svg className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                            Riwayat pemeriksaan lab akan ditampilkan di sini.
                        </div>
                    </div>
                )}
            </div>

            {/* Riwayat Radiologi */}
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="px-4 md:px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700">
                    <button
                        onClick={() => setOpen((p) => ({ ...p, radiologi: !p.radiologi }))}
                        className="w-full flex items-center justify-between group"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                                    Riwayat Radiologi
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Hasil pemeriksaan radiologi dan imaging
                                </p>
                            </div>
                        </div>
                        <svg
                            className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform group-hover:text-orange-600 dark:group-hover:text-orange-400 ${open.radiologi ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
                {open.radiologi && (
                    <div className="px-4 md:px-6 pb-6">
                        <div className="text-sm text-gray-500 dark:text-gray-400 py-8 text-center">
                            <svg className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Riwayat pemeriksaan radiologi akan ditampilkan di sini.
                        </div>
                    </div>
                )}
            </div>
            </div>
        </div>
    );
}


