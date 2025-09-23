import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Resep({ token = '', noRkmMedis = '', noRawat = '', kdPoli = '' }) {
    const [items, setItems] = useState([
        { id: 1, kodeObat: '', namaObat: '', aturanPakai: '', jumlah: 0, satuan: '', stokTersedia: 0, harga: 0 },
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [obatOptions, setObatOptions] = useState([]);
    const [searchObat, setSearchObat] = useState({});
    const [loadingObat, setLoadingObat] = useState(false);
    const [showDropdown, setShowDropdown] = useState({});
    const [savedResep, setSavedResep] = useState(null);
    const [showSavedResep, setShowSavedResep] = useState(false);
    const [dokterOptions, setDokterOptions] = useState([]);
    const [selectedDokter, setSelectedDokter] = useState('');
    const [loadingDokter, setLoadingDokter] = useState(false);
    const [riwayatResep, setRiwayatResep] = useState([]);
    const [showRiwayatResep, setShowRiwayatResep] = useState(true);
    const [loadingRiwayat, setLoadingRiwayat] = useState(false);
    const [deletingResep, setDeletingResep] = useState(null);
    const [hasMoreResep, setHasMoreResep] = useState(false);
    const [nextOffset, setNextOffset] = useState(null);
    const [loadingMore, setLoadingMore] = useState(false);

    // Fetch obat dari API dengan validasi stok yang lebih baik
    const fetchObat = async (search = '') => {
        if (!kdPoli) {
            return;
        }
        
        setLoadingObat(true);
        try {
            const response = await axios.get('/api/obat', {
                params: {
                    kd_poli: kdPoli,
                    search: search,
                    limit: 20
                }
            });
            
            if (response.data.success) {
                // Tidak filter berdasarkan status dan stok untuk debugging
                setObatOptions(response.data.data);
            } else {
                setObatOptions([]);
            }
        } catch (error) {
            console.error('Error fetching obat:', error);
            setObatOptions([]);
        } finally {
            setLoadingObat(false);
        }
    };

    // Fungsi untuk mendapatkan info stok detail obat
    const getStokInfo = async (kodeBrng) => {
        try {
            const response = await axios.get('/api/resep/stok-info', {
                params: { 
                    kode_brng: kodeBrng,
                    kd_poli: kdPoli
                }
            });
            
            if (response.data.success) {
                return response.data.data;
            }
            return null;
        } catch (error) {
            console.error('Error getting stok info:', error);
            return null;
        }
    };

    // Fetch dokter dari API
    const fetchDokter = async () => {
        setLoadingDokter(true);
        try {
            const response = await axios.get('/api/dokter');
            
            if (response.data.success) {
                // Filter dokter yang bukan "-" (placeholder)
                const validDokters = response.data.data.filter(dokter => dokter.kd_dokter !== '-');
                setDokterOptions(validDokters);
                
                // Set dokter pertama sebagai default jika belum ada yang dipilih
                if (!selectedDokter && validDokters.length > 0) {
                    setSelectedDokter(validDokters[0].kd_dokter);
                }
            } else {
                setDokterOptions([]);
            }
        } catch (error) {
            console.error('Error fetching dokter:', error);
            setDokterOptions([]);
        } finally {
            setLoadingDokter(false);
        }
    };

    // Load obat saat komponen dimount atau kdPoli berubah
    useEffect(() => {
        if (kdPoli) {
            fetchObat();
        }
    }, [kdPoli]);

    // Load dokter saat komponen dimount
    useEffect(() => {
        fetchDokter();
    }, []);

    // Load riwayat resep saat komponen dimount atau noRawat berubah
    useEffect(() => {
        fetchRiwayatResep();
    }, [noRawat]);

    // Debounce search - simplified approach
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            // Ambil search term dari item yang sedang aktif
            const activeSearchTerms = Object.values(searchObat).filter(term => term && term.length > 0);
            if (activeSearchTerms.length > 0) {
                const latestSearch = activeSearchTerms[activeSearchTerms.length - 1];
                if (latestSearch.length >= 2) {
                    fetchObat(latestSearch);
                } else if (latestSearch.length === 1) {
                    // Jangan fetch jika hanya 1 karakter
                    return;
                }
            } else {
                // Load semua obat jika tidak ada search
                fetchObat();
            }
        }, 300);
        
        return () => clearTimeout(timeoutId);
    }, [searchObat]);
    
    // Load obat saat dropdown dibuka
    useEffect(() => {
        const hasActiveDropdown = Object.values(showDropdown).some(show => show);
        if (hasActiveDropdown && obatOptions.length === 0) {
            fetchObat();
        }
    }, [showDropdown]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown-container')) {
                setShowDropdown({});
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const addItem = () => {
        setItems((prev) => [...prev, { id: Date.now(), kodeObat: '', namaObat: '', aturanPakai: '', jumlah: 0, satuan: '', stokTersedia: 0, harga: 0 }]);
    };

    const removeItem = (id) => {
        setItems((prev) => prev.filter((it) => it.id !== id));
    };

    const updateItem = (id, key, value) => {
        setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [key]: value } : it)));
    };

    // Handle pemilihan obat dari dropdown dengan validasi stok yang lebih detail
    const selectObat = async (itemId, obat) => {
        // Dapatkan info stok detail
        const stokInfo = await getStokInfo(obat.kode_brng);
        
        setItems((prev) => prev.map((it) => 
            it.id === itemId ? {
                ...it,
                kodeObat: obat.kode_brng,
                namaObat: obat.nama_brng,
                satuan: obat.kode_satbesar,
                stokTersedia: stokInfo ? stokInfo.total_stok : obat.total_stok,
                harga: stokInfo ? stokInfo.harga_ralan : (obat.ralan || 0),
                stokDetail: stokInfo ? stokInfo.stok_per_bangsal : [],
                batchDetail: stokInfo ? stokInfo.batch_detail : []
            } : it
        ));
        setShowDropdown(prev => ({ ...prev, [itemId]: false }));
    };

    // Fungsi untuk mengambil data resep yang sudah disimpan
    const fetchSavedResep = async (noResep) => {
        try {
            const response = await axios.get(`/api/resep/${noResep}`);
            if (response.data.success) {
                setSavedResep(response.data.data);
                setShowSavedResep(true);
            }
        } catch (error) {
            console.error('Error fetching saved resep:', error);
        }
    };

    // Fungsi untuk mengambil riwayat resep berdasarkan no_rkm_medis dengan pagination
    const fetchRiwayatResep = async (reset = true) => {
        if (!noRkmMedis) {
            console.log('fetchRiwayatResep: noRkmMedis kosong');
            return;
        }
        
        console.log('fetchRiwayatResep: mulai fetch dengan noRkmMedis:', noRkmMedis);
        setLoadingRiwayat(true);
        try {
            // Encode no_rkm_medis untuk menangani karakter khusus
            const encodedNoRkmMedis = encodeURIComponent(noRkmMedis);
            console.log('fetchRiwayatResep: encodedNoRkmMedis:', encodedNoRkmMedis);
            
            // Fetch dengan limit 5 untuk loading awal
            const response = await axios.get(`/api/resep/pasien/${encodedNoRkmMedis}`, {
                params: {
                    limit: 5,
                    offset: 0
                }
            });
            
            console.log('fetchRiwayatResep: response:', response.data);
            if (response.data.success) {
                const resepData = response.data.data;
                
                if (reset) {
                    setRiwayatResep(resepData);
                } else {
                    setRiwayatResep(prev => [...prev, ...resepData]);
                }
                
                // Set pagination info
                setHasMoreResep(response.data.has_more);
                setNextOffset(response.data.next_offset);
                
                console.log('fetchRiwayatResep: data berhasil diset:', resepData);
                console.log('fetchRiwayatResep: has_more:', response.data.has_more);
            } else {
                setRiwayatResep([]);
                setHasMoreResep(false);
                setNextOffset(null);
                console.log('fetchRiwayatResep: response tidak success');
            }
        } catch (error) {
            console.error('Error fetching riwayat resep:', error);
            setRiwayatResep([]);
            setHasMoreResep(false);
            setNextOffset(null);
        } finally {
            setLoadingRiwayat(false);
        }
    };

    // Fungsi untuk load more resep
    const loadMoreResep = async () => {
        if (!noRkmMedis || !hasMoreResep || !nextOffset || loadingMore) {
            return;
        }
        
        console.log('loadMoreResep: mulai load more dengan offset:', nextOffset);
        setLoadingMore(true);
        try {
            const encodedNoRkmMedis = encodeURIComponent(noRkmMedis);
            const response = await axios.get(`/api/resep/pasien/${encodedNoRkmMedis}`, {
                params: {
                    limit: 5,
                    offset: nextOffset
                }
            });
            
            console.log('loadMoreResep: response:', response.data);
            if (response.data.success) {
                const newResepData = response.data.data;
                
                // Append data baru ke existing data
                setRiwayatResep(prev => [...prev, ...newResepData]);
                
                // Update pagination info
                setHasMoreResep(response.data.has_more);
                setNextOffset(response.data.next_offset);
                
                console.log('loadMoreResep: data baru berhasil ditambahkan:', newResepData);
            }
        } catch (error) {
            console.error('Error loading more resep:', error);
        } finally {
            setLoadingMore(false);
        }
    };

    // Hapus resep berdasarkan no_rawat, tanggal dan jam
    const deleteResep = async (resep) => {
        const deleteInfo = `Resep tanggal ${new Date(resep.tgl_peresepan).toLocaleDateString('id-ID')} ${resep.jam_peresepan}`;
        if (!confirm(`Apakah Anda yakin ingin menghapus ${deleteInfo}?`)) {
            return;
        }

        const deleteKey = `${resep.tgl_peresepan}_${resep.jam_peresepan}`;
        setDeletingResep(deleteKey);
        try {
            const response = await axios.delete(`/api/resep/${resep.no_resep}`);
            
            if (response.data.success) {
                alert('Resep berhasil dihapus');
                // Refresh riwayat resep
                await fetchRiwayatResep();
            } else {
                alert('Gagal menghapus resep: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error deleting resep:', error);
            alert('Terjadi kesalahan saat menghapus resep');
        } finally {
            setDeletingResep(null);
        }
    };

    // Cek stok obat
    const cekStokObat = async (kodeObat, jumlah) => {
        if (!kodeObat || !kdPoli) return false;
        
        try {
            const response = await axios.post('/api/obat/cek-stok', {
                kode_brng: kodeObat,
                kd_poli: kdPoli,
                jumlah: jumlah
            });
            
            return response.data.success ? response.data.data.tersedia : false;
        } catch (error) {
            console.error('Error checking stock:', error);
            return false;
        }
    };

    // Validasi sebelum submit
    const validateForm = async () => {
        for (const item of items) {
            if (!item.kodeObat || !item.namaObat) {
                alert('Semua obat harus dipilih');
                return false;
            }
            if (item.jumlah <= 0) {
                alert('Jumlah obat harus lebih dari 0');
                return false;
            }
            if (!item.aturanPakai.trim()) {
                alert('Aturan pakai harus diisi');
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const isValid = await validateForm();
        if (!isValid) {
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            // Siapkan data resep untuk dikirim ke API
            const resepData = {
                no_rawat: noRawat,
                kd_poli: kdPoli,
                kd_dokter: selectedDokter,
                items: items.filter(item => item.kodeObat && item.jumlah > 0).map(item => ({
                    kode_brng: item.kodeObat,
                    jml: parseFloat(item.jumlah),
                    aturan_pakai: item.aturanPakai || ''
                }))
            };
            
            // Kirim data ke API
            const response = await axios.post('/api/resep', resepData);
            
            if (response.data.success) {
                const noResep = response.data.data.no_resep;
                // Reset form setelah berhasil
                setItems([{ id: 1, kodeObat: '', namaObat: '', aturanPakai: '', jumlah: 0, satuan: '', stokTersedia: 0, harga: 0 }]);
                alert(`Resep berhasil disimpan dengan nomor: ${noResep}`);
                // Ambil dan tampilkan data resep yang baru disimpan
                await fetchSavedResep(noResep);
                // Refresh riwayat resep
                await fetchRiwayatResep();
                // Refresh obat list untuk update stok
                if (kdPoli) {
                    fetchObat();
                }
            } else {
                alert('Gagal menyimpan resep: ' + (response.data.message || 'Terjadi kesalahan'));
            }
        } catch (error) {
            console.error('Error submitting resep:', error);
            if (error.response?.data?.message) {
                alert('Error: ' + error.response.data.message);
            } else {
                alert('Terjadi kesalahan saat menyimpan resep');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="px-4 md:px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Resep Obat</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Kelola resep obat untuk pasien dengan validasi stok otomatis</p>
                        </div>
                    </div>

                </div>
            </div>
            <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-6">
                {/* Pemilihan Dokter */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Dokter Penanggung Jawab
                    </label>
                    <select 
                        value={selectedDokter} 
                        onChange={(e) => setSelectedDokter(e.target.value)}
                        className="w-full py-2.5 px-3 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                        disabled={loadingDokter}
                    >
                        {loadingDokter ? (
                            <option value="">Memuat dokter...</option>
                        ) : (
                            <>
                                <option value="">Pilih Dokter</option>
                                {dokterOptions.map((dokter) => (
                                    <option key={dokter.kd_dokter} value={dokter.kd_dokter}>
                                        {dokter.nm_dokter}
                                    </option>
                                ))}
                            </>
                        )}
                    </select>
                </div>
                
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                            Daftar Obat Resep
                        </h4>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            {items.length} obat
                        </span>
                    </div>
                    {items.map((item, index) => (
                        <div key={item.id} className="bg-gray-50 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-600 rounded-lg p-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 text-xs font-medium">
                                        {index + 1}
                                    </span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">Obat #{index + 1}</span>
                                    {item.kodeObat && (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                            {item.kodeObat}
                                        </span>
                                    )}
                                </div>
                                {items.length > 1 && (
                                    <button 
                                        type="button" 
                                        onClick={() => removeItem(item.id)} 
                                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50 transition-colors"
                                        title="Hapus obat"
                                    >
                                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Hapus
                                    </button>
                                )}
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                                <div className="lg:col-span-2 relative dropdown-container">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                        Nama Obat
                                    </label>
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            value={item.namaObat} 
                                            onChange={(e) => {
                                                updateItem(item.id, 'namaObat', e.target.value);
                                                setSearchObat(prev => ({ ...prev, [item.id]: e.target.value }));
                                                setShowDropdown(prev => ({ ...prev, [item.id]: true }));
                                            }}
                                            onFocus={() => {
                                                setShowDropdown(prev => ({ ...prev, [item.id]: true }));
                                                if (!searchObat[item.id] && kdPoli) {
                                                    fetchObat();
                                                }
                                            }}
                                            className="w-full py-2.5 px-3 pr-10 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" 
                                            placeholder="Ketik untuk mencari obat..." 
                                            required
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                
                                    {/* Dropdown Autocomplete */}
                                    {showDropdown[item.id] && (
                                        <div className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                                            {loadingObat && (
                                                <div className="p-3 text-center text-gray-500 dark:text-gray-400 flex items-center justify-center">
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Mencari obat...
                                                </div>
                                            )}
                                            {!loadingObat && obatOptions.length === 0 && (
                                                <div className="p-3 text-center text-gray-500 dark:text-gray-400">
                                                    <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                    {!kdPoli ? 'Data poli tidak tersedia' : 
                                                     searchObat[item.id] && searchObat[item.id].length >= 2 ? 'Obat tidak ditemukan' : 
                                                     searchObat[item.id] && searchObat[item.id].length === 1 ? 'Ketik minimal 2 karakter untuk mencari' :
                                                     'Ketik untuk mencari obat atau klik untuk melihat semua'}
                                                </div>
                                            )}
                                            {!loadingObat && obatOptions.length > 0 && obatOptions.map((obat) => (
                                                <div
                                                    key={obat.kode_brng}
                                                    className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b dark:border-gray-600 last:border-b-0 transition-colors"
                                                    onClick={() => selectObat(item.id, obat)}
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <div className="font-medium text-gray-900 dark:text-white text-sm">{obat.nama_brng}</div>
                                                            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                                                                <div className="flex items-center space-x-4">
                                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                                                        {obat.kode_brng}
                                                                    </span>
                                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                                                        obat.total_stok > 0 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                                                    }`}>
                                                                        Stok: {obat.total_stok} {obat.kode_satbesar}
                                                                    </span>
                                                                </div>
                                                                {obat.ralan && (
                                                                    <div className="text-blue-600 dark:text-blue-400 font-medium">
                                                                        Rp {obat.ralan.toLocaleString('id-ID')}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    
                                    {/* Info stok */}
                                    {item.stokTersedia > 0 && (
                                        <div className="flex items-center mt-2 text-xs text-green-600 dark:text-green-400">
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Stok tersedia: {item.stokTersedia} {item.satuan}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Aturan Pakai
                                    </label>
                                    <input 
                                        type="text" 
                                        value={item.aturanPakai} 
                                        onChange={(e) => updateItem(item.id, 'aturanPakai', e.target.value)} 
                                        className="w-full py-2.5 px-3 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" 
                                        placeholder="Contoh: 3x1 sesudah makan, 2x1 pagi dan malam" 
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                        </svg>
                                        Jumlah
                                    </label>
                                    <input 
                                        type="number" 
                                        min="1" 
                                        value={item.jumlah} 
                                        onChange={(e) => {
                                            const jumlah = parseInt(e.target.value) || 0;
                                            updateItem(item.id, 'jumlah', jumlah);
                                        }}
                                        className={`w-full py-2.5 px-3 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 transition-colors ${
                                            item.jumlah > item.stokTersedia && item.stokTersedia > 0 
                                                ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50 dark:bg-red-900/20' 
                                                : 'focus:ring-green-500 focus:border-green-500'
                                        }`}
                                        max={item.stokTersedia || undefined}
                                        required
                                    />
                                    {item.jumlah > item.stokTersedia && item.stokTersedia > 0 && (
                                        <div className="flex items-center mt-1 text-xs text-red-600 dark:text-red-400">
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                            </svg>
                                            Melebihi stok tersedia!
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                        Satuan
                                    </label>
                                    <input 
                                        type="text" 
                                        value={item.satuan} 
                                        onChange={(e) => updateItem(item.id, 'satuan', e.target.value)} 
                                        className="w-full py-2.5 px-3 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" 
                                        placeholder="tablet, botol, kapsul, dll"
                                        readOnly={item.kodeObat ? true : false}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <button 
                        type="button" 
                        onClick={addItem} 
                        className="inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Tambah Obat
                    </button>
                    <button 
                        type="submit" 
                        disabled={isSubmitting || items.length === 0}
                        className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Menyimpan...
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                </svg>
                                Simpan Resep
                            </>
                        )}
                    </button>
                </div>
            </form>

            {/* Tampilan Riwayat Resep */}
            {showRiwayatResep && (
                <div className="mt-6 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
                            <svg className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Riwayat Resep
                        </h3>
                    </div>
                    
                    {loadingRiwayat ? (
                        <div className="flex items-center justify-center py-8">
                            <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className="ml-2 text-gray-600 dark:text-gray-400">Memuat riwayat resep...</span>
                        </div>
                    ) : riwayatResep.length === 0 ? (
                        <div className="text-center py-8">
                            <svg className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="text-gray-500 dark:text-gray-400">Belum ada riwayat resep untuk pasien ini</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {riwayatResep.map((resep, index) => (
                                <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                                            <div>
                                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">No. Resep:</span>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white">{resep.no_resep}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Tanggal:</span>
                                                <p className="text-sm text-gray-900 dark:text-white">
                                                    {new Date(resep.tgl_peresepan).toLocaleDateString('id-ID')} {resep.jam_peresepan}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Dokter:</span>
                                                <p className="text-sm text-gray-900 dark:text-white">{resep.nama_dokter || 'Tidak diketahui'}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => deleteResep(resep)}
                                            disabled={deletingResep === `${resep.tgl_peresepan}_${resep.jam_peresepan}`}
                                            className="ml-4 px-3 py-1 text-sm bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white rounded-md transition-colors duration-200 flex items-center gap-1"
                                            title="Hapus Resep"
                                        >
                                            {deletingResep === `${resep.tgl_peresepan}_${resep.jam_peresepan}` ? (
                                                <>
                                                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Menghapus...
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    Hapus
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    
                                    {resep.detail_obat && resep.detail_obat.length > 0 && (
                                        <div>
                                            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Obat yang diresepkan:</h5>
                                            <div className="overflow-x-auto">
                                                <table className="min-w-full text-sm">
                                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                                        <tr>
                                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Obat</th>
                                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Aturan Pakai</th>
                                                            <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Jumlah</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                                                        {resep.detail_obat.map((obat, obatIndex) => (
                                                            <tr key={obatIndex}>
                                                                <td className="px-3 py-2 text-sm text-gray-900 dark:text-white">
                                                                    <div>
                                                                        <div className="font-medium">{obat.nama_brng || obat.kode_brng}</div>
                                                                        <div className="text-xs text-gray-500 dark:text-gray-400">{obat.kode_brng}</div>
                                                                    </div>
                                                                </td>
                                                                <td className="px-3 py-2 text-sm text-gray-900 dark:text-white">{obat.aturan_pakai}</td>
                                                                <td className="px-3 py-2 text-sm text-gray-900 dark:text-white text-center">{obat.jml}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {/* Tombol Load More */}
                    {hasMoreResep && (
                        <div className="mt-4 text-center">
                            <button
                                onClick={loadMoreResep}
                                disabled={loadingMore}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors duration-200 flex items-center justify-center mx-auto gap-2"
                            >
                                {loadingMore ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Memuat...
                                    </>
                                ) : (
                                    <>
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                        Muat Lebih Banyak
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Tampilan Data Resep yang Sudah Disimpan */}
            {showSavedResep && savedResep && (
                <div className="mt-6 bg-gray-50 p-4 rounded-lg border">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Data Resep Tersimpan</h3>
                        <button
                            onClick={() => setShowSavedResep(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>
                    
                    <div className="bg-white p-4 rounded border">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <strong>No. Resep:</strong> {savedResep.no_resep}
                            </div>
                            <div>
                                <strong>Tanggal:</strong> {new Date(savedResep.tgl_peresepan).toLocaleDateString('id-ID')}
                            </div>
                            <div>
                                <strong>Jam:</strong> {savedResep.jam_peresepan}
                            </div>
                            <div>
                                <strong>No. Rawat:</strong> {savedResep.no_rawat}
                            </div>
                            <div>
                                <strong>Dokter:</strong> {savedResep.nama_dokter || 'Dokter tidak ditemukan'}
                            </div>
                            <div>
                                <strong>Status:</strong> {savedResep.status}
                            </div>
                        </div>
                        
                        <h4 className="font-semibold mb-3">Detail Obat:</h4>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-300">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border border-gray-300 px-3 py-2 text-left">Kode Obat</th>
                                        <th className="border border-gray-300 px-3 py-2 text-left">Nama Obat</th>
                                        <th className="border border-gray-300 px-3 py-2 text-left">Aturan Pakai</th>
                                        <th className="border border-gray-300 px-3 py-2 text-center">Jumlah</th>
                                        <th className="border border-gray-300 px-3 py-2 text-right">Harga</th>
                                        <th className="border border-gray-300 px-3 py-2 text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {savedResep.detail_obat && savedResep.detail_obat.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="border border-gray-300 px-3 py-2">{item.kode_brng}</td>
                                            <td className="border border-gray-300 px-3 py-2">{item.nama_brng || '-'}</td>
                                            <td className="border border-gray-300 px-3 py-2">{item.aturan_pakai}</td>
                                            <td className="border border-gray-300 px-3 py-2 text-center">{item.jml} {item.satuan}</td>
                                            <td className="border border-gray-300 px-3 py-2 text-right">
                                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.harga || 0)}
                                            </td>
                                            <td className="border border-gray-300 px-3 py-2 text-right">
                                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format((item.jml || 0) * (item.harga || 0))}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="bg-gray-100">
                                    <tr>
                                        <td colSpan="5" className="border border-gray-300 px-3 py-2 text-right font-semibold">
                                            Total Keseluruhan:
                                        </td>
                                        <td className="border border-gray-300 px-3 py-2 text-right font-semibold">
                                            {savedResep.detail_obat && new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                                                savedResep.detail_obat.reduce((total, item) => total + ((item.jml || 0) * (item.harga || 0)), 0)
                                            )}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


