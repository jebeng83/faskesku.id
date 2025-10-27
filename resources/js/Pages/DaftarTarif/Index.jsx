import React, { useState, useEffect } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AppLayout from '@/Layouts/AppLayout';
import laboratoriumRoutes from '@/routes/daftar-tarif/laboratorium';

// Simple Badge component
const Badge = ({ children, variant = 'default' }) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    const variantClasses = {
        default: 'bg-blue-100 text-blue-800',
        secondary: 'bg-gray-100 text-gray-800'
    };
    
    return (
        <span className={`${baseClasses} ${variantClasses[variant]}`}>
            {children}
        </span>
    );
};

// Modal Component for Add Tarif
const AddTarifModal = ({ isOpen, onClose, category, polikliniks = [], bangsals = [], penjaabs = [], kategoris = [], editData = null }) => {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        kd_jenis_prw: '',
        nm_perawatan: '',
        kd_kategori: '',
        material: 0,
        bhp: 0,
        tarif_tindakandr: 0,
        tarif_tindakanpr: 0,
        kso: 0,
        menejemen: 0,
        bagian_perujuk: 0,
        kd_pj: '',
        kd_poli: '',
        kd_bangsal: '',
        kelas: category === 'laboratorium' ? '-' : '',
        kategori: category === 'laboratorium' ? 'PK' : '',
        status: '1',
        category: category,
        total_dr: 0,
        total_pr: 0,
        total_drpr: 0,
        show_total_dokter: false,
        show_total_perawat: false,
        show_total_dokter_perawat: false
    });

    const isEditMode = !!editData;
    const [focusedField, setFocusedField] = useState(null);
    // Refs untuk navigasi Enter antar input (Laboratorium)
    const materialRef = React.useRef(null);
    const bhpRef = React.useRef(null);
    const drRef = React.useRef(null);
    const prRef = React.useRef(null);
    const perujukRef = React.useRef(null);
    const ksoRef = React.useRef(null);
    const manajemenRef = React.useRef(null);

    const handleEnterFocus = (e, nextRef) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (nextRef && nextRef.current) {
                nextRef.current.focus();
            }
        }
    };

    // Fungsi helper untuk format angka tanpa currency symbol
    const formatNumber = (amount) => {
        if (!amount || amount === 0) return '0';
        
        // Convert to number and round to remove decimals
        const numValue = Math.round(parseFloat(amount));
        
        return new Intl.NumberFormat('id-ID', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(numValue);
    };

    // Effect to populate form when editing
    useEffect(() => {
        if (editData) {
            // Debug: Log the values to see what we're getting from database
            console.log('Edit Data:', {
                total_byrdr: editData.total_byrdr,
                total_byrpr: editData.total_byrpr,
                total_byrdrpr: editData.total_byrdrpr
            });
            
            // Determine checkbox states based on existing total values - must be strictly greater than 0
            const showTotalDokter = editData.total_byrdr && parseFloat(editData.total_byrdr) > 0;
            const showTotalPerawat = editData.total_byrpr && parseFloat(editData.total_byrpr) > 0;
            const showTotalDokterPerawat = editData.total_byrdrpr && parseFloat(editData.total_byrdrpr) > 0;
            
            console.log('Checkbox States:', {
                showTotalDokter,
                showTotalPerawat,
                showTotalDokterPerawat
            });
            
            setData({
                kd_jenis_prw: editData.kd_jenis_prw || '',
                nm_perawatan: editData.nm_perawatan || '',
                kd_kategori: editData.kd_kategori || '',
                material: editData.material || 0,
                bhp: editData.bhp || 0,
                tarif_tindakandr: editData.tarif_tindakandr || 0,
                tarif_tindakanpr: editData.tarif_tindakanpr || 0,
                kso: editData.kso || 0,
                menejemen: editData.menejemen || 0,
                bagian_perujuk: editData.tarif_perujuk || editData.bagian_perujuk || 0,
                kd_pj: editData.kd_pj || '',
                kd_poli: editData.kd_poli || '',
                kd_bangsal: editData.kd_bangsal || '',
                kelas: editData.kelas || '',
                kategori: editData.kategori || '',
                status: editData.status || '1',
                category: category,
                total_dr: 0,
                total_pr: 0,
                total_drpr: 0,
                show_total_dokter: showTotalDokter,
                show_total_perawat: showTotalPerawat,
                show_total_dokter_perawat: showTotalDokterPerawat
            });
        } else {
            reset();
        }
    }, [editData, category]);

    // Function to generate auto code when kategori changes (only for new records)
    const generateAutoCode = async (kdKategori) => {
        if (!kdKategori || isEditMode) return;
        
        try {
            const response = await fetch(route('daftar-tarif.generate-kode') + `?kd_kategori=${kdKategori}&category=${category}`);
            const result = await response.json();
            if (result.success) {
                setData('kd_jenis_prw', result.kode);
            }
        } catch (error) {
            console.error('Error generating code:', error);
        }
    };

    // Handle kategori change
    const handleKategoriChange = (e) => {
        const kdKategori = e.target.value;
        setData('kd_kategori', kdKategori);
        
        // Auto generate code when kategori is selected (only for new records)
        if (kdKategori && !isEditMode) {
            generateAutoCode(kdKategori);
        } else if (!kdKategori && !isEditMode) {
            setData('kd_jenis_prw', '');
        }
    };

    // Helper function to handle numeric input behavior
    const handleNumericInput = (fieldName, value) => {
        if (value === '') {
            // If empty, set to 0
            setData(fieldName, 0);
        } else if (value === '0') {
            // If user types just '0', keep it as 0
            setData(fieldName, 0);
        } else if (/^\d*\.?\d*$/.test(value)) {
            // If valid number, remove leading zeros and parse as integer
            const cleanValue = value.replace(/^0+(?=\d)/, '');
            const numericValue = parseInt(cleanValue) || 0;
            setData(fieldName, numericValue);
        }
    };

    // Helper function to display value in input (show empty string instead of 0 when focused)
    const getDisplayValue = (value, isFocused = false) => {
        if (value === 0 && isFocused) {
            return '';
        }
        // Ensure we display integers without decimals
        const intValue = parseInt(value) || 0;
        return intValue === 0 ? '' : intValue.toString();
    };

    // Calculate total tarif
    const calculateTotal = () => {
        const material = parseInt(data.material) || 0;
        const bhp = parseInt(data.bhp) || 0;
        const tarif_tindakandr = parseInt(data.tarif_tindakandr) || 0;
        const tarif_tindakanpr = parseInt(data.tarif_tindakanpr) || 0;
        const kso = parseInt(data.kso) || 0;
        const menejemen = parseInt(data.menejemen) || 0;
        const bagian_perujuk = parseInt(data.bagian_perujuk) || 0;

        const totalDr = material + bhp + tarif_tindakandr + kso + menejemen;
        const totalPr = material + bhp + tarif_tindakanpr + kso + menejemen;
        const totalDrPr = material + bhp + tarif_tindakandr + tarif_tindakanpr + kso + menejemen;
        const totalLaborat = material + bhp + tarif_tindakandr + tarif_tindakanpr + bagian_perujuk + kso + menejemen;

        return { totalDr, totalPr, totalDrPr, totalLaborat };
    };

    const { totalDr, totalPr, totalDrPr, totalLaborat } = calculateTotal();

    // Function to validate form before submission
    const validateForm = () => {
        // Base required fields for all categories
        const baseRequiredFields = {
            'kd_jenis_prw': category === 'laboratorium' ? 'Kode Periksa' : 'Kode Jenis Perawatan',
            'nm_perawatan': category === 'laboratorium' ? 'Nama Pemeriksaan' : 'Nama Perawatan',
            'kd_kategori': 'Kategori Perawatan',
            'kd_pj': 'Asuransi / Penanggung Jawab'
        };
        
        // Category-specific required fields
        let categorySpecificFields = {};
        
        if (category === 'rawat-inap') {
            categorySpecificFields = {
                'kd_bangsal': 'Bangsal',
                'kelas': 'Kelas'
            };
        } else if (category === 'laboratorium') {
            categorySpecificFields = {
                'kelas': 'Kelas',
                'kategori': 'Kategori'
            };
        } else {
            // For rawat-jalan and other categories
            categorySpecificFields = {
                'kd_poli': 'Poli Klinik',
                'status': 'Status'
            };
        }
        
        // Combine all required fields
        const requiredFields = { ...baseRequiredFields, ...categorySpecificFields };
        
        const errors = {};
        
        Object.entries(requiredFields).forEach(([field, label]) => {
            if (!data[field] || data[field].toString().trim() === '') {
                errors[field] = `${label} harus diisi`;
            }
        });
        
        // Validate kd_jenis_prw format (should be alphanumeric, max 15 chars)
        if (data.kd_jenis_prw && data.kd_jenis_prw.length > 15) {
            errors.kd_jenis_prw = 'Kode Jenis Perawatan maksimal 15 karakter';
        }
        
        // Validate nm_perawatan length (max 80 chars)
        const maxNameLength = category === 'laboratorium' ? 100 : 80;
        if (data.nm_perawatan && data.nm_perawatan.length > maxNameLength) {
            errors.nm_perawatan = category === 'laboratorium' ? 'Nama Pemeriksaan maksimal 100 karakter' : 'Nama Perawatan maksimal 80 karakter';
        }
        
        // Validate numeric fields (should be >= 0)
        const numericFields = ['material', 'bhp', 'tarif_tindakandr', 'tarif_tindakanpr', 'kso', 'menejemen', 'bagian_perujuk'];
        numericFields.forEach(field => {
            const value = parseFloat(data[field]) || 0;
            if (value < 0) {
                errors[field] = `${field} tidak boleh negatif`;
            }
        });
        
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Client-side validation
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            // Show validation error notification
            const notification = document.createElement('div');
            notification.className = 'fixed top-4 right-4 z-50 bg-orange-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 max-w-md';
            
            const errorList = Object.entries(validationErrors).map(([field, message]) => {
                return `<li>${message}</li>`;
            }).join('');
            
            notification.innerHTML = `
                <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
                <div class="flex-1">
                    <div class="font-semibold">Periksa Data Input!</div>
                    <div class="text-sm opacity-90 mt-1">
                        <ul class="list-disc list-inside space-y-1">
                            ${errorList}
                        </ul>
                    </div>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                notification.style.opacity = '0';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 6000);
            
            return; // Stop submission
        }
        
        // Debug: Log data yang akan dikirim
        console.log('Data yang akan dikirim:', data);
        console.log('Errors saat ini:', errors);
        
        // Ensure numeric fields are properly formatted
        const formData = {
            ...data,
            material: parseFloat(data.material) || 0,
            bhp: parseFloat(data.bhp) || 0,
            tarif_tindakandr: parseFloat(data.tarif_tindakandr) || 0,
            tarif_tindakanpr: parseFloat(data.tarif_tindakanpr) || 0,
            kso: parseFloat(data.kso) || 0,
            menejemen: parseFloat(data.menejemen) || 0,
            bagian_perujuk: parseFloat(data.bagian_perujuk) || 0,
            category: category || 'rawat-jalan',
            // Include checkbox states
            show_total_dokter: data.show_total_dokter || false,
            show_total_perawat: data.show_total_perawat || false,
            show_total_dokter_perawat: data.show_total_dokter_perawat || false
        };
        
        // For rawat-inap, automatically set status to '1' (active)
        if (category === 'rawat-inap') {
            formData.status = '1';
        }
        
        console.log('Formatted data:', formData);

        if (isEditMode && (!editData || !editData.kd_jenis_prw)) {
            const notification = document.createElement('div');
            notification.className = 'fixed top-4 right-4 z-50 bg-red-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 max-w-md';
            notification.innerHTML = `
                <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M12 5a7 7 0 100 14 7 7 0 000-14z"></path>
                </svg>
                <div class="flex-1">
                    <div class="font-semibold">Gagal memperbarui tarif</div>
                    <div class="text-sm opacity-90 mt-1">ID tarif tidak ditemukan. Muat ulang halaman atau pilih item yang benar.</div>
                </div>
            `;
            document.body.appendChild(notification);
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                notification.style.opacity = '0';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 6000);
            return;
        }

        const submitRoute = isEditMode
            ? route('daftar-tarif.update', editData.kd_jenis_prw)
            : route('daftar-tarif.store');
        
        // Add method spoofing for PUT requests
        if (isEditMode) {
            formData._method = 'PUT';
        }
        
        // Use router.post for proper method spoofing
        router.post(submitRoute, formData, {
            onSuccess: () => {
                // Show success notification
                const notification = document.createElement('div');
                notification.className = 'fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 animate-pulse';
                notification.innerHTML = `
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="font-medium">${isEditMode ? 'Data berhasil diperbarui!' : 'Data berhasil disimpan!'}</span>
                `;
                
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.style.transform = 'translateX(100%)';
                    notification.style.opacity = '0';
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.parentNode.removeChild(notification);
                        }
                    }, 300);
                }, 3000);
                
                handleClose();
            },
            onError: (errors) => {
                console.error('Submission errors:', errors);
            }
        });
    };

    const handleClose = () => {
        reset({
            kelas: category === 'laboratorium' ? '-' : '',
            kategori: category === 'laboratorium' ? 'PK' : ''
        });
        onClose();
    };

    if (!isOpen) {
        return null;
    }

    return (
                <div className="modal-overlay laptop-dense">
                    <div className="modal-container">
                {/* Modal Header */}
                <div className="modal-header">
                    <div className="modal-title-section">
                        <div className="modal-icon">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
                            </svg>
                        </div>
                        <div>
                            <h3 className="modal-title">
                                {isEditMode
                                    ? (category === 'laboratorium' ? 'Edit Tarif Pemeriksaan Laboratorium' : 'Edit Tarif')
                                    : (category === 'laboratorium' ? 'Tambah Tarif Pemeriksaan Laboratorium' : 'Tambah Tarif')}
                            </h3>
                            <p className="modal-subtitle">
                                {category === 'rawat-jalan' ? 'Rawat Jalan' : (category === 'laboratorium' ? 'Laboratorium' : category)}
                            </p>
                        </div>
                    </div>
                    <button onClick={handleClose} className="modal-close-btn">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Modal Body */}
                <div className="modal-body">
                    <form onSubmit={handleSubmit} className="space-y-4">
                {/* Data Perawatan Section */}
                {(() => {
                    const isLaboratorium = category === 'laboratorium';
                    const themeClass = isLaboratorium
                        ? 'theme-laboratorium'
                        : (category === 'rawat-jalan'
                            ? 'theme-rawat-jalan'
                            : (category === 'rawat-inap'
                                ? 'theme-rawat-inap'
                                : (category === 'radiologi'
                                    ? 'theme-radiologi'
                                    : (category === 'kamar'
                                        ? 'theme-kamar'
                                        : ''))));
                    return (
                        <div className={`form-section ${isLaboratorium ? 'compact' : ''} ${themeClass}`}>
                            <div className={`section-header ${category === 'laboratorium' ? 'compact' : ''}`}>
                                <div className="section-icon">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                    </svg>
                                </div>
                                <h4 className="section-title">Data Perawatan</h4>
                            </div>
                            
                            <div className={`form-grid ${isLaboratorium ? 'compact' : ''}`}>
                                {/* Kategori Field */}
                                <div className={`input-group ${isLaboratorium ? 'flex items-center gap-3 compact' : ''}`}>
                                    <label className={`input-label ${isLaboratorium ? 'w-28 flex-shrink-0' : ''}`}>
                                        Kategori Perawatan *
                                    </label>
                                    <div className="flex gap-2">
                                        <select
                                            value={data.kd_kategori}
                                            onChange={handleKategoriChange}
                                            className={`form-select ${isLaboratorium ? 'flex-1' : ''}`}
                                            required
                                        >
                                            <option value="">Pilih Kategori</option>
                                            {kategoris.map((kategori) => (
                                                <option key={kategori.kd_kategori} value={kategori.kd_kategori}>
                                                    {kategori.nm_kategori}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            type="button"
                                            onClick={() => {
                                window.open(route('kategori-perawatan.index'), '_blank');
                            }}
                                            className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center"
                                            title="Tambah Kategori Baru"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                        </button>
                                    </div>
                                    {errors.kd_kategori && <p className="error-text">{errors.kd_kategori}</p>}
                                </div>

                                {/* Kode Jenis Perawatan */}
                                <div className={`input-group ${isLaboratorium ? 'flex items-center gap-3 compact' : ''}`}>
                                    <label className={`input-label ${isLaboratorium ? 'w-28 flex-shrink-0' : ''}`}>
                                        {category === 'laboratorium' ? 'Kode Periksa *' : 'Kode Jenis Perawatan *'}
                                    </label>
                                    <input
                                        type="text"
                                        value={data.kd_jenis_prw}
                                        onChange={(e) => setData('kd_jenis_prw', e.target.value.toUpperCase())}
                                        className={`form-input ${errors.kd_jenis_prw ? 'error' : ''} ${isLaboratorium ? 'flex-1' : ''}`}
                                        placeholder={category === 'laboratorium' ? 'Masukkan kode pemeriksaan' : 'Masukkan kode jenis perawatan'}
                                        maxLength="15"
                                        disabled={isEditMode}
                                        required
                                    />
                                    {errors.kd_jenis_prw && <p className="error-text">{errors.kd_jenis_prw}</p>}
                                </div>

                                {/* Nama Perawatan */}
                                <div className={`input-group ${isLaboratorium ? 'flex items-center gap-3 compact' : ''}`}>
                                    <label className={`input-label ${isLaboratorium ? 'w-28 flex-shrink-0' : ''}`}>
                                        {category === 'laboratorium' ? 'Nama Pemeriksaan *' : 'Nama Perawatan *'}
                                    </label>
                                    <input
                                        type="text"
                                        value={data.nm_perawatan}
                                        onChange={(e) => setData('nm_perawatan', e.target.value)}
                                        className={`form-input ${errors.nm_perawatan ? 'error' : ''} ${isLaboratorium ? 'flex-1' : ''}`}
                                        placeholder={category === 'laboratorium' ? 'Masukkan nama pemeriksaan' : 'Masukkan nama perawatan'}
                                        maxLength="80"
                                        required
                                    />
                                    {errors.nm_perawatan && <p className="error-text">{errors.nm_perawatan}</p>}
                                </div>

                                {/* Poli Klinik untuk Rawat Jalan atau Bangsal untuk Rawat Inap */}
                                {category === 'rawat-inap' ? (
                                    <div className={`input-group ${category === 'laboratorium' ? 'compact' : ''}`}>
                                        <label className="input-label">
                                            Bangsal *
                                        </label>
                                        <select
                                            value={data.kd_bangsal}
                                            onChange={(e) => setData('kd_bangsal', e.target.value)}
                                            className={`form-select ${errors.kd_bangsal ? 'error' : ''}`}
                                            required
                                        >
                                            <option value="">Pilih Bangsal</option>
                                            {bangsals.map((bangsal) => (
                                                <option key={bangsal.kd_bangsal} value={bangsal.kd_bangsal}>
                                                    {bangsal.nm_bangsal}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.kd_bangsal && <p className="error-text">{errors.kd_bangsal}</p>}
                                    </div>
                                ) : (
                                    category !== 'laboratorium' && (
                                    <div className={`input-group ${category === 'laboratorium' ? 'compact' : ''}`}>
                                        <label className="input-label">
                                            Poli Klinik *
                                        </label>
                                        <select
                                            value={data.kd_poli}
                                            onChange={(e) => setData('kd_poli', e.target.value)}
                                            className={`form-select ${errors.kd_poli ? 'error' : ''}`}
                                            required
                                        >
                                            <option value="">Pilih Poli</option>
                                            {polikliniks.map((poli) => (
                                                <option key={poli.kd_poli} value={poli.kd_poli}>
                                                    {poli.nm_poli}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.kd_poli && <p className="error-text">{errors.kd_poli}</p>}
                                    </div>
                                    )
                                )}

                                {/* Asuransi / Penanggung Jawab */}
                                <div className={`input-group ${isLaboratorium ? 'flex items-center gap-3 compact' : ''}`}>
                                    <label className={`input-label ${isLaboratorium ? 'w-28 flex-shrink-0' : ''}`}>
                                        Asuransi / Penanggung Jawab *
                                    </label>
                                    <select
                                        value={data.kd_pj}
                                        onChange={(e) => setData('kd_pj', e.target.value)}
                                        className={`form-select ${errors.kd_pj ? 'error' : ''} ${isLaboratorium ? 'flex-1' : ''}`}
                                        required
                                    >
                                        <option value="">Pilih Asuransi / Penanggung Jawab</option>
                                        {penjaabs.map((penjab) => (
                                            <option key={penjab.kd_pj} value={penjab.kd_pj}>
                                                {penjab.png_jawab}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.kd_pj && <p className="error-text">{errors.kd_pj}</p>}
                                </div>

                                {/* Status - untuk kategori selain Rawat Inap */}
                                {(category !== 'rawat-inap' && category !== 'laboratorium') && (
                                    <div className="input-group">
                                        <label className="input-label">
                                            Status *
                                        </label>
                                        <select
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className={`form-select ${errors.status ? 'error' : ''}`}
                                            required
                                        >
                                            <option value="1">Aktif</option>
                                            <option value="0">Tidak Aktif</option>
                                        </select>
                                        {errors.status && <p className="error-text">{errors.status}</p>}
                                    </div>
                                )}

                                {/* Kelas - untuk Rawat Inap dan Laboratorium */}
                                {(category === 'rawat-inap' || category === 'laboratorium') && (
                                    <div className={`input-group ${isLaboratorium ? 'flex items-center gap-3 compact' : ''}`}>
                                        <label className={`input-label ${isLaboratorium ? 'w-28 flex-shrink-0' : ''}`}>
                                            Kelas *
                                        </label>
                                        <select
                                            value={data.kelas}
                                            onChange={(e) => setData('kelas', e.target.value)}
                                            className={`form-select ${errors.kelas ? 'error' : ''} ${isLaboratorium ? 'flex-1' : ''}`}
                                            required
                                        >
                                            <option value="">Pilih Kelas</option>
                                            {category === 'laboratorium' && <option value="-">-</option>}
                                            <option value="Kelas 1">Kelas 1</option>
                                            <option value="Kelas 2">Kelas 2</option>
                                            <option value="Kelas 3">Kelas 3</option>
                                            <option value="Kelas Utama">Kelas Utama</option>
                                            <option value="Kelas VIP">Kelas VIP</option>
                                            <option value="Kelas VVIP">Kelas VVIP</option>
                                        </select>
                                        {errors.kelas && <p className="error-text">{errors.kelas}</p>}
                                    </div>
                                )}

                                {/* Kategori khusus Laboratorium */}
                                {category === 'laboratorium' && (
                                    <div className={`input-group ${isLaboratorium ? 'flex items-center gap-3 compact' : ''}`}>
                                        <label className={`input-label ${isLaboratorium ? 'w-28 flex-shrink-0' : ''}`}>
                                            Kategori *
                                        </label>
                                        <select
                                            value={data.kategori}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setData('kategori', value);
                                                if (category === 'laboratorium' && !isEditMode && value) {
                                                    generateAutoCode(value, category);
                                                }
                                            }}
                                            className={`form-select ${errors.kategori ? 'error' : ''} ${isLaboratorium ? 'flex-1' : ''}`}
                                            required
                                        >
                                            <option value="">Pilih Kategori</option>
                                            <option value="PK">PK</option>
                                            <option value="PA">PA</option>
                                            <option value="MB">MB</option>
                                        </select>
                                        {errors.kategori && <p className="error-text">{errors.kategori}</p>}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })()}

                        {/* Komponen Tarif Section */}
                        <div className={`form-section ${category === 'laboratorium' ? 'compact' : ''} ${category === 'laboratorium' ? 'theme-laboratorium' : (category === 'rawat-jalan' ? 'theme-rawat-jalan' : (category === 'rawat-inap' ? 'theme-rawat-inap' : (category === 'radiologi' ? 'theme-radiologi' : (category === 'kamar' ? 'theme-kamar' : ''))))}`}> 
                            <div className={`section-header ${category === 'laboratorium' ? 'compact' : ''}`}>
                                <div className="section-icon">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                                    </svg>
                                </div>
                                <h4 className="section-title">Komponen Tarif</h4>
                            </div>
                            
                            <div className={`form-grid ${category === 'laboratorium' ? 'compact' : ''}`}>
                                <div className={`input-group ${category === 'laboratorium' ? 'flex items-center gap-3' : ''}`}>
                                    <label className={`input-label ${category === 'laboratorium' ? 'w-28 flex-shrink-0' : ''}`}>{category === 'laboratorium' ? 'J.S. Rumah Sakit' : 'Bagian RS'}</label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*\.?[0-9]*"
                                        placeholder="0"
                                        value={getDisplayValue(data.material, focusedField === 'material')}
                                        onChange={(e) => handleNumericInput('material', e.target.value)}
                                        onFocus={() => setFocusedField('material')}
                                        onBlur={() => setFocusedField(null)}
                                        ref={materialRef}
                                        onKeyDown={(e) => handleEnterFocus(e, bhpRef)}
                                        className={`form-input ${category === 'laboratorium' ? 'flex-1' : ''}`}
                                    />
                                    {errors.material && <p className="error-text">{errors.material}</p>}
                                </div>

                                <div className={`input-group ${category === 'laboratorium' ? 'flex items-center gap-3' : ''}`}>
                                    <label className={`input-label ${category === 'laboratorium' ? 'w-28 flex-shrink-0' : ''}`}>{category === 'laboratorium' ? 'Paket BHP' : 'BHP'}</label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*\.?[0-9]*"
                                        placeholder="0"
                                        value={getDisplayValue(data.bhp, focusedField === 'bhp')}
                                        onChange={(e) => handleNumericInput('bhp', e.target.value)}
                                        onFocus={() => setFocusedField('bhp')}
                                        onBlur={() => setFocusedField(null)}
                                        ref={bhpRef}
                                        onKeyDown={(e) => handleEnterFocus(e, drRef)}
                                        className={`form-input ${category === 'laboratorium' ? 'flex-1' : ''}`}
                                    />
                                    {errors.bhp && <p className="error-text">{errors.bhp}</p>}
                                </div>

                                <div className={`input-group ${category === 'laboratorium' ? 'flex items-center gap-3' : ''}`}>
                                    <label className={`input-label ${category === 'laboratorium' ? 'w-28 flex-shrink-0' : ''}`}>{category === 'laboratorium' ? 'J.M. Dokter' : 'Jasa Dokter'}</label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*\.?[0-9]*"
                                        placeholder="0"
                                        value={getDisplayValue(data.tarif_tindakandr, focusedField === 'tarif_tindakandr')}
                                        onChange={(e) => handleNumericInput('tarif_tindakandr', e.target.value)}
                                        onFocus={() => setFocusedField('tarif_tindakandr')}
                                        onBlur={() => setFocusedField(null)}
                                        ref={drRef}
                                        onKeyDown={(e) => handleEnterFocus(e, prRef)}
                                        className={`form-input ${category === 'laboratorium' ? 'flex-1' : ''}`}
                                    />
                                    {errors.tarif_tindakandr && <p className="error-text">{errors.tarif_tindakandr}</p>}
                                </div>

                                <div className={`input-group ${category === 'laboratorium' ? 'flex items-center gap-3' : ''}`}>
                                    <label className={`input-label ${category === 'laboratorium' ? 'w-28 flex-shrink-0' : ''}`}>{category === 'laboratorium' ? 'J.M. Petugas' : 'Jasa Perawat'}</label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*\.?[0-9]*"
                                        placeholder="0"
                                        value={getDisplayValue(data.tarif_tindakanpr, focusedField === 'tarif_tindakanpr')}
                                        onChange={(e) => handleNumericInput('tarif_tindakanpr', e.target.value)}
                                        onFocus={() => setFocusedField('tarif_tindakanpr')}
                                        onBlur={() => setFocusedField(null)}
                                        ref={prRef}
                                        onKeyDown={(e) => handleEnterFocus(e, category === 'laboratorium' ? perujukRef : ksoRef)}
                                        className={`form-input ${category === 'laboratorium' ? 'flex-1' : ''}`}
                                    />
                                    {errors.tarif_tindakanpr && <p className="error-text">{errors.tarif_tindakanpr}</p>}
                                </div>

                                {category === 'laboratorium' && (
                                    <div className={`input-group ${category === 'laboratorium' ? 'flex items-center gap-3' : ''}`}>
                                        <label className={`input-label ${category === 'laboratorium' ? 'w-28 flex-shrink-0' : ''}`}>J.M. Perujuk</label>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]*\.?[0-9]*"
                                            placeholder="0"
                                            value={getDisplayValue(data.bagian_perujuk, focusedField === 'bagian_perujuk')}
                                            onChange={(e) => handleNumericInput('bagian_perujuk', e.target.value)}
                                            onFocus={() => setFocusedField('bagian_perujuk')}
                                            onBlur={() => setFocusedField(null)}
                                            ref={perujukRef}
                                            onKeyDown={(e) => handleEnterFocus(e, ksoRef)}
                                            className={`form-input ${category === 'laboratorium' ? 'flex-1' : ''}`}
                                        />
                                    </div>
                                )}

                                <div className={`input-group ${category === 'laboratorium' ? 'flex items-center gap-3' : ''}`}>
                                    <label className={`input-label ${category === 'laboratorium' ? 'w-28 flex-shrink-0' : ''}`}>{category === 'laboratorium' ? 'K.S.O.' : 'KSO'}</label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*\.?[0-9]*"
                                        placeholder="0"
                                        value={getDisplayValue(data.kso, focusedField === 'kso')}
                                        onChange={(e) => handleNumericInput('kso', e.target.value)}
                                        onFocus={() => setFocusedField('kso')}
                                        onBlur={() => setFocusedField(null)}
                                        ref={ksoRef}
                                        onKeyDown={(e) => handleEnterFocus(e, manajemenRef)}
                                        className={`form-input ${category === 'laboratorium' ? 'flex-1' : ''}`}
                                    />
                                    {errors.kso && <p className="error-text">{errors.kso}</p>}
                                </div>

                                <div className={`input-group ${category === 'laboratorium' ? 'flex items-center gap-3' : ''}`}>
                                    <label className={`input-label ${category === 'laboratorium' ? 'w-28 flex-shrink-0' : ''}`}>{category === 'laboratorium' ? 'Manajemen' : 'Menejemen'}</label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*\.?[0-9]*"
                                        placeholder="0"
                                        value={getDisplayValue(data.menejemen, focusedField === 'menejemen')}
                                        onChange={(e) => handleNumericInput('menejemen', e.target.value)}
                                        onFocus={() => setFocusedField('menejemen')}
                                        onBlur={() => setFocusedField(null)}
                                        ref={manajemenRef}
                                        onKeyDown={(e) => handleEnterFocus(e, null)}
                                        className={`form-input ${category === 'laboratorium' ? 'flex-1' : ''}`}
                                    />
                                    {errors.menejemen && <p className="error-text">{errors.menejemen}</p>}
                                </div>

                                {category === 'laboratorium' && (
                                    <div className={`input-group ${category === 'laboratorium' ? 'flex items-center gap-3' : ''}`}>
                                        <label className={`input-label ${category === 'laboratorium' ? 'w-28 flex-shrink-0' : ''}`}>Total Biaya Laborat</label>
                                        <input
                                            type="text"
                                            value={`Rp ${formatNumber(totalLaborat)}`}
                                            className={`form-input ${category === 'laboratorium' ? 'flex-1' : ''}`}
                                            readOnly
                                        />
                                    </div>
                                )}
                            </div>
                        </div>


                        {/* Perhitungan Total Section */}
                        {category !== 'laboratorium' && (
                        <div className="calculation-card">
                            <div className="calculation-header">
                                <div className="calculation-icon">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <h4 className="calculation-title">Perhitungan Total Tarif</h4>
                                <span className="calculation-badge">Pilih total yang ingin ditampilkan</span>
                            </div>
                            
                            <div className="total-grid">
                                {/* Total Dokter */}
                                <div className="total-card">
                                    <div className="total-content">
                                        <div className="total-header">
                                            <div className="total-indicator green"></div>
                                            <span className="total-label">Total Dokter</span>
                                        </div>
                                        <div className="total-amount">
                                            Rp {data.show_total_dokter ? formatNumber(totalDr) : '0'}
                                        </div>
                                    </div>
                                    <div className="total-checkbox">
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={data.show_total_dokter || false}
                                                onChange={(e) => setData('show_total_dokter', e.target.checked)}
                                                className="checkbox-input"
                                            />
                                            <span className="checkbox-text">Aktif</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Total Perawat */}
                                <div className="total-card">
                                    <div className="total-content">
                                        <div className="total-header">
                                            <div className="total-indicator blue"></div>
                                            <span className="total-label">Total Perawat</span>
                                        </div>
                                        <div className="total-amount">
                                            Rp {data.show_total_perawat ? formatNumber(totalPr) : '0'}
                                        </div>
                                    </div>
                                    <div className="total-checkbox">
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={data.show_total_perawat || false}
                                                onChange={(e) => setData('show_total_perawat', e.target.checked)}
                                                className="checkbox-input"
                                            />
                                            <span className="checkbox-text">Aktif</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Total Dokter + Perawat */}
                                <div className="total-card">
                                    <div className="total-content">
                                        <div className="total-header">
                                            <div className="total-indicator purple"></div>
                                            <span className="total-label">Total Dokter + Prwt</span>
                                        </div>
                                        <div className="total-amount">
                                            Rp {data.show_total_dokter_perawat ? formatNumber(totalDrPr) : '0'}
                                        </div>
                                    </div>
                                    <div className="total-checkbox">
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={data.show_total_dokter_perawat || false}
                                                onChange={(e) => setData('show_total_dokter_perawat', e.target.checked)}
                                                className="checkbox-input"
                                            />
                                            <span className="checkbox-text">Aktif</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )}

                        {/* Modal Footer */}
                        <div className="modal-footer">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="btn-secondary"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn-primary"
                            >
                                {processing ? (isEditMode ? 'Memperbarui...' : 'Menyimpan...') : (isEditMode ? 'Perbarui' : 'Simpan')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Modal untuk edit Template Pemeriksaan (tabel editable)
const EditTemplateModal = ({ isOpen, onClose, rows = [], setRows = () => {}, onSave = () => {}, selectedLabName = '' }) => {
    // Bidang numerik yang dibatasi 9 digit, tanpa desimal
    const numericFields = new Set([
        'bagian_rs',
        'bhp',
        'bagian_perujuk',
        'bagian_dokter',
        'bagian_laborat',
        'kso',
        'menejemen',
        'biaya_item'
    ]);

    // Ref untuk tabel agar navigasi Enter bisa fokus ke input berikutnya
    const tableRef = React.useRef(null);

    // Normalisasi nilai awal agar tidak menampilkan desimal dan hitung Biaya Item otomatis
    React.useEffect(() => {
        if (!isOpen) return;
        if (!rows || rows.length === 0) return;
        const normalized = rows.map((r) => {
            const updated = { ...r };
            numericFields.forEach((f) => {
                if (updated[f] != null && updated[f] !== '') {
                    const normalizedVal = String(updated[f]).replace(/,/g, '.');
                    const parsed = parseFloat(normalizedVal);
                    if (!isNaN(parsed)) {
                        updated[f] = String(Math.floor(parsed)).slice(0, 9);
                    }
                }
            });
            // Hitung otomatis Biaya Item sebagai jumlah komponen numerik
            const sumFields = ['bagian_rs', 'bhp', 'bagian_perujuk', 'bagian_dokter', 'bagian_laborat', 'kso', 'menejemen'];
            const total = sumFields.reduce((acc, f) => acc + (parseInt(updated[f]) || 0), 0);
            updated.biaya_item = String(total).slice(0, 9);
            return updated;
        });
        setRows(normalized);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (index, field, value) => {
        let nextValue = value;
        if (numericFields.has(field)) {
            // Normalisasi: ganti koma ke titik, ambil angka desimal, konversi ke bilangan bulat string
            const normalized = String(nextValue).replace(/,/g, '.');
            const parsed = parseFloat(normalized);
            if (isNaN(parsed)) {
                nextValue = '';
            } else {
                nextValue = String(Math.floor(parsed));
            }
            // Batasi maksimal 9 digit
            if (nextValue.length > 9) nextValue = nextValue.slice(0, 9);
        }
        const updated = [...rows];
        updated[index] = { ...updated[index], [field]: nextValue };
        // Perbarui Biaya Item otomatis setiap kali komponen numerik berubah
        const sumFields = ['bagian_rs', 'bhp', 'bagian_perujuk', 'bagian_dokter', 'bagian_laborat', 'kso', 'menejemen'];
        const total = sumFields.reduce((acc, f) => acc + (parseInt(updated[index][f]) || 0), 0);
        updated[index].biaya_item = String(total).slice(0, 9);
        setRows(updated);
    };

    const handleAddRow = () => {
        setRows([
            ...rows,
            {
                pemeriksaan: '',
                satuan: '',
                ld: '',
                la: '',
                pd: '',
                pa: '',
                bagian_rs: '',
                bhp: '',
                bagian_perujuk: '',
                bagian_dokter: '',
                bagian_laborat: '',
                kso: '',
                menejemen: '',
                biaya_item: ''
            }
        ]);
    };

    const handleRemoveRow = (index) => {
        const updated = rows.filter((_, i) => i !== index);
        setRows(updated);
    };

    // Handler: tekan Enter pindah ke input berikutnya dalam urutan DOM
    const handleEnterFocusNext = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (!tableRef.current) return;
            const inputs = Array.from(tableRef.current.querySelectorAll('input'));
            const idx = inputs.indexOf(e.target);
            if (idx > -1) {
                let next = null;
                for (let i = idx + 1; i < inputs.length; i++) {
                    const el = inputs[i];
                    if (!el.readOnly && !el.disabled) { next = el; break; }
                }
                if (next) next.focus();
            }
        }
    };

    return (
            <div className="modal-overlay laptop-dense">
                <div className="modal-container">
                {/* Modal Header */}
                <div className="modal-header">
                    <div className="modal-title-section">
                        <div className="modal-icon">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="modal-title">Edit Template Pemeriksaan</h3>
                            <p className="modal-subtitle">{selectedLabName || 'Laboratorium'}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="modal-close-btn">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                    {/* Modal Body */}
                    <div className="modal-body">
                    <div className="form-section">
                        <div className="section-header">
                            <div className="section-icon">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18" />
                                </svg>
                            </div>
                            <h4 className="section-title">Daftar Template</h4>
                            <div className="ml-auto">
                                <button
                                    type="button"
                                    onClick={handleAddRow}
                                    className="inline-flex items-center px-3 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white text-sm font-medium"
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Tambah Baris
                                </button>
                            </div>
                        </div>

                        <div ref={tableRef} className="relative overflow-x-auto border border-gray-200 rounded-md shadow-sm bg-white">
                            <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm align-middle table-fixed">
                            <thead className="bg-gray-200 sticky top-0 z-10">
                                <tr>
                                <th className="px-1 py-0.5 text-center font-medium text-black uppercase tracking-wider whitespace-nowrap w-[30ch]">Pemeriksaan</th>
                                <th className="px-1 py-0.5 text-center font-medium text-black uppercase tracking-wider whitespace-nowrap w-[16ch]">Satuan</th>
                                <th className="px-1 py-0.5 text-center font-medium text-black uppercase tracking-wider whitespace-nowrap w-[12ch]">LD</th>
                                <th className="px-1 py-0.5 text-center font-medium text-black uppercase tracking-wider whitespace-nowrap w-[12ch]">LA</th>
                                <th className="px-1 py-0.5 text-center font-medium text-black uppercase tracking-wider whitespace-nowrap w-[12ch]">PD</th>
                                <th className="px-1 py-0.5 text-center font-medium text-black uppercase tracking-wider whitespace-nowrap w-[12ch]">PA</th>
                                <th className="px-1 py-0.5 text-center font-medium text-black uppercase tracking-wider whitespace-nowrap w-[12ch] text-[11px]">Bagian RS</th>
                                <th className="px-1 py-0.5 text-center font-medium text-black uppercase tracking-wider whitespace-nowrap w-[12ch] text-[11px]">BHP</th>
                                <th className="px-1 py-0.5 text-center font-medium text-black uppercase tracking-wider whitespace-nowrap w-[12ch] text-[11px]">Bagian Perujuk</th>
                                <th className="px-1 py-0.5 text-center font-medium text-black uppercase tracking-wider whitespace-nowrap w-[12ch] text-[11px]">Bagian Dokter</th>
                                <th className="px-1 py-0.5 text-center font-medium text-black uppercase tracking-wider whitespace-nowrap w-[12ch] text-[11px]">Bagian Laborat</th>
                                <th className="px-1 py-0.5 text-center font-medium text-black uppercase tracking-wider whitespace-nowrap w-[12ch] text-[11px]">KSO</th>
                                <th className="px-1 py-0.5 text-center font-medium text-black uppercase tracking-wider whitespace-nowrap w-[14ch] text-[11px]">Menejemen</th>
                                <th className="px-1 py-0.5 text-center font-medium text-black uppercase tracking-wider whitespace-nowrap w-[14ch] text-[11px]">Biaya Item (Rp)</th>
                                <th className="px-1 py-1 text-center font-medium text-black uppercase tracking-wider whitespace-nowrap">Aksi</th>
                                </tr>
                            </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {rows.length === 0 ? (
                                        <tr>
                                            <td colSpan="10" className="px-4 py-4 text-sm text-gray-500 text-center">Belum ada baris template.</td>
                                        </tr>
                                    ) : (
                                        rows.map((row, idx) => (
                                            <tr key={row.id_template ?? idx} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                                                <td className="px-1 py-0.5">
                                                    <input
                                                        type="text"
                                                        className="form-input !w-[30ch] !min-w-[24ch] !h-7 !px-2 !py-1 text-xs focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder="Nama pemeriksaan"
                                                        value={row.pemeriksaan}
                                                        onChange={(e) => handleChange(idx, 'pemeriksaan', e.target.value)}
                                                        onKeyDown={handleEnterFocusNext}
                                                    />
                                                </td>
                                                <td className="px-1 py-0.5">
                                                    <input
                                                        type="text"
                                                        className="form-input !w-[16ch] !min-w-[12ch] !h-7 !px-2 !py-1 text-xs focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder="mg/dL"
                                                        value={row.satuan || ''}
                                                        onChange={(e) => handleChange(idx, 'satuan', e.target.value)}
                                                        onKeyDown={handleEnterFocusNext}
                                                    />
                                                </td>
                                                <td className="px-1 py-0.5">
                                                    <input
                                                        type="text"
                                                        className="form-input !w-[12ch] !min-w-[12ch] !h-7 !px-2 !py-1 text-xs focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder="Nilai LD"
                                                        value={row.ld || ''}
                                                        onChange={(e) => handleChange(idx, 'ld', e.target.value)}
                                                        onKeyDown={handleEnterFocusNext}
                                                    />
                                                </td>
                                                <td className="px-1 py-0.5">
                                                    <input
                                                        type="text"
                                                        className="form-input !w-[12ch] !min-w-[12ch] !h-7 !px-2 !py-1 text-xs focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder="Nilai LA"
                                                        value={row.la || ''}
                                                        onChange={(e) => handleChange(idx, 'la', e.target.value)}
                                                        onKeyDown={handleEnterFocusNext}
                                                    />
                                                </td>
                                                <td className="px-1 py-0.5">
                                                    <input
                                                        type="text"
                                                        className="form-input !w-[12ch] !min-w-[12ch] !h-7 !px-2 !py-1 text-xs focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder="Nilai PD"
                                                        value={row.pd || ''}
                                                        onChange={(e) => handleChange(idx, 'pd', e.target.value)}
                                                        onKeyDown={handleEnterFocusNext}
                                                    />
                                                </td>
                                                <td className="px-1 py-0.5">
                                                    <input
                                                        type="text"
                                                        className="form-input !w-[12ch] !min-w-[12ch] !h-7 !px-2 !py-1 text-xs focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder="Nilai PA"
                                                        value={row.pa || ''}
                                                        onChange={(e) => handleChange(idx, 'pa', e.target.value)}
                                                        onKeyDown={handleEnterFocusNext}
                                                    />
                                                </td>
                                                <td className="px-1 py-0.5">
                                                    <input
                                                        type="text"
                                                        inputMode="numeric"
                                                        pattern="[0-9]*"
                                                        maxLength={9}
                                                        className="form-input !w-[12ch] !min-w-[12ch] !h-7 !px-2 !py-1 text-right text-xs font-mono focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder="0"
                                                        value={row.bagian_rs}
                                                        onChange={(e) => handleChange(idx, 'bagian_rs', e.target.value)}
                                                        onKeyDown={handleEnterFocusNext}
                                                        required
                                                    />
                                                </td>
                                                <td className="px-1 py-0.5">
                                                    <input
                                                        type="text"
                                                        inputMode="numeric"
                                                        pattern="[0-9]*"
                                                        maxLength={9}
                                                        className="form-input !w-[12ch] !min-w-[12ch] !h-7 !px-2 !py-1 text-right text-xs font-mono focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder="0"
                                                        value={row.bhp}
                                                        onChange={(e) => handleChange(idx, 'bhp', e.target.value)}
                                                        onKeyDown={handleEnterFocusNext}
                                                        required
                                                    />
                                                </td>
                                                <td className="px-1 py-0.5">
                                                    <input
                                                        type="text"
                                                        inputMode="numeric"
                                                        pattern="[0-9]*"
                                                        maxLength={9}
                                                        className="form-input !w-[12ch] !min-w-[12ch] !h-7 !px-2 !py-1 text-right text-xs font-mono focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder="0"
                                                        value={row.bagian_perujuk}
                                                        onChange={(e) => handleChange(idx, 'bagian_perujuk', e.target.value)}
                                                        onKeyDown={handleEnterFocusNext}
                                                        required
                                                    />
                                                </td>
                                                <td className="px-1 py-0.5">
                                                    <input
                                                        type="text"
                                                        inputMode="numeric"
                                                        pattern="[0-9]*"
                                                        maxLength={9}
                                                        className="form-input !w-[12ch] !min-w-[12ch] !h-7 !px-2 !py-1 text-right text-xs font-mono focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder="0"
                                                        value={row.bagian_dokter}
                                                        onChange={(e) => handleChange(idx, 'bagian_dokter', e.target.value)}
                                                        onKeyDown={handleEnterFocusNext}
                                                        required
                                                    />
                                                </td>
                                                <td className="px-1 py-0.5">
                                                    <input
                                                        type="text"
                                                        inputMode="numeric"
                                                        pattern="[0-9]*"
                                                        maxLength={9}
                                                        className="form-input !w-[12ch] !min-w-[12ch] !h-7 !px-2 !py-1 text-right text-xs font-mono focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder="0"
                                                        value={row.bagian_laborat}
                                                        onChange={(e) => handleChange(idx, 'bagian_laborat', e.target.value)}
                                                        onKeyDown={handleEnterFocusNext}
                                                        required
                                                    />
                                                </td>
                                                <td className="px-1 py-0.5">
                                                    <input
                                                        type="text"
                                                        inputMode="numeric"
                                                        pattern="[0-9]*"
                                                        maxLength={9}
                                                        className="form-input !w-[12ch] !min-w-[12ch] !h-8 !px-2 !py-1.5 text-right text-xs font-mono focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder="0"
                                                        value={row.kso}
                                                        onChange={(e) => handleChange(idx, 'kso', e.target.value)}
                                                        onKeyDown={handleEnterFocusNext}
                                                    />
                                                </td>
                                                <td className="px-1 py-0.5">
                                                    <input
                                                        type="text"
                                                        inputMode="numeric"
                                                        pattern="[0-9]*"
                                                        maxLength={9}
                                                        className="form-input !w-[14ch] !min-w-[14ch] !h-7 !px-2 !py-1 text-right text-xs font-mono focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder="0"
                                                        value={row.menejemen}
                                                        onChange={(e) => handleChange(idx, 'menejemen', e.target.value)}
                                                        onKeyDown={handleEnterFocusNext}
                                                    />
                                                </td>
                                                <td className="px-1 py-0.5">
                                                    <input
                                                        type="text"
                                                        inputMode="numeric"
                                                        pattern="[0-9]*"
                                                        maxLength={9}
                                                        className="form-input !w-[14ch] !min-w-[14ch] !h-7 !px-2 !py-1 text-right text-xs font-mono font-bold bg-gray-50 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder="0"
                                                        value={row.biaya_item}
                                                        readOnly
                                                        onKeyDown={handleEnterFocusNext}
                                                        required
                                                    />
                                                </td>
                                                <td className="px-1 py-1 w-16">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveRow(idx)}
                                                        className="inline-flex items-center px-2 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white text-xs font-medium"
                                                        title="Hapus Baris"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-6 flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex items-center px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium"
                        >
                            Batal
                        </button>
                        <button
                            type="button"
                            onClick={onSave}
                            className="inline-flex items-center px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium"
                        >
                            Simpan Perubahan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Index({ title, data, category, search, filters, polikliniks = [], bangsals = [], penjaabs = [], kategoris = [], flash = {} }) {
    const [searchTerm, setSearchTerm] = useState(search || '');
    const [activeTab, setActiveTab] = useState(category || 'rawat-jalan');
    const [selectedFilter, setSelectedFilter] = useState(filters?.status || '1');
    const [selectedPoliklinik, setSelectedPoliklinik] = useState(filters?.poliklinik || 'all');
    const [selectedBangsal, setSelectedBangsal] = useState(filters?.bangsal || 'all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [selectedLab, setSelectedLab] = useState(null);
    const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(null);
    const [showTemplateDetails, setShowTemplateDetails] = useState(false);
    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
    const [templateRows, setTemplateRows] = useState([]);

    // Handle flash messages
    useEffect(() => {
        if (flash.success) {
            alert(flash.success);
        }
        if (flash.error) {
            alert(flash.error);
        }
    }, [flash]);

    // Update search functionality to work without submit button
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        
        // Auto search with debounce
        clearTimeout(window.searchTimeout);
        window.searchTimeout = setTimeout(() => {
            router.get(route('daftar-tarif.index'), {
                search: value,
                category: activeTab,
                status: selectedFilter,
                poliklinik: (activeTab === 'rawat-jalan' && selectedPoliklinik !== 'all') ? selectedPoliklinik : undefined,
                bangsal: (activeTab === 'rawat-inap' && selectedBangsal !== 'all') ? selectedBangsal : undefined,
            }, {
                preserveState: true,
                preserveScroll: true,
            });
        }, 500);
    };

    const handleTabChange = (newTab) => {
        setActiveTab(newTab);
        router.get(route('daftar-tarif.index'), {
            search: searchTerm,
            category: newTab,
            status: selectedFilter,
            poliklinik: (newTab === 'rawat-jalan' && selectedPoliklinik !== 'all') ? selectedPoliklinik : undefined,
            bangsal: (newTab === 'rawat-inap' && selectedBangsal !== 'all') ? selectedBangsal : undefined,
        }, {
            preserveState: true,
            replace: true
        });
        if (newTab !== 'laboratorium') {
            setSelectedLab(null);
        }
    };

    const handlePoliklinikChange = (e) => {
        const value = e.target.value;
        setSelectedPoliklinik(value);
        
        router.get(route('daftar-tarif.index'), {
            search: searchTerm,
            category: activeTab,
            status: selectedFilter,
            poliklinik: value !== 'all' ? value : undefined,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleBangsalChange = (e) => {
        const value = e.target.value;
        setSelectedBangsal(value);
        
        router.get(route('daftar-tarif.index'), {
            search: searchTerm,
            category: activeTab,
            status: selectedFilter,
            bangsal: value !== 'all' ? value : undefined,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    // Handler untuk button + Tarif
    const handleAddTarif = () => {
        if (activeTab === 'laboratorium') {
            setIsModalOpen(true);
        } else {
            router.visit(route('daftar-tarif.create', { category: activeTab }));
        }
    };

    // Handler untuk edit
    const handleEdit = (item) => {
        setEditingItem(item);
        setIsEditModalOpen(true);
    };

    // Handler untuk edit Template Pemeriksaan
    const handleOpenTemplateModal = () => {
        if (!selectedLab) return;
        const rows = (selectedLab.template_laboratorium || []).map((tmpl) => ({
            id_template: tmpl.id_template,
            pemeriksaan: tmpl.Pemeriksaan || tmpl.item_pemeriksaan || '',
            satuan: typeof tmpl.satuan !== 'undefined' ? String(tmpl.satuan) : '',
            ld: typeof tmpl.nilai_rujukan_ld !== 'undefined' ? String(tmpl.nilai_rujukan_ld) : (typeof tmpl.ld !== 'undefined' ? String(tmpl.ld) : ''),
            la: typeof tmpl.nilai_rujukan_la !== 'undefined' ? String(tmpl.nilai_rujukan_la) : (typeof tmpl.la !== 'undefined' ? String(tmpl.la) : ''),
            pd: typeof tmpl.nilai_rujukan_pd !== 'undefined' ? String(tmpl.nilai_rujukan_pd) : (typeof tmpl.pd !== 'undefined' ? String(tmpl.pd) : ''),
            pa: typeof tmpl.nilai_rujukan_pa !== 'undefined' ? String(tmpl.nilai_rujukan_pa) : (typeof tmpl.pa !== 'undefined' ? String(tmpl.pa) : ''),
            bagian_rs: typeof tmpl.bagian_rs !== 'undefined' ? String(tmpl.bagian_rs) : '',
            bhp: typeof tmpl.bhp !== 'undefined' ? String(tmpl.bhp) : '',
            bagian_perujuk: typeof tmpl.bagian_perujuk !== 'undefined' ? String(tmpl.bagian_perujuk) : '',
            bagian_dokter: typeof tmpl.bagian_dokter !== 'undefined' ? String(tmpl.bagian_dokter) : '',
            bagian_laborat: typeof tmpl.bagian_laborat !== 'undefined' ? String(tmpl.bagian_laborat) : '',
            kso: typeof tmpl.kso !== 'undefined' && tmpl.kso !== null ? String(tmpl.kso) : '',
            menejemen: typeof tmpl.menejemen !== 'undefined' && tmpl.menejemen !== null ? String(tmpl.menejemen) : '',
            biaya_item: typeof tmpl.biaya_item !== 'undefined' ? String(tmpl.biaya_item) : '',
        }));
        setTemplateRows(rows);
        setIsTemplateModalOpen(true);
    };

    // Reset pilihan item template saat tarif laboratorium berganti
    useEffect(() => {
        setSelectedTemplateIndex(null);
        setShowTemplateDetails(false);
    }, [selectedLab]);

    const handleCloseTemplateModal = () => {
        setIsTemplateModalOpen(false);
        setTemplateRows([]);
    };

    const handleSaveTemplateRows = () => {
        // Validasi sederhana: pemeriksaan wajib, kolom numeric wajib bernilai angka >= 0
        const requiredNumericFields = ['bagian_rs', 'bhp', 'bagian_perujuk', 'bagian_dokter', 'bagian_laborat', 'biaya_item'];
        let hasError = false;
        let errorMessage = '';

        for (let i = 0; i < templateRows.length; i++) {
            const row = templateRows[i];
            if (!row.pemeriksaan || row.pemeriksaan.trim() === '') {
                hasError = true;
                errorMessage = 'Nama pemeriksaan wajib diisi.';
                break;
            }
            for (const field of requiredNumericFields) {
                const val = row[field];
                if (val === '' || val === null || typeof val === 'undefined') {
                    hasError = true;
                    errorMessage = 'Kolom biaya wajib diisi.';
                    break;
                }
                const num = Number(val);
                if (Number.isNaN(num) || num < 0) {
                    hasError = true;
                    errorMessage = 'Nilai biaya harus angka >= 0.';
                    break;
                }
            }
            if (hasError) break;
        }

        if (hasError) {
            const notification = document.createElement('div');
            notification.className = 'fixed top-4 right-4 z-50 bg-red-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3';
            notification.innerHTML = `
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M12 5a7 7 0 100 14 7 7 0 000-14z"></path>
                </svg>
                <span class="font-medium">${errorMessage}</span>
            `;
            document.body.appendChild(notification);
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                notification.style.opacity = '0';
                setTimeout(() => {
                    if (notification.parentNode) notification.parentNode.removeChild(notification);
                }, 300);
            }, 2500);
            return;
        }

        // Update selectedLab state agar panel kanan langsung mencerminkan perubahan
        const updatedTemplates = templateRows.map((row) => ({
            Pemeriksaan: row.pemeriksaan,
            satuan: typeof row.satuan === 'string' ? row.satuan.trim() : row.satuan ?? null,
            // Nilai rujukan disimpan sebagai string (varchar) sesuai definisi kolom database
            ld: row.ld === '' || row.ld === null || typeof row.ld === 'undefined' ? null : String(row.ld).trim(),
            la: row.la === '' || row.la === null || typeof row.la === 'undefined' ? null : String(row.la).trim(),
            pd: row.pd === '' || row.pd === null || typeof row.pd === 'undefined' ? null : String(row.pd).trim(),
            pa: row.pa === '' || row.pa === null || typeof row.pa === 'undefined' ? null : String(row.pa).trim(),
            bagian_rs: Number(row.bagian_rs) || 0,
            bhp: Number(row.bhp) || 0,
            bagian_perujuk: Number(row.bagian_perujuk) || 0,
            bagian_dokter: Number(row.bagian_dokter) || 0,
            bagian_laborat: Number(row.bagian_laborat) || 0,
            kso: row.kso === '' ? undefined : Number(row.kso) || 0,
            menejemen: row.menejemen === '' ? undefined : Number(row.menejemen) || 0,
            biaya_item: Number(row.biaya_item) || 0,
        }));

        setSelectedLab((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                template_laboratorium: updatedTemplates,
            };
        });

        // Panggil backend untuk persist perubahan
        if (selectedLab && selectedLab.kd_jenis_prw) {
            const payloadRows = templateRows.map((row) => ({
                pemeriksaan: row.pemeriksaan,
                satuan: typeof row.satuan === 'string' ? row.satuan.trim() : row.satuan ?? null,
                // Kirim nilai rujukan sebagai string (varchar) sesuai definisi schema
                ld: row.ld === '' || row.ld === null || typeof row.ld === 'undefined' ? null : String(row.ld).trim(),
                la: row.la === '' || row.la === null || typeof row.la === 'undefined' ? null : String(row.la).trim(),
                pd: row.pd === '' || row.pd === null || typeof row.pd === 'undefined' ? null : String(row.pd).trim(),
                pa: row.pa === '' || row.pa === null || typeof row.pa === 'undefined' ? null : String(row.pa).trim(),
                bagian_rs: Number(row.bagian_rs) || 0,
                bhp: Number(row.bhp) || 0,
                bagian_perujuk: Number(row.bagian_perujuk) || 0,
                bagian_dokter: Number(row.bagian_dokter) || 0,
                bagian_laborat: Number(row.bagian_laborat) || 0,
                kso: row.kso === '' ? 0 : Number(row.kso) || 0,
                menejemen: row.menejemen === '' ? 0 : Number(row.menejemen) || 0,
                biaya_item: Number(row.biaya_item) || 0,
            }));

            const def = laboratoriumRoutes.updateTemplates.put(selectedLab.kd_jenis_prw);
            router.put(def.url, {
                rows: payloadRows,
            }, {
                preserveScroll: true,
                onSuccess: () => {
                    const notification = document.createElement('div');
                    notification.className = 'fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3';
                    notification.innerHTML = `
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span class="font-medium">Template berhasil disimpan.</span>
                    `;
                    document.body.appendChild(notification);
                    setTimeout(() => {
                        notification.style.transform = 'translateX(100%)';
                        notification.style.opacity = '0';
                        setTimeout(() => {
                            if (notification.parentNode) notification.parentNode.removeChild(notification);
                        }, 300);
                    }, 2500);
                    handleCloseTemplateModal();
                },
                onError: (errors) => {
                    console.error('Gagal menyimpan template:', errors);
                    const notification = document.createElement('div');
                    notification.className = 'fixed top-4 right-4 z-50 bg-red-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3';
                    notification.innerHTML = `
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M12 5a7 7 0 100 14 7 7 0 000-14z"></path>
                        </svg>
                        <span class="font-medium">Gagal menyimpan template. Periksa input Anda.</span>
                    `;
                    document.body.appendChild(notification);
                    setTimeout(() => {
                        notification.style.transform = 'translateX(100%)';
                        notification.style.opacity = '0';
                        setTimeout(() => {
                            if (notification.parentNode) notification.parentNode.removeChild(notification);
                        }, 300);
                    }, 2500);
                }
            });
        }
    };

    // Set default selectedLab saat berada di tab laboratorium
    useEffect(() => {
        if (activeTab === 'laboratorium') {
            const items = data?.data || [];
            if (items.length > 0) {
                const stillExists = selectedLab && items.find((it) => it.kd_jenis_prw === selectedLab.kd_jenis_prw);
                if (!stillExists) {
                    setSelectedLab(items[0]);
                }
            } else {
                setSelectedLab(null);
            }
        }
    }, [activeTab, data]);

    // Handler untuk nonaktifkan dengan konfirmasi
    const handleDelete = (item) => {
        const isRestore = selectedFilter === '0';
        const confirmMessage = isRestore
            ? `Apakah Anda yakin ingin mengaktifkan kembali tarif "${item.nm_perawatan}"?`
            : `Apakah Anda yakin ingin menonaktifkan tarif "${item.nm_perawatan}"?`;

        if (window.confirm(confirmMessage)) {
            router.post(route('daftar-tarif.update-status', item.kd_jenis_prw), {
                _method: 'PATCH',
                category: activeTab,
                status: isRestore ? '1' : '0'
            }, {
                onError: (errors) => {
                    console.error(isRestore ? 'Error restoring tarif:' : 'Error deactivating tarif:', errors);
                    alert(isRestore ? 'Gagal mengembalikan tarif. Silakan coba lagi.' : 'Gagal menonaktifkan tarif. Silakan coba lagi.');
                }
            });
        }
    };

    // Handler untuk filter
    const handleFilterChange = (e) => {
        const value = e.target.value;
        setSelectedFilter(value);
        
        router.get(route('daftar-tarif.index'), {
            search: searchTerm,
            category: activeTab,
            status: value,
            poliklinik: selectedPoliklinik !== 'all' ? selectedPoliklinik : undefined,
            bangsal: selectedBangsal !== 'all' ? selectedBangsal : undefined,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleExport = () => {
        // Export functionality
        console.log('Export data');
    };

    const formatCurrency = (amount) => {
        if (!amount || amount === 0) return 'Rp 0';
        
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const renderRawatJalanTable = () => (
        <div className="compact-card-container">
            {data?.data?.length > 0 ? (
                data.data.map((item) => (
                    <div key={item.kd_jenis_prw} className="compact-card">
                        {/* Header */}
                        <div className="compact-card-header">
                            <div className="header-info">
                                <div className="kode-badge">
                                    {item.kd_jenis_prw}
                                </div>
                                <div className="nama-text" title={item.nm_perawatan}>
                                    {item.nm_perawatan}
                                </div>
                                <div className="poli-badge">
                                    {item.poliklinik?.nm_poli || '-'}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="compact-card-content">
                            <div className="content-grid">
                                {/* Komponen Tarif - Lebih lebar */}
                                <div className="tarif-section">
                                    <div className="tarif-section-title">Komponen Tarif</div>
                                    <div className="tarif-grid">
                                        <div className="tarif-item">
                                            <span className="tarif-label">Bagian RS/Klinik</span>
                                            <span className="tarif-value">{formatCurrency(item.material)}</span>
                                        </div>
                                        <div className="tarif-item">
                                            <span className="tarif-label">BHP</span>
                                            <span className="tarif-value">{formatCurrency(item.bhp)}</span>
                                        </div>
                                        <div className="tarif-item">
                                            <span className="tarif-label">Bagian Dokter</span>
                                            <span className="tarif-value">{formatCurrency(item.tarif_tindakandr)}</span>
                                        </div>
                                        <div className="tarif-item">
                                            <span className="tarif-label">Bagian Perawat</span>
                                            <span className="tarif-value">{formatCurrency(item.tarif_tindakanpr)}</span>
                                        </div>
                                        <div className="tarif-item">
                                            <span className="tarif-label">KSO</span>
                                            <span className="tarif-value">{formatCurrency(item.kso)}</span>
                                        </div>
                                        <div className="tarif-item">
                                            <span className="tarif-label">Menejemen</span>
                                            <span className="tarif-value">{formatCurrency(item.menejemen)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Total Perhitungan */}
                                <div className="total-section">
                                    <div className="total-section-title">Total Perhitungan</div>
                                    <div className="total-grid">
                                        <div className="total-item total-dr">
                                            <span>Total Dokter</span>
                                            <span>{formatCurrency(item.total_byrdr)}</span>
                                        </div>
                                        <div className="total-item total-pr">
                                            <span>Total Perawat</span>
                                            <span>{formatCurrency(item.total_byrpr)}</span>
                                        </div>
                                        <div className="total-item total-gabungan">
                                            <span>Total Dokter + Prwt</span>
                                            <span>{formatCurrency(item.total_byrdrpr)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Aksi - Hanya icon, lebih sempit */}
                                <div className="action-section">
                                    <div className="action-section-title">Aksi</div>
                                    <div className="action-buttons">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="action-btn edit-btn"
                                            title="Edit Tarif"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item)}
                                            className={`action-btn ${selectedFilter === '0' ? 'restore-btn' : 'delete-btn'}`}
                                            title={selectedFilter === '0' ? 'Aktifkan Kembali Tarif' : 'Nonaktifkan Tarif'}
                                        >
                                            {selectedFilter === '0' ? (
                                                // Ikon Restore (panah melingkar)
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v6h6M20 20v-6h-6" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 8a8 8 0 10-16 8" />
                                                </svg>
                                            ) : (
                                                // Ikon Delete
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="empty-state">
                    <svg className="empty-state-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="empty-state-title">Tidak ada data tarif</h3>
                    <p className="empty-state-description">
                        Silakan tambah tarif baru atau ubah filter pencarian untuk melihat data tarif yang tersedia.
                    </p>
                </div>
            )}
        </div>
    );

    const renderRawatInapTable = () => (
        <div className="compact-card-container">
            {data?.data?.length > 0 ? (
                data.data.map((item) => (
                    <div key={item.kd_jenis_prw} className="compact-card">
                        {/* Header */}
                        <div className="compact-card-header">
                            <div className="header-info">
                                <div className="kode-badge">
                                    {item.kd_jenis_prw}
                                </div>
                                <div className="nama-text" title={item.nm_perawatan}>
                                    {item.nm_perawatan}
                                </div>
                                <div className="poli-badge">
                                    {item.bangsal?.nm_bangsal || '-'}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="compact-card-content">
                            <div className="content-grid">
                                {/* Komponen Tarif - Lebih lebar */}
                                <div className="tarif-section">
                                    <div className="tarif-section-title">Komponen Tarif</div>
                                    <div className="tarif-grid">
                                        <div className="tarif-item">
                                            <span className="tarif-label">Bagian RS/Klinik</span>
                                            <span className="tarif-value">{formatCurrency(item.material)}</span>
                                        </div>
                                        <div className="tarif-item">
                                            <span className="tarif-label">BHP</span>
                                            <span className="tarif-value">{formatCurrency(item.bhp)}</span>
                                        </div>
                                        <div className="tarif-item">
                                            <span className="tarif-label">Jasa Dokter</span>
                                            <span className="tarif-value">{formatCurrency(item.tarif_tindakandr)}</span>
                                        </div>
                                        <div className="tarif-item">
                                            <span className="tarif-label">Jasa Petugas</span>
                                            <span className="tarif-value">{formatCurrency(item.tarif_tindakanpr)}</span>
                                        </div>
                                        <div className="tarif-item">
                                            <span className="tarif-label">KSO</span>
                                            <span className="tarif-value">{formatCurrency(item.kso)}</span>
                                        </div>
                                        <div className="tarif-item">
                                            <span className="tarif-label">Menejemen</span>
                                            <span className="tarif-value">{formatCurrency(item.menejemen)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Total Perhitungan */}
                                <div className="total-section">
                                    <div className="total-section-title">Total Perhitungan</div>
                                    <div className="total-grid">
                                        <div className="total-item total-dr">
                                            <span>Total Dokter</span>
                                            <span>{formatCurrency(item.total_byrdr)}</span>
                                        </div>
                                        <div className="total-item total-pr">
                                            <span>Total Perawat</span>
                                            <span>{formatCurrency(item.total_byrpr)}</span>
                                        </div>
                                        <div className="total-item total-gabungan">
                                            <span>Total Dokter + Prwt</span>
                                            <span>{formatCurrency(item.total_byrdrpr)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Aksi - Hanya icon, lebih sempit */}
                                <div className="action-section">
                                    <div className="action-section-title">Aksi</div>
                                    <div className="action-buttons">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="action-btn edit-btn"
                                            title="Edit Tarif"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item)}
                                            className={`action-btn ${selectedFilter === '0' ? 'restore-btn' : 'delete-btn'}`}
                                            title={selectedFilter === '0' ? 'Aktifkan Kembali Tarif' : 'Nonaktifkan Tarif'}
                                        >
                                            {selectedFilter === '0' ? (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v6h6M20 20v-6h-6" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 8a8 8 0 10-16 8" />
                                                </svg>
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="empty-state">
                    <svg className="empty-state-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="empty-state-title">Tidak ada data tarif rawat inap</h3>
                    <p className="empty-state-description">
                        Silakan tambah tarif rawat inap baru atau ubah filter pencarian untuk melihat data tarif yang tersedia.
                    </p>
                </div>
            )}
        </div>
    );

    const renderLaboratoriumTable = () => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Kartu kiri: daftar tarif laboratorium */}
            <div className="bg-white rounded-xl shadow-lg transition-all ease-out duration-200 hover:shadow-xl hover:-translate-y-0.5 overflow-hidden ring-1 ring-gray-100 hover:ring-gray-200">
                <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-xl flex items-center justify-between transition-colors duration-200">
                    <h3 className="text-lg font-semibold text-gray-900">Daftar Pemeriksaan Lab</h3>
                    <button
                        onClick={handleAddTarif}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                        + Tarif
                    </button>
                </div>
                {data?.data?.length ? (
                    <ul className="divide-y divide-gray-200">
                        {data.data.map((item) => {
                            const isSelected = selectedLab?.kd_jenis_prw === item.kd_jenis_prw;
                            return (
                                <li
                                    key={item.kd_jenis_prw}
                                    className={`px-4 sm:px-6 py-4 cursor-pointer ${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                                    onClick={() => setSelectedLab(item)}
                                >
                                    <div>
                                        <div className="flex items-start justify-between">
                                    <div>
                                        <div className="text-sm font-semibold text-gray-900">{item.nm_perawatan}</div>
                                        <div className="text-xs text-gray-500 flex items-center space-x-3">
                                            <span>Kode: {item.kd_jenis_prw}</span>
                                            <span>Kelas: {item.kelas || '-'}</span>
                                        </div>
                                    </div>
                                            <div className="flex items-center space-x-3">
                                                {item.kategori && (
                                                    <Badge variant="secondary" title={`Kategori: ${item.kategori}`}>
                                                        Kategori: {item.kategori}
                                                    </Badge>
                                                )}
                                                {item.penjab?.png_jawab && (
                                                    <Badge variant="default" title={item.penjab?.png_jawab || ''}>
                                                        {item.penjab?.png_jawab}
                                                    </Badge>
                                                )}
                                                <Badge variant={item.status === '1' ? 'default' : 'secondary'}>
                                                    {item.status === '1' ? 'Aktif' : 'Tidak Aktif'}
                                                </Badge>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleEdit(item); }}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                    title="Edit"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleDelete(item); }}
                                                    className="text-red-600 hover:text-red-800"
                                                    title="Nonaktifkan"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                            <div className="mt-2 grid grid-cols-2 gap-x-8 gap-y-1 text-xs text-gray-700 leading-tight">
                                                <div className="flex justify-between"><span>Bagian RS</span><span>{typeof item.bagian_rs !== 'undefined' ? formatCurrency(item.bagian_rs) : '-'}</span></div>
                                                <div className="flex justify-between"><span>BHP</span><span>{typeof item.bhp !== 'undefined' ? formatCurrency(item.bhp) : '-'}</span></div>
                                                <div className="flex justify-between"><span>Tarif Perujuk</span><span>{typeof item.tarif_perujuk !== 'undefined' ? formatCurrency(item.tarif_perujuk) : '-'}</span></div>
                                                <div className="flex justify-between"><span>Tarif Dokter</span><span>{typeof item.tarif_tindakan_dokter !== 'undefined' ? formatCurrency(item.tarif_tindakan_dokter) : '-'}</span></div>
                                                <div className="flex justify-between"><span>Tarif Petugas</span><span>{typeof item.tarif_tindakan_petugas !== 'undefined' ? formatCurrency(item.tarif_tindakan_petugas) : '-'}</span></div>
                                            <div className="flex justify-between"><span>KSO</span><span>{typeof item.kso !== 'undefined' ? formatCurrency(item.kso) : '-'}</span></div>
                                            <div className="flex justify-between"><span>Menejemen</span><span>{typeof item.menejemen !== 'undefined' ? formatCurrency(item.menejemen) : '-'}</span></div>
                                            <div className="flex justify-between text-gray-900"><span>Total Tarif</span><span className="font-semibold">{typeof item.total_byr !== 'undefined' ? formatCurrency(item.total_byr) : '-'}</span></div>
                                            {/* Kelas dipindah ke header kiri agar sejajar dengan judul */}
                                            {/* Kategori dipindah ke header sebagai badge */}
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <div className="p-8 text-center text-gray-500">
                        Tidak ada data tarif laboratorium.
                    </div>
                )}
            </div>

            {/* Kartu kanan: template pemeriksaan untuk tarif terpilih */}
            <div className={`bg-blue-50 rounded-xl shadow-lg transition-all ease-out duration-200 hover:shadow-xl hover:-translate-y-0.5 overflow-hidden ring-1 ring-blue-100 hover:ring-blue-200`}>
                <div className="px-3 sm:px-4 py-3 border-b border-blue-200 bg-blue-100 rounded-t-xl transition-colors duration-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="min-w-0">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-950 leading-tight truncate">Template Pemeriksaan</h3>
                            {selectedLab ? (
                                <div className="mt-1 text-xs sm:text-sm text-blue-900 font-medium">{selectedLab.nm_perawatan}</div>
                            ) : (
                                <div className="mt-1 text-xs sm:text-sm text-gray-600">Pilih tarif laboratorium di kiri untuk melihat template.</div>
                            )}
                        </div>
                        {selectedLab && (
                            <div className="flex items-center gap-3 sm:justify-end">
                                <label className="inline-flex items-center gap-2 text-xs sm:text-sm text-blue-900">
                                    <input
                                        type="checkbox"
                                        className="rounded border-blue-300 text-indigo-600 focus:ring-indigo-500"
                                        checked={showTemplateDetails}
                                        onChange={(e) => setShowTemplateDetails(e.target.checked)}
                                    />
                                    Rincian
                                </label>
                                <button
                                    onClick={handleOpenTemplateModal}
                                    className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    title="Edit Template Pemeriksaan"
                                >
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit Template
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="p-3 sm:p-4">
                    {selectedLab ? (
                        selectedLab?.template_laboratorium?.length ? (
                            <ul className="divide-y divide-gray-200">
                                {selectedLab.template_laboratorium.map((tmpl, idx) => (
                                    <li
                                        key={idx}
                                        className={`py-2 px-2 sm:px-3 bg-blue-50`}
                                    >
                                        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2 items-start">
                                            <div>
                                                <div className="text-sm font-semibold text-gray-900">{tmpl.Pemeriksaan || tmpl.item_pemeriksaan}</div>
                                                {showTemplateDetails && (
                                                    <div className="mt-1 grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-gray-700">
                                                        {typeof tmpl.bagian_rs !== 'undefined' && <div className="flex justify-between"><span>Bagian RS</span><span className="text-gray-900">{formatCurrency(tmpl.bagian_rs)}</span></div>}
                                                        {typeof tmpl.bhp !== 'undefined' && <div className="flex justify-between"><span>BHP</span><span className="text-gray-900">{formatCurrency(tmpl.bhp)}</span></div>}
                                                        {typeof tmpl.bagian_perujuk !== 'undefined' && <div className="flex justify-between"><span>Bagian Perujuk</span><span className="text-gray-900">{formatCurrency(tmpl.bagian_perujuk)}</span></div>}
                                                        {typeof tmpl.bagian_dokter !== 'undefined' && <div className="flex justify-between"><span>Bagian Dokter</span><span className="text-gray-900">{formatCurrency(tmpl.bagian_dokter)}</span></div>}
                                                        {typeof tmpl.bagian_laborat !== 'undefined' && <div className="flex justify-between"><span>Bagian Laborat</span><span className="text-gray-900">{formatCurrency(tmpl.bagian_laborat)}</span></div>}
                                                        {typeof tmpl.kso !== 'undefined' && tmpl.kso !== null && <div className="flex justify-between"><span>KSO</span><span className="text-gray-900">{formatCurrency(tmpl.kso)}</span></div>}
                                                        {typeof tmpl.menejemen !== 'undefined' && tmpl.menejemen !== null && <div className="flex justify-between"><span>Menejemen</span><span className="text-gray-900">{formatCurrency(tmpl.menejemen)}</span></div>}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-right sm:pr-1">
                                                {typeof tmpl.biaya_item !== 'undefined' && (
                                                    <div className="text-sm sm:text-base font-semibold text-gray-900">{formatCurrency(tmpl.biaya_item)}</div>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-sm text-gray-500">Belum ada template untuk tarif ini.</div>
                        )
                    ) : (
                        <div className="text-sm text-gray-500">Tidak ada tarif yang dipilih.</div>
                    )}
                </div>
            </div>
        </div>
    );

    const renderRadiologiTable = () => (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Kode
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nama Pemeriksaan
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Bagian RS
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tarif Perujuk
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tarif Dokter
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total Tarif
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Aksi
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data?.data?.map((item) => (
                        <tr key={item.kd_jenis_prw} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {item.kd_jenis_prw}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {item.nm_perawatan}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatCurrency(item.bagian_rs)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatCurrency(item.tarif_perujuk)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatCurrency(item.tarif_tindakan_dokter)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                {formatCurrency(item.total_byr)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Badge variant={item.status === '1' ? 'default' : 'secondary'}>
                                    {item.status === '1' ? 'Aktif' : 'Tidak Aktif'}
                                </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="text-indigo-600 hover:text-indigo-900 font-medium"
                                        title="Edit"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item)}
                                        className={`inline-flex items-center justify-center px-2 py-1 rounded-md transition-colors font-medium ${selectedFilter === '0' ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}
                                        title={selectedFilter === '0' ? 'Aktifkan Kembali' : 'Nonaktifkan'}
                                    >
                                        {selectedFilter === '0' ? (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v6h6M20 20v-6h-6" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 8a8 8 0 10-16 8" />
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderKamarTable = () => (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Kode
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nama Poliklinik
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tarif Registrasi
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tarif Registrasi Lama
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Aksi
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data?.data?.map((item) => (
                        <tr key={item.kd_poli} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {item.kd_poli}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {item.nm_poli}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatCurrency(item.registrasi)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatCurrency(item.registrasilama)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Badge variant={item.status === '1' ? 'default' : 'secondary'}>
                                    {item.status === '1' ? 'Aktif' : 'Tidak Aktif'}
                                </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="text-indigo-600 hover:text-indigo-900 font-medium"
                                        title="Edit"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item)}
                                        className={`inline-flex items-center justify-center px-2 py-1 rounded-md transition-colors font-medium ${selectedFilter === '0' ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}
                                        title={selectedFilter === '0' ? 'Aktifkan Kembali' : 'Nonaktifkan'}
                                    >
                                        {selectedFilter === '0' ? (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v6h6M20 20v-6h-6" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 8a8 8 0 10-16 8" />
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderPagination = () => {
        if (!data?.links) return null;

        return (
            <div className="flex items-center justify-between px-6 py-3 bg-white border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-500">
                    Menampilkan {data.from} sampai {data.to} dari {data.total} data
                </div>
                <div className="flex items-center space-x-2">
                    {data.links.map((link, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                if (link.url) {
                                    let page = null;
                                    try {
                                        const u = new URL(link.url, window.location.origin);
                                        page = u.searchParams.get('page');
                                    } catch (e) {
                                        const match = /[?&]page=(\d+)/.exec(link.url);
                                        page = match ? match[1] : null;
                                    }

                                    const params = {
                                        search: searchTerm,
                                        category: activeTab,
                                        status: selectedFilter,
                                    };
                                    if (activeTab === 'rawat-jalan' && selectedPoliklinik !== 'all') {
                                        params.poliklinik = selectedPoliklinik;
                                    }
                                    if (activeTab === 'rawat-inap' && selectedBangsal !== 'all') {
                                        params.bangsal = selectedBangsal;
                                    }
                                    if (page) {
                                        params.page = page;
                                    }

                                    router.get(route('daftar-tarif.index'), params, {
                                        preserveState: true,
                                        preserveScroll: true,
                                        replace: true,
                                    });
                                }
                            }}
                            disabled={!link.url}
                            className={`px-3 py-1 text-sm rounded ${
                                link.active
                                    ? 'bg-blue-500 text-white'
                                    : link.url
                                    ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        );
    };

    const tabs = [
        { id: 'rawat-jalan', name: 'Rawat Jalan', render: renderRawatJalanTable },
        { id: 'rawat-inap', name: 'Rawat Inap', render: renderRawatInapTable },
        { id: 'laboratorium', name: 'Laboratorium', render: renderLaboratoriumTable },
        { id: 'radiologi', name: 'Radiologi', render: renderRadiologiTable },
        { id: 'kamar', name: 'Kamar', render: renderKamarTable }
    ];

    return (
        <AppLayout title={title}>
            <Head title={title} />
            
            <div className="space-y-6 -mt-6 -mx-6 p-6">
                <div className="bg-white rounded-lg shadow">
                    <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                            {title}
                        </h2>
                    </div>

                    {/* Tabs Navigation - Responsive */}
                    <div className="border-b border-gray-200">
                        {/* Mobile Dropdown for Tabs */}
                        <div className="block sm:hidden px-4 py-3">
                            <select
                                value={activeTab}
                                onChange={(e) => handleTabChange(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {tabs.map((tab) => (
                                    <option key={tab.id} value={tab.id}>
                                        {tab.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Desktop Tabs Navigation */}
                        <div className="hidden sm:block">
                            <nav className="-mb-px flex space-x-4 lg:space-x-8 px-4 sm:px-6 overflow-x-auto scrollbar-hide">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => handleTabChange(tab.id)}
                                        aria-current={activeTab === tab.id ? 'page' : undefined}
                                        className={`py-3 px-3 lg:px-4 border-b-2 rounded-t-md font-semibold text-sm whitespace-nowrap flex-shrink-0 transition-colors duration-200 ${
                                            activeTab === tab.id
                                                ? (
                                                    tab.id === 'rawat-jalan' ? 'border-blue-500 text-blue-700 bg-blue-50' :
                                                    tab.id === 'rawat-inap' ? 'border-yellow-500 text-yellow-700 bg-yellow-50' :
                                                    tab.id === 'laboratorium' ? 'border-indigo-500 text-indigo-700 bg-indigo-50' :
                                                    tab.id === 'radiologi' ? 'border-red-500 text-red-700 bg-red-50' :
                                                    /* kamar */ 'border-green-500 text-green-700 bg-green-50'
                                                )
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        {activeTab === tab.id && (
                                            <span
                                                className={`${
                                                    tab.id === 'rawat-jalan' ? 'bg-blue-500' :
                                                    tab.id === 'rawat-inap' ? 'bg-yellow-500' :
                                                    tab.id === 'laboratorium' ? 'bg-indigo-500' :
                                                    tab.id === 'radiologi' ? 'bg-red-500' :
                                                    'bg-green-500'
                                                } inline-block w-2 h-2 rounded-full mr-2`}
                                            ></span>
                                        )}
                                        {tab.name}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Filter Section - Enhanced Responsiveness */}
                    <div
                        className={`px-4 sm:px-6 py-4 border-b border-gray-200 ${
                            activeTab === 'rawat-jalan'
                                ? 'bg-blue-50'
                                : activeTab === 'rawat-inap'
                                ? 'bg-yellow-50'
                                : activeTab === 'laboratorium'
                                ? 'bg-indigo-50'
                                : activeTab === 'radiologi'
                                ? 'bg-red-50'
                                : 'bg-green-50'
                        }`}
                    >
                        <div className="space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between">
                            {/* Search Input */}
                            <div className="w-full lg:flex-1 lg:max-w-md">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    placeholder="Cari berdasarkan kode atau nama..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                />
                            </div>

                            {/* Filters and Actions Container */}
                            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                                {/* Filters */}
                                <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
                                    {/* Status Filter */}
                                    <select
                                        value={selectedFilter}
                                        onChange={handleFilterChange}
                                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0 flex-1 xs:flex-none xs:w-auto"
                                    >
                                        <option value="all">Semua Status</option>
                                        <option value="1">Aktif</option>
                                        <option value="0">Tidak Aktif</option>
                                    </select>

                                    {/* Conditional Filter - Poliklinik for rawat-jalan, Bangsal for rawat-inap */}
                                    {activeTab === 'rawat-jalan' && (
                                        <select
                                            value={selectedPoliklinik}
                                            onChange={handlePoliklinikChange}
                                            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0 flex-1 xs:flex-none xs:w-auto"
                                        >
                                            <option value="all">Semua Poliklinik</option>
                                            {polikliniks.map((poli) => (
                                                <option key={poli.kd_poli} value={poli.kd_poli}>
                                                    {poli.nm_poli}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                    
                                    {activeTab === 'rawat-inap' && (
                                        <select
                                            value={selectedBangsal}
                                            onChange={handleBangsalChange}
                                            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0 flex-1 xs:flex-none xs:w-auto"
                                        >
                                            <option value="all">Semua Bangsal</option>
                                            {bangsals.map((bangsal) => (
                                                <option key={bangsal.kd_bangsal} value={bangsal.kd_bangsal}>
                                                    {bangsal.nm_bangsal}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col xs:flex-row gap-2">
                                    {/* Export Button */}
                                    <button
                                        onClick={handleExport}
                                        className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 whitespace-nowrap"
                                    >
                                        <svg className="w-4 h-4 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <span className="hidden xs:inline">Export</span>
                                        <span className="xs:hidden">Export</span>
                                    </button>

                                    {/* Button + Tarif - tampil di tab Rawat Jalan dan Rawat Inap */}
                                    {(activeTab === 'rawat-jalan' || activeTab === 'rawat-inap') && (
                                        <button
                                            onClick={handleAddTarif}
                                            className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 whitespace-nowrap"
                                        >
                                            <svg 
                                                className="w-4 h-4 mr-1.5 flex-shrink-0" 
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round" 
                                                    strokeWidth={2} 
                                                    d="M12 4v16m8-8H4" 
                                                />
                                            </svg>
                                            <span className="hidden sm:inline">
                                                {activeTab === 'rawat-inap' ? 'Tambah Tarif Ranap' : 'Tambah Tarif'}
                                            </span>
                                            <span className="sm:hidden">Tambah</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tab Content - Responsive */}
                    <div className="p-4 sm:p-6">
                        <div className="overflow-x-auto">
                            {tabs.find(tab => tab.id === activeTab)?.render()}
                        </div>
                    </div>

                    {/* Pagination - Responsive */}
                    <div className="px-4 sm:px-6">
                        {renderPagination()}
                    </div>
                </div>
            </div>

            {/* Add Tarif Modal */}
            <AddTarifModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                category={activeTab}
                polikliniks={polikliniks}
                bangsals={bangsals}
                penjaabs={penjaabs}
                kategoris={kategoris}
            />

            {/* Modal untuk edit tarif */}
            <AddTarifModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setEditingItem(null);
                }}
                category={activeTab}
                polikliniks={polikliniks}
                bangsals={bangsals}
                penjaabs={penjaabs}
                kategoris={kategoris}
                editData={editingItem}
            />

            {/* Modal edit Template Pemeriksaan */}
            <EditTemplateModal
                isOpen={isTemplateModalOpen}
                onClose={handleCloseTemplateModal}
                rows={templateRows}
                setRows={setTemplateRows}
                onSave={handleSaveTemplateRows}
                selectedLabName={selectedLab?.nm_perawatan || ''}
            />
        </AppLayout>
    );
}