import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Head, Link, useForm, Form } from "@inertiajs/react";
import { route } from "ziggy-js";
import LanjutanRegistrasiLayout from "@/Layouts/LanjutanRegistrasiLayout";
import SelectWithAdd from "@/Components/SelectWithAdd";
import PenjabCreateModal from "@/Components/PenjabCreateModal";
import SearchableSelect from "@/Components/SearchableSelect";
import WilayahSearchableSelect from "@/Components/WilayahSearchableSelect";
import AddressDisplay from "@/Components/AddressDisplay";

export default function Create() {
    // Variants for subtle, performant micro-interactions
    const containerVariants = {
        hidden: { opacity: 0, y: 8 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.06, ease: "easeOut" },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 8 },
        visible: { opacity: 1, y: 0 },
    };
    const [penjabOptions, setPenjabOptions] = useState([]);
    const [isPenjabModalOpen, setIsPenjabModalOpen] = useState(false);
    const [selectedWilayah, setSelectedWilayah] = useState(null);
    const [loadingWilayah, setLoadingWilayah] = useState(false);
    const [perusahaanOptions, setPerusahaanOptions] = useState([]);
    const [sukuOptions, setSukuOptions] = useState([]);
    const [bahasaOptions, setBahasaOptions] = useState([]);
    const [cacatOptions, setCacatOptions] = useState([]);

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
        suku_bangsa_text: "",
        bahasa_pasien: "",
        bahasa_pasien_text: "",
        cacat_fisik: "",
        cacat_fisik_text: "",
        nip: "",
    });

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
                const [perusahaanRes, sukuRes, bahasaRes, cacatRes] = await Promise.all([
                    fetch('/api/perusahaan-pasien'),
                    fetch('/api/suku-bangsa'),
                    fetch('/api/bahasa-pasien'),
                    fetch('/api/cacat-fisik'),
                ]);
                if (perusahaanRes.ok) {
                    const r = await perusahaanRes.json();
                    setPerusahaanOptions((r.data || []).map((d) => ({ value: d.value, label: d.label })));
                }
                if (sukuRes.ok) {
                    const r = await sukuRes.json();
                    setSukuOptions((r.data || []).map((d) => ({ value: d.value, label: d.label })));
                }
                if (bahasaRes.ok) {
                    const r = await bahasaRes.json();
                    setBahasaOptions((r.data || []).map((d) => ({ value: d.value, label: d.label })));
                }
                if (cacatRes.ok) {
                    const r = await cacatRes.json();
                    setCacatOptions((r.data || []).map((d) => ({ value: d.value, label: d.label })));
                }
            } catch (e) {
                console.error('Error loading reference options:', e);
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
					const response = await fetch(`/api/wilayah/${data.kode_wilayah}`);
					if (response.ok) {
						const result = await response.json();
						if (result.success) {
							setSelectedWilayah(parseFullAddress(result.data.full_address));
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

	// Helper to get label from options
	const findLabelByValue = (options, value) => {
		if (!value) return "";
		const found = options.find((o) => o.value === value);
		return found ? found.label : "";
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
						setSelectedWilayah(parseFullAddress(result.data.full_address));
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

	return (
		<LanjutanRegistrasiLayout
            title="Registrasi Pasien"
            menuConfig={{ activeTab: 'pasien' }}
        >
			<Head title="Tambah Pasien Baru" />

            <motion.div className="py-6" initial="hidden" animate="visible" variants={containerVariants}>
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div variants={itemVariants} className="relative overflow-visible mb-6">
                        <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-blue-500/15 via-purple-500/15 to-indigo-500/15 dark:from-blue-600/10 dark:via-purple-600/10 dark:to-indigo-600/10" />
                        <div className="p-6 rounded-2xl bg-white/60 dark:bg-gray-900/50 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-lg">
							<div className="flex justify-between items-center">
								<div>
									<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
										Tambah Pasien Baru
									</h2>
									<p className="text-gray-600 dark:text-gray-400 mt-1">
										Masukkan data pasien baru ke dalam sistem
									</p>
								</div>
                                <Link
                                    href={route("patients.index")}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700/80 hover:bg-gray-700 text-white transition-colors"
                                >
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="w-5 h-5"
									>
										<path
											fillRule="evenodd"
											d="M7.72 12.53a.75.75 0 010-1.06L10.94 8.25H3a.75.75 0 010-1.5h7.94L7.72 3.53a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06 0z"
											clipRule="evenodd"
										/>
									</svg>
									Kembali
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form */}
					<form
						onSubmit={(e) => {
							e.preventDefault();
							post(route("patients.store"));
						}}
						className="space-y-6"
					>
                        {/* Basic Information */}
                        <div className="relative overflow-visible rounded-2xl bg-white/60 dark:bg-gray-900/50 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-lg">
                            <div className="p-6">
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
									Informasi Dasar
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Nama Lengkap *
										</label>
										<input
											type="text"
											name="nm_pasien"
											value={data.nm_pasien}
											onChange={(e) => setData("nm_pasien", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan nama lengkap"
										/>
										{getErrorMessage("nm_pasien") && (
											<p className="mt-1 text-sm text-red-600">
												{getErrorMessage("nm_pasien")}
											</p>
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
													const value = e.target.value
														.replace(/[^0-9]/g, "")
														.slice(0, 16);
													setData("no_ktp", value);
												}}
												className="w-full px-3 py-2 pr-16 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
												placeholder="Masukkan NIK (16 digit)"
												maxLength="16"
											/>
											<div
												className={`absolute inset-y-0 right-0 flex items-center pr-3 text-xs font-medium ${
													data.no_ktp.length === 16
														? "text-green-600 dark:text-green-400"
														: data.no_ktp.length > 0
														? "text-yellow-600 dark:text-yellow-400"
														: "text-gray-400 dark:text-gray-500"
												}`}
											>
												{data.no_ktp.length}/16
											</div>
										</div>
										<div className="mt-1 flex items-center justify-between">
											<div>
												{getErrorMessage("no_ktp") && (
													<p className="text-sm text-red-600">
														{getErrorMessage("no_ktp")}
													</p>
												)}
											</div>
											<div
												className={`text-xs ${
													data.no_ktp.length === 16
														? "text-green-600 dark:text-green-400"
														: data.no_ktp.length > 0
														? "text-yellow-600 dark:text-yellow-400"
														: "text-gray-400 dark:text-gray-500"
												}`}
											>
												{data.no_ktp.length === 16 ? (
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
												) : data.no_ktp.length > 0 ? (
													<span>Kurang {16 - data.no_ktp.length} digit</span>
												) : (
													<span>NIK harus 16 digit</span>
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
											onChange={(e) => setData("jk", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
										>
											<option value="L">Laki-laki</option>
											<option value="P">Perempuan</option>
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
											onChange={(e) => setData("tmp_lahir", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan tempat lahir"
										/>
										{getErrorMessage("tmp_lahir") && (
											<p className="mt-1 text-sm text-red-600">
												{getErrorMessage("tmp_lahir")}
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
											onChange={(e) => setData("tgl_lahir", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
										/>
										{getErrorMessage("tgl_lahir") && (
											<p className="mt-1 text-sm text-red-600">
												{getErrorMessage("tgl_lahir")}
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
											onChange={(e) => setData("nm_ibu", e.target.value)}
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
						</div>

                        {/* Contact Information */}
                        <div className="bg-white dark:bg-gray-800 overflow-visible shadow-sm sm:rounded-lg">
							<div className="p-6">
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
									Informasi Kontak
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="md:col-span-2">
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Alamat *
										</label>
										<textarea
											name="alamat"
											value={data.alamat}
											onChange={(e) => setData("alamat", e.target.value)}
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
											onChange={(e) => setData("no_tlp", e.target.value)}
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
											onChange={(e) => setData("email", e.target.value)}
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
						</div>

                        {/* Additional Information */}
                        <div className="bg-white dark:bg-gray-800 overflow-visible shadow-sm sm:rounded-lg">
							<div className="p-6">
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
									Informasi Tambahan
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Golongan Darah
										</label>
										<select
											name="gol_darah"
											value={data.gol_darah}
											onChange={(e) => setData("gol_darah", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
										>
											<option value="">Pilih Golongan Darah</option>
											<option value="A">A</option>
											<option value="B">B</option>
											<option value="O">O</option>
											<option value="AB">AB</option>
											<option value="-">Tidak Diketahui</option>
										</select>
										{getErrorMessage("gol_darah") && (
											<p className="mt-1 text-sm text-red-600">
												{getErrorMessage("gol_darah")}
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
											onChange={(e) => setData("stts_nikah", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
										>
											<option value="BELUM MENIKAH">Belum Menikah</option>
											<option value="MENIKAH">Menikah</option>
											<option value="JANDA">Janda</option>
											<option value="DUDHA">Duda</option>
											<option value="JOMBLO">Jomblo</option>
										</select>
										{getErrorMessage("stts_nikah") && (
											<p className="mt-1 text-sm text-red-600">
												{getErrorMessage("stts_nikah")}
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
											onChange={(e) => setData("agama", e.target.value)}
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
											onChange={(e) => setData("pekerjaan", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan pekerjaan"
										/>
										{getErrorMessage("pekerjaan") && (
											<p className="mt-1 text-sm text-red-600">
												{getErrorMessage("pekerjaan")}
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
                                            onChange={(e) => setData("pnd", e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="TS">Tidak Sekolah</option>
                                            <option value="TK">Taman Kanak-kanak</option>
                                            <option value="SD">Sekolah Dasar</option>
                                            <option value="SMP">Sekolah Menengah Pertama</option>
                                            <option value="SMA">Sekolah Menengah Atas</option>
                                            <option value="SLTA/SEDERAJAT">SLTA/Sederajat</option>
                                            <option value="D1">Diploma 1</option>
                                            <option value="D2">Diploma 2</option>
                                            <option value="D3">Diploma 3</option>
                                            <option value="D4">Diploma 4</option>
                                            <option value="S1">Sarjana</option>
                                            <option value="S2">Magister</option>
                                            <option value="S3">Doktor</option>
                                            <option value="-">Tidak Diketahui</option>
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
                                            onChange={(e) => setData("no_peserta", e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="Masukkan nomor peserta BPJS/Asuransi"
                                        />
                                        {getErrorMessage("no_peserta") && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {getErrorMessage("no_peserta")}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

						{/* Family Information */}
                        <div className="relative overflow-visible rounded-2xl bg-white/60 dark:bg-gray-900/50 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-lg mb-8">
							<div className="p-6">
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
									Informasi Keluarga
								</h3>
								<div
									className="grid grid-cols-1 md:grid-cols-2 gap-6"
									style={{ position: "relative", zIndex: 1 }}
								>
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Hubungan Keluarga
										</label>
										<select
											name="keluarga"
											value={data.keluarga}
											onChange={(e) => setData("keluarga", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
										>
											<option value="AYAH">Ayah</option>
											<option value="IBU">Ibu</option>
											<option value="ISTRI">Istri</option>
											<option value="SUAMI">Suami</option>
											<option value="SAUDARA">Saudara</option>
											<option value="ANAK">Anak</option>
											<option value="DIRI SENDIRI">Diri Sendiri</option>
											<option value="LAIN-LAIN">Lain-lain</option>
										</select>
										{getErrorMessage("keluarga") && (
											<p className="mt-1 text-sm text-red-600">
												{getErrorMessage("keluarga")}
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
											onChange={(e) => setData("namakeluarga", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan nama keluarga"
										/>
										{getErrorMessage("namakeluarga") && (
											<p className="mt-1 text-sm text-red-600">
												{getErrorMessage("namakeluarga")}
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
											onChange={(e) => setData("pekerjaanpj", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan pekerjaan keluarga"
										/>
										{getErrorMessage("pekerjaanpj") && (
											<p className="mt-1 text-sm text-red-600">
												{getErrorMessage("pekerjaanpj")}
											</p>
										)}
									</div>

									<SelectWithAdd
										label="Penanggung Jawab"
										name="kd_pj"
										value={data.kd_pj}
										onChange={(e) => setData("kd_pj", e.target.value)}
										options={penjabOptions}
										placeholder="Pilih penanggung jawab"
										error={getErrorMessage("kd_pj")}
										required={true}
										onAdd={handleAddPenjab}
										addButtonText="Tambah Penjab"
									/>

									<div className="md:col-span-2">
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Alamat Keluarga *
										</label>
										<textarea
											name="alamatpj"
											value={data.alamatpj}
											onChange={(e) => setData("alamatpj", e.target.value)}
											rows={3}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan alamat keluarga"
										/>
										{getErrorMessage("alamatpj") && (
											<p className="mt-1 text-sm text-red-600">
												{getErrorMessage("alamatpj")}
											</p>
										)}
									</div>

									<WilayahSearchableSelect
										label="Pilih Kelurahan/Desa"
										name="kode_wilayah"
										value={data.kode_wilayah}
										onChange={handleWilayahChange}
										level="village"
										placeholder="Pilih atau cari kelurahan/desa"
										error={getErrorMessage("kode_wilayah")}
										required={true}
										searchPlaceholder="Ketik nama kelurahan/desa..."
										noOptionsText="Tidak ada kelurahan/desa ditemukan"
										loadingText="Memuat data kelurahan/desa..."
									/>

									{/* Address Display */}
									<AddressDisplay
										selectedWilayah={selectedWilayah}
										loading={loadingWilayah}
										className="mt-2"
									/>
								</div>
							</div>
						</div>

                        {/* Referensi Tambahan (Perusahaan, Suku Bangsa, Bahasa, Cacat Fisik, NIP) */}
                        <div className="bg-white dark:bg-gray-800 overflow-visible shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Informasi Administrasi
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Perusahaan Pasien: Textbox Pencarian + Dropdown (SearchableSelect) */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Perusahaan Pasien *
                                        </label>
                                        <SearchableSelect
                                            options={perusahaanOptions}
                                            value={data.perusahaan_pasien}
                                            onChange={(val) => {
                                                setData('perusahaan_pasien', val);
                                            }}
                                            placeholder="Pilih atau cari perusahaan pasien"
                                            searchPlaceholder="Ketik nama_perusahaan untuk mencari..."
                                            displayKey="label"
                                            valueKey="value"
                                            error={!!getErrorMessage('perusahaan_pasien')}
                                        />
                                        {getErrorMessage('perusahaan_pasien') && (
                                            <p className="mt-1 text-sm text-red-600">{getErrorMessage('perusahaan_pasien')}</p>
                                        )}
                                    </div>

                                    {/* Suku Bangsa: Dropdown + Textbox Join */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Suku Bangsa *
                                        </label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <SearchableSelect
                                                options={sukuOptions}
                                                value={data.suku_bangsa}
                                                onChange={(val) => {
                                                    setData('suku_bangsa', val);
                                                    setData('suku_bangsa_text', findLabelByValue(sukuOptions, val));
                                                }}
                                                placeholder="Pilih suku bangsa"
                                                error={!!getErrorMessage('suku_bangsa')}
                                            />
                                            <input
                                                type="text"
                                                name="suku_bangsa_text"
                                                value={data.suku_bangsa_text}
                                                onChange={(e) => setData('suku_bangsa_text', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                placeholder="Isi suku bangsa (manual)"
                                            />
                                        </div>
                                        {getErrorMessage('suku_bangsa') && (
                                            <p className="mt-1 text-sm text-red-600">{getErrorMessage('suku_bangsa')}</p>
                                        )}
                                        <p className="mt-1 text-xs text-gray-500">Jika tidak ada di daftar, isi manual di kolom sebelah.</p>
                                    </div>

                                    {/* Bahasa Pasien: Dropdown + Textbox Join */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Bahasa Pasien *
                                        </label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <SearchableSelect
                                                options={bahasaOptions}
                                                value={data.bahasa_pasien}
                                                onChange={(val) => {
                                                    setData('bahasa_pasien', val);
                                                    setData('bahasa_pasien_text', findLabelByValue(bahasaOptions, val));
                                                }}
                                                placeholder="Pilih bahasa pasien"
                                                error={!!getErrorMessage('bahasa_pasien')}
                                            />
                                            <input
                                                type="text"
                                                name="bahasa_pasien_text"
                                                value={data.bahasa_pasien_text}
                                                onChange={(e) => setData('bahasa_pasien_text', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                placeholder="Isi bahasa pasien (manual)"
                                            />
                                        </div>
                                        {getErrorMessage('bahasa_pasien') && (
                                            <p className="mt-1 text-sm text-red-600">{getErrorMessage('bahasa_pasien')}</p>
                                        )}
                                        <p className="mt-1 text-xs text-gray-500">Jika tidak ada di daftar, isi manual di kolom sebelah.</p>
                                    </div>

                                    {/* Cacat Fisik: Dropdown + Textbox Join */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Cacat Fisik *
                                        </label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <SearchableSelect
                                                options={cacatOptions}
                                                value={data.cacat_fisik}
                                                onChange={(val) => {
                                                    setData('cacat_fisik', val);
                                                    setData('cacat_fisik_text', findLabelByValue(cacatOptions, val));
                                                }}
                                                placeholder="Pilih cacat fisik"
                                                error={!!getErrorMessage('cacat_fisik')}
                                            />
                                            <input
                                                type="text"
                                                name="cacat_fisik_text"
                                                value={data.cacat_fisik_text}
                                                onChange={(e) => setData('cacat_fisik_text', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                placeholder="Isi cacat fisik (manual)"
                                            />
                                        </div>
                                        {getErrorMessage('cacat_fisik') && (
                                            <p className="mt-1 text-sm text-red-600">{getErrorMessage('cacat_fisik')}</p>
                                        )}
                                        <p className="mt-1 text-xs text-gray-500">Jika tidak ada di daftar, isi manual di kolom sebelah.</p>
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
                                            onChange={(e) => setData('nip', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="Masukkan NIP (opsional)"
                                        />
                                        {getErrorMessage('nip') && (
                                            <p className="mt-1 text-sm text-red-600">{getErrorMessage('nip')}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="relative overflow-visible rounded-2xl bg-white/60 dark:bg-gray-900/50 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-lg">
                            <div className="p-6">
                                <div className="flex justify-end gap-4">
                                    <Link
                                        href={route("patients.index")}
                                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        Simpan
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>

					{/* Penjab Create Modal */}
					<PenjabCreateModal
						isOpen={isPenjabModalOpen}
						onClose={() => setIsPenjabModalOpen(false)}
						onSuccess={handlePenjabSuccess}
					/>
				</div>
			</motion.div>
		</LanjutanRegistrasiLayout>
	);
}
