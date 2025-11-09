import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { route } from "ziggy-js";
import SelectWithAdd from "@/Components/SelectWithAdd";
import SearchableSelect from "@/Components/SearchableSelect";
import PenjabCreateModal from "@/Components/PenjabCreateModal";
import WilayahSearchableSelect from "@/Components/WilayahSearchableSelect";
import AddressDisplay from "@/Components/AddressDisplay";

export default function PatientCreateModal({ isOpen, onClose, onSuccess }) {
	const [penjabOptions, setPenjabOptions] = useState([]);
	const [isPenjabModalOpen, setIsPenjabModalOpen] = useState(false);
	const [selectedWilayah, setSelectedWilayah] = useState(null);
	const [loadingWilayah, setLoadingWilayah] = useState(false);
    const [perusahaanOptions, setPerusahaanOptions] = useState([]);
    const [sukuOptions, setSukuOptions] = useState([]);
    const [bahasaOptions, setBahasaOptions] = useState([]);
    const [cacatOptions, setCacatOptions] = useState([]);

	const { data, setData, post, processing, errors, reset } = useForm({
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
        suku_bangsa: "",
        bahasa_pasien: "",
        cacat_fisik: "",
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

		if (isOpen) {
			loadPenjabOptions();
		}
	}, [isOpen]);

    // Load reference options (perusahaan pasien, suku bangsa, bahasa pasien, cacat fisik) when modal opens
    useEffect(() => {
        const loadRefs = async () => {
            try {
                const [perusahaanRes, sukuRes, bahasaRes, cacatRes] = await Promise.all([
                    axios.get('/api/perusahaan-pasien'),
                    axios.get('/api/suku-bangsa'),
                    axios.get('/api/bahasa-pasien'),
                    axios.get('/api/cacat-fisik'),
                ]);

                const perusahaanData = Array.isArray(perusahaanRes?.data?.data) ? perusahaanRes.data.data : [];
                const sukuData = Array.isArray(sukuRes?.data?.data) ? sukuRes.data.data : [];
                const bahasaData = Array.isArray(bahasaRes?.data?.data) ? bahasaRes.data.data : [];
                const cacatData = Array.isArray(cacatRes?.data?.data) ? cacatRes.data.data : [];

                setPerusahaanOptions(perusahaanData.map((d) => ({ value: d.value, label: d.label })));
                setSukuOptions(sukuData.map((d) => ({ value: d.value, label: d.label })));
                setBahasaOptions(bahasaData.map((d) => ({ value: d.value, label: d.label })));
                setCacatOptions(cacatData.map((d) => ({ value: d.value, label: d.label })));
            } catch (e) {
                console.error('Error loading reference options:', e);
            }
        };
        if (isOpen) {
            loadRefs();
        }
    }, [isOpen]);

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

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Submitting form with data:", data);
		post(route("patients.store"), {
			onSuccess: (page) => {
				console.log("Success response:", page);
				alert("Pasien berhasil ditambahkan!");
				onSuccess();
				onClose();
			},
			onError: (errors) => {
				console.error("Form submission errors:", errors);
				alert("Terjadi kesalahan: " + JSON.stringify(errors));
			},
			onFinish: () => {
				console.log("Form submission finished");
			},
		});
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
							className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-2xl border border-white/30 dark:border-gray-700/50 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
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
							{/* Header */}
							<motion.div
								className="flex justify-between items-center p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700"
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3, delay: 0.1 }}
							>
								<div>
									<h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">
										Tambah Pasien Baru
									</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										Masukkan data pasien baru ke dalam sistem
									</p>
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
							<div className="p-4 lg:p-6">
								<form onSubmit={handleSubmit} className="space-y-6">
									{/* Basic Information */}
									<motion.div
										className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.3, delay: 0.2 }}
									>
										<h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
											Informasi Dasar
										</h4>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
													Nama Lengkap *
												</label>
												<input
													type="text"
													name="nm_pasien"
													value={data.nm_pasien}
													onChange={(e) => setData("nm_pasien", e.target.value)}
													className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
													placeholder="Masukkan nama lengkap"
												/>
												{getErrorMessage("nm_pasien") && (
													<p className="mt-1 text-xs text-red-600">
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
															const value = e.target.value
																.replace(/[^0-9]/g, "")
																.slice(0, 16);
															setData("no_ktp", value);
														}}
														className="w-full px-3 py-2 pr-12 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
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
												{getErrorMessage("no_ktp") && (
													<p className="mt-1 text-xs text-red-600">
														{getErrorMessage("no_ktp")}
													</p>
												)}
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
													Jenis Kelamin *
												</label>
												<select
													name="jk"
													value={data.jk}
													onChange={(e) => setData("jk", e.target.value)}
													className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
												>
													<option value="L">Laki-laki</option>
													<option value="P">Perempuan</option>
												</select>
												{getErrorMessage("jk") && (
													<p className="mt-1 text-xs text-red-600">
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
													className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
													placeholder="Masukkan tempat lahir"
												/>
												{getErrorMessage("tmp_lahir") && (
													<p className="mt-1 text-xs text-red-600">
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
													className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
												/>
												{getErrorMessage("tgl_lahir") && (
													<p className="mt-1 text-xs text-red-600">
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
													className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
													placeholder="Masukkan nama ibu"
												/>
												{getErrorMessage("nm_ibu") && (
													<p className="mt-1 text-xs text-red-600">
														{getErrorMessage("nm_ibu")}
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
										transition={{ duration: 0.3, delay: 0.45 }}
									>
					<h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
						Informasi Administrasi
					</h4>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                No. Peserta
                            </label>
                            <input
                                type="text"
                                name="no_peserta"
                                value={data.no_peserta}
                                onChange={(e) => setData("no_peserta", e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                placeholder="Masukkan nomor peserta BPJS/Asuransi"
                            />
                            {getErrorMessage("no_peserta") && (
                                <p className="mt-1 text-xs text-red-600">
                                    {getErrorMessage("no_peserta")}
                                </p>
                            )}
                        </div>
                        {/* Baris 4 kolom: Bahasa, Suku, Perusahaan, Cacat */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {/* Bahasa Pasien */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bahasa Pasien</label>
                                <SearchableSelect
                                    options={bahasaOptions}
                                    value={data.bahasa_pasien}
                                    onChange={(val) => { setData('bahasa_pasien', val); }}
                                    placeholder="Pilih bahasa"
                                    searchPlaceholder="Ketik nama bahasa untuk mencari..."
                                    displayKey="label"
                                    valueKey="value"
                                    error={!!getErrorMessage('bahasa_pasien')}
                                />
                                {getErrorMessage('bahasa_pasien') && (
                                    <p className="mt-1 text-xs text-red-600">{getErrorMessage('bahasa_pasien')}</p>
                                )}
                            </div>

                            {/* Suku Bangsa */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Suku Bangsa</label>
                                <SearchableSelect
                                    options={sukuOptions}
                                    value={data.suku_bangsa}
                                    onChange={(val) => { setData('suku_bangsa', val); }}
                                    placeholder="Pilih suku bangsa"
                                    searchPlaceholder="Ketik nama suku bangsa untuk mencari..."
                                    displayKey="label"
                                    valueKey="value"
                                    error={!!getErrorMessage('suku_bangsa')}
                                />
                                {getErrorMessage('suku_bangsa') && (
                                    <p className="mt-1 text-xs text-red-600">{getErrorMessage('suku_bangsa')}</p>
                                )}
                            </div>

                            {/* Perusahaan Pasien */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Perusahaan Pasien</label>
                                <SearchableSelect
                                    options={perusahaanOptions}
                                    value={data.perusahaan_pasien}
                                    onChange={(val) => { setData('perusahaan_pasien', val); }}
                                    placeholder="Pilih atau cari perusahaan pasien"
                                    searchPlaceholder="Ketik nama_perusahaan untuk mencari..."
                                    displayKey="label"
                                    valueKey="value"
                                    error={!!getErrorMessage('perusahaan_pasien')}
                                />
                                {getErrorMessage('perusahaan_pasien') && (
                                    <p className="mt-1 text-xs text-red-600">{getErrorMessage('perusahaan_pasien')}</p>
                                )}
                            </div>

                            {/* Cacat Fisik */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cacat Fisik</label>
                                <SearchableSelect
                                    options={cacatOptions}
                                    value={data.cacat_fisik}
                                    onChange={(val) => { setData('cacat_fisik', val); }}
                                    placeholder="Pilih cacat fisik"
                                    searchPlaceholder="Ketik nama cacat fisik untuk mencari..."
                                    displayKey="label"
                                    valueKey="value"
                                    error={!!getErrorMessage('cacat_fisik')}
                                />
                                {getErrorMessage('cacat_fisik') && (
                                    <p className="mt-1 text-xs text-red-600">{getErrorMessage('cacat_fisik')}</p>
                                )}
                            </div>
                        </div>
                    </div>
									</motion.div>

									{/* Contact Information */}
									<motion.div
										className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.3, delay: 0.3 }}
									>
										<h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
											Informasi Kontak
										</h4>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="md:col-span-2">
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
													Alamat *
												</label>
												<textarea
													name="alamat"
													value={data.alamat}
													onChange={(e) => setData("alamat", e.target.value)}
													rows={3}
													className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
													placeholder="Masukkan alamat lengkap"
												/>
												{getErrorMessage("alamat") && (
													<p className="mt-1 text-xs text-red-600">
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
													className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
													placeholder="Masukkan nomor telepon"
												/>
												{getErrorMessage("no_tlp") && (
													<p className="mt-1 text-xs text-red-600">
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
													className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
													placeholder="Masukkan email"
												/>
												{getErrorMessage("email") && (
													<p className="mt-1 text-xs text-red-600">
														{getErrorMessage("email")}
													</p>
												)}
											</div>
										</div>
									</motion.div>

									{/* Family Information */}
									<motion.div
										className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.3, delay: 0.4 }}
									>
					<h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
						Informasi Keluarga
					</h4>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
													Hubungan Keluarga
												</label>
												<select
													name="keluarga"
													value={data.keluarga}
													onChange={(e) => setData("keluarga", e.target.value)}
													className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
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
													<p className="mt-1 text-xs text-red-600">
														{getErrorMessage("keluarga")}
													</p>
												)}
						</div>

						{/* Pekerjaan Penanggung Jawab */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Pekerjaan Penanggung Jawab *
							</label>
							<input
								type="text"
								name="pekerjaanpj"
								value={data.pekerjaanpj}
								onChange={(e) => setData("pekerjaanpj", e.target.value)}
								className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								placeholder="Masukkan pekerjaan penanggung jawab"
							/>
							{getErrorMessage("pekerjaanpj") && (
								<p className="mt-1 text-xs text-red-600">
									{getErrorMessage("pekerjaanpj")}
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
														setData("namakeluarga", e.target.value)
													}
													className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
													placeholder="Masukkan nama keluarga"
												/>
												{getErrorMessage("namakeluarga") && (
													<p className="mt-1 text-xs text-red-600">
														{getErrorMessage("namakeluarga")}
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
													className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
													placeholder="Masukkan alamat keluarga"
												/>
												{getErrorMessage("alamatpj") && (
													<p className="mt-1 text-xs text-red-600">
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

											<AddressDisplay
												selectedWilayah={selectedWilayah}
												loading={loadingWilayah}
												className="mt-2"
											/>
										</div>
									</motion.div>

									{/* Action Buttons */}
									<motion.div
										className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4"
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.3, delay: 0.5 }}
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
											disabled={processing}
											className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
											whileHover={{ scale: processing ? 1 : 1.02 }}
											whileTap={{ scale: processing ? 1 : 0.98 }}
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
											{processing ? "Menyimpan..." : "Simpan Pasien"}
										</motion.button>
									</motion.div>
								</form>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Penjab Create Modal */}
			<PenjabCreateModal
				isOpen={isPenjabModalOpen}
				onClose={() => setIsPenjabModalOpen(false)}
				onSuccess={handlePenjabSuccess}
			/>
		</>
	);
}
