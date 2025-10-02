import React, { useState, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import PatientCreateModal from "@/Components/PatientCreateModal";

export default function Registration({
	auth,
	dokters,
	polikliniks,
	penjabs,
	registrations,
}) {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [isSearching, setIsSearching] = useState(false);
	const [selectedPatient, setSelectedPatient] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [selectedRegistration, setSelectedRegistration] = useState(null);
	const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
	const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
	const [registrationData, setRegistrationData] = useState(registrations);
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [isFilterExpanded, setIsFilterExpanded] = useState(false);
	const [stats, setStats] = useState({
		total: 0,
		belum: 0,
		selesai: 0,
		batal: 0,
		baru: 0,
		lama: 0,
		totalBiaya: 0,
	});
	const [filters, setFilters] = useState({
		date: new Date().toISOString().split("T")[0],
		kd_poli: "",
		kd_dokter: "",
		search: "",
		status: "",
		status_poli: "",
	});

	const [formData, setFormData] = useState({
		kd_dokter: "",
		kd_poli: "",
		kd_pj: "",
		p_jawab: "",
		almt_pj: "",
		hubunganpj: "DIRI SENDIRI",
	});

	const [poliStatus, setPoliStatus] = useState({
		status_poli: "",
		biaya_reg: 0,
		has_registered: false,
	});

	// Search patients
	const handleSearch = async (term) => {
		if (!term.trim()) {
			setSearchResults([]);
			return;
		}

		setIsSearching(true);
		try {
			const response = await axios.get("/registration/search-patients", {
				params: { search: term },
			});
			setSearchResults(response.data.data);
		} catch (error) {
			console.error("Error searching patients:", error);
			alert("Gagal mencari data pasien");
		} finally {
			setIsSearching(false);
		}
	};

	// Handle search input change with debounce
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			handleSearch(searchTerm);
		}, 500);

		return () => clearTimeout(timeoutId);
	}, [searchTerm]);

	// Select patient for registration
	const selectPatient = (patient) => {
		setSelectedPatient(patient);
		setFormData({
			...formData,
			p_jawab: patient.namakeluarga || "",
			almt_pj: patient.alamatpj || patient.alamat || "",
		});
		setIsModalOpen(true);
	};

	// Handle form change
	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});

		// Check poli status when polyclinic changes
		if (name === "kd_poli" && value && selectedPatient) {
			checkPoliStatus(value);
		}
	};

	// Check patient status in polyclinic
	const checkPoliStatus = async (kd_poli) => {
		try {
			const response = await axios.get(
				`/registration/${selectedPatient.no_rkm_medis}/check-poli-status`,
				{
					params: { kd_poli },
				}
			);
			setPoliStatus(response.data.data);
		} catch (error) {
			console.error("Error checking poli status:", error);
		}
	};

	// Handle registration submission
	const handleSubmitRegister = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const response = await axios.post(
				`/registration/${selectedPatient.no_rkm_medis}/register`,
				formData
			);

			if (response.data.success) {
				alert(response.data.message);
				setIsModalOpen(false);
				resetForm();
				// Refresh registrations
				loadRegistrations();
			}
		} catch (error) {
			console.error("Error registering patient:", error);
			if (error.response?.data?.message) {
				alert(error.response.data.message);
			} else {
				alert("Gagal mendaftarkan pasien");
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	// Reset form
	const resetForm = () => {
		setSelectedPatient(null);
		setFormData({
			kd_dokter: "",
			kd_poli: "",
			kd_pj: "",
			p_jawab: "",
			almt_pj: "",
			hubunganpj: "DIRI SENDIRI",
		});
		setPoliStatus({
			status_poli: "",
			biaya_reg: 0,
			has_registered: false,
		});
	};

	// Close modal
	const closeModal = () => {
		setIsModalOpen(false);
		resetForm();
	};

	// Open detail modal
	const openDetailModal = (registration) => {
		setSelectedRegistration(registration);
		setIsDetailModalOpen(true);
	};

	// Close detail modal
	const closeDetailModal = () => {
		setIsDetailModalOpen(false);
		setSelectedRegistration(null);
	};

	// Open patient modal
	const openPatientModal = () => {
		setIsPatientModalOpen(true);
	};

	// Close patient modal
	const closePatientModal = () => {
		setIsPatientModalOpen(false);
	};

	// Handle patient creation success
	const handlePatientSuccess = () => {
		// Refresh search results or show success message
		alert("Pasien berhasil ditambahkan!");
		// Optionally refresh the page or search results
		loadRegistrations();
	};

	// Calculate stats from registration data
	const calculateStats = (data) => {
		if (!data || !data.data || data.data.length === 0) {
			return {
				total: data?.total || 0,
				belum: 0,
				selesai: 0,
				batal: 0,
				baru: 0,
				lama: 0,
				totalBiaya: 0,
			};
		}

		const registrations = data.data;
		const stats = {
			total: data.total || registrations.length,
			belum: registrations.filter((r) => r.stts === "Belum").length,
			selesai: registrations.filter((r) => r.stts === "Sudah").length,
			batal: registrations.filter((r) => r.stts === "Batal").length,
			baru: registrations.filter((r) => r.status_poli === "Baru").length,
			lama: registrations.filter((r) => r.status_poli === "Lama").length,
			totalBiaya: registrations.reduce((sum, r) => sum + (r.biaya_reg || 0), 0),
		};

		return stats;
	};

	// Load registrations with filters
	const loadRegistrations = async (page = 1) => {
		setIsLoading(true);
		try {
			const response = await axios.get("/registration/get-registrations", {
				params: { ...filters, page },
			});
			setRegistrationData(response.data.data);
			setStats(calculateStats(response.data.data));
			setCurrentPage(page);
		} catch (error) {
			console.error("Error loading registrations:", error);
		} finally {
			setIsLoading(false);
		}
	};

	// Handle filter change
	const handleFilterChange = (e) => {
		const { name, value } = e.target;
		setFilters({
			...filters,
			[name]: value,
		});
	};

	// Load registrations when filters change (with debounce for search)
	useEffect(() => {
		const timeoutId = setTimeout(
			() => {
				loadRegistrations(1); // Reset to page 1 when filters change
			},
			filters.search ? 500 : 0
		); // Debounce search input

		return () => clearTimeout(timeoutId);
	}, [
		filters.date,
		filters.kd_poli,
		filters.kd_dokter,
		filters.search,
		filters.status,
		filters.status_poli,
	]);

	// Calculate initial stats
	useEffect(() => {
		setStats(calculateStats(registrations));
	}, []);

	// Cancel registration
	const handleCancelRegistration = async (no_rawat) => {
		if (!confirm("Apakah Anda yakin ingin membatalkan registrasi ini?")) {
			return;
		}

		try {
			const response = await axios.post("/registration/cancel", {
				no_rawat: no_rawat,
			});

			if (response.data.success) {
				alert(response.data.message);
				// Refresh registrations and stats
				loadRegistrations();
			}
		} catch (error) {
			console.error("Error cancelling registration:", error);
			if (error.response?.data?.message) {
				alert(error.response.data.message);
			} else {
				alert("Gagal membatalkan registrasi");
			}
		}
	};

	return (
		<AppLayout title="Pendaftaran Pasien">
			<Head title="Pendaftaran Pasien" />

			{/* Header */}
			<motion.div
				className="flex items-center justify-between mb-6"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<div>
					<h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
						Pendaftaran Pasien ke Poliklinik
					</h1>
					<p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
						Sistem pendaftaran pasien ke poliklinik
					</p>
				</div>
				<motion.button
					onClick={openPatientModal}
					className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-lg"
					whileHover={{ scale: 1.05, y: -2 }}
					whileTap={{ scale: 0.95 }}
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.3, delay: 0.2 }}
				>
					<svg
						className="w-5 h-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 6v6m0 0v6m0-6h6m-6 0H6"
						/>
					</svg>
					Tambah Pasien
				</motion.button>
			</motion.div>

			{/* Stats Cards */}
			<motion.div
				className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 lg:gap-4 mb-6"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.3 }}
			>
				{/* Total Registrasi */}
				<motion.div
					className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30 p-4 rounded-xl border border-blue-200 dark:border-blue-700/50"
					whileHover={{ scale: 1.02, y: -2 }}
					transition={{ duration: 0.2 }}
				>
					<div className="flex items-center justify-between">
						<div>
							<p className="text-xs lg:text-sm font-medium text-blue-600 dark:text-blue-400">
								Total
							</p>
							<p className="text-xl lg:text-2xl font-bold text-blue-700 dark:text-blue-300">
								{stats.total}
							</p>
						</div>
						<div className="p-2 bg-blue-500 rounded-lg">
							<svg
								className="w-4 h-4 text-white"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								/>
							</svg>
						</div>
					</div>
				</motion.div>

				{/* Status Belum */}
				<motion.div
					className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/30 p-4 rounded-xl border border-red-200 dark:border-red-700/50"
					whileHover={{ scale: 1.02, y: -2 }}
					transition={{ duration: 0.2 }}
				>
					<div className="flex items-center justify-between">
						<div>
							<p className="text-xs lg:text-sm font-medium text-red-600 dark:text-red-400">
								Belum
							</p>
							<p className="text-xl lg:text-2xl font-bold text-red-700 dark:text-red-300">
								{stats.belum}
							</p>
						</div>
						<div className="p-2 bg-red-500 rounded-lg">
							<svg
								className="w-4 h-4 text-white"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
					</div>
				</motion.div>

				{/* Status Selesai */}
				<motion.div
					className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/30 p-4 rounded-xl border border-green-200 dark:border-green-700/50"
					whileHover={{ scale: 1.02, y: -2 }}
					transition={{ duration: 0.2 }}
				>
					<div className="flex items-center justify-between">
						<div>
							<p className="text-xs lg:text-sm font-medium text-green-600 dark:text-green-400">
								Selesai
							</p>
							<p className="text-xl lg:text-2xl font-bold text-green-700 dark:text-green-300">
								{stats.selesai}
							</p>
						</div>
						<div className="p-2 bg-green-500 rounded-lg">
							<svg
								className="w-4 h-4 text-white"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</div>
					</div>
				</motion.div>

				{/* Status Batal */}
				<motion.div
					className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/30 p-4 rounded-xl border border-gray-200 dark:border-gray-700/50"
					whileHover={{ scale: 1.02, y: -2 }}
					transition={{ duration: 0.2 }}
				>
					<div className="flex items-center justify-between">
						<div>
							<p className="text-xs lg:text-sm font-medium text-gray-600 dark:text-gray-400">
								Batal
							</p>
							<p className="text-xl lg:text-2xl font-bold text-gray-700 dark:text-gray-300">
								{stats.batal}
							</p>
						</div>
						<div className="p-2 bg-gray-500 rounded-lg">
							<svg
								className="w-4 h-4 text-white"
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
						</div>
					</div>
				</motion.div>

				{/* Pasien Baru */}
				<motion.div
					className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/30 p-4 rounded-xl border border-purple-200 dark:border-purple-700/50"
					whileHover={{ scale: 1.02, y: -2 }}
					transition={{ duration: 0.2 }}
				>
					<div className="flex items-center justify-between">
						<div>
							<p className="text-xs lg:text-sm font-medium text-purple-600 dark:text-purple-400">
								Baru
							</p>
							<p className="text-xl lg:text-2xl font-bold text-purple-700 dark:text-purple-300">
								{stats.baru}
							</p>
						</div>
						<div className="p-2 bg-purple-500 rounded-lg">
							<svg
								className="w-4 h-4 text-white"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
								/>
							</svg>
						</div>
					</div>
				</motion.div>

				{/* Pasien Lama */}
				<motion.div
					className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/30 p-4 rounded-xl border border-orange-200 dark:border-orange-700/50"
					whileHover={{ scale: 1.02, y: -2 }}
					transition={{ duration: 0.2 }}
				>
					<div className="flex items-center justify-between">
						<div>
							<p className="text-xs lg:text-sm font-medium text-orange-600 dark:text-orange-400">
								Lama
							</p>
							<p className="text-xl lg:text-2xl font-bold text-orange-700 dark:text-orange-300">
								{stats.lama}
							</p>
						</div>
						<div className="p-2 bg-orange-500 rounded-lg">
							<svg
								className="w-4 h-4 text-white"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
								/>
							</svg>
						</div>
					</div>
				</motion.div>

				{/* Total Biaya */}
				<motion.div
					className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/30 p-4 rounded-xl border border-yellow-200 dark:border-yellow-700/50"
					whileHover={{ scale: 1.02, y: -2 }}
					transition={{ duration: 0.2 }}
				>
					<div className="flex items-center justify-between">
						<div>
							<p className="text-xs lg:text-sm font-medium text-yellow-600 dark:text-yellow-400">
								Total Biaya
							</p>
							<p className="text-lg lg:text-xl font-bold text-yellow-700 dark:text-yellow-300">
								Rp {stats.totalBiaya.toLocaleString("id-ID")}
							</p>
						</div>
						<div className="p-2 bg-yellow-500 rounded-lg">
							<svg
								className="w-4 h-4 text-white"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
								/>
							</svg>
						</div>
					</div>
				</motion.div>
			</motion.div>

			{/* Main Content */}
			<motion.div
				className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg"
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				<div className="flex flex-col lg:flex-row min-h-[600px] lg:h-[800px]">
					{/* Left Panel - Patient Search (Mobile: Full Width, Desktop: 40%) */}
					<motion.div
						className="w-full lg:w-2/5 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700 p-4 lg:p-6"
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
					>
						<div className="h-full flex flex-col">
							<motion.div
								className="mb-4 lg:mb-6"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5, delay: 0.5 }}
							>
								<div className="flex items-center justify-between mb-3 lg:mb-4">
									<h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white">
										Cari Pasien
									</h3>
									<motion.button
										onClick={openPatientModal}
										className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 text-xs rounded-md flex items-center gap-1 transition-colors shadow-sm"
										whileHover={{ scale: 1.05, y: -1 }}
										whileTap={{ scale: 0.95 }}
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ duration: 0.3, delay: 0.6 }}
									>
										<svg
											className="w-3 h-3"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M12 6v6m0 0v6m0-6h6m-6 0H6"
											/>
										</svg>
										Tambah
									</motion.button>
								</div>

								{/* Search Input */}
								<motion.div
									className="relative"
									whileFocus={{ scale: 1.02 }}
									transition={{ duration: 0.2 }}
								>
									<input
										type="text"
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										placeholder="Cari berdasarkan nama, nomor RM, atau KTP..."
										className="w-full px-4 py-2 lg:py-3 pl-10 text-sm lg:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
									/>
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<svg
											className="h-5 w-5 text-gray-400"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
											/>
										</svg>
									</div>
									{isSearching && (
										<div className="absolute inset-y-0 right-0 pr-3 flex items-center">
											<svg
												className="animate-spin h-5 w-5 text-blue-500"
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
										</div>
									)}
								</motion.div>
							</motion.div>

							{/* Search Results */}
							<div className="flex-1 overflow-y-auto">
								<AnimatePresence>
									{searchTerm && (
										<motion.div
											className="space-y-2 lg:space-y-3"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											transition={{ duration: 0.3 }}
										>
											<AnimatePresence>
												{searchResults.length > 0
													? searchResults.map((patient, index) => (
															<motion.div
																key={patient.no_rkm_medis}
																onClick={() => selectPatient(patient)}
																className="p-3 lg:p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
																initial={{ opacity: 0, y: 20 }}
																animate={{ opacity: 1, y: 0 }}
																exit={{ opacity: 0, y: -20 }}
																transition={{
																	duration: 0.3,
																	delay: index * 0.1,
																	type: "spring",
																	stiffness: 100,
																}}
																whileHover={{
																	scale: 1.02,
																	transition: { duration: 0.2 },
																}}
																whileTap={{ scale: 0.98 }}
															>
																<div className="flex justify-between items-start">
																	<div className="flex-1">
																		<h4 className="font-medium text-gray-900 dark:text-white">
																			{patient.nm_pasien}
																		</h4>
																		<p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
																			RM: {patient.no_rkm_medis}
																		</p>
																		{patient.no_ktp && (
																			<p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
																				KTP: {patient.no_ktp}
																			</p>
																		)}
																		<p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
																			{patient.jk === "L"
																				? "Laki-laki"
																				: "Perempuan"}
																			, {patient.umur}
																		</p>
																		<p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
																			{patient.alamat}
																		</p>
																	</div>
																	<motion.button
																		className="ml-2 px-2 lg:px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors flex-shrink-0"
																		whileHover={{ scale: 1.05 }}
																		whileTap={{ scale: 0.95 }}
																	>
																		Pilih
																	</motion.button>
																</div>
															</motion.div>
													  ))
													: !isSearching && (
															<motion.div
																className="text-center py-6 lg:py-8 text-gray-500 dark:text-gray-400"
																initial={{ opacity: 0 }}
																animate={{ opacity: 1 }}
																transition={{ duration: 0.3 }}
															>
																<p className="text-sm lg:text-base">
																	Tidak ada pasien ditemukan
																</p>
															</motion.div>
													  )}
											</AnimatePresence>
										</motion.div>
									)}
								</AnimatePresence>

								{!searchTerm && (
									<motion.div
										className="text-center py-8 lg:py-12 text-gray-500 dark:text-gray-400"
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ duration: 0.5, delay: 0.6 }}
									>
										<motion.svg
											className="mx-auto h-10 w-10 lg:h-12 lg:w-12 mb-4"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											initial={{ rotate: 0 }}
											animate={{ rotate: 360 }}
											transition={{
												duration: 20,
												repeat: Infinity,
												ease: "linear",
											}}
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
											/>
										</motion.svg>
										<p className="text-sm lg:text-base">
											Masukkan kata kunci untuk mencari pasien
										</p>
									</motion.div>
								)}
							</div>
						</div>
					</motion.div>

					{/* Right Panel - Registration List (Mobile: Full Width, Desktop: 60%) */}
					<motion.div
						className="w-full lg:w-3/5 p-4 lg:p-6"
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
					>
						<div className="h-full flex flex-col">
							<motion.div
								className="mb-4 lg:mb-6"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5, delay: 0.7 }}
							>
								<h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-3 lg:mb-4">
									Data Registrasi Hari Ini
								</h3>

								{/* Filter Accordion */}
								<motion.div
									className="mb-4"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.8 }}
								>
									{/* Filter Toggle Button */}
									<motion.button
										onClick={() => setIsFilterExpanded(!isFilterExpanded)}
										className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
										whileHover={{ scale: 1.01 }}
										whileTap={{ scale: 0.99 }}
									>
										<div className="flex items-center gap-2">
											<svg
												className="w-5 h-5 text-gray-600 dark:text-gray-400"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
												/>
											</svg>
											<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
												Filter Data Registrasi
											</span>
											{/* Active filters count */}
											{Object.values(filters).some(
												(value) =>
													value !== "" &&
													value !== new Date().toISOString().split("T")[0]
											) && (
												<span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 rounded-full">
													{
														Object.values(filters).filter(
															(value) =>
																value !== "" &&
																value !== new Date().toISOString().split("T")[0]
														).length
													}
												</span>
											)}
										</div>
										<motion.svg
											className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
												isFilterExpanded ? "rotate-180" : ""
											}`}
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											animate={{ rotate: isFilterExpanded ? 180 : 0 }}
											transition={{ duration: 0.2 }}
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M19 9l-7 7-7-7"
											/>
										</motion.svg>
									</motion.button>

									{/* Filter Content */}
									<AnimatePresence>
										{isFilterExpanded && (
											<motion.div
												initial={{ opacity: 0, height: 0 }}
												animate={{ opacity: 1, height: "auto" }}
												exit={{ opacity: 0, height: 0 }}
												transition={{ duration: 0.3, ease: "easeInOut" }}
												className="overflow-hidden"
											>
												<div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg mt-2">
													{/* Basic Filters Row */}
													<motion.div
														className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 mb-4"
														initial={{ opacity: 0, y: 20 }}
														animate={{ opacity: 1, y: 0 }}
														transition={{ duration: 0.3, delay: 0.1 }}
													>
														<motion.div
															whileHover={{ scale: 1.02 }}
															transition={{ duration: 0.2 }}
														>
															<label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
																Tanggal
															</label>
															<input
																type="date"
																name="date"
																value={filters.date}
																onChange={handleFilterChange}
																className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
															/>
														</motion.div>
														<motion.div
															whileHover={{ scale: 1.02 }}
															transition={{ duration: 0.2 }}
														>
															<label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
																Poliklinik
															</label>
															<select
																name="kd_poli"
																value={filters.kd_poli}
																onChange={handleFilterChange}
																className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
															>
																<option value="">Semua Poliklinik</option>
																{polikliniks?.map((poli) => (
																	<option
																		key={poli.kd_poli}
																		value={poli.kd_poli}
																	>
																		{poli.nm_poli}
																	</option>
																))}
															</select>
														</motion.div>
														<motion.div
															whileHover={{ scale: 1.02 }}
															transition={{ duration: 0.2 }}
														>
															<label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
																Dokter
															</label>
															<select
																name="kd_dokter"
																value={filters.kd_dokter}
																onChange={handleFilterChange}
																className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
															>
																<option value="">Semua Dokter</option>
																{dokters?.map((dokter) => (
																	<option
																		key={dokter.kd_dokter}
																		value={dokter.kd_dokter}
																	>
																		{dokter.nm_dokter}
																	</option>
																))}
															</select>
														</motion.div>
													</motion.div>

													{/* Additional Filters Row */}
													<motion.div
														className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 mb-4"
														initial={{ opacity: 0, y: 20 }}
														animate={{ opacity: 1, y: 0 }}
														transition={{ duration: 0.3, delay: 0.2 }}
													>
														{/* Search by Name */}
														<motion.div
															whileHover={{ scale: 1.02 }}
															transition={{ duration: 0.2 }}
														>
															<label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
																Cari Nama Pasien
															</label>
															<div className="relative">
																<input
																	type="text"
																	name="search"
																	value={filters.search}
																	onChange={handleFilterChange}
																	placeholder="Cari nama atau nomor RM..."
																	className="w-full px-3 py-2 pl-10 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
																/>
																<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
																	<svg
																		className="h-4 w-4 text-gray-400"
																		fill="none"
																		stroke="currentColor"
																		viewBox="0 0 24 24"
																	>
																		<path
																			strokeLinecap="round"
																			strokeLinejoin="round"
																			strokeWidth={2}
																			d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
																		/>
																	</svg>
																</div>
															</div>
														</motion.div>

														{/* Status Filter */}
														<motion.div
															whileHover={{ scale: 1.02 }}
															transition={{ duration: 0.2 }}
														>
															<label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
																Status
															</label>
															<select
																name="status"
																value={filters.status}
																onChange={handleFilterChange}
																className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
															>
																<option value="">Semua Status</option>
																<option value="Belum">Belum</option>
																<option value="Sudah">Sudah</option>
																<option value="Batal">Batal</option>
															</select>
														</motion.div>

														{/* Status Poli Filter */}
														<motion.div
															whileHover={{ scale: 1.02 }}
															transition={{ duration: 0.2 }}
														>
															<label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
																Status Poli
															</label>
															<select
																name="status_poli"
																value={filters.status_poli}
																onChange={handleFilterChange}
																className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
															>
																<option value="">Semua Status Poli</option>
																<option value="Baru">Baru</option>
																<option value="Lama">Lama</option>
															</select>
														</motion.div>
													</motion.div>

													{/* Filter Actions */}
													<motion.div
														className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-3 border-t border-gray-200 dark:border-gray-700"
														initial={{ opacity: 0, y: 20 }}
														animate={{ opacity: 1, y: 0 }}
														transition={{ duration: 0.3, delay: 0.3 }}
													>
														<div className="text-xs text-gray-500 dark:text-gray-400">
															{Object.values(filters).filter(
																(value) =>
																	value !== "" &&
																	value !==
																		new Date().toISOString().split("T")[0]
															).length > 0
																? `${
																		Object.values(filters).filter(
																			(value) =>
																				value !== "" &&
																				value !==
																					new Date().toISOString().split("T")[0]
																		).length
																  } filter aktif`
																: "Tidak ada filter aktif"}
														</div>
														<div className="flex gap-2">
															<motion.button
																onClick={() => {
																	setFilters({
																		date: new Date()
																			.toISOString()
																			.split("T")[0],
																		kd_poli: "",
																		kd_dokter: "",
																		search: "",
																		status: "",
																		status_poli: "",
																	});
																}}
																className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
																whileHover={{ scale: 1.05 }}
																whileTap={{ scale: 0.95 }}
															>
																Reset Filter
															</motion.button>
															<motion.button
																onClick={() => setIsFilterExpanded(false)}
																className="px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md transition-colors"
																whileHover={{ scale: 1.05 }}
																whileTap={{ scale: 0.95 }}
															>
																Tutup Filter
															</motion.button>
														</div>
													</motion.div>
												</div>
											</motion.div>
										)}
									</AnimatePresence>
								</motion.div>
							</motion.div>

							{/* Registration List */}
							<div className="flex-1 overflow-y-auto">
								{isLoading ? (
									<motion.div
										className="flex items-center justify-center py-12"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ duration: 0.3 }}
									>
										<div className="text-center">
											<svg
												className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-4"
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
											<p className="text-sm text-gray-600 dark:text-gray-400">
												Memuat data registrasi...
											</p>
										</div>
									</motion.div>
								) : (
									<AnimatePresence>
										<motion.div
											className="space-y-2 lg:space-y-3"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{ duration: 0.5, delay: 0.9 }}
										>
											{registrationData?.data?.length > 0 ? (
												registrationData.data.map((registration, index) => (
													<motion.div
														key={registration.no_rawat}
														className="p-3 lg:p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
														initial={{ opacity: 0, y: 20 }}
														animate={{ opacity: 1, y: 0 }}
														transition={{
															duration: 0.3,
															delay: index * 0.1,
															type: "spring",
															stiffness: 100,
														}}
														whileHover={{
															scale: 1.02,
															transition: { duration: 0.2 },
														}}
														onClick={() => openDetailModal(registration)}
													>
														<div className="flex justify-between items-start">
															<div className="flex-1">
																<div className="flex flex-wrap items-center gap-1 lg:gap-2 mb-2">
																	<span className="text-xs lg:text-sm font-medium text-blue-600 dark:text-blue-400">
																		No. {registration.no_reg}
																	</span>
																	<motion.span
																		className={`px-2 py-1 text-xs rounded-full ${
																			registration.status_poli === "Baru"
																				? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
																				: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300"
																		}`}
																		whileHover={{ scale: 1.1 }}
																		transition={{ duration: 0.2 }}
																	>
																		{registration.status_poli}
																	</motion.span>
																	<motion.span
																		className={`px-2 py-1 text-xs rounded-full ${
																			registration.stts === "Belum"
																				? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
																				: registration.stts === "Batal"
																				? "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
																				: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
																		}`}
																		whileHover={{ scale: 1.1 }}
																		transition={{ duration: 0.2 }}
																	>
																		{registration.stts}
																	</motion.span>
																</div>
																<h4 className="font-medium text-sm lg:text-base text-gray-900 dark:text-white">
																	{registration.pasien?.nm_pasien}
																</h4>
																<p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
																	RM: {registration.no_rkm_medis}
																</p>
																<p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
																	{registration.poliklinik?.nm_poli} -{" "}
																	{registration.dokter?.nm_dokter}
																</p>
																<p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
																	{registration.penjab?.png_jawab}
																</p>
																<p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
																	Jam: {registration.jam_reg?.slice(0, 5)}
																</p>
															</div>
															<div className="text-right flex-shrink-0">
																<motion.p
																	className="text-xs lg:text-sm font-medium text-gray-900 dark:text-white mb-2"
																	initial={{ opacity: 0 }}
																	animate={{ opacity: 1 }}
																	transition={{ duration: 0.3, delay: 0.2 }}
																>
																	{registration.no_rawat}
																</motion.p>
																{registration.stts === "Belum" && (
																	<motion.button
																		onClick={(e) => {
																			e.stopPropagation();
																			handleCancelRegistration(
																				registration.no_rawat
																			);
																		}}
																		className="px-2 py-1 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 rounded-md transition-colors"
																		whileHover={{ scale: 1.05 }}
																		whileTap={{ scale: 0.95 }}
																		initial={{ opacity: 0, scale: 0.8 }}
																		animate={{ opacity: 1, scale: 1 }}
																		transition={{ duration: 0.3, delay: 0.3 }}
																	>
																		Batal
																	</motion.button>
																)}
															</div>
														</div>
													</motion.div>
												))
											) : (
												<motion.div
													className="text-center py-8 lg:py-12 text-gray-500 dark:text-gray-400"
													initial={{ opacity: 0, scale: 0.9 }}
													animate={{ opacity: 1, scale: 1 }}
													transition={{ duration: 0.5 }}
												>
													<motion.svg
														className="mx-auto h-10 w-10 lg:h-12 lg:w-12 mb-4"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
														initial={{ rotate: 0 }}
														animate={{ rotate: 360 }}
														transition={{
															duration: 20,
															repeat: Infinity,
															ease: "linear",
														}}
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
														/>
													</motion.svg>
													<p className="text-sm lg:text-base">
														Belum ada data registrasi
													</p>
												</motion.div>
											)}
										</motion.div>
									</AnimatePresence>
								)}
							</div>

							{/* Pagination */}
							{registrationData?.data?.length > 0 && registrationData?.links && (
								<motion.div
									className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3 }}
								>
									<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
										{/* Pagination Info */}
										<div className="text-sm text-gray-600 dark:text-gray-400">
											Menampilkan {registrationData.from || 0} sampai{" "}
											{registrationData.to || 0} dari{" "}
											{registrationData.total || 0} data
										</div>

										{/* Pagination Controls */}
										<div className="flex items-center space-x-2">
											{/* Previous Button */}
											<motion.button
												onClick={() =>
													loadRegistrations(registrationData.current_page - 1)
												}
												disabled={!registrationData.prev_page_url}
												className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
												whileHover={{
													scale: registrationData.prev_page_url ? 1.05 : 1,
												}}
												whileTap={{
													scale: registrationData.prev_page_url ? 0.95 : 1,
												}}
											>
												<svg
													className="w-4 h-4"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M15 19l-7-7 7-7"
													/>
												</svg>
											</motion.button>

											{/* Page Numbers */}
											<div className="flex items-center space-x-1">
												{registrationData.links.map((link, index) => {
													if (
														index === 0 ||
														index === registrationData.links.length - 1
													)
														return null;

													const page = parseInt(link.label);
													const isCurrentPage = link.active;

													return (
														<motion.button
															key={index}
															onClick={() => loadRegistrations(page)}
															className={`px-3 py-2 text-sm font-medium rounded-lg ${
																isCurrentPage
																	? "bg-blue-600 text-white"
																	: "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
															}`}
															whileHover={{ scale: 1.05 }}
															whileTap={{ scale: 0.95 }}
														>
															{link.label}
														</motion.button>
													);
												})}
											</div>

											{/* Next Button */}
											<motion.button
												onClick={() =>
													loadRegistrations(registrationData.current_page + 1)
												}
												disabled={!registrationData.next_page_url}
												className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
												whileHover={{
													scale: registrationData.next_page_url ? 1.05 : 1,
												}}
												whileTap={{
													scale: registrationData.next_page_url ? 0.95 : 1,
												}}
											>
												<svg
													className="w-4 h-4"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M9 5l7 7-7 7"
													/>
												</svg>
											</motion.button>
										</div>
									</div>
								</motion.div>
							)}
						</div>
					</motion.div>
				</div>
			</motion.div>

			{/* Registration Modal */}
			<AnimatePresence>
				{isModalOpen && selectedPatient && (
					<motion.div
						className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-[9998] p-4 overflow-y-auto"
						initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
						animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
						exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
						transition={{
							duration: 0.4,
							ease: "easeOut",
						}}
						onClick={closeModal}
					>
						<motion.div
							className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-2xl border border-white/30 dark:border-gray-700/50 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
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
							<div className="p-4 lg:p-6">
								<motion.div
									className="flex justify-between items-center mb-4 lg:mb-6"
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3, delay: 0.1 }}
								>
									<h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white pr-4">
										Registrasi Periksa - {selectedPatient?.nm_pasien}
									</h3>
									<motion.button
										onClick={closeModal}
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

								<motion.form
									onSubmit={handleSubmitRegister}
									className="space-y-3 lg:space-y-4"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, delay: 0.2 }}
								>
									<motion.div
										className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ duration: 0.3, delay: 0.3 }}
									>
										{/* Dokter */}
										<motion.div
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.3, delay: 0.4 }}
										>
											<label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
												Dokter *
											</label>
											<select
												name="kd_dokter"
												value={formData.kd_dokter}
												onChange={handleFormChange}
												required
												className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
											>
												<option value="">Pilih Dokter</option>
												{dokters?.map((dokter) => (
													<option
														key={dokter.kd_dokter}
														value={dokter.kd_dokter}
													>
														{dokter.nm_dokter}
													</option>
												))}
											</select>
										</motion.div>

										{/* Poliklinik */}
										<motion.div
											initial={{ opacity: 0, x: 20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.3, delay: 0.5 }}
										>
											<label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
												Poliklinik *
											</label>
											<select
												name="kd_poli"
												value={formData.kd_poli}
												onChange={handleFormChange}
												required
												className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
											>
												<option value="">Pilih Poliklinik</option>
												{polikliniks?.map((poli) => (
													<option key={poli.kd_poli} value={poli.kd_poli}>
														{poli.nm_poli}
													</option>
												))}
											</select>
										</motion.div>

										{/* Penanggung Jawab */}
										<motion.div
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.3, delay: 0.6 }}
										>
											<label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
												Penanggung Jawab *
											</label>
											<select
												name="kd_pj"
												value={formData.kd_pj}
												onChange={handleFormChange}
												required
												className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
											>
												<option value="">Pilih Penanggung Jawab</option>
												{penjabs?.map((penjab) => (
													<option key={penjab.kd_pj} value={penjab.kd_pj}>
														{penjab.png_jawab}
													</option>
												))}
											</select>
										</motion.div>
									</motion.div>

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

									<motion.div
										className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4"
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.3, delay: 0.8 }}
									>
										<motion.button
											type="button"
											onClick={closeModal}
											className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
										>
											Batal
										</motion.button>
										<motion.button
											type="submit"
											disabled={isSubmitting}
											className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
											whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
											whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
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
										</motion.button>
									</motion.div>
								</motion.form>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Detail Registration Modal */}
			<AnimatePresence>
				{isDetailModalOpen && selectedRegistration && (
					<motion.div
						className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-[9999] p-4 overflow-y-auto"
						initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
						animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
						exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
						transition={{
							duration: 0.4,
							ease: "easeOut",
						}}
						onClick={closeDetailModal}
					>
						<motion.div
							className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-2xl border border-white/30 dark:border-gray-700/50 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
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
							<div className="p-4 lg:p-6">
								{/* Header */}
								<motion.div
									className="flex justify-between items-center mb-4 lg:mb-6"
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3, delay: 0.1 }}
								>
									<div>
										<h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white">
											Detail Registrasi
										</h3>
										<p className="text-sm text-gray-600 dark:text-gray-400">
											{selectedRegistration.no_rawat}
										</p>
									</div>
									<motion.button
										onClick={closeDetailModal}
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

								{/* Content */}
								<motion.div
									className="space-y-4 lg:space-y-6"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, delay: 0.2 }}
								>
									{/* Patient Information */}
									<motion.div
										className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.3, delay: 0.3 }}
									>
										<h4 className="text-sm lg:text-base font-semibold text-gray-900 dark:text-white mb-3">
											Informasi Pasien
										</h4>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
											<div>
												<label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
													Nama Pasien
												</label>
												<p className="text-sm lg:text-base text-gray-900 dark:text-white">
													{selectedRegistration.pasien?.nm_pasien || "-"}
												</p>
											</div>
											<div>
												<label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
													No. Rekam Medis
												</label>
												<p className="text-sm lg:text-base text-gray-900 dark:text-white">
													{selectedRegistration.no_rkm_medis}
												</p>
											</div>
											<div>
												<label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
													Jenis Kelamin
												</label>
												<p className="text-sm lg:text-base text-gray-900 dark:text-white">
													{selectedRegistration.pasien?.jk === "L"
														? "Laki-laki"
														: "Perempuan"}
												</p>
											</div>
											<div>
												<label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
													Umur
												</label>
												<p className="text-sm lg:text-base text-gray-900 dark:text-white">
													{selectedRegistration.pasien?.umur || "-"}
												</p>
											</div>
										</div>
									</motion.div>

									{/* Registration Information */}
									<motion.div
										className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4"
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.3, delay: 0.4 }}
									>
										<h4 className="text-sm lg:text-base font-semibold text-gray-900 dark:text-white mb-3">
											Informasi Registrasi
										</h4>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
											<div>
												<label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
													No. Registrasi
												</label>
												<p className="text-sm lg:text-base text-gray-900 dark:text-white">
													{selectedRegistration.no_reg}
												</p>
											</div>
											<div>
												<label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
													Tanggal Registrasi
												</label>
												<p className="text-sm lg:text-base text-gray-900 dark:text-white">
													{selectedRegistration.tgl_registrasi}
												</p>
											</div>
											<div>
												<label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
													Jam Registrasi
												</label>
												<p className="text-sm lg:text-base text-gray-900 dark:text-white">
													{selectedRegistration.jam_reg?.slice(0, 5) || "-"}
												</p>
											</div>
											<div>
												<label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
													Status
												</label>
												<span
													className={`inline-flex px-2 py-1 text-xs rounded-full ${
														selectedRegistration.stts === "Belum"
															? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
															: selectedRegistration.stts === "Batal"
															? "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
															: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
													}`}
												>
													{selectedRegistration.stts}
												</span>
											</div>
										</div>
									</motion.div>

									{/* Medical Information */}
									<motion.div
										className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4"
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.3, delay: 0.5 }}
									>
										<h4 className="text-sm lg:text-base font-semibold text-gray-900 dark:text-white mb-3">
											Informasi Medis
										</h4>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
											<div>
												<label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
													Poliklinik
												</label>
												<p className="text-sm lg:text-base text-gray-900 dark:text-white">
													{selectedRegistration.poliklinik?.nm_poli || "-"}
												</p>
											</div>
											<div>
												<label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
													Dokter
												</label>
												<p className="text-sm lg:text-base text-gray-900 dark:text-white">
													{selectedRegistration.dokter?.nm_dokter || "-"}
												</p>
											</div>
											<div>
												<label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
													Status Poli
												</label>
												<span
													className={`inline-flex px-2 py-1 text-xs rounded-full ${
														selectedRegistration.status_poli === "Baru"
															? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
															: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300"
													}`}
												>
													{selectedRegistration.status_poli}
												</span>
											</div>
											<div>
												<label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
													Biaya Registrasi
												</label>
												<p className="text-sm lg:text-base font-semibold text-gray-900 dark:text-white">
													Rp{" "}
													{selectedRegistration.biaya_reg?.toLocaleString(
														"id-ID"
													) || "0"}
												</p>
											</div>
										</div>
									</motion.div>

									{/* Payment Information */}
									<motion.div
										className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4"
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.3, delay: 0.6 }}
									>
										<h4 className="text-sm lg:text-base font-semibold text-gray-900 dark:text-white mb-3">
											Informasi Pembayaran
										</h4>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
											<div>
												<label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
													Penanggung Jawab
												</label>
												<p className="text-sm lg:text-base text-gray-900 dark:text-white">
													{selectedRegistration.penjab?.png_jawab || "-"}
												</p>
											</div>
											<div>
												<label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
													Nama Penanggung Jawab
												</label>
												<p className="text-sm lg:text-base text-gray-900 dark:text-white">
													{selectedRegistration.p_jawab || "-"}
												</p>
											</div>
											<div>
												<label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
													Hubungan
												</label>
												<p className="text-sm lg:text-base text-gray-900 dark:text-white">
													{selectedRegistration.hubunganpj || "-"}
												</p>
											</div>
											<div>
												<label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
													Alamat Penanggung Jawab
												</label>
												<p className="text-sm lg:text-base text-gray-900 dark:text-white">
													{selectedRegistration.almt_pj || "-"}
												</p>
											</div>
										</div>
									</motion.div>

									{/* Action Buttons */}
									<motion.div
										className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4"
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.3, delay: 0.7 }}
									>
										{selectedRegistration.stts === "Belum" && (
											<motion.button
												onClick={(e) => {
													e.stopPropagation();
													handleCancelRegistration(
														selectedRegistration.no_rawat
													);
													closeDetailModal();
												}}
												className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 rounded-lg transition-colors"
												whileHover={{ scale: 1.02 }}
												whileTap={{ scale: 0.98 }}
											>
												Batalkan Registrasi
											</motion.button>
										)}
										<motion.button
											onClick={closeDetailModal}
											className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
										>
											Tutup
										</motion.button>
									</motion.div>
								</motion.div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Patient Create Modal */}
			<PatientCreateModal
				isOpen={isPatientModalOpen}
				onClose={closePatientModal}
				onSuccess={handlePatientSuccess}
			/>
		</AppLayout>
	);
}
