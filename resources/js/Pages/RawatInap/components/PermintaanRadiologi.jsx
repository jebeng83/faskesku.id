import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { todayDateString, nowDateTimeString } from '@/tools/datetime';

export default function PermintaanRadiologi({ token = '', noRkmMedis = '', noRawat = '' }) {
    const [availableTests, setAvailableTests] = useState([]);
    const [selectedTests, setSelectedTests] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [diagnosisKlinis, setDiagnosisKlinis] = useState('');
    const [informasiTambahan, setInformasiTambahan] = useState('');
    const [loading, setLoading] = useState(false);
    const [riwayatPermintaan, setRiwayatPermintaan] = useState([]);
    const [loadingRiwayat, setLoadingRiwayat] = useState(false);

    const loadAvailableTests = async () => {
        try {
            const response = await axios.get('/api/radiologi-tests', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.data && response.data.success) {
                setAvailableTests(response.data.data || []);
            }
        } catch (error) {
            console.error('Error loading radiology tests:', error);
            setAvailableTests([]);
        }
    };

    const loadRiwayatPermintaan = async () => {
        if (!noRawat) return;

        setLoadingRiwayat(true);
        try {
            const response = await axios.get(
                `/api/permintaan-radiologi/riwayat/${encodeURIComponent(noRawat)}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                },
            );

            if (response.data && response.data.success) {
                setRiwayatPermintaan(response.data.data || []);
            }
        } catch (error) {
            console.error('Error loading radiology history:', error);
            setRiwayatPermintaan([]);
        } finally {
            setLoadingRiwayat(false);
        }
    };

    useEffect(() => {
        loadAvailableTests();
        loadRiwayatPermintaan();
    }, [token, noRawat]);

    const addTest = (test) => {
        if (!selectedTests.find((t) => t.kd_jenis_prw === test.kd_jenis_prw)) {
            setSelectedTests((prev) => [...prev, { ...test, status: 'Rencana' }]);
        }
    };

    const removeTest = (kdJenisPrw) => {
        setSelectedTests((prev) => prev.filter((test) => test.kd_jenis_prw !== kdJenisPrw));
    };

    const updateTestStatus = (kdJenisPrw, status) => {
        setSelectedTests((prev) =>
            prev.map((test) =>
                test.kd_jenis_prw === kdJenisPrw ? { ...test, status } : test,
            ),
        );
    };

    const filteredTests = availableTests.filter(
        (test) =>
            test.nm_perawatan &&
            test.nm_perawatan.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleDeletePermintaan = async (noorder) => {
        if (!confirm('Apakah Anda yakin ingin menghapus permintaan ini?')) {
            return;
        }

        try {
            const fd = new FormData();
            fd.append('_method', 'DELETE');
            const response = await axios.post(
                `/api/permintaan-radiologi/${noorder}`,
                fd,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );

            if (response.data && response.data.success) {
                alert('Permintaan radiologi berhasil dihapus');
                loadRiwayatPermintaan();
            } else {
                alert('Gagal menghapus permintaan radiologi');
            }
        } catch (error) {
            console.error('Error deleting radiology request:', error);
            alert('Terjadi kesalahan saat menghapus permintaan');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (selectedTests.length === 0) {
            alert('Pilih minimal satu pemeriksaan radiologi');
            return;
        }

        if (!diagnosisKlinis || diagnosisKlinis.trim() === '') {
            alert('Diagnosis klinis wajib diisi');
            return;
        }

        setLoading(true);
        try {
            const now = nowDateTimeString();
            const jamPermintaan = now.split(' ')[1].substring(0, 5);

            const detailTests = selectedTests.map((test) => ({
                kd_jenis_prw: test.kd_jenis_prw,
                stts_bayar: 'Belum',
            }));

            const requestData = {
                no_rawat: noRawat,
                tgl_permintaan: todayDateString(),
                jam_permintaan: jamPermintaan,
                tgl_sampel: null,
                jam_sampel: null,
                tgl_hasil: null,
                jam_hasil: null,
                status: 'ranap',
                informasi_tambahan:
                    informasiTambahan && informasiTambahan.trim() !== ''
                        ? informasiTambahan
                        : '-',
                diagnosa_klinis: diagnosisKlinis,
                dokter_perujuk: '-',
                detail_tests: detailTests,
            };

            const response = await axios.post(
                '/api/permintaan-radiologi',
                requestData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                },
            );

            if (response.data && response.data.success) {
                alert('Permintaan radiologi berhasil disimpan');
                setSelectedTests([]);
                setDiagnosisKlinis('');
                setInformasiTambahan('');
                loadRiwayatPermintaan();
            } else {
                alert('Gagal menyimpan permintaan radiologi');
            }
        } catch (error) {
            console.error('Error saving radiology request:', error);
            alert('Terjadi kesalahan saat menyimpan permintaan');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="px-4 md:px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
                    <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                            <svg
                                className="w-6 h-6 text-blue-600 dark:text-blue-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Permintaan Radiologi
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Kelola permintaan pemeriksaan radiologi untuk pasien
                            </p>
                        </div>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="p-4 md:p-6 space-y-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Diagnosis Klinis *
                            </label>
                            <textarea
                                value={diagnosisKlinis}
                                onChange={(e) => setDiagnosisKlinis(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                rows={3}
                                placeholder="Masukkan diagnosis klinis..."
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Informasi Tambahan
                            </label>
                            <textarea
                                value={informasiTambahan}
                                onChange={(e) =>
                                    setInformasiTambahan(e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                rows={3}
                                placeholder="Informasi tambahan (opsional)..."
                            />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                            Pilih Pemeriksaan Radiologi
                        </h4>

                        <div className="mb-4">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                placeholder="Cari pemeriksaan radiologi..."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto border border-gray-200 dark:border-gray-600 rounded-md p-3">
                            {filteredTests.map((test) => (
                                <div
                                    key={test.kd_jenis_prw}
                                    className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-md"
                                >
                                    <div className="flex-1">
                                        <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                                            {test.nm_perawatan}
                                        </h5>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Kode: {test.kd_jenis_prw}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => addTest(test)}
                                        disabled={selectedTests.find(
                                            (t) =>
                                                t.kd_jenis_prw ===
                                                test.kd_jenis_prw,
                                        )}
                                        className={`ml-2 px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                                            selectedTests.find(
                                                (t) =>
                                                    t.kd_jenis_prw ===
                                                    test.kd_jenis_prw,
                                            )
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                                : 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50'
                                        }`}
                                    >
                                        {selectedTests.find(
                                            (t) =>
                                                t.kd_jenis_prw ===
                                                test.kd_jenis_prw,
                                        )
                                            ? 'Terpilih'
                                            : 'Pilih'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {selectedTests.length > 0 && (
                        <div>
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                                Pemeriksaan Terpilih ({selectedTests.length})
                            </h4>
                            <div className="space-y-2">
                                {selectedTests.map((test) => (
                                    <div
                                        key={test.kd_jenis_prw}
                                        className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md"
                                    >
                                        <div className="flex-1">
                                            <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                                                {test.nm_perawatan}
                                            </h5>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Kode: {test.kd_jenis_prw} | Status:{' '}
                                                {test.status}
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <select
                                                value={test.status}
                                                onChange={(e) =>
                                                    updateTestStatus(
                                                        test.kd_jenis_prw,
                                                        e.target.value,
                                                    )
                                                }
                                                className="text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 dark:bg-gray-700 dark:text-white"
                                            >
                                                <option value="Rencana">
                                                    Rencana
                                                </option>
                                                <option value="Urgent">
                                                    Urgent
                                                </option>
                                                <option value="CITO">
                                                    CITO
                                                </option>
                                            </select>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeTest(test.kd_jenis_prw)
                                                }
                                                className="ml-3 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50 transition-colors"
                                                title="Hapus tindakan"
                                            >
                                                <svg
                                                    className="w-3 h-3 mr-1"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => {
                                setSelectedTests([]);
                                setDiagnosisKlinis('');
                                setInformasiTambahan('');
                            }}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Reset
                        </button>
                        <button
                            type="submit"
                            disabled={loading || selectedTests.length === 0}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Menyimpan...' : 'Simpan Permintaan'}
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="px-4 md:px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <svg
                                    className="w-6 h-6 text-green-600 dark:text-green-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Riwayat Permintaan
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Daftar permintaan radiologi yang telah dibuat (
                                    {riwayatPermintaan.length})
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 md:p-6">
                    {loadingRiwayat ? (
                        <div className="text-center py-8">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                Memuat riwayat permintaan...
                            </div>
                        </div>
                    ) : riwayatPermintaan.length > 0 ? (
                        <div className="space-y-4">
                            {riwayatPermintaan.map((permintaan, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700/30"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <h5 className="text-sm font-semibold text-gray-900 dark:text-white">
                                                    No. Order: {permintaan.noorder}
                                                </h5>
                                                <span
                                                    className={`px-2 py-1 text-xs rounded-full ${
                                                        permintaan.detail_permintaan?.some(
                                                            (p) =>
                                                                p.stts_bayar ===
                                                                'Sudah',
                                                        )
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                                    }`}
                                                >
                                                    {permintaan.detail_permintaan?.some(
                                                        (p) =>
                                                            p.stts_bayar ===
                                                            'Sudah',
                                                    )
                                                        ? 'Lunas'
                                                        : 'Belum Bayar'}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <p className="text-gray-600 dark:text-gray-400">
                                                        <span className="font-medium">
                                                            Tanggal:
                                                        </span>{' '}
                                                        {permintaan.tgl_permintaan}
                                                    </p>
                                                    <p className="text-gray-600 dark:text-gray-400">
                                                        <span className="font-medium">
                                                            Jam:
                                                        </span>{' '}
                                                        {permintaan.jam_permintaan}
                                                    </p>
                                                    <p className="text-gray-600 dark:text-gray-400">
                                                        <span className="font-medium">
                                                            Dokter:
                                                        </span>{' '}
                                                        {permintaan.dokter?.nm_dokter ||
                                                            '-'}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-600 dark:text-gray-400">
                                                        <span className="font-medium">
                                                            Diagnosis:
                                                        </span>{' '}
                                                        {permintaan.diagnosa_klinis ||
                                                            '-'}
                                                    </p>
                                                    {permintaan.informasi_tambahan && (
                                                        <p className="text-gray-600 dark:text-gray-400">
                                                            <span className="font-medium">
                                                                Info Tambahan:
                                                            </span>{' '}
                                                            {
                                                                permintaan.informasi_tambahan
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {permintaan.detail_permintaan &&
                                                permintaan.detail_permintaan
                                                    .length > 0 && (
                                                    <div className="mt-3">
                                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                            Pemeriksaan:
                                                        </p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {permintaan.detail_permintaan.map(
                                                                (
                                                                    detail,
                                                                    idx,
                                                                ) => (
                                                                    <span
                                                                        key={
                                                                            idx
                                                                        }
                                                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                                                    >
                                                                        {detail
                                                                            .jns_perawatan_radiologi
                                                                            ?.nm_perawatan ||
                                                                            detail.kd_jenis_prw}
                                                                    </span>
                                                                ),
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                        </div>

                                        <div className="flex-shrink-0 ml-4">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDeletePermintaan(
                                                        permintaan.noorder,
                                                    )
                                                }
                                                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50 transition-colors"
                                                title="Hapus permintaan"
                                            >
                                                <svg
                                                    className="w-3 h-3"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <p className="mt-2 text-sm">
                                Belum ada riwayat permintaan
                            </p>
                            <p className="text-xs text-gray-400">
                                Riwayat permintaan radiologi akan muncul di sini
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
