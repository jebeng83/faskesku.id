import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Konsultasi({ token = '', noRkmMedis = '', noRawat = '' }) {
    const [formData, setFormData] = useState({
        tgl_konsultasi: new Date().toISOString().slice(0, 10),
        jam_konsultasi: new Date().toTimeString().slice(0, 5),
        dokter_perujuk: '',
        dokter_konsultan: '',
        spesialisasi: '',
        alasan_konsultasi: '',
        keluhan_utama: '',
        riwayat_penyakit: '',
        pemeriksaan_fisik: '',
        diagnosis_sementara: '',
        saran_terapi: '',
        rencana_tindak_lanjut: '',
        status: 'Menunggu',
        prioritas: 'Normal'
    });

    const [konsultasiList, setKonsultasiList] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const spesialisasiOptions = [
        'Penyakit Dalam', 'Bedah', 'Anak', 'Obstetri & Ginekologi', 'Jantung',
        'Paru', 'Saraf', 'Mata', 'THT', 'Kulit & Kelamin', 'Jiwa', 'Radiologi',
        'Anestesi', 'Patologi Klinik', 'Rehabilitation Medik', 'Gizi'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // TODO: Implement API call
            setTimeout(() => {
                setMessage('Permintaan konsultasi berhasil dikirim');
                setError(null);
                setIsSubmitting(false);
                // Reset form
                setFormData({
                    ...formData,
                    dokter_perujuk: '',
                    dokter_konsultan: '',
                    spesialisasi: '',
                    alasan_konsultasi: '',
                    keluhan_utama: '',
                    riwayat_penyakit: '',
                    pemeriksaan_fisik: '',
                    diagnosis_sementara: '',
                    saran_terapi: '',
                    rencana_tindak_lanjut: ''
                });
            }, 1000);
        } catch (e) {
            setError(e.message || 'Terjadi kesalahan saat menyimpan');
            setMessage(null);
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        // TODO: Fetch existing consultations
        setKonsultasiList([
            {
                id: 1,
                tgl_konsultasi: '2024-01-15',
                jam_konsultasi: '09:00',
                dokter_perujuk: 'Dr. Budi Santoso, Sp.PD',
                dokter_konsultan: 'Dr. Sari Dewi, Sp.JP',
                spesialisasi: 'Jantung',
                alasan_konsultasi: 'Evaluasi EKG abnormal',
                status: 'Selesai',
                prioritas: 'Urgent'
            }
        ]);
    }, [noRawat]);

    const getStatusBadge = (status) => {
        const config = {
            'Menunggu': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
            'Dalam Proses': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
            'Selesai': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
            'Dibatalkan': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' }
        };
        const { bg, text, border } = config[status] || config['Menunggu'];
        
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${bg} ${text} ${border}`}>
                {status}
            </span>
        );
    };

    const getPrioritasBadge = (prioritas) => {
        const config = {
            'Normal': { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' },
            'Urgent': { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200' },
            'Emergency': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' }
        };
        const { bg, text, border } = config[prioritas] || config['Normal'];
        
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${bg} ${text} ${border}`}>
                {prioritas}
            </span>
        );
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200 dark:border-gray-700 bg-teal-50 dark:bg-teal-900/20">
                <h3 className="font-semibold text-gray-900 dark:text-white text-base md:text-lg">Konsultasi Dokter Spesialis</h3>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">Permintaan konsultasi dan rujukan internal</p>
            </div>

            {/* Form Konsultasi */}
            <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4 md:space-y-6">
                {/* Messages */}
                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-700 text-sm"
                    >
                        {message}
                    </motion.div>
                )}
                
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm"
                    >
                        {error}
                    </motion.div>
                )}

                {/* Basic Information */}
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3 md:p-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Informasi Konsultasi</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Tanggal</label>
                            <input
                                type="date"
                                name="tgl_konsultasi"
                                value={formData.tgl_konsultasi}
                                onChange={handleChange}
                                className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Jam</label>
                            <input
                                type="time"
                                name="jam_konsultasi"
                                value={formData.jam_konsultasi}
                                onChange={handleChange}
                                className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Prioritas</label>
                            <select
                                name="prioritas"
                                value={formData.prioritas}
                                onChange={handleChange}
                                className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            >
                                <option value="Normal">Normal</option>
                                <option value="Urgent">Urgent</option>
                                <option value="Emergency">Emergency</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            >
                                <option value="Menunggu">Menunggu</option>
                                <option value="Dalam Proses">Dalam Proses</option>
                                <option value="Selesai">Selesai</option>
                                <option value="Dibatalkan">Dibatalkan</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Doctor Information */}
                <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-3 md:p-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Informasi Dokter
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Dokter Perujuk</label>
                            <input
                                type="text"
                                name="dokter_perujuk"
                                value={formData.dokter_perujuk}
                                onChange={handleChange}
                                placeholder="Nama dokter yang merujuk"
                                className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Spesialisasi Tujuan</label>
                            <select
                                name="spesialisasi"
                                value={formData.spesialisasi}
                                onChange={handleChange}
                                className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                required
                            >
                                <option value="">Pilih Spesialisasi</option>
                                {spesialisasiOptions.map(spesialis => (
                                    <option key={spesialis} value={spesialis}>{spesialis}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Dokter Konsultan</label>
                            <input
                                type="text"
                                name="dokter_konsultan"
                                value={formData.dokter_konsultan}
                                onChange={handleChange}
                                placeholder="Nama dokter konsultan (opsional)"
                                className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Medical Details */}
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Alasan Konsultasi</label>
                            <textarea
                                name="alasan_konsultasi"
                                value={formData.alasan_konsultasi}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Jelaskan alasan konsultasi"
                                className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Keluhan Utama</label>
                            <textarea
                                name="keluhan_utama"
                                value={formData.keluhan_utama}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Keluhan utama pasien"
                                className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Riwayat Penyakit</label>
                            <textarea
                                name="riwayat_penyakit"
                                value={formData.riwayat_penyakit}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Riwayat penyakit terkait"
                                className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Pemeriksaan Fisik</label>
                            <textarea
                                name="pemeriksaan_fisik"
                                value={formData.pemeriksaan_fisik}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Hasil pemeriksaan fisik"
                                className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Diagnosis Sementara</label>
                            <textarea
                                name="diagnosis_sementara"
                                value={formData.diagnosis_sementara}
                                onChange={handleChange}
                                rows={2}
                                placeholder="Diagnosis sementara"
                                className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Saran Terapi</label>
                            <textarea
                                name="saran_terapi"
                                value={formData.saran_terapi}
                                onChange={handleChange}
                                rows={2}
                                placeholder="Saran terapi dari konsultan"
                                className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Rencana Tindak Lanjut</label>
                        <textarea
                            name="rencana_tindak_lanjut"
                            value={formData.rencana_tindak_lanjut}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Rencana tindak lanjut"
                            className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => setFormData({
                            ...formData,
                            dokter_perujuk: '',
                            dokter_konsultan: '',
                            spesialisasi: '',
                            alasan_konsultasi: '',
                            keluhan_utama: '',
                            riwayat_penyakit: '',
                            pemeriksaan_fisik: '',
                            diagnosis_sementara: '',
                            saran_terapi: '',
                            rencana_tindak_lanjut: ''
                        })}
                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isSubmitting ? 'Mengirim...' : 'Kirim Konsultasi'}
                    </button>
                </div>
            </form>

            {/* Riwayat Konsultasi */}
            <div className="border-t border-gray-200 dark:border-gray-700">
                <div className="px-4 md:px-6 py-4 bg-gray-50 dark:bg-gray-700/50">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Riwayat Konsultasi</h4>
                </div>
                <div className="p-4 md:p-6">
                    {konsultasiList.length > 0 ? (
                        <div className="space-y-4">
                            {konsultasiList.map((konsultasi, index) => (
                                <motion.div
                                    key={konsultasi.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h5 className="font-medium text-gray-900 dark:text-white">{konsultasi.spesialisasi}</h5>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {new Date(konsultasi.tgl_konsultasi).toLocaleDateString('id-ID')} • {konsultasi.jam_konsultasi}
                                            </p>
                                        </div>
                                        <div className="flex space-x-2">
                                            {getPrioritasBadge(konsultasi.prioritas)}
                                            {getStatusBadge(konsultasi.status)}
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div>
                                            <span className="text-gray-500 dark:text-gray-400">Perujuk:</span>
                                            <span className="ml-2 text-gray-900 dark:text-white">{konsultasi.dokter_perujuk}</span>
                                        </div>
                                        {konsultasi.dokter_konsultan && (
                                            <div>
                                                <span className="text-gray-500 dark:text-gray-400">Konsultan:</span>
                                                <span className="ml-2 text-gray-900 dark:text-white">{konsultasi.dokter_konsultan}</span>
                                            </div>
                                        )}
                                        <div>
                                            <span className="text-gray-500 dark:text-gray-400">Alasan:</span>
                                            <span className="ml-2 text-gray-900 dark:text-white">{konsultasi.alasan_konsultasi}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <svg className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Belum ada riwayat konsultasi</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}