import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";

export default function EditProfileModal({ isOpen, onClose, user }) {
	const { data, setData, put, processing, errors, reset } = useForm({
		name: user?.name || "",
		username: user?.username || "",
		email: user?.email || "",
		current_password: "",
		password: "",
		password_confirmation: "",
	});

	const [isAnimating, setIsAnimating] = useState(false);
	const [showPasswordSection, setShowPasswordSection] = useState(false);

	useEffect(() => {
		if (isOpen) {
			setIsAnimating(true);
			// Reset form data when modal opens
			setData({
				name: user?.name || "",
				username: user?.username || "",
				email: user?.email || "",
				current_password: "",
				password: "",
				password_confirmation: "",
			});
			setShowPasswordSection(false);
		}
	}, [isOpen, user]);

	const handleClose = () => {
		setIsAnimating(false);
		setTimeout(() => {
			onClose();
			reset();
		}, 200);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		put(route("profile.update"), {
			onSuccess: () => {
				handleClose();
			},
		});
	};

	if (!isOpen && !isAnimating) return null;

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto">
			{/* Backdrop */}
			<div
				className={`fixed inset-0 backdrop-blur-sm bg-black/30 transition-all duration-200 ${
					isOpen ? "opacity-100" : "opacity-0"
				}`}
				onClick={handleClose}
			/>

			{/* Modal Container */}
			<div className="flex min-h-full items-center justify-center p-4">
				<div
					className={`relative w-full max-w-2xl transform transition-all duration-200 ${
						isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
					}`}
				>
					{/* Modal Content */}
					<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
						{/* Header */}
						<div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
										<svg
											className="w-4 h-4 text-white"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
											/>
										</svg>
									</div>
									<h3 className="text-xl font-semibold text-white">
										Edit Profile
									</h3>
								</div>
								<button
									onClick={handleClose}
									className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors duration-200"
								>
									<svg
										className="w-5 h-5 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>
						</div>

						{/* Form Content */}
						<form onSubmit={handleSubmit} className="p-6">
							<div className="space-y-6">
								{/* Name Field */}
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										Nama Lengkap
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<svg
												className="w-5 h-5 text-gray-400"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
												/>
											</svg>
										</div>
										<input
											type="text"
											value={data.name}
											onChange={(e) => setData("name", e.target.value)}
											className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200"
											placeholder="Masukkan nama lengkap"
										/>
									</div>
									{errors.name && (
										<p className="mt-1 text-sm text-red-600">{errors.name}</p>
									)}
								</div>

								{/* Username Field */}
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										Username
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<svg
												className="w-5 h-5 text-gray-400"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
												/>
											</svg>
										</div>
										<input
											type="text"
											value={data.username}
											onChange={(e) => setData("username", e.target.value)}
											className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200"
											placeholder="Masukkan username"
										/>
									</div>
									{errors.username && (
										<p className="mt-1 text-sm text-red-600">
											{errors.username}
										</p>
									)}
								</div>

								{/* Email Field */}
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										Email
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<svg
												className="w-5 h-5 text-gray-400"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
												/>
											</svg>
										</div>
										<input
											type="email"
											value={data.email}
											onChange={(e) => setData("email", e.target.value)}
											className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200"
											placeholder="Masukkan email"
										/>
									</div>
									{errors.email && (
										<p className="mt-1 text-sm text-red-600">{errors.email}</p>
									)}
								</div>

								{/* Password Section Toggle */}
								<div className="border-t border-gray-200 dark:border-gray-600 pt-6">
									<button
										type="button"
										onClick={() => setShowPasswordSection(!showPasswordSection)}
										className="flex items-center justify-between w-full p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
									>
										<div className="flex items-center">
											<svg
												className="w-5 h-5 text-gray-500 mr-3"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
												/>
											</svg>
											<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
												Ganti Password
											</span>
										</div>
										<svg
											className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
												showPasswordSection ? "rotate-180" : ""
											}`}
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M19 9l-7 7-7-7"
											/>
										</svg>
									</button>

									{/* Password Fields */}
									{showPasswordSection && (
										<div className="mt-4 space-y-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
											{/* Current Password */}
											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
													Password Saat Ini
												</label>
												<div className="relative">
													<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
														<svg
															className="w-5 h-5 text-gray-400"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth="2"
																d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
															/>
														</svg>
													</div>
													<input
														type="password"
														value={data.current_password}
														onChange={(e) =>
															setData("current_password", e.target.value)
														}
														className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200"
														placeholder="Masukkan password saat ini"
													/>
												</div>
												{errors.current_password && (
													<p className="mt-1 text-sm text-red-600">
														{errors.current_password}
													</p>
												)}
											</div>

											{/* New Password */}
											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
													Password Baru
												</label>
												<div className="relative">
													<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
														<svg
															className="w-5 h-5 text-gray-400"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth="2"
																d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
															/>
														</svg>
													</div>
													<input
														type="password"
														value={data.password}
														onChange={(e) =>
															setData("password", e.target.value)
														}
														className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200"
														placeholder="Masukkan password baru"
													/>
												</div>
												{errors.password && (
													<p className="mt-1 text-sm text-red-600">
														{errors.password}
													</p>
												)}
											</div>

											{/* Confirm Password */}
											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
													Konfirmasi Password Baru
												</label>
												<div className="relative">
													<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
														<svg
															className="w-5 h-5 text-gray-400"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth="2"
																d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
															/>
														</svg>
													</div>
													<input
														type="password"
														value={data.password_confirmation}
														onChange={(e) =>
															setData("password_confirmation", e.target.value)
														}
														className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200"
														placeholder="Konfirmasi password baru"
													/>
												</div>
												{errors.password_confirmation && (
													<p className="mt-1 text-sm text-red-600">
														{errors.password_confirmation}
													</p>
												)}
											</div>

											{/* Password Requirements */}
											<div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
												<div className="flex items-start">
													<svg
														className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0"
														fill="currentColor"
														viewBox="0 0 20 20"
													>
														<path
															fillRule="evenodd"
															d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
															clipRule="evenodd"
														/>
													</svg>
													<div className="ml-3">
														<h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
															Syarat Password
														</h4>
														<ul className="mt-1 text-sm text-yellow-700 dark:text-yellow-300 list-disc list-inside">
															<li>Minimal 8 karakter</li>
															<li>Kombinasi huruf dan angka</li>
															<li>
																Password baru harus berbeda dari password lama
															</li>
														</ul>
													</div>
												</div>
											</div>
										</div>
									)}
								</div>
							</div>

							{/* Info Box */}
							<div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
								<div className="flex items-start">
									<div className="flex-shrink-0">
										<svg
											className="w-5 h-5 text-blue-500 mt-0.5"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
									<div className="ml-3">
										<h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">
											Informasi Penting
										</h4>
										<p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
											Pastikan data yang Anda masukkan sudah benar. Perubahan
											data akan mempengaruhi akses sistem Anda.
										</p>
									</div>
								</div>
							</div>

							{/* Action Buttons */}
							<div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
								<button
									type="button"
									onClick={handleClose}
									className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 font-medium"
								>
									Batal
								</button>
								<button
									type="submit"
									disabled={processing}
									className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
								>
									{processing ? (
										<>
											<svg
												className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
												/>
												<path
													className="opacity-75"
													fill="currentColor"
													d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
												/>
											</svg>
											Menyimpan...
										</>
									) : (
										<>
											<svg
												className="w-4 h-4 mr-2"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M5 13l4 4L19 7"
												/>
											</svg>
											Simpan Perubahan
										</>
									)}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
