import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { setRawatJalanFilters, clearRawatJalanFilters } from '@/tools/rawatJalanFilters';
import SidebarRalan from '@/Layouts/SidebarRalan';
import { motion, AnimatePresence } from 'framer-motion';
import { todayDateString, getAppTimeZone } from '@/tools/datetime';
import { DropdownItem } from '@/Components/DropdownMenu';
import SearchableSelect from '@/Components/SearchableSelect';
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
  EllipsisVerticalIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

function SimpleDropdown({ trigger, children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            const inTrigger = triggerRef.current && triggerRef.current.contains(event.target);
            const inMenu = menuRef.current && menuRef.current.contains(event.target);
            if (inTrigger || inMenu) return;
            setIsOpen(false);
        }

        function handleScroll() {
            setIsOpen(false);
        }

        function handleResize() {
            setIsOpen(false);
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            window.addEventListener('scroll', handleScroll, true);
            window.addEventListener('resize', handleResize);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll, true);
            window.removeEventListener('resize', handleResize);
        };
    }, [isOpen]);

    const toggleDropdown = () => {
        if (!isOpen && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const dropdownWidth = 224;

            let left = rect.left + window.scrollX;
            if (left + dropdownWidth > viewportWidth) {
                left = rect.right + window.scrollX - dropdownWidth;
            }

            const top = rect.bottom + window.scrollY + 4;

            setPosition({ top, left });
        }
        setIsOpen((prev) => !prev);
    };

    return (
        <div className="relative inline-block text-left">
            <div ref={triggerRef} onClick={toggleDropdown}>
                {trigger}
            </div>
            {isOpen && (
                <div
                    className="fixed z-[9999] w-56 rounded-md bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-600 overflow-hidden"
                    style={{ top: position.top, left: position.left }}
                    ref={menuRef}
                >
                    <div className="py-1">
                        {React.Children.map(children, (child) => {
                            if (!React.isValidElement(child)) return child;
                            const originalOnClick = child.props.onClick;
                            return React.cloneElement(child, {
                                onClick: (...args) => {
                                    if (originalOnClick) {
                                        originalOnClick(...args);
                                    }
                                    setIsOpen(false);
                                },
                            });
                        })}
                    </div>
                </div>
            )}
        </div>
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

    const [isMasukRanapOpen, setIsMasukRanapOpen] = useState(false);
    const [masukRanapData, setMasukRanapData] = useState({
        no_rawat: '',
        no_rkm_medis: '',
        nama_pasien: '',
        tgl_masuk: todayDateString(),
        jam_masuk: '',
        kd_kamar: '',
        diagnosa_awal: '',
    });
    const [isMasukRanapSubmitting, setIsMasukRanapSubmitting] = useState(false);

    const [alamatWidth, setAlamatWidth] = useState(300);
    const resizingRef = useRef(false);
    const startXRef = useRef(0);
    const startWidthRef = useRef(0);

    const handleMouseMove = (e) => {
        if (resizingRef.current) {
            const diff = e.pageX - startXRef.current;
            setAlamatWidth(Math.max(150, startWidthRef.current + diff));
        }
    };

    const handleMouseUp = () => {
        resizingRef.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = 'default';
        document.body.style.userSelect = 'auto';
    };

    const startResizing = (e) => {
        e.preventDefault();
        resizingRef.current = true;
        startXRef.current = e.pageX;
        startWidthRef.current = alamatWidth;
        
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
    };

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

    const handleBuatSurat = (noRawat) => {
        router.get(route('rawat-jalan.buat-surat', { no_rawat: noRawat }));
    };

    const openMasukRanap = (item) => {
        const tglMasuk = item.tgl_registrasi || todayDateString();
        const jamMasuk = (item.jam_reg || '').substring(0, 5) || '';

        setMasukRanapData({
            no_rawat: item.no_rawat || '',
            no_rkm_medis: item.no_rkm_medis || '',
            nama_pasien: item.patient?.nm_pasien || '',
            tgl_masuk: tglMasuk,
            jam_masuk: jamMasuk,
            kd_kamar: '',
            diagnosa_awal: '',
        });
        setIsMasukRanapOpen(true);
    };

    const closeMasukRanap = () => {
        setIsMasukRanapOpen(false);
    };

    const updateMasukRanapField = (field, value) => {
        setMasukRanapData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSimpanMasukRanap = () => {
        if (!masukRanapData.no_rawat || !masukRanapData.tgl_masuk || !masukRanapData.jam_masuk || !masukRanapData.kd_kamar) {
            alert('Lengkapi tanggal masuk, jam masuk, dan kamar.');
            return;
        }

        setIsMasukRanapSubmitting(true);

        router.post(
            route('rawat-inap.store'),
            {
                no_rawat: masukRanapData.no_rawat,
                tgl_masuk: masukRanapData.tgl_masuk,
                jam_masuk: masukRanapData.jam_masuk,
                kd_kamar: masukRanapData.kd_kamar,
                diagnosa_awal: masukRanapData.diagnosa_awal,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsMasukRanapSubmitting(false);
                    setIsMasukRanapOpen(false);
                },
                onError: () => {
                    setIsMasukRanapSubmitting(false);
                },
            }
        );
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

                {/* Enhanced Data Table */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white shrink-0">
                                Daftar Pasien Rawat Jalan
                            </h3>
                            
                            <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full">
                                <div className="relative shrink-0">
                                    <MagnifyingGlassIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                                    <input
                                        type="text"
                                        value={searchParams.nama_pasien}
                                        onChange={(e) => handleFilterChange('nama_pasien', e.target.value)}
                                        placeholder="Cari pasien..."
                                        className="pl-6 pr-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white w-32"
                                    />
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
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
                                    className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white shrink-0"
                                >
                                    <option value="">Status</option>
                                    {Object.entries(statusOptions).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                                
                                <select
                                    value={searchParams.status_bayar}
                                    onChange={(e) => handleFilterChange('status_bayar', e.target.value)}
                                    className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white shrink-0"
                                >
                                    <option value="">Pembayaran</option>
                                    {Object.entries(statusBayarOptions).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>

                                <select
                                    value={searchParams.kd_dokter}
                                    onChange={(e) => handleFilterChange('kd_dokter', e.target.value)}
                                    className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white shrink-0"
                                >
                                    <option value="">Dokter</option>
                                    {Array.isArray(dokterOptions) && dokterOptions.map((d) => (
                                        <option key={d.kd_dokter} value={d.kd_dokter}>{d.nm_dokter}</option>
                                    ))}
                                </select>

                                <select
                                    value={searchParams.kd_poli}
                                    onChange={(e) => handleFilterChange('kd_poli', e.target.value)}
                                    className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white shrink-0"
                                >
                                    <option value="">Poliklinik</option>
                                    {Array.isArray(poliOptions) && poliOptions.map((p) => (
                                        <option key={p.kd_poli} value={p.kd_poli}>{p.nm_poli}</option>
                                    ))}
                                </select>
                                
                                {(searchParams.start_date || searchParams.end_date || searchParams.status || searchParams.status_bayar || searchParams.nama_pasien || searchParams.kd_dokter || searchParams.kd_poli) && (
                                    <button
                                        onClick={resetFilters}
                                        className="ml-2 px-2 py-1 text-xs text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors shrink-0"
                                        title="Reset filters"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <UserIcon className="w-4 h-4" />
                                            Nama Pasien
                                        </div>
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <BanknotesIcon className="w-4 h-4" />
                                            Penjamin
                                        </div>
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">No. RM</th>
                                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <DocumentTextIcon className="w-4 h-4" />
                                            No. Rawat
                                        </div>
                                    </th>
                                    <th 
                                        className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider relative group"
                                        style={{ width: alamatWidth }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>Alamat</span>
                                            <div 
                                                className="w-1 h-4 bg-gray-300 dark:bg-gray-600 cursor-col-resize opacity-0 group-hover:opacity-100 hover:bg-blue-500 transition-colors rounded"
                                                onMouseDown={startResizing}
                                            />
                                        </div>
                                    </th>
                                    
                                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Poliklinik</th>
                                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Nama Dokter</th>
                                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <DocumentCheckIcon className="w-4 h-4" />
                                            Status Periksa
                                        </div>
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <CalendarDaysIcon className="w-4 h-4" />
                                            Tanggal
                                        </div>
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
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
                                        <td className="px-4 py-2 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <SimpleDropdown
                                                    trigger={
                                                        <button
                                                            className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                                                            title="Menu Aksi Rawat Jalan"
                                                            type="button"
                                                        >
                                                            <EllipsisVerticalIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                                        </button>
                                                    }
                                                >
                                                    <DropdownItem
                                                        onClick={() => openMasukRanap(item)}
                                                        icon={<DocumentCheckIcon className="w-4 h-4" />}
                                                    >
                                                        Masuk Rawat Inap
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        onClick={() => handleBuatSurat(item.no_rawat)}
                                                        icon={<DocumentTextIcon className="w-4 h-4" />}
                                                    >
                                                        Surat - Surat
                                                    </DropdownItem>
                                                </SimpleDropdown>
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
                                            </div>
                                        </td>
                                        
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {(() => {
                                                const penjamin = item.nm_penjamin || item.penjab?.png_jawab || item.png_jawab;
                                                const isBpjs = penjamin && penjamin.toUpperCase().includes('BPJS');
                                                
                                                return penjamin ? (
                                                    <div className={`inline-block px-2.5 py-1 rounded-lg text-xs font-medium border ${
                                                        isBpjs 
                                                            ? 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700' 
                                                            : 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700'
                                                    }`}>
                                                        {penjamin}
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-500 dark:text-gray-400 italic">Penjamin tidak tersedia</span>
                                                );
                                            })()}
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap">
                                            <span className="font-mono text-xs text-gray-700 dark:text-gray-300">
                                                {item.no_rkm_medis}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap">
                                            <span className="font-mono text-sm font-semibold text-gray-800 dark:text-gray-200">
                                                {item.no_rawat}
                                            </span>
                                        </td>

                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                            <span className="block truncate" style={{ maxWidth: alamatWidth }} title={[
                                                item.patient?.alamat,
                                                item.patient?.kelurahan?.nm_kel ? `Kel. ${item.patient?.kelurahan?.nm_kel}` : '',
                                                item.patient?.kecamatan?.nm_kec ? `Kec. ${item.patient?.kecamatan?.nm_kec}` : '',
                                                item.patient?.kabupaten?.nm_kab ? `Kab. ${item.patient?.kabupaten?.nm_kab}` : ''
                                            ].filter(Boolean).join(', ')}>
                                                {[
                                                    item.patient?.alamat,
                                                    item.patient?.kelurahan?.nm_kel ? `Kel. ${item.patient?.kelurahan?.nm_kel}` : '',
                                                    item.patient?.kecamatan?.nm_kec ? `Kec. ${item.patient?.kecamatan?.nm_kec}` : '',
                                                    item.patient?.kabupaten?.nm_kab ? `Kab. ${item.patient?.kabupaten?.nm_kab}` : ''
                                                ].filter(Boolean).join(', ') || 'Alamat tidak tersedia'}
                                            </span>
                                        </td>
                                        
                                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                            {item.nm_poli || item.poliklinik?.nm_poli || (
                                                <span className="text-gray-500 dark:text-gray-400 italic">Poli tidak tersedia</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {item.dokter?.nm_dokter || item.nm_dokter || (
                                                <span className="text-gray-500 dark:text-gray-400 italic">Dokter tidak tersedia</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap">
                                            <span className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium ${item.stts === 'Sudah' ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700' : item.stts === 'Belum' ? 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-700' : item.stts === 'Batal' ? 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-700' : 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'}`}>
                                                {item.stts || '-'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap">
                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                                <CalendarDaysIcon className="w-4 h-4 text-blue-500" />
                                                {formatDate(item.tgl_registrasi)}
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap">
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
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
                                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                    Menampilkan <span className="font-semibold text-blue-600 dark:text-blue-400">{rawatJalan.from}</span> sampai{' '}
                                    <span className="font-semibold text-blue-600 dark:text-blue-400">{rawatJalan.to}</span> dari{' '}
                                    <span className="font-semibold text-blue-600 dark:text-blue-400">{rawatJalan.total}</span> data
                                </div>
                                <div className="w-full sm:w-auto flex flex-wrap items-center justify-center sm:justify-end gap-1.5 sm:gap-2">
                                    {rawatJalan.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg font-medium transition-all duration-200 ${
                                                link.active
                                                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                                                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600'
                                            } ${!link.url ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-sm'}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

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

            <AnimatePresence>
                {isMasukRanapOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-[9999] p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeMasukRanap}
                    >
                        <motion.div
                            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-lg max-h-[90vh] overflow-y-auto"
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ duration: 0.25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <div>
                                    <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                                        Masuk Rawat Inap
                                    </h2>
                                    <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                        {masukRanapData.nama_pasien || '-'} • No. RM {masukRanapData.no_rkm_medis || '-'} • No. Rawat {masukRanapData.no_rawat || '-'}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={closeMasukRanap}
                                    className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
                                >
                                    <XMarkIcon className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="px-4 sm:px-6 py-4 space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                            Tanggal Masuk
                                        </div>
                                        <input
                                            type="date"
                                            value={masukRanapData.tgl_masuk}
                                            onChange={(e) => updateMasukRanapField('tgl_masuk', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-xs sm:text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                            Jam Masuk
                                        </div>
                                        <input
                                            type="time"
                                            value={masukRanapData.jam_masuk}
                                            onChange={(e) => updateMasukRanapField('jam_masuk', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-xs sm:text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                        Kamar / Bed
                                    </div>
                                    <SearchableSelect
                                        source="kamar"
                                        value={masukRanapData.kd_kamar}
                                        onChange={(val) => updateMasukRanapField('kd_kamar', val)}
                                        placeholder="Pilih kamar atau bed"
                                        className="w-full"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                        Diagnosa Awal
                                    </div>
                                    <textarea
                                        rows={3}
                                        value={masukRanapData.diagnosa_awal}
                                        onChange={(e) => updateMasukRanapField('diagnosa_awal', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-xs sm:text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500 resize-none"
                                        placeholder="Tuliskan diagnosa awal pasien"
                                    />
                                </div>
                            </div>
                            <div className="px-4 sm:px-6 py-3 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-2 sm:justify-end">
                                <button
                                    type="button"
                                    onClick={closeMasukRanap}
                                    className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSimpanMasukRanap}
                                    disabled={isMasukRanapSubmitting}
                                    className={`w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white shadow-sm transition-colors ${
                                        isMasukRanapSubmitting
                                            ? 'bg-blue-400 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md'
                                    }`}
                                >
                                    {isMasukRanapSubmitting ? 'Menyimpan...' : 'Simpan Masuk Ranap'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </SidebarRalan>
    );
}
