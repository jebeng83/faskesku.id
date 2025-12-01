import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	UserIcon,
	IdentificationIcon,
	CalendarIcon,
	PhoneIcon,
	MapPinIcon,
	HeartIcon,
	AcademicCapIcon,
	DocumentTextIcon,
	CheckCircleIcon,
	XCircleIcon,
} from "@heroicons/react/24/outline";

const detailVariants = {
	hidden: { opacity: 0, x: 20 },
	visible: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.4, ease: "easeOut" },
	},
	exit: {
		opacity: 0,
		x: -20,
		transition: { duration: 0.3 },
	},
};

const cardVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.3 },
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

const DetailItem = ({ icon: Icon, label, value, className = "" }) => (
	<motion.div
		variants={itemVariants}
		className={`flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${className}`}
	>
		<div className="p-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg flex-shrink-0">
			<Icon className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
				{label}
			</p>
			<p className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5 break-words">
				{value || "-"}
			</p>
		</div>
	</motion.div>
);

const StatusBadge = ({ status }) => {
	const isActive = status === "1";
	return (
		<motion.div
			initial={{ scale: 0 }}
			animate={{ scale: 1 }}
			className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-medium ${
				isActive 
					? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 ring-1 ring-green-200 dark:ring-green-800" 
					: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 ring-1 ring-red-200 dark:ring-red-800"
			}`}
		>
			{isActive ? (
				<CheckCircleIcon className="h-3 w-3" />
			) : (
				<XCircleIcon className="h-3 w-3" />
			)}
			{isActive ? "Aktif" : "Non-Aktif"}
		</motion.div>
	);
};

export default function DoctorDetail({ doctor }) {
	const formatDate = (dateString) => {
		if (!dateString) return "-";
		return new Date(dateString).toLocaleDateString("id-ID", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const getGenderLabel = (gender) => {
		return gender === "L" ? "Laki-laki" : "Perempuan";
	};

	if (!doctor) {
		return (
			<div className="h-full flex items-center justify-center p-8">
				<div className="text-center">
					<div className="text-6xl mb-4">👨‍⚕️</div>
					<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
						Pilih Dokter
					</h3>
					<p className="text-gray-600 dark:text-gray-400">
						Pilih dokter dari daftar untuk melihat detail informasi
					</p>
				</div>
			</div>
		);
	}

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={doctor.kd_dokter}
				variants={detailVariants}
				initial="hidden"
				animate="visible"
				exit="exit"
				className="h-full overflow-hidden"
			>
				{/* Doctor Info Header - Compact with glassmorphism matching header style */}
				<div className="px-4 py-2.5 bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 dark:from-gray-800/50 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className="flex items-center gap-2"
					>
						<div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md">
							<UserIcon className="h-4 w-4 text-white" />
						</div>
						<div className="flex-1 min-w-0">
							<h2 className="text-sm font-bold text-gray-900 dark:text-white truncate leading-tight">
								{doctor.nm_dokter}
							</h2>
							<div className="flex items-center gap-1.5 mt-0.5">
								<p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">Kode: {doctor.kd_dokter}</p>
								<StatusBadge status={doctor.status} />
							</div>
						</div>
					</motion.div>
				</div>

				{/* Content - Compact Grid Layout */}
				<div className="p-4">
					<motion.div
						variants={cardVariants}
						initial="hidden"
						animate="visible"
						className="grid grid-cols-1 md:grid-cols-2 gap-4"
					>
						{/* Personal Information */}
						<div className="md:col-span-2">
							<h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-1.5">
								<IdentificationIcon className="h-4 w-4" />
								Informasi Personal
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
								<DetailItem
									icon={UserIcon}
									label="Jenis Kelamin"
									value={getGenderLabel(doctor.jk)}
								/>
								<DetailItem
									icon={MapPinIcon}
									label="Tempat Lahir"
									value={doctor.tmp_lahir}
								/>
								<DetailItem
									icon={CalendarIcon}
									label="Tanggal Lahir"
									value={formatDate(doctor.tgl_lahir)}
								/>
								<DetailItem
									icon={HeartIcon}
									label="Golongan Darah"
									value={doctor.gol_drh}
								/>
								<DetailItem
									icon={UserIcon}
									label="Agama"
									value={doctor.agama}
								/>
								<DetailItem
									icon={UserIcon}
									label="Status Pernikahan"
									value={doctor.stts_nikah}
								/>
							</div>
						</div>

						{/* Contact Information */}
						<div>
							<h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-1.5">
								<PhoneIcon className="h-4 w-4" />
								Kontak & Alamat
							</h3>
							<div className="space-y-2">
								<DetailItem
									icon={PhoneIcon}
									label="No. Telepon"
									value={doctor.no_telp}
								/>
								<DetailItem
									icon={MapPinIcon}
									label="Alamat"
									value={doctor.almt_tgl}
									className="items-start"
								/>
							</div>
						</div>

						{/* Professional Information */}
						<div>
							<h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-1.5">
								<AcademicCapIcon className="h-4 w-4" />
								Informasi Profesional
							</h3>
							<div className="space-y-2">
								<DetailItem
									icon={IdentificationIcon}
									label="Kode Spesialisasi"
									value={doctor.kd_sps}
								/>
								<DetailItem
									icon={AcademicCapIcon}
									label="Alumni"
									value={doctor.alumni}
								/>
								<DetailItem
									icon={DocumentTextIcon}
									label="No. Ijin Praktek"
									value={doctor.no_ijn_praktek}
									className="items-start"
								/>
							</div>
						</div>

						{/* Employee Relation */}
						{doctor.pegawai && (
							<div className="md:col-span-2">
								<h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-1.5">
									<UserIcon className="h-4 w-4" />
									Data Pegawai
								</h3>
								<motion.div
									variants={cardVariants}
									initial="hidden"
									animate="visible"
									className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
								>
									<p className="text-xs text-blue-800 dark:text-blue-300 font-medium">
										Dokter ini terdaftar sebagai pegawai dengan NIK:{" "}
										{doctor.pegawai.nik}
									</p>
									<p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
										Nama: {doctor.pegawai.nama}
									</p>
								</motion.div>
							</div>
						)}

						{/* Statistics */}
						{doctor.reg_periksas_count !== undefined && (
							<div className="md:col-span-2">
								<h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-1.5">
									<DocumentTextIcon className="h-4 w-4" />
									Statistik
								</h3>
								<motion.div
									variants={cardVariants}
									initial="hidden"
									animate="visible"
									className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 text-center"
								>
									<p className="text-xl font-bold text-green-800 dark:text-green-300">
										{doctor.reg_periksas_count || 0}
									</p>
									<p className="text-xs text-green-600 dark:text-green-400 font-medium">
										Total Pemeriksaan
									</p>
								</motion.div>
							</div>
						)}
					</motion.div>
				</div>
			</motion.div>
		</AnimatePresence>
	);
}
