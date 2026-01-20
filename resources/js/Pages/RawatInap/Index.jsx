import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, RefreshCw, Globe } from 'lucide-react';
import SidebarRawatInap from '@/Layouts/SidebarRawatInap';

export default function Index(props = {}) {
    const { rawatInap = { data: [], meta: {} }, filters = {}, sttsPulangOptions = [] } = props;
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [sortBy, setSortBy] = useState(filters.sort || 'terbaru');
    const [sttsPulang, setSttsPulang] = useState(filters.stts_pulang ?? '-');

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    };
    const rowVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 },
    };

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

    const getGabungBadge = (role, pairRawat) => {
        if (!role) return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-gray-100 text-gray-800 border-gray-200">-</span>
        );

        const config = role === 'Ibu'
            ? { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' }
            : { bg: 'bg-pink-100', text: 'text-pink-800', border: 'border-pink-200' };

        return (
            <span className={`inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}>
                {role}
                {pairRawat ? <span className="font-mono text-[10px] opacity-80">{pairRawat}</span> : null}
            </span>
        );
    };

    return (
        <SidebarRawatInap>
            <Head title="Rawat Inap" />

            <div className="px-4 sm:px-6 lg:px-8 py-6">
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm rounded-lg mb-6"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <motion.h1
                            className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Rawat Inap
                        </motion.h1>
                        <div className="hidden lg:block">
                            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-xl px-4 py-2 shadow-xl shadow-blue-500/5">
                                <div className="text-center">
                                    <div className="text-xl font-bold text-gray-900 dark:text-white">{rawatInap?.meta?.total ?? (Array.isArray(rawatInap?.data) ? rawatInap.data.length : 0)}</div>
                                    <div className="text-xs text-gray-600 dark:text-gray-300">Total Pasien</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="bg-white/80 dark:bg-gray-900/80 rounded-2xl border border-gray-200/50 dark:border-gray-800/50 shadow-xl shadow-blue-500/5 mb-6 backdrop-blur-xl">
                    <div className="p-6">
                        <form onSubmit={handleSearch} className="flex flex-col lg:flex-row lg:items-end gap-4 lg:justify-between">
                            <div className="flex-1 lg:max-w-md">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Cari nama pasien, no. RM, atau no. rawat..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-colors placeholder:text-gray-400 text-sm h-10 pl-10 pr-3"
                                    />
                                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="h-10 px-3 text-sm rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-gray-900 dark:text-white"
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
                                    className="h-10 px-3 text-sm rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-gray-900 dark:text-white"
                                >
                                    <option value="">Semua Status Pulang</option>
                                    {Array.isArray(sttsPulangOptions) && sttsPulangOptions.map((opt) => (
                                        <option key={opt ?? 'null'} value={opt ?? ''}>{formatSttsPulangLabel(opt)}</option>
                                    ))}
                                </select>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="h-10 px-3 text-sm rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-gray-900 dark:text-white"
                                >
                                    <option value="terbaru">Terbaru</option>
                                    <option value="terlama">Terlama</option>
                                    <option value="nama">Nama A-Z</option>
                                </select>
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-medium text-sm px-4 py-2 rounded-md"
                                >
                                    <Search className="w-3 h-3" />
                                    Cari
                                </button>
                                {(searchTerm || statusFilter || sortBy !== 'terbaru' || sttsPulang !== '-') && (
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="inline-flex items-center gap-1 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium text-sm px-3 py-1.5 rounded-md"
                                    >
                                        <RefreshCw className="w-3 h-3" />
                                        Reset
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-xl shadow-blue-500/5">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">No. Rawat</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">No. RM</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nama Pasien</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Gabung</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Kamar</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tgl Masuk</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Dokter</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status Pulang</th>
                                
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                            {Array.isArray(rawatInap?.data) && rawatInap.data.length > 0 ? (
                                <AnimatePresence>
                                    {rawatInap.data.map((row, idx) => (
                                        <motion.tr
                                            key={row.no_rawat}
                                            className="border-b border-gray-100/50 dark:border-gray-700/30 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-gray-700/50 dark:hover:to-gray-800/50 transition-all duration-200"
                                            variants={rowVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            transition={{ delay: idx * 0.02 }}
                                        >
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
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {getGabungBadge(row.gabung_role, row.gabung_pair_rawat)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{row.kamar || '-'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{row.tgl_masuk ? new Date(row.tgl_masuk).toLocaleDateString('id-ID') : '-'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{row.dokter?.nm_dokter || '-'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{getStatusBadge(row.stts_pulang || '-')}</td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            ) : (
                                <tr>
                                    <td className="px-6 py-12 text-center" colSpan={8}>
                                        <motion.div
                                            className="flex flex-col items-center justify-center gap-2 text-gray-500 dark:text-gray-400"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <Globe className="w-8 h-8" />
                                            <span>Tidak ada data.</span>
                                        </motion.div>
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
        </SidebarRawatInap>
    );
}
