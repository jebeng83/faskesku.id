import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import AppLayout from "@/Layouts/AppLayout";
import ResponsiveTable from "@/Components/ResponsiveTable";
import ActionDropdown from "@/Components/ActionDropdown";
import Pagination from "@/Components/Pagination";
import EmployeeCreateModal from "@/Components/EmployeeCreateModal";
import CreateUserFromEmployeeModal from "@/Components/CreateUserFromEmployeeModal";
import ConfirmationAlert from "@/Components/ConfirmationAlert";
import Alert from "@/Components/Alert";

export default function Index({ employees, filters }) {
	const [search, setSearch] = useState(filters.search || "");
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
	const [selectedEmployee, setSelectedEmployee] = useState(null);
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
	const [employeeToDelete, setEmployeeToDelete] = useState(null);
	const [showAlert, setShowAlert] = useState(false);
	const [alertConfig, setAlertConfig] = useState({
		type: "success",
		title: "",
		message: "",
		autoClose: false,
	});

	const handleSearch = (e) => {
		e.preventDefault();
		router.get(
			route("employees.index"),
			{ search },
			{
				preserveState: true,
				replace: true,
			}
		);
	};

	const handleDelete = (employee) => {
		setEmployeeToDelete(employee);
		setShowDeleteConfirmation(true);
	};

	const confirmDelete = async () => {
		if (!employeeToDelete) return;

		try {
			const csrfToken = document
				.querySelector('meta[name="csrf-token"]')
				?.getAttribute("content");

			const response = await fetch(`/api/employees/${employeeToDelete.id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					...(csrfToken ? { "X-CSRF-TOKEN": csrfToken } : {}),
				},
			});

			if (response.ok) {
				const result = await response.json();
				setAlertConfig({
					type: "success",
					title: "Berhasil!",
					message: result.message || "Pegawai berhasil dihapus.",
					autoClose: true,
					autoCloseDelay: 2000,
				});
				setShowAlert(true);

				// Refresh the page to show updated data
				setTimeout(() => {
					router.reload();
					setShowAlert(false);
				}, 2000);
			} else {
				const result = await response.json();
				setAlertConfig({
					type: "error",
					title: "Gagal Menghapus",
					message:
						result.message || "Terjadi kesalahan saat menghapus pegawai.",
					autoClose: false,
				});
				setShowAlert(true);
			}
		} catch (error) {
			setAlertConfig({
				type: "error",
				title: "Kesalahan Jaringan",
				message: "Terjadi kesalahan jaringan saat menghapus pegawai.",
				autoClose: false,
			});
			setShowAlert(true);
		} finally {
			setShowDeleteConfirmation(false);
			setEmployeeToDelete(null);
		}
	};

	const cancelDelete = () => {
		setShowDeleteConfirmation(false);
		setEmployeeToDelete(null);
	};

	const handleCreateSuccess = () => {
		// Refresh the page to show new data
		router.reload();
	};

	const handleCreateUser = (employee) => {
		setSelectedEmployee(employee);
		setIsCreateUserModalOpen(true);
	};

	const handleCreateUserSuccess = () => {
		setIsCreateUserModalOpen(false);
		setSelectedEmployee(null);
		// Show success message
		setAlertConfig({
			type: "success",
			title: "Berhasil!",
			message: "User berhasil dibuat/diperbarui dari data pegawai.",
			autoClose: true,
			autoCloseDelay: 3000,
		});
		setShowAlert(true);
	};

	const getStatusBadge = (status) => {
		const statusColors = {
			AKTIF:
				"bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
			NONAKTIF: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
			CUTI:
				"bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
			RESIGN: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
		};

		return (
			<span
				className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
					statusColors[status] || "bg-gray-100 text-gray-800"
				}`}
			>
				{status}
			</span>
		);
	};

	const getEmployeeTypeBadge = (type) => {
		const typeColors = {
			TETAP: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
			KONTRAK:
				"bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
			MAGANG:
				"bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
			HONORER:
				"bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
		};

		return (
			<span
				className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
					typeColors[type] || "bg-gray-100 text-gray-800"
				}`}
			>
				{type}
			</span>
		);
	};

	return (
		<AppLayout>
			<Head title="Data Pegawai" />

			<div className="space-y-6 -mt-6 -mx-6 p-6">
				{/* Header */}
				<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
					<div className="p-6">
						<div className="flex justify-between items-center">
							<div>
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
									Data Pegawai
								</h2>
								<p className="text-gray-600 dark:text-gray-400 mt-1">
									Kelola data pegawai rumah sakit
								</p>
							</div>
							<button
								onClick={() => setIsCreateModalOpen(true)}
								className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg font-medium text-sm whitespace-nowrap transform hover:scale-105"
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
								<span>Tambah Pegawai</span>
							</button>
						</div>
					</div>
				</div>

				{/* Search and Filters */}
				<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
					<div className="p-6">
						<form onSubmit={handleSearch} className="flex gap-4">
							<div className="flex-1">
								<input
									type="text"
									value={search}
									onChange={(e) => setSearch(e.target.value)}
									placeholder="Cari berdasarkan nama, NIK, jabatan, atau departemen..."
									className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								/>
							</div>
							<button
								type="submit"
								className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
							>
								Cari
							</button>
							{search && (
								<button
									type="button"
									onClick={() => {
										setSearch("");
										router.get(route("employees.index"));
									}}
									className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg transition-colors"
								>
									Reset
								</button>
							)}
						</form>
					</div>
				</div>

				{/* Data Table */}
				<ResponsiveTable
					columns={[
						{
							key: "nik",
							header: "NIK",
							render: (employee) => (
								<span className="font-medium text-gray-900 dark:text-white">
									{employee.nik}
								</span>
							),
						},
						{
							key: "nama",
							header: "Nama Pegawai",
							render: (employee) => (
								<div className="flex items-center">
									<div className="flex-shrink-0 h-10 w-10">
										<div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
											<span className="text-white font-medium text-sm">
												{employee.nama
													? employee.nama.charAt(0).toUpperCase()
													: "?"}
											</span>
										</div>
									</div>
									<div className="ml-4">
										<div className="text-sm font-medium text-gray-900 dark:text-white">
											{employee.nama || "-"}
										</div>
										<div className="text-sm text-gray-500 dark:text-gray-400">
											{employee.jk || "-"}
										</div>
									</div>
								</div>
							),
						},
						{
							key: "jbtn",
							header: "Jabatan",
							render: (employee) => (
								<span className="text-gray-900 dark:text-white">
									{employee.jbtn || "-"}
								</span>
							),
						},
						{
							key: "departemen",
							header: "Departemen",
							render: (employee) => (
								<span className="text-gray-500 dark:text-gray-400">
									{employee.departemen || "-"}
								</span>
							),
						},
						{
							key: "actions",
							header: "Aksi",
							hideOnMobile: true,
							render: (employee) => (
								<ActionDropdown
									item={employee}
									viewRoute="employees.show"
									editRoute="employees.edit"
									onDelete={handleDelete}
									onCreateUser={handleCreateUser}
								/>
							),
						},
					]}
					data={employees.data}
					keyField="id"
					emptyMessage="Tidak ada data pegawai"
					emptyIcon={
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-16 h-16 text-gray-400"
						>
							<path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
						</svg>
					}
					mobileCardRender={(employee) => (
						<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-4">
							<div className="flex items-start justify-between">
								<div className="flex-1">
									{/* Avatar dan Nama */}
									<div className="flex items-center mb-3">
										<div className="flex-shrink-0 h-12 w-12">
											<div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
												<span className="text-white font-medium text-lg">
													{employee.nama
														? employee.nama.charAt(0).toUpperCase()
														: "?"}
												</span>
											</div>
										</div>
										<div className="ml-4">
											<div className="text-lg font-medium text-gray-900 dark:text-white">
												{employee.nama || "-"}
											</div>
											<div className="text-sm text-gray-500 dark:text-gray-400">
												{employee.jk || "-"}
											</div>
										</div>
									</div>

									{/* Detail Info */}
									<div className="space-y-2">
										<div>
											<span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
												NIK:
											</span>
											<div className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
												{employee.nik}
											</div>
										</div>
										<div>
											<span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
												Jabatan:
											</span>
											<div className="mt-1 text-sm text-gray-900 dark:text-white">
												{employee.jbtn || "-"}
											</div>
										</div>
										<div>
											<span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
												Departemen:
											</span>
											<div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
												{employee.departemen || "-"}
											</div>
										</div>
									</div>
								</div>

								{/* Action Dropdown */}
								<div className="ml-4">
									<ActionDropdown
										item={employee}
										viewRoute="employees.show"
										editRoute="employees.edit"
										onDelete={handleDelete}
										onCreateUser={handleCreateUser}
									/>
								</div>
							</div>
						</div>
					)}
				/>

				{/* Pagination */}
				<Pagination
					links={employees.links}
					from={employees.from}
					to={employees.to}
					total={employees.total}
				/>

				{/* Create Employee Modal */}
				<EmployeeCreateModal
					isOpen={isCreateModalOpen}
					onClose={() => setIsCreateModalOpen(false)}
					onSuccess={handleCreateSuccess}
				/>

				{/* Create User from Employee Modal */}
				<CreateUserFromEmployeeModal
					isOpen={isCreateUserModalOpen}
					onClose={() => {
						setIsCreateUserModalOpen(false);
						setSelectedEmployee(null);
					}}
					onSuccess={handleCreateUserSuccess}
					employee={selectedEmployee}
				/>

				{/* Delete Confirmation Alert */}
				<ConfirmationAlert
					isOpen={showDeleteConfirmation}
					type="danger"
					title="Hapus Pegawai"
					itemName={employeeToDelete?.nama}
					itemType="pegawai"
					confirmText="Ya, Hapus"
					cancelText="Batal"
					onConfirm={confirmDelete}
					onCancel={cancelDelete}
					onClose={cancelDelete}
				/>

				{/* Success/Error Alert */}
				<Alert
					isOpen={showAlert}
					type={alertConfig.type}
					title={alertConfig.title}
					message={alertConfig.message}
					autoClose={alertConfig.autoClose}
					autoCloseDelay={alertConfig.autoCloseDelay}
					onClose={() => setShowAlert(false)}
				/>
			</div>
		</AppLayout>
	);
}
