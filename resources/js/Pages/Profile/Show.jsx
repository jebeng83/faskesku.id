import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import EditProfileModal from "@/Components/EditProfileModal";

export default function ProfileShow({ user, roles }) {
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	const fullName = user?.name || user?.username || "User";
	const email = user?.email || "-";
	const nik = user?.nik || "-";
	const employee = user?.employee || null;
	const roleList = Array.isArray(roles) ? roles : [];

	return (
		<AppLayout>
			<Head title="Profil" />

			{/* Header Section with Gradient Background */}
			<div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 pt-20 pb-32">
				<div className="absolute inset-0 bg-black/20"></div>
				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm border-4 border-white/20 shadow-2xl mb-6">
							<span className="text-5xl font-bold text-white">
								{fullName.substring(0, 2).toUpperCase()}
							</span>
						</div>
						<h1 className="text-4xl font-bold text-white mb-2">{fullName}</h1>
						<p className="text-xl text-blue-100 mb-4">{email}</p>
						<div className="flex items-center justify-center gap-3">
							{roleList.length > 0 && (
								<span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/20 text-white backdrop-blur-sm">
									<svg
										className="w-4 h-4 mr-2"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
											clipRule="evenodd"
										/>
									</svg>
									{roleList.join(", ")}
								</span>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="relative -mt-24 pb-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
						{/* Action Bar */}
						<div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
							<div className="flex items-center justify-between">
								<h2 className="text-lg font-semibold text-gray-900 dark:text-white">
									Informasi Profile
								</h2>
								<div className="flex items-center gap-3">
									<Link
										href={"/"}
										className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
									>
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
												d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
											/>
										</svg>
										Dashboard
									</Link>
									<button
										onClick={() => setIsEditModalOpen(true)}
										className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm"
									>
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
												d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
											/>
										</svg>
										Edit Profile
									</button>
								</div>
							</div>
						</div>

						{/* Profile Content */}
						<div className="p-6 sm:p-8">
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
								{/* Account Information Card */}
								<div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800/50">
									<div className="flex items-center mb-6">
										<div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
											<svg
												className="w-5 h-5 text-white"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path
													fillRule="evenodd"
													d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
													clipRule="evenodd"
												/>
											</svg>
										</div>
										<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
											Informasi Akun
										</h3>
									</div>

									<div className="space-y-4">
										<div className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
											<div className="flex items-center">
												<svg
													className="w-5 h-5 text-gray-400 mr-3"
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
												<span className="text-sm font-medium text-gray-600 dark:text-gray-400">
													Username
												</span>
											</div>
											<span className="text-sm font-semibold text-gray-900 dark:text-white">
												{user?.username || "-"}
											</span>
										</div>

										<div className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
											<div className="flex items-center">
												<svg
													className="w-5 h-5 text-gray-400 mr-3"
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
												<span className="text-sm font-medium text-gray-600 dark:text-gray-400">
													Email
												</span>
											</div>
											<span className="text-sm font-semibold text-gray-900 dark:text-white break-all">
												{email}
											</span>
										</div>

										<div className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
											<div className="flex items-center">
												<svg
													className="w-5 h-5 text-gray-400 mr-3"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
													/>
												</svg>
												<span className="text-sm font-medium text-gray-600 dark:text-gray-400">
													NIK
												</span>
											</div>
											<span className="text-sm font-semibold text-gray-900 dark:text-white">
												{nik}
											</span>
										</div>
									</div>
								</div>

								{/* Employee Information Card */}
								<div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-100 dark:border-green-800/50">
									<div className="flex items-center mb-6">
										<div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-4">
											<svg
												className="w-5 h-5 text-white"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
											</svg>
										</div>
										<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
											Informasi Pegawai
										</h3>
									</div>

									{employee ? (
										<div className="space-y-4">
											<div className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
												<div className="flex items-center">
													<svg
														className="w-5 h-5 text-gray-400 mr-3"
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
													<span className="text-sm font-medium text-gray-600 dark:text-gray-400">
														Nama
													</span>
												</div>
												<span className="text-sm font-semibold text-gray-900 dark:text-white">
													{employee?.nama || "-"}
												</span>
											</div>

											<div className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
												<div className="flex items-center">
													<svg
														className="w-5 h-5 text-gray-400 mr-3"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth="2"
															d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8z"
														/>
													</svg>
													<span className="text-sm font-medium text-gray-600 dark:text-gray-400">
														Jabatan
													</span>
												</div>
												<span className="text-sm font-semibold text-gray-900 dark:text-white">
													{employee?.jabatan || "-"}
												</span>
											</div>

											<div className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
												<div className="flex items-center">
													<svg
														className="w-5 h-5 text-gray-400 mr-3"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth="2"
															d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
														/>
													</svg>
													<span className="text-sm font-medium text-gray-600 dark:text-gray-400">
														Departemen
													</span>
												</div>
												<span className="text-sm font-semibold text-gray-900 dark:text-white">
													{employee?.departemen || "-"}
												</span>
											</div>
										</div>
									) : (
										<div className="text-center py-8">
											<div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
												<svg
													className="w-8 h-8 text-gray-400"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 009.586 13H7"
													/>
												</svg>
											</div>
											<p className="text-gray-500 dark:text-gray-400 text-sm">
												Belum terhubung dengan data pegawai
											</p>
											<p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
												Hubungi administrator untuk menghubungkan akun
											</p>
										</div>
									)}
								</div>
							</div>

							{/* Additional Info Section */}
							<div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
								<div className="flex items-center justify-between">
									<div className="flex items-center">
										<div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
										<span className="text-sm text-gray-600 dark:text-gray-400">
											Status Akun:{" "}
											<span className="font-medium text-green-600 dark:text-green-400">
												Aktif
											</span>
										</span>
									</div>
									<div className="text-sm text-gray-500 dark:text-gray-400">
										Terakhir login:{" "}
										{new Date().toLocaleDateString("id-ID", {
											day: "numeric",
											month: "long",
											year: "numeric",
										})}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Edit Profile Modal */}
			<EditProfileModal
				isOpen={isEditModalOpen}
				onClose={() => setIsEditModalOpen(false)}
				user={user}
			/>
		</AppLayout>
	);
}
