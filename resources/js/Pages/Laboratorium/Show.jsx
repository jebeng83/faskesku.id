import React, { useState, useEffect } from "react";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
import { motion, AnimatePresence } from "framer-motion";
import SidebarLaboratorium from "@/Layouts/SidebarLaboratorium";
import Alert from "@/Components/Alert";
import SearchableSelect from "@/Components/SearchableSelect";
import { ArrowLeft, Printer, ClipboardList, Save, X } from "lucide-react";

// Framer Motion Variants
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
	hidden: { opacity: 0, y: 30, scale: 0.95 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.5,
			ease: [0.22, 1, 0.36, 1],
		},
	},
};

const cardHoverVariants = {
	rest: { scale: 1, y: 0 },
	hover: {
		scale: 1.01,
		y: -4,
		transition: {
			duration: 0.3,
			ease: "easeOut",
		},
	},
};

export default function Show({ 
	periksaLab, 
	periksaGroup,
	permintaanLab, 
	groupedDetails, 
	petugas, 
	dokters, 
	usiaTahun, 
	mode = 'periksa-lab',
	flash,
	errors: pageErrors,
	permintaanNoorder,
}) {
	const [showAlert, setShowAlert] = useState(false);
	const [alertConfig, setAlertConfig] = useState({
		type: "success",
		title: "",
		message: "",
		autoClose: false,
	});

	// Form untuk input hasil
	const { data, setData, post, processing, errors } = useForm({
		tgl_periksa: new Date().toISOString().split('T')[0],
		jam: new Date().toTimeString().slice(0, 8),
		kd_ptg: '',
		kd_dokter_pj: '',
		hasil: [],
	});

	// Initialize hasil dari groupedDetails jika mode input-hasil
	useEffect(() => {
		if (mode === 'input-hasil' && groupedDetails && Array.isArray(groupedDetails)) {
			const initialHasil = [];
			groupedDetails.forEach((group) => {
				if (group.templates && Array.isArray(group.templates)) {
					group.templates.forEach((template) => {
						const nilaiRujukan = getNilaiRujukan(template, permintaanLab?.reg_periksa?.patient?.jk, usiaTahun);
						initialHasil.push({
							id_template: template.id_template,
							hasil: '',
							nilai_rujukan: nilaiRujukan,
							keterangan: 'N', // Default "N" (Normal) - akan diupdate otomatis saat user input hasil
						});
					});
				}
			});
			setData('hasil', initialHasil);
		}
	}, [mode, groupedDetails]);

	// Handle flash messages
	useEffect(() => {
		if (flash?.success) {
			setAlertConfig({
				type: 'success',
				title: 'Berhasil',
				message: flash.success,
				autoClose: true,
			});
			setShowAlert(true);
		}
		if (flash?.error || pageErrors?.error) {
			setAlertConfig({
				type: 'error',
				title: 'Error',
				message: flash?.error || pageErrors?.error || 'Terjadi kesalahan',
				autoClose: false,
			});
			setShowAlert(true);
		}
	}, [flash, pageErrors]);

	const getStatusBadge = (status) => {
		const statusClasses = {
			Menunggu: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
			Proses: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
			Selesai: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
		};

		return (
			<span
				className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
					statusClasses[status] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
				}`}
			>
				{status}
			</span>
		);
	};

	const getNilaiRujukan = (template, jk, usia) => {
		if (!template) return '';
		
		// Pastikan usia adalah integer untuk perbandingan
		const usiaInt = usia !== null && usia !== undefined ? Math.floor(usia) : null;
		
		// ld = laki dewasa, la = laki anak, pd = perempuan dewasa, pa = perempuan anak
		if (jk === 'L') {
			if (usiaInt && usiaInt < 18 && template.nilai_rujukan_la) {
				return template.nilai_rujukan_la;
			} else if (template.nilai_rujukan_ld) {
				return template.nilai_rujukan_ld;
			}
		} else if (jk === 'P') {
			if (usiaInt && usiaInt < 18 && template.nilai_rujukan_pa) {
				return template.nilai_rujukan_pa;
			} else if (template.nilai_rujukan_pd) {
				return template.nilai_rujukan_pd;
			}
		}

		// Default fallback
		return template.nilai_rujukan_ld || template.nilai_rujukan_pd || template.nilai_rujukan_la || template.nilai_rujukan_pa || '';
	};

	/**
	 * Parse nilai rujukan dari string menjadi min dan max
	 * Format yang didukung:
	 * - "13.5-18.0" → { min: 13.5, max: 18.0 }
	 * - "13.5" → { min: 13.5, max: 13.5 }
	 * - "< 5.0" → { min: null, max: 5.0 }
	 * - "> 20.0" → { min: 20.0, max: null }
	 */
	const parseNilaiRujukan = (nilaiRujukanStr) => {
		if (!nilaiRujukanStr || typeof nilaiRujukanStr !== 'string') {
			return { min: null, max: null };
		}

		const trimmed = nilaiRujukanStr.trim();
		
		// Handle format "< 5.0" atau "> 20.0"
		if (trimmed.startsWith('<')) {
			const max = parseFloat(trimmed.replace('<', '').trim());
			return { min: null, max: isNaN(max) ? null : max };
		}
		if (trimmed.startsWith('>')) {
			const min = parseFloat(trimmed.replace('>', '').trim());
			return { min: isNaN(min) ? null : min, max: null };
		}

		// Handle format range "13.5-18.0" atau "13.5 - 18.0"
		if (trimmed.includes('-')) {
			const parts = trimmed.split('-').map(p => p.trim());
			if (parts.length === 2) {
				const min = parseFloat(parts[0]);
				const max = parseFloat(parts[1]);
				return {
					min: isNaN(min) ? null : min,
					max: isNaN(max) ? null : max
				};
			}
		}

		// Handle single value "13.5"
		const singleValue = parseFloat(trimmed);
		if (!isNaN(singleValue)) {
			return { min: singleValue, max: singleValue };
		}

		return { min: null, max: null };
	};

	/**
	 * Tentukan keterangan berdasarkan hasil dan nilai rujukan
	 * @param {string|number} hasil - Nilai hasil pemeriksaan
	 * @param {string} nilaiRujukan - String nilai rujukan (format: "13.5-18.0")
	 * @returns {string} - "L" (Low), "H" (High), "K" (Critical), atau "" (Normal/Kosong)
	 */
	const tentukanKeterangan = (hasil, nilaiRujukan) => {
		if (!hasil || hasil === '') {
			return '';
		}

		// Parse hasil menjadi number
		const hasilNum = parseFloat(hasil);
		if (isNaN(hasilNum)) {
			return ''; // Jika hasil tidak valid, return kosong
		}

		// Parse nilai rujukan
		const { min, max } = parseNilaiRujukan(nilaiRujukan);
		
		if (min === null && max === null) {
			return ''; // Tidak ada nilai rujukan yang valid
		}

		// Hitung persentase deviasi dari nilai rujukan untuk menentukan nilai kritis
		// Nilai kritis hanya untuk kasus yang sangat ekstrem (deviasi > 100% dari rentang atau nilai sangat ekstrem)
		let isCritical = false;
		
		if (min !== null && max !== null) {
			const range = max - min;
			
			// Jika hasil di bawah minimum
			if (hasilNum < min) {
				const deviation = ((min - hasilNum) / range) * 100;
				// Nilai kritis jika:
				// 1. Deviasi > 100% dari rentang (hasil sangat jauh di bawah min)
				// 2. Hasil < 50% dari nilai minimum (untuk nilai yang sangat rendah)
				isCritical = deviation > 100 || (min > 0 && hasilNum < (min * 0.5));
			}
			// Jika hasil di atas maximum
			else if (hasilNum > max) {
				const deviation = ((hasilNum - max) / range) * 100;
				// Nilai kritis jika:
				// 1. Deviasi > 100% dari rentang (hasil sangat jauh di atas max)
				// 2. Hasil > 2x dari nilai maksimum
				isCritical = deviation > 100 || hasilNum > (max * 2);
			}
		} else if (min !== null && hasilNum < min) {
			// Format "> 20.0" - hasil harus > min
			const deviation = ((min - hasilNum) / min) * 100;
			// Nilai kritis jika deviasi > 100% atau hasil < 50% dari min
			isCritical = deviation > 100 || (min > 0 && hasilNum < (min * 0.5));
		} else if (max !== null && hasilNum > max) {
			// Format "< 5.0" - hasil harus < max
			const deviation = ((hasilNum - max) / max) * 100;
			// Nilai kritis jika deviasi > 100% atau hasil > 2x dari max
			isCritical = deviation > 100 || hasilNum > (max * 2);
		}

		// Tentukan keterangan
		if (min !== null && max !== null) {
			// Format range "13.5-18.0"
			if (hasilNum < min) {
				return isCritical ? 'K' : 'L';
			} else if (hasilNum > max) {
				return isCritical ? 'K' : 'H';
			}
		} else if (min !== null) {
			// Format "> 20.0" - hasil harus > min
			if (hasilNum < min) {
				return isCritical ? 'K' : 'L';
			}
		} else if (max !== null) {
			// Format "< 5.0" - hasil harus < max
			if (hasilNum > max) {
				return isCritical ? 'K' : 'H';
			}
		}

		// Normal (dalam rentang)
		return '';
	};

	const handlePrint = () => {
		window.print();
	};

	const handleSubmitHasil = (e) => {
		e.preventDefault();
		
		// Pastikan semua hasil yang terisi memiliki keterangan yang valid
		// Hitung ulang keterangan untuk semua hasil yang sudah diisi
		const hasilDenganKeterangan = data.hasil.map(item => {
			if (item.hasil && item.hasil.trim() !== '' && item.nilai_rujukan && item.nilai_rujukan.trim() !== '') {
				// Hitung keterangan jika belum ada atau kosong
				if (!item.keterangan || item.keterangan.trim() === '') {
					item.keterangan = tentukanKeterangan(item.hasil, item.nilai_rujukan) || 'N';
				}
			} else if (item.hasil && item.hasil.trim() !== '') {
				// Jika ada hasil tapi tidak ada nilai rujukan, set default "N"
				item.keterangan = item.keterangan || 'N';
			}
			return item;
		});
		
		// Validasi sesuai dengan logika Java: cek apakah ada hasil yang belum diisi
		const emptyResults = hasilDenganKeterangan.filter(item => !item.hasil || item.hasil.trim() === '');
		const hasEmptyResult = emptyResults.length > 0;
		
		// Validasi wajib: pasien, petugas, dokter perujuk, dokter PJ
		if (!permintaanLab?.no_rawat || !data.kd_ptg || !data.kd_dokter_pj) {
			setAlertConfig({
				type: 'error',
				title: 'Validasi Gagal',
				message: 'Data pasien, petugas, dan dokter penanggung jawab harus terisi.',
				autoClose: true,
			});
			setShowAlert(true);
			return;
		}
		
		// Validasi: minimal ada 1 pemeriksaan dengan hasil terisi
		const filledResults = hasilDenganKeterangan.filter(item => item.hasil && item.hasil.trim() !== '');
		if (filledResults.length === 0) {
			setAlertConfig({
				type: 'error',
				title: 'Validasi Gagal',
				message: 'Minimal ada 1 pemeriksaan dengan hasil yang terisi.',
				autoClose: true,
			});
			setShowAlert(true);
			return;
		}
		
		// Jika ada hasil yang belum diisi, konfirmasi dulu (seperti di Java)
		if (hasEmptyResult) {
			const confirmMessage = `Ada ${emptyResults.length} hasil lab yang belum diisi. Yakin mau disimpan?`;
			if (!window.confirm(confirmMessage)) {
				return; // User membatalkan
			}
		}
		
		// Update data dengan keterangan yang sudah dihitung sebelum submit
		setData('hasil', hasilDenganKeterangan);
		
		// Submit dengan data yang sudah diperbarui
		// Gunakan setTimeout untuk memastikan setData sudah selesai sebelum post
		setTimeout(() => {
			post(route('laboratorium.permintaan-lab.store-hasil', permintaanLab.noorder), {
				preserveScroll: false,
				preserveState: false, // Pastikan state di-refresh setelah redirect
				onSuccess: (page) => {
					// Flash message dari backend akan ditangani oleh useEffect
					// Data akan otomatis ter-refresh karena redirect ke Index dengan data terbaru
					// Tidak perlu set alert di sini karena redirect akan membawa flash message
				},
				onError: (errors) => {
					// Tampilkan error alert jika ada error
					const errorMessage = errors?.error || errors?.message || 
						Object.values(errors).flat().join(', ') || 
						'Terjadi kesalahan saat menyimpan hasil pemeriksaan.';
					
					setAlertConfig({
						type: 'error',
						title: 'Gagal Menyimpan',
						message: errorMessage,
						autoClose: true,
					});
					setShowAlert(true);
				},
			});
		}, 0);
	};

	const updateHasil = (index, field, value) => {
		const newHasil = [...data.hasil];
		newHasil[index][field] = value;
		
		// Auto-populate keterangan jika field yang diubah adalah 'hasil' atau 'nilai_rujukan'
		if (field === 'hasil' || field === 'nilai_rujukan') {
			const currentHasil = field === 'hasil' ? value : newHasil[index].hasil;
			const currentNilaiRujukan = field === 'nilai_rujukan' ? value : newHasil[index].nilai_rujukan;
			
			// Jika kedua nilai sudah ada, tentukan keterangan
			if (currentHasil && currentHasil !== '' && currentNilaiRujukan && currentNilaiRujukan !== '') {
				const keterangan = tentukanKeterangan(currentHasil, currentNilaiRujukan);
				newHasil[index].keterangan = keterangan || 'N'; // Default "N" jika kosong
			} else if (field === 'hasil' && (!currentHasil || currentHasil === '')) {
				// Jika hasil dihapus, set keterangan ke "N" (default)
				newHasil[index].keterangan = 'N';
			}
		}
		
		setData('hasil', newHasil);
	};

	// Render berdasarkan mode
	if (mode === 'input-hasil' && permintaanLab) {
		return (
			<SidebarLaboratorium title="Input Hasil Pemeriksaan">
				<Head title={`Input Hasil - ${permintaanLab.noorder}`} />

				{showAlert && (
					<Alert
						type={alertConfig.type}
						title={alertConfig.title}
						message={alertConfig.message}
						autoClose={alertConfig.autoClose}
						onClose={() => setShowAlert(false)}
					/>
				)}

			<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 py-8">
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="mx-auto px-4 sm:px-6 lg:px-12 xl:px-16"
				>
					{/* Header */}
					<motion.div
						variants={itemVariants}
						className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 mb-8"
					>
						{/* Top border gradient */}
						<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
						
						{/* Gradient overlay */}
						<div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10 pointer-events-none" />
						
						<div className="relative p-8">
							<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
								<div>
									<motion.h1
										className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.6, delay: 0.2 }}
									>
										Input Hasil Pemeriksaan Laboratorium
									</motion.h1>
									<motion.p
										className="mt-2 text-sm text-gray-600 dark:text-gray-400"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ duration: 0.6, delay: 0.3 }}
									>
										No. Order: <span className="font-mono font-semibold text-gray-900 dark:text-white">{permintaanLab.noorder}</span>
									</motion.p>
								</div>
								<motion.div
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.6, delay: 0.2 }}
								>
									<Link
										href={route("laboratorium.permintaan-lab.index")}
										className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-all duration-200"
									>
										<ArrowLeft className="w-4 h-4" />
										Kembali
									</Link>
								</motion.div>
							</div>
						</div>
					</motion.div>

					<form onSubmit={handleSubmitHasil}>
						{/* Patient Information & Petugas & Dokter Cards - Side by Side */}
						<motion.div
							variants={itemVariants}
							className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
						>
							{/* Patient Information Card */}
							<motion.div
								variants={itemVariants}
								className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5"
							>
								{/* Top border gradient */}
								<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
								
								<div className="relative px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
									<h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2.5">
										<motion.div
											className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md"
											whileHover={{ rotate: 90, scale: 1.1 }}
											transition={{ duration: 0.3 }}
										>
											<ClipboardList className="w-4 h-4 text-white" />
										</motion.div>
										<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
											Informasi Pasien
										</span>
									</h2>
								</div>
								<div className="relative p-8">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
												Nama Pasien
											</label>
											<p className="mt-1 text-sm text-gray-900 dark:text-white font-medium">
												{permintaanLab.reg_periksa?.patient?.nm_pasien || "-"}
											</p>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
												No. RM
											</label>
											<p className="mt-1 text-sm text-gray-900 dark:text-white font-medium">
												{permintaanLab.reg_periksa?.patient?.no_rkm_medis || "-"}
											</p>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
												Jenis Kelamin
											</label>
											<p className="mt-1 text-sm text-gray-900 dark:text-white font-medium">
												{permintaanLab.reg_periksa?.patient?.jk === "L"
													? "Laki-laki"
													: permintaanLab.reg_periksa?.patient?.jk === "P"
													? "Perempuan"
													: "-"}
											</p>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
												Umur
											</label>
											<p className="mt-1 text-sm text-gray-900 dark:text-white font-medium">
												{usiaTahun !== null && usiaTahun !== undefined 
													? `${Math.floor(usiaTahun)} tahun` 
													: "-"}
											</p>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
												No. Rawat
											</label>
											<p className="mt-1 text-sm text-gray-900 dark:text-white font-medium">
												{permintaanLab.no_rawat || "-"}
											</p>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
												Dokter Perujuk
											</label>
											<p className="mt-1 text-sm text-gray-900 dark:text-white font-medium">
												{permintaanLab.dokter?.nm_dokter || permintaanLab.dokter_perujuk || "-"}
											</p>
										</div>
									</div>
								</div>
							</motion.div>

							{/* Form Input Petugas & Dokter PJ */}
							<motion.div
								variants={itemVariants}
								className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5"
							>
							{/* Top border gradient */}
							<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
							
							<div className="relative px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-indigo-50/80 via-purple-50/80 to-pink-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
								<h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2.5">
									<motion.div
										className="p-1.5 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md"
										whileHover={{ rotate: 90, scale: 1.1 }}
										transition={{ duration: 0.3 }}
									>
										<Save className="w-4 h-4 text-white" />
									</motion.div>
									<span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
										Data Petugas & Dokter
									</span>
								</h2>
							</div>
							<div className="relative p-8">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
											Tanggal Hasil <span className="text-red-500">*</span>
										</label>
										<input
											type="date"
											value={data.tgl_periksa}
											onChange={(e) => setData('tgl_periksa', e.target.value)}
											className="w-full px-4 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:bg-gray-700/80 dark:text-white backdrop-blur-sm transition-all duration-200"
											required
										/>
										{errors.tgl_periksa && (
											<p className="mt-1 text-sm text-red-600">{errors.tgl_periksa}</p>
										)}
									</div>
									<div>
										<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
											Jam Hasil <span className="text-red-500">*</span>
										</label>
										<input
											type="time"
											value={data.jam}
											onChange={(e) => setData('jam', e.target.value + ':00')}
											className="w-full px-4 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:bg-gray-700/80 dark:text-white backdrop-blur-sm transition-all duration-200"
											required
										/>
										{errors.jam && (
											<p className="mt-1 text-sm text-red-600">{errors.jam}</p>
										)}
									</div>
									<div>
										<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
											Petugas <span className="text-red-500">*</span>
										</label>
										<SearchableSelect
											source="petugas"
											value={data.kd_ptg}
											onChange={(value) => setData('kd_ptg', value)}
											placeholder="Pilih Petugas"
											searchPlaceholder="Cari petugas (NIP atau Nama)..."
											className="w-full"
											error={!!errors.kd_ptg}
										/>
										{errors.kd_ptg && (
											<p className="mt-1 text-sm text-red-600">{errors.kd_ptg}</p>
										)}
									</div>
									<div>
										<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
											Dokter Penanggung Jawab <span className="text-red-500">*</span>
										</label>
										<select
											value={data.kd_dokter_pj}
											onChange={(e) => setData('kd_dokter_pj', e.target.value)}
											className="w-full px-4 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:bg-gray-700/80 dark:text-white backdrop-blur-sm transition-all duration-200"
											required
										>
											<option value="">Pilih Dokter</option>
											{dokters?.map((dokter) => (
												<option key={dokter.kd_dokter} value={dokter.kd_dokter}>
													{dokter.nm_dokter}
												</option>
											))}
										</select>
										{errors.kd_dokter_pj && (
											<p className="mt-1 text-sm text-red-600">{errors.kd_dokter_pj}</p>
										)}
									</div>
								</div>
							</div>
						</motion.div>
						</motion.div>

						{/* Form Input Hasil Pemeriksaan */}
						{groupedDetails && Array.isArray(groupedDetails) && groupedDetails.length > 0 && (
							<motion.div
								variants={itemVariants}
								className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 mb-8"
							>
								{/* Top border gradient */}
								<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500" />
								
								<div className="relative px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-purple-50/80 via-pink-50/80 to-rose-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
									<h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2.5">
										<motion.div
											className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 shadow-md"
											whileHover={{ rotate: 90, scale: 1.1 }}
											transition={{ duration: 0.3 }}
										>
											<ClipboardList className="w-4 h-4 text-white" />
										</motion.div>
										<span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
											Input Hasil Pemeriksaan
										</span>
									</h2>
								</div>
								<div className="relative p-8">
									{groupedDetails.map((group, groupIndex) => (
										<motion.div
											key={group.kd_jenis_prw}
											variants={itemVariants}
											className="mb-8 last:mb-0"
										>
											<h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
												<span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
													{group.nm_perawatan}
												</span>
											</h3>
											<div className="overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
												<table className="min-w-full divide-y divide-gray-200/50 dark:divide-gray-700/30">
													<thead className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
														<tr>
															<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
																Pemeriksaan
															</th>
															<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
																Hasil <span className="text-red-500">*</span>
															</th>
															<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
																Nilai Rujukan
															</th>
															<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
																Satuan
															</th>
															<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
																Keterangan
															</th>
														</tr>
													</thead>
													<tbody className="bg-white/50 dark:bg-gray-800/50 divide-y divide-gray-200/50 dark:divide-gray-700/30">
														<AnimatePresence>
															{group.templates && Array.isArray(group.templates) && group.templates.map((template, templateIndex) => {
																const hasilIndex = data.hasil.findIndex(h => h.id_template === template.id_template);
																return (
																	<motion.tr
																		key={template.id_template}
																		className="border-b border-gray-100/50 dark:border-gray-700/30 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-gray-700/50 dark:hover:to-gray-800/50 transition-all duration-200 group"
																		initial={{ opacity: 0, x: -20 }}
																		animate={{ opacity: 1, x: 0 }}
																		exit={{ opacity: 0, x: 20 }}
																		transition={{ delay: templateIndex * 0.02 }}
																		whileHover={{ scale: 1.01 }}
																	>
																		<td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
																			{template.pemeriksaan}
																		</td>
																		<td className="px-4 py-4 whitespace-nowrap">
																			<input
																				type="text"
																				value={hasilIndex >= 0 ? data.hasil[hasilIndex].hasil : ''}
																				onChange={(e) => updateHasil(hasilIndex, 'hasil', e.target.value)}
																				className="w-full px-4 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:bg-gray-700/80 dark:text-white backdrop-blur-sm transition-all duration-200"
																				required
																			/>
																		</td>
																		<td className="px-4 py-4 whitespace-nowrap">
																			<input
																				type="text"
																				value={hasilIndex >= 0 ? data.hasil[hasilIndex].nilai_rujukan : getNilaiRujukan(template, permintaanLab?.reg_periksa?.patient?.jk, usiaTahun)}
																				onChange={(e) => updateHasil(hasilIndex, 'nilai_rujukan', e.target.value)}
																				className="w-full px-4 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:bg-gray-700/80 dark:text-white backdrop-blur-sm transition-all duration-200"
																			/>
																		</td>
																		<td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
																			{template.satuan || "-"}
																		</td>
																		<td className="px-4 py-4 whitespace-nowrap">
																			<input
																				type="text"
																				value={hasilIndex >= 0 ? data.hasil[hasilIndex].keterangan : ''}
																				onChange={(e) => updateHasil(hasilIndex, 'keterangan', e.target.value)}
																				className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:bg-gray-700/80 dark:text-white backdrop-blur-sm transition-all duration-200 ${
																					hasilIndex >= 0 && data.hasil[hasilIndex]?.keterangan === 'K'
																						? 'border-red-500 bg-red-50/80 dark:border-red-600 dark:bg-red-900/30'
																						: hasilIndex >= 0 && data.hasil[hasilIndex]?.keterangan === 'H'
																						? 'border-orange-500 bg-orange-50/80 dark:border-orange-600 dark:bg-orange-900/30'
																						: hasilIndex >= 0 && data.hasil[hasilIndex]?.keterangan === 'L'
																						? 'border-yellow-500 bg-yellow-50/80 dark:border-yellow-600 dark:bg-yellow-900/30'
																						: 'border-gray-300/50 dark:border-gray-600/50'
																				}`}
																				placeholder="L/H/K (auto)"
																			/>
																			{hasilIndex >= 0 && data.hasil[hasilIndex]?.keterangan && (
																				<motion.p
																					className="mt-1 text-xs font-semibold"
																					initial={{ opacity: 0 }}
																					animate={{ opacity: 1 }}
																				>
																					{data.hasil[hasilIndex].keterangan === 'K' && <span className="text-red-600 dark:text-red-400">⚠️ Kritis</span>}
																					{data.hasil[hasilIndex].keterangan === 'H' && <span className="text-orange-600 dark:text-orange-400">↑ Tinggi</span>}
																					{data.hasil[hasilIndex].keterangan === 'L' && <span className="text-yellow-600 dark:text-yellow-400">↓ Rendah</span>}
																				</motion.p>
																			)}
																		</td>
																	</motion.tr>
																);
															})}
														</AnimatePresence>
													</tbody>
												</table>
											</div>
										</motion.div>
									))}
								</div>
							</motion.div>
						)}

					{/* Submit Button */}
					<motion.div
						variants={itemVariants}
						className="flex justify-end gap-3 pt-6"
					>
						<Link
							href={route("laboratorium.permintaan-lab.index")}
							className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-all duration-200"
						>
							<X className="w-4 h-4" />
							Batal
						</Link>
						<motion.button
							type="submit"
							disabled={processing}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300 text-white font-semibold rounded-lg disabled:opacity-25 disabled:cursor-not-allowed"
						>
							<Save className="w-4 h-4" />
							{processing ? 'Menyimpan...' : 'Simpan Hasil'}
						</motion.button>
					</motion.div>
					</form>
				</motion.div>
			</div>
		</SidebarLaboratorium>
	);
	}

	// Mode detail permintaan atau periksa lab (existing)
	const dataSource = permintaanLab || periksaLab;
	const isPermintaanMode = !!permintaanLab;

	return (
		<SidebarLaboratorium title={isPermintaanMode ? "Detail Permintaan Laboratorium" : "Detail Pemeriksaan Laboratorium"}>
			<Head title={`Detail ${isPermintaanMode ? 'Permintaan' : 'Pemeriksaan'} - ${dataSource?.noorder || dataSource?.no_rawat}`} />

			{showAlert && (
				<Alert
					type={alertConfig.type}
					title={alertConfig.title}
					message={alertConfig.message}
					autoClose={alertConfig.autoClose}
					onClose={() => setShowAlert(false)}
				/>
			)}

		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 py-8">
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="mx-auto px-4 sm:px-6 lg:px-12 xl:px-16"
			>
				{/* Header */}
				<motion.div
					variants={itemVariants}
					className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 mb-8"
				>
					{/* Top border gradient */}
					<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
					
					{/* Gradient overlay */}
					<div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10 pointer-events-none" />
					
					<div className="relative p-8">
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
							<div>
								<motion.h1
									className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.6, delay: 0.2 }}
								>
									{isPermintaanMode ? 'Detail Permintaan Laboratorium' : 'Detail Pemeriksaan Laboratorium'}
								</motion.h1>
								<motion.p
									className="mt-2 text-sm text-gray-600 dark:text-gray-400"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.6, delay: 0.3 }}
								>
									{isPermintaanMode ? `No. Order: ` : `No. Rawat: `}
									<span className="font-mono font-semibold text-gray-900 dark:text-white">
										{isPermintaanMode ? permintaanLab.noorder : periksaLab?.no_rawat}
									</span>
								</motion.p>
							</div>
							<motion.div
								className="flex flex-wrap gap-3"
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6, delay: 0.2 }}
							>
								<Link
									href={isPermintaanMode ? route("laboratorium.permintaan-lab.index") : route("laboratorium.index")}
									className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-all duration-200"
								>
									<ArrowLeft className="w-4 h-4" />
									Kembali
								</Link>
								{isPermintaanMode && permintaanLab.tgl_sampel && permintaanLab.tgl_sampel !== "0000-00-00" && !permintaanLab.tgl_hasil && (
									<Link
										href={route("laboratorium.permintaan-lab.input-hasil", permintaanLab.noorder)}
										className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 text-white font-semibold rounded-lg"
									>
										<ClipboardList className="w-4 h-4" />
										Input Hasil
									</Link>
								)}
								{!isPermintaanMode && (
									permintaanNoorder ? (
										<a
											href={route("laboratorium.permintaan-lab.preview", permintaanNoorder)}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300 text-white font-semibold rounded-lg"
										>
											<Printer className="w-4 h-4" />
											Cetak
										</a>
									) : (
										<motion.button
											onClick={handlePrint}
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300 text-white font-semibold rounded-lg"
										>
											<Printer className="w-4 h-4" />
											Cetak
										</motion.button>
									)
								)}
							</motion.div>
						</div>
					</div>
				</motion.div>

				{/* Detail Permintaan atau Pemeriksaan */}
					{isPermintaanMode ? (
						<>
							{/* Request Information Card */}
							<motion.div
								variants={itemVariants}
								className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 mb-8"
							>
								{/* Top border gradient */}
								<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
								
								<div className="relative px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-indigo-50/80 via-purple-50/80 to-pink-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
									<h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2.5">
										<motion.div
											className="p-1.5 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md"
											whileHover={{ rotate: 90, scale: 1.1 }}
											transition={{ duration: 0.3 }}
										>
											<ClipboardList className="w-4 h-4 text-white" />
										</motion.div>
										<span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
											Informasi Permintaan
										</span>
									</h2>
								</div>
								<div className="relative p-8">
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
												No. Order
											</label>
											<p className="mt-1 text-sm text-gray-900 dark:text-white font-medium">
												{permintaanLab.noorder || "-"}
											</p>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
												Tanggal Permintaan
											</label>
											<p className="mt-1 text-sm text-gray-900 dark:text-white font-medium">
												{permintaanLab.tgl_permintaan
													? new Date(permintaanLab.tgl_permintaan).toLocaleDateString("id-ID")
													: "-"}
											</p>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
												Jam Permintaan
											</label>
											<p className="mt-1 text-sm text-gray-900 dark:text-white font-medium">
												{permintaanLab.jam_permintaan || "-"}
											</p>
										</div>
										{permintaanLab.tgl_sampel && permintaanLab.tgl_sampel !== "0000-00-00" && (
											<>
												<div>
													<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
														Tanggal Sampel
													</label>
													<p className="mt-1 text-sm text-gray-900 dark:text-white font-medium">
														{new Date(permintaanLab.tgl_sampel).toLocaleDateString("id-ID")}
													</p>
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
														Jam Sampel
													</label>
													<p className="mt-1 text-sm text-gray-900 dark:text-white font-medium">
														{permintaanLab.jam_sampel || "-"}
													</p>
												</div>
											</>
										)}
										{permintaanLab.tgl_hasil && permintaanLab.tgl_hasil !== "0000-00-00" && (
											<>
												<div>
													<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
														Tanggal Hasil
													</label>
													<p className="mt-1 text-sm text-gray-900 dark:text-white font-medium">
														{new Date(permintaanLab.tgl_hasil).toLocaleDateString("id-ID")}
													</p>
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
														Jam Hasil
													</label>
													<p className="mt-1 text-sm text-gray-900 dark:text-white font-medium">
														{permintaanLab.jam_hasil || "-"}
													</p>
												</div>
											</>
										)}
									</div>
									{permintaanLab.diagnosa_klinis && (
										<div className="mt-6">
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
												Diagnosa Klinis
											</label>
											<p className="mt-1 text-sm text-gray-900 dark:text-white">
												{permintaanLab.diagnosa_klinis}
											</p>
										</div>
									)}
								</div>
							</motion.div>

							{/* Detail Pemeriksaan Card */}
							{permintaanLab.detail_permintaan && permintaanLab.detail_permintaan.length > 0 && (
								<motion.div
									variants={itemVariants}
									className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5"
								>
									{/* Top border gradient */}
									<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500" />
									
									<div className="relative px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-purple-50/80 via-pink-50/80 to-rose-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
										<h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2.5">
											<motion.div
												className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 shadow-md"
												whileHover={{ rotate: 90, scale: 1.1 }}
												transition={{ duration: 0.3 }}
											>
												<ClipboardList className="w-4 h-4 text-white" />
											</motion.div>
											<span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
												Detail Pemeriksaan
											</span>
										</h2>
									</div>
									<div className="relative p-8">
										<div className="overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
											<table className="min-w-full divide-y divide-gray-200/50 dark:divide-gray-700/30">
												<thead className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
													<tr>
														<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
															No
														</th>
														<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
															Jenis Pemeriksaan
														</th>
														<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
															Template
														</th>
														<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
															Status Bayar
														</th>
													</tr>
												</thead>
												<tbody className="bg-white/50 dark:bg-gray-800/50 divide-y divide-gray-200/50 dark:divide-gray-700/30">
													<AnimatePresence>
														{permintaanLab.detail_permintaan.map((detail, index) => (
															<motion.tr
																key={index}
																className="border-b border-gray-100/50 dark:border-gray-700/30 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-gray-700/50 dark:hover:to-gray-800/50 transition-all duration-200 group"
																initial={{ opacity: 0, x: -20 }}
																animate={{ opacity: 1, x: 0 }}
																exit={{ opacity: 0, x: 20 }}
																transition={{ delay: index * 0.02 }}
																whileHover={{ scale: 1.01 }}
															>
															<td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
																{index + 1}
															</td>
															<td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
																{detail.jns_perawatan_lab?.nm_perawatan || detail.template_laboratorium?.jenisPerawatan?.nm_perawatan || "-"}
															</td>
															<td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
																{detail.template_laboratorium?.Pemeriksaan || "-"}
															</td>
															<td className="px-4 py-4 whitespace-nowrap">
																<motion.span
																	className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold ${
																		detail.stts_bayar === "Sudah"
																			? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 ring-1 ring-green-200 dark:ring-green-800"
																			: "bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/30 dark:to-amber-900/30 text-yellow-700 dark:text-yellow-300 ring-1 ring-yellow-200 dark:ring-yellow-800"
																	}`}
																	whileHover={{ scale: 1.05 }}
																>
																	{detail.stts_bayar || "Belum"}
																</motion.span>
															</td>
															</motion.tr>
														))}
													</AnimatePresence>
												</tbody>
											</table>
										</div>
									</div>
								</motion.div>
							)}
						</>
					) : (
						<>
							{/* Examination Information */}
							<motion.div
								variants={itemVariants}
								className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 mb-8"
							>
								{/* Top border gradient */}
								<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
								
								<div className="relative px-4 py-3 sm:px-6 sm:py-3 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-indigo-50/80 via-purple-50/80 to-pink-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
									<h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2.5 mb-2">
										<motion.div
											className="p-1.5 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md"
											whileHover={{ rotate: 90, scale: 1.1 }}
											transition={{ duration: 0.3 }}
										>
											<ClipboardList className="w-4 h-4 text-white" />
										</motion.div>
										<span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
											Informasi Pemeriksaan
										</span>
									</h2>
									<div className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
										<div className="flex flex-wrap items-center gap-x-3 gap-y-1">
											<span className="font-semibold text-gray-900 dark:text-white truncate max-w-full sm:max-w-xs">
												{periksaLab?.reg_periksa?.patient?.nm_pasien || "-"}
											</span>
											<span>
												RM{" "}
												<span className="font-medium text-gray-900 dark:text-white">
													{periksaLab?.reg_periksa?.patient?.no_rkm_medis || "-"}
												</span>
											</span>
											<span>
												JK{" "}
												<span className="font-medium text-gray-900 dark:text-white">
													{periksaLab?.reg_periksa?.patient?.jk === "L"
														? "Laki-laki"
														: periksaLab?.reg_periksa?.patient?.jk === "P"
														? "Perempuan"
														: "-"}
												</span>
											</span>
										</div>
										<div className="flex flex-wrap items-center gap-x-3 gap-y-1">
											<span>
												Tgl{" "}
												<span className="font-medium text-gray-900 dark:text-white">
													{periksaLab?.tgl_periksa
														? new Date(periksaLab.tgl_periksa).toLocaleDateString("id-ID", {
																day: "2-digit",
																month: "2-digit",
																year: "numeric",
															})
														: "-"}
												</span>
											</span>
											<span>
												Jam{" "}
												<span className="font-medium text-gray-900 dark:text-white">
													{periksaLab?.jam || "-"}
												</span>
											</span>
											<span>
												Petugas{" "}
												<span className="font-medium text-gray-900 dark:text-white">
													{periksaLab?.petugas?.nama || "-"}
												</span>
											</span>
											<span className="flex items-center gap-1">
												{periksaLab?.status ? (
													getStatusBadge(periksaLab.status)
												) : (
													<span className="font-medium text-gray-900 dark:text-white">-</span>
												)}
											</span>
										</div>
									</div>
								</div>
							</motion.div>

							{/* Examination Results */}
							{periksaLab && (
								<motion.div
									variants={itemVariants}
									className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5"
								>
									{/* Top border gradient */}
									<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500" />
									
									<div className="relative px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-purple-50/80 via-pink-50/80 to-rose-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
										<h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2.5">
											<motion.div
												className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 shadow-md"
												whileHover={{ rotate: 90, scale: 1.1 }}
												transition={{ duration: 0.3 }}
											>
												<ClipboardList className="w-4 h-4 text-white" />
											</motion.div>
											<span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
												Hasil Pemeriksaan
											</span>
										</h2>
									</div>
									<div className="relative p-8">
										<div className="overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
											<table className="min-w-full divide-y divide-gray-200/50 dark:divide-gray-700/30">
												<thead className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
													<tr>
														<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
															Jenis Pemeriksaan
														</th>
														<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
															Item Pemeriksaan
														</th>
														<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
															Hasil
														</th>
														<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
															Nilai Rujukan
														</th>
														<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
															Satuan
														</th>
														<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
															Keterangan
														</th>
													</tr>
												</thead>
												<tbody className="bg-white/50 dark:bg-gray-800/50 divide-y divide-gray-200/50 dark:divide-gray-700/30">
													{Array.isArray(periksaGroup) && periksaGroup.length > 0 ? (
														<AnimatePresence>
															{periksaGroup.flatMap((pemeriksaan, parentIndex) => {
																const jenisNama = pemeriksaan?.jenis_perawatan?.nm_perawatan || "-";
																const details = Array.isArray(pemeriksaan?.detail_pemeriksaan) ? pemeriksaan.detail_pemeriksaan : [];
																if (details.length === 0) {
																	return [
																		<motion.tr
																			key={`empty-${parentIndex}`}
																			className="border-b border-gray-100/50 dark:border-gray-700/30"
																			initial={{ opacity: 0, x: -20 }}
																			animate={{ opacity: 1, x: 0 }}
																			exit={{ opacity: 0, x: 20 }}
																			transition={{ delay: parentIndex * 0.02 }}
																		>
																			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
																				{jenisNama}
																			</td>
																			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400" colSpan={4}>
																				Tidak ada item pemeriksaan.
																			</td>
																		</motion.tr>
																	];
																}
																return details.map((detail, index) => {
																	const isFirstRow = index === 0;
																	return (
																		<motion.tr
																			key={`${parentIndex}-${index}`}
																			className="border-b border-gray-100/50 dark:border-gray-700/30 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-gray-700/50 dark:hover:to-gray-800/50 transition-all duration-200 group"
																			initial={{ opacity: 0, x: -20 }}
																			animate={{ opacity: 1, x: 0 }}
																			exit={{ opacity: 0, x: 20 }}
																			transition={{ delay: (parentIndex * 0.02) + (index * 0.01) }}
																			whileHover={{ scale: 1.01 }}
																		>
																			{isFirstRow && (
																				<td
																					rowSpan={details.length}
																					className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white align-top"
																				>
																					{jenisNama}
																				</td>
																			)}
																			<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
																				{detail.item_pemeriksaan || detail.template?.Pemeriksaan || "-"}
																			</td>
																			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
																				{detail.nilai || "-"}
																			</td>
																			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
																				{detail.nilai_rujukan || "-"}
																			</td>
																			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
																				{detail.satuan || detail.template?.satuan || "-"}
																			</td>
																			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
																				{detail.keterangan || "-"}
																			</td>
																		</motion.tr>
																	);
																});
															})}
														</AnimatePresence>
													) : (
														<tr>
															<td
																colSpan={6}
																className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500 dark:text-gray-400"
															>
																Tidak ada detail pemeriksaan.
															</td>
														</tr>
													)}
												</tbody>
											</table>
										</div>
									</div>
								</motion.div>
							)}
						</>
					)}
				</motion.div>
			</div>
		</SidebarLaboratorium>
	);
}
