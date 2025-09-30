import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Loader2, Save, Search, Plus, Trash2, X } from 'lucide-react';
import axios from 'axios';
import { toast } from '@/tools/toast';
import { 
    Card, 
    CardHeader, 
    CardTitle, 
    CardContent, 
    Button, 
    Input, 
    Label, 
    Select, 
    SelectTrigger, 
    SelectValue, 
    SelectContent, 
    SelectItem, 
    Textarea, 
    Table, 
    TableHeader, 
    TableBody, 
    TableRow, 
    TableHead, 
    TableCell, 
    Badge 
} from '@/Components/ui';

export default function StokOpname({ auth }) {
    const [formData, setFormData] = useState({
        tanggal: new Date().toISOString().split('T')[0],
        kd_bangsal: '',
        keterangan: ''
    });
    
    const [lokasi, setLokasi] = useState([]);
    const [opnameItems, setOpnameItems] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // State untuk modal pencarian barang
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loadingSearch, setLoadingSearch] = useState(false);

    // Load data lokasi saat component mount
    useEffect(() => {
        loadLokasi();
    }, []);

    const loadLokasi = async () => {
        try {
            const response = await axios.get('/api/opname/lokasi');
            if (response.data.success) {
                setLokasi(response.data.data);
            }
        } catch (error) {
            console.error('Error loading lokasi:', error);
            toast('Gagal memuat data lokasi', 'error');
        }
    };

    // Fungsi untuk pencarian barang
    const searchBarang = async (term) => {
        if (term.length < 2) {
            setSearchResults([]);
            return;
        }

        if (!formData.kd_bangsal) {
            toast('Pilih lokasi terlebih dahulu', 'error');
            return;
        }

        setLoadingSearch(true);
        try {
            const response = await axios.get('/api/opname/data-barang', {
                params: { 
                    kd_bangsal: formData.kd_bangsal,
                    search: term
                }
            });
            
            if (response.data.success) {
                setSearchResults(response.data.data);
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            console.error('Error searching barang:', error);
            setSearchResults([]);
        } finally {
            setLoadingSearch(false);
        }
    };

    // Fungsi untuk menambah item ke opname
    const addItemToOpname = (barang) => {
        const existingItemIndex = opnameItems.findIndex(item => item.kode_brng === barang.kode_brng);
        
        if (existingItemIndex >= 0) {
            toast('Barang sudah ada dalam daftar opname', 'error');
            return;
        }

        const newItem = {
            ...barang,
            real: barang.stok, // Default real = stok sistem
            selisih: 0,
            lebih: 0,
            nomihilang: 0,
            nomilebih: 0,
            totalreal: barang.stok * barang.harga,
            no_batch: barang.no_batch || '',
            no_faktur: barang.no_faktur || ''
        };
        
        setOpnameItems([...opnameItems, newItem]);
        
        // Tutup modal dan reset pencarian
        setShowSearchModal(false);
        setSearchTerm('');
        setSearchResults([]);
        toast(`Barang ${barang.nama_brng} berhasil ditambahkan`, 'success');
    };

    // Fungsi untuk membuka modal pencarian
    const openSearchModal = () => {
        if (!formData.kd_bangsal) {
            toast('Pilih lokasi terlebih dahulu', 'error');
            return;
        }
        setShowSearchModal(true);
    };

    // Fungsi untuk menghapus item dari opname
    const removeItemFromOpname = (index) => {
        const updatedItems = opnameItems.filter((_, i) => i !== index);
        setOpnameItems(updatedItems);
        toast('Item berhasil dihapus dari daftar opname', 'success');
    };

    const handleRealChange = (index, value) => {
        const newItems = [...opnameItems];
        const real = parseFloat(value) || 0;
        const stok = newItems[index].stok;
        const harga = newItems[index].harga;
        
        newItems[index].real = real;
        newItems[index].selisih = real - stok;
        newItems[index].lebih = newItems[index].selisih > 0 ? newItems[index].selisih : 0;
        newItems[index].nomihilang = newItems[index].selisih < 0 ? Math.abs(newItems[index].selisih) * harga : 0;
        newItems[index].nomilebih = newItems[index].selisih > 0 ? newItems[index].selisih * harga : 0;
        newItems[index].totalreal = real * harga;
        
        setOpnameItems(newItems);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (opnameItems.length === 0) {
            toast('Tidak ada data barang untuk disimpan', 'error');
            return;
        }

        setLoading(true);
        try {
            const payload = {
                tanggal: formData.tanggal,
                kd_bangsal: formData.kd_bangsal,
                keterangan: formData.keterangan,
                items: opnameItems.map(item => ({
                    kode_brng: item.kode_brng,
                    real: item.real,
                    h_beli: item.harga,
                    no_batch: item.no_batch || '',
                    no_faktur: item.no_faktur || ''
                }))
            };

            const response = await axios.post('/api/opname/store', payload);
            
            if (response.data.success) {
                toast('Data stok opname berhasil disimpan', 'success');
                // Reset form
                setFormData({
                    tanggal: new Date().toISOString().split('T')[0],
                    kd_bangsal: '',
                    keterangan: ''
                });
                setOpnameItems([]);
            }
        } catch (error) {
            console.error('Error saving opname:', error);
            toast(error.response?.data?.message || 'Gagal menyimpan data stok opname', 'error');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            tanggal: new Date().toISOString().split('T')[0],
            kd_bangsal: '',
            keterangan: ''
        });
        setOpnameItems([]);
        setMessage({ type: '', text: '' });
    };

    // useEffect untuk pencarian barang
    useEffect(() => {
        if (searchTerm && showSearchModal && formData.kd_bangsal) {
            const timeoutId = setTimeout(() => {
                searchBarang(searchTerm);
            }, 500);
            return () => clearTimeout(timeoutId);
        } else if (searchTerm && showSearchModal && !formData.kd_bangsal) {
            setSearchResults([]);
        }
    }, [searchTerm, showSearchModal, formData.kd_bangsal]);

    const formatRupiah = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const getTotalNominalHilang = () => {
        return opnameItems.reduce((total, item) => total + (item.nomihilang || 0), 0);
    };

    const getTotalNominalLebih = () => {
        return opnameItems.reduce((total, item) => total + (item.nomilebih || 0), 0);
    };

    return (
        <AppLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Stok Opname</h2>}
        >
            <Head title="Stok Opname" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">


                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Form Stok Opname</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <Label htmlFor="tanggal">Tanggal Opname</Label>
                                        <Input
                                            id="tanggal"
                                            type="date"
                                            value={formData.tanggal}
                                            onChange={(e) => setFormData({...formData, tanggal: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="lokasi">Lokasi/Bangsal</Label>
                                        <Select
                                            value={formData.kd_bangsal}
                                            onValueChange={(value) => setFormData({...formData, kd_bangsal: value})}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih Lokasi" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {lokasi.map((item) => (
                                                    <SelectItem key={item.kd_bangsal} value={item.kd_bangsal}>
                                                        {item.nm_bangsal}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="keterangan">Keterangan</Label>
                                        <Textarea
                                            id="keterangan"
                                            value={formData.keterangan}
                                            onChange={(e) => setFormData({...formData, keterangan: e.target.value})}
                                            rows={2}
                                            placeholder="Keterangan opname..."
                                        />
                                    </div>
                                </div>
                                <Button 
                                    onClick={openSearchModal}
                                    disabled={!formData.kd_bangsal}
                                >
                                    <Search className="mr-2 h-4 w-4" /> Cari Data Obat
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {opnameItems.length > 0 && (
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Data Barang Stok Opname</CardTitle>
                                <div className="flex gap-2">
                                    <Button 
                                        onClick={resetForm}
                                        variant="outline"
                                    >
                                        <Plus className="mr-2 h-4 w-4" /> Form Baru
                                    </Button>
                                    <Button 
                                        onClick={handleSubmit} 
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Menyimpan...</>
                                        ) : (
                                            <><Save className="mr-2 h-4 w-4" /> Simpan Opname</>
                                        )}
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <strong>Tanggal:</strong> {formData.tanggal}
                                    </div>
                                    <div>
                                        <strong>Lokasi:</strong> {lokasi.find(l => l.kd_bangsal === formData.kd_bangsal)?.nm_bangsal}
                                    </div>
                                    <div>
                                        <strong>Keterangan:</strong> {formData.keterangan || '-'}
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>No</TableHead>
                                                <TableHead>Kode Barang</TableHead>
                                                <TableHead>Nama Barang</TableHead>
                                                <TableHead>Jenis</TableHead>
                                                <TableHead>Satuan</TableHead>
                                                <TableHead>Harga</TableHead>
                                                <TableHead>Stok</TableHead>
                                                <TableHead className="text-base text-center min-w-[200px]">Real</TableHead>
                                                <TableHead>Selisih</TableHead>
                                                <TableHead>Lebih</TableHead>
                                                <TableHead>Nominal Hilang</TableHead>
                                                <TableHead>Nominal Lebih</TableHead>
                                                <TableHead>No Batch</TableHead>
                                                <TableHead>No Faktur</TableHead>
                                                <TableHead>Aksi</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {opnameItems.map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell className="font-mono">{item.kode_brng}</TableCell>
                                                    <TableCell>{item.nama_brng}</TableCell>
                                                    <TableCell>{item.jenis}</TableCell>
                                                    <TableCell>{item.satuan}</TableCell>
                                                    <TableCell>{formatRupiah(item.harga)}</TableCell>
                                                    <TableCell>{item.stok}</TableCell>
                                                    <TableCell>
                                                        <Input
                                                            type="number"
                                                            value={item.real}
                                                            onChange={(e) => handleRealChange(index, e.target.value)}
                                                            className="w-48 h-12 text-center font-bold text-xl px-4 py-3 border-2"
                                                            min="0"
                                                            step="0.01"
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant={item.selisih === 0 ? 'secondary' : item.selisih > 0 ? 'default' : 'destructive'}>
                                                            {item.selisih}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>{item.lebih}</TableCell>
                                                    <TableCell className="text-red-600">{formatRupiah(item.nomihilang)}</TableCell>
                                                    <TableCell className="text-green-600">{formatRupiah(item.nomilebih)}</TableCell>
                                                    <TableCell>{item.no_batch || '-'}</TableCell>
                                                    <TableCell>{item.no_faktur || '-'}</TableCell>
                                                    <TableCell>
                                                        <Button
                                                            onClick={() => removeItemFromOpname(index)}
                                                            variant="destructive"
                                                            size="sm"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                                    <div className="text-red-600">
                                        <strong>Total Nominal Hilang: {formatRupiah(getTotalNominalHilang())}</strong>
                                    </div>
                                    <div className="text-green-600">
                                        <strong>Total Nominal Lebih: {formatRupiah(getTotalNominalLebih())}</strong>
                                    </div>
                                </div>
                             </CardContent>
                         </Card>
                     )}
                 </div>
            </div>

            {/* Modal Pencarian Barang */}
            {showSearchModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-hidden">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Cari Data Obat</h3>
                            <Button
                                onClick={() => setShowSearchModal(false)}
                                variant="ghost"
                                size="sm"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        
                        <div className="mb-4">
                            <Input
                                type="text"
                                placeholder="Cari nama obat atau kode..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full"
                            />
                        </div>

                        <div className="overflow-auto max-h-96">
                            {loadingSearch ? (
                                <div className="flex justify-center items-center py-8">
                                    <Loader2 className="h-6 w-6 animate-spin" />
                                    <span className="ml-2">Mencari data obat...</span>
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Kode</TableHead>
                                            <TableHead>Nama Obat</TableHead>
                                            <TableHead>Jenis</TableHead>
                                            <TableHead>Satuan</TableHead>
                                            <TableHead>Harga</TableHead>
                                            <TableHead>Stok</TableHead>
                                            <TableHead>Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {searchResults.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="font-mono">{item.kode_brng}</TableCell>
                                                <TableCell>{item.nama_brng}</TableCell>
                                                <TableCell>{item.jenis}</TableCell>
                                                <TableCell>{item.satuan}</TableCell>
                                                <TableCell>{formatRupiah(item.harga)}</TableCell>
                                                <TableCell>{item.stok}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        onClick={() => addItemToOpname(item)}
                                                        size="sm"
                                                        disabled={opnameItems.some(opnameItem => opnameItem.kode_brng === item.kode_brng)}
                                                    >
                                                        {opnameItems.some(opnameItem => opnameItem.kode_brng === item.kode_brng) ? 'Sudah Ditambah' : 'Tambah'}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {searchResults.length === 0 && searchTerm && !loadingSearch && formData.kd_bangsal && (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-4">
                                    Tidak ada data obat yang ditemukan
                                </TableCell>
                            </TableRow>
                        )}
                        {!formData.kd_bangsal && (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                                    Silakan pilih lokasi terlebih dahulu untuk mencari data obat
                                </TableCell>
                            </TableRow>
                        )}
                        {!searchTerm && formData.kd_bangsal && (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                                    Ketik nama obat atau kode untuk mencari
                                </TableCell>
                            </TableRow>
                        )}
                                    </TableBody>
                                </Table>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}