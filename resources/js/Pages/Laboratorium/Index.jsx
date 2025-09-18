import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import AppLayout from "@/Layouts/AppLayout";
import ResponsiveTable from "@/Components/ResponsiveTable";
import ActionDropdown from "@/Components/ActionDropdown";
import Pagination from "@/Components/Pagination";
import Alert from "@/Components/Alert";
import {
	MagnifyingGlassIcon,
	PlusIcon,
	EyeIcon,
	PencilIcon,
	TrashIcon,
} from "@heroicons/react/24/outline";

export default function Index({ periksaLab, statusOptions, filters }) {
	const [search, setSearch] = useState(filters.search || "");
	const [status, setStatus] = useState(filters.status || "");
	const [startDate, setStartDate] = useState(filters.start_date || "");
	const [endDate, setEndDate] = useState(filters.end_date || "");
	const [showAlert, setShowAlert] = useState(false);
	const [alertConfig, setAlertConfig] = useState({
		type: "success",
		title: "",
		message: "",
		autoClose: false,
	});

	const handleSearch = () => {
		router.get(
			route("laboratorium.index"),
			{
				search,
				status,
				start_date: startDate,
				end_date: endDate,
			},
			{
				preserveState: true,
				replace: true,
			}
		);
	};

	const handleReset = () => {
		setSearch("");
		setStatus("");
		setStartDate("");
		setEndDate("");
		router.get(route("laboratorium.index"), {}, { replace: true });
	};

	const handleDelete = (noRawat) => {
		if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
			router.delete(route("laboratorium.destroy", noRawat), {
				onSuccess: () => {
					setAlertConfig({
						type: "success",
						title: "Berhasil",
						message: "Data pemeriksaan laboratorium berhasil dihapus.",
						autoClose: true,
					});
					setShowAlert(true);
				},
				onError: () => {
					setAlertConfig({
						type: "error",
						title: "Gagal",
						message: "Terjadi kesalahan saat menghapus data.",
						autoClose: true,
					});
					setShowAlert(true);
				},
			});
		}
	};

	const getStatusBadge = (status) => {
		const statusClasses = {
			Menunggu: "bg-yellow-100 text-yellow-800",
			Proses: "bg-blue-100 text-blue-800",
			Selesai: "bg-green-100 text-green-800",
		};

		return (
			<span
				className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
					statusClasses[status] || "bg-gray-100 text-gray-800"
				}`}
			>
				{status}
			</span>
		);
	};

	const columns = [
		{
			key: "no_rawat",
			label: "No. Rawat",
			render: (item) => (
				<div className="font-medium text-gray-900 dark:text-white">
					{item.no_rawat}
				</div>
			),
		},
		{
			key: "patient",
			label: "Pasien",
			render: (item) => (
				<div>
					<div className="font-medium text-gray-900 dark:text-white">
						{item.reg_periksa?.patient?.nm_pasien || "-"}
					</div>
					<div className="text-sm text-gray-500 dark:text-gray-400">
						{item.reg_periksa?.patient?.no_rkm_medis || "-"}
					</div>
				</div>
			),
		},
		{
			key: "jenis_perawatan",
			label: "Jenis Pemeriksaan",
			render: (item) => (
				<div className="text-sm text-gray-900 dark:text-white">
					{item.jenis_perawatan?.nm_perawatan || "-"}
				</div>
			),
		},
		{
			key: "tgl_periksa",
			label: "Tanggal Periksa",
			render: (item) => (
				<div className="text-sm text-gray-900 dark:text-white">
					{new Date(item.tgl_periksa).toLocaleDateString("id-ID")}
				</div>
			),
		},
		{
			key: "status",
			label: "Status",
			render: (item) => getStatusBadge(item.status),
		},
		{
			key: "petugas",
			label: "Petugas",
			render: (item) => (
				<div className="text-sm text-gray-900 dark:text-white">
					{item.petugas?.nama || "-"}
				</div>
			),
		},
		{
			key: "actions",
			label: "Aksi",
			render: (item) => (
				<ActionDropdown>
					<Link
						href={route("laboratorium.show", item.no_rawat)}
						className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
					>
						<EyeIcon className="w-4 h-4 mr-2" />
						Lihat
					</Link>
					<Link
						href={route("laboratorium.edit", item.no_rawat)}
						className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
					>
						<PencilIcon className="w-4 h-4 mr-2" />
						Edit
					</Link>
					<button
						onClick={() => handleDelete(item.no_rawat)}
						className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-600"
					>
						<TrashIcon className="w-4 h-4 mr-2" />
						Hapus
					</button>
				</ActionDropdown>
			),
		},
	];

	return (
		<AppLayout>
			<Head title="Laboratorium" />

			{showAlert && (
				<Alert
					type={alertConfig.type}
					title={alertConfig.title}
					message={alertConfig.message}
					autoClose={alertConfig.autoClose}
					onClose={() => setShowAlert(false)}
				/>
			)}

			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
						{/* Header */}
						<div className="p-6 border-b border-gray-200 dark:border-gray-700">
							<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
								<div>
									<h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
										Laboratorium
									</h1>
									<p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
										Kelola data pemeriksaan laboratorium
									</p>
								</div>
								<div className="mt-4 sm:mt-0">
									<Link
										href={route("laboratorium.create")}
										className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150"
									>
										<PlusIcon className="w-4 h-4 mr-2" />
										Tambah Pemeriksaan
									</Link>
								</div>
							</div>
						</div>

						{/* Filter */}
						<div className="p-6 border-b border-gray-200 dark:border-gray-700">
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
										Pencarian
									</label>
									<div className="relative">
										<input
											type="text"
											value={search}
											onChange={(e) => setSearch(e.target.value)}
											placeholder="Cari pasien, no rawat..."
											className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
										/>
										<MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
										Status
									</label>
									<select
										value={status}
										onChange={(e) => setStatus(e.target.value)}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
									>
										<option value="">Semua Status</option>
										{Object.entries(statusOptions).map(([key, value]) => (
											<option key={key} value={key}>
												{value}
											</option>
										))}
									</select>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
										Tanggal Mulai
									</label>
									<input
										type="date"
										value={startDate}
										onChange={(e) => setStartDate(e.target.value)}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
										Tanggal Akhir
									</label>
									<input
										type="date"
										value={endDate}
										onChange={(e) => setEndDate(e.target.value)}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
									/>
								</div>

								<div className="flex items-end space-x-2">
									<button
										onClick={handleSearch}
										className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
									>
										Cari
									</button>
									<button
										onClick={handleReset}
										className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
									>
										Reset
									</button>
								</div>
							</div>
						</div>

						{/* Table */}
						<ResponsiveTable
							data={periksaLab.data}
							columns={columns}
							emptyMessage="Tidak ada data pemeriksaan laboratorium"
						/>

						{/* Pagination */}
						<Pagination
							links={periksaLab.links}
							from={periksaLab.from}
							to={periksaLab.to}
							total={periksaLab.total}
						/>
					</div>
				</div>
			</div>
		</AppLayout>
	);
}