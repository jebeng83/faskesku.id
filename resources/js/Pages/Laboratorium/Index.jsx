import React, { useState, useMemo, useEffect } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { motion, AnimatePresence } from "framer-motion";
import SidebarLaboratorium from "@/Layouts/SidebarLaboratorium";
import ResponsiveTable from "@/Components/ResponsiveTable";
import ActionDropdown from "@/Components/ActionDropdown";
import Pagination from "@/Components/Pagination";
import Alert from "@/Components/Alert";
import Modal from "@/Components/Modal";
import { Search, Plus, Eye, Trash2, Clock, ClipboardList, RefreshCw, Printer } from "lucide-react";

// Helper function untuk mendapatkan tanggal hari ini dalam format YYYY-MM-DD
// Menggunakan timezone Asia/Jakarta (UTC+7)
const getTodayDate = () => {
    const now = new Date();
    // Gunakan Intl.DateTimeFormat untuk mendapatkan tanggal dalam timezone Asia/Jakarta
    const formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    // Format: YYYY-MM-DD (en-CA locale menghasilkan format ISO)
    return formatter.format(now);
};

// Framer Motion Variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

const cardHoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: {
        scale: 1.01,
        y: -4,
        transition: {
            duration: 0.3,
            ease: "easeOut",
        },
    },
};

export default function Index({
    permintaanLab,
    periksaLab,
    statusOptions = {},
    dokters = [],
    filters = {},
    flash,
    errors: pageErrors,
}) {
    const { auth } = usePage().props;
    const page = usePage();

    const isPeriksaMode = !!periksaLab;

    const defaultStartDate = filters.start_date || getTodayDate();
    const defaultEndDate = filters.end_date || getTodayDate();

    const [search, setSearch] = useState(filters.search || "");
    const [dokter, setDokter] = useState(filters.dokter || "");
    const [startDate, setStartDate] = useState(defaultStartDate);
    const [endDate, setEndDate] = useState(defaultEndDate);

    const [activeTab, setActiveTab] = useState(filters.status || "ralan");
    const [activeSubTab, setActiveSubTab] = useState("permintaan");

    const [showAlert, setShowAlert] = useState(false);
    const [alertConfig, setAlertConfig] = useState({
        type: "success",
        title: "",
        message: "",
        autoClose: false,
    });

    useEffect(() => {
        if (flash?.success) {
            setAlertConfig({
                type: "success",
                title: "Berhasil",
                message: flash.success,
                autoClose: true,
            });
            setShowAlert(true);
            
            // Refresh data setelah sukses untuk memastikan tgl_hasil dan jam_hasil terupdate
            // Gunakan setTimeout untuk memberikan waktu alert ditampilkan terlebih dahulu
            setTimeout(() => {
                router.reload({
                    only: ['permintaanLab'], // Hanya reload data permintaanLab
                    preserveState: false, // Pastikan state di-refresh
                });
            }, 500);
        }
        if (flash?.error) {
            setAlertConfig({
                type: "error",
                title: "Error",
                message: flash.error,
                autoClose: true,
            });
            setShowAlert(true);
        }
        // Handle errors dari validation
        // pageErrors bisa berupa object dengan key 'error' atau object dengan key field lainnya
        if (pageErrors) {
            let errorMessage = null;
            
            if (pageErrors.error) {
                errorMessage = pageErrors.error;
            } else if (typeof pageErrors === 'object') {
                // Ambil error pertama yang ditemukan
                const firstErrorKey = Object.keys(pageErrors)[0];
                if (firstErrorKey) {
                    const firstError = pageErrors[firstErrorKey];
                    if (Array.isArray(firstError)) {
                        errorMessage = firstError[0];
                    } else if (typeof firstError === 'string') {
                        errorMessage = firstError;
                    }
                }
            }
            
            if (errorMessage) {
                setAlertConfig({
                    type: "error",
                    title: "Error",
                    message: errorMessage,
                    autoClose: true,
                });
                setShowAlert(true);
            }
        }
    }, [flash, pageErrors]);

    const [showSampleModal, setShowSampleModal] = useState(false);
    const [sampleDate, setSampleDate] = useState("");
    const [sampleTime, setSampleTime] = useState("");
    const [selectedPermintaan, setSelectedPermintaan] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteProcessing, setDeleteProcessing] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    // Filter data berdasarkan tab aktif
    // Note: permintaanLab adalah paginated response dari Laravel, jadi menggunakan .data
    const filteredData = useMemo(() => {
        if (!permintaanLab?.data) return [];
        
        let filtered = [...permintaanLab.data];
        
        // Filter berdasarkan tab (ralan/ranap) - tab aktif mengoverride filter status
        // Jika tab aktif, filter berdasarkan tab, bukan berdasarkan filter status
        filtered = filtered.filter((item) => {
            if (activeTab === "ralan") {
                return item.status === "ralan";
            } else if (activeTab === "ranap") {
                return item.status === "ranap";
            }
            // Jika tidak ada tab aktif, return semua
            return true;
        });
        
        return filtered;
    }, [permintaanLab, activeTab]);

    // Flatten item permintaan untuk sub-tab "Item Permintaan"
    const itemPermintaanData = useMemo(() => {
        if (activeSubTab !== "item") return [];
        
        const items = [];
        filteredData.forEach((permintaan) => {
            const details = permintaan.detail_permintaan || permintaan.detailPermintaan || [];
            details.forEach((detail) => {
                items.push({
                    ...detail,
                    noorder: permintaan.noorder,
                    no_rawat: permintaan.no_rawat,
                    tgl_permintaan: permintaan.tgl_permintaan,
                    jam_permintaan: permintaan.jam_permintaan,
                    tgl_sampel: permintaan.tgl_sampel,
                    jam_sampel: permintaan.jam_sampel,
                    tgl_hasil: permintaan.tgl_hasil,
                    jam_hasil: permintaan.jam_hasil,
                    dokter_perujuk: permintaan.dokter_perujuk,
                    patient: permintaan.reg_periksa?.patient || permintaan.patient,
                    dokter: permintaan.dokter,
                    reg_periksa: permintaan.reg_periksa,
                });
            });
        });
        
        return items;
    }, [filteredData, activeSubTab]);

    const handleSearch = () => {
        // Saat search, gunakan status dari tab aktif
        const statusToUse = activeTab === "ralan" || activeTab === "ranap" ? activeTab : "";
        
        router.get(
            route("laboratorium.permintaan-lab.index"),
            {
                search,
                status: statusToUse || undefined,
                dokter: dokter || undefined,
                start_date: startDate || undefined,
                end_date: endDate || undefined,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const handleReset = () => {
        const today = getTodayDate();
        setSearch("");
        setDokter("");
        setStartDate(today);
        setEndDate(today);
        // Reset tab ke ralan sebagai default
        setActiveTab("ralan");
        router.get(
            route("laboratorium.permintaan-lab.index"),
            { 
                status: "ralan",
                start_date: today,
                end_date: today,
            },
            { replace: true }
        );
    };

    const openSampleModal = (item) => {
        // Validasi: tidak boleh update jika hasil sudah tersedia
        const tglHasil = item.tgl_hasil;
        let hasResult = false;
        
        if (tglHasil) {
            const tglHasilStr = typeof tglHasil === 'string' ? tglHasil : String(tglHasil);
            
            // Daftar nilai yang dianggap TIDAK valid (belum ada hasil)
            const invalidDates = [
                '0000-00-00',
                '0000-00-00 00:00:00',
                '-0001-11-30',
                '-0001-11-30 00:00:00',
                '1970-01-01',
                '1970-01-01 00:00:00',
            ];
            
            // Cek apakah tanggal adalah nilai invalid
            const isInvalidDate = invalidDates.some(invalid => tglHasilStr.includes(invalid)) ||
                                 tglHasilStr.startsWith('-') || // Tanggal negatif
                                 tglHasilStr.match(/^(\d{4})-\d{2}-\d{2}/)?.[1] < 1970 || // Tahun < 1970
                                 tglHasilStr.match(/^(\d{4})-\d{2}-\d{2}/)?.[1] > 2100; // Tahun > 2100
            
            // Hasil dianggap valid hanya jika bukan invalid date
            hasResult = !isInvalidDate;
        }
        
        if (hasResult) {
            setAlertConfig({
                type: "error",
                title: "Tidak Bisa Update Sampel",
                message: "Tidak dapat memperbarui waktu sampel karena hasil sudah tersedia.",
                autoClose: true,
            });
            setShowAlert(true);
            return;
        }
        
        setSelectedPermintaan(item);
        // Gunakan timezone Asia/Jakarta untuk tanggal dan waktu default
        const now = new Date();
        // Format tanggal dalam timezone Asia/Jakarta
        const dateFormatter = new Intl.DateTimeFormat('en-CA', {
            timeZone: 'Asia/Jakarta',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        const defaultDate = dateFormatter.format(now);
        
        // Format waktu dalam timezone Asia/Jakarta
        const timeFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: 'Asia/Jakarta',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        const defaultTime = timeFormatter.format(now);
        
        // Gunakan tanggal/jam sampel yang sudah ada jika ada, atau default
        setSampleDate(
            item.tgl_sampel && item.tgl_sampel !== "0000-00-00"
                ? item.tgl_sampel
                : defaultDate
        );
        setSampleTime(
            item.jam_sampel && item.jam_sampel !== "00:00:00"
                ? item.jam_sampel.toString().substring(0, 5)
                : defaultTime
        );
        setShowSampleModal(true);
    };

    const submitSample = () => {
        console.log("=== submitSample START ===");
        console.log("selectedPermintaan:", selectedPermintaan);
        console.log("sampleDate:", sampleDate);
        console.log("sampleTime:", sampleTime);
        
        if (!selectedPermintaan?.noorder) {
            console.error("❌ No noorder found in selectedPermintaan:", selectedPermintaan);
            return;
        }
        
        // Validasi frontend sebelum submit
        if (!sampleDate || !sampleTime) {
            console.warn("⚠️ Validation failed: missing date or time");
            setAlertConfig({
                type: "error",
                title: "Validasi Gagal",
                message: "Tanggal dan jam sampel harus diisi.",
                autoClose: true,
            });
            setShowAlert(true);
            return;
        }
        
        // Gunakan URL langsung dan method spoofing untuk menghindari masalah dengan router.put
        // Route backend sudah benar: PUT /laboratorium/permintaan-lab/{permintaan_lab}/sampel
        const routeUrl = `/laboratorium/permintaan-lab/${selectedPermintaan.noorder}/sampel`;
        const payload = {
            _method: 'PUT',
            tgl_sampel: sampleDate,
            jam_sampel: sampleTime,
        };
        
        console.log("📤 Sending request:");
        console.log("  URL:", routeUrl);
        console.log("  Payload:", payload);
        console.log("  Method: POST (with _method=PUT spoofing)");
        
        // Gunakan method spoofing dengan POST + _method=PUT seperti yang digunakan di aplikasi lain
        router.post(
            routeUrl,
            payload,
            {
                forceFormData: true,
                preserveScroll: true,
                preserveState: true, // Keep state untuk mempertahankan filter dan tab
                onStart: () => {
                    console.log("🔄 Request started");
                },
                onProgress: (progress) => {
                    console.log("⏳ Request progress:", progress);
                },
                onSuccess: (responsePage) => {
                    console.log("✅ Update sampel SUCCESS");
                    console.log("  Response page:", responsePage);
                    console.log("  Response page.props:", responsePage?.props);
                    console.log("  Response page.flash:", responsePage?.flash);
                    console.log("  Current page.props:", page.props);
                    console.log("  Current page.props.flash:", page?.props?.flash);
                    
                    // Tutup modal terlebih dahulu
                    console.log("  Closing modal...");
                    setShowSampleModal(false);
                    setSelectedPermintaan(null);
                    
                    // Tampilkan alert sukses - gunakan flash dari response atau default
                    // Dengan preserveState: true, flash message akan tersedia di responsePage.props
                    const successMessage = responsePage?.props?.flash?.success || 
                                         responsePage?.flash?.success ||
                                         page?.props?.flash?.success ||
                                         "Tanggal dan jam sampel berhasil diperbarui.";
                    
                    console.log("  Success message:", successMessage);
                    console.log("  Showing alert...");
                    
                    setAlertConfig({
                        type: "success",
                        title: "Berhasil",
                        message: successMessage,
                        autoClose: true,
                    });
                    setShowAlert(true);
                    
                    // Refresh data untuk mendapatkan data terbaru setelah delay kecil
                    // Delay diperlukan agar alert sempat ditampilkan sebelum refresh
                    console.log("  Scheduling data refresh in 500ms...");
                    setTimeout(() => {
                        console.log("  Refreshing data...");
                        handleSearch();
                    }, 500);
                    
                    console.log("=== submitSample SUCCESS END ===");
                },
                onError: (errors) => {
                    console.error("❌ Update sampel ERROR");
                    console.error("  Errors:", errors);
                    console.error("  Errors type:", typeof errors);
                    console.error("  Errors keys:", errors ? Object.keys(errors) : 'null');
                    
                    // Helper function untuk extract error message dari berbagai format
                    const extractErrorMessage = (errorValue) => {
                        if (Array.isArray(errorValue)) {
                            // Jika array, ambil elemen pertama
                            return errorValue[0] || "Terjadi kesalahan saat memperbarui sampel.";
                        } else if (typeof errorValue === 'string') {
                            return errorValue;
                        } else if (errorValue && typeof errorValue === 'object') {
                            // Jika object, coba ambil message atau error property
                            return errorValue.message || errorValue.error || JSON.stringify(errorValue);
                        }
                        return "Terjadi kesalahan saat memperbarui sampel.";
                    };
                    
                    // Handle error dari Inertia response
                    // Errors bisa berupa object dengan key 'error' atau array validation errors
                    let errorMessage = "Terjadi kesalahan saat memperbarui sampel.";
                    
                    if (errors?.error) {
                        errorMessage = extractErrorMessage(errors.error);
                        console.error("  Using errors.error (extracted):", errorMessage);
                    } else if (errors?.message) {
                        errorMessage = extractErrorMessage(errors.message);
                        console.error("  Using errors.message (extracted):", errorMessage);
                    } else if (typeof errors === 'string') {
                        errorMessage = errors;
                        console.error("  Using errors as string:", errorMessage);
                    } else if (typeof errors === 'object' && errors !== null) {
                        // Jika ada validation errors, ambil yang pertama
                        const firstErrorKey = Object.keys(errors)[0];
                        const firstError = errors[firstErrorKey];
                        console.error("  First error key:", firstErrorKey);
                        console.error("  First error value:", firstError);
                        console.error("  First error value type:", typeof firstError);
                        console.error("  Is array?", Array.isArray(firstError));
                        
                        errorMessage = extractErrorMessage(firstError);
                    }
                    
                    console.error("  Final error message:", errorMessage);
                    console.error("  Showing error alert...");
                    
                    setAlertConfig({
                        type: "error",
                        title: "Gagal",
                        message: errorMessage,
                        autoClose: true,
                    });
                    setShowAlert(true);
                    
                    console.log("=== submitSample ERROR END ===");
                },
                onFinish: () => {
                    console.log("🏁 Request finished");
                },
            }
        );
        
        console.log("📤 Request sent, waiting for response...");
    };

    const handleInputHasil = (item) => {
        // Validasi: sampel harus sudah diambil
        if (!item.tgl_sampel || item.tgl_sampel === "0000-00-00") {
            setAlertConfig({
                type: "error",
                title: "Tidak Bisa Input Hasil",
                message: "Sampel harus sudah diambil terlebih dahulu.",
                autoClose: true,
            });
            setShowAlert(true);
            return;
        }
        
        // Redirect ke halaman input hasil
        router.get(
            route("laboratorium.permintaan-lab.show", { permintaan_lab: item.noorder })
        );
    };

    const handleDelete = (item) => {
        // Validasi sesuai business rules dari dokumentasi
        const details = item.detail_permintaan || item.detailPermintaan || [];
        const hasPaidItem = details.some(
            (d) => d.stts_bayar === "Sudah"
        );
        const hasSample = item.tgl_sampel && item.tgl_sampel !== "0000-00-00";
        
        // Check if user is admin (simplified - adjust based on your auth system)
        const isAdmin = auth?.user?.roles?.some(
            (r) => r.name === "Admin Utama" || r.name === "Super Admin"
        ) || false;
        
        // Validasi: tidak ada item yang sudah dibayar
        if (hasPaidItem) {
            setAlertConfig({
                type: "error",
                title: "Tidak Bisa Dihapus",
                message: "Tidak dapat menghapus permintaan yang sudah memiliki item yang dibayar.",
                autoClose: true,
            });
            setShowAlert(true);
            return;
        }
        
        // Validasi: belum diambil sampel (kecuali admin)
        if (hasSample && !isAdmin) {
            setAlertConfig({
                type: "error",
                title: "Tidak Bisa Dihapus",
                message: "Tidak dapat menghapus permintaan yang sudah diambil sampelnya. Hanya Admin Utama yang dapat menghapus.",
                autoClose: true,
            });
            setShowAlert(true);
            return;
        }
        
        // Tampilkan modal konfirmasi
        setItemToDelete(item);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (!itemToDelete?.noorder) {
            return;
        }

        setDeleteProcessing(true);
        
        router.delete(
            route("laboratorium.permintaan-lab.destroy", { permintaan_lab: itemToDelete.noorder }),
            {
                preserveScroll: true,
                preserveState: true, // Preserve state untuk mempertahankan filter dan tab
                onStart: () => {
                    setDeleteProcessing(true);
                },
                onSuccess: (page) => {
                    // Tutup modal terlebih dahulu
                    setShowDeleteModal(false);
                    setItemToDelete(null);
                    setDeleteProcessing(false);
                    
                    // Tampilkan alert sukses - gunakan flash dari response atau default
                    const successMessage = page?.props?.flash?.success || 
                                         page?.flash?.success ||
                                         `Permintaan ${itemToDelete.noorder} berhasil dihapus.`;
                    
                    setAlertConfig({
                        type: "success",
                        title: "Berhasil",
                        message: successMessage,
                        autoClose: true,
                    });
                    setShowAlert(true);
                    
                    // Refresh data setelah delay kecil agar alert sempat ditampilkan
                    setTimeout(() => {
                        handleSearch();
                    }, 500);
                },
                onError: (errors) => {
                    // Helper function untuk extract error message
                    const extractErrorMessage = (errorValue) => {
                        if (Array.isArray(errorValue)) {
                            return errorValue[0] || "Terjadi kesalahan saat menghapus permintaan.";
                        } else if (typeof errorValue === 'string') {
                            return errorValue;
                        } else if (errorValue && typeof errorValue === 'object') {
                            return errorValue.message || errorValue.error || JSON.stringify(errorValue);
                        }
                        return "Terjadi kesalahan saat menghapus permintaan.";
                    };

                    let errorMessage = "Terjadi kesalahan saat menghapus permintaan.";
                    
                    if (errors?.error) {
                        errorMessage = extractErrorMessage(errors.error);
                    } else if (errors?.message) {
                        errorMessage = extractErrorMessage(errors.message);
                    } else if (typeof errors === 'string') {
                        errorMessage = errors;
                    } else if (typeof errors === 'object' && errors !== null) {
                        const firstErrorKey = Object.keys(errors)[0];
                        if (firstErrorKey) {
                            errorMessage = extractErrorMessage(errors[firstErrorKey]);
                        }
                    }

                    setAlertConfig({
                        type: "error",
                        title: "Gagal Menghapus",
                        message: errorMessage,
                        autoClose: true,
                    });
                    setShowAlert(true);
                    setDeleteProcessing(false);
                },
                onFinish: () => {
                    setDeleteProcessing(false);
                },
            }
        );
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setItemToDelete(null);
        setDeleteProcessing(false);
    };

    const getStatusBadge = (item) => {
        const tglSampel = item.tgl_sampel && item.tgl_sampel !== "0000-00-00";
        
        // Gunakan has_hasil dari backend jika tersedia, jika tidak gunakan fallback
        const hasHasil = item.has_hasil !== undefined 
            ? item.has_hasil 
            : (item.tgl_hasil && item.tgl_hasil !== "0000-00-00");
        
        let statusText = "Baru";
        let statusClass = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
        
        if (hasHasil) {
            statusText = "Hasil Tersedia";
            statusClass = "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
        } else if (tglSampel) {
            statusText = "Sampel Diambil";
            statusClass = "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
        }
        
        return (
            <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}`}
            >
                {statusText}
            </span>
        );
    };

    // Kolom untuk tabel Data Permintaan
    const permintaanColumns = [
        {
            key: "noorder",
            header: "No. Permintaan",
            label: "No. Permintaan",
            render: (item) => (
                <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                        {item.noorder}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {item.no_rawat}
                    </div>
                </div>
            ),
        },
        {
            key: "patient",
            header: "Pasien",
            label: "Pasien",
            render: (item) => (
                <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                        {item.reg_periksa?.patient?.nm_pasien || "-"}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        {item.reg_periksa?.patient?.no_rkm_medis || "-"}
                    </div>
                </div>
            ),
        },
        {
            key: "tgl_permintaan",
            header: "Tanggal Permintaan",
            label: "Tanggal Permintaan",
            render: (item) => (
                <div>
                    <div className="text-sm text-gray-900 dark:text-white">
                        {item.tgl_permintaan
                            ? new Date(item.tgl_permintaan).toLocaleDateString("id-ID")
                            : "-"}
                    </div>
                    {item.jam_permintaan && item.jam_permintaan !== "00:00:00" && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {item.jam_permintaan.toString().substring(0, 5)}
                        </div>
                    )}
                </div>
            ),
        },
        {
            key: "tgl_sampel",
            header: "Tanggal Sampel",
            label: "Tanggal Sampel",
            render: (item) => (
                <div>
                    <div className="text-sm text-gray-900 dark:text-white">
                        {item.tgl_sampel && item.tgl_sampel !== "0000-00-00"
                            ? new Date(item.tgl_sampel).toLocaleDateString("id-ID")
                            : "-"}
                    </div>
                    {item.jam_sampel && item.jam_sampel !== "00:00:00" && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {item.jam_sampel.toString().substring(0, 5)}
                        </div>
                    )}
                </div>
            ),
        },
        {
            key: "tgl_hasil",
            header: "Tanggal Hasil",
            label: "Tanggal Hasil",
            render: (item) => (
                <div>
                    <div className="text-sm text-gray-900 dark:text-white">
                        {item.tgl_hasil && item.tgl_hasil !== "0000-00-00"
                            ? new Date(item.tgl_hasil).toLocaleDateString("id-ID")
                            : "-"}
                    </div>
                    {item.jam_hasil && item.jam_hasil !== "00:00:00" && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {item.jam_hasil.toString().substring(0, 5)}
                        </div>
                    )}
                </div>
            ),
        },
        {
            key: "dokter",
            header: "Dokter Perujuk",
            label: "Dokter Perujuk",
            render: (item) => (
                <div className="text-sm text-gray-900 dark:text-white">
                    {item.dokter?.nm_dokter || item.dokter_perujuk || "-"}
                </div>
            ),
        },
        {
            key: "status_badge",
            header: "Status",
            label: "Status",
            render: (item) => getStatusBadge(item),
        },
        {
            key: "actions",
            header: "Aksi",
            label: "Aksi",
            render: (item) => (
                <ActionDropdown
                    item={item}
                    viewRoute={null}
                    editRoute={null}
                    onDelete={() => handleDelete(item)}
                    customItems={
                        <>
                            <button
                                onClick={() => {
                                    router.get(
                                        route("laboratorium.permintaan-lab.show", { permintaan_lab: item.noorder })
                                    );
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                            >
                                <span className="mr-3 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300">
                                    <Eye className="w-4 h-4" />
                                </span>
                                Lihat Detail
                            </button>
                            <button
                                onClick={() => openSampleModal(item)}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                            >
                                <span className="mr-3 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300">
                                    <Clock className="w-4 h-4" />
                                </span>
                                Update Sampel
                            </button>
                            <button
                                onClick={() => handleInputHasil(item)}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                                disabled={
                                    !item.tgl_sampel || item.tgl_sampel === "0000-00-00"
                                }
                            >
                                <span className="mr-3 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300">
                                    <ClipboardList className="w-4 h-4" />
                                </span>
                                Input Hasil
                            </button>
                            {item.has_hasil && (
                                <button
                                    onClick={() => {
                                        window.open(
                                            route("laboratorium.permintaan-lab.preview", { permintaan_lab: item.noorder }),
                                            "_blank"
                                        );
                                    }}
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                                >
                                    <span className="mr-3 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300">
                                        <Printer className="w-4 h-4" />
                                    </span>
                                    Preview & Cetak Hasil
                                </button>
                            )}
                        </>
                    }
                />
            ),
        },
    ];

    // Kolom untuk tabel Item Permintaan
    const itemColumns = [
        {
            key: "noorder",
            header: "No. Permintaan",
            label: "No. Permintaan",
            render: (item) => (
                <div className="font-medium text-gray-900 dark:text-white">
                    {item.noorder}
                </div>
            ),
        },
        {
            key: "patient",
            header: "Pasien",
            label: "Pasien",
            render: (item) => (
                <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                        {item.patient?.nm_pasien || "-"}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        {item.patient?.no_rkm_medis || "-"}
                    </div>
                </div>
            ),
        },
        {
            key: "jenis_pemeriksaan",
            header: "Jenis Pemeriksaan",
            label: "Jenis Pemeriksaan",
            render: (item) => (
                <div className="text-sm text-gray-900 dark:text-white">
                    {item.jns_perawatan_lab?.nm_perawatan ||
                        item.jnsPerawatanLab?.nm_perawatan ||
                        "-"}
                </div>
            ),
        },
        {
            key: "template",
            header: "Template Pemeriksaan",
            label: "Template Pemeriksaan",
            render: (item) => (
                <div className="text-sm text-gray-900 dark:text-white">
                    {item.template_laboratorium?.Pemeriksaan ||
                        item.templateLaboratorium?.Pemeriksaan ||
                        "-"}
                </div>
            ),
        },
        {
            key: "stts_bayar",
            header: "Status Bayar",
            label: "Status Bayar",
            render: (item) => (
                <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.stts_bayar === "Sudah"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                    }`}
                >
                    {item.stts_bayar || "Belum"}
                </span>
            ),
        },
        {
            key: "tgl_permintaan",
            header: "Tanggal Permintaan",
            label: "Tanggal Permintaan",
            render: (item) => (
                <div className="text-sm text-gray-900 dark:text-white">
                    {item.tgl_permintaan
                        ? new Date(item.tgl_permintaan).toLocaleDateString("id-ID")
                        : "-"}
                </div>
            ),
        },
    ];

    const currentColumns = activeSubTab === "item" ? itemColumns : permintaanColumns;
    const currentData = activeSubTab === "item" ? itemPermintaanData : filteredData;

    if (isPeriksaMode) {
        const periksaData = periksaLab?.data || [];
        const seenPeriksa = new Set();
        const periksaRows = periksaData.filter((item) => {
            const date = item.tgl_periksa || "";
            const time = item.jam || "";
            const key = `${item.no_rawat}|${date}|${time}`;
            if (seenPeriksa.has(key)) {
                return false;
            }
            seenPeriksa.add(key);
            return true;
        });

        const handlePeriksaSearch = () => {
            router.get(
                route("laboratorium.index"),
                {
                    search: search || undefined,
                    status: filters.status || undefined,
                    start_date: startDate || undefined,
                    end_date: endDate || undefined,
                },
                {
                    preserveState: true,
                    replace: true,
                }
            );
        };

        const handlePeriksaReset = () => {
            const today = getTodayDate();
            setSearch("");
            setStartDate(today);
            setEndDate(today);
            router.get(
                route("laboratorium.index"),
                {
                    start_date: today,
                    end_date: today,
                },
                {
                    replace: true,
                }
            );
        };

        const periksaColumns = [
            {
                key: "tgl_periksa",
                header: "Tanggal/Jam",
                label: "Tanggal/Jam",
                render: (item) => (
                    <div className="text-sm text-gray-900 dark:text-white">
                        <div>
                            {item.tgl_periksa
                                ? new Date(item.tgl_periksa).toLocaleDateString("id-ID")
                                : "-"}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            {item.jam || "-"}
                        </div>
                    </div>
                ),
            },
            {
                key: "no_rawat",
                header: "No. Rawat",
                label: "No. Rawat",
                render: (item) => (
                    <div className="font-mono text-sm text-gray-900 dark:text-white">
                        {item.no_rawat}
                    </div>
                ),
            },
            {
                key: "pasien",
                header: "Pasien",
                label: "Pasien",
                render: (item) => (
                    <div>
                        <Link
                            href={route("laboratorium.show", {
                                noRawat: item.no_rawat,
                            })}
                            className="font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            {item.reg_periksa?.patient?.nm_pasien || "-"}
                        </Link>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            {item.reg_periksa?.patient?.no_rkm_medis || "-"}
                        </div>
                    </div>
                ),
            },
        ];

        return (
            <SidebarLaboratorium title="Periksa Laboratorium">
                <Head title="Periksa Laboratorium" />

                {showAlert && (
                    <Alert
                        type={alertConfig.type}
                        title={alertConfig.title}
                        message={alertConfig.message}
                        autoClose={alertConfig.autoClose}
                        onClose={() => setShowAlert(false)}
                    />
                )}

                <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 py-8">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="mx-auto px-2 sm:px-3 lg:px-6 xl:px-8 max-w-[98%]"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10 pointer-events-none" />
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

                            <motion.div
                                variants={itemVariants}
                                className="relative px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    <div>
                                        <motion.h1
                                            className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.6, delay: 0.2 }}
                                        >
                                            Data Periksa Laboratorium
                                        </motion.h1>
                                        <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                            Daftar pemeriksaan hasil lab berdasarkan pasien
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                className="relative p-8 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                                    <div className="md:col-span-2 lg:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            Pencarian
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                                onKeyPress={(e) =>
                                                    e.key === "Enter" && handlePeriksaSearch()
                                                }
                                                placeholder="Cari nama pasien atau No. RM..."
                                                className="w-full pl-11 pr-4 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:bg-gray-700/80 dark:text-white backdrop-blur-sm transition-all duration-200"
                                            />
                                            <Search className="absolute left-3.5 top-3 h-5 w-5 text-gray-400" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            Status
                                        </label>
                                        <select
                                            value={filters.status || ""}
                                            onChange={(e) =>
                                                router.get(
                                                    route("laboratorium.index"),
                                                    {
                                                        search: search || undefined,
                                                        status:
                                                            e.target.value || undefined,
                                                        start_date:
                                                            startDate || undefined,
                                                        end_date: endDate || undefined,
                                                    },
                                                    {
                                                        preserveState: true,
                                                        replace: true,
                                                    }
                                                )
                                            }
                                            className="w-full px-4 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:bg-gray-700/80 dark:text-white backdrop-blur-sm transition-all duration-200"
                                        >
                                            <option value="">Semua Status</option>
                                            {Object.keys(statusOptions || {}).map(
                                                (key) => (
                                                    <option key={key} value={key}>
                                                        {statusOptions[key]}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            Tanggal Mulai
                                        </label>
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) =>
                                                setStartDate(e.target.value)
                                            }
                                            className="w-full px-4 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:bg-gray-700/80 dark:text-white backdrop-blur-sm transition-all duration-200"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            Tanggal Akhir
                                        </label>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="w-full px-4 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:bg-gray-700/80 dark:text-white backdrop-blur-sm transition-all duration-200"
                                        />
                                    </div>
                                    <div className="flex items-end gap-3">
                                        <motion.button
                                            onClick={handlePeriksaSearch}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-semibold rounded-lg"
                                        >
                                            <Search className="w-4 h-4" />
                                            Cari
                                        </motion.button>
                                        <motion.button
                                            onClick={handlePeriksaReset}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-all duration-200"
                                        >
                                            <RefreshCw className="w-4 h-4" />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                className="p-8"
                            >
                        <div className="overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                            <ResponsiveTable
                                        data={periksaRows}
                                        columns={periksaColumns}
                                        emptyMessage="Tidak ada data pemeriksaan laboratorium"
                                    />
                                </div>
                            </motion.div>

                            {periksaLab?.links && (
                                <motion.div
                                    variants={itemVariants}
                                    className="px-8 pb-8"
                                >
                                    <Pagination
                                        links={periksaLab.links}
                                        from={periksaLab.from}
                                        to={periksaLab.to}
                                        total={periksaLab.total}
                                    />
                                </motion.div>
                            )}
                        </motion.div>
                    </motion.div>
                </div>
            </SidebarLaboratorium>
        );
    }

    return (
        <SidebarLaboratorium title="Permintaan Laboratorium">
            <Head title="Permintaan Laboratorium" />

            {showAlert && (
                <Alert
                    type={alertConfig.type}
                    title={alertConfig.title}
                    message={alertConfig.message}
                    autoClose={alertConfig.autoClose}
                    onClose={() => setShowAlert(false)}
                />
            )}

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 py-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mx-auto px-2 sm:px-3 lg:px-6 xl:px-8 max-w-[98%]"
                >
                    <motion.div
                        variants={itemVariants}
                        className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5"
                    >
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10 pointer-events-none" />
                        
                        {/* Top border gradient */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                        
                        {/* Header */}
                        <motion.div
                            variants={itemVariants}
                            className="relative px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div>
                                    <motion.h1
                                        className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                    >
                                        Data Permintaan Laboratorium
                                    </motion.h1>
                                    
                                </div>
                                
                            </div>
                        </motion.div>

                        {/* Filter */}
                        <motion.div
                            variants={itemVariants}
                            className="relative p-8 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Pencarian
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                            placeholder="Cari pasien, no rawat, noorder..."
                                            className="w-full pl-11 pr-4 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:bg-gray-700/80 dark:text-white backdrop-blur-sm transition-all duration-200"
                                        />
                                        <Search className="absolute left-3.5 top-3 h-5 w-5 text-gray-400" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Dokter
                                    </label>
                                    <select
                                        value={dokter}
                                        onChange={(e) => setDokter(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:bg-gray-700/80 dark:text-white backdrop-blur-sm transition-all duration-200"
                                    >
                                        <option value="">Semua Dokter</option>
                                        {dokters.map((d) => (
                                            <option key={d.kd_dokter} value={d.kd_dokter}>
                                                {d.nm_dokter}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Tanggal Mulai
                                    </label>
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:bg-gray-700/80 dark:text-white backdrop-blur-sm transition-all duration-200"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Tanggal Akhir
                                    </label>
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:bg-gray-700/80 dark:text-white backdrop-blur-sm transition-all duration-200"
                                    />
                                </div>

                                <div className="flex items-end gap-3">
                                    <motion.button
                                        onClick={handleSearch}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-semibold rounded-lg"
                                    >
                                        <Search className="w-4 h-4" />
                                        Cari
                                    </motion.button>
                                    <motion.button
                                        onClick={handleReset}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-all duration-200"
                                    >
                                        <RefreshCw className="w-4 h-4" />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Tab Navigation */}
                        <motion.div
                            variants={itemVariants}
                            className="border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm"
                        >
                            <nav className="flex -mb-px px-6">
                                <motion.button
                                    onClick={() => {
                                        setActiveTab("ralan");
                                        router.get(
                                            route("laboratorium.permintaan-lab.index"),
                                            {
                                                search,
                                                status: "ralan",
                                                dokter,
                                                start_date: startDate,
                                                end_date: endDate,
                                            },
                                            {
                                                preserveState: true,
                                                replace: true,
                                            }
                                        );
                                    }}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ y: 0 }}
                                    className={`relative px-6 py-4 text-sm font-semibold border-b-2 transition-all duration-200 ${
                                        activeTab === "ralan"
                                            ? "border-blue-500 text-blue-600 dark:text-blue-400 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-900/20"
                                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                                    }`}
                                >
                                    Rawat Jalan
                                    {activeTab === "ralan" && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
                                            layoutId="activeTab"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </motion.button>
                                <motion.button
                                    onClick={() => {
                                        setActiveTab("ranap");
                                        router.get(
                                            route("laboratorium.permintaan-lab.index"),
                                            {
                                                search,
                                                status: "ranap",
                                                dokter,
                                                start_date: startDate,
                                                end_date: endDate,
                                            },
                                            {
                                                preserveState: true,
                                                replace: true,
                                            }
                                        );
                                    }}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ y: 0 }}
                                    className={`relative px-6 py-4 text-sm font-semibold border-b-2 transition-all duration-200 ${
                                        activeTab === "ranap"
                                            ? "border-blue-500 text-blue-600 dark:text-blue-400 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-900/20"
                                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                                    }`}
                                >
                                    Rawat Inap
                                    {activeTab === "ranap" && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
                                            layoutId="activeTab"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </motion.button>
                            </nav>
                        </motion.div>

                        {/* Sub-tab Navigation */}
                        <motion.div
                            variants={itemVariants}
                            className="border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-700/30 dark:to-gray-800/30 backdrop-blur-sm"
                        >
                            <nav className="flex -mb-px px-6">
                                <motion.button
                                    onClick={() => setActiveSubTab("permintaan")}
                                    whileHover={{ y: -1 }}
                                    whileTap={{ y: 0 }}
                                    className={`relative px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 ${
                                        activeSubTab === "permintaan"
                                            ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                                    }`}
                                >
                                    Data Permintaan
                                    {activeSubTab === "permintaan" && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"
                                            layoutId="activeSubTab"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </motion.button>
                                <motion.button
                                    onClick={() => setActiveSubTab("item")}
                                    whileHover={{ y: -1 }}
                                    whileTap={{ y: 0 }}
                                    className={`relative px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 ${
                                        activeSubTab === "item"
                                            ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                                    }`}
                                >
                                    Item Permintaan
                                    {activeSubTab === "item" && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"
                                            layoutId="activeSubTab"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </motion.button>
                            </nav>
                        </motion.div>

                        {/* Table */}
                        <motion.div
                            variants={itemVariants}
                            className="p-8"
                        >
                            <div className="overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                <ResponsiveTable
                                    data={currentData}
                                    columns={currentColumns}
                                    emptyMessage={
                                        activeSubTab === "item"
                                            ? "Tidak ada item permintaan"
                                            : "Tidak ada data permintaan laboratorium"
                                    }
                                />
                            </div>
                        </motion.div>

                        {/* Pagination */}
                        {activeSubTab === "permintaan" && permintaanLab?.links && (
                            <motion.div
                                variants={itemVariants}
                                className="px-8 pb-8"
                            >
                                <Pagination
                                    links={permintaanLab.links}
                                    from={permintaanLab.from}
                                    to={permintaanLab.to}
                                    total={permintaanLab.total}
                                />
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal
                show={showDeleteModal}
                onClose={cancelDelete}
                title="Konfirmasi Hapus Permintaan"
            >
                <motion.div
                    className="space-y-6 p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {itemToDelete && (
                        <div className="p-4 rounded-xl bg-gradient-to-r from-red-50/50 to-orange-50/50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200/50 dark:border-red-800/50">
                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                <span className="font-semibold">No. Permintaan:</span>{" "}
                                <span className="font-mono text-sm p-2 bg-white/80 dark:bg-gray-800/80 rounded-lg border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
                                    {itemToDelete.noorder}
                                </span>
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                <span className="font-semibold">Pasien:</span>{" "}
                                {itemToDelete.reg_periksa?.patient?.nm_pasien || "-"}
                            </p>
                            <p className="text-sm text-red-600 dark:text-red-400 font-semibold">
                                ⚠️ Tindakan ini tidak dapat dibatalkan!
                            </p>
                        </div>
                    )}
                    <div className="flex justify-end gap-3 pt-4">
                        <motion.button
                            onClick={cancelDelete}
                            disabled={deleteProcessing}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-6 py-2.5 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Batal
                        </motion.button>
                        <motion.button
                            onClick={confirmDelete}
                            disabled={deleteProcessing}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-6 py-2.5 bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:from-red-700 hover:via-rose-700 hover:to-pink-700 shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30 transition-all duration-300 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {deleteProcessing ? (
                                <>
                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                    Menghapus...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="w-4 h-4" />
                                    Hapus
                                </>
                            )}
                        </motion.button>
                    </div>
                </motion.div>
            </Modal>

            {/* Ambil Sampel Modal */}
            <Modal
                show={showSampleModal}
                onClose={() => setShowSampleModal(false)}
                title="Update Waktu Sampel"
            >
                <motion.div
                    className="space-y-6 p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {selectedPermintaan && (
                        <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-800/50">
                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                <span className="font-semibold">No. Permintaan:</span>{" "}
                                <span className="font-mono text-sm p-2 bg-white/80 dark:bg-gray-800/80 rounded-lg border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
                                    {selectedPermintaan.noorder}
                                </span>
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                <span className="font-semibold">Pasien:</span>{" "}
                                {selectedPermintaan.reg_periksa?.patient?.nm_pasien || "-"}
                            </p>
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Tanggal Sampel
                        </label>
                        <input
                            type="date"
                            value={sampleDate}
                            onChange={(e) => setSampleDate(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:bg-gray-700/80 dark:text-white backdrop-blur-sm transition-all duration-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Jam Sampel
                        </label>
                        <input
                            type="time"
                            value={sampleTime}
                            onChange={(e) => setSampleTime(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:bg-gray-700/80 dark:text-white backdrop-blur-sm transition-all duration-200"
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <motion.button
                            onClick={() => setShowSampleModal(false)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-6 py-2.5 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-all duration-200"
                        >
                            Batal
                        </motion.button>
                        <motion.button
                            onClick={submitSample}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-semibold rounded-lg"
                        >
                            Simpan
                        </motion.button>
                    </div>
                </motion.div>
            </Modal>
        </SidebarLaboratorium>
    );
}
