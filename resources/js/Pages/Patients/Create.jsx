import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AppLayout from '@/Layouts/AppLayout';
import { toast } from '@/tools/toast';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nm_pasien: '',
        no_ktp: '',
        jk: 'L',
        tmp_lahir: '',
        tgl_lahir: '',
        nm_ibu: '',
        alamat: '',
        gol_darah: '',
        pekerjaan: '',
        stts_nikah: 'BELUM MENIKAH',
        agama: '',
        no_tlp: '',
        pnd: 'SMA',
        keluarga: 'DIRI SENDIRI',
        namakeluarga: '',
        kd_pj: 'UMUM',
        no_peserta: '',
        pekerjaanpj: '',
        alamatpj: '',
        kelurahanpj: '',
        kecamatanpj: '',
        kabupatenpj: '',
        propinsipj: '',
        email: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('patients.store'), {
            onSuccess: () => toast('Pasien berhasil disimpan', 'success'),
            onError: () => toast('Gagal menyimpan data pasien', 'error')
        });
    };

    return (
        <AppLayout>
            <Head title="Tambah Pasien Baru" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Tambah Pasien Baru
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                                        Masukkan data pasien baru ke dalam sistem
                                    </p>
                                </div>
                                <Link
                                    href={route('patients.index')}
                                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06L10.94 8.25H3a.75.75 0 010-1.5h7.94L7.72 3.53a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06 0z" clipRule="evenodd" />
                                    </svg>
                                    Kembali
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Information */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Informasi Dasar
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        </div>

                        {/* Contact Information */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Informasi Kontak
                                </h3>
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
                        </div>

                        {/* Additional Information */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Informasi Tambahan
                                </h3>
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
                        </div>

                        {/* Family Information */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Informasi Keluarga
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Kode Penanggung Jawab *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.kd_pj}
                                            onChange={(e) => setData('kd_pj', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="Masukkan kode penanggung jawab"
                                        />
                                        {errors.kd_pj && (
                                            <p className="mt-1 text-sm text-red-600">{errors.kd_pj}</p>
                                        )}
                                    </div>

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
                                            onChange={(e) => setData('kelurahanpj', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="Masukkan kelurahan"
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
                                            onChange={(e) => setData('kecamatanpj', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="Masukkan kecamatan"
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
                                            onChange={(e) => setData('kabupatenpj', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="Masukkan kabupaten"
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
                                            onChange={(e) => setData('propinsipj', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="Masukkan provinsi"
                                        />
                                        {errors.propinsipj && (
                                            <p className="mt-1 text-sm text-red-600">{errors.propinsipj}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex justify-end gap-4">
                                    <Link
                                        href={route('patients.index')}
                                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        {processing && (
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        )}
                                        {processing ? 'Menyimpan...' : 'Simpan'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
