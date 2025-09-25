import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
	PlusIcon,
	MagnifyingGlassIcon,
	PencilIcon,
	TrashIcon,
} from "@heroicons/react/24/outline";
import AppLayout from "@/Layouts/AppLayout";
import SpesialisModal from "@/Components/SpesialisModal";
import SpesialisDetail from "@/Components/SpesialisDetail";

// Animation variants
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
		},
	},
};

const cardVariants = {
	hover: {
		scale: 1.02,
		transition: {
			duration: 0.2,
		},
	},
};

export default function Index({ spesialis }) {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedSpesialis, setSelectedSpesialis] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [modalMode, setModalMode] = useState("create");

	// Filter spesialis based on search term
	const filteredSpesialis = spesialis.filter(
		(item) =>
			item.nm_sps.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.kd_sps.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleSpesialisSelect = (spesialisItem) => {
		setSelectedSpesialis(spesialisItem);
	};

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
		<AppLayout>
			<Head title="Manajemen Spesialis" />

			<div className="space-y-6 -mt-6 -mx-6 p-6">
				{/* Header */}
				<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
					<div className="p-6">
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							className="flex justify-between items-center"
						>
							<div>
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
									Manajemen Spesialis
								</h2>
								<p className="text-gray-600 dark:text-gray-400 mt-1">
									Kelola data spesialis medis rumah sakit
								</p>
							</div>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={handleCreate}
								className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg font-medium text-sm whitespace-nowrap transform hover:scale-105"
							>
								<PlusIcon className="h-5 w-5" />
								Tambah Spesialis
							</motion.button>
						</motion.div>
					</div>
				</div>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="grid grid-cols-1 lg:grid-cols-2 gap-6"
				>
					{/* Left Side - Spesialis List */}
					<motion.div
						variants={itemVariants}
						className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
					>
						{/* Search Header */}
						<div className="bg-gray-900 p-6">
							<h3 className="text-lg font-semibold text-white mb-4">
								Daftar Spesialis ({filteredSpesialis.length})
							</h3>
							<div className="relative">
								<MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
								<input
									type="text"
									placeholder="Cari spesialis..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
								/>
							</div>
						</div>

						{/* Spesialis List */}
						<div className="flex-1 overflow-y-auto max-h-[calc(100vh-350px)]">
							<AnimatePresence mode="wait">
								{filteredSpesialis.length === 0 ? (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										className="p-8 text-center text-gray-500 dark:text-gray-400"
									>
										<div className="text-6xl mb-4">🩺</div>
										<p className="text-lg font-medium">
											Tidak ada spesialis ditemukan
										</p>
										<p className="text-sm">Coba ubah kata kunci pencarian</p>
									</motion.div>
								) : (
									<motion.div
										variants={containerVariants}
										initial="hidden"
										animate="visible"
										className="p-4 space-y-3"
									>
										{filteredSpesialis.map((spesialisItem) => (
											<motion.div
												key={spesialisItem.kd_sps}
												variants={cardVariants}
												whileHover="hover"
												onClick={() => handleSpesialisSelect(spesialisItem)}
												className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
													selectedSpesialis?.kd_sps === spesialisItem.kd_sps
														? "border-gray-900 bg-gray-50 dark:bg-gray-700 dark:border-gray-300"
														: "border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500"
												}`}
											>
												<div className="flex justify-between items-start">
													<div className="flex-1 min-w-0">
														<h4 className="font-semibold text-gray-900 dark:text-white truncate">
															{spesialisItem.nm_sps}
														</h4>
														<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
															Kode: {spesialisItem.kd_sps}
														</p>
														<div className="flex items-center gap-4 mt-2">
															<span className="text-xs bg-gray-100 dark:bg-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
																{spesialisItem.dokter?.length || 0} Dokter
															</span>
														</div>
													</div>
													<div className="flex gap-1 ml-4">
														<motion.button
															whileHover={{ scale: 1.1 }}
															whileTap={{ scale: 0.9 }}
															onClick={(e) => {
																e.stopPropagation();
																handleEdit(spesialisItem);
															}}
															className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
														>
															<PencilIcon className="h-4 w-4" />
														</motion.button>
														<motion.button
															whileHover={{ scale: 1.1 }}
															whileTap={{ scale: 0.9 }}
															onClick={(e) => {
																e.stopPropagation();
																handleDelete(spesialisItem);
															}}
															className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
														>
															<TrashIcon className="h-4 w-4" />
														</motion.button>
													</div>
												</div>
											</motion.div>
										))}
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</motion.div>

					{/* Right Side - Spesialis Detail */}
					<motion.div variants={itemVariants}>
						<SpesialisDetail spesialis={selectedSpesialis} />
					</motion.div>
				</motion.div>
			</div>

			{/* Modal */}
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
		</AppLayout>
	);
}
