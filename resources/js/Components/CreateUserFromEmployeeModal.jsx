import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";

export default function CreateUserFromEmployeeModal({
	isOpen,
	onClose,
	onSuccess,
	employee,
}) {
	const [formData, setFormData] = useState({
		name: "",
		username: "",
		password: "",
		password_confirmation: "",
		nik: "",
		roles: [],
	});
	const [roles, setRoles] = useState([]);
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({});
	const [isEditMode, setIsEditMode] = useState(false);
	const [existingUser, setExistingUser] = useState(null);

	// Load roles when modal opens
	useEffect(() => {
		if (isOpen) {
			fetchRoles();
		}
	}, [isOpen]);

	// Pre-fill form data when employee is selected
	useEffect(() => {
		if (employee && isOpen) {
			checkExistingUser(employee.nik);
		}
	}, [employee, isOpen]);

	const generateUsername = (name) => {
		if (!name) return "";
		return name.toLowerCase().replace(/\s+/g, "");
	};

	const fetchRoles = async () => {
		try {
			const rolesResponse = await axios.get("/api/users/roles");
			setRoles(rolesResponse.data.data);
		} catch (error) {
			console.error("Error fetching roles:", error);
		}
	};

	const checkExistingUser = async (nik) => {
		try {
			const response = await axios.get(`/api/users/check-by-nik/${nik}`);

			if (response.data.exists) {
				// User already exists, switch to edit mode
				setIsEditMode(true);
				setExistingUser(response.data.data);
				setFormData({
					name: response.data.data.name,
					username: response.data.data.username,
					password: "",
					password_confirmation: "",
					nik: response.data.data.nik,
					roles: response.data.data.roles.map((role) => role.name),
				});
			} else {
				// User doesn't exist, create new user
				setIsEditMode(false);
				setExistingUser(null);
				setFormData({
					name: employee.nama || "",
					username: generateUsername(employee.nama),
					password: "",
					password_confirmation: "",
					nik: employee.nik || "",
					roles: [],
				});
			}
		} catch (error) {
			console.error("Error checking existing user:", error);
			// Default to create mode if error
			setIsEditMode(false);
			setExistingUser(null);
			setFormData({
				name: employee.nama || "",
				username: generateUsername(employee.nama),
				password: "",
				password_confirmation: "",
				nik: employee.nik || "",
				roles: [],
			});
		}
	};

	const handleFormChange = (e) => {
		const { name, value, type, checked } = e.target;

		if (type === "checkbox") {
			if (name === "roles") {
				setFormData((prev) => ({
					...prev,
					[name]: checked
						? [...prev[name], value]
						: prev[name].filter((item) => item !== value),
				}));
			}
		} else {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors({});
		setLoading(true);

		const normalizeNik = (v) => {
			const s = String(v || "").trim();
			if (!s || s === "-" || s === "—") return null;
			return s;
		};

		const baseHeaders = {
			"Content-Type": "application/json",
			Accept: "application/json",
			"X-Requested-With": "XMLHttpRequest",
		};

		try {
			try {
				await axios.get("/sanctum/csrf-cookie", {
					withCredentials: true,
					headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
				});
				await new Promise((r) => setTimeout(r, 200));
			} catch (_) {}

			if (isEditMode && existingUser) {
				const payload = {
					...formData,
					nik: normalizeNik(formData.nik),
				};
				if (!payload.password) delete payload.password;
				if (!payload.password_confirmation) delete payload.password_confirmation;
				await axios.put(`/api/users/${existingUser.id}`, payload, {
					withCredentials: true,
					headers: baseHeaders,
				});
			} else {
				const payload = {
					...formData,
					nik: normalizeNik(formData.nik),
				};
				await axios.post("/api/users", payload, {
					withCredentials: true,
					headers: baseHeaders,
				});
			}
			onSuccess();
			onClose();
		} catch (error) {
			if (error.response?.status === 422) {
				setErrors(error.response.data.errors);
			}
		} finally {
			setLoading(false);
		}
	};

	const handleClose = () => {
		setFormData({
			name: "",
			username: "",
			password: "",
			password_confirmation: "",
			nik: "",
			roles: [],
		});
		setErrors({});
		setIsEditMode(false);
		setExistingUser(null);
		onClose();
	};

	return (
		<Modal
			show={isOpen}
			onClose={handleClose}
			title={isEditMode ? "Edit User Pegawai" : "Buat User dari Pegawai"}
			size="xl"
		>
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

					{/* NIK */}
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							NIK *
						</label>
						<input
							type="text"
							name="nik"
							value={formData.nik}
							onChange={handleFormChange}
							required
							className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
								errors.nik
									? "border-red-500"
									: "border-gray-300 dark:border-gray-600"
							}`}
						/>
						{errors.nik && (
							<p className="mt-1 text-sm text-red-600 dark:text-red-400">
								{errors.nik[0]}
							</p>
						)}
					</div>

					{/* Password */}
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							Password{" "}
							{isEditMode ? "(Kosongkan jika tidak ingin mengubah)" : "*"}
						</label>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleFormChange}
							required={!isEditMode}
				minLength={6}
							placeholder={
								isEditMode ? "Kosongkan jika tidak ingin mengubah password" : ""
							}
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
							{isEditMode ? "(Kosongkan jika tidak ingin mengubah)" : "*"}
						</label>
						<input
							type="password"
							name="password_confirmation"
							value={formData.password_confirmation}
							onChange={handleFormChange}
							required={!isEditMode}
				minLength={6}
							placeholder={
								isEditMode ? "Kosongkan jika tidak ingin mengubah password" : ""
							}
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
				</div>

				{/* Roles */}
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Roles
					</label>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
						{roles.map((role) => (
							<label key={role.id} className="flex items-center space-x-2">
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

				{/* Action Buttons */}
				<div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
					<button
						type="button"
						onClick={handleClose}
						className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						Batal
					</button>
					<button
						type="submit"
						disabled={loading}
						className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{loading
							? "Menyimpan..."
							: isEditMode
							? "Update User"
							: "Buat User"}
					</button>
				</div>
			</form>
		</Modal>
	);
}
