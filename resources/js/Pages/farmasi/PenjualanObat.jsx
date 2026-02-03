import React, { useState, useEffect, useMemo } from 'react';
import { Head, useForm } from '@inertiajs/react';
import LayoutPOS from '@/Layouts/LayoutPOS';
import {
    Search,
    Plus,
    Trash2,
    ShoppingBag,
    User,
    ClipboardList,
    Calculator,
    Package,
    ArrowRight,
    X,
    RotateCcw,
    Printer,
    Info,
    CreditCard,
    Percent
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import axios from 'axios';

export default function PenjualanObat({ auth, bangsal = [], _petugasList = [], akunBayar = [] }) {
    // Tab State: 'kasir' or 'riwayat'
    const [activeTab, setActiveTab] = useState('kasir');

    // POS State
    const [cart, setCart] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showRacikanModal, setShowRacikanModal] = useState(false);

    // Riwayat State
    const [riwayatData, setRiwayatData] = useState([]);
    const [riwayatSearch, setRiwayatSearch] = useState('');
    const [isRiwayatLoading, setIsRiwayatLoading] = useState(false);
    const [tgl_awal, setTglAwal] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [tgl_akhir, setTglAkhir] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [total_pendapatan, setTotalPendapatan] = useState(0);

    // Form for transaction data
    const { data, setData, post, processing, reset, transform } = useForm({
        nota_jual: '',
        tgl_jual: format(new Date(), 'yyyy-MM-dd'),
        nip: auth?.user?.nip || auth?.user?.nik || '',
        no_rkm_medis: '',
        nm_pasien: 'UMUM',
        keterangan: '',
        jns_jual: 'Jual Bebas',
        ongkir: 0,
        ppn_percent: 0,
        status: 'Lunas',
        kd_bangsal: bangsal[0]?.kd_bangsal || '',
        kd_rek: akunBayar[0]?.kd_rek || '',
        nama_bayar: akunBayar[0]?.nm_rek || '',
        bayar: 0,
    });

    // Fetch Nota on Load
    useEffect(() => {
        fetchNewNota();
    }, []);

    // Sync NIP if auth data changes
    useEffect(() => {
        if (!data.nip && (auth?.user?.nip || auth?.user?.nik)) {
            setData('nip', auth.user.nip || auth.user.nik);
        }
    }, [auth]);

    const uniqueBangsal = useMemo(() => {
        const map = new Map();
        for (const b of bangsal) {
            if (b && b.kd_bangsal && !map.has(b.kd_bangsal)) map.set(b.kd_bangsal, b);
        }
        return Array.from(map.values());
    }, [bangsal]);

    const uniqueAkunBayar = useMemo(() => {
        const map = new Map();
        for (const a of akunBayar) {
            if (a && a.kd_rek && !map.has(a.kd_rek)) map.set(a.kd_rek, a);
        }
        return Array.from(map.values());
    }, [akunBayar]);

    const fetchNewNota = async () => {
        try {
            const response = await axios.get(route('farmasi.penjualan.nota'));
            setData('nota_jual', response.data.nota);
        } catch (error) {
            console.error('Error fetching nota:', error);
        }
    };

    // Fetch Riwayat on Tab Switch or Search
    useEffect(() => {
        if (activeTab === 'riwayat') {
            fetchRiwayat();
        }
    }, [activeTab, riwayatSearch, tgl_awal, tgl_akhir]);

    const fetchRiwayat = async () => {
        setIsRiwayatLoading(true);
        try {
            const response = await axios.get(route('farmasi.penjualan.riwayat'), {
                params: {
                    search: riwayatSearch,
                    tgl_awal: tgl_awal,
                    tgl_akhir: tgl_akhir
                }
            });
            setRiwayatData(response.data.data.data || []);
            setTotalPendapatan(response.data.total_pendapatan || 0);
        } catch (error) {
            console.error('Error fetching riwayat:', error);
        } finally {
            setIsRiwayatLoading(false);
        }
    };

    // Perhitungan Keuangan
    const totals = useMemo(() => {
        const subtotal = cart.reduce((acc, item) => acc + (item.total || 0), 0);
        const ppn = (subtotal * (data.ppn_percent / 100));
        const grandTotal = subtotal + ppn + (Number(data.ongkir) || 0);
        const kembali = data.bayar - grandTotal;
        return { subtotal, ppn, grandTotal, kembali };
    }, [cart, data.ppn_percent, data.ongkir, data.bayar]);

    // Handle Drug Search
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery.length >= 3) {
                fetchDrugs();
            } else {
                setSearchResults([]);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    const fetchDrugs = async () => {
        setIsSearching(true);
        try {
            const response = await axios.get(`/api/barang/search?q=${searchQuery}&kd_bangsal=${data.kd_bangsal}`);
            const items = response.data.data || [];
            const map = new Map();
            for (const it of items) {
                const prev = map.get(it.kode_brng);
                if (!prev || Number(it.stok || 0) > Number(prev.stok || 0)) {
                    map.set(it.kode_brng, it);
                }
            }
            setSearchResults(Array.from(map.values()));
        } catch (error) {
            console.error('Error searching drugs:', error);
        } finally {
            setIsSearching(false);
        }
    };

    const addToCart = (drug) => {
        const existingItem = cart.find(item => item.kode_brng === drug.kode_brng);
        if (existingItem) {
            updateCartItem(drug.kode_brng, 'jumlah', existingItem.jumlah + 1);
        } else {
            // Determine price based on jns_jual
            let price = drug.jualbebas; // Default
            if (data.jns_jual === 'Karyawan') price = drug.karyawan;
            else if (data.jns_jual === 'Beli Luar') price = drug.beliluar;
            else if (data.jns_jual === 'Ralan') price = drug.ralan;

            const newItem = {
                kode_brng: drug.kode_brng,
                nama_brng: drug.nama_brng,
                kode_sat: drug.kode_sat,
                h_beli: drug.dasar || 0,
                h_jual: price,
                jumlah: 1,
                dis: 0,
                bsr_dis: 0,
                tambahan: 0,
                subtotal: price,
                total: price,
                aturan_pakai: '',
                stok: drug.stok,
                no_batch: drug.no_batch || '',
                no_faktur: drug.no_faktur || '',
                expire: drug.expire || null,
            };
            setCart([...cart, newItem]);
        }
        setSearchQuery('');
        setSearchResults([]);
    };

    const updateCartItem = (kode_brng, field, value) => {
        setCart(cart.map(item => {
            if (item.kode_brng === kode_brng) {
                const updatedItem = { ...item, [field]: value };

                // Recalculate totals for this item
                const jumlah = Number(updatedItem.jumlah) || 0;
                const h_jual = Number(updatedItem.h_jual) || 0;
                const discPerc = Number(updatedItem.dis) || 0;
                const tambahan = Number(updatedItem.tambahan) || 0;

                const bsr_dis = (h_jual * jumlah) * (discPerc / 100);
                const subtotal = h_jual * jumlah;
                const total = subtotal - bsr_dis + tambahan;

                return { ...updatedItem, bsr_dis, subtotal, total };
            }
            return item;
        }));
    };

    const removeFromCart = (kode_brng) => {
        setCart(cart.filter(item => item.kode_brng !== kode_brng));
    };

    const handleSubmit = (e) => {
        if (e) e.preventDefault();

        if (cart.length === 0) {
            alert('Keranjang masih kosong!');
            return;
        }

        if (!data.nip) {
            alert('Petugas (NIP) tidak terdeteksi. Silakan login kembali.');
            return;
        }

        if (totals.kembali < 0) {
            alert('Jumlah bayar masih kurang!');
            return;
        }


        // Use transform to include data that is not directly in the form state
        transform((data) => ({
            ...data,
            items: cart,
            ppn: totals.ppn,
        }));

        post(route('farmasi.penjualan.simpan'), {
            onSuccess: async () => {
                const nota = data.nota_jual;
                try {
                    await axios.post('/api/akutansi/jurnal/post-staging', {
                        no_bukti: nota,
                        jenis: 'U',
                        keterangan: `Posting otomatis Penjualan Obat nota ${nota}`,
                    });
                } catch (e) {
                    const msg = e?.response?.data?.message || '';
                    if (!msg.includes('Tidak ada data') && !msg.includes('staging')) {
                        console.warn('Gagal auto-post jurnal POS:', e?.response?.data || e);
                    }
                }
                setCart([]);
                reset();
                setShowPaymentModal(false);
                alert('Transaksi Berhasil Disimpan!');
                fetchNewNota();
                fetchRiwayat();
                try {
                    window.open(route('farmasi.penjualan.print', { nota_jual: nota }), '_blank');
                } catch (err) {
                    console.error('Gagal membuka halaman cetak:', err);
                }
            },
            onError: (errors) => {
                console.error('Submission errors:', errors);
                alert('Gagal menyimpan transaksi. Periksa kembali isian Anda.');
            }
        });
    };

    const handlePrint = (nota) => {
        window.open(route('farmasi.penjualan.print', { nota_jual: nota }), '_blank');
    };

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(val);
    };

    return (
        <LayoutPOS>
            <Head title="Point of Sale - Farmasi" />

            <div className="flex flex-col h-screen overflow-hidden bg-gray-50 dark:bg-gray-950 font-sans">
                {/* Navbar / Tab Switcher */}
                <div className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm z-10">
                    <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                        <button
                            onClick={() => setActiveTab('kasir')}
                            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${activeTab === 'kasir' ? 'bg-white dark:bg-gray-700 shadow-md text-emerald-600 dark:text-emerald-400' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                        >
                            <Calculator className="w-4 h-4" />
                            Kasir POS
                        </button>
                        <button
                            onClick={() => setActiveTab('riwayat')}
                            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${activeTab === 'riwayat' ? 'bg-white dark:bg-gray-700 shadow-md text-emerald-600 dark:text-emerald-400' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                        >
                            <ClipboardList className="w-4 h-4" />
                            Riwayat Penjualan
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex flex-col text-right">
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Petugas Aktif</span>
                            <span className="text-sm font-bold text-gray-900 dark:text-white uppercase">{auth?.user?.name || 'ADMIN'}</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center border-2 border-emerald-500">
                            <User className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                    </div>
                </div>

                {activeTab === 'kasir' ? (
                    <div className="flex flex-1 overflow-hidden p-6 gap-6">
                        {/* Main Interaction Area (Left/Middle) */}
                        <div className="flex-1 flex flex-col gap-6 overflow-hidden">
                            {/* Header Form Card */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-800 grid grid-cols-1 md:grid-cols-4 gap-4"
                            >
                                <div>
                                    <InputLabel value="No. Nota" className="text-xs font-bold uppercase text-gray-400 mb-1" />
                                    <TextInput
                                        value={data.nota_jual}
                                        onChange={e => setData('nota_jual', e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-emerald-500"
                                    />
                                </div>
                                <div>
                                    <InputLabel value="Pasien / Member" className="text-xs font-bold uppercase text-gray-400 mb-1" />
                                    <div className="relative">
                                        <TextInput
                                            placeholder="Nama / No.RM"
                                            value={data.nm_pasien}
                                            onChange={e => setData('nm_pasien', e.target.value)}
                                            className="w-full pl-10 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-emerald-500"
                                        />
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    </div>
                                </div>
                                <div>
                                    <InputLabel value="Gudang / Lokasi" className="text-xs font-bold uppercase text-gray-400 mb-1" />
                                    <select
                                        value={data.kd_bangsal}
                                        onChange={e => setData('kd_bangsal', e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-emerald-500 py-2.5 px-3 text-sm"
                                    >
                                        <option value="">Pilih Gudang</option>
                                        {uniqueBangsal.map(b => (
                                            <option key={b.kd_bangsal} value={b.kd_bangsal}>{b.nm_bangsal}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <InputLabel value="Jenis Jual" className="text-xs font-bold uppercase text-gray-400 mb-1" />
                                    <select
                                        value={data.jns_jual}
                                        onChange={e => setData('jns_jual', e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-emerald-500 py-2.5 px-3 text-sm"
                                    >
                                        <option value="Jual Bebas">Jual Bebas</option>
                                        <option value="Ralan">Ralan (Pasien Rawat Jalan)</option>
                                        <option value="Karyawan">Karyawan</option>
                                        <option value="Beli Luar">Beli Luar</option>
                                    </select>
                                </div>
                            </motion.div>

                            {/* Drug Search Area */}
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-emerald-500" />
                                <input
                                    type="text"
                                    placeholder="Ketik Nama Obat / Alkes minimum 3 karakter..."
                                    className="w-full py-4 pl-14 pr-6 bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-emerald-100 dark:border-emerald-900/30 focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-lg"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {isSearching && <div className="absolute right-6 top-1/2 -translate-y-1/2"><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-emerald-500"></div></div>}

                                <AnimatePresence>
                                    {searchResults.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 max-h-96 overflow-auto z-50 p-2"
                                        >
                                            {searchResults.map((it) => (
                                                <button
                                                    key={it.kode_brng}
                                                    onClick={() => addToCart(it)}
                                                    className="w-full p-4 flex justify-between items-center rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all border-b border-gray-50 dark:border-gray-800 last:border-none group"
                                                >
                                                    <div className="flex gap-4 items-center">
                                                        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-emerald-100/50">
                                                            <Package className="w-6 h-6 text-gray-400 group-hover:text-emerald-500" />
                                                        </div>
                                                        <div className="text-left">
                                                            <div className="font-bold text-gray-900 dark:text-white">{it.nama_brng}</div>
                                                            <div className="text-xs text-gray-500">{it.kode_brng} • <span className="text-emerald-500 font-semibold">{it.stok} {it.kode_sat}</span></div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-sm font-bold text-emerald-600">{formatCurrency(it.jualbebas)}</div>
                                                        <div className="text-[10px] text-gray-400 uppercase tracking-tighter">Klik untuk tambah</div>
                                                    </div>
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Cart List */}
                            <div className="flex-1 bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col overflow-hidden">
                                <div className="p-6 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center">
                                    <h3 className="flex items-center gap-2 font-black text-gray-900 dark:text-white">
                                        <ShoppingBag className="w-5 h-5 text-emerald-500" />
                                        DAFTAR BELANJA
                                    </h3>
                                    <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-bold">
                                        {cart.length} Item
                                    </span>
                                </div>

                                <div className="flex-1 overflow-auto p-4 custom-scrollbar">
                                    {cart.length === 0 ? (
                                        <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-30">
                                            <ShoppingBag className="w-24 h-24 mb-4" />
                                            <span className="font-bold text-xl uppercase tracking-widest">Keranjang Kosong</span>
                                        </div>
                                    ) : (
                                        <table className="w-full table-fixed border-separate border-spacing-y-3">
                                            <thead className="text-xs text-gray-400 uppercase font-black tracking-widest text-left">
                                                <tr>
                                                    <th className="px-4 pb-2">Item</th>
                                                    <th className="px-4 pb-2 w-32">Harga</th>
                                                    <th className="px-4 pb-2 w-24 text-center">Qty</th>
                                                    <th className="px-4 pb-2 w-28">Dis(%)</th>
                                                    <th className="px-4 pb-2 text-right">Total</th>
                                                    <th className="px-4 pb-2"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.map((item) => (
                                                    <motion.tr
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.15, ease: 'easeOut' }}
                                                        key={item.kode_brng}
                                                        className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl overflow-hidden shadow-sm"
                                                    >
                                                        <td className="px-4 py-3 rounded-l-2xl">
                                                            <div className="font-bold text-base text-gray-900 dark:text-white truncate max-w-[200px]">{item.nama_brng}</div>
                                                            <div className="text-[10px] text-gray-400 flex items-center gap-2">
                                                                <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 px-1.5 py-0.5 rounded uppercase font-bold text-[8px]">{item.kode_sat}</span>
                                                                {item.kode_brng}
                                                                <span className="inline-flex items-center gap-1">
                                                                    <span className="uppercase">ED</span>
                                                                    {item.expire && item.expire !== '0000-00-00' ? (
                                                                        format(new Date(item.expire), 'dd/MM/yy', { locale: id })
                                                                    ) : (
                                                                        '-'
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <TextInput
                                                                value={item.h_jual}
                                                                onChange={e => updateCartItem(item.kode_brng, 'h_jual', e.target.value)}
                                                                className="w-full text-base font-bold border-none bg-transparent p-0 focus:ring-0"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-3 text-center">
                                                            <div className="flex items-center gap-1">
                                                                <button onClick={() => updateCartItem(item.kode_brng, 'jumlah', Math.max(1, item.jumlah - 1))} className="p-1 hover:text-emerald-500"><RotateCcw className="w-3 h-3 rotate-45" /></button>
                                                                <div className="relative">
                                                                    <input
                                                                        type="number"
                                                                        value={item.jumlah}
                                                                        onChange={e => updateCartItem(item.kode_brng, 'jumlah', e.target.value)}
                                                                        className="w-20 text-center text-sm font-black bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded p-2 pr-6 outline-none"
                                                                    />
                                                                    <button onClick={() => updateCartItem(item.kode_brng, 'jumlah', item.jumlah + 1)} className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 hover:text-emerald-500">
                                                                        <Plus className="w-3 h-3" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <div className="relative">
                                                                <input
                                                                    type="number"
                                                                    value={item.dis}
                                                                    onChange={e => updateCartItem(item.kode_brng, 'dis', e.target.value)}
                                                                    className="w-24 text-right text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded p-2 outline-none pr-6 transition-colors focus:border-emerald-500"
                                                                />
                                                                <Percent className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3 text-right">
                                                            <div className="font-black text-base text-emerald-600 dark:text-emerald-400">{formatCurrency(item.total)}</div>
                                                        </td>
                                                        <td className="px-4 py-3 text-right rounded-r-2xl">
                                                            <button
                                                                onClick={() => removeFromCart(item.kode_brng)}
                                                                className="text-gray-300 hover:text-red-500 transition-colors"
                                                            >
                                                                <Trash2 className="w-5 h-5" />
                                                            </button>
                                                        </td>
                                                    </motion.tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 flex justify-between items-center rounded-b-3xl">
                                    <button
                                        onClick={() => setShowRacikanModal(true)}
                                        className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-all active:scale-95"
                                    >
                                        <Plus className="w-4 h-4" />
                                        TAMBAH RACIKAN
                                    </button>
                                    <div className="flex gap-4">
                                        <button onClick={() => setCart([])} className="text-gray-400 hover:text-gray-600 text-[10px] font-black uppercase underline">Bersihkan</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Summary & Payment (Right Sidebar) */}
                        <div className="w-96 flex flex-col gap-6">
                            {/* Detailed Info */}
                            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-800">
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Info className="w-4 h-4" /> INFORMASI TAMBAHAN
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <InputLabel value="Catatan / Keterangan" className="text-[10px] mb-1 font-bold text-gray-400" />
                                        <textarea
                                            value={data.keterangan}
                                            onChange={e => setData('keterangan', e.target.value)}
                                            className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm p-3 h-20 focus:ring-emerald-500"
                                            placeholder="Catatan tambahan untuk pesanan ini..."
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <InputLabel value="PPN (%)" className="text-[10px] mb-1 font-bold text-gray-400" />
                                            <div className="relative">
                                                <TextInput
                                                    type="number"
                                                    value={data.ppn_percent}
                                                    onChange={e => setData('ppn_percent', e.target.value)}
                                                    className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl"
                                                />
                                                <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <InputLabel value="Ongkir" className="text-[10px] mb-1 font-bold text-gray-400" />
                                            <div className="relative">
                                                <TextInput
                                                    type="number"
                                                    value={data.ongkir}
                                                    onChange={e => setData('ongkir', e.target.value)}
                                                    className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl pl-8"
                                                />
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">Rp</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <InputLabel value="Metode Bayar" className="text-[10px] mb-1 font-bold text-gray-400" />
                                        <select
                                            value={data.kd_rek}
                                            onChange={e => {
                                                const selected = akunBayar.find(a => a.kd_rek === e.target.value);
                                                setData(prev => ({ ...prev, kd_rek: e.target.value, nama_bayar: selected?.nm_rek || '' }));
                                            }}
                                            className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-emerald-500 py-2.5 px-3 text-sm"
                                        >
                                            {uniqueAkunBayar.map(a => (
                                                <option key={a.kd_rek} value={a.kd_rek}>{a.nm_rek}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Financial Summary Card */}
                            <div className="relative flex-1">
                                <div className="absolute inset-0 bg-emerald-600 rounded-[2.5rem] rotate-3 -z-10 opacity-10"></div>
                                <div className="h-full bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col p-6 overflow-hidden">
                                    <div className="text-center mb-6">
                                        <h2 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-1">TOTAL TAGIHAN</h2>
                                        <div className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter truncate">
                                            {formatCurrency(totals.grandTotal)}
                                        </div>
                                    </div>

                                    <div className="space-y-3 pt-6 border-t border-gray-50 dark:border-gray-800">
                                        <div className="flex justify-between text-sm font-bold">
                                            <span className="text-gray-400 uppercase tracking-widest text-[10px]">Subtotal</span>
                                            <span className="text-gray-900 dark:text-white">{formatCurrency(totals.subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm font-bold">
                                            <span className="text-gray-400 uppercase tracking-widest text-[10px]">Pajak (PPN)</span>
                                            <span className="text-gray-900 dark:text-white">{formatCurrency(totals.ppn)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm font-bold">
                                            <span className="text-gray-400 uppercase tracking-widest text-[10px]">Biaya Kirim</span>
                                            <span className="text-gray-900 dark:text-white">{formatCurrency(Number(data.ongkir))}</span>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-6">
                                        <button
                                            onClick={() => setShowPaymentModal(true)}
                                            disabled={cart.length === 0}
                                            className="group relative w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 dark:disabled:bg-gray-800 text-white rounded-[1.5rem] py-5 font-black text-xl shadow-2xl shadow-emerald-600/30 transition-all active:scale-95 disabled:shadow-none overflow-hidden"
                                        >
                                            <div className="relative z-10 flex items-center justify-center gap-3">
                                                <CreditCard className="w-6 h-6" />
                                                LANJUT BAYAR
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-full transition-all duration-1000"></div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    // RIWAYAT TAB CONTENT
                    <div className="flex-1 p-6 overflow-auto">
                        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-6 border border-gray-100 dark:border-gray-800">
                            {/* Re-use your existing history table logic here or make it better */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-4">
                                        <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-tight">RIWAYAT TRANSAKSI TERAKHIR</h3>
                                        <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-1.5 px-3 rounded-2xl border border-gray-100 dark:border-gray-700">
                                            <input
                                                type="date"
                                                value={tgl_awal}
                                                onChange={e => setTglAwal(e.target.value)}
                                                className="bg-transparent border-none text-[10px] font-black focus:ring-0 p-0 text-gray-600 dark:text-gray-300"
                                            />
                                            <span className="text-[10px] text-gray-400 font-bold px-1 select-none">s/d</span>
                                            <input
                                                type="date"
                                                value={tgl_akhir}
                                                onChange={e => setTglAkhir(e.target.value)}
                                                className="bg-transparent border-none text-[10px] font-black focus:ring-0 p-0 text-gray-600 dark:text-gray-300"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Pendapatan:</span>
                                        <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">{formatCurrency(total_pendapatan)}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2 w-full md:w-auto">
                                    <div className="relative flex-1 md:w-64">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            value={riwayatSearch}
                                            onChange={(e) => setRiwayatSearch(e.target.value)}
                                            className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl text-xs font-bold focus:ring-2 focus:ring-emerald-500/20"
                                            placeholder="Cari Nota/Pasien..."
                                        />
                                    </div>
                                    <button onClick={fetchRiwayat} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm">
                                        <RotateCcw className={`w-4 h-4 ${isRiwayatLoading ? 'animate-spin' : ''}`} />
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 dark:border-gray-800">
                                        <tr>
                                            <th className="px-4 py-3">Tanggal</th>
                                            <th className="px-4 py-3">No. Nota</th>
                                            <th className="px-4 py-3">Pasien</th>
                                            <th className="px-4 py-3">Keterangan</th>
                                            <th className="px-4 py-3 text-right">Total Tagihan</th>
                                            <th className="px-4 py-3 text-center">Status</th>
                                            <th className="px-4 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm font-bold text-gray-700 dark:text-gray-300">
                                        {riwayatData.length === 0 ? (
                                            <tr>
                                                <td colSpan="7" className="text-center py-20 text-gray-400 italic">Data tidak ditemukan</td>
                                            </tr>
                                        ) : (
                                            riwayatData.map((row) => (
                                                <tr key={row.nota_jual} className="border-b border-gray-50 dark:border-gray-800 hover:bg-emerald-50/30 group">
                                                    <td className="px-4 py-4 text-xs font-medium">
                                                        {format(new Date(row.tgl_jual), 'dd MMM yyyy', { locale: id })}
                                                    </td>
                                                    <td className="px-4 py-4 text-emerald-600 font-black">{row.nota_jual}</td>
                                                    <td className="px-4 py-4">
                                                        <div className="flex flex-col">
                                                            <span>{row.nm_pasien || 'UMUM'}</span>
                                                            <span className="text-[10px] text-gray-400">{row.no_rkm_medis || '-'}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-xs font-medium text-gray-500">{row.keterangan || '-'}</td>
                                                    <td className="px-4 py-4 text-right font-black">
                                                        {formatCurrency(Number(row.ppn) + (row.detail?.reduce((acc, d) => acc + Number(d.total), 0) || 0))}
                                                    </td>
                                                    <td className="px-4 py-4 text-center">
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black ${row.status === 'Lunas' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                                            {row.status?.toUpperCase() || 'LUNAS'}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-4 text-right">
                                                        <button
                                                            onClick={() => handlePrint(row.nota_jual)}
                                                            className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:shadow-md"
                                                        >
                                                            <Printer className="w-4 h-4 text-gray-600" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* MODALS */}

                {/* Payment Modal */}
                <Modal show={showPaymentModal} onClose={() => setShowPaymentModal(false)} maxWidth="lg">
                    <div className="p-8 bg-white dark:bg-gray-900 rounded-3xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white">KONFIRMASI PEMBAYARAN</h2>
                            <button onClick={() => setShowPaymentModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl"><X className="w-6 h-6" /></button>
                        </div>

                        <div className="p-6 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl mb-6 text-center">
                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest block mb-2">Total yang harus dibayar</span>
                            <div className="text-4xl font-black text-emerald-700 dark:text-emerald-400">{formatCurrency(totals.grandTotal)}</div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <InputLabel value="JUMLAH BAYAR (TUNAI/TRANSFER)" className="text-xs font-black text-gray-400 mb-2" />
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 font-black text-2xl">Rp</span>
                                    <input
                                        type="number"
                                        autoFocus
                                        value={data.bayar}
                                        onChange={e => setData('bayar', e.target.value)}
                                        className="w-full py-6 pl-16 pr-6 bg-gray-100 dark:bg-gray-800 border-none rounded-2xl font-black text-4xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between items-center px-4">
                                <span className="font-bold text-gray-500">KEMBALIAN</span>
                                <span className={`text-2xl font-black ${totals.kembali >= 0 ? 'text-blue-600' : 'text-red-500'}`}>
                                    {formatCurrency(totals.kembali)}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setData('bayar', totals.grandTotal)}
                                    className="py-3 bg-gray-100 dark:bg-gray-800 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                                >
                                    Uang Pas
                                </button>
                                <button
                                    onClick={() => setData('bayar', Math.round(Number(totals.grandTotal || 0) / 500) * 500)}
                                    className="py-3 bg-gray-100 dark:bg-gray-800 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                                >
                                    Pecahan Terdekat
                                </button>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={totals.kembali < 0 || processing}
                                className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-xl shadow-2xl shadow-emerald-500/30 transition-all active:scale-95 disabled:bg-gray-300 disabled:shadow-none"
                            >
                                {processing ? 'MEMPROSES...' : 'SELESAIKAN TRANSAKSI'}
                            </button>
                        </div>
                    </div>
                </Modal>

                {/* Racikan Modal (Simplified) */}
                <Modal show={showRacikanModal} onClose={() => setShowRacikanModal(false)} maxWidth="2xl">
                    <div className="p-8 bg-white dark:bg-gray-900 rounded-3xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white">BUAT OBAT RACIKAN</h2>
                            <button onClick={() => setShowRacikanModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl"><X className="w-6 h-6" /></button>
                        </div>
                        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 rounded-2xl mb-6 flex gap-3 text-sm">
                            <Info className="w-5 h-5 flex-shrink-0" />
                            <span>Fitur racikan memungkinkan Anda menggabungkan beberapa baranh menjadi satu kesatuan resep.</span>
                        </div>
                        {/* More complex UI would go here for adding components to a racikan */}
                        <div className="flex flex-col gap-4">
                            <TextInput placeholder="Nama Racikan (mis: Racikan Batuk Dewasa)" className="w-full" />
                            <select className="w-full bg-gray-100 border-none rounded-xl">
                                <option>Metode Pulvis</option>
                                <option>Metode Kapsul</option>
                                <option>Metode Salep</option>
                            </select>
                            <div className="text-right">
                                <button className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-black">SIMPAN RACIKAN</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </LayoutPOS>
    );
}
