import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
import AppLayout from "@/Layouts/AppLayout";
import Button from "@/Components/Button";
import SearchableSelect from "@/Components/SearchableSelect";
import Alert from "@/Components/Alert";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function Create({ regPeriksa, jenisPerawatan, petugas }) {
	const { data, setData, post, processing, errors, reset } = useForm({
		no_rawat: "",
		kd_jenis_prw: "",
		tgl_periksa: new Date().toISOString().split("T")[0],
		jam: new Date().toTimeString().split(" ")[0].substring(0, 5),
		dokter_perujuk: "",
		petugas: "",
		status: "Menunggu",
		keterangan: "",
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
		post(route("laboratorium.store"), {
			onSuccess: () => {
				setAlertConfig({
					type: "success",
					title: "Berhasil",
					message: "Pemeriksaan laboratorium berhasil ditambahkan.",
					autoClose: true,
				});
				setShowAlert(true);
				reset();
			},
			onError: () => {
				setAlertConfig({
					type: "error",
					title: "Gagal",
					message: "Terjadi kesalahan saat menyimpan data.",
					autoClose: true,
				});
				setShowAlert(true);
			},
		});
	};

	// Format data untuk SearchableSelect
	const regPeriksaOptions = regPeriksa.map((item) => ({
		value: item.no_rawat,
		label: `${item.no_rawat} - ${item.patient?.nm_pasien} (${item.patient?.no_rkm_medis})`,
		search: `${item.no_rawat} ${item.patient?.nm_pasien} ${item.patient?.no_rkm_medis}`,
	}));

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
			<Head title="Tambah Pemeriksaan Laboratorium" />

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
										Tambah Pemeriksaan Laboratorium
									</h1>
									<p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
										Tambahkan pemeriksaan laboratorium baru
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

						{/* Form */}
						<form onSubmit={handleSubmit} className="p-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* No Rawat */}
								<div className="md:col-span-2">
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										No. Rawat <span className="text-red-500">*</span>
									</label>
									<SearchableSelect
										options={regPeriksaOptions}
										value={data.no_rawat}
										onChange={(value) => setData("no_rawat", value)}
										placeholder="Pilih atau cari no rawat..."
										error={errors.no_rawat}
									/>
								</div>

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
									Simpan
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</AppLayout>
	);
}