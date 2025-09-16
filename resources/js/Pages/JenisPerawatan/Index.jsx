import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import AppLayout from "@/Layouts/AppLayout";
import ResponsiveTable from "@/Components/ResponsiveTable";
import ActionDropdown from "@/Components/ActionDropdown";
import Pagination from "@/Components/Pagination";
import ConfirmationAlert from "@/Components/ConfirmationAlert";
import Alert from "@/Components/Alert";

export default function Index({ jenisPerawatan, filters, penjabs, polikliniks, categories }) {
	// Tab configuration - Moved to top to avoid reference error
	const tabs = [
		{ id: "rawat-jalan", label: "Rawat Jalan", kategori: "RJ" },
		{ id: "rawat-inap", label: "Rawat Inap", kategori: "RI" },
		{ id: "laborat", label: "Laborat", kategori: "LAB" },
		{ id: "radiologi", label: "Radiologi", kategori: "RAD" },
		{ id: "operasi", label: "Operasi", kategori: "OP" },
		{ id: "kamar", label: "Kamar", kategori: "KMR" }
	];

	const [search, setSearch] = useState(filters.search || "");
	const [kdKategori, setKdKategori] = useState(filters.kd_kategori || "RJ");
	const [status, setStatus] = useState(filters.status || "");
	const [kdPj, setKdPj] = useState(filters.kd_pj || "");
	const [kdPoli, setKdPoli] = useState(filters.kd_poli || "");
	const [loadingTab, setLoadingTab] = useState(null); // State untuk tracking tab yang sedang loading
	const [activeTab, setActiveTab] = useState(() => {
		// Set active tab based on current category filter
		const currentCategory = filters.kd_kategori || "RJ";
		const tab = tabs.find(t => t.kategori === currentCategory);
		return tab ? tab.id : "rawat-jalan";
	});
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
	const [jenisPerawatanToDelete, setJenisPerawatanToDelete] = useState(null);
	const [showAlert, setShowAlert] = useState(false);
	const [alertConfig, setAlertConfig] = useState({
		type: "success",
		title: "",
		message: "",
		autoClose: false,
	});

	const handleTabChange = (tabId) => {
		setLoadingTab(tabId); // Set loading state untuk tab yang diklik
		setActiveTab(tabId);
		const selectedTab = tabs.find(tab => tab.id === tabId);
		setKdKategori(selectedTab?.kategori || "");
		
		// Update URL with new category filter
		router.get(
			route("tarif.index"),
			{ 
				search, 
				kd_kategori: selectedTab?.kategori || "", 
				status, 
				kd_pj: kdPj, 
				kd_poli: kdPoli 
			},
			{
				preserveState: true,
				replace: true,
				onStart: () => {
					// Loading sudah di-set di atas
				},
				onFinish: () => {
					setLoadingTab(null); // Reset loading state setelah selesai
				},
				onError: () => {
					setLoadingTab(null); // Reset loading state jika error
				}
			}
		);
	};

	const handleSearch = (e) => {
		e.preventDefault();
		router.get(
			route("tarif.index"),
			{ search, kd_kategori: kdKategori, status, kd_pj: kdPj, kd_poli: kdPoli },
			{
				preserveState: true,
				replace: true,
			}
		);
	};

	const handleDelete = (jenisPerawatan) => {
		setJenisPerawatanToDelete(jenisPerawatan);
		setShowDeleteConfirmation(true);
	};

	const confirmDelete = () => {
		if (!jenisPerawatanToDelete) return;

		router.delete(route("tarif.destroy", jenisPerawatanToDelete.kd_jenis_prw), {
			onSuccess: () => {
				setAlertConfig({
					type: "success",
					title: "Berhasil!",
					message: "Jenis perawatan berhasil dihapus.",
					autoClose: true,
					autoCloseDelay: 2000,
				});
				setShowAlert(true);
				setShowDeleteConfirmation(false);
				setJenisPerawatanToDelete(null);
			},
			onError: () => {
				setAlertConfig({
					type: "error",
					title: "Gagal Menghapus",
					message: "Terjadi kesalahan saat menghapus jenis perawatan.",
					autoClose: false,
				});
				setShowAlert(true);
				setShowDeleteConfirmation(false);
				setJenisPerawatanToDelete(null);
			},
		});
	};

	const cancelDelete = () => {
		setShowDeleteConfirmation(false);
		setJenisPerawatanToDelete(null);
	};

	const handleToggleStatus = (jenisPerawatan) => {
		router.post(
			route("tarif.toggle-status", jenisPerawatan.kd_jenis_prw),
			{},
			{
				onSuccess: () => {
					setAlertConfig({
						type: "success",
						title: "Berhasil!",
						message: "Status jenis perawatan berhasil diubah.",
						autoClose: true,
						autoCloseDelay: 2000,
					});
					setShowAlert(true);
				},
				onError: () => {
					setAlertConfig({
						type: "error",
						title: "Gagal",
						message: "Terjadi kesalahan saat mengubah status jenis perawatan.",
						autoClose: false,
					});
					setShowAlert(true);
				},
			}
		);
	};

	const getStatusBadge = (status) => {
		if (status === "1") {
			return (
				<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
					Aktif
				</span>
			);
		}
		return (
			<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
				Nonaktif
			</span>
		);
	};

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
			minimumFractionDigits: 0,
		}).format(amount || 0);
	};

	// Simplified columns with clean design like GitHub interface
	const columns = [
		{
			key: "kd_jenis_prw",
			header: "Kode",
			render: (item) => (
				<span className="font-mono text-sm text-gray-900 dark:text-white">
					{item.kd_jenis_prw}
				</span>
			),
		},
		{
			key: "nm_perawatan",
			header: "Nama Perawatan",
			render: (item) => (
				<div>
					<div className="text-sm font-medium text-gray-900 dark:text-white">
						{item.nm_perawatan}
					</div>
					<div className="text-xs text-gray-500 dark:text-gray-400">
						{item.kd_kategori}
					</div>
				</div>
			),
		},
		{
			key: "tarif_tindakandr",
			header: "Tarif Dokter",
			render: (item) => (
				<span className="text-sm text-gray-900 dark:text-white">
					{formatCurrency(item.tarif_tindakandr)}
				</span>
			),
		},
		{
			key: "tarif_tindakanpr",
			header: "Tarif Perawat",
			render: (item) => (
				<span className="text-sm text-gray-900 dark:text-white">
					{formatCurrency(item.tarif_tindakanpr)}
				</span>
			),
		},
		{
			key: "total_byrdrpr",
			header: "Total Biaya",
			render: (item) => (
				<span className="text-sm font-semibold text-gray-900 dark:text-white">
					{formatCurrency(item.total_byrdrpr)}
				</span>
			),
		},
		{
			key: "status",
			header: "Status",
			render: (item) => (
				<span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
					item.status === "1" 
						? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
						: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
				}`}>
					{item.status === "1" ? "Aktif" : "Nonaktif"}
				</span>
			),
		},
		{
			key: "actions",
			header: "",
			render: (item) => (
				<ActionDropdown>
					<Link
						href={route("tarif.show", item.kd_jenis_prw)}
						className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
					>
						Lihat Detail
					</Link>
					<Link
						href={route("tarif.edit", item.kd_jenis_prw)}
						className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
					>
						Edit
					</Link>
					<button
						onClick={() => handleToggleStatus(item)}
						className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
					>
						{item.status === "1" ? "Nonaktifkan" : "Aktifkan"}
					</button>
					<button
						onClick={() => handleDelete(item)}
						className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-600"
					>
						Hapus
					</button>
				</ActionDropdown>
			),
		},
	];

	return (
		<AppLayout
			title="Manajemen Tarif"
			header={
				<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
					Manajemen Tarif
				</h2>
			}
		>
			<Head title="Manajemen Tarif" />

			{showAlert && (
				<Alert
					{...alertConfig}
					onClose={() => setShowAlert(false)}
				/>
			)}

			{showDeleteConfirmation && (
				<ConfirmationAlert
					title="Konfirmasi Hapus"
					message={`Apakah Anda yakin ingin menghapus jenis perawatan "${jenisPerawatanToDelete?.nm_perawatan}"?`}
					onConfirm={confirmDelete}
					onCancel={cancelDelete}
					type="danger"
				/>
			)}

			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
						<div className="p-6 text-gray-900 dark:text-gray-100">
							{/* Header */}
							<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
								<div>
									<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
										Manajemen Tarif Layanan Medis
									</h2>
									<p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
										Kelola tarif layanan medis dan jenis perawatan berdasarkan kategori
									</p>
								</div>
								<div className="mt-4 sm:mt-0">
									<Link
										href={route("tarif.create")}
										className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
									>
										➕ Tambah Tarif Baru
									</Link>
								</div>
							</div>

							{/* Tabs */}
							<div className="mb-6">
								<div className="border-b border-gray-200 dark:border-gray-700">
									<nav className="-mb-px flex space-x-8" aria-label="Tabs">
										{tabs.map((tab) => (
											<button
												key={tab.id}
												onClick={() => handleTabChange(tab.id)}
												disabled={loadingTab === tab.id}
												className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center gap-2 ${
													activeTab === tab.id
														? "border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 rounded-t-lg"
														: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
												} ${loadingTab === tab.id ? 'opacity-75 cursor-not-allowed' : ''}`}
											>
												{loadingTab === tab.id && (
													<svg 
														className="animate-spin h-4 w-4 text-current" 
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
												{tab.label}
											</button>
										))}
									</nav>
								</div>
							</div>

							{/* Filter Form */}
							<form onSubmit={handleSearch} className="mb-6">
								<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
									<div className="grid grid-cols-1 md:grid-cols-5 gap-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
												🔍 Pencarian
											</label>
											<input
												type="text"
												value={search}
												onChange={(e) => setSearch(e.target.value)}
												placeholder="Cari kode atau nama perawatan..."
												className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
												🏥 Penjamin
											</label>
											<select
												value={kdPj}
												onChange={(e) => setKdPj(e.target.value)}
												className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
											>
												<option value="">Semua Penjamin</option>
												{penjabs?.map((penjab) => (
													<option key={penjab.kd_pj} value={penjab.kd_pj}>
														{penjab.png_jawab}
													</option>
												))}
											</select>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
												🏢 Poliklinik
											</label>
											<select
												value={kdPoli}
												onChange={(e) => setKdPoli(e.target.value)}
												className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
											>
												<option value="">Semua Poliklinik</option>
												{polikliniks?.map((poli) => (
													<option key={poli.kd_poli} value={poli.kd_poli}>
														{poli.nm_poli}
													</option>
												))}
											</select>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
												📊 Status
											</label>
											<select
												value={status}
												onChange={(e) => setStatus(e.target.value)}
												className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
											>
												<option value="">Semua Status</option>
												<option value="1">✅ Aktif</option>
												<option value="0">❌ Nonaktif</option>
											</select>
										</div>
										<div className="flex items-end">
											<button
												type="submit"
												className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200"
											>
												🔍 Filter Data
											</button>
										</div>
									</div>
								</div>
							</form>

							{/* Table */}
							<div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
								<ResponsiveTable
									columns={columns}
									data={jenisPerawatan.data}
									emptyMessage="Tidak ada data tarif yang ditemukan untuk kategori ini."
								/>
							</div>

							{/* Pagination */}
							<div className="mt-6">
								<Pagination links={jenisPerawatan.links} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</AppLayout>
	);
}