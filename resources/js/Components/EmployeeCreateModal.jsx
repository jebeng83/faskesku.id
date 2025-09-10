import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import Modal from "./Modal";
import Alert from "./Alert";

export default function EmployeeCreateModal({ isOpen, onClose, onSuccess }) {
	const { data, setData, errors, reset, setError, clearErrors } = useForm({
		nik: "",
		no_ktp: "",
		nama: "",
		jk: "Pria",
		tmp_lahir: "",
		tgl_lahir: "",
		alamat: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [alertConfig, setAlertConfig] = useState({
		type: "success",
		title: "",
		message: "",
		autoClose: false,
	});

	const validateForm = () => {
		let hasError = false;
		clearErrors();

		// nik: required, max:50
		if (!data.nik || String(data.nik).trim() === "") {
			setError("nik", "NIK wajib diisi");
			hasError = true;
		} else if (String(data.nik).length > 50) {
			setError("nik", "NIK maksimal 50 karakter");
			hasError = true;
		}

		// no_ktp: required, digits:16
		if (!data.no_ktp || String(data.no_ktp).trim() === "") {
			setError("no_ktp", "No. KTP wajib diisi");
			hasError = true;
		} else if (!/^\d{16}$/.test(String(data.no_ktp))) {
			setError("no_ktp", "No. KTP harus 16 digit angka");
			hasError = true;
		}

		// nama: required, max:191
		if (!data.nama || String(data.nama).trim() === "") {
			setError("nama", "Nama wajib diisi");
			hasError = true;
		} else if (String(data.nama).length > 191) {
			setError("nama", "Nama maksimal 191 karakter");
			hasError = true;
		}

		// jk: required in [Pria, Wanita]
		if (!data.jk || !["Pria", "Wanita"].includes(String(data.jk))) {
			setError("jk", "Jenis kelamin harus Pria atau Wanita");
			hasError = true;
		}

		// tmp_lahir: required, max:100
		if (!data.tmp_lahir || String(data.tmp_lahir).trim() === "") {
			setError("tmp_lahir", "Tempat lahir wajib diisi");
			hasError = true;
		} else if (String(data.tmp_lahir).length > 100) {
			setError("tmp_lahir", "Tempat lahir maksimal 100 karakter");
			hasError = true;
		}

		// tgl_lahir: required, date
		if (!data.tgl_lahir) {
			setError("tgl_lahir", "Tanggal lahir wajib diisi");
			hasError = true;
		} else if (isNaN(new Date(data.tgl_lahir).getTime())) {
			setError("tgl_lahir", "Tanggal lahir tidak valid");
			hasError = true;
		}

		// alamat: required
		if (!data.alamat || String(data.alamat).trim() === "") {
			setError("alamat", "Alamat wajib diisi");
			hasError = true;
		}

		return !hasError;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setShowAlert(false);
		setIsSubmitting(true);

		try {
			const csrfToken = document
				.querySelector('meta[name="csrf-token"]')
				?.getAttribute("content");

			const response = await fetch("/api/employees", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					...(csrfToken ? { "X-CSRF-TOKEN": csrfToken } : {}),
				},
				body: JSON.stringify(data),
			});

			if (response.ok) {
				setAlertConfig({
					type: "success",
					title: "Berhasil!",
					message: "Pegawai berhasil disimpan.",
					autoClose: true,
					autoCloseDelay: 1500,
				});
				setShowAlert(true);
				setTimeout(() => {
					reset();
					onClose();
					if (onSuccess) onSuccess();
					setShowAlert(false);
				}, 1500);
			} else if (response.status === 422) {
				const payload = await response.json();
				if (payload?.errors) {
					Object.entries(payload.errors).forEach(([field, messages]) => {
						setError(
							field,
							Array.isArray(messages) ? messages[0] : String(messages)
						);
					});
				}
				setAlertConfig({
					type: "error",
					title: "Validasi Gagal",
					message: "Periksa kembali input Anda.",
					autoClose: false,
				});
				setShowAlert(true);
			} else {
				setAlertConfig({
					type: "error",
					title: "Gagal Menyimpan",
					message: `Terjadi kesalahan. Kode: ${response.status}`,
					autoClose: false,
				});
				setShowAlert(true);
			}
		} catch (error) {
			setAlertConfig({
				type: "error",
				title: "Kesalahan Jaringan",
				message: "Terjadi kesalahan jaringan saat menyimpan pegawai.",
				autoClose: false,
			});
			setShowAlert(true);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleClose = () => {
		reset();
		onClose();
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={handleClose}
			title="Tambah Pegawai Baru"
			size="lg"
		>
			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Basic Information */}
				<div>
					<h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
						Informasi Dasar
					</h4>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
								<p className="mt-1 text-sm text-red-600">{errors.no_ktp}</p>
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
								<p className="mt-1 text-sm text-red-600">{errors.tmp_lahir}</p>
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
								<p className="mt-1 text-sm text-red-600">{errors.tgl_lahir}</p>
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
								<p className="mt-1 text-sm text-red-600">{errors.alamat}</p>
							)}
						</div>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
					<button
						type="button"
						onClick={handleClose}
						className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
					>
						Batal
					</button>
					<button
						type="submit"
						disabled={isSubmitting}
						className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-lg transition-colors flex items-center gap-2"
					>
						{isSubmitting && (
							<svg
								className="animate-spin h-4 w-4 text-white"
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
						{isSubmitting ? "Menyimpan..." : "Simpan"}
					</button>
				</div>
			</form>

			{/* Modal Alert */}
			<Alert
				isOpen={showAlert}
				type={alertConfig.type}
				title={alertConfig.title}
				message={alertConfig.message}
				autoClose={alertConfig.autoClose}
				autoCloseDelay={alertConfig.autoCloseDelay}
				onClose={() => setShowAlert(false)}
			/>
		</Modal>
	);
}
