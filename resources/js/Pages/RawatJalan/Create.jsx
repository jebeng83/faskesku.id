import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AppLayout from '@/Layouts/AppLayout';

export default function Create({ 
    patients, 
    statusOptions, 
    statusDaftarOptions, 
    statusLanjutOptions, 
    statusBayarOptions, 
    statusPoliOptions, 
    sttsumurOptions, 
    keputusanOptions 
}) {
    const { data, setData, post, processing, errors } = useForm({
        no_rkm_medis: '',
        tgl_registrasi: new Date().toISOString().split('T')[0],
        jam_reg: new Date().toTimeString().slice(0, 5),
        kd_dokter: '',
        kd_poli: '',
        p_jawab: '',
        almt_pj: '',
        hubunganpj: '',
        biaya_reg: '',
        stts: '',
        stts_daftar: '-',
        status_lanjut: 'Ralan',
        kd_pj: '',
        umurdaftar: '',
        sttsumur: '',
        status_bayar: 'Belum Bayar',
        status_poli: 'Baru',
        keputusan: '-'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('rawat-jalan.store'));
    };

    return (
        <AppLayout>
            <Head title="Tambah Data Rawat Jalan" />

            <div className="space-y-6 -mt-6 -mx-6 p-6">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Tambah Data Rawat Jalan
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">
                                    Tambah data registrasi rawat jalan pasien baru
                                </p>
                            </div>
                            <Link
                                href={route('rawat-jalan.index')}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
                                </svg>
                                <span>Kembali</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Pasien */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Pasien <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.no_rkm_medis}
                                    onChange={(e) => setData('no_rkm_medis', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                                        errors.no_rkm_medis 
                                            ? 'border-red-500 dark:border-red-500' 
                                            : 'border-gray-300 dark:border-gray-600'
                                    }`}
                                    required
                                >
                                    <option value="">Pilih Pasien</option>
                                    {patients.map((patient) => (
                                        <option key={patient.no_rkm_medis} value={patient.no_rkm_medis}>
                                            {patient.no_rkm_medis} - {patient.nm_pasien}
                                        </option>
                                    ))}
                                </select>
                                {errors.no_rkm_medis && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.no_rkm_medis}</p>
                                )}
                            </div>

                            {/* Tanggal Registrasi */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Tanggal Registrasi <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={data.tgl_registrasi}
                                    onChange={(e) => setData('tgl_registrasi', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                                        errors.tgl_registrasi 
                                            ? 'border-red-500 dark:border-red-500' 
                                            : 'border-gray-300 dark:border-gray-600'
                                    }`}
                                    required
                                />
                                {errors.tgl_registrasi && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.tgl_registrasi}</p>
                                )}
                            </div>

                            {/* Jam Registrasi */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Jam Registrasi
                                </label>
                                <input
                                    type="time"
                                    value={data.jam_reg}
                                    onChange={(e) => setData('jam_reg', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            {/* Dokter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Kode Dokter
                                </label>
                                <input
                                    type="text"
                                    value={data.kd_dokter}
                                    onChange={(e) => setData('kd_dokter', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    placeholder="Masukkan kode dokter"
                                />
                            </div>

                            {/* Poli */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Kode Poli
                                </label>
                                <input
                                    type="text"
                                    value={data.kd_poli}
                                    onChange={(e) => setData('kd_poli', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    placeholder="Masukkan kode poli"
                                />
                            </div>

                            {/* Penanggung Jawab */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Penanggung Jawab
                                </label>
                                <input
                                    type="text"
                                    value={data.p_jawab}
                                    onChange={(e) => setData('p_jawab', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    placeholder="Masukkan nama penanggung jawab"
                                />
                            </div>

                            {/* Alamat Penanggung Jawab */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Alamat Penanggung Jawab
                                </label>
                                <textarea
                                    value={data.almt_pj}
                                    onChange={(e) => setData('almt_pj', e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    placeholder="Masukkan alamat penanggung jawab"
                                />
                            </div>

                            {/* Hubungan Penanggung Jawab */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Hubungan Penanggung Jawab
                                </label>
                                <input
                                    type="text"
                                    value={data.hubunganpj}
                                    onChange={(e) => setData('hubunganpj', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    placeholder="Contoh: Ayah, Ibu, Suami, dll"
                                />
                            </div>

                            {/* Biaya Registrasi */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Biaya Registrasi
                                </label>
                                <input
                                    type="number"
                                    value={data.biaya_reg}
                                    onChange={(e) => setData('biaya_reg', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    placeholder="0"
                                    min="0"
                                    step="1000"
                                />
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Status
                                </label>
                                <select
                                    value={data.stts}
                                    onChange={(e) => setData('stts', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                >
                                    {Object.entries(statusOptions).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Status Daftar */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Status Daftar
                                </label>
                                <select
                                    value={data.stts_daftar}
                                    onChange={(e) => setData('stts_daftar', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                >
                                    {Object.entries(statusDaftarOptions).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Status Lanjut */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Status Lanjut
                                </label>
                                <select
                                    value={data.status_lanjut}
                                    onChange={(e) => setData('status_lanjut', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                >
                                    {Object.entries(statusLanjutOptions).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Kode Penjamin */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Kode Penjamin
                                </label>
                                <input
                                    type="text"
                                    value={data.kd_pj}
                                    onChange={(e) => setData('kd_pj', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    placeholder="Masukkan kode penjamin"
                                />
                            </div>

                            {/* Umur Daftar */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Umur Daftar
                                </label>
                                <input
                                    type="number"
                                    value={data.umurdaftar}
                                    onChange={(e) => setData('umurdaftar', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            {/* Status Umur */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Status Umur
                                </label>
                                <select
                                    value={data.sttsumur}
                                    onChange={(e) => setData('sttsumur', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                >
                                    {Object.entries(sttsumurOptions).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Status Bayar */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Status Bayar
                                </label>
                                <select
                                    value={data.status_bayar}
                                    onChange={(e) => setData('status_bayar', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                >
                                    {Object.entries(statusBayarOptions).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Status Poli */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Status Poli
                                </label>
                                <select
                                    value={data.status_poli}
                                    onChange={(e) => setData('status_poli', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                >
                                    {Object.entries(statusPoliOptions).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Keputusan */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Keputusan
                                </label>
                                <select
                                    value={data.keputusan}
                                    onChange={(e) => setData('keputusan', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                >
                                    {Object.entries(keputusanOptions).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8 flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Menyimpan...
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                            <path d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        Simpan Data
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
