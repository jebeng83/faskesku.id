import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { createPortal } from "react-dom";
import { Head, Link, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import LanjutanRegistrasiLayout from "@/Layouts/LanjutanRegistrasiLayout";
import Alert from "@/Components/Alert";
import { Toaster } from "@/Components/ui";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowPathIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    IdentificationIcon,
    MagnifyingGlassIcon,
    ClipboardDocumentCheckIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { Building2, Plus, Search as SearchIcon, Globe } from "lucide-react";

export default function Index({
    patients,
    filters,
    dokters,
    polikliniks,
    penjabs,
}) {
	const [search, setSearch] = useState(filters.search || "");
	const [openDropdown, setOpenDropdown] = useState(null);
	const [dropdownRect, setDropdownRect] = useState(null);
	const [showRegisterModal, setShowRegisterModal] = useState(false);
	const [selectedPatient, setSelectedPatient] = useState(null);
	const [formData, setFormData] = useState({
		kd_dokter: "",
		kd_poli: "",
		kd_pj: "",
		p_jawab: "",
		almt_pj: "",
		hubunganpj: "",
	});
	const [poliStatus, setPoliStatus] = useState({
		status_poli: "Baru",
		biaya_reg: 0,
		has_registered: false,
	});
	const [showAlert, setShowAlert] = useState(false);
	const [alertConfig, setAlertConfig] = useState({
		type: "success",
		title: "",
		message: "",
		autoClose: false,
	});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toasts, setToasts] = useState([]);
    const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

    // Kunjungan Sehat (PCare) modal states
    const [showKunjunganSehatModal, setShowKunjunganSehatModal] = useState(false);
    const [kunjunganSehatPatient, setKunjunganSehatPatient] = useState(null);
    const [nikKunjungan, setNikKunjungan] = useState("");
    const [pcareLoading, setPcareLoading] = useState(false);
    const [pcareError, setPcareError] = useState(null);
    const [pcareData, setPcareData] = useState(null); // { response, metaData }
    const pcareAbortRef = useRef(null);
    const pcareReqIdRef = useRef(0);

    // Motion variants (UI/UX Improvements Guide)
    // Ref: docs/UI_UX_IMPROVEMENTS_GUIDE.md
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.1 },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.98 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
    };
    const rowVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 },
    };
    const cardHoverVariants = {
        rest: { scale: 1, y: 0 },
        hover: { scale: 1.01, y: -4, transition: { duration: 0.3, ease: "easeOut" } },
    };

	const handleSearch = (e) => {
		e.preventDefault();
		router.get(
			route("patients.index"),
			{ search },
			{
				preserveState: true,
				replace: true,
			}
		);
	};

	const handleDelete = (patient) => {
		if (confirm("Apakah Anda yakin ingin menghapus data pasien ini?")) {
			router.post(route("patients.destroy", patient.no_rkm_medis), { _method: "DELETE" }, { forceFormData: true, preserveScroll: true });
		}
	};

	const toggleDropdown = (patientId, anchorEl) => {
		if (openDropdown === patientId) {
			setOpenDropdown(null);
			setDropdownRect(null);
		} else {
			setOpenDropdown(patientId);
			if (anchorEl) {
				const rect = anchorEl.getBoundingClientRect();
				setDropdownRect(rect);
			}
		}
	};

	const closeDropdown = () => {
		setOpenDropdown(null);
		setDropdownRect(null);
	};

	const handleRegisterPeriksa = (patient) => {
		router.visit(route('registration.index'), {
			data: { search: patient.no_rkm_medis },
			method: 'get'
		});
		closeDropdown();
	};

    // Helpers for Kunjungan Sehat
    const sanitizeNik = (value) => String(value || "").replace(/[^0-9]/g, "").slice(0, 16);
    const copyToClipboard = async (text) => {
        try { await navigator.clipboard.writeText(text || ""); } catch (_) {}
    };

    const openKunjunganSehat = async (patient) => {
        setKunjunganSehatPatient(patient);
        const nik = sanitizeNik(patient?.no_ktp || "");
        setNikKunjungan(nik);
        setPcareError(null);
        setPcareData(null);
        setShowKunjunganSehatModal(true);
        // Auto fetch peserta PCare by NIK saat modal dibuka
        if (nik && nik.length >= 8) {
            await fetchPcareByNik(nik);
        } else {
            setPcareError("NIK pasien tidak valid atau kosong.");
        }
        closeDropdown();
    };

    const closeKunjunganSehatModal = () => {
        setShowKunjunganSehatModal(false);
        setKunjunganSehatPatient(null);
        setNikKunjungan("");
        setPcareLoading(false);
        setPcareError(null);
        setPcareData(null);
        if (pcareAbortRef.current) {
            try { pcareAbortRef.current.abort(); } catch {}
            pcareAbortRef.current = null;
        }
    };

    const fetchPcareByNik = async (nik) => {
        const n = sanitizeNik(nik);
        setNikKunjungan(n);
        setPcareError(null);
        setPcareData(null);
        if (!n || n.length < 8) {
            setPcareError("Masukkan NIK yang valid (min. 8 digit, ideal 16 digit).");
            return;
        }
        setPcareLoading(true);
        try {
            if (pcareAbortRef.current) {
                try { pcareAbortRef.current.abort(); } catch {}
            }
            const controller = new AbortController();
            pcareAbortRef.current = controller;
            const reqId = (pcareReqIdRef.current += 1);
            const params = new URLSearchParams({ nik: n });
            const { data } = await axios.get(`/pcare/api/peserta/nik?${params.toString()}`, {
                withCredentials: true,
                headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
                signal: controller.signal,
            });
            if (pcareReqIdRef.current === reqId && showKunjunganSehatModal) {
                setPcareData(data);
            }
        } catch (e) {
            if (e?.name === "CanceledError" || e?.code === "ERR_CANCELED") {
                return;
            }
            setPcareError(e?.response?.data?.metaData?.message || e?.message || "Terjadi kesalahan jaringan");
        } finally {
            setPcareLoading(false);
        }
    };

    const sendKunjunganSehat = async () => {
        const resp = pcareData?.response || null;
        const noKartuFromResp = String(resp?.noKartu || "").replace(/[^9]/g, "");
        const noKartuFromPatient = String(kunjunganSehatPatient?.no_peserta || "").replace(/[^9]/g, "");
        const noKartu = noKartuFromResp || noKartuFromPatient;

        if (!noKartu || noKartu.length !== 13) {
            setAlertConfig({
                type: "error",
                title: "Nomor Kartu tidak valid",
                message: "Tidak dapat mengirim Kunjungan Sehat: No. Kartu BPJS harus 13 digit.",
                autoClose: false,
            });
            setShowAlert(true);
            return;
        }

        try {
            setIsSubmitting(true);
            const payload = {
                kdProviderPeserta: pcareData?.response?.kdProviderPst?.kdProvider || undefined,
                tglDaftar: new Date().toISOString().slice(0, 10),
                noKartu,
                kdPoli: "021",
                kd_poli_rs: formData?.kd_poli || undefined,
                keluhan: "Konsultasi Kesehatan",
                kunjSakit: false,
                sistole: "0",
                diastole: "0",
                beratBadan: "0",
                tinggiBadan: "0",
                respRate: "0",
                lingkarPerut: "0",
                heartRate: "0",
                rujukBalik: "0",
                kdTkp: "10",
            };
            const csrfToken = document.head.querySelector('meta[name="csrf-token"]')?.content || '';
            const { data: json } = await axios.post(`/pcare/api/kunjungan-sehat`, payload, {
                withCredentials: true,
                headers: {
                    Accept: "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "X-CSRF-TOKEN": csrfToken,
                },
            });
            setAlertConfig({
                type: "success",
                title: "Berhasil Kirim Kunjungan Sehat",
                message: (json?.metaData?.message || "Berhasil!") + (json?.response?.noKunjungan ? ` (No. Kunjungan: ${json.response.noKunjungan})` : ""),
                autoClose: true,
                autoCloseDelay: 3000,
            });
            setShowAlert(true);
            closeKunjunganSehatModal();
        } catch (e) {
            const msg = e?.response?.data?.metaData?.message || e?.message || "Tidak dapat menghubungi server.";
            setAlertConfig({ type: "error", title: "Kesalahan Jaringan", message: msg, autoClose: false });
            setShowAlert(true);
        } finally {
            setIsSubmitting(false);
        }
    };

	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Check poli status when poliklinik is selected
		if (name === "kd_poli" && value && selectedPatient) {
			checkPoliStatus(value);
		}
	};

	const checkPoliStatus = async (kd_poli) => {
		try {
			const response = await fetch(
				`/patients/${selectedPatient.no_rkm_medis}/check-poli-status?kd_poli=${kd_poli}`
			);
			const data = await response.json();

			if (data.success) {
				setPoliStatus(data.data);
			}
		} catch (error) {
			console.error("Error checking poli status:", error);
		}
	};

	const handleSubmitRegister = (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		router.post(
			route("patients.register-periksa", selectedPatient.no_rkm_medis),
			formData,
			{
				onSuccess: () => {
					setShowRegisterModal(false);
					setSelectedPatient(null);
					setFormData({
						kd_dokter: "",
						kd_poli: "",
						kd_pj: "",
						p_jawab: "",
						almt_pj: "",
						hubunganpj: "",
					});
					setPoliStatus({
						status_poli: "Baru",
						biaya_reg: 0,
						has_registered: false,
					});

					// Show success alert
					setAlertConfig({
						type: "success",
						title: "Berhasil!",
						message: `Pasien ${selectedPatient?.nm_pasien} berhasil didaftarkan untuk periksa.`,
						autoClose: true,
						autoCloseDelay: 3000,
					});
					setShowAlert(true);
					setIsSubmitting(false);
				},
                onError: (_errors) => {
                    // Show error alert
                    setAlertConfig({
                        type: "error",
                        title: "Gagal!",
                        message:
                            "Terjadi kesalahan saat mendaftarkan pasien. Silakan coba lagi.",
                        autoClose: false,
                    });
                    setShowAlert(true);
                    setIsSubmitting(false);
                },
			}
		);
	};

	const closeModal = () => {
		setShowRegisterModal(false);
		setSelectedPatient(null);
		setFormData({
			kd_dokter: "",
			kd_poli: "",
			kd_pj: "",
			p_jawab: "",
			almt_pj: "",
			hubunganpj: "",
		});
		setPoliStatus({
			status_poli: "Baru",
			biaya_reg: 0,
			has_registered: false,
		});
		setIsSubmitting(false);
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				openDropdown &&
				!event.target.closest(".dropdown-container") &&
				!event.target.closest(".dropdown-portal-menu")
			) {
				closeDropdown();
			}
		};

		const handleScroll = () => {
			if (openDropdown) {
				closeDropdown();
			}
		};

		const handleResize = () => {
			if (openDropdown) {
				setDropdownRect(null);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		window.addEventListener("scroll", handleScroll);
		window.addEventListener("resize", handleResize);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleResize);
		};
	}, [openDropdown, dropdownRect]);

    return (
        <LanjutanRegistrasiLayout
            title="Registrasi Pasien"
            menuConfig={{ activeTab: "pasien" }}
        >
            <Head title="Data Pasien" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
            >
                {/* Global Toaster */}
                <Toaster toasts={toasts} onRemove={removeToast} />

                {/* Header */}
                <motion.div
                    variants={itemVariants}
                    className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 p-6"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10" />
                    <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <motion.div
                                className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <Building2 className="w-6 h-6 text-white" />
                            </motion.div>
                            <div>
                                <motion.h1
                                    className="text-3xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
                                >
                                    Data Pasien
                                </motion.h1>
                            </div>
                        </div>

                        <div className="w-full md:w-auto flex items-center gap-3">
                            <form onSubmit={handleSearch} className="hidden sm:flex items-center gap-2">
                                <div className="relative">
                                    <SearchIcon className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="pl-8 pr-3 py-2 w-64 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                                        placeholder="Cari nama/NIK/No.RM/Telepon"
                                        aria-label="Cari Pasien"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="px-3 py-2 text-sm rounded-md bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-blue-500/20 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all"
                                >
                                    Cari
                                </button>
                            </form>
                            <motion.a
                                href={route("patients.create")}
                                variants={cardHoverVariants}
                                initial="rest"
                                whileHover="hover"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 text-sm"
                            >
                                <Plus className="w-4 h-4" />
                                Tambah
                            </motion.a>
                        </div>
                    </div>
                </motion.div>

                

                {/* Data Table */}
                <motion.div
                    variants={itemVariants}
                    className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5"
                >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-xs">
                            <thead>
                                <tr>
                                    <th className="text-left px-3 py-2 bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 font-semibold uppercase tracking-wider">
                                        No. RM
                                    </th>
                                    <th className="text-left px-3 py-2 bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 font-semibold uppercase tracking-wider">
                                        Nama Pasien
                                    </th>
                                    <th className="text-left px-3 py-2 bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 font-semibold uppercase tracking-wider">
                                        NIK
                                    </th>
                                    <th className="text-left px-3 py-2 bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 font-semibold uppercase tracking-wider">
                                        JK
                                    </th>
                                    <th className="text-left px-3 py-2 bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 font-semibold uppercase tracking-wider">
                                        Umur
                                    </th>
                                    <th className="text-left px-3 py-2 bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 font-semibold uppercase tracking-wider">
                                        Alamat
                                    </th>
                                    <th className="text-left px-3 py-2 bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 font-semibold uppercase tracking-wider">
                                        Ibu Kandung
                                    </th>
                                    <th className="text-left px-3 py-2 bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 font-semibold uppercase tracking-wider">
                                        Pekerjaan
                                    </th>
                                    <th className="text-left px-3 py-2 bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 font-semibold uppercase tracking-wider">
                                        Keluarga
                                    </th>
                                    <th className="text-left px-3 py-2 bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 font-semibold uppercase tracking-wider">
                                        Cara Bayar
                                    </th>
                                    <th className="text-left px-3 py-2 bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 font-semibold uppercase tracking-wider">
                                        No. Peserta
                                    </th>
                                    <th className="text-left px-3 py-2 bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 font-semibold uppercase tracking-wider">
                                        No. Telp
                                    </th>
                                    <th className="text-left px-3 py-2 bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 font-semibold uppercase tracking-wider">
                                        Tgl. Daftar
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100/60 dark:divide-gray-800/60 text-gray-800 dark:text-gray-200">
                                <AnimatePresence initial={false}>
                                {patients.data.map((patient) => (
                                    <motion.tr
                                        key={patient.no_rkm_medis}
                                        variants={rowVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="hover:bg-gray-50/80 dark:hover:bg-gray-700/50 transition-colors"
                                    >
                                        <td className="px-3 py-1.5 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            <div className="relative dropdown-container overflow-visible z-[1000]">
                                                <button
                                                    onClick={(e) => toggleDropdown(patient.no_rkm_medis, e.currentTarget)}
                                                    className="flex items-center gap-2 px-2 py-1 text-xs font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                                                >
                                                    <span>{patient.no_rkm_medis}</span>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                        className={`w-3 h-3 transition-transform ${
                                                            openDropdown === patient.no_rkm_medis
                                                                ? "rotate-180"
                                                                : ""
                                                        }`}
                                                    >
                                                        <path d="M7 10l5 5 5-5z" />
                                                    </svg>
                                                </button>

                                                {openDropdown === patient.no_rkm_medis && dropdownRect &&
                                                    createPortal(
                                                        <div
                                                            className="dropdown-portal-menu w-56 rounded-xl bg-white/95 dark:bg-gray-900/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/10 ring-1 ring-black/5 dark:ring-white/10 overflow-hidden"
                                                            style={{
                                                                position: "fixed",
                                                                top: dropdownRect.bottom + 4,
                                                                left: dropdownRect.left,
                                                                zIndex: 10000,
                                                            }}
                                                        >
                                                            <div className="py-1">
                                                                <Link
                                                                    href={route(
                                                                        "patients.show",
                                                                        patient.no_rkm_medis
                                                                    )}
                                                                    onClick={closeDropdown}
                                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-50/70 hover:to-indigo-50/70 dark:hover:from-gray-800/60 dark:hover:to-gray-800/40 transition-all"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 24 24"
                                                                        fill="currentColor"
                                                                        className="w-4 h-4 mr-3 text-blue-600 dark:text-blue-400"
                                                                    >
                                                                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                    </svg>
                                                                    Lihat Detail
                                                                </Link>
                                                                <Link
                                                                    href={route(
                                                                        "patients.edit",
                                                                        patient.no_rkm_medis
                                                                    )}
                                                                    onClick={closeDropdown}
                                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-50/70 hover:to-indigo-50/70 dark:hover:from-gray-800/60 dark:hover:to-gray-800/40 transition-all"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 24 24"
                                                                        fill="currentColor"
                                                                        className="w-4 h-4 mr-3 text-green-600 dark:text-green-400"
                                                                    >
                                                                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                                                                        <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                                                                    </svg>
                                                                    Edit Data
                                                                </Link>
                                                                <button
                                                                    onClick={() => handleRegisterPeriksa(patient)}
                                                                    className="flex items-center w-full px-4 py-2 text-sm text-purple-600 dark:text-purple-400 hover:bg-gradient-to-r hover:from-purple-50/60 hover:to-indigo-50/60 dark:hover:from-purple-900/20 dark:hover:to-indigo-900/20 transition-all"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 24 24"
                                                                        fill="currentColor"
                                                                        className="w-4 h-4 mr-3"
                                                                    >
                                                                        <path d="M11.25 4.533c0-1.036.84-1.875 1.875-1.875h7.5c1.036 0 1.875.84 1.875 1.875v7.5c0 1.036-.84 1.875-1.875 1.875h-7.5a1.875 1.875 0 01-1.875-1.875v-7.5zM12.75 6.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM12 9a.75.75 0 00-.75.75v1.5a.75.75 0 001.5 0v-1.5A.75.75 0 0012 9z" />
                                                                        <path d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h.75a.75.75 0 010 1.5h-.75a.375.375 0 00-.375.375v7.5c0 .207.168.375.375.375h.75a.75.75 0 010 1.5h-.75A1.875 1.875 0 011.5 18.375v-12.75zM6 5.625c0-1.036.84-1.875 1.875-1.875h.75a.75.75 0 010 1.5h-.75A.375.375 0 006 6.375v7.5c0 .207.168.375.375.375h.75a.75.75 0 010 1.5h-.75A1.875 1.875 0 016 18.375v-12.75z" />
                                                                    </svg>
                                                                    Daftar Periksa
                                                                </button>
                                                                <button
                                                                    onClick={() => openKunjunganSehat(patient)}
                                                                    className="flex items-center w-full px-4 py-2 text-sm text-teal-600 dark:text-teal-400 hover:bg-gradient-to-r hover:from-teal-50/60 hover:to-emerald-50/60 dark:hover:from-teal-900/20 dark:hover:to-emerald-900/20 transition-all"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 24 24"
                                                                        fill="currentColor"
                                                                        className="w-4 h-4 mr-3"
                                                                    >
                                                                        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-.75 5.25a.75.75 0 011.5 0v5.19l3.28 1.86a.75.75 0 11-.75 1.3l-3.75-2.12a.75.75 0 01-.38-.65V7.25z" />
                                                                    </svg>
                                                                    Kunjungan Sehat
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        closeDropdown();
                                                                        handleDelete(patient);
                                                                    }}
                                                                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gradient-to-r hover:from-red-50/60 hover:to-rose-50/60 dark:hover:from-red-900/20 dark:hover:to-rose-900/20 transition-all"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 24 24"
                                                                        fill="currentColor"
                                                                        className="w-4 h-4 mr-3"
                                                                    >
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452a51.18 51.18 0 013.273 0z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                        <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V8.25a3 3 0 00-3-3H5.25z" />
                                                                    </svg>
                                                                    Hapus Data
                                                                </button>
                                                            </div>
                                                        </div>,
                                                        document.body
                                                    )}
                                            </div>
                                        </td>
                                        <td className="px-3 py-1.5 whitespace-nowrap text-gray-900 dark:text-white font-medium">
                                            {patient.nm_pasien}
                                        </td>
                                        <td className="px-3 py-1.5 whitespace-nowrap text-gray-500 dark:text-gray-400">
                                            {patient.no_ktp || "-"}
                                        </td>
                                        <td className="px-3 py-1.5 whitespace-nowrap text-gray-500 dark:text-gray-400">
                                            {patient.jk === "L" ? "L" : "P"}
                                        </td>
                                        <td className="px-3 py-1.5 whitespace-nowrap text-gray-500 dark:text-gray-400">
                                            {patient.umur}
                                        </td>
                                        <td className="px-3 py-1.5 whitespace-nowrap text-gray-500 dark:text-gray-400 max-w-[250px] truncate" title={[patient.alamat, patient.kelurahan?.nm_kel, patient.kecamatan?.nm_kec, patient.kabupaten?.nm_kab].filter(Boolean).join(", ")}>
                                            {[patient.alamat, patient.kelurahan?.nm_kel, patient.kecamatan?.nm_kec, patient.kabupaten?.nm_kab].filter(Boolean).join(", ") || "-"}
                                        </td>
                                        <td className="px-3 py-1.5 whitespace-nowrap text-gray-500 dark:text-gray-400">
                                            {patient.nm_ibu || "-"}
                                        </td>
                                        <td className="px-3 py-1.5 whitespace-nowrap text-gray-500 dark:text-gray-400 max-w-[120px] truncate" title={patient.pekerjaan}>
                                            {patient.pekerjaan || "-"}
                                        </td>
                                        <td className="px-3 py-1.5 whitespace-nowrap text-gray-500 dark:text-gray-400 max-w-[120px] truncate" title={patient.namakeluarga}>
                                            {patient.namakeluarga || "-"}
                                        </td>
                                        <td className="px-3 py-1.5 whitespace-nowrap text-gray-500 dark:text-gray-400 max-w-[150px] truncate" title={patient.penjab?.png_jawab || patient.kd_pj}>
                                            {patient.penjab?.png_jawab || patient.kd_pj || "-"}
                                        </td>
                                        <td className="px-3 py-1.5 whitespace-nowrap text-gray-500 dark:text-gray-400">
                                            {patient.no_peserta || "-"}
                                        </td>
                                        <td className="px-3 py-1.5 whitespace-nowrap text-gray-500 dark:text-gray-400">
                                            {patient.no_tlp || "-"}
                                        </td>
                                        <td className="px-3 py-1.5 whitespace-nowrap text-gray-500 dark:text-gray-400">
                                            {patient.tgl_daftar
                                                ? new Date(patient.tgl_daftar).toLocaleDateString(
                                                        "id-ID"
                                                  )
                                                : "-"}
                                        </td>
                                    </motion.tr>
                                ))}
                                </AnimatePresence>
                                {patients.data.length === 0 && (
                                    <tr>
                                        <td colSpan={14} className="px-4 py-12">
                                            <motion.div
                                                className="flex flex-col items-center justify-center gap-3"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                <Globe className="w-12 h-12 text-gray-400" />
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Tidak ada data pasien.</span>
                                                <Link
                                                    href={route("patients.create")}
                                                    className="mt-1 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 text-sm"
                                                >
                                                    <Plus className="w-4 h-4" /> Tambah Pasien Pertama
                                                </Link>
                                            </motion.div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {patients.links && (
                        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700 dark:text-gray-300">
                                    Menampilkan {patients.from} sampai {patients.to} dari{" "}
                                    {patients.total} data
                                </div>
                                <div className="flex gap-2">
                                    {patients.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || "#"}
                                            className={`px-3 py-2 text-sm rounded-xl ${
                                                link.active
                                                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm"
                                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                            } ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>

                
            </motion.div>

            {/* Modal Registrasi Periksa */}
            {showRegisterModal && (
                createPortal(
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center" style={{ zIndex: 12000 }}>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
						<div className="flex justify-between items-center mb-6">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
								Registrasi Periksa - {selectedPatient?.nm_pasien}
								</h3>
								<button
									onClick={closeModal}
									className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
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
								</button>
							</div>

							<form onSubmit={handleSubmitRegister} className="space-y-4">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{/* Dokter */}
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
											Dokter *
										</label>
										<select
											name="kd_dokter"
											value={formData.kd_dokter}
											onChange={handleFormChange}
											required
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
										>
											<option value="">Pilih Dokter</option>
											{dokters?.map((dokter) => (
												<option key={dokter.kd_dokter} value={dokter.kd_dokter}>
													{dokter.nm_dokter}
												</option>
											))}
										</select>
									</div>

									{/* Poliklinik */}
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
											Poliklinik *
										</label>
										<select
											name="kd_poli"
											value={formData.kd_poli}
											onChange={handleFormChange}
											required
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
										>
											<option value="">Pilih Poliklinik</option>
											{polikliniks?.map((poli) => (
												<option key={poli.kd_poli} value={poli.kd_poli}>
													{poli.nm_poli}
												</option>
											))}
										</select>
									</div>

									{/* Penanggung Jawab */}
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
											Penanggung Jawab *
										</label>
										<select
											name="kd_pj"
											value={formData.kd_pj}
											onChange={handleFormChange}
											required
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
										>
											<option value="">Pilih Penanggung Jawab</option>
											{penjabs?.map((penjab) => (
												<option key={penjab.kd_pj} value={penjab.kd_pj}>
													{penjab.png_jawab}
												</option>
											))}
										</select>
									</div>
								</div>

                                {/* Status Poli dan Biaya Registrasi */}
                                {formData.kd_poli && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
												Status Poli
											</label>
											<div
												className={`px-3 py-2 rounded-lg border ${
													poliStatus.status_poli === "Lama"
														? "bg-orange-50 border-orange-200 text-orange-800 dark:bg-orange-900/20 dark:border-orange-700 dark:text-orange-300"
														: "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-700 dark:text-green-300"
												}`}
											>
												{poliStatus.status_poli}
											</div>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
												Biaya Registrasi
											</label>
                                            <div className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">
                                                Rp{" "}
                                                {poliStatus.biaya_reg?.toLocaleString("id-ID") || "0"}
                                            </div>
                                        </div>
                                    </div>
                                )}

								{/* Nama Penanggung Jawab */}
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
										Nama Penanggung Jawab *
									</label>
									<input
										type="text"
										name="p_jawab"
										value={formData.p_jawab}
										onChange={handleFormChange}
										required
										className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
									/>
								</div>

								{/* Alamat Penanggung Jawab */}
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
										Alamat Penanggung Jawab *
									</label>
									<textarea
										name="almt_pj"
										value={formData.almt_pj}
										onChange={handleFormChange}
										required
										rows={3}
										className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
									/>
								</div>

								{/* Hubungan Penanggung Jawab */}
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
										Hubungan *
									</label>
									<select
										name="hubunganpj"
										value={formData.hubunganpj}
										onChange={handleFormChange}
										required
										className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
									>
										<option value="DIRI SENDIRI">Diri Sendiri</option>
										<option value="AYAH">Ayah</option>
										<option value="IBU">Ibu</option>
										<option value="ISTRI">Istri</option>
										<option value="SUAMI">Suami</option>
										<option value="SAUDARA">Saudara</option>
										<option value="ANAK">Anak</option>
										<option value="LAIN-LAIN">Lain-lain</option>
									</select>
								</div>

								<div className="flex justify-end space-x-3 pt-4">
									<button
										type="button"
										onClick={closeModal}
										className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
									>
										Batal
									</button>
									<button
										type="submit"
										disabled={isSubmitting}
										className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
									>
										{isSubmitting && (
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
										{isSubmitting ? "Menyimpan..." : "Simpan Registrasi"}
									</button>
								</div>
					</form>
					</div>
				</div>
			</div>,
			document.body)
		)}

            {/* Modal Kunjungan Sehat (PCare) */}
            {showKunjunganSehatModal && (
                createPortal(
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center" style={{ zIndex: 13000 }}>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white p-3 shadow">
                                            <IdentificationIcon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Kunjungan Sehat</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{kunjunganSehatPatient?.nm_pasien} • NIK: {kunjunganSehatPatient?.no_ktp || '-'}</p>
                                        </div>
                                    </div>
                                    <button onClick={closeKunjunganSehatModal} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                        <XMarkIcon className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Input NIK dan Cari ulang (opsional) */}
                                <div className="bg-white/80 dark:bg-gray-700/60 border border-slate-200 dark:border-gray-600 rounded-lg p-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <div className="md:col-span-2">
                                            <label htmlFor="nikKunjungan" className="text-xs text-slate-500">NIK Peserta</label>
                                            <div className="mt-1 flex items-center gap-2">
                                                <div className="relative flex-1">
                                                    <MagnifyingGlassIcon className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                                                    <input
                                                        id="nikKunjungan"
                                                        inputMode="numeric"
                                                        autoComplete="off"
                                                        placeholder="Masukkan NIK (16 digit)"
                                                        value={nikKunjungan}
                                                        onChange={(e) => setNikKunjungan(sanitizeNik(e.target.value))}
                                                        onKeyDown={(e) => { if (e.key === 'Enter') fetchPcareByNik(nikKunjungan); }}
                                                        className="w-full rounded-md border-slate-300 pl-8 pr-8 text-sm dark:bg-gray-700 dark:text-white"
                                                    />
                                                    {nikKunjungan && (
                                                        <button onClick={() => setNikKunjungan('')} className="absolute right-2 top-2 rounded p-1 text-slate-400 hover:text-slate-600" title="Clear">
                                                            <XMarkIcon className="h-4 w-4" />
                                                        </button>
                                                    )}
                                                </div>
                                                <button onClick={() => fetchPcareByNik(nikKunjungan)} disabled={pcareLoading} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-white shadow ${pcareLoading ? 'bg-emerald-400' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
                                                    {pcareLoading ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <MagnifyingGlassIcon className="h-4 w-4" />}
                                                    {pcareLoading ? 'Mencari…' : 'Cari'}
                                                </button>
                                                <button onClick={() => { setNikKunjungan(sanitizeNik(kunjunganSehatPatient?.no_ktp || '')); setPcareError(null); setPcareData(null); }} className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm hover:bg-slate-50 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                                                    Reset
                                                </button>
                                            </div>
                                            <div className="mt-1 text-xs text-slate-500">Tekan Enter untuk mencari.</div>
                                        </div>
                                        <div className="md:col-span-1">
                                            <div className="rounded-lg border border-slate-200 dark:border-gray-600 p-3">
                                                <div className="text-xs text-slate-500">Status</div>
                                                <div className="mt-1 flex items-center gap-2">
                                                    {pcareLoading ? (
                                                        <>
                                                            <ArrowPathIcon className="h-4 w-4 animate-spin text-emerald-600" />
                                                            <span className="text-slate-700 text-sm dark:text-gray-200">Memuat…</span>
                                                        </>
                                                    ) : pcareError ? (
                                                        <>
                                                            <ExclamationTriangleIcon className="h-4 w-4 text-red-600" />
                                                            <span className="text-red-700 text-sm">{pcareError}</span>
                                                        </>
                                                    ) : pcareData ? (
                                                        <>
                                                            <CheckCircleIcon className="h-4 w-4 text-emerald-600" />
                                                            <span className="text-slate-700 text-sm dark:text-gray-200">{pcareData?.metaData?.message || 'OK'}</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <IdentificationIcon className="h-4 w-4 text-slate-500" />
                                                            <span className="text-slate-600 text-sm dark:text-gray-300">Siap mencari</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Hasil */}
                                {pcareData && pcareData.response && (
                                    <div className="mt-4 rounded-xl border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-4 shadow-sm">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-2">
                                                <IdentificationIcon className="h-5 w-5 text-slate-500" />
                                                <div>
                                                    <div className="text-sm font-semibold text-slate-800 dark:text-gray-100">{pcareData.response?.nama || '-'}</div>
                                                    <div className="text-xs text-slate-500 dark:text-gray-300">{pcareData.response?.jnsPeserta?.nama || 'Peserta'} • {(pcareData.response?.aktif ? 'AKTIF' : (pcareData.response?.ketAktif || 'TIDAK AKTIF'))}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {pcareData.response?.aktif ? (
                                                    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-700">AKTIF</span>
                                                ) : (
                                                    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700">TIDAK AKTIF</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                            <div className="rounded-lg border border-slate-200 dark:border-gray-600 p-3">
                                                <div className="text-xs text-slate-500">No. Kartu</div>
                                                <div className="mt-1 flex items-center gap-2 text-sm text-slate-800 dark:text-gray-200">
                                                    <span>{pcareData.response?.noKartu || '-'}</span>
                                                    {pcareData.response?.noKartu && (
                                                        <button onClick={() => copyToClipboard(pcareData.response.noKartu)} className="ml-1 rounded p-1 text-slate-400 hover:text-slate-600" title="Salin No. Kartu">
                                                            <ClipboardDocumentCheckIcon className="h-4 w-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="rounded-lg border border-slate-200 dark:border-gray-600 p-3">
                                                <div className="text-xs text-slate-500">NIK</div>
                                                <div className="mt-1 flex items-center gap-2 text-sm text-slate-800 dark:text-gray-200">
                                                    <span>{pcareData.response?.noKTP || '-'}</span>
                                                    {pcareData.response?.noKTP && (
                                                        <button onClick={() => copyToClipboard(pcareData.response.noKTP)} className="ml-1 rounded p-1 text-slate-400 hover:text-slate-600" title="Salin NIK">
                                                            <ClipboardDocumentCheckIcon className="h-4 w-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="rounded-lg border border-slate-200 dark:border-gray-600 p-3">
                                                <div className="text-xs text-slate-500">Tanggal Lahir</div>
                                                <div className="mt-1 text-sm text-slate-800 dark:text-gray-200">{pcareData.response?.tglLahir || '-'}</div>
                                            </div>

                                            <div className="rounded-lg border border-slate-200 dark:border-gray-600 p-3">
                                                <div className="text-xs text-slate-500">Kelas</div>
                                                <div className="mt-1 text-sm text-slate-800 dark:text-gray-200">{pcareData.response?.jnsKelas?.nama || pcareData.response?.jnsKelas?.kode || '-'}</div>
                                            </div>
                                            <div className="rounded-lg border border-slate-200 dark:border-gray-600 p-3">
                                                <div className="text-xs text-slate-500">Provider FKTP</div>
                                                <div className="mt-1 text-sm text-slate-800 dark:text-gray-200">{pcareData.response?.kdProviderPst?.nmProvider || '-'}</div>
                                            </div>
                                            <div className="rounded-lg border border-slate-200 dark:border-gray-600 p-3">
                                                <div className="text-xs text-slate-500">No. HP</div>
                                                <div className="mt-1 text-sm text-slate-800 dark:text-gray-200">{pcareData.response?.noHP || '-'}</div>
                                            </div>

                                            <div className="rounded-lg border border-slate-200 dark:border-gray-600 p-3">
                                                <div className="text-xs text-slate-500">Mulai Aktif</div>
                                                <div className="mt-1 text-sm text-slate-800 dark:text-gray-200">{pcareData.response?.tglMulaiAktif || '-'}</div>
                                            </div>
                                            <div className="rounded-lg border border-slate-200 dark:border-gray-600 p-3">
                                                <div className="text-xs text-slate-500">Akhir Berlaku</div>
                                                <div className="mt-1 text-sm text-slate-800 dark:text-gray-200">{pcareData.response?.tglAkhirBerlaku || '-'}</div>
                                            </div>
                                            <div className="rounded-lg border border-slate-200 dark:border-gray-600 p-3">
                                                <div className="text-xs text-slate-500">Golongan Darah</div>
                                                <div className="mt-1 text-sm text-slate-800 dark:text-gray-200">{pcareData.response?.golDarah || '-'}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="mt-4 flex justify-end gap-2">
                                    <button onClick={closeKunjunganSehatModal} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">Tutup</button>
                                    <button onClick={sendKunjunganSehat} disabled={isSubmitting || !pcareData} className="px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2">
                                        {isSubmitting && <ArrowPathIcon className="h-4 w-4 animate-spin" />}
                                        {isSubmitting ? "Mengirim…" : "Kirim Kunjungan Sehat"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>,
                    document.body
                )
            )}

			{/* Alert Feedback */}
			<Alert
				isOpen={showAlert}
				type={alertConfig.type}
				title={alertConfig.title}
				message={alertConfig.message}
				autoClose={alertConfig.autoClose}
				autoCloseDelay={alertConfig.autoCloseDelay}
				onClose={() => setShowAlert(false)}
			/>
        </LanjutanRegistrasiLayout>
    );
}
