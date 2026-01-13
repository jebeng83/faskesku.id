import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Head, Link, useForm, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import LanjutanRegistrasiLayout from "@/Layouts/LanjutanRegistrasiLayout";
import SelectWithAdd from "@/Components/SelectWithAdd";
import PenjabCreateModal from "@/Components/PenjabCreateModal";
import SearchableSelect from "@/Components/SearchableSelect";
import WilayahSearchableSelect from "@/Components/WilayahSearchableSelect";
import AddressDisplay from "@/Components/AddressDisplay";
import { UserPlus, ArrowLeft, Info, CheckCircle2, Loader2 } from "lucide-react";
import PatientCreateModal from "@/Components/PatientCreateModal";

export default function Create() {
    // Variants for subtle, performant micro-interactions
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
    const [penjabOptions, setPenjabOptions] = useState([]);
    const [isPenjabModalOpen, setIsPenjabModalOpen] = useState(false);
    const [selectedWilayah, setSelectedWilayah] = useState(null);
    const [loadingWilayah, setLoadingWilayah] = useState(false);
    const [perusahaanOptions, setPerusahaanOptions] = useState([]);
    const [sukuOptions, setSukuOptions] = useState([]);
    const [bahasaOptions, setBahasaOptions] = useState([]);
    const [cacatOptions, setCacatOptions] = useState([]);
    const [showPerusahaanPasienModal, setShowPerusahaanPasienModal] =
        useState(false);
    const [showBahasaPasienModal, setShowBahasaPasienModal] = useState(false);
    const [showSukuBangsaModal, setShowSukuBangsaModal] = useState(false);
    const [showCacatFisikModal, setShowCacatFisikModal] = useState(false);
    const [usePatientAddress, setUsePatientAddress] = useState(false);

    // Address states - now handled by WilayahSearchableSelect components

    const { data, setData, post, processing, errors } = useForm({
        nm_pasien: "",
        no_ktp: "",
        jk: "L",
        tmp_lahir: "",
        tgl_lahir: "",
        nm_ibu: "",
        alamat: "",
        gol_darah: "",
        pekerjaan: "",
        stts_nikah: "BELUM MENIKAH",
        agama: "",
        no_tlp: "",
        pnd: "SMA",
        keluarga: "DIRI SENDIRI",
        namakeluarga: "",
        kd_pj: "UMUM",
        no_peserta: "",
        pekerjaanpj: "",
        alamatpj: "",
        kode_wilayah: "",
        email: "",
        perusahaan_pasien: "",
        perusahaan_pasien_text: "",
        suku_bangsa: "",
        bahasa_pasien: "",
        cacat_fisik: "",
        nip: "",
    });

    useEffect(() => {
        setData("pekerjaan", "KARYAWAN SWASTA");
        setData("agama", "ISLAM");
    }, []);

    useEffect(() => {
        if (usePatientAddress) {
            setData("alamatpj", data.alamat || "");
        }
    }, [usePatientAddress, data.alamat]);

    useEffect(() => {
        const findByLabel = (opts, target) => {
            const t = String(target).toLowerCase();
            return (Array.isArray(opts) ? opts : []).find(
                (o) => String(o?.label || "").toLowerCase() === t
            );
        };
        const suku = findByLabel(sukuOptions, "JAWA");
        if (suku) setData("suku_bangsa", suku.value);
        const bahasa = findByLabel(bahasaOptions, "JAWA");
        if (bahasa) setData("bahasa_pasien", bahasa.value);
        const cacat = findByLabel(cacatOptions, "TIDAK ADA");
        if (cacat) setData("cacat_fisik", cacat.value);
    }, [sukuOptions, bahasaOptions, cacatOptions]);

    // Load penjab options on component mount
    useEffect(() => {
        const loadPenjabOptions = async () => {
            try {
                const response = await fetch("/api/penjab");
                if (response.ok) {
                    const result = await response.json();
                    const options = result.data.map((penjab) => ({
                        value: penjab.kd_pj,
                        label: penjab.png_jawab,
                    }));
                    setPenjabOptions(options);
                }
            } catch (error) {
                console.error("Error loading penjab options:", error);
            }
        };

        loadPenjabOptions();
    }, []);

    // Load reference options (perusahaan pasien, suku bangsa, bahasa pasien, cacat fisik)
    useEffect(() => {
        const loadRefs = async () => {
            try {
                const [perusahaanRes, sukuRes, bahasaRes, cacatRes] =
                    await Promise.all([
                        fetch("/api/perusahaan-pasien"),
                        fetch("/api/suku-bangsa"),
                        fetch("/api/bahasa-pasien"),
                        fetch("/api/cacat-fisik"),
                    ]);
                if (perusahaanRes.ok) {
                    const r = await perusahaanRes.json();
                    setPerusahaanOptions(
                        (r.data || []).map((d) => ({
                            value: d.value,
                            label: d.label,
                        }))
                    );
                }
                if (sukuRes.ok) {
                    const r = await sukuRes.json();
                    setSukuOptions(
                        (r.data || []).map((d) => ({
                            value: d.value,
                            label: d.label,
                        }))
                    );
                }
                if (bahasaRes.ok) {
                    const r = await bahasaRes.json();
                    setBahasaOptions(
                        (r.data || []).map((d) => ({
                            value: d.value,
                            label: d.label,
                        }))
                    );
                }
                if (cacatRes.ok) {
                    const r = await cacatRes.json();
                    setCacatOptions(
                        (r.data || []).map((d) => ({
                            value: d.value,
                            label: d.label,
                        }))
                    );
                }
            } catch (e) {
                console.error("Error loading reference options:", e);
            }
        };
        loadRefs();
    }, []);

    // Load wilayah details when kode_wilayah is set (for editing)
    useEffect(() => {
        if (data.kode_wilayah && !selectedWilayah) {
            const loadWilayahDetails = async () => {
                setLoadingWilayah(true);
                try {
                    const response = await fetch(
                        `/api/wilayah/${data.kode_wilayah}`
                    );
                    if (response.ok) {
                        const result = await response.json();
                        if (result.success) {
                            setSelectedWilayah(
                                parseFullAddress(result.data.full_address)
                            );
                        }
                    }
                } catch (error) {
                    console.error("Error fetching wilayah details:", error);
                } finally {
                    setLoadingWilayah(false);
                }
            };

            loadWilayahDetails();
        }
    }, [data.kode_wilayah, selectedWilayah]);

    // Parse full address string into object
    const parseFullAddress = (fullAddress) => {
        if (!fullAddress) return null;

        const parts = fullAddress.split(", ").map((part) => part.trim());
        return {
            village: parts[0] || "",
            district: parts[1] || "",
            regency: parts[2] || "",
            province: parts[3] || "",
        };
    };

    // Helper function to get error message
    const getErrorMessage = (fieldName) => {
        if (!errors[fieldName]) return null;
        return Array.isArray(errors[fieldName])
            ? errors[fieldName][0]
            : errors[fieldName];
    };

    

    // Debug: Log errors to console
    React.useEffect(() => {
        console.log("Current errors:", errors);
        if (Object.keys(errors).length > 0) {
            console.log("Form errors detected:", errors);
        }
    }, [errors]);

    // Debug: Log form data
    React.useEffect(() => {
        console.log("Form data:", data);
    }, [data]);

    // Address loading is now handled by WilayahSearchableSelect components

    // Form submission is now handled by the Form component

    const handleAddPenjab = () => {
        setIsPenjabModalOpen(true);
    };

    const handlePenjabSuccess = () => {
        // Reload penjab options after successful creation
        const loadPenjabOptions = async () => {
            try {
                const response = await fetch("/api/penjab");
                if (response.ok) {
                    const result = await response.json();
                    const options = result.data.map((penjab) => ({
                        value: penjab.kd_pj,
                        label: penjab.png_jawab,
                    }));
                    setPenjabOptions(options);
                }
            } catch (error) {
                console.error("Error loading penjab options:", error);
            }
        };

        loadPenjabOptions();
    };

    // Form untuk tambah Perusahaan Pasien
    const perusahaanPasienForm = useForm({
        kode_perusahaan: "",
        nama_perusahaan: "",
        alamat: "",
        kota: "",
        no_telp: "",
    });

    useEffect(() => {
        const loadNextKodePerusahaan = async () => {
            const computeFromList = async () => {
                try {
                    const r = await fetch("/api/perusahaan-pasien", {
                        credentials: "include",
                    });
                    if (!r.ok) return;
                    const j = await r.json();
                    const arr = Array.isArray(j?.data) ? j.data : [];
                    let max = 0;
                    for (const d of arr) {
                        const code = String(
                            d?.value ?? d?.kode_perusahaan ?? ""
                        );
                        const m = code.match(/^I(\d{4})$/);
                        if (m) {
                            const n = parseInt(m[1], 10);
                            if (n > max) max = n;
                        }
                    }
                    const next = "I" + String(max + 1).padStart(4, "0");
                    perusahaanPasienForm.setData("kode_perusahaan", next);
                } catch {}
            };
            try {
                const res = await fetch("/api/perusahaan-pasien/next-code", {
                    credentials: "include",
                });
                if (!res.ok) {
                    await computeFromList();
                    return;
                }
                const json = await res.json();
                if (json?.next_code) {
                    perusahaanPasienForm.setData(
                        "kode_perusahaan",
                        json.next_code
                    );
                } else {
                    await computeFromList();
                }
            } catch {
                await computeFromList();
            }
        };
        if (showPerusahaanPasienModal) {
            loadNextKodePerusahaan();
        }
    }, [showPerusahaanPasienModal]);

    // Form untuk tambah Bahasa Pasien
    const bahasaPasienForm = useForm({
        nama_bahasa: "",
    });

    // Form untuk tambah Suku Bangsa
    const sukuBangsaForm = useForm({
        nama_suku_bangsa: "",
    });

    // Form untuk tambah Cacat Fisik
    const cacatFisikForm = useForm({
        nama_cacat: "",
    });

    // Handler untuk submit popup Perusahaan Pasien
    const handleTambahPerusahaanPasien = (e) => {
        e.preventDefault();
        perusahaanPasienForm.post(route("perusahaan-pasien.store"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page) => {
                // Cek apakah ada data yang baru dibuat dari flash message
                const createdData = page.props.flash?.perusahaanPasienCreated;
                if (createdData) {
                    const newKode = createdData.kode_perusahaan;
                    const newNama = createdData.nama_perusahaan;
                    if (newKode) {
                        // Set value ke form utama
                        setData("perusahaan_pasien", newKode);

                        // Tambahkan ke options dropdown
                        const newOption = {
                            value: newKode,
                            label: `${newKode} - ${newNama}`,
                        };
                        setPerusahaanOptions((prev) => {
                            // Cek apakah sudah ada, jika belum tambahkan
                            const exists = prev.find(
                                (opt) => opt.value === newKode
                            );
                            if (!exists) {
                                return [...prev, newOption];
                            }
                            return prev;
                        });
                    }
                } else {
                    // Fallback: gunakan data dari form
                    const newKode = perusahaanPasienForm.data.kode_perusahaan;
                    if (newKode) {
                        setData("perusahaan_pasien", newKode);
                        const newOption = {
                            value: newKode,
                            label: `${newKode} - ${perusahaanPasienForm.data.nama_perusahaan}`,
                        };
                        setPerusahaanOptions((prev) => {
                            const exists = prev.find(
                                (opt) => opt.value === newKode
                            );
                            if (!exists) {
                                return [...prev, newOption];
                            }
                            return prev;
                        });
                    }
                }

                // Tutup modal dan reset form
                setShowPerusahaanPasienModal(false);
                perusahaanPasienForm.reset();

                // Reload perusahaan options dari API
                const loadPerusahaanOptions = async () => {
                    try {
                        const response = await fetch("/api/perusahaan-pasien");
                        if (response.ok) {
                            const result = await response.json();
                            setPerusahaanOptions(
                                (result.data || []).map((d) => ({
                                    value: d.value,
                                    label: d.label,
                                }))
                            );
                        }
                    } catch (error) {
                        console.error(
                            "Error loading perusahaan options:",
                            error
                        );
                    }
                };
                loadPerusahaanOptions();
            },
            onError: () => {
                // Tetap buka modal jika ada error agar user bisa melihat error
                // Error akan otomatis ditampilkan oleh Inertia form
            },
        });
    };

    // Handler untuk submit popup Bahasa Pasien
    const handleTambahBahasaPasien = (e) => {
        e.preventDefault();
        bahasaPasienForm.post(route("bahasa-pasien.store"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page) => {
                // Cek apakah ada data yang baru dibuat dari flash message
                const createdData = page.props.flash?.bahasaPasienCreated;
                if (createdData) {
                    const newId = createdData.id;
                    const newNama = createdData.nama_bahasa;
                    if (newId) {
                        // Set value ke form utama
                        setData("bahasa_pasien", newId.toString());

                        // Tambahkan ke options dropdown
                        const newOption = {
                            value: newId.toString(),
                            label: newNama,
                        };
                        setBahasaOptions((prev) => {
                            // Cek apakah sudah ada, jika belum tambahkan
                            const exists = prev.find(
                                (opt) => opt.value === newId.toString()
                            );
                            if (!exists) {
                                return [...prev, newOption];
                            }
                            return prev;
                        });
                    }
                } else {
                    // Fallback: gunakan data dari form
                    const newNama = bahasaPasienForm.data.nama_bahasa;
                    if (newNama) {
                        // Untuk fallback, kita perlu mendapatkan ID dari server
                        // Tapi karena kita tidak punya ID, kita akan reload options
                    }
                }

                // Tutup modal dan reset form
                setShowBahasaPasienModal(false);
                bahasaPasienForm.reset();

                // Reload bahasa options dari API
                const loadBahasaOptions = async () => {
                    try {
                        const response = await fetch("/api/bahasa-pasien");
                        if (response.ok) {
                            const result = await response.json();
                            setBahasaOptions(
                                (result.data || []).map((d) => ({
                                    value: d.value,
                                    label: d.label,
                                }))
                            );
                            // Set value jika ada createdData
                            if (createdData && createdData.id) {
                                setData(
                                    "bahasa_pasien",
                                    createdData.id.toString()
                                );
                            }
                        }
                    } catch (error) {
                        console.error("Error loading bahasa options:", error);
                    }
                };
                loadBahasaOptions();
            },
            onError: () => {
                // Tetap buka modal jika ada error agar user bisa melihat error
                // Error akan otomatis ditampilkan oleh Inertia form
            },
        });
    };

    // Handler untuk submit popup Suku Bangsa
    const handleTambahSukuBangsa = (e) => {
        e.preventDefault();
        sukuBangsaForm.post(route("suku-bangsa.store"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page) => {
                // Cek apakah ada data yang baru dibuat dari flash message
                const createdData = page.props.flash?.sukuBangsaCreated;
                if (createdData) {
                    const newId = createdData.id;
                    const newNama = createdData.nama_suku_bangsa;
                    if (newId) {
                        // Set value ke form utama
                        setData("suku_bangsa", newId.toString());

                        // Tambahkan ke options dropdown
                        const newOption = {
                            value: newId.toString(),
                            label: newNama,
                        };
                        setSukuOptions((prev) => {
                            // Cek apakah sudah ada, jika belum tambahkan
                            const exists = prev.find(
                                (opt) => opt.value === newId.toString()
                            );
                            if (!exists) {
                                return [...prev, newOption];
                            }
                            return prev;
                        });
                    }
                } else {
                    // Fallback: gunakan data dari form
                    const newNama = sukuBangsaForm.data.nama_suku_bangsa;
                    if (newNama) {
                        // Untuk fallback, kita perlu mendapatkan ID dari server
                        // Tapi karena kita tidak punya ID, kita akan reload options
                    }
                }

                // Tutup modal dan reset form
                setShowSukuBangsaModal(false);
                sukuBangsaForm.reset();

                // Reload suku options dari API
                const loadSukuOptions = async () => {
                    try {
                        const response = await fetch("/api/suku-bangsa");
                        if (response.ok) {
                            const result = await response.json();
                            setSukuOptions(
                                (result.data || []).map((d) => ({
                                    value: d.value,
                                    label: d.label,
                                }))
                            );
                            // Set value jika ada createdData
                            if (createdData && createdData.id) {
                                setData(
                                    "suku_bangsa",
                                    createdData.id.toString()
                                );
                            }
                        }
                    } catch (error) {
                        console.error("Error loading suku options:", error);
                    }
                };
                loadSukuOptions();
            },
            onError: () => {
                // Tetap buka modal jika ada error agar user bisa melihat error
                // Error akan otomatis ditampilkan oleh Inertia form
            },
        });
    };

    // Handler untuk submit popup Cacat Fisik
    const handleTambahCacatFisik = (e) => {
        e.preventDefault();
        cacatFisikForm.post(route("cacat-fisik.store"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page) => {
                // Cek apakah ada data yang baru dibuat dari flash message
                const createdData = page.props.flash?.cacatFisikCreated;
                if (createdData) {
                    const newId = createdData.id;
                    const newNama = createdData.nama_cacat;
                    if (newId) {
                        // Set value ke form utama
                        setData("cacat_fisik", newId.toString());

                        // Tambahkan ke options dropdown
                        const newOption = {
                            value: newId.toString(),
                            label: newNama,
                        };
                        setCacatOptions((prev) => {
                            // Cek apakah sudah ada, jika belum tambahkan
                            const exists = prev.find(
                                (opt) => opt.value === newId.toString()
                            );
                            if (!exists) {
                                return [...prev, newOption];
                            }
                            return prev;
                        });
                    }
                } else {
                    // Fallback: gunakan data dari form
                    const newNama = cacatFisikForm.data.nama_cacat;
                    if (newNama) {
                        // Untuk fallback, kita perlu mendapatkan ID dari server
                        // Tapi karena kita tidak punya ID, kita akan reload options
                    }
                }

                // Tutup modal dan reset form
                setShowCacatFisikModal(false);
                cacatFisikForm.reset();

                // Reload cacat options dari API
                const loadCacatOptions = async () => {
                    try {
                        const response = await fetch("/api/cacat-fisik");
                        if (response.ok) {
                            const result = await response.json();
                            setCacatOptions(
                                (result.data || []).map((d) => ({
                                    value: d.value,
                                    label: d.label,
                                }))
                            );
                            // Set value jika ada createdData
                            if (createdData && createdData.id) {
                                setData(
                                    "cacat_fisik",
                                    createdData.id.toString()
                                );
                            }
                        }
                    } catch (error) {
                        console.error("Error loading cacat options:", error);
                    }
                };
                loadCacatOptions();
            },
            onError: () => {
                // Tetap buka modal jika ada error agar user bisa melihat error
                // Error akan otomatis ditampilkan oleh Inertia form
            },
        });
    };

    // Handle wilayah change - automatically set all address fields
    const handleWilayahChange = async (event) => {
        const value = event.target.value;
        setData("kode_wilayah", value);

        // If we have full address data from the selection, use it
        if (event.fullAddress) {
            setSelectedWilayah(parseFullAddress(event.fullAddress));
        } else if (value) {
            // Otherwise, fetch the full address data
            setLoadingWilayah(true);
            try {
                const response = await fetch(`/api/wilayah/${value}`);
                if (response.ok) {
                    const result = await response.json();
                    if (result.success) {
                        setSelectedWilayah(
                            parseFullAddress(result.data.full_address)
                        );
                    }
                }
            } catch (error) {
                console.error("Error fetching wilayah details:", error);
            } finally {
                setLoadingWilayah(false);
            }
        } else {
            setSelectedWilayah(null);
        }
    };

    const [isOpenModal, setIsOpenModal] = useState(true);
    const handleClose = () => {
        setIsOpenModal(false);
        router.get(route("patients.index"));
    };
    const handleSuccess = () => {
        setIsOpenModal(false);
        router.get(route("patients.index"));
    };

    return (
        <LanjutanRegistrasiLayout
            title="Registrasi Pasien"
            menuConfig={{ activeTab: "pasien" }}
        >
            <Head title="Tambah Pasien" />
            <PatientCreateModal
                isOpen={isOpenModal}
                onClose={handleClose}
                onSuccess={handleSuccess}
            />

            {isOpenModal ? null : (
                <motion.div
                    className="py-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 min-h-screen"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <div className="max-w-[98%] mx-auto px-2 sm:px-4">
                        {/* Header */}
                        <motion.div
                            variants={itemVariants}
                            className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 p-4 mb-6"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10" />
                            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <motion.div
                                        className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.2,
                                        }}
                                    >
                                        <UserPlus className="w-5 h-5 text-white" />
                                    </motion.div>
                                    <div>
                                        <motion.h1 className="text-2xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                            Tambah Pasien Baru
                                        </motion.h1>
                                    </div>
                                </div>
                                <Link
                                    href={route("patients.index")}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all duration-200 text-sm"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Kembali
                                </Link>
                            </div>
                        </motion.div>

                        {/* Form */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const missing = [];
                                if (!String(data.nm_pasien || "").trim()) missing.push("Nama Lengkap");
                                if (!String(data.jk || "").trim()) missing.push("Jenis Kelamin");
                                if (!String(data.tmp_lahir || "").trim()) missing.push("Tempat Lahir");
                                if (!String(data.tgl_lahir || "").trim()) missing.push("Tanggal Lahir");
                                if (!String(data.alamat || "").trim()) missing.push("Alamat");
                                if (!String(data.no_tlp || "").trim()) missing.push("No. Telepon");
                                if (!String(data.kode_wilayah || "").trim()) missing.push("Kelurahan/Desa");
                                const pj = String(data.perusahaan_pasien ?? "");
                                if (!pj || pj === "-" || pj === "0") missing.push("Perusahaan Pasien");
                                if (!String(data.pnd ?? "").trim()) missing.push("Pendidikan");
                                if (!String(data.suku_bangsa ?? "").trim()) missing.push("Suku Bangsa");
                                if (!String(data.bahasa_pasien ?? "").trim()) missing.push("Bahasa Pasien");
                                if (!String(data.cacat_fisik ?? "").trim()) missing.push("Cacat Fisik");
                                if (missing.length) {
                                    alert(
                                        "Field wajib bertanda * belum diisi:\n- " +
                                            missing.join("\n- ")
                                    );
                                    return;
                                }
                                post(route("patients.store"));
                            }}
                            className="space-y-6"
                        >
                            {/* Basic Information */}
                            <motion.div
                                variants={itemVariants}
                                className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 mb-8"
                            >
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                                <div className="relative px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        <motion.div
                                            className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md"
                                            whileHover={{
                                                rotate: 90,
                                                scale: 1.1,
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <UserPlus className="w-4 h-4 text-white" />
                                        </motion.div>
                                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                            Informasi Dasar
                                        </span>
                                    </h3>
                                </div>
                                <div className="relative p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                                Nama Lengkap *
                                            </label>
                                            <input
                                                type="text"
                                                name="nm_pasien"
                                                value={data.nm_pasien}
                                                onChange={(e) =>
                                                    setData(
                                                        "nm_pasien",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-4 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:bg-gray-700/80 dark:text-white backdrop-blur-sm transition-all duration-200"
                                                placeholder="Masukkan nama lengkap"
                                            />
                                            {getErrorMessage("nm_pasien") && (
                                                <motion.p
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
                                                >
                                                    <Info className="w-3 h-3" />
                                                    {getErrorMessage(
                                                        "nm_pasien"
                                                    )}
                                                </motion.p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                NIK
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="no_ktp"
                                                    value={data.no_ktp}
                                                    onChange={(e) => {
                                                        // Only allow numbers and limit to 16 characters
                                                        const value =
                                                            e.target.value
                                                                .replace(
                                                                    /[^0-9]/g,
                                                                    ""
                                                                )
                                                                .slice(0, 16);
                                                        setData(
                                                            "no_ktp",
                                                            value
                                                        );
                                                    }}
                                                    className="w-full px-3 py-2 pr-16 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                    placeholder="Masukkan NIK (16 digit)"
                                                    maxLength="16"
                                                />
                                                <div
                                                    className={`absolute inset-y-0 right-0 flex items-center pr-3 text-xs font-medium ${
                                                        data.no_ktp.length ===
                                                        16
                                                            ? "text-green-600 dark:text-green-400"
                                                            : data.no_ktp
                                                                  .length > 0
                                                            ? "text-yellow-600 dark:text-yellow-400"
                                                            : "text-gray-400 dark:text-gray-500"
                                                    }`}
                                                >
                                                    {data.no_ktp.length}/16
                                                </div>
                                            </div>
                                            <div className="mt-1 flex items-center justify-between">
                                                <div>
                                                    {getErrorMessage(
                                                        "no_ktp"
                                                    ) && (
                                                        <p className="text-sm text-red-600">
                                                            {getErrorMessage(
                                                                "no_ktp"
                                                            )}
                                                        </p>
                                                    )}
                                                </div>
                                                <div
                                                    className={`text-xs ${
                                                        data.no_ktp.length ===
                                                        16
                                                            ? "text-green-600 dark:text-green-400"
                                                            : data.no_ktp
                                                                  .length > 0
                                                            ? "text-yellow-600 dark:text-yellow-400"
                                                            : "text-gray-400 dark:text-gray-500"
                                                    }`}
                                                >
                                                    {data.no_ktp.length ===
                                                    16 ? (
                                                        <div className="flex items-center gap-1">
                                                            <svg
                                                                className="w-3 h-3"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                            NIK lengkap
                                                        </div>
                                                    ) : data.no_ktp.length >
                                                      0 ? (
                                                        <span>
                                                            Kurang{" "}
                                                            {16 -
                                                                data.no_ktp
                                                                    .length}{" "}
                                                            digit
                                                        </span>
                                                    ) : (
                                                        <span>
                                                            NIK harus 16 digit
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Jenis Kelamin *
                                            </label>
                                            <select
                                                name="jk"
                                                value={data.jk}
                                                onChange={(e) =>
                                                    setData(
                                                        "jk",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            >
                                                <option value="L">
                                                    Laki-laki
                                                </option>
                                                <option value="P">
                                                    Perempuan
                                                </option>
                                            </select>
                                            {getErrorMessage("jk") && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {getErrorMessage("jk")}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Tempat Lahir *
                                            </label>
                                            <input
                                                type="text"
                                                name="tmp_lahir"
                                                value={data.tmp_lahir}
                                                onChange={(e) =>
                                                    setData(
                                                        "tmp_lahir",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                placeholder="Masukkan tempat lahir"
                                            />
                                            {getErrorMessage("tmp_lahir") && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {getErrorMessage(
                                                        "tmp_lahir"
                                                    )}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Tanggal Lahir *
                                            </label>
                                            <input
                                                type="date"
                                                name="tgl_lahir"
                                                value={data.tgl_lahir}
                                                onChange={(e) =>
                                                    setData(
                                                        "tgl_lahir",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            />
                                            {getErrorMessage("tgl_lahir") && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {getErrorMessage(
                                                        "tgl_lahir"
                                                    )}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Nama Ibu *
                                            </label>
                                            <input
                                                type="text"
                                                name="nm_ibu"
                                                value={data.nm_ibu}
                                                onChange={(e) =>
                                                    setData(
                                                        "nm_ibu",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                placeholder="Masukkan nama ibu"
                                            />
                                            {getErrorMessage("nm_ibu") && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {getErrorMessage("nm_ibu")}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Contact Information */}
                            <motion.div
                                variants={itemVariants}
                                className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 mb-8"
                            >
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                                <div className="relative px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        <motion.div
                                            className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md"
                                            whileHover={{
                                                rotate: 90,
                                                scale: 1.1,
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Info className="w-4 h-4 text-white" />
                                        </motion.div>
                                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                            Informasi Kontak
                                        </span>
                                    </h3>
                                </div>
                                <div className="relative p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Alamat *
                                            </label>
                                            <textarea
                                                name="alamat"
                                                value={data.alamat}
                                                onChange={(e) =>
                                                    setData(
                                                        "alamat",
                                                        e.target.value
                                                    )
                                                }
                                                rows={3}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                placeholder="Masukkan alamat lengkap"
                                            />
                                            {getErrorMessage("alamat") && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {getErrorMessage("alamat")}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                No. Telepon
                                            </label>
                                            <input
                                                type="text"
                                                name="no_tlp"
                                                value={data.no_tlp}
                                                onChange={(e) =>
                                                    setData(
                                                        "no_tlp",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                placeholder="Masukkan nomor telepon"
                                            />
                                            {getErrorMessage("no_tlp") && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {getErrorMessage("no_tlp")}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                placeholder="Masukkan email"
                                            />
                                            {getErrorMessage("email") && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {getErrorMessage("email")}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Additional Information */}
                            <motion.div
                                variants={itemVariants}
                                className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 mb-8"
                            >
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                                <div className="relative px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        <motion.div
                                            className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md"
                                            whileHover={{
                                                rotate: 90,
                                                scale: 1.1,
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Info className="w-4 h-4 text-white" />
                                        </motion.div>
                                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                            Informasi Tambahan
                                        </span>
                                    </h3>
                                </div>
                                <div className="relative p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Golongan Darah
                                            </label>
                                            <select
                                                name="gol_darah"
                                                value={data.gol_darah}
                                                onChange={(e) =>
                                                    setData(
                                                        "gol_darah",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            >
                                                <option value="">
                                                    Pilih Golongan Darah
                                                </option>
                                                <option value="A">A</option>
                                                <option value="B">B</option>
                                                <option value="O">O</option>
                                                <option value="AB">AB</option>
                                                <option value="-">
                                                    Tidak Diketahui
                                                </option>
                                            </select>
                                            {getErrorMessage("gol_darah") && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {getErrorMessage(
                                                        "gol_darah"
                                                    )}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Status Perkawinan
                                            </label>
                                            <select
                                                name="stts_nikah"
                                                value={data.stts_nikah}
                                                onChange={(e) =>
                                                    setData(
                                                        "stts_nikah",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            >
                                                <option value="BELUM MENIKAH">
                                                    Belum Menikah
                                                </option>
                                                <option value="MENIKAH">
                                                    Menikah
                                                </option>
                                                <option value="JANDA">
                                                    Janda
                                                </option>
                                                <option value="DUDHA">
                                                    Duda
                                                </option>
                                                <option value="JOMBLO">
                                                    Jomblo
                                                </option>
                                            </select>
                                            {getErrorMessage("stts_nikah") && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {getErrorMessage(
                                                        "stts_nikah"
                                                    )}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Agama
                                            </label>
                                            <input
                                                type="text"
                                                name="agama"
                                                value={data.agama}
                                                onChange={(e) =>
                                                    setData(
                                                        "agama",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                placeholder="Masukkan agama"
                                            />
                                            {getErrorMessage("agama") && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {getErrorMessage("agama")}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Pekerjaan
                                            </label>
                                            <input
                                                type="text"
                                                name="pekerjaan"
                                                value={data.pekerjaan}
                                                onChange={(e) =>
                                                    setData(
                                                        "pekerjaan",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                placeholder="Masukkan pekerjaan"
                                            />
                                            {getErrorMessage("pekerjaan") && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {getErrorMessage(
                                                        "pekerjaan"
                                                    )}
                                                </p>
                                            )}
                                        </div>

                                        {/* Perusahaan Pasien: Textbox Pencarian + Dropdown (SearchableSelect) */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Perusahaan Pasien *
                                            </label>
                                            <div className="flex gap-2">
                                                <div className="flex-1">
                                                    <SearchableSelect
                                                        options={
                                                            perusahaanOptions
                                                        }
                                                        value={
                                                            data.perusahaan_pasien
                                                        }
                                                        onChange={(val) => {
                                                            setData(
                                                                "perusahaan_pasien",
                                                                val
                                                            );
                                                        }}
                                                        placeholder="Pilih atau cari perusahaan pasien"
                                                        searchPlaceholder="Ketik nama_perusahaan untuk mencari..."
                                                        displayKey="label"
                                                        valueKey="value"
                                                        error={
                                                            !!getErrorMessage(
                                                                "perusahaan_pasien"
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowPerusahaanPasienModal(
                                                            true
                                                        )
                                                    }
                                                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                                                    title="Tambah Perusahaan Pasien Baru"
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
                                            {getErrorMessage(
                                                "perusahaan_pasien"
                                            ) && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {getErrorMessage(
                                                        "perusahaan_pasien"
                                                    )}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Pendidikan *
                                            </label>
                                            <select
                                                name="pnd"
                                                value={data.pnd}
                                                onChange={(e) =>
                                                    setData(
                                                        "pnd",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            >
                                                <option value="TS">
                                                    Tidak Sekolah
                                                </option>
                                                <option value="TK">
                                                    Taman Kanak-kanak
                                                </option>
                                                <option value="SD">
                                                    Sekolah Dasar
                                                </option>
                                                <option value="SMP">
                                                    Sekolah Menengah Pertama
                                                </option>
                                                <option value="SMA">
                                                    Sekolah Menengah Atas
                                                </option>
                                                <option value="SLTA/SEDERAJAT">
                                                    SLTA/Sederajat
                                                </option>
                                                <option value="D1">
                                                    Diploma 1
                                                </option>
                                                <option value="D2">
                                                    Diploma 2
                                                </option>
                                                <option value="D3">
                                                    Diploma 3
                                                </option>
                                                <option value="D4">
                                                    Diploma 4
                                                </option>
                                                <option value="S1">
                                                    Sarjana
                                                </option>
                                                <option value="S2">
                                                    Magister
                                                </option>
                                                <option value="S3">
                                                    Doktor
                                                </option>
                                                <option value="-">
                                                    Tidak Diketahui
                                                </option>
                                            </select>
                                            {getErrorMessage("pnd") && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {getErrorMessage("pnd")}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                No. Peserta
                                            </label>
                                            <input
                                                type="text"
                                                name="no_peserta"
                                                value={data.no_peserta}
                                                onChange={(e) =>
                                                    setData(
                                                        "no_peserta",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                placeholder="Masukkan nomor peserta BPJS/Asuransi"
                                            />
                                            {getErrorMessage("no_peserta") && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {getErrorMessage(
                                                        "no_peserta"
                                                    )}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Family Information */}
                            <motion.div
                                variants={itemVariants}
                                className="relative overflow-visible rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 mb-8"
                                style={{ zIndex: 100 }}
                            >
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                                <div className="relative px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        <motion.div
                                            className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md"
                                            whileHover={{
                                                rotate: 90,
                                                scale: 1.1,
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <UserPlus className="w-4 h-4 text-white" />
                                        </motion.div>
                                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                            Informasi Keluarga
                                        </span>
                                    </h3>
                                </div>
                                <div
                                    className="relative p-8"
                                    style={{ overflow: "visible" }}
                                >
                                    <div
                                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                        style={{ overflow: "visible" }}
                                    >
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Hubungan Keluarga
                                            </label>
                                            <select
                                                name="keluarga"
                                                value={data.keluarga}
                                                onChange={(e) =>
                                                    setData(
                                                        "keluarga",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            >
                                                <option value="AYAH">
                                                    Ayah
                                                </option>
                                                <option value="IBU">Ibu</option>
                                                <option value="ISTRI">
                                                    Istri
                                                </option>
                                                <option value="SUAMI">
                                                    Suami
                                                </option>
                                                <option value="SAUDARA">
                                                    Saudara
                                                </option>
                                                <option value="ANAK">
                                                    Anak
                                                </option>
                                                <option value="DIRI SENDIRI">
                                                    Diri Sendiri
                                                </option>
                                                <option value="LAIN-LAIN">
                                                    Lain-lain
                                                </option>
                                            </select>
                                            {getErrorMessage("keluarga") && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {getErrorMessage(
                                                        "keluarga"
                                                    )}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Nama Keluarga *
                                            </label>
                                            <input
                                                type="text"
                                                name="namakeluarga"
                                                value={data.namakeluarga}
                                                onChange={(e) =>
                                                    setData(
                                                        "namakeluarga",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                placeholder="Masukkan nama keluarga"
                                            />
                                            {getErrorMessage(
                                                "namakeluarga"
                                            ) && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {getErrorMessage(
                                                        "namakeluarga"
                                                    )}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Pekerjaan Keluarga *
                                            </label>
                                            <input
                                                type="text"
                                                name="pekerjaanpj"
                                                value={data.pekerjaanpj}
                                                onChange={(e) =>
                                                    setData(
                                                        "pekerjaanpj",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                placeholder="Masukkan pekerjaan keluarga"
                                            />
                                            {getErrorMessage("pekerjaanpj") && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {getErrorMessage(
                                                        "pekerjaanpj"
                                                    )}
                                                </p>
                                            )}
                                        </div>

                                        <SelectWithAdd
                                            label="Penanggung Jawab"
                                            name="kd_pj"
                                            value={data.kd_pj}
                                            onChange={(e) =>
                                                setData("kd_pj", e.target.value)
                                            }
                                            options={penjabOptions}
                                            placeholder="Pilih penanggung jawab"
                                            error={getErrorMessage("kd_pj")}
                                            required={true}
                                            onAdd={handleAddPenjab}
                                            addButtonText="Tambah Penjab"
                                        />

                                        <div className="md:col-span-2">
                                            <div className="flex items-center justify-between mb-2">
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Alamat Keluarga *
                                                </label>
                                                <label className="inline-flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300">
                                                    <input
                                                        type="checkbox"
                                                        checked={usePatientAddress}
                                                        onChange={(e) => setUsePatientAddress(e.target.checked)}
                                                    />
                                                    Salin dari alamat pasien
                                                </label>
                                            </div>
                                            <textarea
                                                name="alamatpj"
                                                value={data.alamatpj}
                                                onChange={(e) =>
                                                    setData(
                                                        "alamatpj",
                                                        e.target.value
                                                    )
                                                }
                                                rows={3}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                placeholder="Masukkan alamat keluarga"
                                            />
                                            {getErrorMessage("alamatpj") && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {getErrorMessage(
                                                        "alamatpj"
                                                    )}
                                                </p>
                                            )}
                                        </div>

                                        <div
                                            className="relative"
                                            style={{ zIndex: 10000 }}
                                        >
                                            <WilayahSearchableSelect
                                                label="Pilih Kelurahan/Desa"
                                                name="kode_wilayah"
                                                value={data.kode_wilayah}
                                                onChange={handleWilayahChange}
                                                level="village"
                                                placeholder="Pilih atau cari kelurahan/desa"
                                                error={getErrorMessage(
                                                    "kode_wilayah"
                                                )}
                                                required={true}
                                                searchPlaceholder="Ketik nama kelurahan/desa..."
                                                noOptionsText="Tidak ada kelurahan/desa ditemukan"
                                                loadingText="Memuat data kelurahan/desa..."
                                            />
                                        </div>

                                        {/* Address Display */}
                                        <AddressDisplay
                                            selectedWilayah={selectedWilayah}
                                            loading={loadingWilayah}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Referensi Tambahan (Perusahaan, Suku Bangsa, Bahasa, Cacat Fisik, NIP) */}
                            <motion.div
                                variants={itemVariants}
                                className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 mb-8"
                                style={{ zIndex: 0 }}
                            >
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                                <div className="relative px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        <motion.div
                                            className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md"
                                            whileHover={{
                                                rotate: 90,
                                                scale: 1.1,
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Info className="w-4 h-4 text-white" />
                                        </motion.div>
                                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                            Informasi Administrasi
                                        </span>
                                    </h3>
                                </div>
                                <div className="relative p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                                        {/* Suku Bangsa: Dropdown dengan Popup */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Suku Bangsa *
                                            </label>
                                            <div className="flex gap-2">
                                                <div className="flex-1">
                                                    <SearchableSelect
                                                        options={sukuOptions}
                                                        value={data.suku_bangsa}
                                                        onChange={(val) => {
                                                            setData(
                                                                "suku_bangsa",
                                                                val
                                                            );
                                                        }}
                                                        placeholder="Pilih suku bangsa"
                                                        error={
                                                            !!getErrorMessage(
                                                                "suku_bangsa"
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowSukuBangsaModal(
                                                            true
                                                        )
                                                    }
                                                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                                                    title="Tambah Suku Bangsa Baru"
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
                                            {getErrorMessage("suku_bangsa") && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {getErrorMessage(
                                                        "suku_bangsa"
                                                    )}
                                                </p>
                                            )}
                                        </div>

                                        {/* Bahasa Pasien: Dropdown dengan Popup */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Bahasa Pasien *
                                            </label>
                                            <div className="flex gap-2">
                                                <div className="flex-1">
                                                    <SearchableSelect
                                                        options={bahasaOptions}
                                                        value={
                                                            data.bahasa_pasien
                                                        }
                                                        onChange={(val) => {
                                                            setData(
                                                                "bahasa_pasien",
                                                                val
                                                            );
                                                        }}
                                                        placeholder="Pilih bahasa pasien"
                                                        error={
                                                            !!getErrorMessage(
                                                                "bahasa_pasien"
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowBahasaPasienModal(
                                                            true
                                                        )
                                                    }
                                                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                                                    title="Tambah Bahasa Pasien Baru"
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
                                            {getErrorMessage(
                                                "bahasa_pasien"
                                            ) && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {getErrorMessage(
                                                        "bahasa_pasien"
                                                    )}
                                                </p>
                                            )}
                                        </div>

                                        {/* Cacat Fisik: Dropdown dengan Popup */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Cacat Fisik *
                                            </label>
                                            <div className="flex gap-2">
                                                <div className="flex-1">
                                                    <SearchableSelect
                                                        options={cacatOptions}
                                                        value={data.cacat_fisik}
                                                        onChange={(val) => {
                                                            setData(
                                                                "cacat_fisik",
                                                                val
                                                            );
                                                        }}
                                                        placeholder="Pilih cacat fisik"
                                                        error={
                                                            !!getErrorMessage(
                                                                "cacat_fisik"
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowCacatFisikModal(
                                                            true
                                                        )
                                                    }
                                                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                                                    title="Tambah Cacat Fisik Baru"
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
                                            {getErrorMessage("cacat_fisik") && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {getErrorMessage(
                                                        "cacat_fisik"
                                                    )}
                                                </p>
                                            )}
                                        </div>

                                        {/* NIP (opsional) */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                NIP
                                            </label>
                                            <input
                                                type="text"
                                                name="nip"
                                                value={data.nip}
                                                onChange={(e) =>
                                                    setData(
                                                        "nip",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                placeholder="Masukkan NIP (opsional)"
                                            />
                                            {getErrorMessage("nip") && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {getErrorMessage("nip")}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Submit Button */}
                            <motion.div
                                variants={itemVariants}
                                className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5"
                            >
                                <div className="relative p-8">
                                    <div className="flex justify-end gap-4">
                                        <Link
                                            href={route("patients.index")}
                                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all duration-200"
                                        >
                                            Batal
                                        </Link>
                                        <motion.button
                                            type="submit"
                                            disabled={processing}
                                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                            whileHover={{
                                                scale: processing ? 1 : 1.02,
                                            }}
                                            whileTap={{
                                                scale: processing ? 1 : 0.98,
                                            }}
                                        >
                                            {processing ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    Menyimpan...
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle2 className="w-4 h-4" />
                                                    Simpan
                                                </>
                                            )}
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        </form>

                        {/* Penjab Create Modal */}
                        <PenjabCreateModal
                            isOpen={isPenjabModalOpen}
                            onClose={() => setIsPenjabModalOpen(false)}
                            onSuccess={handlePenjabSuccess}
                        />

                        {/* Modal Tambah Perusahaan Pasien */}
                        {showPerusahaanPasienModal && (
                            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700">
                                    <div className="p-6">
                                        {/* Header */}
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                Tambah Perusahaan Pasien Baru
                                            </h3>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowPerusahaanPasienModal(
                                                        false
                                                    );
                                                    perusahaanPasienForm.reset();
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
                                                    <line
                                                        x1="18"
                                                        y1="6"
                                                        x2="6"
                                                        y2="18"
                                                    ></line>
                                                    <line
                                                        x1="6"
                                                        y1="6"
                                                        x2="18"
                                                        y2="18"
                                                    ></line>
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Form */}
                                        <form
                                            onSubmit={
                                                handleTambahPerusahaanPasien
                                            }
                                            className="space-y-4"
                                        >
                                            {/* Kode Perusahaan */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Kode Perusahaan *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={
                                                        perusahaanPasienForm
                                                            .data
                                                            .kode_perusahaan
                                                    }
                                                    onChange={(e) =>
                                                        perusahaanPasienForm.setData(
                                                            "kode_perusahaan",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                    placeholder="Masukkan kode perusahaan"
                                                    maxLength="8"
                                                    required
                                                />
                                                {perusahaanPasienForm.errors
                                                    .kode_perusahaan && (
                                                    <p className="mt-1 text-sm text-red-600">
                                                        {
                                                            perusahaanPasienForm
                                                                .errors
                                                                .kode_perusahaan
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            {/* Nama Perusahaan */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Nama Perusahaan *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={
                                                        perusahaanPasienForm
                                                            .data
                                                            .nama_perusahaan
                                                    }
                                                    onChange={(e) =>
                                                        perusahaanPasienForm.setData(
                                                            "nama_perusahaan",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                    placeholder="Masukkan nama perusahaan"
                                                    maxLength="70"
                                                    required
                                                />
                                                {perusahaanPasienForm.errors
                                                    .nama_perusahaan && (
                                                    <p className="mt-1 text-sm text-red-600">
                                                        {
                                                            perusahaanPasienForm
                                                                .errors
                                                                .nama_perusahaan
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            {/* Alamat */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Alamat
                                                </label>
                                                <textarea
                                                    value={
                                                        perusahaanPasienForm
                                                            .data.alamat
                                                    }
                                                    onChange={(e) =>
                                                        perusahaanPasienForm.setData(
                                                            "alamat",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                                                    placeholder="Masukkan alamat perusahaan"
                                                    rows="3"
                                                    maxLength="100"
                                                />
                                                {perusahaanPasienForm.errors
                                                    .alamat && (
                                                    <p className="mt-1 text-sm text-red-600">
                                                        {
                                                            perusahaanPasienForm
                                                                .errors.alamat
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            {/* Kota */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Kota
                                                </label>
                                                <input
                                                    type="text"
                                                    value={
                                                        perusahaanPasienForm
                                                            .data.kota
                                                    }
                                                    onChange={(e) =>
                                                        perusahaanPasienForm.setData(
                                                            "kota",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                    placeholder="Masukkan kota"
                                                    maxLength="40"
                                                />
                                                {perusahaanPasienForm.errors
                                                    .kota && (
                                                    <p className="mt-1 text-sm text-red-600">
                                                        {
                                                            perusahaanPasienForm
                                                                .errors.kota
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            {/* No. Telepon */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    No. Telepon
                                                </label>
                                                <input
                                                    type="text"
                                                    value={
                                                        perusahaanPasienForm
                                                            .data.no_telp
                                                    }
                                                    onChange={(e) =>
                                                        perusahaanPasienForm.setData(
                                                            "no_telp",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                    placeholder="Masukkan nomor telepon"
                                                    maxLength="27"
                                                />
                                                {perusahaanPasienForm.errors
                                                    .no_telp && (
                                                    <p className="mt-1 text-sm text-red-600">
                                                        {
                                                            perusahaanPasienForm
                                                                .errors.no_telp
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            {/* Actions */}
                                            <div className="flex justify-end gap-3 pt-4">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setShowPerusahaanPasienModal(
                                                            false
                                                        );
                                                        perusahaanPasienForm.reset();
                                                    }}
                                                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                                >
                                                    Batal
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={
                                                        perusahaanPasienForm.processing
                                                    }
                                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
                                                >
                                                    {perusahaanPasienForm.processing
                                                        ? "Menyimpan..."
                                                        : "Simpan"}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Modal Tambah Bahasa Pasien */}
                        {showBahasaPasienModal && (
                            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700">
                                    <div className="p-6">
                                        {/* Header */}
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                Tambah Bahasa Pasien Baru
                                            </h3>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowBahasaPasienModal(
                                                        false
                                                    );
                                                    bahasaPasienForm.reset();
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
                                                    <line
                                                        x1="18"
                                                        y1="6"
                                                        x2="6"
                                                        y2="18"
                                                    ></line>
                                                    <line
                                                        x1="6"
                                                        y1="6"
                                                        x2="18"
                                                        y2="18"
                                                    ></line>
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Form */}
                                        <form
                                            onSubmit={handleTambahBahasaPasien}
                                            className="space-y-4"
                                        >
                                            {/* Nama Bahasa */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Nama Bahasa *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={
                                                        bahasaPasienForm.data
                                                            .nama_bahasa
                                                    }
                                                    onChange={(e) =>
                                                        bahasaPasienForm.setData(
                                                            "nama_bahasa",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                    placeholder="Masukkan nama bahasa"
                                                    maxLength="30"
                                                    required
                                                />
                                                {bahasaPasienForm.errors
                                                    .nama_bahasa && (
                                                    <p className="mt-1 text-sm text-red-600">
                                                        {
                                                            bahasaPasienForm
                                                                .errors
                                                                .nama_bahasa
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            {/* Actions */}
                                            <div className="flex justify-end gap-3 pt-4">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setShowBahasaPasienModal(
                                                            false
                                                        );
                                                        bahasaPasienForm.reset();
                                                    }}
                                                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                                >
                                                    Batal
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={
                                                        bahasaPasienForm.processing
                                                    }
                                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
                                                >
                                                    {bahasaPasienForm.processing
                                                        ? "Menyimpan..."
                                                        : "Simpan"}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Modal Tambah Suku Bangsa */}
                        {showSukuBangsaModal && (
                            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700">
                                    <div className="p-6">
                                        {/* Header */}
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                Tambah Suku Bangsa Baru
                                            </h3>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowSukuBangsaModal(
                                                        false
                                                    );
                                                    sukuBangsaForm.reset();
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
                                                    <line
                                                        x1="18"
                                                        y1="6"
                                                        x2="6"
                                                        y2="18"
                                                    ></line>
                                                    <line
                                                        x1="6"
                                                        y1="6"
                                                        x2="18"
                                                        y2="18"
                                                    ></line>
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Form */}
                                        <form
                                            onSubmit={handleTambahSukuBangsa}
                                            className="space-y-4"
                                        >
                                            {/* Nama Suku Bangsa */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Nama Suku Bangsa *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={
                                                        sukuBangsaForm.data
                                                            .nama_suku_bangsa
                                                    }
                                                    onChange={(e) =>
                                                        sukuBangsaForm.setData(
                                                            "nama_suku_bangsa",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                    placeholder="Masukkan nama suku bangsa"
                                                    maxLength="30"
                                                    required
                                                />
                                                {sukuBangsaForm.errors
                                                    .nama_suku_bangsa && (
                                                    <p className="mt-1 text-sm text-red-600">
                                                        {
                                                            sukuBangsaForm
                                                                .errors
                                                                .nama_suku_bangsa
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            {/* Actions */}
                                            <div className="flex justify-end gap-3 pt-4">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setShowSukuBangsaModal(
                                                            false
                                                        );
                                                        sukuBangsaForm.reset();
                                                    }}
                                                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                                >
                                                    Batal
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={
                                                        sukuBangsaForm.processing
                                                    }
                                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
                                                >
                                                    {sukuBangsaForm.processing
                                                        ? "Menyimpan..."
                                                        : "Simpan"}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Modal Tambah Cacat Fisik */}
                        {showCacatFisikModal && (
                            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700">
                                    <div className="p-6">
                                        {/* Header */}
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                Tambah Cacat Fisik Baru
                                            </h3>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowCacatFisikModal(
                                                        false
                                                    );
                                                    cacatFisikForm.reset();
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
                                                    <line
                                                        x1="18"
                                                        y1="6"
                                                        x2="6"
                                                        y2="18"
                                                    ></line>
                                                    <line
                                                        x1="6"
                                                        y1="6"
                                                        x2="18"
                                                        y2="18"
                                                    ></line>
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Form */}
                                        <form
                                            onSubmit={handleTambahCacatFisik}
                                            className="space-y-4"
                                        >
                                            {/* Nama Cacat */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Nama Cacat Fisik *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={
                                                        cacatFisikForm.data
                                                            .nama_cacat
                                                    }
                                                    onChange={(e) =>
                                                        cacatFisikForm.setData(
                                                            "nama_cacat",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                    placeholder="Masukkan nama cacat fisik"
                                                    maxLength="30"
                                                    required
                                                />
                                                {cacatFisikForm.errors
                                                    .nama_cacat && (
                                                    <p className="mt-1 text-sm text-red-600">
                                                        {
                                                            cacatFisikForm
                                                                .errors
                                                                .nama_cacat
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            {/* Actions */}
                                            <div className="flex justify-end gap-3 pt-4">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setShowCacatFisikModal(
                                                            false
                                                        );
                                                        cacatFisikForm.reset();
                                                    }}
                                                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                                >
                                                    Batal
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={
                                                        cacatFisikForm.processing
                                                    }
                                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
                                                >
                                                    {cacatFisikForm.processing
                                                        ? "Menyimpan..."
                                                        : "Simpan"}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </LanjutanRegistrasiLayout>
    );
}
