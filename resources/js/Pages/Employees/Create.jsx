import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
import AppLayout from "@/Layouts/AppLayout";

export default function Create() {
	const { data, setData, post, processing, errors } = useForm({
		nik: "",
		no_ktp: "",
		nama: "",
		jk: "Pria",
		tmp_lahir: "",
		tgl_lahir: "",
		alamat: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		post(route("employees.store"));
	};

	return (
		<AppLayout>
			<Head title="Tambah Pegawai Baru" />

			<div className="py-6">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					{/* Header */}
					<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mb-6">
						<div className="p-6">
							<div className="flex justify-between items-center">
								<div>
									<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
										Tambah Pegawai Baru
									</h2>
									<p className="text-gray-600 dark:text-gray-400 mt-1">
										Masukkan data pegawai baru ke dalam sistem
									</p>
								</div>
								<Link
									href={route("employees.index")}
									className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="w-5 h-5"
									>
										<path
											fillRule="evenodd"
											d="M7.72 12.53a.75.75 0 010-1.06L10.94 8.25H3a.75.75 0 010-1.5h7.94L7.72 3.53a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06 0z"
											clipRule="evenodd"
										/>
									</svg>
									Kembali
								</Link>
							</div>
						</div>
					</div>

					{/* Form */}
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Basic Information */}
						<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
							<div className="p-6">
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
									Informasi Dasar
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											NIK *
										</label>
										<input
											type="text"
											value={data.nik}
											onChange={(e) => setData("nik", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan NIK"
										/>
										{errors.nik && (
											<p className="mt-1 text-sm text-red-600">{errors.nik}</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											No. KTP *
										</label>
										<input
											type="text"
											value={data.no_ktp}
											onChange={(e) => setData("no_ktp", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan No. KTP (16 digit)"
											maxLength="16"
										/>
										{errors.no_ktp && (
											<p className="mt-1 text-sm text-red-600">
												{errors.no_ktp}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Nama *
										</label>
										<input
											type="text"
											value={data.nama}
											onChange={(e) => setData("nama", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan nama lengkap"
										/>
										{errors.nama && (
											<p className="mt-1 text-sm text-red-600">{errors.nama}</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Jenis Kelamin *
										</label>
										<select
											value={data.jk}
											onChange={(e) => setData("jk", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
										>
											<option value="Pria">Laki-laki</option>
											<option value="Wanita">Perempuan</option>
										</select>
										{errors.jk && (
											<p className="mt-1 text-sm text-red-600">{errors.jk}</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Tempat Lahir *
										</label>
										<input
											type="text"
											value={data.tmp_lahir}
											onChange={(e) => setData("tmp_lahir", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan tempat lahir"
										/>
										{errors.tmp_lahir && (
											<p className="mt-1 text-sm text-red-600">
												{errors.tmp_lahir}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Tanggal Lahir *
										</label>
										<input
											type="date"
											value={data.tgl_lahir}
											onChange={(e) => setData("tgl_lahir", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
										/>
										{errors.tgl_lahir && (
											<p className="mt-1 text-sm text-red-600">
												{errors.tgl_lahir}
											</p>
										)}
									</div>

									<div className="md:col-span-2">
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Alamat *
										</label>
										<textarea
											value={data.alamat}
											onChange={(e) => setData("alamat", e.target.value)}
											rows={3}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan alamat lengkap"
										/>
										{errors.alamat && (
											<p className="mt-1 text-sm text-red-600">
												{errors.alamat}
											</p>
										)}
									</div>
								</div>
							</div>
						</div>

						{/* Contact Information */}
						{/* <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
							<div className="p-6">
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
									Informasi Kontak
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											No. Telepon
										</label>
										<input
											type="text"
											value={data.no_telepon}
											onChange={(e) => setData("no_telepon", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan nomor telepon"
										/>
										{errors.no_telepon && (
											<p className="mt-1 text-sm text-red-600">
												{errors.no_telepon}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Email
										</label>
										<input
											type="email"
											value={data.email}
											onChange={(e) => setData("email", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan email"
										/>
										{errors.email && (
											<p className="mt-1 text-sm text-red-600">
												{errors.email}
											</p>
										)}
									</div>
								</div>
							</div>
						</div> */}

						{/* Employment Information */}
						{/* <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
							<div className="p-6">
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
									Informasi Kepegawaian
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Jabatan *
										</label>
										<input
											type="text"
											value={data.jabatan}
											onChange={(e) => setData("jabatan", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan jabatan"
										/>
										{errors.jabatan && (
											<p className="mt-1 text-sm text-red-600">
												{errors.jabatan}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Departemen *
										</label>
										<input
											type="text"
											value={data.departemen}
											onChange={(e) => setData("departemen", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan departemen"
										/>
										{errors.departemen && (
											<p className="mt-1 text-sm text-red-600">
												{errors.departemen}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Status Karyawan *
										</label>
										<select
											value={data.status_karyawan}
											onChange={(e) =>
												setData("status_karyawan", e.target.value)
											}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
										>
											<option value="TETAP">Tetap</option>
											<option value="KONTRAK">Kontrak</option>
											<option value="MAGANG">Magang</option>
											<option value="HONORER">Honorer</option>
										</select>
										{errors.status_karyawan && (
											<p className="mt-1 text-sm text-red-600">
												{errors.status_karyawan}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Status Aktif *
										</label>
										<select
											value={data.status_aktif}
											onChange={(e) => setData("status_aktif", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
										>
											<option value="AKTIF">Aktif</option>
											<option value="NONAKTIF">Non Aktif</option>
											<option value="CUTI">Cuti</option>
											<option value="RESIGN">Resign</option>
										</select>
										{errors.status_aktif && (
											<p className="mt-1 text-sm text-red-600">
												{errors.status_aktif}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Tanggal Masuk *
										</label>
										<input
											type="date"
											value={data.tanggal_masuk}
											onChange={(e) => setData("tanggal_masuk", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
										/>
										{errors.tanggal_masuk && (
											<p className="mt-1 text-sm text-red-600">
												{errors.tanggal_masuk}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Tanggal Keluar
										</label>
										<input
											type="date"
											value={data.tanggal_keluar}
											onChange={(e) =>
												setData("tanggal_keluar", e.target.value)
											}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
										/>
										{errors.tanggal_keluar && (
											<p className="mt-1 text-sm text-red-600">
												{errors.tanggal_keluar}
											</p>
										)}
									</div>
								</div>
							</div>
						</div> */}

						{/* Education Information */}
						{/* <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
							<div className="p-6">
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
									Informasi Pendidikan
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Pendidikan Terakhir *
										</label>
										<select
											value={data.pendidikan_terakhir}
											onChange={(e) =>
												setData("pendidikan_terakhir", e.target.value)
											}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
										>
											<option value="SMA">SMA</option>
											<option value="D3">D3</option>
											<option value="D4">D4</option>
											<option value="S1">S1</option>
											<option value="S2">S2</option>
											<option value="S3">S3</option>
										</select>
										{errors.pendidikan_terakhir && (
											<p className="mt-1 text-sm text-red-600">
												{errors.pendidikan_terakhir}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Universitas
										</label>
										<input
											type="text"
											value={data.universitas}
											onChange={(e) => setData("universitas", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan nama universitas"
										/>
										{errors.universitas && (
											<p className="mt-1 text-sm text-red-600">
												{errors.universitas}
											</p>
										)}
									</div>
								</div>
							</div>
						</div> */}

						{/* Banking Information */}
						{/* <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
							<div className="p-6">
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
									Informasi Rekening
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											No. Rekening
										</label>
										<input
											type="text"
											value={data.no_rekening}
											onChange={(e) => setData("no_rekening", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan nomor rekening"
										/>
										{errors.no_rekening && (
											<p className="mt-1 text-sm text-red-600">
												{errors.no_rekening}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Bank
										</label>
										<input
											type="text"
											value={data.bank}
											onChange={(e) => setData("bank", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan nama bank"
										/>
										{errors.bank && (
											<p className="mt-1 text-sm text-red-600">{errors.bank}</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Nama Rekening
										</label>
										<input
											type="text"
											value={data.nama_rekening}
											onChange={(e) => setData("nama_rekening", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan nama pemilik rekening"
										/>
										{errors.nama_rekening && (
											<p className="mt-1 text-sm text-red-600">
												{errors.nama_rekening}
											</p>
										)}
									</div>

									<div className="md:col-span-3">
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Catatan
										</label>
										<textarea
											value={data.catatan}
											onChange={(e) => setData("catatan", e.target.value)}
											rows={3}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan catatan tambahan"
										/>
										{errors.catatan && (
											<p className="mt-1 text-sm text-red-600">
												{errors.catatan}
											</p>
										)}
									</div>
								</div>
							</div>
						</div> */}

						{/* Submit Button */}
						<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
							<div className="p-6">
								<div className="flex justify-end gap-4">
									<Link
										href={route("employees.index")}
										className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
									>
										Batal
									</Link>
									<button
										type="submit"
										disabled={processing}
										className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
									>
										{processing && (
											<svg
												className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
										{processing ? "Menyimpan..." : "Simpan"}
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</AppLayout>
	);
}
