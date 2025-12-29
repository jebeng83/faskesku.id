import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useForm } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { route } from "ziggy-js";
import SelectWithAdd from "@/Components/SelectWithAdd";
import SearchableSelect from "@/Components/SearchableSelect";
import PenjabCreateModal from "@/Components/PenjabCreateModal";
import WilayahSearchableSelect from "@/Components/WilayahSearchableSelect";
import AddressDisplay from "@/Components/AddressDisplay";
import Alert from "@/Components/Alert";
import {
    UserPlusIcon,
    IdentificationIcon,
    PhoneIcon,
    ClipboardDocumentListIcon,
    UserGroupIcon,
} from "@heroicons/react/24/outline";

export default function PatientCreateModal({ isOpen, onClose, onSuccess }) {
    const [penjabOptions, setPenjabOptions] = useState([]);
    const [isPenjabModalOpen, setIsPenjabModalOpen] = useState(false);
    const [selectedWilayah, setSelectedWilayah] = useState(null);
    const [loadingWilayah, setLoadingWilayah] = useState(false);
    const [isNoRMTouched, setIsNoRMTouched] = useState(false);
    const [isAutoNoRM, setIsAutoNoRM] = useState(true);
    const lastNoRMCheckedRef = useRef("");
    const noRMDuplicateRetryRef = useRef(0);
    const [perusahaanOptions, setPerusahaanOptions] = useState([]);
    const [sukuOptions, setSukuOptions] = useState([]);
    const [bahasaOptions, setBahasaOptions] = useState([]);
    const [cacatOptions, setCacatOptions] = useState([]);
    const [showBahasaPasienModal, setShowBahasaPasienModal] = useState(false);
    const bahasaPasienForm = useForm({ nama_bahasa: "" });
    const [showSukuBangsaModal, setShowSukuBangsaModal] = useState(false);
    const sukuBangsaForm = useForm({ nama_suku_bangsa: "" });
    const [showPerusahaanPasienModal, setShowPerusahaanPasienModal] =
        useState(false);
    const perusahaanPasienForm = useForm({
        kode_perusahaan: "",
        nama_perusahaan: "",
        alamat: "",
        kota: "",
        no_telp: "",
    });
    const [showCacatFisikModal, setShowCacatFisikModal] = useState(false);
    const cacatFisikForm = useForm({ nama_cacat: "" });
    const [pekerjaanOption, setPekerjaanOption] = useState("");
    const [pekerjaanOther, setPekerjaanOther] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertConfig, setAlertConfig] = useState({
        type: "success",
        title: "",
        message: "",
        autoClose: false,
    });

    const { data, setData, post, processing, errors, reset, transform } =
        useForm({
        no_rkm_medis: "",
        nm_pasien: "",
        no_ktp: "",
        jk: "L",
        tmp_lahir: "",
        tgl_lahir: "",
        nm_ibu: "",
        alamat: "",
        gol_darah: "",
        pekerjaan: "",
        stts_nikah: "",
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
        perusahaan_pasien: "-",
        suku_bangsa: 1,
        bahasa_pasien: 1,
        cacat_fisik: 1,
        nip: "",
    });

    const getSuggestedNoRM = async () => {
        const response = await axios.get("/api/pasien/next-no-rm");
        if (response.data && response.data.success) {
            return response.data.data;
        }
        return "";
    };

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const checkNoRMDuplicateAndOfferNext = async (value, { retrySubmit } = {}) => {
        const currentValue = String(value || "").trim();
        if (!currentValue) return { handled: false };
        if (lastNoRMCheckedRef.current === currentValue) return { handled: false };

        try {
            const existsRes = await axios.get("/api/pasien/exists-no-rm", {
                params: { no_rkm_medis: currentValue },
            });
            const exists = Boolean(existsRes?.data?.data?.exists);
            lastNoRMCheckedRef.current = currentValue;

            if (!exists) return { handled: false };

            const suggested = await getSuggestedNoRM();
            if (!suggested) return { handled: false };

            const ok = window.confirm(
                `No. RM ${currentValue} sudah digunakan.\n\nGunakan No. RM berikutnya: ${suggested}?`
            );

            if (!ok) return { handled: true, suggested: "" };

            setIsNoRMTouched(true);
            setData("no_rkm_medis", suggested);
            lastNoRMCheckedRef.current = suggested;

            if (retrySubmit) {
                return { handled: true, suggested };
            }

            return { handled: true, suggested };
        } catch (error) {
            console.error("Error checking No. RM:", error);
            return { handled: false };
        }
    };

    // Load next no_rkm_medis on component mount
    useEffect(() => {
        const fetchNextNoRM = async () => {
            try {
                const next = await getSuggestedNoRM();
                if (next) {
                    setData((prevData) => ({
                        ...prevData,
                        no_rkm_medis: next,
                    }));
                }
            } catch (error) {
                console.error("Error loading next No. RM:", error);
            }
        };

        if (isOpen) {
            reset();
            setSelectedWilayah(null);
            setPekerjaanOption("");
            setPekerjaanOther("");
            setIsNoRMTouched(false);
            setIsAutoNoRM(true);
            lastNoRMCheckedRef.current = "";
            noRMDuplicateRetryRef.current = 0;
            fetchNextNoRM();
        }
    }, [isOpen]);

    // Load penjab options on component mount
    useEffect(() => {
        const loadPenjabOptions = async () => {
            try {
                const response = await axios.get("/api/penjab");
                if (response.data && response.data.success) {
                    const result = response.data;
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

        if (isOpen) {
            loadPenjabOptions();
        }
    }, [isOpen]);

    // Load reference options (perusahaan pasien, suku bangsa, bahasa pasien, cacat fisik) when modal opens
    useEffect(() => {
        const loadRefs = async () => {
            try {
                const [perusahaanRes, sukuRes, bahasaRes, cacatRes] =
                    await Promise.all([
                        axios.get("/api/perusahaan-pasien"),
                        axios.get("/api/suku-bangsa"),
                        axios.get("/api/bahasa-pasien"),
                        axios.get("/api/cacat-fisik"),
                    ]);

                const perusahaanData = Array.isArray(perusahaanRes?.data?.data)
                    ? perusahaanRes.data.data
                    : [];
                const sukuData = Array.isArray(sukuRes?.data?.data)
                    ? sukuRes.data.data
                    : [];
                const bahasaData = Array.isArray(bahasaRes?.data?.data)
                    ? bahasaRes.data.data
                    : [];
                const cacatData = Array.isArray(cacatRes?.data?.data)
                    ? cacatRes.data.data
                    : [];

                setPerusahaanOptions(
                    perusahaanData.map((d) => ({
                        value: d.value,
                        label: d.label,
                    }))
                );
                setSukuOptions(
                    sukuData.map((d) => ({ value: d.value, label: d.label }))
                );
                setBahasaOptions(
                    bahasaData.map((d) => ({ value: d.value, label: d.label }))
                );
                setCacatOptions(
                    cacatData.map((d) => ({ value: d.value, label: d.label }))
                );
            } catch (e) {
                console.error("Error loading reference options:", e);
            }
        };
        if (isOpen) {
            loadRefs();
        }
    }, [isOpen]);

    // Prefill next kode perusahaan saat modal Perusahaan dibuka
    useEffect(() => {
        const loadNextKodePerusahaan = async () => {
            const computeFromList = async () => {
                try {
                    const r = await axios.get("/api/perusahaan-pasien");
                    const j = r.data;
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
                const res = await axios.get("/api/perusahaan-pasien/next-code");
                const json = res.data;
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

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            reset();
            setSelectedWilayah(null);
        }
    }, [isOpen, reset]);

    // Parse full address string into object
    const parseFullAddress = (fullAddress) => {
        if (!fullAddress) return null;

        const parts = fullAddress.split(", ").map((part) => part.trim());
        return {
            village: parts[3] || "",
            district: parts[2] || "",
            regency: parts[1] || "",
            province: parts[0] || "",
        };
    };

    // Helper function to get error message
    const getErrorMessage = (fieldName) => {
        if (!errors[fieldName]) return null;
        return Array.isArray(errors[fieldName])
            ? errors[fieldName][0]
            : errors[fieldName];
    };

    // Helper to get label from options
    const findLabelByValue = (options, value) => {
        if (!value) return "";
        const found = options.find((o) => o.value === value);
        return found ? found.label : "";
    };

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

    const handleCheckBpjsByNik = async () => {
        if (!data.no_ktp || data.no_ktp.length < 16) {
            setAlertConfig({
                type: "error",
                title: "Validasi",
                message: "NIK harus 16 digit",
                autoClose: false,
            });
            setShowAlert(true);
            return;
        }
        try {
            const response = await axios.get(
                `/pcare/api/peserta/nik?nik=${data.no_ktp}`
            );
            const resData = response.data.response || response.data;

            if (resData && (resData.noKartu || resData.nama)) {
                const peserta = resData;
                setData((prev) => ({
                    ...prev,
                    nm_pasien: peserta.nama || prev.nm_pasien,
                    no_peserta: peserta.noKartu || prev.no_peserta,
                    jk: peserta.sex === "L" ? "L" : "P",
                    tgl_lahir: peserta.tglLahir
                        ? peserta.tglLahir.split("-").reverse().join("-")
                        : prev.tgl_lahir,
                    no_tlp: peserta.noHP || prev.no_tlp,
                    gol_darah:
                        peserta.golDarah &&
                        ["A", "B", "O", "AB"].includes(peserta.golDarah)
                            ? peserta.golDarah
                            : prev.gol_darah,
                }));
                setAlertConfig({
                    type: "success",
                    title: "Data BPJS",
                    message: "Data ditemukan di BPJS",
                    autoClose: true,
                    autoCloseDelay: 1500,
                });
                setShowAlert(true);
            } else {
                setAlertConfig({
                    type: "info",
                    title: "BPJS",
                    message: "Data tidak ditemukan di BPJS",
                    autoClose: true,
                    autoCloseDelay: 1500,
                });
                setShowAlert(true);
            }
        } catch (error) {
            console.error("Error checking BPJS by NIK:", error);
            setAlertConfig({
                type: "error",
                title: "Gagal cek BPJS",
                message:
                    "Gagal cek BPJS: " +
                    (error.response?.data?.metaData?.message || error.message),
                autoClose: false,
            });
            setShowAlert(true);
        }
    };

    const handleCheckBpjsByNoKartu = async () => {
        if (!data.no_peserta) {
            setAlertConfig({
                type: "error",
                title: "Validasi",
                message: "Nomor peserta harus diisi",
                autoClose: false,
            });
            setShowAlert(true);
            return;
        }
        try {
            const response = await axios.get(
                `/pcare/api/peserta/${data.no_peserta}`
            );
            const resData = response.data.response || response.data;

            if (resData && (resData.noKartu || resData.nama)) {
                const peserta = resData;
                setData((prev) => ({
                    ...prev,
                    nm_pasien: peserta.nama || prev.nm_pasien,
                    no_ktp: peserta.noKTP || prev.no_ktp,
                    jk: peserta.sex === "L" ? "L" : "P",
                    tgl_lahir: peserta.tglLahir
                        ? peserta.tglLahir.split("-").reverse().join("-")
                        : prev.tgl_lahir,
                    no_tlp: peserta.noHP || prev.no_tlp,
                    gol_darah:
                        peserta.golDarah &&
                        ["A", "B", "O", "AB"].includes(peserta.golDarah)
                            ? peserta.golDarah
                            : prev.gol_darah,
                }));
                setAlertConfig({
                    type: "success",
                    title: "Data BPJS",
                    message: "Data ditemukan di BPJS",
                    autoClose: true,
                    autoCloseDelay: 1500,
                });
                setShowAlert(true);
            } else {
                setAlertConfig({
                    type: "info",
                    title: "BPJS",
                    message: "Data tidak ditemukan di BPJS",
                    autoClose: true,
                    autoCloseDelay: 1500,
                });
                setShowAlert(true);
            }
        } catch (error) {
            console.error("Error checking BPJS by No Kartu:", error);
            setAlertConfig({
                type: "error",
                title: "Gagal cek BPJS",
                message:
                    "Gagal cek BPJS: " +
                    (error.response?.data?.metaData?.message || error.message),
                autoClose: false,
            });
            setShowAlert(true);
        }
    };

    const handleTambahBahasaPasien = (e) => {
        e.preventDefault();
        bahasaPasienForm.post(route("bahasa-pasien.store"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page) => {
                const created = page?.props?.flash?.bahasaPasienCreated;
                if (created?.id) {
                    const v = String(created.id);
                    const lbl = created.nama_bahasa;
                    setData("bahasa_pasien", v);
                    setBahasaOptions((prev) => {
                        const exists = prev.some((o) => o.value === v);
                        return exists
                            ? prev
                            : [...prev, { value: v, label: lbl }];
                    });
                }
                setShowBahasaPasienModal(false);
                bahasaPasienForm.reset();
                (async () => {
                    try {
                        const r = await fetch("/api/bahasa-pasien");
                        if (r.ok) {
                            const j = await r.json();
                            setBahasaOptions(
                                (j.data || []).map((d) => ({
                                    value: d.value,
                                    label: d.label,
                                }))
                            );
                        }
                    } catch (_) {}
                })();
            },
        });
    };

    const handleTambahSukuBangsa = (e) => {
        e.preventDefault();
        sukuBangsaForm.post(route("suku-bangsa.store"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page) => {
                const created = page?.props?.flash?.sukuBangsaCreated;
                if (created?.id) {
                    const v = String(created.id);
                    const lbl = created.nama_suku_bangsa;
                    setData("suku_bangsa", v);
                    setSukuOptions((prev) => {
                        const exists = prev.some((o) => o.value === v);
                        return exists
                            ? prev
                            : [...prev, { value: v, label: lbl }];
                    });
                }
                setShowSukuBangsaModal(false);
                sukuBangsaForm.reset();
                (async () => {
                    try {
                        const r = await fetch("/api/suku-bangsa");
                        if (r.ok) {
                            const j = await r.json();
                            setSukuOptions(
                                (j.data || []).map((d) => ({
                                    value: d.value,
                                    label: d.label,
                                }))
                            );
                        }
                    } catch (_) {}
                })();
            },
        });
    };

    const handleTambahPerusahaanPasien = (e) => {
        e.preventDefault();
        perusahaanPasienForm.post(route("perusahaan-pasien.store"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page) => {
                const created = page?.props?.flash?.perusahaanPasienCreated;
                if (created?.kode_perusahaan) {
                    const v = String(created.kode_perusahaan);
                    const lbl = created.nama_perusahaan;
                    setData("perusahaan_pasien", v);
                    setPerusahaanOptions((prev) => {
                        const exists = prev.some((o) => o.value === v);
                        return exists
                            ? prev
                            : [...prev, { value: v, label: lbl }];
                    });
                }
                setShowPerusahaanPasienModal(false);
                perusahaanPasienForm.reset();
                (async () => {
                    try {
                        const r = await fetch("/api/perusahaan-pasien");
                        if (r.ok) {
                            const j = await r.json();
                            setPerusahaanOptions(
                                (j.data || []).map((d) => ({
                                    value: d.value,
                                    label: d.label,
                                }))
                            );
                        }
                    } catch (_) {}
                })();
            },
        });
    };

    const handleTambahCacatFisik = (e) => {
        e.preventDefault();
        cacatFisikForm.post(route("cacat-fisik.store"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page) => {
                const created = page?.props?.flash?.cacatFisikCreated;
                if (created?.id) {
                    const v = String(created.id);
                    const lbl = created.nama_cacat;
                    setData("cacat_fisik", v);
                    setCacatOptions((prev) => {
                        const exists = prev.some((o) => o.value === v);
                        return exists
                            ? prev
                            : [...prev, { value: v, label: lbl }];
                    });
                }
                setShowCacatFisikModal(false);
                cacatFisikForm.reset();
                (async () => {
                    try {
                        const r = await fetch("/api/cacat-fisik");
                        if (r.ok) {
                            const j = await r.json();
                            setCacatOptions(
                                (j.data || []).map((d) => ({
                                    value: d.value,
                                    label: d.label,
                                }))
                            );
                        }
                    } catch (_) {}
                })();
            },
        });
    };

    // Handle wilayah change - automatically set all address fields
    const handleWilayahChange = async (event) => {
        const value = event.target.value;
        console.log("Wilayah changed to:", value);
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
    const submitPatient = ({ forceNoRM } = {}) => {
        const shouldAutoGenerateNoRM = isAutoNoRM && !forceNoRM;
        transform((payload) => ({
            ...payload,
            no_rkm_medis: forceNoRM
                ? forceNoRM
                : shouldAutoGenerateNoRM
                  ? ""
                  : payload.no_rkm_medis,
        }));
        post(route("patients.store"), {
            onSuccess: async (page) => {
                const newPatient = page.props.flash?.new_patient;
                if (onSuccess) {
                    onSuccess(newPatient);
                }

                reset();
                setSelectedWilayah(null);
                setPekerjaanOption("");
                setPekerjaanOther("");
                setIsNoRMTouched(false);
                setIsAutoNoRM(true);
                lastNoRMCheckedRef.current = "";
                noRMDuplicateRetryRef.current = 0;

                try {
                    const next = await getSuggestedNoRM();
                    if (next) {
                        setData((prevData) => ({
                            ...prevData,
                            no_rkm_medis: next,
                        }));
                    }
                } catch (error) {
                    console.error("Error loading next No. RM after success:", error);
                }
            },
            onError: async (errors) => {
                const noRMError = errors?.no_rkm_medis;
                if (noRMError && noRMDuplicateRetryRef.current < 3) {
                    const nextAttempt = noRMDuplicateRetryRef.current + 1;
                    const delayMs = 200 * Math.pow(2, nextAttempt - 1);
                    await sleep(delayMs);

                    const suggested = await getSuggestedNoRM();
                    if (suggested) {
                        noRMDuplicateRetryRef.current = nextAttempt;
                        setIsNoRMTouched(true);
                        setData("no_rkm_medis", suggested);
                        submitPatient({ forceNoRM: suggested });
                        return;
                    }

                    const result = await checkNoRMDuplicateAndOfferNext(
                        data.no_rkm_medis,
                        { retrySubmit: true }
                    );
                    if (result?.suggested) {
                        noRMDuplicateRetryRef.current = nextAttempt;
                        submitPatient({ forceNoRM: result.suggested });
                        return;
                    }
                }

                console.error("Form submission errors:", errors);
                let errorMessage = "Terjadi kesalahan:\n";
                if (typeof errors === "object" && errors !== null) {
                    Object.keys(errors).forEach((key) => {
                        const message = Array.isArray(errors[key])
                            ? errors[key][0]
                            : errors[key];
                        errorMessage += `- ${message}\n`;
                    });
                } else {
                    errorMessage += String(errors);
                }
                setAlertConfig({
                    type: "error",
                    title: "Kesalahan",
                    message: errorMessage,
                    autoClose: false,
                });
                setShowAlert(true);
            },
            onFinish: () => {
                transform((payload) => payload);
            },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const missing = [];
        if (!String(data.nm_pasien || "").trim()) missing.push("Nama Lengkap");
        if (!String(data.jk || "").trim()) missing.push("Jenis Kelamin");
        if (!String(data.tmp_lahir || "").trim()) missing.push("Tempat Lahir");
        if (!String(data.tgl_lahir || "").trim()) missing.push("Tanggal Lahir");
        if (!String(data.alamat || "").trim()) missing.push("Alamat");
        if (!String(data.kode_wilayah || "").trim()) missing.push("Kelurahan/Desa");
        if (!String(data.no_tlp || "").trim()) missing.push("No. Telepon");
        const pj = String(data.perusahaan_pasien ?? "");
        if (!pj || pj === "-" || pj === "0") missing.push("Perusahaan Pasien");
        if (!String(data.suku_bangsa ?? "").trim()) missing.push("Suku Bangsa");
        if (!String(data.bahasa_pasien ?? "").trim()) missing.push("Bahasa Pasien");
        if (missing.length) {
            setAlertConfig({
                type: "warning",
                title: "Lengkapi Data",
                message:
                    "Field wajib bertanda * belum diisi:\n- " +
                    missing.join("\n- "),
                autoClose: false,
            });
            setShowAlert(true);
            return;
        }
        submitPatient();
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-[9999] p-4 overflow-y-auto"
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{
                            duration: 0.4,
                            ease: "easeOut",
                        }}
                        onClick={onClose}
                    >
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="patient-create-title"
                            className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-2xl border border-white/30 dark:border-gray-700/50 max-w-6xl w-full max-h-[90vh] flex flex-col overflow-hidden"
                            initial={{ scale: 0.7, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.7, opacity: 0, y: 50 }}
                            transition={{
                                duration: 0.4,
                                type: "spring",
                                stiffness: 100,
                                damping: 15,
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-10" />
                            {/* Header */}
                            <motion.div
                                className="flex-none flex justify-between items-center p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm">
                                        <UserPlusIcon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3
                                            id="patient-create-title"
                                            className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white"
                                        >
                                            Tambah Pasien Baru
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Lengkapi identitas dan kontak untuk
                                            pendaftaran pertama kali
                                        </p>
                                    </div>
                                </div>
                                <motion.button
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0"
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </motion.button>
                            </motion.div>

                            {/* Form Content */}
                            <div className="flex-1 overflow-y-auto p-4 lg:p-6">
                                <form
                                    id="create-patient-form"
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    {/* Basic Information */}
                                    <motion.div
                                        className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: 0.2,
                                        }}
                                    >
                                        <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                            <IdentificationIcon className="w-5 h-5 text-blue-500" />
                                            Informasi Dasar
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <div className="flex items-center justify-between mb-2 gap-2">
                                                    <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        No. Rekam Medis
                                                    </span>
                                                    <label className="inline-flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                                                        <input
                                                            type="checkbox"
                                                            checked={isAutoNoRM}
                                                            onChange={(e) => {
                                                                const checked = e.target.checked;
                                                                setIsAutoNoRM(checked);
                                                                if (!checked) {
                                                                    setIsNoRMTouched(true);
                                                                }
                                                            }}
                                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                        />
                                                        <span>Otomatis dari pengaturan No. RM</span>
                                                    </label>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="no_rkm_medis"
                                                    value={data.no_rkm_medis}
                                                    onChange={(e) => {
                                                        if (!isAutoNoRM) {
                                                            setIsNoRMTouched(true);
                                                            setData(
                                                                "no_rkm_medis",
                                                                e.target.value
                                                            );
                                                        }
                                                    }}
                                                    onBlur={(e) => {
                                                        if (isNoRMTouched && !isAutoNoRM) {
                                                            checkNoRMDuplicateAndOfferNext(
                                                                e.target.value
                                                            );
                                                        }
                                                    }}
                                                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                    placeholder={
                                                        isAutoNoRM
                                                            ? "Otomatis dari set_no_rkm_medis"
                                                            : "Isi manual jika diperlukan"
                                                    }
                                                    disabled={isAutoNoRM}
                                                />
                                                {getErrorMessage(
                                                    "no_rkm_medis"
                                                ) && (
                                                    <p className="mt-1 text-xs text-red-600">
                                                        {getErrorMessage(
                                                            "no_rkm_medis"
                                                        )}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Nama Lengkap <span className="text-red-600 dark:text-red-400">*</span>
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
                                                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                    placeholder="Masukkan nama lengkap"
                                                />
                                                {getErrorMessage(
                                                    "nm_pasien"
                                                ) && (
                                                    <p className="mt-1 text-xs text-red-600">
                                                        {getErrorMessage(
                                                            "nm_pasien"
                                                        )}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    NIK
                                                </label>
                                                <div className="flex gap-2">
                                                    <div className="relative w-full">
                                                        <input
                                                            type="text"
                                                            name="no_ktp"
                                                            value={data.no_ktp}
                                                            onChange={(e) => {
                                                                const value =
                                                                    e.target.value
                                                                        .replace(
                                                                            /[^0-9]/g,
                                                                            ""
                                                                        )
                                                                        .slice(
                                                                            0,
                                                                            16
                                                                        );
                                                                setData(
                                                                    "no_ktp",
                                                                    value
                                                                );
                                                            }}
                                                            className="w-full px-3 py-2 pr-12 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                            placeholder="Masukkan NIK (16 digit)"
                                                            maxLength="16"
                                                        />
                                                        <div
                                                            className={`absolute inset-y-0 right-0 flex items-center pr-3 text-xs font-medium ${
                                                                data.no_ktp
                                                                    .length ===
                                                                16
                                                                    ? "text-green-600 dark:text-green-400"
                                                                    : data
                                                                          .no_ktp
                                                                          .length >
                                                                      0
                                                                    ? "text-yellow-600 dark:text-yellow-400"
                                                                    : "text-gray-400 dark:text-gray-500"
                                                            }`}
                                                        >
                                                            {
                                                                data.no_ktp
                                                                    .length
                                                            }
                                                            /16
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={
                                                            handleCheckBpjsByNik
                                                        }
                                                        className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm whitespace-nowrap transition-colors"
                                                    >
                                                        Cek BPJS
                                                    </button>
                                                </div>
                                                {getErrorMessage("no_ktp") && (
                                                    <p className="mt-1 text-xs text-red-600">
                                                        {getErrorMessage(
                                                            "no_ktp"
                                                        )}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    No. Peserta
                                                </label>
                                                <div className="flex gap-2">
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
                                                        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                        placeholder="Masukkan nomor peserta BPJS/Asuransi"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={
                                                            handleCheckBpjsByNoKartu
                                                        }
                                                        className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm whitespace-nowrap transition-colors"
                                                    >
                                                        Cek BPJS
                                                    </button>
                                                </div>
                                                {getErrorMessage(
                                                    "no_peserta"
                                                ) && (
                                                    <p className="mt-1 text-xs text-red-600">
                                                        {getErrorMessage(
                                                            "no_peserta"
                                                        )}
                                                    </p>
                                                )}
                                            </div>

                                            <SelectWithAdd
                                                label="Cara Bayar"
                                                name="kd_pj"
                                                value={data.kd_pj}
                                                onChange={(e) =>
                                                    setData(
                                                        "kd_pj",
                                                        e.target.value
                                                    )
                                                }
                                                options={penjabOptions}
                                                placeholder="Pilih penanggung jawab"
                                                error={getErrorMessage("kd_pj")}
                                                required={true}
                                                onAdd={handleAddPenjab}
                                                addButtonText="Tambah Penjab"
                                            />

                                            <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Jenis Kelamin <span className="text-red-600 dark:text-red-400">*</span>
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
                                                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                >
                                                    <option value="L">
                                                        Laki-laki
                                                    </option>
                                                    <option value="P">
                                                        Perempuan
                                                    </option>
                                                </select>
                                                {getErrorMessage("jk") && (
                                                    <p className="mt-1 text-xs text-red-600">
                                                        {getErrorMessage("jk")}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Tempat Lahir <span className="text-red-600 dark:text-red-400">*</span>
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
                                                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                    placeholder="Masukkan tempat lahir"
                                                />
                                                {getErrorMessage(
                                                    "tmp_lahir"
                                                ) && (
                                                    <p className="mt-1 text-xs text-red-600">
                                                        {getErrorMessage(
                                                            "tmp_lahir"
                                                        )}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Tanggal Lahir <span className="text-red-600 dark:text-red-400">*</span>
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
                                                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                />
                                                {getErrorMessage(
                                                    "tgl_lahir"
                                                ) && (
                                                    <p className="mt-1 text-xs text-red-600">
                                                        {getErrorMessage(
                                                            "tgl_lahir"
                                                        )}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Contact Information */}
                                    <motion.div
                                        className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: 0.3,
                                        }}
                                    >
                                        <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                            <PhoneIcon className="w-5 h-5 text-blue-500" />
                                            Informasi Kontak
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Alamat <span className="text-red-600 dark:text-red-400">*</span>
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
                                                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                    placeholder="Masukkan alamat lengkap"
                                                />
                                                {getErrorMessage("alamat") && (
                                                    <p className="mt-1 text-xs text-red-600">
                                                        {getErrorMessage(
                                                            "alamat"
                                                        )}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="md:col-span-2">
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
                                                <AddressDisplay
                                                    selectedWilayah={
                                                        selectedWilayah
                                                    }
                                                    loading={loadingWilayah}
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    No. Telepon <span className="text-red-600 dark:text-red-400">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="no_tlp"
                                                    value={data.no_tlp}
                                                    onChange={(e) =>
                                                        setData(
                                                            "no_tlp",
                                                            e.target.value.replace(/[^0-9]/g, "")
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                    placeholder="Masukkan nomor telepon"
                                                />
                                                {getErrorMessage("no_tlp") && (
                                                    <p className="mt-1 text-xs text-red-600">
                                                        {getErrorMessage(
                                                            "no_tlp"
                                                        )}
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
                                                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                    placeholder="Masukkan email"
                                                />
                                                {getErrorMessage("email") && (
                                                    <p className="mt-1 text-xs text-red-600">
                                                        {getErrorMessage(
                                                            "email"
                                                        )}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Informasi Administrasi */}
                                    <motion.div
                                        className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: 0.45,
                                        }}
                                    >
                                        <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                            <ClipboardDocumentListIcon className="w-5 h-5 text-blue-500" />
                                            Informasi Tambahan
                                        </h4>
                                        <div className="grid grid-cols-1 gap-4">
                                            {/* Baris 4 kolom: Bahasa, Suku, Perusahaan, Cacat */}
                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                                {/* Bahasa Pasien */}
                                                <div>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            Bahasa Pasien <span className="text-red-600 dark:text-red-400">*</span>
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setShowBahasaPasienModal(
                                                                    true
                                                                )
                                                            }
                                                            className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-black text-white text-xs"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
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
                                                        placeholder="Pilih bahasa"
                                                        searchPlaceholder="Ketik nama bahasa untuk mencari..."
                                                        displayKey="label"
                                                        valueKey="value"
                                                        error={
                                                            !!getErrorMessage(
                                                                "bahasa_pasien"
                                                            )
                                                        }
                                                    />
                                                    {getErrorMessage(
                                                        "bahasa_pasien"
                                                    ) && (
                                                        <p className="mt-1 text-xs text-red-600">
                                                            {getErrorMessage(
                                                                "bahasa_pasien"
                                                            )}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Suku Bangsa */}
                                                <div>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            Suku Bangsa <span className="text-red-600 dark:text-red-400">*</span>
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setShowSukuBangsaModal(
                                                                    true
                                                                )
                                                            }
                                                            className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-black text-white text-xs"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
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
                                                        searchPlaceholder="Ketik nama suku bangsa untuk mencari..."
                                                        displayKey="label"
                                                        valueKey="value"
                                                        error={
                                                            !!getErrorMessage(
                                                                "suku_bangsa"
                                                            )
                                                        }
                                                    />
                                                    {getErrorMessage(
                                                        "suku_bangsa"
                                                    ) && (
                                                        <p className="mt-1 text-xs text-red-600">
                                                            {getErrorMessage(
                                                                "suku_bangsa"
                                                            )}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Perusahaan Pasien */}
                                                <div>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            Perusahaan Pasien <span className="text-red-600 dark:text-red-400">*</span>
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setShowPerusahaanPasienModal(
                                                                    true
                                                                )
                                                            }
                                                            className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-black text-white text-xs"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
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
                                                        placeholder="pilih perusahaan pasien"
                                                        searchPlaceholder="Ketik nama_perusahaan untuk mencari..."
                                                        displayKey="label"
                                                        valueKey="value"
                                                        error={
                                                            !!getErrorMessage(
                                                                "perusahaan_pasien"
                                                            )
                                                        }
                                                    />
                                                    {getErrorMessage(
                                                        "perusahaan_pasien"
                                                    ) && (
                                                        <p className="mt-1 text-xs text-red-600">
                                                            {getErrorMessage(
                                                                "perusahaan_pasien"
                                                            )}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Cacat Fisik */}
                                                <div>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            Cacat Fisik
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setShowCacatFisikModal(
                                                                    true
                                                                )
                                                            }
                                                            className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-black text-white text-xs"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
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
                                                        searchPlaceholder="Ketik nama cacat fisik untuk mencari..."
                                                        displayKey="label"
                                                        valueKey="value"
                                                        error={
                                                            !!getErrorMessage(
                                                                "cacat_fisik"
                                                            )
                                                        }
                                                    />
                                                    {getErrorMessage(
                                                        "cacat_fisik"
                                                    ) && (
                                                        <p className="mt-1 text-xs text-red-600">
                                                            {getErrorMessage(
                                                                "cacat_fisik"
                                                            )}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Golongan Darah */}
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
                                                        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                    >
                                                        <option value="">
                                                            -
                                                        </option>
                                                        <option value="A">
                                                            A
                                                        </option>
                                                        <option value="B">
                                                            B
                                                        </option>
                                                        <option value="O">
                                                            O
                                                        </option>
                                                        <option value="AB">
                                                            AB
                                                        </option>
                                                    </select>
                                                    {getErrorMessage(
                                                        "gol_darah"
                                                    ) && (
                                                        <p className="mt-1 text-xs text-red-600">
                                                            {getErrorMessage(
                                                                "gol_darah"
                                                            )}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Pekerjaan */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Pekerjaan
                                                    </label>
                                                    <select
                                                        name="pekerjaan_select"
                                                        value={pekerjaanOption}
                                                        onChange={(e) => {
                                                            const val =
                                                                e.target.value;
                                                            setPekerjaanOption(
                                                                val
                                                            );
                                                            if (
                                                                val !==
                                                                "LAINNYA"
                                                            ) {
                                                                setData(
                                                                    "pekerjaan",
                                                                    val
                                                                );
                                                                setPekerjaanOther(
                                                                    ""
                                                                );
                                                            } else {
                                                                setData(
                                                                    "pekerjaan",
                                                                    pekerjaanOther.trim()
                                                                );
                                                            }
                                                        }}
                                                        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                    >
                                                        <option value="">
                                                            - Pilih Pekerjaan -
                                                        </option>
                                                        <option value="KARYAWAN SWASTA">
                                                            KARYAWAN SWASTA
                                                        </option>
                                                        <option value="WIRASWASTA">
                                                            WIRASWASTA
                                                        </option>
                                                        <option value="PELAJAR">
                                                            PELAJAR
                                                        </option>
                                                        <option value="MAHASISWA">
                                                            MAHASISWA
                                                        </option>
                                                        <option value="PNS">
                                                            PNS
                                                        </option>
                                                        <option value="TNI/POLRI">
                                                            TNI/POLRI
                                                        </option>
                                                        <option value="IBU RUMAH TANGGA">
                                                            IBU RUMAH TANGGA
                                                        </option>
                                                        <option value="PETANI">
                                                            PETANI
                                                        </option>
                                                        <option value="NELAYAN">
                                                            NELAYAN
                                                        </option>
                                                        <option value="BURUH">
                                                            BURUH
                                                        </option>
                                                        <option value="GURU">
                                                            GURU
                                                        </option>
                                                        <option value="PERANGKAT DESA">
                                                            PERANGKAT DESA
                                                        </option>
                                                        <option value="TIDAK BEKERJA">
                                                            TIDAK BEKERJA
                                                        </option>
                                                        <option value="LAINNYA">
                                                            LAINNYA
                                                        </option>
                                                    </select>
                                                    {pekerjaanOption ===
                                                        "LAINNYA" && (
                                                        <div className="mt-2">
                                                            <input
                                                                type="text"
                                                                name="pekerjaan"
                                                                value={
                                                                    pekerjaanOther
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    const v =
                                                                        e.target
                                                                            .value;
                                                                    setPekerjaanOther(
                                                                        v
                                                                    );
                                                                    setData(
                                                                        "pekerjaan",
                                                                        v
                                                                    );
                                                                }}
                                                                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                                placeholder="Tuliskan pekerjaan"
                                                            />
                                                        </div>
                                                    )}
                                                    {getErrorMessage(
                                                        "pekerjaan"
                                                    ) && (
                                                        <p className="mt-1 text-xs text-red-600">
                                                            {getErrorMessage(
                                                                "pekerjaan"
                                                            )}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Status Pernikahan */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Status Pernikahan
                                                    </label>
                                                    <select
                                                        name="stts_nikah"
                                                        value={
                                                            data.stts_nikah
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "stts_nikah",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                    >
                                                        <option value="">
                                                            -
                                                        </option>
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
                                                            Dudha
                                                        </option>
                                                        <option value="JOMBLO">
                                                            Jomblo
                                                        </option>
                                                    </select>
                                                    {getErrorMessage(
                                                        "stts_nikah"
                                                    ) && (
                                                        <p className="mt-1 text-xs text-red-600">
                                                            {getErrorMessage(
                                                                "stts_nikah"
                                                            )}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Agama */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Agama
                                                    </label>
                                                    <select
                                                        name="agama"
                                                        value={data.agama}
                                                        onChange={(e) =>
                                                            setData(
                                                                "agama",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                    >
                                                        <option value="">
                                                            - Pilih Agama -
                                                        </option>
                                                        <option value="ISLAM">
                                                            ISLAM
                                                        </option>
                                                        <option value="KRISTEN">
                                                            KRISTEN
                                                        </option>
                                                        <option value="KATOLIK">
                                                            KATOLIK
                                                        </option>
                                                        <option value="HINDU">
                                                            HINDU
                                                        </option>
                                                        <option value="BUDHA">
                                                            BUDHA
                                                        </option>
                                                        <option value="KONG HU CHU">
                                                            KONG HU CHU
                                                        </option>
                                                    </select>
                                                    {getErrorMessage(
                                                        "agama"
                                                    ) && (
                                                        <p className="mt-1 text-xs text-red-600">
                                                            {getErrorMessage(
                                                                "agama"
                                                            )}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>



                                    {/* Family Information */}
                                    <motion.div
                                        className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: 0.4,
                                        }}
                                    >
                                        <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                            <UserGroupIcon className="w-5 h-5 text-blue-500" />
                                            Informasi Keluarga
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                    placeholder="Masukkan nama ibu"
                                                />
                                                {getErrorMessage("nm_ibu") && (
                                                    <p className="mt-1 text-xs text-red-600">
                                                        {getErrorMessage(
                                                            "nm_ibu"
                                                        )}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Nama Keluarga
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
                                                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                    placeholder="Masukkan nama keluarga"
                                                />
                                                {getErrorMessage(
                                                    "namakeluarga"
                                                ) && (
                                                    <p className="mt-1 text-xs text-red-600">
                                                        {getErrorMessage(
                                                            "namakeluarga"
                                                        )}
                                                    </p>
                                                )}
                                            </div>

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
                                                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                >
                                                    <option value="AYAH">
                                                        Ayah
                                                    </option>
                                                    <option value="IBU">
                                                        Ibu
                                                    </option>
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
                                                {getErrorMessage(
                                                    "keluarga"
                                                ) && (
                                                    <p className="mt-1 text-xs text-red-600">
                                                        {getErrorMessage(
                                                            "keluarga"
                                                        )}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Pekerjaan Penanggung Jawab */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Pekerjaan Penanggung Jawab
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
                                                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                    placeholder="Masukkan pekerjaan penanggung jawab"
                                                />
                                                {getErrorMessage(
                                                    "pekerjaanpj"
                                                ) && (
                                                    <p className="mt-1 text-xs text-red-600">
                                                        {getErrorMessage(
                                                            "pekerjaanpj"
                                                        )}
                                                    </p>
                                                )}
                                            </div>





                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Alamat Keluarga
                                                </label>
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
                                                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                    placeholder="Masukkan alamat keluarga"
                                                />
                                                {getErrorMessage(
                                                    "alamatpj"
                                                ) && (
                                                    <p className="mt-1 text-xs text-red-600">
                                                        {getErrorMessage(
                                                            "alamatpj"
                                                        )}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Action Buttons */}
                                </form>
                            </div>

                            <motion.div
                                className="flex-none p-4 lg:p-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: 0.5,
                                }}
                            >
                                <motion.button
                                    type="button"
                                    onClick={onClose}
                                    className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Batal
                                </motion.button>
                                <motion.button
                                    type="submit"
                                    form="create-patient-form"
                                    disabled={processing}
                                    className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg shadow-sm shadow-blue-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    whileHover={{
                                        scale: processing ? 1 : 1.02,
                                    }}
                                    whileTap={{
                                        scale: processing ? 1 : 0.98,
                                    }}
                                >
                                    {processing && (
                                        <svg
                                            className="animate-spin h-4 w-4 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                    )}
                                    {processing
                                        ? "Menyimpan..."
                                        : "Simpan Pasien"}
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Alert
                isOpen={showAlert}
                type={alertConfig.type}
                title={alertConfig.title}
                message={alertConfig.message}
                autoClose={alertConfig.autoClose}
                autoCloseDelay={alertConfig.autoCloseDelay}
                onClose={() => setShowAlert(false)}
            />

            {/* Penjab Create Modal */}
            <PenjabCreateModal
                isOpen={isPenjabModalOpen}
                onClose={() => setIsPenjabModalOpen(false)}
                onSuccess={handlePenjabSuccess}
            />

            <AnimatePresence>
                {showBahasaPasienModal && (
                    <motion.div
                        className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-[9999] p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowBahasaPasienModal(false)}
                    >
                        <motion.div
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full"
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                                    Tambah Bahasa Pasien
                                </h4>
                            </div>
                            <form
                                onSubmit={handleTambahBahasaPasien}
                                className="p-4"
                            >
                                <div className="mb-3">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Nama Bahasa
                                    </label>
                                    <input
                                        type="text"
                                        value={
                                            bahasaPasienForm.data.nama_bahasa
                                        }
                                        onChange={(e) =>
                                            bahasaPasienForm.setData(
                                                "nama_bahasa",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        placeholder="Contoh: Indonesia"
                                    />
                                    {bahasaPasienForm.errors.nama_bahasa && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {
                                                bahasaPasienForm.errors
                                                    .nama_bahasa
                                            }
                                        </p>
                                    )}
                                </div>
                                <div className="flex justify-end gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowBahasaPasienModal(false)
                                        }
                                        className="px-3 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-3 py-2 text-sm rounded-lg bg-black text-white"
                                    >
                                        Simpan
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showSukuBangsaModal && (
                    <motion.div
                        className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-[9999] p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowSukuBangsaModal(false)}
                    >
                        <motion.div
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full"
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                                    Tambah Suku Bangsa
                                </h4>
                            </div>
                            <form
                                onSubmit={handleTambahSukuBangsa}
                                className="p-4"
                            >
                                <div className="mb-3">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Nama Suku Bangsa
                                    </label>
                                    <input
                                        type="text"
                                        value={
                                            sukuBangsaForm.data.nama_suku_bangsa
                                        }
                                        onChange={(e) =>
                                            sukuBangsaForm.setData(
                                                "nama_suku_bangsa",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        placeholder="Contoh: Jawa"
                                    />
                                    {sukuBangsaForm.errors.nama_suku_bangsa && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {
                                                sukuBangsaForm.errors
                                                    .nama_suku_bangsa
                                            }
                                        </p>
                                    )}
                                </div>
                                <div className="flex justify-end gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowSukuBangsaModal(false)
                                        }
                                        className="px-3 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-3 py-2 text-sm rounded-lg bg-black text-white"
                                    >
                                        Simpan
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showPerusahaanPasienModal && (
                    <motion.div
                        className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-[9999] p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowPerusahaanPasienModal(false)}
                    >
                        <motion.div
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full"
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                                    Tambah Perusahaan Pasien
                                </h4>
                            </div>
                            <form
                                onSubmit={handleTambahPerusahaanPasien}
                                className="p-4 space-y-3"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Kode Perusahaan
                                    </label>
                                    <input
                                        type="text"
                                        value={
                                            perusahaanPasienForm.data
                                                .kode_perusahaan
                                        }
                                        onChange={(e) =>
                                            perusahaanPasienForm.setData(
                                                "kode_perusahaan",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        placeholder="Contoh: UMUM"
                                    />
                                    {perusahaanPasienForm.errors
                                        .kode_perusahaan && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {
                                                perusahaanPasienForm.errors
                                                    .kode_perusahaan
                                            }
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Nama Perusahaan
                                    </label>
                                    <input
                                        type="text"
                                        value={
                                            perusahaanPasienForm.data
                                                .nama_perusahaan
                                        }
                                        onChange={(e) =>
                                            perusahaanPasienForm.setData(
                                                "nama_perusahaan",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        placeholder="Contoh: UMUM"
                                    />
                                    {perusahaanPasienForm.errors
                                        .nama_perusahaan && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {
                                                perusahaanPasienForm.errors
                                                    .nama_perusahaan
                                            }
                                        </p>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Alamat
                                        </label>
                                        <input
                                            type="text"
                                            value={
                                                perusahaanPasienForm.data.alamat
                                            }
                                            onChange={(e) =>
                                                perusahaanPasienForm.setData(
                                                    "alamat",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        />
                                        {perusahaanPasienForm.errors.alamat && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {
                                                    perusahaanPasienForm.errors
                                                        .alamat
                                                }
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Kota
                                        </label>
                                        <input
                                            type="text"
                                            value={
                                                perusahaanPasienForm.data.kota
                                            }
                                            onChange={(e) =>
                                                perusahaanPasienForm.setData(
                                                    "kota",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        />
                                        {perusahaanPasienForm.errors.kota && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {
                                                    perusahaanPasienForm.errors
                                                        .kota
                                                }
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        No. Telepon
                                    </label>
                                    <input
                                        type="text"
                                        value={
                                            perusahaanPasienForm.data.no_telp
                                        }
                                        onChange={(e) =>
                                            perusahaanPasienForm.setData(
                                                "no_telp",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    />
                                    {perusahaanPasienForm.errors.no_telp && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {
                                                perusahaanPasienForm.errors
                                                    .no_telp
                                            }
                                        </p>
                                    )}
                                </div>
                                <div className="flex justify-end gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPerusahaanPasienModal(false)
                                        }
                                        className="px-3 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-3 py-2 text-sm rounded-lg bg-black text-white"
                                    >
                                        Simpan
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showCacatFisikModal && (
                    <motion.div
                        className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-[9999] p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowCacatFisikModal(false)}
                    >
                        <motion.div
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full"
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                                    Tambah Cacat Fisik
                                </h4>
                            </div>
                            <form
                                onSubmit={handleTambahCacatFisik}
                                className="p-4"
                            >
                                <div className="mb-3">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Nama Cacat Fisik
                                    </label>
                                    <input
                                        type="text"
                                        value={cacatFisikForm.data.nama_cacat}
                                        onChange={(e) =>
                                            cacatFisikForm.setData(
                                                "nama_cacat",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        placeholder="Contoh: Tuna Wicara"
                                    />
                                    {cacatFisikForm.errors.nama_cacat && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {cacatFisikForm.errors.nama_cacat}
                                        </p>
                                    )}
                                </div>
                                <div className="flex justify-end gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowCacatFisikModal(false)
                                        }
                                        className="px-3 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-3 py-2 text-sm rounded-lg bg-black text-white"
                                    >
                                        Simpan
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
