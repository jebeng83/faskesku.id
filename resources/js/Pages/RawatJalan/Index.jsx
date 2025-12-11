import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { setRawatJalanFilters, clearRawatJalanFilters } from '@/tools/rawatJalanFilters';
import SidebarRalan from '@/Layouts/SidebarRalan';
import { motion } from 'framer-motion';
import { todayDateString, getAppTimeZone } from '@/tools/datetime';
import {
  PlusIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
  DocumentCheckIcon,
  CalendarDaysIcon,
  ClockIcon,
  UserIcon,
  BanknotesIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

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

function DropdownItem({ children, onClick, icon, variant = "default" }) {
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

export default function Index({ rawatJalan, statusOptions, statusBayarOptions, filters, dokterOptions = [], poliOptions = [] }) {
    const [searchParams, setSearchParams] = useState({
        start_date: filters.start_date || todayDateString(),
        end_date: filters.end_date || todayDateString(),
        status: filters.status || '',
        status_bayar: filters.status_bayar || '',
        nama_pasien: filters.nama_pasien || '',
        kd_dokter: filters.kd_dokter || '',
        kd_poli: filters.kd_poli || ''
    });

    // Sinkronisasi state dengan props filters setiap kali halaman dikunjungi ulang
    // (misal: klik menu Rawat Jalan di sidebar) agar pilihan Dokter/Poli tidak "terkunci".
    useEffect(() => {
        setSearchParams((prev) => ({
            start_date: filters.start_date || todayDateString(),
            end_date: filters.end_date || todayDateString(),
            status: filters.status || '',
            status_bayar: filters.status_bayar || '',
            nama_pasien: filters.nama_pasien || '',
            kd_dokter: filters.kd_dokter || '',
            kd_poli: filters.kd_poli || '',
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        filters?.start_date,
        filters?.end_date,
        filters?.status,
        filters?.status_bayar,
        filters?.nama_pasien,
        filters?.kd_dokter,
        filters?.kd_poli,
    ]);

    const handleFilterChange = (key, value) => {
        const newParams = { ...searchParams, [key]: value };
        setSearchParams(newParams);

        // Persist pilihan Dokter/Poli via helper agar konsisten di seluruh aplikasi
        if (key === 'kd_dokter' || key === 'kd_poli') {
            setRawatJalanFilters({
                kd_dokter: (key === 'kd_dokter' ? value : newParams.kd_dokter) || '',
                kd_poli: (key === 'kd_poli' ? value : newParams.kd_poli) || '',
            });
        }
        
        router.get(route('rawat-jalan.index'), newParams, {
            preserveState: true,
            replace: true
        });
    };

    const resetFilters = () => {
        const today = todayDateString();
        setSearchParams({
            start_date: today,
            end_date: today,
            status: '',
            status_bayar: '',
            nama_pasien: '',
            kd_dokter: '',
            kd_poli: ''
        });
        clearRawatJalanFilters();
        router.get(route('rawat-jalan.index'), { start_date: today, end_date: today });
    };

    // Simpan ke localStorage ketika halaman dimuat dengan filters dari server (mis. dari URL)
    useEffect(() => {
        if (filters?.kd_dokter || filters?.kd_poli) {
            setRawatJalanFilters({
                kd_dokter: filters?.kd_dokter || '',
                kd_poli: filters?.kd_poli || ''
            });
        }
    }, [filters?.kd_dokter, filters?.kd_poli]);

    const formatDate = (date) => {
        if (!date) return '-';
        try {
            const tz = getAppTimeZone();
            return new Date(date).toLocaleDateString('id-ID', { timeZone: tz });
        } catch (e) {
            return new Date(date).toLocaleDateString('id-ID');
        }
    };

    const formatTime = (time) => {
        if (!time) return '-';
        return time.substring(0, 5);
    };

    const handleSuratSehat = (noRawat) => {
        router.get(route('rawat-jalan.surat-sehat', noRawat));
    };

    const handleSuratSakit = (noRawat) => {
        router.get(route('rawat-jalan.surat-sakit', noRawat));
    };

    return (
        <SidebarRalan>
            <Head title="Data Rawat Jalan" />

            <div className="px-4 sm:px-6 lg:px-8">
                {/* Page Header with Gradient */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm rounded-lg mb-6"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Data Rawat Jalan
                            </h1>
                        </div>
                    </div>
                </motion.div>

                {/* GitHub-style Simple Filter */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-3 mb-4">
                    <div className="flex flex-wrap items-center justify-end gap-2">
                        <div className="flex items-center gap-1">
                            <FunnelIcon className="w-4 h-4 text-gray-500" />
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Filter:</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <input
                                type="date"
                                value={searchParams.start_date}
                                onChange={(e) => handleFilterChange('start_date', e.target.value)}
                                className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                            />
                            <span className="text-xs text-gray-500">s/d</span>
                            <input
                                type="date"
                                value={searchParams.end_date}
                                onChange={(e) => handleFilterChange('end_date', e.target.value)}
                                className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                            />
                        </div>
                        
                        <select
                            value={searchParams.status}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                            className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                        >
                            <option value="">Status</option>
                            {Object.entries(statusOptions).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                            ))}
                        </select>
                        
                        <select
                            value={searchParams.status_bayar}
                            onChange={(e) => handleFilterChange('status_bayar', e.target.value)}
                            className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                        >
                            <option value="">Pembayaran</option>
                            {Object.entries(statusBayarOptions).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                            ))}
                        </select>

                        {/* Filter Dokter (statis) */}
                        <select
                            value={searchParams.kd_dokter}
                            onChange={(e) => handleFilterChange('kd_dokter', e.target.value)}
                            className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                        >
                            <option value="">Dokter</option>
                            {Array.isArray(dokterOptions) && dokterOptions.map((d) => (
                                <option key={d.kd_dokter} value={d.kd_dokter}>{d.nm_dokter}</option>
                            ))}
                        </select>

                        {/* Filter Poliklinik (statis) */}
                        <select
                            value={searchParams.kd_poli}
                            onChange={(e) => handleFilterChange('kd_poli', e.target.value)}
                            className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                        >
                            <option value="">Poliklinik</option>
                            {Array.isArray(poliOptions) && poliOptions.map((p) => (
                                <option key={p.kd_poli} value={p.kd_poli}>{p.nm_poli}</option>
                            ))}
                        </select>
                        
                        <div className="relative">
                            <MagnifyingGlassIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                            <input
                                type="text"
                                value={searchParams.nama_pasien}
                                onChange={(e) => handleFilterChange('nama_pasien', e.target.value)}
                                placeholder="Cari pasien..."
                                className="pl-6 pr-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white w-32"
                            />
                        </div>
                        
                        {(searchParams.start_date || searchParams.end_date || searchParams.status || searchParams.status_bayar || searchParams.nama_pasien || searchParams.kd_dokter || searchParams.kd_poli) && (
                            <button
                                onClick={resetFilters}
                                className="ml-2 px-2 py-1 text-xs text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                                title="Reset filters"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>

                {/* Enhanced Data Table */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Daftar Pasien Rawat Jalan
                            </h3>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Total: <span className="font-semibold text-blue-600 dark:text-blue-400">{rawatJalan.total || 0}</span> pasien
                            </div>
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <DocumentTextIcon className="w-4 h-4" />
                                            No. Rawat
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <BanknotesIcon className="w-4 h-4" />
                                            Penjamin
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">No. RM</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <UserIcon className="w-4 h-4" />
                                            Nama Pasien
                                        </div>
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Alamat</th>
                                    
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Poliklinik</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Nama Dokter</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <DocumentCheckIcon className="w-4 h-4" />
                                            Status Periksa
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <CalendarDaysIcon className="w-4 h-4" />
                                            Tanggal
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <ClockIcon className="w-4 h-4" />
                                            Jam
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
                                {rawatJalan.data.map((item, index) => (
                                    <motion.tr 
                                        key={item.no_rawat}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className={`group transition-all duration-200 ${item.stts === 'Sudah' ? 'bg-green-100 dark:bg-green-900/20 hover:bg-green-200 dark:hover:bg-green-900/30' : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-gray-800 dark:hover:to-gray-700'}`}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <SimpleDropdown
                                                    trigger={
                                                        <button 
                                                            className="p-2.5 rounded-xl bg-gradient-to-r from-orange-100 to-red-100 hover:from-orange-200 hover:to-red-200 dark:from-orange-900/20 dark:to-red-900/20 dark:hover:from-orange-900/30 dark:hover:to-red-900/30 transition-all duration-200 border border-orange-200 dark:border-orange-700 shadow-sm hover:shadow-md group-hover:scale-105"
                                                            title="Menu Surat Keterangan"
                                                        >
                                                            <DocumentTextIcon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                                        </button>
                                                    }
                                                >
                                                    <DropdownItem
                                                        onClick={() => handleSuratSehat(item.no_rawat)}
                                                        icon={<DocumentCheckIcon className="w-4 h-4" />}
                                                    >
                                                        Surat Sehat
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        onClick={() => handleSuratSakit(item.no_rawat)}
                                                        icon={<DocumentTextIcon className="w-4 h-4" />}
                                                    >
                                                        Surat Sakit
                                                    </DropdownItem>
                                                </SimpleDropdown>
                                                <div className="bg-gray-50 dark:bg-gray-800/20 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
                                                    <span className="font-mono text-sm font-semibold text-gray-800 dark:text-gray-200">
                                                        {item.no_rawat}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            <div className="flex items-center gap-2">
                                                <BanknotesIcon className="w-4 h-4 text-green-500" />
                                                {item.nm_penjamin || item.penjab?.png_jawab || item.png_jawab || (
                                                    <span className="text-gray-500 dark:text-gray-400 italic">Penjamin tidak tersedia</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="font-mono text-xs bg-gray-50 dark:bg-gray-800/20 text-gray-700 dark:text-gray-300 px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700">
                                                {item.no_rkm_medis}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {item.patient?.nm_pasien ? (
                                                <Link
                                                    href={route('rawat-jalan.lanjutan', {
                                                        t: btoa(
                                                            JSON.stringify({
                                                                no_rawat: item.no_rawat,
                                                                no_rkm_medis: item.no_rkm_medis || '',
                                                            })
                                                        )
                                                            .replace(/=+$/, '')
                                                            .replace(/\+/g, '-')
                                                            .replace(/\//g, '_'),
                                                    })}
                                                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold hover:underline transition-colors duration-200"
                                                    title="Lihat detail pasien"
                                                >
                                                    {item.patient.nm_pasien}
                                                    {item.umurdaftar ? ` (${item.umurdaftar} ${item.sttsumur || ''})` : ''}
                                                </Link>
                                            ) : (
                                                <span className="text-gray-500 dark:text-gray-400 italic">Nama tidak tersedia</span>
                                            )}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                            <span className="block max-w-[24rem] truncate">
                                                {item.patient?.alamat || item.alamat || '-'}
                                            </span>
                                        </td>
                                        
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {item.nm_poli || item.poliklinik?.nm_poli || (
                                                <span className="text-gray-500 dark:text-gray-400 italic">Poli tidak tersedia</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {item.dokter?.nm_dokter || item.nm_dokter || (
                                                <span className="text-gray-500 dark:text-gray-400 italic">Dokter tidak tersedia</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium ${item.stts === 'Sudah' ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700' : item.stts === 'Belum' ? 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-700' : item.stts === 'Batal' ? 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-700' : 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'}`}>
                                                {item.stts || '-'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                                <CalendarDaysIcon className="w-4 h-4 text-blue-500" />
                                                {formatDate(item.tgl_registrasi)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                                <ClockIcon className="w-4 h-4 text-green-500" />
                                                {formatTime(item.jam_reg)}
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Enhanced Pagination */}
                    {rawatJalan.links && (
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Menampilkan <span className="font-semibold text-blue-600 dark:text-blue-400">{rawatJalan.from}</span> sampai{' '}
                                    <span className="font-semibold text-blue-600 dark:text-blue-400">{rawatJalan.to}</span> dari{' '}
                                    <span className="font-semibold text-blue-600 dark:text-blue-400">{rawatJalan.total}</span> data
                                </div>
                                <div className="flex gap-2">
                                    {rawatJalan.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`px-4 py-2 text-sm rounded-lg font-medium transition-all duration-200 ${
                                                link.active
                                                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105'
                                                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600'
                                            } ${!link.url ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md hover:scale-105'}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Enhanced Empty State */}
                {rawatJalan.data.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"
                    >
                        <div className="p-16 text-center">
                            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl flex items-center justify-center mb-6">
                                <UserIcon className="w-10 h-10 text-blue-500 dark:text-blue-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                Tidak ada data rawat jalan
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
                                Belum ada data rawat jalan yang sesuai dengan filter yang dipilih. Silakan ubah filter atau tambah data baru.
                            </p>
                            <Link
                                href={route('rawat-jalan.create')}
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl inline-flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl font-medium transform hover:scale-105"
                            >
                                <PlusIcon className="w-5 h-5" />
                                Tambah Data Rawat Jalan Pertama
                            </Link>
                        </div>
                    </motion.div>
                )}
            </div>
        </SidebarRalan>
    );
}
