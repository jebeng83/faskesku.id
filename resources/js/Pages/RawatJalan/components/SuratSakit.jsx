import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AppLayout from '@/Layouts/AppLayout';
import { todayDateString } from '@/tools/datetime';

export default function SuratSakit({ rawatJalan, patient, dokter }) {
    const [formData, setFormData] = useState({
        no_surat: '',
        no_rawat: rawatJalan?.no_rawat || '',
        tanggalawal: todayDateString(),
        tanggalakhir: '',
        lamasakit: '',
        nama2: '',
        tgl_lahir: patient?.tgl_lahir || '',
        umur: '',
        jk: patient?.jk || '',
        alamat: patient?.alamat || '',
        hubungan: 'Suami',
        pekerjaan: 'Karyawan Swasta',
        instansi: ''
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
            no_surat: `SK/${year}${month}${day}/${randomNum}`
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
        
        router.post(route('rawat-jalan.surat-sakit.store'), formData, {
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
            <Head title="Surat Sakit" />

            <div className="space-y-6 -mt-6 -mx-6 p-6">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Surat Sakit
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">
                                    Cetak surat keterangan sakit untuk pasien
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

                            {/* Tanggal Awal */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Tanggal Awal Sakit
                                </label>
                                <input
                                    type="date"
                                    name="tanggalawal"
                                    value={formData.tanggalawal}
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

                        {/* Periode Sakit */}
                        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Periode Sakit</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Tanggal Akhir */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Tanggal Akhir Sakit
                                    </label>
                                    <input
                                        type="date"
                                        name="tanggalakhir"
                                        value={formData.tanggalakhir}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        required
                                    />
                                </div>

                                {/* Lama Sakit */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Lama Sakit
                                    </label>
                                    <input
                                        type="text"
                                        name="lamasakit"
                                        value={formData.lamasakit}
                                        onChange={handleInputChange}
                                        placeholder="Contoh: 3 hari"
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Data Pihak Kedua */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Pihak Kedua</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Nama Pihak Kedua */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Nama Pihak Kedua
                                    </label>
                                    <input
                                        type="text"
                                        name="nama2"
                                        value={formData.nama2}
                                        onChange={handleInputChange}
                                        placeholder="Nama lengkap pihak kedua"
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        required
                                    />
                                </div>

                                {/* Tanggal Lahir */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Tanggal Lahir
                                    </label>
                                    <input
                                        type="date"
                                        name="tgl_lahir"
                                        value={formData.tgl_lahir}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        required
                                    />
                                </div>

                                {/* Umur */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Umur
                                    </label>
                                    <input
                                        type="text"
                                        name="umur"
                                        value={formData.umur}
                                        onChange={handleInputChange}
                                        placeholder="Contoh: 25 tahun"
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        required
                                    />
                                </div>

                                {/* Jenis Kelamin */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Jenis Kelamin
                                    </label>
                                    <select
                                        name="jk"
                                        value={formData.jk}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        required
                                    >
                                        <option value="Laki-laki">Laki-laki</option>
                                        <option value="Perempuan">Perempuan</option>
                                    </select>
                                </div>

                                {/* Alamat */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Alamat
                                    </label>
                                    <textarea
                                        name="alamat"
                                        value={formData.alamat}
                                        onChange={handleInputChange}
                                        rows={3}
                                        placeholder="Alamat lengkap pihak kedua"
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        required
                                    />
                                </div>

                                {/* Hubungan */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Hubungan
                                    </label>
                                    <select
                                        name="hubungan"
                                        value={formData.hubungan}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        required
                                    >
                                        <option value="Suami">Suami</option>
                                        <option value="Istri">Istri</option>
                                        <option value="Anak">Anak</option>
                                        <option value="Ayah">Ayah</option>
                                        <option value="Saudara">Saudara</option>
                                        <option value="Keponakan">Keponakan</option>
                                    </select>
                                </div>

                                {/* Pekerjaan */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Pekerjaan
                                    </label>
                                    <select
                                        name="pekerjaan"
                                        value={formData.pekerjaan}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        required
                                    >
                                        <option value="Karyawan Swasta">Karyawan Swasta</option>
                                        <option value="PNS">PNS</option>
                                        <option value="Wiraswasta">Wiraswasta</option>
                                        <option value="Pelajar">Pelajar</option>
                                        <option value="Mahasiswa">Mahasiswa</option>
                                        <option value="Buruh">Buruh</option>
                                        <option value="Lain-lain">Lain-lain</option>
                                    </select>
                                </div>

                                {/* Instansi */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Instansi
                                    </label>
                                    <input
                                        type="text"
                                        name="instansi"
                                        value={formData.instansi}
                                        onChange={handleInputChange}
                                        placeholder="Nama instansi tempat bekerja"
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
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
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                        </svg>
                                        Simpan Surat Sakit
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
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">SURAT KETERANGAN SAKIT</h1>
                            <p className="text-lg">Nomor: {formData.no_surat}</p>
                        </div>

                        <div className="space-y-4 text-sm">
                            <p>Yang bertanda tangan di bawah ini, Dokter yang bertugas di Rumah Sakit, menerangkan bahwa:</p>
                            
                            <div className="ml-8 space-y-2">
                                <p><strong>Nama Pasien</strong> : {patient?.nm_pasien}</p>
                                <p><strong>No. RM</strong> : {patient?.no_rkm_medis}</p>
                                <p><strong>Tanggal Lahir</strong> : {patient?.tgl_lahir ? new Date(patient.tgl_lahir).toLocaleDateString('id-ID') : ''}</p>
                                <p><strong>Jenis Kelamin</strong> : {patient?.jk === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
                            </div>

                            <p>Sedang dalam keadaan sakit dari tanggal <strong>{formData.tanggalawal ? new Date(formData.tanggalawal).toLocaleDateString('id-ID') : ''}</strong> sampai dengan <strong>{formData.tanggalakhir ? new Date(formData.tanggalakhir).toLocaleDateString('id-ID') : ''}</strong> selama <strong>{formData.lamasakit}</strong>.</p>

                            <p>Data pihak kedua yang bertanggung jawab:</p>
                            
                            <div className="ml-8 space-y-1">
                                <p><strong>Nama</strong> : {formData.nama2}</p>
                                <p><strong>Tanggal Lahir</strong> : {formData.tgl_lahir ? new Date(formData.tgl_lahir).toLocaleDateString('id-ID') : ''}</p>
                                <p><strong>Umur</strong> : {formData.umur}</p>
                                <p><strong>Jenis Kelamin</strong> : {formData.jk}</p>
                                <p><strong>Alamat</strong> : {formData.alamat}</p>
                                <p><strong>Hubungan</strong> : {formData.hubungan}</p>
                                <p><strong>Pekerjaan</strong> : {formData.pekerjaan}</p>
                                <p><strong>Instansi</strong> : {formData.instansi}</p>
                            </div>

                            <p>Demikian surat keterangan ini dibuat untuk dipergunakan seperlunya.</p>

                            <div className="flex justify-between mt-12">
                                <div></div>
                                <div className="text-center">
                                    <p>{formatDate(formData.tanggalawal)}</p>
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