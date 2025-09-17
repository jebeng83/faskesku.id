import React, { useState, useEffect } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AppLayout from '@/Layouts/AppLayout';

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
const AddTarifModal = ({ isOpen, onClose, category, polikliniks = [], penjaabs = [], kategoris = [] }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        kd_jenis_prw: '',
        nm_perawatan: '',
        kd_kategori: '',
        material: 0,
        bhp: 0,
        tarif_tindakandr: 0,
        tarif_tindakanpr: 0,
        kso: 0,
        menejemen: 0,
        kd_pj: '',
        kd_poli: '',
        status: '1',
        category: category,
        total_dr: 0,
        total_pr: 0,
        total_drpr: 0,
        show_total_dokter: false,
        show_total_perawat: false,
        show_total_dokter_perawat: false
    });

    // Function to generate auto code when kategori changes
    const generateAutoCode = async (kdKategori) => {
        if (!kdKategori) return;
        
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
        
        // Auto generate code when kategori is selected
        if (kdKategori) {
            generateAutoCode(kdKategori);
        } else {
            setData('kd_jenis_prw', '');
        }
    };

    // Calculate total tarif
    const calculateTotal = () => {
        const material = data.material || 0;
        const bhp = data.bhp || 0;
        const tarif_tindakandr = data.tarif_tindakandr || 0;
        const tarif_tindakanpr = data.tarif_tindakanpr || 0;
        const kso = data.kso || 0;
        const menejemen = data.menejemen || 0;

        const totalDr = material + bhp + tarif_tindakandr + kso + menejemen;
        const totalPr = material + bhp + tarif_tindakanpr + kso + menejemen;
        const totalDrPr = material + bhp + tarif_tindakandr + tarif_tindakanpr + kso + menejemen;

        return { totalDr, totalPr, totalDrPr };
    };

    const { totalDr, totalPr, totalDrPr } = calculateTotal();

    // Function to validate form before submission
    const validateForm = () => {
        const requiredFields = {
            'kd_jenis_prw': 'Kode Jenis Perawatan',
            'nm_perawatan': 'Nama Perawatan',
            'kd_pj': 'Asuransi / Penanggung Jawab',
            'kd_poli': 'Klinik/RS',
            'status': 'Status'
        };
        
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
        if (data.nm_perawatan && data.nm_perawatan.length > 80) {
            errors.nm_perawatan = 'Nama Perawatan maksimal 80 karakter';
        }
        
        // Validate numeric fields (should be >= 0)
        const numericFields = ['material', 'bhp', 'tarif_tindakandr', 'tarif_tindakanpr', 'kso', 'menejemen'];
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
            category: category || 'rawat-jalan'
        };
        
        console.log('Formatted data:', formData);
        
        post(route('daftar-tarif.store'), {
            data: formData,
            onSuccess: () => {
                // Show success notification
                const notification = document.createElement('div');
                notification.className = 'fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 animate-pulse';
                notification.innerHTML = `
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <div>
                        <div class="font-semibold">Data Berhasil Disimpan!</div>
                        <div class="text-sm opacity-90">Tarif ${data.nm_perawatan || 'baru'} telah ditambahkan ke sistem</div>
                    </div>
                `;
                
                document.body.appendChild(notification);
                
                // Auto remove notification after 4 seconds
                setTimeout(() => {
                    notification.style.transform = 'translateX(100%)';
                    notification.style.opacity = '0';
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.parentNode.removeChild(notification);
                        }
                    }, 300);
                }, 4000);
                
                reset();
                onClose();
            },
            onError: (errors) => {
                // Debug: Log errors yang diterima
                console.log('Validation errors:', errors);
                
                // Show error notification with specific error details
                const notification = document.createElement('div');
                notification.className = 'fixed top-4 right-4 z-50 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 max-w-md';
                
                // Create error list
                const errorList = Object.entries(errors).map(([field, messages]) => {
                    const fieldNames = {
                        'kd_jenis_prw': 'Kode Jenis Perawatan',
                        'nm_perawatan': 'Nama Perawatan',
                        'kd_kategori': 'Kategori',
                        'kd_pj': 'Asuransi / Penanggung Jawab',
                        'kd_poli': 'Klinik/RS',
                        'material': 'Klinik/RS',
                        'bhp': 'BHP',
                        'tarif_tindakandr': 'Didapat Dokter',
                        'tarif_tindakanpr': 'Didapat Petugas/Perawat',
                        'kso': 'KSO',
                        'menejemen': 'Menejemen',
                        'status': 'Status'
                    };
                    
                    const fieldName = fieldNames[field] || field;
                    const messageArray = Array.isArray(messages) ? messages : [messages];
                    return `<li><strong>${fieldName}:</strong> ${messageArray.join(', ')}</li>`;
                }).join('');
                
                notification.innerHTML = `
                    <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    <div class="flex-1">
                        <div class="font-semibold">Gagal Menyimpan Data!</div>
                        <div class="text-sm opacity-90 mt-1">
                            <ul class="list-disc list-inside space-y-1">
                                ${errorList}
                            </ul>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(notification);
                
                // Auto remove notification after 8 seconds (longer for error details)
                setTimeout(() => {
                    notification.style.transform = 'translateX(100%)';
                    notification.style.opacity = '0';
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.parentNode.removeChild(notification);
                        }
                    }, 300);
                }, 8000);
            }
        });
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Tambah Tarif {category === 'rawat-jalan' ? 'Rawat Jalan' : category}</h3>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Kategori Field - Move to top for better UX */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Kategori Perawatan *
                            </label>
                            <select
                                value={data.kd_kategori}
                                onChange={handleKategoriChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Pilih Kategori</option>
                                {kategoris.map((kategori) => (
                                    <option key={kategori.kd_kategori} value={kategori.kd_kategori}>
                                        {kategori.nm_kategori}
                                    </option>
                                ))}
                            </select>
                            {errors.kd_kategori && <p className="text-red-500 text-xs mt-1">{errors.kd_kategori}</p>}
                        </div>

                        {/* Kode Jenis Perawatan - REQUIRED */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Kode Jenis Perawatan <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.kd_jenis_prw}
                                onChange={(e) => setData('kd_jenis_prw', e.target.value.toUpperCase())}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                    errors.kd_jenis_prw ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                }`}
                                placeholder="Masukkan kode jenis perawatan"
                                maxLength="15"
                                required
                            />
                            {errors.kd_jenis_prw && <p className="text-red-500 text-xs mt-1">{errors.kd_jenis_prw}</p>}
                        </div>

                        {/* Nama Perawatan - REQUIRED */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Nama Perawatan <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.nm_perawatan}
                                onChange={(e) => setData('nm_perawatan', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                    errors.nm_perawatan ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                }`}
                                placeholder="Masukkan nama perawatan"
                                maxLength="80"
                                required
                            />
                            {errors.nm_perawatan && <p className="text-red-500 text-xs mt-1">{errors.nm_perawatan}</p>}
                        </div>

                        {/* Klinik/RS - REQUIRED */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Klinik/RS <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={data.kd_poli}
                                onChange={(e) => setData('kd_poli', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                    errors.kd_poli ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                }`}
                                required
                            >
                                <option value="">Pilih Klinik/RS</option>
                                {polikliniks.map((poli) => (
                                    <option key={poli.kd_poli} value={poli.kd_poli}>
                                        {poli.nm_poli}
                                    </option>
                                ))}
                            </select>
                            {errors.kd_poli && <p className="text-red-500 text-xs mt-1">{errors.kd_poli}</p>}
                        </div>

                        {/* Asuransi / Penanggung Jawab - REQUIRED */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Asuransi / Penanggung Jawab <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={data.kd_pj}
                                onChange={(e) => setData('kd_pj', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                    errors.kd_pj ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                }`}
                                required
                            >
                                <option value="">Pilih Asuransi / Penanggung Jawab</option>
                                {penjaabs.map((penjab) => (
                                    <option key={penjab.kd_pj} value={penjab.kd_pj}>
                                        {penjab.png_jawab}
                                    </option>
                                ))}
                            </select>
                            {errors.kd_pj && <p className="text-red-500 text-xs mt-1">{errors.kd_pj}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Klinik/RS
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*\.?[0-9]*"
                                placeholder="0"
                                value={data.material || ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    // Hanya izinkan angka dan titik desimal
                                    if (value === '' || /^\d*\.?\d*$/.test(value)) {
                                        setData('material', value === '' ? 0 : parseFloat(value) || 0);
                                    }
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                style={{ 
                                    MozAppearance: 'textfield',
                                    WebkitAppearance: 'none'
                                }}
                            />
                            {errors.material && <p className="text-red-500 text-xs mt-1">{errors.material}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                BHP
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*\.?[0-9]*"
                                placeholder="0"
                                value={data.bhp || ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === '' || /^\d*\.?\d*$/.test(value)) {
                                        setData('bhp', value === '' ? 0 : parseFloat(value) || 0);
                                    }
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                style={{ 
                                    MozAppearance: 'textfield',
                                    WebkitAppearance: 'none'
                                }}
                            />
                            {errors.bhp && <p className="text-red-500 text-xs mt-1">{errors.bhp}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Didapat Dokter
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*\.?[0-9]*"
                                placeholder="0"
                                value={data.tarif_tindakandr || ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === '' || /^\d*\.?\d*$/.test(value)) {
                                        setData('tarif_tindakandr', value === '' ? 0 : parseFloat(value) || 0);
                                    }
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                style={{ 
                                    MozAppearance: 'textfield',
                                    WebkitAppearance: 'none'
                                }}
                            />
                            {errors.tarif_tindakandr && <p className="text-red-500 text-xs mt-1">{errors.tarif_tindakandr}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Didapat Perawat / Petugas
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*\.?[0-9]*"
                                placeholder="0"
                                value={data.tarif_tindakanpr || ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === '' || /^\d*\.?\d*$/.test(value)) {
                                        setData('tarif_tindakanpr', value === '' ? 0 : parseFloat(value) || 0);
                                    }
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                style={{ 
                                    MozAppearance: 'textfield',
                                    WebkitAppearance: 'none'
                                }}
                            />
                            {errors.tarif_tindakanpr && <p className="text-red-500 text-xs mt-1">{errors.tarif_tindakanpr}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                KSO
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*\.?[0-9]*"
                                placeholder="0"
                                value={data.kso || ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === '' || /^\d*\.?\d*$/.test(value)) {
                                        setData('kso', value === '' ? 0 : parseFloat(value) || 0);
                                    }
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                style={{ 
                                    MozAppearance: 'textfield',
                                    WebkitAppearance: 'none'
                                }}
                            />
                            {errors.kso && <p className="text-red-500 text-xs mt-1">{errors.kso}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Menejemen
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*\.?[0-9]*"
                                placeholder="0"
                                value={data.menejemen || ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === '' || /^\d*\.?\d*$/.test(value)) {
                                        setData('menejemen', value === '' ? 0 : parseFloat(value) || 0);
                                    }
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                style={{ 
                                    MozAppearance: 'textfield',
                                    WebkitAppearance: 'none'
                                }}
                            />
                            {errors.menejemen && <p className="text-red-500 text-xs mt-1">{errors.menejemen}</p>}
                        </div>

                        {/* Status - REQUIRED */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Status <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                    errors.status ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                }`}
                                required
                            >
                                <option value="1">Aktif</option>
                                <option value="0">Tidak Aktif</option>
                            </select>
                            {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
                        </div>
                    </div>

                    {/* Total Calculation Display - Improved Layout */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-6 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                </svg>
                                Perhitungan Total Tarif
                            </h4>
                            <div className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full border">
                                Pilih total yang ingin ditampilkan
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Total Dokter */}
                            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center mb-2">
                                            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                            <span className="text-sm font-medium text-gray-700">Total Dokter</span>
                                        </div>
                                        <div className="text-2xl font-bold text-gray-900">
                                            Rp {data.show_total_dokter ? totalDr.toLocaleString('id-ID') : '0'}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            Klinik/RS + BHP + Tarif Tindakan Dokter + KSO + Menejemen
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <label className="flex items-center cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={data.show_total_dokter || false}
                                                onChange={(e) => {
                                                    setData('show_total_dokter', e.target.checked);
                                                }}
                                                className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                            />
                                            <span className="ml-2 text-xs text-gray-600 group-hover:text-green-600 transition-colors">
                                                Aktif
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Total Perawat */}
                            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center mb-2">
                                            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                                            <span className="text-sm font-medium text-gray-700">Total Perawat</span>
                                        </div>
                                        <div className="text-2xl font-bold text-gray-900">
                                            Rp {data.show_total_perawat ? totalPr.toLocaleString('id-ID') : '0'}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            Material + BHP + Tarif Perawat + KSO + Menejemen
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <label className="flex items-center cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={data.show_total_perawat || false}
                                                onChange={(e) => {
                                                    setData('show_total_perawat', e.target.checked);
                                                }}
                                                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                            />
                                            <span className="ml-2 text-xs text-gray-600 group-hover:text-blue-600 transition-colors">
                                                Aktif
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Total Dokter + Perawat */}
                            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center mb-2">
                                            <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                                            <span className="text-sm font-medium text-gray-700">Total Dokter + Perawat</span>
                                        </div>
                                        <div className="text-2xl font-bold text-gray-900">
                                            Rp {data.show_total_dokter_perawat ? totalDrPr.toLocaleString('id-ID') : '0'}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            Klinik/RS + BHP + Kedua Didapat + KSO + Menejemen
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <label className="flex items-center cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={data.show_total_dokter_perawat || false}
                                                onChange={(e) => {
                                                    setData('show_total_dokter_perawat', e.target.checked);
                                                }}
                                                className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                                            />
                                            <span className="ml-2 text-xs text-gray-600 group-hover:text-purple-600 transition-colors">
                                                Aktif
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Status Info */}
                        <div className="mt-4 flex items-center justify-center">
                            <div className="text-xs text-gray-500 bg-white px-4 py-2 rounded-full border border-gray-200">
                                💡 Tip: Anda dapat mengaktifkan beberapa total sekaligus untuk perbandingan
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default function Index({ title, data, category, search, filters, polikliniks = [], penjaabs = [], kategoris = [] }) {
    const [searchTerm, setSearchTerm] = useState(search || '');
    const [activeTab, setActiveTab] = useState(category || 'rawat-jalan');
    const [selectedFilter, setSelectedFilter] = useState('semua');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('daftar-tarif.index'), {
            search: searchTerm,
            category: activeTab,
            per_page: filters?.per_page || 10
        }, {
            preserveState: true,
            replace: true
        });
    };

    const handleTabChange = (newTab) => {
        setActiveTab(newTab);
        router.get(route('daftar-tarif.index'), {
            search: searchTerm,
            category: newTab,
            per_page: filters?.per_page || 10
        }, {
            preserveState: true,
            replace: true
        });
    };

    // Handler untuk button + Tarif
    const handleAddTarif = () => {
        setIsModalOpen(true);
    };

    // Handler untuk filter
    const handleFilterChange = (filterValue) => {
        setSelectedFilter(filterValue);
        // Implementasi filter logic di sini
        router.get(route('daftar-tarif.index'), {
            search: searchTerm,
            category: activeTab,
            filter: filterValue,
            per_page: filters?.per_page || 10
        }, {
            preserveState: true,
            replace: true
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const renderRawatJalanTable = () => (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Kode
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nama Perawatan
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Poliklinik
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Material
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            BHP
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tarif Tindakan Dr
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tarif Tindakan Pr
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            KSO
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Menejemen
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total Byrdr
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total Byrpr
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total Byrdrpr
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.poliklinik?.nm_poli || '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatCurrency(item.material)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatCurrency(item.bhp)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatCurrency(item.tarif_tindakandr)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatCurrency(item.tarif_tindakanpr)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatCurrency(item.kso)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatCurrency(item.menejemen)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatCurrency(item.total_byrdr)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatCurrency(item.total_byrpr)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                {formatCurrency(item.total_byrdrpr)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderRawatInapTable = () => (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Kode
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nama Perawatan
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Bangsal
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tarif Dokter
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tarif Perawat
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total Tarif
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.bangsal?.nm_bangsal || '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatCurrency(item.total_byrdr)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatCurrency(item.total_byrpr)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                {formatCurrency(item.total_byrdrpr)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Badge variant={item.status === '1' ? 'default' : 'secondary'}>
                                    {item.status === '1' ? 'Aktif' : 'Tidak Aktif'}
                                </Badge>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderLaboratoriumTable = () => (
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
                        </tr>
                    ))}
                </tbody>
            </table>
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
                                    router.visit(link.url);
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
        { id: 'rawat-jalan', label: 'Rawat Jalan', render: renderRawatJalanTable },
        { id: 'rawat-inap', label: 'Rawat Inap', render: renderRawatInapTable },
        { id: 'laboratorium', label: 'Laboratorium', render: renderLaboratoriumTable },
        { id: 'radiologi', label: 'Radiologi', render: renderRadiologiTable },
        { id: 'kamar', label: 'Kamar', render: renderKamarTable }
    ];

    return (
        <AppLayout title={title}>
            <Head title={title} />
            
            <div className="space-y-6 -mt-6 -mx-6 p-6">
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {title}
                        </h2>
                        
                        {/* Search Form */}
                        <form onSubmit={handleSearch} className="mt-4">
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Cari berdasarkan kode atau nama..."
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Cari
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8 px-6">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabChange(tab.id)}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                        activeTab === tab.id
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Filter dan Button Section - di bawah tabs */}
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            {/* Filter Section */}
                            <div className="flex items-center space-x-4">
                                <span className="text-sm font-medium text-gray-700">Filter:</span>
                                <select
                                    value={selectedFilter}
                                    onChange={(e) => handleFilterChange(e.target.value)}
                                    className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="semua">Semua</option>
                                    <option value="aktif">Aktif</option>
                                    <option value="nonaktif">Non-Aktif</option>
                                    {activeTab === 'rawat-jalan' && (
                                        <>
                                            <option value="poli-umum">Poli Umum</option>
                                            <option value="poli-spesialis">Poli Spesialis</option>
                                        </>
                                    )}
                                </select>
                                
                                {/* Quick Filter Buttons */}
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleFilterChange('tarif-tinggi')}
                                        className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                                            selectedFilter === 'tarif-tinggi'
                                                ? 'bg-blue-100 text-blue-700 border-blue-300'
                                                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        Tarif Tinggi
                                    </button>
                                    <button
                                        onClick={() => handleFilterChange('tarif-rendah')}
                                        className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                                            selectedFilter === 'tarif-rendah'
                                                ? 'bg-blue-100 text-blue-700 border-blue-300'
                                                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        Tarif Rendah
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center space-x-3">
                                {/* Export Button */}
                                <button className="inline-flex items-center px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Export
                                </button>

                                {/* Button + Tarif - hanya tampil di tab Rawat Jalan */}
                                {activeTab === 'rawat-jalan' && (
                                    <button
                                        onClick={handleAddTarif}
                                        className="inline-flex items-center px-4 py-1.5 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
                                    >
                                        <svg 
                                            className="w-4 h-4 mr-1.5" 
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
                                        Tambah Tarif
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {tabs.find(tab => tab.id === activeTab)?.render()}
                    </div>

                    {/* Pagination */}
                    {renderPagination()}
                </div>
            </div>

            {/* Add Tarif Modal */}
            <AddTarifModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                category={activeTab}
                polikliniks={polikliniks}
                penjaabs={penjaabs}
                kategoris={kategoris}
            />
        </AppLayout>
    );
}