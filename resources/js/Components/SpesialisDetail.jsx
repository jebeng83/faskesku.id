import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	IdentificationIcon,
	UserIcon,
	UsersIcon,
	DocumentTextIcon,
} from "@heroicons/react/24/outline";

const detailVariants = {
	hidden: { opacity: 0, x: 20 },
	visible: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.5 },
	},
	exit: {
		opacity: 0,
		x: -20,
		transition: { duration: 0.3 },
	},
};

const cardVariants = {
	hidden: { opacity: 0, y: 10 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.3,
			staggerChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, x: -10 },
	visible: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.2 },
	},
};

function DetailItem({ icon: Icon, label, value }) {
	return (
		<motion.div
			variants={itemVariants}
			className="flex items-start gap-3 py-3 border-b border-gray-100 dark:border-gray-600 last:border-b-0"
		>
			<div className="flex-shrink-0 mt-0.5">
				<Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
			</div>
			<div className="flex-1 min-w-0">
				<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
					{label}
				</p>
				<p className="text-base text-gray-900 dark:text-white mt-1 break-words">
					{value || "-"}
				</p>
			</div>
		</motion.div>
	);
}

function DoctorCard({ doctor }) {
	return (
		<motion.div
			variants={itemVariants}
			whileHover={{ scale: 1.02 }}
			className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
		>
			<div className="flex items-start gap-3">
				<div className="flex-shrink-0">
					<div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
						<UserIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
					</div>
				</div>
				<div className="flex-1 min-w-0">
					<h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
						{doctor.nm_dokter}
					</h4>
					<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
						Kode: {doctor.kd_dokter}
					</p>
					{doctor.pegawai && (
						<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
							NIK: {doctor.pegawai.nik}
						</p>
					)}
					<div className="flex items-center gap-2 mt-2">
						<span
							className={`text-xs px-2 py-1 rounded-full ${
								doctor.status === "1"
									? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
									: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
							}`}
						>
							{doctor.status === "1" ? "Aktif" : "Non-Aktif"}
						</span>
						<span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full">
							{doctor.jk === "L" ? "Laki-laki" : "Perempuan"}
						</span>
					</div>
				</div>
			</div>
		</motion.div>
	);
}

export default function SpesialisDetail({ spesialis }) {
	if (!spesialis) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-full flex items-center justify-center"
			>
				<div className="text-center p-8">
					<div className="text-6xl mb-4">🩺</div>
					<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
						Pilih Spesialis
					</h3>
					<p className="text-gray-600 dark:text-gray-400">
						Pilih spesialis dari daftar untuk melihat detail informasi dan
						dokter terkait
					</p>
				</div>
			</motion.div>
		);
	}

	const doctorCount = spesialis.dokter?.length || 0;
	const activeDoctorCount =
		spesialis.dokter?.filter((d) => d.status === "1").length || 0;

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={spesialis.kd_sps}
				variants={detailVariants}
				initial="hidden"
				animate="visible"
				exit="exit"
				className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-full overflow-hidden"
			>
				{/* Header */}
				<div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6">
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className="flex items-start gap-4"
					>
						<div className="flex-shrink-0">
							<div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
								<UsersIcon className="h-8 w-8 text-black" />
							</div>
						</div>
						<div className="flex-1 min-w-0">
							<h2 className="text-xl font-bold text-white truncate">
								{spesialis.nm_sps}
							</h2>
							<p className="text-gray-300 text-sm mt-1">
								Kode: {spesialis.kd_sps}
							</p>
							<div className="flex items-center gap-4 mt-3">
								<div className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
									<span className="text-black text-sm font-medium">
										{doctorCount} Dokter
									</span>
								</div>
								<div className="bg-green-500 bg-opacity-80 px-3 py-1 rounded-full">
									<span className="text-white text-sm font-medium">
										{activeDoctorCount} Aktif
									</span>
								</div>
							</div>
						</div>
					</motion.div>
				</div>

				{/* Content */}
				<div className="p-6 overflow-y-auto max-h-[calc(100vh-400px)]">
					<motion.div
						variants={cardVariants}
						initial="hidden"
						animate="visible"
						className="space-y-6"
					>
						{/* Basic Information */}
						<div>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
								<IdentificationIcon className="h-5 w-5" />
								Informasi Dasar
							</h3>
							<motion.div
								variants={cardVariants}
								className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
							>
								<DetailItem
									icon={IdentificationIcon}
									label="Kode Spesialis"
									value={spesialis.kd_sps}
								/>
								<DetailItem
									icon={UserIcon}
									label="Nama Spesialis"
									value={spesialis.nm_sps}
								/>
							</motion.div>
						</div>

						{/* Statistics */}
						<div>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
								<DocumentTextIcon className="h-5 w-5" />
								Statistik
							</h3>
							<motion.div
								variants={cardVariants}
								className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
							>
								<DetailItem
									icon={UsersIcon}
									label="Total Dokter"
									value={`${doctorCount} dokter`}
								/>
								<DetailItem
									icon={UserIcon}
									label="Dokter Aktif"
									value={`${activeDoctorCount} dokter aktif`}
								/>
								<DetailItem
									icon={UserIcon}
									label="Dokter Non-Aktif"
									value={`${doctorCount - activeDoctorCount} dokter non-aktif`}
								/>
							</motion.div>
						</div>

						{/* Doctors List */}
						{doctorCount > 0 && (
							<div>
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
									<UsersIcon className="h-5 w-5" />
									Daftar Dokter ({doctorCount})
								</h3>
								<motion.div
									variants={cardVariants}
									className="space-y-3 max-h-80 overflow-y-auto"
								>
									{spesialis.dokter.map((doctor) => (
										<DoctorCard key={doctor.kd_dokter} doctor={doctor} />
									))}
								</motion.div>
							</div>
						)}

						{/* Empty State for Doctors */}
						{doctorCount === 0 && (
							<motion.div
								variants={cardVariants}
								className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center"
							>
								<div className="text-4xl mb-3">👨‍⚕️</div>
								<h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
									Belum Ada Dokter
								</h4>
								<p className="text-gray-600 dark:text-gray-400 text-sm">
									Spesialis ini belum memiliki dokter yang terdaftar
								</p>
							</motion.div>
						)}
					</motion.div>
				</div>
			</motion.div>
		</AnimatePresence>
	);
}
