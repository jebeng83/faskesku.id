import React, { useState, useEffect, useRef } from "react";
import { useForm } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
	XMarkIcon,
	UserIcon,
	IdentificationIcon,
	CalendarIcon,
	PhoneIcon,
	MagnifyingGlassIcon,
	ChevronDownIcon,
} from "@heroicons/react/24/outline";

const modalVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { duration: 0.3 },
	},
	exit: {
		opacity: 0,
		transition: { duration: 0.2 },
	},
};

const modalContentVariants = {
	hidden: { opacity: 0, scale: 0.95, y: 20 },
	visible: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: { duration: 0.3, type: "spring", stiffness: 300, damping: 30 },
	},
	exit: {
		opacity: 0,
		scale: 0.95,
		y: 20,
		transition: { duration: 0.2 },
	},
};

const inputVariants = {
	focus: { scale: 1.02, transition: { duration: 0.2 } },
};

export default function DoctorModal({
	show,
	onClose,
	mode,
	doctor,
	availableEmployees,
	spesialisList,
}) {
	const { data, setData, post, put, processing, errors, reset, transform } = useForm({
		kd_dokter: doctor?.kd_dokter || "",
		nm_dokter: doctor?.nm_dokter || "",
		jk: doctor?.jk || "L",
		tmp_lahir: doctor?.tmp_lahir || "",
		tgl_lahir: doctor?.tgl_lahir || "",
		gol_drh: doctor?.gol_drh || "",
		agama: doctor?.agama || "",
		almt_tgl: doctor?.almt_tgl || "",
		no_telp: doctor?.no_telp || "",
		stts_nikah: doctor?.stts_nikah || "",
		kd_sps: doctor?.kd_sps || "",
		alumni: doctor?.alumni || "",
		no_ijn_praktek: doctor?.no_ijn_praktek || "",
		status: doctor?.status || "1",
	});

	// Employee search functionality states
	const [employeeSearch, setEmployeeSearch] = useState("");
	const [filteredEmployees, setFilteredEmployees] = useState(
		availableEmployees || []
	);
	const [isEmployeeDropdownOpen, setIsEmployeeDropdownOpen] = useState(false);
	const [selectedEmployeeName, setSelectedEmployeeName] = useState("");
	const [isEmployeeSearching, setIsEmployeeSearching] = useState(false);
	const employeeSearchTimeoutRef = useRef(null);
	const employeeDropdownRef = useRef(null);

	// Spesialis search functionality states
	const [spesialisSearch, setSpesialisSearch] = useState("");
	const [filteredSpesialis, setFilteredSpesialis] = useState(
		spesialisList || []
	);
	const [isSpesialisDropdownOpen, setIsSpesialisDropdownOpen] = useState(false);
	const [selectedSpesialisName, setSelectedSpesialisName] = useState("");
	const [isSpesialisSearching, setIsSpesialisSearching] = useState(false);
	const spesialisSearchTimeoutRef = useRef(null);
	const spesialisDropdownRef = useRef(null);

	// Initialize filtered employees when availableEmployees changes
	useEffect(() => {
		setFilteredEmployees(availableEmployees || []);
	}, [availableEmployees]);

	// Initialize filtered spesialis when spesialisList changes
	useEffect(() => {
		setFilteredSpesialis(spesialisList || []);
	}, [spesialisList]);

	// Debounced employee search effect
	useEffect(() => {
		// Clear previous timeout
		if (employeeSearchTimeoutRef.current) {
			clearTimeout(employeeSearchTimeoutRef.current);
		}

		// Show loading state if searching
		if (employeeSearch.trim()) {
			setIsEmployeeSearching(true);
		}

		// Set new timeout for debounced search
		employeeSearchTimeoutRef.current = setTimeout(() => {
			if (!employeeSearch.trim()) {
				setFilteredEmployees(availableEmployees || []);
				setIsEmployeeSearching(false);
			} else {
				const filtered = (availableEmployees || []).filter(
					(employee) =>
						employee.nama
							.toLowerCase()
							.includes(employeeSearch.toLowerCase()) ||
						employee.nik.toLowerCase().includes(employeeSearch.toLowerCase())
				);
				setFilteredEmployees(filtered);
				setIsEmployeeSearching(false);
			}
		}, 300); // 300ms debounce delay

		// Cleanup timeout on unmount
		return () => {
			if (employeeSearchTimeoutRef.current) {
				clearTimeout(employeeSearchTimeoutRef.current);
			}
		};
	}, [employeeSearch, availableEmployees]);

	// Debounced spesialis search effect
	useEffect(() => {
		// Clear previous timeout
		if (spesialisSearchTimeoutRef.current) {
			clearTimeout(spesialisSearchTimeoutRef.current);
		}

		// Show loading state if searching
		if (spesialisSearch.trim()) {
			setIsSpesialisSearching(true);
		}

		// Set new timeout for debounced search
		spesialisSearchTimeoutRef.current = setTimeout(() => {
			if (!spesialisSearch.trim()) {
				setFilteredSpesialis(spesialisList || []);
				setIsSpesialisSearching(false);
			} else {
				const filtered = (spesialisList || []).filter(
					(spesialis) =>
						spesialis.nm_sps
							.toLowerCase()
							.includes(spesialisSearch.toLowerCase()) ||
						spesialis.kd_sps
							.toLowerCase()
							.includes(spesialisSearch.toLowerCase())
				);
				setFilteredSpesialis(filtered);
				setIsSpesialisSearching(false);
			}
		}, 300); // 300ms debounce delay

		// Cleanup timeout on unmount
		return () => {
			if (spesialisSearchTimeoutRef.current) {
				clearTimeout(spesialisSearchTimeoutRef.current);
			}
		};
	}, [spesialisSearch, spesialisList]);

	// Handle click outside employee dropdown
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				employeeDropdownRef.current &&
				!employeeDropdownRef.current.contains(event.target)
			) {
				setIsEmployeeDropdownOpen(false);
			}
		};

		if (isEmployeeDropdownOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isEmployeeDropdownOpen]);

	// Handle click outside spesialis dropdown
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				spesialisDropdownRef.current &&
				!spesialisDropdownRef.current.contains(event.target)
			) {
				setIsSpesialisDropdownOpen(false);
			}
		};

		if (isSpesialisDropdownOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isSpesialisDropdownOpen]);

	const handleEmployeeSelect = (employeeNik) => {
		if (!employeeNik) {
			// Clear form if no employee selected
			setData({
				...data,
				kd_dokter: "",
				nm_dokter: "",
				jk: "L",
				tmp_lahir: "",
				tgl_lahir: "",
				almt_tgl: "",
			});
			setSelectedEmployeeName("");
			setEmployeeSearch("");
			setIsEmployeeDropdownOpen(false);
			return;
		}

		const selectedEmployee = availableEmployees.find(
			(emp) => emp.nik === employeeNik
		);
		if (selectedEmployee) {
			// Format tanggal lahir
			let formattedDate = "";
			if (
				selectedEmployee.tgl_lahir &&
				selectedEmployee.tgl_lahir !== "0000-00-00"
			) {
				formattedDate = selectedEmployee.tgl_lahir;
			}

			// Auto-fill form with employee data
			setData({
				...data,
				kd_dokter: selectedEmployee.nik,
				nm_dokter: selectedEmployee.nama,
				jk: selectedEmployee.jk === "Pria" ? "L" : "P",
				tmp_lahir: selectedEmployee.tmp_lahir || "",
				tgl_lahir: formattedDate,
				almt_tgl: selectedEmployee.alamat || "",
			});

			// Update UI states
			setSelectedEmployeeName(
				`${selectedEmployee.nama} (${selectedEmployee.nik})`
			);
			setEmployeeSearch("");
			setIsEmployeeDropdownOpen(false);
		}
	};

	const handleSpesialisSelect = (spesialisKode) => {
		if (!spesialisKode) {
			// Clear spesialis if no selection
			setData({
				...data,
				kd_sps: "",
			});
			setSelectedSpesialisName("");
			setSpesialisSearch("");
			setIsSpesialisDropdownOpen(false);
			return;
		}

		const selectedSpesialis = spesialisList.find(
			(sps) => sps.kd_sps === spesialisKode
		);
		if (selectedSpesialis) {
			// Set spesialis data
			setData({
				...data,
				kd_sps: selectedSpesialis.kd_sps,
			});

			// Update UI states
			setSelectedSpesialisName(
				`${selectedSpesialis.nm_sps} (${selectedSpesialis.kd_sps})`
			);
			setSpesialisSearch("");
			setIsSpesialisDropdownOpen(false);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (mode === "create") {
			post(route("doctors.store"), {
				onSuccess: () => {
					reset();
					onClose();
				},
			});
		} else {
			// Use method spoofing to avoid PUT 405 issues
			transform((payload) => ({ ...payload, _method: "PUT" }));
			post(route("doctors.update", doctor.kd_dokter), {
				forceFormData: true,
				onSuccess: () => {
					onClose();
				},
				onFinish: () => {
					// Reset transform to avoid affecting subsequent requests
					transform((payload) => payload);
				},
			});
		}
	};

	const handleClose = () => {
		reset();
		setEmployeeSearch("");
		setSelectedEmployeeName("");
		setIsEmployeeDropdownOpen(false);
		setSpesialisSearch("");
		setSelectedSpesialisName("");
		setIsSpesialisDropdownOpen(false);
		onClose();
	};

	// Reset search states when modal opens/closes
	useEffect(() => {
		if (show) {
			setEmployeeSearch("");
			setIsEmployeeDropdownOpen(false);
			setSpesialisSearch("");
			setIsSpesialisDropdownOpen(false);

			if (mode === "edit" && doctor) {
				setSelectedEmployeeName(`${doctor.nm_dokter} (${doctor.kd_dokter})`);
				// Find and set spesialis name for edit mode
				const currentSpesialis = spesialisList?.find(
					(sps) => sps.kd_sps === doctor.kd_sps
				);
				if (currentSpesialis) {
					setSelectedSpesialisName(
						`${currentSpesialis.nm_sps} (${currentSpesialis.kd_sps})`
					);
				} else {
					setSelectedSpesialisName("");
				}
			} else {
				setSelectedEmployeeName("");
				setSelectedSpesialisName("");
			}
		}
	}, [show, mode, doctor, spesialisList]);

	if (!show) return null;

	return (
		<AnimatePresence>
			<motion.div
				variants={modalVariants}
				initial="hidden"
				animate="visible"
				exit="exit"
				className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
				onClick={handleClose}
			>
				<motion.div
					variants={modalContentVariants}
					initial="hidden"
					animate="visible"
					exit="exit"
					className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
					onClick={(e) => e.stopPropagation()}
				>
					{/* Header */}
					<div className="bg-gray-900 p-6 flex justify-between items-center">
						<div className="flex items-center gap-3">
							<div className="p-2 bg-white bg-opacity-20 rounded-lg">
								<UserIcon className="h-6 w-6 text-black" />
							</div>
							<div>
								<h3 className="text-xl font-semibold text-white">
									{mode === "create"
										? "Tambah Dokter Baru"
										: "Edit Data Dokter"}
								</h3>
								<p className="text-gray-300 text-sm">
									{mode === "create"
										? "Lengkapi form untuk menambahkan dokter baru"
										: `Mengubah data untuk ${doctor?.nm_dokter}`}
								</p>
							</div>
						</div>
						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							onClick={handleClose}
							className="p-2 text-gray-400 hover:text-black hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
						>
							<XMarkIcon className="h-6 w-6" />
						</motion.button>
					</div>

					{/* Form */}
					<form
						onSubmit={handleSubmit}
						className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]"
					>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Kode Dokter / Pilih Pegawai */}
							<div className="md:col-span-2">
								<label className="block text-sm font-medium text-gray-700 mb-2">
									<IdentificationIcon className="inline h-4 w-4 mr-1" />
									{mode === "create" ? "Pilih Pegawai *" : "Kode Dokter *"}
								</label>
								{mode === "create" ? (
									<div className="relative" ref={employeeDropdownRef}>
										{/* Search Input */}
										<motion.div
											variants={inputVariants}
											className={`relative w-full border rounded-lg transition-all ${
												errors.kd_dokter ? "border-red-500" : "border-gray-300"
											}`}
										>
											<div className="flex items-center">
												<MagnifyingGlassIcon className="absolute left-3 h-5 w-5 text-gray-400" />
												<input
													type="text"
													value={
														isEmployeeDropdownOpen
															? employeeSearch
															: selectedEmployeeName
													}
													onChange={(e) => {
														setEmployeeSearch(e.target.value);
														if (!isEmployeeDropdownOpen)
															setIsEmployeeDropdownOpen(true);
													}}
													onFocus={() => setIsEmployeeDropdownOpen(true)}
													className="w-full pl-10 pr-16 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-lg"
													placeholder="Cari pegawai..."
												/>
												<div className="absolute right-2 flex items-center gap-1">
													{(selectedEmployeeName || employeeSearch) && (
														<button
															type="button"
															onClick={() => handleEmployeeSelect("")}
															className="p-1 hover:bg-gray-100 rounded transition-colors"
															title="Clear selection"
														>
															<XMarkIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
														</button>
													)}
													<button
														type="button"
														onClick={() =>
															setIsEmployeeDropdownOpen(!isEmployeeDropdownOpen)
														}
														className="p-1 hover:bg-gray-100 rounded transition-colors"
													>
														<ChevronDownIcon
															className={`h-5 w-5 text-gray-400 transition-transform ${
																isEmployeeDropdownOpen ? "rotate-180" : ""
															}`}
														/>
													</button>
												</div>
											</div>
										</motion.div>

										{/* Dropdown List */}
										<AnimatePresence>
											{isEmployeeDropdownOpen && (
												<motion.div
													initial={{ opacity: 0, y: -10 }}
													animate={{ opacity: 1, y: 0 }}
													exit={{ opacity: 0, y: -10 }}
													transition={{ duration: 0.2 }}
													className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
												>
													{isEmployeeSearching ? (
														<div className="px-4 py-3 text-gray-500 text-center flex items-center justify-center gap-2">
															<motion.div
																animate={{ rotate: 360 }}
																transition={{
																	duration: 1,
																	repeat: Infinity,
																	ease: "linear",
																}}
																className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full"
															/>
															Mencari pegawai...
														</div>
													) : filteredEmployees.length === 0 ? (
														<div className="px-4 py-3 text-gray-500 text-center">
															<div className="flex flex-col items-center gap-2">
																<UserIcon className="h-8 w-8 text-gray-300" />
																<span className="font-medium">
																	{employeeSearch
																		? "Tidak ada pegawai ditemukan"
																		: "Tidak ada pegawai tersedia"}
																</span>
																{employeeSearch && (
																	<span className="text-sm">
																		Coba kata kunci lain atau periksa ejaan
																	</span>
																)}
															</div>
														</div>
													) : (
														filteredEmployees.map((employee) => (
															<motion.button
																key={employee.nik}
																type="button"
																onClick={() =>
																	handleEmployeeSelect(employee.nik)
																}
																className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors border-b border-gray-100 last:border-b-0"
																whileHover={{ backgroundColor: "#f9fafb" }}
															>
																<div className="flex flex-col">
																	<span className="font-medium text-gray-900">
																		{employee.nama}
																	</span>
																	<span className="text-sm text-gray-500">
																		NIK: {employee.nik}
																	</span>
																</div>
															</motion.button>
														))
													)}
												</motion.div>
											)}
										</AnimatePresence>
									</div>
								) : (
									<motion.input
										variants={inputVariants}
										whileFocus="focus"
										type="text"
										value={data.kd_dokter}
										disabled={true}
										className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
									/>
								)}
								{errors.kd_dokter && (
									<motion.p
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className="text-red-600 text-sm mt-1"
									>
										{errors.kd_dokter}
									</motion.p>
								)}
							</div>

							{/* Nama Dokter */}
							<div className="md:col-span-2">
								<label className="block text-sm font-medium text-gray-700 mb-2">
									<UserIcon className="inline h-4 w-4 mr-1" />
									Nama Dokter *
									{mode === "create" && (
										<span className="text-xs text-green-600 ml-2">
											(Dapat diedit setelah auto-fill)
										</span>
									)}
								</label>
								<motion.input
									variants={inputVariants}
									whileFocus="focus"
									type="text"
									value={data.nm_dokter}
									onChange={(e) => setData("nm_dokter", e.target.value)}
									className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all ${
										mode === "create" && data.kd_dokter
											? "bg-green-50"
											: "bg-white"
									} ${errors.nm_dokter ? "border-red-500" : "border-gray-300"}`}
									placeholder="Masukkan nama lengkap dokter"
								/>
								{errors.nm_dokter && (
									<motion.p
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className="text-red-600 text-sm mt-1"
									>
										{errors.nm_dokter}
									</motion.p>
								)}
							</div>

							{/* Jenis Kelamin */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Jenis Kelamin *
									{mode === "create" && (
										<span className="text-xs text-green-600 ml-2">
											(Dapat diedit setelah auto-fill)
										</span>
									)}
								</label>
								<motion.select
									variants={inputVariants}
									whileFocus="focus"
									value={data.jk}
									onChange={(e) => setData("jk", e.target.value)}
									className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all ${
										mode === "create" && data.kd_dokter
											? "bg-green-50"
											: "bg-white"
									}`}
								>
									<option value="L">Laki-laki</option>
									<option value="P">Perempuan</option>
								</motion.select>
							</div>

							{/* Status */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Status
								</label>
								<motion.select
									variants={inputVariants}
									whileFocus="focus"
									value={data.status}
									onChange={(e) => setData("status", e.target.value)}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
								>
									<option value="1">Aktif</option>
									<option value="0">Non-Aktif</option>
								</motion.select>
							</div>

							{/* Tempat Lahir */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Tempat Lahir
									{mode === "create" && (
										<span className="text-xs text-green-600 ml-2">
											(Dapat diedit setelah auto-fill)
										</span>
									)}
								</label>
								<motion.input
									variants={inputVariants}
									whileFocus="focus"
									type="text"
									value={data.tmp_lahir}
									onChange={(e) => setData("tmp_lahir", e.target.value)}
									className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all ${
										mode === "create" && data.kd_dokter
											? "bg-green-50"
											: "bg-white"
									}`}
									placeholder="Tempat lahir"
								/>
							</div>

							{/* Tanggal Lahir */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									<CalendarIcon className="inline h-4 w-4 mr-1" />
									Tanggal Lahir
									{mode === "create" && (
										<span className="text-xs text-green-600 ml-2">
											(Dapat diedit setelah auto-fill)
										</span>
									)}
								</label>
								<motion.input
									variants={inputVariants}
									whileFocus="focus"
									type="date"
									value={data.tgl_lahir}
									onChange={(e) => setData("tgl_lahir", e.target.value)}
									className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all ${
										mode === "create" && data.kd_dokter
											? "bg-green-50"
											: "bg-white"
									}`}
								/>
							</div>

							{/* Golongan Darah */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Golongan Darah
								</label>
								<motion.select
									variants={inputVariants}
									whileFocus="focus"
									value={data.gol_drh}
									onChange={(e) => setData("gol_drh", e.target.value)}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
								>
									<option value="">Pilih Golongan Darah</option>
									<option value="A">A</option>
									<option value="B">B</option>
									<option value="AB">AB</option>
									<option value="O">O</option>
								</motion.select>
							</div>

							{/* Agama */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Agama
								</label>
								<motion.select
									variants={inputVariants}
									whileFocus="focus"
									value={data.agama}
									onChange={(e) => setData("agama", e.target.value)}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
								>
									<option value="">Pilih Agama</option>
									<option value="ISLAM">Islam</option>
									<option value="KRISTEN">Kristen</option>
									<option value="KATOLIK">Katolik</option>
									<option value="HINDU">Hindu</option>
									<option value="BUDHA">Budha</option>
									<option value="KONGHUCU">Konghucu</option>
								</motion.select>
							</div>

							{/* Alamat */}
							<div className="md:col-span-2">
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Alamat
									{mode === "create" && (
										<span className="text-xs text-green-600 ml-2">
											(Dapat diedit setelah auto-fill)
										</span>
									)}
								</label>
								<motion.textarea
									variants={inputVariants}
									whileFocus="focus"
									value={data.almt_tgl}
									onChange={(e) => setData("almt_tgl", e.target.value)}
									rows="3"
									className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none ${
										mode === "create" && data.kd_dokter
											? "bg-green-50"
											: "bg-white"
									}`}
									placeholder="Alamat lengkap"
								/>
							</div>

							{/* No Telepon */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									<PhoneIcon className="inline h-4 w-4 mr-1" />
									No. Telepon
								</label>
								<motion.input
									variants={inputVariants}
									whileFocus="focus"
									type="text"
									value={data.no_telp}
									onChange={(e) => setData("no_telp", e.target.value)}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
									placeholder="Nomor telepon"
								/>
							</div>

							{/* Status Nikah */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Status Pernikahan
								</label>
								<motion.select
									variants={inputVariants}
									whileFocus="focus"
									value={data.stts_nikah}
									onChange={(e) => setData("stts_nikah", e.target.value)}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
								>
									<option value="">Pilih Status</option>
									<option value="BELUM MENIKAH">Belum Menikah</option>
									<option value="MENIKAH">Menikah</option>
									<option value="JANDA">Janda</option>
									<option value="DUDHA">Dudha</option>
									<option value="JANDA MATI">Janda Mati</option>
									<option value="DUDHA MATI">Dudha Mati</option>
								</motion.select>
							</div>

							{/* Kode Spesialisasi */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Spesialisasi
								</label>
								<div className="relative" ref={spesialisDropdownRef}>
									{/* Search Input */}
									<motion.div
										variants={inputVariants}
										className={`relative w-full border rounded-lg transition-all ${
											errors.kd_sps ? "border-red-500" : "border-gray-300"
										}`}
									>
										<div className="flex items-center">
											<MagnifyingGlassIcon className="absolute left-3 h-5 w-5 text-gray-400" />
											<input
												type="text"
												value={
													isSpesialisDropdownOpen
														? spesialisSearch
														: selectedSpesialisName
												}
												onChange={(e) => {
													setSpesialisSearch(e.target.value);
													if (!isSpesialisDropdownOpen)
														setIsSpesialisDropdownOpen(true);
												}}
												onFocus={() => setIsSpesialisDropdownOpen(true)}
												className="w-full pl-10 pr-16 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-lg"
												placeholder="Cari spesialis..."
											/>
											<div className="absolute right-2 flex items-center gap-1">
												{(selectedSpesialisName || spesialisSearch) && (
													<button
														type="button"
														onClick={() => handleSpesialisSelect("")}
														className="p-1 hover:bg-gray-100 rounded transition-colors"
														title="Clear selection"
													>
														<XMarkIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
													</button>
												)}
												<button
													type="button"
													onClick={() =>
														setIsSpesialisDropdownOpen(!isSpesialisDropdownOpen)
													}
													className="p-1 hover:bg-gray-100 rounded transition-colors"
												>
													<ChevronDownIcon
														className={`h-5 w-5 text-gray-400 transition-transform ${
															isSpesialisDropdownOpen ? "rotate-180" : ""
														}`}
													/>
												</button>
											</div>
										</div>
									</motion.div>

									{/* Dropdown List */}
									<AnimatePresence>
										{isSpesialisDropdownOpen && (
											<motion.div
												initial={{ opacity: 0, y: -10 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -10 }}
												transition={{ duration: 0.2 }}
												className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
											>
												{isSpesialisSearching ? (
													<div className="px-4 py-3 text-gray-500 text-center flex items-center justify-center gap-2">
														<motion.div
															animate={{ rotate: 360 }}
															transition={{
																duration: 1,
																repeat: Infinity,
																ease: "linear",
															}}
															className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full"
														/>
														Mencari spesialis...
													</div>
												) : filteredSpesialis.length === 0 ? (
													<div className="px-4 py-3 text-gray-500 text-center">
														<div className="flex flex-col items-center gap-2">
															<UserIcon className="h-8 w-8 text-gray-300" />
															<span className="font-medium">
																{spesialisSearch
																	? "Tidak ada spesialis ditemukan"
																	: "Tidak ada spesialis tersedia"}
															</span>
															{spesialisSearch && (
																<span className="text-sm">
																	Coba kata kunci lain atau periksa ejaan
																</span>
															)}
														</div>
													</div>
												) : (
													filteredSpesialis.map((spesialis) => (
														<motion.button
															key={spesialis.kd_sps}
															type="button"
															onClick={() =>
																handleSpesialisSelect(spesialis.kd_sps)
															}
															className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors border-b border-gray-100 last:border-b-0"
															whileHover={{ backgroundColor: "#f9fafb" }}
														>
															<div className="flex flex-col">
																<span className="font-medium text-gray-900">
																	{spesialis.nm_sps}
																</span>
																<span className="text-sm text-gray-500">
																	Kode: {spesialis.kd_sps}
																</span>
															</div>
														</motion.button>
													))
												)}
											</motion.div>
										)}
									</AnimatePresence>
								</div>
								{errors.kd_sps && (
									<motion.p
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className="text-red-600 text-sm mt-1"
									>
										{errors.kd_sps}
									</motion.p>
								)}
							</div>

							{/* Alumni */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Alumni
								</label>
								<motion.input
									variants={inputVariants}
									whileFocus="focus"
									type="text"
									value={data.alumni}
									onChange={(e) => setData("alumni", e.target.value)}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
									placeholder="Universitas/institusi"
								/>
							</div>

							{/* No Ijin Praktek */}
							<div className="md:col-span-2">
								<label className="block text-sm font-medium text-gray-700 mb-2">
									No. Ijin Praktek
								</label>
								<motion.input
									variants={inputVariants}
									whileFocus="focus"
									type="text"
									value={data.no_ijn_praktek}
									onChange={(e) => setData("no_ijn_praktek", e.target.value)}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
									placeholder="Nomor ijin praktek"
								/>
							</div>
						</div>

						{/* Actions */}
						<div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								type="button"
								onClick={handleClose}
								className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
							>
								Batal
							</motion.button>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								type="submit"
								disabled={processing}
								className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
							>
								{processing && (
									<motion.div
										animate={{ rotate: 360 }}
										transition={{
											duration: 1,
											repeat: Infinity,
											ease: "linear",
										}}
										className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
									/>
								)}
								{mode === "create" ? "Simpan" : "Perbarui"}
							</motion.button>
						</div>
					</form>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
}
