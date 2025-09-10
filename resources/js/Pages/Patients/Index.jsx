import React, { useState, useEffect } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import AppLayout from "@/Layouts/AppLayout";
import Alert from "@/Components/Alert";

export default function Index({
	patients,
	filters,
	dokters,
	polikliniks,
	penjabs,
}) {
	const [search, setSearch] = useState(filters.search || "");
	const [openDropdown, setOpenDropdown] = useState(null);
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
			router.delete(route("patients.destroy", patient.no_rkm_medis));
		}
	};

	const toggleDropdown = (patientId) => {
		setOpenDropdown(openDropdown === patientId ? null : patientId);
	};

	const closeDropdown = () => {
		setOpenDropdown(null);
	};

	const handleRegisterPeriksa = (patient) => {
		setSelectedPatient(patient);
		setFormData({
			kd_dokter: "",
			kd_poli: "",
			kd_pj: "",
			p_jawab: patient.nm_pasien,
			almt_pj: patient.alamat || "",
			hubunganpj: "DIRI SENDIRI",
		});
		setPoliStatus({
			status_poli: "Baru",
			biaya_reg: 0,
			has_registered: false,
		});
		setShowRegisterModal(true);
		closeDropdown();
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
				onError: (errors) => {
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
			if (openDropdown && !event.target.closest(".dropdown-container")) {
				setOpenDropdown(null);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [openDropdown]);

	return (
		<AppLayout>
			<Head title="Data Pasien" />

			<div className="space-y-6 -mt-6 -mx-6 p-6">
				{/* Header */}
				<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
					<div className="p-6">
						<div className="flex justify-between items-center">
							<div>
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
									Data Pasien
								</h2>
								<p className="text-gray-600 dark:text-gray-400 mt-1"></p>
							</div>
							<Link
								href={route("patients.create")}
								className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg font-medium text-sm whitespace-nowrap transform hover:scale-105"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="w-4 h-4"
								>
									<path
										fillRule="evenodd"
										d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
										clipRule="evenodd"
									/>
								</svg>
								<span>Tambah Pasien</span>
							</Link>
						</div>
					</div>
				</div>

				{/* Search and Filters */}
				<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
					<div className="p-6">
						<form onSubmit={handleSearch} className="flex gap-4">
							<div className="flex-1">
								<input
									type="text"
									value={search}
									onChange={(e) => setSearch(e.target.value)}
									placeholder="Cari berdasarkan nama, NIK, no. RM, atau no. telepon..."
									className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								/>
							</div>
							<button
								type="submit"
								className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
							>
								Cari
							</button>
							{search && (
								<button
									type="button"
									onClick={() => {
										setSearch("");
										router.get(route("patients.index"));
									}}
									className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg transition-colors"
								>
									Reset
								</button>
							)}
						</form>
					</div>
				</div>

				{/* Data Table */}
				<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
					<div className="overflow-x-auto">
						<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
							<thead className="bg-gray-50 dark:bg-gray-700">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
										No. RM
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
										Nama Pasien
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
										NIK
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
										Jenis Kelamin
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
										Umur
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
										No. Telepon
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
										Tgl. Daftar
									</th>
								</tr>
							</thead>
							<tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
								{patients.data.map((patient) => (
									<tr
										key={patient.no_rkm_medis}
										className="hover:bg-gray-50 dark:hover:bg-gray-700"
									>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
											<div className="relative dropdown-container">
												<button
													onClick={() => toggleDropdown(patient.no_rkm_medis)}
													className="flex items-center justify-between w-full px-3 py-2 text-sm font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
												>
													<span>{patient.no_rkm_medis}</span>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 24 24"
														fill="currentColor"
														className={`w-4 h-4 transition-transform ${
															openDropdown === patient.no_rkm_medis
																? "rotate-180"
																: ""
														}`}
													>
														<path d="M7 10l5 5 5-5z" />
													</svg>
												</button>

												{openDropdown === patient.no_rkm_medis && (
													<div className="absolute z-10 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
														<div className="py-1">
															<Link
																href={route(
																	"patients.show",
																	patient.no_rkm_medis
																)}
																onClick={closeDropdown}
																className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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
																className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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
																className="flex items-center w-full px-4 py-2 text-sm text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
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
																onClick={() => {
																	closeDropdown();
																	handleDelete(patient);
																}}
																className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
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
													</div>
												)}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
											{patient.nm_pasien}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
											{patient.no_ktp || "-"}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
											{patient.jk === "L" ? "Laki-laki" : "Perempuan"}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
											{patient.umur}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
											{patient.no_tlp || "-"}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
											{patient.tgl_daftar
												? new Date(patient.tgl_daftar).toLocaleDateString(
														"id-ID"
												  )
												: "-"}
										</td>
									</tr>
								))}
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
											className={`px-3 py-2 text-sm rounded-lg ${
												link.active
													? "bg-blue-600 text-white"
													: "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
											} ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
											dangerouslySetInnerHTML={{ __html: link.label }}
										/>
									))}
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Empty State */}
				{patients.data.length === 0 && (
					<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
						<div className="p-12 text-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="w-16 h-16 text-gray-400 mx-auto mb-4"
							>
								<path
									fillRule="evenodd"
									d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
									clipRule="evenodd"
								/>
							</svg>
							<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
								Tidak ada data pasien
							</h3>
							<p className="text-gray-500 dark:text-gray-400 mb-4">
								Belum ada data pasien yang tersimpan.
							</p>
							<Link
								href={route("patients.create")}
								className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-colors"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="w-5 h-5"
								>
									<path d="M12 4.5v15m7.5-7.5h-15" />
								</svg>
								Tambah Pasien Pertama
							</Link>
						</div>
					</div>
				)}
			</div>

			{/* Modal Registrasi Periksa */}
			{showRegisterModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
				</div>
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
		</AppLayout>
	);
}
