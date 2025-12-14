import React, { useState, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import LanjutanRegistrasiLayout from "@/Layouts/LanjutanRegistrasiLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowPathIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    IdentificationIcon,
    MagnifyingGlassIcon,
    ClipboardDocumentCheckIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import PatientCreateModal from "@/Components/PatientCreateModal";
import PatientEditModal from "@/Components/PatientEditModal";
import PenjabQuickCreateModal from "@/Components/PenjabQuickCreateModal";

export default function Registration({
    auth,
    dokters,
    polikliniks,
    penjabs,
    registrations,
    searchQuery,
}) {
    const [searchTerm, setSearchTerm] = useState(searchQuery || "");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedRegistration, setSelectedRegistration] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editPatient, setEditPatient] = useState(null);
    const [registrationData, setRegistrationData] = useState(registrations);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isFilterExpanded, setIsFilterExpanded] = useState(false);
    const [stats, setStats] = useState({
        total: 0,
        belum: 0,
        selesai: 0,
        batal: 0,
        baru: 0,
        lama: 0,
        totalBiaya: 0,
    });
    const [filters, setFilters] = useState({
        // Biarkan kosong agar backend menentukan tanggal default (timezone server)
        // Menghindari mismatch timezone client vs server yang dapat membuat data terlihat hanya 1
        date: "",
        start_date: "",
        end_date: "",
        kd_poli: "",
        kd_dokter: "",
        search: "",
        status: "",
        status_poli: "",
        // Tambahkan per_page agar daftar menampilkan lebih dari 1 data per halaman
        per_page: 50,
    });

    const [formData, setFormData] = useState({
        kd_dokter: "",
        kd_poli: "",
        kd_pj: "",
        p_jawab: "",
        almt_pj: "",
        hubunganpj: "DIRI SENDIRI",
    });

    const [poliStatus, setPoliStatus] = useState({
        status_poli: "",
        biaya_reg: 0,
        has_registered: false,
    });

    // Daftar penjamin lokal (agar bisa di-update setelah tambah penjab tanpa reload penuh)
    const [penjabsList, setPenjabsList] = useState(penjabs || []);
    useEffect(() => {
        setPenjabsList(penjabs || []);
    }, [penjabs]);

    // Modal tambah penjab cepat
    const [isPenjabCreateOpen, setIsPenjabCreateOpen] = useState(false);
    const openPenjabCreate = () => setIsPenjabCreateOpen(true);
    const closePenjabCreate = () => setIsPenjabCreateOpen(false);

    // BPJS PCare membership state
    const [bpjsNik, setBpjsNik] = useState("");
    const [bpjsLoading, setBpjsLoading] = useState(false);
    const [bpjsError, setBpjsError] = useState(null);
    const [bpjsData, setBpjsData] = useState(null); // { metaData, response }

    // Popup untuk menampilkan respon BPJS saat simpan registrasi (jika status selain 200)
    const [isBpjsPopupOpen, setIsBpjsPopupOpen] = useState(false);
    const [bpjsPopup, setBpjsPopup] = useState({
        status: null,
        message: "",
        data: null,
        raw: "",
    });

    // State untuk dropdown menu aksi per baris
    const [openDropdown, setOpenDropdown] = useState(null);

    // State untuk popup menu cetak
    const [isPrintMenuOpen, setIsPrintMenuOpen] = useState(false);
    const [selectedRegForPrint, setSelectedRegForPrint] = useState(null);

    const openBpjsPopup = ({ status, message, data, raw }) => {
        setBpjsPopup({
            status: typeof status === "number" ? status : null,
            message: message || "",
            data: data ?? null,
            raw: typeof raw === "string" ? raw : "",
        });
        setIsBpjsPopupOpen(true);
    };

    const closeBpjsPopup = () => {
        setIsBpjsPopupOpen(false);
        setBpjsPopup({ status: null, message: "", data: null, raw: "" });
    };

    const sanitizeNik = (value) =>
        (value || "").replace(/[^0-9]/g, "").slice(0, 16);

    // Helper: resolusi jenis bayar dari kd_pj (menggunakan label png_jawab)
    // Normalisasi ke salah satu dari: 'BPJ' (termasuk BPJS/JKN/KIS), 'PBI', 'NON' (termasuk UMUM/NON JKN)
    const resolveJenisBayarFromKdPj = (kd_pj) => {
        if (!kd_pj) return "";
        try {
            const pj = (penjabs || []).find(
                (p) => String(p.kd_pj) === String(kd_pj)
            );
            const label = String(pj?.png_jawab || "").trim();
            const normalized = label.toLowerCase().replace(/[^a-z0-9]/g, "");
            if (/pbi/.test(normalized)) return "PBI";
            if (/bpjs|bpj|jkn|kis/.test(normalized)) return "BPJ";
            if (/umum|nonjkn|non/.test(normalized)) return "NON";
            // Jika tidak cocok, kembalikan label asli untuk referensi
            return label || "";
        } catch (_) {
            return "";
        }
    };

    // Helper: buat token base64-url untuk navigasi aman ke halaman lanjutan
    const toBase64Url = (obj) => {
        try {
            const json = JSON.stringify(obj || {});
            const base = btoa(json); // base64 standar
            // ubah ke base64-url (tanpa padding "=")
            return base
                .replace(/\+/g, "-")
                .replace(/\//g, "_")
                .replace(/=+$/g, "");
        } catch (_) {
            return "";
        }
    };

    const goToLanjutan = (no_rawat, no_rkm_medis) => {
        const token = toBase64Url({ no_rawat, no_rkm_medis });
        // Gunakan Ziggy route jika tersedia; fallback ke path hardcode jika tidak
        let url = "/rawat-jalan/lanjutan";
        try {
            url = route("rawat-jalan.lanjutan");
        } catch (_) {}
        router.get(url, { t: token }, { preserveScroll: true });
    };

    // Buka halaman Layanan PCare (Inertia page)
    const openLayananPcare = (patient) => {
        try {
            // Gunakan Ziggy route jika tersedia; fallback ke path hardcode jika tidak
            let url = "/pcare/layanan";
            try {
                url = route("layanan.pcare");
            } catch (_) {}
            // Kirim NIK dan/atau No. Kartu (BPJS) sebagai query agar halaman Layanan PCare otomatis terisi
            const nik = sanitizeNik(patient?.no_ktp || "");
            const noka = String(patient?.no_peserta || "").replace(/[^0-9]/g, "");
            const query = {};
            if (nik) query.nik = nik;
            if (noka) query.noka = noka;
            // Tambahkan preferensi mode pencarian agar form langsung menampilkan field yang sesuai
            if (noka) {
                query.mode = "noka";
            } else if (nik) {
                query.mode = "nik";
            }
            // Simpan prefill ke localStorage sebagai fallback bila user membuka via sidebar tanpa query
            try {
                const prefill = { mode: query.mode || '', nik: nik || '', noka: noka || '', ts: Date.now() };
                localStorage.setItem('pcarePrefill', JSON.stringify(prefill));
            } catch (_) {}
            router.get(url, query, { preserveScroll: true });
        } catch (e) {
            console.error("Gagal membuka Layanan PCare:", e);
        }
    };

    // Hanya kirim antrean ke Mobile JKN bila jenis bayar termasuk BPJ / PBI
    const isJenisBayarAllowedForAntrean = (kd_pj) => {
        const jenis = resolveJenisBayarFromKdPj(kd_pj);
        return jenis === "BPJ" || jenis === "PBI";
    };

    // Fallback checker berbasis objek registrasi jika kd_pj tidak tersedia
    const isRegistrationAllowedForAntrean = (reg) => {
        try {
            if (reg?.kd_pj) return isJenisBayarAllowedForAntrean(reg.kd_pj);
            const label = String(reg?.penjab?.png_jawab || "")
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9]/g, "");
            if (!label) return false;
            if (/pbi/.test(label)) return true;
            if (/bpjs|bpj|jkn|kis/.test(label)) return true;
            return false;
        } catch (_) {
            return false;
        }
    };

    // Simpan filter yang relevan untuk halaman Rawat Jalan sebelum navigasi
    const setRawatJalanFiltersForNavigation = (reg) => {
        try {
            const filters = {
                date: reg?.tgl_registrasi || "",
                kd_poli: reg?.kd_poli || reg?.poliklinik?.kd_poli || "",
                kd_dokter: reg?.kd_dokter || "",
                per_page: 50,
            };
            localStorage.setItem("rawatJalanFilters", JSON.stringify(filters));
        } catch (_) {}
    };

    // Panggil antrean (status hadir=1) lalu buka halaman Rawat Jalan index
    const handleCallAntreanAndOpenRawatJalan = async (reg) => {
        if (!reg) return;
        try {
            // Hanya panggil Mobile JKN untuk pasien dengan penjamin BPJ/PBI
            if (isRegistrationAllowedForAntrean(reg)) {
                const payload = {
                    no_rkm_medis: reg.no_rkm_medis,
                    kd_poli: reg.kd_poli || reg?.poliklinik?.kd_poli,
                    status: 1, // Hadir
                    tanggalperiksa: reg.tgl_registrasi,
                };
                try {
                    await axios.post("/api/mobilejkn/antrean/panggil", payload);
                } catch (err) {
                    console.warn(
                        "Gagal memanggil antrean Mobile JKN (status=1):",
                        err?.response?.data || err?.message
                    );
                }
            }

            // Setelah memanggil antrean, langsung buka halaman Rawat Jalan Lanjutan sesuai permintaan
            try {
                goToLanjutan(reg.no_rawat, reg.no_rkm_medis);
            } catch (e) {
                // Fallback: jika terjadi error saat konstruksi token atau route ziggy tidak tersedia,
                // tetap arahkan ke laman /rawat-jalan/lanjutan menggunakan path hardcode
                let url = "/rawat-jalan/lanjutan";
                router.get(url, { t: btoa(JSON.stringify({ no_rawat: reg.no_rawat, no_rkm_medis: reg.no_rkm_medis })) }, { preserveScroll: true });
            }
        } catch (e) {
            console.error(
                "Error saat panggil antrean dan buka Rawat Jalan:",
                e
            );
        }
    };

    const fetchBpjsByNik = async (nikOverride) => {
        const n = sanitizeNik(nikOverride ?? bpjsNik);
        setBpjsNik(n);
        setBpjsError(null);
        setBpjsData(null);
        if (!n || n.length < 8) {
            setBpjsError(
                "Masukkan NIK yang valid (min. 8 digit, ideal 16 digit)."
            );
            return;
        }
        setBpjsLoading(true);
        try {
            const res = await axios.get("/pcare/api/peserta/nik", {
                params: { nik: n },
            });
            // Expect shape: { metaData, response }
            if (res.status === 200) {
                setBpjsData({
                    metaData: res.data?.metaData,
                    response: res.data?.response,
                });
            } else {
                setBpjsError(
                    res.data?.metaData?.message ||
                        "Gagal mengambil data peserta"
                );
            }
        } catch (e) {
            setBpjsError(
                e?.response?.data?.metaData?.message ||
                    e?.message ||
                    "Terjadi kesalahan jaringan"
            );
        } finally {
            setBpjsLoading(false);
        }
    };

    // Search patients
    const handleSearch = async (term) => {
        if (!term.trim()) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);
        try {
            const response = await axios.get("/registration/search-patients", {
                params: { search: term },
            });
            setSearchResults(response.data.data);
        } catch (error) {
            console.error("Error searching patients:", error);
            alert("Gagal mencari data pasien");
        } finally {
            setIsSearching(false);
        }
    };

    // Handle search input change with debounce
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            handleSearch(searchTerm);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    // Select patient for registration
    const selectPatient = (patient) => {
        setSelectedPatient(patient);

        const fullAddress = [
            patient.alamat,
            patient.kelurahan?.nm_kel,
            patient.kecamatan?.nm_kec,
            patient.kabupaten?.nm_kab,
        ]
            .filter(Boolean)
            .join(', ');

        setFormData({
            ...formData,
            p_jawab: patient.namakeluarga || "",
            almt_pj: fullAddress || patient.alamatpj || "",
        });

        // Initialize BPJS check by default using patient's NIK if available
        try {
            const nik = sanitizeNik(patient?.no_ktp || "");
            const noka = String(patient?.no_peserta || "").replace(/[^0-9]/g, "");
            setBpjsNik(nik);
            setBpjsError(null);
            setBpjsData(null);
            // Simpan prefill ke localStorage agar Layanan PCare bisa otomatis terisi meski dibuka via sidebar
            try {
                const prefill = { mode: (noka ? 'noka' : (nik ? 'nik' : '')), nik: nik || '', noka: noka || '', ts: Date.now() };
                localStorage.setItem('pcarePrefill', JSON.stringify(prefill));
            } catch (_) {}
            if (nik) {
                // Fire and forget; no need to await before opening modal
                fetchBpjsByNik(nik);
            }
        } catch (_) {}
        // Tampilkan form registrasi langsung di panel kanan (tanpa modal)
        // setIsModalOpen(true);
    };

    // Handle form change
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Check poli status when polyclinic changes
        if (name === "kd_poli" && value && selectedPatient) {
            checkPoliStatus(value);
        }
    };

    // Check patient status in polyclinic
    const checkPoliStatus = async (kd_poli) => {
        try {
            const response = await axios.get(
                `/registration/${selectedPatient.no_rkm_medis}/check-poli-status`,
                {
                    params: { kd_poli },
                }
            );
            setPoliStatus(response.data.data);
        } catch (error) {
            console.error("Error checking poli status:", error);
        }
    };

    // Handle registration submission
    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Pastikan URL benar. Gunakan fallback eksplisit dan hanya terima hasil Ziggy jika valid.
            let url = `/registration/${encodeURIComponent(selectedPatient.no_rkm_medis)}/register`;
            try {
                const ziggyUrl = route("registration.register-patient", selectedPatient.no_rkm_medis);
                // Validasi: harus mengandung segment /registration/ dan diakhiri dengan /register
                if (typeof ziggyUrl === "string" && /\/registration\/.+\/register$/.test(ziggyUrl)) {
                    url = ziggyUrl;
                } else {
                    console.warn("Ziggy route malformed for register-patient, using fallback:", ziggyUrl);
                }
            } catch (err) {
                console.warn("Ziggy route() unavailable, using fallback URL.");
            }
            // Log URL yang dipakai agar mudah ditelusuri di console/network
            try { console.debug("RegisterPatient POST URL:", url); } catch (_) {}

            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content || '';
            const response = await axios.post(
                url,
                formData,
                {
                    headers: {
                        'X-CSRF-TOKEN': csrfToken,
                        'X-Requested-With': 'XMLHttpRequest',
                        'Accept': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                alert(response.data.message);
                // Setelah registrasi lokal berhasil, kirim antrean ke Mobile JKN hanya jika jenis bayar diizinkan (BPJ/PBI/NON)
                try {
                    if (!isJenisBayarAllowedForAntrean(formData.kd_pj)) {
                        // Jenis bayar selain BPJ/PBI: hanya simpan lokal, tidak kirim antrean dan tidak tampilkan popup
                        console.info(
                            "Jenis bayar bukan BPJ/PBI, melewati pengiriman antrean Mobile JKN.",
                            {
                                kd_pj: formData.kd_pj,
                                jenis: resolveJenisBayarFromKdPj(
                                    formData.kd_pj
                                ),
                            }
                        );
                    } else {
                        const reg = response.data.data || {};
                        const mjRes = await axios.post(
                            "/api/mobilejkn/antrean/add",
                            {
                                no_rkm_medis: selectedPatient.no_rkm_medis,
                                kd_poli: formData.kd_poli,
                                kd_dokter: formData.kd_dokter,
                                tanggalperiksa: reg.tgl_registrasi,
                                no_reg: reg.no_reg,
                            }
                        );
                        // Jika status selain 200, tampilkan popup respon BPJS
                        if (mjRes?.status !== 200) {
                            openBpjsPopup({
                                status: mjRes?.status,
                                message:
                                    mjRes?.data?.metaData?.message ||
                                    mjRes?.data?.metadata?.message ||
                                    "BPJS Mobile JKN mengembalikan status selain 200",
                                data: mjRes?.data ?? null,
                                raw:
                                    typeof mjRes?.data === "string"
                                        ? mjRes.data
                                        : JSON.stringify(
                                              mjRes?.data ?? {},
                                              null,
                                              2
                                          ),
                            });
                        } else {
                            // Status HTTP 200, tetapi perlu cek metaData.code dan pesan kegagalan pada body
                            const meta =
                                mjRes?.data?.metaData ??
                                mjRes?.data?.metadata ??
                                {};
                            const codeNum = Number(meta?.code ?? 200);
                            const msgStr = String(meta?.message ?? "").trim();
                            const looksLikeFailure =
                                codeNum !== 200 ||
                                /skrining kesehatan|gagal|tidak/i.test(msgStr);
                            if (looksLikeFailure) {
                                openBpjsPopup({
                                    status: 200,
                                    message:
                                        msgStr ||
                                        "Respon BPJS mengindikasikan kegagalan meskipun status HTTP 200",
                                    data: mjRes?.data ?? null,
                                    raw:
                                        typeof mjRes?.data === "string"
                                            ? mjRes.data
                                            : JSON.stringify(
                                                  mjRes?.data ?? {},
                                                  null,
                                                  2
                                              ),
                                });
                            } else {
                                // Beri informasi sukses ringan; respons detail ditangani di backend
                                console.log(
                                    "Antrean Mobile JKN berhasil dikirim"
                                );
                            }
                        }
                    }
                } catch (err) {
                    console.warn(
                        "Gagal mengirim antrean Mobile JKN:",
                        err?.response?.data || err?.message
                    );
                    // Tampilkan popup respon BPJS dengan detail error
                    openBpjsPopup({
                        status: err?.response?.status ?? null,
                        message:
                            err?.response?.data?.metaData?.message ||
                            err?.response?.data?.metadata?.message ||
                            err?.message ||
                            "Gagal mengirim antrean ke Mobile JKN",
                        data: err?.response?.data ?? null,
                        raw:
                            typeof err?.response?.data === "string"
                                ? err.response.data
                                : JSON.stringify(
                                      err?.response?.data ?? {
                                          error: err?.message,
                                      },
                                      null,
                                      2
                                  ),
                    });
                }
                setIsModalOpen(false);
                resetForm();
                // Refresh registrations
                loadRegistrations();
            }
        } catch (error) {
            console.error("Error registering patient:", error);
            if (error.response?.data?.message) {
                alert(error.response.data.message);
            } else {
                alert("Gagal mendaftarkan pasien");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // Reset form
    const resetForm = () => {
        setSelectedPatient(null);
        setFormData({
            kd_dokter: "",
            kd_poli: "",
            kd_pj: "",
            p_jawab: "",
            almt_pj: "",
            hubunganpj: "DIRI SENDIRI",
        });
        setPoliStatus({
            status_poli: "",
            biaya_reg: 0,
            has_registered: false,
        });
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
        resetForm();
    };

    // Open detail modal
    const openDetailModal = (registration) => {
        setSelectedRegistration(registration);
        setIsDetailModalOpen(true);
    };

    // Close detail modal
    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
        setSelectedRegistration(null);
    };

    // Open patient modal
    const openPatientModal = () => {
        setIsPatientModalOpen(true);
    };

    // Open/Close edit patient modal
    const openEditModal = (patient) => {
        setEditPatient(patient || selectedPatient);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditPatient(null);
    };

    // After successful edit, refresh search results and selected patient data
    const handleEditSuccess = (updatedData) => {
        try {
            // Refresh list if searching
            if (searchTerm) {
                handleSearch(searchTerm);
            }

            // Update selected patient info in modal
            if (
                selectedPatient &&
                editPatient?.no_rkm_medis === selectedPatient.no_rkm_medis
            ) {
                setSelectedPatient((prev) => ({ ...prev, ...updatedData }));
                setFormData((prev) => ({
                    ...prev,
                    p_jawab: updatedData?.namakeluarga ?? prev.p_jawab,
                    almt_pj:
                        updatedData?.alamatpj ??
                        updatedData?.alamat ??
                        prev.almt_pj,
                }));

                // If NIK changes, refresh BPJS data
                const newNik = sanitizeNik(
                    updatedData?.no_ktp || selectedPatient?.no_ktp || ""
                );
                if (newNik && newNik !== bpjsNik) {
                    fetchBpjsByNik(newNik);
                }
            }
        } catch (error) {
            console.error("Error updating local state after edit:", error);
        }
    };

    // Close patient modal
    const closePatientModal = () => {
        setIsPatientModalOpen(false);
    };

    // Handle patient creation success
    const handlePatientSuccess = (newPatient) => {
        // Refresh search results or show success message
        // alert("Pasien berhasil ditambahkan!");
        
        if (newPatient && newPatient.no_rkm_medis) {
            setSearchTerm(newPatient.no_rkm_medis);
            handleSearch(newPatient.no_rkm_medis);
        }

        // Optionally refresh the page or search results
        loadRegistrations();
    };

    // Calculate stats from registration data
    const calculateStats = (data) => {
        if (!data || !data.data || data.data.length === 0) {
            return {
                total: data?.total || 0,
                belum: 0,
                selesai: 0,
                batal: 0,
                baru: 0,
                lama: 0,
                totalBiaya: 0,
            };
        }

        const registrations = data.data;
        const stats = {
            total: data.total || registrations.length,
            belum: registrations.filter((r) => r.stts === "Belum").length,
            selesai: registrations.filter((r) => r.stts === "Sudah").length,
            batal: registrations.filter((r) => r.stts === "Batal").length,
            baru: registrations.filter((r) => r.status_poli === "Baru").length,
            lama: registrations.filter((r) => r.status_poli === "Lama").length,
            totalBiaya: registrations.reduce(
                (sum, r) => sum + (r.biaya_reg || 0),
                0
            ),
        };

        return stats;
    };

    // Load registrations with filters
    const loadRegistrations = async (page = 1) => {
        setIsLoading(true);
        try {
            // Hindari mengirim parameter kosong agar backend memakai default
            const params = { ...filters, page };
            Object.keys(params).forEach((key) => {
                if (params[key] === "" || params[key] === null)
                    delete params[key];
            });
            const response = await axios.get(
                "/registration/get-registrations",
                {
                    params,
                }
            );
            setRegistrationData(response.data.data);
            setStats(calculateStats(response.data.data));
            setCurrentPage(page);
        } catch (error) {
            console.error("Error loading registrations:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle filter change
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    // Load registrations when filters change (with debounce for search)
    useEffect(() => {
        const timeoutId = setTimeout(
            () => {
                loadRegistrations(1); // Reset to page 1 when filters change
            },
            filters.search ? 500 : 0
        ); // Debounce search input

        return () => clearTimeout(timeoutId);
    }, [
        filters.date,
        filters.start_date,
        filters.end_date,
        filters.kd_poli,
        filters.kd_dokter,
        filters.search,
        filters.status,
        filters.status_poli,
        // Muat ulang jika jumlah per halaman berubah
        filters.per_page,
    ]);

    // Calculate initial stats
    useEffect(() => {
        setStats(calculateStats(registrations));
    }, []);

    // Close dropdown saat klik di luar
    useEffect(() => {
        function handleClickOutside(event) {
            if (openDropdown && !event.target.closest('.action-dropdown')) {
                setOpenDropdown(null);
            }
        }

        if (openDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openDropdown]);

    // Fungsi untuk membuka popup menu cetak
    const openPrintMenu = (reg) => {
        setSelectedRegForPrint(reg);
        setIsPrintMenuOpen(true);
        setOpenDropdown(null);
    };

    // Fungsi untuk menutup popup menu cetak
    const closePrintMenu = () => {
        setIsPrintMenuOpen(false);
        setSelectedRegForPrint(null);
    };

    // Fungsi untuk cetak registrasi
    const handlePrintRegistration = (reg) => {
        try {
            // Coba gunakan route jika tersedia, fallback ke URL langsung
            let printUrl = `/registration/${reg.no_rawat}/print`;
            try {
                printUrl = route('registration.print', reg.no_rawat);
            } catch (_) {
                // Fallback ke URL langsung jika route tidak tersedia
            }
            window.open(printUrl, '_blank');
            closePrintMenu();
        } catch (error) {
            console.error('Error opening print window:', error);
            alert('Gagal membuka halaman cetak registrasi');
        }
    };

    // Cancel registration, sambil mengirim status panggil (2 = Tidak Hadir) ke Mobile JKN jika penjamin BPJS
    const handleCancelRegistration = async (regOrNoRawat) => {
        if (!confirm("Apakah Anda yakin ingin membatalkan registrasi ini?")) {
            return;
        }

        // Jika memungkinkan, kirim panggil antrean dengan status 2 (Tidak Hadir)
        try {
            const reg =
                typeof regOrNoRawat === "object"
                    ? regOrNoRawat
                    : (registrationData?.data || []).find(
                          (r) => r.no_rawat === regOrNoRawat
                      );
            if (reg && isRegistrationAllowedForAntrean(reg)) {
                const payloadPanggil = {
                    no_rkm_medis: reg.no_rkm_medis,
                    kd_poli: reg.kd_poli || reg?.poliklinik?.kd_poli,
                    status: 2, // Tidak Hadir
                    tanggalperiksa: reg.tgl_registrasi,
                };
                try {
                    await axios.post(
                        "/api/mobilejkn/antrean/panggil",
                        payloadPanggil
                    );
                } catch (err) {
                    console.warn(
                        "Gagal mengirim update status antrean (status=2) ke Mobile JKN:",
                        err?.response?.data || err?.message
                    );
                }

                // Setelah update status tidak hadir, kirim permintaan pembatalan antrean ke Mobile JKN
                const payloadBatal = {
                    no_rkm_medis: reg.no_rkm_medis,
                    kd_poli: reg.kd_poli || reg?.poliklinik?.kd_poli,
                    tanggalperiksa: reg.tgl_registrasi,
                    alasan: "Batal registrasi oleh petugas",
                };
                try {
                    await axios.post(
                        "/api/mobilejkn/antrean/batal",
                        payloadBatal
                    );
                } catch (err) {
                    console.warn(
                        "Gagal mengirim pembatalan antrean ke Mobile JKN:",
                        err?.response?.data || err?.message
                    );
                }
            }
        } catch (_) {}

        try {
            const no_rawat =
                typeof regOrNoRawat === "object"
                    ? regOrNoRawat?.no_rawat
                    : regOrNoRawat;
            const response = await axios.post("/registration/cancel", {
                no_rawat: no_rawat,
            });

            if (response.data.success) {
                alert(response.data.message);
                // Refresh registrations and stats
                loadRegistrations();
            }
        } catch (error) {
            console.error("Error cancelling registration:", error);
            if (error.response?.data?.message) {
                alert(error.response.data.message);
            } else {
                alert("Gagal membatalkan registrasi");
            }
        }
    };

    return (
        <LanjutanRegistrasiLayout title="Pendaftaran Pasien" menuConfig={{ activeTab: "registrasi" }}>
            <Head title="Pendaftaran Pasien" />

            {/* Header */}
            <motion.div
                className="flex items-center justify-between mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                        Registrasi Pasien
                    </h1>
                    
                </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1 mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                {/* Total Registrasi */}
                <motion.div
                    className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30 p-1 rounded-sm border border-blue-200 dark:border-blue-700/50"
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <svg className="w-3 h-3 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="text-xs font-medium text-blue-600 dark:text-blue-400">Total</p>
                        </div>
                        <p className="text-sm font-bold text-blue-700 dark:text-blue-300">{stats.total}</p>
                    </div>
                </motion.div>

                {/* Status Belum */}
                <motion.div
                    className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/30 p-1 rounded-sm border border-red-200 dark:border-red-700/50"
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <svg className="w-3 h-3 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-xs font-medium text-red-600 dark:text-red-400">Belum</p>
                        </div>
                        <p className="text-sm font-bold text-red-700 dark:text-red-300">{stats.belum}</p>
                    </div>
                </motion.div>

                {/* Status Selesai */}
                <motion.div
                    className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/30 p-1 rounded-sm border border-green-200 dark:border-green-700/50"
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-xs font-medium text-green-600 dark:text-green-400">Selesai</p>
                        </div>
                        <p className="text-sm font-bold text-green-700 dark:text-green-300">{stats.selesai}</p>
                    </div>
                </motion.div>

                {/* Status Batal */}
                <motion.div
                    className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/30 p-1 rounded-sm border border-gray-200 dark:border-gray-700/50"
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <svg className="w-3 h-3 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Batal</p>
                        </div>
                        <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{stats.batal}</p>
                    </div>
                </motion.div>

                {/* Pasien Baru */}
                <motion.div
                    className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/30 p-1 rounded-sm border border-purple-200 dark:border-purple-700/50"
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <svg className="w-3 h-3 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                            <p className="text-xs font-medium text-purple-600 dark:text-purple-400">Baru</p>
                        </div>
                        <p className="text-sm font-bold text-purple-700 dark:text-purple-300">{stats.baru}</p>
                    </div>
                </motion.div>

                {/* Pasien Lama */}
                <motion.div
                    className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/30 p-1 rounded-sm border border-orange-200 dark:border-orange-700/50"
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <svg className="w-3 h-3 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <p className="text-xs font-medium text-orange-600 dark:text-orange-400">Lama</p>
                        </div>
                        <p className="text-sm font-bold text-orange-700 dark:text-orange-300">{stats.lama}</p>
                    </div>
                </motion.div>

                
            </motion.div>

            {/* Main Content */}
            <motion.div
                className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="flex flex-col lg:flex-row items-stretch min-h-0">
                    {/* Left Panel - Patient Search (Mobile: Full Width, Desktop: 40%) */}
                    <motion.div
                        className="w-full lg:w-2/5 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700 px-4 lg:px-6 pt-4 lg:pt-6 pb-0"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className="h-full flex flex-col">
                            <motion.div
                                className="mb-4 lg:mb-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                <div className="flex items-center justify-between mb-3 lg:mb-4">
                                    <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white">
                                        Cari Pasien
                                    </h3>
                                    <motion.button
                                        onClick={openPatientModal}
                                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 text-xs rounded-md flex items-center gap-1 transition-colors shadow-sm"
                                        whileHover={{ scale: 1.05, y: -1 }}
                                        whileTap={{ scale: 0.95 }}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: 0.6,
                                        }}
                                    >
                                        <svg
                                            className="w-3 h-3"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            />
                                        </svg>
                                        Tambah
                                    </motion.button>
                                </div>

                                {/* Search Input */}
                                <motion.div
                                    className="relative"
                                    whileFocus={{ scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        placeholder="Cari berdasarkan nama, nomor RM, atau KTP..."
                                        className="w-full px-4 py-2 lg:py-3 pl-10 text-sm lg:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg
                                            className="h-5 w-5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                    </div>
                                    {isSearching && (
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                            <svg
                                                className="animate-spin h-5 w-5 text-blue-500"
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
                                        </div>
                                    )}
                                </motion.div>
                            </motion.div>

                            {/* Search Results */}
                            <div className="flex-1 overflow-y-auto max-h-[640px]">
                                <AnimatePresence>
                                    {searchTerm && (
                                        <motion.div
                                            className="space-y-2 lg:space-y-3"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <AnimatePresence>
                                                {searchResults.length > 0
                                                    ? searchResults.map(
                                                          (patient, index) => (
                                                              <motion.div
                                                                  key={
                                                                      patient.no_rkm_medis
                                                                  }
                                                                  onClick={() =>
                                                                      selectPatient(
                                                                          patient
                                                                      )
                                                                  }
                                                                  className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                                                                  initial={{
                                                                      opacity: 0,
                                                                      y: 20,
                                                                  }}
                                                                  animate={{
                                                                      opacity: 1,
                                                                      y: 0,
                                                                  }}
                                                                  exit={{
                                                                      opacity: 0,
                                                                      y: -20,
                                                                  }}
                                                                  transition={{
                                                                      duration: 0.3,
                                                                      delay:
                                                                          index *
                                                                          0.1,
                                                                      type: "spring",
                                                                      stiffness: 100,
                                                                  }}
                                                                  whileHover={{
                                                                      scale: 1.02,
                                                                      transition:
                                                                          {
                                                                              duration: 0.2,
                                                                          },
                                                                  }}
                                                                  whileTap={{
                                                                      scale: 0.98,
                                                                  }}
                                                              >
                                                                  <div className="flex justify-between items-start gap-2">
                                                                      <div className="flex-1 min-w-0">
                                                                          <div className="flex items-center gap-2 mb-1">
                                                                              <h4 className="font-medium text-sm text-gray-900 dark:text-white truncate">
                                                                                  {patient.nm_pasien}
                                                                              </h4>
                                                                              <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                                                                                  {patient.no_rkm_medis}
                                                                              </span>
                                                                          </div>
                                                                          
                                                                          <div className="flex flex-wrap gap-x-3 gap-y-1 mb-1 text-xs text-gray-600 dark:text-gray-400">
                                                                              {patient.no_ktp && (
                                                                                  <span>{patient.no_ktp}</span>
                                                                              )}
                                                                              <span className="flex items-center gap-1">
                                                                                  <span>{patient.jk === "L" ? "L" : "P"}</span>
                                                                                  <span>•</span>
                                                                                  <span>{patient.umur}</span>
                                                                              </span>
                                                                          </div>

                                                                          <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight line-clamp-2">
                                                                              {[
                                                                                  patient.alamat,
                                                                                  patient.kelurahan?.nm_kel,
                                                                                  patient.kecamatan?.nm_kec,
                                                                                  patient.kabupaten?.nm_kab,
                                                                              ]
                                                                                  .filter(Boolean)
                                                                                  .join(", ")}
                                                                          </p>
                                                                      </div>
                                                                      <div className="flex flex-col gap-1">
                                                                          <motion.button
                                                                              className="px-2 py-1 bg-blue-600 text-white text-[10px] rounded hover:bg-blue-700 transition-colors flex-shrink-0 w-full text-center"
                                                                              whileHover={{
                                                                                  scale: 1.05,
                                                                              }}
                                                                              whileTap={{
                                                                                  scale: 0.95,
                                                                              }}
                                                                          >
                                                                              Pilih
                                                                          </motion.button>
                                                                          <motion.button
                                                                              onClick={(e) => {
                                                                                  e.stopPropagation();
                                                                                  openEditModal(patient);
                                                                              }}
                                                                              className="px-2 py-1 bg-indigo-600 text-white text-[10px] rounded hover:bg-indigo-700 transition-colors flex-shrink-0 w-full text-center"
                                                                              whileHover={{
                                                                                  scale: 1.05,
                                                                              }}
                                                                              whileTap={{
                                                                                  scale: 0.95,
                                                                              }}
                                                                          >
                                                                              Edit
                                                                          </motion.button>
                                                                      </div>
                                                                  </div>
                                                              </motion.div>
                                                          )
                                                      )
                                                    : !isSearching && (
                                                          <motion.div
                                                              className="text-center py-6 lg:py-8 text-gray-500 dark:text-gray-400"
                                                              initial={{
                                                                  opacity: 0,
                                                              }}
                                                              animate={{
                                                                  opacity: 1,
                                                              }}
                                                              transition={{
                                                                  duration: 0.3,
                                                              }}
                                                          >
                                                              <p className="text-sm lg:text-base">
                                                                  Tidak ada
                                                                  pasien
                                                                  ditemukan
                                                              </p>
                                                          </motion.div>
                                                      )}
                                            </AnimatePresence>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {!searchTerm && (
                                    <motion.div
                                        className="text-center py-8 lg:py-12 text-gray-500 dark:text-gray-400"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.6,
                                        }}
                                    >
                                        <motion.svg
                                            className="mx-auto h-10 w-10 lg:h-12 lg:w-12 mb-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            initial={{ rotate: 0 }}
                                            animate={{ rotate: 360 }}
                                            transition={{
                                                duration: 20,
                                                repeat: Infinity,
                                                ease: "linear",
                                            }}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </motion.svg>
                                        <p className="text-sm lg:text-base">
                                            Masukkan kata kunci untuk mencari
                                            pasien
                                        </p>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Panel - Registration List (Mobile: Full Width, Desktop: 60%) */}
                    <motion.div
                        className="w-full lg:w-3/5 px-4 lg:px-6 pt-4 lg:pt-6 pb-3"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="h-full flex flex-col">
                            {/* Inline Registration Form (replaces list + pagination) */}
                            <div className="flex-1 overflow-y-auto">
                                {!selectedPatient ? (
                                    <motion.div
                                        className="text-center py-8 lg:py-12 text-gray-500 dark:text-gray-400"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <motion.svg
                                            className="mx-auto h-10 w-10 lg:h-12 lg:w-12 mb-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            initial={{ rotate: 0 }}
                                            animate={{ rotate: 360 }}
                                            transition={{
                                                duration: 20,
                                                repeat: Infinity,
                                                ease: "linear",
                                            }}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </motion.svg>
                                        <p className="text-sm lg:text-base">
                                            Silakan pilih pasien di panel kiri untuk melakukan registrasi periksa.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <div className="p-0">
                                        <motion.div
                                            className="flex justify-between items-center mb-4 lg:mb-6"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white pr-4">
                                                Registrasi Periksa - {selectedPatient?.nm_pasien}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <motion.button
                                                    onClick={() => openEditModal(selectedPatient)}
                                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 text-xs rounded-md flex items-center gap-1 transition-colors shadow-sm"
                                                    whileHover={{ scale: 1.05, y: -1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5h2m-6 6h6m-3 6h6M7 7l10 10" />
                                                    </svg>
                                                    Edit Data Pasien
                                                </motion.button>
                                                <motion.button
                                                    onClick={resetForm}
                                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0"
                                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <XMarkIcon className="w-6 h-6" />
                                                </motion.button>
                                            </div>
                                        </motion.div>

                                        {/* Form Registrasi */}
                                        <motion.form
                                            onSubmit={handleSubmitRegister}
                                            className="space-y-3"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {/* Row 1: 2 Columns (Dokter, Poli) */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {/* Dokter */}
                                                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2, delay: 0.2 }}>
                                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Dokter *</label>
                                                    <select
                                                        name="kd_dokter"
                                                        value={formData.kd_dokter}
                                                        onChange={handleFormChange}
                                                        required
                                                        className="w-full px-2.5 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                    >
                                                        <option value="">Pilih Dokter</option>
                                                        {dokters?.map((dokter) => (
                                                            <option key={dokter.kd_dokter} value={dokter.kd_dokter}>
                                                                {dokter.nm_dokter}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </motion.div>

                                                {/* Poliklinik */}
                                                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2, delay: 0.25 }}>
                                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Poliklinik *</label>
                                                    <select
                                                        name="kd_poli"
                                                        value={formData.kd_poli}
                                                        onChange={handleFormChange}
                                                        required
                                                        className="w-full px-2.5 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                    >
                                                        <option value="">Pilih Poliklinik</option>
                                                        {polikliniks?.map((poli) => (
                                                            <option key={poli.kd_poli} value={poli.kd_poli}>
                                                                {poli.nm_poli}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </motion.div>
                                            </div>

                                            {/* Status Poli dan Biaya Registrasi - Compact Inline */}
                                            {formData.kd_poli && (
                                                <motion.div
                                                    className="flex flex-wrap items-center gap-x-6 gap-y-2 px-3 py-2 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/50"
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Status Poli:</span>
                                                        <span
                                                            className={`px-2 py-0.5 rounded text-xs font-bold border ${
                                                                poliStatus.status_poli === "Lama"
                                                                    ? "bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-900/30 dark:border-orange-700 dark:text-orange-300"
                                                                    : "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-700 dark:text-emerald-300"
                                                            }`}
                                                        >
                                                            {poliStatus.status_poli}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Biaya:</span>
                                                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                                                            Rp {poliStatus.biaya_reg?.toLocaleString("id-ID") || "0"}
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* Row 2: 3 Columns (Hubungan, Nama PJ, Cara Bayar) */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                {/* Hubungan Penanggung Jawab */}
                                                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2, delay: 0.35 }}>
                                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Hubungan *</label>
                                                    <select
                                                        name="hubunganpj"
                                                        value={formData.hubunganpj}
                                                        onChange={handleFormChange}
                                                        required
                                                        className="w-full px-2.5 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                    >
                                                        <option value="DIRI SENDIRI">Diri Sendiri</option>
                                                        <option value="AYAH">Ayah</option>
                                                        <option value="IBU">Ibu</option>
                                                        <option value="ISTRI">Istri</option>
                                                        <option value="SUAMI">Suami</option>
                                                        <option value="SAUDARA">Saudara</option>
                                                        <option value="ANAK">Anak</option>
                                                        <option value="LAIN-LAIN">Lain-lain</option>
                                                    </select>
                                                </motion.div>

                                                {/* Nama Penanggung Jawab */}
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Penanggung Jawab *</label>
                                                    <input
                                                        type="text"
                                                        name="p_jawab"
                                                        value={formData.p_jawab}
                                                        onChange={handleFormChange}
                                                        required
                                                        className="w-full px-2.5 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                    />
                                                </div>

                                                {/* Cara Bayar */}
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Cara Bayar *</label>
                                                    <div className="flex items-center gap-2">
                                                        <select
                                                            name="kd_pj"
                                                            value={formData.kd_pj}
                                                            onChange={handleFormChange}
                                                            required
                                                            className="flex-1 w-full px-2.5 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                        >
                                                            <option value="">Pilih Cara Bayar</option>
                                                            {penjabsList?.map((penjab) => (
                                                                <option key={penjab.kd_pj} value={penjab.kd_pj}>
                                                                    {penjab.png_jawab}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <button
                                                            type="button"
                                                            onClick={openPenjabCreate}
                                                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors shadow-sm"
                                                            title="Tambah Cara Bayar Baru"
                                                        >
                                                            <span className="text-lg leading-none mb-0.5">+</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Alamat Penanggung Jawab - Full Width */}
                                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.4 }}>
                                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Alamat Penanggung Jawab *</label>
                                                <textarea
                                                    name="almt_pj"
                                                    value={formData.almt_pj}
                                                    onChange={handleFormChange}
                                                    required
                                                    rows={3}
                                                    className="w-full px-2.5 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 resize-y"
                                                />
                                            </motion.div>

                                            

                                            <motion.div
                                                className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.2, delay: 0.1 }}
                                            >
                                                <motion.button
                                                    type="button"
                                                    onClick={resetForm}
                                                    className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    Batal
                                                </motion.button>
                                                <motion.button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                                >
                                                    {isSubmitting && (
                                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                    )}
                                                    {isSubmitting ? "Menyimpan..." : "Simpan Registrasi"}
                                                </motion.button>
                                            </motion.div>
                                        </motion.form>

                                        {/* BPJS Kepesertaan - tampil di bawah form registrasi */}
                                        <motion.div
                                            className="mt-4 mb-4"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: 0.1 }}
                                        >
                                            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <IdentificationIcon className="h-5 w-5 text-slate-500" />
                                                        <div>
                                                            <div className="text-sm font-semibold text-slate-800">
                                                                Kepesertaan BPJS
                                                            </div>
                                                            <div className="text-xs text-slate-500">
                                                                Cek otomatis berdasarkan NIK pasien
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="text"
                                                            inputMode="numeric"
                                                            value={bpjsNik}
                                                            onChange={(e) => setBpjsNik(sanitizeNik(e.target.value))}
                                                            placeholder="Masukkan NIK"
                                                            className="w-40 rounded-md border border-slate-300 px-2 py-1 text-sm"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => fetchBpjsByNik()}
                                                            disabled={bpjsLoading}
                                                            className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-white shadow ${bpjsLoading ? "bg-emerald-400" : "bg-emerald-600 hover:bg-emerald-700"}`}
                                                        >
                                                            {bpjsLoading ? (
                                                                <ArrowPathIcon className="h-4 w-4 animate-spin" />
                                                            ) : (
                                                                <MagnifyingGlassIcon className="h-4 w-4" />
                                                            )}
                                                            {bpjsLoading ? "Mencari…" : "Cari"}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setBpjsNik(sanitizeNik(selectedPatient?.no_ktp || ""));
                                                                setBpjsError(null);
                                                                setBpjsData(null);
                                                            }}
                                                            className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm hover:bg-slate-50"
                                                        >
                                                            Reset
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Status */}
                                                <div className="mt-2 flex items-center gap-2">
                                                    {bpjsLoading ? (
                                                        <>
                                                            <ArrowPathIcon className="h-4 w-4 animate-spin text-emerald-600" />
                                                            <span className="text-slate-700 text-sm">Memuat…</span>
                                                        </>
                                                    ) : bpjsError ? (
                                                        <>
                                                            <ExclamationTriangleIcon className="h-4 w-4 text-red-600" />
                                                            <span className="text-red-700 text-sm">{bpjsError}</span>
                                                        </>
                                                    ) : bpjsData?.response ? (
                                                        <>
                                                            <CheckCircleIcon className="h-4 w-4 text-emerald-600" />
                                                            <span className="text-slate-700 text-sm">{bpjsData?.metaData?.message || "OK"}</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <IdentificationIcon className="h-4 w-4 text-slate-500" />
                                                            <span className="text-slate-600 text-sm">Siap mencari</span>
                                                        </>
                                                    )}
                                                </div>

                                                {/* Hasil singkat */}
                                                {bpjsData?.response && (
                                                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                        <div className="rounded-lg border border-slate-200 p-3">
                                                            <div className="text-xs text-slate-500">Nama Peserta</div>
                                                            <div className="mt-1 flex items-center gap-2 text-sm text-slate-800">
                                                                <span>{bpjsData.response?.nama || "-"}</span>
                                                            </div>
                                                        </div>
                                                        <div className="rounded-lg border border-slate-200 p-3">
                                                            <div className="text-xs text-slate-500">No. Kartu</div>
                                                            <div className="mt-1 flex items-center gap-2 text-sm text-slate-800">
                                                                <span>{bpjsData.response?.noKartu || "-"}</span>
                                                                {bpjsData.response?.noKartu && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={async () => {
                                                                            try {
                                                                                await navigator.clipboard.writeText(bpjsData.response.noKartu);
                                                                            } catch (_) {}
                                                                        }}
                                                                        className="ml-1 rounded p-1 text-slate-400 hover:text-slate-600"
                                                                        title="Salin No. Kartu"
                                                                    >
                                                                        <ClipboardDocumentCheckIcon className="h-4 w-4" />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="rounded-lg border border-slate-200 p-3">
                                                            <div className="text-xs text-slate-500">Status</div>
                                                            <div className="mt-1 text-sm">
                                                                {bpjsData.response?.aktif ? (
                                                                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">AKTIF</span>
                                                                ) : (
                                                                    <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">TIDAK AKTIF</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="rounded-lg border border-slate-200 p-3">
                                                            <div className="text-xs text-slate-500">NIK</div>
                                                            <div className="mt-1 text-sm text-slate-800">{bpjsData.response?.noKTP || "-"}</div>
                                                        </div>
                                                        <div className="rounded-lg border border-slate-200 p-3">
                                                            <div className="text-xs text-slate-500">Provider FKTP</div>
                                                            <div className="mt-1 text-sm text-slate-800">{bpjsData.response?.kdProviderPst?.nmProvider || "-"}</div>
                                                        </div>
                                                        <div className="rounded-lg border border-slate-200 p-3">
                                                            <div className="text-xs text-slate-500">Kelas</div>
                                                            <div className="mt-1 text-sm text-slate-800">{bpjsData.response?.jnsKelas?.nama || bpjsData.response?.jnsKelas?.kode || "-"}</div>
                                                        </div>
                                                        <div className="rounded-lg border border-slate-200 p-3">
                                                            <div className="text-xs text-slate-500">Mulai Aktif</div>
                                                            <div className="mt-1 text-sm text-slate-800">{bpjsData.response?.tglMulaiAktif || "-"}</div>
                                                        </div>
                                                        <div className="rounded-lg border border-slate-200 p-3">
                                                            <div className="text-xs text-slate-500">Akhir Berlaku</div>
                                                            <div className="mt-1 text-sm text-slate-800">{bpjsData.response?.tglAkhirBerlaku || "-"}</div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Datatable Registrasi - reg_periksa */}
            <motion.div
                className="mt-6 bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className="p-4 lg:p-6">
                    <div className="flex items-center justify-between mb-4 lg:mb-6">
                        <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white">
                            Data Registrasi
                        </h3>
                        <div className="flex items-center gap-2">
                            <label className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                                Per halaman
                            </label>
                            <select
                                name="per_page"
                                value={filters.per_page}
                                onChange={handleFilterChange}
                                className="px-2 py-1.5 text-xs lg:text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            >
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                        </div>
                    </div>

                    {/* Filter Data Registrasi (dipindahkan ke atas Datatable) */}
                    <motion.div
                        className="mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {/* Filter Toggle Button */}
                        <motion.button
                            onClick={() =>
                                setIsFilterExpanded(!isFilterExpanded)
                            }
                            className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                        >
                            <div className="flex items-center gap-2">
                                <svg
                                    className="w-5 h-5 text-gray-600 dark:text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
                                    />
                                </svg>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Filter Data Registrasi
                                </span>
                                {/* Active filters count */}
                                {Object.values(filters).some(
                                    (value) =>
                                        value !== "" &&
                                        value !==
                                            new Date()
                                                .toISOString()
                                                .split("T")[0]
                                ) && (
                                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 rounded-full">
                                        {
                                            Object.values(filters).filter(
                                                (value) =>
                                                    value !== "" &&
                                                    value !==
                                                        new Date()
                                                            .toISOString()
                                                            .split("T")[0]
                                            ).length
                                        }
                                    </span>
                                )}
                            </div>
                            <motion.svg
                                className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                                    isFilterExpanded ? "rotate-180" : ""
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                animate={{ rotate: isFilterExpanded ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </motion.svg>
                        </motion.button>

                        {/* Filter Content */}
                        <AnimatePresence>
                            {isFilterExpanded && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg mt-2">
                                        {/* Basic Filters Row */}
                                        <motion.div
                                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 mb-4"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: 0.1 }}
                                        >
                                            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                                                <label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Tanggal
                                                </label>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="date"
                                                        name="start_date"
                                                        value={filters.start_date}
                                                        onChange={handleFilterChange}
                                                        className="w-full px-3 py-2 text-xs lg:text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                    />
                                                    <input
                                                        type="date"
                                                        name="end_date"
                                                        value={filters.end_date}
                                                        onChange={handleFilterChange}
                                                        className="w-full px-3 py-2 text-xs lg:text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                    />
                                                </div>
                                            </motion.div>
                                            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                                                <label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Poliklinik
                                                </label>
                                                <select
                                                    name="kd_poli"
                                                    value={filters.kd_poli}
                                                    onChange={handleFilterChange}
                                                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                >
                                                    <option value="">Semua Poliklinik</option>
                                                    {polikliniks?.map((poli) => (
                                                        <option key={poli.kd_poli} value={poli.kd_poli}>
                                                            {poli.nm_poli}
                                                        </option>
                                                    ))}
                                                </select>
                                            </motion.div>
                                            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                                                <label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Dokter
                                                </label>
                                                <select
                                                    name="kd_dokter"
                                                    value={filters.kd_dokter}
                                                    onChange={handleFilterChange}
                                                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                >
                                                    <option value="">Semua Dokter</option>
                                                    {dokters?.map((dokter) => (
                                                        <option key={dokter.kd_dokter} value={dokter.kd_dokter}>
                                                            {dokter.nm_dokter}
                                                        </option>
                                                    ))}
                                                </select>
                                            </motion.div>
                                        </motion.div>

                                        {/* Additional Filters Row */}
                                        <motion.div
                                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 mb-4"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: 0.2 }}
                                        >
                                            {/* Search by Name */}
                                            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                                                <label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Cari Nama Pasien
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        name="search"
                                                        value={filters.search}
                                                        onChange={handleFilterChange}
                                                        placeholder="Cari nama atau nomor RM..."
                                                        className="w-full px-3 py-2 pl-10 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                    />
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </motion.div>

                                            {/* Status Filter */}
                                            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                                                <label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Status
                                                </label>
                                                <select
                                                    name="status"
                                                    value={filters.status}
                                                    onChange={handleFilterChange}
                                                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                >
                                                    <option value="">Semua Status</option>
                                                    <option value="Belum">Belum</option>
                                                    <option value="Sudah">Sudah</option>
                                                    <option value="Batal">Batal</option>
                                                </select>
                                            </motion.div>

                                            {/* Status Poli Filter */}
                                            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                                                <label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Status Poli
                                                </label>
                                                <select
                                                    name="status_poli"
                                                    value={filters.status_poli}
                                                    onChange={handleFilterChange}
                                                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                >
                                                    <option value="">Semua Status Poli</option>
                                                    <option value="Baru">Baru</option>
                                                    <option value="Lama">Lama</option>
                                                </select>
                                            </motion.div>
                                        </motion.div>

                                        {/* Filter Actions */}
                                        <motion.div
                                            className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-3 border-t border-gray-200 dark:border-gray-700"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: 0.3 }}
                                        >
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                {Object.values(filters).filter(
                                                    (value) =>
                                                        value !== "" &&
                                                        value !==
                                                            new Date()
                                                                .toISOString()
                                                                .split("T")[0]
                                                ).length > 0
                                                    ? `${Object.values(filters).filter(
                                                          (value) =>
                                                              value !== "" &&
                                                              value !==
                                                                  new Date()
                                                                      .toISOString()
                                                                      .split("T")[0]
                                                      ).length} filter aktif`
                                                    : "Tidak ada filter aktif"}
                                            </div>
                                            <div className="flex gap-2">
                                                <motion.button
                                                    onClick={() => {
                                                        setFilters({
                                                            date: new Date()
                                                                .toISOString()
                                                                .split("T")[0],
                                                            kd_poli: "",
                                                            kd_dokter: "",
                                                            search: "",
                                                            status: "",
                                                            status_poli: "",
                                                        });
                                                    }}
                                                    className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Reset Filter
                                                </motion.button>
                                                <motion.button
                                                    onClick={() => setIsFilterExpanded(false)}
                                                    className="px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md transition-colors"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Tutup Filter
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    <div className="overflow-x-auto">
                        {isLoading && (
                            <div className="flex items-center justify-center py-10">
                                <svg
                                    className="animate-spin h-6 w-6 text-blue-500 mr-2"
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
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    Memuat datatable registrasi...
                                </span>
                            </div>
                        )}

                        {!isLoading &&
                            (registrationData?.data?.length > 0 ? (
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-3 py-2 text-left text-xs lg:text-sm font-semibold text-gray-700 dark:text-gray-200">
                                                No Reg
                                            </th>
                                            <th className="px-3 py-2 text-left text-xs lg:text-sm font-semibold text-gray-700 dark:text-gray-200">
                                                No Rawat
                                            </th>
                                            <th className="px-3 py-2 text-left text-xs lg:text-sm font-semibold text-gray-700 dark:text-gray-200">
                                                Pasien
                                            </th>
                                            <th className="px-3 py-2 text-left text-xs lg:text-sm font-semibold text-gray-700 dark:text-gray-200">
                                                RM
                                            </th>
                                            <th className="px-3 py-2 text-left text-xs lg:text-sm font-semibold text-gray-700 dark:text-gray-200">
                                                Poliklinik
                                            </th>
                                            <th className="px-3 py-2 text-left text-xs lg:text-sm font-semibold text-gray-700 dark:text-gray-200">
                                                Dokter
                                            </th>
                                            <th className="px-3 py-2 text-left text-xs lg:text-sm font-semibold text-gray-700 dark:text-gray-200">
                                                Penanggung
                                            </th>
                                            <th className="px-3 py-2 text-left text-xs lg:text-sm font-semibold text-gray-700 dark:text-gray-200">
                                                Status
                                            </th>
                                            <th className="px-3 py-2 text-left text-xs lg:text-sm font-semibold text-gray-700 dark:text-gray-200">
                                                Status Poli
                                            </th>
                                            <th className="px-3 py-2 text-left text-xs lg:text-sm font-semibold text-gray-700 dark:text-gray-200">
                                                Jam
                                            </th>
                                            <th className="px-3 py-2 text-right text-xs lg:text-sm font-semibold text-gray-700 dark:text-gray-200">
                                                Biaya
                                            </th>
                                            <th className="px-3 py-2 text-center text-xs lg:text-sm font-semibold text-gray-700 dark:text-gray-200">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                                        {registrationData.data.map((reg) => (
                                            <tr
                                                key={reg.no_rawat}
                                                className="hover:bg-gray-50 dark:hover:bg-gray-700"
                                            >
                                                <td className="px-3 py-2 text-xs lg:text-sm text-gray-700 dark:text-gray-300">
                                                    {reg.no_reg}
                                                </td>
                                                <td className="px-3 py-2 text-xs lg:text-sm text-gray-700 dark:text-gray-300">
                                                    <button
                                                        type="button"
                                                        title="Buka halaman Rawat Jalan / Lanjutan dan panggil antrean otomatis"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            // Otomatis panggil antrean (status=1/Hadir) ke Mobile JKN, lalu buka halaman Rawat Jalan
                                                            handleCallAntreanAndOpenRawatJalan(reg);
                                                        }}
                                                        className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                                                    >
                                                        {reg.no_rawat}
                                                    </button>
                                                </td>
                                                <td className="px-3 py-2 text-xs lg:text-sm text-gray-700 dark:text-gray-300">
                                                    {reg.pasien?.nm_pasien}
                                                </td>
                                                <td className="px-3 py-2 text-xs lg:text-sm text-gray-700 dark:text-gray-300">
                                                    {reg.no_rkm_medis}
                                                </td>
                                                <td className="px-3 py-2 text-xs lg:text-sm text-gray-700 dark:text-gray-300">
                                                    {reg.poliklinik?.nm_poli}
                                                </td>
                                                <td className="px-3 py-2 text-xs lg:text-sm text-gray-700 dark:text-gray-300">
                                                    {reg.dokter?.nm_dokter}
                                                </td>
                                                <td className="px-3 py-2 text-xs lg:text-sm text-gray-700 dark:text-gray-300">
                                                    {reg.penjab?.png_jawab}
                                                </td>
                                                <td className="px-3 py-2 text-xs lg:text-sm">
                                                    <span
                                                        className={
                                                            "px-2 py-1 rounded-full text-xs " +
                                                            (reg.stts ===
                                                            "Belum"
                                                                ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                                                                : reg.stts ===
                                                                  "Batal"
                                                                ? "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
                                                                : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300")
                                                        }
                                                    >
                                                        {reg.stts}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2 text-xs lg:text-sm">
                                                    <span
                                                        className={
                                                            "px-2 py-1 rounded-full text-xs " +
                                                            (reg.status_poli ===
                                                            "Baru"
                                                                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                                                                : "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300")
                                                        }
                                                    >
                                                        {reg.status_poli}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2 text-xs lg:text-sm text-gray-700 dark:text-gray-300">
                                                    {reg.jam_reg?.slice(0, 5)}
                                                </td>
                                                <td className="px-3 py-2 text-right text-xs lg:text-sm text-gray-700 dark:text-gray-300">
                                                    Rp{" "}
                                                    {(
                                                        reg.biaya_reg ?? 0
                                                    ).toLocaleString("id-ID")}
                                                </td>
                                                <td className="px-3 py-2 text-center">
                                                    <div className="relative action-dropdown">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setOpenDropdown(
                                                                    openDropdown === reg.no_rawat
                                                                        ? null
                                                                        : reg.no_rawat
                                                                );
                                                            }}
                                                            className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                                                            title="Aksi"
                                                        >
                                                            <svg
                                                                className="w-5 h-5"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                                                />
                                                            </svg>
                                                        </button>
                                                        {openDropdown === reg.no_rawat && (
                                                            <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                                                                <div className="py-1">
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            openDetailModal(reg);
                                                                            setOpenDropdown(null);
                                                                        }}
                                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                                                                    >
                                                                        <svg
                                                                            className="w-4 h-4"
                                                                            fill="none"
                                                                            stroke="currentColor"
                                                                            viewBox="0 0 24 24"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={2}
                                                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                            />
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={2}
                                                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                                            />
                                                                        </svg>
                                                                        Detail
                                                                    </button>
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            openPrintMenu(reg);
                                                                        }}
                                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                                                                    >
                                                                        <svg
                                                                            className="w-4 h-4"
                                                                            fill="none"
                                                                            stroke="currentColor"
                                                                            viewBox="0 0 24 24"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={2}
                                                                                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                                                                            />
                                                                        </svg>
                                                                        Cetak
                                                                    </button>
                                                                    {reg.stts === "Belum" && (
                                                                        <button
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                handleCancelRegistration(reg);
                                                                                setOpenDropdown(null);
                                                                            }}
                                                                            className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                                                                        >
                                                                            <svg
                                                                                className="w-4 h-4"
                                                                                fill="none"
                                                                                stroke="currentColor"
                                                                                viewBox="0 0 24 24"
                                                                            >
                                                                                <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeWidth={2}
                                                                                    d="M6 18L18 6M6 6l12 12"
                                                                                />
                                                                            </svg>
                                                                            Batal
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="text-center py-10">
                                    <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400">
                                        Belum ada data registrasi
                                    </p>
                                </div>
                            ))}
                    </div>

                    {/* Pagination (datatable) */}
                    {!isLoading &&
                        registrationData?.data?.length > 0 &&
                        registrationData?.links && (
                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Menampilkan {registrationData.from || 0}{" "}
                                        sampai {registrationData.to || 0} dari{" "}
                                        {registrationData.total || 0} data
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() =>
                                                loadRegistrations(
                                                    registrationData.current_page -
                                                        1
                                                )
                                            }
                                            disabled={
                                                !registrationData.prev_page_url
                                            }
                                            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 19l-7-7 7-7"
                                                />
                                            </svg>
                                        </button>
                                        <div className="flex items-center space-x-1">
                                            {registrationData.links.map(
                                                (link, index) => {
                                                    if (
                                                        index === 0 ||
                                                        index ===
                                                            registrationData
                                                                .links.length -
                                                                1
                                                    )
                                                        return null;
                                                    const page = parseInt(
                                                        link.label
                                                    );
                                                    const isCurrentPage =
                                                        link.active;
                                                    return (
                                                        <button
                                                            key={index}
                                                            onClick={() =>
                                                                loadRegistrations(
                                                                    page
                                                                )
                                                            }
                                                            className={
                                                                "px-3 py-2 text-sm font-medium rounded-lg " +
                                                                (isCurrentPage
                                                                    ? "bg-blue-600 text-white"
                                                                    : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700")
                                                            }
                                                        >
                                                            {link.label}
                                                        </button>
                                                    );
                                                }
                                            )}
                                        </div>
                                        <button
                                            onClick={() =>
                                                loadRegistrations(
                                                    registrationData.current_page +
                                                        1
                                                )
                                            }
                                            disabled={
                                                !registrationData.next_page_url
                                            }
                                            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                </div>
            </motion.div>

            {/* Registration Modal */}
            <AnimatePresence>
                {isModalOpen && selectedPatient && (
                    <motion.div
                        className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-[9998] p-4 overflow-y-auto"
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{
                            duration: 0.4,
                            ease: "easeOut",
                        }}
                        onClick={closeModal}
                    >
                        <motion.div
                            className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-2xl border border-white/30 dark:border-gray-700/50 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                            initial={{ scale: 0.7, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.7, opacity: 0, y: 50 }}
                            transition={{
                                duration: 0.4,
                                type: "spring",
                                stiffness: 100,
                                damping: 15,
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-4 lg:p-6">
                                <motion.div
                                    className="flex justify-between items-center mb-4 lg:mb-6"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                >
                                    <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white pr-4">
                                        Registrasi Periksa -{" "}
                                        {selectedPatient?.nm_pasien}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <motion.button
                                            onClick={() =>
                                                openEditModal(selectedPatient)
                                            }
                                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 text-xs rounded-md flex items-center gap-1 transition-colors shadow-sm"
                                            whileHover={{ scale: 1.05, y: -1 }}
                                            whileTap={{ scale: 0.95 }}
                                            initial={{
                                                opacity: 0,
                                                scale: 0.95,
                                            }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <svg
                                                className="w-3.5 h-3.5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M11 5h2m-6 6h6m-3 6h6M7 7l10 10"
                                                />
                                            </svg>
                                            Edit Data Pasien
                                        </motion.button>
                                        <motion.button
                                            onClick={closeModal}
                                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0"
                                            whileHover={{
                                                scale: 1.1,
                                                rotate: 90,
                                            }}
                                            whileTap={{ scale: 0.9 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </motion.button>
                                    </div>
                                </motion.div>



                                <motion.form
                                    onSubmit={handleSubmitRegister}
                                    className="space-y-3 lg:space-y-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.2 }}
                                >
                                    <motion.div
                                        className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: 0.3,
                                        }}
                                    >
                                        {/* Dokter */}
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: 0.4,
                                            }}
                                        >
                                            <label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Dokter *
                                            </label>
                                            <select
                                                name="kd_dokter"
                                                value={formData.kd_dokter}
                                                onChange={handleFormChange}
                                                required
                                                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                            >
                                                <option value="">
                                                    Pilih Dokter
                                                </option>
                                                {dokters?.map((dokter) => (
                                                    <option
                                                        key={dokter.kd_dokter}
                                                        value={dokter.kd_dokter}
                                                    >
                                                        {dokter.nm_dokter}
                                                    </option>
                                                ))}
                                            </select>
                                        </motion.div>

                                        {/* Poliklinik */}
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: 0.5,
                                            }}
                                        >
                                            <label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Poliklinik *
                                            </label>
                                            <select
                                                name="kd_poli"
                                                value={formData.kd_poli}
                                                onChange={handleFormChange}
                                                required
                                                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                            >
                                                <option value="">
                                                    Pilih Poliklinik
                                                </option>
                                                {polikliniks?.map((poli) => (
                                                    <option
                                                        key={poli.kd_poli}
                                                        value={poli.kd_poli}
                                                    >
                                                        {poli.nm_poli}
                                                    </option>
                                                ))}
                                            </select>
                                        </motion.div>

                                        {/* Penanggung Jawab */}
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: 0.6,
                                            }}
                                        >
                                            <label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Penanggung Jawab *</label>
                                            <div className="flex items-center gap-2">
                                                <select
                                                    name="kd_pj"
                                                    value={formData.kd_pj}
                                                    onChange={handleFormChange}
                                                    required
                                                    className="flex-1 w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                >
                                                    <option value="">
                                                        Pilih Penanggung Jawab
                                                    </option>
                                                    {penjabsList?.map((penjab) => (
                                                        <option
                                                            key={penjab.kd_pj}
                                                            value={penjab.kd_pj}
                                                        >
                                                            {penjab.png_jawab}
                                                        </option>
                                                    ))}
                                                </select>
                                                <button
                                                    type="button"
                                                    onClick={openPenjabCreate}
                                                    className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-black text-white hover:bg-gray-800"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </motion.div>
                                    </motion.div>

                                    {/* Status Poli dan Biaya Registrasi */}
                                    {formData.kd_poli && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Status Poli
                                                </label>
                                                <div
                                                    className={`px-3 py-2 rounded-lg border ${
                                                        poliStatus.status_poli ===
                                                        "Lama"
                                                            ? "bg-orange-50 border-orange-200 text-orange-800 dark:bg-orange-900/20 dark:border-orange-700 dark:text-orange-300"
                                                            : "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-700 dark:text-green-300"
                                                    }`}
                                                >
                                                    {poliStatus.status_poli}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Biaya Registrasi
                                                </label>
                                                <div className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">
                                                    Rp{" "}
                                                    {poliStatus.biaya_reg?.toLocaleString(
                                                        "id-ID"
                                                    ) || "0"}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Nama Penanggung Jawab */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Nama Penanggung Jawab *
                                        </label>
                                        <input
                                            type="text"
                                            name="p_jawab"
                                            value={formData.p_jawab}
                                            onChange={handleFormChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>

                                    {/* Alamat Penanggung Jawab */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Alamat Penanggung Jawab *
                                        </label>
                                        <textarea
                                            name="almt_pj"
                                            value={formData.almt_pj}
                                            onChange={handleFormChange}
                                            required
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>

                                    {/* Hubungan Penanggung Jawab */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Hubungan *
                                        </label>
                                        <select
                                            name="hubunganpj"
                                            value={formData.hubunganpj}
                                            onChange={handleFormChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="DIRI SENDIRI">
                                                Diri Sendiri
                                            </option>
                                            <option value="AYAH">Ayah</option>
                                            <option value="IBU">Ibu</option>
                                            <option value="ISTRI">Istri</option>
                                            <option value="SUAMI">Suami</option>
                                            <option value="SAUDARA">
                                                Saudara
                                            </option>
                                            <option value="ANAK">Anak</option>
                                            <option value="LAIN-LAIN">
                                                Lain-lain
                                            </option>
                                        </select>
                                    </div>

                                    <motion.div
                                        className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: 0.8,
                                        }}
                                    >
                                        <motion.button
                                            type="button"
                                            onClick={closeModal}
                                            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Batal
                                        </motion.button>
                                        <motion.button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                            whileHover={{
                                                scale: isSubmitting ? 1 : 1.02,
                                            }}
                                            whileTap={{
                                                scale: isSubmitting ? 1 : 0.98,
                                            }}
                                        >
                                            {isSubmitting && (
                                                <svg
                                                    className="animate-spin h-4 w-4 text-white"
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
                                            {isSubmitting
                                                ? "Menyimpan..."
                                                : "Simpan Registrasi"}
                                        </motion.button>
                                    </motion.div>
                                </motion.form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Detail Registration Modal */}
            <AnimatePresence>
                {isDetailModalOpen && selectedRegistration && (
                    <motion.div
                        className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-[9999] p-4 overflow-y-auto"
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{
                            duration: 0.4,
                            ease: "easeOut",
                        }}
                        onClick={closeDetailModal}
                    >
                        <motion.div
                            className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-2xl border border-white/30 dark:border-gray-700/50 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                            initial={{ scale: 0.7, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.7, opacity: 0, y: 50 }}
                            transition={{
                                duration: 0.4,
                                type: "spring",
                                stiffness: 100,
                                damping: 15,
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-4 lg:p-6">
                                {/* Header */}
                                <motion.div
                                    className="flex justify-between items-center mb-4 lg:mb-6"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                >
                                    <div>
                                        <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white">
                                            Detail Registrasi
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {selectedRegistration.no_rawat}
                                        </p>
                                    </div>
                                    <motion.button
                                        onClick={closeDetailModal}
                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0"
                                        whileHover={{ scale: 1.1, rotate: 90 }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </motion.button>
                                </motion.div>

                                {/* Content */}
                                <motion.div
                                    className="space-y-4 lg:space-y-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.2 }}
                                >
                                    {/* Patient Information */}
                                    <motion.div
                                        className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: 0.3,
                                        }}
                                    >
                                        <h4 className="text-sm lg:text-base font-semibold text-gray-900 dark:text-white mb-3">
                                            Informasi Pasien
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                                            <div>
                                                <label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Nama Pasien
                                                </label>
                                                <p className="text-sm lg:text-base text-gray-900 dark:text-white">
                                                    {selectedRegistration.pasien
                                                        ?.nm_pasien || "-"}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    No. Rekam Medis
                                                </label>
                                                <p className="text-sm lg:text-base text-gray-900 dark:text-white">
                                                    {
                                                        selectedRegistration.no_rkm_medis
                                                    }
                                                </p>
                                            </div>
                                            <div>
                                                <label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Jenis Kelamin
                                                </label>
                                                <p className="text-sm lg:text-base text-gray-900 dark:text-white">
                                                    {selectedRegistration.pasien
                                                        ?.jk === "L"
                                                        ? "Laki-laki"
                                                        : "Perempuan"}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Umur
                                                </label>
                                                <p className="text-sm lg:text-base text-gray-900 dark:text-white">
                                                    {selectedRegistration.pasien
                                                        ?.umur || "-"}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Registration Information */}
                                    <motion.div
                                        className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: 0.4,
                                        }}
                                    >
                                        <h4 className="text-sm lg:text-base font-semibold text-gray-900 dark:text-white mb-3">
                                            Informasi Registrasi
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                                            <div>
                                                <label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    No. Registrasi
                                                </label>
                                                <p className="text-sm lg:text-base text-gray-900 dark:text-white">
                                                    {
                                                        selectedRegistration.no_reg
                                                    }
                                                </p>
                                            </div>
                                            <div>
                                                <label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Tanggal Registrasi
                                                </label>
                                                <p className="text-sm lg:text-base text-gray-900 dark:text-white">
                                                    {
                                                        selectedRegistration.tgl_registrasi
                                                    }
                                                </p>
                                            </div>
                                            <div>
                                                <label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Jam Registrasi
                                                </label>
                                                <p className="text-sm lg:text-base text-gray-900 dark:text-white">
                                                    {selectedRegistration.jam_reg?.slice(
                                                        0,
                                                        5
                                                    ) || "-"}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Status
                                                </label>
                                                <span
                                                    className={`inline-flex px-2 py-1 text-xs rounded-full ${
                                                        selectedRegistration.stts ===
                                                        "Belum"
                                                            ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                                                            : selectedRegistration.stts ===
                                                              "Batal"
                                                            ? "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
                                                            : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                                                    }`}
                                                >
                                                    {selectedRegistration.stts}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Medical Information */}
                                    <motion.div
                                        className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: 0.5,
                                        }}
                                    >
                                        <h4 className="text-sm lg:text-base font-semibold text-gray-900 dark:text-white mb-3">
                                            Informasi Medis
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                                            <div>
                                                <label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Poliklinik
                                                </label>
                                                <p className="text-sm lg:text-base text-gray-900 dark:text-white">
                                                    {selectedRegistration
                                                        .poliklinik?.nm_poli ||
                                                        "-"}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Dokter
                                                </label>
                                                <p className="text-sm lg:text-base text-gray-900 dark:text-white">
                                                    {selectedRegistration.dokter
                                                        ?.nm_dokter || "-"}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Status Poli
                                                </label>
                                                <span
                                                    className={`inline-flex px-2 py-1 text-xs rounded-full ${
                                                        selectedRegistration.status_poli ===
                                                        "Baru"
                                                            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                                                            : "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300"
                                                    }`}
                                                >
                                                    {
                                                        selectedRegistration.status_poli
                                                    }
                                                </span>
                                            </div>
                                            <div>
                                                <label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Biaya Registrasi
                                                </label>
                                                <p className="text-sm lg:text-base font-semibold text-gray-900 dark:text-white">
                                                    Rp{" "}
                                                    {selectedRegistration.biaya_reg?.toLocaleString(
                                                        "id-ID"
                                                    ) || "0"}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Payment Information */}
                                    <motion.div
                                        className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: 0.6,
                                        }}
                                    >
                                        <h4 className="text-sm lg:text-base font-semibold text-gray-900 dark:text-white mb-3">
                                            Informasi Pembayaran
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                                            <div>
                                                <label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Penanggung Jawab
                                                </label>
                                                <p className="text-sm lg:text-base text-gray-900 dark:text-white">
                                                    {selectedRegistration.penjab
                                                        ?.png_jawab || "-"}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Nama Penanggung Jawab
                                                </label>
                                                <p className="text-sm lg:text-base text-gray-900 dark:text-white">
                                                    {selectedRegistration.p_jawab ||
                                                        "-"}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Hubungan
                                                </label>
                                                <p className="text-sm lg:text-base text-gray-900 dark:text-white">
                                                    {selectedRegistration.hubunganpj ||
                                                        "-"}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Alamat Penanggung Jawab
                                                </label>
                                                <p className="text-sm lg:text-base text-gray-900 dark:text-white">
                                                    {selectedRegistration.almt_pj ||
                                                        "-"}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Action Buttons */}
                                    <motion.div
                                        className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: 0.7,
                                        }}
                                    >
                                        {selectedRegistration.stts ===
                                            "Belum" && (
                                            <motion.button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleCancelRegistration(
                                                        selectedRegistration
                                                    );
                                                    closeDetailModal();
                                                }}
                                                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                Batalkan Registrasi
                                            </motion.button>
                                        )}
                                        <motion.button
                                            onClick={closeDetailModal}
                                            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Tutup
                                        </motion.button>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* BPJS Response Popup (tampil saat status respon selain 200 atau error) */}
            <AnimatePresence>
                {isBpjsPopupOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-[10000] p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={closeBpjsPopup}
                    >
                        <motion.div
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-3xl w-full overflow-hidden"
                            initial={{ scale: 0.95, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: 20, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-4 lg:p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                                        <div>
                                            <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white">
                                                Respon BPJS (Mobile JKN)
                                            </h3>
                                            {/* Menghapus tampilan method dan endpoint sesuai permintaan: tidak menampilkan "POST /api/mobilejkn/antrean/add" */}
                                        </div>
                                    </div>
                                    <button
                                        onClick={closeBpjsPopup}
                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                        title="Tutup"
                                    >
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </div>

                                <div className="mt-4 space-y-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                            Status:
                                        </span>
                                        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                                            {bpjsPopup.status ?? "N/A"}
                                        </span>
                                    </div>
                                    {bpjsPopup.message && (
                                        <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-3">
                                            <div className="text-xs text-red-700 dark:text-red-300">
                                                Pesan
                                            </div>
                                            <div className="mt-1 text-sm text-red-800 dark:text-red-200">
                                                {bpjsPopup.message}
                                            </div>
                                        </div>
                                    )}

                                    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30">
                                        <div className="flex items-center justify-between px-3 py-2">
                                            <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                Detail Respon
                                            </div>
                                            <button
                                                onClick={async () => {
                                                    try {
                                                        await navigator.clipboard.writeText(
                                                            bpjsPopup.raw ||
                                                                JSON.stringify(
                                                                    bpjsPopup.data ??
                                                                        {},
                                                                    null,
                                                                    2
                                                                )
                                                        );
                                                    } catch (_) {}
                                                }}
                                                className="text-xs rounded-md border border-gray-300 bg-white px-2 py-1 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                            >
                                                Salin
                                            </button>
                                        </div>
                                        <pre className="max-h-64 overflow-auto whitespace-pre-wrap break-all text-xs leading-relaxed px-3 pb-3 text-gray-800 dark:text-gray-100">
                                            {bpjsPopup.raw ||
                                                JSON.stringify(
                                                    bpjsPopup.data ?? {},
                                                    null,
                                                    2
                                                )}
                                        </pre>
                                    </div>

                                    {/* Penutup kontainer detail (space-y-3) yang sebelumnya belum tertutup */}
                                </div>

                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={closeBpjsPopup}
                                        className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                    >
                                        Tutup
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Patient Create Modal */}
            <PatientCreateModal
                isOpen={isPatientModalOpen}
                onClose={closePatientModal}
                onSuccess={handlePatientSuccess}
            />

            {/* Patient Edit Modal */}
            <PatientEditModal
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                patient={editPatient || selectedPatient}
                onSuccess={handleEditSuccess}
            />

            {/* Print Menu Popup */}
            <AnimatePresence>
                {isPrintMenuOpen && selectedRegForPrint && (
                    <motion.div
                        className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-[9999] p-4"
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{
                            duration: 0.3,
                            ease: "easeOut",
                        }}
                        onClick={closePrintMenu}
                    >
                        <motion.div
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-md w-full"
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{
                                duration: 0.3,
                                type: "spring",
                                stiffness: 200,
                                damping: 20,
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Menu Cetak
                                    </h3>
                                    <button
                                        onClick={closePrintMenu}
                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    No. Rawat: {selectedRegForPrint.no_rawat}
                                </p>
                            </div>

                            {/* Menu Items */}
                            <div className="p-4">
                                <div className="space-y-2">
                                    {/* Cetak Registrasi */}
                                    <motion.button
                                        onClick={() => handlePrintRegistration(selectedRegForPrint)}
                                        className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors flex items-center gap-3"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                            <svg
                                                className="w-5 h-5 text-blue-600 dark:text-blue-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium">Cetak Registrasi</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                Cetak formulir registrasi pasien
                                            </div>
                                        </div>
                                    </motion.button>

                                    {/* Cetak Kartu Berobat - Placeholder untuk menu cetak lainnya */}
                                    <motion.button
                                        onClick={() => {
                                            // TODO: Implement cetak kartu berobat
                                            alert('Fitur cetak kartu berobat akan segera tersedia');
                                        }}
                                        className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 rounded-lg transition-colors flex items-center gap-3"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                            <svg
                                                className="w-5 h-5 text-green-600 dark:text-green-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                                                />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium">Cetak Kartu Berobat</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                Cetak kartu berobat pasien
                                            </div>
                                        </div>
                                    </motion.button>

                                    {/* Cetak Rincian Biaya - Placeholder untuk menu cetak lainnya */}
                                    <motion.button
                                        onClick={() => {
                                            // TODO: Implement cetak rincian biaya
                                            alert('Fitur cetak rincian biaya akan segera tersedia');
                                        }}
                                        className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 rounded-lg transition-colors flex items-center gap-3"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                                            <svg
                                                className="w-5 h-5 text-purple-600 dark:text-purple-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium">Cetak Rincian Biaya</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                Cetak rincian biaya registrasi
                                            </div>
                                        </div>
                                    </motion.button>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={closePrintMenu}
                                    className="w-full px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
                                >
                                    Tutup
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Quick Create Penjab Modal */}
            <PenjabQuickCreateModal
                isOpen={isPenjabCreateOpen}
                onClose={closePenjabCreate}
                onCreated={(newItem) => {
                    setPenjabsList((prev) => {
                        const exists = prev.some((p) => String(p.kd_pj) === String(newItem.kd_pj));
                        if (exists) return prev;
                        return [...prev, newItem];
                    });
                    setFormData((prev) => ({ ...prev, kd_pj: newItem.kd_pj }));
                }}
            />
        </LanjutanRegistrasiLayout>
    );
}
