import React, { useState, useEffect } from 'react';
import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AppLayout from '@/Layouts/AppLayout';
import SidebarRalan from '@/Layouts/SidebarRalan';

export default function Create({ category = 'rawat-jalan', polikliniks, bangsals, penjaabs, kategoris }) {
    const { url } = usePage();
    
    // Cek apakah category dari query parameter atau props
    const urlParams = new URLSearchParams(url.split('?')[1] || '');
    const categoryFromUrl = urlParams.get('category') || category;
    
    // Tentukan layout berdasarkan category
    const useRalanLayout = categoryFromUrl === 'rawat-jalan';
    
    // State untuk modal kategori
    const [showKategoriModal, setShowKategoriModal] = useState(false);
    const [kategoriOptions, setKategoriOptions] = useState(
        (kategoris || []).map((k) => ({
            value: k.kd_kategori,
            label: `${k.kd_kategori} - ${k.nm_kategori}`
        }))
    );

    // Sinkronisasi kategoriOptions ketika kategoris berubah
    useEffect(() => {
        const newOptions = (kategoris || []).map((k) => ({
            value: k.kd_kategori,
            label: `${k.kd_kategori} - ${k.nm_kategori}`
        }));
        setKategoriOptions(newOptions);
    }, [kategoris]);

    // State untuk modal poliklinik
    const [showPoliklinikModal, setShowPoliklinikModal] = useState(false);
    const [poliklinikOptions, setPoliklinikOptions] = useState(
        (polikliniks || []).map((p) => ({
            value: p.kd_poli,
            label: `${p.kd_poli} - ${p.nm_poli}`
        }))
    );

    // Sinkronisasi poliklinikOptions ketika polikliniks berubah
    useEffect(() => {
        const newOptions = (polikliniks || []).map((p) => ({
            value: p.kd_poli,
            label: `${p.kd_poli} - ${p.nm_poli}`
        }));
        setPoliklinikOptions(newOptions);
    }, [polikliniks]);

    // State untuk modal penjab (Cara Bayar)
    const [showPenjabModal, setShowPenjabModal] = useState(false);
    const [penjabOptions, setPenjabOptions] = useState(
        (penjaabs || []).map((p) => ({
            value: p.kd_pj,
            label: `${p.kd_pj} - ${p.png_jawab}`
        }))
    );

    // Sinkronisasi penjabOptions ketika penjaabs berubah
    useEffect(() => {
        const newOptions = (penjaabs || []).map((p) => ({
            value: p.kd_pj,
            label: `${p.kd_pj} - ${p.png_jawab}`
        }));
        setPenjabOptions(newOptions);
    }, [penjaabs]);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        kd_jenis_prw: '',
        nm_perawatan: '',
        kd_kategori: '',
        kd_poli: '',
        kd_bangsal: '',
        kelas: '',
        kd_pj: '',
        status: '1',
        material: '0',
        bhp: '0',
        tarif_tindakandr: '0',
        tarif_tindakanpr: '0',
        kso: '0',
        menejemen: '0',
        show_total_dokter: true,
        show_total_perawat: true,
        show_total_dokter_perawat: true,
        category: categoryFromUrl,
    });

    const [totals, setTotals] = useState({
        total_dokter: 0,
        total_perawat: 0,
        total_dokter_perawat: 0,
    });

    const [focusedField, setFocusedField] = useState(null);

    // Form untuk tambah Kategori Perawatan
    const kategoriForm = useForm({
        kd_kategori: '',
        nm_kategori: '',
    });

    // Form untuk tambah Poliklinik
    const poliklinikForm = useForm({
        kd_poli: '',
        nm_poli: '',
        registrasi: '0',
        registrasilama: '0',
    });

    // Form untuk tambah Penjab (Cara Bayar)
    const penjabForm = useForm({
        kd_pj: '',
        png_jawab: '',
        nama_perusahaan: '',
        alamat_asuransi: '',
        no_telp: '',
        attn: '',
    });

    // Generate kode kategori otomatis saat modal dibuka
    const generateKodeKategori = async () => {
        try {
            const response = await fetch(route('kategori-perawatan.generate-kode'));
            const result = await response.json();
            if (result.success && result.kode) {
                kategoriForm.setData('kd_kategori', result.kode);
            }
        } catch (error) {
            console.error('Error generating kategori code:', error);
        }
    };

    // Generate kode otomatis saat modal dibuka
    useEffect(() => {
        if (showKategoriModal) {
            generateKodeKategori();
        }
    }, [showKategoriModal]);

    // Generate kode poliklinik otomatis saat modal dibuka
    const generateKodePoliklinik = async () => {
        try {
            const response = await fetch(route('poliklinik.generate-kode'));
            const result = await response.json();
            if (result.success && result.kode) {
                poliklinikForm.setData('kd_poli', result.kode);
            }
        } catch (error) {
            console.error('Error generating poliklinik code:', error);
        }
    };

    // Generate kode otomatis saat modal poliklinik dibuka
    useEffect(() => {
        if (showPoliklinikModal) {
            generateKodePoliklinik();
        }
    }, [showPoliklinikModal]);

    // Generate kode penjab otomatis saat modal dibuka
    const generateKodePenjab = async () => {
        try {
            const response = await fetch(route('penjab.generate-kode'));
            const result = await response.json();
            if (result.success && result.kode) {
                penjabForm.setData('kd_pj', result.kode);
            }
        } catch (error) {
            console.error('Error generating penjab code:', error);
        }
    };

    // Generate kode otomatis saat modal penjab dibuka
    useEffect(() => {
        if (showPenjabModal) {
            generateKodePenjab();
        }
    }, [showPenjabModal]);

    // Auto-generate kode when kategori changes
    const generateAutoCode = async (kdKategori) => {
        if (!kdKategori) return;
        
        try {
            const response = await fetch(route('daftar-tarif.generate-kode') + `?kd_kategori=${kdKategori}&category=${categoryFromUrl}`);
            const result = await response.json();
            if (result.success) {
                setData('kd_jenis_prw', result.kode);
            }
        } catch (error) {
            console.error('Error generating code:', error);
        }
    };

    // Handle kategori change
    const handleKategoriChange = (value) => {
        setData('kd_kategori', value);
        generateAutoCode(value);
    };

    // Handler untuk submit popup Kategori Perawatan
    const handleTambahKategori = (e) => {
        e.preventDefault();
        kategoriForm.post(route('kategori-perawatan.store'), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page) => {
                // Cek apakah ada data yang baru dibuat dari flash message
                const createdData = page.props.flash?.kategoriPerawatanCreated;
                if (createdData) {
                    const newKode = createdData.kd_kategori;
                    const newNama = createdData.nm_kategori;
                    if (newKode) {
                        // Set value ke form utama
                        setData('kd_kategori', newKode);
                        
                        // Tambahkan ke options dropdown
                        const newOption = {
                            value: newKode,
                            label: `${newKode} - ${newNama}`,
                        };
                        setKategoriOptions((prev) => {
                            // Cek apakah sudah ada, jika belum tambahkan
                            const exists = prev.find((opt) => opt.value === newKode);
                            if (!exists) {
                                return [...prev, newOption];
                            }
                            return prev;
                        });
                        
                        // Generate kode otomatis setelah kategori dipilih
                        generateAutoCode(newKode);
                    }
                }
                
                // Tutup modal dan reset form
                setShowKategoriModal(false);
                kategoriForm.reset();
                kategoriForm.setData('kd_kategori', ''); // Reset kode setelah success (akan di-generate ulang saat modal dibuka)
                
                // Reload kategoris dari server untuk sinkronisasi
                router.reload({
                    only: ['kategoris'],
                    preserveScroll: true,
                    preserveState: true,
                });
            },
            onError: () => {
                // Tetap buka modal jika ada error agar user bisa melihat error
                // Error akan otomatis ditampilkan oleh Inertia form
            },
        });
    };

    // Handler untuk submit popup Poliklinik
    const handleTambahPoliklinik = (e) => {
        e.preventDefault();
        poliklinikForm.post(route('poliklinik.store'), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page) => {
                // Cek apakah ada data yang baru dibuat dari flash message
                const createdData = page.props.flash?.poliklinikCreated;
                if (createdData) {
                    const newKode = createdData.kd_poli;
                    const newNama = createdData.nm_poli;
                    if (newKode) {
                        // Set value ke form utama
                        setData('kd_poli', newKode);
                        
                        // Tambahkan ke options dropdown
                        const newOption = {
                            value: newKode,
                            label: `${newKode} - ${newNama}`,
                        };
                        setPoliklinikOptions((prev) => {
                            // Cek apakah sudah ada, jika belum tambahkan
                            const exists = prev.find((opt) => opt.value === newKode);
                            if (!exists) {
                                return [...prev, newOption];
                            }
                            return prev;
                        });
                    }
                }
                
                // Tutup modal dan reset form
                setShowPoliklinikModal(false);
                poliklinikForm.reset();
                poliklinikForm.setData('kd_poli', ''); // Reset kode setelah success (akan di-generate ulang saat modal dibuka)
                poliklinikForm.setData('registrasi', '0');
                poliklinikForm.setData('registrasilama', '0');
                
                // Reload polikliniks dari server untuk sinkronisasi
                router.reload({
                    only: ['polikliniks'],
                    preserveScroll: true,
                    preserveState: true,
                });
            },
            onError: () => {
                // Tetap buka modal jika ada error agar user bisa melihat error
                // Error akan otomatis ditampilkan oleh Inertia form
            },
        });
    };

    // Handler untuk submit popup Penjab (Cara Bayar)
    const handleTambahPenjab = (e) => {
        e.preventDefault();
        penjabForm.post(route('penjab.store'), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page) => {
                // Cek apakah ada data yang baru dibuat dari flash message
                const createdData = page.props.flash?.penjabCreated;
                if (createdData) {
                    const newKode = createdData.kd_pj;
                    const newNama = createdData.png_jawab;
                    if (newKode) {
                        // Set value ke form utama
                        setData('kd_pj', newKode);
                        
                        // Tambahkan ke options dropdown
                        const newOption = {
                            value: newKode,
                            label: `${newKode} - ${newNama}`,
                        };
                        setPenjabOptions((prev) => {
                            // Cek apakah sudah ada, jika belum tambahkan
                            const exists = prev.find((opt) => opt.value === newKode);
                            if (!exists) {
                                return [...prev, newOption];
                            }
                            return prev;
                        });
                    }
                }
                
                // Tutup modal dan reset form
                setShowPenjabModal(false);
                penjabForm.reset();
                penjabForm.setData('kd_pj', ''); // Reset kode setelah success (akan di-generate ulang saat modal dibuka)
                penjabForm.setData('nama_perusahaan', '');
                penjabForm.setData('alamat_asuransi', '');
                penjabForm.setData('no_telp', '');
                penjabForm.setData('attn', '');
                
                // Reload penjaabs dari server untuk sinkronisasi
                router.reload({
                    only: ['penjaabs'],
                    preserveScroll: true,
                    preserveState: true,
                });
            },
            onError: () => {
                // Tetap buka modal jika ada error agar user bisa melihat error
                // Error akan otomatis ditampilkan oleh Inertia form
            },
        });
    };

    // Handle numeric input with proper zero handling
    const handleNumericInput = (field, value) => {
        // Allow empty string or valid numbers, but store as integers
        if (value === '') {
            setData(field, '');
        } else if (!isNaN(value) && value >= 0) {
            // Parse as integer to avoid decimals
            const intValue = parseInt(value) || 0;
            setData(field, intValue.toString());
        }
    };

    // Get display value for numeric inputs
    const getDisplayValue = (field) => {
        if (focusedField === field) {
            // When focused, show actual value (empty if 0)
            return data[field] === '0' || data[field] === 0 ? '' : data[field];
        }
        // When not focused, show 0 if empty, ensure integer display
        const value = data[field] || '0';
        const intValue = parseInt(value) || 0;
        return intValue.toString();
    };

    // Handle focus
    const onFocus = (field) => {
        setFocusedField(field);
    };

    // Handle blur
    const onBlur = (field) => {
        setFocusedField(null);
        // Set to '0' if empty
        if (!data[field] || data[field] === '') {
            setData(field, '0');
        }
    };

    // Calculate totals automatically
    useEffect(() => {
        const material = parseInt(data.material) || 0;
        const bhp = parseInt(data.bhp) || 0;
        const tarif_tindakandr = parseInt(data.tarif_tindakandr) || 0;
        const tarif_tindakanpr = parseInt(data.tarif_tindakanpr) || 0;
        const kso = parseInt(data.kso) || 0;
        const menejemen = parseInt(data.menejemen) || 0;

        const total_dokter = material + bhp + tarif_tindakandr + kso + menejemen;
        const total_perawat = material + bhp + tarif_tindakanpr + kso + menejemen;
        const total_dokter_perawat = material + bhp + tarif_tindakandr + tarif_tindakanpr + kso + menejemen;

        setTotals({
            total_dokter,
            total_perawat,
            total_dokter_perawat,
        });
    }, [data.material, data.bhp, data.tarif_tindakandr, data.tarif_tindakanpr, data.kso, data.menejemen]);

    // Refresh CSRF token every 30 minutes
    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({ only: [] });
        }, 30 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validasi form sebelum submit
        if (categoryFromUrl === 'rawat-inap') {
            if (!data.kd_jenis_prw || !data.nm_perawatan || !data.kd_bangsal || !data.kelas || !data.kd_pj) {
                alert('Mohon lengkapi semua field yang wajib diisi (bertanda *)');
                return;
            }
        } else {
            if (!data.kd_jenis_prw || !data.nm_perawatan || !data.kd_poli || !data.kd_pj) {
                alert('Mohon lengkapi semua field yang wajib diisi (bertanda *)');
                return;
            }
        }
        
        // Tentukan endpoint berdasarkan kategori
        const endpoint = categoryFromUrl === 'rawat-inap' 
            ? route('daftar-tarif.store-rawat-inap')
            : route('daftar-tarif.store');
        
        post(endpoint, {
            onSuccess: () => {
                reset();
                alert('✅ Data tarif berhasil disimpan!');
                // Redirect ke halaman index setelah berhasil
                router.visit(route('daftar-tarif.index'));
            },
            onError: (errors) => {
                // Handle validation errors
                if (errors.kd_jenis_prw && errors.kd_jenis_prw.includes('already been taken')) {
                    alert('❌ Kode jenis perawatan sudah digunakan. Silakan generate kode baru.');
                } else if (errors.csrf) {
                    router.reload();
                } else {
                    alert('❌ Terjadi kesalahan saat menyimpan data. Silakan periksa kembali form Anda.');
                }
            },
        });
    };

    // Handle Enter key press to move to next input field
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            
            // Find all focusable elements in the form
            const form = e.target.closest('form');
            const focusableElements = form.querySelectorAll(
                'input[type="text"], input[type="number"], select, textarea, button[type="submit"]'
            );
            
            // Convert NodeList to Array
            const focusableArray = Array.from(focusableElements);
            
            // Find current element index
            const currentIndex = focusableArray.indexOf(e.target);
            
            // Move to next element, or submit if at the end
            if (currentIndex >= 0 && currentIndex < focusableArray.length - 1) {
                const nextElement = focusableArray[currentIndex + 1];
                nextElement.focus();
                
                // If next element is a select, open it
                if (nextElement.tagName === 'SELECT') {
                    nextElement.click();
                }
            } else if (currentIndex === focusableArray.length - 1) {
                // If we're at the last element (submit button), trigger form submission
                handleSubmit(e);
            }
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    // Dynamic title and description based on category
    const getCategoryTitle = () => {
        switch(categoryFromUrl) {
            case 'rawat-inap':
                return 'Tambah Tarif Rawat Inap';
            case 'rawat-jalan':
                return 'Tambah Tarif Rawat Jalan';
            case 'laboratorium':
                return 'Tambah Tarif Laboratorium';
            case 'radiologi':
                return 'Tambah Tarif Radiologi';
            case 'operasi':
                return 'Tambah Tarif Operasi';
            default:
                return 'Tambah Tarif Perawatan';
        }
    };

    const getCategoryDescription = () => {
        switch(categoryFromUrl) {
            case 'rawat-inap':
                return 'Isi form di bawah untuk menambahkan tarif rawat inap baru';
            case 'rawat-jalan':
                return 'Isi form di bawah untuk menambahkan tarif rawat jalan baru';
            case 'laboratorium':
                return 'Isi form di bawah untuk menambahkan tarif laboratorium baru';
            case 'radiologi':
                return 'Isi form di bawah untuk menambahkan tarif radiologi baru';
            case 'operasi':
                return 'Isi form di bawah untuk menambahkan tarif operasi baru';
            default:
                return 'Isi form di bawah untuk menambahkan tarif perawatan baru';
        }
    };

    // Content yang akan di-render
    const content = (
        <>
            <Head title={getCategoryTitle()} />

            <div className={useRalanLayout ? "" : "py-12"}>
                <div className={useRalanLayout ? "space-y-6" : "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6"}>
                    {/* Header */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {getCategoryTitle()}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        {getCategoryDescription()}
                                    </p>
                                </div>
                                <Link
                                    href={route('daftar-tarif.index', { category: categoryFromUrl })}
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Kembali
                                </Link>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Form Fields */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    📝 Informasi Dasar
                                </h3>
                                
                                {/* Two Column Layout */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Left Column */}
                                    <div className="space-y-4">
                                        {/* Kategori: Dropdown dengan Popup */}
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Kategori <span className="text-red-500">*</span>
                                            </label>
                                            <div className="md:col-span-3">
                                                <div className="flex gap-2">
                                                    <div className="flex-1">
                                                        <select
                                                            value={data.kd_kategori}
                                                            onChange={(e) => {
                                                                setData('kd_kategori', e.target.value);
                                                                generateAutoCode(e.target.value);
                                                            }}
                                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                            required
                                                        >
                                                            <option value="">Pilih Kategori</option>
                                                            {kategoriOptions.map((kategori) => (
                                                                <option key={kategori.value} value={kategori.value}>
                                                                    {kategori.label}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowKategoriModal(true)}
                                                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                                                        title="Tambah Kategori Perawatan Baru"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                            className="w-5 h-5"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                                {errors.kd_kategori && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.kd_kategori}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Kode Jenis Perawatan */}
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Kode Jenis Perawatan <span className="text-red-500">*</span>
                                            </label>
                                            <div className="md:col-span-3">
                                                <input
                                                    type="text"
                                                    value={data.kd_jenis_prw}
                                                    onChange={(e) => setData('kd_jenis_prw', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                    placeholder="Kode akan dibuat otomatis"
                                                    required
                                                />
                                                {errors.kd_jenis_prw && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.kd_jenis_prw}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Nama Perawatan */}
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Nama Perawatan <span className="text-red-500">*</span>
                                            </label>
                                            <div className="md:col-span-3">
                                                <input
                                                    type="text"
                                                    value={data.nm_perawatan}
                                                    onChange={(e) => setData('nm_perawatan', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                    placeholder="Masukkan nama perawatan"
                                                    required
                                                />
                                                {errors.nm_perawatan && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.nm_perawatan}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-4">
                                        {/* Bangsal (untuk rawat-inap) */}
                                        {categoryFromUrl === 'rawat-inap' && (
                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Bangsal <span className="text-red-500">*</span>
                                                </label>
                                                <div className="md:col-span-3">
                                                    <select
                                                        value={data.kd_bangsal}
                                                        onChange={(e) => setData('kd_bangsal', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                        required
                                                    >
                                                        <option value="">Pilih Bangsal</option>
                                                        {bangsals.map((bangsal) => (
                                                            <option key={bangsal.kd_bangsal} value={bangsal.kd_bangsal}>
                                                                {bangsal.kd_bangsal} - {bangsal.nm_bangsal}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {errors.kd_bangsal && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.kd_bangsal}</p>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Poliklinik (untuk rawat-jalan): Dropdown dengan Popup */}
                                        {categoryFromUrl === 'rawat-jalan' && (
                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Poliklinik <span className="text-red-500">*</span>
                                                </label>
                                                <div className="md:col-span-3">
                                                    <div className="flex gap-2">
                                                        <div className="flex-1">
                                                            <select
                                                                value={data.kd_poli}
                                                                onChange={(e) => setData('kd_poli', e.target.value)}
                                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                                required
                                                            >
                                                                <option value="">Pilih Poliklinik</option>
                                                                {poliklinikOptions.map((poli) => (
                                                                    <option key={poli.value} value={poli.value}>
                                                                        {poli.label}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPoliklinikModal(true)}
                                                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                                                            title="Tambah Poliklinik Baru"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 24 24"
                                                                fill="currentColor"
                                                                className="w-5 h-5"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    {errors.kd_poli && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.kd_poli}</p>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Cara Bayar: Dropdown dengan Popup */}
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Cara Bayar <span className="text-red-500">*</span>
                                            </label>
                                            <div className="md:col-span-3">
                                                <div className="flex gap-2">
                                                    <div className="flex-1">
                                                        <select
                                                            value={data.kd_pj}
                                                            onChange={(e) => setData('kd_pj', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                            required
                                                        >
                                                            <option value="">Pilih Cara Bayar</option>
                                                            {penjabOptions.map((penjab) => (
                                                                <option key={penjab.value} value={penjab.value}>
                                                                    {penjab.label}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPenjabModal(true)}
                                                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                                                        title="Tambah Cara Bayar Baru"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                            className="w-5 h-5"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                                {errors.kd_pj && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.kd_pj}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Kelas (khusus rawat-inap) */}
                                        {categoryFromUrl === 'rawat-inap' && (
                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Kelas <span className="text-red-500">*</span>
                                                </label>
                                                <div className="md:col-span-3">
                                                    <select
                                                        value={data.kelas}
                                                        onChange={(e) => setData('kelas', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                        required
                                                    >
                                                        <option value="">Pilih Kelas</option>
                                                        <option value="Kelas 1">Kelas 1</option>
                                                        <option value="Kelas 2">Kelas 2</option>
                                                        <option value="Kelas 3">Kelas 3</option>
                                                        <option value="Kelas Utama">Kelas Utama</option>
                                                        <option value="Kelas VIP">Kelas VIP</option>
                                                        <option value="Kelas VVIP">Kelas VVIP</option>
                                                    </select>
                                                    {errors.kelas && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.kelas}</p>
                                                    )}
                                                </div>
                                            </div>
                                        )}


                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Komponen Tarif - 3 Kolom Layout */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    💰 Komponen Tarif
                                </h3>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                    {/* Kolom 1: Bagian RS & BHP */}
                                    <div className="space-y-4">
                                        {/* Bagian RS */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Bagian RS <span className="text-red-500">*</span>
                                            </label>
                                            <div className="md:col-span-2">
                                                <input
                                                    type="text"
                                                    value={getDisplayValue('material')}
                                                    onChange={(e) => handleNumericInput('material', e.target.value)}
                                                    onFocus={() => onFocus('material')}
                                                    onBlur={() => onBlur('material')}
                                                    onKeyDown={handleKeyDown}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                    placeholder="0"
                                                    required
                                                />
                                                {errors.material && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.material}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* BHP */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                BHP <span className="text-red-500">*</span>
                                            </label>
                                            <div className="md:col-span-2">
                                                <input
                                                    type="text"
                                                    value={getDisplayValue('bhp')}
                                                    onChange={(e) => handleNumericInput('bhp', e.target.value)}
                                                    onFocus={() => onFocus('bhp')}
                                                    onBlur={() => onBlur('bhp')}
                                                    onKeyDown={handleKeyDown}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                    placeholder="0"
                                                    required
                                                />
                                                {errors.bhp && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.bhp}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Kolom 2: Jasa Dokter & Jasa Perawat */}
                                    <div className="space-y-4">
                                        {/* Jasa Dokter */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Jasa Dokter <span className="text-red-500">*</span>
                                            </label>
                                            <div className="md:col-span-2">
                                                <input
                                                    type="text"
                                                    value={getDisplayValue('tarif_tindakandr')}
                                                    onChange={(e) => handleNumericInput('tarif_tindakandr', e.target.value)}
                                                    onFocus={() => onFocus('tarif_tindakandr')}
                                                    onBlur={() => onBlur('tarif_tindakandr')}
                                                    onKeyDown={handleKeyDown}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                    placeholder="0"
                                                    required
                                                />
                                                {errors.tarif_tindakandr && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.tarif_tindakandr}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Jasa Perawat */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Jasa Perawat <span className="text-red-500">*</span>
                                            </label>
                                            <div className="md:col-span-2">
                                                <input
                                                    type="text"
                                                    value={getDisplayValue('tarif_tindakanpr')}
                                                    onChange={(e) => handleNumericInput('tarif_tindakanpr', e.target.value)}
                                                    onFocus={() => onFocus('tarif_tindakanpr')}
                                                    onBlur={() => onBlur('tarif_tindakanpr')}
                                                    onKeyDown={handleKeyDown}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                    placeholder="0"
                                                    required
                                                />
                                                {errors.tarif_tindakanpr && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.tarif_tindakanpr}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Kolom 3: KSO & Menejemen */}
                                    <div className="space-y-4">
                                        {/* KSO */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                KSO <span className="text-red-500">*</span>
                                            </label>
                                            <div className="md:col-span-2">
                                                <input
                                                    type="text"
                                                    value={getDisplayValue('kso')}
                                                    onChange={(e) => handleNumericInput('kso', e.target.value)}
                                                    onFocus={() => onFocus('kso')}
                                                    onBlur={() => onBlur('kso')}
                                                    onKeyDown={handleKeyDown}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                    placeholder="0"
                                                    required
                                                />
                                                {errors.kso && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.kso}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Menejemen */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Menejemen <span className="text-red-500">*</span>
                                            </label>
                                            <div className="md:col-span-2">
                                                <input
                                                    type="text"
                                                    value={getDisplayValue('menejemen')}
                                                    onChange={(e) => handleNumericInput('menejemen', e.target.value)}
                                                    onFocus={() => onFocus('menejemen')}
                                                    onBlur={() => onBlur('menejemen')}
                                                    onKeyDown={handleKeyDown}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                    placeholder="0"
                                                    required
                                                />
                                                {errors.menejemen && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.menejemen}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Perhitungan Total Tarif */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                    📊 Perhitungan Total Tarif
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                    Pilih total yang ingin ditampilkan
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Total Dokter */}
                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 border-2 border-green-200 dark:border-green-700 shadow-sm">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-sm font-medium text-green-700 dark:text-green-300">
                                                🟢 Total Dokter
                                            </h4>
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={data.show_total_dokter}
                                                    onChange={(e) => setData('show_total_dokter', e.target.checked)}
                                                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 transition-all duration-200"
                                                />
                                                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Aktif</span>
                                            </label>
                                        </div>
                                        <div className="text-xl font-bold text-green-600 dark:text-green-400">
                                            {formatCurrency(totals.total_dokter)}
                                        </div>
                                    </div>

                                    {/* Total Perawat */}
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border-2 border-blue-200 dark:border-blue-700 shadow-sm">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                                🔵 Total Perawat
                                            </h4>
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={data.show_total_perawat}
                                                    onChange={(e) => setData('show_total_perawat', e.target.checked)}
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 transition-all duration-200"
                                                />
                                                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Aktif</span>
                                            </label>
                                        </div>
                                        <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                                            {formatCurrency(totals.total_perawat)}
                                        </div>
                                    </div>

                                    {/* Total Dokter + Perawat */}
                                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-lg p-4 border-2 border-purple-200 dark:border-purple-700 shadow-sm">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-sm font-medium text-purple-700 dark:text-purple-300">
                                                🟣 Total Dokter + Perawat
                                            </h4>
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={data.show_total_dokter_perawat}
                                                    onChange={(e) => setData('show_total_dokter_perawat', e.target.checked)}
                                                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 transition-all duration-200"
                                                />
                                                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Aktif</span>
                                            </label>
                                        </div>
                                        <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                                            {formatCurrency(totals.total_dokter_perawat)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-4">
                                <div className="flex justify-end gap-4">
                                    <Link
                                        href={route('daftar-tarif.index')}
                                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-all duration-200 shadow-sm"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg"
                                    >
                                        {processing && (
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        )}
                                        {processing ? 'Menyimpan...' : 'Simpan Tarif'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Modal Tambah Kategori Perawatan */}
            {showKategoriModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700">
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Tambah Kategori Perawatan Baru
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowKategoriModal(false);
                                        kategoriForm.reset();
                                        kategoriForm.setData('kd_kategori', ''); // Reset kode saat modal ditutup
                                    }}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-6 h-6"
                                    >
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleTambahKategori} className="space-y-4">
                                {/* Kode Kategori */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Kode Kategori *
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={kategoriForm.data.kd_kategori}
                                            onChange={(e) => kategoriForm.setData("kd_kategori", e.target.value)}
                                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="Kode akan dibuat otomatis"
                                            maxLength="5"
                                            required
                                            readOnly
                                        />
                                        <button
                                            type="button"
                                            onClick={generateKodeKategori}
                                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                                            title="Generate Kode Baru"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-5 h-5"
                                            >
                                                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0118.8-4.3M22 12.5a10 10 0 01-18.8 4.2" />
                                            </svg>
                                        </button>
                                    </div>
                                    {kategoriForm.errors.kd_kategori && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {kategoriForm.errors.kd_kategori}
                                        </p>
                                    )}
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        Kode akan dibuat otomatis dengan format KPXXX (contoh: KP001, KP002)
                                    </p>
                                </div>

                                {/* Nama Kategori */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Nama Kategori *
                                    </label>
                                    <input
                                        type="text"
                                        value={kategoriForm.data.nm_kategori}
                                        onChange={(e) => kategoriForm.setData("nm_kategori", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        placeholder="Masukkan nama kategori (max 30 karakter)"
                                        maxLength="30"
                                        required
                                    />
                                    {kategoriForm.errors.nm_kategori && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {kategoriForm.errors.nm_kategori}
                                        </p>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowKategoriModal(false);
                                            kategoriForm.reset();
                                            kategoriForm.setData('kd_kategori', ''); // Reset kode saat modal ditutup
                                        }}
                                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={kategoriForm.processing}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
                                    >
                                        {kategoriForm.processing ? "Menyimpan..." : "Simpan"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Tambah Poliklinik */}
            {showPoliklinikModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700">
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Tambah Poliklinik Baru
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowPoliklinikModal(false);
                                        poliklinikForm.reset();
                                        poliklinikForm.setData('kd_poli', ''); // Reset kode saat modal ditutup
                                        poliklinikForm.setData('registrasi', '0');
                                        poliklinikForm.setData('registrasilama', '0');
                                    }}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-6 h-6"
                                    >
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleTambahPoliklinik} className="space-y-4">
                                {/* Kode Poliklinik */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Kode Poliklinik *
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={poliklinikForm.data.kd_poli}
                                            onChange={(e) => poliklinikForm.setData("kd_poli", e.target.value)}
                                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="Kode akan dibuat otomatis"
                                            maxLength="5"
                                            required
                                            readOnly
                                        />
                                        <button
                                            type="button"
                                            onClick={generateKodePoliklinik}
                                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                                            title="Generate Kode Baru"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-5 h-5"
                                            >
                                                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0118.8-4.3M22 12.5a10 10 0 01-18.8 4.2" />
                                            </svg>
                                        </button>
                                    </div>
                                    {poliklinikForm.errors.kd_poli && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {poliklinikForm.errors.kd_poli}
                                        </p>
                                    )}
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        Kode akan dibuat otomatis dengan format UXXXX (contoh: U0001, U0002)
                                    </p>
                                </div>

                                {/* Nama Poliklinik */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Nama Poliklinik *
                                    </label>
                                    <input
                                        type="text"
                                        value={poliklinikForm.data.nm_poli}
                                        onChange={(e) => poliklinikForm.setData("nm_poli", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        placeholder="Masukkan nama poliklinik (max 50 karakter)"
                                        maxLength="50"
                                        required
                                    />
                                    {poliklinikForm.errors.nm_poli && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {poliklinikForm.errors.nm_poli}
                                        </p>
                                    )}
                                </div>

                                {/* Tarif Registrasi */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Tarif Registrasi *
                                    </label>
                                    <input
                                        type="number"
                                        value={poliklinikForm.data.registrasi}
                                        onChange={(e) => poliklinikForm.setData("registrasi", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        placeholder="Masukkan tarif registrasi"
                                        min="0"
                                        step="0.01"
                                        required
                                    />
                                    {poliklinikForm.errors.registrasi && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {poliklinikForm.errors.registrasi}
                                        </p>
                                    )}
                                </div>

                                {/* Tarif Registrasi Lama */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Tarif Registrasi Lama *
                                    </label>
                                    <input
                                        type="number"
                                        value={poliklinikForm.data.registrasilama}
                                        onChange={(e) => poliklinikForm.setData("registrasilama", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        placeholder="Masukkan tarif registrasi lama"
                                        min="0"
                                        step="0.01"
                                        required
                                    />
                                    {poliklinikForm.errors.registrasilama && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {poliklinikForm.errors.registrasilama}
                                        </p>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowPoliklinikModal(false);
                                            poliklinikForm.reset();
                                            poliklinikForm.setData('kd_poli', ''); // Reset kode saat modal ditutup
                                            poliklinikForm.setData('registrasi', '0');
                                            poliklinikForm.setData('registrasilama', '0');
                                        }}
                                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={poliklinikForm.processing}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
                                    >
                                        {poliklinikForm.processing ? "Menyimpan..." : "Simpan"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Tambah Penjab (Cara Bayar) */}
            {showPenjabModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Tambah Cara Bayar Baru
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowPenjabModal(false);
                                        penjabForm.reset();
                                        penjabForm.setData('kd_pj', ''); // Reset kode saat modal ditutup
                                        penjabForm.setData('nama_perusahaan', '');
                                        penjabForm.setData('alamat_asuransi', '');
                                        penjabForm.setData('no_telp', '');
                                        penjabForm.setData('attn', '');
                                    }}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-6 h-6"
                                    >
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleTambahPenjab} className="space-y-4">
                                {/* Kode Penjab */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Kode Cara Bayar *
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={penjabForm.data.kd_pj}
                                            onChange={(e) => penjabForm.setData("kd_pj", e.target.value)}
                                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="Kode akan dibuat otomatis"
                                            maxLength="3"
                                            required
                                            readOnly
                                        />
                                        <button
                                            type="button"
                                            onClick={generateKodePenjab}
                                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                                            title="Generate Kode Baru"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-5 h-5"
                                            >
                                                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0118.8-4.3M22 12.5a10 10 0 01-18.8 4.2" />
                                            </svg>
                                        </button>
                                    </div>
                                    {penjabForm.errors.kd_pj && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {penjabForm.errors.kd_pj}
                                        </p>
                                    )}
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        Kode akan dibuat otomatis dengan format AXX (contoh: A01, A02, A60)
                                    </p>
                                </div>

                                {/* Nama Penjamin */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Nama Penjamin *
                                    </label>
                                    <input
                                        type="text"
                                        value={penjabForm.data.png_jawab}
                                        onChange={(e) => penjabForm.setData("png_jawab", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        placeholder="Masukkan nama penjamin (max 30 karakter)"
                                        maxLength="30"
                                        required
                                    />
                                    {penjabForm.errors.png_jawab && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {penjabForm.errors.png_jawab}
                                        </p>
                                    )}
                                </div>

                                {/* Nama Perusahaan */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Nama Perusahaan
                                    </label>
                                    <input
                                        type="text"
                                        value={penjabForm.data.nama_perusahaan}
                                        onChange={(e) => penjabForm.setData("nama_perusahaan", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        placeholder="Masukkan nama perusahaan (max 60 karakter)"
                                        maxLength="60"
                                    />
                                    {penjabForm.errors.nama_perusahaan && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {penjabForm.errors.nama_perusahaan}
                                        </p>
                                    )}
                                </div>

                                {/* Alamat Asuransi */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Alamat Asuransi
                                    </label>
                                    <textarea
                                        value={penjabForm.data.alamat_asuransi}
                                        onChange={(e) => penjabForm.setData("alamat_asuransi", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                                        placeholder="Masukkan alamat asuransi (max 130 karakter)"
                                        maxLength="130"
                                        rows="3"
                                    />
                                    {penjabForm.errors.alamat_asuransi && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {penjabForm.errors.alamat_asuransi}
                                        </p>
                                    )}
                                </div>

                                {/* No Telp */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        No Telp
                                    </label>
                                    <input
                                        type="text"
                                        value={penjabForm.data.no_telp}
                                        onChange={(e) => penjabForm.setData("no_telp", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        placeholder="Masukkan no telp (max 40 karakter)"
                                        maxLength="40"
                                    />
                                    {penjabForm.errors.no_telp && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {penjabForm.errors.no_telp}
                                        </p>
                                    )}
                                </div>

                                {/* Attn */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Attn
                                    </label>
                                    <input
                                        type="text"
                                        value={penjabForm.data.attn}
                                        onChange={(e) => penjabForm.setData("attn", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        placeholder="Masukkan attn (max 60 karakter)"
                                        maxLength="60"
                                    />
                                    {penjabForm.errors.attn && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {penjabForm.errors.attn}
                                        </p>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowPenjabModal(false);
                                            penjabForm.reset();
                                            penjabForm.setData('kd_pj', ''); // Reset kode saat modal ditutup
                                            penjabForm.setData('nama_perusahaan', '');
                                            penjabForm.setData('alamat_asuransi', '');
                                            penjabForm.setData('no_telp', '');
                                            penjabForm.setData('attn', '');
                                        }}
                                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={penjabForm.processing}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
                                    >
                                        {penjabForm.processing ? "Menyimpan..." : "Simpan"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

    // Return dengan layout yang sesuai
    if (useRalanLayout) {
        return (
            <SidebarRalan title="Rawat Jalan">
                {content}
            </SidebarRalan>
        );
    }

    return (
        <AppLayout
            title={getCategoryTitle()}
            renderHeader={() => (
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {getCategoryTitle()}
                </h2>
            )}
        >
            {content}
        </AppLayout>
    );
}