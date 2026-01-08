import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import {
    EllipsisVerticalIcon,
    DocumentTextIcon,
    DocumentCheckIcon
} from '@heroicons/react/24/outline';
import AppLayout from '@/Layouts/AppLayout';
import { motion, AnimatePresence } from 'framer-motion';

// Simple Dropdown Component
function SimpleDropdown({ children, trigger }) {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const dropdownRef = React.useRef(null);

    React.useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        function handleScroll() {
            setIsOpen(false);
        }

        function handleResize() {
            setIsOpen(false);
        }

        if (isOpen) {
            setTimeout(() => {
                document.addEventListener('mousedown', handleClickOutside);
            }, 100);
            window.addEventListener('scroll', handleScroll, true);
            window.addEventListener('resize', handleResize);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll, true);
            window.removeEventListener('resize', handleResize);
        };
    }, [isOpen]);

    const handleToggle = () => {
        if (!isOpen && dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const dropdownWidth = 224;
            
            let left = rect.left + window.scrollX;
            if (left + dropdownWidth > viewportWidth) {
                left = rect.right + window.scrollX - dropdownWidth;
            }
            
            setPosition({
                top: rect.bottom + window.scrollY + 4,
                left: left
            });
        }
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div onClick={handleToggle}>
                {trigger}
            </div>
            {isOpen && (
                <div className="fixed z-[9999] w-56 rounded-lg bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-600 animate-in slide-in-from-top-2 duration-200 overflow-hidden"
                     style={{
                         top: position.top,
                         left: position.left
                     }}>
                    <div className="py-1">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
}

function DropdownItem({ children, onClick, icon, _variant = "default" }) {
    return (
        <button
            onClick={onClick}
            className="group flex items-center w-full px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
        >
            {icon && (
                <span className="mr-3 w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                    {icon}
                </span>
            )}
            <span className="flex-1 text-left">{children}</span>
        </button>
    );
}


export default function Index(props = {}) {
    const { rawatInap = { data: [], meta: {} }, filters = {} } = props;
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [dateFilterMode, setDateFilterMode] = useState(filters.date_filter_mode || 'belum_pulang');
    const [startDate, setStartDate] = useState(filters.start_date || new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(filters.end_date || new Date().toISOString().split('T')[0]);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('rawat-inap.index'), {
            search: searchTerm,
            date_filter_mode: dateFilterMode,
            start_date: startDate,
            end_date: endDate,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setSearchTerm('');
        setDateFilterMode('belum_pulang');
        setStartDate(new Date().toISOString().split('T')[0]);
        setEndDate(new Date().toISOString().split('T')[0]);
        router.get(route('rawat-inap.index'));
    };

    const getStatusBadge = (status) => {
        if (status === '-' || !status) {
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-blue-100 text-blue-800 border-blue-200">
                    Dirawat
                </span>
            );
        }
        if (status === 'Rujuk') {
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-purple-100 text-purple-800 border-purple-200">
                    Dirujuk
                </span>
            );
        }
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-green-100 text-green-800 border-green-200">
                {status}
            </span>
        );
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
                        <form onSubmit={handleSearch} className="flex flex-col gap-4">
                            <div className="flex flex-wrap gap-4 items-center">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio text-indigo-600"
                                        name="dateFilterMode"
                                        value="belum_pulang"
                                        checked={dateFilterMode === 'belum_pulang'}
                                        onChange={(e) => setDateFilterMode(e.target.value)}
                                    />
                                    <span className="ml-2 text-gray-700 dark:text-gray-300">Belum Pulang</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio text-indigo-600"
                                        name="dateFilterMode"
                                        value="masuk"
                                        checked={dateFilterMode === 'masuk'}
                                        onChange={(e) => setDateFilterMode(e.target.value)}
                                    />
                                    <span className="ml-2 text-gray-700 dark:text-gray-300">Masuk</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio text-indigo-600"
                                        name="dateFilterMode"
                                        value="pulang"
                                        checked={dateFilterMode === 'pulang'}
                                        onChange={(e) => setDateFilterMode(e.target.value)}
                                    />
                                    <span className="ml-2 text-gray-700 dark:text-gray-300">Pulang</span>
                                </label>
                            </div>

                            <div className="flex flex-col lg:flex-row lg:items-end gap-4 lg:justify-between">
                                <div className="flex-1 lg:max-w-md">
                                    <input
                                        type="text"
                                        placeholder="Cari nama pasien, no. RM, atau no. rawat..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    {dateFilterMode !== 'belum_pulang' && (
                                        <>
                                            <input
                                                type="date"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                className="w-full sm:w-auto px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            />
                                            <input
                                                type="date"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                                className="w-full sm:w-auto px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            />
                                        </>
                                    )}
                                    <button
                                        type="submit"
                                        className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-xs sm:text-sm font-medium text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        Cari
                                    </button>
                                    {(searchTerm || dateFilterMode !== 'belum_pulang') && (
                                        <button
                                            type="button"
                                            onClick={clearFilters}
                                            className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors"
                                        >
                                            Reset
                                        </button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 whitespace-nowrap">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-10"></th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nama Pasien</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">No. Rawat</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">No. RM</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Alamat Pasien</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Penanggung Jawab</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Hubungan P.J.</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Jenis Bayar</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Kamar</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tarif Kamar</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Diagnosa Awal</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Diagnosa Akhir</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tgl. Masuk</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Jam Masuk</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tgl. Keluar</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Jam Keluar</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ttl. Biaya</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Stts. Pulang</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Lama</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Dokter P.J.</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status Bayar</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Agama</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                            {Array.isArray(rawatInap?.data) && rawatInap.data.length > 0 ? (
                                rawatInap.data.map((row) => (
                                    <tr key={row.no_rawat} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                                            <SimpleDropdown
                                                trigger={
                                                    <button 
                                                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                                                        title="Menu Aksi"
                                                    >
                                                        <EllipsisVerticalIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                                    </button>
                                                }
                                            >
                                                <DropdownItem
                                                    onClick={() => router.get(route('rawat-jalan.buat-surat', { no_rawat: row.no_rawat }))}
                                                    icon={<DocumentTextIcon className="w-4 h-4" />}
                                                >
                                                    Surat - Surat
                                                </DropdownItem>
                                            </SimpleDropdown>
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            {row.nm_pasien ? (
                                                <Link
                                                    href={route('rawat-inap.lanjutan')}
                                                    data={{ no_rawat: row.no_rawat, no_rkm_medis: row.no_rkm_medis }}
                                                    className="hover:text-indigo-600 transition-colors group block"
                                                >
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">{row.nm_pasien}</span>
                                                        <span className="text-xs text-gray-500">({row.umur})</span>
                                                    </div>
                                                </Link>
                                            ) : (
                                                <span className="text-gray-900 dark:text-white">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-mono">{row.no_rawat}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{row.no_rkm_medis}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{row.alamat}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{row.p_jawab}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{row.hubunganpj}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{row.png_jawab}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{row.kamar}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(row.trf_kamar || 0)}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{row.diagnosa_awal}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{row.diagnosa_akhir}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{row.tgl_masuk}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{row.jam_masuk}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{row.tgl_keluar}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{row.jam_keluar}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(row.ttl_biaya || 0)}</td>
                                        <td className="px-6 py-4 text-sm">{getStatusBadge(row.stts_pulang)}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{row.lama} hari</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{row.nm_dokter}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{row.status_bayar}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{row.agama}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400" colSpan={22}>
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
