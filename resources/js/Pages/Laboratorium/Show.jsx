import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import AppLayout from "@/Layouts/AppLayout";
import Alert from "@/Components/Alert";
import {
	ArrowLeftIcon,
	PencilIcon,
	PrinterIcon,
	ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

export default function Show({ periksaLab }) {
	const [showAlert, setShowAlert] = useState(false);
	const [alertConfig, setAlertConfig] = useState({
		type: "success",
		title: "",
		message: "",
		autoClose: false,
	});

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

	const handlePrint = () => {
		// Implementasi print hasil laboratorium
		window.print();
	};

	const handleUpdateHasil = () => {
		router.get(route("laboratorium.update-hasil", periksaLab.no_rawat));
	};

	return (
		<AppLayout>
			<Head title={`Detail Pemeriksaan - ${periksaLab.no_rawat}`} />

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
				<div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
					<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
						{/* Header */}
						<div className="p-6 border-b border-gray-200 dark:border-gray-700">
							<div className="flex items-center justify-between">
								<div>
									<h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
										Detail Pemeriksaan Laboratorium
									</h1>
									<p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
										No. Rawat: {periksaLab.no_rawat}
									</p>
								</div>
								<div className="flex space-x-3">
									<Link
										href={route("laboratorium.index")}
										className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
									>
										<ArrowLeftIcon className="w-4 h-4 mr-2" />
										Kembali
									</Link>
									<Link
										href={route("laboratorium.edit", periksaLab.no_rawat)}
										className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150"
									>
										<PencilIcon className="w-4 h-4 mr-2" />
										Edit
									</Link>
									{periksaLab.status === "Selesai" && (
										<button
											onClick={handlePrint}
											className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 active:bg-green-900 focus:outline-none focus:border-green-900 focus:ring ring-green-300 disabled:opacity-25 transition ease-in-out duration-150"
										>
											<PrinterIcon className="w-4 h-4 mr-2" />
											Cetak
										</button>
									)}
									{periksaLab.status !== "Selesai" && (
										<button
											onClick={handleUpdateHasil}
											className="inline-flex items-center px-4 py-2 bg-purple-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-purple-700 active:bg-purple-900 focus:outline-none focus:border-purple-900 focus:ring ring-purple-300 disabled:opacity-25 transition ease-in-out duration-150"
										>
											<ClipboardDocumentListIcon className="w-4 h-4 mr-2" />
											Input Hasil
										</button>
									)}
								</div>
							</div>
						</div>

						{/* Patient Information */}
						<div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
							<h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
								Informasi Pasien
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
										Nama Pasien
									</label>
									<p className="mt-1 text-sm text-gray-900 dark:text-white font-medium">
										{periksaLab.reg_periksa?.patient?.nm_pasien || "-"}
									</p>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
										No. RM
									</label>
									<p className="mt-1 text-sm text-gray-900 dark:text-white font-medium">
										{periksaLab.reg_periksa?.patient?.no_rkm_medis || "-"}
									</p>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
										Jenis Kelamin
									</label>
									<p className="mt-1 text-sm text-gray-900 dark:text-white font-medium">
										{periksaLab.reg_periksa?.patient?.jk === "L" ? "Laki-laki" : "Perempuan"}
									</p>
								</div>
							</div>
						</div>

						{/* Examination Information */}
						<div className="p-6 border-b border-gray-200 dark:border-gray-700">
							<h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
								Informasi Pemeriksaan
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
										Jenis Pemeriksaan
									</label>
									<p className="mt-1 text-sm text-gray-900 dark:text-white font-medium">
										{periksaLab.jenis_perawatan?.nm_perawatan || "-"}
									</p>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
										Tanggal Periksa
									</label>
									<p className="mt-1 text-sm text-gray-900 dark:text-white font-medium">
										{new Date(periksaLab.tgl_periksa).toLocaleDateString("id-ID", {
											weekday: "long",
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</p>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
										Jam
									</label>
									<p className="mt-1 text-sm text-gray-900 dark:text-white font-medium">
										{periksaLab.jam || "-"}
									</p>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
										Dokter Perujuk
									</label>
									<p className="mt-1 text-sm text-gray-900 dark:text-white font-medium">
										{periksaLab.dokter_perujuk || "-"}
									</p>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
										Petugas
									</label>
									<p className="mt-1 text-sm text-gray-900 dark:text-white font-medium">
										{periksaLab.petugas?.nama || "-"}
									</p>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
										Status
									</label>
									<div className="mt-1">{getStatusBadge(periksaLab.status)}</div>
								</div>
							</div>
							{periksaLab.keterangan && (
								<div className="mt-6">
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
										Keterangan
									</label>
									<p className="mt-1 text-sm text-gray-900 dark:text-white">
										{periksaLab.keterangan}
									</p>
								</div>
							)}
						</div>

						{/* Examination Results */}
						{periksaLab.detail_pemeriksaan &&
							periksaLab.detail_pemeriksaan.length > 0 && (
								<div className="p-6">
									<h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
										Hasil Pemeriksaan
									</h2>
									<div className="overflow-x-auto">
										<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
											<thead className="bg-gray-50 dark:bg-gray-700">
												<tr>
													<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
														Item Pemeriksaan
													</th>
													<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
														Hasil
													</th>
													<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
														Nilai Rujukan
													</th>
													<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
														Satuan
													</th>
													<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
														Keterangan
													</th>
												</tr>
											</thead>
											<tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
												{periksaLab.detail_pemeriksaan.map((detail, index) => (
													<tr key={index}>
														<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
															{detail.item_pemeriksaan}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
															{detail.nilai || "-"}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
															{detail.nilai_rujukan || "-"}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
															{detail.satuan || "-"}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
															{detail.keterangan || "-"}
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							)}

						{/* No Results Message */}
						{(!periksaLab.detail_pemeriksaan ||
							periksaLab.detail_pemeriksaan.length === 0) && (
							<div className="p-6 text-center">
								<div className="text-gray-500 dark:text-gray-400">
									<ClipboardDocumentListIcon className="mx-auto h-12 w-12 mb-4" />
									<h3 className="text-lg font-medium mb-2">
										Belum Ada Hasil Pemeriksaan
									</h3>
									<p className="text-sm">
										Hasil pemeriksaan laboratorium belum tersedia.
									</p>
									{periksaLab.status !== "Selesai" && (
										<button
											onClick={handleUpdateHasil}
											className="mt-4 inline-flex items-center px-4 py-2 bg-purple-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-purple-700 active:bg-purple-900 focus:outline-none focus:border-purple-900 focus:ring ring-purple-300 disabled:opacity-25 transition ease-in-out duration-150"
										>
											<ClipboardDocumentListIcon className="w-4 h-4 mr-2" />
											Input Hasil Pemeriksaan
										</button>
									)}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</AppLayout>
	);
}