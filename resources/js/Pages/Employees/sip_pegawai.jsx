import React, { useState } from "react";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
import SidebarPengaturan from "@/Layouts/SidebarPengaturan";
import ResponsiveTable from "@/Components/ResponsiveTable";
import ActionDropdown from "@/Components/ActionDropdown";
import Pagination from "@/Components/Pagination";
import ConfirmationAlert from "@/Components/ConfirmationAlert";
import Alert from "@/Components/Alert";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, FileText, Calendar, CheckCircle2, XCircle } from "lucide-react";

export default function SipPegawai({ sipPegawai, filters, mode, sipPegawai: sipPegawaiDetail, refs }) {
	const [search, setSearch] = useState(filters?.search || "");
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
	const [sipToDelete, setSipToDelete] = useState(null);
	const [showAlert, setShowAlert] = useState(false);
	const [alertConfig, setAlertConfig] = useState({
		type: "success",
		title: "",
		message: "",
		autoClose: false,
	});

	const { data, setData, post, put, processing, errors, reset } = useForm({
		nik: sipPegawaiDetail?.nik || "",
		jnj_jabatan: sipPegawaiDetail?.jnj_jabatan || "",
		no_sip: sipPegawaiDetail?.no_sip || "",
		masa_berlaku: sipPegawaiDetail?.masa_berlaku || "",
		status: sipPegawaiDetail?.status?.toString() || "1",
	});

	const handleSearch = (e) => {
		e.preventDefault();
		router.get(
			route("sip-pegawai.index"),
			{ search },
			{
				preserveState: true,
				replace: true,
			}
		);
	};

	const handleDelete = (sip) => {
		setSipToDelete(sip);
		setShowDeleteConfirmation(true);
	};

	const confirmDelete = async () => {
		if (!sipToDelete) return;

		router.delete(route("sip-pegawai.destroy", sipToDelete.nik), {
			onSuccess: () => {
				setAlertConfig({
					type: "success",
					title: "Berhasil!",
					message: "Data SIP Pegawai berhasil dihapus.",
					autoClose: true,
					autoCloseDelay: 2000,
				});
				setShowAlert(true);
				setTimeout(() => {
					setShowAlert(false);
				}, 2000);
			},
			onError: () => {
				setAlertConfig({
					type: "error",
					title: "Gagal Menghapus",
					message: "Terjadi kesalahan saat menghapus data SIP Pegawai.",
					autoClose: false,
				});
				setShowAlert(true);
			},
		});
		
		setShowDeleteConfirmation(false);
		setSipToDelete(null);
	};

	const cancelDelete = () => {
		setShowDeleteConfirmation(false);
		setSipToDelete(null);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (mode === 'edit' && sipPegawaiDetail) {
			put(route("sip-pegawai.update", sipPegawaiDetail.nik), {
				onSuccess: () => {
					setAlertConfig({
						type: "success",
						title: "Berhasil!",
						message: "Data SIP Pegawai berhasil diperbarui.",
						autoClose: true,
						autoCloseDelay: 2000,
					});
					setShowAlert(true);
					setTimeout(() => {
						router.visit(route("sip-pegawai.index"));
					}, 2000);
				},
			});
		} else {
			post(route("sip-pegawai.store"), {
				onSuccess: () => {
					setAlertConfig({
						type: "success",
						title: "Berhasil!",
						message: "Data SIP Pegawai berhasil ditambahkan.",
						autoClose: true,
						autoCloseDelay: 2000,
					});
					setShowAlert(true);
					setTimeout(() => {
						router.visit(route("sip-pegawai.index"));
					}, 2000);
				},
			});
		}
	};

	const getStatusBadge = (status) => {
		const isActive = status === "1" || status === 1;
		return (
			<span
				className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
					isActive
						? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
						: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
				}`}
			>
				{isActive ? (
					<>
						<CheckCircle2 className="w-3 h-3 mr-1" />
						Aktif
					</>
				) : (
					<>
						<XCircle className="w-3 h-3 mr-1" />
						Tidak Aktif
					</>
				)}
			</span>
		);
	};

	const isExpired = (masaBerlaku) => {
		if (!masaBerlaku) return false;
		const today = new Date();
		const expiryDate = new Date(masaBerlaku);
		return expiryDate < today;
	};

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

	// Jika mode create/edit/show, tampilkan form modal
	if (mode === 'create' || mode === 'edit' || mode === 'show') {
		const employees = refs?.employees || [];
		const jnjJabatan = refs?.jnjJabatan || [];

		return (
			<SidebarPengaturan title="Kepegawaian">
				<Head title={mode === 'create' ? 'Tambah SIP Pegawai' : mode === 'edit' ? 'Edit SIP Pegawai' : 'Detail SIP Pegawai'} />
				
				<div className="space-y-6 -mt-6 -mx-6 p-6">
					<motion.div
						variants={itemVariants}
						initial="hidden"
						animate="visible"
						className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5"
					>
						<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
						
						<div className="relative px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
							<h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
								<motion.div
									className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md"
									whileHover={{ rotate: 90, scale: 1.1 }}
									transition={{ duration: 0.3 }}
								>
									<FileText className="w-4 h-4 text-white" />
								</motion.div>
								<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
									{mode === 'create' ? 'Tambah SIP Pegawai' : mode === 'edit' ? 'Edit SIP Pegawai' : 'Detail SIP Pegawai'}
								</span>
							</h2>
						</div>

						<div className="relative p-8">
							<form onSubmit={handleSubmit}>
								<div className="space-y-6">
									{/* NIK Pegawai */}
									<div>
										<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
											NIK Pegawai <span className="text-red-500">*</span>
										</label>
										{mode === 'show' ? (
											<div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
												{sipPegawaiDetail?.employee?.nama ? (
													<span className="text-gray-900 dark:text-white">
														{sipPegawaiDetail.employee.nama} ({sipPegawaiDetail.nik})
													</span>
												) : (
													<span className="text-gray-500 dark:text-gray-400">{sipPegawaiDetail?.nik || '-'}</span>
												)}
											</div>
										) : (
											<select
												value={data.nik}
												onChange={(e) => {
													const selectedNik = e.target.value;
													setData('nik', selectedNik);
													
													// Auto-fill jnj_jabatan dari pegawai yang dipilih
													if (selectedNik && employees) {
														const selectedEmployee = employees.find(emp => emp.nik === selectedNik);
														if (selectedEmployee && selectedEmployee.jnj_jabatan) {
															setData('jnj_jabatan', selectedEmployee.jnj_jabatan);
														}
													} else {
														// Reset jnj_jabatan jika tidak ada pegawai yang dipilih
														setData('jnj_jabatan', '');
													}
												}}
												className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
												required
											>
												<option value="">Pilih Pegawai</option>
												{employees.map((emp) => (
													<option key={emp.nik} value={emp.nik}>
														{emp.nama} ({emp.nik}) - {emp.jbtn || '-'}
													</option>
												))}
											</select>
										)}
										{errors.nik && (
											<p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.nik}</p>
										)}
									</div>

									{/* Jenjang Jabatan */}
									<div>
										<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
											Jenjang Jabatan <span className="text-red-500">*</span>
											{data.jnj_jabatan && data.nik && employees?.find(emp => emp.nik === data.nik)?.jnj_jabatan === data.jnj_jabatan && (
												<span className="ml-2 text-xs text-blue-600 dark:text-blue-400">(Terisi otomatis dari data pegawai)</span>
											)}
										</label>
										{mode === 'show' ? (
											<div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
												<span className="text-gray-900 dark:text-white">{sipPegawaiDetail?.jnj_jabatan || '-'}</span>
											</div>
										) : (
											<select
												value={data.jnj_jabatan}
												onChange={(e) => setData('jnj_jabatan', e.target.value)}
												className={`w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 ${
													data.jnj_jabatan && data.nik && employees?.find(emp => emp.nik === data.nik)?.jnj_jabatan === data.jnj_jabatan
														? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800'
														: ''
												}`}
												required
											>
												<option value="">Pilih Jenjang Jabatan</option>
												{jnjJabatan.map((jnj) => (
													<option key={jnj.kode} value={jnj.kode}>
														{jnj.kode} - {jnj.nama}
													</option>
												))}
											</select>
										)}
										{errors.jnj_jabatan && (
											<p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.jnj_jabatan}</p>
										)}
									</div>

									{/* Nomor SIP */}
									<div>
										<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
											Nomor SIP <span className="text-red-500">*</span>
										</label>
										{mode === 'show' ? (
											<div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
												<span className="text-gray-900 dark:text-white font-mono">{sipPegawaiDetail?.no_sip || '-'}</span>
											</div>
										) : (
											<input
												type="text"
												value={data.no_sip}
												onChange={(e) => setData('no_sip', e.target.value)}
												className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
												placeholder="Masukkan nomor SIP"
												required
											/>
										)}
										{errors.no_sip && (
											<p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.no_sip}</p>
										)}
									</div>

									{/* Masa Berlaku */}
									<div>
										<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
											Masa Berlaku <span className="text-red-500">*</span>
										</label>
										{mode === 'show' ? (
											<div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
												<span className={`text-gray-900 dark:text-white ${isExpired(sipPegawaiDetail?.masa_berlaku) ? 'text-red-600 dark:text-red-400 font-semibold' : ''}`}>
													{sipPegawaiDetail?.masa_berlaku ? new Date(sipPegawaiDetail.masa_berlaku).toLocaleDateString('id-ID') : '-'}
													{isExpired(sipPegawaiDetail?.masa_berlaku) && ' (Kedaluwarsa)'}
												</span>
											</div>
										) : (
											<input
												type="date"
												value={data.masa_berlaku}
												onChange={(e) => setData('masa_berlaku', e.target.value)}
												className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
												required
											/>
										)}
										{errors.masa_berlaku && (
											<p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.masa_berlaku}</p>
										)}
									</div>

									{/* Status */}
									<div>
										<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
											Status <span className="text-red-500">*</span>
										</label>
										{mode === 'show' ? (
											<div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
												{getStatusBadge(sipPegawaiDetail?.status)}
											</div>
										) : (
											<select
												value={data.status}
												onChange={(e) => setData('status', e.target.value)}
												className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
												required
											>
												<option value="1">Aktif</option>
												<option value="0">Tidak Aktif</option>
											</select>
										)}
										{errors.status && (
											<p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.status}</p>
										)}
									</div>

									{/* Action Buttons */}
									{mode !== 'show' && (
										<div className="flex gap-4 pt-4">
											<button
												type="submit"
												disabled={processing}
												className="flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-semibold px-6 py-2.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
											>
												{processing ? (
													<>
														<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
														Menyimpan...
													</>
												) : (
													<>
														<CheckCircle2 className="w-4 h-4" />
														Simpan
													</>
												)}
											</button>
											<Link
												href={route("sip-pegawai.index")}
												className="px-6 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
											>
												Batal
											</Link>
										</div>
									)}

									{mode === 'show' && (
										<div className="flex gap-4 pt-4">
											<Link
												href={route("sip-pegawai.edit", sipPegawaiDetail.nik)}
												className="flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-semibold px-6 py-2.5 rounded-lg"
											>
												Edit
											</Link>
											<Link
												href={route("sip-pegawai.index")}
												className="px-6 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
											>
												Kembali
											</Link>
										</div>
									)}
								</div>
							</form>
						</div>
					</motion.div>
				</div>

				{/* Alert */}
				<Alert
					isOpen={showAlert}
					type={alertConfig.type}
					title={alertConfig.title}
					message={alertConfig.message}
					autoClose={alertConfig.autoClose}
					autoCloseDelay={alertConfig.autoCloseDelay}
					onClose={() => setShowAlert(false)}
				/>
			</SidebarPengaturan>
		);
	}

	// Mode index - tampilkan daftar
	return (
		<SidebarPengaturan title="Kepegawaian">
			<Head title="SIP Pegawai" />

			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="space-y-6 -mt-6 -mx-6 p-6"
			>
				{/* Header */}
				<motion.div
					variants={itemVariants}
					className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5"
				>
					<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
					
					<div className="relative p-6">
						<div className="flex justify-between items-center">
							<div>
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
									<motion.div
										className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25"
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.6, delay: 0.2 }}
									>
										<FileText className="w-6 h-6 text-white" />
									</motion.div>
									<span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
										SIP Pegawai
									</span>
								</h2>
								<p className="text-gray-600 dark:text-gray-400 mt-1">
									Kelola data Surat Izin Praktik (SIP) pegawai
								</p>
							</div>
							<Link
								href={route("sip-pegawai.create")}
								className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg font-medium text-sm whitespace-nowrap transform hover:scale-105"
							>
								<Plus className="w-4 h-4" />
								<span>Tambah SIP</span>
							</Link>
						</div>
					</div>
				</motion.div>

				{/* Search and Filters */}
				<motion.div
					variants={itemVariants}
					className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5"
				>
					<div className="relative p-6">
						<form onSubmit={handleSearch} className="flex gap-4">
							<div className="flex-1 relative">
								<span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
									<Search className="w-5 h-5" />
								</span>
								<input
									aria-label="Cari SIP Pegawai"
									type="text"
									value={search}
									onChange={(e) => setSearch(e.target.value)}
									placeholder="Cari berdasarkan nomor SIP, NIK, atau nama pegawai..."
									className="w-full h-11 pl-10 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm"
								/>
								{search && (
									<button
										type="button"
										aria-label="Bersihkan pencarian"
										onClick={() => setSearch("")}
										className="absolute inset-y-0 right-3 my-auto px-2 h-7 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 text-xs"
									>
										Bersihkan
									</button>
								)}
							</div>
							<button
								type="submit"
								className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-6 h-11 rounded-lg transition-all shadow-sm"
							>
								Cari
							</button>
							{search && (
								<button
									type="button"
									onClick={() => {
										setSearch("");
										router.get(route("sip-pegawai.index"));
									}}
									className="px-5 h-11 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
								>
									Reset
								</button>
							)}
						</form>
					</div>
				</motion.div>

				{/* Data Table */}
				<ResponsiveTable
					columns={[
						{
							key: "no_sip",
							header: "Nomor SIP",
							render: (sip) => (
								<span className="font-medium text-gray-900 dark:text-white font-mono">
									{sip.no_sip}
								</span>
							),
						},
						{
							key: "nama",
							header: "Nama Pegawai",
							render: (sip) => (
								<div className="flex items-center">
									<div className="flex-shrink-0 h-10 w-10">
										<div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
											<span className="text-white font-medium text-sm">
												{sip.employee?.nama
													? sip.employee.nama.charAt(0).toUpperCase()
													: sip.nik?.charAt(0).toUpperCase() || "?"}
											</span>
										</div>
									</div>
									<div className="ml-4">
										<div className="text-sm font-medium text-gray-900 dark:text-white">
											{sip.employee?.nama || sip.nik || "-"}
										</div>
										<div className="text-sm text-gray-500 dark:text-gray-400">
											NIK: {sip.nik}
										</div>
									</div>
								</div>
							),
						},
						{
							key: "jnj_jabatan",
							header: "Jenjang Jabatan",
							render: (sip) => (
								<span className="text-gray-900 dark:text-white">
									{sip.jnj_jabatan || "-"}
								</span>
							),
						},
						{
							key: "masa_berlaku",
							header: "Masa Berlaku",
							render: (sip) => {
								const expired = isExpired(sip.masa_berlaku);
								return (
									<div className="flex items-center gap-2">
										<Calendar className={`w-4 h-4 ${expired ? 'text-red-500' : 'text-gray-400'}`} />
										<span className={`${expired ? 'text-red-600 dark:text-red-400 font-semibold' : 'text-gray-900 dark:text-white'}`}>
											{sip.masa_berlaku
												? new Date(sip.masa_berlaku).toLocaleDateString('id-ID')
												: "-"}
										</span>
										{expired && (
											<span className="text-xs text-red-600 dark:text-red-400">(Kedaluwarsa)</span>
										)}
									</div>
								);
							},
						},
						{
							key: "status",
							header: "Status",
							render: (sip) => getStatusBadge(sip.status),
						},
						{
							key: "actions",
							header: "Aksi",
							hideOnMobile: true,
							render: (sip) => (
								<ActionDropdown
									item={sip}
									viewRoute="sip-pegawai.show"
									editRoute="sip-pegawai.edit"
									onDelete={handleDelete}
								/>
							),
						},
					]}
					data={sipPegawai?.data || []}
					keyField="nik"
					emptyMessage="Tidak ada data SIP Pegawai"
					emptyIcon={
						<FileText className="w-16 h-16 text-gray-400" />
					}
					mobileCardRender={(sip) => (
						<div className="bg-white/95 dark:bg-gray-900/60 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-4">
							<div className="flex items-start justify-between">
								<div className="flex-1">
									{/* Avatar dan Nama */}
									<div className="flex items-center mb-3">
										<div className="flex-shrink-0 h-12 w-12">
											<div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
												<span className="text-white font-medium text-lg">
													{sip.employee?.nama
														? sip.employee.nama.charAt(0).toUpperCase()
														: sip.nik?.charAt(0).toUpperCase() || "?"}
												</span>
											</div>
										</div>
										<div className="ml-4">
											<div className="text-lg font-medium text-gray-900 dark:text-white">
												{sip.employee?.nama || sip.nik || "-"}
											</div>
											<div className="text-sm text-gray-500 dark:text-gray-400">
												NIK: {sip.nik}
											</div>
										</div>
									</div>

									{/* Detail Info */}
									<div className="space-y-2">
										<div>
											<span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
												Nomor SIP:
											</span>
											<div className="mt-1 text-sm font-medium text-gray-900 dark:text-white font-mono">
												{sip.no_sip}
											</div>
										</div>
										<div>
											<span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
												Jenjang Jabatan:
											</span>
											<div className="mt-1 text-sm text-gray-900 dark:text-white">
												{sip.jnj_jabatan || "-"}
											</div>
										</div>
										<div>
											<span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
												Masa Berlaku:
											</span>
											<div className={`mt-1 text-sm ${isExpired(sip.masa_berlaku) ? 'text-red-600 dark:text-red-400 font-semibold' : 'text-gray-900 dark:text-white'}`}>
												{sip.masa_berlaku
													? new Date(sip.masa_berlaku).toLocaleDateString('id-ID')
													: "-"}
												{isExpired(sip.masa_berlaku) && ' (Kedaluwarsa)'}
											</div>
										</div>
										<div>
											<span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
												Status:
											</span>
											<div className="mt-1">
												{getStatusBadge(sip.status)}
											</div>
										</div>
									</div>
								</div>

								{/* Action Dropdown */}
								<div className="ml-4">
									<ActionDropdown
										item={sip}
										viewRoute="sip-pegawai.show"
										editRoute="sip-pegawai.edit"
										onDelete={handleDelete}
									/>
								</div>
							</div>
						</div>
					)}
				/>

				{/* Pagination */}
				{sipPegawai && (
					<Pagination
						links={sipPegawai.links}
						from={sipPegawai.from}
						to={sipPegawai.to}
						total={sipPegawai.total}
					/>
				)}

				{/* Delete Confirmation Alert */}
				<ConfirmationAlert
					isOpen={showDeleteConfirmation}
					type="danger"
					title="Hapus SIP Pegawai"
					itemName={sipToDelete?.no_sip || sipToDelete?.nik}
					itemType="SIP Pegawai"
					confirmText="Ya, Hapus"
					cancelText="Batal"
					onConfirm={confirmDelete}
					onCancel={cancelDelete}
					onClose={cancelDelete}
				/>

				{/* Success/Error Alert */}
				<Alert
					isOpen={showAlert}
					type={alertConfig.type}
					title={alertConfig.title}
					message={alertConfig.message}
					autoClose={alertConfig.autoClose}
					autoCloseDelay={alertConfig.autoCloseDelay}
					onClose={() => setShowAlert(false)}
				/>
			</motion.div>
		</SidebarPengaturan>
	);
}
