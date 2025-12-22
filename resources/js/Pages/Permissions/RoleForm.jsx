import React, { useState, useEffect } from "react";
import Button from "@/Components/Button";

export default function RoleForm({ role, permissions, onSubmit, onCancel }) {
	const [formData, setFormData] = useState({
		name: "",
		guard_name: "web",
		permissions: [],
	});
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [permissionSearch, setPermissionSearch] = useState("");

	useEffect(() => {
		if (role) {
			setFormData({
				name: role.name || "",
				guard_name: role.guard_name || "web",
				permissions: role.permissions?.map((p) => p.id) || [],
			});
		}
	}, [role]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Clear error when user starts typing
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: null,
			}));
		}
	};

	const handlePermissionChange = (permissionId) => {
		setFormData((prev) => ({
			...prev,
			permissions: prev.permissions.includes(permissionId)
				? prev.permissions.filter((id) => id !== permissionId)
				: [...prev.permissions, permissionId],
		}));
	};

	const handleSelectAll = () => {
		setFormData((prev) => ({
			...prev,
			permissions: permissions.reduce((ids, permission) => {
				if (
					permission.name
						.toLowerCase()
						.includes(permissionSearch.toLowerCase())
				) {
					ids.push(permission.id);
				}
				return ids;
			}, []),
		}));
	};

	const handleDeselectAll = () => {
		setFormData((prev) => ({
			...prev,
			permissions: [],
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setErrors({});

		try {
			await onSubmit(formData);
		} catch (error) {
			console.error("Error submitting form:", error);
		} finally {
			setLoading(false);
		}
	};

	const filteredPermissions = permissions.filter((permission) =>
		permission.name.toLowerCase().includes(permissionSearch.toLowerCase())
	);

	const groupedPermissions = filteredPermissions.reduce((groups, permission) => {
		const category = permission.name.split("-")[0];
		if (!groups[category]) {
			groups[category] = [];
		}
		groups[category].push(permission);
		return groups;
	}, {});

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			{/* Role Name */}
			<div>
				<label
					htmlFor="name"
					className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
				>
					Nama Role *
				</label>
				<input
					type="text"
					id="name"
					name="name"
					value={formData.name}
					onChange={handleInputChange}
					className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
						errors.name ? "border-red-500" : "border-gray-300"
					}`}
					placeholder="Masukkan nama role"
					required
				/>
				{errors.name && (
					<p className="mt-1 text-sm text-red-600 dark:text-red-400">
						{errors.name}
					</p>
				)}
			</div>

			{/* Guard Name */}
			<div>
				<label
					htmlFor="guard_name"
					className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
				>
					Guard Name
				</label>
				<select
					id="guard_name"
					name="guard_name"
					value={formData.guard_name}
					onChange={handleInputChange}
					className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
				>
					<option value="web">Web</option>
					<option value="api">API</option>
				</select>
			</div>

			{/* Permissions */}
			<div>
				<div className="flex items-center justify-between mb-4">
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
						Permissions
					</label>
					<div className="flex items-center gap-2">
						<input
							type="text"
							value={permissionSearch}
							onChange={(e) => setPermissionSearch(e.target.value)}
							placeholder="Cari permission..."
							className="w-48 px-2 py-1 text-xs border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
						/>
						<button
							type="button"
							onClick={handleSelectAll}
							className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
						>
							Pilih Semua
						</button>
						<span className="text-gray-300">|</span>
						<button
							type="button"
							onClick={handleDeselectAll}
							className="text-xs text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
						>
							Batal Pilih
						</button>
					</div>
				</div>

				<div className="max-h-64 overflow-y-auto border border-gray-200 dark:border-gray-600 rounded-md p-4 space-y-4">
					{Object.entries(groupedPermissions).map(
						([category, categoryPermissions]) => (
							<div key={category}>
								<h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 capitalize">
									{category}
								</h4>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
									{categoryPermissions.map((permission) => (
										<label
											key={permission.id}
											className="flex items-center space-x-2 text-sm"
										>
											<input
												type="checkbox"
												checked={formData.permissions.includes(permission.id)}
												onChange={() => handlePermissionChange(permission.id)}
												className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
											/>
											<span className="text-gray-700 dark:text-gray-300">
												{permission.name}
											</span>
										</label>
									))}
								</div>
							</div>
						)
					)}
				</div>
			</div>

			{/* Actions */}
			<div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
				<Button
					type="button"
					variant="secondary"
					onClick={onCancel}
					disabled={loading}
				>
					Batal
				</Button>
				<Button
					type="submit"
					disabled={loading}
					className="bg-blue-600 hover:bg-blue-700 text-white"
				>
					{loading ? (
						<div className="flex items-center">
							<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
							Menyimpan...
						</div>
					) : role ? (
						"Update Role"
					) : (
						"Buat Role"
					)}
				</Button>
			</div>
		</form>
	);
}
