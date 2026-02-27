import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { getRawatJalanFilters, setRawatJalanFilters, clearRawatJalanFilters } from '@/tools/rawatJalanFilters';
import { getRowStatusClass } from '@/tools/statusColors';
import LayoutUtama from '@/Pages/LayoutUtama';
import LanjutanRalanSidebar from '@/Components/LanjutanRalanSidebar';
import { motion } from 'framer-motion';
import { todayDateString, getAppTimeZone } from '@/tools/datetime';
import axios from 'axios';
import toast from '@/tools/toast';
import {
  MagnifyingGlassIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  DocumentCheckIcon,
  CalendarDaysIcon,
  ClockIcon,
  UserIcon,
  BanknotesIcon,
  EllipsisVerticalIcon,
  ClipboardDocumentListIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

// Simple Dropdown Component
function SimpleDropdown({ children, trigger, disabled = false }) {
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
        if (disabled) return;
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
            <div
                onClick={handleToggle}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        handleToggle();
                    }
                }}
                role="button"
                tabIndex={disabled ? -1 : 0}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                aria-disabled={disabled}
            >
                {React.isValidElement(trigger)
                    ? React.cloneElement(trigger, {
                        'aria-expanded': isOpen,
                        'aria-haspopup': 'menu',
                        'aria-disabled': disabled,
                    })
                    : trigger}
            </div>
            {isOpen && (
                <div className="fixed z-[9999] w-56 rounded-lg bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-600 animate-in slide-in-from-top-2 duration-200 overflow-hidden"
                     style={{
                         top: position.top,
                         left: position.left
                     }}>
                    <div className="py-1" role="menu" onClick={() => setIsOpen(false)}>
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
            role="menuitem"
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
    const defaultPerPage = rawatJalan?.per_page || 25;
    const [isReloading, setIsReloading] = useState(false);
    const [rows, setRows] = useState(rawatJalan?.data || []);
    const [statusUpdatingMap, setStatusUpdatingMap] = useState({});
    const calculateStats = (data) => {
        const rows = data?.data || [];
        if (rows.length === 0) {
            return {
                total: data?.total || 0,
                belum: 0,
                selesai: 0,
                batal: 0,
                baru: 0,
                lama: 0,
            };
        }

        return {
            total: data?.total || rows.length,
            belum: rows.filter((r) => r?.stts === 'Belum').length,
            selesai: rows.filter((r) => r?.stts === 'Sudah').length,
            batal: rows.filter((r) => r?.stts === 'Batal').length,
            baru: rows.filter((r) => r?.status_poli === 'Baru').length,
            lama: rows.filter((r) => r?.status_poli === 'Lama').length,
        };
    };

    const stats = useMemo(() => calculateStats({ ...rawatJalan, data: rows }), [rawatJalan, rows]);
    const buildSearchParams = (source) => ({
        start_date: source?.start_date || todayDateString(),
        end_date: source?.end_date || todayDateString(),
        status: source?.status || '',
        status_bayar: source?.status_bayar || '',
        nama_pasien: source?.nama_pasien || '',
        kd_dokter: source?.kd_dokter || '',
        kd_poli: source?.kd_poli || '',
        per_page: source?.per_page || defaultPerPage
    });

    const areFiltersEqual = (a, b) => {
        const keys = ['start_date', 'end_date', 'status', 'status_bayar', 'nama_pasien', 'kd_dokter', 'kd_poli', 'per_page'];
        return keys.every((key) => (a?.[key] || '') === (b?.[key] || ''));
    };

    const savedFilters = getRawatJalanFilters();
    const today = todayDateString();
    const initialParams = buildSearchParams({
        start_date: filters.start_date || today,
        end_date: filters.end_date || today,
        status: savedFilters.status || filters.status,
        status_bayar: savedFilters.status_bayar || filters.status_bayar,
        nama_pasien: savedFilters.nama_pasien || filters.nama_pasien,
        kd_dokter: savedFilters.kd_dokter || filters.kd_dokter,
        kd_poli: savedFilters.kd_poli || filters.kd_poli,
        per_page: filters.per_page || defaultPerPage
    });
    const [searchParams, setSearchParams] = useState({
        start_date: initialParams.start_date,
        end_date: initialParams.end_date,
        status: initialParams.status,
        status_bayar: initialParams.status_bayar,
        nama_pasien: initialParams.nama_pasien,
        kd_dokter: initialParams.kd_dokter,
        kd_poli: initialParams.kd_poli,
        per_page: initialParams.per_page
    });

    // Sinkronisasi state dengan props filters setiap kali halaman dikunjungi ulang
    // (misal: klik menu Rawat Jalan di sidebar) agar pilihan Dokter/Poli tidak "terkunci".
    useEffect(() => {
        const stored = getRawatJalanFilters();
        const hasStored = Object.values(stored).some((value) => value);
        const base = hasStored ? stored : filters;
        const nextParams = buildSearchParams({
            ...base,
            start_date: filters.start_date || today,
            end_date: filters.end_date || today,
        });
        setSearchParams(nextParams);
        setRawatJalanFilters(nextParams);
    }, [
        filters?.start_date,
        filters?.end_date,
        filters?.status,
        filters?.status_bayar,
        filters?.nama_pasien,
        filters?.kd_dokter,
        filters?.kd_poli,
        filters?.per_page,
        today,
    ]);

    useEffect(() => {
        const stored = getRawatJalanFilters();
        const hasStored = Object.values(stored).some((value) => value);
        if (!hasStored) return;
        const storedParams = buildSearchParams(stored);
        const currentParams = buildSearchParams(filters);
        if (areFiltersEqual(storedParams, currentParams)) return;
        router.get(route('rawat-jalan.index'), storedParams, { preserveState: true, replace: true });
    }, [
        filters?.start_date,
        filters?.end_date,
        filters?.status,
        filters?.status_bayar,
        filters?.nama_pasien,
        filters?.kd_dokter,
        filters?.kd_poli,
        filters?.per_page,
    ]);

    useEffect(() => {
        setRows(rawatJalan?.data || []);
    }, [rawatJalan?.data]);

    const statusList = useMemo(() => {
        const options = statusOptions && typeof statusOptions === 'object' ? Object.keys(statusOptions) : [];
        if (options.length > 0) return options;
        return ['Belum', 'Sudah', 'Batal', 'Berkas Diterima', 'Dirujuk', 'Meninggal', 'Dirawat', 'Pulang Paksa'];
    }, [statusOptions]);

    const statusSet = useMemo(() => new Set(statusList), [statusList]);

    const getStatusLabel = (status) => {
        if (!status) return '-';
        if (statusOptions && statusOptions[status]) return statusOptions[status];
        return status;
    };

    const getStatusClass = (status) => {
        if (status === 'Sudah') {
            return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700';
        }
        if (status === 'Belum') {
            return 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-700';
        }
        if (status === 'Batal') {
            return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-700';
        }
        return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
    };

    const updateStatus = async (row, nextStatus) => {
        if (!row?.no_rawat) return;
        if (!statusSet.has(nextStatus)) {
            toast.error('Status tidak valid');
            return;
        }
        if (row?.stts === nextStatus) {
            toast.info('Status sudah sesuai');
            return;
        }

        setStatusUpdatingMap((prev) => ({ ...prev, [row.no_rawat]: true }));
        try {
            const response = await axios.post(route('rawat-jalan.status.update'), {
                no_rawat: row.no_rawat,
                stts: nextStatus,
            });

            const updatedStatus = response?.data?.stts || nextStatus;
            setRows((prev) =>
                prev.map((item) =>
                    item.no_rawat === row.no_rawat ? { ...item, stts: updatedStatus } : item
                )
            );
            toast.success('Status berhasil diperbarui');
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                'Gagal memperbarui status';
            toast.error(message);
        } finally {
            setStatusUpdatingMap((prev) => ({ ...prev, [row.no_rawat]: false }));
        }
    };

    // Column Resizing Logic
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

    const debounceRef = useRef(null);
    const handleFilterChange = (key, value) => {
        const newParams = { ...searchParams, [key]: value };
        setSearchParams(newParams);
        setRawatJalanFilters(newParams);

        if (key === 'per_page') {
            setIsReloading(true);
            router.get(route('rawat-jalan.index'), { ...newParams, page: 1 }, {
                preserveState: true,
                replace: true,
                onFinish: () => setIsReloading(false),
            });
            return;
        }

        if (key === 'kd_dokter' || key === 'kd_poli') {
            setIsReloading(true);
            router.get(route('rawat-jalan.index'), newParams, {
                preserveState: true,
                replace: true,
                onFinish: () => setIsReloading(false),
            });
            return;
        }

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        debounceRef.current = setTimeout(() => {
            setIsReloading(true);
            router.get(route('rawat-jalan.index'), newParams, {
                preserveState: true,
                replace: true,
                onFinish: () => setIsReloading(false),
            });
        }, 350);
    };

    const resetFilters = () => {
        const today = todayDateString();
        const resetParams = {
            start_date: today,
            end_date: today,
            status: '',
            status_bayar: '',
            nama_pasien: '',
            kd_dokter: '',
            kd_poli: '',
            per_page: defaultPerPage
        };
        setSearchParams(resetParams);
        clearRawatJalanFilters();
        setIsReloading(true);
        router.get(route('rawat-jalan.index'), { start_date: today, end_date: today, per_page: defaultPerPage }, {
            onFinish: () => setIsReloading(false),
        });
    };

    const handlePaginationClick = (link) => {
        if (!link?.url) return;
        setIsReloading(true);
        router.visit(link.url, {
            preserveState: true,
            replace: true,
            onFinish: () => setIsReloading(false),
        });
    };

    const handleReload = () => {
        setIsReloading(true);
        router.get(route('rawat-jalan.index'), searchParams, {
            preserveState: true,
            replace: true,
            onFinish: () => setIsReloading(false),
        });
    };

    const formatDate = (date) => {
        if (!date) return '-';
        try {
            const tz = getAppTimeZone();
            return new Date(date).toLocaleDateString('id-ID', { timeZone: tz });
        } catch {
            return new Date(date).toLocaleDateString('id-ID');
        }
    };

    const formatTime = (time) => {
        if (!time) return '-';
        return time.substring(0, 5);
    };
    
    

    const handleSuratSehat = (noRawAt) => {
        router.get(route('rawat-jalan.surat-sehat', noRawAt));
    };

    const handleAwalKeperawatanUmum = (_noRawat) => {
        // TODO: Implement navigation to Awal Keperawatan Umum
        // console.log("Awal Keperawatan Umum:", noRawat);
        alert("Fitur Awal Keperawatan Umum belum tersedia.");
    };

    const toBase64Url = (obj) => {
        try {
            const b = btoa(JSON.stringify(obj));
            return b.replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
        } catch (_) { return ''; }
    };

    const isAllowedForAntrean = (row) => {
        try {
            const label = String(row?.nm_penjamin || row?.penjab?.png_jawab || row?.png_jawab || '')
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9]/g, '');
            if (!label) return false;
            if (/pbi/.test(label)) return true;
            if (/bpjs|bpj|jkn|kis/.test(label)) return true;
            return false;
        } catch (_) { return false; }
    };

    const handleClickPasien = async (e, item) => {
        e.preventDefault();
        try {
            if (isAllowedForAntrean(item)) {
                const payload = {
                    no_rkm_medis: item.no_rkm_medis || '',
                    kd_poli: item.kd_poli || item.poliklinik?.kd_poli || '',
                    status: 1,
                    tanggalperiksa: todayDateString(getAppTimeZone()),
                };
                try { await axios.post('/api/mobilejkn/antrean/panggil', payload); } catch (_) {}
            }
        } catch (_) {}
        const token = toBase64Url({ no_rawat: item.no_rawat, no_rkm_medis: item.no_rkm_medis || '' });
        try { router.get(route('rawat-jalan.lanjutan'), { t: token }, { preserveScroll: true }); }
        catch { router.get('/rawat-jalan/lanjutan', { t: token }, { preserveScroll: true }); }
    };

    const [panggilLoadingMap, setPanggilLoadingMap] = useState({});

    const setPanggilLoading = (noRawat, loading) => {
        setPanggilLoadingMap((prev) => ({ ...prev, [noRawat]: !!loading }));
    };

    const SpinningBalls = () => (
        <motion.div
            className="relative w-4 h-4"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
            aria-hidden="true"
        >
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-500"></span>
        </motion.div>
    );

    const handleOpenCanvasAndPanggil = async (item) => {
        const noRawat = item?.no_rawat;
        const allowed = isAllowedForAntrean(item);
        if (allowed && noRawat) setPanggilLoading(noRawat, true);
        try {
            if (allowed) {
                const payload = {
                    no_rkm_medis: item.no_rkm_medis || '',
                    kd_poli: item.kd_poli || item.poliklinik?.kd_poli || '',
                    status: 1,
                    tanggalperiksa: todayDateString(getAppTimeZone()),
                };
                void axios.post('/api/mobilejkn/antrean/panggil', payload).catch(() => {});
            }
        } catch (_) {}
        try {
            const url = route('rawat-jalan.canvas', {
                no_rawat: item.no_rawat,
                no_rkm_medis: item.no_rkm_medis || '',
                kd_poli: item.kd_poli || item.poliklinik?.kd_poli || ''
            });
            router.visit(url);
        } catch {
            const params = new URLSearchParams({
                no_rawat: item.no_rawat || '',
                no_rkm_medis: item.no_rkm_medis || '',
                kd_poli: item.kd_poli || item.poliklinik?.kd_poli || ''
            }).toString();
            router.visit(`/rawat-jalan/canvas?${params}`);
        }
        if (allowed && noRawat) setTimeout(() => setPanggilLoading(noRawat, false), 300);
    };

    return (
        <LayoutUtama
            title="Rawat Jalan"
            left={<LanjutanRalanSidebar title="Rawat Jalan" context="ralan" />}
        >
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

                {/* GitHub-style Simple Filter removed */}
                
                {/* Enhanced Data Table */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col gap-4">
                            <motion.div
                                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                            >
                                <motion.div
                                    className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-blue-900 dark:via-blue-950 dark:to-black p-1 rounded-sm border border-white/10"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            <svg className="w-3 h-3 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <p className="text-xs font-medium text-white/80">Total</p>
                                        </div>
                                        <p className="text-sm font-bold text-white">{stats.total}</p>
                                    </div>
                                </motion.div>
                                <motion.div
                                    className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-blue-900 dark:via-blue-950 dark:to-black p-1 rounded-sm border border-white/10"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            <svg className="w-3 h-3 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="text-xs font-medium text-white/80">Belum</p>
                                        </div>
                                        <p className="text-sm font-bold text-white">{stats.belum}</p>
                                    </div>
                                </motion.div>
                                <motion.div
                                    className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-blue-900 dark:via-blue-950 dark:to-black p-1 rounded-sm border border-white/10"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            <svg className="w-3 h-3 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="text-xs font-medium text-white/80">Selesai</p>
                                        </div>
                                        <p className="text-sm font-bold text-white">{stats.selesai}</p>
                                    </div>
                                </motion.div>
                                <motion.div
                                    className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-blue-900 dark:via-blue-950 dark:to-black p-1 rounded-sm border border-white/10"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            <svg className="w-3 h-3 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="text-xs font-medium text-white/80">Batal</p>
                                        </div>
                                        <p className="text-sm font-bold text-white">{stats.batal}</p>
                                    </div>
                                </motion.div>
                                <motion.div
                                    className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-blue-900 dark:via-blue-950 dark:to-black p-1 rounded-sm border border-white/10"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            <svg className="w-3 h-3 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                            </svg>
                                            <p className="text-xs font-medium text-white/80">Baru</p>
                                        </div>
                                        <p className="text-sm font-bold text-white">{stats.baru}</p>
                                    </div>
                                </motion.div>
                                <motion.div
                                    className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-blue-900 dark:via-blue-950 dark:to-black p-1 rounded-sm border border-white/10"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            <svg className="w-3 h-3 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <p className="text-xs font-medium text-white/80">Lama</p>
                                        </div>
                                        <p className="text-sm font-bold text-white">{stats.lama}</p>
                                    </div>
                                </motion.div>
                            </motion.div>
                            
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
                                <button
                                    type="button"
                                    onClick={handleReload}
                                    className="p-1 rounded border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    aria-label="Reload data pasien"
                                >
                                    <ArrowPathIcon className="w-4 h-4" />
                                </button>

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
                                {rows.map((item, index) => (
                                    <motion.tr 
                                        key={item.no_rawat}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className={`group transition-all duration-200 ${getRowStatusClass(item.stts)}`}
                                    >
                                        <td className="px-4 py-2 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <SimpleDropdown
                                                    trigger={
                                                        <button 
                                                            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                                                            title="Menu Surat Keterangan"
                                                        >
                                                            <EllipsisVerticalIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                                        </button>
                                                    }
                                                >
                                                    <DropdownItem
                                                        onClick={() => handleSuratSehat(item.no_rawat)}
                                                        icon={<DocumentCheckIcon className="w-4 h-4" />}
                                                    >
                                                        Buat Surat
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        onClick={() => handleAwalKeperawatanUmum(item.no_rawat)}
                                                        icon={<ClipboardDocumentListIcon className="w-4 h-4" />}
                                                    >
                                                        Awal Keperawatan Umum
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
                                                        onClick={(e) => handleClickPasien(e, item)}
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
                                        <td
                                            className="px-4 py-2 whitespace-nowrap cursor-pointer"
                                            onClick={() => handleOpenCanvasAndPanggil(item)}
                                            title="Buka Canvas Rawat Jalan"
                                        >
                                            <span className="inline-flex items-center gap-2">
                                                <span className="font-mono text-sm font-semibold text-gray-800 dark:text-gray-200">
                                                    {item.no_rawat}
                                                </span>
                                                {panggilLoadingMap[item.no_rawat] && (
                                                    <SpinningBalls />
                                                )}
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
                                            <SimpleDropdown
                                                disabled={statusUpdatingMap[item.no_rawat]}
                                                trigger={
                                                    <button
                                                        type="button"
                                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors duration-150 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 ${getStatusClass(item.stts)} ${statusUpdatingMap[item.no_rawat] ? 'opacity-70 cursor-not-allowed' : 'hover:bg-white/60 dark:hover:bg-white/5'}`}
                                                        aria-label={`Ubah status pasien: ${getStatusLabel(item.stts)}`}
                                                        disabled={statusUpdatingMap[item.no_rawat]}
                                                    >
                                                        {statusUpdatingMap[item.no_rawat] ? (
                                                            <span className="inline-flex items-center gap-1">
                                                                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                                                                <span>Memperbarui</span>
                                                            </span>
                                                        ) : (
                                                            <>
                                                                <span>{getStatusLabel(item.stts)}</span>
                                                                <ChevronDownIcon className="w-3.5 h-3.5 opacity-70" />
                                                            </>
                                                        )}
                                                    </button>
                                                }
                                            >
                                                {statusList.map((status) => (
                                                    <DropdownItem
                                                        key={`${item.no_rawat}_${status}`}
                                                        onClick={() => updateStatus(item, status)}
                                                    >
                                                        <span className={`inline-flex items-center gap-2 ${status === item.stts ? 'font-semibold' : ''}`}>
                                                            <span className={`inline-block h-2 w-2 rounded-full border ${getStatusClass(status)}`}></span>
                                                            <span>{getStatusLabel(status)}</span>
                                                        </span>
                                                    </DropdownItem>
                                                ))}
                                            </SimpleDropdown>
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
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                            <div className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ${isReloading ? 'opacity-70' : ''}`}>
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <span>Menampilkan</span>
                                        <span className="font-semibold text-blue-600 dark:text-blue-400">
                                            {(rawatJalan.from || 0)}-{(rawatJalan.to || 0)}
                                        </span>
                                        <span>dari</span>
                                        <span className="font-semibold text-blue-600 dark:text-blue-400">{rawatJalan.total || 0}</span>
                                        <span>data</span>
                                        {isReloading && (
                                            <span className="ml-1 inline-flex h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" aria-hidden="true" />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <span>Tampilkan:</span>
                                        <select
                                            value={searchParams.per_page}
                                            onChange={(e) => handleFilterChange('per_page', Number(e.target.value))}
                                            className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                                        >
                                            {[25, 50, 75, 100].map((size) => (
                                                <option key={size} value={size}>{size}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {rawatJalan.links.map((link, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => handlePaginationClick(link)}
                                            className={`px-4 py-2 text-sm rounded-lg font-medium transition-all duration-200 ${
                                                link.active
                                                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105'
                                                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600'
                                            } ${!link.url ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md hover:scale-105'}`}
                                            disabled={!link.url}
                                            aria-current={link.active ? 'page' : undefined}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Enhanced Empty State */}
                {rows.length === 0 && (
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
                        </div>
                    </motion.div>
                )}
            </div>
        </LayoutUtama>
    );
}
