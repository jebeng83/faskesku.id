import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Operasi({ token = '', noRkmMedis = '', noRawat = '' }) {
    const [formData, setFormData] = useState({
        tgl_operasi: new Date().toISOString().slice(0, 10),
        jam_mulai: '',
        jam_selesai: '',
        jenis_operasi: '',
        dokter_operator: '',
        dokter_anestesi: '',
        ruang_operasi: '',
        diagnosa_pre: '',
        diagnosa_post: '',
        keterangan: '',
        status: 'Terjadwal'
    });

    const [operasiList, setOperasiList] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

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
                setMessage('Data operasi berhasil disimpan');
                setError(null);
                setIsSubmitting(false);
                // Reset form
                setFormData({
                    ...formData,
                    jenis_operasi: '',
                    dokter_operator: '',
                    dokter_anestesi: '',
                    ruang_operasi: '',
                    diagnosa_pre: '',
                    diagnosa_post: '',
                    keterangan: ''
                });
            }, 1000);
        } catch (e) {
            setError(e.message || 'Terjadi kesalahan saat menyimpan');
            setMessage(null);
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        // TODO: Fetch existing operations
        setOperasiList([
            {
                id: 1,
                tgl_operasi: '2024-01-15',
                jam_mulai: '08:00',
                jam_selesai: '10:30',
                jenis_operasi: 'Appendectomy',
                dokter_operator: 'Dr. Ahmad Surya, Sp.B',
                ruang_operasi: 'OK 1',
                status: 'Selesai'
            }
        ]);
    }, [noRawat]);

    const getStatusBadge = (status) => {
        const config = {
            'Terjadwal': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
            'Berlangsung': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
            'Selesai': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
            'Dibatalkan': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' }
        };
        const { bg, text, border } = config[status] || config['Terjadwal'];
        
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${bg} ${text} ${border}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200 dark:border-gray-700 bg-red-50 dark:bg-red-900/20">
                <h3 className="font-semibold text-gray-900 dark:text-white text-base md:text-lg">Jadwal & Riwayat Operasi</h3>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">Manajemen operasi dan tindakan bedah</p>
            </div>

            {/* Form Input Operasi */}
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
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Informasi Jadwal</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Tanggal Operasi</label>
                            <input
                                type="date"
                                name="tgl_operasi"
                                value={formData.tgl_operasi}
                                onChange={handleChange}
                                className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Jam Mulai</label>
                            <input
                                type="time"
                                name="jam_mulai"
                                value={formData.jam_mulai}
                                onChange={handleChange}
                                className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Jam Selesai</label>
                            <input
                                type="time"
                                name="jam_selesai"
                                value={formData.jam_selesai}
                                onChange={handleChange}
                                className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Ruang Operasi</label>
                            <select
                                name="ruang_operasi"
                                value={formData.ruang_operasi}
                                onChange={handleChange}
                                className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                required
                            >
                                <option value="">Pilih Ruang</option>
                                <option value="OK 1">OK 1</option>
                                <option value="OK 2">OK 2</option>
                                <option value="OK 3">OK 3</option>
                                <option value="OK Emergency">OK Emergency</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Medical Information */}
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 md:p-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        Informasi Medis
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Jenis Operasi</label>
                            <input
                                type="text"
                                name="jenis_operasi"
                                value={formData.jenis_operasi}
                                onChange={handleChange}
                                placeholder="Contoh: Appendectomy, Cholecystectomy"
                                className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            >
                                <option value="Terjadwal">Terjadwal</option>
                                <option value="Berlangsung">Berlangsung</option>
                                <option value="Selesai">Selesai</option>
                                <option value="Dibatalkan">Dibatalkan</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Dokter Operator</label>
                            <input
                                type="text"
                                name="dokter_operator"
                                value={formData.dokter_operator}
                                onChange={handleChange}
                                placeholder="Nama dokter operator"
                                className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Dokter Anestesi</label>
                            <input
                                type="text"
                                name="dokter_anestesi"
                                value={formData.dokter_anestesi}
                                onChange={handleChange}
                                placeholder="Nama dokter anestesi"
                                className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Diagnosa Pre-Operasi</label>
                            <textarea
                                name="diagnosa_pre"
                                value={formData.diagnosa_pre}
                                onChange={handleChange}
                                rows={2}
                                placeholder="Diagnosa sebelum operasi"
                                className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Diagnosa Post-Operasi</label>
                            <textarea
                                name="diagnosa_post"
                                value={formData.diagnosa_post}
                                onChange={handleChange}
                                rows={2}
                                placeholder="Diagnosa setelah operasi"
                                className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Keterangan</label>
                            <textarea
                                name="keterangan"
                                value={formData.keterangan}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Catatan tambahan tentang operasi"
                                className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => setFormData({
                            ...formData,
                            jenis_operasi: '',
                            dokter_operator: '',
                            dokter_anestesi: '',
                            ruang_operasi: '',
                            diagnosa_pre: '',
                            diagnosa_post: '',
                            keterangan: ''
                        })}
                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isSubmitting ? 'Menyimpan...' : 'Simpan'}
                    </button>
                </div>
            </form>

            {/* Riwayat Operasi */}
            <div className="border-t border-gray-200 dark:border-gray-700">
                <div className="px-4 md:px-6 py-4 bg-gray-50 dark:bg-gray-700/50">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Riwayat Operasi</h4>
                </div>
                <div className="p-4 md:p-6">
                    {operasiList.length > 0 ? (
                        <div className="space-y-4">
                            {operasiList.map((operasi, index) => (
                                <motion.div
                                    key={operasi.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h5 className="font-medium text-gray-900 dark:text-white">{operasi.jenis_operasi}</h5>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {new Date(operasi.tgl_operasi).toLocaleDateString('id-ID')} • {operasi.jam_mulai}
                                                {operasi.jam_selesai && ` - ${operasi.jam_selesai}`}
                                            </p>
                                        </div>
                                        {getStatusBadge(operasi.status)}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <span className="text-gray-500 dark:text-gray-400">Dokter Operator:</span>
                                            <span className="ml-2 text-gray-900 dark:text-white">{operasi.dokter_operator}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500 dark:text-gray-400">Ruang:</span>
                                            <span className="ml-2 text-gray-900 dark:text-white">{operasi.ruang_operasi}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <svg className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Belum ada riwayat operasi</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}