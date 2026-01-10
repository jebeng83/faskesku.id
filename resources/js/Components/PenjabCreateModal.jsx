import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Modal from "./Modal";
import Alert from "./Alert";

export default function PenjabCreateModal({ isOpen, onClose, onSuccess }) {
	const { data, setData, errors, reset, setError, clearErrors } = useForm({
		kd_pj: "",
		png_jawab: "",
		nama_perusahaan: "",
		alamat_perusahaan: "",
		no_telp: "",
		attn: "",
		status: "1",
	});

	// Info kode terakhir & kode berikutnya (format A01)
	const [codeInfo, setCodeInfo] = useState({ last_number: null, last_code: null, next_code: null });

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

		// kd_pj: required, max:10
		if (!data.kd_pj || String(data.kd_pj).trim() === "") {
			setError("kd_pj", "Kode Penanggung Jawab wajib diisi");
			hasError = true;
		} else if (String(data.kd_pj).length > 10) {
			setError("kd_pj", "Kode maksimal 10 karakter");
			hasError = true;
		}

		// png_jawab: required, max:50
		if (!data.png_jawab || String(data.png_jawab).trim() === "") {
			setError("png_jawab", "Nama Penanggung Jawab wajib diisi");
			hasError = true;
		} else if (String(data.png_jawab).length > 50) {
			setError("png_jawab", "Nama maksimal 50 karakter");
			hasError = true;
		}

		// nama_perusahaan: required, max:100
		if (!data.nama_perusahaan || String(data.nama_perusahaan).trim() === "") {
			setError("nama_perusahaan", "Nama Perusahaan wajib diisi");
			hasError = true;
		} else if (String(data.nama_perusahaan).length > 100) {
			setError("nama_perusahaan", "Nama perusahaan maksimal 100 karakter");
			hasError = true;
		}

		// alamat_perusahaan: required
		if (
			!data.alamat_perusahaan ||
			String(data.alamat_perusahaan).trim() === ""
		) {
			setError("alamat_perusahaan", "Alamat Perusahaan wajib diisi");
			hasError = true;
		}

		// no_telp: optional, max:20
		if (data.no_telp && String(data.no_telp).length > 20) {
			setError("no_telp", "No. Telepon maksimal 20 karakter");
			hasError = true;
		}

		// attn: optional, max:50
		if (data.attn && String(data.attn).length > 50) {
			setError("attn", "Attn maksimal 50 karakter");
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

			const response = await fetch("/api/penjab", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					...(csrfToken ? { "X-CSRF-TOKEN": csrfToken } : {}),
				},
				body: JSON.stringify(data),
			});

			if (response.ok) {
				const result = await response.json();
				setAlertConfig({
					type: "success",
					title: "Berhasil!",
					message: result.message || "Penanggung Jawab berhasil ditambahkan.",
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
        } catch {
            setAlertConfig({
                type: "error",
                title: "Kesalahan Jaringan",
                message: "Terjadi kesalahan jaringan saat menyimpan data.",
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

	// Saat modal dibuka, ambil kode berikutnya dan isi otomatis field kd_pj
	useEffect(() => {
		const loadNextCode = async () => {
			try {
				const res = await fetch(`/api/penjab/next-code?prefix=A`);
				if (!res.ok) return;
				const json = await res.json();
				setCodeInfo({
					last_number: json.last_number,
					last_code: json.last_code,
					next_code: json.next_code,
				});
				if (json?.next_code) {
					setData("kd_pj", json.next_code);
				}
            } catch {}
        };

		if (isOpen) {
			loadNextCode();
		}
	}, [isOpen]);

	return (
		<Modal
			show={isOpen}
			onClose={handleClose}
			title="Tambah Penanggung Jawab"
			size="lg"
			zIndex={10001}
		>
			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Basic Information */}
				<div>
					<h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
						Informasi Penanggung Jawab
					</h4>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Kode Penanggung Jawab *
							</label>
					<input
						type="text"
						value={data.kd_pj}
						onChange={(e) => setData("kd_pj", e.target.value.toUpperCase())}
						className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
						placeholder="Contoh: A01"
						maxLength="10"
					/>
					{codeInfo?.last_number !== null && (
						<p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
							Nomor terakhir: {String(codeInfo.last_number).padStart(2, "0")} {codeInfo.last_code ? `(Kode terakhir: ${codeInfo.last_code})` : ""}
						</p>
					)}
					{errors.kd_pj && (
						<p className="mt-1 text-sm text-red-600">{errors.kd_pj}</p>
					)}
				</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Nama Penanggung Jawab *
							</label>
							<input
								type="text"
								value={data.png_jawab}
								onChange={(e) => setData("png_jawab", e.target.value)}
								className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								placeholder="Masukkan nama penanggung jawab"
								maxLength="50"
							/>
							{errors.png_jawab && (
								<p className="mt-1 text-sm text-red-600">{errors.png_jawab}</p>
							)}
						</div>

						<div className="md:col-span-2">
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Nama Perusahaan *
							</label>
							<input
								type="text"
								value={data.nama_perusahaan}
								onChange={(e) => setData("nama_perusahaan", e.target.value)}
								className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								placeholder="Masukkan nama perusahaan"
								maxLength="100"
							/>
							{errors.nama_perusahaan && (
								<p className="mt-1 text-sm text-red-600">
									{errors.nama_perusahaan}
								</p>
							)}
						</div>

						<div className="md:col-span-2">
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Alamat Perusahaan *
							</label>
							<textarea
								value={data.alamat_perusahaan}
								onChange={(e) => setData("alamat_perusahaan", e.target.value)}
								rows={3}
								className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								placeholder="Masukkan alamat perusahaan"
							/>
							{errors.alamat_perusahaan && (
								<p className="mt-1 text-sm text-red-600">
									{errors.alamat_perusahaan}
								</p>
							)}
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								No. Telepon
							</label>
							<input
								type="text"
								value={data.no_telp}
								onChange={(e) => setData("no_telp", e.target.value)}
								className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								placeholder="Masukkan nomor telepon"
								maxLength="20"
							/>
							{errors.no_telp && (
								<p className="mt-1 text-sm text-red-600">{errors.no_telp}</p>
							)}
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Attn
							</label>
							<input
								type="text"
								value={data.attn}
								onChange={(e) => setData("attn", e.target.value)}
								className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								placeholder="Masukkan attn"
								maxLength="50"
							/>
							{errors.attn && (
								<p className="mt-1 text-sm text-red-600">{errors.attn}</p>
							)}
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Status
							</label>
							<select
								value={data.status}
								onChange={(e) => setData("status", e.target.value)}
								className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
							>
								<option value="1">Aktif</option>
								<option value="0">Tidak Aktif</option>
							</select>
							{errors.status && (
								<p className="mt-1 text-sm text-red-600">{errors.status}</p>
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
