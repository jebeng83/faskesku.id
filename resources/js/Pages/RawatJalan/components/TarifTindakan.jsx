import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from '@/Components/Alert';
import ConfirmationAlert from '@/Components/ConfirmationAlert';
import { todayDateString, nowDateTimeString } from '@/tools/datetime';

const TarifTindakan = ({ token, noRkmMedis, noRawat, initialDokter = '', initialDokterNama = '' }) => {
    const [activeTab, setActiveTab] = useState('dokter');
    const [jnsPerawatan, setJnsPerawatan] = useState([]);
    const [filteredPerawatan, setFilteredPerawatan] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTindakan, setSelectedTindakan] = useState([]);
    const [dokters, setDokters] = useState([]);
    const [selectedDokter, setSelectedDokter] = useState(initialDokter || '');
    const [searchDokter, setSearchDokter] = useState(initialDokterNama || '');
    const [showDokterList, setShowDokterList] = useState(false);
    const [filteredDokters, setFilteredDokters] = useState([]);
    const [petugas, setPetugas] = useState([]);
    const [selectedPetugas, setSelectedPetugas] = useState('');
    const [searchPetugas, setSearchPetugas] = useState('');
    const [showPetugasList, setShowPetugasList] = useState(false);
    const [filteredPetugas, setFilteredPetugas] = useState([]);
    const [riwayatTindakan, setRiwayatTindakan] = useState([]);
    const [loading, setLoading] = useState(false);
    const [stageLoading, setStageLoading] = useState(false);
    const [postingLoading, setPostingLoading] = useState(false);
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

    // Sync with initial props
    useEffect(() => {
        if (initialDokter) {
            setSelectedDokter(initialDokter);
            if (initialDokterNama) setSearchDokter(initialDokterNama);
        }
    }, [initialDokter, initialDokterNama]);

    // Reset pilihan dokter dan petugas saat tab berubah, dan muat ulang data jenis perawatan
    useEffect(() => {
        // Reset dokter ke initial jika ada, atau kosongkan
        setSelectedDokter(initialDokter || '');
        setSearchDokter(initialDokterNama || '');
        
        setSelectedPetugas('');
        setSearchPetugas('');
        if (token) {
            loadJnsPerawatan(); // Muat ulang data dengan filter berdasarkan tab aktif
        }
    }, [activeTab, initialDokter, initialDokterNama]);

    // Filter dokter berdasarkan search
    useEffect(() => {
        if (!dokters) return;
        if (searchDokter === '') {
            setFilteredDokters(dokters);
        } else {
            setFilteredDokters(dokters.filter(d => 
                d.nm_dokter.toLowerCase().includes(searchDokter.toLowerCase()) ||
                d.kd_dokter.toLowerCase().includes(searchDokter.toLowerCase())
            ));
        }
    }, [searchDokter, dokters]);

    // Update searchDokter saat selectedDokter berubah (misal dari prop atau load awal)
    useEffect(() => {
        if (selectedDokter && dokters.length > 0) {
            const dokter = dokters.find(d => d.kd_dokter === selectedDokter);
            if (dokter) {
                setSearchDokter(dokter.nm_dokter);
            }
        }
    }, [selectedDokter, dokters]);

    // Filter petugas berdasarkan search
    useEffect(() => {
        if (!petugas) return;
        if (searchPetugas === '') {
            setFilteredPetugas(petugas);
        } else {
            setFilteredPetugas(petugas.filter(p => 
                p.nama.toLowerCase().includes(searchPetugas.toLowerCase()) ||
                p.nip.toLowerCase().includes(searchPetugas.toLowerCase())
            ));
        }
    }, [searchPetugas, petugas]);

    // Update searchPetugas saat selectedPetugas berubah
    useEffect(() => {
        if (selectedPetugas && petugas.length > 0) {
            const p = petugas.find(pt => pt.nip === selectedPetugas);
            if (p) {
                setSearchPetugas(p.nama);
            }
        }
    }, [selectedPetugas, petugas]);

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
            const currentDate = todayDateString();
            const currentTime = nowDateTimeString().split(' ')[1].substring(0, 8);

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
                // Setelah simpan tindakan berhasil, otomatis susun staging dan posting jurnal
                try {
                    setPostingLoading(true);
                    const stageRes = await axios.post('/api/tarif-tindakan/stage-ralan', {
                        token,
                        no_rawat: noRawat,
                    });

                    // Validasi staging: pastikan success, meta ada, dan balanced = true
                    if (!stageRes.data || !stageRes.data.success) {
                        const errMsg = stageRes.data?.message || 'Staging jurnal gagal. Posting dibatalkan.';
                        setAlertConfig({
                            type: 'error',
                            title: 'Staging Gagal',
                            message: errMsg,
                            autoClose: true,
                        });
                        setShowAlert(true);
                        setPostingLoading(false);
                        return;
                    }

                    if (!stageRes.data.meta || !stageRes.data.meta.balanced) {
                        const debet = stageRes.data.meta?.debet || 0;
                        const kredit = stageRes.data.meta?.kredit || 0;
                        const selisih = Math.abs(debet - kredit);
                        const errMsg = stageRes.data?.message || 
                            `Staging jurnal tidak seimbang. Debet: ${debet.toLocaleString('id-ID')}, Kredit: ${kredit.toLocaleString('id-ID')}, Selisih: ${selisih.toLocaleString('id-ID')}. Posting dibatalkan.`;
                        console.error('Staging tidak seimbang:', {
                            debet,
                            kredit,
                            selisih,
                            meta: stageRes.data.meta,
                        });
                        setAlertConfig({
                            type: 'error',
                            title: 'Staging Tidak Seimbang',
                            message: errMsg,
                            autoClose: true,
                        });
                        setShowAlert(true);
                        setPostingLoading(false);
                        return;
                    }

                    // Staging berhasil dan seimbang, lanjutkan ke posting
                    // Jalankan posting jurnal
                    try {
                        const postRes = await axios.post('/api/akutansi/jurnal/post', {
                            no_bukti: noRawat,
                            keterangan: `Posting otomatis tindakan Rawat Jalan no_rawat ${noRawat}${noRkmMedis ? ` (RM ${noRkmMedis})` : ''}`,
                            // tgl_jurnal opsional: biarkan default di backend = hari ini
                        });

                        if (postRes.status === 201 && postRes.data && postRes.data.no_jurnal) {
                            const noJurnal = postRes.data.no_jurnal;
                            setAlertConfig({
                                type: 'success',
                                title: 'Berhasil',
                                message: `${selectedTindakan.length} tindakan disimpan dan jurnal diposting (No: ${noJurnal}).`,
                                autoClose: true,
                            });
                            setShowAlert(true);
                        } else {
                            // Error dari backend (400, 500, dll)
                            const errMsg = postRes.data?.message || `Posting jurnal gagal (Status: ${postRes.status}).`;
                            console.warn('Posting jurnal gagal:', {
                                status: postRes.status,
                                data: postRes.data,
                                message: errMsg
                            });
                            setAlertConfig({
                                type: 'error',
                                title: 'Posting Gagal',
                                message: errMsg,
                                autoClose: true,
                            });
                            setShowAlert(true);
                        }
                    } catch (postError) {
                        // Network error atau parsing error
                        console.error('Auto Stage→Post error:', postError);
                        const errMsg = postError?.response?.data?.message || postError?.message || 'Gagal melakukan posting jurnal otomatis.';
                        setAlertConfig({
                            type: 'error',
                            title: 'Posting Error',
                            message: errMsg,
                            autoClose: true,
                        });
                        setShowAlert(true);
                    }
                } catch (e) {
                    console.error('Auto Stage→Post error:', e);
                    const errMsg = e?.response?.data?.message || e?.message || 'Gagal melakukan Staging/Posting jurnal otomatis.';
                    setAlertConfig({
                        type: 'error',
                        title: 'Error',
                        message: errMsg,
                        autoClose: true,
                    });
                    setShowAlert(true);
                } finally {
                    setPostingLoading(false);
                }

                // Reset pilihan dan refresh riwayat
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
                    
                    // Gunakan metode HTTP DELETE langsung dengan payload di body
                    // Laravel route: Route::delete('/api/tarif-tindakan', deleteTindakan)
                    // axios mendukung body pada DELETE melalui opsi { data }
                    await axios.delete('/api/tarif-tindakan', {
                        data: deleteData,
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

    // Susun staging jurnal tindakan Rawat Jalan (Umum) ke tampjurnal2
    const handleStageJurnalRalan = async () => {
        try {
            setStageLoading(true);
            const response = await axios.post('/api/tarif-tindakan/stage-ralan', {
                token,
                no_rawat: noRawat,
            });

            if (response.data && response.data.success) {
                const meta = response.data.meta || {};
                const message = `Staging jurnal berhasil disusun. Debet: ${new Intl.NumberFormat('id-ID').format(meta.debet || 0)}, Kredit: ${new Intl.NumberFormat('id-ID').format(meta.kredit || 0)}, Baris: ${meta.lines || 0}. ${meta.balanced ? 'Seimbang.' : 'Tidak seimbang!'} `;
                setAlertConfig({
                    type: 'success',
                    title: 'Staging Berhasil',
                    message,
                    autoClose: true,
                });
                setShowAlert(true);
            } else {
                const errMsg = response.data?.message || 'Gagal menyusun staging jurnal';
                setAlertConfig({
                    type: 'error',
                    title: 'Error',
                    message: errMsg,
                    autoClose: true,
                });
                setShowAlert(true);
            }
        } catch (error) {
            console.error('Error staging jurnal ralan:', error);
            const errMsg = error.response?.data?.message || error.message || 'Gagal menyusun staging jurnal';
            setAlertConfig({
                type: 'error',
                title: 'Error',
                message: errMsg,
                autoClose: true,
            });
            setShowAlert(true);
        } finally {
            setStageLoading(false);
        }
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
        <div className="space-y-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-4 md:p-6">
            {/* Staging Jurnal Rawat Jalan (Umum) */}
            <div className="flex justify-end">
                <button
                    onClick={handleStageJurnalRalan}
                    disabled={stageLoading}
                    className="px-4 py-2 bg-indigo-600 text-white text-xs font-medium rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {stageLoading ? 'Menyusun...' : 'Susun Staging Jurnal (Ralan Umum)'}
                </button>
            </div>
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
                {[
                    { key: 'dokter', label: 'Dokter', color: 'blue' },
                    { key: 'perawat', label: 'Perawat', color: 'green' },
                    { key: 'dokter-perawat', label: 'Dokter + Perawat', color: 'purple' }
                ].map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                            activeTab === tab.key
                                ? `border-${tab.color}-600 text-${tab.color}-600 dark:border-${tab.color}-400 dark:text-${tab.color}-400`
                                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Pilih Dokter - hanya tampil untuk tab dokter atau dokter-perawat */}
            {(activeTab === 'dokter' || activeTab === 'dokter-perawat') && (
                <div className="space-y-2 relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Pilih Dokter
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={searchDokter}
                            onChange={(e) => {
                                setSearchDokter(e.target.value);
                                setSelectedDokter(''); // Clear selection when typing
                                setShowDokterList(true);
                            }}
                            onFocus={() => setShowDokterList(true)}
                            onBlur={() => setTimeout(() => setShowDokterList(false), 200)} // Delay to allow click
                            className="w-full py-2.5 px-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                            placeholder="Ketik nama dokter untuk mencari..."
                            required={!selectedDokter}
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            {selectedDokter ? (
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            )}
                        </div>
                    </div>

                    {/* Dropdown List */}
                    {showDokterList && (
                        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {filteredDokters.length > 0 ? (
                                filteredDokters.map(dokter => (
                                    <div
                                        key={dokter.kd_dokter}
                                        onClick={() => {
                                            setSelectedDokter(dokter.kd_dokter);
                                            setSearchDokter(dokter.nm_dokter);
                                            setShowDokterList(false);
                                        }}
                                        className="px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-0"
                                    >
                                        <div className="font-medium text-gray-900 dark:text-white">{dokter.nm_dokter}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">{dokter.kd_dokter}</div>
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                                    Dokter tidak ditemukan
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Pilih Petugas - hanya tampil untuk tab perawat atau dokter-perawat */}
            {(activeTab === 'perawat' || activeTab === 'dokter-perawat') && (
                <div className="space-y-2 relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Pilih Petugas
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={searchPetugas}
                            onChange={(e) => {
                                setSearchPetugas(e.target.value);
                                setSelectedPetugas(''); // Clear selection when typing
                                setShowPetugasList(true);
                            }}
                            onFocus={() => setShowPetugasList(true)}
                            onBlur={() => setTimeout(() => setShowPetugasList(false), 200)}
                            className="w-full py-2.5 px-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                            placeholder="Ketik nama petugas untuk mencari..."
                            required={!selectedPetugas}
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            {selectedPetugas ? (
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            )}
                        </div>
                    </div>

                    {/* Dropdown List */}
                    {showPetugasList && (
                        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {filteredPetugas.length > 0 ? (
                                filteredPetugas.map(ptgs => (
                                    <div
                                        key={ptgs.nip}
                                        onClick={() => {
                                            setSelectedPetugas(ptgs.nip);
                                            setSearchPetugas(ptgs.nama);
                                            setShowPetugasList(false);
                                        }}
                                        className="px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-0"
                                    >
                                        <div className="font-medium text-gray-900 dark:text-white">{ptgs.nama}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">{ptgs.nip}</div>
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                                    Petugas tidak ditemukan
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Main Action Area Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Left Card: Search & Available Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col h-[600px]">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3 bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-800 rounded-t-xl">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">Cari Tindakan</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Cari dan pilih tindakan medis</p>
                        </div>
                    </div>
                    
                    <div className="p-4 flex-1 flex flex-col overflow-hidden">
                        <div className="relative mb-4">
                            <input
                                type="text"
                                placeholder="Ketik nama tindakan..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-all"
                            />
                            <svg className="absolute left-3 top-3 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                            {filteredPerawatan.length > 0 ? (
                                <div className="space-y-2">
                                    {filteredPerawatan.map(item => {
                                        const isSelected = selectedTindakan.some(selected => selected.kd_jenis_prw === item.kd_jenis_prw);
                                        return (
                                            <div
                                                key={item.kd_jenis_prw}
                                                onClick={() => {
                                                    if (!isSelected) {
                                                        setSelectedTindakan([...selectedTindakan, item]);
                                                    } else {
                                                        setSelectedTindakan(selectedTindakan.filter(selected => selected.kd_jenis_prw !== item.kd_jenis_prw));
                                                    }
                                                }}
                                                className={`w-full p-3 text-left rounded-lg border transition-all cursor-pointer flex items-center gap-3 group ${
                                                    isSelected 
                                                        ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800' 
                                                        : 'bg-white border-gray-100 hover:border-blue-300 hover:shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600'
                                                }`}
                                            >
                                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                                                    isSelected
                                                        ? 'bg-blue-600 border-blue-600'
                                                        : 'border-gray-300 bg-white group-hover:border-blue-400'
                                                }`}>
                                                    {isSelected && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-medium text-gray-900 dark:text-white text-sm truncate">{item.nm_perawatan}</div>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">{item.kd_jenis_prw}</span>
                                                        <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                                                            {formatCurrency(
                                                                activeTab === 'dokter' ? parseFloat(item.total_byrdr) || 0 :
                                                                activeTab === 'perawat' ? parseFloat(item.total_byrpr) || 0 :
                                                                activeTab === 'dokter-perawat' ? parseFloat(item.total_byrdrpr) || 0 : 0
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                    <svg className="w-12 h-12 mb-3 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-sm">
                                        {searchTerm ? 'Tindakan tidak ditemukan' : 'Belum ada data tindakan'}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Card: Selected Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col h-[600px]">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between bg-gradient-to-r from-green-50 to-white dark:from-gray-800 dark:to-gray-800 rounded-t-xl">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">Tindakan Dipilih</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Daftar tindakan yang akan disimpan</p>
                            </div>
                        </div>
                        {selectedTindakan.length > 0 && (
                            <button
                                onClick={() => setSelectedTindakan([])}
                                className="text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 transition-colors"
                            >
                                Hapus Semua
                            </button>
                        )}
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                        {selectedTindakan.length > 0 ? (
                            <div className="space-y-3">
                                {selectedTindakan.map((item, index) => (
                                    <div key={`${item.kd_jenis_prw}-${index}`} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-600 group hover:border-blue-200 transition-colors">
                                        <div className="flex-1 min-w-0 mr-4">
                                            <div className="font-medium text-gray-900 dark:text-white text-sm truncate">{item.nm_perawatan}</div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-600 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-500">{item.kd_jenis_prw}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-bold text-gray-900 dark:text-white">
                                                {formatCurrency(
                                                    activeTab === 'dokter' ? parseFloat(item.total_byrdr) || 0 :
                                                    activeTab === 'perawat' ? parseFloat(item.total_byrpr) || 0 :
                                                    activeTab === 'dokter-perawat' ? parseFloat(item.total_byrdrpr) || 0 : 0
                                                )}
                                            </div>
                                            <button
                                                onClick={() => setSelectedTindakan(selectedTindakan.filter(selected => selected.kd_jenis_prw !== item.kd_jenis_prw))}
                                                className="text-xs text-red-500 hover:text-red-700 mt-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end gap-1 ml-auto"
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                </div>
                                <p className="text-sm font-medium text-gray-500">Belum ada tindakan dipilih</p>
                                <p className="text-xs text-gray-400 mt-1 text-center max-w-[200px]">Cari dan klik tindakan di sebelah kiri untuk menambahkan</p>
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
                         <div className="flex justify-between items-center mb-4">
                             <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                 Total Biaya
                             </div>
                             <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                                 {formatCurrency(selectedTindakan.reduce((total, item) => {
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
                         </div>
                         <button
                             onClick={handleSubmitTindakan}
                             disabled={loading || postingLoading || selectedTindakan.length === 0}
                             className="w-full py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2"
                         >
                             {loading || postingLoading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Memproses...</span>
                                </>
                             ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                    </svg>
                                    <span>Simpan {selectedTindakan.length > 0 ? `${selectedTindakan.length} Tindakan` : ''}</span>
                                </>
                             )}
                         </button>
                     </div>
                 </div>
            </div>

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
