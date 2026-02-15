import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
    PlusIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
    ChevronDownIcon,
    TrashIcon,
    UserIcon,
    UsersIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.05,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 18, scale: 0.99 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.99 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    },
    hover: {
        y: -2,
        scale: 1.01,
        transition: { duration: 0.22, ease: 'easeOut' },
    },
    tap: {
        scale: 0.99,
        transition: { duration: 0.12, ease: 'easeOut' },
    },
};

const TarifTindakan = ({ token: _token, noRawat, noRkmMedis: _noRkmMedis, pasien, jenisPenanganan: initialJenisPenanganan = 'dokter' }) => {
    const shouldReduceMotion = useReducedMotion();
    const [jenisPenanganan, setJenisPenanganan] = useState(initialJenisPenanganan);
    const [tindakanList, setTindakanList] = useState([]);
    const [selectedTindakan, setSelectedTindakan] = useState([]);
    const [biayaCollapsed, setBiayaCollapsed] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDokter, _setSelectedDokter] = useState(null);
    const [selectedPerawat, _setSelectedPerawat] = useState(null);
    const [billingVerified, setBillingVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const currentNoRawat = useMemo(() => {
        const nr = pasien?.no_rawat ?? pasien?.noRawat ?? noRawat;
        return String(nr || '').trim();
    }, [pasien, noRawat]);

    const [dokterModalOpen, setDokterModalOpen] = useState(false);
    const [perawatModalOpen, setPerawatModalOpen] = useState(false);

    const [dokterQuery, setDokterQuery] = useState('');
    const [dokterList, setDokterList] = useState([]);
    const [dokterLoading, setDokterLoading] = useState(false);
    const dokterTimerRef = useRef(null);

    const [petugasQuery, setPetugasQuery] = useState('');
    const [petugasStatus, setPetugasStatus] = useState('1');
    const [petugasList, setPetugasList] = useState([]);
    const [petugasLoading, setPetugasLoading] = useState(false);
    const petugasTimerRef = useRef(null);

    useEffect(() => {
        setJenisPenanganan(initialJenisPenanganan);
    }, [initialJenisPenanganan]);

    useEffect(() => {
        setBiayaCollapsed(true);
    }, [jenisPenanganan]);

    // Check billing status
    useEffect(() => {
        if (currentNoRawat) {
            checkBillingStatus();
        }
    }, [currentNoRawat]);

    const checkBillingStatus = async () => {
        try {
            const response = await axios.get(`/api/rawat-inap/cek-billing/${encodeURIComponent(currentNoRawat)}`);
            setBillingVerified(response.data.verified);
        } catch (error) {
            console.error('Error checking billing:', error);
        }
    };

    // Fetch tindakan from API
    useEffect(() => {
        fetchTindakan();
    }, [jenisPenanganan]);

    const fetchTindakan = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/rawat-inap/jenis-tindakan', {
                params: { jenis: jenisPenanganan }
            });
            setTindakanList(response.data);
        } catch (error) {
            console.error('Error fetching tindakan:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!dokterModalOpen) return;

        if (dokterTimerRef.current) {
            clearTimeout(dokterTimerRef.current);
        }

        dokterTimerRef.current = setTimeout(async () => {
            setDokterLoading(true);
            try {
                const res = await axios.get('/api/dokter', {
                    params: dokterQuery.trim() ? { search: dokterQuery.trim() } : {},
                });
                const data = res?.data?.data;
                const list = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.data)
                        ? data.data
                        : Array.isArray(res?.data)
                            ? res.data
                            : [];
                setDokterList(list);
            } catch (_e) {
                setDokterList([]);
            } finally {
                setDokterLoading(false);
            }
        }, 250);

        return () => {
            if (dokterTimerRef.current) {
                clearTimeout(dokterTimerRef.current);
                dokterTimerRef.current = null;
            }
        };
    }, [dokterModalOpen, dokterQuery]);

    useEffect(() => {
        if (!perawatModalOpen) return;

        if (petugasTimerRef.current) {
            clearTimeout(petugasTimerRef.current);
        }

        petugasTimerRef.current = setTimeout(async () => {
            setPetugasLoading(true);
            try {
                const res = await axios.get('/api/employees/petugas', {
                    params: {
                        q: petugasQuery.trim() || undefined,
                        status: petugasStatus !== '' ? petugasStatus : undefined,
                        per_page: 20,
                    },
                });
                const list = Array.isArray(res?.data?.data) ? res.data.data : [];
                setPetugasList(list);
            } catch (_e) {
                setPetugasList([]);
            } finally {
                setPetugasLoading(false);
            }
        }, 250);

        return () => {
            if (petugasTimerRef.current) {
                clearTimeout(petugasTimerRef.current);
                petugasTimerRef.current = null;
            }
        };
    }, [perawatModalOpen, petugasQuery, petugasStatus]);

    const filteredTindakan = tindakanList.filter(tindakan => {
        const searchLower = searchQuery.trim().toLowerCase();
        return (
            tindakan.nm_perawatan?.toLowerCase().includes(searchLower) ||
            tindakan.kd_jenis_prw?.toLowerCase().includes(searchLower)
        );
    });

    const matchedTindakan = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return null;

        const byKode = tindakanList.find((t) => String(t.kd_jenis_prw || '').trim().toLowerCase() === q);
        if (byKode) return byKode;

        const byNama = tindakanList.find((t) => String(t.nm_perawatan || '').trim().toLowerCase() === q);
        if (byNama) return byNama;

        return null;
    }, [searchQuery, tindakanList]);

    const addTindakanToCart = (tindakan) => {
        if (billingVerified) {
            alert('Data billing sudah terverifikasi. Silahkan hubungi bagian kasir/keuangan!');
            return;
        }

        const existing = selectedTindakan.find(t => t.kd_jenis_prw === tindakan.kd_jenis_prw);
        if (existing) {
            setSelectedTindakan(selectedTindakan.map(t =>
                t.kd_jenis_prw === tindakan.kd_jenis_prw
                    ? { ...t, quantity: t.quantity + 1 }
                    : t
            ));
        } else {
            setSelectedTindakan([...selectedTindakan, { ...tindakan, quantity: 1 }]);
        }
    };

    const updateQuantity = (kdJenisPrw, quantity) => {
        if (quantity <= 0) {
            setSelectedTindakan(selectedTindakan.filter(t => t.kd_jenis_prw !== kdJenisPrw));
        } else {
            setSelectedTindakan(selectedTindakan.map(t =>
                t.kd_jenis_prw === kdJenisPrw ? { ...t, quantity } : t
            ));
        }
    };

    const removeFromCart = (kdJenisPrw) => {
        setSelectedTindakan(selectedTindakan.filter(t => t.kd_jenis_prw !== kdJenisPrw));
    };

    const calculateBiaya = () => {
        let total = 0;
        let totalJasaDokter = 0;
        let totalJasaPerawat = 0;
        let totalKSO = 0;
        let totalJasaSarana = 0;
        let totalBHP = 0;
        let totalMenejemen = 0;

        selectedTindakan.forEach(tindakan => {
            const qty = tindakan.quantity;

            if (jenisPenanganan === 'dokter') {
                total += (tindakan.total_byrdr || 0) * qty;
                totalJasaDokter += (tindakan.tarif_tindakandr || 0) * qty;
            } else if (jenisPenanganan === 'perawat') {
                total += (tindakan.total_byrpr || 0) * qty;
                totalJasaPerawat += (tindakan.tarif_tindakanpr || 0) * qty;
            } else if (jenisPenanganan === 'dokter-perawat') {
                total += (tindakan.total_byrdrpr || 0) * qty;
                totalJasaDokter += (tindakan.tarif_tindakandr || 0) * qty;
                totalJasaPerawat += (tindakan.tarif_tindakanpr || 0) * qty;
            }

            totalKSO += (tindakan.kso || 0) * qty;
            totalJasaSarana += (tindakan.bagian_rs || 0) * qty;
            totalBHP += (tindakan.bhp || 0) * qty;
            totalMenejemen += (tindakan.menejemen || 0) * qty;
        });

        return {
            total,
            totalJasaDokter,
            totalJasaPerawat,
            totalKSO,
            totalJasaSarana,
            totalBHP,
            totalMenejemen
        };
    };

    const handleSubmit = async () => {
        if (!currentNoRawat) {
            alert('No Rawat tidak ditemukan');
            return;
        }
        if (selectedTindakan.length === 0) {
            alert('Pilih minimal 1 tindakan');
            return;
        }

        if (billingVerified) {
            alert('Data billing sudah terverifikasi!');
            return;
        }

        // Validasi dokter/perawat
        if (jenisPenanganan === 'dokter' && !selectedDokter) {
            setErrors({ dokter: 'Pilih dokter terlebih dahulu' });
            return;
        }
        if (jenisPenanganan === 'perawat' && !selectedPerawat) {
            setErrors({ perawat: 'Pilih perawat terlebih dahulu' });
            return;
        }
        if (jenisPenanganan === 'dokter-perawat' && (!selectedDokter || !selectedPerawat)) {
            setErrors({
                dokter: !selectedDokter ? 'Pilih dokter' : null,
                perawat: !selectedPerawat ? 'Pilih perawat' : null
            });
            return;
        }

        setLoading(true);
        setErrors({});

        try {
            const endpoint = jenisPenanganan === 'dokter'
                ? '/api/rawat-inap/tindakan-dokter'
                : jenisPenanganan === 'perawat'
                    ? '/api/rawat-inap/tindakan-perawat'
                    : '/api/rawat-inap/tindakan-dokter-perawat';

            await axios.post(endpoint, {
                no_rawat: currentNoRawat,
                tindakan: selectedTindakan,
                kd_dokter: selectedDokter?.kd_dokter,
                nip: selectedPerawat?.nip,
                tgl_perawatan: new Date().toISOString().split('T')[0],
                jam_rawat: new Date().toTimeString().split(' ')[0]
            });

            setSelectedTindakan([]);
            alert('Tindakan berhasil disimpan');

            // Refresh data if needed
            if (typeof window.onTindakanUpdated === 'function') {
                window.onTindakanUpdated();
            }
        } catch (error) {
            console.error('Error saving tindakan:', error);
            alert(error.response?.data?.message || 'Gagal menyimpan tindakan');
        } finally {
            setLoading(false);
        }
    };

    const biaya = calculateBiaya();

    return (
        <motion.div
            variants={containerVariants}
            initial={shouldReduceMotion ? false : 'hidden'}
            animate={shouldReduceMotion ? false : 'visible'}
            className="space-y-6"
        >
            {/* Billing Verified Warning */}
            <AnimatePresence>
                {billingVerified && (
                    <motion.div
                        key="billing-verified"
                        initial={shouldReduceMotion ? false : { opacity: 0, y: -6 }}
                        animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
                        exit={shouldReduceMotion ? false : { opacity: 0, y: -6 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="bg-yellow-50 border-l-4 border-yellow-400 p-4"
                    >
                        <div className="flex">
                            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
                            <div className="ml-3">
                                <p className="text-sm text-yellow-700">
                                    Data billing sudah terverifikasi. Silahkan hubungi bagian kasir/keuangan!
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Dokter/Perawat Selection */}
            <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
                    <h4 className="font-medium text-gray-900">Pilih Tenaga Medis</h4>
                    <div className="inline-flex w-full md:w-auto rounded-lg border border-gray-200 bg-gray-50 p-1">
                        <button
                            type="button"
                            onClick={() => {
                                setJenisPenanganan('dokter');
                                setErrors({});
                                setSelectedTindakan([]);
                                setSearchQuery('');
                            }}
                            className={`flex-1 md:flex-none px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${jenisPenanganan === 'dokter' ? 'bg-white shadow-sm text-indigo-700' : 'text-gray-600 hover:text-gray-800'}`}
                        >
                            Dokter
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setJenisPenanganan('perawat');
                                setErrors({});
                                setSelectedTindakan([]);
                                setSearchQuery('');
                            }}
                            className={`flex-1 md:flex-none px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${jenisPenanganan === 'perawat' ? 'bg-white shadow-sm text-indigo-700' : 'text-gray-600 hover:text-gray-800'}`}
                        >
                            Perawat
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setJenisPenanganan('dokter-perawat');
                                setErrors({});
                                setSelectedTindakan([]);
                                setSearchQuery('');
                            }}
                            className={`flex-1 md:flex-none px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${jenisPenanganan === 'dokter-perawat' ? 'bg-white shadow-sm text-indigo-700' : 'text-gray-600 hover:text-gray-800'}`}
                        >
                            Dokter+Perawat
                        </button>
                    </div>
                </div>
                <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${jenisPenanganan === 'dokter-perawat' ? 'lg:grid-cols-3' : 'lg:grid-cols-2'}`}
                >
                    {(jenisPenanganan === 'dokter' || jenisPenanganan === 'dokter-perawat') && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <UserIcon className="w-4 h-4 inline mr-1" />
                                Dokter
                            </label>
                            <input
                                type="text"
                                value={selectedDokter?.nm_dokter || ''}
                                onClick={() => {
                                    setDokterModalOpen(true);
                                    setErrors((p) => ({ ...p, dokter: null }));
                                }}
                                readOnly
                                placeholder="Klik untuk pilih dokter..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                            />
                            {errors.dokter && <p className="text-red-500 text-xs mt-1">{errors.dokter}</p>}
                        </div>
                    )}
                    {(jenisPenanganan === 'perawat' || jenisPenanganan === 'dokter-perawat') && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <UsersIcon className="w-4 h-4 inline mr-1" />
                                Perawat
                            </label>
                            <input
                                type="text"
                                value={selectedPerawat?.nama || ''}
                                onClick={() => {
                                    setPerawatModalOpen(true);
                                    setErrors((p) => ({ ...p, perawat: null }));
                                }}
                                readOnly
                                placeholder="Klik untuk pilih perawat..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                            />
                            {errors.perawat && <p className="text-red-500 text-xs mt-1">{errors.perawat}</p>}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cari Tindakan</label>
                        <div className="relative">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
                            <input
                                type="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Escape') {
                                        setSearchQuery('');
                                        return;
                                    }

                                    if (e.key === 'Enter' && matchedTindakan) {
                                        e.preventDefault();
                                        addTindakanToCart(matchedTindakan);
                                        setSearchQuery('');
                                    }
                                }}
                                placeholder="Cari nama tindakan atau kode..."
                                list="tindakan-options"
                                className="w-full rounded-md bg-white/90 backdrop-blur-sm ring-1 ring-gray-300/70 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none transition-colors placeholder:text-gray-400 text-sm h-10 pl-10 pr-24"
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                {searchQuery.trim() !== '' && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchQuery('')}
                                        className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                                    >
                                        <XMarkIcon className="w-4 h-4" />
                                    </button>
                                )}
                                <button
                                    type="button"
                                    disabled={!matchedTindakan}
                                    onClick={() => {
                                        if (!matchedTindakan) return;
                                        addTindakanToCart(matchedTindakan);
                                        setSearchQuery('');
                                    }}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-500 disabled:hover:bg-gray-200 transition-colors"
                                >
                                    <PlusIcon className="w-4 h-4" />
                                    Tambah
                                </button>
                            </div>
                        </div>

                        <datalist id="tindakan-options">
                            {filteredTindakan.slice(0, 120).map((t) => (
                                <option key={String(t.kd_jenis_prw)} value={String(t.kd_jenis_prw || '').trim()}>{String(t.nm_perawatan || '').trim()}</option>
                            ))}
                        </datalist>

                        <div className="mt-2 text-xs text-gray-500">
                            {loading
                                ? 'Memuat daftar tindakan…'
                                : matchedTindakan
                                    ? `${String(matchedTindakan.nm_perawatan || '').trim()} (${String(matchedTindakan.kd_jenis_prw || '').trim()})`
                                    : searchQuery.trim()
                                        ? 'Pilih dari saran yang muncul, lalu klik Tambah / tekan Enter.'
                                        : 'Ketik kode atau nama tindakan untuk melihat saran.'}
                        </div>
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {dokterModalOpen && (
                    <motion.div
                        key="dokter-modal"
                        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm p-4 flex items-center justify-center"
                        initial={shouldReduceMotion ? false : { opacity: 0 }}
                        animate={shouldReduceMotion ? false : { opacity: 1 }}
                        exit={shouldReduceMotion ? false : { opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        onMouseDown={(e) => {
                            if (e.currentTarget === e.target) {
                                setDokterModalOpen(false);
                                setDokterQuery('');
                            }
                        }}
                    >
                        <motion.div
                            className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
                            animate={shouldReduceMotion ? false : { opacity: 1, y: 0, scale: 1 }}
                            exit={shouldReduceMotion ? false : { opacity: 0, y: 10, scale: 0.98 }}
                            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                        >
                            <div className="flex items-center justify-between px-5 py-4 border-b bg-gray-50">
                                <div className="font-semibold text-gray-900">Pilih Dokter</div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setDokterModalOpen(false);
                                        setDokterQuery('');
                                    }}
                                    className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 hover:bg-white transition-colors"
                                >
                                    Tutup
                                </button>
                            </div>

                            <div className="p-5 space-y-4">
                                <div className="relative">
                                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                    <input
                                        type="text"
                                        value={dokterQuery}
                                        onChange={(e) => setDokterQuery(e.target.value)}
                                        placeholder="Cari dokter (nama/kode)…"
                                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-colors"
                                    />
                                </div>

                                <div className="max-h-[420px] overflow-y-auto border border-gray-200 rounded-xl">
                                    <AnimatePresence mode="wait">
                                        {dokterLoading ? (
                                            <motion.div
                                                key="dokter-loading"
                                                initial={shouldReduceMotion ? false : { opacity: 0 }}
                                                animate={shouldReduceMotion ? false : { opacity: 1 }}
                                                exit={shouldReduceMotion ? false : { opacity: 0 }}
                                                className="p-6 text-center text-gray-500"
                                            >
                                                Memuat...
                                            </motion.div>
                                        ) : dokterList.length === 0 ? (
                                            <motion.div
                                                key="dokter-empty"
                                                initial={shouldReduceMotion ? false : { opacity: 0 }}
                                                animate={shouldReduceMotion ? false : { opacity: 1 }}
                                                exit={shouldReduceMotion ? false : { opacity: 0 }}
                                                className="p-6 text-center text-gray-500"
                                            >
                                                Dokter tidak ditemukan
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="dokter-list"
                                                variants={containerVariants}
                                                initial={shouldReduceMotion ? false : 'hidden'}
                                                animate={shouldReduceMotion ? false : 'visible'}
                                            >
                                                {dokterList.map((d) => (
                                                    <motion.button
                                                        key={String(d.kd_dokter)}
                                                        type="button"
                                                        variants={cardVariants}
                                                        whileHover={shouldReduceMotion ? undefined : 'hover'}
                                                        whileTap={shouldReduceMotion ? undefined : 'tap'}
                                                        onClick={() => {
                                                            _setSelectedDokter(d);
                                                            setDokterModalOpen(false);
                                                            setDokterQuery('');
                                                        }}
                                                        className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                                                    >
                                                        <div className="font-medium text-gray-900">{d.nm_dokter}</div>
                                                        <div className="text-xs text-gray-500">{d.kd_dokter}</div>
                                                    </motion.button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {perawatModalOpen && (
                    <motion.div
                        key="perawat-modal"
                        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm p-4 flex items-center justify-center"
                        initial={shouldReduceMotion ? false : { opacity: 0 }}
                        animate={shouldReduceMotion ? false : { opacity: 1 }}
                        exit={shouldReduceMotion ? false : { opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        onMouseDown={(e) => {
                            if (e.currentTarget === e.target) {
                                setPerawatModalOpen(false);
                                setPetugasQuery('');
                            }
                        }}
                    >
                        <motion.div
                            className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
                            animate={shouldReduceMotion ? false : { opacity: 1, y: 0, scale: 1 }}
                            exit={shouldReduceMotion ? false : { opacity: 0, y: 10, scale: 0.98 }}
                            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                        >
                            <div className="flex items-center justify-between px-5 py-4 border-b bg-gray-50">
                                <div className="font-semibold text-gray-900">Pilih Petugas</div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setPerawatModalOpen(false);
                                        setPetugasQuery('');
                                    }}
                                    className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 hover:bg-white transition-colors"
                                >
                                    Tutup
                                </button>
                            </div>

                            <div className="p-5 space-y-4">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="relative flex-1">
                                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                        <input
                                            type="text"
                                            value={petugasQuery}
                                            onChange={(e) => setPetugasQuery(e.target.value)}
                                            placeholder="Cari petugas (NIP/nama/email)…"
                                            className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-colors"
                                        />
                                    </div>
                                    <select
                                        value={petugasStatus}
                                        onChange={(e) => setPetugasStatus(e.target.value)}
                                        className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-colors"
                                    >
                                        <option value="">Semua Status</option>
                                        <option value="1">Aktif</option>
                                        <option value="0">Nonaktif</option>
                                    </select>
                                </div>

                                <div className="max-h-[420px] overflow-y-auto border border-gray-200 rounded-xl">
                                    <AnimatePresence mode="wait">
                                        {petugasLoading ? (
                                            <motion.div
                                                key="petugas-loading"
                                                initial={shouldReduceMotion ? false : { opacity: 0 }}
                                                animate={shouldReduceMotion ? false : { opacity: 1 }}
                                                exit={shouldReduceMotion ? false : { opacity: 0 }}
                                                className="p-6 text-center text-gray-500"
                                            >
                                                Memuat...
                                            </motion.div>
                                        ) : petugasList.length === 0 ? (
                                            <motion.div
                                                key="petugas-empty"
                                                initial={shouldReduceMotion ? false : { opacity: 0 }}
                                                animate={shouldReduceMotion ? false : { opacity: 1 }}
                                                exit={shouldReduceMotion ? false : { opacity: 0 }}
                                                className="p-6 text-center text-gray-500"
                                            >
                                                Petugas tidak ditemukan
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="petugas-list"
                                                variants={containerVariants}
                                                initial={shouldReduceMotion ? false : 'hidden'}
                                                animate={shouldReduceMotion ? false : 'visible'}
                                            >
                                                {petugasList.map((p) => (
                                                    <motion.button
                                                        key={String(p.nip)}
                                                        type="button"
                                                        variants={cardVariants}
                                                        whileHover={shouldReduceMotion ? undefined : 'hover'}
                                                        whileTap={shouldReduceMotion ? undefined : 'tap'}
                                                        onClick={() => {
                                                            _setSelectedPerawat(p);
                                                            setPerawatModalOpen(false);
                                                            setPetugasQuery('');
                                                        }}
                                                        className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                                                    >
                                                        <div className="font-medium text-gray-900">{p.nama}</div>
                                                        <div className="text-xs text-gray-500">{p.nip}</div>
                                                    </motion.button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Selected Tindakan */}
            <AnimatePresence>
                {selectedTindakan.length > 0 && (
                    <motion.div
                        key="selected-tindakan"
                        variants={itemVariants}
                        initial={shouldReduceMotion ? false : 'hidden'}
                        animate={shouldReduceMotion ? false : 'visible'}
                        exit={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                        layout
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                    >
                        <h4 className="font-medium text-gray-900 mb-4">
                            Tindakan Dipilih ({selectedTindakan.length})
                        </h4>
                        <motion.div layout className="space-y-3 mb-6">
                            <AnimatePresence initial={false}>
                                {selectedTindakan.map((tindakan) => (
                                    <motion.div
                                        key={tindakan.kd_jenis_prw}
                                        layout
                                        initial={shouldReduceMotion ? false : { opacity: 0, y: 10, scale: 0.99 }}
                                        animate={shouldReduceMotion ? false : { opacity: 1, y: 0, scale: 1 }}
                                        exit={shouldReduceMotion ? false : { opacity: 0, y: 8, scale: 0.99 }}
                                        transition={{ duration: 0.2, ease: 'easeOut' }}
                                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                                    >
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900">{tindakan.nm_perawatan}</div>
                                            <div className="text-sm text-gray-600">{tindakan.kd_jenis_prw}</div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="flex items-center space-x-2">
                                                <motion.button
                                                    type="button"
                                                    whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                                                    onClick={() => updateQuantity(tindakan.kd_jenis_prw, tindakan.quantity - 1)}
                                                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                                                >
                                                    -
                                                </motion.button>
                                                <span className="w-12 text-center font-medium">{tindakan.quantity}</span>
                                                <motion.button
                                                    type="button"
                                                    whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                                                    onClick={() => updateQuantity(tindakan.kd_jenis_prw, tindakan.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                                >
                                                    +
                                                </motion.button>
                                            </div>
                                            <div className="text-right w-32">
                                                <div className="font-semibold text-gray-900">
                                                    Rp {((jenisPenanganan === 'dokter' ? tindakan.total_byrdr : jenisPenanganan === 'perawat' ? tindakan.total_byrpr : tindakan.total_byrdrpr) * tindakan.quantity).toLocaleString()}
                                                </div>
                                            </div>
                                            <motion.button
                                                type="button"
                                                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                                                onClick={() => removeFromCart(tindakan.kd_jenis_prw)}
                                                className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                    <div className="border-t pt-4 mb-4">
                        <button
                            type="button"
                            onClick={() => setBiayaCollapsed((v) => !v)}
                            className="w-full flex items-center justify-between gap-3"
                        >
                            <h5 className="font-medium text-gray-900">Rincian Biaya</h5>
                            <span className="inline-flex items-center gap-2 text-sm text-gray-600">
                                <span>{biayaCollapsed ? 'Lihat' : 'Tutup'}</span>
                                <motion.span
                                    animate={shouldReduceMotion ? undefined : { rotate: biayaCollapsed ? 0 : 180 }}
                                    transition={{ duration: 0.2, ease: 'easeOut' }}
                                    className="inline-flex"
                                >
                                    <ChevronDownIcon className="w-4 h-4" />
                                </motion.span>
                            </span>
                        </button>

                        <AnimatePresence initial={false}>
                            {!biayaCollapsed && (
                                <motion.div
                                    key="biaya-details"
                                    initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                                    animate={shouldReduceMotion ? false : { height: 'auto', opacity: 1 }}
                                    exit={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                                    transition={{ duration: 0.22, ease: 'easeOut' }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-3 space-y-2">
                                        {biaya.totalJasaDokter > 0 && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Jasa Medik Dokter:</span>
                                                <span className="font-medium">Rp {biaya.totalJasaDokter.toLocaleString()}</span>
                                            </div>
                                        )}
                                        {biaya.totalJasaPerawat > 0 && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Jasa Medik Perawat:</span>
                                                <span className="font-medium">Rp {biaya.totalJasaPerawat.toLocaleString()}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">KSO:</span>
                                            <span className="font-medium">Rp {biaya.totalKSO.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Jasa Sarana:</span>
                                            <span className="font-medium">Rp {biaya.totalJasaSarana.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">BHP:</span>
                                            <span className="font-medium">Rp {biaya.totalBHP.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Menejemen:</span>
                                            <span className="font-medium">Rp {biaya.totalMenejemen.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="border-t pt-4">
                        <div className="flex items-center justify-between text-xl font-semibold">
                            <span>Total Biaya:</span>
                            <span className="text-indigo-600">Rp {biaya.total.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <motion.button
                            type="button"
                            whileHover={shouldReduceMotion ? undefined : { scale: 1.01 }}
                            whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
                            onClick={handleSubmit}
                            disabled={loading || billingVerified}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-1.5 text-sm"
                        >
                            <PlusIcon className="w-4 h-4" />
                            <span>{loading ? 'Menyimpan...' : 'Simpan Tindakan'}</span>
                        </motion.button>
                    </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default TarifTindakan;
