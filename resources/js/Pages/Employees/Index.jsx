import React, { useEffect, useMemo, useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import { AnimatePresence, motion } from "framer-motion";
import SidebarPengaturan from "@/Layouts/SidebarPengaturan";
import ActionDropdown from "@/Components/ActionDropdown";
import Pagination from "@/Components/Pagination";
import CreateUserFromEmployeeModal from "@/Components/CreateUserFromEmployeeModal";
import ConfirmationAlert from "@/Components/ConfirmationAlert";
import Alert from "@/Components/Alert";
import { Plus, Search, Users } from "lucide-react";

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
	hidden: { opacity: 0, y: 30, scale: 0.98 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
	},
};

const cardVariants = {
	hidden: { opacity: 0, scale: 0.98 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
	},
	hover: {
		scale: 1.01,
		y: -4,
		transition: { duration: 0.3, ease: "easeOut" },
	},
};

const detailVariants = {
	hidden: { opacity: 0, y: 14, scale: 0.99, filter: "blur(2px)" },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		filter: "blur(0px)",
		transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
	},
	exit: {
		opacity: 0,
		y: -10,
		scale: 0.99,
		filter: "blur(2px)",
		transition: { duration: 0.2, ease: "easeInOut" },
	},
};

const EMPLOYEE_LABEL_MAP = {
	nik: "NIK",
	no_ktp: "No. KTP",
	nama: "Nama",
	jk: "Jenis Kelamin",
	tmp_lahir: "Tempat Lahir",
	tgl_lahir: "Tanggal Lahir",
	alamat: "Alamat",
	kota: "Kota",
	jbtn: "Jabatan",
	jnj_jabatan: "Jenjang Jabatan",
	kode_kelompok: "Kelompok Jabatan",
	kode_resiko: "Risiko Kerja",
	kode_emergency: "Emergency",
	departemen: "Departemen",
	bidang: "Bidang",
	stts_wp: "Status WP",
	stts_kerja: "Status Kerja",
	npwp: "NPWP",
	pendidikan: "Pendidikan",
	gapok: "Gaji Pokok",
	mulai_kerja: "Mulai Kerja",
	ms_kerja: "Masa Kerja",
	indexins: "Index Ins",
	bpd: "Bank",
	rekening: "Rekening",
	stts_aktif: "Status Aktif",
	wajibmasuk: "Wajib Masuk",
	pengurang: "Pengurang",
	indek: "Indeks",
	mulai_kontrak: "Mulai Kontrak",
	cuti_diambil: "Cuti Diambil",
	dankes: "Dankes",
	photo: "Foto",
};

function formatEmployeeLabel(key) {
	if (EMPLOYEE_LABEL_MAP[key]) return EMPLOYEE_LABEL_MAP[key];
	return String(key)
		.replaceAll("_", " ")
		.replace(/\b\w/g, (m) => m.toUpperCase());
}

function formatEmployeeValue(key, value) {
	if (value === null || value === undefined || value === "") return "-";
	if (key === "tgl_lahir" || key === "mulai_kerja" || key === "mulai_kontrak") {
		if (typeof value !== "string") return "-";
		const v = value.trim();
		if (!v || v.startsWith("-")) return "-";
		const match = v.match(/^(\d{4})-(\d{2})-(\d{2})/);
		if (!match) return "-";
		const year = Number(match[1]);
		const month = Number(match[2]);
		const day = Number(match[3]);
		if (!Number.isFinite(year) || year < 1900) return "-";
		if (month < 1 || month > 12 || day < 1 || day > 31) return "-";
		const dt = new Date(Date.UTC(year, month - 1, day));
		if (Number.isNaN(dt.getTime())) return "-";
		return new Intl.DateTimeFormat("id-ID", {
			day: "2-digit",
			month: "long",
			year: "numeric",
		}).format(dt);
	}
	if (key === "gapok") {
		const n =
			typeof value === "number"
				? value
				: Number(String(value).replaceAll(".", "").replaceAll(",", "."));
		if (!Number.isFinite(n)) return String(value);
		return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(n);
	}
	if (typeof value === "boolean") return value ? "Ya" : "Tidak";
	if (typeof value === "object") return JSON.stringify(value);
	return String(value);
}

export default function Index({ employees, filters }) {
	const [search, setSearch] = useState(filters.search || "");
	const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
	const [selectedEmployee, setSelectedEmployee] = useState(null);
	const [employeeForUser, setEmployeeForUser] = useState(null);
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
	const [employeeToDelete, setEmployeeToDelete] = useState(null);
	const [showAlert, setShowAlert] = useState(false);
	const [alertConfig, setAlertConfig] = useState({
		type: "success",
		title: "",
		message: "",
		autoClose: false,
	});

	const reduceMotion = useMemo(
		() =>
			typeof window !== "undefined" &&
			window.matchMedia &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches,
		[]
	);

	useEffect(() => {
		const list = Array.isArray(employees?.data) ? employees.data : [];
		if (list.length > 0 && !selectedEmployee) {
			setSelectedEmployee(list[0]);
		}
	}, [employees, selectedEmployee]);

	const handleSearch = (e) => {
		e.preventDefault();
		router.get(
			route("employees.index"),
			{ search },
			{
				preserveState: true,
				replace: true,
			}
		);
	};

	const handleDelete = (employee) => {
		setEmployeeToDelete(employee);
		setShowDeleteConfirmation(true);
	};

	const confirmDelete = async () => {
		if (!employeeToDelete) return;

		try {
			const response = await fetch(`/api/employees/${employeeToDelete.id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				const result = await response.json();
				setAlertConfig({
					type: "success",
					title: "Berhasil!",
					message: result.message || "Pegawai berhasil dihapus.",
					autoClose: true,
					autoCloseDelay: 2000,
				});
				setShowAlert(true);

				// Refresh the page to show updated data
				setTimeout(() => {
					router.reload();
					setShowAlert(false);
				}, 2000);
			} else {
				const result = await response.json();
				setAlertConfig({
					type: "error",
					title: "Gagal Menghapus",
					message:
						result.message || "Terjadi kesalahan saat menghapus pegawai.",
					autoClose: false,
				});
				setShowAlert(true);
			}
		} catch (_error) {
			setAlertConfig({
				type: "error",
				title: "Kesalahan Jaringan",
				message: "Terjadi kesalahan jaringan saat menghapus pegawai.",
				autoClose: false,
			});
			setShowAlert(true);
		} finally {
			setShowDeleteConfirmation(false);
			setEmployeeToDelete(null);
		}
	};

	const cancelDelete = () => {
		setShowDeleteConfirmation(false);
		setEmployeeToDelete(null);
	};

	const handleCreateUser = (employee) => {
		setEmployeeForUser(employee);
		setIsCreateUserModalOpen(true);
	};

	const handleCreateUserSuccess = () => {
		setIsCreateUserModalOpen(false);
		setEmployeeForUser(null);
		// Show success message
		setAlertConfig({
			type: "success",
			title: "Berhasil!",
			message: "User berhasil dibuat/diperbarui dari data pegawai.",
			autoClose: true,
			autoCloseDelay: 3000,
		});
		setShowAlert(true);
	};

	return (
		<SidebarPengaturan title="Kepegawaian">
			<Head title="Data Pegawai" />

			<motion.div
				variants={containerVariants}
				initial={reduceMotion ? false : "hidden"}
				animate={reduceMotion ? false : "visible"}
				className="space-y-6"
			>
				<motion.div
					variants={itemVariants}
					className="relative overflow-hidden rounded-2xl bg-white/85 dark:bg-gray-800/85 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5"
				>
					<div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10" />
					<div className="absolute top-2 left-4 right-4 h-2 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-sm ring-1 ring-black/5 dark:ring-white/10 z-20" />
					<div className="relative p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
						<div className="flex items-center gap-3">
							<div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md shadow-blue-500/20">
								<Users className="w-5 h-5 text-white" />
							</div>
							<div>
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
									Data Pegawai
								</h2>
								<p className="text-gray-600 dark:text-gray-400 mt-1">
									Kelola data pegawai rumah sakit
								</p>
							</div>
						</div>
						<div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
							<form
								onSubmit={handleSearch}
								className="flex flex-wrap items-center gap-2 w-full md:w-auto"
							>
								<div className="relative w-full md:w-auto">
									<Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
									<input
										aria-label="Cari pegawai"
										type="text"
										placeholder="Cari pegawai (nama/NIK)…"
										value={search}
										onChange={(e) => setSearch(e.target.value)}
										className="w-full md:w-[280px] pl-8 pr-24 py-2 text-sm bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all"
									/>
									{search && (
										<button
											type="button"
											aria-label="Bersihkan pencarian"
											onClick={() => setSearch("")}
											className="absolute right-2 top-1/2 -translate-y-1/2 px-2 h-7 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 text-xs"
										>
											Bersihkan
										</button>
									)}
								</div>
								<motion.button
									whileHover={{ scale: 1.03 }}
									whileTap={{ scale: 0.97 }}
									type="submit"
									className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/25"
								>
									Cari
								</motion.button>
								{search && (
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										type="button"
										onClick={() => {
											setSearch("");
											router.get(route("employees.index"));
										}}
										className="px-4 py-2 rounded-lg border border-gray-200/70 dark:border-gray-700/70 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
									>
										Reset
									</motion.button>
								)}
							</form>
							<div className="hidden md:flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
								<span className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-900/40">
									Total: {employees?.total ?? employees?.data?.length ?? 0}
								</span>
							</div>
							<Link
								href={route("employees.create")}
								className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-blue-500/25"
							>
								<Plus className="h-5 w-5" />
								<span className="text-sm font-semibold">Tambah Pegawai</span>
							</Link>
						</div>
					</div>
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial={reduceMotion ? false : "hidden"}
					animate={reduceMotion ? false : "visible"}
					className="grid grid-cols-1 lg:grid-cols-12 gap-6"
				>
					<motion.div
						variants={itemVariants}
						className="relative bg-white/95 dark:bg-gray-900/85 rounded-2xl shadow-xl shadow-blue-500/5 overflow-hidden border border-gray-200/70 dark:border-gray-800 col-span-12 lg:col-span-5"
					>
						<div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10" />
						<div className="relative z-[1]">
							<div className="relative px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm flex items-center justify-between">
								<h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
									<motion.div
										className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md"
										whileHover={{ rotate: 90, scale: 1.1 }}
										transition={{ duration: 0.3 }}
									>
										<Users className="w-4 h-4 text-white" />
									</motion.div>
									<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
										Daftar Pegawai ({Array.isArray(employees?.data) ? employees.data.length : 0})
									</span>
								</h3>
							</div>

							<div className="flex-1 overflow-y-auto max-h-[calc(100vh-360px)]">
								<AnimatePresence mode="wait">
									{!Array.isArray(employees?.data) || employees.data.length === 0 ? (
										<motion.div
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											className="p-8 text-center text-gray-500"
										>
											<div className="flex justify-center mb-3">
												<Users className="w-10 h-10 text-gray-400" />
											</div>
											<p className="text-lg font-medium">
												Tidak ada pegawai ditemukan
											</p>
											<p className="text-sm">Coba ubah kata kunci pencarian</p>
										</motion.div>
									) : (
										<motion.div
											variants={containerVariants}
											initial={reduceMotion ? false : "hidden"}
											animate={reduceMotion ? false : "visible"}
											layout
											className="p-4 space-y-3"
										>
											{employees.data.map((employee) => (
												<motion.div
													key={employee.id ?? employee.nik ?? employee.nama}
													variants={cardVariants}
													whileHover="hover"
													onClick={() => setSelectedEmployee(employee)}
													layout
													className={`relative p-4 rounded-xl cursor-pointer transition-all border ${
														selectedEmployee?.id === employee.id
															? "border-blue-600 bg-blue-50/60 dark:bg-blue-900/10 ring-1 ring-blue-500/20"
															: "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
													}`}
												>
													<div className="flex justify-between items-start gap-3">
														<div className="flex items-start gap-3 flex-1 min-w-0">
															<div className="flex-shrink-0 h-10 w-10">
																<motion.div
																	layoutId={`employee-avatar-${employee.id ?? employee.nik ?? employee.nama}`}
																	className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center"
																>
																	<span className="text-white font-medium text-sm">
																		{employee.nama
																			? employee.nama.charAt(0).toUpperCase()
																			: "?"}
																	</span>
																</motion.div>
															</div>
															<div className="flex-1 min-w-0">
																<h4 className="font-semibold text-gray-900 dark:text-white truncate">
																	{employee.nama || "-"}
																</h4>
																<div className="mt-1 flex items-center flex-wrap gap-[6px]">
																	<p className="text-sm text-gray-600 dark:text-gray-300 m-0">
																		NIK: {employee.nik || "-"}
																	</p>
																	{employee.jk && (
																		<span className="text-[11px] px-2 py-0.5 rounded-md bg-gray-50 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 border border-gray-200/40 dark:border-gray-700/40">
																			{employee.jk}
																		</span>
																	)}
																	{employee.departemen && (
																		<span className="text-[11px] px-2 py-0.5 rounded-md bg-indigo-50/60 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300 border border-indigo-200/40 dark:border-indigo-800/30">
																			{employee.departemen}
																		</span>
																	)}
																	{employee.jbtn && (
																		<span className="text-[11px] px-2 py-0.5 rounded-md bg-purple-50/60 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300 border border-purple-200/40 dark:border-purple-800/30">
																			{employee.jbtn}
																		</span>
																	)}
																</div>
															</div>
														</div>
														<div className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
															<ActionDropdown
																item={employee}
																viewRoute="employees.show"
																editRoute="employees.edit"
																onDelete={handleDelete}
																onCreateUser={handleCreateUser}
															/>
														</div>
													</div>
												</motion.div>
											))}
										</motion.div>
									)}
								</AnimatePresence>
							</div>

							<div className="p-4 border-t border-gray-200/60 dark:border-gray-800/60">
								<Pagination
									links={employees.links}
									from={employees.from}
									to={employees.to}
									total={employees.total}
								/>
							</div>
						</div>
					</motion.div>

					<motion.div
						variants={itemVariants}
						className="relative bg-white/95 dark:bg-gray-900/85 rounded-2xl shadow-xl shadow-blue-500/5 overflow-hidden border border-gray-200/70 dark:border-gray-800 col-span-12 lg:col-span-7"
					>
						<div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10" />
						<div className="relative z-[1] p-6">
							<AnimatePresence mode="wait" initial={false}>
								{selectedEmployee ? (
									<motion.div
										key={selectedEmployee.id ?? selectedEmployee.nik ?? selectedEmployee.nama}
										variants={detailVariants}
										initial={reduceMotion ? false : "hidden"}
										animate={reduceMotion ? false : "visible"}
										exit={reduceMotion ? false : "exit"}
									>
										<EmployeeDetail
											employee={selectedEmployee}
											onDelete={handleDelete}
											onCreateUser={handleCreateUser}
										/>
									</motion.div>
								) : (
									<motion.div
										key="empty"
										variants={detailVariants}
										initial={reduceMotion ? false : "hidden"}
										animate={reduceMotion ? false : "visible"}
										exit={reduceMotion ? false : "exit"}
										className="p-10 text-center text-gray-500"
									>
										<div className="flex justify-center mb-3">
											<Users className="w-10 h-10 text-gray-400" />
										</div>
										<p className="text-lg font-medium">Pilih pegawai</p>
										<p className="text-sm">
											Klik salah satu pegawai di panel kiri untuk melihat detail
										</p>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</motion.div>
				</motion.div>

			{/* Create Employee dialihkan ke halaman Create */}

				{/* Create User from Employee Modal */}
				<CreateUserFromEmployeeModal
					isOpen={isCreateUserModalOpen}
					onClose={() => {
						setIsCreateUserModalOpen(false);
						setEmployeeForUser(null);
					}}
					onSuccess={handleCreateUserSuccess}
					employee={employeeForUser}
				/>

				{/* Delete Confirmation Alert */}
				<ConfirmationAlert
					isOpen={showDeleteConfirmation}
					type="danger"
					title="Hapus Pegawai"
					itemName={employeeToDelete?.nama}
					itemType="pegawai"
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

function InfoItem({ label, value }) {
	const isEmpty = value === null || value === undefined || value === "";
	const displayValue = isEmpty ? "-" : value;

	return (
		<div className="rounded-xl border border-gray-200/70 dark:border-gray-700/70 bg-white/70 dark:bg-gray-900/40 backdrop-blur-sm p-4">
			<div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
				{label}
			</div>
			<div className="mt-1 text-sm font-semibold text-gray-900 dark:text-white break-words">
				{displayValue}
			</div>
		</div>
	);
}

function EmployeeDetail({ employee, onDelete, onCreateUser }) {
	const name = employee?.nama || "-";
	const initial = employee?.nama ? String(employee.nama).charAt(0).toUpperCase() : "?";
	const employeeKey = employee?.id ?? employee?.nik ?? employee?.nama ?? "unknown";
	const rawPhoto = employee?.photo || employee?.foto || employee?.photo_path || employee?.foto_path;
	const photoCandidates = useMemo(() => {
		const out = new Set();
		const add = (u) => {
			if (!u || typeof u !== "string") return;
			try {
				out.add(encodeURI(u));
			} catch (_e) {
				out.add(u);
			}
		};

		if (employee?.id) {
			try {
				add(route("employees.photo", employee.id));
			} catch (_e) {
			}
		}

		if (!rawPhoto || typeof rawPhoto !== "string") return Array.from(out);
		const raw = rawPhoto.trim().replaceAll("\\", "/");
		if (!raw || raw.endsWith("/")) return Array.from(out);

		if (raw.startsWith("http")) add(raw);
		if (raw.startsWith("/")) add(raw);
		if (raw.includes("/storage/")) {
			const after = raw.split("/storage/").pop();
			add(`/storage/${after}`);
		}

		const normalized = raw.replace(/^public\//, "").replace(/^storage\//, "");
		add(`/storage/${normalized}`);
		add(`/${normalized}`);

		if (normalized.startsWith("pages/pegawai/photo/")) {
			const tail = normalized.slice("pages/pegawai/photo/".length);
			add(`/pages/pegawai/photo/${tail}`);
			add(`/storage/pegawai/${tail}`);
			add(`/storage/pegawai/photo/${tail}`);
		}

		if (!normalized.includes("/")) {
			add(`/storage/pegawai/${normalized}`);
			add(`/storage/pegawai/photo/${normalized}`);
		}

		return Array.from(out);
	}, [employee?.id, rawPhoto]);
	const [photoIndex, setPhotoIndex] = useState(0);
	useEffect(() => setPhotoIndex(0), [employeeKey]);
	const photoUrl = photoCandidates[photoIndex] || null;

	const preferredOrder = [
		"nik",
		"no_ktp",
		"nama",
		"jk",
		"tmp_lahir",
		"tgl_lahir",
		"alamat",
		"kota",
		"jbtn",
		"jnj_jabatan",
		"kode_kelompok",
		"kode_resiko",
		"kode_emergency",
		"departemen",
		"bidang",
		"stts_wp",
		"stts_kerja",
		"npwp",
		"pendidikan",
		"gapok",
		"mulai_kerja",
		"ms_kerja",
		"indexins",
		"bpd",
		"rekening",
		"stts_aktif",
		"wajibmasuk",
		"pengurang",
		"indek",
		"mulai_kontrak",
		"cuti_diambil",
		"dankes",
	];

	const exclude = new Set(["id", "photo", "foto", "photo_path", "foto_path"]);
	const keys = employee && typeof employee === "object" ? Object.keys(employee) : [];
	const preferred = preferredOrder.filter((k) => keys.includes(k));
	const extras = keys
		.filter((k) => !exclude.has(k) && !preferredOrder.includes(k))
		.sort((a, b) => a.localeCompare(b));

	const orderedFields = [...preferred, ...extras].map((key) => ({
		key,
		label: formatEmployeeLabel(key),
		rawValue: employee?.[key],
	}));

	return (
		<div className="space-y-6">
			<div className="flex items-start justify-between gap-4">
				<div className="flex items-start gap-4 min-w-0">
					<motion.div
						layoutId={`employee-avatar-${employeeKey}`}
						className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20 flex-shrink-0"
					>
						<span className="text-white font-bold text-lg">{initial}</span>
					</motion.div>
					<div className="min-w-0">
						<h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">
							{name}
						</h3>
						<div className="mt-2 flex items-center flex-wrap gap-2">
							{employee?.nik && (
								<span className="text-xs px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-900/40 text-gray-700 dark:text-gray-200">
									NIK: {employee.nik}
								</span>
							)}
							{employee?.jk && (
								<span className="text-xs px-2 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200/40 dark:border-blue-800/30">
									{employee.jk}
								</span>
							)}
							{employee?.departemen && (
								<span className="text-xs px-2 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200/40 dark:border-indigo-800/30">
									{employee.departemen}
								</span>
							)}
							{employee?.jbtn && (
								<span className="text-xs px-2 py-1 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border border-purple-200/40 dark:border-purple-800/30">
									{employee.jbtn}
								</span>
							)}
						</div>
					</div>
				</div>
				<div className="flex-shrink-0 flex items-start gap-3">
					<div className="h-12 w-12 rounded-2xl overflow-hidden ring-1 ring-gray-200/70 dark:ring-gray-700/70 bg-gray-100 dark:bg-gray-800 flex items-center justify-center shadow-sm">
						{photoUrl ? (
							<img
								src={photoUrl}
								alt={`Foto ${name}`}
								className="h-full w-full object-cover"
								onError={() => {
									if (photoIndex < photoCandidates.length - 1) {
										setPhotoIndex((i) => i + 1);
									} else {
										setPhotoIndex(photoCandidates.length);
									}
								}}
							/>
						) : null}
						{!photoUrl ? (
							<span className="text-lg font-bold text-gray-800 dark:text-white">{initial}</span>
						) : (
							<div className="h-full w-full items-center justify-center hidden">
								<span className="text-lg font-bold text-gray-800 dark:text-white">{initial}</span>
							</div>
						)}
					</div>
					<ActionDropdown
						item={employee}
						viewRoute="employees.show"
						editRoute="employees.edit"
						onDelete={onDelete}
						onCreateUser={onCreateUser}
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{orderedFields.map(({ key, label, rawValue }) => {
					if (key === "stts_aktif") {
						const v = formatEmployeeValue(key, rawValue);
						const isActive = String(v).toUpperCase() === "AKTIF" || String(v).toUpperCase() === "ACTIVE";
						return (
							<InfoItem
								key={key}
								label={label}
								value={
									<span
										className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-semibold border ${
											isActive
												? "bg-green-50 text-green-700 border-green-200/60 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800/30"
												: "bg-red-50 text-red-700 border-red-200/60 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800/30"
										}`}
									>
										{v}
									</span>
								}
							/>
						);
					}

					return <InfoItem key={key} label={label} value={formatEmployeeValue(key, rawValue)} />;
				})}
			</div>
		</div>
	);
}
