import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LanjutanRegistrasiLayout from '@/Layouts/LanjutanRegistrasiLayout';
import { User, ArrowLeft, Edit, Info, Phone, Mail, MapPin, Calendar, FileText } from "lucide-react";

export default function Show({ patient }) {
    // Motion variants for subtle and consistent transitions
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
    const [labels, setLabels] = useState({
        perusahaan: '-',
        sukuBangsa: '-',
        bahasa: '-',
        cacatFisik: '-',
    });

    useEffect(() => {
        let isMounted = true;
        const fetchLabels = async () => {
            try {
                const [perusahaanRes, sukuRes, bahasaRes, cacatRes] = await Promise.all([
                    fetch('/api/perusahaan-pasien').then(r => r.ok ? r.json() : null).catch(() => null),
                    fetch('/api/suku-bangsa').then(r => r.ok ? r.json() : null).catch(() => null),
                    fetch('/api/bahasa-pasien').then(r => r.ok ? r.json() : null).catch(() => null),
                    fetch('/api/cacat-fisik').then(r => r.ok ? r.json() : null).catch(() => null),
                ]);

                const perusahaanLabel = perusahaanRes?.data?.find?.(x => x.value === patient.perusahaan_pasien)?.label ?? '-';
                const sukuLabel = sukuRes?.data?.find?.(x => String(x.value) === String(patient.suku_bangsa))?.label ?? '-';
                const bahasaLabel = bahasaRes?.data?.find?.(x => String(x.value) === String(patient.bahasa_pasien))?.label ?? '-';
                // Jika backend sudah menyediakan nama cacat fisik, gunakan itu terlebih dahulu
                const cacatLabel = patient.cacat_fisik_nama ?? (
                    cacatRes?.data?.find?.(x => String(x.value) === String(patient.cacat_fisik))?.label ?? '-'
                );

                if (isMounted) {
                    setLabels({
                        perusahaan: perusahaanLabel,
                        sukuBangsa: sukuLabel,
                        bahasa: bahasaLabel,
                        cacatFisik: cacatLabel,
                    });
                }
            } catch (e) {
                // ignore errors; keep defaults
            }
        };

        fetchLabels();
        return () => { isMounted = false; };
    }, [patient.perusahaan_pasien, patient.suku_bangsa, patient.bahasa_pasien, patient.cacat_fisik]);
    return (
        <LanjutanRegistrasiLayout
            title="Registrasi Pasien"
            menuConfig={{ activeTab: 'pasien' }}
        >
            <Head title={`Detail Pasien - ${patient.nm_pasien}`} />

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
                                    <User className="w-6 h-6 text-white" />
                                </motion.div>
                                <div>
                                    <motion.h1
                                        className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
                                    >
                                        Detail Pasien
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
                                    href={route('patients.edit', patient.no_rkm_medis)}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-200"
                                >
                                    <Edit className="w-4 h-4" />
                                    Edit
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    {/* Patient Information */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Basic Information */}
                        <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                            <div className="relative p-8 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                    <motion.div
                                        className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md"
                                        whileHover={{ rotate: 90, scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <User className="w-5 h-5 text-white" />
                                    </motion.div>
                                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                        Informasi Dasar
                                    </span>
                                </h3>
                            </div>
                            <div className="relative p-8">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Nomor RM
                                            </label>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                {patient.no_rkm_medis}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                                NIK
                                            </label>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                {patient.no_ktp || '-'}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Nama Lengkap
                                        </label>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                            {patient.nm_pasien}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Jenis Kelamin
                                            </label>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                {patient.jk === 'L' ? 'Laki-laki' : 'Perempuan'}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Umur
                                            </label>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                {patient.umur}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Tempat Lahir
                                            </label>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                {patient.tmp_lahir}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Tanggal Lahir
                                            </label>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                {patient.tgl_lahir ? new Date(patient.tgl_lahir).toLocaleDateString('id-ID') : '-'}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Nama Ibu
                                        </label>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                            {patient.nm_ibu}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Information */}
                        <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                            <div className="relative p-8 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                    <motion.div
                                        className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md"
                                        whileHover={{ rotate: 90, scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Phone className="w-5 h-5 text-white" />
                                    </motion.div>
                                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                        Informasi Kontak
                                    </span>
                                </h3>
                            </div>
                            <div className="relative p-8">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Alamat
                                        </label>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                            {patient.alamat}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                            No. Telepon
                                        </label>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                            {patient.no_tlp || '-'}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Email
                                        </label>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                            {patient.email || '-'}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Tanggal Daftar
                                        </label>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                            {patient.tgl_daftar ? new Date(patient.tgl_daftar).toLocaleDateString('id-ID') : '-'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Additional Information */}
                        <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
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
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Golongan Darah
                                            </label>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                {patient.gol_darah || '-'}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Status Perkawinan
                                            </label>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                {patient.stts_nikah || '-'}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Agama
                                        </label>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                            {patient.agama || '-'}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Pekerjaan
                                        </label>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                            {patient.pekerjaan || '-'}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Pendidikan
                                        </label>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                            {patient.pnd || '-'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Family Information */}
                        <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                            <div className="relative p-8 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                    <motion.div
                                        className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md"
                                        whileHover={{ rotate: 90, scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <User className="w-5 h-5 text-white" />
                                    </motion.div>
                                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                        Informasi Keluarga
                                    </span>
                                </h3>
                            </div>
                            <div className="relative p-8">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Hubungan Keluarga
                                        </label>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                            {patient.keluarga || '-'}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Nama Keluarga
                                        </label>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                            {patient.namakeluarga}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Pekerjaan Keluarga
                                        </label>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                            {patient.pekerjaanpj}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Alamat Keluarga
                                        </label>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                            {patient.alamatpj}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Administrative Information */}
                        <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                            <div className="relative p-8 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                    <motion.div
                                        className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md"
                                        whileHover={{ rotate: 90, scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <FileText className="w-5 h-5 text-white" />
                                    </motion.div>
                                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                        Informasi Administrasi
                                    </span>
                                </h3>
                            </div>
                            <div className="relative p-8">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                                No. Peserta
                                            </label>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                {patient.no_peserta || '-'}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                                NIP
                                            </label>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                {patient.nip || '-'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Perusahaan Pasien
                                            </label>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                {labels.perusahaan}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Suku Bangsa
                                            </label>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                {labels.sukuBangsa}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Bahasa Pasien
                                            </label>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                {labels.bahasa}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Cacat Fisik
                                            </label>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                {labels.cacatFisik}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </LanjutanRegistrasiLayout>
    );
}
