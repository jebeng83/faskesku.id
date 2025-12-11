import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LanjutanRegistrasiLayout from '@/Layouts/LanjutanRegistrasiLayout';
import WilayahSearchableSelect from '@/Components/WilayahSearchableSelect';
import SelectWithAdd from "@/Components/SelectWithAdd";
import PenjabCreateModal from "@/Components/PenjabCreateModal";
import SearchableSelect from "@/Components/SearchableSelect";
import { UserCog, ArrowLeft, Eye, Info, CheckCircle2, Loader2 } from "lucide-react";

export default function Edit({ patient }) {
    // Motion variants for subtle, performant micro-interactions
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
            },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };
    const [selectedWilayah, setSelectedWilayah] = useState(null);
    const [loadingWilayah, setLoadingWilayah] = useState(false);
    const [penjabOptions, setPenjabOptions] = useState([]);
    const [isPenjabModalOpen, setIsPenjabModalOpen] = useState(false);
    const [perusahaanOptions, setPerusahaanOptions] = useState([]);
    const [sukuOptions, setSukuOptions] = useState([]);
    const [bahasaOptions, setBahasaOptions] = useState([]);
    const [cacatOptions, setCacatOptions] = useState([]);

    const { data, setData, post, processing, errors, transform } = useForm({
        nm_pasien: patient.nm_pasien || '',
        no_ktp: patient.no_ktp || '',
        jk: patient.jk || 'L',
        tmp_lahir: patient.tmp_lahir || '',
        tgl_lahir: patient.tgl_lahir || '',
        nm_ibu: patient.nm_ibu || '',
        alamat: patient.alamat || '',
        gol_darah: patient.gol_darah || '',
        pekerjaan: patient.pekerjaan || '',
        stts_nikah: patient.stts_nikah || 'BELUM MENIKAH',
        agama: patient.agama || '',
        no_tlp: patient.no_tlp || '',
        pnd: patient.pnd || 'SMA',
        keluarga: patient.keluarga || 'DIRI SENDIRI',
        namakeluarga: patient.namakeluarga || '',
        kd_pj: patient.kd_pj || 'UMUM',
        no_peserta: patient.no_peserta || '',
        pekerjaanpj: patient.pekerjaanpj || '',
        alamatpj: patient.alamatpj || '',
        kelurahanpj: patient.kelurahanpj || '',
        kecamatanpj: patient.kecamatanpj || '',
        kabupatenpj: patient.kabupatenpj || '',
        propinsipj: patient.propinsipj || '',
        email: patient.email || '',
        kode_wilayah: '',
        perusahaan_pasien: patient.perusahaan_pasien || '',
        suku_bangsa: patient.suku_bangsa || '',
        bahasa_pasien: patient.bahasa_pasien || '',
        cacat_fisik: patient.cacat_fisik || '',
        nip: patient.nip || '',
    });

    // Load penjab options on component mount
    useEffect(() => {
        const loadPenjabOptions = async () => {
            try {
                const response = await fetch('/api/penjab');
                if (response.ok) {
                    const result = await response.json();
                    const options = (result.data || []).map((penjab) => ({
                        value: penjab.kd_pj,
                        label: penjab.png_jawab,
                    }));
                    setPenjabOptions(options);
                }
            } catch (error) {
                console.error('Error loading penjab options:', error);
            }
        };
        loadPenjabOptions();
    }, []);

    // Load reference options (perusahaan pasien, suku bangsa, bahasa pasien, cacat fisik)
    useEffect(() => {
        const loadRefs = async () => {
            try {
                const [perusahaanRes, sukuRes, bahasaRes, cacatRes] = await Promise.all([
                    fetch('/api/perusahaan-pasien'),
                    fetch('/api/suku-bangsa'),
                    fetch('/api/bahasa-pasien'),
                    fetch('/api/cacat-fisik'),
                ]);
                if (perusahaanRes.ok) {
                    const r = await perusahaanRes.json();
                    setPerusahaanOptions((r.data || []).map((d) => ({ value: d.value, label: d.label })));
                }
                if (sukuRes.ok) {
                    const r = await sukuRes.json();
                    setSukuOptions((r.data || []).map((d) => ({ value: d.value, label: d.label })));
                }
                if (bahasaRes.ok) {
                    const r = await bahasaRes.json();
                    setBahasaOptions((r.data || []).map((d) => ({ value: d.value, label: d.label })));
                }
                if (cacatRes.ok) {
                    const r = await cacatRes.json();
                    setCacatOptions((r.data || []).map((d) => ({ value: d.value, label: d.label })));
                }
            } catch (e) {
                console.error('Error loading reference options:', e);
            }
        };
        loadRefs();
    }, []);

    const handleAddPenjab = () => {
        setIsPenjabModalOpen(true);
    };

    const handlePenjabSuccess = async () => {
        // Reload penjab options after successful creation
        try {
            const response = await fetch('/api/penjab');
            if (response.ok) {
                const result = await response.json();
                const options = (result.data || []).map((penjab) => ({
                    value: penjab.kd_pj,
                    label: penjab.png_jawab,
                }));
                setPenjabOptions(options);
            }
        } catch (error) {
            console.error('Error loading penjab options:', error);
        }
    };

    // Build and load wilayah details for display
    useEffect(() => {
        const isValidWilayahCode = (c) => /^(\d{2})\.(\d{2})\.(\d{2})\.(\d{4})$/.test(String(c || '').trim());
        let code = patient.kode_wilayah;
        if (!code && patient.kd_prop && patient.kd_kab && patient.kd_kec && patient.kd_kel) {
            const pad2 = (n) => String(n).padStart(2, '0');
            const pad4 = (n) => String(n).padStart(4, '0');
            code = `${pad2(patient.kd_prop)}.${pad2(patient.kd_kab)}.${pad2(patient.kd_kec)}.${pad4(patient.kd_kel)}`;
        }
        if (code && isValidWilayahCode(code)) {
            setData('kode_wilayah', code);
            setLoadingWilayah(true);
            fetch(`/api/wilayah/${code}`)
                .then(async (response) => {
                    if (response.ok) {
                        const result = await response.json();
                        if (result.success) {
                            const fullAddress = result.data.full_address || '';
                            const parts = fullAddress.split(', ').map((p) => p.trim());
                            const wilayah = {
                                village: parts[0] || '',
                                district: parts[1] || '',
                                regency: parts[2] || '',
                                province: parts[3] || '',
                            };
                            setSelectedWilayah(wilayah);
                            // Auto-fill related fields
                            setData('kelurahanpj', wilayah.village);
                            setData('kecamatanpj', wilayah.district);
                            setData('kabupatenpj', wilayah.regency);
                            setData('propinsipj', wilayah.province);
                        }
                    }
                })
                .catch((error) => {
                    console.error('Error fetching wilayah details:', error);
                })
                .finally(() => setLoadingWilayah(false));
        } else {
            if (code) {
                console.warn('Invalid kode_wilayah format, expected PP.RR.DD.VVVV but got:', code);
            }
            setSelectedWilayah(null);
        }
    }, [patient]);

    // Handle wilayah selection change
    const handleWilayahChange = async (event) => {
        const value = event.target.value;
        setData('kode_wilayah', value);

        if (event.fullAddress) {
            const parts = event.fullAddress.split(', ').map((p) => p.trim());
            const wilayah = {
                village: parts[0] || '',
                district: parts[1] || '',
                regency: parts[2] || '',
                province: parts[3] || '',
            };
            setSelectedWilayah(wilayah);
            setData('kelurahanpj', wilayah.village);
            setData('kecamatanpj', wilayah.district);
            setData('kabupatenpj', wilayah.regency);
            setData('propinsipj', wilayah.province);
        } else if (value && /^(\d{2})\.(\d{2})\.(\d{2})\.(\d{4})$/.test(String(value).trim())) {
            setLoadingWilayah(true);
            try {
                const response = await fetch(`/api/wilayah/${value}`);
                if (response.ok) {
                    const result = await response.json();
                    if (result.success) {
                        const fullAddress = result.data.full_address || '';
                        const parts = fullAddress.split(', ').map((p) => p.trim());
                        const wilayah = {
                            village: parts[0] || '',
                            district: parts[1] || '',
                            regency: parts[2] || '',
                            province: parts[3] || '',
                        };
                        setSelectedWilayah(wilayah);
                        setData('kelurahanpj', wilayah.village);
                        setData('kecamatanpj', wilayah.district);
                        setData('kabupatenpj', wilayah.regency);
                        setData('propinsipj', wilayah.province);
                    }
                }
            } catch (error) {
                console.error('Error fetching wilayah details:', error);
            } finally {
                setLoadingWilayah(false);
            }
        } else {
            if (value) {
                console.warn('Invalid kode_wilayah format, expected PP.RR.DD.VVVV but got:', value);
            }
            setSelectedWilayah(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        transform((payload) => ({ ...payload, _method: 'PUT' }));
        post(route('patients.update', patient.no_rkm_medis), {
            forceFormData: true,
            onFinish: () => transform((payload) => payload),
        });
    };

    return (
        <LanjutanRegistrasiLayout
            title="Registrasi Pasien"
            menuConfig={{ activeTab: 'pasien' }}
        >
            <Head title={`Edit Pasien - ${patient.nm_pasien}`} />

            <motion.div className="py-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 min-h-screen" initial="hidden" animate="visible" variants={containerVariants}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
                    {/* Header */}
                    <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 p-8 mb-8">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10" />
                        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <motion.div
                                    className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    <UserCog className="w-6 h-6 text-white" />
                                </motion.div>
                                <div>
                                    <motion.h1
                                        className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
                                    >
                                        Edit Pasien
                                    </motion.h1>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                        {patient.nm_pasien} - {patient.no_rkm_medis}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Link
                                    href={route('patients.index')}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all duration-200"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Kembali
                                </Link>
                                <Link
                                    href={route('patients.show', patient.no_rkm_medis)}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 transition-all duration-200"
                                >
                                    <Eye className="w-4 h-4" />
                                    Lihat
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Information */}
                        <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 mb-8">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                            <div className="relative p-8 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                    <motion.div
                                        className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md"
                                        whileHover={{ rotate: 90, scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <UserCog className="w-5 h-5 text-white" />
                                    </motion.div>
                                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                        Informasi Dasar
                                    </span>
                                </h3>
                            </div>
                            <div className="relative p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Nomor RM
                                        </label>
                                        <input
                                            type="text"
                                            value={patient.no_rkm_medis}
                                            disabled
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                                        />
                                        <p className="mt-1 text-xs text-gray-500">Nomor RM tidak dapat diubah</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Nama Lengkap *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.nm_pasien}
                                            onChange={(e) => setData('nm_pasien', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="Masukkan nama lengkap"
                                        />
                                        {errors.nm_pasien && (
                                            <p className="mt-1 text-sm text-red-600">{errors.nm_pasien}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            NIK
                                        </label>
                                        <input
                                            type="text"
                                            value={data.no_ktp}
                                            onChange={(e) => setData('no_ktp', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="Masukkan NIK"
                                        />
                                        {errors.no_ktp && (
                                            <p className="mt-1 text-sm text-red-600">{errors.no_ktp}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Jenis Kelamin *
                                        </label>
                                        <select
                                            value={data.jk}
                                            onChange={(e) => setData('jk', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="L">Laki-laki</option>
                                            <option value="P">Perempuan</option>
                                        </select>
                                        {errors.jk && (
                                            <p className="mt-1 text-sm text-red-600">{errors.jk}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Tempat Lahir *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.tmp_lahir}
                                            onChange={(e) => setData('tmp_lahir', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="Masukkan tempat lahir"
                                        />
                                        {errors.tmp_lahir && (
                                            <p className="mt-1 text-sm text-red-600">{errors.tmp_lahir}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Tanggal Lahir *
                                        </label>
                                        <input
                                            type="date"
                                            value={data.tgl_lahir}
                                            onChange={(e) => setData('tgl_lahir', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        />
                                        {errors.tgl_lahir && (
                                            <p className="mt-1 text-sm text-red-600">{errors.tgl_lahir}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Nama Ibu *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.nm_ibu}
                                            onChange={(e) => setData('nm_ibu', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="Masukkan nama ibu"
                                        />
                                        {errors.nm_ibu && (
                                            <p className="mt-1 text-sm text-red-600">{errors.nm_ibu}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Information */}
                        <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 mb-8">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                            <div className="relative p-8 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                    <motion.div
                                        className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md"
                                        whileHover={{ rotate: 90, scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Info className="w-5 h-5 text-white" />
                                    </motion.div>
                                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                        Informasi Kontak
                                    </span>
                                </h3>
                            </div>
                            <div className="relative p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Alamat *
                                        </label>
                                        <textarea
                                            value={data.alamat}
                                            onChange={(e) => setData('alamat', e.target.value)}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="Masukkan alamat lengkap"
                                        />
                                        {errors.alamat && (
                                            <p className="mt-1 text-sm text-red-600">{errors.alamat}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            No. Telepon
                                        </label>
                                        <input
                                            type="text"
                                            value={data.no_tlp}
                                            onChange={(e) => setData('no_tlp', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="Masukkan nomor telepon"
                                        />
                                        {errors.no_tlp && (
                                            <p className="mt-1 text-sm text-red-600">{errors.no_tlp}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="Masukkan email"
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Additional Information */}
                        <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 mb-8">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                            <div className="relative p-8 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                    <motion.div
                                        className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md"
                                        whileHover={{ rotate: 90, scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Info className="w-5 h-5 text-white" />
                                    </motion.div>
                                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                        Informasi Tambahan
                                    </span>
                                </h3>
                            </div>
                            <div className="relative p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Golongan Darah
                                        </label>
                                        <select
                                            value={data.gol_darah}
                                            onChange={(e) => setData('gol_darah', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="">Pilih Golongan Darah</option>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="O">O</option>
                                            <option value="AB">AB</option>
                                            <option value="-">Tidak Diketahui</option>
                                        </select>
                                        {errors.gol_darah && (
                                            <p className="mt-1 text-sm text-red-600">{errors.gol_darah}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Status Perkawinan
                                        </label>
                                        <select
                                            value={data.stts_nikah}
                                            onChange={(e) => setData('stts_nikah', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="BELUM MENIKAH">Belum Menikah</option>
                                            <option value="MENIKAH">Menikah</option>
                                            <option value="JANDA">Janda</option>
                                            <option value="DUDHA">Duda</option>
                                            <option value="JOMBLO">Jomblo</option>
                                        </select>
                                        {errors.stts_nikah && (
                                            <p className="mt-1 text-sm text-red-600">{errors.stts_nikah}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Agama
                                        </label>
                                        <input
                                            type="text"
                                            value={data.agama}
                                            onChange={(e) => setData('agama', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="Masukkan agama"
                                        />
                                        {errors.agama && (
                                            <p className="mt-1 text-sm text-red-600">{errors.agama}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Pekerjaan
                                        </label>
                                        <input
                                            type="text"
                                            value={data.pekerjaan}
                                            onChange={(e) => setData('pekerjaan', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="Masukkan pekerjaan"
                                        />
                                        {errors.pekerjaan && (
                                            <p className="mt-1 text-sm text-red-600">{errors.pekerjaan}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            No. Peserta (BPJS)
                                        </label>
                                        <input
                                            type="text"
                                            value={data.no_peserta}
                                            onChange={(e) => setData('no_peserta', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="Masukkan nomor peserta BPJS (jika ada)"
                                        />
                                        {errors.no_peserta && (
                                            <p className="mt-1 text-sm text-red-600">{errors.no_peserta}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Pendidikan *
                                        </label>
                                        <select
                                            value={data.pnd}
                                            onChange={(e) => setData('pnd', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="TS">Tidak Sekolah</option>
                                            <option value="TK">Taman Kanak-kanak</option>
                                            <option value="SD">Sekolah Dasar</option>
                                            <option value="SMP">Sekolah Menengah Pertama</option>
                                            <option value="SMA">Sekolah Menengah Atas</option>
                                            <option value="SLTA/SEDERAJAT">SLTA/Sederajat</option>
                                            <option value="D1">Diploma 1</option>
                                            <option value="D2">Diploma 2</option>
                                            <option value="D3">Diploma 3</option>
                                            <option value="D4">Diploma 4</option>
                                            <option value="S1">Sarjana</option>
                                            <option value="S2">Magister</option>
                                            <option value="S3">Doktor</option>
                                            <option value="-">Tidak Diketahui</option>
                                        </select>
                                        {errors.pnd && (
                                            <p className="mt-1 text-sm text-red-600">{errors.pnd}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Family Information */}
                        <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 mb-8">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                            <div className="relative p-8 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                    <motion.div
                                        className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md"
                                        whileHover={{ rotate: 90, scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <UserCog className="w-5 h-5 text-white" />
                                    </motion.div>
                                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                        Informasi Keluarga
                                    </span>
                                </h3>
                            </div>
                            <div className="relative p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ position: 'relative', zIndex: 1 }}>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Hubungan Keluarga
                                        </label>
                                        <select
                                            value={data.keluarga}
                                            onChange={(e) => setData('keluarga', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="AYAH">Ayah</option>
                                            <option value="IBU">Ibu</option>
                                            <option value="ISTRI">Istri</option>
                                            <option value="SUAMI">Suami</option>
                                            <option value="SAUDARA">Saudara</option>
                                            <option value="ANAK">Anak</option>
                                            <option value="DIRI SENDIRI">Diri Sendiri</option>
                                            <option value="LAIN-LAIN">Lain-lain</option>
                                        </select>
                                        {errors.keluarga && (
                                            <p className="mt-1 text-sm text-red-600">{errors.keluarga}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Nama Keluarga *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.namakeluarga}
                                            onChange={(e) => setData('namakeluarga', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="Masukkan nama keluarga"
                                        />
                                        {errors.namakeluarga && (
                                            <p className="mt-1 text-sm text-red-600">{errors.namakeluarga}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Pekerjaan Keluarga *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.pekerjaanpj}
                                            onChange={(e) => setData('pekerjaanpj', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="Masukkan pekerjaan keluarga"
                                        />
                                        {errors.pekerjaanpj && (
                                            <p className="mt-1 text-sm text-red-600">{errors.pekerjaanpj}</p>
                                        )}
                                    </div>

                                    <SelectWithAdd
                                        label="Penanggung Jawab"
                                        name="kd_pj"
                                        value={data.kd_pj}
                                        onChange={(e) => setData('kd_pj', e.target.value)}
                                        options={penjabOptions}
                                        placeholder="Pilih penanggung jawab"
                                        error={errors.kd_pj}
                                        required={true}
                                        onAdd={handleAddPenjab}
                                        addButtonText="Tambah Penjab"
                                    />

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Alamat Keluarga *
                                        </label>
                                        <textarea
                                            value={data.alamatpj}
                                            onChange={(e) => setData('alamatpj', e.target.value)}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="Masukkan alamat keluarga"
                                        />
                                        {errors.alamatpj && (
                                            <p className="mt-1 text-sm text-red-600">{errors.alamatpj}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Kelurahan *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.kelurahanpj}
                                            readOnly
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                                            placeholder="Pilih dari Wilayah di bawah"
                                        />
                                        {errors.kelurahanpj && (
                                            <p className="mt-1 text-sm text-red-600">{errors.kelurahanpj}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Kecamatan *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.kecamatanpj}
                                            readOnly
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                                            placeholder="Pilih dari Wilayah di bawah"
                                        />
                                        {errors.kecamatanpj && (
                                            <p className="mt-1 text-sm text-red-600">{errors.kecamatanpj}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Kabupaten *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.kabupatenpj}
                                            readOnly
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                                            placeholder="Pilih dari Wilayah di bawah"
                                        />
                                        {errors.kabupatenpj && (
                                            <p className="mt-1 text-sm text-red-600">{errors.kabupatenpj}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Provinsi *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.propinsipj}
                                            readOnly
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                                            placeholder="Pilih dari Wilayah di bawah"
                                        />
                                        {errors.propinsipj && (
                                            <p className="mt-1 text-sm text-red-600">{errors.propinsipj}</p>
                                        )}
                                    </div>
                                </div>
                                {/* Wilayah & Kode selection */}
                                <div className="mt-6">
                                    <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-2">Wilayah & Kode</h4>
                                    <WilayahSearchableSelect
                                        label="Wilayah (Kelurahan/Desa)"
                                        name="kode_wilayah"
                                        value={data.kode_wilayah}
                                        onChange={handleWilayahChange}
                                        level="village"
                                        error={errors.kode_wilayah}
                                    />
                                    {/* Optional: Show selected address preview */}
                                    {selectedWilayah && (
                                        <div className="mt-3 p-3 border rounded bg-gray-50/60 dark:bg-gray-800/60 backdrop-blur-sm">
                                            <p className="text-sm text-gray-700 dark:text-gray-200">
                                                Alamat wilayah: {selectedWilayah.village}, {selectedWilayah.district}, {selectedWilayah.regency}, {selectedWilayah.province}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {/* Informasi Administrasi (Perusahaan, Suku Bangsa, Bahasa, Cacat Fisik, NIP) */}
                        <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 mb-8">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                            <div className="relative p-8 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                    <motion.div
                                        className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md"
                                        whileHover={{ rotate: 90, scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Info className="w-5 h-5 text-white" />
                                    </motion.div>
                                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                        Informasi Administrasi
                                    </span>
                                </h3>
                            </div>
                            <div className="relative p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Perusahaan Pasien *
                                        </label>
                                        <SearchableSelect
                                            options={perusahaanOptions}
                                            value={data.perusahaan_pasien}
                                            onChange={(val) => setData('perusahaan_pasien', val)}
                                            placeholder="Pilih atau cari perusahaan pasien"
                                            displayKey="label"
                                            valueKey="value"
                                            searchPlaceholder="Ketik nama_perusahaan untuk mencari..."
                                            error={errors.perusahaan_pasien}
                                        />
                                        {errors.perusahaan_pasien && (
                                            <p className="mt-1 text-sm text-red-600">{errors.perusahaan_pasien}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Suku Bangsa *
                                        </label>
                                        <SearchableSelect
                                            options={sukuOptions}
                                            value={data.suku_bangsa}
                                            onChange={(val) => setData('suku_bangsa', val)}
                                            placeholder="Pilih suku bangsa"
                                            error={errors.suku_bangsa}
                                        />
                                        {errors.suku_bangsa && (
                                            <p className="mt-1 text-sm text-red-600">{errors.suku_bangsa}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Bahasa Pasien *
                                        </label>
                                        <SearchableSelect
                                            options={bahasaOptions}
                                            value={data.bahasa_pasien}
                                            onChange={(val) => setData('bahasa_pasien', val)}
                                            placeholder="Pilih bahasa pasien"
                                            error={errors.bahasa_pasien}
                                        />
                                        {errors.bahasa_pasien && (
                                            <p className="mt-1 text-sm text-red-600">{errors.bahasa_pasien}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Cacat Fisik *
                                        </label>
                                        <SearchableSelect
                                            options={cacatOptions}
                                            value={data.cacat_fisik}
                                            onChange={(val) => setData('cacat_fisik', val)}
                                            placeholder="Pilih cacat fisik"
                                            error={errors.cacat_fisik}
                                        />
                                        {errors.cacat_fisik && (
                                            <p className="mt-1 text-sm text-red-600">{errors.cacat_fisik}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            NIP
                                        </label>
                                        <input
                                            type="text"
                                            name="nip"
                                            value={data.nip}
                                            onChange={(e) => setData('nip', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="Masukkan NIP (opsional)"
                                        />
                                        {errors.nip && (
                                            <p className="mt-1 text-sm text-red-600">{errors.nip}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
                            <div className="relative p-8">
                                <div className="flex justify-end gap-4">
                                    <Link
                                        href={route('patients.index')}
                                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all duration-200"
                                    >
                                        Batal
                                    </Link>
                                    <motion.button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                        whileHover={{ scale: processing ? 1 : 1.02 }}
                                        whileTap={{ scale: processing ? 1 : 0.98 }}
                                    >
                                        {processing ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Menyimpan...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle2 className="w-4 h-4" />
                                                Simpan Perubahan
                                            </>
                                        )}
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </form>
                </div>
            </motion.div>
                    {/* Penjab Create Modal */}
                    <PenjabCreateModal
                        isOpen={isPenjabModalOpen}
                        onClose={() => setIsPenjabModalOpen(false)}
                        onSuccess={handlePenjabSuccess}
                    />
        </LanjutanRegistrasiLayout>
    );
}
