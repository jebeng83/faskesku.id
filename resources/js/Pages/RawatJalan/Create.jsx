import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AppLayout from '@/Layouts/AppLayout';
import SearchableSelect from '@/Components/SearchableSelect';
// Removed react-select import - using native HTML select instead

export default function Create({ 
    patients, 
    polikliniks,
    dokters,
    penjaabs,
    statusOptions, 
    statusDaftarOptions, 
    statusLanjutOptions, 
    statusBayarOptions, 
    statusPoliOptions, 
    sttsumurOptions, 
    keputusanOptions 
}) {
    // Fungsi untuk mendapatkan tanggal dan jam saat ini
    const getCurrentDateTime = () => {
        const now = new Date();
        
        // Gunakan local date untuk menghindari masalah timezone
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const date = `${year}-${month}-${day}`;
        
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const time = `${hours}:${minutes}`;
        
        // Debug logging
        console.log('Current DateTime:', { 
            now, 
            date, 
            time,
            year,
            month,
            day,
            hours,
            minutes,
            getDate: now.getDate(),
            getMonth: now.getMonth(),
            getFullYear: now.getFullYear()
        });
        
        return { date, time };
    };

    const { data, setData, post, processing, errors } = useForm({
        no_rawat: '',
        no_reg: '',
        no_rkm_medis: '',
        tgl_registrasi: getCurrentDateTime().date,
        jam_reg: getCurrentDateTime().time,
        kd_dokter: '',
        kd_poli: '',
        p_jawab: '',
        almt_pj: '',
        hubunganpj: '',
        biaya_reg: '0',
        stts: 'Belum',
        stts_daftar: '-',
        status_lanjut: 'Ralan',
        kd_pj: '',
        umurdaftar: '0',
        sttsumur: 'Th',
        status_bayar: 'Belum Bayar',
        status_poli: 'Baru',
        keputusan: '-'
    });

    // Update tanggal dan jam setiap menit
    useEffect(() => {
        // Set initial date and time immediately
        const initialDateTime = getCurrentDateTime();
        setData(prevData => ({
            ...prevData,
            tgl_registrasi: initialDateTime.date,
            jam_reg: initialDateTime.time
        }));

        const interval = setInterval(() => {
            const currentDateTime = getCurrentDateTime();
            setData(prevData => ({
                ...prevData,
                tgl_registrasi: currentDateTime.date,
                jam_reg: currentDateTime.time
            }));
        }, 60000); // Update setiap 1 menit

        return () => clearInterval(interval);
    }, []);

    // Fungsi untuk cek no reg terakhir dari tabel reg_periksa dan generate nomor berikutnya
    const checkLastNoReg = async (tanggal, kdDokter, kdPoli) => {
        if (!tanggal || !kdDokter || !kdPoli) return;
        
        try {
            const url = route('api.reg-periksa.index');
            const params = new URLSearchParams();
            params.set('tanggal', tanggal);
            params.set('kd_dokter', kdDokter);
            params.set('kd_poli', kdPoli);
            params.set('per_page', '1');
            params.set('sort', 'no_reg');
            params.set('order', 'desc');
            
            const response = await fetch(`${url}?${params.toString()}`, { 
                headers: { 'X-Requested-With': 'XMLHttpRequest' } 
            });
            
            if (response.ok) {
                const json = await response.json();
                const items = json?.data?.data || [];
                
                if (items.length > 0) {
                    const lastNoReg = items[0].no_reg;
                    // Convert to number, add 1, then pad to 3 digits
                    const nextNoReg = String(parseInt(lastNoReg) + 1).padStart(3, '0');
                    setData('no_reg', nextNoReg);
                } else {
                    // Jika tidak ada data, set no_reg ke 001
                    setData('no_reg', '001');
                }
            }
        } catch (error) {
            console.error('Error checking last no_reg:', error);
            setData('no_reg', '001');
        }
    };

    // Auto-generate No. Reg saat aplikasi dibuka atau data berubah menggunakan API
    useEffect(() => {
        const tanggal = data.tgl_registrasi;
        const kdDokter = data.kd_dokter;
        const kdPoli = data.kd_poli;
        
        if (tanggal && kdDokter && kdPoli) {
            // Gunakan API endpoint untuk generate No. Reg yang konsisten dengan backend
            generateNoReg();
        }
    }, [data.tgl_registrasi, data.kd_dokter, data.kd_poli]);

    const [riwayat, setRiwayat] = useState([]);
    const [riwayatLoading, setRiwayatLoading] = useState(false);
    const [riwayatError, setRiwayatError] = useState(null);

    // Tambahan: State untuk DataTable reg_periksa
    const [regData, setRegData] = useState([]);
    const [regLoading, setRegLoading] = useState(false);
    const [regError, setRegError] = useState(null);
    const [regPage, setRegPage] = useState(1);
    const [regPerPage, setRegPerPage] = useState(10);
    const [regTotal, setRegTotal] = useState(0);
    const [regLastPage, setRegLastPage] = useState(1);
    const [regCurrentPage, setRegCurrentPage] = useState(1);
    // Fungsi helper untuk mendapatkan tanggal hari ini dalam format local
    const getTodayDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [filtersReg, setFiltersReg] = useState({
        search: '',
        tanggal: getTodayDate(),
        status: '',
        status_bayar: '',
        dokter: '',
        poli: ''
    });
    // Tambahan: state input pencarian dengan debounce agar lebih halus
    const [regSearch, setRegSearch] = useState('');
    
    // State untuk collapse section Form Input Registrasi
    const [isFormInputCollapsed, setIsFormInputCollapsed] = useState(false);
    
    // State untuk collapse section Data Registrasi Terakhir
    const [isDataRegCollapsed, setIsDataRegCollapsed] = useState(false);
    const handleFilterChangeReg = (key, value) => {
        setFiltersReg(prev => ({ ...prev, [key]: value }));
        setRegPage(1);
    };
    const resetFiltersReg = () => {
        setFiltersReg({ search: '', tanggal: getTodayDate(), status: '', status_bayar: '', dokter: '', poli: '' });
        setRegPage(1);
        setRegSearch('');
    };

    // Debounce perubahan input pencarian nama agar tidak refetch di setiap ketikan (di dalam komponen)
    useEffect(() => {
        const id = setTimeout(() => {
            const s = regSearch.trim();
            if (s.length === 0 || s.length >= 2) {
                handleFilterChangeReg('search', s);
            }
        }, 300);
        return () => clearTimeout(id);
    }, [regSearch]);

    // Auto-update filter tanggal datatable setiap hari
    useEffect(() => {
        const updateDateFilter = () => {
            const today = getTodayDate();
            setFiltersReg(prev => ({ ...prev, tanggal: today }));
        };

        // Update immediately
        updateDateFilter();

        // Set interval to update at midnight (00:00:01)
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 1, 0); // 00:00:01

        const msUntilMidnight = tomorrow.getTime() - now.getTime();

        const timeoutId = setTimeout(() => {
            updateDateFilter();
            // Then set daily interval
            const intervalId = setInterval(updateDateFilter, 24 * 60 * 60 * 1000); // 24 hours
            return () => clearInterval(intervalId);
        }, msUntilMidnight);

        return () => clearTimeout(timeoutId);
    }, []);

    // Client-side filters for history table (similar to Index.jsx)
    const [filtersRiwayat, setFiltersRiwayat] = useState({
        tanggal: '',
        status: '',
        status_bayar: '',
        nama_pasien: ''
    });
    const handleFilterChangeRiwayat = (key, value) => {
        setFiltersRiwayat((prev) => ({ ...prev, [key]: value }));
    };
    const resetFiltersRiwayat = () => {
        setFiltersRiwayat({ tanggal: '', status: '', status_bayar: '', nama_pasien: '' });
    };

    // Filtered history derived from riwayat and filters
    const filteredRiwayat = riwayat.filter((item) => {
        const matchTanggal = !filtersRiwayat.tanggal || (item.tgl_registrasi && item.tgl_registrasi === filtersRiwayat.tanggal);
        const matchStatus = !filtersRiwayat.status || (item.stts && item.stts === filtersRiwayat.status);
        const matchStatusBayar = !filtersRiwayat.status_bayar || (item.status_bayar && item.status_bayar === filtersRiwayat.status_bayar);
        const nama = (item.patient?.nm_pasien || '').toString().toLowerCase();
        const matchNama = !filtersRiwayat.nama_pasien || nama.includes(filtersRiwayat.nama_pasien.toLowerCase());
        return matchTanggal && matchStatus && matchStatusBayar && matchNama;
    });

    // Helpers for display formatting
    const formatCurrency = (amount) => {
        if (!amount) return '-';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };
    const formatDate = (date) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('id-ID');
    };
    const formatTime = (time) => {
        if (!time) return '-';
        return time.substring(0, 5);
    };
    const getStatusBadge = (status) => {
        const badgeClasses = {
            'Belum': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
            'Sudah': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
            'Batal': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
            'Berkas Diterima': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
            'Dirujuk': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
            'Meninggal': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
            'Dirawat': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
            'Pulang Paksa': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
        };
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClasses[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'}`}>
                {status}
            </span>
        );
    };
    const getStatusBayarBadge = (status) => {
        const badgeClasses = status === 'Sudah Bayar'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClasses}`}>
                {status}
            </span>
        );
    };

    // Fetch patient history when patient changes
    useEffect(() => {
        if (!data.no_rkm_medis) {
            setRiwayat([]);
            return;
        }
        setRiwayatLoading(true);
        setRiwayatError(null);
        const url = route('rawat-jalan.riwayat', { no_rkm_medis: data.no_rkm_medis });
        fetch(url, { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
            .then((res) => res.json())
            .then((json) => {
                setRiwayat(Array.isArray(json.data) ? json.data : []);
            })
            .catch((err) => setRiwayatError(err?.message || 'Gagal memuat riwayat'))
            .finally(() => setRiwayatLoading(false));
    }, [data.no_rkm_medis]);

    // Tambahan: Fetch DataTable reg_periksa dari API
    useEffect(() => {
        const url = route('api.reg-periksa.index');
        const params = new URLSearchParams();
        params.set('page', regPage);
        params.set('per_page', regPerPage);
        Object.entries(filtersReg).forEach(([key, value]) => {
            if (value) params.set(key, value);
        });
        setRegLoading(true);
        setRegError(null);
        fetch(`${url}?${params.toString()}`, { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
            .then(res => res.json())
            .then(json => {
                const pagination = json?.data;
                const items = pagination?.data || [];
                setRegData(items);
                setRegTotal(pagination?.total || items.length || 0);
                setRegLastPage(pagination?.last_page || 1);
                setRegCurrentPage(pagination?.current_page || regPage);
            })
            .catch(err => setRegError(err?.message || 'Gagal memuat data registrasi'))
            .finally(() => setRegLoading(false));
    }, [filtersReg, regPage, regPerPage]);

    // Fungsi untuk generate no rawat baru otomatis saat tanggal berubah
    const generateNewNoRawat = async (tanggal) => {
        if (!tanggal) return;
        
        try {
            // Add timeout to prevent long waits
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
            
            const response = await fetch(route('api.generate-no-rawat'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify({
                    tanggal: tanggal,
                    type: 'no_rawat'
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (response.ok) {
                const result = await response.json();
                if (result.success && result.data.no_rawat) {
                    setData('no_rawat', result.data.no_rawat);
                } else {
                    console.error('Failed to generate no_rawat:', result);
                    // Fallback to local generation if API fails
                    await generateLocalNoRawat(tanggal);
                }
            } else if (response.status === 503) {
                // Server busy, try local generation
                console.warn('Server busy, using local generation');
                await generateLocalNoRawat(tanggal);
            } else {
                console.error('HTTP error:', response.status);
                await generateLocalNoRawat(tanggal);
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                console.warn('Request timeout, using local generation');
            } else {
                console.error('Error generating no_rawat:', error);
            }
            // Fallback to local generation
            await generateLocalNoRawat(tanggal);
        }
    };

    // Fallback function for local no_rawat generation
    const generateLocalNoRawat = async (tanggal) => {
        try {
            const url = route('api.reg-periksa.index');
            const params = new URLSearchParams();
            params.set('tanggal', tanggal);
            params.set('per_page', '1');
            params.set('sort', 'no_rawat');
            params.set('order', 'desc');
            
            const response = await fetch(`${url}?${params.toString()}`, { 
                headers: { 'X-Requested-With': 'XMLHttpRequest' } 
            });
            
            if (response.ok) {
                const json = await response.json();
                const items = json?.data?.data || [];
                
                if (items.length > 0) {
                    const lastNoRawat = items[0].no_rawat;
                    const parts = lastNoRawat.split('/');
                    if (parts.length === 4) {
                        const nextNumber = parseInt(parts[3]) + 1;
                        const nextNoRawat = `${parts[0]}/${parts[1]}/${parts[2]}/${String(nextNumber).padStart(6, '0')}`;
                        setData('no_rawat', nextNoRawat);
                    } else {
                        const ymd = tanggal.split('-');
                        const firstNoRawat = `${ymd[0]}/${ymd[1]}/${ymd[2]}/000001`;
                        setData('no_rawat', firstNoRawat);
                    }
                } else {
                    const ymd = tanggal.split('-');
                    const firstNoRawat = `${ymd[0]}/${ymd[1]}/${ymd[2]}/000001`;
                    setData('no_rawat', firstNoRawat);
                }
            }
        } catch (error) {
            console.error('Error in local generation:', error);
            // Last resort: basic format
            const ymd = tanggal.split('-');
            const firstNoRawat = `${ymd[0]}/${ymd[1]}/${ymd[2]}/000001`;
            setData('no_rawat', firstNoRawat);
        }
    };

    // Fungsi untuk cek no rawat terakhir dari database (tanpa generate baru)
    const checkLastNoRawat = async (tanggal) => {
        if (!tanggal) return;
        
        try {
            const url = route('api.reg-periksa.index');
            const params = new URLSearchParams();
            params.set('tanggal', tanggal);
            params.set('per_page', '1');
            params.set('sort', 'no_rawat');
            params.set('order', 'desc');
            
            const response = await fetch(`${url}?${params.toString()}`, { 
                headers: { 'X-Requested-With': 'XMLHttpRequest' } 
            });
            
            if (response.ok) {
                const json = await response.json();
                const items = json?.data?.data || [];
                
                if (items.length > 0) {
                    // Tampilkan nomor terakhir + 1 sebagai preview (tanpa menyimpan ke database)
                    const lastNoRawat = items[0].no_rawat;
                    const parts = lastNoRawat.split('/');
                    if (parts.length === 4) {
                        const nextNumber = parseInt(parts[3]) + 1;
                        const nextNoRawat = `${parts[0]}/${parts[1]}/${parts[2]}/${String(nextNumber).padStart(6, '0')}`;
                        setData('no_rawat', nextNoRawat);
                    } else {
                        setData('no_rawat', '');
                    }
                } else {
                    // Jika tidak ada data, tampilkan format awal
                    const ymd = tanggal.split('-'); // [YYYY, MM, DD]
                    const firstNoRawat = `${ymd[0]}/${ymd[1]}/${ymd[2]}/000001`;
                    setData('no_rawat', firstNoRawat);
                }
            }
        } catch (error) {
            console.error('Error checking last no_rawat:', error);
            setData('no_rawat', '');
        }
    };

    // Cek no rawat terakhir saat tanggal berubah (hanya preview, tidak generate)
    useEffect(() => {
        const tanggal = data.tgl_registrasi;
        if (tanggal) {
            checkLastNoRawat(tanggal);
        }
    }, [data.tgl_registrasi]);

    // Function untuk generate no_rawat secara manual (tombol "Baru")
    const generateNoRawat = async () => {
        if (!data.tgl_registrasi) {
            alert('Harap isi Tanggal Registrasi terlebih dahulu');
            return;
        }

        try {
            const response = await fetch(route('api.generate-no-rawat'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify({
                    tanggal: data.tgl_registrasi,
                    type: 'no_rawat'
                })
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success && result.data.no_rawat) {
                    setData('no_rawat', result.data.no_rawat);
                    alert('No. Rawat berhasil di-generate: ' + result.data.no_rawat);
                } else {
                    alert('Gagal generate No. Rawat: ' + (result.message || 'Unknown error'));
                }
            } else {
                alert('Error: ' + response.status);
            }
        } catch (error) {
            console.error('Error generating no_rawat:', error);
            alert('Error: ' + error.message);
        }
    };

    // Function untuk generate no_reg secara manual menggunakan API
    const generateNoReg = async () => {
        if (!data.tgl_registrasi || !data.kd_dokter || !data.kd_poli) {
            alert('Harap isi Tanggal Registrasi, Dokter, dan Poliklinik terlebih dahulu');
            return;
        }

        try {
            const response = await fetch(route('api.generate-no-reg'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify({
                    tanggal: data.tgl_registrasi,
                    kd_dokter: data.kd_dokter,
                    kd_poli: data.kd_poli
                })
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success && result.data.no_reg) {
                    setData('no_reg', result.data.no_reg);
                } else {
                    console.error('Failed to generate no_reg:', result);
                }
            } else {
                console.error('HTTP error:', response.status);
            }
        } catch (error) {
            console.error('Error generating no_reg:', error);
        }
    };

    // Refresh DataTable function
    const refreshDataTable = () => {
        // Force refresh by updating the filters with current values
        setFiltersReg(prev => ({ ...prev }));
    };

    // Handle patient selection
    const handlePatientChange = (value) => {
        setData('no_rkm_medis', value);
        
        // Auto-fill patient data if available
        const selectedPatient = patients.find(p => p.no_rkm_medis === value);
        if (selectedPatient) {
            setData(prevData => ({
                ...prevData,
                no_rkm_medis: value,
                p_jawab: selectedPatient.namakeluarga || selectedPatient.nm_pasien || '',
                almt_pj: selectedPatient.alamatpj || selectedPatient.alamat || '',
                hubunganpj: selectedPatient.keluarga || 'DIRI SENDIRI'
            }));
        }
    };

    // Handle poliklinik selection
    const handlePoliklinikChange = (value) => {
        setData('kd_poli', value);
        
        // Auto-fill biaya registrasi if available
        const selectedPoli = polikliniks.find(p => p.kd_poli === value);
        if (selectedPoli && selectedPoli.registrasi) {
            setData('biaya_reg', selectedPoli.registrasi.toString());
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        post(route('rawat-jalan.store'), {
            onSuccess: () => {
                // Reset form after successful submission
                setData({
                    no_rawat: '',
                    no_reg: '',
                    no_rkm_medis: '',
                    tgl_registrasi: getCurrentDateTime().date,
                    jam_reg: getCurrentDateTime().time,
                    kd_dokter: '',
                    kd_poli: '',
                    p_jawab: '',
                    almt_pj: '',
                    hubunganpj: '',
                    biaya_reg: '0',
                    stts: 'Belum',
                    stts_daftar: '-',
                    status_lanjut: 'Ralan',
                    kd_pj: '',
                    umurdaftar: '0',
                    sttsumur: 'Th',
                    status_bayar: 'Belum Bayar',
                    status_poli: 'Baru',
                    keputusan: '-'
                });
                // Refresh datatable untuk menampilkan data terbaru
                refreshDataTable();
            },
            onError: (errors) => {
                console.error('Error:', errors);
            }
        });
    };

    return (
        <AppLayout>
            <Head title="Registrasi Rawat Jalan" />

            <div className="space-y-6 -mt-6 -mx-6 p-6">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Registrasi Rawat Jalan
                                </h2>                    
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Form Input Registrasi</h3>
                            <button
                                type="button"
                                onClick={() => setIsFormInputCollapsed(!isFormInputCollapsed)}
                                className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                            >
                                {isFormInputCollapsed ? (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                        Buka
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                        </svg>
                                        Tutup
                                    </>
                                )}
                            </button>
                        </div>
                        
                        {!isFormInputCollapsed && (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Row 1: Pasien */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Pasien <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex gap-2">
                                        <div className="flex-1">
                                            <SearchableSelect
                                                options={patients.map(patient => ({
                                                    value: patient.no_rkm_medis,
                                                    label: `${patient.no_rkm_medis} - ${patient.nm_pasien} - ${(patient.jk || '-') } - ${(patient.no_ktp || '-') } - ${(patient.no_peserta || '-') } - ${(patient.alamatpj || patient.alamat || '-') } - ${(patient.kelurahanpj || '-')}`
                                                }))}
                                                value={data.no_rkm_medis}
                                                onChange={handlePatientChange}
                                                placeholder="Pilih Pasien"
                                                searchPlaceholder="Cari pasien..."
                                                error={!!errors.no_rkm_medis}
                                                displayKey="label"
                                                valueKey="value"
                                            />
                                        </div>
                                        <a
                                            href="/patients/create"
                                            className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 whitespace-nowrap"
                                            title="Tambah Pasien Baru"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Pasien Baru
                                        </a>
                                    </div>
                                    {errors.no_rkm_medis && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.no_rkm_medis}</p>
                                    )}
                                </div>

                                {/* Row 2: Poliklinik, Dokter, Jenis Bayar */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Poliklinik */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Poliklinik <span className="text-red-500">*</span>
                                        </label>
                                        <SearchableSelect
                                            options={polikliniks.map(poliklinik => ({
                                                value: poliklinik.kd_poli,
                                                label: `${poliklinik.kd_poli} - ${poliklinik.nm_poli}`
                                            }))}
                                            value={data.kd_poli}
                                            onChange={handlePoliklinikChange}
                                            placeholder="Pilih Poliklinik"
                                            searchPlaceholder="Cari poliklinik..."
                                            error={!!errors.kd_poli}
                                            displayKey="label"
                                            valueKey="value"
                                        />
                                        {errors.kd_poli && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.kd_poli}</p>
                                        )}
                                    </div>

                                    {/* Dokter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Dokter <span className="text-red-500">*</span>
                                        </label>
                                        <SearchableSelect
                                            options={dokters.map(dokter => ({
                                                value: dokter.kd_dokter,
                                                label: `${dokter.kd_dokter} - ${dokter.nm_dokter}`
                                            }))}
                                            value={data.kd_dokter}
                                            onChange={(value) => setData('kd_dokter', value)}
                                            placeholder="Pilih Dokter"
                                            searchPlaceholder="Cari dokter..."
                                            error={!!errors.kd_dokter}
                                            displayKey="label"
                                            valueKey="value"
                                        />
                                        {errors.kd_dokter && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.kd_dokter}</p>
                                        )}
                                    </div>

                                    {/* Jenis Bayar */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Jenis Bayar
                                        </label>
                                        <SearchableSelect
                                            options={penjaabs}
                                            value={data.kd_pj}
                                            onChange={(value) => setData('kd_pj', value)}
                                            placeholder="Pilih Jenis Bayar"
                                            searchPlaceholder="Cari Jenis Bayar..."
                                            error={errors.kd_pj}
                                            displayKey="png_jawab"
                                            valueKey="kd_pj"
                                        />
                                        {errors.kd_pj && (
                                            <p className="text-red-500 text-sm mt-1">{errors.kd_pj}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Row 3: Action Buttons */}
                                <div className="flex justify-end gap-2 pt-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {processing ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Menyimpan...
                                            </>
                                        ) : (
                                            'Simpan'
                                        )}
                                    </button>
                                </div>

                                {/* Row 4: No. Rawat, No. Reg, Tanggal Registrasi, Jam Registrasi */}
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                                    {/* No. Rawat */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            No. Rawat 
                                        </label>
                                        <input
                                            type="text"
                                            value={data.no_rawat}
                                            onChange={(e) => setData('no_rawat', e.target.value)}
                                            readOnly
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white bg-gray-50"
                                            placeholder="YYYY/MM/DD/000001"
                                        />
                                        {errors.no_rawat && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.no_rawat}</p>
                                        )}
                                    </div>

                                    {/* No. Reg */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            No. Reg 
                                        </label>
                                        <input
                                            type="text"
                                            value={data.no_reg}
                                            onChange={(e) => setData('no_reg', e.target.value)}
                                            readOnly
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white bg-gray-50"
                                            placeholder="001"
                                        />
                                        {errors.no_reg && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.no_reg}</p>
                                        )}
                                    </div>

                                    {/* Tanggal Registrasi */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Tanggal Registrasi <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            value={data.tgl_registrasi}
                                            onChange={(e) => setData('tgl_registrasi', e.target.value)}
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                                                errors.tgl_registrasi ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                                            }`}
                                            required
                                        />
                                        {errors.tgl_registrasi && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.tgl_registrasi}</p>
                                        )}
                                    </div>

                                    {/* Jam Registrasi */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Jam Registrasi
                                        </label>
                                        <input
                                            type="time"
                                            value={data.jam_reg}
                                            onChange={(e) => setData('jam_reg', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                </div>

                                {/* Hidden fields for additional data */}
                                <div className="hidden">
                                    <input type="hidden" name="p_jawab" value={data.p_jawab} />
                                    <input type="hidden" name="almt_pj" value={data.almt_pj} />
                                    <input type="hidden" name="hubunganpj" value={data.hubunganpj} />
                                    <input type="hidden" name="biaya_reg" value={data.biaya_reg} />
                                    <input type="hidden" name="stts" value={data.stts} />
                                    <input type="hidden" name="stts_daftar" value={data.stts_daftar} />
                                    <input type="hidden" name="status_lanjut" value={data.status_lanjut} />
                                    <input type="hidden" name="umurdaftar" value={data.umurdaftar} />
                                    <input type="hidden" name="sttsumur" value={data.sttsumur} />
                                    <input type="hidden" name="status_bayar" value={data.status_bayar} />
                                    <input type="hidden" name="status_poli" value={data.status_poli} />
                                    <input type="hidden" name="keputusan" value={data.keputusan} />
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                {/* Data Registrasi Terakhir */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Data Registrasi Terakhir</h3>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsDataRegCollapsed(!isDataRegCollapsed)}
                                    className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                                >
                                    {isDataRegCollapsed ? (
                                        <>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                            Buka
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                            </svg>
                                            Tutup
                                        </>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetFiltersReg}
                                    className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    Reset Filter
                                </button>
                            </div>
                        </div>

                        {!isDataRegCollapsed && (
                            <>
                                {/* Filter Bar */}
                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
                                    <div>
                                        <input
                                            type="text"
                                            value={regSearch}
                                            onChange={(e) => setRegSearch(e.target.value)}
                                            placeholder="Cari nama pasien..."
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="date"
                                            value={filtersReg.tanggal}
                                            onChange={(e) => handleFilterChangeReg('tanggal', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <select
                                            value={filtersReg.status}
                                            onChange={(e) => handleFilterChangeReg('status', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="">Semua Status</option>
                                            {Object.entries(statusOptions).map(([key, value]) => (
                                                <option key={key} value={key}>{value}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <select
                                            value={filtersReg.status_bayar}
                                            onChange={(e) => handleFilterChangeReg('status_bayar', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="">Semua Status Bayar</option>
                                            {Object.entries(statusBayarOptions).map(([key, value]) => (
                                                <option key={key} value={key}>{value}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <select
                                            value={filtersReg.dokter}
                                            onChange={(e) => handleFilterChangeReg('dokter', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="">Semua Dokter</option>
                                            {dokters.map(dokter => (
                                                <option key={dokter.kd_dokter} value={dokter.kd_dokter}>
                                                    {dokter.nm_dokter}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <select
                                            value={filtersReg.poli}
                                            onChange={(e) => handleFilterChangeReg('poli', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="">Semua Poli</option>
                                            {polikliniks.map(poli => (
                                                <option key={poli.kd_poli} value={poli.kd_poli}>
                                                    {poli.nm_poli}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Table */}
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-700">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">No. Rawat</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">No. Reg</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Pasien</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tanggal</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Jam</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Dokter</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Poli</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status Bayar</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                            {regLoading ? (
                                                <tr>
                                                    <td colSpan="9" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                                        <div className="flex items-center justify-center">
                                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            Memuat data...
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : regError ? (
                                                <tr>
                                                    <td colSpan="9" className="px-6 py-4 text-center text-red-500 dark:text-red-400">
                                                        Error: {regError}
                                                    </td>
                                                </tr>
                                            ) : regData.length === 0 ? (
                                                <tr>
                                                    <td colSpan="9" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                                        Tidak ada data registrasi
                                                    </td>
                                                </tr>
                                            ) : (
                                                regData.map((item, index) => (
                                                    <tr key={item.no_rawat || index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                            {item.no_rawat}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                            {item.no_reg}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                            <div>
                                                                <div className="font-medium">{item.patient?.nm_pasien || '-'}</div>
                                                                <div className="text-gray-500 dark:text-gray-400">{item.no_rkm_medis}</div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                            {formatDate(item.tgl_registrasi)}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                            {formatTime(item.jam_reg)}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                            <div>
                                                                <div className="font-medium">{item.dokter?.nm_dokter || '-'}</div>
                                                                <div className="text-gray-500 dark:text-gray-400">{item.kd_dokter}</div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                            <div>
                                                                <div className="font-medium">{item.poliklinik?.nm_poli || '-'}</div>
                                                                <div className="text-gray-500 dark:text-gray-400">{item.kd_poli}</div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {getStatusBadge(item.stts)}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {getStatusBayarBadge(item.status_bayar)}
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                {regData.length > 0 && (
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="text-sm text-gray-700 dark:text-gray-300">
                                            Menampilkan {((regCurrentPage - 1) * regPerPage) + 1} sampai {Math.min(regCurrentPage * regPerPage, regTotal)} dari {regTotal} data
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setRegPage(Math.max(1, regPage - 1))}
                                                disabled={regPage <= 1}
                                                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                                            >
                                                Sebelumnya
                                            </button>
                                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                                Halaman {regCurrentPage} dari {regLastPage}
                                            </span>
                                            <button
                                                 onClick={() => setRegPage(Math.min(regLastPage, regPage + 1))}
                                                 disabled={regPage >= regLastPage}
                                                 className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                                             >
                                                 Selanjutnya
                                             </button>
                                         </div>
                                     </div>
                                 )}
                             </>
                         )}
                     </div>
                 </div>

                 {/* Riwayat Pasien */}
                 {data.no_rkm_medis && (
                     <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                         <div className="p-6">
                             <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                 Riwayat Pasien ({data.no_rkm_medis})
                             </h3>

                             {/* Filter Bar untuk Riwayat */}
                             <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
                                 <div>
                                     <input
                                         type="text"
                                         value={filtersRiwayat.nama_pasien}
                                         onChange={(e) => handleFilterChangeRiwayat('nama_pasien', e.target.value)}
                                         placeholder="Cari nama pasien..."
                                         className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                     />
                                 </div>
                                 <div>
                                     <input
                                         type="date"
                                         value={filtersRiwayat.tanggal}
                                         onChange={(e) => handleFilterChangeRiwayat('tanggal', e.target.value)}
                                         className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                     />
                                 </div>
                                 <div>
                                     <select
                                         value={filtersRiwayat.status}
                                         onChange={(e) => handleFilterChangeRiwayat('status', e.target.value)}
                                         className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                     >
                                         <option value="">Semua Status</option>
                                         {Object.entries(statusOptions).map(([key, value]) => (
                                             <option key={key} value={key}>{value}</option>
                                         ))}
                                     </select>
                                 </div>
                                 <div className="flex gap-2">
                                     <select
                                         value={filtersRiwayat.status_bayar}
                                         onChange={(e) => handleFilterChangeRiwayat('status_bayar', e.target.value)}
                                         className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                     >
                                         <option value="">Semua Status Bayar</option>
                                         {Object.entries(statusBayarOptions).map(([key, value]) => (
                                             <option key={key} value={key}>{value}</option>
                                         ))}
                                     </select>
                                     <button
                                         type="button"
                                         onClick={resetFiltersRiwayat}
                                         className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                                     >
                                         Reset
                                     </button>
                                 </div>
                             </div>

                             {/* Table Riwayat */}
                             {riwayatLoading ? (
                                 <div className="py-10 text-center text-gray-500 dark:text-gray-400">
                                     <div className="flex items-center justify-center">
                                         <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                         </svg>
                                         Memuat riwayat...
                                     </div>
                                 </div>
                             ) : riwayatError ? (
                                 <div className="py-10 text-center text-red-600 dark:text-red-400">
                                     Error: {riwayatError}
                                 </div>
                             ) : filteredRiwayat.length === 0 ? (
                                 <div className="py-10 text-center text-gray-500 dark:text-gray-400">
                                     Tidak ada riwayat registrasi
                                 </div>
                             ) : (
                                 <div className="overflow-x-auto">
                                     <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                         <thead className="bg-gray-50 dark:bg-gray-700">
                                             <tr>
                                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">No. Rawat</th>
                                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tanggal</th>
                                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Jam</th>
                                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Dokter</th>
                                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Poli</th>
                                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status Bayar</th>
                                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Biaya</th>
                                             </tr>
                                         </thead>
                                         <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                             {filteredRiwayat.map((item, index) => (
                                                 <tr key={item.no_rawat || index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                         {item.no_rawat}
                                                     </td>
                                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                         {formatDate(item.tgl_registrasi)}
                                                     </td>
                                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                         {formatTime(item.jam_reg)}
                                                     </td>
                                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                         <div>
                                                             <div className="font-medium">{item.dokter?.nm_dokter || '-'}</div>
                                                             <div className="text-gray-500 dark:text-gray-400">{item.kd_dokter}</div>
                                                         </div>
                                                     </td>
                                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                         <div>
                                                             <div className="font-medium">{item.poliklinik?.nm_poli || '-'}</div>
                                                             <div className="text-gray-500 dark:text-gray-400">{item.kd_poli}</div>
                                                         </div>
                                                     </td>
                                                     <td className="px-6 py-4 whitespace-nowrap">
                                                         {getStatusBadge(item.stts)}
                                                     </td>
                                                     <td className="px-6 py-4 whitespace-nowrap">
                                                         {getStatusBayarBadge(item.status_bayar)}
                                                     </td>
                                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                         {formatCurrency(item.biaya_reg)}
                                                     </td>
                                                 </tr>
                                             ))}
                                         </tbody>
                                     </table>
                                 </div>
                             )}
                         </div>
                     </div>
                 )}
             </div>
         </AppLayout>
     );
 }
