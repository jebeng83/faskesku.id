import React, { useState, useEffect } from "react";
import { Head, Link, useForm, Form } from "@inertiajs/react";
import { route } from "ziggy-js";
import AppLayout from "@/Layouts/AppLayout";
import SelectWithAdd from "@/Components/SelectWithAdd";
import PenjabCreateModal from "@/Components/PenjabCreateModal";
import SearchableSelect from "@/Components/SearchableSelect";

export default function Create() {
	const [penjabOptions, setPenjabOptions] = useState([]);
	const [isPenjabModalOpen, setIsPenjabModalOpen] = useState(false);

	// Address states
	const [provinces, setProvinces] = useState([]);
	const [regencies, setRegencies] = useState([]);
	const [districts, setDistricts] = useState([]);
	const [villages, setVillages] = useState([]);
	const [loadingProvinces, setLoadingProvinces] = useState(false);
	const [loadingRegencies, setLoadingRegencies] = useState(false);
	const [loadingDistricts, setLoadingDistricts] = useState(false);
	const [loadingVillages, setLoadingVillages] = useState(false);

	const { data, setData, post, processing, errors } = useForm({
		nm_pasien: "",
		no_ktp: "",
		jk: "L",
		tmp_lahir: "",
		tgl_lahir: "",
		nm_ibu: "",
		alamat: "",
		gol_darah: "",
		pekerjaan: "",
		stts_nikah: "BELUM MENIKAH",
		agama: "",
		no_tlp: "",
		pnd: "SMA",
		keluarga: "DIRI SENDIRI",
		namakeluarga: "",
		kd_pj: "UMUM",
		no_peserta: "",
		pekerjaanpj: "",
		alamatpj: "",
		kelurahanpj: "",
		kecamatanpj: "",
		kabupatenpj: "",
		propinsipj: "",
		email: "",
	});

	// Load penjab options on component mount
	useEffect(() => {
		const loadPenjabOptions = async () => {
			try {
				const response = await fetch("/api/penjab");
				if (response.ok) {
					const result = await response.json();
					const options = result.data.map((penjab) => ({
						value: penjab.kd_pj,
						label: penjab.png_jawab,
					}));
					setPenjabOptions(options);
				}
			} catch (error) {
				console.error("Error loading penjab options:", error);
			}
		};

		loadPenjabOptions();
	}, []);

	// Load provinces on component mount
	useEffect(() => {
		const loadProvinces = async () => {
			setLoadingProvinces(true);
			try {
				const response = await fetch("/api/wilayah/provinces");
				if (response.ok) {
					const result = await response.json();
					const options = result.data.map((province) => ({
						value: province.code,
						label: province.name,
					}));
					setProvinces(options);
				}
			} catch (error) {
				console.error("Error loading provinces:", error);
			} finally {
				setLoadingProvinces(false);
			}
		};

		loadProvinces();
	}, []);

	// Form submission is now handled by the Form component

	const handleAddPenjab = () => {
		setIsPenjabModalOpen(true);
	};

	const handlePenjabSuccess = () => {
		// Reload penjab options after successful creation
		const loadPenjabOptions = async () => {
			try {
				const response = await fetch("/api/penjab");
				if (response.ok) {
					const result = await response.json();
					const options = result.data.map((penjab) => ({
						value: penjab.kd_pj,
						label: penjab.png_jawab,
					}));
					setPenjabOptions(options);
				}
			} catch (error) {
				console.error("Error loading penjab options:", error);
			}
		};

		loadPenjabOptions();
	};

	// Handle province change
	const handleProvinceChange = async (e) => {
		const provinceCode = e.target.value;
		setData("propinsipj", provinceCode);

		// Reset dependent fields
		setData("kabupatenpj", "");
		setData("kecamatanpj", "");
		setData("kelurahanpj", "");
		setRegencies([]);
		setDistricts([]);
		setVillages([]);

		if (provinceCode) {
			setLoadingRegencies(true);
			try {
				const response = await fetch(`/api/wilayah/regencies/${provinceCode}`);
				if (response.ok) {
					const result = await response.json();
					const options = result.data.map((regency) => ({
						value: regency.code,
						label: regency.name,
					}));
					setRegencies(options);
				}
			} catch (error) {
				console.error("Error loading regencies:", error);
			} finally {
				setLoadingRegencies(false);
			}
		}
	};

	// Handle province search (optional - for future enhancement)
	const handleProvinceSearch = (searchTerm) => {
		// Search is handled internally by SearchableSelect
		// This function can be used for additional search logic if needed
		console.log("Searching provinces for:", searchTerm);
	};

	// Handle regency change
	const handleRegencyChange = async (e) => {
		const regencyCode = e.target.value;
		setData("kabupatenpj", regencyCode);

		// Reset dependent fields
		setData("kecamatanpj", "");
		setData("kelurahanpj", "");
		setDistricts([]);
		setVillages([]);

		if (regencyCode) {
			setLoadingDistricts(true);
			try {
				const response = await fetch(`/api/wilayah/districts/${regencyCode}`);
				if (response.ok) {
					const result = await response.json();
					const options = result.data.map((district) => ({
						value: district.code,
						label: district.name,
					}));
					setDistricts(options);
				}
			} catch (error) {
				console.error("Error loading districts:", error);
			} finally {
				setLoadingDistricts(false);
			}
		}
	};

	// Handle district change
	const handleDistrictChange = async (e) => {
		const districtCode = e.target.value;
		setData("kecamatanpj", districtCode);

		// Reset dependent fields
		setData("kelurahanpj", "");
		setVillages([]);

		if (districtCode) {
			setLoadingVillages(true);
			try {
				const response = await fetch(`/api/wilayah/villages/${districtCode}`);
				if (response.ok) {
					const result = await response.json();
					const options = result.data.map((village) => ({
						value: village.code,
						label: village.name,
					}));
					setVillages(options);
				}
			} catch (error) {
				console.error("Error loading villages:", error);
			} finally {
				setLoadingVillages(false);
			}
		}
	};

	// Handle village change
	const handleVillageChange = (e) => {
		setData("kelurahanpj", e.target.value);
	};

	return (
		<AppLayout>
			<Head title="Tambah Pasien Baru" />

			<div className="py-6">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					{/* Header */}
					<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mb-6">
						<div className="p-6">
							<div className="flex justify-between items-center">
								<div>
									<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
										Tambah Pasien Baru
									</h2>
									<p className="text-gray-600 dark:text-gray-400 mt-1">
										Masukkan data pasien baru ke dalam sistem
									</p>
								</div>
								<Link
									href={route("patients.index")}
									className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="w-5 h-5"
									>
										<path
											fillRule="evenodd"
											d="M7.72 12.53a.75.75 0 010-1.06L10.94 8.25H3a.75.75 0 010-1.5h7.94L7.72 3.53a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06 0z"
											clipRule="evenodd"
										/>
									</svg>
									Kembali
								</Link>
							</div>
						</div>
					</div>

					{/* Form */}
					<Form
						action={route("patients.store")}
						method="post"
						className="space-y-6"
						data={data}
						onSuccess={() => {
							console.log("Patient created successfully");
						}}
					>
						{/* Basic Information */}
						<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
							<div className="p-6">
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
									Informasi Dasar
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Nama Lengkap *
										</label>
										<input
											type="text"
											name="nm_pasien"
											value={data.nm_pasien}
											onChange={(e) => setData("nm_pasien", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan nama lengkap"
										/>
										{errors.nm_pasien && (
											<p className="mt-1 text-sm text-red-600">
												{errors.nm_pasien}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											NIK
										</label>
										<input
											type="text"
											name="no_ktp"
											value={data.no_ktp}
											onChange={(e) => setData("no_ktp", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan NIK"
										/>
										{errors.no_ktp && (
											<p className="mt-1 text-sm text-red-600">
												{errors.no_ktp}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Jenis Kelamin *
										</label>
										<select
											name="jk"
											value={data.jk}
											onChange={(e) => setData("jk", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
										>
											<option value="L">Laki-laki</option>
											<option value="P">Perempuan</option>
										</select>
										{errors.jk && (
											<p className="mt-1 text-sm text-red-600">{errors.jk}</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Tempat Lahir *
										</label>
										<input
											type="text"
											name="tmp_lahir"
											value={data.tmp_lahir}
											onChange={(e) => setData("tmp_lahir", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan tempat lahir"
										/>
										{errors.tmp_lahir && (
											<p className="mt-1 text-sm text-red-600">
												{errors.tmp_lahir}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Tanggal Lahir *
										</label>
										<input
											type="date"
											name="tgl_lahir"
											value={data.tgl_lahir}
											onChange={(e) => setData("tgl_lahir", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
										/>
										{errors.tgl_lahir && (
											<p className="mt-1 text-sm text-red-600">
												{errors.tgl_lahir}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Nama Ibu *
										</label>
										<input
											type="text"
											name="nm_ibu"
											value={data.nm_ibu}
											onChange={(e) => setData("nm_ibu", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan nama ibu"
										/>
										{errors.nm_ibu && (
											<p className="mt-1 text-sm text-red-600">
												{errors.nm_ibu}
											</p>
										)}
									</div>
								</div>
							</div>
						</div>

						{/* Contact Information */}
						<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
							<div className="p-6">
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
									Informasi Kontak
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="md:col-span-2">
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Alamat *
										</label>
										<textarea
											name="alamat"
											value={data.alamat}
											onChange={(e) => setData("alamat", e.target.value)}
											rows={3}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan alamat lengkap"
										/>
										{errors.alamat && (
											<p className="mt-1 text-sm text-red-600">
												{errors.alamat}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											No. Telepon
										</label>
										<input
											type="text"
											name="no_tlp"
											value={data.no_tlp}
											onChange={(e) => setData("no_tlp", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan nomor telepon"
										/>
										{errors.no_tlp && (
											<p className="mt-1 text-sm text-red-600">
												{errors.no_tlp}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Email
										</label>
										<input
											type="email"
											name="email"
											value={data.email}
											onChange={(e) => setData("email", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan email"
										/>
										{errors.email && (
											<p className="mt-1 text-sm text-red-600">
												{errors.email}
											</p>
										)}
									</div>
								</div>
							</div>
						</div>

						{/* Additional Information */}
						<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
							<div className="p-6">
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
									Informasi Tambahan
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Golongan Darah
										</label>
										<select
											name="gol_darah"
											value={data.gol_darah}
											onChange={(e) => setData("gol_darah", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
										>
											<option value="">Pilih Golongan Darah</option>
											<option value="A">A</option>
											<option value="B">B</option>
											<option value="O">O</option>
											<option value="AB">AB</option>
											<option value="-">Tidak Diketahui</option>
										</select>
										{errors.gol_darah && (
											<p className="mt-1 text-sm text-red-600">
												{errors.gol_darah}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Status Perkawinan
										</label>
										<select
											name="stts_nikah"
											value={data.stts_nikah}
											onChange={(e) => setData("stts_nikah", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
										>
											<option value="BELUM MENIKAH">Belum Menikah</option>
											<option value="MENIKAH">Menikah</option>
											<option value="JANDA">Janda</option>
											<option value="DUDHA">Duda</option>
											<option value="JOMBLO">Jomblo</option>
										</select>
										{errors.stts_nikah && (
											<p className="mt-1 text-sm text-red-600">
												{errors.stts_nikah}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Agama
										</label>
										<input
											type="text"
											name="agama"
											value={data.agama}
											onChange={(e) => setData("agama", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan agama"
										/>
										{errors.agama && (
											<p className="mt-1 text-sm text-red-600">
												{errors.agama}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Pekerjaan
										</label>
										<input
											type="text"
											name="pekerjaan"
											value={data.pekerjaan}
											onChange={(e) => setData("pekerjaan", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan pekerjaan"
										/>
										{errors.pekerjaan && (
											<p className="mt-1 text-sm text-red-600">
												{errors.pekerjaan}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Pendidikan *
										</label>
										<select
											name="pnd"
											value={data.pnd}
											onChange={(e) => setData("pnd", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
										>
											<option value="TS">Tidak Sekolah</option>
											<option value="TK">Taman Kanak-kanak</option>
											<option value="SD">Sekolah Dasar</option>
											<option value="SMP">Sekolah Menengah Pertama</option>
											<option value="SMA">Sekolah Menengah Atas</option>
											<option value="SLTA/SEDERAJAT">SLTA/Sederajat</option>
											<option value="D1">Diploma 1</option>
											<option value="D2">Diploma 2</option>
											<option value="D3">Diploma 3</option>
											<option value="D4">Diploma 4</option>
											<option value="S1">Sarjana</option>
											<option value="S2">Magister</option>
											<option value="S3">Doktor</option>
											<option value="-">Tidak Diketahui</option>
										</select>
										{errors.pnd && (
											<p className="mt-1 text-sm text-red-600">{errors.pnd}</p>
										)}
									</div>
								</div>
							</div>
						</div>

						{/* Family Information */}
						<div className="bg-white dark:bg-gray-800 overflow-visible shadow-sm sm:rounded-lg mb-8">
							<div className="p-6">
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
									Informasi Keluarga
								</h3>
								<div
									className="grid grid-cols-1 md:grid-cols-2 gap-6"
									style={{ position: "relative", zIndex: 1 }}
								>
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Hubungan Keluarga
										</label>
										<select
											name="keluarga"
											value={data.keluarga}
											onChange={(e) => setData("keluarga", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
										>
											<option value="AYAH">Ayah</option>
											<option value="IBU">Ibu</option>
											<option value="ISTRI">Istri</option>
											<option value="SUAMI">Suami</option>
											<option value="SAUDARA">Saudara</option>
											<option value="ANAK">Anak</option>
											<option value="DIRI SENDIRI">Diri Sendiri</option>
											<option value="LAIN-LAIN">Lain-lain</option>
										</select>
										{errors.keluarga && (
											<p className="mt-1 text-sm text-red-600">
												{errors.keluarga}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Nama Keluarga *
										</label>
										<input
											type="text"
											name="namakeluarga"
											value={data.namakeluarga}
											onChange={(e) => setData("namakeluarga", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan nama keluarga"
										/>
										{errors.namakeluarga && (
											<p className="mt-1 text-sm text-red-600">
												{errors.namakeluarga}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Pekerjaan Keluarga *
										</label>
										<input
											type="text"
											name="pekerjaanpj"
											value={data.pekerjaanpj}
											onChange={(e) => setData("pekerjaanpj", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan pekerjaan keluarga"
										/>
										{errors.pekerjaanpj && (
											<p className="mt-1 text-sm text-red-600">
												{errors.pekerjaanpj}
											</p>
										)}
									</div>

									<SelectWithAdd
										label="Penanggung Jawab"
										name="kd_pj"
										value={data.kd_pj}
										onChange={(e) => setData("kd_pj", e.target.value)}
										options={penjabOptions}
										placeholder="Pilih penanggung jawab"
										error={errors.kd_pj}
										required={true}
										onAdd={handleAddPenjab}
										addButtonText="Tambah Penjab"
									/>

									<div className="md:col-span-2">
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Alamat Keluarga *
										</label>
										<textarea
											name="alamatpj"
											value={data.alamatpj}
											onChange={(e) => setData("alamatpj", e.target.value)}
											rows={3}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan alamat keluarga"
										/>
										{errors.alamatpj && (
											<p className="mt-1 text-sm text-red-600">
												{errors.alamatpj}
											</p>
										)}
									</div>

									<SearchableSelect
										label="Provinsi"
										name="propinsipj"
										value={data.propinsipj}
										onChange={handleProvinceChange}
										onSearch={handleProvinceSearch}
										options={provinces}
										placeholder="Pilih provinsi"
										error={errors.propinsipj}
										required={true}
										loading={loadingProvinces}
										searchPlaceholder="Cari provinsi..."
										noOptionsText="Tidak ada provinsi"
										loadingText="Memuat provinsi..."
									/>

									<SearchableSelect
										label="Kabupaten/Kota"
										name="kabupatenpj"
										value={data.kabupatenpj}
										onChange={handleRegencyChange}
										options={regencies}
										placeholder="Pilih kabupaten/kota"
										error={errors.kabupatenpj}
										required={true}
										disabled={!data.propinsipj}
										loading={loadingRegencies}
										searchPlaceholder="Cari kabupaten/kota..."
										noOptionsText="Pilih provinsi terlebih dahulu"
										loadingText="Memuat kabupaten/kota..."
									/>

									<SearchableSelect
										label="Kecamatan"
										name="kecamatanpj"
										value={data.kecamatanpj}
										onChange={handleDistrictChange}
										options={districts}
										placeholder="Pilih kecamatan"
										error={errors.kecamatanpj}
										required={true}
										disabled={!data.kabupatenpj}
										loading={loadingDistricts}
										searchPlaceholder="Cari kecamatan..."
										noOptionsText="Pilih kabupaten/kota terlebih dahulu"
										loadingText="Memuat kecamatan..."
									/>

									<SearchableSelect
										label="Kelurahan/Desa"
										name="kelurahanpj"
										value={data.kelurahanpj}
										onChange={handleVillageChange}
										options={villages}
										placeholder="Pilih kelurahan/desa"
										error={errors.kelurahanpj}
										required={true}
										disabled={!data.kecamatanpj}
										loading={loadingVillages}
										searchPlaceholder="Cari kelurahan/desa..."
										noOptionsText="Pilih kecamatan terlebih dahulu"
										loadingText="Memuat kelurahan/desa..."
									/>
								</div>
							</div>
						</div>

						{/* Submit Button */}
						<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
							<div className="p-6">
								<div className="flex justify-end gap-4">
									<Link
										href={route("patients.index")}
										className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
									>
										Batal
									</Link>
									<button
										type="submit"
										className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
									>
										Simpan
									</button>
								</div>
							</div>
						</div>
					</Form>

					{/* Penjab Create Modal */}
					<PenjabCreateModal
						isOpen={isPenjabModalOpen}
						onClose={() => setIsPenjabModalOpen(false)}
						onSuccess={handlePenjabSuccess}
					/>
				</div>
			</div>
		</AppLayout>
	);
}
