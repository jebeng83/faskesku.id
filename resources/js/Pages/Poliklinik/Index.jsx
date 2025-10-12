import React, { useMemo, useState } from "react";
import { Head, usePage, router } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { motion, AnimatePresence } from "framer-motion";

export default function PoliklinikIndex() {
	const { polikliniks, filters, errors } = usePage().props;
	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [search, setSearch] = useState(filters?.search || "");
	const [editing, setEditing] = useState(null);

	const tableItems = useMemo(() => polikliniks?.data || [], [polikliniks]);

	const openCreate = () => setIsCreateOpen(true);
	const closeCreate = () => setIsCreateOpen(false);
	const openEdit = (item) => {
		setEditing(item);
		setIsEditOpen(true);
	};
	const closeEdit = () => {
		setEditing(null);
		setIsEditOpen(false);
	};

	const handleSearch = (e) => {
		e.preventDefault();
		router.get(
			route("poliklinik.index"),
			{ search },
			{ preserveScroll: true, preserveState: true, replace: true }
		);
	};

	const toggleStatus = (item) => {
		const newStatus = item.status === "1" ? "0" : "1";
		router.patch(
			route("poliklinik.toggle-status", item.kd_poli),
			{
				status: newStatus,
			},
			{
				onSuccess: () => {
					// Refresh the page to show updated status
					router.reload();
				},
			}
		);
	};

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
			minimumFractionDigits: 0,
		}).format(amount);
	};

	return (
		<AppLayout title="Manajemen Poliklinik">
			<Head title="Manajemen Poliklinik" />

			<div className="space-y-4">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-xl font-semibold text-gray-900 dark:text-white">
							Poliklinik
						</h1>
						<p className="text-sm text-gray-500">
							Kelola data poliklinik dan tarif registrasi
						</p>
					</div>
					<div className="flex items-center gap-2">
						<form
							onSubmit={handleSearch}
							className="hidden sm:flex items-center"
						>
							<input
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="px-3 py-2 w-64 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-gray-400 focus:border-transparent"
								placeholder="Cari kode/nama poliklinik"
							/>
							<button
								type="submit"
								className="ml-2 px-3 py-2 text-sm rounded-md bg-black text-white hover:bg-gray-800"
							>
								Cari
							</button>
						</form>
						<button
							onClick={openCreate}
							className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
						>
							Tambah
						</button>
					</div>
				</div>

				{/* Table */}
				<div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
					<div className="overflow-x-auto">
						<table className="min-w-full text-sm">
							<thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300">
								<tr>
									<th className="text-left px-4 py-3">Kode</th>
									<th className="text-left px-4 py-3">Nama Poliklinik</th>
									<th className="text-left px-4 py-3">Tarif Registrasi</th>
									<th className="text-left px-4 py-3">Tarif Reg. Lama</th>
									<th className="text-left px-4 py-3">Status</th>
									<th className="text-right px-4 py-3">Aksi</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-800 dark:text-gray-200">
								{tableItems.map((item) => (
									<tr
										key={item.kd_poli}
										className="hover:bg-gray-50 dark:hover:bg-gray-800"
									>
										<td className="px-4 py-3 font-medium">{item.kd_poli}</td>
										<td className="px-4 py-3">{item.nm_poli}</td>
										<td className="px-4 py-3">
											{formatCurrency(item.registrasi)}
										</td>
										<td className="px-4 py-3">
											{formatCurrency(item.registrasilama)}
										</td>
										<td className="px-4 py-3">
											<span
												className={`px-2 py-1 rounded text-xs ${
													item.status === "1"
														? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
														: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
												}`}
											>
												{item.status === "1" ? "Aktif" : "Nonaktif"}
											</span>
										</td>
										<td className="px-4 py-3 text-right">
											<div className="flex items-center gap-2 justify-end">
												<button
													onClick={() => toggleStatus(item)}
													className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
														item.status === "1"
															? "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/30"
															: "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-300 dark:hover:bg-green-900/30"
													}`}
												>
													{item.status === "1" ? "Nonaktifkan" : "Aktifkan"}
												</button>
												<button
													onClick={() => openEdit(item)}
													className="px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
												>
													Edit
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{/* Pagination */}
					{polikliniks?.links && (
						<div className="flex justify-between items-center px-4 py-3 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-300">
							<div>
								Menampilkan {polikliniks.from || 0} - {polikliniks.to || 0} dari{" "}
								{polikliniks.total || 0}
							</div>
							<div className="flex gap-1">
								{polikliniks.links.map((link, idx) => {
									if (idx === 0 || idx === polikliniks.links.length - 1)
										return null;
									const isActive = link.active;
									return (
										<button
											key={idx}
											onClick={() =>
												router.get(
													link.url,
													{},
													{ preserveState: true, preserveScroll: true }
												)
											}
											className={`px-3 py-1.5 rounded-md ${
												isActive
													? "bg-black text-white"
													: "border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
											}`}
										>
											{link.label}
										</button>
									);
								})}
							</div>
						</div>
					)}
				</div>

				<CreateModal isOpen={isCreateOpen} onClose={closeCreate} />
				<EditModal isOpen={isEditOpen} onClose={closeEdit} item={editing} />
			</div>
		</AppLayout>
	);
}

function CreateModal({ isOpen, onClose }) {
	const { errors } = usePage().props;
	const [form, setForm] = useState({
		kd_poli: "",
		nm_poli: "",
		registrasi: "",
		registrasilama: "",
	});
	const [submitting, setSubmitting] = useState(false);
	const [formErrors, setFormErrors] = useState({});

	const handleClose = () => {
		setForm({
			kd_poli: "",
			nm_poli: "",
			registrasi: "",
			registrasilama: "",
		});
		setFormErrors({});
		onClose();
	};

	const submit = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		setFormErrors({});

		router.post(route("poliklinik.store"), form, {
			onSuccess: () => {
				handleClose();
			},
			onError: (errors) => {
				setFormErrors(errors);
			},
			onFinish: () => setSubmitting(false),
		});
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<motion.div
						className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl w-full max-w-lg"
						initial={{ y: 40, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 40, opacity: 0 }}
						transition={{ type: "spring", stiffness: 200, damping: 20 }}
					>
						<div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
							<h3 className="font-semibold text-gray-900 dark:text-white">
								Tambah Poliklinik
							</h3>
							<button
								onClick={handleClose}
								className="text-gray-500 hover:text-gray-700"
							>
								✕
							</button>
						</div>
						<form onSubmit={submit} className="p-5 space-y-4">
							<div className="space-y-4">
								<Input
									label="Kode Poliklinik"
									required
									value={form.kd_poli}
									onChange={(e) =>
										setForm({ ...form, kd_poli: e.target.value })
									}
									error={formErrors.kd_poli}
									placeholder="Contoh: U001"
									maxLength={5}
								/>
								<Input
									label="Nama Poliklinik"
									required
									value={form.nm_poli}
									onChange={(e) =>
										setForm({ ...form, nm_poli: e.target.value })
									}
									error={formErrors.nm_poli}
									placeholder="Contoh: Poli Umum"
								/>
								<Input
									label="Tarif Registrasi"
									required
									type="number"
									value={form.registrasi}
									onChange={(e) =>
										setForm({ ...form, registrasi: e.target.value })
									}
									error={formErrors.registrasi}
									placeholder="0"
									min="0"
									step="1000"
								/>
								<Input
									label="Tarif Registrasi Lama"
									required
									type="number"
									value={form.registrasilama}
									onChange={(e) =>
										setForm({ ...form, registrasilama: e.target.value })
									}
									error={formErrors.registrasilama}
									placeholder="0"
									min="0"
									step="1000"
								/>
							</div>
							<div className="flex justify-end gap-2 pt-2">
								<button
									type="button"
									onClick={handleClose}
									className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700"
								>
									Batal
								</button>
								<button
									disabled={submitting}
									className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800 disabled:opacity-50"
								>
									{submitting ? "Menyimpan..." : "Simpan"}
								</button>
							</div>
						</form>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

function EditModal({ isOpen, onClose, item }) {
	const { errors } = usePage().props;
	const [form, setForm] = useState(() => ({
		nm_poli: item?.nm_poli || "",
		registrasi: item?.registrasi || "",
		registrasilama: item?.registrasilama || "",
	}));
	const [submitting, setSubmitting] = useState(false);
	const [formErrors, setFormErrors] = useState({});

	React.useEffect(() => {
		setForm({
			nm_poli: item?.nm_poli || "",
			registrasi: item?.registrasi || "",
			registrasilama: item?.registrasilama || "",
		});
	}, [item]);

	const handleClose = () => {
		setForm({
			nm_poli: "",
			registrasi: "",
			registrasilama: "",
		});
		setFormErrors({});
		onClose();
	};

	const submit = async (e) => {
		e.preventDefault();
		if (!item) return;
		setSubmitting(true);
		setFormErrors({});

		router.put(route("poliklinik.update", item.kd_poli), form, {
			onSuccess: () => {
				handleClose();
			},
			onError: (errors) => {
				setFormErrors(errors);
			},
			onFinish: () => setSubmitting(false),
		});
	};

	return (
		<AnimatePresence>
			{isOpen && item && (
				<motion.div
					className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<motion.div
						className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl w-full max-w-lg"
						initial={{ y: 40, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 40, opacity: 0 }}
						transition={{ type: "spring", stiffness: 200, damping: 20 }}
					>
						<div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
							<h3 className="font-semibold text-gray-900 dark:text-white">
								Edit Poliklinik
							</h3>
							<button
								onClick={handleClose}
								className="text-gray-500 hover:text-gray-700"
							>
								✕
							</button>
						</div>
						<form onSubmit={submit} className="p-5 space-y-4">
							<div className="space-y-4">
								<div className="space-y-1">
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
										Kode Poliklinik
									</label>
									<input
										disabled
										value={item.kd_poli}
										className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
									/>
								</div>
								<Input
									label="Nama Poliklinik"
									required
									value={form.nm_poli}
									onChange={(e) =>
										setForm({ ...form, nm_poli: e.target.value })
									}
									error={formErrors.nm_poli}
								/>
								<Input
									label="Tarif Registrasi"
									required
									type="number"
									value={form.registrasi}
									onChange={(e) =>
										setForm({ ...form, registrasi: e.target.value })
									}
									error={formErrors.registrasi}
									min="0"
									step="1000"
								/>
								<Input
									label="Tarif Registrasi Lama"
									required
									type="number"
									value={form.registrasilama}
									onChange={(e) =>
										setForm({ ...form, registrasilama: e.target.value })
									}
									error={formErrors.registrasilama}
									min="0"
									step="1000"
								/>
							</div>
							<div className="flex justify-end gap-2 pt-2">
								<button
									type="button"
									onClick={handleClose}
									className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700"
								>
									Batal
								</button>
								<button
									disabled={submitting}
									className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800 disabled:opacity-50"
								>
									{submitting ? "Menyimpan..." : "Simpan Perubahan"}
								</button>
							</div>
						</form>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

function Input({
	label,
	required,
	value,
	onChange,
	error,
	type = "text",
	placeholder,
	maxLength,
	min,
	step,
}) {
	return (
		<div className="space-y-1">
			<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
				{label} {required && <span className="text-red-500">*</span>}
			</label>
			<input
				type={type}
				value={value}
				onChange={onChange}
				required={required}
				placeholder={placeholder}
				maxLength={maxLength}
				min={min}
				step={step}
				className={`w-full px-3 py-2 text-sm rounded-md border ${
					error
						? "border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500"
						: "border-gray-300 dark:border-gray-700 focus:ring-gray-400 focus:border-transparent"
				} bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2`}
			/>
			{error && (
				<p className="text-sm text-red-600 dark:text-red-400">{error}</p>
			)}
		</div>
	);
}
