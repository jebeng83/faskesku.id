import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AppLayout from '@/Layouts/AppLayout';
import { motion, AnimatePresence } from 'framer-motion';

export default function Index(props = {}) {
    const { rawatInap = { data: [], meta: {} }, filters = {}, sttsPulangOptions = [] } = props;
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [sortBy, setSortBy] = useState(filters.sort || 'terbaru');
    const [sttsPulang, setSttsPulang] = useState(filters.stts_pulang ?? '-');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('rawat-inap.index'), {
            search: searchTerm,
            status: statusFilter,
            sort: sortBy,
            stts_pulang: sttsPulang,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setSearchTerm('');
        setStatusFilter('');
        setSortBy('terbaru');
        setSttsPulang('-');
        router.get(route('rawat-inap.index'));
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            'Menunggu': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
            'Dirawat': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
            'Pulang': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
            'Dirujuk': { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
            'Rujuk': { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
        };
        
        const config = statusConfig[status] || { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' };
        
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}>
                {status}
            </span>
        );
    };

    const formatSttsPulangLabel = (val) => {
        if (val === '-') return 'Belum Pulang (-)';
        if (val === 'Rujuk') return 'Dirujuk (Rujuk)';
        return val || '(Kosong)';
    };

    return (
        <AppLayout>
            <Head title="Rawat Inap" />

            <div className="px-4 sm:px-6 lg:px-8 py-6">
                {/* Header dengan Gradient */}
                <div className="mb-8">
                    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/20 backdrop-blur rounded-xl">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold mb-2">
                                        Rawat Inap
                                    </h1>
                                    <p className="text-indigo-100 text-lg">
                                        Manajemen pasien rawat inap dan perawatan intensive
                                    </p>
                                </div>
                            </div>
                            <div className="hidden lg:block">
                                <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold">{rawatInap?.meta?.total ?? (Array.isArray(rawatInap?.data) ? rawatInap.data.length : 0)}</div>
                                        <div className="text-sm text-indigo-200">Total Pasien</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm mb-6">
                    <div className="p-6">
                        <form onSubmit={handleSearch} className="flex flex-col lg:flex-row lg:items-end gap-4 lg:justify-end">
                            <div className="flex-1 lg:max-w-md">
                                <input
                                    type="text"
                                    placeholder="Cari nama pasien, no. RM, atau no. rawat..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                            <div className="flex gap-2">
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                >
                                    <option value="">Semua Status</option>
                                    <option value="Menunggu">Menunggu</option>
                                    <option value="Dirawat">Dirawat</option>
                                    <option value="Pulang">Pulang</option>
                                    <option value="Dirujuk">Dirujuk</option>
                                </select>
                                <select
                                    value={sttsPulang}
                                    onChange={(e) => setSttsPulang(e.target.value)}
                                    className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                >
                                    <option value="">Semua Status Pulang</option>
                                    {Array.isArray(sttsPulangOptions) && sttsPulangOptions.map((opt) => (
                                        <option key={opt ?? 'null'} value={opt ?? ''}>{formatSttsPulangLabel(opt)}</option>
                                    ))}
                                </select>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                >
                                    <option value="terbaru">Terbaru</option>
                                    <option value="terlama">Terlama</option>
                                    <option value="nama">Nama A-Z</option>
                                </select>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    Cari
                                </button>
                                {(searchTerm || statusFilter || sortBy !== 'terbaru' || sttsPulang !== '-') && (
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors"
                                    >
                                        Reset
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">No. Rawat</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">No. RM</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nama Pasien</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Kamar</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tgl Masuk</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Dokter</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status Pulang</th>
                                
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                            {Array.isArray(rawatInap?.data) && rawatInap.data.length > 0 ? (
                                rawatInap.data.map((row) => (
                                    <tr key={row.no_rawat} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-mono">{row.no_rawat}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{row.patient?.no_rkm_medis || '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {row.patient?.nm_pasien ? (
                                                <Link
                                                    href={route('rawat-inap.lanjutan')}
                                                    data={{ no_rawat: row.no_rawat, no_rkm_medis: row.patient?.no_rkm_medis }}
                                                    preserveState
                                                    preserveScroll
                                                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                                                >
                                                    {row.patient.nm_pasien}
                                                </Link>
                                            ) : (
                                                <span className="text-gray-900 dark:text-white">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{row.kamar || '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{row.tgl_masuk ? new Date(row.tgl_masuk).toLocaleDateString('id-ID') : '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{row.dokter?.nm_dokter || '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{getStatusBadge(row.stts_pulang || '-')}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400" colSpan={7}>
                                        Belum ada pasien rawat inap
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {rawatInap?.meta?.last_page > 1 && (
                    <div className="mt-8 flex items-center justify-between">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Menampilkan {rawatInap?.meta?.from || 0} - {rawatInap?.meta?.to || 0} dari {rawatInap?.meta?.total || 0} data
                        </div>
                        <div className="flex gap-2">
                            {rawatInap?.meta?.links && rawatInap.meta.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                                        link.active 
                                            ? 'bg-indigo-600 text-white' 
                                            : link.url 
                                                ? 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700' 
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                                    }`}
                                    preserveState
                                    preserveScroll
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
