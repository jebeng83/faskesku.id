import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AppLayout from '@/Layouts/AppLayout';
import SearchableSelect from '@/Components/SearchableSelect';
import { todayDateString, nowDateTimeString } from '@/tools/datetime';
// Removed react-select import - using native HTML select instead

export default function Create({ 
    patients, 
    polikliniks,
    dokters,
    penjaabs,
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
        tgl_registrasi: todayDateString(),
        jam_reg: nowDateTimeString().split(' ')[1].substring(0, 5),
        kd_dokter: '',
        kd_poli: '',
        p_jawab: '',
        almt_pj: '',
        hubunganpj: '',
        biaya_reg: '0',
        stts: 'Belum',
        stts_daftar: '-',
        status_lanjut: 'Ralan',
        kd_pj: '',
        umurdaftar: '0',
        sttsumur: 'Th',
        status_bayar: 'Belum Bayar',
        status_poli: 'Baru',
        keputusan: '-'
    });

    // Handler untuk auto-fill data pasien
    const handlePatientChange = (value) => {
        setData('no_rkm_medis', value);
        
        if (value) {
            // Cari data pasien yang dipilih
            const selectedPatient = patients.find(patient => patient.no_rkm_medis === value);
            
            if (selectedPatient) {
                // Calculate age from birth date
                let ageText = '';
                let ageUnit = 'Th';
                let statusDaftar = '-';
                
                if (selectedPatient.tgl_lahir) {
                    const birthDate = new Date(selectedPatient.tgl_lahir);
                    const today = new Date();
                    const ageInYears = today.getFullYear() - birthDate.getFullYear();
                    const monthDiff = today.getMonth() - birthDate.getMonth();
                    const dayDiff = today.getDate() - birthDate.getDate();
                    
                    if (ageInYears > 0) {
                        ageText = ageInYears.toString();
                        ageUnit = 'Th';
                        statusDaftar = 'Lama';
                    } else if (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)) {
                        const ageInMonths = monthDiff + (dayDiff >= 0 ? 0 : -1) + (ageInYears * 12);
                        ageText = ageInMonths.toString();
                        ageUnit = 'Bl';
                        statusDaftar = 'Baru';
                    } else {
                        const ageInDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
                        ageText = ageInDays.toString();
                        ageUnit = 'Hr';
                        statusDaftar = 'Baru';
                    }
                }
                
                // Get biaya_reg from selected poliklinik
                let biayaReg = '0';
                if (data.kd_poli) {
                    const selectedPoli = polikliniks.find(poli => poli.kd_poli === data.kd_poli);
                    if (selectedPoli) {
                        biayaReg = selectedPoli.registrasi || '0';
                    }
                }
                
                // Auto-fill data dari pasien
                setData(prevData => ({
                    ...prevData,
                    no_rkm_medis: value,
                    p_jawab: selectedPatient.namakeluarga || selectedPatient.nm_pasien,
                    almt_pj: selectedPatient.alamatpj || selectedPatient.alamat,
                    hubunganpj: selectedPatient.keluarga || 'DIRI SENDIRI',
                    kd_pj: selectedPatient.kd_pj || prevData.kd_pj,
                    umurdaftar: ageText,
                    sttsumur: ageUnit,
                    stts_daftar: statusDaftar,
                    biaya_reg: biayaReg
                }));
            }
        }
    };

    // Handler untuk auto-fill biaya registrasi dari poliklinik
    const handlePoliklinikChange = (value) => {
        setData('kd_poli', value);
        
        // Auto-fill biaya_reg from selected poliklinik
        const selectedPoli = polikliniks.find(poli => poli.kd_poli === value);
        if (selectedPoli) {
            setData(prevData => ({
                ...prevData,
                kd_poli: value,
                biaya_reg: selectedPoli.registrasi || '0'
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('rawat-jalan.store'));
    };

    return (
        <AppLayout>
            <Head title="Registrasi Rawat Jalan" />

            <div className="space-y-6 -mt-6 -mx-6 p-6">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Registrasi Rawat Jalan
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
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <SearchableSelect
                                            options={patients.map(patient => ({
                                                value: patient.no_rkm_medis,
                                                label: `${patient.no_rkm_medis} - ${patient.nm_pasien}`
                                            }))}
                                            value={data.no_rkm_medis}
                                            onChange={handlePatientChange}
                                            placeholder="Pilih Pasien"
                                            searchPlaceholder="Cari pasien..."
                                            error={!!errors.no_rkm_medis}
                                            displayKey="label"
                                            valueKey="value"
                                        />
                                    </div>
                                    <a
                                        href="/patients/create"
                                        className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 whitespace-nowrap"
                                        title="Tambah Pasien Baru"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Pasien Baru
                                    </a>
                                </div>
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
                    Dokter <span className="text-red-500">*</span>
                </label>
                <SearchableSelect
                    options={dokters.map(dokter => ({
                        value: dokter.kd_dokter,
                        label: `${dokter.kd_dokter} - ${dokter.nm_dokter}`
                    }))}
                    value={data.kd_dokter}
                    onChange={(value) => setData('kd_dokter', value)}
                    placeholder="Pilih Dokter"
                    searchPlaceholder="Cari dokter..."
                    error={!!errors.kd_dokter}
                    displayKey="label"
                    valueKey="value"
                />
                {errors.kd_dokter && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.kd_dokter}</p>
                )}
            </div>

                            {/* Poli */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Poliklinik <span className="text-red-500">*</span>
                                </label>
                                <SearchableSelect
                                    options={polikliniks.map(poliklinik => ({
                                        value: poliklinik.kd_poli,
                                        label: `${poliklinik.kd_poli} - ${poliklinik.nm_poli}`
                                    }))}
                                    value={data.kd_poli}
                                    onChange={handlePoliklinikChange}
                                    placeholder="Pilih Poliklinik"
                                    searchPlaceholder="Cari poliklinik..."
                                    error={!!errors.kd_poli}
                                    displayKey="label"
                                    valueKey="value"
                                />
                                {errors.kd_poli && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.kd_poli}</p>
                                )}
                            </div>

                            {/* Penanggung Jawab */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Penanggung Jawab <span className="text-blue-500 text-xs">(Otomatis dari data pasien)</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.p_jawab}
                                    onChange={(e) => setData('p_jawab', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    placeholder="Nama penanggung jawab"
                                />
                            </div>

                            {/* Alamat Penanggung Jawab */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Alamat Penanggung Jawab <span className="text-blue-500 text-xs">(Otomatis dari data pasien)</span>
                                </label>
                                <textarea
                                    value={data.almt_pj}
                                    onChange={(e) => setData('almt_pj', e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    placeholder="Alamat penanggung jawab"
                                />
                            </div>

                            {/* Hubungan Penanggung Jawab */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Hubungan Penanggung Jawab <span className="text-blue-500 text-xs">(Otomatis dari data pasien)</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.hubunganpj}
                                    onChange={(e) => setData('hubunganpj', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    placeholder="Hubungan dengan pasien"
                                />
                            </div>

                            {/* Biaya Registrasi */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Biaya Registrasi <span className="text-blue-500 text-xs">(Otomatis dari poliklinik)</span>
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

                            {/* Status - Hidden */}
                            <div className="hidden">
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
                                    Status Daftar <span className="text-blue-500 text-xs">(Otomatis dari umur pasien)</span>
                                </label>
                                <select
                                    value={data.stts_daftar}
                                    onChange={(e) => setData('stts_daftar', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white bg-gray-50 dark:bg-gray-600"
                                    readOnly
                                >
                                    {Object.entries(statusDaftarOptions).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Status Lanjut - Hidden */}
                            <div className="hidden">
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

                            {/* Penanggung Jawab */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Jenis Bayar
                                </label>
                                <SearchableSelect
                                    options={penjaabs}
                                    value={data.kd_pj}
                                    onChange={(value) => setData('kd_pj', value)}
                                    placeholder="Pilih Jenis Bayar"
                                    searchPlaceholder="Cari Jenis Bayar..."
                                    error={errors.kd_pj}
                                    displayKey="png_jawab"
                                    valueKey="kd_pj"
                                />
                                {errors.kd_pj && (
                                    <p className="text-red-500 text-sm mt-1">{errors.kd_pj}</p>
                                )}
                            </div>

                            {/* Umur Daftar */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Umur Daftar <span className="text-blue-500 text-xs">(Otomatis dari tanggal lahir)</span>
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
                                    Status Umur <span className="text-blue-500 text-xs">(Otomatis dari tanggal lahir)</span>
                                </label>
                                <select
                                    value={data.sttsumur}
                                    onChange={(e) => setData('sttsumur', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white bg-gray-50 dark:bg-gray-600"
                                    readOnly
                                >
                                    {Object.entries(sttsumurOptions).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Status Bayar - Hidden */}
                            <div className="hidden">
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

                            {/* Status Poli - Hidden */}
                            <div className="hidden">
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

                            {/* Keputusan - Hidden */}
                            <div className="hidden">
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
