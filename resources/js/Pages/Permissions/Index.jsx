import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import ResponsiveTable from "@/Components/ResponsiveTable";
import Button from "@/Components/Button";
import Modal from "@/Components/Modal";
import RoleForm from "./RoleForm";
import PermissionForm from "./PermissionForm";
import { route } from "ziggy-js";

export default function PermissionsIndex() {
	const [roles, setRoles] = useState([]);
	const [permissions, setPermissions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState("roles");
	const [showRoleModal, setShowRoleModal] = useState(false);
	const [showPermissionModal, setShowPermissionModal] = useState(false);
	const [editingRole, setEditingRole] = useState(null);
	const [editingPermission, setEditingPermission] = useState(null);

	// Fetch data
	const fetchRoles = async () => {
		try {
			const response = await fetch(route("api.permissions.roles.index"));
			const data = await response.json();
			if (data.success) {
				setRoles(data.data);
			}
		} catch (error) {
			console.error("Error fetching roles:", error);
		}
	};

	const fetchPermissions = async () => {
		try {
			const response = await fetch(route("api.permissions.index"));
			const data = await response.json();
			if (data.success) {
				setPermissions(data.data);
			}
		} catch (error) {
			console.error("Error fetching permissions:", error);
		}
	};

	useEffect(() => {
		const loadData = async () => {
			setLoading(true);
			await Promise.all([fetchRoles(), fetchPermissions()]);
			setLoading(false);
		};
		loadData();
	}, []);

	// Role columns
	const roleColumns = [
		{
			key: "name",
			header: "Nama Role",
			render: (role) => (
				<div className="flex items-center gap-3">
					<div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-4 h-4 text-blue-600 dark:text-blue-400"
						>
							<path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01.99L14 10.5c-.47-.62-1.21-.99-2.01-.99H9.46c-.8 0-1.54.37-2.01.99L6 10.5c-.47-.62-1.21-.99-2.01-.99H2.46c-.8 0-1.54.37-2.01.99L0 10.5v9.5h2v6h2v-6h2v6h2v-6h2v6h2v-6h2v6h2v-6h2v6h2z" />
						</svg>
					</div>
					<div>
						<div className="font-medium text-gray-900 dark:text-white">
							{role.name}
						</div>
						<div className="text-sm text-gray-500 dark:text-gray-400">
							{role.guard_name}
						</div>
					</div>
				</div>
			),
		},
		{
			key: "permissions",
			header: "Permissions",
			render: (role) => (
				<div className="flex flex-wrap gap-1">
					{role.permissions?.slice(0, 3).map((permission, index) => (
						<span
							key={index}
							className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
						>
							{permission.name}
						</span>
					))}
					{role.permissions?.length > 3 && (
						<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
							+{role.permissions.length - 3} lainnya
						</span>
					)}
				</div>
			),
		},
		{
			key: "created_at",
			header: "Dibuat",
			render: (role) => new Date(role.created_at).toLocaleDateString("id-ID"),
		},
		{
			key: "actions",
			header: "Aksi",
			render: (role) => (
				<div className="flex items-center gap-2">
					<button
						onClick={() => {
							setEditingRole(role);
							setShowRoleModal(true);
						}}
						className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
						title="Edit Role"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-4 h-4"
						>
							<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
						</svg>
					</button>
					<button
						onClick={() => handleDeleteRole(role.id)}
						className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
						title="Hapus Role"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-4 h-4"
						>
							<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
						</svg>
					</button>
				</div>
			),
		},
	];

	// Permission columns
	const permissionColumns = [
		{
			key: "name",
			header: "Nama Permission",
			render: (permission) => (
				<div className="flex items-center gap-3">
					<div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-4 h-4 text-purple-600 dark:text-purple-400"
						>
							<path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
						</svg>
					</div>
					<div>
						<div className="font-medium text-gray-900 dark:text-white">
							{permission.name}
						</div>
						<div className="text-sm text-gray-500 dark:text-gray-400">
							{permission.guard_name}
						</div>
					</div>
				</div>
			),
		},
		{
			key: "created_at",
			header: "Dibuat",
			render: (permission) =>
				new Date(permission.created_at).toLocaleDateString("id-ID"),
		},
		{
			key: "actions",
			header: "Aksi",
			render: (permission) => (
				<div className="flex items-center gap-2">
					<button
						onClick={() => {
							setEditingPermission(permission);
							setShowPermissionModal(true);
						}}
						className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
						title="Edit Permission"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-4 h-4"
						>
							<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
						</svg>
					</button>
					<button
						onClick={() => handleDeletePermission(permission.id)}
						className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
						title="Hapus Permission"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-4 h-4"
						>
							<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
						</svg>
					</button>
				</div>
			),
		},
	];

	// Handlers
	const handleDeleteRole = async (roleId) => {
		if (!confirm("Apakah Anda yakin ingin menghapus role ini?")) return;

		try {
			const response = await fetch(
				route("api.permissions.roles.destroy", roleId),
				{
					method: "DELETE",
				}
			);
			const data = await response.json();

			if (data.success) {
				await fetchRoles();
			} else {
				alert(data.message);
			}
		} catch (error) {
			console.error("Error deleting role:", error);
			alert("Gagal menghapus role");
		}
	};

	const handleDeletePermission = async (permissionId) => {
		if (!confirm("Apakah Anda yakin ingin menghapus permission ini?")) return;

		try {
			const response = await fetch(
				route("api.permissions.destroy", permissionId),
				{
					method: "DELETE",
				}
			);
			const data = await response.json();

			if (data.success) {
				await fetchPermissions();
			} else {
				alert(data.message);
			}
		} catch (error) {
			console.error("Error deleting permission:", error);
			alert("Gagal menghapus permission");
		}
	};

	const handleRoleSubmit = async (roleData) => {
		try {
			const url = editingRole
				? route("api.permissions.roles.update", editingRole.id)
				: route("api.permissions.roles.store");
			const method = editingRole ? "PUT" : "POST";

			const response = await fetch(url, {
				method,
				headers: {
					"Content-Type": "application/json",
					"X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')
						.content,
				},
				body: JSON.stringify(roleData),
			});

			const data = await response.json();

			if (data.success) {
				setShowRoleModal(false);
				setEditingRole(null);
				await fetchRoles();
			} else {
				alert(data.message);
			}
		} catch (error) {
			console.error("Error saving role:", error);
			alert("Gagal menyimpan role");
		}
	};

	const handlePermissionSubmit = async (permissionData) => {
		try {
			const url = editingPermission
				? route("api.permissions.update", editingPermission.id)
				: route("api.permissions.store");
			const method = editingPermission ? "PUT" : "POST";

			const response = await fetch(url, {
				method,
				headers: {
					"Content-Type": "application/json",
					"X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')
						.content,
				},
				body: JSON.stringify(permissionData),
			});

			const data = await response.json();

			if (data.success) {
				setShowPermissionModal(false);
				setEditingPermission(null);
				await fetchPermissions();
			} else {
				alert(data.message);
			}
		} catch (error) {
			console.error("Error saving permission:", error);
			alert("Gagal menyimpan permission");
		}
	};

	if (loading) {
		return (
			<AppLayout title="Permission Management">
				<div className="flex items-center justify-center h-64">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
				</div>
			</AppLayout>
		);
	}

	return (
		<AppLayout title="Permission Management">
			<Head title="Permission Management" />

			<div className="space-y-6">
				{/* Header */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h1 className="text-2xl font-bold text-gray-900 dark:text-white">
							Permission Management
						</h1>
						<p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
							Kelola roles dan permissions untuk sistem
						</p>
					</div>
				</div>

				{/* Tabs */}
				<div className="border-b border-gray-200 dark:border-gray-700">
					<nav className="-mb-px flex space-x-8">
						<button
							onClick={() => setActiveTab("roles")}
							className={`py-2 px-1 border-b-2 font-medium text-sm ${
								activeTab === "roles"
									? "border-blue-500 text-blue-600 dark:text-blue-400"
									: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
							}`}
						>
							Roles ({roles.length})
						</button>
						<button
							onClick={() => setActiveTab("permissions")}
							className={`py-2 px-1 border-b-2 font-medium text-sm ${
								activeTab === "permissions"
									? "border-blue-500 text-blue-600 dark:text-blue-400"
									: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
							}`}
						>
							Permissions ({permissions.length})
						</button>
					</nav>
				</div>

				{/* Content */}
				{activeTab === "roles" && (
					<div className="space-y-4">
						<div className="flex justify-end">
							<Button
								onClick={() => {
									setEditingRole(null);
									setShowRoleModal(true);
								}}
								className="bg-blue-600 hover:bg-blue-700 text-white"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="w-4 h-4 mr-2"
								>
									<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
								</svg>
								Tambah Role
							</Button>
						</div>

						<ResponsiveTable
							columns={roleColumns}
							data={roles}
							keyField="id"
							emptyMessage="Belum ada roles"
							emptyIcon={
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="w-12 h-12 text-gray-400"
								>
									<path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01.99L14 10.5c-.47-.62-1.21-.99-2.01-.99H9.46c-.8 0-1.54.37-2.01.99L6 10.5c-.47-.62-1.21-.99-2.01-.99H2.46c-.8 0-1.54.37-2.01.99L0 10.5v9.5h2v6h2v-6h2v6h2v-6h2v6h2v-6h2v6h2v-6h2v6h2z" />
								</svg>
							}
						/>
					</div>
				)}

				{activeTab === "permissions" && (
					<div className="space-y-4">
						<div className="flex justify-end">
							<Button
								onClick={() => {
									setEditingPermission(null);
									setShowPermissionModal(true);
								}}
								className="bg-purple-600 hover:bg-purple-700 text-white"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="w-4 h-4 mr-2"
								>
									<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
								</svg>
								Tambah Permission
							</Button>
						</div>

						<ResponsiveTable
							columns={permissionColumns}
							data={permissions}
							keyField="id"
							emptyMessage="Belum ada permissions"
							emptyIcon={
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="w-12 h-12 text-gray-400"
								>
									<path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
								</svg>
							}
						/>
					</div>
				)}
			</div>

			{/* Role Modal */}
			<Modal
				show={showRoleModal}
				onClose={() => {
					setShowRoleModal(false);
					setEditingRole(null);
				}}
				title={editingRole ? "Edit Role" : "Tambah Role"}
			>
				<RoleForm
					role={editingRole}
					permissions={permissions}
					onSubmit={handleRoleSubmit}
					onCancel={() => {
						setShowRoleModal(false);
						setEditingRole(null);
					}}
				/>
			</Modal>

			{/* Permission Modal */}
			<Modal
				show={showPermissionModal}
				onClose={() => {
					setShowPermissionModal(false);
					setEditingPermission(null);
				}}
				title={editingPermission ? "Edit Permission" : "Tambah Permission"}
			>
				<PermissionForm
					permission={editingPermission}
					onSubmit={handlePermissionSubmit}
					onCancel={() => {
						setShowPermissionModal(false);
						setEditingPermission(null);
					}}
				/>
			</Modal>
		</AppLayout>
	);
}
