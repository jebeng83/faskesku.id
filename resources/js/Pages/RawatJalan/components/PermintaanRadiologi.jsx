import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PermintaanRadiologi({ token = '', noRkmMedis = '', noRawat = '' }) {
    const [availableTests, setAvailableTests] = useState([]);
    const [selectedTests, setSelectedTests] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [diagnosisKlinis, setDiagnosisKlinis] = useState('');
    const [informasiTambahan, setInformasiTambahan] = useState('');
    const [loading, setLoading] = useState(false);
    const [riwayatPermintaan, setRiwayatPermintaan] = useState([]);
    const [loadingRiwayat, setLoadingRiwayat] = useState(false);

    /**
     * Load available radiology tests from API
     */
    const loadAvailableTests = async () => {
        try {
            const response = await axios.get('/api/radiologi-tests', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.data && response.data.success) {
                setAvailableTests(response.data.data || []);
            }
        } catch (error) {
            console.error('Error loading radiology tests:', error);
            setAvailableTests([]);
        }
    };

    /**
     * Load history of radiology requests for the current patient
     */
    const loadRiwayatPermintaan = async () => {
        if (!noRawat) return;
        
        setLoadingRiwayat(true);
        try {
            const response = await axios.get(`/api/permintaan-radiologi/riwayat/${encodeURIComponent(noRawat)}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
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

    /**
     * Add a test to the selected tests list
     */
    const addTest = (test) => {
        if (!selectedTests.find(t => t.kd_jenis_prw === test.kd_jenis_prw)) {
            setSelectedTests(prev => [...prev, { ...test, status: 'Rencana' }]);
        }
    };

    /**
     * Remove a test from the selected tests list
     */
    const removeTest = (kdJenisPrw) => {
        setSelectedTests(prev => prev.filter(test => test.kd_jenis_prw !== kdJenisPrw));
    };

    /**
     * Update the status of a selected test
     */
    const updateTestStatus = (kdJenisPrw, status) => {
        setSelectedTests(prev => 
            prev.map(test => 
                test.kd_jenis_prw === kdJenisPrw ? { ...test, status } : test
            )
        );
    };

    /**
     * Filter available tests based on search term
     */
    const filteredTests = availableTests.filter(test =>
        test.nm_perawatan && test.nm_perawatan.toLowerCase().includes(searchTerm.toLowerCase())
    );

    /**
     * Handle deletion of a radiology request
     */
    const handleDeletePermintaan = async (noorder) => {
        if (!confirm('Apakah Anda yakin ingin menghapus permintaan ini?')) {
            return;
        }
        
        try {
            // Method spoofing: use POST + _method=DELETE to avoid 405 and align with backend
            const fd = new FormData();
            fd.append('_method', 'DELETE');
            const response = await axios.post(`/api/permintaan-radiologi/${noorder}`, fd, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            
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

    /**
     * Handle form submission to save radiology request
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (selectedTests.length === 0) {
            alert('Pilih minimal satu pemeriksaan radiologi');
            return;
        }
        
        setLoading(true);
        try {
            const requestData = {
                no_rawat: noRawat,
                no_rkm_medis: noRkmMedis,
                diagnosis_klinis: diagnosisKlinis,
                informasi_tambahan: informasiTambahan,
                pemeriksaan: selectedTests.map(test => ({
                    kd_jenis_prw: test.kd_jenis_prw,
                    status: test.status || 'Belum'
                }))
            };
            
            const response = await axios.post('/api/permintaan-radiologi', requestData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
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
            <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-4 md:p-6">
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
                                onChange={(e) => setInformasiTambahan(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                rows={3}
                                placeholder="Informasi tambahan (opsional)..."
                            />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Pilih Pemeriksaan Radiologi</h4>
                        
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
                                <div key={test.kd_jenis_prw} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
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
                                        disabled={selectedTests.find(t => t.kd_jenis_prw === test.kd_jenis_prw)}
                                        className={`ml-2 px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                                            selectedTests.find(t => t.kd_jenis_prw === test.kd_jenis_prw)
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                                : 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50'
                                        }`}
                                    >
                                        {selectedTests.find(t => t.kd_jenis_prw === test.kd_jenis_prw) ? 'Terpilih' : 'Pilih'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {selectedTests.length > 0 && (
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                                Pemeriksaan Terpilih ({selectedTests.length})
                            </h4>
                            <div className="border-t border-gray-200 dark:border-gray-700">
                                {selectedTests.map((test) => (
                                    <div key={test.kd_jenis_prw} className="py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 flex items-center justify-between">
                                        <div className="flex-1">
                                            <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                                                {test.nm_perawatan}
                                            </h5>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Kode: {test.kd_jenis_prw} | Status: {test.status}
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <select
                                                value={test.status}
                                                onChange={(e) => updateTestStatus(test.kd_jenis_prw, e.target.value)}
                                                className="text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="Rencana">Rencana</option>
                                                <option value="Urgent">Urgent</option>
                                                <option value="CITO">CITO</option>
                                            </select>
                                            <button
                                                type="button" 
                                                onClick={() => removeTest(test.kd_jenis_prw)} 
                                                className="ml-3 text-gray-400 hover:text-red-500 transition-colors"
                                                title="Hapus tindakan"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
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

            <div className="space-y-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-4 md:p-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Riwayat Permintaan</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Daftar permintaan radiologi yang telah dibuat ({riwayatPermintaan.length})
                    </p>
                </div>
                
                <div>
                    {loadingRiwayat ? (
                        <div className="text-center py-8">
                            <div className="text-sm text-gray-500 dark:text-gray-400">Memuat riwayat permintaan...</div>
                        </div>
                    ) : riwayatPermintaan.length > 0 ? (
                        <div className="border-t border-gray-200 dark:border-gray-700">
                            {riwayatPermintaan.map((permintaan, index) => (
                                <div key={index} className="py-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <h5 className="text-sm font-semibold text-gray-900 dark:text-white">
                                                    No. Order: {permintaan.noorder}
                                                </h5>
                                                <span className={`px-2 py-1 text-xs rounded-full ${
                                                    permintaan.detail_permintaan?.some(p => p.stts_bayar === 'Sudah')
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                                }`}>
                                                    {permintaan.detail_permintaan?.some(p => p.stts_bayar === 'Sudah') ? 'Lunas' : 'Belum Bayar'}
                                                </span>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <p className="text-gray-600 dark:text-gray-400">
                                                        <span className="font-medium">Tanggal:</span> {permintaan.tgl_permintaan}
                                                    </p>
                                                    <p className="text-gray-600 dark:text-gray-400">
                                                        <span className="font-medium">Jam:</span> {permintaan.jam_permintaan}
                                                    </p>
                                                    <p className="text-gray-600 dark:text-gray-400">
                                                        <span className="font-medium">Dokter:</span> {permintaan.dokter?.nm_dokter || '-'}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-600 dark:text-gray-400">
                                                        <span className="font-medium">Diagnosis:</span> {permintaan.diagnosa_klinis || '-'}
                                                    </p>
                                                    {permintaan.informasi_tambahan && (
                                                        <p className="text-gray-600 dark:text-gray-400">
                                                            <span className="font-medium">Info Tambahan:</span> {permintaan.informasi_tambahan}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {permintaan.detail_permintaan && permintaan.detail_permintaan.length > 0 && (
                                                <div className="mt-3">
                                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pemeriksaan:</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {permintaan.detail_permintaan.map((detail, idx) => (
                                                            <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                                {detail.jns_perawatan_radiologi?.nm_perawatan || detail.kd_jenis_prw}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-shrink-0 ml-4">
                                            <button
                                                type="button"
                                                onClick={() => handleDeletePermintaan(permintaan.noorder)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                                title="Hapus permintaan"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-0.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="mt-2 text-sm">Belum ada riwayat permintaan</p>
                            <p className="text-xs text-gray-400">Riwayat permintaan radiologi akan muncul di sini</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
