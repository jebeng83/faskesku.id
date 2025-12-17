import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    PlusIcon,
    MagnifyingGlassIcon,
    TrashIcon,
    ClipboardDocumentListIcon,
    HeartIcon,
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';

const Resep = ({
    token = '',
    noRkmMedis = '',
    noRawat = '',
    kdBangsal = '',
    kdPj = '',
    kdPoli = ''
}) => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [activeTab, setActiveTab] = useState('create');
    const [obatOptions, setObatOptions] = useState([]);
    const [loadingObat, setLoadingObat] = useState(false);
    const [loadingRiwayat, setLoadingRiwayat] = useState(false);
    const [dokterPJ, setDokterPJ] = useState({ kd_dokter: '', nm_dokter: '' });
    const [loadingDokterPJ, setLoadingDokterPJ] = useState(false);
    const [dokterPJError, setDokterPJError] = useState(null);
    const [dokterOptions, setDokterOptions] = useState([]);
    const [selectedDokter, setSelectedDokter] = useState('');
    const [loadingDokter, setLoadingDokter] = useState(false);
    const [items, setItems] = useState([
        {
            id: 1,
            kodeObat: '',
            namaObat: '',
            aturanPakai: '',
            jumlah: 0,
            satuan: '',
            stokTersedia: 0,
            harga: 0,
            stokDetail: [],
            batchDetail: []
        }
    ]);
    const [searchObat, setSearchObat] = useState({});
    const [showDropdown, setShowDropdown] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchObat = async (search = '') => {
        if (!kdPoli) {
            return;
        }

        setLoadingObat(true);
        try {
            const response = await axios.get('/api/obat', {
                params: {
                    kd_poli: kdPoli,
                    search,
                    limit: 20
                }
            });

            if (response.data.success) {
                setObatOptions(response.data.data);
            } else {
                setObatOptions([]);
            }
        } catch {
            setObatOptions([]);
        } finally {
            setLoadingObat(false);
        }
    };

    const getStokInfo = async (kodeBrng) => {
        try {
            const response = await axios.get('/api/resep/stok-info', {
                params: {
                    kode_brng: kodeBrng,
                    kd_poli: kdPoli
                }
            });

            if (response.data.success) {
                return response.data.data;
            }
            return null;
        } catch {
            return null;
        }
    };

    const fetchDokter = async () => {
        setLoadingDokter(true);
        try {
            const response = await axios.get('/api/dokter');

            if (response.data.success) {
                const validDokters = response.data.data.filter(
                    (dokter) => dokter.kd_dokter !== '-'
                );
                setDokterOptions(validDokters);
            } else {
                setDokterOptions([]);
            }
        } catch {
            setDokterOptions([]);
        } finally {
            setLoadingDokter(false);
        }
    };

    const fetchDokterPenanggungJawab = async () => {
        if (!noRawat) return;
        setLoadingDokterPJ(true);
        setDokterPJError(null);
        try {
            let regData = null;
            try {
                const respRegExact = await axios.get('/api/reg-periksa/by-rawat', {
                    params: { no_rawat: noRawat }
                });
                regData = respRegExact?.data?.data || null;
            } catch {
            }

            if (!regData) {
                const respReg = await axios.get('/api/reg-periksa', {
                    params: { search: noRawat, per_page: 1 }
                });
                regData = respReg?.data?.data?.data?.[0] || null;
            }

            if (regData?.kd_dokter && regData?.kd_dokter !== '-') {
                const kd = regData.kd_dokter;
                let nm =
                    regData?.dokter?.nm_dokter ||
                    regData?.doctor?.nm_dokter ||
                    '';
                if (!nm) {
                    try {
                        const respDokter = await axios.get(
                            `/api/dokter/${encodeURIComponent(kd)}`
                        );
                        nm = respDokter?.data?.data?.nm_dokter || nm;
                    } catch {
                    }
                }
                const nmFinal = nm || kd;
                setDokterPJ({ kd_dokter: kd, nm_dokter: nmFinal });
                setSelectedDokter(kd);
                setDokterOptions((prev) => {
                    if (
                        Array.isArray(prev) &&
                        prev.some((d) => d.kd_dokter === kd)
                    ) {
                        return prev;
                    }
                    const pjDoctor = { kd_dokter: kd, nm_dokter: nmFinal };
                    return [pjDoctor, ...(Array.isArray(prev) ? prev : [])];
                });
            } else {
                setDokterPJ({ kd_dokter: '', nm_dokter: '' });
            }
        } catch {
            setDokterPJ({ kd_dokter: '', nm_dokter: '' });
            setDokterPJError('Gagal memuat dokter penanggung jawab');
        } finally {
            setLoadingDokterPJ(false);
        }
    };

    const fetchRiwayatResep = async () => {
        if (!noRkmMedis) {
            return;
        }
        setLoadingRiwayat(true);
        try {
            const encodedNoRkmMedis = encodeURIComponent(noRkmMedis);
            const response = await axios.get(
                `/api/resep/pasien/${encodedNoRkmMedis}`,
                {
                    params: {
                        limit: 20,
                        offset: 0
                    }
                }
            );

            if (response.data.success) {
                const data = response.data.data || [];
                const ranapResep = data
                    .filter(
                        (r) =>
                            String(r.status).toLowerCase() === 'ranap' &&
                            (!noRawat || r.no_rawat === noRawat)
                    )
                    .map((r, idx) => ({
                        id: r.no_resep || idx,
                        prescriptionNumber: r.no_resep,
                        type: 'oral',
                        status:
                            r.tgl_penyerahan &&
                            r.tgl_penyerahan !== '0000-00-00'
                                ? 'dispensed'
                                : 'pending',
                        drugs: (r.detail_obat || []).map((d) => ({
                            name: d.nama_brng,
                            quantity: d.jml,
                            dosage: d.aturan_pakai,
                            instruction: ''
                        })),
                        prescribedDate: `${r.tgl_peresepan} ${r.jam_peresepan}`,
                        dispensedDate:
                            r.tgl_penyerahan &&
                            r.tgl_penyerahan !== '0000-00-00'
                                ? `${r.tgl_penyerahan} ${r.jam_penyerahan}`
                                : null,
                        notes: ''
                    }));
                setPrescriptions(ranapResep);
            } else {
                setPrescriptions([]);
            }
        } catch {
            setPrescriptions([]);
        } finally {
            setLoadingRiwayat(false);
        }
    };

    useEffect(() => {
        if (kdPoli) {
            fetchObat();
        }
    }, [kdPoli]);

    useEffect(() => {
        fetchDokterPenanggungJawab();
    }, [noRawat]);

    useEffect(() => {
        fetchRiwayatResep();
    }, [noRkmMedis, noRawat]);

    useEffect(() => {
        fetchDokter();
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const terms = Object.values(searchObat).filter(
                (term) => term && term.length > 0
            );
            if (terms.length > 0) {
                const latest = terms[terms.length - 1];
                if (latest.length >= 2) {
                    fetchObat(latest);
                } else if (latest.length === 0) {
                    fetchObat();
                }
            } else if (kdPoli) {
                fetchObat();
            }
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [searchObat, kdPoli]);

    useEffect(() => {
        const hasActiveDropdown = Object.values(showDropdown).some((show) => show);
        if (hasActiveDropdown && obatOptions.length === 0 && kdPoli) {
            fetchObat();
        }
    }, [showDropdown, obatOptions.length, kdPoli]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown-container')) {
                setShowDropdown({});
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const addItem = () => {
        setItems((prev) => [
            ...prev,
            {
                id: Date.now(),
                kodeObat: '',
                namaObat: '',
                aturanPakai: '',
                jumlah: 0,
                satuan: '',
                stokTersedia: 0,
                harga: 0,
                stokDetail: [],
                batchDetail: []
            }
        ]);
    };

    const removeItem = (id) => {
        setItems((prev) => prev.filter((it) => it.id !== id));
        setSearchObat((prev) => {
            const next = { ...prev };
            delete next[id];
            return next;
        });
        setShowDropdown((prev) => {
            const next = { ...prev };
            delete next[id];
            return next;
        });
    };

    const updateItem = (id, key, value) => {
        setItems((prev) =>
            prev.map((it) => (it.id === id ? { ...it, [key]: value } : it))
        );
    };

    const selectObat = async (itemId, obat) => {
        const stokInfo = await getStokInfo(obat.kode_brng);
        setItems((prev) =>
            prev.map((it) =>
                it.id === itemId
                    ? {
                          ...it,
                          kodeObat: obat.kode_brng,
                          namaObat: obat.nama_brng,
                          satuan: obat.kode_satbesar,
                          stokTersedia: stokInfo
                              ? stokInfo.total_stok
                              : obat.total_stok,
                          harga: stokInfo ? stokInfo.harga_ralan : obat.ralan || 0,
                          stokDetail: stokInfo ? stokInfo.stok_per_bangsal : [],
                          batchDetail: stokInfo ? stokInfo.batch_detail : []
                      }
                    : it
            )
        );
        setShowDropdown((prev) => ({ ...prev, [itemId]: false }));
    };

    const validateForm = () => {
        if (!selectedDokter) {
            alert('Dokter harus dipilih');
            return false;
        }
        for (const item of items) {
            if (!item.kodeObat || !item.namaObat) {
                alert('Semua obat harus dipilih');
                return false;
            }
            if (!item.jumlah || item.jumlah <= 0) {
                alert('Jumlah obat harus lebih dari 0');
                return false;
            }
            if (!String(item.aturanPakai || '').trim()) {
                alert('Aturan pakai harus diisi');
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }

        if (!noRawat) {
            alert('No. rawat tidak tersedia');
            return;
        }
        if (!kdPoli) {
            alert('Poli untuk resep tidak tersedia');
            return;
        }
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        try {
            const payloadItems = items
                .filter((item) => item.kodeObat && item.jumlah > 0)
                .map((item) => ({
                    kode_brng: item.kodeObat,
                    jml: parseFloat(item.jumlah),
                    aturan_pakai: item.aturanPakai || ''
                }));

            const resepData = {
                no_rawat: noRawat,
                kd_poli: kdPoli,
                kd_dokter: selectedDokter,
                status: 'ranap',
                items: payloadItems
            };

            const response = await axios.post('/api/resep', resepData);

            if (response.data.success) {
                const noResep = response.data.data.no_resep;
                alert(`Resep berhasil disimpan dengan nomor: ${noResep}`);
                setItems([
                    {
                        id: 1,
                        kodeObat: '',
                        namaObat: '',
                        aturanPakai: '',
                        jumlah: '',
                        satuan: '',
                        stokTersedia: 0,
                        harga: 0
                    }
                ]);
                setSearchObat({});
                setShowDropdown({});
                setActiveTab('history');
                fetchRiwayatResep();
                if (kdPoli) {
                    fetchObat();
                }
            } else {
                alert(
                    'Gagal menyimpan resep: ' +
                        (response.data.message || 'Terjadi kesalahan')
                );
            }
        } catch (error) {
            if (error.response?.data?.message) {
                alert('Error: ' + error.response.data.message);
            } else {
                alert('Terjadi kesalahan saat menyimpan resep');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'dispensed':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'partial':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return <ClockIcon className="w-4 h-4" />;
            case 'dispensed':
                return <CheckCircleIcon className="w-4 h-4" />;
            case 'cancelled':
                return <XCircleIcon className="w-4 h-4" />;
            case 'partial':
                return <ExclamationTriangleIcon className="w-4 h-4" />;
            default:
                return <ClipboardDocumentListIcon className="w-4 h-4" />;
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'oral':
                return 'bg-green-100 text-green-800';
            case 'injection':
                return 'bg-red-100 text-red-800';
            case 'topical':
                return 'bg-blue-100 text-blue-800';
            case 'iv':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const totalCost = items.reduce(
        (sum, item) => sum + (item.harga || 0) * (item.jumlah || 0),
        0
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                        <HeartIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Resep Rawat Inap</h3>
                        <p className="text-sm text-gray-600">Kelola resep obat untuk pasien rawat inap</p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                <button
                    onClick={() => setActiveTab('create')}
                    className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                        activeTab === 'create'
                            ? 'bg-white text-indigo-700 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Buat Resep
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                        activeTab === 'history'
                            ? 'bg-white text-indigo-700 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Riwayat ({prescriptions.length})
                </button>
            </div>

            {activeTab === 'create' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 p-4">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Dokter Penanggung Jawab
                                </label>
                                {loadingDokterPJ ? (
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Memuat...</span>
                                ) : dokterPJError ? (
                                    <span className="text-xs text-red-600 dark:text-red-400">{dokterPJError}</span>
                                ) : null}
                            </div>
                            <div className="mt-1 mb-3">
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {loadingDokterPJ ? 'Memuat...' : dokterPJ?.nm_dokter || '-'}
                                </p>
                                {dokterPJ?.kd_dokter && (
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                        Kode: {dokterPJ.kd_dokter}
                                    </p>
                                )}
                            </div>
                            <select
                                value={selectedDokter}
                                onChange={(e) => setSelectedDokter(e.target.value)}
                                className="w-full py-2.5 px-3 rounded-lg border-2 border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:shadow-md transition-all"
                                required
                                disabled={loadingDokter}
                            >
                                {loadingDokter ? (
                                    <option value="">Memuat dokter...</option>
                                ) : (
                                    <>
                                        <option value="">Pilih Dokter</option>
                                        {dokterOptions.map((dokter) => (
                                            <option
                                                key={dokter.kd_dokter}
                                                value={dokter.kd_dokter}
                                            >
                                                {dokter.nm_dokter}
                                            </option>
                                        ))}
                                    </>
                                )}
                            </select>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                                Input Resep
                            </h4>

                            <div className="grid grid-cols-12 gap-4 mb-2">
                                <div className="col-span-5">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Nama Obat
                                    </label>
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Jml
                                    </label>
                                </div>
                                <div className="col-span-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Aturan Pakai
                                    </label>
                                </div>
                                <div className="col-span-1" />
                            </div>

                            {items.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="grid grid-cols-12 gap-4 items-start"
                                >
                                    <div className="col-span-5 relative dropdown-container">
                                        <input
                                            type="text"
                                            value={item.namaObat}
                                            onChange={(e) => {
                                                updateItem(item.id, 'namaObat', e.target.value);
                                                setSearchObat((prev) => ({
                                                    ...prev,
                                                    [item.id]: e.target.value
                                                }));
                                                setShowDropdown((prev) => ({
                                                    ...prev,
                                                    [item.id]: true
                                                }));
                                            }}
                                            onFocus={() => {
                                                setShowDropdown((prev) => ({
                                                    ...prev,
                                                    [item.id]: true
                                                }));
                                                if (!searchObat[item.id] && kdPoli) {
                                                    fetchObat();
                                                }
                                            }}
                                            className="w-full py-2.5 px-3 rounded-lg border-2 border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:shadow-md transition-all"
                                            placeholder="Pilih Obat"
                                            required
                                        />

                                        {showDropdown[item.id] && (
                                            <div className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                                                {loadingObat && (
                                                    <div className="p-3 text-center text-gray-500 dark:text-gray-400 flex items-center justify-center">
                                                        <svg
                                                            className="animate-spin -ml-1 mr-2 h-4 w-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <circle
                                                                className="opacity-25"
                                                                cx="12"
                                                                cy="12"
                                                                r="10"
                                                                stroke="currentColor"
                                                                strokeWidth="4"
                                                            ></circle>
                                                            <path
                                                                className="opacity-75"
                                                                fill="currentColor"
                                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                            ></path>
                                                        </svg>
                                                        Mencari obat...
                                                    </div>
                                                )}
                                                {!loadingObat && obatOptions.length === 0 && (
                                                    <div className="p-3 text-center text-gray-500 dark:text-gray-400">
                                                        {!kdPoli
                                                            ? 'Data poli tidak tersedia'
                                                            : searchObat[item.id] &&
                                                              searchObat[item.id].length >= 2
                                                            ? 'Obat tidak ditemukan'
                                                            : 'Ketik untuk mencari obat atau klik untuk melihat semua'}
                                                    </div>
                                                )}
                                                {!loadingObat &&
                                                    obatOptions.length > 0 &&
                                                    obatOptions.map((obat) => (
                                                        <div
                                                            key={obat.kode_brng}
                                                            className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b dark:border-gray-600 last:border-b-0 transition-colors"
                                                            onClick={() => {
                                                                selectObat(item.id, obat);
                                                                setShowDropdown((prev) => ({
                                                                    ...prev,
                                                                    [item.id]: false
                                                                }));
                                                            }}
                                                        >
                                                            <div className="flex items-start justify-between">
                                                                <div className="flex-1">
                                                                    <div className="font-medium text-gray-900 dark:text-white text-sm">
                                                                        {obat.nama_brng}
                                                                    </div>
                                                                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                                                            {obat.kode_brng}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="col-span-2">
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.jumlah || ''}
                                            onChange={(e) => {
                                                const jumlah = parseInt(e.target.value, 10) || '';
                                                updateItem(item.id, 'jumlah', jumlah);
                                            }}
                                            className={`w-full py-2.5 px-3 rounded-lg border-2 shadow-sm focus:ring-2 focus:shadow-md transition-all ${
                                                item.jumlah > item.stokTersedia &&
                                                item.stokTersedia > 0
                                                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50 dark:bg-red-900/20 text-gray-900 dark:text-white'
                                                    : 'border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-green-500 focus:border-green-500'
                                            }`}
                                            placeholder={index === 0 ? 'Jml' : 'Jumlah'}
                                            max={item.stokTersedia || undefined}
                                            required
                                        />
                                    </div>

                                    <div className="col-span-4">
                                        <input
                                            type="text"
                                            value={item.aturanPakai}
                                            onChange={(e) =>
                                                updateItem(item.id, 'aturanPakai', e.target.value)
                                            }
                                            className="w-full py-2.5 px-3 rounded-lg border-2 border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:shadow-md transition-all"
                                            placeholder="Aturan Pakai"
                                            required
                                        />
                                    </div>

                                    <div className="col-span-1 flex justify-end">
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => removeItem(item.id)}
                                                className="inline-flex items-center justify-center w-8 h-8 rounded text-white bg-red-500 hover:bg-red-600 transition-colors"
                                                title="Hapus baris"
                                            >
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M20 12H4"
                                                    />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <button
                                type="button"
                                onClick={addItem}
                                className="inline-flex items-center justify-center w-12 h-12 rounded-lg text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                                title="Tambah baris"
                            >
                                <PlusIcon className="w-6 h-6" />
                            </button>

                            <button
                                type="submit"
                                disabled={isSubmitting || items.length === 0}
                                className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                            >
                                {isSubmitting ? 'Menyimpan...' : 'Simpan'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}

            {activeTab === 'history' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    {prescriptions.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                            <HeartIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Resep</h3>
                            <p className="text-gray-600">Buat resep obat untuk pasien rawat inap</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {prescriptions.map((prescription) => (
                                <motion.div
                                    key={prescription.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <div className="flex items-center space-x-3 mb-2">
                                                <span className="font-semibold text-gray-900">{prescription.prescriptionNumber}</span>
                                                <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(prescription.status)}`}>
                                                    {getStatusIcon(prescription.status)}
                                                    <span className="capitalize">{prescription.status}</span>
                                                </span>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(prescription.type)}`}>
                                                    {prescription.type}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                Diresepkan: {prescription.prescribedDate}
                                                {prescription.dispensedDate && (
                                                    <span> • Diserahkan: {prescription.dispensedDate}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <div>
                                            <h5 className="font-medium text-gray-900 mb-3">Daftar Obat:</h5>
                                            <div className="space-y-2">
                                                {prescription.drugs.map((drug, index) => (
                                                    <div key={index} className="bg-gray-50 rounded-lg p-3">
                                                        <div className="flex justify-between items-start">
                                                            <div className="flex-1">
                                                                <div className="font-medium text-gray-900">{drug.name}</div>
                                                                <div className="text-sm text-gray-600 mt-1">
                                                                    Jumlah: {drug.quantity} • Dosis: {drug.dosage}
                                                                    {drug.instruction && <span> • {drug.instruction}</span>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        {prescription.notes && (
                                            <div>
                                                <h5 className="font-medium text-gray-900 mb-2">Catatan:</h5>
                                                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{prescription.notes}</p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default Resep;
