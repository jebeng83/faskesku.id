import React, { useState, useEffect } from "react";
import Button from "@/Components/Button";

export default function PermissionForm({ permission, onSubmit, onCancel }) {
	const [formData, setFormData] = useState({
		name: "",
		guard_name: "web",
	});
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (permission) {
			setFormData({
				name: permission.name || "",
				guard_name: permission.guard_name || "web",
			});
		}
	}, [permission]);

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

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			{/* Permission Name */}
			<div>
				<label
					htmlFor="name"
					className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
				>
					Nama Permission *
				</label>
				<input
					type="text"
					id="name"
					name="name"
					value={formData.name}
					onChange={handleInputChange}
					className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
						errors.name ? "border-red-500" : "border-gray-300"
					}`}
					placeholder="Masukkan nama permission (contoh: view-patients)"
					required
				/>
				{errors.name && (
					<p className="mt-1 text-sm text-red-600 dark:text-red-400">
						{errors.name}
					</p>
				)}
				<p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
					Gunakan format kebab-case, contoh: view-patients, create-employees,
					edit-settings
				</p>
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
					className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
				>
					<option value="web">Web</option>
					<option value="api">API</option>
				</select>
			</div>

			{/* Permission Examples */}
			<div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4">
				<h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
					Contoh Permission yang Umum Digunakan:
				</h4>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
					<div>
						<strong>CRUD Operations:</strong>
						<ul className="ml-2 mt-1 space-y-1">
							<li>• view-{"{resource}"}</li>
							<li>• create-{"{resource}"}</li>
							<li>• edit-{"{resource}"}</li>
							<li>• delete-{"{resource}"}</li>
						</ul>
					</div>
					<div>
						<strong>Specific Actions:</strong>
						<ul className="ml-2 mt-1 space-y-1">
							<li>• generate-reports</li>
							<li>• export-data</li>
							<li>• manage-settings</li>
							<li>• view-analytics</li>
						</ul>
					</div>
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
					className="bg-purple-600 hover:bg-purple-700 text-white"
				>
					{loading ? (
						<div className="flex items-center">
							<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
							Menyimpan...
						</div>
					) : permission ? (
						"Update Permission"
					) : (
						"Buat Permission"
					)}
				</Button>
			</div>
		</form>
	);
}
