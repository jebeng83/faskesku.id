import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Head, Link, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LanjutanRegistrasiLayout from '@/Layouts/LanjutanRegistrasiLayout';
import { User, Edit, Info, Phone, FileText } from "lucide-react";

export default function Show({ patient }) {
    // Motion variants for subtle and consistent transitions
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

    const [isOpen] = useState(true);
    const handleClose = () => {
        router.visit(route('patients.index'));
    };

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
            } catch {
                // ignore errors; keep defaults
            }
        };

        fetchLabels();
        return () => { isMounted = false; };
    }, [patient.perusahaan_pasien, patient.suku_bangsa, patient.bahasa_pasien, patient.cacat_fisik]);
    return (
        <LanjutanRegistrasiLayout title="Registrasi Pasien" menuConfig={{ activeTab: 'pasien' }}>
            <Head title={`Detail Pasien - ${patient.nm_pasien}`} />
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-[9999] p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={handleClose}
                    >
                        <motion.div
                            className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-2xl border border-white/30 dark:border-gray-700/50 max-w-5xl w-full max-h-[90vh] overflow-y-auto"
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.div className="flex justify-between items-center p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">Detail Pasien</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{patient.nm_pasien} - {patient.no_rkm_medis}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={route('patients.edit', patient.no_rkm_medis)}
                                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 transition-all text-sm"
                                    >
                                        <Edit className="w-4 h-4" />
                                        Edit
                                    </Link>
                                    <motion.button
                                        onClick={handleClose}
                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                        whileHover={{ scale: 1.1, rotate: 90 }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </motion.button>
                                </div>
                            </motion.div>

                            <div className="p-4 lg:p-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <motion.div variants={itemVariants} initial="hidden" animate="visible" className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                            <h4 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                                <User className="w-5 h-5 text-blue-500" />
                                                Informasi Dasar
                                            </h4>
                                        </div>
                                        <div className="p-4">
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Nomor RM</label>
                                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">{patient.no_rkm_medis}</p>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">NIK</label>
                                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">{patient.no_ktp || '-'}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Nama Lengkap</label>
                                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{patient.nm_pasien}</p>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Jenis Kelamin</label>
                                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">{patient.jk === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Umur</label>
                                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">{patient.umur}</p>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Tempat Lahir</label>
                                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">{patient.tmp_lahir}</p>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Tanggal Lahir</label>
                                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">{patient.tgl_lahir ? new Date(patient.tgl_lahir).toLocaleDateString('id-ID') : '-'}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Nama Ibu</label>
                                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{patient.nm_ibu}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    <motion.div variants={itemVariants} initial="hidden" animate="visible" className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                            <h4 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                                <Phone className="w-5 h-5 text-blue-500" />
                                                Informasi Kontak
                                            </h4>
                                        </div>
                                        <div className="p-4">
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Alamat</label>
                                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{patient.alamat}</p>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">No. Telepon</label>
                                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{patient.no_tlp || '-'}</p>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{patient.email || '-'}</p>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Tanggal Daftar</label>
                                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{patient.tgl_daftar ? new Date(patient.tgl_daftar).toLocaleDateString('id-ID') : '-'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    <motion.div variants={itemVariants} initial="hidden" animate="visible" className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                            <h4 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                                <Info className="w-5 h-5 text-blue-500" />
                                                Informasi Tambahan
                                            </h4>
                                        </div>
                                        <div className="p-4">
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Golongan Darah</label>
                                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">{patient.gol_darah || '-'}</p>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Status Perkawinan</label>
                                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">{patient.stts_nikah || '-'}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Agama</label>
                                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{patient.agama || '-'}</p>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Pekerjaan</label>
                                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{patient.pekerjaan || '-'}</p>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Pendidikan</label>
                                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{patient.pnd || '-'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    <motion.div variants={itemVariants} initial="hidden" animate="visible" className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                            <h4 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                                <User className="w-5 h-5 text-blue-500" />
                                                Informasi Keluarga
                                            </h4>
                                        </div>
                                        <div className="p-4">
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Hubungan Keluarga</label>
                                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{patient.keluarga || '-'}</p>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Nama Keluarga</label>
                                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{patient.namakeluarga}</p>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Pekerjaan Keluarga</label>
                                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{patient.pekerjaanpj}</p>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Alamat Keluarga</label>
                                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{patient.alamatpj}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    <motion.div variants={itemVariants} initial="hidden" animate="visible" className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                            <h4 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                                <FileText className="w-5 h-5 text-blue-500" />
                                                Informasi Administrasi
                                            </h4>
                                        </div>
                                        <div className="p-4">
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">No. Peserta</label>
                                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">{patient.no_peserta || '-'}</p>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">NIP</label>
                                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">{patient.nip || '-'}</p>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Perusahaan Pasien</label>
                                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">{labels.perusahaan}</p>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Suku Bangsa</label>
                                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">{labels.sukuBangsa}</p>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Bahasa Pasien</label>
                                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">{labels.bahasa}</p>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Cacat Fisik</label>
                                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">{labels.cacatFisik}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </LanjutanRegistrasiLayout>
    );
}
