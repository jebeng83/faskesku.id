import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LanjutanRegistrasiLayout from '@/Layouts/LanjutanRegistrasiLayout';

export default function Show({ patient }) {
    // Motion variants for subtle and consistent transitions
    const containerVariants = {
        hidden: { opacity: 0, y: 8 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.06, ease: 'easeOut' },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 8 },
        visible: { opacity: 1, y: 0 },
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

            <motion.div className="py-6" initial="hidden" animate="visible" variants={containerVariants}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div variants={itemVariants} className="relative overflow-visible mb-6">
                        <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-blue-500/15 via-purple-500/15 to-indigo-500/15 dark:from-blue-600/10 dark:via-purple-600/10 dark:to-indigo-600/10" />
                        <div className="p-6 rounded-2xl bg-white/60 dark:bg-gray-900/50 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-lg">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Detail Pasien
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                                        {patient.nm_pasien} - {patient.no_rkm_medis}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Link
                                        href={route('patients.index')}
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700/80 hover:bg-gray-700 text-white transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06L10.94 8.25H3a.75.75 0 010-1.5h7.94L7.72 3.53a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06 0z" clipRule="evenodd" />
                                        </svg>
                                        Kembali
                                    </Link>
                                    <Link
                                        href={route('patients.edit', patient.no_rkm_medis)}
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                                            <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                                        </svg>
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Patient Information */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Basic Information */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Informasi Dasar
                                </h3>
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
                        </div>

                        {/* Contact Information */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Informasi Kontak
                                </h3>
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
                        </div>

                        {/* Additional Information */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Informasi Tambahan
                                </h3>
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
                        </div>

                        {/* Family Information */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Informasi Keluarga
                                </h3>
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
                        </div>

                        {/* Administrative Information */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Informasi Administrasi
                                </h3>
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
                        </div>
                    </div>
                </div>
            </motion.div>
        </LanjutanRegistrasiLayout>
    );
}
