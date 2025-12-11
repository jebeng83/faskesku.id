import React, { useState, useEffect, useMemo } from "react";
import { Head } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import LanjutanRegistrasiLayout from "@/Layouts/LanjutanRegistrasiLayout";
import DoctorModal from "@/Components/DoctorModal";
import DoctorDetail from "@/Components/DoctorDetail";
import { Plus, Search, Pencil, Trash, Stethoscope, User as UserIcon } from "lucide-react";
import { router } from "@inertiajs/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  hover: {
    scale: 1.01,
    y: -4,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export default function Index({ doctors, availableEmployees, spesialisList }) {
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredDoctors, setFilteredDoctors] = useState(doctors);
    const [filterSpesialis, setFilterSpesialis] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");

    const reduceMotion = useMemo(() =>
      typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []);

// Helper: get spesialis name from code for display
const getSpesialisName = (kd_sps) => {
  if (!kd_sps || !Array.isArray(spesialisList)) return kd_sps || "-";
  const match = spesialisList.find((s) => s.kd_sps === kd_sps || s.kdSps === kd_sps);
  return match?.nm_sps || match?.nmSps || kd_sps || "-";
};

useEffect(() => {
  const q = searchTerm.trim().toLowerCase();
  const filtered = doctors.filter((doctor) => {
    const matchesText =
      (doctor.nm_dokter || "").toLowerCase().includes(q) ||
      (doctor.kd_dokter || "").toLowerCase().includes(q);
    const matchesSpesialis = filterSpesialis === "all" || doctor.kd_sps === filterSpesialis;
    const matchesStatus =
      filterStatus === "all" || (filterStatus === "aktif" ? doctor.status === "1" : doctor.status !== "1");
    return matchesText && matchesSpesialis && matchesStatus;
  });
  setFilteredDoctors(filtered);
}, [searchTerm, filterSpesialis, filterStatus, doctors]);

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
    <LanjutanRegistrasiLayout
      title="Manajemen Dokter"
      menuConfig={{ activeTab: "dokter" }}
    >
      <Head title="Manajemen Dokter" />

      <div className="space-y-6">
        {/* Header - modern glass with gradient accent */}
        <motion.div
          variants={itemVariants}
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? false : "visible"}
          className="relative overflow-hidden rounded-2xl bg-white/85 dark:bg-gray-800/85 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10" />
                    <div className="absolute top-2 left-4 right-4 h-2 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-sm ring-1 ring-black/5 dark:ring-white/10 z-20" />
          <div className="relative p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md shadow-blue-500/20">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manajemen Dokter</h2>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="hidden md:flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <span className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-900/40">Total: {doctors?.length ?? 0}</span>
                <span className="px-2 py-1 rounded-lg bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Aktif: {doctors?.filter?.(d => d.status === "1")?.length ?? 0}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleCreate}
                className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-blue-500/25"
              >
                <Plus className="h-5 w-5" />
                <span className="text-sm font-semibold">Tambah Dokter</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

				<motion.div
					variants={containerVariants}
					initial={reduceMotion ? false : "hidden"}
					animate={reduceMotion ? false : "visible"}
					className="grid grid-cols-1 lg:grid-cols-12 gap-6"
				>
					{/* Left Side - Doctor List */}
					<motion.div
						variants={itemVariants}
						className="relative bg-white/95 dark:bg-gray-900/85 rounded-2xl shadow-xl shadow-blue-500/5 overflow-hidden border border-gray-200/70 dark:border-gray-800 col-span-12 lg:col-span-5"
					>
						{/* Overlay gradient for premium feel */}
						<div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10" />
						<div className="relative z-[1]">
						{/* Search & Filters Header - Card Header Compact Design */}
						<div className="relative px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm flex flex-col gap-2">
							<div className="flex items-center justify-between flex-shrink-0">
								<h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
									<motion.div
										className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md"
										whileHover={{ rotate: 90, scale: 1.1 }}
										transition={{ duration: 0.3 }}
									>
										<Stethoscope className="w-4 h-4 text-white" />
									</motion.div>
									<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
										Daftar Dokter ({filteredDoctors.length})
									</span>
								</h3>
								<div className="hidden lg:flex items-center gap-2 text-xs">
									<span className="px-2 py-1 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 ring-1 ring-gray-200/50 dark:ring-gray-700/50">Spesialis: {filterSpesialis === "all" ? "Semua" : getSpesialisName(filterSpesialis)}</span>
									<span className="px-2 py-1 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 ring-1 ring-gray-200/50 dark:ring-gray-700/50">Status: {filterStatus === "all" ? "Semua" : filterStatus === "aktif" ? "Aktif" : "Non-Aktif"}</span>
								</div>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-5 gap-2 flex-shrink-0">
								<div className="relative md:col-span-2">
									<Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
									<input
										type="text"
										placeholder="Cari dokter (nama/kode)…"
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className="w-full pl-8 pr-3 py-2 text-sm bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all"
									/>
								</div>
								<div className="flex items-center gap-2 md:col-span-3">
									<select
										value={filterSpesialis}
										onChange={(e) => setFilterSpesialis(e.target.value)}
										className="flex-1 px-2 py-2 text-sm rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all"
									>
										<option value="all">Semua Spesialis</option>
										{Array.isArray(spesialisList) && spesialisList.map((s) => (
											<option key={s.kd_sps ?? s.kdSps} value={s.kd_sps ?? s.kdSps}>{s.nm_sps ?? s.nmSps}</option>
										))}
									</select>
									<select
										value={filterStatus}
										onChange={(e) => setFilterStatus(e.target.value)}
										className="flex-1 px-2 py-2 text-sm rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all"
									>
										<option value="all">Semua Status</option>
										<option value="aktif">Aktif</option>
										<option value="non">Non-Aktif</option>
									</select>
								</div>
							</div>
						</div>

						{/* Doctor List */}
						<div className="flex-1 overflow-y-auto max-h-[calc(100vh-360px)]">
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
											initial={reduceMotion ? false : "hidden"}
											animate={reduceMotion ? false : "visible"}
											className="p-4 space-y-3"
										>
										{filteredDoctors.map((doctor) => (
											<motion.div
												key={doctor.kd_dokter}
												variants={cardVariants}
												whileHover="hover"
												onClick={() => handleDoctorSelect(doctor)}
												className={`relative p-4 rounded-xl cursor-pointer transition-all border ${
													selectedDoctor?.kd_dokter === doctor.kd_dokter
														? "border-blue-600 bg-blue-50/60"
														: "border-gray-200 dark:border-gray-700 hover:border-gray-300"
												}`}
											>
												<div className="flex justify-between items-start">
													<div className="flex-1 min-w-0">
														<h4 className="font-semibold text-gray-900 dark:text-white truncate">
															{doctor.nm_dokter}
														</h4>
														<p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
															Kode: {doctor.kd_dokter}
														</p>
														<div className="flex flex-wrap items-center gap-2 mt-2">
															<span className="text-xs px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 ring-1 ring-gray-200 dark:ring-gray-700">
																{doctor.jk === "L" ? "Laki-laki" : "Perempuan"}
															</span>
															<span className="text-xs px-2 py-1 rounded-lg bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 ring-1 ring-indigo-200 dark:ring-indigo-800">
																{getSpesialisName(doctor.kd_sps)}
															</span>
															{doctor.status === "1" ? (
																<span className="text-xs px-2 py-1 rounded-lg bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 ring-1 ring-green-200 dark:ring-green-800">
																	Aktif
																</span>
															) : (
																<span className="text-xs px-2 py-1 rounded-lg bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 ring-1 ring-red-200 dark:ring-red-800">
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
															className="p-1.5 text-gray-600 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
														>
															<Pencil className="h-4 w-4" />
														</motion.button>
														<motion.button
															whileHover={{ scale: 1.1 }}
															whileTap={{ scale: 0.9 }}
															onClick={(e) => {
																e.stopPropagation();
																handleDelete(doctor);
															}}
															className="p-1.5 text-gray-600 dark:text-gray-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
														>
															<Trash className="h-4 w-4" />
														</motion.button>
													</div>
												</div>
											</motion.div>
										))}
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</div>
					</motion.div>

					{/* Right Side - Doctor Detail */}
					<motion.div
						variants={itemVariants}
						className="relative bg-white/95 dark:bg-gray-900/85 rounded-2xl shadow-xl shadow-blue-500/5 overflow-hidden border border-gray-200/70 dark:border-gray-800 col-span-12 lg:col-span-7"
					>
						{/* Overlay gradient for premium feel */}
						<div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10" />
						<div className="relative z-[1]">
							{/* Header - Card Header Compact Design */}
							<div className="relative px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm flex items-center">
								<h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
									<motion.div
										className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md"
										whileHover={{ rotate: 90, scale: 1.1 }}
										transition={{ duration: 0.3 }}
									>
										<UserIcon className="w-4 h-4 text-white" />
									</motion.div>
									<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
										Informasi Dokter
									</span>
								</h3>
							</div>

							{/* Doctor Detail Content */}
							<div className="flex-1">
								<DoctorDetail doctor={selectedDoctor} />
							</div>
						</div>
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
    </LanjutanRegistrasiLayout>
  );
}
