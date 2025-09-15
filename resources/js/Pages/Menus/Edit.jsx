import React, { useState, useEffect } from "react";
import { Head, Link, useForm, usePage, router } from "@inertiajs/react";
import { route as ziggy } from "ziggy-js";
import AppLayout from "@/Layouts/AppLayout";
import { ArrowLeftIcon, EyeIcon } from "@heroicons/react/24/outline";

export default function Edit({ menu, parentMenus, permissions }) {
	const { data, setData, errors } = useForm({
		name: menu.name || "",
		slug: menu.slug || "",
		icon: menu.icon || "",
		route: menu.route || "",
		url: menu.url || "",
		parent_id: menu.parent_id || "",
		sort_order: menu.sort_order || "",
		is_active: menu.is_active ?? true,
		permission_name: menu.permission_name || "",
		description: menu.description || "",
	});

	const [iconOptions, setIconOptions] = useState({});
	const [showIconPreview, setShowIconPreview] = useState(false);
	const [autoGenerateSlug, setAutoGenerateSlug] = useState(false);
	const [processing, setProcessing] = useState(false);

	// Fetch available icons
	useEffect(() => {
		fetch(route("api.menus.icons"))
			.then((response) => response.json())
			.then((data) => setIconOptions(data.icons))
			.catch((error) => console.error("Error fetching icons:", error));
	}, []);

	// Auto-generate slug from name (only if enabled)
	useEffect(() => {
		if (autoGenerateSlug && data.name) {
			const slug = data.name
				.toLowerCase()
				.replace(/[^a-z0-9\s-]/g, "")
				.replace(/\s+/g, "-")
				.replace(/-+/g, "-")
				.trim();
			setData("slug", slug);
		}
	}, [data.name, autoGenerateSlug]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setProcessing(true);
		// Gunakan path eksplisit agar tidak tergantung resolver route
		const updateUrl = `/menus/${encodeURIComponent(menu.id)}`;
		console.log("[Menus/Edit] Submitting PUT", {
			id: menu.id,
			updateUrl,
			data,
		});

		router.put(updateUrl, data, {
			onSuccess: () => {
				setProcessing(false);
				// Redirect will be handled by controller response
			},
			onError: (errors) => {
				setProcessing(false);
				console.error("Form submission errors:", errors);
			},
			onFinish: () => {
				setProcessing(false);
			},
		});
	};

	const handleSlugChange = (e) => {
		setData("slug", e.target.value);
		setAutoGenerateSlug(false);
	};

	const handleNameChange = (e) => {
		setData("name", e.target.value);
	};

	const enableAutoSlug = () => {
		setAutoGenerateSlug(true);
	};

	const commonIcons = [
		{ key: "dashboard", icon: "fas fa-tachometer-alt", name: "Dashboard" },
		{ key: "users", icon: "fas fa-users", name: "Users" },
		{ key: "user", icon: "fas fa-user", name: "User" },
		{ key: "settings", icon: "fas fa-cog", name: "Settings" },
		{ key: "menu", icon: "fas fa-bars", name: "Menu" },
		{ key: "home", icon: "fas fa-home", name: "Home" },
		{ key: "hospital", icon: "fas fa-hospital", name: "Hospital" },
		{ key: "stethoscope", icon: "fas fa-stethoscope", name: "Stethoscope" },
		{ key: "user-md", icon: "fas fa-user-md", name: "Doctor" },
		{ key: "heartbeat", icon: "fas fa-heartbeat", name: "Heartbeat" },
		{ key: "file", icon: "fas fa-file", name: "File" },
		{ key: "folder", icon: "fas fa-folder", name: "Folder" },
		{ key: "chart", icon: "fas fa-chart-bar", name: "Chart" },
		{ key: "table", icon: "fas fa-table", name: "Table" },
		{ key: "calendar", icon: "fas fa-calendar", name: "Calendar" },
		{ key: "envelope", icon: "fas fa-envelope", name: "Envelope" },
		{ key: "bell", icon: "fas fa-bell", name: "Bell" },
		{ key: "search", icon: "fas fa-search", name: "Search" },
		{ key: "plus", icon: "fas fa-plus", name: "Plus" },
		{ key: "edit", icon: "fas fa-edit", name: "Edit" },
		{ key: "trash", icon: "fas fa-trash", name: "Trash" },
		{ key: "eye", icon: "fas fa-eye", name: "Eye" },
		{ key: "lock", icon: "fas fa-lock", name: "Lock" },
		{ key: "unlock", icon: "fas fa-unlock", name: "Unlock" },
		{ key: "key", icon: "fas fa-key", name: "Key" },
		{ key: "shield", icon: "fas fa-shield-alt", name: "Shield" },
		{ key: "pills", icon: "fas fa-pills", name: "Pills" },
	];

	return (
		<AppLayout>
			<Head title={`Edit Menu - ${menu.name}`} />

			<div className="py-12">
				<div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
					<div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
						<div className="p-6 bg-white border-b border-gray-200">
							<div className="flex items-center justify-between mb-6">
								<div>
									<h2 className="text-2xl font-bold text-gray-900">
										Edit Menu
									</h2>
									<p className="text-gray-600">Edit menu "{menu.name}"</p>
								</div>
								<div className="flex space-x-2">
									<Link
										href={route("menus.show", menu.id)}
										className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700"
									>
										<EyeIcon className="h-4 w-4 mr-2" />
										Detail
									</Link>
									<Link
										href={route("menus.index")}
										className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700"
									>
										<ArrowLeftIcon className="h-4 w-4 mr-2" />
										Kembali
									</Link>
								</div>
							</div>

							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									{/* Nama Menu */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Nama Menu <span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											value={data.name}
											onChange={handleNameChange}
											className={`w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
												errors.name ? "border-red-300" : ""
											}`}
											placeholder="Masukkan nama menu"
										/>
										{errors.name && (
											<p className="mt-1 text-sm text-red-600">{errors.name}</p>
										)}
									</div>

									{/* Slug */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Slug
										</label>
										<div className="flex">
											<input
												type="text"
												value={data.slug}
												onChange={handleSlugChange}
												className={`flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
													errors.slug ? "border-red-300" : ""
												}`}
												placeholder="Auto-generated dari nama"
											/>
											<button
												type="button"
												onClick={enableAutoSlug}
												className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-200 text-sm"
												title="Generate slug dari nama"
											>
												Auto
											</button>
										</div>
										{errors.slug && (
											<p className="mt-1 text-sm text-red-600">{errors.slug}</p>
										)}
									</div>

									{/* Parent Menu */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Parent Menu
										</label>
										<select
											value={data.parent_id}
											onChange={(e) => setData("parent_id", e.target.value)}
											className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
										>
											<option value="">Root Menu (Tidak ada parent)</option>
											{parentMenus.map((parent) => (
												<option key={parent.id} value={parent.id}>
													{parent.name}
												</option>
											))}
										</select>
										{errors.parent_id && (
											<p className="mt-1 text-sm text-red-600">
												{errors.parent_id}
											</p>
										)}
									</div>

									{/* Sort Order */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Urutan
										</label>
										<input
											type="number"
											value={data.sort_order}
											onChange={(e) => setData("sort_order", e.target.value)}
											className={`w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
												errors.sort_order ? "border-red-300" : ""
											}`}
											placeholder="0"
											min="0"
										/>
										{errors.sort_order && (
											<p className="mt-1 text-sm text-red-600">
												{errors.sort_order}
											</p>
										)}
									</div>
								</div>

								{/* Icon Selection */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Icon
									</label>
									<div className="flex items-center space-x-4 mb-4">
										<input
											type="text"
											value={data.icon}
											onChange={(e) => setData("icon", e.target.value)}
											className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
											placeholder="fas fa-home"
										/>
										<button
											type="button"
											onClick={() => setShowIconPreview(!showIconPreview)}
											className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
										>
											<EyeIcon className="h-4 w-4" />
										</button>
										{data.icon && (
											<div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-md">
												<i className={`${data.icon} text-gray-600`}></i>
											</div>
										)}
									</div>

									{showIconPreview && (
										<div className="grid grid-cols-6 md:grid-cols-12 gap-2 p-4 bg-gray-50 rounded-lg max-h-64 overflow-y-auto">
											{commonIcons.map(({ key, icon, name }) => (
												<button
													key={key}
													type="button"
													onClick={() => setData("icon", icon)}
													className={`p-3 rounded-md border text-center hover:bg-white transition-colors ${
														data.icon === icon
															? "bg-indigo-100 border-indigo-300"
															: "bg-white border-gray-200"
													}`}
													title={name}
												>
													<i className={`${icon} text-gray-600`}></i>
												</button>
											))}
										</div>
									)}
									{errors.icon && (
										<p className="mt-1 text-sm text-red-600">{errors.icon}</p>
									)}
								</div>

								{/* Route and URL */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Route Name
										</label>
										<input
											type="text"
											value={data.route}
											onChange={(e) => setData("route", e.target.value)}
											className={`w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
												errors.route ? "border-red-300" : ""
											}`}
											placeholder="dashboard"
										/>
										<p className="mt-1 text-xs text-gray-500">
											Nama route Laravel (tanpa 'route()' function)
										</p>
										{errors.route && (
											<p className="mt-1 text-sm text-red-600">
												{errors.route}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											URL Manual
										</label>
										<input
											type="text"
											value={data.url}
											onChange={(e) => setData("url", e.target.value)}
											className={`w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
												errors.url ? "border-red-300" : ""
											}`}
											placeholder="/custom-url"
										/>
										<p className="mt-1 text-xs text-gray-500">
											Gunakan jika tidak menggunakan route name
										</p>
										{errors.url && (
											<p className="mt-1 text-sm text-red-600">{errors.url}</p>
										)}
									</div>
								</div>

								{/* Permission */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Permission
									</label>
									<select
										value={data.permission_name}
										onChange={(e) => setData("permission_name", e.target.value)}
										className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
									>
										<option value="">
											Tidak ada permission (semua user bisa akses)
										</option>
										{permissions.map((permission) => (
											<option key={permission.name} value={permission.name}>
												{permission.name}
											</option>
										))}
									</select>
									{errors.permission_name && (
										<p className="mt-1 text-sm text-red-600">
											{errors.permission_name}
										</p>
									)}
								</div>

								{/* Description */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Deskripsi
									</label>
									<textarea
										value={data.description}
										onChange={(e) => setData("description", e.target.value)}
										rows="3"
										className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
										placeholder="Deskripsi menu (opsional)"
									/>
									{errors.description && (
										<p className="mt-1 text-sm text-red-600">
											{errors.description}
										</p>
									)}
								</div>

								{/* Status */}
								<div>
									<div className="flex items-center">
										<input
											type="checkbox"
											id="is_active"
											checked={data.is_active}
											onChange={(e) => setData("is_active", e.target.checked)}
											className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
										/>
										<label
											htmlFor="is_active"
											className="ml-2 block text-sm text-gray-900"
										>
											Menu aktif
										</label>
									</div>
									<p className="mt-1 text-xs text-gray-500">
										Menu yang tidak aktif tidak akan ditampilkan di sidebar
									</p>
								</div>

								{/* Submit Buttons */}
								<div className="flex items-center justify-end space-x-4 pt-6">
									<Link
										href={route("menus.index")}
										className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
									>
										Batal
									</Link>
									<button
										type="submit"
										disabled={processing}
										className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
									>
										{processing ? "Menyimpan..." : "Simpan Perubahan"}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</AppLayout>
	);
}
