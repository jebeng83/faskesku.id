import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import axios from "axios";

export default function Index() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState("");
	const [roleFilter, setRoleFilter] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [showPasswordModal, setShowPasswordModal] = useState(false);
	const [modalMode, setModalMode] = useState("create"); // create, edit
	const [selectedUser, setSelectedUser] = useState(null);
	const [roles, setRoles] = useState([]);
	const [permissions, setPermissions] = useState([]);
	const [employees, setEmployees] = useState([]);
	const [formData, setFormData] = useState({
		name: "",
		username: "",
		email: "",
		password: "",
		password_confirmation: "",
		nik: "",
		roles: [],
		permissions: [],
	});
	const [passwordData, setPasswordData] = useState({
		current_password: "",
		password: "",
		password_confirmation: "",
	});
	const [errors, setErrors] = useState({});
	const [pagination, setPagination] = useState({});

	// Fetch data
	const fetchUsers = async (page = 1) => {
		try {
			setLoading(true);
			const params = new URLSearchParams({
				page,
				...(search && { search }),
				...(roleFilter && { role: roleFilter }),
			});

			const response = await axios.get(`/api/users?${params}`);
			setUsers(response.data.data.data);
			setPagination({
				current_page: response.data.data.current_page,
				last_page: response.data.data.last_page,
				per_page: response.data.data.per_page,
				total: response.data.data.total,
			});
		} catch (error) {
			console.error("Error fetching users:", error);
		} finally {
			setLoading(false);
		}
	};

	const fetchRoles = async () => {
		try {
			const response = await axios.get("/api/users/roles");
			setRoles(response.data.data);
		} catch (error) {
			console.error("Error fetching roles:", error);
		}
	};

	const fetchPermissions = async () => {
		try {
			const response = await axios.get("/api/users/permissions");
			setPermissions(response.data.data);
		} catch (error) {
			console.error("Error fetching permissions:", error);
		}
	};

	const fetchEmployees = async () => {
		try {
			const response = await axios.get("/api/users/employees");
			setEmployees(response.data.data);
		} catch (error) {
			console.error("Error fetching employees:", error);
		}
	};

	useEffect(() => {
		fetchUsers();
		fetchRoles();
		fetchPermissions();
		fetchEmployees();
	}, []);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			fetchUsers();
		}, 500);
		return () => clearTimeout(timeoutId);
	}, [search, roleFilter]);

	// Modal handlers
	const openCreateModal = () => {
		setModalMode("create");
		setSelectedUser(null);
		setFormData({
			name: "",
			email: "",
			password: "",
			password_confirmation: "",
			nik: "",
			roles: [],
			permissions: [],
		});
		setErrors({});
		setShowModal(true);
	};

	const openEditModal = (user) => {
		setModalMode("edit");
		setSelectedUser(user);
		setFormData({
			name: user.name,
			username: user.username,
			email: user.email,
			password: "",
			password_confirmation: "",
			nik: user.nik || "",
			roles: user.roles.map((role) => role.name),
			permissions: user.permissions.map((permission) => permission.name),
		});
		setErrors({});
		setShowModal(true);
	};

	const openPasswordModal = (user) => {
		setSelectedUser(user);
		setPasswordData({
			current_password: "",
			password: "",
			password_confirmation: "",
		});
		setErrors({});
		setShowPasswordModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
		setShowPasswordModal(false);
		setSelectedUser(null);
		setFormData({
			name: "",
			email: "",
			password: "",
			password_confirmation: "",
			nik: "",
			roles: [],
			permissions: [],
		});
		setPasswordData({
			current_password: "",
			password: "",
			password_confirmation: "",
		});
		setErrors({});
	};

	// Form handlers
	const handleFormChange = (e) => {
		const { name, value, type, checked } = e.target;
		if (type === "checkbox") {
			setFormData((prev) => ({
				...prev,
				[name]: checked
					? [...prev[name], value]
					: prev[name].filter((item) => item !== value),
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));
		}
		setErrors((prev) => ({
			...prev,
			[name]: null,
		}));
	};

	const handlePasswordChange = (e) => {
		const { name, value } = e.target;
		setPasswordData((prev) => ({
			...prev,
			[name]: value,
		}));
		setErrors((prev) => ({
			...prev,
			[name]: null,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors({});

		try {
            if (modalMode === "create") {
                await axios.post("/api/users", formData);
            } else {
                // Spoof PUT via POST using FormData
                const fd = new FormData();
                Object.entries(formData).forEach(([key, value]) => fd.append(key, value ?? ""));
                fd.append('_method', 'PUT');
                await axios.post(`/api/users/${selectedUser.id}`, fd, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }
			closeModal();
			fetchUsers();
		} catch (error) {
			if (error.response?.status === 422) {
				setErrors(error.response.data.errors);
			}
		}
	};

	const handlePasswordSubmit = async (e) => {
		e.preventDefault();
		setErrors({});

        try {
            // Spoof PUT via POST using FormData
            const fd = new FormData();
            Object.entries(passwordData).forEach(([key, value]) => fd.append(key, value ?? ""));
            fd.append('_method', 'PUT');
            await axios.post(`/api/users/${selectedUser.id}/password`, fd, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            closeModal();
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
	};

	const handleDelete = async (user) => {
		if (confirm(`Apakah Anda yakin ingin menghapus user ${user.name}?`)) {
            try {
                // Spoof DELETE via POST
                const fd = new FormData();
                fd.append('_method', 'DELETE');
                await axios.post(`/api/users/${user.id}`, fd, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                fetchUsers();
            } catch (error) {
                alert(
                    "Gagal menghapus user: " + (error.response?.data?.message || "Error")
                );
            }
		}
	};

	const handlePageChange = (page) => {
		fetchUsers(page);
	};

	return (
		<AppLayout>
			<Head title="Manajemen User" />

			<div className="space-y-6 -mt-6 -mx-6 p-6">
				{/* Header */}
				<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
					<div className="p-6">
						<div className="flex justify-between items-center">
							<div>
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
									Manajemen User
								</h2>
								<p className="text-gray-600 dark:text-gray-400 mt-1">
									Kelola data pengguna dan permission
								</p>
							</div>
							<button
								onClick={openCreateModal}
								className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg font-medium text-sm whitespace-nowrap transform hover:scale-105"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="w-4 h-4"
								>
									<path
										fillRule="evenodd"
										d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
										clipRule="evenodd"
									/>
								</svg>
								<span>Tambah User</span>
							</button>
						</div>
					</div>
				</div>

				{/* Search and Filters */}
				<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
					<div className="p-6">
						<div className="flex gap-4">
							<div className="flex-1">
								<input
									type="text"
									value={search}
									onChange={(e) => setSearch(e.target.value)}
									placeholder="Cari berdasarkan nama, email, atau NIK..."
									className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								/>
							</div>
							<div className="w-48">
								<select
									value={roleFilter}
									onChange={(e) => setRoleFilter(e.target.value)}
									className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								>
									<option value="">Semua Role</option>
									{roles.map((role) => (
										<option key={role.id} value={role.name}>
											{role.name}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>
				</div>

				{/* Data Table */}
				<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
					<div className="overflow-x-auto">
						<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
							<thead className="bg-gray-50 dark:bg-gray-700">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
										Nama
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
										Username
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
										Email
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
										NIK
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
										Roles
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
										Permissions
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
										Tanggal Dibuat
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
										Aksi
									</th>
								</tr>
							</thead>
							<tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
								{loading ? (
									<tr>
										<td colSpan="8" className="px-6 py-4 text-center">
											<div className="flex justify-center">
												<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
											</div>
										</td>
									</tr>
								) : users.length === 0 ? (
									<tr>
										<td
											colSpan="8"
											className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
										>
											Tidak ada data user
										</td>
									</tr>
								) : (
									users.map((user) => (
										<tr
											key={user.id}
											className="hover:bg-gray-50 dark:hover:bg-gray-700"
										>
											<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
												{user.name}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
												{user.username}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
												{user.email || "-"}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
												{user.nik || "-"}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
												<div className="flex flex-wrap gap-1">
													{user.roles.map((role) => (
														<span
															key={role.id}
															className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
														>
															{role.name}
														</span>
													))}
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
												<div className="flex flex-wrap gap-1">
													{user.permissions.slice(0, 3).map((permission) => (
														<span
															key={permission.id}
															className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
														>
															{permission.name}
														</span>
													))}
													{user.permissions.length > 3 && (
														<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
															+{user.permissions.length - 3} lainnya
														</span>
													)}
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
												{new Date(user.created_at).toLocaleDateString("id-ID")}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
												<div className="flex space-x-2">
													<button
														onClick={() => openEditModal(user)}
														className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
													>
														<svg
															className="w-4 h-4"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
															/>
														</svg>
													</button>
													<button
														onClick={() => openPasswordModal(user)}
														className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300"
													>
														<svg
															className="w-4 h-4"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
															/>
														</svg>
													</button>
													<button
														onClick={() => handleDelete(user)}
														className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
													>
														<svg
															className="w-4 h-4"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
															/>
														</svg>
													</button>
												</div>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>

					{/* Pagination */}
					{pagination.last_page > 1 && (
						<div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
							<div className="flex items-center justify-between">
								<div className="text-sm text-gray-700 dark:text-gray-300">
									Menampilkan{" "}
									{(pagination.current_page - 1) * pagination.per_page + 1}{" "}
									sampai{" "}
									{Math.min(
										pagination.current_page * pagination.per_page,
										pagination.total
									)}{" "}
									dari {pagination.total} data
								</div>
								<div className="flex gap-2">
									{Array.from(
										{ length: pagination.last_page },
										(_, i) => i + 1
									).map((page) => (
										<button
											key={page}
											onClick={() => handlePageChange(page)}
											className={`px-3 py-2 text-sm rounded-lg ${
												page === pagination.current_page
													? "bg-blue-600 text-white"
													: "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
											}`}
										>
											{page}
										</button>
									))}
								</div>
							</div>
						</div>
					)}
				</div>

				{/* User Modal */}
				{showModal && (
					<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
						<div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
							<div className="p-6">
								<div className="flex justify-between items-center mb-6">
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
										{modalMode === "create" ? "Tambah User" : "Edit User"}
									</h3>
									<button
										onClick={closeModal}
										className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
									>
										<svg
											className="w-6 h-6"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</div>

								<form onSubmit={handleSubmit} className="space-y-6">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										{/* Nama */}
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
												Nama *
											</label>
											<input
												type="text"
												name="name"
												value={formData.name}
												onChange={handleFormChange}
												required
												className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
													errors.name
														? "border-red-500"
														: "border-gray-300 dark:border-gray-600"
												}`}
											/>
											{errors.name && (
												<p className="mt-1 text-sm text-red-600 dark:text-red-400">
													{errors.name[0]}
												</p>
											)}
										</div>

										{/* Username */}
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
												Username *
											</label>
											<input
												type="text"
												name="username"
												value={formData.username}
												onChange={handleFormChange}
												required
												className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
													errors.username
														? "border-red-500"
														: "border-gray-300 dark:border-gray-600"
												}`}
											/>
											{errors.username && (
												<p className="mt-1 text-sm text-red-600 dark:text-red-400">
													{errors.username[0]}
												</p>
											)}
										</div>

										{/* Email */}
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
												Email
											</label>
											<input
												type="email"
												name="email"
												value={formData.email}
												onChange={handleFormChange}
												className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
													errors.email
														? "border-red-500"
														: "border-gray-300 dark:border-gray-600"
												}`}
											/>
											{errors.email && (
												<p className="mt-1 text-sm text-red-600 dark:text-red-400">
													{errors.email[0]}
												</p>
											)}
										</div>

										{/* Password */}
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
												Password{" "}
												{modalMode === "create"
													? "*"
													: "(kosongkan jika tidak diubah)"}
											</label>
											<input
												type="password"
												name="password"
												value={formData.password}
												onChange={handleFormChange}
												required={modalMode === "create"}
												className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
													errors.password
														? "border-red-500"
														: "border-gray-300 dark:border-gray-600"
												}`}
											/>
											{errors.password && (
												<p className="mt-1 text-sm text-red-600 dark:text-red-400">
													{errors.password[0]}
												</p>
											)}
										</div>

										{/* Password Confirmation */}
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
												Konfirmasi Password{" "}
												{modalMode === "create"
													? "*"
													: "(kosongkan jika tidak diubah)"}
											</label>
											<input
												type="password"
												name="password_confirmation"
												value={formData.password_confirmation}
												onChange={handleFormChange}
												required={modalMode === "create"}
												className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
													errors.password_confirmation
														? "border-red-500"
														: "border-gray-300 dark:border-gray-600"
												}`}
											/>
											{errors.password_confirmation && (
												<p className="mt-1 text-sm text-red-600 dark:text-red-400">
													{errors.password_confirmation[0]}
												</p>
											)}
										</div>

										{/* NIK */}
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
												NIK
											</label>
											<select
												name="nik"
												value={formData.nik}
												onChange={handleFormChange}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											>
												<option value="">Pilih Karyawan</option>
												{employees.map((employee) => (
													<option key={employee.nik} value={employee.nik}>
														{employee.nama} - {employee.jbtn}
													</option>
												))}
											</select>
											{errors.nik && (
												<p className="mt-1 text-sm text-red-600 dark:text-red-400">
													{errors.nik[0]}
												</p>
											)}
										</div>
									</div>

									{/* Roles */}
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Roles
										</label>
										<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
											{roles.map((role) => (
												<label
													key={role.id}
													className="flex items-center space-x-2 cursor-pointer"
												>
													<input
														type="checkbox"
														name="roles"
														value={role.name}
														checked={formData.roles.includes(role.name)}
														onChange={handleFormChange}
														className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
													/>
													<span className="text-sm text-gray-700 dark:text-gray-300">
														{role.name}
													</span>
												</label>
											))}
										</div>
										{errors.roles && (
											<p className="mt-1 text-sm text-red-600 dark:text-red-400">
												{errors.roles[0]}
											</p>
										)}
									</div>

									{/* Permissions */}
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Permissions
										</label>
										<div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
											{permissions.map((permission) => (
												<label
													key={permission.id}
													className="flex items-center space-x-2 cursor-pointer"
												>
													<input
														type="checkbox"
														name="permissions"
														value={permission.name}
														checked={formData.permissions.includes(
															permission.name
														)}
														onChange={handleFormChange}
														className="rounded border-gray-300 text-green-600 focus:ring-green-500"
													/>
													<span className="text-sm text-gray-700 dark:text-gray-300">
														{permission.name}
													</span>
												</label>
											))}
										</div>
										{errors.permissions && (
											<p className="mt-1 text-sm text-red-600 dark:text-red-400">
												{errors.permissions[0]}
											</p>
										)}
									</div>

									<div className="flex justify-end space-x-3 pt-4">
										<button
											type="button"
											onClick={closeModal}
											className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
										>
											Batal
										</button>
										<button
											type="submit"
											className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
										>
											{modalMode === "create" ? "Simpan" : "Update"}
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				)}

				{/* Password Modal */}
				{showPasswordModal && (
					<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
						<div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
							<div className="p-6">
								<div className="flex justify-between items-center mb-6">
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
										Ubah Password - {selectedUser?.name}
									</h3>
									<button
										onClick={closeModal}
										className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
									>
										<svg
											className="w-6 h-6"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</div>

								<form onSubmit={handlePasswordSubmit} className="space-y-4">
									{/* Current Password */}
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
											Password Saat Ini *
										</label>
										<input
											type="password"
											name="current_password"
											value={passwordData.current_password}
											onChange={handlePasswordChange}
											required
											className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
												errors.current_password
													? "border-red-500"
													: "border-gray-300 dark:border-gray-600"
											}`}
										/>
										{errors.current_password && (
											<p className="mt-1 text-sm text-red-600 dark:text-red-400">
												{errors.current_password[0]}
											</p>
										)}
									</div>

									{/* New Password */}
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
											Password Baru *
										</label>
										<input
											type="password"
											name="password"
											value={passwordData.password}
											onChange={handlePasswordChange}
											required
											className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
												errors.password
													? "border-red-500"
													: "border-gray-300 dark:border-gray-600"
											}`}
										/>
										{errors.password && (
											<p className="mt-1 text-sm text-red-600 dark:text-red-400">
												{errors.password[0]}
											</p>
										)}
									</div>

									{/* Confirm Password */}
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
											Konfirmasi Password Baru *
										</label>
										<input
											type="password"
											name="password_confirmation"
											value={passwordData.password_confirmation}
											onChange={handlePasswordChange}
											required
											className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
												errors.password_confirmation
													? "border-red-500"
													: "border-gray-300 dark:border-gray-600"
											}`}
										/>
										{errors.password_confirmation && (
											<p className="mt-1 text-sm text-red-600 dark:text-red-400">
												{errors.password_confirmation[0]}
											</p>
										)}
									</div>

									<div className="flex justify-end space-x-3 pt-4">
										<button
											type="button"
											onClick={closeModal}
											className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
										>
											Batal
										</button>
										<button
											type="submit"
											className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors"
										>
											Ubah Password
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				)}
			</div>
		</AppLayout>
	);
}
