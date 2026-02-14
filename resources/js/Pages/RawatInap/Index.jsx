import React, { useMemo, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, RefreshCw, Globe } from 'lucide-react';
import axios from 'axios';
import LayoutUtama from '@/Pages/LayoutUtama';
import SidebarRawatInapMenu from '@/Components/SidebarRawatInapMenu';
import SearchableSelect from '@/Components/SearchableSelect';

export default function Index(props = {}) {
    const { rawatInap = { data: [], meta: {} }, filters = {}, sttsPulangOptions = [], bangsalOptions = [] } = props;
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [sortBy, setSortBy] = useState(filters.sort || 'terbaru');
    const [sttsPulang, setSttsPulang] = useState(filters.stts_pulang ?? '-');
    const [bangsalFilter, setBangsalFilter] = useState(filters.kd_bangsal || '');

    const [busy, setBusy] = useState(false);
    const [actionError, setActionError] = useState('');
    const [actionSuccess, setActionSuccess] = useState('');

    const [modal, setModal] = useState({ type: null, row: null });
    const [formCheckIn, setFormCheckIn] = useState({ no_rawat: '', kd_kamar: '', diagnosa_awal: '' });
    const [formCheckOut, setFormCheckOut] = useState({ stts_pulang: 'Pulang', diagnosa_akhir: '' });
    const [formPindah, setFormPindah] = useState({ kd_kamar_tujuan: '' });
    const [formGabung, setFormGabung] = useState({ no_rawat_bayi: '' });
    const [selectedRow, setSelectedRow] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const normalizedSttsPulangOptions = useMemo(() => {
        const base = Array.isArray(sttsPulangOptions) ? sttsPulangOptions : [];
        const fixed = base.filter((v) => v !== null && v !== undefined);
        const defaults = ['Pulang', 'Rujuk', 'Meninggal'];
        const merged = Array.from(new Set([...fixed, ...defaults]));
        return merged.length > 0 ? merged : defaults;
    }, [sttsPulangOptions]);

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
            kd_bangsal: bangsalFilter,
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
        setBangsalFilter('');
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

    const formatRupiah = (val) => {
        const n = Number(val);
        if (!Number.isFinite(n)) return '-';
        return `Rp ${new Intl.NumberFormat('id-ID').format(n)}`;
    };

    const parseYmdToLocalDate = (ymd) => {
        if (!ymd || typeof ymd !== 'string') return null;
        const m = ymd.match(/^(\d{4})-(\d{2})-(\d{2})/);
        if (!m) return null;
        const y = Number(m[1]);
        const mo = Number(m[2]) - 1;
        const d = Number(m[3]);
        const dt = new Date(y, mo, d);
        return Number.isNaN(dt.getTime()) ? null : dt;
    };

    const calcLamaInap = (row) => {
        if (row?.lama !== null && row?.lama !== undefined && row?.lama !== '') return String(row.lama);
        const start = parseYmdToLocalDate(row?.tgl_masuk);
        if (!start) return '-';

        const endRaw = row?.tgl_keluar ? parseYmdToLocalDate(row.tgl_keluar) : null;
        const end = endRaw || new Date();
        const endDay = new Date(end.getFullYear(), end.getMonth(), end.getDate());
        const msPerDay = 24 * 60 * 60 * 1000;
        const diff = Math.floor((endDay.getTime() - start.getTime()) / msPerDay) + 1;
        return String(Math.max(1, diff));
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

    const ensureCsrf = async () => {
        try {
            await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
        } catch (_) {
        }
    };

    const closeModal = () => {
        setModal({ type: null, row: null });
        setActionError('');
        setActionSuccess('');
    };

    const doReload = () => {
        setMenuOpen(false);
        setSelectedRow(null);
        router.reload({ preserveScroll: true, preserveState: true });
    };

    const parseApiError = (error) => {
        const msg = error?.response?.data?.message;
        if (typeof msg === 'string' && msg.trim() !== '') return msg;
        return 'Terjadi kesalahan saat memproses permintaan.';
    };

    const openMenu = (row) => {
        setSelectedRow(row);
        setMenuOpen(true);
        setActionError('');
        setActionSuccess('');
    };

    const closeMenu = () => {
        setMenuOpen(false);
        setActionError('');
        setActionSuccess('');
    };

    const openCheckIn = () => {
        setFormCheckIn({ no_rawat: '', kd_kamar: '', diagnosa_awal: '' });
        setModal({ type: 'checkin', row: null });
        setActionError('');
        setActionSuccess('');
    };

    const openCheckOut = (row) => {
        setFormCheckOut({ stts_pulang: 'Pulang', diagnosa_akhir: '' });
        setModal({ type: 'checkout', row });
        setActionError('');
        setActionSuccess('');
    };

    const openPindah = (row) => {
        setFormPindah({ kd_kamar_tujuan: '' });
        setModal({ type: 'pindah', row });
        setActionError('');
        setActionSuccess('');
    };

    const openGabung = (row) => {
        setFormGabung({ no_rawat_bayi: '' });
        setModal({ type: 'gabung', row });
        setActionError('');
        setActionSuccess('');
    };

    const openHapus = (row) => {
        setModal({ type: 'hapus', row });
        setActionError('');
        setActionSuccess('');
    };

    const handleCheckIn = async () => {
        setBusy(true);
        setActionError('');
        setActionSuccess('');
        try {
            await ensureCsrf();
            await axios.post('/api/kamar-inap', {
                no_rawat: formCheckIn.no_rawat,
                kd_kamar: formCheckIn.kd_kamar,
                diagnosa_awal: formCheckIn.diagnosa_awal,
            });
            setActionSuccess('Check-in berhasil');
            closeModal();
            doReload();
        } catch (e) {
            setActionError(parseApiError(e));
        } finally {
            setBusy(false);
        }
    };

    const handleCheckOut = async () => {
        const row = modal.row;
        if (!row?.no_rawat) return;

        setBusy(true);
        setActionError('');
        setActionSuccess('');
        try {
            await ensureCsrf();
            await axios.post('/api/kamar-inap/checkout', {
                no_rawat: row.no_rawat,
                stts_pulang: formCheckOut.stts_pulang,
                diagnosa_akhir: formCheckOut.diagnosa_akhir,
            });
            setActionSuccess('Check-out berhasil');
            closeModal();
            doReload();
        } catch (e) {
            setActionError(parseApiError(e));
        } finally {
            setBusy(false);
        }
    };

    const handlePindah = async () => {
        const row = modal.row;
        if (!row?.no_rawat) return;

        setBusy(true);
        setActionError('');
        setActionSuccess('');
        try {
            await ensureCsrf();
            await axios.post('/api/kamar-inap/pindah', {
                no_rawat: row.no_rawat,
                kd_kamar_tujuan: formPindah.kd_kamar_tujuan,
            });
            setActionSuccess('Pindah kamar berhasil');
            closeModal();
            doReload();
        } catch (e) {
            setActionError(parseApiError(e));
        } finally {
            setBusy(false);
        }
    };

    const handleGabung = async () => {
        const row = modal.row;
        if (!row?.no_rawat) return;

        setBusy(true);
        setActionError('');
        setActionSuccess('');
        try {
            await ensureCsrf();
            await axios.post('/api/kamar-inap/gabung', {
                no_rawat_ibu: row.no_rawat,
                no_rawat_bayi: formGabung.no_rawat_bayi,
            });
            setActionSuccess('Gabung rawat inap berhasil');
            closeModal();
            doReload();
        } catch (e) {
            setActionError(parseApiError(e));
        } finally {
            setBusy(false);
        }
    };

    const handleHapus = async () => {
        const row = modal.row;
        if (!row?.no_rawat) return;

        setBusy(true);
        setActionError('');
        setActionSuccess('');
        try {
            await ensureCsrf();
            await axios.post('/api/kamar-inap/hapus-data-salah', {
                no_rawat: row.no_rawat,
                kd_kamar: row.kamar,
                tgl_masuk: row.tgl_masuk,
                jam_masuk: row.jam_masuk,
            });
            setActionSuccess('Data kamar inap berhasil dihapus');
            closeModal();
            doReload();
        } catch (e) {
            setActionError(parseApiError(e));
        } finally {
            setBusy(false);
        }
    };

    const Modal = ({ open, title, children, onClose, maxWidth = 'lg' }) => {
        const maxWidthClass = {
            sm: 'max-w-sm',
            md: 'max-w-md',
            lg: 'max-w-lg',
            xl: 'max-w-xl',
            '2xl': 'max-w-2xl',
            '3xl': 'max-w-3xl',
            '4xl': 'max-w-4xl',
            '5xl': 'max-w-5xl',
            '6xl': 'max-w-6xl',
            '7xl': 'max-w-7xl',
        }[maxWidth] || 'max-w-lg';

        return (
            <AnimatePresence>
                {open ? (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
                        <motion.div
                            className={`relative w-full ${maxWidthClass} rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-700/60 shadow-2xl`}
                            initial={{ opacity: 0, y: 12, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 12, scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="px-6 py-4 border-b border-gray-200/60 dark:border-gray-700/60">
                                <div className="text-base font-semibold text-gray-900 dark:text-white">{title}</div>
                            </div>
                            <div className="px-6 py-4">{children}</div>
                        </motion.div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        );
    };

    return (
        <LayoutUtama title="Rawat Inap" left={<SidebarRawatInapMenu title="Rawat Inap" />}> 
            <Head title="Rawat Inap" />

            <div className="px-4 sm:px-6 lg:px-8 py-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
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
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={openCheckIn}
                                className="inline-flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 hover:bg-white dark:hover:bg-gray-800 text-gray-900 dark:text-white font-medium text-sm px-4 py-2 rounded-md shadow-sm"
                            >
                                Check-in Ranap
                            </button>
                            <div className="hidden lg:block">
                                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-xl px-4 py-2 shadow-xl shadow-blue-500/5">
                                    <div className="text-center">
                                        <div className="text-xl font-bold text-gray-900 dark:text-white">{rawatInap?.meta?.total ?? (Array.isArray(rawatInap?.data) ? rawatInap.data.length : 0)}</div>
                                        <div className="text-xs text-gray-600 dark:text-gray-300">Total Pasien</div>
                                    </div>
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
                                    value={bangsalFilter}
                                    onChange={(e) => setBangsalFilter(e.target.value)}
                                    className="h-10 px-3 text-sm rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-gray-900 dark:text-white"
                                >
                                    <option value="">Semua Bangsal</option>
                                    {Array.isArray(bangsalOptions) && bangsalOptions.map((b) => (
                                        <option key={b.kd_bangsal} value={b.kd_bangsal}>
                                            {b.kd_bangsal} - {b.nm_bangsal}
                                        </option>
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
                                {(searchTerm || statusFilter || sortBy !== 'terbaru' || sttsPulang !== '-' || bangsalFilter) && (
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

                <div className="relative overflow-auto max-h-[70vh] rounded-2xl ring-1 ring-gray-200/50 dark:ring-gray-700/50 bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl shadow-xl shadow-indigo-500/5">
                    {actionError ? (
                        <div className="px-6 pt-4 text-sm text-red-700 dark:text-red-400">{actionError}</div>
                    ) : null}
                    {actionSuccess ? (
                        <div className="px-6 pt-4 text-sm text-green-700 dark:text-green-400">{actionSuccess}</div>
                    ) : null}
                    <table className="min-w-full text-sm">
                        <thead className="sticky top-0 z-10 bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">No. Rawat</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">No. RM</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nama Pasien</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Gabung</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Kamar</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nama Kamar</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tarif Kamar</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Diagnosa Awal</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Diagnosa Akhir</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tgl Masuk</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Jam Masuk</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tgl Keluar</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Jam Keluar</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Lama Inap</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ttl. Biaya</th>
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
                                            onClick={() => openMenu(row)}
                                            className={`border-b border-gray-100/50 dark:border-gray-700/30 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-gray-700/50 dark:hover:to-gray-800/50 transition-all duration-200 cursor-pointer ${selectedRow?.no_rawat === row.no_rawat ? 'bg-gradient-to-r from-blue-50/70 to-indigo-50/70 dark:from-gray-700/60 dark:to-gray-800/60' : ''}`}
                                            variants={rowVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            transition={{ delay: idx * 0.02 }}
                                        >
                                            <td
                                                className="px-6 py-4 whitespace-nowrap text-sm font-mono text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    try {
                                                        const url = route('rawat-inap.canvas', {
                                                            no_rawat: row?.no_rawat,
                                                            no_rkm_medis: row?.patient?.no_rkm_medis || ''
                                                        });
                                                        router.visit(url);
                                                    } catch (_) {
                                                        const params = new URLSearchParams({
                                                            no_rawat: row?.no_rawat || '',
                                                            no_rkm_medis: row?.patient?.no_rkm_medis || ''
                                                        }).toString();
                                                        router.visit(`/rawat-inap/canvas?${params}`);
                                                    }
                                                }}
                                            >
                                                {row.no_rawat}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{row.patient?.no_rkm_medis || '-'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                {row.patient?.nm_pasien ? (
                                                    <Link
                                                        href={route('rawat-inap.lanjutan')}
                                                        data={{ no_rawat: row.no_rawat, no_rkm_medis: row.patient?.no_rkm_medis }}
                                                        preserveState
                                                        preserveScroll
                                                        onClick={(e) => e.stopPropagation()}
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
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{row.nm_bangsal || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{formatRupiah(row.trf_kamar)}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                                        <div className="max-w-[240px] truncate" title={row.diagnosa_awal || ''}>{row.diagnosa_awal || '-'}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                                        <div className="max-w-[240px] truncate" title={row.diagnosa_akhir || ''}>{row.diagnosa_akhir || '-'}</div>
                                    </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{row.tgl_masuk ? new Date(row.tgl_masuk).toLocaleDateString('id-ID') : '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{row.jam_masuk || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{row.tgl_keluar ? new Date(row.tgl_keluar).toLocaleDateString('id-ID') : '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{row.jam_keluar || '-'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{calcLamaInap(row)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{formatRupiah(row.ttl_biaya)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{row.dokter?.nm_dokter || '-'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{getStatusBadge(row.stts_pulang || '-')}</td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            ) : (
                                <tr>
                                    <td className="px-6 py-12 text-center" colSpan={17}>
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

            <Modal
                open={menuOpen && !!selectedRow}
                title="Menu Rawat Inap"
                maxWidth="4xl"
                onClose={() => (busy ? null : closeMenu())}
            >
                {selectedRow ? (
                    <div className="space-y-4">
                        <div className="rounded-xl border border-gray-200/60 dark:border-gray-700/60 bg-white/80 dark:bg-gray-800/80 px-4 py-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-28 text-xs font-semibold text-gray-500 dark:text-gray-400">No Rawat.</div>
                                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">:</div>
                                    <div className="text-sm font-mono text-gray-900 dark:text-white">{selectedRow.no_rawat || '-'}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-28 text-xs font-semibold text-gray-500 dark:text-gray-400">Kamar.</div>
                                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">:</div>
                                    <div className="text-sm text-gray-900 dark:text-white">{selectedRow.kamar || '-'}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-28 text-xs font-semibold text-gray-500 dark:text-gray-400">Nama Pasien.</div>
                                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">:</div>
                                    <div className="text-sm text-gray-900 dark:text-white">{selectedRow.patient?.nm_pasien || '-'}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-28 text-xs font-semibold text-gray-500 dark:text-gray-400">Status.</div>
                                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">:</div>
                                    <div className="flex items-center gap-2">
                                        {getStatusBadge(selectedRow.stts_pulang || '-')}
                                        {getGabungBadge(selectedRow.gabung_role, selectedRow.gabung_pair_rawat)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-gray-200/60 dark:border-gray-700/60 bg-white/80 dark:bg-gray-800/80 p-4">
                            <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">Aksi</div>
                            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                                <button
                                    type="button"
                                    onClick={() => {
                                        closeMenu();
                                        openCheckOut(selectedRow);
                                    }}
                                    disabled={busy || (selectedRow.stts_pulang && selectedRow.stts_pulang !== '-')}
                                    className={`h-10 min-w-[110px] whitespace-nowrap rounded-md text-xs font-semibold border ${busy || (selectedRow.stts_pulang && selectedRow.stts_pulang !== '-') ? 'bg-gray-100 dark:bg-gray-900 text-gray-400 border-gray-200 dark:border-gray-700 cursor-not-allowed' : 'bg-white dark:bg-gray-800 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50/60 dark:hover:bg-indigo-900/20'}`}
                                >
                                    Check-out
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        closeMenu();
                                        openPindah(selectedRow);
                                    }}
                                    disabled={busy || (selectedRow.stts_pulang && selectedRow.stts_pulang !== '-')}
                                    className={`h-10 min-w-[110px] whitespace-nowrap rounded-md text-xs font-semibold border ${busy || (selectedRow.stts_pulang && selectedRow.stts_pulang !== '-') ? 'bg-gray-100 dark:bg-gray-900 text-gray-400 border-gray-200 dark:border-gray-700 cursor-not-allowed' : 'bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 hover:bg-blue-50/60 dark:hover:bg-blue-900/20'}`}
                                >
                                    Pindah
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        closeMenu();
                                        openGabung(selectedRow);
                                    }}
                                    disabled={busy || selectedRow.gabung_role === 'Bayi'}
                                    className={`h-10 min-w-[110px] whitespace-nowrap rounded-md text-xs font-semibold border ${busy || selectedRow.gabung_role === 'Bayi' ? 'bg-gray-100 dark:bg-gray-900 text-gray-400 border-gray-200 dark:border-gray-700 cursor-not-allowed' : 'bg-white dark:bg-gray-800 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800 hover:bg-purple-50/60 dark:hover:bg-purple-900/20'}`}
                                >
                                    Gabung
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        closeMenu();
                                        openHapus(selectedRow);
                                    }}
                                    disabled={busy}
                                    className={`h-10 min-w-[110px] whitespace-nowrap rounded-md text-xs font-semibold border ${busy ? 'bg-gray-100 dark:bg-gray-900 text-gray-400 border-gray-200 dark:border-gray-700 cursor-not-allowed' : 'bg-white dark:bg-gray-800 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800 hover:bg-red-50/60 dark:hover:bg-red-900/20'}`}
                                >
                                    Hapus
                                </button>
                            </div>
                            <div className="mt-3 flex justify-end">
                                <button
                                    type="button"
                                    onClick={closeMenu}
                                    disabled={busy}
                                    className="h-9 px-3 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs text-gray-700 dark:text-gray-200"
                                >
                                    Tutup Panel
                                </button>
                            </div>
                        </div>
                    </div>
                ) : null}
            </Modal>

            <Modal
                open={modal.type === 'checkin'}
                title="Check-in Rawat Inap"
                onClose={() => (busy ? null : closeModal())}
            >
                <div className="space-y-3">
                    <div>
                        <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">No. Rawat</div>
                        <input
                            value={formCheckIn.no_rawat}
                            onChange={(e) => setFormCheckIn((s) => ({ ...s, no_rawat: e.target.value }))}
                            placeholder="Contoh: 2026/02/13/000001"
                            className="w-full h-10 px-3 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white"
                        />
                    </div>
                    <div>
                        <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Kamar</div>
                        <SearchableSelect
                            source="kamar"
                            value={formCheckIn.kd_kamar}
                            onChange={(val) => setFormCheckIn((s) => ({ ...s, kd_kamar: val }))}
                            placeholder="Pilih kamar"
                            searchPlaceholder="Cari kamar..."
                            className="w-full"
                        />
                    </div>
                    <div>
                        <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Diagnosa Awal</div>
                        <input
                            value={formCheckIn.diagnosa_awal}
                            onChange={(e) => setFormCheckIn((s) => ({ ...s, diagnosa_awal: e.target.value }))}
                            placeholder="Diagnosa awal"
                            className="w-full h-10 px-3 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white"
                        />
                    </div>
                    {actionError ? <div className="text-sm text-red-700 dark:text-red-400">{actionError}</div> : null}
                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={closeModal}
                            disabled={busy}
                            className="h-10 px-4 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200"
                        >
                            Batal
                        </button>
                        <button
                            type="button"
                            onClick={handleCheckIn}
                            disabled={busy}
                            className={`h-10 px-4 rounded-md text-sm font-semibold text-white ${busy ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                        >
                            Simpan
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal
                open={modal.type === 'checkout'}
                title={`Check-out (${modal.row?.no_rawat || ''})`}
                onClose={() => (busy ? null : closeModal())}
            >
                <div className="space-y-3">
                    <div>
                        <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Status Pulang</div>
                        <select
                            value={formCheckOut.stts_pulang}
                            onChange={(e) => setFormCheckOut((s) => ({ ...s, stts_pulang: e.target.value }))}
                            className="w-full h-10 px-3 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white"
                        >
                            {normalizedSttsPulangOptions.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Diagnosa Akhir</div>
                        <input
                            value={formCheckOut.diagnosa_akhir}
                            onChange={(e) => setFormCheckOut((s) => ({ ...s, diagnosa_akhir: e.target.value }))}
                            placeholder="Diagnosa akhir"
                            className="w-full h-10 px-3 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white"
                        />
                    </div>
                    {actionError ? <div className="text-sm text-red-700 dark:text-red-400">{actionError}</div> : null}
                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={closeModal}
                            disabled={busy}
                            className="h-10 px-4 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200"
                        >
                            Batal
                        </button>
                        <button
                            type="button"
                            onClick={handleCheckOut}
                            disabled={busy}
                            className={`h-10 px-4 rounded-md text-sm font-semibold text-white ${busy ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                        >
                            Proses
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal
                open={modal.type === 'pindah'}
                title={`Pindah Kamar (${modal.row?.no_rawat || ''})`}
                onClose={() => (busy ? null : closeModal())}
            >
                <div className="space-y-3">
                    <div>
                        <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Kamar Tujuan</div>
                        <SearchableSelect
                            source="kamar"
                            value={formPindah.kd_kamar_tujuan}
                            onChange={(val) => setFormPindah((s) => ({ ...s, kd_kamar_tujuan: val }))}
                            placeholder="Pilih kamar tujuan"
                            searchPlaceholder="Cari kamar..."
                            className="w-full"
                        />
                    </div>
                    {actionError ? <div className="text-sm text-red-700 dark:text-red-400">{actionError}</div> : null}
                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={closeModal}
                            disabled={busy}
                            className="h-10 px-4 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200"
                        >
                            Batal
                        </button>
                        <button
                            type="button"
                            onClick={handlePindah}
                            disabled={busy}
                            className={`h-10 px-4 rounded-md text-sm font-semibold text-white ${busy ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                        >
                            Proses
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal
                open={modal.type === 'gabung'}
                title={`Gabung Ranap (Ibu: ${modal.row?.no_rawat || ''})`}
                onClose={() => (busy ? null : closeModal())}
            >
                <div className="space-y-3">
                    <div>
                        <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">No. Rawat Bayi</div>
                        <input
                            value={formGabung.no_rawat_bayi}
                            onChange={(e) => setFormGabung((s) => ({ ...s, no_rawat_bayi: e.target.value }))}
                            placeholder="Masukkan no_rawat bayi"
                            className="w-full h-10 px-3 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white"
                        />
                    </div>
                    {actionError ? <div className="text-sm text-red-700 dark:text-red-400">{actionError}</div> : null}
                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={closeModal}
                            disabled={busy}
                            className="h-10 px-4 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200"
                        >
                            Batal
                        </button>
                        <button
                            type="button"
                            onClick={handleGabung}
                            disabled={busy}
                            className={`h-10 px-4 rounded-md text-sm font-semibold text-white ${busy ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'}`}
                        >
                            Proses
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal
                open={modal.type === 'hapus'}
                title={`Hapus Data Salah (${modal.row?.no_rawat || ''})`}
                onClose={() => (busy ? null : closeModal())}
            >
                <div className="space-y-3">
                    <div className="text-sm text-gray-700 dark:text-gray-200">
                        Hapus data kamar inap untuk:
                        <div className="mt-2 text-xs font-mono text-gray-600 dark:text-gray-300">
                            {modal.row?.no_rawat || '-'} | {modal.row?.kamar || '-'} | {modal.row?.tgl_masuk || '-'} {modal.row?.jam_masuk || ''}
                        </div>
                    </div>
                    <div className="text-sm text-red-700 dark:text-red-400">Pastikan ini benar-benar data salah input.</div>
                    {actionError ? <div className="text-sm text-red-700 dark:text-red-400">{actionError}</div> : null}
                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={closeModal}
                            disabled={busy}
                            className="h-10 px-4 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200"
                        >
                            Batal
                        </button>
                        <button
                            type="button"
                            onClick={handleHapus}
                            disabled={busy}
                            className={`h-10 px-4 rounded-md text-sm font-semibold text-white ${busy ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700'}`}
                        >
                            Hapus
                        </button>
                    </div>
                </div>
            </Modal>
        </LayoutUtama>
    );
}
