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
		className={`flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${className}`}
	>
		<div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
			<Icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
				{label}
			</p>
			<p className="text-base font-semibold text-gray-900 dark:text-white mt-1 break-words">
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
			className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
				isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
			}`}
		>
			{isActive ? (
				<CheckCircleIcon className="h-4 w-4" />
			) : (
				<XCircleIcon className="h-4 w-4" />
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
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-full flex items-center justify-center"
			>
				<div className="text-center p-8">
					<div className="text-6xl mb-4">👨‍⚕️</div>
					<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
						Pilih Dokter
					</h3>
					<p className="text-gray-600 dark:text-gray-400">
						Pilih dokter dari daftar untuk melihat detail informasi
					</p>
				</div>
			</motion.div>
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
				className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-full overflow-hidden"
			>
				{/* Header */}
				<div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6">
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="flex items-center gap-4"
					>
						<div className="p-3 bg-white bg-opacity-20 rounded-full">
							<UserIcon className="h-8 w-8 text-black" />
						</div>
						<div className="flex-1">
							<h2 className="text-xl font-bold text-white">
								{doctor.nm_dokter}
							</h2>
							<p className="text-gray-300 text-sm">Kode: {doctor.kd_dokter}</p>
							<div className="mt-2">
								<StatusBadge status={doctor.status} />
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
						className="space-y-1"
					>
						{/* Personal Information */}
						<div className="mb-6">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
								<IdentificationIcon className="h-5 w-5" />
								Informasi Personal
							</h3>
							<motion.div variants={cardVariants} className="space-y-1">
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
							</motion.div>
						</div>

						{/* Contact Information */}
						<div className="mb-6">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
								<PhoneIcon className="h-5 w-5" />
								Kontak & Alamat
							</h3>
							<motion.div variants={cardVariants} className="space-y-1">
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
							</motion.div>
						</div>

						{/* Professional Information */}
						<div className="mb-6">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
								<AcademicCapIcon className="h-5 w-5" />
								Informasi Profesional
							</h3>
							<motion.div variants={cardVariants} className="space-y-1">
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
							</motion.div>
						</div>

						{/* Employee Relation */}
						{doctor.pegawai && (
							<div className="mb-6">
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
									<UserIcon className="h-5 w-5" />
									Data Pegawai
								</h3>
								<motion.div
									variants={cardVariants}
									initial="hidden"
									animate="visible"
									className="p-4 bg-blue-50 rounded-lg border border-blue-200"
								>
									<p className="text-sm text-blue-800 font-medium">
										Dokter ini terdaftar sebagai pegawai dengan NIK:{" "}
										{doctor.pegawai.nik}
									</p>
									<p className="text-sm text-blue-600 mt-1">
										Nama: {doctor.pegawai.nama}
									</p>
								</motion.div>
							</div>
						)}

						{/* Statistics */}
						{doctor.reg_periksas_count !== undefined && (
							<div className="mb-6">
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
									<DocumentTextIcon className="h-5 w-5" />
									Statistik
								</h3>
								<motion.div
									variants={cardVariants}
									initial="hidden"
									animate="visible"
									className="grid grid-cols-1 gap-4"
								>
									<div className="p-4 bg-green-50 rounded-lg border border-green-200 text-center">
										<p className="text-2xl font-bold text-green-800">
											{doctor.reg_periksas_count || 0}
										</p>
										<p className="text-sm text-green-600 font-medium">
											Total Pemeriksaan
										</p>
									</div>
								</motion.div>
							</div>
						)}
					</motion.div>
				</div>
			</motion.div>
		</AnimatePresence>
	);
}
