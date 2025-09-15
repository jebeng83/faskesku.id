import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import {
	ArrowLeftIcon,
	PencilIcon,
	PowerIcon,
	TrashIcon,
	ChevronRightIcon,
} from "@heroicons/react/24/outline";

export default function Show({ menu }) {
	const toggleStatus = () => {
		router.post(
			route("menus.toggle-status", menu.id),
			{},
			{
				preserveScroll: true,
			}
		);
	};

	const getStatusBadge = (isActive) => {
		return (
			<span
				className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
					isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
				}`}
			>
				{isActive ? "Aktif" : "Nonaktif"}
			</span>
		);
	};

	const formatDate = (dateString) => {
		if (!dateString) return "-";
		return new Date(dateString).toLocaleString("id-ID", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const getBreadcrumb = () => {
		if (!menu.parent) return [menu];

		const breadcrumb = [menu];
		let current = menu.parent;

		while (current) {
			breadcrumb.unshift(current);
			current = current.parent;
		}

		return breadcrumb;
	};

	const breadcrumb = getBreadcrumb();

	return (
		<AppLayout>
			<Head title={`Detail Menu - ${menu.name}`} />

			<div className="py-12">
				<div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
					<div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
						<div className="p-6 bg-white border-b border-gray-200">
							{/* Header */}
							<div className="flex items-center justify-between mb-6">
								<div>
									<h2 className="text-2xl font-bold text-gray-900">
										Detail Menu
									</h2>
									<p className="text-gray-600">
										Informasi lengkap menu "{menu.name}"
									</p>
								</div>
								<div className="flex space-x-2">
									<Link
										href={route("menus.edit", menu.id)}
										className="inline-flex items-center px-4 py-2 bg-yellow-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-yellow-700"
									>
										<PencilIcon className="h-4 w-4 mr-2" />
										Edit
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

							{/* Breadcrumb */}
							{breadcrumb.length > 1 && (
								<div className="mb-6 p-4 bg-gray-50 rounded-lg">
									<h3 className="text-sm font-medium text-gray-700 mb-2">
										Hierarki Menu:
									</h3>
									<nav className="flex" aria-label="Breadcrumb">
										<ol className="inline-flex items-center space-x-1 md:space-x-3">
											{breadcrumb.map((item, index) => (
												<li key={item.id} className="inline-flex items-center">
													{index > 0 && (
														<ChevronRightIcon className="w-4 h-4 text-gray-400 mx-2" />
													)}
													<div
														className={`flex items-center ${
															index === breadcrumb.length - 1
																? "text-indigo-600 font-medium"
																: "text-gray-500"
														}`}
													>
														{item.icon && (
															<i className={`${item.icon} mr-2`}></i>
														)}
														{item.name}
													</div>
												</li>
											))}
										</ol>
									</nav>
								</div>
							)}

							{/* Menu Details */}
							<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
								{/* Main Information */}
								<div className="lg:col-span-2 space-y-6">
									<div className="bg-gray-50 p-6 rounded-lg">
										<h3 className="text-lg font-medium text-gray-900 mb-4">
											Informasi Menu
										</h3>
										<dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
											<div>
												<dt className="text-sm font-medium text-gray-500">
													Nama Menu
												</dt>
												<dd className="mt-1 text-sm text-gray-900 flex items-center">
													{menu.icon && (
														<i
															className={`${menu.icon} mr-2 text-gray-600`}
														></i>
													)}
													{menu.name}
												</dd>
											</div>
											<div>
												<dt className="text-sm font-medium text-gray-500">
													Slug
												</dt>
												<dd className="mt-1 text-sm text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded">
													{menu.slug}
												</dd>
											</div>
											<div>
												<dt className="text-sm font-medium text-gray-500">
													Parent Menu
												</dt>
												<dd className="mt-1 text-sm text-gray-900">
													{menu.parent ? (
														<Link
															href={route("menus.show", menu.parent.id)}
															className="text-indigo-600 hover:text-indigo-800 flex items-center"
														>
															{menu.parent.icon && (
																<i className={`${menu.parent.icon} mr-2`}></i>
															)}
															{menu.parent.name}
														</Link>
													) : (
														<span className="text-gray-500">Root Menu</span>
													)}
												</dd>
											</div>
											<div>
												<dt className="text-sm font-medium text-gray-500">
													Urutan
												</dt>
												<dd className="mt-1 text-sm text-gray-900">
													{menu.sort_order}
												</dd>
											</div>
											<div>
												<dt className="text-sm font-medium text-gray-500">
													Status
												</dt>
												<dd className="mt-1">
													{getStatusBadge(menu.is_active)}
												</dd>
											</div>
											<div>
												<dt className="text-sm font-medium text-gray-500">
													ID
												</dt>
												<dd className="mt-1 text-sm text-gray-900 font-mono">
													#{menu.id}
												</dd>
											</div>
										</dl>
									</div>

									{/* Navigation */}
									<div className="bg-gray-50 p-6 rounded-lg">
										<h3 className="text-lg font-medium text-gray-900 mb-4">
											Navigasi
										</h3>
										<dl className="grid grid-cols-1 gap-4">
											<div>
												<dt className="text-sm font-medium text-gray-500">
													Route Name
												</dt>
												<dd className="mt-1 text-sm text-gray-900">
													{menu.route ? (
														<code className="bg-gray-100 px-2 py-1 rounded text-sm">
															{menu.route}
														</code>
													) : (
														<span className="text-gray-500">Tidak ada</span>
													)}
												</dd>
											</div>
											<div>
												<dt className="text-sm font-medium text-gray-500">
													URL Manual
												</dt>
												<dd className="mt-1 text-sm text-gray-900">
													{menu.url ? (
														<code className="bg-gray-100 px-2 py-1 rounded text-sm">
															{menu.url}
														</code>
													) : (
														<span className="text-gray-500">Tidak ada</span>
													)}
												</dd>
											</div>
											<div>
												<dt className="text-sm font-medium text-gray-500">
													URL Aktual
												</dt>
												<dd className="mt-1 text-sm text-gray-900">
													{menu.full_url && menu.full_url !== "#" ? (
														<a
															href={menu.full_url}
															target="_blank"
															rel="noopener noreferrer"
															className="text-indigo-600 hover:text-indigo-800 underline"
														>
															{menu.full_url}
														</a>
													) : (
														<span className="text-gray-500">Tidak ada URL</span>
													)}
												</dd>
											</div>
										</dl>
									</div>

									{/* Permission */}
									<div className="bg-gray-50 p-6 rounded-lg">
										<h3 className="text-lg font-medium text-gray-900 mb-4">
											Permission
										</h3>
										<dl>
											<div>
												<dt className="text-sm font-medium text-gray-500">
													Required Permission
												</dt>
												<dd className="mt-1 text-sm text-gray-900">
													{menu.permission_name ? (
														<span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md text-sm font-medium">
															{menu.permission_name}
														</span>
													) : (
														<span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm font-medium">
															Publik (Tidak ada permission)
														</span>
													)}
												</dd>
											</div>
										</dl>
									</div>

									{/* Description */}
									{menu.description && (
										<div className="bg-gray-50 p-6 rounded-lg">
											<h3 className="text-lg font-medium text-gray-900 mb-4">
												Deskripsi
											</h3>
											<p className="text-sm text-gray-700 leading-relaxed">
												{menu.description}
											</p>
										</div>
									)}
								</div>

								{/* Sidebar */}
								<div className="space-y-6">
									{/* Actions */}
									<div className="bg-gray-50 p-6 rounded-lg">
										<h3 className="text-lg font-medium text-gray-900 mb-4">
											Aksi
										</h3>
										<div className="space-y-3">
											<Link
												href={route("menus.edit", menu.id)}
												className="w-full inline-flex items-center justify-center px-4 py-2 bg-yellow-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-yellow-700"
											>
												<PencilIcon className="h-4 w-4 mr-2" />
												Edit Menu
											</Link>
											<button
												onClick={toggleStatus}
												className={`w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest ${
													menu.is_active
														? "bg-red-600 hover:bg-red-700"
														: "bg-green-600 hover:bg-green-700"
												}`}
											>
												<PowerIcon className="h-4 w-4 mr-2" />
												{menu.is_active ? "Nonaktifkan" : "Aktifkan"}
											</button>
											<Link
												href={route("menus.destroy", menu.id)}
												method="delete"
												as="button"
												className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700"
												onClick={(e) => {
													if (
														!confirm(
															"Apakah Anda yakin ingin menghapus menu ini?"
														)
													) {
														e.preventDefault();
													}
												}}
											>
												<TrashIcon className="h-4 w-4 mr-2" />
												Hapus Menu
											</Link>
										</div>
									</div>

									{/* Icon Preview */}
									{menu.icon && (
										<div className="bg-gray-50 p-6 rounded-lg">
											<h3 className="text-lg font-medium text-gray-900 mb-4">
												Icon
											</h3>
											<div className="text-center">
												<div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-lg shadow-sm border mb-3">
													<i
														className={`${menu.icon} text-2xl text-gray-600`}
													></i>
												</div>
												<p className="text-sm text-gray-500 font-mono">
													{menu.icon}
												</p>
											</div>
										</div>
									)}

									{/* Sub-Menus */}
									{menu.children && menu.children.length > 0 && (
										<div className="bg-gray-50 p-6 rounded-lg">
											<h3 className="text-lg font-medium text-gray-900 mb-4">
												Sub-Menu ({menu.children.length})
											</h3>
											<div className="space-y-2">
												{menu.children.map((child) => (
													<Link
														key={child.id}
														href={route("menus.show", child.id)}
														className="block p-3 bg-white rounded-md hover:bg-gray-100 transition-colors"
													>
														<div className="flex items-center">
															{child.icon && (
																<i
																	className={`${child.icon} mr-2 text-gray-600`}
																></i>
															)}
															<span className="text-sm font-medium text-gray-900">
																{child.name}
															</span>
															{!child.is_active && (
																<span className="ml-2 px-2 py-1 bg-red-100 text-red-600 text-xs rounded">
																	Nonaktif
																</span>
															)}
														</div>
													</Link>
												))}
											</div>
										</div>
									)}

									{/* Timestamps */}
									<div className="bg-gray-50 p-6 rounded-lg">
										<h3 className="text-lg font-medium text-gray-900 mb-4">
											Informasi Sistem
										</h3>
										<dl className="space-y-3">
											<div>
												<dt className="text-sm font-medium text-gray-500">
													Dibuat
												</dt>
												<dd className="mt-1 text-sm text-gray-900">
													{formatDate(menu.created_at)}
												</dd>
											</div>
											<div>
												<dt className="text-sm font-medium text-gray-500">
													Diperbarui
												</dt>
												<dd className="mt-1 text-sm text-gray-900">
													{formatDate(menu.updated_at)}
												</dd>
											</div>
										</dl>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</AppLayout>
	);
}
