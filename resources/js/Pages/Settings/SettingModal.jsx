import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { toast } from '@/tools/toast';
import { useSettings } from '@/contexts/SettingsContext';

export default function SettingModal({ type, setting, onClose, onSuccess, onError }) {
    const [formData, setFormData] = useState({
        nama_instansi: '',
        alamat_instansi: '',
        kabupaten: '',
        propinsi: '',
        kontak: '',
        email: '',
        aktifkan: 'No',
        kode_ppk: '',
        kode_ppkinhealth: '',
        kode_ppkkemenkes: '',
        wallpaper: null,
        logo: null
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [wallpaperPreview, setWallpaperPreview] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    
    // Use settings context to refresh after changes
    const { refreshSettings } = useSettings();

    useEffect(() => {
        if (setting && (type === 'edit' || type === 'view')) {
            setFormData({
                nama_instansi: setting.nama_instansi || '',
                alamat_instansi: setting.alamat_instansi || '',
                kabupaten: setting.kabupaten || '',
                propinsi: setting.propinsi || '',
                kontak: setting.kontak || '',
                email: setting.email || '',
                aktifkan: setting.aktifkan || 'No',
                kode_ppk: setting.kode_ppk || '',
                kode_ppkinhealth: setting.kode_ppkinhealth || '',
                kode_ppkkemenkes: setting.kode_ppkkemenkes || '',
                wallpaper: null,
                logo: null
            });

            // Set preview images if they exist
            if (setting.has_wallpaper) {
                setWallpaperPreview(route('settings.image', { setting: setting.nama_instansi, type: 'wallpaper' }));
            }
            if (setting.has_logo) {
                setLogoPreview(route('settings.image', { setting: setting.nama_instansi, type: 'logo' }));
            }
        }
    }, [setting, type]);

    // Fungsi untuk mengkompresi gambar sebelum upload
    const compressImage = async (file, maxWidth, maxHeight, quality = 0.8) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    // Hitung dimensi baru
                    let width = img.width;
                    let height = img.height;
                    
                    if (width > maxWidth || height > maxHeight) {
                        if (width > height) {
                            height = Math.round(height * (maxWidth / width));
                            width = maxWidth;
                        } else {
                            width = Math.round(width * (maxHeight / height));
                            height = maxHeight;
                        }
                    }
                    
                    // Buat canvas untuk resize gambar
                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    
                    // Gambar ke canvas dengan background putih (menghilangkan transparansi)
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillRect(0, 0, width, height);
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    // Konversi ke blob dengan kualitas tertentu
                    canvas.toBlob((blob) => {
                        // Buat file baru dari blob dengan nama yang sama
                        const newFile = new File([blob], file.name, {
                            type: 'image/jpeg',
                            lastModified: Date.now()
                        });
                        resolve(newFile);
                    }, 'image/jpeg', quality);
                };
            };
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const handleFileChange = async (e) => {
        const { name, files } = e.target;
        const file = files[0];
        
        if (file) {
            try {
                // Kompresi gambar sebelum disimpan ke state
                let compressedFile;
                if (name === 'logo') {
                    compressedFile = await compressImage(file, 300, 300, 0.8);
                } else if (name === 'wallpaper') {
                    compressedFile = await compressImage(file, 800, 800, 0.8);
                }
                
                setFormData(prev => ({
                    ...prev,
                    [name]: compressedFile || file
                }));

                // Create preview
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (name === 'wallpaper') {
                        setWallpaperPreview(e.target.result);
                    } else if (name === 'logo') {
                        setLogoPreview(e.target.result);
                    }
                };
                reader.readAsDataURL(compressedFile || file);
            } catch (error) {
                console.error('Error compressing image:', error);
                // Fallback to original file if compression fails
                setFormData(prev => ({
                    ...prev,
                    [name]: file
                }));
                
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (name === 'wallpaper') {
                        setWallpaperPreview(e.target.result);
                    } else if (name === 'logo') {
                        setLogoPreview(e.target.result);
                    }
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        const formDataToSend = new FormData();
        
        // Tambahkan semua field kecuali file jika nilainya tidak null dan tidak kosong
        Object.keys(formData).forEach(key => {
            if (key !== 'logo' && key !== 'wallpaper' && formData[key] !== null && formData[key] !== '') {
                formDataToSend.append(key, formData[key]);
            }
        });
        
        // Tambahkan file logo dan wallpaper jika ada dan pastikan itu adalah File object
        // File sudah dikompresi sebelumnya di handleFileChange
        if (formData.logo instanceof File) {
            formDataToSend.append('logo', formData.logo);
            console.debug('[SettingModal] Appending logo:', formData.logo.name, formData.logo.size, 'bytes', formData.logo.type);
        }
        
        if (formData.wallpaper instanceof File) {
            formDataToSend.append('wallpaper', formData.wallpaper);
            console.debug('[SettingModal] Appending wallpaper:', formData.wallpaper.name, formData.wallpaper.size, 'bytes', formData.wallpaper.type);
        }

        try {
            let url, method;
            if (type === 'create') {
                url = route('settings.store');
                method = 'post';
            } else if (type === 'edit') {
                url = route('settings.update', { nama_instansi: setting.nama_instansi });
                method = 'post';
                formDataToSend.append('_method', 'PUT');
            }

            // Debug: tampilkan ringkasan payload (tanpa konten file)
            console.debug('[SettingModal] submit →', {
                url,
                method,
                payload: {
                    ...Object.fromEntries(Object.entries(formData).map(([k, v]) => [k, v instanceof File ? `File(${v.name}, ${v.size} bytes, ${v.type})` : v]))
                }
            });

            // Debug: log all FormData entries
            console.debug('[SettingModal] FormData entries:');
            for (let [key, value] of formDataToSend.entries()) {
                if (value instanceof File) {
                    console.debug(`  ${key}: File(${value.name}, ${value.size} bytes, ${value.type})`);
                } else {
                    console.debug(`  ${key}: ${value}`);
                }
            }

            // Gunakan XMLHttpRequest untuk lebih banyak kontrol dan debugging
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').getAttribute('content'));
            xhr.setRequestHeader('Accept', 'application/json');
            // Tidak perlu set Content-Type, browser akan mengaturnya dengan benar untuk FormData
            
            // Tambahkan event listener untuk debugging
            xhr.upload.onprogress = (e) => {
                if (e.lengthComputable) {
                    const percentComplete = Math.round((e.loaded / e.total) * 100);
                    console.debug(`[SettingModal] Upload progress: ${percentComplete}%`);
                }
            };
            
            // Buat Promise untuk menangani response
            const responsePromise = new Promise((resolve, reject) => {
                xhr.onload = function() {
                    console.debug('[SettingModal] response status:', xhr.status, xhr.statusText);
                    
                    let result;
                    try {
                        result = xhr.responseText ? JSON.parse(xhr.responseText) : {};
                    } catch (parseErr) {
                        console.warn('[SettingModal] response not JSON, raw text:', xhr.responseText?.slice(0, 500));
                        result = { success: false, message: 'Respon server tidak valid', raw: xhr.responseText };
                    }
                    
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve({ status: xhr.status, result });
                    } else {
                        reject({ status: xhr.status, result });
                    }
                };
                
                xhr.onerror = function() {
                    console.error('[SettingModal] Network error');
                    reject({ status: 0, result: { message: 'Network error' } });
                };
            });
            
            // Kirim request
            xhr.send(formDataToSend);
            
            // Tunggu response
            const { status, result } = await responsePromise;

            if (status >= 400) {
                // Kumpulkan pesan error dari berbagai kemungkinan bentuk
                const serverMessage = result?.message || result?.error || 'Terjadi kesalahan pada server';
                const serverErrors = result?.errors || { general: [serverMessage] };
                
                // Enhanced error logging for debugging
                console.error('[SettingModal] submit error', { 
                    status, 
                    serverMessage, 
                    serverErrors, 
                    result,
                    fullResponse: xhr.responseText 
                });
                
                // Log specific validation errors if available
                if (result?.errors) {
                    console.error('[SettingModal] Validation errors:', result.errors);
                    Object.entries(result.errors).forEach(([field, messages]) => {
                        console.error(`  ${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`);
                    });
                }
                
                setErrors(serverErrors);
                if (onError) onError({ status, serverMessage, serverErrors, result });
                return;
            }

            // Sukses
            console.debug('[SettingModal] submit success:', result);
            if (result?.success === false) {
                // Backend mengembalikan success=false walau 200
                setErrors(result.errors || { general: ['Gagal menyimpan data'] });
                if (onError) onError({ status, result });
                return;
            }
            toast('Setting berhasil disimpan', 'success');
            // Refresh settings context to update AppLayout
            refreshSettings();
            onSuccess?.(result);
            onClose();
        } catch (error) {
            console.error('[SettingModal] submit exception:', error);
            setErrors({ general: 'Terjadi kesalahan saat menyimpan data' });
            if (onError) onError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const getTitle = () => {
        switch (type) {
            case 'create':
                return 'Tambah Setting Baru';
            case 'edit':
                return 'Edit Setting';
            case 'view':
                return 'Detail Setting';
            default:
                return 'Setting';
        }
    };

    const isReadOnly = type === 'view';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {getTitle()}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {errors.general && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {errors.general}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Nama Instansi */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Nama Instansi *
                            </label>
                            <input
                                type="text"
                                name="nama_instansi"
                                value={formData.nama_instansi}
                                onChange={handleInputChange}
                                disabled={isReadOnly}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                                    errors.nama_instansi ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                }`}
                                placeholder="Masukkan nama instansi"
                            />
                            {errors.nama_instansi && (
                                <p className="text-red-500 text-sm mt-1">{errors.nama_instansi[0]}</p>
                            )}
                        </div>

                        {/* Alamat Instansi */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Alamat Instansi
                            </label>
                            <input
                                type="text"
                                name="alamat_instansi"
                                value={formData.alamat_instansi}
                                onChange={handleInputChange}
                                disabled={isReadOnly}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                                    errors.alamat_instansi ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                }`}
                                placeholder="Masukkan alamat instansi"
                            />
                            {errors.alamat_instansi && (
                                <p className="text-red-500 text-sm mt-1">{errors.alamat_instansi[0]}</p>
                            )}
                        </div>

                        {/* Kabupaten */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Kabupaten
                            </label>
                            <input
                                type="text"
                                name="kabupaten"
                                value={formData.kabupaten}
                                onChange={handleInputChange}
                                disabled={isReadOnly}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                                    errors.kabupaten ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                }`}
                                placeholder="Masukkan kabupaten"
                            />
                            {errors.kabupaten && (
                                <p className="text-red-500 text-sm mt-1">{errors.kabupaten[0]}</p>
                            )}
                        </div>

                        {/* Propinsi */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Propinsi
                            </label>
                            <input
                                type="text"
                                name="propinsi"
                                value={formData.propinsi}
                                onChange={handleInputChange}
                                disabled={isReadOnly}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                                    errors.propinsi ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                }`}
                                placeholder="Masukkan propinsi"
                            />
                            {errors.propinsi && (
                                <p className="text-red-500 text-sm mt-1">{errors.propinsi[0]}</p>
                            )}
                        </div>

                        {/* Kontak */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Kontak *
                            </label>
                            <input
                                type="text"
                                name="kontak"
                                value={formData.kontak}
                                onChange={handleInputChange}
                                disabled={isReadOnly}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                                    errors.kontak ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                }`}
                                placeholder="Masukkan kontak"
                            />
                            {errors.kontak && (
                                <p className="text-red-500 text-sm mt-1">{errors.kontak[0]}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={isReadOnly}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                                    errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                }`}
                                placeholder="Masukkan email"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
                            )}
                        </div>

                        {/* Status Aktif */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Status Aktif *
                            </label>
                            <select
                                name="aktifkan"
                                value={formData.aktifkan}
                                onChange={handleInputChange}
                                disabled={isReadOnly}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                                    errors.aktifkan ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                }`}
                            >
                                <option value="No">Tidak Aktif</option>
                                <option value="Yes">Aktif</option>
                            </select>
                            {errors.aktifkan && (
                                <p className="text-red-500 text-sm mt-1">{errors.aktifkan[0]}</p>
                            )}
                        </div>

                        {/* Kode PPK */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Kode PPK
                            </label>
                            <input
                                type="text"
                                name="kode_ppk"
                                value={formData.kode_ppk}
                                onChange={handleInputChange}
                                disabled={isReadOnly}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                                    errors.kode_ppk ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                }`}
                                placeholder="Masukkan kode PPK"
                            />
                            {errors.kode_ppk && (
                                <p className="text-red-500 text-sm mt-1">{errors.kode_ppk[0]}</p>
                            )}
                        </div>

                        {/* Kode PPK InHealth */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Kode PPK InHealth
                            </label>
                            <input
                                type="text"
                                name="kode_ppkinhealth"
                                value={formData.kode_ppkinhealth}
                                onChange={handleInputChange}
                                disabled={isReadOnly}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                                    errors.kode_ppkinhealth ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                }`}
                                placeholder="Masukkan kode PPK InHealth"
                            />
                            {errors.kode_ppkinhealth && (
                                <p className="text-red-500 text-sm mt-1">{errors.kode_ppkinhealth[0]}</p>
                            )}
                        </div>

                        {/* Kode PPK Kemenkes */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Kode PPK Kemenkes
                            </label>
                            <input
                                type="text"
                                name="kode_ppkkemenkes"
                                value={formData.kode_ppkkemenkes}
                                onChange={handleInputChange}
                                disabled={isReadOnly}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                                    errors.kode_ppkkemenkes ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                }`}
                                placeholder="Masukkan kode PPK Kemenkes"
                            />
                            {errors.kode_ppkkemenkes && (
                                <p className="text-red-500 text-sm mt-1">{errors.kode_ppkkemenkes[0]}</p>
                            )}
                        </div>
                    </div>

                    {/* File Uploads */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Wallpaper Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Wallpaper
                            </label>
                            <input
                                type="file"
                                name="wallpaper"
                                onChange={handleFileChange}
                                disabled={isReadOnly}
                                accept="image/*"
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                                    errors.wallpaper ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                }`}
                            />
                            {wallpaperPreview && (
                                <div className="mt-2">
                                    <img
                                        src={wallpaperPreview}
                                        alt="Wallpaper Preview"
                                        className="w-full h-32 object-cover rounded-lg"
                                    />
                                </div>
                            )}
                            {errors.wallpaper && (
                                <p className="text-red-500 text-sm mt-1">{errors.wallpaper[0]}</p>
                            )}
                        </div>

                        {/* Logo Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Logo *
                            </label>
                            <input
                                type="file"
                                name="logo"
                                onChange={handleFileChange}
                                disabled={isReadOnly}
                                accept="image/*"
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                                    errors.logo ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                }`}
                            />
                            {logoPreview && (
                                <div className="mt-2">
                                    <img
                                        src={logoPreview}
                                        alt="Logo Preview"
                                        className="w-32 h-32 object-cover rounded-lg"
                                    />
                                </div>
                            )}
                            {errors.logo && (
                                <p className="text-red-500 text-sm mt-1">{errors.logo[0]}</p>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    {!isReadOnly && (
                        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-lg transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Menyimpan...' : 'Simpan'}
                            </button>
                        </div>
                    )}

                    {isReadOnly && (
                        <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                            >
                                Tutup
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
