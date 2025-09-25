import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
import AppLayout from "@/Layouts/AppLayout";
import Button from "@/Components/Button";
import SearchableSelect from "@/Components/SearchableSelect";
import Alert from "@/Components/Alert";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function Edit({ periksaLab, jenisPerawatan, petugas }) {
	const { data, setData, put, processing, errors } = useForm({
		no_rawat: periksaLab.no_rawat || "",
		kd_jenis_prw: periksaLab.kd_jenis_prw || "",
		tgl_periksa: periksaLab.tgl_periksa
			? new Date(periksaLab.tgl_periksa).toISOString().split("T")[0]
			: "",
		jam: periksaLab.jam || "",
		dokter_perujuk: periksaLab.dokter_perujuk || "",
		petugas: periksaLab.petugas || "",
		status: periksaLab.status || "Menunggu",
		keterangan: periksaLab.keterangan || "",
	});

	const [showAlert, setShowAlert] = useState(false);
	const [alertConfig, setAlertConfig] = useState({
		type: "success",
		title: "",
		message: "",
		autoClose: false,
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		put(route("laboratorium.update", periksaLab.no_rawat), {
			onSuccess: () => {
				setAlertConfig({
					type: "success",
					title: "Berhasil",
					message: "Pemeriksaan laboratorium berhasil diperbarui.",
					autoClose: true,
				});
				setShowAlert(true);
			},
			onError: () => {
				setAlertConfig({
					type: "error",
					title: "Gagal",
					message: "Terjadi kesalahan saat memperbarui data.",
					autoClose: true,
				});
				setShowAlert(true);
			},
		});
	};

	// Format data untuk SearchableSelect
	const jenisPerawatanOptions = jenisPerawatan.map((item) => ({
		value: item.kd_jenis_prw,
		label: `${item.kd_jenis_prw} - ${item.nm_perawatan}`,
		search: `${item.kd_jenis_prw} ${item.nm_perawatan}`,
	}));

	const petugasOptions = petugas.map((item) => ({
		value: item.nik,
		label: `${item.nama} - ${item.jbtn}`,
		search: `${item.nama} ${item.jbtn}`,
	}));

	return (
		<AppLayout>
			<Head title="Edit Pemeriksaan Laboratorium" />

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
				<div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
					<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
						{/* Header */}
						<div className="p-6 border-b border-gray-200 dark:border-gray-700">
							<div className="flex items-center justify-between">
								<div>
									<h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
										Edit Pemeriksaan Laboratorium
									</h1>
									<p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
										Edit data pemeriksaan laboratorium
									</p>
								</div>
								<Link
									href={route("laboratorium.index")}
									className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
								>
									<ArrowLeftIcon className="w-4 h-4 mr-2" />
									Kembali
								</Link>
							</div>
						</div>

						{/* Patient Info */}
						<div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
										No. Rawat
									</label>
									<p className="mt-1 text-sm text-gray-900 dark:text-white font-medium">
										{periksaLab.no_rawat}
									</p>
								</div>
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
							</div>
						</div>

						{/* Form */}
						<form onSubmit={handleSubmit} className="p-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Jenis Perawatan */}
								<div className="md:col-span-2">
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										Jenis Pemeriksaan <span className="text-red-500">*</span>
									</label>
									<SearchableSelect
										options={jenisPerawatanOptions}
										value={data.kd_jenis_prw}
										onChange={(value) => setData("kd_jenis_prw", value)}
										placeholder="Pilih atau cari jenis pemeriksaan..."
										error={errors.kd_jenis_prw}
									/>
								</div>

								{/* Tanggal Periksa */}
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										Tanggal Periksa <span className="text-red-500">*</span>
									</label>
									<input
										type="date"
										value={data.tgl_periksa}
										onChange={(e) => setData("tgl_periksa", e.target.value)}
										className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
											errors.tgl_periksa
												? "border-red-500"
												: "border-gray-300"
										}`}
										required
									/>
									{errors.tgl_periksa && (
										<p className="mt-1 text-sm text-red-600">
											{errors.tgl_periksa}
										</p>
									)}
								</div>

								{/* Jam */}
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										Jam <span className="text-red-500">*</span>
									</label>
									<input
										type="time"
										value={data.jam}
										onChange={(e) => setData("jam", e.target.value)}
										className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
											errors.jam ? "border-red-500" : "border-gray-300"
										}`}
										required
									/>
									{errors.jam && (
										<p className="mt-1 text-sm text-red-600">{errors.jam}</p>
									)}
								</div>

								{/* Dokter Perujuk */}
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										Dokter Perujuk
									</label>
									<input
										type="text"
										value={data.dokter_perujuk}
										onChange={(e) => setData("dokter_perujuk", e.target.value)}
										placeholder="Nama dokter perujuk"
										className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
											errors.dokter_perujuk
												? "border-red-500"
												: "border-gray-300"
										}`}
									/>
									{errors.dokter_perujuk && (
										<p className="mt-1 text-sm text-red-600">
											{errors.dokter_perujuk}
										</p>
									)}
								</div>

								{/* Petugas */}
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										Petugas <span className="text-red-500">*</span>
									</label>
									<SearchableSelect
										options={petugasOptions}
										value={data.petugas}
										onChange={(value) => setData("petugas", value)}
										placeholder="Pilih atau cari petugas..."
										error={errors.petugas}
									/>
								</div>

								{/* Status */}
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										Status <span className="text-red-500">*</span>
									</label>
									<select
										value={data.status}
										onChange={(e) => setData("status", e.target.value)}
										className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
											errors.status ? "border-red-500" : "border-gray-300"
										}`}
										required
									>
										<option value="Menunggu">Menunggu</option>
										<option value="Proses">Proses</option>
										<option value="Selesai">Selesai</option>
									</select>
									{errors.status && (
										<p className="mt-1 text-sm text-red-600">{errors.status}</p>
									)}
								</div>

								{/* Keterangan */}
								<div className="md:col-span-2">
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										Keterangan
									</label>
									<textarea
										value={data.keterangan}
										onChange={(e) => setData("keterangan", e.target.value)}
										rows={3}
										placeholder="Keterangan tambahan..."
										className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
											errors.keterangan
												? "border-red-500"
												: "border-gray-300"
										}`}
									/>
									{errors.keterangan && (
										<p className="mt-1 text-sm text-red-600">
											{errors.keterangan}
										</p>
									)}
								</div>
							</div>

							{/* Submit Button */}
							<div className="flex items-center justify-end mt-6 space-x-3">
								<Link
									href={route("laboratorium.index")}
									className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
								>
									Batal
								</Link>
								<Button
									type="submit"
									processing={processing}
									className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
								>
									Perbarui
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</AppLayout>
	);
}