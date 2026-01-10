import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
	XMarkIcon,
	IdentificationIcon,
	UserIcon,
} from "@heroicons/react/24/outline";

const modalVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { duration: 0.3 },
	},
	exit: {
		opacity: 0,
		transition: { duration: 0.2 },
	},
};

const modalContentVariants = {
	hidden: { opacity: 0, scale: 0.95, y: 20 },
	visible: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: { duration: 0.3, type: "spring", stiffness: 300, damping: 30 },
	},
	exit: {
		opacity: 0,
		scale: 0.95,
		y: 20,
		transition: { duration: 0.2 },
	},
};

const inputVariants = {
	focus: { scale: 1.02, transition: { duration: 0.2 } },
};

export default function SpesialisModal({ show, onClose, mode, spesialis }) {
    const { data, setData, post, errors, reset, processing } = useForm({
        kd_sps: spesialis?.kd_sps || "",
        nm_sps: spesialis?.nm_sps || "",
    });

	useEffect(() => {
		if (show && mode === "edit" && spesialis) {
			setData({
				kd_sps: spesialis.kd_sps,
				nm_sps: spesialis.nm_sps,
			});
		} else if (show && mode === "create") {
			reset();
		}
	}, [show, mode, spesialis]);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (mode === "create") {
			post(route("spesialis.store"), {
				onSuccess: () => {
					reset();
					onClose();
				},
			});
		} else {
			// Create a form and submit it with method spoofing
			const form = document.createElement("form");
			form.method = "POST";
			form.action = route("spesialis.update", spesialis.kd_sps);

			// Add CSRF token
			const csrfToken = document.querySelector('meta[name="csrf-token"]');
			if (csrfToken) {
				const csrfInput = document.createElement("input");
				csrfInput.type = "hidden";
				csrfInput.name = "_token";
				csrfInput.value = csrfToken.content;
				form.appendChild(csrfInput);
			}

			// Add method spoofing
			const methodInput = document.createElement("input");
			methodInput.type = "hidden";
			methodInput.name = "_method";
			methodInput.value = "PUT";
			form.appendChild(methodInput);

			// Add form data
			Object.keys(data).forEach((key) => {
				const input = document.createElement("input");
				input.type = "hidden";
				input.name = key;
				input.value = data[key];
				form.appendChild(input);
			});

			document.body.appendChild(form);
			form.submit();
		}
	};

	const handleClose = () => {
		reset();
		onClose();
	};

	if (!show) return null;

	return (
		<AnimatePresence>
			<motion.div
				variants={modalVariants}
				initial="hidden"
				animate="visible"
				exit="exit"
				className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
				onClick={handleClose}
			>
				<motion.div
					variants={modalContentVariants}
					initial="hidden"
					animate="visible"
					exit="exit"
					className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
					onClick={(e) => e.stopPropagation()}
				>
					{/* Header */}
					<div className="bg-gray-900 p-6 flex justify-between items-center">
						<div className="flex items-center gap-3">
							<div className="p-2 bg-white bg-opacity-20 rounded-lg">
								<UserIcon className="h-6 w-6 text-blcak" />
							</div>
							<div>
								<h3 className="text-xl font-semibold text-white">
									{mode === "create"
										? "Tambah Spesialis Baru"
										: "Edit Data Spesialis"}
								</h3>
								<p className="text-gray-300 text-sm">
									{mode === "create"
										? "Lengkapi form untuk menambahkan spesialis baru"
										: `Mengubah data untuk ${spesialis?.nm_sps}`}
								</p>
							</div>
						</div>
						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							onClick={handleClose}
							className="p-2 text-gray-400 hover:text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
						>
							<XMarkIcon className="h-6 w-6" />
						</motion.button>
					</div>

					{/* Form */}
					<form
						onSubmit={handleSubmit}
						className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]"
					>
						<div className="space-y-6">
							{/* Kode Spesialis */}
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									<IdentificationIcon className="inline h-4 w-4 mr-1" />
									Kode Spesialis *
								</label>
								<motion.input
									variants={inputVariants}
									whileFocus="focus"
									type="text"
									value={data.kd_sps}
									onChange={(e) => setData("kd_sps", e.target.value)}
									disabled={mode === "edit"}
									className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all ${
										mode === "edit"
											? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
											: "bg-white dark:bg-gray-800"
									} ${
										errors.kd_sps
											? "border-red-500"
											: "border-gray-300 dark:border-gray-600"
									} dark:text-white`}
									placeholder="Masukkan kode spesialis (max 5 karakter)"
									maxLength={5}
								/>
								{errors.kd_sps && (
									<motion.p
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className="text-red-600 text-sm mt-1"
									>
										{errors.kd_sps}
									</motion.p>
								)}
								{mode === "create" && (
									<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
										Kode harus unik dan maksimal 5 karakter
									</p>
								)}
							</div>

							{/* Nama Spesialis */}
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									<UserIcon className="inline h-4 w-4 mr-1" />
									Nama Spesialis *
								</label>
								<motion.input
									variants={inputVariants}
									whileFocus="focus"
									type="text"
									value={data.nm_sps}
									onChange={(e) => setData("nm_sps", e.target.value)}
									className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all bg-white dark:bg-gray-800 ${
										errors.nm_sps
											? "border-red-500"
											: "border-gray-300 dark:border-gray-600"
									} dark:text-white`}
									placeholder="Masukkan nama spesialis"
									maxLength={50}
								/>
								{errors.nm_sps && (
									<motion.p
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className="text-red-600 text-sm mt-1"
									>
										{errors.nm_sps}
									</motion.p>
								)}
								<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
									Contoh: Spesialis Jantung, Spesialis Anak, dll
								</p>
							</div>

							{/* Info Box */}
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2 }}
								className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4"
							>
								<div className="flex items-start gap-3">
									<div className="flex-shrink-0">
										<div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
											<span className="text-blue-600 dark:text-blue-400 text-sm font-medium">
												i
											</span>
										</div>
									</div>
									<div>
										<h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
											Informasi Spesialis
										</h4>
										<p className="text-sm text-gray-600 dark:text-gray-400">
											Spesialis akan digunakan untuk mengkategorikan dokter
											berdasarkan bidang keahlian mereka. Pastikan nama
											spesialis jelas dan mudah dipahami.
										</p>
									</div>
								</div>
							</motion.div>
						</div>

						{/* Actions */}
						<div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								type="button"
								onClick={handleClose}
								className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
							>
								Batal
							</motion.button>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								type="submit"
								disabled={processing}
								className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
							>
								{processing && (
									<motion.div
										animate={{ rotate: 360 }}
										transition={{
											duration: 1,
											repeat: Infinity,
											ease: "linear",
										}}
										className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
									/>
								)}
								{mode === "create" ? "Simpan" : "Perbarui"}
							</motion.button>
						</div>
					</form>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
}
