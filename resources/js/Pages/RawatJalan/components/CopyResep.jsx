import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CopyResep({ 
    isOpen, 
    onClose, 
    resepData, 
    token: _token = '', 
    noRkmMedis: _noRkmMedis = '', 
    noRawat = '', 
    kdPoli = '',
    onResepSaved = () => {} 
}) {
    const [items, setItems] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [obatOptions, setObatOptions] = useState([]);
    const [searchObat, setSearchObat] = useState({});
    const [, setLoadingObat] = useState(false);
    const [showDropdown, setShowDropdown] = useState({});
    const [dokterOptions, setDokterOptions] = useState([]);
    const [selectedDokter, setSelectedDokter] = useState('');
    const [, setLoadingDokter] = useState(false);

    // Initialize items from resep data when modal opens
    useEffect(() => {
        if (isOpen && resepData && resepData.detail_obat) {
            const copiedItems = resepData.detail_obat.map((obat, index) => ({
                id: Date.now() + index,
                kodeObat: obat.kode_brng || '',
                namaObat: obat.nama_brng || '',
                aturanPakai: obat.aturan_pakai || '',
                jumlah: obat.jml || '',
                satuan: obat.kode_satbesar || '',
                stokTersedia: 0,
                harga: 0
            }));
            setItems(copiedItems);
            setSelectedDokter(resepData.kd_dokter || '');
        }
    }, [isOpen, resepData]);

    // Fetch obat dari API
    const fetchObat = async (search = '') => {
        if (!kdPoli) return;
        
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

    // Fetch dokter dari API
    const fetchDokter = async () => {
        setLoadingDokter(true);
        try {
            const response = await axios.get('/api/dokter');
            
            if (response.data.success) {
                const validDokters = response.data.data.filter(dokter => dokter.kd_dokter !== '-');
                setDokterOptions(validDokters);
                
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

    // Get stok info for obat
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

    // Handle search obat
    const handleSearchObat = (itemId, value) => {
        setSearchObat(prev => ({ ...prev, [itemId]: value }));
        
        // Update nama obat di item
        setItems(prev => prev.map(item => 
            item.id === itemId ? { ...item, namaObat: value, kodeObat: '' } : item
        ));
        
        if (value.length >= 2) {
            fetchObat(value);
            setShowDropdown(prev => ({ ...prev, [itemId]: true }));
        } else {
            setShowDropdown(prev => ({ ...prev, [itemId]: false }));
        }
    };

    // Handle pemilihan obat dari dropdown
    const selectObat = async (itemId, obat) => {
        const stokInfo = await getStokInfo(obat.kode_brng);
        
        setItems(prev => prev.map(item => 
            item.id === itemId ? {
                ...item,
                kodeObat: obat.kode_brng,
                namaObat: obat.nama_brng,
                satuan: obat.kode_satbesar,
                aturanPakai: item.aturanPakai,
                jumlah: item.jumlah,
                stokTersedia: stokInfo ? stokInfo.total_stok : obat.total_stok,
                harga: stokInfo ? stokInfo.harga_ralan : (obat.ralan || 0),
                stokDetail: stokInfo ? stokInfo.stok_per_bangsal : [],
                batchDetail: stokInfo ? stokInfo.batch_detail : []
            } : item
        ));
        setShowDropdown(prev => ({ ...prev, [itemId]: false }));
        setSearchObat(prev => ({ ...prev, [itemId]: obat.nama_brng }));
    };

    // Add new item
    const addItem = () => {
        const newItem = {
            id: Date.now(),
            kodeObat: '',
            namaObat: '',
            aturanPakai: '',
            jumlah: '',
            satuan: '',
            stokTersedia: 0,
            harga: 0
        };
        setItems(prev => [...prev, newItem]);
    };

    // Remove item
    const removeItem = (itemId) => {
        if (items.length > 1) {
            setItems(prev => prev.filter(item => item.id !== itemId));
            // Clean up search and dropdown state
            setSearchObat(prev => {
                const newState = { ...prev };
                delete newState[itemId];
                return newState;
            });
            setShowDropdown(prev => {
                const newState = { ...prev };
                delete newState[itemId];
                return newState;
            });
        }
    };

    // Update item field
    const updateItem = (itemId, field, value) => {
        setItems(prev => prev.map(item => 
            item.id === itemId ? { ...item, [field]: value } : item
        ));
    };

    // Submit resep
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!selectedDokter) {
            alert('Pilih dokter terlebih dahulu');
            return;
        }
        
        const validItems = items.filter(item => 
            item.kodeObat && item.namaObat && item.aturanPakai && item.jumlah > 0
        );
        
        if (validItems.length === 0) {
            alert('Tambahkan minimal satu obat yang valid');
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            const response = await axios.post('/api/resep', {
                no_rawat: noRawat,
                kd_poli: kdPoli,
                kd_dokter: selectedDokter,
                items: validItems.map(item => ({
                    kode_brng: item.kodeObat,
                    jml: item.jumlah,
                    aturan_pakai: item.aturanPakai
                }))
            });
            
            if (response.data.success) {
                alert('Resep berhasil disalin dan disimpan!');
                onResepSaved();
                onClose();
                // Reset form
                setItems([{
                    id: Date.now(),
                    kodeObat: '',
                    namaObat: '',
                    aturanPakai: '',
                    jumlah: '',
                    satuan: '',
                    stokTersedia: 0,
                    harga: 0
                }]);
            } else {
                alert('Gagal menyimpan resep: ' + (response.data.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error saving resep:', error);
            alert('Terjadi kesalahan saat menyimpan resep');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Load initial data
    useEffect(() => {
        if (isOpen) {
            fetchDokter();
            fetchObat();
        }
    }, [isOpen, kdPoli]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Copy Resep
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Salin resep dari: {resepData?.no_resep} - {resepData?.tgl_peresepan}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit} className="p-6">
                    {/* Dokter Selection */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Dokter
                        </label>
                        <select
                            value={selectedDokter}
                            onChange={(e) => setSelectedDokter(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            required
                        >
                            <option value="">Pilih Dokter</option>
                            {dokterOptions.map(dokter => (
                                <option key={dokter.kd_dokter} value={dokter.kd_dokter}>
                                    {dokter.nm_dokter}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Items List */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                                Daftar Obat
                            </h4>
                            <button
                                type="button"
                                onClick={addItem}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-200 flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Tambah Obat
                            </button>
                        </div>

                        {items.map((item, index) => (
                            <div key={item.id} className="bg-gray-50 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                        Obat #{index + 1}
                                    </span>
                                    {items.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeItem(item.id)}
                                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                            title="Hapus obat"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Nama Obat */}
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Nama Obat
                                        </label>
                                        <input
                                            type="text"
                                            value={searchObat[item.id] || item.namaObat}
                                            onChange={(e) => handleSearchObat(item.id, e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                            placeholder="Cari nama obat..."
                                        />
                                        
                                        {/* Dropdown obat */}
                                        {showDropdown[item.id] && obatOptions.length > 0 && (
                                            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                                {obatOptions.map((obat, idx) => (
                                                    <div
                                                        key={idx}
                                                        onClick={() => selectObat(item.id, obat)}
                                                        className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                                                    >
                                                        <div className="font-medium text-gray-900 dark:text-white">
                                                            {obat.nama_brng}
                                                        </div>
                                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                                            {obat.kode_brng} | Stok: {obat.total_stok} {obat.kode_satbesar}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Aturan Pakai */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Aturan Pakai
                                        </label>
                                        <input
                                            type="text"
                                            value={item.aturanPakai}
                                            onChange={(e) => updateItem(item.id, 'aturanPakai', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                            placeholder="Contoh: 3x1 sehari sesudah makan"
                                        />
                                    </div>

                                    {/* Jumlah */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Jumlah
                                        </label>
                                        <input
                                            type="number"
                                            value={item.jumlah}
                                            onChange={(e) => updateItem(item.id, 'jumlah', parseInt(e.target.value) || 0)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                            min="1"
                                        />
                                    </div>

                                    {/* Satuan */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Satuan
                                        </label>
                                        <input
                                            type="text"
                                            value={item.satuan}
                                            onChange={(e) => updateItem(item.id, 'satuan', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                            placeholder="Contoh: tablet, kapsul, botol"
                                        />
                                    </div>
                                </div>

                                {/* Stok Info */}
                                {item.stokTersedia > 0 && (
                                    <div className="mt-2 text-sm text-green-600 dark:text-green-400">
                                        Stok tersedia: {item.stokTersedia} {item.satuan}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors duration-200"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-md transition-colors duration-200 flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Menyimpan...
                                </>
                            ) : (
                                'Simpan Resep'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
