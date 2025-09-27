import React, { useState, useEffect } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
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
const AddTarifModal = ({ isOpen, onClose, category, polikliniks = [], penjaabs = [], kategoris = [], editData = null }) => {
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

    const isEditMode = !!editData;
    const [focusedField, setFocusedField] = useState(null);

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
                kd_pj: editData.kd_pj || '',
                kd_poli: editData.kd_poli || '',
                status: editData.status || '1',
                category: category,
                total_dr: 0,
                total_pr: 0,
                total_drpr: 0,
                show_total_dokter: false,
                show_total_perawat: false,
                show_total_dokter_perawat: false
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
            // If valid number, remove leading zeros and parse
            const cleanValue = value.replace(/^0+(?=\d)/, '');
            const numericValue = parseFloat(cleanValue) || 0;
            setData(fieldName, numericValue);
        }
    };

    // Helper function to display value in input (show empty string instead of 0 when focused)
    const getDisplayValue = (value, isFocused = false) => {
        if (value === 0 && isFocused) {
            return '';
        }
        return value || '';
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
            'kd_poli': 'Poli Klinik',
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
        
        const submitMethod = isEditMode ? put : post;
        const submitRoute = isEditMode 
            ? route('daftar-tarif.update', editData.kd_jenis_prw)
            : route('daftar-tarif.store');
        
        submitMethod(submitRoute, {
            data: formData,
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
        reset();
        onClose();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
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
                                {isEditMode ? 'Edit Tarif' : 'Tambah Tarif'}
                            </h3>
                            <p className="modal-subtitle">
                                {category === 'rawat-jalan' ? 'Rawat Jalan' : category}
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
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Data Perawatan Section */}
                        <div className="form-section">
                            <div className="section-header">
                                <div className="section-icon">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                    </svg>
                                </div>
                                <h4 className="section-title">Data Perawatan</h4>
                            </div>
                            
                            <div className="form-grid">
                                {/* Kategori Field */}
                                <div className="input-group">
                                    <label className="input-label">
                                        Kategori Perawatan *
                                    </label>
                                    <div className="flex gap-2">
                                        <select
                                            value={data.kd_kategori}
                                            onChange={handleKategoriChange}
                                            className="form-select flex-1"
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
                                <div className="input-group">
                                    <label className="input-label">
                                        Kode Jenis Perawatan *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.kd_jenis_prw}
                                        onChange={(e) => setData('kd_jenis_prw', e.target.value.toUpperCase())}
                                        className={`form-input ${errors.kd_jenis_prw ? 'error' : ''}`}
                                        placeholder="Masukkan kode jenis perawatan"
                                        maxLength="15"
                                        disabled={isEditMode}
                                        required
                                    />
                                    {errors.kd_jenis_prw && <p className="error-text">{errors.kd_jenis_prw}</p>}
                                </div>

                                {/* Nama Perawatan */}
                                <div className="input-group">
                                    <label className="input-label">
                                        Nama Perawatan *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.nm_perawatan}
                                        onChange={(e) => setData('nm_perawatan', e.target.value)}
                                        className={`form-input ${errors.nm_perawatan ? 'error' : ''}`}
                                        placeholder="Masukkan nama perawatan"
                                        maxLength="80"
                                        required
                                    />
                                    {errors.nm_perawatan && <p className="error-text">{errors.nm_perawatan}</p>}
                                </div>

                                {/* Poli Klinik */}
                                <div className="input-group">
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

                                {/* Asuransi / Penanggung Jawab */}
                                <div className="input-group col-span-2">
                                    <label className="input-label">
                                        Asuransi / Penanggung Jawab *
                                    </label>
                                    <select
                                        value={data.kd_pj}
                                        onChange={(e) => setData('kd_pj', e.target.value)}
                                        className={`form-select ${errors.kd_pj ? 'error' : ''}`}
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
                            </div>
                        </div>

                        {/* Komponen Tarif Section */}
                        <div className="form-section">
                            <div className="section-header">
                                <div className="section-icon">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                                    </svg>
                                </div>
                                <h4 className="section-title">Komponen Tarif</h4>
                            </div>
                            
                            <div className="form-grid">
                                <div className="input-group">
                                    <label className="input-label">Bagian RS</label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*\.?[0-9]*"
                                        placeholder="0"
                                        value={getDisplayValue(data.material, focusedField === 'material')}
                                        onChange={(e) => handleNumericInput('material', e.target.value)}
                                        onFocus={() => setFocusedField('material')}
                                        onBlur={() => setFocusedField(null)}
                                        className="form-input"
                                    />
                                    {errors.material && <p className="error-text">{errors.material}</p>}
                                </div>

                                <div className="input-group">
                                    <label className="input-label">BHP</label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*\.?[0-9]*"
                                        placeholder="0"
                                        value={getDisplayValue(data.bhp, focusedField === 'bhp')}
                                        onChange={(e) => handleNumericInput('bhp', e.target.value)}
                                        onFocus={() => setFocusedField('bhp')}
                                        onBlur={() => setFocusedField(null)}
                                        className="form-input"
                                    />
                                    {errors.bhp && <p className="error-text">{errors.bhp}</p>}
                                </div>

                                <div className="input-group">
                                    <label className="input-label">Jasa Dokter</label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*\.?[0-9]*"
                                        placeholder="0"
                                        value={getDisplayValue(data.tarif_tindakandr, focusedField === 'tarif_tindakandr')}
                                        onChange={(e) => handleNumericInput('tarif_tindakandr', e.target.value)}
                                        onFocus={() => setFocusedField('tarif_tindakandr')}
                                        onBlur={() => setFocusedField(null)}
                                        className="form-input"
                                    />
                                    {errors.tarif_tindakandr && <p className="error-text">{errors.tarif_tindakandr}</p>}
                                </div>

                                <div className="input-group">
                                    <label className="input-label">Jasa Perawat</label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*\.?[0-9]*"
                                        placeholder="0"
                                        value={getDisplayValue(data.tarif_tindakanpr, focusedField === 'tarif_tindakanpr')}
                                        onChange={(e) => handleNumericInput('tarif_tindakanpr', e.target.value)}
                                        onFocus={() => setFocusedField('tarif_tindakanpr')}
                                        onBlur={() => setFocusedField(null)}
                                        className="form-input"
                                    />
                                    {errors.tarif_tindakanpr && <p className="error-text">{errors.tarif_tindakanpr}</p>}
                                </div>

                                <div className="input-group">
                                    <label className="input-label">KSO</label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*\.?[0-9]*"
                                        placeholder="0"
                                        value={getDisplayValue(data.kso, focusedField === 'kso')}
                                        onChange={(e) => handleNumericInput('kso', e.target.value)}
                                        onFocus={() => setFocusedField('kso')}
                                        onBlur={() => setFocusedField(null)}
                                        className="form-input"
                                    />
                                    {errors.kso && <p className="error-text">{errors.kso}</p>}
                                </div>

                                <div className="input-group">
                                    <label className="input-label">Menejemen</label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*\.?[0-9]*"
                                        placeholder="0"
                                        value={getDisplayValue(data.menejemen, focusedField === 'menejemen')}
                                        onChange={(e) => handleNumericInput('menejemen', e.target.value)}
                                        onFocus={() => setFocusedField('menejemen')}
                                        onBlur={() => setFocusedField(null)}
                                        className="form-input"
                                    />
                                    {errors.menejemen && <p className="error-text">{errors.menejemen}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Perhitungan Total Section */}
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

export default function Index({ title, data, category, search, filters, polikliniks = [], penjaabs = [], kategoris = [] }) {
    const [searchTerm, setSearchTerm] = useState(search || '');
    const [activeTab, setActiveTab] = useState(category || 'rawat-jalan');
    const [selectedFilter, setSelectedFilter] = useState(filters?.status || 'all');
    const [selectedPoliklinik, setSelectedPoliklinik] = useState(filters?.poliklinik || 'all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

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
                status: selectedFilter !== 'all' ? selectedFilter : undefined,
                poliklinik: selectedPoliklinik !== 'all' ? selectedPoliklinik : undefined,
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
            status: selectedFilter !== 'all' ? selectedFilter : undefined,
            poliklinik: selectedPoliklinik !== 'all' ? selectedPoliklinik : undefined,
        }, {
            preserveState: true,
            replace: true
        });
    };

    const handlePoliklinikChange = (e) => {
        const value = e.target.value;
        setSelectedPoliklinik(value);
        
        router.get(route('daftar-tarif.index'), {
            search: searchTerm,
            category: activeTab,
            status: selectedFilter !== 'all' ? selectedFilter : undefined,
            poliklinik: value !== 'all' ? value : undefined,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    // Handler untuk button + Tarif
    const handleAddTarif = () => {
        router.visit(route('daftar-tarif.create', { category: activeTab }));
    };

    // Handler untuk edit
    const handleEdit = (item) => {
        setEditingItem(item);
        setIsEditModalOpen(true);
    };

    // Handler untuk delete dengan konfirmasi
    const handleDelete = (item) => {
        if (window.confirm(`Apakah Anda yakin ingin menghapus tarif "${item.nm_perawatan}"?`)) {
            router.delete(route('daftar-tarif.destroy', item.kd_jenis_prw), {
                data: { category: activeTab },
                onSuccess: () => {
                    // Refresh data setelah delete berhasil
                    router.reload({ only: ['data'] });
                },
                onError: (errors) => {
                    console.error('Error deleting tarif:', errors);
                    alert('Gagal menghapus tarif. Silakan coba lagi.');
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
            status: value !== 'all' ? value : undefined,
            poliklinik: selectedPoliklinik !== 'all' ? selectedPoliklinik : undefined,
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
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Kode
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Nama Perawatan
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Poliklinik
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Bagian RS/Klinik
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            BHP
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Bagian Dokter
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Bagian Perawat
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            KSO
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Menejemen
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Total Dokter
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Total Perawat
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Total Dokter + Prwt
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Aksi
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data?.data?.length > 0 ? (
                        data.data.map((item, index) => (
                            <tr key={item.kd_jenis_prw} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 border-b">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {item.kd_jenis_prw}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-900 border-b">
                                    <div className="max-w-xs truncate" title={item.nm_perawatan}>
                                        {item.nm_perawatan}
                                    </div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-b">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        {item.poliklinik?.nm_poli || '-'}
                                    </span>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-b">
                                    {formatCurrency(item.material)}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-b">
                                    {formatCurrency(item.bhp)}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-b">
                                    {formatCurrency(item.tarif_tindakandr)}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-b">
                                    {formatCurrency(item.tarif_tindakanpr)}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-b">
                                    {formatCurrency(item.kso)}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-b">
                                    {formatCurrency(item.menejemen)}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600 border-b">
                                    {formatCurrency(item.total_byrdr)}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-green-600 border-b">
                                    {formatCurrency(item.total_byrpr)}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-purple-600 border-b">
                                    {formatCurrency(item.total_byrdrpr)}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium border-b">
                                    <div className="flex items-center justify-center space-x-2">
                                        <Link
                                            href={route('daftar-tarif.edit', item.kd_jenis_prw)}
                                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            title="Edit Tarif"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(item)}
                                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                            title="Hapus Tarif"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="13" className="px-4 py-8 text-center text-gray-500">
                                Tidak ada data tarif
                            </td>
                        </tr>
                    )}
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="text-indigo-600 hover:text-indigo-900 font-medium"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item)}
                                        className="text-red-600 hover:text-red-900 font-medium"
                                    >
                                        Delete
                                    </button>
                                </div>
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
                                        className="text-red-600 hover:text-red-900 font-medium"
                                        title="Hapus"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
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
                                        className="text-red-600 hover:text-red-900 font-medium"
                                        title="Hapus"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
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
                                        className="text-red-600 hover:text-red-900 font-medium"
                                        title="Hapus"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
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
                                        className={`py-4 px-2 lg:px-1 border-b-2 font-medium text-sm whitespace-nowrap flex-shrink-0 transition-colors duration-200 ${
                                            activeTab === tab.id
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        {tab.name}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Filter Section - Enhanced Responsiveness */}
                    <div className="px-4 sm:px-6 py-4 bg-gray-50 border-b border-gray-200">
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

                                    {/* Poliklinik Filter */}
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

                                    {/* Button + Tarif - hanya tampil di tab Rawat Jalan */}
                                    {activeTab === 'rawat-jalan' && (
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
                                            <span className="hidden sm:inline">Tambah Tarif</span>
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
                penjaabs={penjaabs}
                kategoris={kategoris}
                editData={editingItem}
            />
        </AppLayout>
    );
}