import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AppLayout from '@/Layouts/AppLayout';

export default function SuratSehat({ rawatJalan, patient, dokter }) {
    const [formData, setFormData] = useState({
        no_surat: '',
        no_rawat: rawatJalan?.no_rawat || '',
        tanggalsurat: new Date().toISOString().slice(0, 10),
        berat: '',
        tinggi: '',
        tensi: '',
        suhu: '',
        butawarna: 'Tidak',
        keperluan: '',
        kesimpulan: 'Sehat'
    });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Generate nomor surat otomatis
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        
        setFormData(prev => ({
            ...prev,
            no_surat: `SS/${year}${month}${day}/${randomNum}`
        }));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        router.post(route('rawat-jalan.surat-sehat.store'), formData, {
            onSuccess: () => {
                // Redirect back to rawat jalan index
                router.get(route('rawat-jalan.index'));
            },
            onError: (errors) => {
                console.error('Error:', errors);
                setIsLoading(false);
            },
            onFinish: () => {
                setIsLoading(false);
            }
        });
    };

    const handlePrint = () => {
        window.print();
    };

    const formatDate = (date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const calculateAge = (birthDate) => {
        if (!birthDate) return '';
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    };

    return (
        <AppLayout>
            <Head title="Surat Sehat" />

            <div className="space-y-6 -mt-6 -mx-6 p-6">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Surat Sehat
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">
                                    Cetak surat keterangan sehat untuk pasien
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={handlePrint}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6v-8z"/>
                                    </svg>
                                    Cetak
                                </button>
                                <button
                                    onClick={() => router.get(route('rawat-jalan.index'))}
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    Kembali
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Nomor Surat */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Nomor Surat
                                </label>
                                <input
                                    type="text"
                                    name="no_surat"
                                    value={formData.no_surat}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    required
                                />
                            </div>

                            {/* Tanggal Surat */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Tanggal Surat
                                </label>
                                <input
                                    type="date"
                                    name="tanggalsurat"
                                    value={formData.tanggalsurat}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    required
                                />
                            </div>
                        </div>

                        {/* Data Pasien (Read Only) */}
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Pasien</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Nama Pasien
                                    </label>
                                    <input
                                        type="text"
                                        value={patient?.nm_pasien || ''}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 dark:text-white"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        No. RM
                                    </label>
                                    <input
                                        type="text"
                                        value={patient?.no_rkm_medis || ''}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 dark:text-white"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Pemeriksaan Fisik */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Pemeriksaan Fisik</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Berat Badan */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Berat Badan (kg)
                                    </label>
                                    <input
                                        type="text"
                                        name="berat"
                                        value={formData.berat}
                                        onChange={handleInputChange}
                                        placeholder="Contoh: 65"
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        required
                                    />
                                </div>

                                {/* Tinggi Badan */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Tinggi Badan (cm)
                                    </label>
                                    <input
                                        type="text"
                                        name="tinggi"
                                        value={formData.tinggi}
                                        onChange={handleInputChange}
                                        placeholder="Contoh: 170"
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        required
                                    />
                                </div>

                                {/* Tekanan Darah */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Tekanan Darah
                                    </label>
                                    <input
                                        type="text"
                                        name="tensi"
                                        value={formData.tensi}
                                        onChange={handleInputChange}
                                        placeholder="Contoh: 120/80"
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        required
                                    />
                                </div>

                                {/* Suhu Tubuh */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Suhu Tubuh (°C)
                                    </label>
                                    <input
                                        type="text"
                                        name="suhu"
                                        value={formData.suhu}
                                        onChange={handleInputChange}
                                        placeholder="Contoh: 36.5"
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Pemeriksaan Tambahan */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Buta Warna */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Buta Warna
                                </label>
                                <select
                                    name="butawarna"
                                    value={formData.butawarna}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    required
                                >
                                    <option value="Tidak">Tidak</option>
                                    <option value="Ya">Ya</option>
                                </select>
                            </div>

                            {/* Keperluan */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Keperluan
                                </label>
                                <input
                                    type="text"
                                    name="keperluan"
                                    value={formData.keperluan}
                                    onChange={handleInputChange}
                                    placeholder="Contoh: Melamar kerja, Sekolah, dll"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    required
                                />
                            </div>
                        </div>

                        {/* Kesimpulan */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Kesimpulan
                            </label>
                            <select
                                name="kesimpulan"
                                value={formData.kesimpulan}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                required
                            >
                                <option value="Sehat">Sehat</option>
                                <option value="Tidak Sehat">Tidak Sehat</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Menyimpan...
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                        Simpan Surat Sehat
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Print Preview */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg print:shadow-none">
                    <div className="p-8 print:p-12">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">SURAT KETERANGAN SEHAT</h1>
                            <p className="text-lg">Nomor: {formData.no_surat}</p>
                        </div>

                        <div className="space-y-4 text-sm">
                            <p>Yang bertanda tangan di bawah ini, Dokter yang bertugas di Rumah Sakit, menerangkan bahwa:</p>
                            
                            <div className="ml-8 space-y-2">
                                <p><strong>Nama</strong> : {patient?.nm_pasien}</p>
                                <p><strong>No. RM</strong> : {patient?.no_rkm_medis}</p>
                                <p><strong>Tanggal Lahir</strong> : {patient?.tgl_lahir ? new Date(patient.tgl_lahir).toLocaleDateString('id-ID') : ''}</p>
                                <p><strong>Jenis Kelamin</strong> : {patient?.jk === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
                            </div>

                            <p>Setelah dilakukan pemeriksaan kesehatan dengan hasil:</p>
                            
                            <div className="ml-8 space-y-1">
                                <p><strong>Berat Badan</strong> : {formData.berat} kg</p>
                                <p><strong>Tinggi Badan</strong> : {formData.tinggi} cm</p>
                                <p><strong>Tekanan Darah</strong> : {formData.tensi} mmHg</p>
                                <p><strong>Suhu Tubuh</strong> : {formData.suhu}°C</p>
                                <p><strong>Buta Warna</strong> : {formData.butawarna}</p>
                                <p><strong>Keperluan</strong> : {formData.keperluan}</p>
                            </div>

                            <p>Maka yang bersangkutan dinyatakan <strong>{formData.kesimpulan.toUpperCase()}</strong> dan dapat melakukan aktivitas normal.</p>

                            <p>Demikian surat keterangan ini dibuat untuk dipergunakan seperlunya.</p>

                            <div className="flex justify-between mt-12">
                                <div></div>
                                <div className="text-center">
                                    <p>{formatDate(formData.tanggalsurat)}</p>
                                    <div className="mt-16">
                                        <p className="font-semibold">{dokter?.nm_dokter}</p>
                                        <p>Dokter</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
