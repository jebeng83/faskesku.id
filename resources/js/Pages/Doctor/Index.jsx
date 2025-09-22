import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import AppLayout from "@/Layouts/AppLayout";
import DoctorModal from "@/Components/DoctorModal";
import DoctorDetail from "@/Components/DoctorDetail";
import {
	PlusIcon,
	MagnifyingGlassIcon,
	PencilIcon,
	TrashIcon,
} from "@heroicons/react/24/outline";
import { router } from "@inertiajs/react";

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 0.3,
			staggerChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.3 },
	},
};

const cardVariants = {
	hidden: { opacity: 0, scale: 0.95 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.3 },
	},
	hover: {
		scale: 1.02,
		transition: { duration: 0.2 },
	},
};

export default function Index({ doctors, availableEmployees, spesialisList }) {
	const [selectedDoctor, setSelectedDoctor] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [modalMode, setModalMode] = useState("create");
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredDoctors, setFilteredDoctors] = useState(doctors);

	useEffect(() => {
		const filtered = doctors.filter(
			(doctor) =>
				doctor.nm_dokter.toLowerCase().includes(searchTerm.toLowerCase()) ||
				doctor.kd_dokter.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredDoctors(filtered);
	}, [searchTerm, doctors]);

	useEffect(() => {
		if (filteredDoctors.length > 0 && !selectedDoctor) {
			setSelectedDoctor(filteredDoctors[0]);
		}
	}, [filteredDoctors]);

	const handleCreate = () => {
		setModalMode("create");
		setShowModal(true);
	};

	const handleEdit = (doctor) => {
		setSelectedDoctor(doctor);
		setModalMode("edit");
		setShowModal(true);
	};

	const handleDelete = (doctor) => {
		if (confirm("Apakah Anda yakin ingin menghapus dokter ini?")) {
			router.post(
				route("doctors.destroy", doctor.kd_dokter),
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
						alert("Terjadi kesalahan saat menghapus dokter");
					},
				}
			);
		}
	};

	const handleDoctorSelect = (doctor) => {
		setSelectedDoctor(doctor);
	};

	return (
		<AppLayout>
			<Head title="Manajemen Dokter" />

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
									Manajemen Dokter
								</h2>
								<p className="text-gray-600 dark:text-gray-400 mt-1">
									Kelola data dokter rumah sakit
								</p>
							</div>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={handleCreate}
								className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg font-medium text-sm whitespace-nowrap transform hover:scale-105"
							>
								<PlusIcon className="h-5 w-5" />
								Tambah Dokter
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
					{/* Left Side - Doctor List */}
					<motion.div
						variants={itemVariants}
						className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
					>
						{/* Search Header */}
						<div className="bg-gray-900 p-6">
							<h3 className="text-lg font-semibold text-white mb-4">
								Daftar Dokter ({filteredDoctors.length})
							</h3>
							<div className="relative">
								<MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
								<input
									type="text"
									placeholder="Cari dokter..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
								/>
							</div>
						</div>

						{/* Doctor List */}
						<div className="flex-1 overflow-y-auto max-h-[calc(100vh-350px)]">
							<AnimatePresence mode="wait">
								{filteredDoctors.length === 0 ? (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										className="p-8 text-center text-gray-500"
									>
										<div className="text-6xl mb-4">👨‍⚕️</div>
										<p className="text-lg font-medium">
											Tidak ada dokter ditemukan
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
										{filteredDoctors.map((doctor) => (
											<motion.div
												key={doctor.kd_dokter}
												variants={cardVariants}
												whileHover="hover"
												onClick={() => handleDoctorSelect(doctor)}
												className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
													selectedDoctor?.kd_dokter === doctor.kd_dokter
														? "border-gray-900 bg-gray-50"
														: "border-gray-200 hover:border-gray-300"
												}`}
											>
												<div className="flex justify-between items-start">
													<div className="flex-1 min-w-0">
														<h4 className="font-semibold text-gray-900 truncate">
															{doctor.nm_dokter}
														</h4>
														<p className="text-sm text-gray-600 mt-1">
															Kode: {doctor.kd_dokter}
														</p>
														<div className="flex items-center gap-4 mt-2">
															<span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
																{doctor.jk === "L" ? "Laki-laki" : "Perempuan"}
															</span>
															{doctor.status === "1" ? (
																<span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
																	Aktif
																</span>
															) : (
																<span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
																	Non-Aktif
																</span>
															)}
														</div>
													</div>
													<div className="flex gap-1 ml-4">
														<motion.button
															whileHover={{ scale: 1.1 }}
															whileTap={{ scale: 0.9 }}
															onClick={(e) => {
																e.stopPropagation();
																handleEdit(doctor);
															}}
															className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
														>
															<PencilIcon className="h-4 w-4" />
														</motion.button>
														<motion.button
															whileHover={{ scale: 1.1 }}
															whileTap={{ scale: 0.9 }}
															onClick={(e) => {
																e.stopPropagation();
																handleDelete(doctor);
															}}
															className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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

					{/* Right Side - Doctor Detail */}
					<motion.div variants={itemVariants}>
						<DoctorDetail doctor={selectedDoctor} />
					</motion.div>
				</motion.div>
			</div>

			{/* Modal */}
			<AnimatePresence>
				{showModal && (
					<DoctorModal
						show={showModal}
						onClose={() => setShowModal(false)}
						mode={modalMode}
						doctor={modalMode === "edit" ? selectedDoctor : null}
						availableEmployees={availableEmployees}
						spesialisList={spesialisList}
					/>
				)}
			</AnimatePresence>
		</AppLayout>
	);
}
