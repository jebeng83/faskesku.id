import React, { useState, useEffect } from "react";
import { useForm, router } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { route } from "ziggy-js";
import SelectWithAdd from "@/Components/SelectWithAdd";
import SearchableSelect from "@/Components/SearchableSelect";
import PenjabCreateModal from "@/Components/PenjabCreateModal";
import WilayahSearchableSelect from "@/Components/WilayahSearchableSelect";
import AddressDisplay from "@/Components/AddressDisplay";
import wilayahRoutes from "@/routes/api/wilayah";
import { isValidWilayahCode, constructKodeWilayah } from "@/tools/wilayah";

export default function PatientEditModal({ isOpen, onClose, patient, onSuccess }) {
  const [penjabOptions, setPenjabOptions] = useState([]);
  const [isPenjabModalOpen, setIsPenjabModalOpen] = useState(false);
  const [selectedWilayah, setSelectedWilayah] = useState(null);
  const [loadingWilayah, setLoadingWilayah] = useState(false);
  // Reference dropdowns
  const [perusahaanOptions, setPerusahaanOptions] = useState([]);
  const [sukuOptions, setSukuOptions] = useState([]);
  const [bahasaOptions, setBahasaOptions] = useState([]);
  const [cacatOptions, setCacatOptions] = useState([]);
  // Local state untuk kontrol dropdown pekerjaan dengan opsi "LAINNYA"
  const [pekerjaanOption, setPekerjaanOption] = useState("");
  const [pekerjaanOther, setPekerjaanOther] = useState("");

  // Helper: normalize various date formats (e.g. ISO "1988-02-22T00:00:00.000000Z") to "YYYY-MM-DD"
  const formatDateForInput = (value) => {
    if (!value) return "";
    // If value already looks like YYYY-MM-DD, return as-is
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return value;
    }
    // Try to parse with Date
    const d = new Date(value);
    if (!isNaN(d.getTime())) {
      // toISOString produces YYYY-MM-DDTHH:mm:ss.sssZ, we only need date part
      return d.toISOString().slice(0, 10);
    }
    // Fallback: attempt to slice first 10 chars if string
    if (typeof value === "string" && value.length >= 10) {
      return value.slice(0, 10);
    }
    return "";
  };

  const { data, setData, errors, reset, post, transform } = useForm({
    nm_pasien: "",
    no_ktp: "",
    jk: "L",
    tmp_lahir: "",
    tgl_lahir: "",
    nm_ibu: "",
    alamat: "",
    gol_darah: "",
    pekerjaan: "",
    stts_nikah: "",
    agama: "",
    no_tlp: "",
    pnd: "",
    keluarga: "",
    namakeluarga: "",
    kd_pj: "",
    no_peserta: "",
    pekerjaanpj: "",
    alamatpj: "",
    kode_wilayah: "",
    // Tambahan: inisialisasi field nama wilayah untuk fallback tampilan
    kelurahanpj: "",
    kecamatanpj: "",
    kabupatenpj: "",
    propinsipj: "",
    email: "",
    // Tambahan: field yang diperlukan backend
    perusahaan_pasien: "",
    suku_bangsa: "",
    bahasa_pasien: "",
    cacat_fisik: "",
  });

  // Custom submitting state because we use router.post with method spoofing
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load penjab options on open
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

    if (isOpen) {
      loadPenjabOptions();
    }
  }, [isOpen]);

  // Populate form data when opening
  useEffect(() => {
    if (isOpen && patient) {
      setData({
        nm_pasien: patient.nm_pasien || "",
        no_ktp: patient.no_ktp || "",
        jk: patient.jk || "L",
        tmp_lahir: patient.tmp_lahir || "",
        // Normalize date to input-friendly format
        tgl_lahir: formatDateForInput(patient.tgl_lahir || ""),
        nm_ibu: patient.nm_ibu || "",
        alamat: patient.alamat || "",
        gol_darah: patient.gol_darah || "",
        pekerjaan: patient.pekerjaan || "",
        stts_nikah: patient.stts_nikah || "",
        agama: patient.agama || "",
        no_tlp: patient.no_tlp || "",
        // Ensure pnd always has an allowed default to satisfy backend validation
        pnd: patient.pnd || "SMA",
        keluarga: patient.keluarga || "",
        namakeluarga: patient.namakeluarga || "",
        kd_pj: patient.kd_pj || "",
        no_peserta: patient.no_peserta || "",
        pekerjaanpj: patient.pekerjaanpj || "",
        alamatpj: patient.alamatpj || patient.alamat || "",
        kode_wilayah: patient.kode_wilayah || "",
        // Isi fallback nama wilayah jika tersedia pada record lama
        kelurahanpj: patient.kelurahanpj || "",
        kecamatanpj: patient.kecamatanpj || "",
        kabupatenpj: patient.kabupatenpj || "",
        propinsipj: patient.propinsipj || "",
        email: patient.email || "",
        // Field tambahan yang sering wajib
        perusahaan_pasien: patient.perusahaan_pasien || "",
        suku_bangsa: patient.suku_bangsa || "",
        bahasa_pasien: patient.bahasa_pasien || "",
        cacat_fisik: patient.cacat_fisik || "",
      });

      // Inisialisasi kontrol dropdown pekerjaan
      const pekerjaanList = [
        "KARYAWAN SWASTA",
        "WIRASWASTA",
        "PELAJAR",
        "MAHASISWA",
        "PNS",
        "TNI/POLRI",
        "IBU RUMAH TANGGA",
        "PETANI",
        "NELAYAN",
        "BURUH",
        "GURU",
        "PERANGKAT DESA",
        "TIDAK BEKERJA",
      ];
      const currentJob = (patient.pekerjaan || "").trim();
      if (currentJob && pekerjaanList.includes(currentJob.toUpperCase())) {
        setPekerjaanOption(currentJob.toUpperCase());
        setPekerjaanOther("");
      } else if (currentJob) {
        setPekerjaanOption("LAINNYA");
        setPekerjaanOther(currentJob);
      } else {
        setPekerjaanOption("");
        setPekerjaanOther("");
      }

      // If kode_wilayah exists (or can be built from kd_*), fetch its full address for display
      const loadWilayahDetails = async () => {
        // Prefer existing kode_wilayah, otherwise build from kd_prop/kd_kab/kd_kec/kd_kel
        let code = patient.kode_wilayah;
        if (!code && patient.kd_prop && patient.kd_kab && patient.kd_kec && patient.kd_kel) {
          const constructed = constructKodeWilayah({
            kd_prop: patient.kd_prop,
            kd_kab: patient.kd_kab,
            kd_kec: patient.kd_kec,
            kd_kel: patient.kd_kel,
          });
          if (constructed && isValidWilayahCode(constructed)) {
            code = constructed;
            setData("kode_wilayah", constructed);
          } else {
            console.warn("Skipping invalid constructed kode_wilayah:", constructed);
          }
        }

        if (code && isValidWilayahCode(code)) {
          setLoadingWilayah(true);
          try {
            const response = await fetch(wilayahRoutes.show.get(code).url);
            if (response.ok) {
              const result = await response.json();
              if (result.success) {
                const fullAddress = result.data.full_address || "";
                const parts = fullAddress.split(", ").map((p) => p.trim());
                setSelectedWilayah({
                  village: parts[0] || "",
                  district: parts[1] || "",
                  regency: parts[2] || "",
                  province: parts[3] || "",
                });
                // Auto-fill related fields for display and submission
                setData("kelurahanpj", parts[0] || "");
                setData("kecamatanpj", parts[1] || "");
                setData("kabupatenpj", parts[2] || "");
                setData("propinsipj", parts[3] || "");
              }
            }
          } catch (error) {
            console.error("Error fetching wilayah details:", error);
          } finally {
            setLoadingWilayah(false);
          }
        } else {
          // Fallback tampilan berdasarkan field nama wilayah pada record lama
          const kel = patient.kelurahanpj || "";
          const kec = patient.kecamatanpj || "";
          const kab = patient.kabupatenpj || "";
          const prov = patient.propinsipj || "";

          if (kel || kec || kab || prov) {
            setSelectedWilayah({
              village: kel,
              district: kec,
              regency: kab,
              province: prov,
            });
            // Pastikan field data terisi untuk ditampilkan
            setData("kelurahanpj", kel);
            setData("kecamatanpj", kec);
            setData("kabupatenpj", kab);
            setData("propinsipj", prov);

            // Opsional: coba auto-lookup kode wilayah berdasarkan nama kelurahan
            try {
              if (!data.kode_wilayah && kel) {
                const resp = await fetch(`/api/wilayah/search?q=${encodeURIComponent(kel)}&level=village`);
                if (resp.ok) {
                  const resJson = await resp.json();
                  const items = Array.isArray(resJson?.data) ? resJson.data : [];
                  if (items.length === 1 && items[0]?.code && isValidWilayahCode(String(items[0].code))) {
                    setData("kode_wilayah", String(items[0].code));
                    const fullAddr = items[0]?.full_address || "";
                    const parts = fullAddr.split(", ").map((p) => p.trim());
                    setSelectedWilayah({
                      village: parts[0] || kel,
                      district: parts[1] || kec,
                      regency: parts[2] || kab,
                      province: parts[3] || prov,
                    });
                    setData("kelurahanpj", parts[0] || kel);
                    setData("kecamatanpj", parts[1] || kec);
                    setData("kabupatenpj", parts[2] || kab);
                    setData("propinsipj", parts[3] || prov);
                  } else if (items.length > 1) {
                    console.warn("Ditemukan beberapa hasil untuk kelurahan:", kel, "- silakan pilih manual di komponen pencarian wilayah.");
                  }
                }
              }
            } catch (err) {
              console.warn("Auto-lookup kode_wilayah gagal:", err);
            }
          } else {
            setSelectedWilayah(null);
          }
        }
      };

      loadWilayahDetails();
    }
  }, [isOpen, patient, setData]);

  // Load reference options when modal opens
  useEffect(() => {
    if (!isOpen) return;
    const loadRefs = async () => {
      try {
        const [perusahaanRes, sukuRes, bahasaRes, cacatRes] = await Promise.all([
          fetch("/api/perusahaan-pasien"),
          fetch("/api/suku-bangsa"),
          fetch("/api/bahasa-pasien"),
          fetch("/api/cacat-fisik"),
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
        console.error("Error loading reference options:", e);
      }
    };
    loadRefs();
  }, [isOpen]);

  const getErrorMessage = (fieldName) => {
    if (!errors[fieldName]) return null;
    return Array.isArray(errors[fieldName]) ? errors[fieldName][0] : errors[fieldName];
  };

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

  // Handle wilayah change - automatically set all address fields
  const handleWilayahChange = async (event) => {
    const value = event.target.value;
    setData("kode_wilayah", value);

    if (event.fullAddress) {
      const parts = event.fullAddress.split(", ").map((p) => p.trim());
      setSelectedWilayah({
        village: parts[0] || "",
        district: parts[1] || "",
        regency: parts[2] || "",
        province: parts[3] || "",
      });
      // Auto-fill related fields for display and submission
      setData("kelurahanpj", parts[0] || "");
      setData("kecamatanpj", parts[1] || "");
      setData("kabupatenpj", parts[2] || "");
      setData("propinsipj", parts[3] || "");
    } else if (value && isValidWilayahCode(String(value).trim())) {
      setLoadingWilayah(true);
      try {
        const response = await fetch(wilayahRoutes.show.get(value).url);
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            const fullAddress = result.data.full_address || "";
            const parts = fullAddress.split(", ").map((p) => p.trim());
            setSelectedWilayah({
              village: parts[0] || "",
              district: parts[1] || "",
              regency: parts[2] || "",
              province: parts[3] || "",
            });
            // Auto-fill related fields
            setData("kelurahanpj", parts[0] || "");
            setData("kecamatanpj", parts[1] || "");
            setData("kabupatenpj", parts[2] || "");
            setData("propinsipj", parts[3] || "");
          }
        }
      } catch (error) {
        console.error("Error fetching wilayah details:", error);
      } finally {
        setLoadingWilayah(false);
      }
    } else {
      if (value) {
        console.warn("Invalid kode_wilayah format, expected PP.RR.DD.VVVV but got:", value);
      }
      setSelectedWilayah(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patient?.no_rkm_medis) {
      alert("Data pasien tidak valid");
      return;
    }

    // Jika opsi pekerjaan adalah LAINNYA, pastikan nilai custom terisi ke data.pekerjaan
    if (pekerjaanOption === "LAINNYA") {
      setData("pekerjaan", pekerjaanOther.trim());
    }

    // Method spoofing PUT seperti implementasi halaman Edit Pasien
    transform((payload) => ({ ...payload, _method: "PUT" }));
    post(route("patients.update", patient.no_rkm_medis), {
      forceFormData: true,
      preserveScroll: true,
      onStart: () => setIsSubmitting(true),
      onSuccess: () => {
        alert("Data pasien berhasil diperbarui!");
        if (onSuccess) onSuccess({ ...data });
        onClose();
      },
      onError: (errs) => {
        console.error("Update errors:", errs);
        alert("Terjadi kesalahan saat memperbarui data pasien");
      },
      onFinish: () => {
        setIsSubmitting(false);
        // Kembalikan transform ke default agar tidak mempengaruhi submit lain
        transform((payload) => payload);
      },
    });
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-[9999] p-4 overflow-y-auto"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={onClose}
          >
            <motion.div
              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-2xl border border-white/30 dark:border-gray-700/50 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.7, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 50 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 100, damping: 15 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <motion.div
                className="flex justify-between items-center p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div>
                  <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">
                    Edit Data Pasien
                  </h3>
                  {patient?.no_rkm_medis && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      RM: {patient.no_rkm_medis}
                    </p>
                  )}
                </div>
                <motion.button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </motion.div>

              {/* Form Content */}
              <div className="p-4 lg:p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Informasi Dasar */}
                  <motion.div
                    className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Informasi Dasar</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nama Lengkap *</label>
                        <input
                          type="text"
                          name="nm_pasien"
                          value={data.nm_pasien}
                          onChange={(e) => setData("nm_pasien", e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          placeholder="Masukkan nama lengkap"
                        />
                        {getErrorMessage("nm_pasien") && (
                          <p className="mt-1 text-xs text-red-600">{getErrorMessage("nm_pasien")}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">NIK</label>
                        <div className="relative">
                          <input
                            type="text"
                            name="no_ktp"
                            value={data.no_ktp}
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 16);
                              setData("no_ktp", value);
                            }}
                            className="w-full px-3 py-2 pr-12 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            placeholder="Masukkan NIK (16 digit)"
                            maxLength="16"
                          />
                          <div
                            className={`absolute inset-y-0 right-0 flex items-center pr-3 text-xs font-medium ${
                              data.no_ktp.length === 16
                                ? "text-green-600 dark:text-green-400"
                                : data.no_ktp.length > 0
                                ? "text-yellow-600 dark:text-yellow-400"
                                : "text-gray-400 dark:text-gray-500"
                            }`}
                          >
                            {data.no_ktp.length}/16
                          </div>
                        </div>
                        {getErrorMessage("no_ktp") && (
                          <p className="mt-1 text-xs text-red-600">{getErrorMessage("no_ktp")}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Jenis Kelamin *</label>
                        <select
                          name="jk"
                          value={data.jk}
                          onChange={(e) => setData("jk", e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        >
                          <option value="L">Laki-laki</option>
                          <option value="P">Perempuan</option>
                        </select>
                        {getErrorMessage("jk") && (
                          <p className="mt-1 text-xs text-red-600">{getErrorMessage("jk")}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tempat Lahir *</label>
                        <input
                          type="text"
                          name="tmp_lahir"
                          value={data.tmp_lahir}
                          onChange={(e) => setData("tmp_lahir", e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          placeholder="Masukkan tempat lahir"
                        />
                        {getErrorMessage("tmp_lahir") && (
                          <p className="mt-1 text-xs text-red-600">{getErrorMessage("tmp_lahir")}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tanggal Lahir *</label>
                        <input
                          type="date"
                          name="tgl_lahir"
                          value={data.tgl_lahir}
                          onChange={(e) => setData("tgl_lahir", e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                        {getErrorMessage("tgl_lahir") && (
                          <p className="mt-1 text-xs text-red-600">{getErrorMessage("tgl_lahir")}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nama Ibu *</label>
                        <input
                          type="text"
                          name="nm_ibu"
                          value={data.nm_ibu}
                          onChange={(e) => setData("nm_ibu", e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          placeholder="Masukkan nama ibu"
                        />
                        {getErrorMessage("nm_ibu") && (
                          <p className="mt-1 text-xs text-red-600">{getErrorMessage("nm_ibu")}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* Informasi Kontak */}
                  <motion.div
                    className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Informasi Kontak</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Alamat *</label>
                        <textarea
                          name="alamat"
                          value={data.alamat}
                          onChange={(e) => setData("alamat", e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          placeholder="Masukkan alamat lengkap"
                        />
                        {getErrorMessage("alamat") && (
                          <p className="mt-1 text-xs text-red-600">{getErrorMessage("alamat")}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">No. Telepon</label>
                        <input
                          type="text"
                          name="no_tlp"
                          value={data.no_tlp}
                          onChange={(e) => setData("no_tlp", e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          placeholder="Masukkan nomor telepon"
                        />
                        {getErrorMessage("no_tlp") && (
                          <p className="mt-1 text-xs text-red-600">{getErrorMessage("no_tlp")}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={data.email}
                          onChange={(e) => setData("email", e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          placeholder="Masukkan email"
                        />
                        {getErrorMessage("email") && (
                          <p className="mt-1 text-xs text-red-600">{getErrorMessage("email")}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* Informasi Tambahan */}
                  <motion.div
                    className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.35 }}
                  >
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Informasi Tambahan</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Golongan Darah</label>
                        <select
                          name="gol_darah"
                          value={data.gol_darah}
                          onChange={(e) => setData("gol_darah", e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        >
                          <option value="">-</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="O">O</option>
                          <option value="AB">AB</option>
                        </select>
                        {getErrorMessage("gol_darah") && (
                          <p className="mt-1 text-xs text-red-600">{getErrorMessage("gol_darah")}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pekerjaan</label>
                        <select
                          name="pekerjaan_select"
                          value={pekerjaanOption}
                          onChange={(e) => {
                            const val = e.target.value;
                            setPekerjaanOption(val);
                            if (val !== "LAINNYA") {
                              setData("pekerjaan", val);
                              setPekerjaanOther("");
                            } else {
                              setData("pekerjaan", pekerjaanOther.trim());
                            }
                          }}
                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        >
                          <option value="">- Pilih Pekerjaan -</option>
                          <option value="KARYAWAN SWASTA">KARYAWAN SWASTA</option>
                          <option value="WIRASWASTA">WIRASWASTA</option>
                          <option value="PELAJAR">PELAJAR</option>
                          <option value="MAHASISWA">MAHASISWA</option>
                          <option value="PNS">PNS</option>
                          <option value="TNI/POLRI">TNI/POLRI</option>
                          <option value="IBU RUMAH TANGGA">IBU RUMAH TANGGA</option>
                          <option value="PETANI">PETANI</option>
                          <option value="NELAYAN">NELAYAN</option>
                          <option value="BURUH">BURUH</option>
                          <option value="GURU">GURU</option>
                          <option value="PERANGKAT DESA">PERANGKAT DESA</option>
                          <option value="TIDAK BEKERJA">TIDAK BEKERJA</option>
                          <option value="LAINNYA">LAINNYA</option>
                        </select>
                        {pekerjaanOption === "LAINNYA" && (
                          <div className="mt-2">
                            <input
                              type="text"
                              name="pekerjaan"
                              value={pekerjaanOther}
                              onChange={(e) => {
                                const v = e.target.value;
                                setPekerjaanOther(v);
                                setData("pekerjaan", v);
                              }}
                              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                              placeholder="Tuliskan pekerjaan"
                            />
                          </div>
                        )}
                        {getErrorMessage("pekerjaan") && (
                          <p className="mt-1 text-xs text-red-600">{getErrorMessage("pekerjaan")}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status Pernikahan</label>
                        <select
                          name="stts_nikah"
                          value={data.stts_nikah}
                          onChange={(e) => setData("stts_nikah", e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        >
                          <option value="">-</option>
                          <option value="BELUM MENIKAH">Belum Menikah</option>
                          <option value="MENIKAH">Menikah</option>
                          <option value="JANDA">Janda</option>
                          <option value="DUDHA">Dudha</option>
                          <option value="JOMBLO">Jomblo</option>
                        </select>
                        {getErrorMessage("stts_nikah") && (
                          <p className="mt-1 text-xs text-red-600">{getErrorMessage("stts_nikah")}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Agama</label>
                        <select
                          name="agama"
                          value={data.agama}
                          onChange={(e) => setData("agama", e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        >
                          <option value="">- Pilih Agama -</option>
                          <option value="ISLAM">ISLAM</option>
                          <option value="KRISTEN">KRISTEN</option>
                          <option value="KATOLIK">KATOLIK</option>
                          <option value="HINDU">HINDU</option>
                          <option value="BUDHA">BUDHA</option>
                          <option value="KONG HU CHU">KONG HU CHU</option>
                        </select>
                        {getErrorMessage("agama") && (
                          <p className="mt-1 text-xs text-red-600">{getErrorMessage("agama")}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pendidikan Terakhir *</label>
                        <select
                          name="pnd"
                          value={data.pnd}
                          onChange={(e) => setData("pnd", e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        >
                          <option value="TS">Tidak Sekolah</option>
                          <option value="TK">TK</option>
                          <option value="SD">SD</option>
                          <option value="SMP">SMP</option>
                          <option value="SMA">SMA</option>
                          <option value="SLTA/SEDERAJAT">SLTA/Sederajat</option>
                          <option value="D1">D1</option>
                          <option value="D2">D2</option>
                          <option value="D3">D3</option>
                          <option value="D4">D4</option>
                          <option value="S1">S1</option>
                          <option value="S2">S2</option>
                          <option value="S3">S3</option>
                          <option value="-">-</option>
                        </select>
                        {getErrorMessage("pnd") && (
                          <p className="mt-1 text-xs text-red-600">{getErrorMessage("pnd")}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">No Peserta (BPJS)</label>
                        <input
                          type="text"
                          name="no_peserta"
                          value={data.no_peserta}
                          onChange={(e) => setData("no_peserta", e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          placeholder="Masukkan nomor peserta"
                        />
                        {getErrorMessage("no_peserta") && (
                          <p className="mt-1 text-xs text-red-600">{getErrorMessage("no_peserta")}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* Informasi Administrasi (Perusahaan, Suku Bangsa, Bahasa, Cacat Fisik) */}
                  <motion.div
                    className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Informasi Administrasi</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Perusahaan Pasien *</label>
                        <SearchableSelect
                          options={perusahaanOptions}
                          value={data.perusahaan_pasien}
                          onChange={(val) => setData("perusahaan_pasien", val)}
                          placeholder="Pilih atau cari perusahaan pasien"
                          displayKey="label"
                          valueKey="value"
                          searchPlaceholder="Ketik nama perusahaan..."
                          error={!!getErrorMessage("perusahaan_pasien")}
                        />
                        {getErrorMessage("perusahaan_pasien") && (
                          <p className="mt-1 text-xs text-red-600">{getErrorMessage("perusahaan_pasien")}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Suku Bangsa *</label>
                        <SearchableSelect
                          options={sukuOptions}
                          value={data.suku_bangsa}
                          onChange={(val) => setData("suku_bangsa", val)}
                          placeholder="Pilih suku bangsa"
                          error={!!getErrorMessage("suku_bangsa")}
                        />
                        {getErrorMessage("suku_bangsa") && (
                          <p className="mt-1 text-xs text-red-600">{getErrorMessage("suku_bangsa")}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bahasa Pasien *</label>
                        <SearchableSelect
                          options={bahasaOptions}
                          value={data.bahasa_pasien}
                          onChange={(val) => setData("bahasa_pasien", val)}
                          placeholder="Pilih bahasa pasien"
                          error={!!getErrorMessage("bahasa_pasien")}
                        />
                        {getErrorMessage("bahasa_pasien") && (
                          <p className="mt-1 text-xs text-red-600">{getErrorMessage("bahasa_pasien")}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cacat Fisik *</label>
                        <SearchableSelect
                          options={cacatOptions}
                          value={data.cacat_fisik}
                          onChange={(val) => setData("cacat_fisik", val)}
                          placeholder="Pilih cacat fisik"
                          error={!!getErrorMessage("cacat_fisik")}
                        />
                        {getErrorMessage("cacat_fisik") && (
                          <p className="mt-1 text-xs text-red-600">{getErrorMessage("cacat_fisik")}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* Informasi Keluarga */}
                  <motion.div
                    className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Informasi Keluarga</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Hubungan Keluarga</label>
                        <select
                          name="keluarga"
                          value={data.keluarga}
                          onChange={(e) => setData("keluarga", e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
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
                        {getErrorMessage("keluarga") && (
                          <p className="mt-1 text-xs text-red-600">{getErrorMessage("keluarga")}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nama Keluarga *</label>
                        <input
                          type="text"
                          name="namakeluarga"
                          value={data.namakeluarga}
                          onChange={(e) => setData("namakeluarga", e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          placeholder="Masukkan nama keluarga"
                        />
                        {getErrorMessage("namakeluarga") && (
                          <p className="mt-1 text-xs text-red-600">{getErrorMessage("namakeluarga")}</p>
                        )}
                      </div>

                      <SelectWithAdd
                        label="Penanggung Jawab"
                        name="kd_pj"
                        value={data.kd_pj}
                        onChange={(e) => setData("kd_pj", e.target.value)}
                        options={penjabOptions}
                        placeholder="Pilih penanggung jawab"
                        error={getErrorMessage("kd_pj")}
                        required={true}
                        onAdd={handleAddPenjab}
                        addButtonText="Tambah Penjab"
                      />

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pekerjaan Penanggung Jawab *</label>
                        <input
                          type="text"
                          name="pekerjaanpj"
                          value={data.pekerjaanpj}
                          onChange={(e) => setData("pekerjaanpj", e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          placeholder="Masukkan pekerjaan penanggung jawab"
                        />
                        {getErrorMessage("pekerjaanpj") && (
                          <p className="mt-1 text-xs text-red-600">{getErrorMessage("pekerjaanpj")}</p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Alamat Keluarga *</label>
                        <textarea
                          name="alamatpj"
                          value={data.alamatpj}
                          onChange={(e) => setData("alamatpj", e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          placeholder="Masukkan alamat keluarga"
                        />
                        {getErrorMessage("alamatpj") && (
                          <p className="mt-1 text-xs text-red-600">{getErrorMessage("alamatpj")}</p>
                        )}
                      </div>

                      <WilayahSearchableSelect
                        label="Pilih Kelurahan/Desa"
                        name="kode_wilayah"
                        value={data.kode_wilayah}
                        onChange={handleWilayahChange}
                        level="village"
                        placeholder="Pilih atau cari kelurahan/desa"
                        error={getErrorMessage("kode_wilayah")}
                        required={true}
                        searchPlaceholder="Ketik nama kelurahan/desa..."
                        noOptionsText="Tidak ada kelurahan/desa ditemukan"
                        loadingText="Memuat data kelurahan/desa..."
                      />

                      <AddressDisplay selectedWilayah={selectedWilayah} loading={loadingWilayah} className="mt-2" />
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <motion.button
                      type="button"
                      onClick={onClose}
                      className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Batal
                    </motion.button>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    >
                      {isSubmitting && (
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      )}
                      {isSubmitting ? "Menyimpan..." : "Perbaharui Data"}
                    </motion.button>
                  </motion.div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Penjab Create Modal */}
      <PenjabCreateModal
        isOpen={isPenjabModalOpen}
        onClose={() => setIsPenjabModalOpen(false)}
        onSuccess={handlePenjabSuccess}
      />
    </>
  );
}