import React, { useState, useEffect } from "react";
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
	Bars3Icon,
} from "@heroicons/react/24/outline";
import {
	DndContext,
	closestCenter,
	PointerSensor,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	verticalListSortingStrategy,
	useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Index({ menus, parentOptions, permissions, filters }) {
	const { flash } = usePage().props;
	const [searchTerm, setSearchTerm] = useState(filters.search || "");
	const [selectedParent, setSelectedParent] = useState(filters.parent_id || "");
	const [selectedStatus, setSelectedStatus] = useState(filters.status || "");
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [menuToDelete, setMenuToDelete] = useState(null);
	const [expandedMenus, setExpandedMenus] = useState(new Set());
	const [successNotification, setSuccessNotification] = useState(null);
	const [showSuccessToast, setShowSuccessToast] = useState(false);

	// Auto-dismiss success toast after 4 seconds
	useEffect(() => {
		if (showSuccessToast) {
			const timer = setTimeout(() => {
				setShowSuccessToast(false);
				setSuccessNotification(null);
			}, 4000);
			return () => clearTimeout(timer);
		}
	}, [showSuccessToast]);

	// Build hierarchical menu structure
	const buildMenuHierarchy = (menuList) => {
		const menuMap = {};
		const rootMenus = [];

		// Create a map of all menus
		menuList.forEach(menu => {
			menuMap[menu.id] = { ...menu, children: [] };
		});

		// Build the hierarchy
		menuList.forEach(menu => {
			if (menu.parent_id && menuMap[menu.parent_id]) {
				menuMap[menu.parent_id].children.push(menuMap[menu.id]);
			} else {
				rootMenus.push(menuMap[menu.id]);
			}
		});

		return rootMenus;
	};

	// Initialize menuItems state with hierarchical structure
	const [menuItems, setMenuItems] = useState(buildMenuHierarchy(menus.data || []));
	const [isDragging, setIsDragging] = useState(false);



	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(MouseSensor),
		useSensor(TouchSensor)
	);

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

	const handleDragStart = (event) => {
		setIsDragging(true);
	};

	// Flatten hierarchical menu structure for backend
	const flattenMenus = (menuList, parentId = null) => {
		let result = [];
		menuList.forEach((menu, index) => {
			const flatMenu = {
				id: menu.id,
				name: menu.name,
				slug: menu.slug,
				route: menu.route,
				url: menu.url,
				icon: menu.icon,
				permission_name: menu.permission_name,
				is_active: menu.is_active,
				parent_id: parentId,
				sort_order: index + 1
			};
			result.push(flatMenu);
			if (menu.children && menu.children.length > 0) {
				result = result.concat(flattenMenus(menu.children, menu.id));
			}
		});
		return result;
	};

	// Find menu item in hierarchical structure
	const findMenuItem = (menuList, id) => {
		for (const menu of menuList) {
			if (menu.id === id) {
				return menu;
			}
			if (menu.children && menu.children.length > 0) {
				const found = findMenuItem(menu.children, id);
				if (found) return found;
			}
		}
		return null;
	};

	// Remove menu item from hierarchical structure
	const removeMenuItem = (menuList, id) => {
		return menuList.map(menu => {
			if (menu.id === id) {
				return null;
			}
			if (menu.children && menu.children.length > 0) {
				return {
					...menu,
					children: removeMenuItem(menu.children, id)
				};
			}
			return menu;
		}).filter(Boolean);
	};

	const handleDragEnd = (event) => {
		setIsDragging(false);
		const { active, over, delta } = event;

		if (!over || active.id === over.id) {
			return;
		}

		const activeItem = findMenuItem(menuItems, active.id);
		const overItem = findMenuItem(menuItems, over.id);

		if (!activeItem || !overItem) {
			return;
		}

		// Check if dragged to the right (horizontal offset > 50px) to make it a submenu
		const horizontalOffset = delta?.x || 0;
		const shouldMakeSubmenu = horizontalOffset > 50;

		let newMenuItems = [...menuItems];

		// Remove the active item from its current position
		newMenuItems = removeMenuItem(newMenuItems, active.id);

		if (shouldMakeSubmenu && !overItem.parent_id) {
			// Add as child to the target item
			const updatedActiveItem = {
				...activeItem,
				parent_id: overItem.id,
				children: []
			};

			// Find and update the target item
			newMenuItems = newMenuItems.map(menu => {
				if (menu.id === overItem.id) {
					return {
						...menu,
						children: [...(menu.children || []), updatedActiveItem]
					};
				}
				return menu;
			});
		} else {
			// Normal reordering - add at the same level as target
			const updatedActiveItem = {
				...activeItem,
				parent_id: overItem.parent_id,
				children: []
			};

			if (!overItem.parent_id) {
				// Add to root level
				const overIndex = newMenuItems.findIndex(menu => menu.id === overItem.id);
				newMenuItems.splice(overIndex + 1, 0, updatedActiveItem);
			} else {
				// Add to parent's children
				newMenuItems = newMenuItems.map(menu => {
					if (menu.id === overItem.parent_id) {
						const overChildIndex = menu.children.findIndex(child => child.id === overItem.id);
						const newChildren = [...menu.children];
						newChildren.splice(overChildIndex + 1, 0, updatedActiveItem);
						return {
							...menu,
							children: newChildren
						};
					}
					return menu;
				});
			}
		}

		setMenuItems(newMenuItems);

		// Flatten and send to backend
		const flatMenus = flattenMenus(newMenuItems);
		const reorderData = flatMenus.map(item => ({
			id: item.id,
			sort_order: item.sort_order,
			parent_id: item.parent_id,
		}));

		// Send to backend
		router.post(
			route("menus.reorder"),
			{ items: reorderData },
			{
				preserveState: true,
				preserveScroll: true,
				onSuccess: () => {
						// Determine success message based on operation type
						const successMessage = shouldMakeSubmenu 
							? `📁 Menu "${activeItem.name}" berhasil dijadikan submenu dari "${overItem.name}"`
							: `🔄 Urutan menu "${activeItem.name}" berhasil diperbarui`;
						
						// Show success toast
						setSuccessNotification(successMessage);
						setShowSuccessToast(true);
					},
				onError: () => {
					// Revert on error
					setMenuItems(buildMenuHierarchy(menus.data));
				},
			}
		);
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

	// Sortable Menu Item Component
	const SortableMenuItem = ({ menu, level = 0 }) => {
		const {
			attributes,
			listeners,
			setNodeRef,
			transform,
			transition,
			isDragging: itemIsDragging,
			over,
			active,
		} = useSortable({ id: menu.id });

		const style = {
			transform: CSS.Transform.toString(transform),
			transition,
			opacity: itemIsDragging ? 0.5 : 1,
		};

		const hasChildren = menu.children && menu.children.length > 0;
		const isExpanded = expandedMenus.has(menu.id);
		
		// Check if this item is being hovered over during drag for submenu creation
		const isDropTarget = over?.id === menu.id && isDragging && !menu.parent_id;
		const isActiveItem = active?.id === menu.id;
		const isBeingDraggedOver = over?.id === menu.id && active && active.id !== menu.id;
		const canBecomeSubmenu = isBeingDraggedOver && !menu.parent_id;
		const willReorder = isBeingDraggedOver && menu.parent_id;

		return (
				<React.Fragment>
					<tr
						ref={setNodeRef}
						style={style}
						className={`${
							itemIsDragging ? "bg-yellow-100 border-2 border-yellow-400 shadow-lg opacity-80" : "hover:bg-gray-50"
						} ${
							canBecomeSubmenu ? "bg-green-50 border-l-4 border-green-400" : ""
						} ${
							willReorder ? "bg-blue-50 border-l-4 border-blue-400" : ""
						} transition-all duration-200`}
					>
					<td className="px-6 py-4 whitespace-nowrap">
						<div className="flex items-center space-x-2">
							{/* Drag Handle */}
							<button
								{...attributes}
								{...listeners}
								className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
								title="Drag untuk mengubah urutan"
							>
								<Bars3Icon className="h-4 w-4" />
							</button>

							{/* Indentation for sub-menus */}
							<div style={{ marginLeft: `${level * 20}px` }} className="flex items-center space-x-2">
								{/* Expand/Collapse Button */}
								{hasChildren && (
									<button
										onClick={() => toggleExpanded(menu.id)}
										className="text-gray-400 hover:text-gray-600"
									>
										{isExpanded ? (
											<ChevronDownIcon className="h-4 w-4" />
										) : (
											<ChevronRightIcon className="h-4 w-4" />
										)}
									</button>
								)}

								{/* Menu Icon */}
								{menu.icon && (
									<i className={`${menu.icon} text-gray-500`}></i>
								)}

								{/* Menu Name */}
								<span className={`text-sm font-medium ${
									isActiveItem ? "text-yellow-800" : "text-gray-900"
								}`}>
									{isActiveItem && "🔄 "}{menu.name}
								</span>
								
								{/* Drag Status Indicator */}
								{isActiveItem && (
									<span className="ml-2 text-xs text-yellow-700 font-medium bg-yellow-200 px-2 py-1 rounded animate-pulse">
										✋ Sedang di-drag
									</span>
								)}
								
								{/* Drop Target Indicators */}
								{canBecomeSubmenu && (
									<span className="ml-2 text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded">
										📁 Akan menjadi submenu
									</span>
								)}
								{willReorder && (
									<span className="ml-2 text-xs text-blue-600 font-medium bg-blue-100 px-2 py-1 rounded">
										🔄 Akan diurutkan ulang
									</span>
								)}
							</div>
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
						<div className="flex items-center justify-end space-x-2">
							<Link
								href={route("menus.show", menu.id)}
								className="text-indigo-600 hover:text-indigo-900"
								title="Lihat"
							>
								<EyeIcon className="h-4 w-4" />
							</Link>
							<Link
								href={route("menus.edit", menu.id)}
								className="text-indigo-600 hover:text-indigo-900"
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
					menu.children.map((child) => (
						<SortableMenuItem key={child.id} menu={child} level={level + 1} />
					))}
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
						<div className="mb-4 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-400 p-4 rounded-lg shadow-md">
							<div className="flex items-center">
								<div className="flex-shrink-0">
									<svg className="h-6 w-6 text-green-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
								</div>
								<div className="ml-3">
									<h3 className="text-sm font-medium text-green-800">
										✅ Berhasil!
									</h3>
									<div className="mt-1 text-sm text-green-700">
										{flash.success}
									</div>
								</div>
							</div>
						</div>
					)}
					{flash.error && (
						<div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
							{flash.error}
						</div>
					)}

					{/* Drag Drop Instructions */}
					<div className="mb-4 bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded">
						<div className="flex items-center space-x-2">
							<Bars3Icon className="h-5 w-5" />
							<span className="font-medium">Petunjuk Drag & Drop:</span>
						</div>
						<div className="mt-2 text-sm space-y-1">
							<div>• <span className="font-medium text-yellow-700">🔄 Sedang di-drag:</span> Item yang sedang dipindahkan</div>
							<div>• <span className="font-medium text-green-700">📁 Akan menjadi submenu:</span> Geser ke menu utama untuk membuat submenu</div>
							<div>• <span className="font-medium text-blue-700">🔄 Akan diurutkan ulang:</span> Mengubah urutan menu</div>
						</div>
					</div>

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
								<DndContext
									collisionDetection={closestCenter}
									sensors={sensors}
									onDragStart={handleDragStart}
									onDragEnd={handleDragEnd}
								>
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
											{menuItems.length === 0 ? (
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
												<SortableContext
													items={flattenMenus(menuItems).map((menu) => menu.id)}
													strategy={verticalListSortingStrategy}
												>
													{menuItems.map((menu) => (
														<SortableMenuItem key={menu.id} menu={menu} level={0} />
													))}
												</SortableContext>
											)}
										</tbody>
									</table>
								</DndContext>
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
				<div className="fixed inset-0 bg-gray-600/50 overflow-y-auto h-full w-full z-50">
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

			{/* Success Toast Notification */}
			{showSuccessToast && successNotification && (
				<div className="fixed bottom-4 right-4 z-50 transform transition-all duration-500 ease-in-out animate-bounce">
					<div className="bg-white rounded-lg shadow-2xl border-l-4 border-green-500 p-4 max-w-md">
						<div className="flex items-start">
							<div className="flex-shrink-0">
								<div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
									<svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
										<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
									</svg>
								</div>
							</div>
							<div className="ml-3 flex-1">
								<h3 className="text-sm font-semibold text-gray-900 mb-1">
									Operasi Berhasil!
								</h3>
								<p className="text-sm text-gray-600">
									{successNotification}
								</p>
							</div>
							<button
								onClick={() => {
									setShowSuccessToast(false);
									setSuccessNotification(null);
								}}
								className="ml-3 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
							>
								<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
									<path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
								</svg>
							</button>
						</div>
					</div>
				</div>
			)}
		</AppLayout>
	);
}
