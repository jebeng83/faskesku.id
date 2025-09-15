import React, { useState } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import {
	ChevronDownIcon,
	ChevronRightIcon,
	PlusIcon,
	PencilIcon,
	TrashIcon,
	EyeIcon,
	PowerIcon,
} from "@heroicons/react/24/outline";

export default function Index({ menus, parentOptions, permissions, filters }) {
	const { flash } = usePage().props;
	const [searchTerm, setSearchTerm] = useState(filters.search || "");
	const [selectedParent, setSelectedParent] = useState(filters.parent_id || "");
	const [selectedStatus, setSelectedStatus] = useState(filters.status || "");
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [menuToDelete, setMenuToDelete] = useState(null);
	const [expandedMenus, setExpandedMenus] = useState(new Set());

	const handleSearch = (e) => {
		e.preventDefault();
		router.get(
			route("menus.index"),
			{
				search: searchTerm,
				parent_id: selectedParent,
				status: selectedStatus,
			},
			{ preserveState: true }
		);
	};

	const handleReset = () => {
		setSearchTerm("");
		setSelectedParent("");
		setSelectedStatus("");
		router.get(route("menus.index"));
	};

	const handleDelete = (menu) => {
		setMenuToDelete(menu);
		setShowDeleteModal(true);
	};

	const confirmDelete = () => {
		if (menuToDelete) {
			router.delete(route("menus.destroy", menuToDelete.id), {
				onSuccess: () => {
					setShowDeleteModal(false);
					setMenuToDelete(null);
				},
			});
		}
	};

	const toggleStatus = (menu) => {
		router.post(
			route("menus.toggle-status", menu.id),
			{},
			{
				preserveScroll: true,
			}
		);
	};

	const toggleExpanded = (menuId) => {
		const newExpanded = new Set(expandedMenus);
		if (newExpanded.has(menuId)) {
			newExpanded.delete(menuId);
		} else {
			newExpanded.add(menuId);
		}
		setExpandedMenus(newExpanded);
	};

	const getStatusBadge = (isActive) => {
		return (
			<span
				className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
					isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
				}`}
			>
				{isActive ? "Aktif" : "Nonaktif"}
			</span>
		);
	};

	const renderMenuRow = (menu, level = 0) => {
		const hasChildren = menu.children && menu.children.length > 0;
		const isExpanded = expandedMenus.has(menu.id);
		const paddingLeft = level * 2; // rem

		return (
			<React.Fragment key={menu.id}>
				<tr className="bg-white border-b hover:bg-gray-50">
					<td
						className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
						style={{ paddingLeft: `${1.5 + paddingLeft}rem` }}
					>
						<div className="flex items-center">
							{hasChildren && (
								<button
									onClick={() => toggleExpanded(menu.id)}
									className="mr-2 p-1 hover:bg-gray-200 rounded"
								>
									{isExpanded ? (
										<ChevronDownIcon className="h-4 w-4" />
									) : (
										<ChevronRightIcon className="h-4 w-4" />
									)}
								</button>
							)}
							{!hasChildren && <div className="w-6" />}
							{menu.icon && (
								<i className={`${menu.icon} mr-2 text-gray-600`}></i>
							)}
							{menu.name}
						</div>
					</td>
					<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
						{menu.slug}
					</td>
					<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
						{menu.route || menu.url || "-"}
					</td>
					<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
						{menu.permission_name || "-"}
					</td>
					<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
						{menu.sort_order}
					</td>
					<td className="px-6 py-4 whitespace-nowrap">
						{getStatusBadge(menu.is_active)}
					</td>
					<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
						<div className="flex items-center space-x-2">
							<Link
								href={route("menus.show", menu.id)}
								className="text-indigo-600 hover:text-indigo-900"
								title="Lihat Detail"
							>
								<EyeIcon className="h-4 w-4" />
							</Link>
							<Link
								href={route("menus.edit", menu.id)}
								className="text-yellow-600 hover:text-yellow-900"
								title="Edit"
							>
								<PencilIcon className="h-4 w-4" />
							</Link>
							<button
								onClick={() => toggleStatus(menu)}
								className={`${
									menu.is_active
										? "text-red-600 hover:text-red-900"
										: "text-green-600 hover:text-green-900"
								}`}
								title={menu.is_active ? "Nonaktifkan" : "Aktifkan"}
							>
								<PowerIcon className="h-4 w-4" />
							</button>
							<button
								onClick={() => handleDelete(menu)}
								className="text-red-600 hover:text-red-900"
								title="Hapus"
							>
								<TrashIcon className="h-4 w-4" />
							</button>
						</div>
					</td>
				</tr>
				{hasChildren &&
					isExpanded &&
					menu.children.map((child) => renderMenuRow(child, level + 1))}
			</React.Fragment>
		);
	};

	return (
		<AppLayout>
			<Head title="Manajemen Menu" />

			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					{/* Flash Messages */}
					{flash.success && (
						<div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
							{flash.success}
						</div>
					)}
					{flash.error && (
						<div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
							{flash.error}
						</div>
					)}

					<div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
						<div className="p-6 bg-white border-b border-gray-200">
							<div className="flex justify-between items-center mb-6">
								<div>
									<h2 className="text-2xl font-bold text-gray-900">
										Manajemen Menu
									</h2>
									<p className="text-gray-600">
										Kelola struktur menu sidebar dan permission
									</p>
								</div>
								<Link
									href={route("menus.create")}
									className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
								>
									<PlusIcon className="h-4 w-4 mr-2" />
									Tambah Menu
								</Link>
							</div>

							{/* Filter Form */}
							<form
								onSubmit={handleSearch}
								className="mb-6 bg-gray-50 p-4 rounded-lg"
							>
								<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Pencarian
										</label>
										<input
											type="text"
											value={searchTerm}
											onChange={(e) => setSearchTerm(e.target.value)}
											placeholder="Nama, slug, atau route..."
											className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Parent Menu
										</label>
										<select
											value={selectedParent}
											onChange={(e) => setSelectedParent(e.target.value)}
											className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
										>
											<option value="">Semua</option>
											<option value="root">Root Menu</option>
											{parentOptions.map((parent) => (
												<option key={parent.id} value={parent.id}>
													{parent.name}
												</option>
											))}
										</select>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Status
										</label>
										<select
											value={selectedStatus}
											onChange={(e) => setSelectedStatus(e.target.value)}
											className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
										>
											<option value="">Semua</option>
											<option value="active">Aktif</option>
											<option value="inactive">Nonaktif</option>
										</select>
									</div>
									<div className="flex items-end space-x-2">
										<button
											type="submit"
											className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
										>
											Filter
										</button>
										<button
											type="button"
											onClick={handleReset}
											className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
										>
											Reset
										</button>
									</div>
								</div>
							</form>

							{/* Table */}
							<div className="overflow-x-auto">
								<table className="min-w-full divide-y divide-gray-200">
									<thead className="bg-gray-50">
										<tr>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Nama Menu
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Slug
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Route/URL
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Permission
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Urutan
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Status
											</th>
											<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
												Aksi
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										{menus.data.length === 0 ? (
											<tr>
												<td
													colSpan="7"
													className="px-6 py-12 text-center text-gray-500"
												>
													<div className="flex flex-col items-center">
														<svg
															className="h-12 w-12 text-gray-400 mb-4"
															fill="none"
															viewBox="0 0 24 24"
															stroke="currentColor"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
															/>
														</svg>
														<p className="text-lg font-medium">
															Tidak ada menu ditemukan
														</p>
														<p className="text-sm">
															Mulai dengan membuat menu baru
														</p>
													</div>
												</td>
											</tr>
										) : (
											menus.data.map((menu) => renderMenuRow(menu))
										)}
									</tbody>
								</table>
							</div>

							{/* Pagination */}
							{menus.links && menus.links.length > 3 && (
								<div className="mt-6 flex items-center justify-between">
									<div className="text-sm text-gray-700">
										Menampilkan {menus.from} hingga {menus.to} dari{" "}
										{menus.total} menu
									</div>
									<div className="flex space-x-1">
										{menus.links.map((link, index) => (
											<button
												key={index}
												onClick={() => link.url && router.get(link.url)}
												disabled={!link.url}
												className={`px-3 py-2 text-sm rounded-md ${
													link.active
														? "bg-indigo-600 text-white"
														: link.url
														? "bg-white text-gray-500 hover:text-gray-700 border border-gray-300"
														: "bg-gray-100 text-gray-400 cursor-not-allowed"
												}`}
												dangerouslySetInnerHTML={{ __html: link.label }}
											/>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Delete Confirmation Modal */}
			{showDeleteModal && (
				<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
					<div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
						<div className="mt-3 text-center">
							<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
								<TrashIcon className="h-6 w-6 text-red-600" />
							</div>
							<h3 className="text-lg font-medium text-gray-900 mt-4">
								Hapus Menu
							</h3>
							<div className="mt-2 px-7 py-3">
								<p className="text-sm text-gray-500">
									Apakah Anda yakin ingin menghapus menu "{menuToDelete?.name}"?
									Tindakan ini tidak dapat dibatalkan.
								</p>
							</div>
							<div className="flex items-center px-4 py-3 space-x-4">
								<button
									onClick={() => setShowDeleteModal(false)}
									className="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
								>
									Batal
								</button>
								<button
									onClick={confirmDelete}
									className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
								>
									Hapus
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</AppLayout>
	);
}
