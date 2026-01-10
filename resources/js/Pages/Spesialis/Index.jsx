import React, { useState, useMemo } from "react";
import { Head, router } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import SidebarPengaturan from "@/Layouts/SidebarPengaturan";
import SpesialisModal from "@/Components/SpesialisModal";
import SpesialisDetail from "@/Components/SpesialisDetail";
import MasterDetailPanel from "@/Components/MasterDetailPanel";

export default function Index({ spesialis }) {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedSpesialis, setSelectedSpesialis] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [modalMode, setModalMode] = useState("create");

	const filteredSpesialis = useMemo(() => {
		const q = searchTerm.trim().toLowerCase();
		return Array.isArray(spesialis)
			? spesialis.filter(
				(item) =>
					(item.nm_sps || "").toLowerCase().includes(q) ||
					(item.kd_sps || "").toLowerCase().includes(q)
				)
			: [];
	}, [spesialis, searchTerm]);


	const handleCreate = () => {
		setModalMode("create");
		setShowModal(true);
	};

	const handleEdit = (spesialisItem) => {
		setSelectedSpesialis(spesialisItem);
		setModalMode("edit");
		setShowModal(true);
	};

	const handleDelete = (spesialisItem) => {
		if (spesialisItem.dokter && spesialisItem.dokter.length > 0) {
			alert("Tidak dapat menghapus spesialis yang masih memiliki dokter!");
			return;
		}

		if (
			confirm(
				`Apakah Anda yakin ingin menghapus spesialis "${spesialisItem.nm_sps}"?`
			)
		) {
			router.post(
				route("spesialis.destroy", spesialisItem.kd_sps),
				{
					_method: "DELETE",
				},
				{
					preserveState: false,
					preserveScroll: true,
					onSuccess: () => {
						// Success message will be handled by flash message
					},
					onError: (errors) => {
						console.error("Delete error:", errors);
						alert("Terjadi kesalahan saat menghapus spesialis");
					},
				}
			);
		}
	};

	return (
		<SidebarPengaturan title="Manajemen Spesialis">
			<Head title="Manajemen Spesialis" />

			<div className="space-y-6">
				<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
					<div className="p-6">
						<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center">
							<div>
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manajemen Spesialis</h2>
							</div>
							<div className="flex items-center gap-2">
								<motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleCreate} className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg font-medium text-sm whitespace-nowrap">
									<PlusIcon className="h-5 w-5" />
									Tambah Spesialis
								</motion.button>
								<div className="relative">
									<MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
									<input
										type="text"
										placeholder="Cari spesialis..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className="w-56 pl-10 pr-3 py-2 text-sm bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-400"
									/>
								</div>
							</div>
						</motion.div>
					</div>
				</div>

				<MasterDetailPanel
					items={filteredSpesialis}
					getKey={(item) => item.kd_sps}
					selectedItem={selectedSpesialis}
					onSelect={(item) => setSelectedSpesialis(item)}
					leftHeaderTitle={`Daftar Spesialis (${filteredSpesialis.length})`}
					renderItemSummary={(spesialisItem) => (
						<div className="flex justify-between items-start">
							<div className="flex-1 min-w-0">
								<h4 className="font-semibold text-gray-900 dark:text-white truncate">{spesialisItem.nm_sps}</h4>
								<div className="mt-1 flex items-center flex-wrap gap-[6px]">
									<p className="text-sm text-gray-600 dark:text-gray-300 m-0">Kode: {spesialisItem.kd_sps}</p>
									<span className="text-[11px] px-2 py-0.5 rounded-md bg-gray-50 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 border border-gray-200/40 dark:border-gray-700/40">
										{spesialisItem.dokter?.length || 0} Dokter
									</span>
								</div>
							</div>
							<div className="flex gap-1 ml-4">
								<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={(e) => { e.stopPropagation(); handleEdit(spesialisItem); }} className="p-1.5 text-gray-600 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
									<PencilIcon className="h-4 w-4" />
								</motion.button>
								<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={(e) => { e.stopPropagation(); handleDelete(spesialisItem); }} className="p-1.5 text-gray-600 dark:text-gray-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
									<TrashIcon className="h-4 w-4" />
								</motion.button>
							</div>
						</div>
					)}
					renderDetail={(item) => <SpesialisDetail spesialis={item} />}
				/>
			</div>

			<AnimatePresence>
				{showModal && (
					<SpesialisModal
						show={showModal}
						onClose={() => setShowModal(false)}
						mode={modalMode}
						spesialis={modalMode === "edit" ? selectedSpesialis : null}
					/>
				)}
			</AnimatePresence>
		</SidebarPengaturan>
	);
}
