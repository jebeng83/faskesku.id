import React, { useState, useEffect, useRef } from "react";
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
    ChevronDownIcon,
    ChevronRightIcon,
    XMarkIcon,
    MapPinIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import PatientCreateModal from "@/Components/PatientCreateModal";
import PatientEditModal from "@/Components/PatientEditModal";
import PenjabQuickCreateModal from "@/Components/PenjabQuickCreateModal";
import { todayDateString, nowDateTimeString, getAppTimeZone } from "@/tools/datetime";

export default function Registration({
    _auth,
    dokters,
    polikliniks,
    penjabs,
    registrations,
    searchQuery,
}) {
    const [searchTerm, setSearchTerm] = useState(searchQuery || "");
    const [alamatTerm, setAlamatTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedRegistration, setSelectedRegistration] = useState(null);
    const [selectedRegForQueue, setSelectedRegForQueue] = useState(null);
    const [queueCurrent, setQueueCurrent] = useState(null);
    
    const [queueLastCalledNumber, setQueueLastCalledNumber] = useState(null);
    const [queueStatusCode, setQueueStatusCode] = useState(null);
    const [queueTodayList, setQueueTodayList] = useState([]);
    const [selectedLoket, setSelectedLoket] = useState(1);
    const manualSearchRef = useRef(false);
    const [usePatientAddress, setUsePatientAddress] = useState(false);

    useEffect(() => {
        if (usePatientAddress && selectedPatient) {
            const addr = [
                selectedPatient?.alamat,
                selectedPatient?.kelurahan?.nm_kel,
                selectedPatient?.kecamatan?.nm_kec,
                selectedPatient?.kabupaten?.nm_kab,
            ]
                .filter(Boolean)
                .join(', ');
            setFormData((prev) => ({
                ...prev,
                almt_pj: addr || prev.almt_pj,
            }));
        }
    }, [usePatientAddress, selectedPatient]);

    useEffect(() => {
        try {
            const v = parseInt(String(localStorage.getItem("selectedLoket") || ""), 10);
            if ([1,2,3,4].includes(v)) setSelectedLoket(v);
        } catch {}
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem("selectedLoket", String(selectedLoket));
        } catch {}
    }, [selectedLoket]);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editPatient, setEditPatient] = useState(null);
    const [isSkriningVisualOpen, setIsSkriningVisualOpen] = useState(false);
    const [skriningVisualRecords, setSkriningVisualRecords] = useState([]);
    const [srkStatus, setSrkStatus] = useState({ status: "UNKNOWN", message: "" });
    const [srkLoading, setSrkLoading] = useState(false);
    const [resikoSelections, setResikoSelections] = useState([]);
    const [isIdentityCollapsed, setIsIdentityCollapsed] = useState(false);
    const resikoOptions = [
        "Tidak Ada",
        "Alat Bantu Jalan",
        "Gangguan Pola Jalan",
        "Ada Penutup Mata",
    ];
    const formatBirthDate = (value) => {
        if (!value) return "-";
        const s = String(value);
        const m = s.match(/^(\d{4}-\d{2}-\d{2})/);
        if (m) return m[1];
        try {
            return new Date(s).toLocaleDateString("en-CA");
        } catch (_) {
            return s;
        }
    };
    const formatSkriningTanggal = (value) => {
        if (!value) return "-";
        const s = String(value);
        const m = s.match(/^(\d{4}-\d{2}-\d{2})/);
        if (m) return m[1];
        try {
            const tz = getAppTimeZone();
            return new Date(s).toLocaleDateString("en-CA", { timeZone: tz });
        } catch (_) {
            const p = s.split("T")[0];
            return p || s;
        }
    };
    const hasilBadgeClasses = (v) => {
        if (v === "Merah") return "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
        if (v === "Oranye") return "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300";
        if (v === "Kuning") return "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
        if (v === "Hijau") return "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
        return "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    };
    const srkBadgeClasses = (s) => {
        if (s === "SUDAH_SRK") return "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
        if (s === "BELUM_SRK") return "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
        return "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    };
    const keputusanBadgeClasses = (v) => {
        if (v === "UGD") return "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
        if (v === "Prioritas") return "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300";
        if (v === "Sesuai Antrian") return "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
        return "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    };
    const skriningInfo = {
        Merah: [
            "Tidak Sadar/Pingsan",
            "Kesulitan/Tdk Bernafas",
            "Nadi/Jantung tidak berdetak",
            "Kejang Lama/Berulang",
        ],
        Oranye: [
            "Nyeri Hebat",
            "Nyeri Dada",
        ],
        Kuning: [
            "Pucat",
            "lemas",
            "Sempoyongan",
        ],
        Hijau: [
            "Kondisi Stabil",
        ],
    };
    const infoAccentBg = (v) => {
        if (v === "Merah") return "from-red-500 to-rose-600";
        if (v === "Oranye") return "from-amber-500 to-orange-600";
        if (v === "Kuning") return "from-yellow-400 to-amber-500";
        if (v === "Hijau") return "from-green-500 to-emerald-600";
        return "from-gray-500 to-gray-700";
    };
    const dotBg = (v) => {
        if (v === "Merah") return "bg-red-500";
        if (v === "Oranye") return "bg-amber-500";
        if (v === "Kuning") return "bg-yellow-500";
        if (v === "Hijau") return "bg-green-500";
        return "bg-gray-500";
    };
    const [skriningVisualForm, setSkriningVisualForm] = useState({
        no_rkm_medis: "",
        tanggal: todayDateString(),
        jam: nowDateTimeString().split(" ")[1].substring(0, 5),
        hasil_skrining: "Hijau",
        skrining_resiko_jatuh: "",
        skor_resiko_jatuh: "",
        keputusan: "Sesuai Antrian",
    });
    const [registrationData, setRegistrationData] = useState(registrations);
    
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
        alamat: "",
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
        tgl_registrasi: todayDateString(),
        jam_reg: nowDateTimeString().split(" ")[1].substring(0, 5),
    });

    const [poliStatus, setPoliStatus] = useState({
        status_poli: "",
        biaya_reg: 0,
        has_registered: false,
    });

    // Daftar penjamin lokal (agar bisa di-update setelah tambah penjab tanpa reload penuh)
    const [penjabsList, setPenjabsList] = useState(penjabs || []);
    useEffect(() => {
        const arr = Array.isArray(penjabs) ? penjabs : [];
        const hasStatus = arr.some((p) => p && typeof p === "object" && ("status" in p));
        const filtered = hasStatus ? arr.filter((p) => String(p.status) === "1") : arr;
        setPenjabsList(filtered);
    }, [penjabs]);

    useEffect(() => {
        const arr = Array.isArray(penjabs) ? penjabs : [];
        const hasStatus = arr.some((p) => p && typeof p === "object" && ("status" in p));
        if (!hasStatus) {
            (async () => {
                try {
                    const res = await httpGet('/api/penjab');
                    const d = res?.data || {};
                    const list = Array.isArray(d.data) ? d.data : (Array.isArray(d.list) ? d.list : (Array.isArray(d) ? d : []));
                    setPenjabsList(list);
                } catch (_) {}
            })();
        }
    }, []);

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

    const [poliOptions, setPoliOptions] = useState(Array.isArray(polikliniks) ? polikliniks : []);
    useEffect(() => {
        setPoliOptions(Array.isArray(polikliniks) ? polikliniks : []);
    }, [polikliniks]);
    useEffect(() => {
        if (!Array.isArray(poliOptions) || poliOptions.length === 0) {
            (async () => {
                try {
                    const res = await httpGet('/api/poliklinik?status=1&limit=200');
                    const d = res?.data || {};
                    const list = Array.isArray(d.list) ? d.list : (Array.isArray(d.data) ? d.data : (Array.isArray(d) ? d : []));
                    setPoliOptions(list);
                } catch (_) {}
            })();
        }
    }, []);

    const [doctorOptions, setDoctorOptions] = useState(Array.isArray(dokters) ? dokters : []);
    useEffect(() => {
        const arr = Array.isArray(dokters) ? dokters : [];
        const hasStatus = arr.some((d) => d && typeof d === "object" && ("status" in d));
        const filtered = hasStatus ? arr.filter((d) => String(d.status) === "1") : arr;
        setDoctorOptions(filtered);
    }, [dokters]);
    useEffect(() => {
        const arr = Array.isArray(dokters) ? dokters : [];
        const hasStatus = arr.some((d) => d && typeof d === "object" && ("status" in d));
        if (!hasStatus || !Array.isArray(arr) || arr.length === 0) {
            (async () => {
                try {
                    const res = await httpGet('/api/dokter');
                    const d = res?.data || {};
                    const list = Array.isArray(d.data) ? d.data : (Array.isArray(d.list) ? d.list : (Array.isArray(d) ? d : []));
                    setDoctorOptions(list);
                } catch (_) {}
            })();
        }
    }, []);

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

    const formatQueueLabel = (nomor, prefix) => {
        if (!nomor) return "-";
        const padded = String(nomor).padStart(3, "0");
        return prefix ? `${prefix}-${padded}` : padded;
    };

    const getApiBaseCandidates = () => {
        const c = [];
        try {
            const envUrl = import.meta?.env?.VITE_BACKEND_URL;
            if (envUrl) c.push(envUrl);
        } catch (_) {}
        c.push(window.location.origin);
        c.push("http://127.0.0.1:8000");
        c.push("http://localhost:8000");
        return c;
    };

    const httpGet = async (path) => {
        const bases = getApiBaseCandidates();
        let lastErr = null;
        for (const base of bases) {
            try {
                const url = new URL(path, base).href;
                const res = await axios.get(url, { headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" }, withCredentials: true });
                const ct = String(res?.headers?.['content-type'] || res?.headers?.['Content-Type'] || '');
                if (!ct.includes('application/json')) throw new Error('Non-JSON response');
                return res;
            } catch (e) {
                lastErr = e;
                const status = e?.response?.status;
                if (status && status !== 404) throw e;
            }
        }
        throw lastErr || new Error("API not reachable");
    };

    const httpPost = async (path, data) => {
        const bases = getApiBaseCandidates();
        let lastErr = null;
        for (const base of bases) {
            try {
                const url = new URL(path, base).href;
                const res = await axios.post(url, data, { headers: { Accept: "application/json" } });
                return res;
            } catch (e) {
                lastErr = e;
                const status = e?.response?.status;
                if (status && status !== 404) throw e;
            }
        }
        throw lastErr || new Error("API not reachable");
    };

    const fetchQueueCurrent = async () => {
        try {
            const res = await httpGet("/api/queue/today");
            const d = res?.data || {};
            const list = Array.isArray(d.data) ? d.data : [];
            setQueueTodayList(list);
            const firstNew = list.find((row) => String(row.status || "").toLowerCase() === "baru");
            const candidate = firstNew || (list.length ? list[0] : null);
            if (candidate) {
                const n = candidate.nomor ?? candidate.number ?? candidate.antrian;
                setQueueCurrent({ nomor: n, prefix: candidate.prefix || "" });
                const s = String(candidate.status || "").toLowerCase();
                setQueueStatusCode(s === "dipanggil" ? 1 : 0);
            } else {
                setQueueCurrent(null);
                setQueueStatusCode(null);
            }
        } catch (_) {
            setQueueCurrent(null);
            setQueueStatusCode(null);
        }
    };

    useEffect(() => {
        fetchQueueCurrent();
    }, []);

    const handleCallLoketQueue = async (repeat = false) => {
        if (!queueCurrent?.nomor && !queueLastCalledNumber) return;
        try {
            const targetNomor = repeat ? (queueLastCalledNumber ?? queueCurrent?.nomor) : queueCurrent.nomor;
            await httpPost("/api/queue/call", { nomor: targetNomor, loket: selectedLoket });
            try {
                const bc = new BroadcastChannel("queue-call");
                bc.postMessage({ nomor: targetNomor, loket: selectedLoket, prefix: queueCurrent?.prefix || "", repeat });
                bc.close();
            } catch (_) {}
            if (repeat) {
                // Ulang: panggil kembali nomor terakhir dipanggil tanpa mengubah panel
                // Panel tetap menampilkan kandidat berikutnya berstatus "baru"
                // Pertahankan queueStatusCode apa adanya (umumnya 0 untuk kandidat baru)
            } else {
                setQueueStatusCode(1);
                // Simpan nomor terakhir yang dipanggil
                setQueueLastCalledNumber(queueCurrent.nomor);
                const cur = parseInt(String(queueCurrent.nomor || "0"), 10);
                const updated = Array.isArray(queueTodayList) ? queueTodayList.map((row) => {
                    const rn = parseInt(String((row.nomor ?? row.number ?? row.antrian) || "0"), 10);
                    if (rn === cur) {
                        return { ...row, status: "dipanggil" };
                    }
                    return row;
                }) : [];
                setQueueTodayList(updated);
                const val = (row) => parseInt(String((row.nomor ?? row.number ?? row.antrian ?? "0")), 10);
                const nextCandidate = updated
                    .filter((r) => String(r.status || "").toLowerCase() === "baru")
                    .sort((a, b) => (val(a) - val(b)))[0] || null;
                if (nextCandidate) {
                    const nn = nextCandidate.nomor ?? nextCandidate.number ?? nextCandidate.antrian;
                    setQueueCurrent({ nomor: nn, prefix: nextCandidate.prefix || "" });
                    setQueueStatusCode(0);
                } else {
                    await fetchQueueCurrent();
                }
            }
        } catch (_) {
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
                    tanggalperiksa: todayDateString(getAppTimeZone()),
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
            } catch {
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

    

    const handleCheckIn = async (reg) => {
        try {
            if (!reg || !reg.no_rawat) return;
            const res = await axios.put('/api/reg-periksa-actions/update-keputusan', { no_rawat: reg.no_rawat, keputusan: 'CHECK-IN' }, {
                headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
                withCredentials: true,
            });
            if (res?.data?.success) {
                setRegistrationData((prev) => {
                    if (!prev || !prev.data) return prev;
                    const next = { ...prev };
                    next.data = prev.data.map((r) => r.no_rawat === reg.no_rawat ? { ...r, keputusan: 'CHECK-IN' } : r);
                    return next;
                });
                return;
            }
        } catch (e) {
            if (e?.response?.status === 405) {
                try {
                    const form = new FormData();
                    form.append('no_rawat', reg.no_rawat);
                    form.append('keputusan', 'CHECK-IN');
                    form.append('_method', 'PUT');
                    const spoofRes = await axios.post('/api/reg-periksa-actions/update-keputusan', form, {
                        headers: { 'Accept': 'application/json' },
                        withCredentials: true,
                    });
                    if (spoofRes?.data?.success) {
                        setRegistrationData((prev) => {
                            if (!prev || !prev.data) return prev;
                            const next = { ...prev };
                            next.data = prev.data.map((r) => r.no_rawat === reg.no_rawat ? { ...r, keputusan: 'CHECK-IN' } : r);
                            return next;
                        });
                        return;
                    }
                } catch (_) {}
            }
            alert(e?.response?.data?.message || 'Gagal melakukan check-in');
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
    const handleSearch = async (term, alamat = "") => {
        if (!term.trim() && !String(alamat || "").trim()) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);
        try {
            const response = await axios.get("/registration/search-patients", {
                params: { search: term, alamat },
            });
            const data = Array.isArray(response?.data?.data) ? response.data.data : [];
            const a = String(alamat || "").trim().toLowerCase();
            const filtered = a
                ? data.filter((p) => {
                      const addr = [
                          p?.alamat,
                          p?.alamatpj,
                          p?.kelurahanpj,
                          p?.kecamatanpj,
                          p?.kabupatenpj,
                          p?.propinsipj,
                      ]
                          .filter(Boolean)
                          .join(", ")
                          .toLowerCase();
                      return addr.includes(a);
                  })
                : data;
            setSearchResults(filtered);
        } catch (error) {
            console.error("Error searching patients:", error);
            alert("Gagal mencari data pasien");
        } finally {
            setIsSearching(false);
        }
    };

    // Handle search input change with debounce (search + alamat)
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (manualSearchRef.current) {
                manualSearchRef.current = false;
                return;
            }
            handleSearch(searchTerm, alamatTerm);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, alamatTerm]);

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
        if ((name === "kd_poli" || name === "kd_dokter" || name === "tgl_registrasi") && selectedPatient) {
            const vPoli = name === "kd_poli" ? value : formData.kd_poli;
            const vDokter = name === "kd_dokter" ? value : formData.kd_dokter;
            const vTanggal = name === "tgl_registrasi" ? value : formData.tgl_registrasi;
            if (vPoli && vDokter && vTanggal) {
                checkSrk(vPoli, vDokter, vTanggal);
            }
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

    const checkSrk = async (kdPoli, kdDokter, tanggal) => {
        try {
            if (!selectedPatient) return;
            const kdPoliSim = String(kdPoli || formData.kd_poli || 'INT');
            const kdDokterSim = String(kdDokter || formData.kd_dokter || '999999');
            const tanggalSim = String(tanggal || formData.tgl_registrasi || todayDateString());
            const p = {
                no_rkm_medis: selectedPatient.no_rkm_medis,
                kd_poli: kdPoliSim,
                kd_dokter: kdDokterSim,
                tanggalperiksa: tanggalSim,
                nomorkartu: String(selectedPatient?.no_peserta || ''),
                nik: String(selectedPatient?.no_ktp || ''),
                kodepoli: kdPoliSim,
                namapoli: 'Poli Internal',
                norm: String(selectedPatient?.no_rkm_medis || ''),
                kodedokter: 999999,
                namadokter: 'Dokter SRK Check',
                jampraktek: '00:01-00:02',
                nomorantrean: '000',
                angkaantrean: 0,
                keterangan: 'SRK check only',
                nohp: String(selectedPatient?.no_tlp || ''),
            };
            if (!p.no_rkm_medis) return;
            setSrkLoading(true);
            setSrkStatus({ status: "UNKNOWN", message: "" });
            try {
                await axios.get('/sanctum/csrf-cookie', { withCredentials: true, headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' } });
                await new Promise((resolve) => setTimeout(resolve, 300));
            } catch (_) {}
            const r = await axios.post("/api/mobilejkn/srk/check", p, { headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" }, withCredentials: true });
            let st = typeof r?.data?.status === 'string' && r.data.status ? String(r.data.status) : 'UNKNOWN';
            let msg = typeof r?.data?.message === 'string' ? r.data.message : '';
            if (st === 'UNKNOWN') {
                const meta = r?.data?.metadata || r?.data?.metaData || null;
                const code = meta && typeof meta.code === 'number' ? meta.code : null;
                const m = msg || (meta && typeof meta.message === 'string' ? meta.message : '');
                const indikasiBelum = m && /skrining kesehatan|skrining/i.test(m);
                if (indikasiBelum) {
                    st = 'BELUM_SRK';
                    msg = m;
                } else if (code !== null && code >= 200 && code < 300) {
                    st = 'SUDAH_SRK';
                    msg = m;
                }
            }
            if (st === 'UNKNOWN') {
                try {
                    const t = await axios.post("/api/mobilejkn/srk/check/test", p, { headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" } });
                    const metaT = t?.data?.metadata || t?.data?.metaData || null;
                    const codeT = metaT && typeof metaT.code === 'number' ? metaT.code : null;
                    const mT = typeof t?.data?.message === 'string' ? t.data.message : (metaT && typeof metaT.message === 'string' ? metaT.message : '');
                    let stT = typeof t?.data?.status === 'string' && t.data.status ? String(t.data.status) : 'UNKNOWN';
                    if (stT === 'UNKNOWN') {
                        const indikasiBelumT = mT && /skrining kesehatan|skrining/i.test(mT);
                        if (indikasiBelumT) stT = 'BELUM_SRK';
                        else if (codeT !== null && codeT >= 200 && codeT < 300) stT = 'SUDAH_SRK';
                    }
                    st = stT;
                    msg = mT || msg;
                } catch (_) {}
            }
            setSrkStatus({ status: st, message: msg });
        } catch (e) {
            const msg = String(e?.response?.data?.message || e?.message || "");
            setSrkStatus({ status: "UNKNOWN", message: msg });
        } finally {
            setSrkLoading(false);
        }
    };

    // Handle registration submission
    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (!selectedPatient || !selectedPatient.no_rkm_medis) {
                setIsSubmitting(false);
                alert('Silakan pilih pasien terlebih dahulu');
                return;
            }
            
            // Validasi frontend
            const requiredFields = ['kd_dokter','kd_poli','kd_pj','p_jawab','almt_pj','hubunganpj'];
            const missing = requiredFields.filter((k) => !formData[k] || String(formData[k]).trim() === '');
            if (missing.length) {
                setIsSubmitting(false);
                const missingLabels = {
                    kd_dokter: 'Dokter',
                    kd_poli: 'Poliklinik',
                    kd_pj: 'Cara Bayar',
                    p_jawab: 'Nama Penanggung Jawab',
                    almt_pj: 'Alamat Penanggung Jawab',
                    hubunganpj: 'Hubungan',
                };
                const missingList = missing.map(f => missingLabels[f] || f).join(', ');
                alert(`Lengkapi data registrasi: ${missingList}`);
                return;
            }
            
            // Pastikan URL benar. Gunakan fallback eksplisit dan hanya terima hasil Ziggy jika valid.
            let url = `/registration/${encodeURIComponent(selectedPatient.no_rkm_medis)}/register`;
            try {
                const ziggyUrl = route("registration.register-patient", selectedPatient.no_rkm_medis);
                if (typeof ziggyUrl === "string") {
                    const m = ziggyUrl.match(/\/registration\/(.+)\/register$/);
                    if (m && m[0]) {
                        url = m[0];
                    }
                }
            } catch (_) {}
            
            // Helper untuk mendapatkan token dari cookie
            const getCookieToken = () => {
                try {
                    const cookieStr = '; ' + document.cookie;
                    const xsrfPart = cookieStr.split('; XSRF-TOKEN=');
                    if (xsrfPart.length === 2) {
                        const token = decodeURIComponent(xsrfPart.pop().split(';').shift());
                        return token || '';
                    }
                } catch (e) {
                    console.warn('Error reading cookie:', e);
                }
                return '';
            };
            
            // Helper untuk mendapatkan token dari meta tag
            
            
            // PENTING: Biarkan axios membaca token dari cookie secara otomatis
            // Jangan set token secara manual di headers karena bisa berbeda dengan session
            // Axios sudah dikonfigurasi dengan xsrfCookieName dan xsrfHeaderName di bootstrap.js
            // Yang perlu kita lakukan adalah memastikan cookie ter-set dengan benar
            
            // Refresh CSRF cookie untuk memastikan token terbaru dari session
            try {
                await axios.get('/sanctum/csrf-cookie', { 
                    withCredentials: true,
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                    }
                });
                
                // Tunggu cukup lama untuk memastikan cookie benar-benar ter-set
                await new Promise(resolve => setTimeout(resolve, 800));
                
                // Verifikasi cookie ter-set
                const cookieToken = getCookieToken();
                
                if (!cookieToken || cookieToken.length <= 10) {
                    setIsSubmitting(false);
                    alert('Gagal mendapatkan CSRF token. Silakan refresh halaman dan coba lagi.');
                    return;
                }
            } catch {
                setIsSubmitting(false);
                alert('Gagal mendapatkan CSRF token. Silakan refresh halaman dan coba lagi.');
                return;
            }

            // Siapkan payload
            const payload = { ...formData };
            
            // Pastikan almt_pj tidak kosong (required by backend)
            if (!payload.almt_pj || String(payload.almt_pj).trim() === '') {
                payload.almt_pj = selectedPatient.alamat || 'Alamat tidak diketahui';
            }
            
            // Pastikan p_jawab tidak kosong (required by backend)
            if (!payload.p_jawab || String(payload.p_jawab).trim() === '') {
                payload.p_jawab = selectedPatient.namakeluarga || selectedPatient.nm_pasien || 'Pasien';
            }
            
            // Format jam_reg jika perlu
            if (typeof payload.jam_reg === "string" && /^\d{2}:\d{2}$/.test(payload.jam_reg)) {
                payload.jam_reg = `${payload.jam_reg}:00`;
            }

            let response;
            // PENTING: Jangan set token secara manual di headers
            // Biarkan axios membaca token dari cookie secara otomatis menggunakan xsrfCookieName dan xsrfHeaderName
            // Ini memastikan token yang dikirim sama dengan token di session
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json',
                    // JANGAN set X-CSRF-TOKEN atau X-XSRF-TOKEN di sini
                    // Biarkan axios membaca dari cookie secara otomatis
                },
                withCredentials: true, // Penting untuk mengirim cookie
                responseType: 'json',
                maxRedirects: 0,
                validateStatus: function (status) {
                    return status >= 200 && status < 600;
                },
            };

            const doPost = async () => {
                const finalUrl = url.startsWith('http') ? url : url.startsWith('/') ? url : `/${url}`;
                const cookieToken = getCookieToken();
                if (!cookieToken || cookieToken.length <= 10) {
                    throw new Error('CSRF token tidak ditemukan di cookie');
                }
                const res = await axios.post(finalUrl, payload, config);
                const contentType = res?.headers?.['content-type'] || res?.headers?.['Content-Type'] || '';
                const isHtml = contentType.includes('text/html') ||
                    (typeof res?.data === 'string' && (
                        res.data.trim().startsWith('<!DOCTYPE') ||
                        res.data.trim().startsWith('<html') ||
                        res.data.trim().startsWith('<HTML')
                    ));
                if (res?.status === 419) {
                    const error = new Error('CSRF token expired');
                    error.response = {
                        status: 419,
                        statusText: 'CSRF Token Expired',
                        data: res?.data,
                        headers: res?.headers,
                    };
                    throw error;
                }
                if (isHtml) {
                    const error = new Error('Server mengembalikan HTML bukan JSON. Kemungkinan route tidak ditemukan atau redirect.');
                    error.response = {
                        status: res?.status || 500,
                        statusText: 'HTML Response',
                        data: res?.data,
                        headers: res?.headers,
                    };
                    throw error;
                }
                if (typeof res?.data === 'string') {
                    try {
                        res.data = JSON.parse(res.data);
                    } catch {
                        const error = new Error('Response data tidak dapat di-parse sebagai JSON');
                        error.response = {
                            status: res?.status || 500,
                            statusText: 'Invalid JSON',
                            data: res?.data,
                        };
                        throw error;
                    }
                }
                return res;
            };

            response = await doPost();

            // Cek apakah response adalah HTML (bukan JSON) - ini biasanya berarti error atau redirect
            const contentType = response?.headers?.['content-type'] || '';
            const isHtmlResponse = typeof response?.data === 'string' && (
                response.data.trim().startsWith('<!DOCTYPE') ||
                response.data.trim().startsWith('<html') ||
                contentType.includes('text/html')
            );
            
            if (isHtmlResponse) {
                // Cek apakah ini halaman login redirect
                const isLoginPage = typeof response?.data === 'string' && (
                    response.data.includes('login') ||
                    response.data.includes('Login') ||
                    response.data.includes('authentication')
                );
                
                if (isLoginPage) {
                    alert('Session expired. Silakan login ulang.');
                    window.location.reload();
                    return;
                }
                
                // Cek apakah ini error page 404
                const is404Error = typeof response?.data === 'string' && (
                    response.data.includes('404') ||
                    response.data.includes('Not Found') ||
                    response.status === 404
                );
                
                if (is404Error) {
                    const errorMsg = `Route tidak ditemukan (404).\n\nURL: ${url}\nPasien: ${selectedPatient?.no_rkm_medis}\n\nPastikan route sudah benar dan pasien ada di database.`;
                    alert(errorMsg);
                    throw new Error('Route tidak ditemukan (404)');
                }
                
                // Cek apakah ini error page 500
                const is500Error = typeof response?.data === 'string' && (
                    response.data.includes('500') ||
                    response.data.includes('Server Error') ||
                    response.status === 500
                );
                
                if (is500Error) {
                    alert('Terjadi kesalahan pada server (500). Silakan cek log Laravel untuk detail.');
                    throw new Error('Server error (500)');
                }
                
                // Generic HTML response error
                const errorMsg = `Server mengembalikan HTML bukan JSON.\n\nKemungkinan:\n1. Route tidak ditemukan\n2. Middleware memblokir request\n3. CSRF token invalid\n\nURL: ${url}\nStatus: ${response?.status}\n\nSilakan cek log untuk detail.`;
                alert(errorMsg);
                throw new Error('Response adalah HTML, bukan JSON');
            }

            // Validasi response sebelum proses lebih lanjut
            if (!response || !response.data) {
                throw new Error('Response tidak valid dari server');
            }
            
            // Pastikan response.data adalah object (bukan string HTML)
            if (typeof response.data === 'string') {
                throw new Error('Response data adalah string, bukan object JSON');
            }

            if (response.data.success === true || response.data.success === 'true' || response.data.success === 1) {
                alert(response.data.message || 'Registrasi berhasil!');
                // Simpan tanggal registrasi yang baru dibuat untuk filter
                const newRegDate = response.data.data?.tgl_registrasi || formData.tgl_registrasi || todayDateString();
                
                // Setelah registrasi lokal berhasil, kirim antrean ke Mobile JKN hanya jika jenis bayar diizinkan (BPJ/PBI/NON)
                try {
                    if (!isJenisBayarAllowedForAntrean(formData.kd_pj)) {
                        // Jenis bayar selain BPJ/PBI: hanya simpan lokal, tidak kirim antrean dan tidak tampilkan popup
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
                            }
                        }
                    }
                } catch (err) {
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

                // Reset form dan modal terlebih dahulu
                setIsModalOpen(false);
                resetForm();
                
                // Set filter ke tanggal registrasi yang baru dibuat agar data baru langsung muncul
                // Reset filter lainnya agar data baru pasti terlihat
                const newFilters = {
                    ...filters,
                    date: newRegDate,
                    start_date: "",
                    end_date: "",
                    kd_poli: "",
                    kd_dokter: "",
                    search: "",
                    status: "",
                    status_poli: "",
                    per_page: filters.per_page || 50,
                };
                
                // Update state filter
                setFilters(newFilters);
                
                // Refresh registrations dengan filter baru dan reset ke halaman 1
                // Langsung pass filter baru agar tidak perlu menunggu state update
                // Tambahkan sedikit delay untuk memastikan state sudah ter-update
                setTimeout(() => {
                    loadRegistrations(1, newFilters);
                }, 100);
            } else {
                // Response tidak sukses
                const errorMsg = response.data.message || 'Registrasi gagal. Silakan coba lagi.';
                alert(errorMsg);
            }
        } catch (error) {
            // Handle validation errors dari backend
            if (error?.response?.status === 422) {
                const validationErrors = error?.response?.data?.errors || {};
                const errorMessages = Object.entries(validationErrors)
                    .map(([field, messages]) => {
                        const fieldLabels = {
                            kd_dokter: 'Dokter',
                            kd_poli: 'Poliklinik',
                            kd_pj: 'Cara Bayar',
                            p_jawab: 'Nama Penanggung Jawab',
                            almt_pj: 'Alamat Penanggung Jawab',
                            hubunganpj: 'Hubungan',
                            tgl_registrasi: 'Tanggal Registrasi',
                            jam_reg: 'Jam Registrasi',
                        };
                        const label = fieldLabels[field] || field;
                        const msg = Array.isArray(messages) ? messages.join(', ') : messages;
                        return `${label}: ${msg}`;
                    })
                    .join('\n');
                
                alert(`Validasi gagal:\n${errorMessages}`);
            } else if (error?.response?.status === 404) {
                alert('Endpoint tidak ditemukan. Pastikan URL benar.');
            } else if (error?.response?.status === 403) {
                alert('Anda tidak memiliki izin untuk melakukan aksi ini.');
            } else if (error?.response?.status === 419 || error?.message?.includes('Session expired')) {
                // Jika masih 419 setelah interceptor retry, berarti session benar-benar expired
                const errorMessage = error?.response?.data?.message || error?.message || 'Session expired. Silakan refresh halaman dan coba lagi.';
                alert(errorMessage);
                // Refresh halaman untuk mendapatkan session baru
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                return;
            } else if (error?.response?.status === 500) {
                alert('Terjadi kesalahan pada server. Silakan cek log untuk detail.');
            } else if (error?.response?.data?.message) {
                // Error message dari backend
                alert(error.response.data.message);
            } else if (error?.code === 'NETWORK_ERROR' || error?.message?.includes('Network Error')) {
                alert('Gagal terhubung ke server. Periksa koneksi internet Anda.');
            } else if (error?.message) {
                // Network atau error lainnya
                alert(`Gagal mendaftarkan pasien: ${error.message}`);
            } else {
                alert('Gagal mendaftarkan pasien. Silakan coba lagi atau hubungi administrator.');
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
            tgl_registrasi: todayDateString(),
            jam_reg: nowDateTimeString().split(" ")[1].substring(0, 5),
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

    const openSkriningVisualModal = async (patient) => {
        const p = patient || selectedPatient;
        setSkriningVisualForm((prev) => ({
            ...prev,
            no_rkm_medis: String(p?.no_rkm_medis || ""),
            tanggal: todayDateString(),
            jam: nowDateTimeString().split(" ")[1].substring(0, 5),
            hasil_skrining: "Hijau",
            skrining_resiko_jatuh: "",
            skor_resiko_jatuh: "",
            keputusan: "Sesuai Antrian",
        }));
        setResikoSelections([]);
        setIsSkriningVisualOpen(true);
        try {
            const url = route("skrining-visual.index", {}, false);
            const { data } = await axios.get(url, {
                params: { no_rkm_medis: p?.no_rkm_medis },
            });
            setSkriningVisualRecords(Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : []);
        } catch (_) {
            setSkriningVisualRecords([]);
        }
    };

    const closeSkriningVisualModal = () => {
        setIsSkriningVisualOpen(false);
    };

    const handleSkriningVisualChange = (e) => {
        const { name, value } = e.target;
        setSkriningVisualForm((prev) => ({ ...prev, [name]: value }));
    };

    const toggleResikoSelection = (opt) => {
        setResikoSelections((prev) => {
            let next = [];
            if (opt === "Tidak Ada") {
                next = prev.includes("Tidak Ada") ? [] : ["Tidak Ada"];
            } else {
                const exists = prev.includes(opt);
                const withoutNone = prev.filter((o) => o !== "Tidak Ada");
                next = exists ? withoutNone.filter((o) => o !== opt) : [...withoutNone, opt];
            }
            const calculateResikoJatuhScore = (selected) => {
                if (!Array.isArray(selected) || selected.length === 0) return "";
                if (selected.includes("Tidak Ada")) return "0";
                const weights = {
                    "Alat Bantu Jalan": 4,
                    "Gangguan Pola Jalan": 3,
                    "Ada Penutup Mata": 3,
                };
                let score = selected.reduce((sum, s) => sum + (weights[s] || 0), 0);
                if (score > 10) score = 10;
                return String(score);
            };
            setSkriningVisualForm((f) => ({
                ...f,
                skrining_resiko_jatuh: next.join(", "),
                skor_resiko_jatuh: calculateResikoJatuhScore(next),
            }));
            return next;
        });
    };

    const handleSubmitSkriningVisual = async (e) => {
        e.preventDefault();
        const payload = { ...skriningVisualForm };
        if (typeof payload.jam === "string" && /^\d{2}:\d{2}$/.test(payload.jam)) {
            payload.jam = `${payload.jam}:00`;
        }
        try {
            const existing = skriningVisualRecords.find(
                (r) => String(r.tanggal) === String(payload.tanggal)
            );
            if (existing) {
                const url = route(
                    "skrining-visual.update",
                    { no_rkm_medis: payload.no_rkm_medis, tanggal: payload.tanggal },
                    false
                );
                const { data } = await axios.put(url, payload);
                const updated = data?.data || data;
                setSkriningVisualRecords((prev) =>
                    prev.map((r) =>
                        String(r.no_rkm_medis) === String(updated.no_rkm_medis) &&
                        String(r.tanggal) === String(updated.tanggal)
                            ? updated
                            : r
                    )
                );
            } else {
                const url = route("skrining-visual.store", {}, false);
                const { data } = await axios.post(url, payload);
                const created = data?.data || data;
                setSkriningVisualRecords((prev) => [created, ...prev]);
            }
            setIsSkriningVisualOpen(false);
        } catch (_) {}
    };

    const handleEditSkriningRecord = (rec) => {
        setSkriningVisualForm({
            no_rkm_medis: String(rec.no_rkm_medis || selectedPatient?.no_rkm_medis || ""),
            tanggal: String(rec.tanggal || todayDateString()),
            jam: String(rec.jam || nowDateTimeString().split(" ")[1].substring(0, 5)).slice(0, 5),
            hasil_skrining: String(rec.hasil_skrining || "Hijau"),
            skrining_resiko_jatuh: String(rec.skrining_resiko_jatuh || ""),
            skor_resiko_jatuh: String(rec.skor_resiko_jatuh || ""),
            keputusan: String(rec.keputusan || "Sesuai Antrian"),
        });
        const parts = String(rec.skrining_resiko_jatuh || "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        setResikoSelections(parts);
        setIsSkriningVisualOpen(true);
    };

    const handleDeleteSkriningRecord = async (rec) => {
        try {
            const url = route(
                "skrining-visual.destroy",
                { no_rkm_medis: rec.no_rkm_medis, tanggal: rec.tanggal },
                false
            );
            await axios.delete(url);
            setSkriningVisualRecords((prev) =>
                prev.filter(
                    (r) =>
                        !(String(r.no_rkm_medis) === String(rec.no_rkm_medis) &&
                          String(r.tanggal) === String(rec.tanggal))
                )
            );
        } catch (_) {}
    };

    // After successful edit, refresh search results and selected patient data
    const handleEditSuccess = (updatedData) => {
        try {
            // Refresh list if searching
            if (searchTerm) {
                handleSearch(searchTerm, alamatTerm);
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
            handleSearch(newPatient.no_rkm_medis, alamatTerm);
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
    const loadRegistrations = async (page = 1, customFilters = null) => {
        setIsLoading(true);
        try {
            // Gunakan customFilters jika disediakan, jika tidak gunakan state filters
            const activeFilters = customFilters !== null ? customFilters : filters;
            // Hindari mengirim parameter kosong agar backend memakai default
            const params = { ...activeFilters, page };
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
        filters.alamat,
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
                    tanggalperiksa: todayDateString(getAppTimeZone()),
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
                    tanggalperiksa: todayDateString(getAppTimeZone()),
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
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3 lg:mb-4">
                                    <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white">
                                        Cari Pasien
                                    </h3>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
                        <div className="flex flex-wrap items-center gap-2 w-full">
                                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                                <label className="text-xs font-semibold text-slate-700 dark:text-gray-300">Loket</label>
                                                <select
                                                    value={selectedLoket}
                                                    onChange={(e) => setSelectedLoket(parseInt(e.target.value, 10))}
                                                    className="px-2 py-1 text-xs rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 w-full sm:w-auto"
                                                >
                                                    <option value={1}>Loket 1</option>
                                                    <option value={2}>Loket 2</option>
                                                    <option value={3}>Loket 3</option>
                                                    <option value={4}>Loket 4</option>
                                                </select>
                                            </div>
                                            <div className="px-2 py-1 rounded-md bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 w-full sm:w-auto">
                                                <div className="flex items-center gap-2">
                                                    <div className="text-base font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">{formatQueueLabel(queueCurrent?.nomor, queueCurrent?.prefix)}</div>
                                                    <span className="text-[11px] font-semibold text-gray-600 dark:text-gray-300">{queueStatusCode ?? '-'}</span>
                                                </div>
                                            </div>
                                            <motion.button disabled={!queueCurrent?.nomor} onClick={() => handleCallLoketQueue(false)} className="px-3 py-1.5 text-xs font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>Panggil</motion.button>
                                            <motion.button disabled={!queueCurrent?.nomor && !queueLastCalledNumber} onClick={() => handleCallLoketQueue(true)} className="px-3 py-1.5 text-xs font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>Ulang</motion.button>
                                            </div>
                                        <motion.button
                                            onClick={openPatientModal}
                                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 text-xs rounded-md flex items-center gap-1 transition-colors shadow-sm w-full sm:w-auto mt-2 sm:mt-0 justify-center"
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
                                </div>

                                {/* Search Inputs: Keyword + Alamat */}
                                <div className="grid grid-cols-5 gap-2 items-center">
                                    <motion.div
                                        className="relative col-span-3"
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
                                            className="w-full px-3 py-2 lg:py-2 pl-9 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
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
                                    </motion.div>
                                    <div className="col-span-2 flex items-center gap-2">
                                        <div className="relative flex-1">
                                            <input
                                                type="text"
                                                value={alamatTerm}
                                                onChange={(e) => setAlamatTerm(e.target.value)}
                                                placeholder="Filter alamat"
                                                aria-label="Filter Alamat"
                                                className="w-full px-3 py-2 lg:py-2 pl-9 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                            />
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <MapPinIcon className="h-5 w-5 text-gray-400" />
                                            </div>
                                        </div>
                                        {isSearching ? (
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
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    manualSearchRef.current = true;
                                                    handleSearch(searchTerm, alamatTerm);
                                                }}
                                                className="px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            aria-label="Cari cepat nama + alamat"
                                            title="Cari cepat berdasarkan nama + alamat"
                                            >
                                                <MagnifyingGlassIcon className="h-5 w-5" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>

                            

                            {/* Search Results */}
                            <div className="flex-1 overflow-y-auto max-h-[450px]">
                                <AnimatePresence>
                                    {(searchTerm || alamatTerm) && (
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
                                                                              onClick={() => selectPatient(patient)}
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
                                            <span className={srkBadgeClasses(srkStatus.status)}>
                                                {srkStatus.status === "SUDAH_SRK" ? "Sudah SRK" : (srkStatus.status === "BELUM_SRK" ? "Belum SRK" : "Unknown")}
                                            </span>
                                            <motion.button
                                                onClick={() => checkSrk()}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-xs rounded-md flex items-center gap-1 transition-colors shadow-sm"
                                                whileHover={{ scale: 1.05, y: -1 }}
                                                whileTap={{ scale: 0.95 }}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.2 }}
                                                disabled={srkLoading}
                                            >
                                                {srkLoading ? "Memeriksa..." : "Cek SRK"}
                                            </motion.button>
                                            <motion.button
                                                onClick={() => openSkriningVisualModal(selectedPatient)}
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
                                                    Skrining Visual
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
                                            noValidate
                                            className="space-y-2"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {/* Row: 4 Columns (Tanggal, Jam, Dokter, Poli) */}
                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                                                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2, delay: 0.1 }}>
                                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">Tanggal *</label>
                                                    <input
                                                        type="date"
                                                        name="tgl_registrasi"
                                                        value={formData.tgl_registrasi}
                                                        onChange={handleFormChange}
                                                        required
                                                        className="w-full px-1 py-0.5 text-[11px] border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                    />
                                                </motion.div>
                                                <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2, delay: 0.15 }}>
                                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">Jam *</label>
                                                    <input
                                                        type="time"
                                                        name="jam_reg"
                                                        value={formData.jam_reg}
                                                        onChange={handleFormChange}
                                                        required
                                                        step="60"
                                                        className="w-full px-1 py-0.5 text-[11px] border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                    />
                                                </motion.div>
                                                <motion.div initial={{ opacity: 0, x: 5 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2, delay: 0.2 }}>
                                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">Dokter *</label>
                                                    <select
                                                        name="kd_dokter"
                                                        value={formData.kd_dokter}
                                                        onChange={handleFormChange}
                                                        required
                                                        className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                    >
                                                        <option value="">Pilih Dokter</option>
                                                            {(Array.isArray(doctorOptions) ? doctorOptions.filter((dokter) => !("status" in dokter) || String(dokter.status) === "1") : []).map((dokter) => (
                                                                <option key={dokter.kd_dokter} value={dokter.kd_dokter}>
                                                                    {dokter.nm_dokter}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </motion.div>
                                                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2, delay: 0.25 }}>
                                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">Poliklinik *</label>
                                                    <select
                                                        name="kd_poli"
                                                        value={formData.kd_poli}
                                                        onChange={handleFormChange}
                                                        required
                                                        className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                    >
                                                    <option value="">Pilih Poliklinik</option>
                                                        {(Array.isArray(poliOptions) ? poliOptions : [])
                                                            .filter((p) => p.status === "1")
                                                            .map((poli) => (
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
                                                    className="flex flex-wrap items-center gap-x-4 gap-y-1 px-2 py-1 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/50"
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
                                                    {poliStatus.last_visit && (
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Terakhir:</span>
                                                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                                                                {new Date(poliStatus.last_visit).toLocaleDateString("id-ID", {
                                                                    day: "numeric",
                                                                    month: "short",
                                                                    year: "numeric",
                                                                })}
                                                            </span>
                                                        </div>
                                                    )}
                                                </motion.div>
                                            )}

                                            {/* Row 2: 3 Columns (Hubungan, Nama PJ, Cara Bayar) */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                                {/* Hubungan Penanggung Jawab */}
                                                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2, delay: 0.35 }}>
                                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">Hubungan *</label>
                                                    <select
                                                        name="hubunganpj"
                                                        value={formData.hubunganpj}
                                                        onChange={handleFormChange}
                                                        required
                                                        className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
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
                                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">Nama Penanggung Jawab *</label>
                                                    <input
                                                        type="text"
                                                        name="p_jawab"
                                                        value={formData.p_jawab}
                                                        onChange={handleFormChange}
                                                        required
                                                        className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                    />
                                                </div>

                                                {/* Cara Bayar */}
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">Cara Bayar *</label>
                                                    <div className="flex items-center gap-2">
                                                        <select
                                                            name="kd_pj"
                                                            value={formData.kd_pj}
                                                            onChange={handleFormChange}
                                                            required
                                                            className="flex-1 w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                        >
                                                            <option value="">Pilih Cara Bayar</option>
                                                            {(Array.isArray(penjabsList) ? penjabsList.filter((penjab) => !("status" in penjab) || String(penjab.status) === "1") : []).map((penjab) => (
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
                                                <div className="flex items-center justify-between">
                                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">Alamat Penanggung Jawab *</label>
                                                    {selectedPatient && (
                                                        <label className="inline-flex items-center gap-1 text-[11px] text-gray-600 dark:text-gray-300">
                                                            <input
                                                                type="checkbox"
                                                                checked={usePatientAddress}
                                                                onChange={(e) => setUsePatientAddress(e.target.checked)}
                                                            />
                                                            Salin dari alamat pasien
                                                        </label>
                                                    )}
                                                </div>
                                                <textarea
                                                    name="almt_pj"
                                                    value={formData.almt_pj}
                                                    onChange={handleFormChange}
                                                    required
                                                    rows={1}
                                                    className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 resize-y"
                                                />
                                            </motion.div>

                                            

                                            <motion.div
                                                className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-2"
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
                                                    <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                                        <div className="rounded-lg border border-slate-200 px-2 py-1.5">
                                                            <div className="text-[10px] text-slate-500">Nama Peserta</div>
                                                            <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-800">
                                                                <span className="truncate">{bpjsData.response?.nama || "-"}</span>
                                                            </div>
                                                        </div>
                                                        <div className="rounded-lg border border-slate-200 px-2 py-1.5">
                                                            <div className="text-[10px] text-slate-500">No. Kartu</div>
                                                            <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-800">
                                                                <span>{bpjsData.response?.noKartu || "-"}</span>
                                                                {bpjsData.response?.noKartu && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={async () => {
                                                                            try {
                                                                                await navigator.clipboard.writeText(bpjsData.response.noKartu);
                                                                            } catch (_) {}
                                                                        }}
                                                                        className="ml-1 rounded p-0.5 text-slate-400 hover:text-slate-600"
                                                                        title="Salin No. Kartu"
                                                                    >
                                                                        <ClipboardDocumentCheckIcon className="h-3 w-3" />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="rounded-lg border border-slate-200 px-2 py-1.5">
                                                            <div className="text-[10px] text-slate-500">Status</div>
                                                            <div className="mt-0.5 text-xs">
                                                                {bpjsData.response?.aktif ? (
                                                                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700">AKTIF</span>
                                                                ) : (
                                                                    <span className="inline-flex items-center rounded-full bg-red-100 px-1.5 py-0.5 text-[10px] font-medium text-red-700">TIDAK AKTIF</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="rounded-lg border border-slate-200 px-2 py-1.5">
                                                            <div className="text-[10px] text-slate-500">NIK</div>
                                                            <div className="mt-0.5 text-xs text-slate-800">{bpjsData.response?.noKTP || "-"}</div>
                                                        </div>
                                                        <div className="rounded-lg border border-slate-200 px-2 py-1.5">
                                                            <div className="text-[10px] text-slate-500">Provider FKTP</div>
                                                            <div className="mt-0.5 text-xs text-slate-800 truncate">{bpjsData.response?.kdProviderPst?.nmProvider || "-"}</div>
                                                        </div>
                                                        <div className="rounded-lg border border-slate-200 px-2 py-1.5">
                                                            <div className="text-[10px] text-slate-500">Kelas</div>
                                                            <div className="mt-0.5 text-xs text-slate-800">{bpjsData.response?.jnsKelas?.nama || bpjsData.response?.jnsKelas?.kode || "-"}</div>
                                                        </div>
                                                        <div className="rounded-lg border border-slate-200 px-2 py-1.5">
                                                            <div className="text-[10px] text-slate-500">Mulai Aktif</div>
                                                            <div className="mt-0.5 text-xs text-slate-800">{bpjsData.response?.tglMulaiAktif || "-"}</div>
                                                        </div>
                                                        <div className="rounded-lg border border-slate-200 px-2 py-1.5">
                                                            <div className="text-[10px] text-slate-500">Akhir Berlaku</div>
                                                            <div className="mt-0.5 text-xs text-slate-800">{bpjsData.response?.tglAkhirBerlaku || "-"}</div>
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
                                                    {(Array.isArray(poliOptions) ? poliOptions : [])
                                                        .filter((p) => p.status === "1")
                                                        .map((poli) => (
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

                                            {/* Filter by Address */}
                                            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                                                <label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Filter Alamat
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        name="alamat"
                                                        value={filters.alamat}
                                                        onChange={handleFilterChange}
                                                        placeholder="Filter alamat pasien"
                                                        className="w-full px-3 py-2 pl-10 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                    />
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 12.414A4 4 0 1112 8a4 4 0 011.414 7.414l4.243 4.243-1.414 1.414z" />
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
                                                            alamat: "",
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

                    <div className="overflow-x-auto max-h-80 sm:max-h-96 md:max-h-[28rem] overflow-y-auto">
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
                                            <th className="px-3 py-2 text-center text-xs lg:text-sm font-semibold text-gray-700 dark:text-gray-200">
                                                Aksi
                                            </th>
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
                                                Cara Daftar
                                            </th>
                                            <th className="px-3 py-2 text-left text-xs lg:text-sm font-semibold text-gray-700 dark:text-gray-200">
                                                Jam
                                            </th>
                                            <th className="px-3 py-2 text-right text-xs lg:text-sm font-semibold text-gray-700 dark:text-gray-200">
                                                Biaya
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                                        {registrationData.data.map((reg) => (
                                            <tr
                                                key={reg.no_rawat}
                                                onClick={() => setSelectedRegForQueue(reg)}
                                                className={
                                                    "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 " +
                                                    (selectedRegForQueue?.no_rawat === reg.no_rawat
                                                        ? "bg-blue-50 dark:bg-blue-900/20"
                                                        : "")
                                                }
                                            >
                                                <td className="px-3 py-2 text-center overflow-visible">
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
                                                            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-52 bg-white dark:bg-gray-800 rounded-md shadow-xl border border-gray-200 dark:border-gray-700 z-[1000]">
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
                                                                            handleCheckIn(reg);
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
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                        </svg>
                                                                        Check-In
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
                                                    {reg.keputusan ?? "-"}
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
                                                openSkriningVisualModal(
                                                    selectedPatient
                                                )
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
                                            Skrining Visual
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
                                    noValidate
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
                                                {(Array.isArray(doctorOptions) ? doctorOptions.filter((dokter) => !("status" in dokter) || String(dokter.status) === "1") : []).map((dokter) => (
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
                                                {(Array.isArray(poliOptions) ? poliOptions : [])
                                                    .filter((p) => p.status === "1")
                                                    .map((poli) => (
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
                                                    {(Array.isArray(penjabsList) ? penjabsList.filter((penjab) => !("status" in penjab) || String(penjab.status) === "1") : []).map((penjab) => (
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
                                        <div className="flex items-center justify-between mb-1">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Alamat Penanggung Jawab *
                                            </label>
                                            {selectedPatient && (
                                                <label className="inline-flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300">
                                                    <input
                                                        type="checkbox"
                                                        checked={usePatientAddress}
                                                        onChange={(e) => setUsePatientAddress(e.target.checked)}
                                                    />
                                                    Salin dari alamat pasien
                                                </label>
                                            )}
                                        </div>
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

            <AnimatePresence>
                {isSkriningVisualOpen && selectedPatient && (
                    <motion.div
                        className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-[9998] p-4 overflow-y-auto"
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        onClick={closeSkriningVisualModal}
                    >
                        <motion.div
                            className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 w-full max-h-[90vh] max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl"
                            initial={{ scale: 0.85, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.85, opacity: 0, y: 40 }}
                            transition={{ duration: 0.35, type: "spring", stiffness: 110, damping: 18 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10" />
                            <div className="relative p-6">
                                <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
                                    <div className="flex items-center gap-4">
                                        <motion.div
                                            className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4, delay: 0.1 }}
                                        >
                                            <ClipboardDocumentCheckIcon className="w-5 h-5 text-white" />
                                        </motion.div>
                                        <div>
                                            <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-900 to-gray-700 dark:from-white dark:via-white dark:to-gray-300">
                                                Skrining Visual
                                            </h3>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">{selectedPatient?.nm_pasien}</div>
                                        </div>
                                    </div>
                                    <motion.button
                                        onClick={closeSkriningVisualModal}
                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0"
                                        whileHover={{ scale: 1.1, rotate: 90 }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </motion.button>
                                </div>

                                <div className="mb-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-stretch">
                                        <div className="rounded-xl border border-white/30 dark:border-gray-700/50 bg-white/60 dark:bg-gray-900/30 p-4 h-full">
                                            <button
                                                type="button"
                                                onClick={() => setIsIdentityCollapsed((v) => !v)}
                                                className="w-full flex items-center justify-between"
                                            >
                                                <div className="text-[10px] font-medium text-gray-700 dark:text-gray-300">Identitas Pasien</div>
                                                <span className="text-gray-500">
                                                    {isIdentityCollapsed ? (
                                                        <ChevronRightIcon className="h-4 w-4" />
                                                    ) : (
                                                        <ChevronDownIcon className="h-4 w-4" />
                                                    )}
                                                </span>
                                            </button>
                                            <AnimatePresence>
                                                {!isIdentityCollapsed && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="overflow-hidden mt-2 space-y-3"
                                                    >
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                            <div className="space-y-1">
                                                                <div className="text-[11px] text-gray-900 dark:text-gray-100">No. RM: {selectedPatient?.no_rkm_medis}</div>
                                                                <div className="text-[11px] text-gray-900 dark:text-gray-100">Nama: {selectedPatient?.nm_pasien}</div>
                                                                <div className="text-[11px] text-gray-900 dark:text-gray-100">JK: {selectedPatient?.jk || '-'}</div>
                                                            </div>
                                                            <div className="space-y-1">
                                                                <div className="text-[11px] text-gray-900 dark:text-gray-100">Tgl Lahir: {formatBirthDate(selectedPatient?.tgl_lahir)}</div>
                                                                <div className="text-[11px] text-gray-900 dark:text-gray-100">Alamat: {selectedPatient?.alamat || '-'}</div>
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                            <div>
                                                                <label className="block text-[10px] font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal Skrining</label>
                                                                <input
                                                                    type="date"
                                                                    name="tanggal"
                                                                    value={skriningVisualForm.tanggal}
                                                                    onChange={handleSkriningVisualChange}
                                                                    className="w-full px-2 py-1.5 text-[11px] rounded-lg border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-[10px] font-medium text-gray-700 dark:text-gray-300 mb-1">Jam Skrining</label>
                                                                <input
                                                                    type="time"
                                                                    name="jam"
                                                                    value={String(skriningVisualForm.jam || "").slice(0,5)}
                                                                    onChange={handleSkriningVisualChange}
                                                                    className="w-full px-2 py-1.5 text-[11px] rounded-lg border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                                                                />
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {skriningVisualForm.hasil_skrining && (
                                            <div className="rounded-2xl border border-white/30 dark:border-gray-700/50 bg-white/60 dark:bg-gray-900/30 p-4 h-full overflow-y-auto">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${infoAccentBg(skriningVisualForm.hasil_skrining)} shadow-lg shadow-blue-500/25`}>
                                                            <ClipboardDocumentCheckIcon className="w-5 h-5 text-white" />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-800 dark:text-gray-100">Informasi {skriningVisualForm.hasil_skrining}</div>
                                                            <div className="text-xs text-gray-600 dark:text-gray-400">Pedoman cepat kondisi skrining</div>
                                                        </div>
                                                    </div>
                                                    <span className={hasilBadgeClasses(skriningVisualForm.hasil_skrining)}>{skriningVisualForm.hasil_skrining}</span>
                                                </div>
                                                <ul className="mt-2 space-y-1">
                                                    {(skriningInfo[skriningVisualForm.hasil_skrining] || []).map((it) => (
                                                        <li key={it} className="flex items-center gap-2 text-xs text-gray-800 dark:text-gray-200">
                                                            <span className={`inline-block w-1.5 h-1.5 rounded-full ${dotBg(skriningVisualForm.hasil_skrining)}`} />
                                                            <span>{it}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <form onSubmit={handleSubmitSkriningVisual} className="space-y-4">


                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
                                        <div className="flex items-center gap-3">
                                            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Hasil Skrining : </label>
                                            <select
                                                name="hasil_skrining"
                                                value={skriningVisualForm.hasil_skrining}
                                                onChange={handleSkriningVisualChange}
                                                className="flex-1 px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                                            >
                                                <option value="">Pilih</option>
                                                <option value="Merah">Merah</option>
                                                <option value="Oranye">Oranye</option>
                                                <option value="Kuning">Kuning</option>
                                                <option value="Hijau">Hijau</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Keputusan :</label>
                                            <select
                                                name="keputusan"
                                                value={skriningVisualForm.keputusan}
                                                onChange={handleSkriningVisualChange}
                                                className="flex-1 px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                                            >
                                                <option value="">Pilih</option>
                                                <option value="Sesuai Antrian">Sesuai Antrian</option>
                                                <option value="Prioritas">Prioritas</option>
                                                <option value="UGD">UGD</option>
                                            </select>
                                        </div>
                                        
                                    </div>

                                    <div>
                                        <div className="flex flex-col md:flex-row md:items-start md:gap-3">
                                            <div className="md:basis-[45%]">
                                                <div className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Resiko Jatuh</div>
                                                <div className="flex flex-wrap gap-2">
                                                    {resikoOptions.map((opt) => {
                                                        const active = resikoSelections.includes(opt);
                                                        const cls = active
                                                            ? "inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 ring-2 ring-blue-200"
                                                            : "inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-xs text-gray-700 dark:text-gray-300";
                                                        return (
                                                            <button
                                                                key={opt}
                                                                type="button"
                                                                className={cls}
                                                                onClick={() => toggleResikoSelection(opt)}
                                                                aria-pressed={active}
                                                            >
                                                                <span className="text-[11px]">{opt}</span>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            <div className="md:basis-[40%] min-w-0">
                                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Rangkuman Resiko</label>
                                                <input
                                                    type="text"
                                                    name="skrining_resiko_jatuh"
                                                    value={skriningVisualForm.skrining_resiko_jatuh}
                                                    onChange={handleSkriningVisualChange}
                                                    className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                                                />
                                            </div>

                                            <div className="md:basis-[15%]">
                                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Skor</label>
                                                <input
                                                    type="text"
                                                    name="skor_resiko_jatuh"
                                                    value={skriningVisualForm.skor_resiko_jatuh}
                                                    onChange={handleSkriningVisualChange}
                                                    maxLength={2}
                                                    className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-2 pt-2">
                                        <motion.button
                                            type="submit"
                                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm shadow-sm"
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                        >
                                            Simpan
                                        </motion.button>
                                        <button
                                            type="button"
                                            onClick={closeSkriningVisualModal}
                                            className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 text-sm"
                                        >
                                            Batal
                                        </button>
                                    </div>
                                </form>

                                <div className="mt-6">
                                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Riwayat Skrining</div>
                                    <div className="space-y-2">
                                        {skriningVisualRecords.map((r) => (
                                            <div key={`${r.no_rkm_medis}-${r.tanggal}-${r.jam}`} className="rounded-xl border border-white/30 dark:border-gray-700/50 bg-white/70 dark:bg-gray-900/30 px-4 py-3 flex items-center justify-between">
                                                <div className="text-xs text-gray-800 dark:text-gray-200 space-y-1">
                                                    <div className="font-medium">{formatSkriningTanggal(r.tanggal)} • {String(r.jam || '').slice(0,5)}</div>
                                                    <div className="flex items-center gap-2">
                                                        <span className={hasilBadgeClasses(r.hasil_skrining)}>{r.hasil_skrining}</span>
                                                        <span className={keputusanBadgeClasses(r.keputusan)}>{r.keputusan}</span>
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">Skor {r.skor_resiko_jatuh}</span>
                                                    </div>
                                                    <div className="text-gray-600 dark:text-gray-400">{r.skrining_resiko_jatuh}</div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => handleEditSkriningRecord(r)} className="px-3 py-1.5 text-xs rounded-md bg-blue-600 hover:bg-blue-700 text-white">Edit</button>
                                                    <button onClick={() => handleDeleteSkriningRecord(r)} className="px-3 py-1.5 text-xs rounded-md bg-red-600 hover:bg-red-700 text-white">Hapus</button>
                                                </div>
                                            </div>
                                        ))}
                                        {skriningVisualRecords.length === 0 && (
                                            <div className="text-xs text-gray-600 dark:text-gray-400">Belum ada data skrining untuk pasien ini.</div>
                                        )}
                                    </div>
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
