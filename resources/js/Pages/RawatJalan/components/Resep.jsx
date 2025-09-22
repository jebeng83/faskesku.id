import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Resep({ token = '', noRkmMedis = '', noRawat = '', kdPoli = '' }) {
    const [items, setItems] = useState([
        { id: 1, kodeObat: '', namaObat: '', aturanPakai: '', jumlah: 0, satuan: '', stokTersedia: 0, harga: 0 },
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [obatOptions, setObatOptions] = useState([]);
    const [searchObat, setSearchObat] = useState('');
    const [loadingObat, setLoadingObat] = useState(false);
    const [showDropdown, setShowDropdown] = useState({});
    const [savedResep, setSavedResep] = useState(null);
    const [showSavedResep, setShowSavedResep] = useState(false);

    // Fetch obat dari API
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

    // Load obat saat komponen dimount atau kdPoli berubah
    useEffect(() => {
        if (kdPoli) {
            fetchObat();
        }
    }, [kdPoli]);

    // Debounce search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchObat && searchObat.length >= 2) {
                fetchObat(searchObat);
            } else if (searchObat.length === 0) {
                fetchObat(); // Load semua obat jika search kosong
            }
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [searchObat]);

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

    // Handle pemilihan obat dari dropdown
    const selectObat = (itemId, obat) => {
        setItems((prev) => prev.map((it) => 
            it.id === itemId ? {
                ...it,
                kodeObat: obat.kode_brng,
                namaObat: obat.nama_brng,
                satuan: obat.kode_satbesar,
                stokTersedia: obat.total_stok,
                harga: obat.ralan || 0
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Validasi stok untuk semua item
            const validationPromises = items.map(async (item) => {
                if (item.kodeObat && item.jumlah > 0) {
                    const stokCukup = await cekStokObat(item.kodeObat, item.jumlah);
                    return { ...item, stokCukup };
                }
                return { ...item, stokCukup: true };
            });
            
            const validatedItems = await Promise.all(validationPromises);
            const itemsWithStokKurang = validatedItems.filter(item => !item.stokCukup);
            
            if (itemsWithStokKurang.length > 0) {
                alert(`Stok tidak mencukupi untuk: ${itemsWithStokKurang.map(item => item.namaObat).join(', ')}`);
                return;
            }
            
            // Siapkan data resep untuk dikirim ke API
            const resepData = {
                no_rawat: noRawat,
                kd_poli: kdPoli,
                items: validatedItems.filter(item => item.kodeObat && item.jumlah > 0).map(item => ({
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
            } else {
                alert('Gagal menyimpan resep: ' + (response.data.message || 'Terjadi kesalahan'));
            }
        } catch (error) {
            console.error('Error submitting resep:', error);
            alert('Terjadi kesalahan saat menyimpan resep');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Resep</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Input & lihat resep pasien</p>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
                <div className="space-y-3">
                    {items.map((item) => (
                        <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-3">
                            <div className="md:col-span-4 relative dropdown-container">
                                 <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Nama Obat</label>
                                 <input 
                                     type="text" 
                                     value={item.namaObat} 
                                     onChange={(e) => {
                                         updateItem(item.id, 'namaObat', e.target.value);
                                         setSearchObat(e.target.value);
                                         setShowDropdown(prev => ({ ...prev, [item.id]: true }));
                                     }}
                                     onFocus={() => {
                                         setShowDropdown(prev => ({ ...prev, [item.id]: true }));
                                         if (!searchObat && kdPoli) {
                                             fetchObat();
                                         }
                                     }}
                                     className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" 
                                     placeholder="Cari nama obat..." 
                                 />
                                
                                {/* Dropdown Autocomplete */}
                                 {showDropdown[item.id] && (
                                     <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                        {loadingObat && (
                                            <div className="p-2 text-center text-gray-500 dark:text-gray-400">Mencari obat...</div>
                                        )}
                                        {!loadingObat && obatOptions.length === 0 && (
                                             <div className="p-2 text-center text-gray-500 dark:text-gray-400">
                                                 {!kdPoli ? 'Data poli tidak tersedia' : 
                                                  searchObat && searchObat.length >= 2 ? 'Obat tidak ditemukan' : 
                                                  'Ketik minimal 2 karakter untuk mencari'}
                                             </div>
                                         )}
                                        {!loadingObat && obatOptions.length > 0 && obatOptions.map((obat) => (
                                            <div
                                                key={obat.kode_brng}
                                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b dark:border-gray-600 last:border-b-0"
                                                onClick={() => selectObat(item.id, obat)}
                                            >
                                                <div className="font-medium text-gray-900 dark:text-white">{obat.nama_brng}</div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    Kode: {obat.kode_brng} | Stok: {obat.total_stok} {obat.kode_satbesar}
                                                    {obat.ralan && ` | Harga: Rp ${obat.ralan.toLocaleString()}`}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                
                                {/* Info stok */}
                                {item.stokTersedia > 0 && (
                                    <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                                        Stok tersedia: {item.stokTersedia} {item.satuan}
                                    </div>
                                )}
                            </div>
                            <div className="md:col-span-3">
                                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Aturan Pakai</label>
                                <input type="text" value={item.aturanPakai} onChange={(e) => updateItem(item.id, 'aturanPakai', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" placeholder="3x1 sesudah makan" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Jumlah</label>
                                <input 
                                    type="number" 
                                    min="0" 
                                    value={item.jumlah} 
                                    onChange={(e) => {
                                        const jumlah = parseInt(e.target.value) || 0;
                                        updateItem(item.id, 'jumlah', jumlah);
                                    }}
                                    className={`w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 ${
                                        item.jumlah > item.stokTersedia && item.stokTersedia > 0 
                                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                                            : ''
                                    }`}
                                    max={item.stokTersedia || undefined}
                                />
                                {item.jumlah > item.stokTersedia && item.stokTersedia > 0 && (
                                    <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                                        Melebihi stok tersedia!
                                    </div>
                                )}
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Satuan</label>
                                <input 
                                    type="text" 
                                    value={item.satuan} 
                                    onChange={(e) => updateItem(item.id, 'satuan', e.target.value)} 
                                    className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" 
                                    placeholder="tablet, botol, dll"
                                    readOnly={item.kodeObat ? true : false}
                                />
                            </div>
                            <div className="md:col-span-1 flex items-end">
                                <button type="button" onClick={() => removeItem(item.id)} className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md">Hapus</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between">
                    <button type="button" onClick={addItem} className="bg-gray-100 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-md">+ Tambah Obat</button>
                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md disabled:opacity-60" disabled={isSubmitting}>{isSubmitting ? 'Menyimpan...' : 'Simpan Resep'}</button>
                </div>
            </form>

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
                                    {savedResep.resep_dokter && savedResep.resep_dokter.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="border border-gray-300 px-3 py-2">{item.kode_brng}</td>
                                            <td className="border border-gray-300 px-3 py-2">{item.databarang?.nama_brng || '-'}</td>
                                            <td className="border border-gray-300 px-3 py-2">{item.aturan_pakai}</td>
                                            <td className="border border-gray-300 px-3 py-2 text-center">{item.jml}</td>
                                            <td className="border border-gray-300 px-3 py-2 text-right">
                                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.harga)}
                                            </td>
                                            <td className="border border-gray-300 px-3 py-2 text-right">
                                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.jml * item.harga)}
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
                                            {savedResep.resep_dokter && new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                                                savedResep.resep_dokter.reduce((total, item) => total + (item.jml * item.harga), 0)
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


