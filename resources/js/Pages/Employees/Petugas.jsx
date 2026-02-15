import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Head } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import SidebarPengaturan from "@/Layouts/SidebarPengaturan";
import Modal from "@/Components/Modal";
import Alert from "@/Components/Alert";
import { Plus, Search, Pencil, Trash, Users, ChevronDown, X } from "lucide-react";

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

const emptyForm = {
	nip: "",
	nama: "",
	jk: "L",
	tmp_lahir: "",
	tgl_lahir: "",
	gol_darah: "-",
	agama: "",
	stts_nikah: "BELUM MENIKAH",
	alamat: "",
	kd_jbtn: "",
	no_telp: "",
	email: "",
	status: "1",
};

export default function Petugas() {
	const [q, setQ] = useState("");
	const [status, setStatus] = useState("");
	const [perPage, setPerPage] = useState(10);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [rows, setRows] = useState([]);
	const [selectedPetugas, setSelectedPetugas] = useState(null);
	const [meta, setMeta] = useState({
		current_page: 1,
		last_page: 1,
		total: 0,
		from: 0,
		to: 0,
	});

	const reduceMotion = useMemo(
		() =>
			typeof window !== "undefined" &&
			window.matchMedia &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches,
		[]
	);
	const didInitRef = useRef(false);

	const [employeeSearch, setEmployeeSearch] = useState("");
	const [employeeOptions, setEmployeeOptions] = useState([]);
	const [isEmployeeDropdownOpen, setIsEmployeeDropdownOpen] = useState(false);
	const [selectedEmployeeName, setSelectedEmployeeName] = useState("");
	const [isEmployeeSearching, setIsEmployeeSearching] = useState(false);
	const employeeSearchTimeoutRef = useRef(null);
	const employeeDropdownRef = useRef(null);
	const employeeAbortRef = useRef(null);

	const [jabatanSearch, setJabatanSearch] = useState("");
	const [jabatanOptions, setJabatanOptions] = useState([]);
	const [isJabatanDropdownOpen, setIsJabatanDropdownOpen] = useState(false);
	const [selectedJabatanName, setSelectedJabatanName] = useState("");
	const [isJabatanSearching, setIsJabatanSearching] = useState(false);
	const jabatanSearchTimeoutRef = useRef(null);
	const jabatanDropdownRef = useRef(null);
	const jabatanAbortRef = useRef(null);

	const [modalOpen, setModalOpen] = useState(false);
	const [modalMode, setModalMode] = useState("create");
	const [form, setForm] = useState(emptyForm);
	const [submitting, setSubmitting] = useState(false);

	const [confirmOpen, setConfirmOpen] = useState(false);
	const [rowToDelete, setRowToDelete] = useState(null);

	const [alertOpen, setAlertOpen] = useState(false);
	const [alertConfig, setAlertConfig] = useState({
		type: "success",
		title: "",
		message: "",
		autoClose: false,
		autoCloseDelay: 2000,
	});

	const fetchList = async ({ nextPage = page } = {}) => {
		setLoading(true);
		try {
			const params = new URLSearchParams();
			if (q.trim() !== "") params.set("q", q.trim());
			if (status !== "") params.set("status", status);
			params.set("per_page", String(perPage));
			params.set("page", String(nextPage));
			const res = await fetch(`/api/employees/petugas?${params.toString()}`, {
				headers: { Accept: "application/json" },
			});
			const json = await res.json();
			if (!res.ok) {
				throw new Error(json?.message || "Gagal memuat data petugas");
			}

			const list = Array.isArray(json?.data) ? json.data : [];
			setRows(list);
			if (list.length > 0) {
				const currentNip = selectedPetugas?.nip;
				const stillExists = currentNip
					? list.some((r) => String(r?.nip ?? "") === String(currentNip))
					: false;
				if (!stillExists) {
					setSelectedPetugas(list[0]);
				}
			} else {
				setSelectedPetugas(null);
			}
			setMeta({
				current_page: Number(json?.current_page || 1),
				last_page: Number(json?.last_page || 1),
				total: Number(json?.total || 0),
				from: Number(json?.from || 0),
				to: Number(json?.to || 0),
			});
			setPage(Number(json?.current_page || nextPage || 1));
		} catch (e) {
			setAlertConfig({
				type: "error",
				title: "Gagal",
				message: e?.message || "Gagal memuat data petugas",
				autoClose: false,
			});
			setAlertOpen(true);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!didInitRef.current) {
			didInitRef.current = true;
			fetchList({ nextPage: 1 });
			return;
		}

		const t = setTimeout(() => {
			setPage(1);
			fetchList({ nextPage: 1 });
		}, 350);

		return () => clearTimeout(t);
	}, [q, status, perPage]);

	const openCreate = () => {
		setModalMode("create");
		setForm(emptyForm);
		setEmployeeSearch("");
		setEmployeeOptions([]);
		setSelectedEmployeeName("");
		setIsEmployeeDropdownOpen(false);
		setJabatanSearch("");
		setJabatanOptions([]);
		setSelectedJabatanName("");
		setIsJabatanDropdownOpen(false);
		setModalOpen(true);
	};

	const openEdit = (row) => {
		setSelectedPetugas(row);
		setModalMode("edit");
		setEmployeeSearch("");
		setEmployeeOptions([]);
		setSelectedEmployeeName("");
		setIsEmployeeDropdownOpen(false);
		setJabatanSearch("");
		setJabatanOptions([]);
		setSelectedJabatanName("");
		setIsJabatanDropdownOpen(false);
		setForm({
			...emptyForm,
			nip: String(row?.nip ?? ""),
			nama: String(row?.nama ?? ""),
			jk: String(row?.jk ?? "L") || "L",
			tmp_lahir: String(row?.tmp_lahir ?? ""),
			tgl_lahir: String(row?.tgl_lahir ?? ""),
			gol_darah: String(row?.gol_darah ?? "-") || "-",
			agama: String(row?.agama ?? ""),
			stts_nikah: String(row?.stts_nikah ?? "BELUM MENIKAH") || "BELUM MENIKAH",
			alamat: String(row?.alamat ?? ""),
			kd_jbtn: String(row?.kd_jbtn ?? ""),
			no_telp: String(row?.no_telp ?? ""),
			email: String(row?.email ?? ""),
			status: String(row?.status ?? "1") || "1",
		});
		setModalOpen(true);
	};

	const fetchEmployeeOptions = useCallback(async (term) => {
		if (employeeAbortRef.current) {
			employeeAbortRef.current.abort();
		}
		const controller = new AbortController();
		employeeAbortRef.current = controller;
		setIsEmployeeSearching(true);
		try {
			const params = new URLSearchParams();
			if (term) params.set("q", term);
			params.set("limit", "20");
			const res = await fetch(`/api/employees/lookup?${params.toString()}`, {
				headers: { Accept: "application/json" },
				signal: controller.signal,
			});
			const json = await res.json();
			if (!res.ok) {
				throw new Error(json?.message || "Gagal memuat data pegawai");
			}
			setEmployeeOptions(Array.isArray(json?.data) ? json.data : []);
		} catch (e) {
			if (e?.name !== "AbortError") {
				setEmployeeOptions([]);
			}
		} finally {
			setIsEmployeeSearching(false);
		}
	}, []);

	const fetchJabatanOptions = useCallback(async (term) => {
		if (jabatanAbortRef.current) {
			jabatanAbortRef.current.abort();
		}
		const controller = new AbortController();
		jabatanAbortRef.current = controller;
		setIsJabatanSearching(true);
		try {
			const params = new URLSearchParams();
			if (term) params.set("q", term);
			params.set("limit", "50");
			const res = await fetch(`/api/jabatan/lookup?${params.toString()}`, {
				headers: { Accept: "application/json" },
				signal: controller.signal,
			});
			const json = await res.json();
			if (!res.ok) {
				throw new Error(json?.message || "Gagal memuat data jabatan");
			}
			setJabatanOptions(Array.isArray(json?.data) ? json.data : []);
		} catch (e) {
			if (e?.name !== "AbortError") {
				setJabatanOptions([]);
			}
		} finally {
			setIsJabatanSearching(false);
		}
	}, []);

	useEffect(() => {
		if (!isEmployeeDropdownOpen) return;
		const handleClickOutside = (event) => {
			if (employeeDropdownRef.current && !employeeDropdownRef.current.contains(event.target)) {
				setIsEmployeeDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isEmployeeDropdownOpen]);

	useEffect(() => {
		if (!isJabatanDropdownOpen) return;
		const handleClickOutside = (event) => {
			if (jabatanDropdownRef.current && !jabatanDropdownRef.current.contains(event.target)) {
				setIsJabatanDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isJabatanDropdownOpen]);

	useEffect(() => {
		if (!modalOpen || modalMode !== "create") return;
		if (!isEmployeeDropdownOpen) return;

		if (employeeSearchTimeoutRef.current) {
			clearTimeout(employeeSearchTimeoutRef.current);
		}
		employeeSearchTimeoutRef.current = setTimeout(() => {
			fetchEmployeeOptions(employeeSearch.trim());
		}, 300);

		return () => {
			if (employeeSearchTimeoutRef.current) {
				clearTimeout(employeeSearchTimeoutRef.current);
			}
		};
	}, [employeeSearch, isEmployeeDropdownOpen, modalOpen, modalMode, fetchEmployeeOptions]);

	useEffect(() => {
		if (!modalOpen) return;
		if (!isJabatanDropdownOpen) return;

		if (jabatanSearchTimeoutRef.current) {
			clearTimeout(jabatanSearchTimeoutRef.current);
		}
		jabatanSearchTimeoutRef.current = setTimeout(() => {
			fetchJabatanOptions(jabatanSearch.trim());
		}, 300);

		return () => {
			if (jabatanSearchTimeoutRef.current) {
				clearTimeout(jabatanSearchTimeoutRef.current);
			}
		};
	}, [jabatanSearch, isJabatanDropdownOpen, modalOpen, fetchJabatanOptions]);

	useEffect(() => {
		if (!modalOpen || modalMode !== "create") return;
		if (!isEmployeeDropdownOpen) return;
		if (employeeOptions.length > 0) return;
		fetchEmployeeOptions(employeeSearch.trim());
	}, [isEmployeeDropdownOpen, modalOpen, modalMode, employeeOptions, employeeSearch, fetchEmployeeOptions]);

	useEffect(() => {
		if (!modalOpen) return;
		if (!isJabatanDropdownOpen) return;
		if (jabatanOptions.length > 0) return;
		fetchJabatanOptions(jabatanSearch.trim());
	}, [isJabatanDropdownOpen, modalOpen, jabatanOptions, jabatanSearch, fetchJabatanOptions]);

	useEffect(() => {
		if (!modalOpen) return;
		setEmployeeSearch("");
		setIsEmployeeDropdownOpen(false);
		setIsEmployeeSearching(false);
		setEmployeeOptions([]);
		setSelectedEmployeeName("");
		setJabatanSearch("");
		setIsJabatanDropdownOpen(false);
		setIsJabatanSearching(false);
		setJabatanOptions([]);
	}, [modalOpen]);

	useEffect(() => {
		if (!modalOpen) return;
		const v = String(form.kd_jbtn || "");
		if (v !== "" && selectedJabatanName === "") {
			setSelectedJabatanName(v);
		}
	}, [modalOpen, form.kd_jbtn, selectedJabatanName]);

	const clearEmployeeSelection = () => {
		setSelectedEmployeeName("");
		setEmployeeSearch("");
		setEmployeeOptions([]);
		setIsEmployeeDropdownOpen(false);
		setForm(emptyForm);
	};

	const clearJabatanSelection = () => {
		setSelectedJabatanName("");
		setJabatanSearch("");
		setJabatanOptions([]);
		setIsJabatanDropdownOpen(false);
		setForm((p) => ({ ...p, kd_jbtn: "" }));
	};

	const handleJabatanSelect = (kdJbtn) => {
		if (!kdJbtn) {
			clearJabatanSelection();
			return;
		}
		const selected = jabatanOptions.find((j) => String(j?.kd_jbtn ?? "") === String(kdJbtn));
		if (!selected) return;
		const label = selected?.nm_jbtn
			? `${selected.nm_jbtn} (${selected.kd_jbtn})`
			: String(selected.kd_jbtn || "");
		setSelectedJabatanName(label);
		setJabatanSearch("");
		setIsJabatanDropdownOpen(false);
		setForm((p) => ({ ...p, kd_jbtn: String(selected.kd_jbtn || "") }));
	};

	const handleEmployeeSelect = (employeeNik) => {
		if (!employeeNik) {
			clearEmployeeSelection();
			return;
		}
		const selectedEmployee = employeeOptions.find((emp) => emp.nik === employeeNik);
		if (!selectedEmployee) return;

		let formattedDate = "";
		if (selectedEmployee.tgl_lahir && selectedEmployee.tgl_lahir !== "0000-00-00") {
			formattedDate = String(selectedEmployee.tgl_lahir).slice(0, 10);
		}

		let jk = String(selectedEmployee.jk || "").trim();
		if (jk === "Pria") jk = "L";
		if (jk === "Wanita") jk = "P";
		if (jk !== "L" && jk !== "P") jk = "L";

		const stts = String(selectedEmployee.stts_aktif || "").trim().toUpperCase();
		const mappedStatus = stts === "AKTIF" || stts === "1" ? "1" : "0";

		setForm((p) => ({
			...p,
			nip: selectedEmployee.nik,
			nama: selectedEmployee.nama,
			jk,
			tmp_lahir: selectedEmployee.tmp_lahir || "",
			tgl_lahir: formattedDate,
			alamat: selectedEmployee.alamat || "",
			kd_jbtn: selectedEmployee.kd_jbtn || "",
			status: mappedStatus,
		}));

		setSelectedEmployeeName(`${selectedEmployee.nama} (${selectedEmployee.nik})`);
		setSelectedJabatanName(selectedEmployee.kd_jbtn ? String(selectedEmployee.kd_jbtn) : "");
		setEmployeeSearch("");
		setIsEmployeeDropdownOpen(false);
	};

	const handlePetugasSelect = (row) => {
		setSelectedPetugas(row);
	};

	const goToPage = (nextPage) => {
		const n = Number(nextPage);
		if (!Number.isFinite(n) || n < 1) return;
		setPage(n);
		fetchList({ nextPage: n });
	};

	const activeBadge = (row) => String(row?.status ?? "") === "1";
	const formatDate = (v) => {
		if (!v) return "-";
		const s = String(v);
		return s.length >= 10 ? s.slice(0, 10) : s;
	};

	const submitForm = async () => {
		setSubmitting(true);
		try {
			if (modalMode === "create") {
				const res = await fetch("/api/employees/petugas", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
					body: JSON.stringify(form),
				});
				const json = await res.json();
				if (!res.ok) {
					throw new Error(json?.message || "Gagal membuat petugas");
				}
				setModalOpen(false);
				setAlertConfig({
					type: "success",
					title: "Berhasil",
					message: json?.message || "Petugas berhasil dibuat",
					autoClose: true,
					autoCloseDelay: 2000,
				});
				setAlertOpen(true);
				await fetchList({ nextPage: 1 });
				setPage(1);
				return;
			}

			const nip = encodeURIComponent(String(form.nip || ""));
			const res = await fetch(`/api/employees/petugas/${nip}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(form),
			});
			const json = await res.json();
			if (!res.ok) {
				throw new Error(json?.message || "Gagal memperbarui petugas");
			}
			setModalOpen(false);
			setAlertConfig({
				type: "success",
				title: "Berhasil",
				message: json?.message || "Petugas berhasil diperbarui",
				autoClose: true,
				autoCloseDelay: 2000,
			});
			setAlertOpen(true);
			await fetchList({ nextPage: page });
		} catch (e) {
			setAlertConfig({
				type: "error",
				title: "Gagal",
				message: e?.message || "Terjadi kesalahan",
				autoClose: false,
			});
			setAlertOpen(true);
		} finally {
			setSubmitting(false);
		}
	};

	const askDelete = (row) => {
		setRowToDelete(row);
		setConfirmOpen(true);
	};

	const doDelete = async () => {
		if (!rowToDelete?.nip) return;
		try {
			const nip = encodeURIComponent(String(rowToDelete.nip));
			const res = await fetch(`/api/employees/petugas/${nip}`, {
				method: "DELETE",
				headers: { Accept: "application/json" },
			});
			const json = await res.json();
			if (!res.ok) {
				throw new Error(json?.message || "Gagal menghapus petugas");
			}
			setAlertConfig({
				type: "success",
				title: "Berhasil",
				message: json?.message || "Petugas berhasil dihapus",
				autoClose: true,
				autoCloseDelay: 2000,
			});
			setAlertOpen(true);
			await fetchList({ nextPage: 1 });
			setPage(1);
		} catch (e) {
			setAlertConfig({
				type: "error",
				title: "Gagal",
				message: e?.message || "Gagal menghapus petugas",
				autoClose: false,
			});
			setAlertOpen(true);
		} finally {
			setConfirmOpen(false);
			setRowToDelete(null);
		}
	};

	return (
		<SidebarPengaturan title="Kepegawaian">
			<Head title="Petugas" />

			<div className="space-y-6">
				<motion.div
					variants={itemVariants}
					initial={reduceMotion ? false : "hidden"}
					animate={reduceMotion ? false : "visible"}
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
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manajemen Petugas</h2>
								
							</div>
						</div>
						<div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
							<div className="relative">
								<Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
								<input
									type="text"
									placeholder="Cari petugas (NIP/nama/email)…"
									value={q}
									onChange={(e) => setQ(e.target.value)}
									className="w-[220px] md:w-[320px] pl-8 pr-3 py-2 text-sm bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all"
								/>
							</div>
							<select
								value={status}
								onChange={(e) => setStatus(e.target.value)}
								className="px-2 py-2 text-sm rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all"
							>
								<option value="">Semua Status</option>
								<option value="1">Aktif</option>
								<option value="0">Nonaktif</option>
							</select>
							<select
								value={String(perPage)}
								onChange={(e) => setPerPage(Number(e.target.value))}
								className="px-2 py-2 text-sm rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all"
							>
								{[10, 20, 50].map((n) => (
									<option key={n} value={n}>
										{n}/hal
									</option>
								))}
							</select>
							<motion.button
								whileHover={{ scale: 1.03 }}
								whileTap={{ scale: 0.97 }}
								onClick={openCreate}
								className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-blue-500/25"
							>
								<Plus className="h-5 w-5" />
								<span className="text-sm font-semibold">Tambah Petugas</span>
							</motion.button>
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
							<div className="relative px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
								<div className="flex items-center justify-between">
									<h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
										<motion.div
											className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md"
										whileHover={reduceMotion ? undefined : { rotate: 90, scale: 1.1 }}
											transition={{ duration: 0.3 }}
										>
											<Users className="w-4 h-4 text-white" />
										</motion.div>
										<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
											Daftar Petugas ({rows.length})
										</span>
									</h3>
									<div className="text-xs text-gray-600 dark:text-gray-300">
										{meta.total > 0 ? `Menampilkan ${meta.from}-${meta.to} dari ${meta.total}` : "Tidak ada data"}
									</div>
								</div>
							</div>

							<div className="flex-1 overflow-y-auto max-h-[calc(100vh-360px)]">
								<AnimatePresence mode="wait">
									{loading ? (
										<motion.div
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											className="p-6 text-sm text-gray-600 dark:text-gray-400"
										>
											Loading...
										</motion.div>
									) : rows.length === 0 ? (
										<motion.div
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											className="p-8 text-center text-gray-500"
										>
											<div className="text-6xl mb-4">👩‍💼</div>
											<p className="text-lg font-medium">Tidak ada petugas ditemukan</p>
											<p className="text-sm">Coba ubah kata kunci pencarian</p>
										</motion.div>
									) : (
										<motion.div
											variants={containerVariants}
											initial={reduceMotion ? false : "hidden"}
											animate={reduceMotion ? false : "visible"}
											className="p-4 space-y-3"
										>
											{rows.map((row) => (
												<motion.div
													key={row.nip}
													variants={cardVariants}
													whileHover={reduceMotion ? undefined : "hover"}
													onClick={() => handlePetugasSelect(row)}
													className={`relative p-4 rounded-xl cursor-pointer transition-all border ${
														selectedPetugas?.nip === row.nip
															? "border-blue-600 bg-blue-50/60"
															: "border-gray-200 dark:border-gray-700 hover:border-gray-300"
													}`}
												>
													<div className="flex justify-between items-start">
														<div className="flex-1 min-w-0">
															<h4 className="font-semibold text-gray-900 dark:text-white truncate">{row.nama || "-"}</h4>
															<div className="mt-1 flex items-center flex-wrap gap-[6px]">
																<p className="text-sm text-gray-600 dark:text-gray-300 m-0">NIP: {row.nip}</p>
																<span className="text-[11px] px-2 py-0.5 rounded-md bg-gray-50 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 border border-gray-200/40 dark:border-gray-700/40">
																	{row.jk === "P" ? "Perempuan" : "Laki-laki"}
																</span>
																<span className="text-[11px] px-2 py-0.5 rounded-md bg-indigo-50/60 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300 border border-indigo-200/40 dark:border-indigo-800/30">
																	{row.kd_jbtn || "-"}
																</span>
																{activeBadge(row) ? (
																	<span className="text-[11px] px-2 py-0.5 rounded-md bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200/40 dark:border-green-800/30">
																		Aktif
																	</span>
																) : (
																	<span className="text-[11px] px-2 py-0.5 rounded-md bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200/40 dark:border-red-800/30">
																		Non-Aktif
																	</span>
																)}
															</div>
														</div>
														<div className="flex gap-1 ml-4">
															<motion.button
														whileHover={reduceMotion ? undefined : { scale: 1.1 }}
														whileTap={reduceMotion ? undefined : { scale: 0.9 }}
																onClick={(e) => {
																	e.stopPropagation();
																	openEdit(row);
																}}
																className="p-1.5 text-gray-600 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
															>
																<Pencil className="h-4 w-4" />
															</motion.button>
															<motion.button
														whileHover={reduceMotion ? undefined : { scale: 1.1 }}
														whileTap={reduceMotion ? undefined : { scale: 0.9 }}
																onClick={(e) => {
																	e.stopPropagation();
																	askDelete(row);
																}}
																className="p-1.5 text-gray-600 dark:text-gray-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
															>
																<Trash className="h-4 w-4" />
															</motion.button>
														</div>
													</div>
												</motion.div>
											))}
										</motion.div>
									)
									}
								</AnimatePresence>
							</div>

							<div className="px-4 py-3 border-t border-gray-200/50 dark:border-gray-700/50 flex items-center justify-end gap-2">
								<button
									type="button"
									onClick={() => goToPage(Math.max(1, page - 1))}
									disabled={page <= 1 || loading}
									className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50"
								>
									Prev
								</button>
								<button
									type="button"
									onClick={() => goToPage(Math.min(meta.last_page || 1, page + 1))}
									disabled={page >= (meta.last_page || 1) || loading}
									className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50"
								>
									Next
								</button>
							</div>
						</div>
					</motion.div>

					<motion.div
						variants={itemVariants}
						className="relative bg-white/95 dark:bg-gray-900/85 rounded-2xl shadow-xl shadow-blue-500/5 overflow-hidden border border-gray-200/70 dark:border-gray-800 col-span-12 lg:col-span-7"
					>
						<div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10" />
						<div className="relative z-[1] p-6">
						<AnimatePresence mode="wait">
							{selectedPetugas ? (
								<motion.div
									key={`detail-${selectedPetugas.nip}`}
									initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.99 }}
									animate={reduceMotion ? false : { opacity: 1, y: 0, scale: 1 }}
									exit={reduceMotion ? false : { opacity: 0, y: -14, scale: 0.99 }}
									transition={reduceMotion ? undefined : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
									className="space-y-5"
								>
									<div className="flex items-start justify-between gap-4">
										<div>
											<h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedPetugas.nama || "-"}</h3>
											<div className="mt-1 text-sm text-gray-600 dark:text-gray-300">NIP: {selectedPetugas.nip}</div>
										</div>
										<div className="flex items-center gap-2">
											<motion.button
												whileHover={reduceMotion ? undefined : { scale: 1.03 }}
												whileTap={reduceMotion ? undefined : { scale: 0.97 }}
												onClick={() => openEdit(selectedPetugas)}
												className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
											>
												<Pencil className="h-4 w-4" />
												Edit
											</motion.button>
											<motion.button
												whileHover={reduceMotion ? undefined : { scale: 1.03 }}
												whileTap={reduceMotion ? undefined : { scale: 0.97 }}
												onClick={() => askDelete(selectedPetugas)}
												className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
											>
												<Trash className="h-4 w-4" />
												Hapus
											</motion.button>
										</div>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div className="rounded-xl border border-gray-200/70 dark:border-gray-700/60 bg-white/70 dark:bg-gray-900/30 p-4">
											<div className="text-xs text-gray-500 dark:text-gray-400">JK</div>
											<div className="mt-1 font-semibold text-gray-900 dark:text-white">{selectedPetugas.jk || "-"}</div>
										</div>
										<div className="rounded-xl border border-gray-200/70 dark:border-gray-700/60 bg-white/70 dark:bg-gray-900/30 p-4">
											<div className="text-xs text-gray-500 dark:text-gray-400">Jabatan</div>
											<div className="mt-1 font-semibold text-gray-900 dark:text-white">{selectedPetugas.kd_jbtn || "-"}</div>
										</div>
										<div className="rounded-xl border border-gray-200/70 dark:border-gray-700/60 bg-white/70 dark:bg-gray-900/30 p-4">
											<div className="text-xs text-gray-500 dark:text-gray-400">Tempat, Tanggal Lahir</div>
											<div className="mt-1 font-semibold text-gray-900 dark:text-white">
												{selectedPetugas.tmp_lahir || "-"}, {formatDate(selectedPetugas.tgl_lahir)}
											</div>
										</div>
										<div className="rounded-xl border border-gray-200/70 dark:border-gray-700/60 bg-white/70 dark:bg-gray-900/30 p-4">
											<div className="text-xs text-gray-500 dark:text-gray-400">Status</div>
											<div className="mt-1 font-semibold text-gray-900 dark:text-white">
												{activeBadge(selectedPetugas) ? "Aktif" : "Non-Aktif"}
											</div>
										</div>
										<div className="rounded-xl border border-gray-200/70 dark:border-gray-700/60 bg-white/70 dark:bg-gray-900/30 p-4">
											<div className="text-xs text-gray-500 dark:text-gray-400">Gol. Darah</div>
											<div className="mt-1 font-semibold text-gray-900 dark:text-white">{selectedPetugas.gol_darah || "-"}</div>
										</div>
										<div className="rounded-xl border border-gray-200/70 dark:border-gray-700/60 bg-white/70 dark:bg-gray-900/30 p-4">
											<div className="text-xs text-gray-500 dark:text-gray-400">Agama</div>
											<div className="mt-1 font-semibold text-gray-900 dark:text-white">{selectedPetugas.agama || "-"}</div>
										</div>
										<div className="rounded-xl border border-gray-200/70 dark:border-gray-700/60 bg-white/70 dark:bg-gray-900/30 p-4">
											<div className="text-xs text-gray-500 dark:text-gray-400">No. Telp</div>
											<div className="mt-1 font-semibold text-gray-900 dark:text-white">{selectedPetugas.no_telp || "-"}</div>
										</div>
										<div className="rounded-xl border border-gray-200/70 dark:border-gray-700/60 bg-white/70 dark:bg-gray-900/30 p-4">
											<div className="text-xs text-gray-500 dark:text-gray-400">Email</div>
											<div className="mt-1 font-semibold text-gray-900 dark:text-white break-all">{selectedPetugas.email || "-"}</div>
										</div>
									</div>

									<div className="rounded-2xl border border-gray-200/70 dark:border-gray-700/60 bg-white/70 dark:bg-gray-900/30 p-5">
										<div className="text-xs text-gray-500 dark:text-gray-400">Alamat</div>
										<div className="mt-2 text-gray-900 dark:text-white whitespace-pre-wrap">{selectedPetugas.alamat || "-"}</div>
									</div>
								</motion.div>
							) : (
								<motion.div
									key="detail-empty"
									initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.99 }}
									animate={reduceMotion ? false : { opacity: 1, y: 0, scale: 1 }}
									exit={reduceMotion ? false : { opacity: 0, y: -14, scale: 0.99 }}
									transition={reduceMotion ? undefined : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
									className="p-8 text-center text-gray-500"
								>
									<div className="text-6xl mb-4">🧑‍💼</div>
									<p className="text-lg font-medium">Pilih petugas untuk melihat detail</p>
									<p className="text-sm">Klik salah satu item di daftar petugas</p>
								</motion.div>
							)}
						</AnimatePresence>
						</div>
					</motion.div>
				</motion.div>
			</div>

			<Modal
				show={modalOpen}
				onClose={() => (!submitting ? setModalOpen(false) : null)}
				title={modalMode === "create" ? "Tambah Petugas" : "Edit Petugas"}
				size="lg"
			>
				<div className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{modalMode === "create" ? (
							<div className="md:col-span-2" ref={employeeDropdownRef}>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									Pilih Pegawai *
								</label>
								<div className="relative">
									<div className="relative w-full border rounded-lg transition-all border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
										<div className="flex items-center">
											<Search className="absolute left-3 h-5 w-5 text-gray-400" />
											<input
												type="text"
												value={isEmployeeDropdownOpen ? employeeSearch : selectedEmployeeName}
												onChange={(e) => {
													setEmployeeSearch(e.target.value);
													if (!isEmployeeDropdownOpen) setIsEmployeeDropdownOpen(true);
												}}
												onFocus={() => setIsEmployeeDropdownOpen(true)}
												className="w-full pl-10 pr-16 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-lg bg-transparent text-gray-900 dark:text-white"
												placeholder="Cari pegawai..."
											/>
											<div className="absolute right-2 flex items-center gap-1">
												{(selectedEmployeeName || employeeSearch) && (
													<button
														type="button"
														onClick={() => handleEmployeeSelect("")}
														className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors"
														title="Clear selection"
													>
														<X className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
													</button>
												)}
												<button
													type="button"
													onClick={() => setIsEmployeeDropdownOpen((v) => !v)}
													className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors"
												>
													<ChevronDown
														className={`h-5 w-5 text-gray-400 transition-transform ${
															isEmployeeDropdownOpen ? "rotate-180" : ""
														}`}
													/>
												</button>
											</div>
										</div>
									</div>

									<AnimatePresence>
										{isEmployeeDropdownOpen && (
											<motion.div
												initial={{ opacity: 0, y: -10 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -10 }}
												transition={{ duration: 0.2 }}
												className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto"
											>
												{isEmployeeSearching ? (
													<div className="px-4 py-3 text-gray-500 dark:text-gray-300 text-center flex items-center justify-center gap-2">
														<div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
														Mencari pegawai...
													</div>
												) : employeeOptions.length === 0 ? (
													<div className="px-4 py-3 text-gray-500 dark:text-gray-300 text-center">
														{employeeSearch ? "Tidak ada pegawai ditemukan" : "Tidak ada pegawai tersedia"}
													</div>
												) : (
													employeeOptions.map((employee) => (
														<button
															key={employee.nik}
															type="button"
															onClick={() => handleEmployeeSelect(employee.nik)}
															className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 focus:bg-gray-50 dark:focus:bg-gray-700 focus:outline-none transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
													>
														<div className="flex flex-col">
															<span className="font-medium text-gray-900 dark:text-white">{employee.nama}</span>
															<span className="text-sm text-gray-500 dark:text-gray-300">NIK: {employee.nik}</span>
														</div>
													</button>
												))
												)}
											</motion.div>
										)}
									</AnimatePresence>
								</div>
							</div>
						) : (
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">NIP</label>
								<input
									type="text"
									value={form.nip}
									disabled
									className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
								/>
							</div>
						)}
						<div className="md:col-span-2">
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Nama Petugas *
								{modalMode === "create" && (
									<span className="text-xs text-green-600 ml-2">(Dapat diedit setelah auto-fill)</span>
								)}
							</label>
							<input
								type="text"
								value={form.nama}
								onChange={(e) => setForm((p) => ({ ...p, nama: e.target.value }))}
								className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all ${
									modalMode === "create" && form.nip ? "bg-green-50" : "bg-white"
								} border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white`}
								placeholder="Masukkan nama"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">JK</label>
							<select
								value={form.jk}
								onChange={(e) => setForm((p) => ({ ...p, jk: e.target.value }))}
								className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all ${
									modalMode === "create" && form.nip ? "bg-green-50" : "bg-white"
								} dark:bg-gray-700 dark:text-white`}
							>
								<option value="L">L</option>
								<option value="P">P</option>
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
							<select
								value={form.status}
								onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all bg-white dark:bg-gray-700 dark:text-white"
							>
								<option value="1">Aktif</option>
								<option value="0">Nonaktif</option>
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tempat Lahir</label>
							<input
								type="text"
								value={form.tmp_lahir}
								onChange={(e) => setForm((p) => ({ ...p, tmp_lahir: e.target.value }))}
								className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all ${
									modalMode === "create" && form.nip ? "bg-green-50" : "bg-white"
								} dark:bg-gray-700 dark:text-white`}
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tanggal Lahir</label>
							<input
								type="date"
								value={form.tgl_lahir}
								onChange={(e) => setForm((p) => ({ ...p, tgl_lahir: e.target.value }))}
								className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all ${
									modalMode === "create" && form.nip ? "bg-green-50" : "bg-white"
								} dark:bg-gray-700 dark:text-white`}
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gol. Darah</label>
							<input
								type="text"
								value={form.gol_darah}
								onChange={(e) => setForm((p) => ({ ...p, gol_darah: e.target.value }))}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600"
								placeholder="-"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Agama</label>
							<input
								type="text"
								value={form.agama}
								onChange={(e) => setForm((p) => ({ ...p, agama: e.target.value }))}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status Nikah</label>
							<input
								type="text"
								value={form.stts_nikah}
								onChange={(e) => setForm((p) => ({ ...p, stts_nikah: e.target.value }))}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600"
							/>
						</div>
						<div ref={jabatanDropdownRef}>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Jabatan
							</label>
							<div className="relative">
								<div className="relative w-full border rounded-lg transition-all border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
									<div className="flex items-center">
										<Search className="absolute left-3 h-5 w-5 text-gray-400" />
										<input
											type="text"
											value={
												isJabatanDropdownOpen
													? jabatanSearch
													: selectedJabatanName || String(form.kd_jbtn || "")
											}
											onChange={(e) => {
												setJabatanSearch(e.target.value);
												if (!isJabatanDropdownOpen) setIsJabatanDropdownOpen(true);
											}}
											onFocus={() => setIsJabatanDropdownOpen(true)}
											className="w-full pl-10 pr-16 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-lg bg-transparent text-gray-900 dark:text-white"
											placeholder="Cari jabatan..."
										/>
										<div className="absolute right-2 flex items-center gap-1">
											{(selectedJabatanName || jabatanSearch || form.kd_jbtn) && (
												<button
													type="button"
													onClick={() => handleJabatanSelect("")}
													className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors"
													title="Clear selection"
												>
													<X className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
												</button>
											)}
											<button
												type="button"
												onClick={() => setIsJabatanDropdownOpen((v) => !v)}
												className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors"
											>
												<ChevronDown
													className={`h-5 w-5 text-gray-400 transition-transform ${
														isJabatanDropdownOpen ? "rotate-180" : ""
													}`}
												/>
											</button>
										</div>
									</div>
								</div>

								<AnimatePresence>
									{isJabatanDropdownOpen && (
										<motion.div
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -10 }}
											transition={{ duration: 0.2 }}
											className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto"
										>
											{isJabatanSearching ? (
												<div className="px-4 py-3 text-gray-500 dark:text-gray-300 text-center flex items-center justify-center gap-2">
													<div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
													Mencari jabatan...
												</div>
											) : jabatanOptions.length === 0 ? (
												<div className="px-4 py-3 text-gray-500 dark:text-gray-300 text-center">
													{jabatanSearch ? "Tidak ada jabatan ditemukan" : "Tidak ada jabatan"}
												</div>
											) : (
												jabatanOptions.map((j) => (
													<button
														key={j.kd_jbtn}
														type="button"
														onClick={() => handleJabatanSelect(j.kd_jbtn)}
														className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 focus:bg-gray-50 dark:focus:bg-gray-700 focus:outline-none transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
												>
													<div className="flex flex-col">
														<span className="font-medium text-gray-900 dark:text-white">{j.nm_jbtn || j.kd_jbtn}</span>
														<span className="text-sm text-gray-500 dark:text-gray-300">Kode: {j.kd_jbtn}</span>
													</div>
												</button>
												))
											)}
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">No. Telp</label>
							<input
								type="text"
								value={form.no_telp}
								onChange={(e) => setForm((p) => ({ ...p, no_telp: e.target.value }))}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
							<input
								type="email"
								value={form.email}
								onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600"
							/>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Alamat</label>
						<textarea
							rows={3}
							value={form.alamat}
							onChange={(e) => setForm((p) => ({ ...p, alamat: e.target.value }))}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600"
						/>
					</div>

					<div className="flex items-center justify-end gap-2 pt-2">
						<button
							type="button"
							onClick={() => setModalOpen(false)}
							disabled={submitting}
							className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700"
						>
							Batal
						</button>
						<button
							type="button"
							onClick={submitForm}
							disabled={submitting}
							className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"
						>
							{submitting ? "Menyimpan..." : "Simpan"}
						</button>
					</div>
				</div>
			</Modal>

			<Alert
				isOpen={confirmOpen}
				type="warning"
				title="Hapus Petugas"
				message={`Yakin ingin menghapus petugas ${rowToDelete?.nip || ""} — ${rowToDelete?.nama || ""}?`}
				confirmText="Hapus"
				cancelText="Batal"
				showCancel
				onConfirm={doDelete}
				onCancel={() => {
					setConfirmOpen(false);
					setRowToDelete(null);
				}}
				onClose={() => {
					setConfirmOpen(false);
					setRowToDelete(null);
				}}
			/>

			<Alert
				isOpen={alertOpen}
				type={alertConfig.type}
				title={alertConfig.title}
				message={alertConfig.message}
				autoClose={alertConfig.autoClose}
				autoCloseDelay={alertConfig.autoCloseDelay}
				onClose={() => setAlertOpen(false)}
				onConfirm={() => setAlertOpen(false)}
			/>
		</SidebarPengaturan>
	);
}
