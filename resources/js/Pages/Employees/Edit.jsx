import React, { useMemo, useEffect, useState } from "react";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
import SidebarPengaturan from "@/Layouts/SidebarPengaturan";
import SearchableSelect from "@/Components/SearchableSelect";
import { toast } from "@/tools/toast";

export default function Edit({ employee, refs = {} }) {
    const { data, setData, processing, errors } = useForm({
        // Data utama
        nik: employee?.nik || "",
        no_ktp: employee?.no_ktp || "",
        nama: employee?.nama || "",
        jk: employee?.jk || "Pria",
        tmp_lahir: employee?.tmp_lahir || "",
        tgl_lahir: employee?.tgl_lahir || "",
        alamat: employee?.alamat || "",
        photo: null,

        // Informasi kepegawaian (opsional)
        jbtn: employee?.jbtn || "",
        jnj_jabatan: employee?.jnj_jabatan || "",
        kode_kelompok: employee?.kode_kelompok || "",
        kode_resiko: employee?.kode_resiko || "",
        kode_emergency: employee?.kode_emergency || "",
        departemen: employee?.departemen || "",
        bidang: employee?.bidang || "",
        stts_wp: employee?.stts_wp || "",
        stts_kerja: employee?.stts_kerja || "",
        pendidikan: employee?.pendidikan || "",
        indexins: employee?.indexins || "",
        kota: employee?.kota || "",
        mulai_kerja: employee?.mulai_kerja || "",
        stts_aktif: employee?.stts_aktif || "AKTIF",

        // Informasi finansial (opsional)
        npwp: employee?.npwp || "",
        gapok: employee?.gapok || "",
        bpd: employee?.bpd || "",
        rekening: employee?.rekening || "",

        // Informasi administrasi pasien (opsional tambahan)
        no_peserta: employee?.no_peserta || "",
        nip: employee?.nip || "",
        perusahaan_pasien: employee?.perusahaan_pasien || "",
        perusahaan_pasien_text: "",
        suku_bangsa: employee?.suku_bangsa || "",
        suku_bangsa_text: "",
        bahasa_pasien: employee?.bahasa_pasien || "",
        bahasa_pasien_text: "",
        cacat_fisik: employee?.cacat_fisik || "",
        cacat_fisik_text: "",
    });

    // Opsi referensi tambahan (untuk dropdown join)
    const [perusahaanOptions, setPerusahaanOptions] = useState([]);
    const [sukuOptions, setSukuOptions] = useState([]);
    const [bahasaOptions, setBahasaOptions] = useState([]);
    const [cacatOptions, setCacatOptions] = useState([]);

    useEffect(() => {
        const loadRefs = async () => {
            try {
                const [perusahaanRes, sukuRes, bahasaRes, cacatRes] = await Promise.all([
                    fetch('/api/perusahaan-pasien'),
                    fetch('/api/suku-bangsa'),
                    fetch('/api/bahasa-pasien'),
                    fetch('/api/cacat-fisik'),
                ]);
                if (perusahaanRes.ok) {
                    const r = await perusahaanRes.json();
                    setPerusahaanOptions((r.data || []).map((d) => ({ value: d.value, label: d.label })));
                }
                if (sukuRes.ok) {
                    const r = await sukuRes.json();
                    setSukuOptions((r.data || []).map((d) => ({ value: d.value, label: d.label })));
                }
                if (bahasaRes.ok) {
                    const r = await bahasaRes.json();
                    setBahasaOptions((r.data || []).map((d) => ({ value: d.value, label: d.label })));
                }
                if (cacatRes.ok) {
                    const r = await cacatRes.json();
                    setCacatOptions((r.data || []).map((d) => ({ value: d.value, label: d.label })));
                }
            } catch (e) {
                console.error('Error loading reference options (employee page):', e);
            }
        };
        loadRefs();
    }, []);

    const findLabelByValue = (options, value) => {
        if (!value) return "";
        const found = options.find((o) => o.value === value);
        return found ? found.label : "";
    };

    // Opsi referensi
    const options = useMemo(() => {
        const jnjJabatan = (refs.jnjJabatan || []).map((r) => ({ value: r.kode, label: `${r.kode} - ${r.nama}` }));
        const kelompokJabatan = (refs.kelompokJabatan || []).map((r) => ({ value: r.kode_kelompok, label: `${r.kode_kelompok} - ${r.nama_kelompok}` }));
        const resikoKerja = (refs.resikoKerja || []).map((r) => ({ value: r.kode_resiko, label: `${r.kode_resiko} - ${r.nama_resiko}` }));
        const departemen = (refs.departemen || []).map((r) => ({ value: r.dep_id, label: `${r.dep_id} - ${r.nama}` }));
        const indexins = departemen;
        const bidang = (refs.bidang || []).map((r) => ({ value: r.nama, label: r.nama }));
        const sttsWp = (refs.sttsWp || []).map((r) => ({ value: r.stts, label: `${r.stts}${r.ktg ? ` - ${r.ktg}` : ""}` }));
        const sttsKerja = (refs.sttsKerja || []).map((r) => ({ value: r.stts, label: `${r.stts}${r.ktg ? ` - ${r.ktg}` : ""}` }));
        const pendidikan = (refs.pendidikan || []).map((r) => ({ value: r.tingkat, label: r.tingkat }));
        const bank = (refs.bank || []).map((r) => ({ value: r.namabank, label: r.namabank }));
        const emergencyIndex = (refs.emergencyIndex || []).map((r) => ({ value: r.kode_emergency, label: `${r.kode_emergency} - ${r.emergency}` }));
        return { jnjJabatan, kelompokJabatan, resikoKerja, departemen, indexins, bidang, sttsWp, sttsKerja, pendidikan, bank, emergencyIndex };
    }, [refs]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const routeParam = employee?.id ?? employee?.nik ?? employee;
        router.post(
            route("employees.update", routeParam),
            { ...data, _method: "PUT" },
            {
                forceFormData: true,
                onSuccess: () => {
                    // Tampilkan toast sukses dan kembali ke daftar
                    toast.success("Data pegawai berhasil diperbarui", 4000);
                    router.get(route("employees.index"));
                },
                onError: (errs) => {
                    // Tampilkan toast error singkat jika validasi/penyimpanan gagal
                    const firstKey = errs && Object.keys(errs)[0];
                    const msg = (firstKey && errs[firstKey]) || "Gagal menyimpan data pegawai. Periksa form kembali.";
                    toast.error(Array.isArray(msg) ? msg[0] : msg, 5000);
                },
            }
        );
    };

    return (
        <SidebarPengaturan title="Kepegawaian">
            <Head title="Edit Pegawai" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="bg-white/95 dark:bg-gray-900/60 backdrop-blur-sm overflow-visible shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl mb-6">
                        <div className="p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Edit Pegawai
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                                        Perbarui data pegawai rumah sakit
                                    </p>
                                </div>
                                <Link
                                    href={route("employees.index")}
                                    className="px-4 h-10 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 flex items-center gap-2 transition-colors"
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
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Informasi Dasar */}
                        <div className="relative z-10 bg-white/95 dark:bg-gray-900/60 backdrop-blur-sm overflow-visible shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Informasi Dasar
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            NIK *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.nik}
                                            onChange={(e) => setData("nik", e.target.value)}
                                            className="w-full h-11 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm"
                                            placeholder="Masukkan NIK"
                                        />
                                        {errors.nik && (
                                            <p className="mt-1 text-sm text-red-600">{errors.nik}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            No. KTP *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.no_ktp}
                                            onChange={(e) => setData("no_ktp", e.target.value)}
                                            className="w-full h-11 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm"
                                            placeholder="Masukkan No. KTP (16-20 digit)"
                                            maxLength="20"
                                        />
                                        {errors.no_ktp && (
                                            <p className="mt-1 text-sm text-red-600">{errors.no_ktp}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Nama *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.nama}
                                            onChange={(e) => setData("nama", e.target.value)}
                                            className="w-full h-11 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm"
                                            placeholder="Masukkan nama lengkap"
                                        />
                                        {errors.nama && (
                                            <p className="mt-1 text-sm text-red-600">{errors.nama}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Jenis Kelamin *
                                        </label>
                                        <select
                                            value={data.jk}
                                            onChange={(e) => setData("jk", e.target.value)}
                                            className="w-full h-11 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm"
                                        >
                                            <option value="Pria">Pria</option>
                                            <option value="Wanita">Wanita</option>
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
                                            value={data.tmp_lahir}
                                            onChange={(e) => setData("tmp_lahir", e.target.value)}
                                            className="w-full h-11 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm"
                                            placeholder="Masukkan tempat lahir"
                                        />
                                        {errors.tmp_lahir && (
                                            <p className="mt-1 text-sm text-red-600">{errors.tmp_lahir}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Tanggal Lahir *
                                        </label>
                                        <input
                                            type="date"
                                            value={data.tgl_lahir}
                                            onChange={(e) => setData("tgl_lahir", e.target.value)}
                                            className="w-full h-11 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm"
                                        />
                                        {errors.tgl_lahir && (
                                            <p className="mt-1 text-sm text-red-600">{errors.tgl_lahir}</p>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Alamat *
                                        </label>
                                        <textarea
                                            value={data.alamat}
                                            onChange={(e) => setData("alamat", e.target.value)}
                                            rows={3}
                                            className="w-full min-h-[110px] px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm"
                                            placeholder="Masukkan alamat lengkap"
                                        />
                                        {errors.alamat && (
                                            <p className="mt-1 text-sm text-red-600">{errors.alamat}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Foto Pegawai (Opsional) */}
                        <div className="relative z-10 bg-white/95 dark:bg-gray-900/60 backdrop-blur-sm overflow-visible shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Foto Pegawai (Opsional)
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Unggah Foto Baru
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setData("photo", e.target.files?.[0] ?? null)}
                                            className="w-full h-11 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm"
                                        />
                                        {errors.photo && (
                                            <p className="mt-1 text-sm text-red-600">{errors.photo}</p>
                                        )}
                                        {data.photo && typeof data.photo === "object" && (
                                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">File terpilih: {data.photo.name}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Informasi Kepegawaian (Opsional) */}
                        <div className="relative z-30 bg-white/95 dark:bg-gray-900/60 backdrop-blur-sm overflow-visible shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Informasi Kepegawaian (Opsional)
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Jabatan
                                        </label>
                                        <input
                                            type="text"
                                            value={data.jbtn}
                                            onChange={(e) => setData("jbtn", e.target.value)}
                                            className="w-full h-11 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm"
                                            placeholder="Masukkan jabatan"
                                        />
                                        {errors.jbtn && (
                                            <p className="mt-1 text-sm text-red-600">{errors.jbtn}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Jenjang Jabatan</label>
                                        <SearchableSelect
                                            options={options.jnjJabatan}
                                            value={data.jnj_jabatan}
                                            onChange={(v) => setData("jnj_jabatan", v)}
                                            placeholder="Pilih jenjang jabatan"
                                            searchPlaceholder="Cari kode/nama jenjang jabatan"
                                            error={!!errors.jnj_jabatan}
                                        />
                                        {errors.jnj_jabatan && (
                                            <p className="mt-1 text-sm text-red-600">{errors.jnj_jabatan}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Departemen</label>
                                        <SearchableSelect
                                            options={options.departemen}
                                            value={data.departemen}
                                            onChange={(v) => setData("departemen", v)}
                                            placeholder="Pilih departemen"
                                            searchPlaceholder="Cari kode/nama departemen"
                                            error={!!errors.departemen}
                                        />
                                        {errors.departemen && (
                                            <p className="mt-1 text-sm text-red-600">{errors.departemen}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bidang</label>
                                        <SearchableSelect
                                            options={options.bidang}
                                            value={data.bidang}
                                            onChange={(v) => setData("bidang", v)}
                                            placeholder="Pilih bidang"
                                            searchPlaceholder="Cari nama bidang"
                                            error={!!errors.bidang}
                                        />
                                        {errors.bidang && (
                                            <p className="mt-1 text-sm text-red-600">{errors.bidang}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status WP</label>
                                        <SearchableSelect
                                            options={options.sttsWp}
                                            value={data.stts_wp}
                                            onChange={(v) => setData("stts_wp", v)}
                                            placeholder="Pilih status WP"
                                            searchPlaceholder="Cari status WP"
                                            error={!!errors.stts_wp}
                                        />
                                        {errors.stts_wp && (
                                            <p className="mt-1 text-sm text-red-600">{errors.stts_wp}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status Kerja</label>
                                        <SearchableSelect
                                            options={options.sttsKerja}
                                            value={data.stts_kerja}
                                            onChange={(v) => setData("stts_kerja", v)}
                                            placeholder="Pilih status kerja"
                                            searchPlaceholder="Cari status kerja"
                                            error={!!errors.stts_kerja}
                                        />
                                        {errors.stts_kerja && (
                                            <p className="mt-1 text-sm text-red-600">{errors.stts_kerja}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pendidikan</label>
                                        <SearchableSelect
                                            options={options.pendidikan}
                                            value={data.pendidikan}
                                            onChange={(v) => setData("pendidikan", v)}
                                            placeholder="Pilih pendidikan"
                                            searchPlaceholder="Cari tingkat pendidikan"
                                            error={!!errors.pendidikan}
                                        />
                                        {errors.pendidikan && (
                                            <p className="mt-1 text-sm text-red-600">{errors.pendidikan}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Kelompok Jabatan</label>
                                        <SearchableSelect
                                            options={options.kelompokJabatan}
                                            value={data.kode_kelompok}
                                            onChange={(v) => setData("kode_kelompok", v)}
                                            placeholder="Pilih kelompok jabatan"
                                            searchPlaceholder="Cari kode/nama kelompok"
                                            error={!!errors.kode_kelompok}
                                        />
                                        {errors.kode_kelompok && (
                                            <p className="mt-1 text-sm text-red-600">{errors.kode_kelompok}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Resiko Kerja</label>
                                        <SearchableSelect
                                            options={options.resikoKerja}
                                            value={data.kode_resiko}
                                            onChange={(v) => setData("kode_resiko", v)}
                                            placeholder="Pilih resiko kerja"
                                            searchPlaceholder="Cari kode/nama resiko"
                                            error={!!errors.kode_resiko}
                                        />
                                        {errors.kode_resiko && (
                                            <p className="mt-1 text-sm text-red-600">{errors.kode_resiko}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Emergency Index</label>
                                        <SearchableSelect
                                            options={options.emergencyIndex}
                                            value={data.kode_emergency}
                                            onChange={(v) => setData("kode_emergency", v)}
                                            placeholder="Pilih emergency index"
                                            searchPlaceholder="Cari kode/nama emergency"
                                            error={!!errors.kode_emergency}
                                        />
                                        {errors.kode_emergency && (
                                            <p className="mt-1 text-sm text-red-600">{errors.kode_emergency}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Indexins (Departemen)</label>
                                        <SearchableSelect
                                            options={options.indexins}
                                            value={data.indexins}
                                            onChange={(v) => setData("indexins", v)}
                                            placeholder="Pilih indexins"
                                            searchPlaceholder="Cari kode/nama departemen"
                                            error={!!errors.indexins}
                                        />
                                        {errors.indexins && (
                                            <p className="mt-1 text-sm text-red-600">{errors.indexins}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Kota
                                        </label>
                                        <input
                                            type="text"
                                            value={data.kota}
                                            onChange={(e) => setData("kota", e.target.value)}
                                            className="w-full h-11 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm"
                                            placeholder="Masukkan kota"
                                        />
                                        {errors.kota && (
                                            <p className="mt-1 text-sm text-red-600">{errors.kota}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Tanggal Mulai Kerja
                                        </label>
                                        <input
                                            type="date"
                                            value={data.mulai_kerja}
                                            onChange={(e) => setData("mulai_kerja", e.target.value)}
                                            className="w-full h-11 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm"
                                        />
                                        {errors.mulai_kerja && (
                                            <p className="mt-1 text-sm text-red-600">{errors.mulai_kerja}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status Aktif</label>
                                        <select
                                            value={data.stts_aktif}
                                            onChange={(e) => setData("stts_aktif", e.target.value)}
                                            className="w-full h-11 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm"
                                        >
                                            <option value="AKTIF">AKTIF</option>
                                            <option value="CUTI">CUTI</option>
                                            <option value="KELUAR">KELUAR</option>
                                            <option value="TENAGA LUAR">TENAGA LUAR</option>
                                            <option value="NON AKTIF">NON AKTIF</option>
                                        </select>
                                        {errors.stts_aktif && (
                                            <p className="mt-1 text-sm text-red-600">{errors.stts_aktif}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Informasi Finansial (Opsional) */}
                        <div className="relative z-20 bg-white/95 dark:bg-gray-900/60 backdrop-blur-sm overflow-visible shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Informasi Finansial (Opsional)
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            NPWP
                                        </label>
                                        <input
                                            type="text"
                                            value={data.npwp}
                                            onChange={(e) => setData("npwp", e.target.value)}
                                            className="w-full h-11 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm"
                                            placeholder="Masukkan NPWP"
                                        />
                                        {errors.npwp && (
                                            <p className="mt-1 text-sm text-red-600">{errors.npwp}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Gaji Pokok (Gapok)
                                        </label>
                                        <input
                                            type="number"
                                            value={data.gapok}
                                            onChange={(e) => setData("gapok", e.target.value)}
                                            className="w-full h-11 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm"
                                            placeholder="Masukkan gaji pokok"
                                        />
                                        {errors.gapok && (
                                            <p className="mt-1 text-sm text-red-600">{errors.gapok}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bank (BPD)</label>
                                        <SearchableSelect
                                            options={options.bank}
                                            value={data.bpd}
                                            onChange={(v) => setData("bpd", v)}
                                            placeholder="Pilih bank"
                                            searchPlaceholder="Cari nama bank"
                                            error={!!errors.bpd}
                                        />
                                        {errors.bpd && (
                                            <p className="mt-1 text-sm text-red-600">{errors.bpd}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            No. Rekening
                                        </label>
                                        <input
                                            type="text"
                                            value={data.rekening}
                                            onChange={(e) => setData("rekening", e.target.value)}
                                            className="w-full h-11 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm"
                                            placeholder="Masukkan nomor rekening"
                                        />
                                        {errors.rekening && (
                                            <p className="mt-1 text-sm text-red-600">{errors.rekening}</p>
                                        )}
                                    </div>
                                </div>
                        </div>
                    </div>

                    {/* Informasi Administrasi Pasien (Opsional) */}
                    <div className="bg-white/95 dark:bg-gray-900/60 backdrop-blur-sm overflow-visible shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Informasi Administrasi Pasien (Opsional)
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* No. Peserta */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        No. Peserta
                                    </label>
                                    <input
                                        type="text"
                                        value={data.no_peserta}
                                        onChange={(e) => setData('no_peserta', e.target.value)}
                                        className="w-full h-11 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm"
                                        placeholder="Masukkan nomor peserta BPJS/Asuransi"
                                    />
                                    {errors.no_peserta && (
                                        <p className="mt-1 text-sm text-red-600">{errors.no_peserta}</p>
                                    )}
                                </div>

                                {/* NIP */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        NIP
                                    </label>
                                    <input
                                        type="text"
                                        value={data.nip}
                                        onChange={(e) => setData('nip', e.target.value)}
                                        className="w-full h-11 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm"
                                        placeholder="Masukkan NIP (opsional)"
                                    />
                                    {errors.nip && (
                                        <p className="mt-1 text-sm text-red-600">{errors.nip}</p>
                                    )}
                                </div>

                                {/* Perusahaan Pasien: Dropdown + Textbox Join */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Perusahaan Pasien
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <SearchableSelect
                                            options={perusahaanOptions}
                                            value={data.perusahaan_pasien}
                                            onChange={(val) => {
                                                setData('perusahaan_pasien', val);
                                                setData('perusahaan_pasien_text', findLabelByValue(perusahaanOptions, val));
                                            }}
                                            placeholder="Pilih perusahaan"
                                            error={!!errors.perusahaan_pasien}
                                        />
                                        <input
                                            type="text"
                                            value={data.perusahaan_pasien_text}
                                            onChange={(e) => setData('perusahaan_pasien_text', e.target.value)}
                                            className="w-full h-11 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm"
                                            placeholder="Isi nama perusahaan (manual)"
                                        />
                                    </div>
                                    {errors.perusahaan_pasien && (
                                        <p className="mt-1 text-sm text-red-600">{errors.perusahaan_pasien}</p>
                                    )}
                                    <p className="mt-1 text-xs text-gray-500">Jika tidak ada di daftar, isi manual di kolom sebelah.</p>
                                </div>

                                {/* Suku Bangsa: Dropdown + Textbox Join */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Suku Bangsa
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <SearchableSelect
                                            options={sukuOptions}
                                            value={data.suku_bangsa}
                                            onChange={(val) => {
                                                setData('suku_bangsa', val);
                                                setData('suku_bangsa_text', findLabelByValue(sukuOptions, val));
                                            }}
                                            placeholder="Pilih suku bangsa"
                                            error={!!errors.suku_bangsa}
                                        />
                                        <input
                                            type="text"
                                            value={data.suku_bangsa_text}
                                            onChange={(e) => setData('suku_bangsa_text', e.target.value)}
                                            className="w-full h-11 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm"
                                            placeholder="Isi suku bangsa (manual)"
                                        />
                                    </div>
                                    {errors.suku_bangsa && (
                                        <p className="mt-1 text-sm text-red-600">{errors.suku_bangsa}</p>
                                    )}
                                    <p className="mt-1 text-xs text-gray-500">Jika tidak ada di daftar, isi manual di kolom sebelah.</p>
                                </div>

                                {/* Bahasa Pasien: Dropdown + Textbox Join */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Bahasa Pasien
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <SearchableSelect
                                            options={bahasaOptions}
                                            value={data.bahasa_pasien}
                                            onChange={(val) => {
                                                setData('bahasa_pasien', val);
                                                setData('bahasa_pasien_text', findLabelByValue(bahasaOptions, val));
                                            }}
                                            placeholder="Pilih bahasa pasien"
                                            error={!!errors.bahasa_pasien}
                                        />
                                        <input
                                            type="text"
                                            value={data.bahasa_pasien_text}
                                            onChange={(e) => setData('bahasa_pasien_text', e.target.value)}
                                            className="w-full h-11 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm"
                                            placeholder="Isi bahasa pasien (manual)"
                                        />
                                    </div>
                                    {errors.bahasa_pasien && (
                                        <p className="mt-1 text-sm text-red-600">{errors.bahasa_pasien}</p>
                                    )}
                                    <p className="mt-1 text-xs text-gray-500">Jika tidak ada di daftar, isi manual di kolom sebelah.</p>
                                </div>

                                {/* Cacat Fisik: Dropdown + Textbox Join */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Cacat Fisik
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <SearchableSelect
                                            options={cacatOptions}
                                            value={data.cacat_fisik}
                                            onChange={(val) => {
                                                setData('cacat_fisik', val);
                                                setData('cacat_fisik_text', findLabelByValue(cacatOptions, val));
                                            }}
                                            placeholder="Pilih cacat fisik"
                                            error={!!errors.cacat_fisik}
                                        />
                                        <input
                                            type="text"
                                            value={data.cacat_fisik_text}
                                            onChange={(e) => setData('cacat_fisik_text', e.target.value)}
                                            className="w-full h-11 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm"
                                            placeholder="Isi cacat fisik (manual)"
                                        />
                                    </div>
                                    {errors.cacat_fisik && (
                                        <p className="mt-1 text-sm text-red-600">{errors.cacat_fisik}</p>
                                    )}
                                    <p className="mt-1 text-xs text-gray-500">Jika tidak ada di daftar, isi manual di kolom sebelah.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="bg-white/95 dark:bg-gray-900/60 backdrop-blur-sm overflow-visible shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl">
                        <div className="p-6">
                            <div className="flex justify-end gap-4">
                                <Link
                                        href={route("employees.index")}
                                        className="px-5 h-11 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors inline-flex items-center justify-center"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 disabled:from-indigo-400 disabled:to-blue-400 text-white px-6 h-11 rounded-lg transition-all shadow-sm flex items-center gap-2"
                                    >
                                        {processing && (
                                            <svg
                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                        )}
                                        {processing ? "Menyimpan..." : "Simpan Perubahan"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </SidebarPengaturan>
    );
}