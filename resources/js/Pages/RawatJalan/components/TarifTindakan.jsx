import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from '@/Components/Alert';
import ConfirmationAlert from '@/Components/ConfirmationAlert';

const TarifTindakan = ({ token, noRkmMedis, noRawat }) => {
    const [activeTab, setActiveTab] = useState('dokter');
    const [jnsPerawatan, setJnsPerawatan] = useState([]);
    const [filteredPerawatan, setFilteredPerawatan] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTindakan, setSelectedTindakan] = useState([]);
    const [dokters, setDokters] = useState([]);
    const [selectedDokter, setSelectedDokter] = useState('');
    const [petugas, setPetugas] = useState([]);
    const [selectedPetugas, setSelectedPetugas] = useState('');
    const [riwayatTindakan, setRiwayatTindakan] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertConfig, setAlertConfig] = useState({
        type: 'success',
        title: '',
        message: '',
        autoClose: true
    });
    const [showConfirmAlert, setShowConfirmAlert] = useState(false);
    const [confirmConfig, setConfirmConfig] = useState({
        title: '',
        message: '',
        onConfirm: null
    });

    // Load data jenis perawatan
    const loadJnsPerawatan = async () => {
        try {
            setLoading(true);
            
            // Tentukan jenis tarif berdasarkan tab aktif
            let jenisTarif = '';
            switch (activeTab) {
                case 'dokter':
                    jenisTarif = 'dokter';
                    break;
                case 'perawat':
                    jenisTarif = 'perawat';
                    break;
                case 'dokter-perawat':
                    jenisTarif = 'dokter_perawat';
                    break;
            }
            
            const response = await axios.get('/api/tarif-tindakan', {
                params: { 
                    token,
                    jenis_tarif: jenisTarif
                }
            });
            setJnsPerawatan(response.data.data || []);
            setFilteredPerawatan(response.data.data || []);
        } catch (error) {
            console.error('Error loading jenis perawatan:', error);
            setAlertConfig({
                type: 'error',
                title: 'Error',
                message: 'Gagal memuat data jenis perawatan',
                autoClose: true
            });
            setShowAlert(true);
        } finally {
            setLoading(false);
        }
    };

    // Load data dokter
    const loadDokters = async () => {
        try {
            const response = await axios.get('/api/tarif-tindakan/dokter', {
                params: { token }
            });
            setDokters(response.data.data || []);
        } catch (error) {
            console.error('Error loading dokters:', error);
            setAlertConfig({
                type: 'error',
                title: 'Error',
                message: 'Gagal memuat data dokter',
                autoClose: true
            });
            setShowAlert(true);
        }
    };

    // Load data petugas
    const loadPetugas = async () => {
        try {
            const response = await axios.get('/api/tarif-tindakan/petugas', {
                params: { token }
            });
            setPetugas(response.data.data || []);
        } catch (error) {
            console.error('Error loading petugas:', error);
            setAlertConfig({
                type: 'error',
                title: 'Error',
                message: 'Gagal memuat data petugas',
                autoClose: true
            });
            setShowAlert(true);
        }
    };

    // Load riwayat tindakan
    const loadRiwayatTindakan = async () => {
        try {
            // Encode noRawat untuk menangani slash dalam URL
            const encodedNoRawat = encodeURIComponent(noRawat);
            const response = await axios.get(`/api/tarif-tindakan/riwayat/${encodedNoRawat}`, {
                params: { token }
            });
            
            if (response.data.success) {
                const data = response.data.data;
                const allTindakan = [
                    ...data.tindakan_dokter,
                    ...data.tindakan_perawat,
                    ...data.tindakan_dokter_perawat
                ];
                
                // Sort by date and time descending
                allTindakan.sort((a, b) => {
                    const dateA = new Date(`${a.tgl_perawatan} ${a.jam_rawat}`);
                    const dateB = new Date(`${b.tgl_perawatan} ${b.jam_rawat}`);
                    return dateB - dateA;
                });
                
                setRiwayatTindakan(allTindakan);
            } else {
                console.error('Error loading riwayat tindakan:', response.data.message);
                setRiwayatTindakan([]);
            }
        } catch (error) {
            console.error('Error loading riwayat tindakan:', error.response?.data?.message || error.message);
            setRiwayatTindakan([]);
        }
    };

    useEffect(() => {
        if (token) {
            loadJnsPerawatan();
            loadRiwayatTindakan();
            loadDokters();
            loadPetugas();
        }
    }, [token, noRawat]);

    // Reset pilihan dokter dan petugas saat tab berubah, dan muat ulang data jenis perawatan
    useEffect(() => {
        setSelectedDokter('');
        setSelectedPetugas('');
        if (token) {
            loadJnsPerawatan(); // Muat ulang data dengan filter berdasarkan tab aktif
        }
    }, [activeTab]);

    // Filter perawatan berdasarkan search
    useEffect(() => {
        if (!Array.isArray(jnsPerawatan)) {
            setFilteredPerawatan([]);
            return;
        }
        
        const filtered = jnsPerawatan.filter(item => 
            item.nm_perawatan?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.kd_jenis_prw?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPerawatan(filtered);
    }, [searchTerm, jnsPerawatan]);

    // Submit tindakan
    const handleSubmitTindakan = async () => {
        if (!selectedTindakan || selectedTindakan.length === 0) {
            setAlertConfig({
                type: 'warning',
                title: 'Peringatan',
                message: 'Pilih tindakan terlebih dahulu',
                autoClose: true
            });
            setShowAlert(true);
            return;
        }

        // Validasi dokter harus dipilih untuk tab dokter atau dokter-perawat
        if ((activeTab === 'dokter' || activeTab === 'dokter-perawat') && !selectedDokter) {
            setAlertConfig({
                type: 'warning',
                title: 'Peringatan',
                message: 'Pilih dokter terlebih dahulu',
                autoClose: true
            });
            setShowAlert(true);
            return;
        }

        // Validasi petugas harus dipilih untuk tab perawat atau dokter-perawat
        if ((activeTab === 'perawat' || activeTab === 'dokter-perawat') && !selectedPetugas) {
            setAlertConfig({
                type: 'warning',
                title: 'Peringatan',
                message: 'Pilih petugas terlebih dahulu',
                autoClose: true
            });
            setShowAlert(true);
            return;
        }

        try {
            setLoading(true);
            let endpoint = '';
            const currentDate = new Date().toISOString().split('T')[0];
            const currentTime = new Date().toTimeString().split(' ')[0];

            switch (activeTab) {
                case 'dokter':
                    endpoint = '/api/tarif-tindakan/dokter';
                    break;
                case 'perawat':
                    endpoint = '/api/tarif-tindakan/perawat';
                    break;
                case 'dokter-perawat':
                    endpoint = '/api/tarif-tindakan/dokter-perawat';
                    break;
            }

            // Simpan setiap tindakan yang dipilih
            const promises = selectedTindakan.map(tindakan => {
                const data = {
                    token,
                    no_rawat: noRawat,
                    kd_jenis_prw: tindakan.kd_jenis_prw,
                    tgl_perawatan: currentDate,
                    jam_rawat: currentTime
                };

                // Tambahkan field khusus berdasarkan jenis tindakan
                if (activeTab === 'dokter' || activeTab === 'dokter-perawat') {
                    data.kd_dokter = selectedDokter;
                }
                if (activeTab === 'perawat' || activeTab === 'dokter-perawat') {
                    data.nip = selectedPetugas;
                }

                return axios.post(endpoint, data);
            });

            const responses = await Promise.all(promises);
            
            // Cek apakah semua response berhasil
            const allSuccess = responses.every(response => 
                (response.status === 200 || response.status === 201) && response.data.success
            );
            
            if (allSuccess) {
                setAlertConfig({
                    type: 'success',
                    title: 'Berhasil',
                    message: `${selectedTindakan.length} tindakan berhasil disimpan`,
                    autoClose: true
                });
                setShowAlert(true);
                setSelectedTindakan([]);
                setSelectedDokter('');
                setSelectedPetugas('');
                setSearchTerm('');
                loadRiwayatTindakan();
            } else {
                setAlertConfig({
                    type: 'error',
                    title: 'Error',
                    message: 'Beberapa tindakan gagal disimpan',
                    autoClose: true
                });
                setShowAlert(true);
            }
        } catch (error) {
            console.error('Error submitting tindakan:', error);
            let errorMessage = 'Gagal menyimpan tindakan';
            
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            setAlertConfig({
                type: 'error',
                title: 'Error',
                message: errorMessage,
                autoClose: true
            });
            setShowAlert(true);
        } finally {
            setLoading(false);
        }
    };

    // Delete tindakan
    const handleDeleteTindakan = async (tindakan) => {
        setConfirmConfig({
            title: 'Konfirmasi Hapus',
            message: `Hapus tindakan ${tindakan.nm_perawatan}?`,
            onConfirm: async () => {
                try {
                    setLoading(true);
                    
                    // Tentukan jenis tindakan berdasarkan data item yang sebenarnya
                    const jenisTindakan = tindakan.jenis_tindakan;
                    
                    const deleteData = {
                        jenis_tindakan: jenisTindakan,
                        no_rawat: tindakan.no_rawat,
                        kd_jenis_prw: tindakan.kd_jenis_prw,
                        tgl_perawatan: tindakan.tgl_perawatan,
                        jam_rawat: tindakan.jam_rawat
                    };
                    
                    // Tambahkan kd_dokter atau nip berdasarkan jenis tindakan
                    if (jenisTindakan === 'dokter' && tindakan.dokter) {
                        deleteData.kd_dokter = tindakan.dokter.kd_dokter;
                    } else if (jenisTindakan === 'perawat' && tindakan.perawat) {
                        deleteData.nip = tindakan.perawat.nip;
                    } else if (jenisTindakan === 'dokter_perawat') {
                        if (tindakan.dokter) {
                            deleteData.kd_dokter = tindakan.dokter.kd_dokter;
                        }
                        if (tindakan.perawat) {
                            deleteData.nip = tindakan.perawat.nip;
                        }
                    }
                    
                    const response = await axios.delete(`/api/tarif-tindakan`, {
                        data: deleteData
                    });
                    
                    setAlertConfig({
                        type: 'success',
                        title: 'Berhasil',
                        message: 'Tindakan berhasil dihapus',
                        autoClose: true
                    });
                    setShowAlert(true);
                    loadRiwayatTindakan();
                } catch (error) {
                    console.error('Error deleting tindakan:', error);
                    const errorMessage = error.response?.data?.message || 'Gagal menghapus tindakan';
                    setAlertConfig({
                        type: 'error',
                        title: 'Error',
                        message: errorMessage,
                        autoClose: true
                    });
                    setShowAlert(true);
                } finally {
                    setLoading(false);
                }
                setShowConfirmAlert(false);
            }
        });
        setShowConfirmAlert(true);
    };

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount || 0);
    };

    return (
        <>
        <div className="space-y-4">
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                {[
                    { key: 'dokter', label: 'Dokter', color: 'blue' },
                    { key: 'perawat', label: 'Perawat', color: 'green' },
                    { key: 'dokter-perawat', label: 'Dokter + Perawat', color: 'purple' }
                ].map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex-1 py-2 px-3 text-xs font-medium rounded-md transition-all duration-200 ${
                            activeTab === tab.key
                                ? `bg-${tab.color}-500 text-white shadow-sm`
                                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Pilih Dokter - hanya tampil untuk tab dokter atau dokter-perawat */}
            {(activeTab === 'dokter' || activeTab === 'dokter-perawat') && (
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Pilih Dokter
                    </label>
                    <select
                        value={selectedDokter}
                        onChange={(e) => setSelectedDokter(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                        required
                    >
                        <option value="">-- Pilih Dokter --</option>
                        {dokters.map(dokter => (
                            <option key={dokter.kd_dokter} value={dokter.kd_dokter}>
                                {dokter.nm_dokter}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Pilih Petugas - hanya tampil untuk tab perawat atau dokter-perawat */}
            {(activeTab === 'perawat' || activeTab === 'dokter-perawat') && (
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Pilih Petugas
                    </label>
                    <select
                        value={selectedPetugas}
                        onChange={(e) => setSelectedPetugas(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                        required
                    >
                        <option value="">-- Pilih Petugas --</option>
                        {petugas.map(ptgs => (
                            <option key={ptgs.nip} value={ptgs.nip}>
                                {ptgs.nama}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Search Tindakan */}
            <div className="space-y-3">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Cari tindakan..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                    <svg className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                {/* Daftar Tindakan */}
                {searchTerm && (
                    <div className="max-h-48 overflow-y-auto border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
                        {filteredPerawatan.length > 0 ? (
                            filteredPerawatan.map(item => (
                                <div
                                    key={item.kd_jenis_prw}
                                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600 last:border-b-0 flex items-center space-x-3"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedTindakan.some(selected => selected.kd_jenis_prw === item.kd_jenis_prw)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedTindakan([...selectedTindakan, item]);
                                            } else {
                                                setSelectedTindakan(selectedTindakan.filter(selected => selected.kd_jenis_prw !== item.kd_jenis_prw));
                                            }
                                        }}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-900 dark:text-white">{item.nm_perawatan}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            {item.kd_jenis_prw} - {formatCurrency(
                        activeTab === 'dokter' ? parseFloat(item.total_byrdr) || 0 :
                        activeTab === 'perawat' ? parseFloat(item.total_byrpr) || 0 :
                        activeTab === 'dokter-perawat' ? parseFloat(item.total_byrdrpr) || 0 : 0
                    )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">Tidak ada tindakan ditemukan</div>
                        )}
                    </div>
                )}
            </div>

            {/* Selected Tindakan */}
            {selectedTindakan.length > 0 && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium text-blue-900 dark:text-blue-100">Tindakan Dipilih ({selectedTindakan.length})</h4>
                        <button
                            onClick={() => setSelectedTindakan([])}
                            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                        >
                            Hapus Semua
                        </button>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                        {selectedTindakan.map(item => (
                            <div key={item.kd_jenis_prw} className="flex justify-between items-center bg-white dark:bg-gray-800 p-2 rounded border">
                                <div className="flex-1">
                                    <div className="font-medium text-gray-900 dark:text-white text-sm">{item.nm_perawatan}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">{item.kd_jenis_prw}</div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                        {formatCurrency(
                      activeTab === 'dokter' ? parseFloat(item.total_byrdr) || 0 :
                      activeTab === 'perawat' ? parseFloat(item.total_byrpr) || 0 :
                      activeTab === 'dokter-perawat' ? parseFloat(item.total_byrdrpr) || 0 : 0
                  )}
                                    </span>
                                    <button
                                        onClick={() => setSelectedTindakan(selectedTindakan.filter(selected => selected.kd_jenis_prw !== item.kd_jenis_prw))}
                                        className="text-red-500 hover:text-red-700 text-sm"
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="pt-2 border-t border-blue-200 dark:border-blue-700 space-y-2">
                        {/* Breakdown Tarif */}
    
                        
                        {/* Total Sesuai Tab Aktif */}
                         <div className="flex justify-between items-center">
                             <div className="font-medium text-blue-900 dark:text-blue-100">
                                 Total: {formatCurrency(selectedTindakan.reduce((total, item) => {
                                     let tarif = 0;
                                     if (activeTab === 'dokter') {
                                         tarif = parseFloat(item.total_byrdr) || 0;
                                     } else if (activeTab === 'perawat') {
                                         tarif = parseFloat(item.total_byrpr) || 0;
                                     } else if (activeTab === 'dokter-perawat') {
                                         tarif = parseFloat(item.total_byrdrpr) || 0;
                                     }
                                     return total + tarif;
                                 }, 0))}
                             </div>
                             <button
                                 onClick={handleSubmitTindakan}
                                 disabled={loading}
                                 className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                             >
                                 {loading ? 'Menyimpan...' : `Simpan ${selectedTindakan.length} Tindakan`}
                             </button>
                         </div>
                     </div>
                 </div>
             )}

            {/* Riwayat Tindakan */}
            <div className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-white">Riwayat Tindakan</h4>
                {riwayatTindakan.length > 0 ? (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                        {riwayatTindakan.map((item, index) => {
                            const getBadgeColor = (jenis) => {
                                switch(jenis) {
                                    case 'dokter': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
                                    case 'perawat': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
                                    case 'dokter_perawat': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
                                    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
                                }
                            };
                            
                            const getJenisLabel = (jenis) => {
                                switch(jenis) {
                                    case 'dokter': return 'Dokter';
                                    case 'perawat': return 'Perawat';
                                    case 'dokter_perawat': return 'Dokter + Perawat';
                                    default: return 'Unknown';
                                }
                            };
                            
                            return (
                                <div key={item.id || index} className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h5 className="font-medium text-gray-900 dark:text-white">{item.nm_perawatan}</h5>
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getBadgeColor(item.jenis_tindakan)}`}>
                                                    {getJenisLabel(item.jenis_tindakan)}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Kode: {item.kd_jenis_prw}</p>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                Tarif: {formatCurrency(item.biaya_rawat)}
                                            </p>
                                            <div className="flex items-center gap-4 mt-1">
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {item.tgl_perawatan} {item.jam_rawat}
                                                </p>
                                                {item.dokter && (
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        Dr. {item.dokter.nm_dokter}
                                                    </p>
                                                )}
                                                {item.perawat && (
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {item.perawat.nama}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteTindakan(item)}
                                            className="text-red-500 hover:text-red-700 p-1"
                                            title="Hapus tindakan"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="mt-2 text-sm">Belum ada tindakan yang diinput</p>
                    </div>
                )}
            </div>
        </div>

        {/* Alert Component */}
        <Alert
            isOpen={showAlert}
            type={alertConfig.type}
            title={alertConfig.title}
            message={alertConfig.message}
            autoClose={alertConfig.autoClose}
            onClose={() => setShowAlert(false)}
        />

        {/* Confirmation Alert */}
        <ConfirmationAlert
            isOpen={showConfirmAlert}
            type="warning"
            title={confirmConfig.title}
            message={confirmConfig.message}
            confirmText="Ya, Hapus"
            cancelText="Batal"
            onConfirm={confirmConfig.onConfirm}
            onCancel={() => setShowConfirmAlert(false)}
            onClose={() => setShowConfirmAlert(false)}
        />
        </>
    );
};

export default TarifTindakan;