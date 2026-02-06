import React, { useState, useEffect } from "react";
import axios from "axios";
import CopyResep from "./CopyResep";
import {
    todayDateString,
    nowDateTimeString,
    getAppTimeZone,
} from "@/tools/datetime";

export default function Resep({
    token = "",
    noRkmMedis = "",
    noRawat = "",
    kdPoli = "",
    onResepSaved = null,
    initialDokter = "",
    initialDokterNama = "",
}) {
    const [items, setItems] = useState([
        {
            id: 1,
            kodeObat: "",
            namaObat: "",
            aturanPakai: "",
            jumlah: "",
            satuan: "",
            stokTersedia: 0,
            harga: 0,
        },
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [obatOptions, setObatOptions] = useState([]);
    const [searchObat, setSearchObat] = useState({});
    const [loadingObat, setLoadingObat] = useState(false);
    const [showDropdown, setShowDropdown] = useState({});
    const [savedResep, setSavedResep] = useState(null);
    const [showSavedResep, setShowSavedResep] = useState(false);
    const [dokterOptions, setDokterOptions] = useState([]);
    const [selectedDokter, setSelectedDokter] = useState("");
    const [loadingDokter, setLoadingDokter] = useState(false);
    // Dokter Pembuat Resep (berdasarkan reg_periksa.kd_dokter)
    const [dokterPJ, setDokterPJ] = useState({ kd_dokter: "", nm_dokter: "" });
    const [loadingDokterPJ, setLoadingDokterPJ] = useState(false);
    const [dokterPJError, setDokterPJError] = useState(null);
    const [riwayatResep, setRiwayatResep] = useState([]);
    const [showRiwayatResep, setShowRiwayatResep] = useState(false);
    const [loadingRiwayat, setLoadingRiwayat] = useState(false);
    const [deletingResep, setDeletingResep] = useState(null);
    const [hasMoreResep, setHasMoreResep] = useState(false);
    const [nextOffset, setNextOffset] = useState(null);
    const [loadingMore, setLoadingMore] = useState(false);
    const [showCopyModal, setShowCopyModal] = useState(false);
    const [selectedResepForCopy, setSelectedResepForCopy] = useState(null);
    const [penyerahanLoading, setPenyerahanLoading] = useState({});
    const [activeTab, setActiveTab] = useState("resep"); // "resep" or "resep-racikan"

    const formatAturanPakai = (t) => {
        const s = (t || "").toString().trim();
        return s || "-";
    };

    const [aturanOptions, setAturanOptions] = useState([]);
    const [searchAturan, setSearchAturan] = useState({});
    const [loadingAturan, setLoadingAturan] = useState(false);
    const [showDropdownAturan, setShowDropdownAturan] = useState({});

    const [racikanGroups, setRacikanGroups] = useState([]);
    const [activeRacikId, setActiveRacikId] = useState(null);
    const [metodeRacikOptions, setMetodeRacikOptions] = useState([]);
    const [racikSearchObat, setRacikSearchObat] = useState({});
    const [racikDropdownObat, setRacikDropdownObat] = useState({});
    const [isSubmittingRacikan, setIsSubmittingRacikan] = useState(false);
    const [templates, setTemplates] = useState([]);
    const [loadingTemplates, setLoadingTemplates] = useState(false);
    const [showTemplateModal, setShowTemplateModal] = useState(false);
    const [isSavingTemplate, setIsSavingTemplate] = useState(false);
    const [templateQuery, setTemplateQuery] = useState("");

    // Fetch obat dari API dengan validasi stok yang lebih baik
    const fetchObat = async (search = "") => {
        if (!kdPoli) {
            return;
        }

        setLoadingObat(true);
        try {
            const response = await axios.get("/api/obat", {
                params: {
                    kd_poli: kdPoli,
                    search: search,
                    limit: 20,
                },
            });

            if (response.data.success) {
                // Tidak filter berdasarkan status dan stok untuk debugging
                setObatOptions(response.data.data);
            } else {
                setObatOptions([]);
            }
        } catch (error) {
            console.error("Error fetching obat:", error);
            setObatOptions([]);
        } finally {
            setLoadingObat(false);
        }
    };

    // Fungsi untuk mendapatkan info stok detail obat
    const getStokInfo = async (kodeBrng) => {
        try {
            const response = await axios.get("/api/resep/stok-info", {
                params: {
                    kode_brng: kodeBrng,
                    kd_poli: kdPoli || undefined,
                },
                withCredentials: true,
                headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
            });

            if (response.data.success) {
                return response.data.data;
            }
            return null;
        } catch (error) {
            console.warn("Error getting stok info:", error?.message || error);
            return null;
        }
    };

    const getDetailObat = async (kodeBrng) => {
        try {
            const response = await axios.get(`/api/obat/${encodeURIComponent(kodeBrng)}`, {
                params: { kd_poli: kdPoli || undefined },
                withCredentials: true,
                headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
            });
            if (response?.data?.success) return response.data.data;
            return null;
        } catch (_) {
            return null;
        }
    };

    const fetchAturan = async (search = "") => {
        setLoadingAturan(true);
        try {
            const response = await axios.get("/api/aturan-pakai", {
                params: { search, limit: 20 },
                withCredentials: true,
                headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
            });
            if (response?.data?.success) setAturanOptions(response.data.data || []);
            else setAturanOptions([]);
        } catch (_) {
            setAturanOptions([]);
        } finally {
            setLoadingAturan(false);
        }
    };

    const fetchMetodeRacik = async () => {
        try {
            const response = await axios.get('/farmasi/metode-racik', {
                params: { perPage: 200, q: '' },
                withCredentials: true,
                headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' }
            });
            const items = response?.data?.props?.items?.data || [];
            const opts = items.map((it) => ({ kd_racik: it.kd_racik, nm_racik: it.nm_racik }));
            if (opts.length > 0) { setMetodeRacikOptions(opts); return; }
        } catch (_) { }
        setMetodeRacikOptions([
            { kd_racik: 'R01', nm_racik: 'Puyer' },
            { kd_racik: 'R02', nm_racik: 'Sirup' },
            { kd_racik: 'R03', nm_racik: 'Salep' },
            { kd_racik: 'R04', nm_racik: 'Kapsul' },
            { kd_racik: 'R06', nm_racik: 'Injeksi' },
        ]);
    };

    // Fetch dokter dari API
    const fetchDokter = async () => {
        setLoadingDokter(true);
        try {
            const response = await axios.get("/api/dokter", {
                withCredentials: true,
                headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
            });

            if (response.data.success) {
                // Filter dokter yang bukan "-" (placeholder)
                const validDokters = response.data.data.filter(
                    (dokter) => dokter.kd_dokter !== "-"
                );
                setDokterOptions(validDokters);

                // Jangan memaksa default ke dokter pertama; kita akan sync ke reg_periksa
            } else {
                // Fallback ke endpoint RS jika endpoint utama tidak success
                try {
                    const respAlt = await axios.get("/api/public/dokter", {
                        withCredentials: true,
                        headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
                        params: { search: "" },
                    });
                    const arr = Array.isArray(respAlt?.data?.data)
                        ? respAlt.data.data
                        : Array.isArray(respAlt?.data)
                        ? respAlt.data
                        : [];
                    const normalized = arr
                        .map((d) => ({
                            kd_dokter: d.kd_dokter ?? d.kode ?? "",
                            nm_dokter: d.nm_dokter ?? d.nama ?? "",
                        }))
                        .filter((d) => d.kd_dokter && d.nm_dokter);
                    setDokterOptions(normalized);
                } catch {
                    setDokterOptions([]);
                }
            }
        } catch (error) {
            console.warn("Error fetching dokter:", error?.message || error);
            // Fallback ke endpoint RS jika terjadi error (mis. redirect login)
            try {
                const respAlt = await axios.get("/api/public/dokter", {
                    withCredentials: true,
                    headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
                    params: { search: "" },
                });
                const arr = Array.isArray(respAlt?.data?.data)
                    ? respAlt.data.data
                    : Array.isArray(respAlt?.data)
                    ? respAlt.data
                    : [];
                const normalized = arr
                    .map((d) => ({
                        kd_dokter: d.kd_dokter ?? d.kode ?? "",
                        nm_dokter: d.nm_dokter ?? d.nama ?? "",
                    }))
                    .filter((d) => d.kd_dokter && d.nm_dokter);
                setDokterOptions(normalized);
            } catch (_) {
                setDokterOptions([]);
            }
        } finally {
            setLoadingDokter(false);
        }
    };

    // Fetch Dokter Pembuat Resep berdasar no_rawat -> reg_periksa.kd_dokter join dokter untuk nm_dokter
    const fetchDokterPenanggungJawab = async () => {
        if (!noRawat) return;
        setLoadingDokterPJ(true);
        setDokterPJError(null);
        try {
            // Endpoint khusus by-rawat (aman utk no_rawat mengandung '/')
            let regData = null;
            try {
                const respRegExact = await axios.get("/api/reg-periksa/by-rawat", {
                    params: { no_rawat: noRawat },
                    withCredentials: true,
                    headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
                });
                regData = respRegExact?.data?.data || null;
            } catch (e) {
                console.warn(
                    "/api/reg-periksa/by-rawat gagal, fallback ke pencarian index",
                    e
                );
            }

            if (!regData) {
                // Fallback: gunakan index dengan search
                const respReg = await axios.get("/api/reg-periksa", {
                    params: { search: noRawat, per_page: 1 },
                    withCredentials: true,
                    headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
                });
                regData = respReg?.data?.data?.data?.[0] || null;
            }

            if (regData?.kd_dokter && regData?.kd_dokter !== "-") {
                const kd = regData.kd_dokter;
                // Ambil nm_dokter dari relasi 'dokter' bila tersedia
                let nm =
                    regData?.dokter?.nm_dokter ||
                    regData?.doctor?.nm_dokter ||
                    "";
                if (!nm) {
                    try {
                        const respDokter = await axios.get(`/api/dokter/${encodeURIComponent(kd)}`, {
                            withCredentials: true,
                            headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
                        });
                        nm = respDokter?.data?.data?.nm_dokter || nm;
                    } catch (e) {
                        console.warn("Gagal mengambil detail dokter:", e);
                    }
                }
                setDokterPJ({ kd_dokter: kd, nm_dokter: nm || kd });
                // Pastikan dokter PJ muncul di dropdown meski tidak ada di daftar aktif
                setDokterOptions((prev) => {
                    if (
                        Array.isArray(prev) &&
                        prev.some((d) => d.kd_dokter === kd)
                    ) {
                        return prev;
                    }
                    const pjDoctor = { kd_dokter: kd, nm_dokter: nm || kd };
                    return [pjDoctor, ...(Array.isArray(prev) ? prev : [])];
                });
            } else {
                setDokterPJ({ kd_dokter: "", nm_dokter: "" });
            }
        } catch (error) {
            console.warn("Error fetching dokter penanggung jawab:", error?.message || error);
            setDokterPJError("Gagal memuat dokter penanggung jawab");
        } finally {
            setLoadingDokterPJ(false);
        }
    };

    // Load obat saat komponen dimount atau kdPoli berubah
    useEffect(() => {
        if (kdPoli) {
            fetchObat();
        }
    }, [kdPoli]);

    // Load dokter saat komponen dimount
    useEffect(() => {
        fetchDokter();
    }, []);

    // Load dokter penanggung jawab saat noRawat berubah
    useEffect(() => {
        fetchDokterPenanggungJawab();
    }, [noRawat]);

    useEffect(() => {
        const initialKode = initialDokter ? String(initialDokter) : "";
        if (initialKode && dokterOptions?.length > 0) {
            const existsInitial = dokterOptions.some(
                (d) => String(d.kd_dokter) === initialKode
            );
            if (existsInitial) {
                setSelectedDokter(initialKode);
            }
        } else if (!initialKode && dokterPJ?.kd_dokter && dokterOptions?.length > 0 && !selectedDokter) {
            const pjKode = String(dokterPJ.kd_dokter || "");
            const exists = dokterOptions.some(
                (d) => String(d.kd_dokter) === pjKode
            );
            if (exists) {
                setSelectedDokter(pjKode);
            }
        }
    }, [initialDokter, dokterPJ, dokterOptions, selectedDokter]);

    // Load riwayat resep saat komponen dimount atau noRawat berubah
    useEffect(() => {
        fetchRiwayatResep();
    }, [noRawat]);

    // Debounce search - simplified approach
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            // Ambil search term dari item yang sedang aktif
            const activeSearchTerms = Object.values(searchObat).filter(
                (term) => term && term.length > 0
            );
            if (activeSearchTerms.length > 0) {
                const latestSearch =
                    activeSearchTerms[activeSearchTerms.length - 1];
                if (latestSearch.length >= 2) {
                    fetchObat(latestSearch);
                } else if (latestSearch.length === 1) {
                    // Jangan fetch jika hanya 1 karakter
                    return;
                }
            } else {
                // Load semua obat jika tidak ada search
                fetchObat();
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchObat]);

    // Load obat saat dropdown dibuka
    useEffect(() => {
        const hasActiveDropdown = Object.values(showDropdown).some(
            (show) => show
        );
        if (hasActiveDropdown && obatOptions.length === 0) {
            fetchObat();
        }
    }, [showDropdown]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".dropdown-container")) {
                setShowDropdown({});
                setShowDropdownAturan({});
                setRacikDropdownObat({});
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const activeSearchTerms = Object.values(searchAturan).filter((term) => term && term.length > 0);
            if (activeSearchTerms.length > 0) {
                const latestSearch = activeSearchTerms[activeSearchTerms.length - 1];
                if (latestSearch.length >= 2) fetchAturan(latestSearch);
                else if (latestSearch.length === 0) fetchAturan();
            } else {
                fetchAturan();
            }
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [searchAturan]);

    useEffect(() => { fetchMetodeRacik(); }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const activeTerms = Object.values(racikSearchObat).filter((term) => term && term.length > 0);
            if (activeTerms.length > 0) {
                const latest = activeTerms[activeTerms.length - 1];
                if (latest.length >= 2) {
                    fetchObat(latest);
                } else if (latest.length === 0) {
                    fetchObat();
                }
            } else {
                fetchObat();
            }
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [racikSearchObat]);

    useEffect(() => {
        const hasActiveDropdown = Object.values(racikDropdownObat).some((v) => v);
        if (hasActiveDropdown && obatOptions.length === 0) {
            fetchObat();
        }
    }, [racikDropdownObat]);

    const addItem = () => {
        setItems((prev) => [
            ...prev,
            {
                id: Date.now(),
                kodeObat: "",
                namaObat: "",
                aturanPakai: "",
                jumlah: 0,
                satuan: "",
                stokTersedia: 0,
                harga: 0,
            },
        ]);
    };

    const removeItem = (id) => {
        setItems((prev) => prev.filter((it) => it.id !== id));
    };

    const updateItem = (id, key, value) => {
        setItems((prev) =>
            prev.map((it) => (it.id === id ? { ...it, [key]: value } : it))
        );
    };

    // Handle pemilihan obat dari dropdown dengan validasi stok yang lebih detail
    const selectObat = async (itemId, obat) => {
        // Dapatkan info stok detail
        const stokInfo = await getStokInfo(obat.kode_brng);

        setItems((prev) =>
            prev.map((it) =>
                it.id === itemId
                    ? {
                          ...it,
                          kodeObat: obat.kode_brng,
                          namaObat: obat.nama_brng,
                          satuan: obat.kode_satbesar,
                          stokTersedia: stokInfo
                              ? stokInfo.total_stok
                              : obat.total_stok,
                          harga: stokInfo
                              ? stokInfo.harga_ralan
                              : obat.ralan || 0,
                          stokDetail: stokInfo ? stokInfo.stok_per_bangsal : [],
                          batchDetail: stokInfo ? stokInfo.batch_detail : [],
                      }
                    : it
            )
        );
        setShowDropdown((prev) => ({ ...prev, [itemId]: false }));
    };

    const addRacikanGroup = () => {
        const newId = Date.now();
        setRacikanGroups((prev) => [
            ...prev,
            { id: newId, no_racik: (prev.length + 1), nama_racik: '', kd_racik: '', jml_dr: 0, aturan_pakai: '', keterangan: '', items: [] }
        ]);
        setActiveRacikId(newId);
    };

    const removeRacikanGroup = (id) => {
        setRacikanGroups((prev) => prev.filter((g) => g.id !== id).map((g, idx) => ({ ...g, no_racik: idx + 1 })));
        if (activeRacikId === id) setActiveRacikId(null);
    };

    const updateRacikanGroup = (id, key, value) => {
        setRacikanGroups((prev) => prev.map((g) => (g.id === id ? { ...g, [key]: value } : g)));
        if (key === 'jml_dr') {
            setRacikanGroups((prev) => prev.map((g) => {
                if (g.id !== id) return g;
                const updatedItems = (g.items || []).map((it) => {
                    const kapasitas = parseFloat(it.kapasitas || 0) || 0;
                    const p1 = parseFloat(it.p1 || 0) || 0;
                    const p2 = parseFloat(it.p2 || 0) || 0;
                    const kandungan = parseFloat(it.kandungan || 0) || 0;
                    let jml = 0;
                    if (kapasitas > 0 && kandungan > 0) {
                        jml = ((Number(value) || 0) * kandungan) / kapasitas;
                    } else if (p1 > 0 && p2 > 0) {
                        jml = (Number(value) || 0) * (p1 / p2);
                    }
                    return { ...it, jml: jml };
                });
                return { ...g, items: updatedItems };
            }));
        }
    };

    const addRacikanItem = (groupId) => {
        setRacikanGroups((prev) => prev.map((g) => (g.id === groupId ? { ...g, items: [...(g.items || []), { id: Date.now(), kode_brng: '', nama_brng: '', satuan: '', kapasitas: 0, stok: 0, p1: 1, p2: 1, kandungan: 0, jml: 0 }] } : g)));
    };

    const removeRacikanItem = (groupId, itemId) => {
        setRacikanGroups((prev) => prev.map((g) => (g.id === groupId ? { ...g, items: (g.items || []).filter((it) => it.id !== itemId) } : g)));
    };

    const updateRacikanItem = (groupId, itemId, key, value) => {
        setRacikanGroups((prev) => prev.map((g) => {
            if (g.id !== groupId) return g;
            const updated = (g.items || []).map((it) => (it.id === itemId ? { ...it, [key]: value } : it));
            return { ...g, items: updated };
        }));
        if (['p1', 'p2', 'kandungan'].includes(key)) {
            setRacikanGroups((prev) => prev.map((g) => {
                if (g.id !== groupId) return g;
                const updated = (g.items || []).map((it) => {
                    if (it.id !== itemId) return it;
                    const kapasitas = parseFloat(it.kapasitas || 0) || 0;
                    const p1 = parseFloat(key === 'p1' ? value : it.p1 || 0) || 0;
                    const p2 = parseFloat(key === 'p2' ? value : it.p2 || 0) || 0;
                    const kandungan = parseFloat(key === 'kandungan' ? value : it.kandungan || 0) || 0;
                    let jml = 0;
                    let nextKandungan = kandungan;
                    if (kapasitas > 0 && kandungan > 0) {
                        jml = ((Number(g.jml_dr) || 0) * kandungan) / kapasitas;
                    } else if (p1 > 0 && p2 > 0) {
                        jml = (Number(g.jml_dr) || 0) * (p1 / p2);
                        if (kapasitas > 0 && (!nextKandungan || nextKandungan === 0)) {
                            nextKandungan = kapasitas * (p1 / p2);
                        }
                    }
                    return { ...it, jml: jml, kandungan: nextKandungan };
                });
                return { ...g, items: updated };
            }));
        }
    };

    const selectRacikanObat = async (groupId, itemId, obat) => {
        const detail = await getDetailObat(obat.kode_brng);
        const kapasitas = detail?.kapasitas ?? obat.kapasitas ?? 0;
        const satuan = detail?.kode_satbesar ?? obat.kode_satbesar ?? '';
        const stok = detail?.total_stok ?? obat.total_stok ?? 0;
        setRacikanGroups((prev) => prev.map((g) => {
            if (g.id !== groupId) return g;
            const jmlDr = Number(g.jml_dr) || 0;
            const updated = (g.items || []).map((it) => {
                if (it.id !== itemId) return it;
                const p1 = parseFloat(it.p1 || 0) || 0;
                const p2 = parseFloat(it.p2 || 0) || 0;
                let kandungan = parseFloat(it.kandungan || 0) || 0;
                let jml = 0;
                if (kapasitas > 0 && kandungan > 0) {
                    jml = (jmlDr * kandungan) / kapasitas;
                } else if (p1 > 0 && p2 > 0) {
                    jml = jmlDr * (p1 / p2);
                    if (kapasitas > 0 && (!kandungan || kandungan === 0)) {
                        kandungan = kapasitas * (p1 / p2);
                    }
                }
                return { ...it, kode_brng: obat.kode_brng, nama_brng: obat.nama_brng, kapasitas, satuan, stok, kandungan, jml };
            });
            return { ...g, items: updated };
        }));
        setRacikDropdownObat((prev) => ({ ...prev, [itemId]: false }));
    };

    const validateRacikan = () => {
        if (racikanGroups.length === 0) return false;
        for (const g of racikanGroups) {
            if (!g.nama_racik || !g.kd_racik || !g.jml_dr || (g.items || []).length === 0) return false;
            for (const it of g.items || []) {
                if (!it.kode_brng || (Number(it.jml) || 0) <= 0) return false;
            }
        }
        return true;
    };

    const handleSubmitRacikan = async () => {
        const isValid = validateRacikan();
        if (!isValid) { alert('Lengkapi racikan terlebih dahulu'); return; }
        setIsSubmittingRacikan(true);
        try {
            const payload = {
                no_rawat: noRawat,
                kd_poli: kdPoli,
                kd_dokter: selectedDokter,
                groups: racikanGroups.map((g) => ({
                    no_racik: g.no_racik,
                    nama_racik: g.nama_racik,
                    kd_racik: g.kd_racik,
                    jml_dr: Number(g.jml_dr) || 0,
                    aturan_pakai: g.aturan_pakai || "",
                    keterangan: g.keterangan || "",
                    items: (g.items || []).map((it) => ({
                        kode_brng: it.kode_brng,
                        p1: Number(it.p1) || 0,
                        p2: Number(it.p2) || 0,
                        kandungan: Number(it.kandungan) || 0,
                        jml: Number(it.jml) || 0,
                    })),
                })),
            };
            const response = await axios.post('/api/resep/racikan', payload);
            if (response?.data?.success) {
                const noResepBaru = response.data.data.no_resep;
                setRacikanGroups([]);
                setActiveRacikId(null);
                await fetchSavedResep(noResepBaru);
                await fetchRiwayatResep();
            } else {
                alert("Gagal menyimpan racikan");
            }
        } catch (error) {
            const msg = error?.response?.data?.message || "Terjadi kesalahan saat menyimpan racikan";
            alert(msg);
        } finally {
            setIsSubmittingRacikan(false);
        }
    };

    const fetchTemplates = async () => {
        if (!selectedDokter) return;
        setLoadingTemplates(true);
        try {
            const resp = await axios.get('/api/racikan-template', { params: { kd_dokter: selectedDokter } });
            if (resp.data?.success) setTemplates(resp.data.data);
        } catch (_) { }
        finally { setLoadingTemplates(false); }
    };

    const handleSaveAsTemplate = async (group) => {
        if (!group.nama_racik || !group.kd_racik || (group.items || []).length === 0) {
            alert('Nama, metode, dan bahan racikan harus diisi!');
            return;
        }
        setIsSavingTemplate(true);
        try {
            const payload = {
                nama_racik: group.nama_racik,
                kd_racik: group.kd_racik,
                kd_dokter: selectedDokter,
                jml_dr: group.jml_dr || 0,
                aturan_pakai: group.aturan_pakai || '',
                keterangan: group.keterangan || '',
                items: (group.items || []).map(it => ({
                    kode_brng: it.kode_brng,
                    p1: it.p1,
                    p2: it.p2,
                    kandungan: it.kandungan,
                    jml: it.jml
                }))
            };
            const resp = await axios.post('/api/racikan-template', payload);
            if (resp.data?.success) {
                alert('Template racikan berhasil disimpan!');
                fetchTemplates();
            }
        } catch (error) {
            alert('Gagal menyimpan template: ' + (error?.response?.data?.message || error.message));
        } finally { setIsSavingTemplate(false); }
    };

    const loadTemplate = async (template) => {
        try {
            const resp = await axios.get(`/api/racikan-template/${template.no_template}`, { params: { kd_poli: kdPoli } });
            if (resp.data?.success) {
                const { header, items, stock_alert, out_of_stock_items } = resp.data.data;
                if (stock_alert) {
                    const names = (out_of_stock_items || []).map(it => it.nama_brng).join(', ');
                    alert(`Peringatan: Stok obat [${names}] habis/tidak tersedia di lokasi poli ini!`);
                }
                const newId = Date.now();
                const newGroup = {
                    id: newId,
                    no_racik: racikanGroups.length + 1,
                    nama_racik: header.nama_racik,
                    kd_racik: header.kd_racik,
                    jml_dr: header.jml_dr,
                    aturan_pakai: header.aturan_pakai,
                    keterangan: header.keterangan,
                    items: (items || []).map(it => ({
                        id: Date.now() + Math.random(),
                        kode_brng: it.kode_brng,
                        nama_brng: it.nama_brng,
                        satuan: it.satuan,
                        kapasitas: it.kapasitas,
                        stok: it.stok_tersedia,
                        p1: it.p1,
                        p2: it.p2,
                        kandungan: it.kandungan,
                        jml: it.jml
                    }))
                };
                setRacikanGroups(prev => [...prev, newGroup]);
                setActiveRacikId(newId);
                setShowTemplateModal(false);
            }
        } catch (_) {
            alert('Gagal memuat detail template');
        }
    };

    // Fungsi untuk mengambil data resep yang sudah disimpan
    const fetchSavedResep = async (noResep) => {
        try {
            const response = await axios.get(`/api/resep/${noResep}`);
            if (response.data.success) {
                setSavedResep(response.data.data);
                setShowSavedResep(true);
            }
        } catch (error) {
            console.error("Error fetching saved resep:", error);
        }
    };

    // Fungsi untuk mengambil riwayat resep berdasarkan no_rkm_medis dengan pagination
    const fetchRiwayatResep = async (reset = true) => {
        if (!noRkmMedis) {
            console.warn("fetchRiwayatResep: noRkmMedis kosong");
            return;
        }

        console.warn(
            "fetchRiwayatResep: mulai fetch dengan noRkmMedis:",
            noRkmMedis
        );
        setLoadingRiwayat(true);
        try {
            // Encode no_rkm_medis untuk menangani karakter khusus
            const encodedNoRkmMedis = encodeURIComponent(noRkmMedis);
            console.warn(
                "fetchRiwayatResep: encodedNoRkmMedis:",
                encodedNoRkmMedis
            );

            // Fetch dengan limit 5 untuk loading awal
            const response = await axios.get(`/api/resep/pasien/${encodedNoRkmMedis}`, {
                params: { limit: 5, offset: 0 },
                withCredentials: true,
                headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
            });

            console.warn("fetchRiwayatResep: response:", response.data);
            if (response.data.success) {
                const resepData = response.data.data;

                if (reset) {
                    setRiwayatResep(resepData);
                } else {
                    setRiwayatResep((prev) => [...prev, ...resepData]);
                }

                // Set pagination info
                setHasMoreResep(response.data.has_more);
                setNextOffset(response.data.next_offset);

                console.warn(
                    "fetchRiwayatResep: data berhasil diset:",
                    resepData
                );
                console.warn(
                    "fetchRiwayatResep: has_more:",
                    response.data.has_more
                );
            } else {
                setRiwayatResep([]);
                setHasMoreResep(false);
                setNextOffset(null);
                console.error("fetchRiwayatResep: response tidak success");
            }
        } catch (error) {
            console.warn("Error fetching riwayat resep:", error?.message || error);
            setRiwayatResep([]);
            setHasMoreResep(false);
            setNextOffset(null);
        } finally {
            setLoadingRiwayat(false);
        }
    };

    // Fungsi untuk load more resep
    const loadMoreResep = async () => {
        if (!noRkmMedis || !hasMoreResep || !nextOffset || loadingMore) {
            return;
        }

        console.warn(
            "loadMoreResep: mulai load more dengan offset:",
            nextOffset
        );
        setLoadingMore(true);
        try {
            const encodedNoRkmMedis = encodeURIComponent(noRkmMedis);
            const response = await axios.get(
                `/api/resep/pasien/${encodedNoRkmMedis}`,
                {
                    params: {
                        limit: 5,
                        offset: nextOffset,
                    },
                }
            );

            console.warn("loadMoreResep: response:", response.data);
            if (response.data.success) {
                const newResepData = response.data.data;

                // Append data baru ke existing data
                setRiwayatResep((prev) => [...prev, ...newResepData]);

                // Update pagination info
                setHasMoreResep(response.data.has_more);
                setNextOffset(response.data.next_offset);

                console.warn(
                    "loadMoreResep: data baru berhasil ditambahkan:",
                    newResepData
                );
            }
        } catch (error) {
            console.error("Error loading more resep:", error);
        } finally {
            setLoadingMore(false);
        }
    };

    // Hapus resep berdasarkan no_rawat, tanggal dan jam
    const deleteResep = async (resep) => {
        const tz = getAppTimeZone();
        const deleteInfo = `Resep tanggal ${new Date(
            resep.tgl_peresepan
        ).toLocaleDateString("id-ID", { timeZone: tz })} ${
            resep.jam_peresepan
        }`;
        if (!confirm(`Apakah Anda yakin ingin menghapus ${deleteInfo}?`)) {
            return;
        }

        const deleteKey = `${resep.tgl_peresepan}_${resep.jam_peresepan}`;
        setDeletingResep(deleteKey);
        try {
            // Method spoofing: use POST + _method=DELETE to avoid 405 issues
            const fd = new FormData();
            fd.append("_method", "DELETE");
            const response = await axios.post(
                `/api/resep/${resep.no_resep}`,
                fd,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            if (response.data.success) {
                alert("Resep berhasil dihapus");
                // Refresh riwayat resep
                await fetchRiwayatResep();
            } else {
                alert("Gagal menghapus resep: " + response.data.message);
            }
        } catch (error) {
            console.error("Error deleting resep:", error);
            alert("Terjadi kesalahan saat menghapus resep");
        } finally {
            setDeletingResep(null);
        }
    };

    // Handle copy resep
    const handleCopyResep = (resep) => {
        setSelectedResepForCopy(resep);
        setShowCopyModal(true);
    };

    // Handle close copy modal
    const handleCloseCopyModal = () => {
        setShowCopyModal(false);
        setSelectedResepForCopy(null);
    };

    // Handle resep saved from copy modal
    const handleResepSaved = () => {
        // Refresh riwayat resep
        fetchRiwayatResep(true);
    };

    

    // Proses penyerahan obat untuk resep tertentu
    const handlePenyerahan = async (resep) => {
        if (!resep?.no_resep) return;
        if (penyerahanLoading[resep.no_resep]) return;

        // Konfirmasi sebelum penyerahan
        const info = `No. Resep ${resep.no_resep} pada ${new Date(
            resep.tgl_peresepan
        ).toLocaleDateString("id-ID")} ${resep.jam_peresepan}`;
        if (!confirm(`Lanjutkan penyerahan obat untuk ${info}?`)) {
            return;
        }

        try {
            setPenyerahanLoading((prev) => ({
                ...prev,
                [resep.no_resep]: true,
            }));
            // Kirim request ke endpoint penyerahan
            const response = await axios.post(
                `/api/resep/${encodeURIComponent(resep.no_resep)}/penyerahan`,
                {
                    // kd_poli opsional; backend akan ambil dari reg_periksa menggunakan no_rawat
                    kd_poli: kdPoli || resep.kd_poli || undefined,
                }
            );

            if (response.data?.success) {
                const data = response.data.data || {};
                const tglPenyerahan =
                    data.tgl_penyerahan ||
                    resep.tgl_penyerahan ||
                    todayDateString();
                const jamPenyerahan =
                    data.jam_penyerahan ||
                    resep.jam_penyerahan ||
                    nowDateTimeString().split(" ")[1].substring(0, 8);

                alert(
                    "Penyerahan obat berhasil diproses. Stok telah diperbarui."
                );

                // Update item pada riwayatResep
                setRiwayatResep((prev) =>
                    prev.map((r) => {
                        if (r.no_resep === resep.no_resep) {
                            return {
                                ...r,
                                tgl_penyerahan: tglPenyerahan,
                                jam_penyerahan: jamPenyerahan,
                            };
                        }
                        return r;
                    })
                );

                // Update data resep yang disimpan jika relevan
                setSavedResep((prev) => {
                    if (prev?.no_resep === resep.no_resep) {
                        return {
                            ...prev,
                            tgl_penyerahan: tglPenyerahan,
                            jam_penyerahan: jamPenyerahan,
                            status: "Sudah diserahkan",
                        };
                    }
                    return prev;
                });
            } else {
                const msg =
                    response.data?.message || "Gagal memproses penyerahan.";
                alert(msg);
            }
        } catch (error) {
            console.error("Error penyerahan obat:", error);
            const msg =
                error.response?.data?.message ||
                "Terjadi kesalahan saat penyerahan obat";
            alert(msg);
        } finally {
            setPenyerahanLoading((prev) => ({
                ...prev,
                [resep.no_resep]: false,
            }));
        }
    };

    // Validasi sebelum submit
    const validateForm = async () => {
        for (const item of items) {
            if (!item.kodeObat || !item.namaObat) {
                alert("Semua obat harus dipilih");
                return false;
            }
            if (item.jumlah <= 0) {
                alert("Jumlah obat harus lebih dari 0");
                return false;
            }
            if (!item.aturanPakai.trim()) {
                alert("Aturan pakai harus diisi");
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = await validateForm();
        if (!isValid) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Siapkan data resep untuk dikirim ke API
            const resepData = {
                no_rawat: noRawat,
                kd_poli: kdPoli,
                kd_dokter: selectedDokter,
                items: items
                    .filter((item) => item.kodeObat && item.jumlah > 0)
                    .map((item) => ({
                        kode_brng: item.kodeObat,
                        jml: parseFloat(item.jumlah),
                        aturan_pakai: item.aturanPakai || "",
                    })),
            };

            // Kirim data ke API
            const response = await axios.post("/api/resep", resepData);

            if (response.data.success) {
                const noResep = response.data.data.no_resep;
                // Reset form setelah berhasil
                setItems([
                    {
                        id: 1,
                        kodeObat: "",
                        namaObat: "",
                        aturanPakai: "",
                        jumlah: 0,
                        satuan: "",
                        stokTersedia: 0,
                        harga: 0,
                    },
                ]);
                alert(`Resep berhasil disimpan dengan nomor: ${noResep}`);
                // Ambil dan tampilkan data resep yang baru disimpan
                await fetchSavedResep(noResep);
                // Refresh riwayat resep
                await fetchRiwayatResep();
                // Refresh obat list untuk update stok
                if (kdPoli) {
                    fetchObat();
                }
                if (typeof onResepSaved === "function") {
                    const appended = items
                        .filter((item) => item.kodeObat && item.jumlah > 0)
                        .map((item) => ({
                            name: item.namaObat,
                            qty: item.jumlah,
                            instruction: item.aturanPakai || "",
                        }));
                    try {
                        onResepSaved(appended);
                    } catch (_) {}
                }
            } else {
                alert(
                    "Gagal menyimpan resep: " +
                        (response.data.message || "Terjadi kesalahan")
                );
            }
        } catch (error) {
            console.error("Error submitting resep:", error);
            if (error.response?.data?.message) {
                alert("Error: " + error.response.data.message);
            } else {
                alert("Terjadi kesalahan saat menyimpan resep");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6 p-4 md:p-6">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
                <button
                    type="button"
                    onClick={() => setActiveTab("resep")}
                    className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
                        activeTab === "resep"
                            ? "border-teal-600 text-teal-600 dark:border-teal-400 dark:text-teal-400"
                            : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                >
                    Resep
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab("resep-racikan")}
                    className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
                        activeTab === "resep-racikan"
                            ? "border-teal-600 text-teal-600 dark:border-teal-400 dark:text-teal-400"
                            : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                >
                    Resep Racikan
                </button>
            </div>

            {activeTab === "resep" && (
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Dokter Pembuat Resep - ditampilkan sesuai reg_periksa.kd_dokter (join dokter untuk nm_dokter) */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                <svg
                                    className="w-4 h-4 inline mr-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                Dokter Pembuat Resep
                            </label>
                            {loadingDokterPJ ? (
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    Memuat...
                                </span>
                            ) : dokterPJError ? (
                                <span className="text-xs text-red-600 dark:text-red-400">
                                    {dokterPJError}
                                </span>
                            ) : null}
                        </div>
                        <div className="mt-1 mb-3"></div>
                        {/* Tetap tampilkan dropdown untuk mengubah dokter jika diperlukan, default mengikuti reg_periksa */}
                        <select
                            value={selectedDokter || (initialDokter ? String(initialDokter) : "")}
                            onChange={(e) => setSelectedDokter(e.target.value)}
                            className="w-full py-2.5 px-3 rounded-lg border-2 border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:shadow-md transition-all"
                            required
                            disabled={loadingDokter}
                        >
                            {loadingDokter ? (
                                <option value="">Memuat dokter...</option>
                            ) : (
                                <>
                                    <option value="">Pilih Dokter</option>
                                    {dokterOptions.map((dokter) => {
                                        const kodeInit = initialDokter ? String(initialDokter) : "";
                                        const namaInit = initialDokterNama ? String(initialDokterNama) : "";
                                        const kode = String(dokter.kd_dokter);
                                        const label =
                                            kodeInit && namaInit && kode === kodeInit
                                                ? namaInit
                                                : dokter.nm_dokter;
                                        return (
                                            <option
                                                key={dokter.kd_dokter}
                                                value={dokter.kd_dokter}
                                            >
                                                {label}
                                            </option>
                                        );
                                    })}
                                </>
                            )}
                        </select>
                    </div>

                    {/* Input Resep Section */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                            Input Resep
                        </h4>

                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-4 mb-2">
                            <div className="col-span-5">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Nama Obat
                                </label>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Jml
                                </label>
                            </div>
                            <div className="col-span-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Aturan Pakai
                                </label>
                            </div>
                            <div className="col-span-1"></div>
                        </div>

                        {/* Items Rows */}
                        {items.map((item, index) => (
                            <div
                                key={item.id}
                                className="grid grid-cols-12 gap-4 items-start"
                            >
                                {/* Nama Obat */}
                                <div className="col-span-5 relative dropdown-container">
                                    <input
                                        type="text"
                                        value={item.namaObat}
                                        onChange={(e) => {
                                            updateItem(
                                                item.id,
                                                "namaObat",
                                                e.target.value
                                            );
                                            setSearchObat((prev) => ({
                                                ...prev,
                                                [item.id]: e.target.value,
                                            }));
                                            setShowDropdown((prev) => ({
                                                ...prev,
                                                [item.id]: true,
                                            }));
                                        }}
                                        onFocus={() => {
                                            setShowDropdown((prev) => ({
                                                ...prev,
                                                [item.id]: true,
                                            }));
                                            if (
                                                !searchObat[item.id] &&
                                                kdPoli
                                            ) {
                                                fetchObat();
                                            }
                                        }}
                                        className="w-full py-2.5 px-3 rounded-lg border-2 border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:shadow-md transition-all"
                                        placeholder="Pilih Obat"
                                        required
                                    />

                                    {/* Dropdown Autocomplete */}
                                    {showDropdown[item.id] && (
                                        <div className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                                            {loadingObat && (
                                                <div className="p-3 text-center text-gray-500 dark:text-gray-400 flex items-center justify-center">
                                                    <svg
                                                        className="animate-spin -ml-1 mr-2 h-4 w-4"
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
                                                    Mencari obat...
                                                </div>
                                            )}
                                            {!loadingObat &&
                                                obatOptions.length === 0 && (
                                                    <div className="p-3 text-center text-gray-500 dark:text-gray-400">
                                                        {!kdPoli
                                                            ? "Data poli tidak tersedia"
                                                            : searchObat[
                                                                  item.id
                                                              ] &&
                                                              searchObat[
                                                                  item.id
                                                              ].length >= 2
                                                            ? "Obat tidak ditemukan"
                                                            : "Ketik untuk mencari obat atau klik untuk melihat semua"}
                                                    </div>
                                                )}
                                            {!loadingObat &&
                                                obatOptions.length > 0 &&
                                                obatOptions.map((obat) => (
                                                    <div
                                                        key={obat.kode_brng}
                                                        className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b dark:border-gray-600 last:border-b-0 transition-colors"
                                                        onClick={() => {
                                                            selectObat(
                                                                item.id,
                                                                obat
                                                            );
                                                            setShowDropdown(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    [item.id]: false,
                                                                })
                                                            );
                                                        }}
                                                    >
                                                        <div className="flex items-start justify-between">
                                                            <div className="flex-1">
                                                                <div className="font-medium text-gray-900 dark:text-white text-sm">
                                                                    {
                                                                        obat.nama_brng
                                                                    }
                                                                </div>
                                                                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                                                        {
                                                                            obat.kode_brng
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                </div>

                                {/* Jumlah */}
                                <div className="col-span-2">
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.jumlah || ""}
                                        onChange={(e) => {
                                            const jumlah =
                                                parseInt(e.target.value) || "";
                                            updateItem(
                                                item.id,
                                                "jumlah",
                                                jumlah
                                            );
                                        }}
                                        className={`w-full py-2.5 px-3 rounded-lg border-2 shadow-sm focus:ring-2 focus:shadow-md transition-all ${
                                            item.jumlah > item.stokTersedia &&
                                            item.stokTersedia > 0
                                                ? "border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50 dark:bg-red-900/20 text-gray-900 dark:text-white"
                                                : "border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-green-500 focus:border-green-500"
                                        }`}
                                        placeholder={
                                            index === 0 ? "Jml" : "Jumlah"
                                        }
                                        max={item.stokTersedia || undefined}
                                        required
                                    />
                                </div>

                                {/* Aturan Pakai */}
                                <div className="col-span-4 relative dropdown-container">
                                    <input
                                        type="text"
                                        value={item.aturanPakai}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            updateItem(item.id, "aturanPakai", val);
                                            setSearchAturan((prev) => ({ ...prev, [item.id]: val }));
                                            setShowDropdownAturan((prev) => ({ ...prev, [item.id]: true }));
                                        }}
                                        onFocus={() => {
                                            setShowDropdownAturan((prev) => ({ ...prev, [item.id]: true }));
                                            if (!searchAturan[item.id]) fetchAturan();
                                        }}
                                        className="w-full py-2.5 px-3 rounded-lg border-2 border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:shadow-md transition-all"
                                        placeholder="Aturan Pakai"
                                        required
                                    />

                                    {showDropdownAturan[item.id] && (
                                        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                            {loadingAturan ? (
                                                <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">Memuat…</div>
                                            ) : (aturanOptions || []).length > 0 ? (
                                                (aturanOptions || []).map((opt, idx) => (
                                                    <div
                                                        key={idx}
                                                        onClick={() => {
                                                            updateItem(item.id, "aturanPakai", opt.aturan || "");
                                                            setShowDropdownAturan((prev) => ({ ...prev, [item.id]: false }));
                                                        }}
                                                        className="px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-0"
                                                    >
                                                        <div className="text-sm text-gray-900 dark:text-white">{opt.aturan}</div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">Tidak ada data</div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Tombol Hapus - hanya untuk baris kedua dan seterusnya */}
                                <div className="col-span-1 flex justify-end">
                                    {index > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => removeItem(item.id)}
                                            className="inline-flex items-center justify-center w-8 h-8 rounded text-white bg-red-500 hover:bg-red-600 transition-colors"
                                            title="Hapus baris"
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
                                                    d="M20 12H4"
                                                />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        {/* Tombol Tambah Baris - Hijau dengan ikon + */}
                        <button
                            type="button"
                            onClick={addItem}
                            className="inline-flex items-center justify-center w-12 h-12 rounded-lg text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                            title="Tambah baris"
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
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                            </svg>
                        </button>

                        {/* Tombol Simpan - Biru */}
                        <button
                            type="submit"
                            disabled={isSubmitting || items.length === 0}
                            className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg
                                        className="animate-spin -ml-1 mr-2 h-4 w-4"
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
                                    Menyimpan...
                                </>
                            ) : (
                                "Simpan"
                            )}
                        </button>
                    </div>
                </form>
            )}

            {activeTab === "resep-racikan" && (
                <form onSubmit={async (e) => { e.preventDefault(); await handleSubmitRacikan(); }} className="space-y-6 p-4 md:p-6">
                    <div className="flex items-center justify-between">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">Resep Racikan</h4>
                        <div className="flex items-center gap-2">
                            <button type="button" onClick={() => { setShowTemplateModal(true); fetchTemplates(); }} className="inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-600">Pilih Template</button>
                            <button type="button" onClick={() => addRacikanGroup()} className="inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-600">Tambah Racikan</button>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="grid grid-cols-12 gap-2">
                            <div className="col-span-3 text-xs">Nama Racikan</div>
                            <div className="col-span-3 text-xs">Metode</div>
                            <div className="col-span-2 text-xs">Jumlah Dosis</div>
                            <div className="col-span-3 text-xs">Aturan Pakai</div>
                            <div className="col-span-1"></div>
                        </div>
                        {racikanGroups.length === 0 ? (
                            <div className="text-sm text-gray-600 dark:text-gray-400">Belum ada racikan. Tambahkan racikan.</div>
                        ) : (
                            racikanGroups.map((grp) => (
                                <div key={grp.id} className={`grid grid-cols-12 gap-2 items-center ${activeRacikId === grp.id ? 'bg-gray-50 dark:bg-gray-800' : ''} p-2 rounded`}>
                                    <div className="col-span-3">
                                        <input type="text" value={grp.nama_racik} onChange={(e) => updateRacikanGroup(grp.id, 'nama_racik', e.target.value)} className="w-full py-2.5 px-3 rounded-lg border-2 border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="Nama racikan" />
                                    </div>
                                    <div className="col-span-3">
                                        <select value={grp.kd_racik} onChange={(e) => updateRacikanGroup(grp.id, 'kd_racik', e.target.value)} className="w-full py-2.5 px-3 rounded-lg border-2 border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                                            <option value="">Pilih metode</option>
                                            {metodeRacikOptions.map((opt) => (
                                                <option key={opt.kd_racik} value={opt.kd_racik}>{opt.nm_racik}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <input type="number" min="0" value={grp.jml_dr || ''} onChange={(e) => updateRacikanGroup(grp.id, 'jml_dr', parseInt(e.target.value) || '')} className="w-full py-2.5 px-3 rounded-lg border-2 border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="Jml dosis" />
                                    </div>
                                    <div className="col-span-3 relative dropdown-container">
                                        <input type="text" value={grp.aturan_pakai || ''} onChange={(e) => { updateRacikanGroup(grp.id, 'aturan_pakai', e.target.value); setSearchAturan((prev) => ({ ...prev, ['grp-' + grp.id]: e.target.value })); setShowDropdownAturan((prev) => ({ ...prev, ['grp-' + grp.id]: true })); }} onFocus={() => { setShowDropdownAturan((prev) => ({ ...prev, ['grp-' + grp.id]: true })); if (!searchAturan['grp-' + grp.id]) fetchAturan(); }} className="w-full py-2.5 px-3 rounded-lg border-2 border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="Aturan Pakai" />
                                        {showDropdownAturan['grp-' + grp.id] && (
                                            <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                                {loadingAturan ? (
                                                    <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">Memuat…</div>
                                                ) : (aturanOptions || []).length > 0 ? (
                                                    (aturanOptions || []).map((opt, idx) => (
                                                        <div key={idx} onClick={() => { updateRacikanGroup(grp.id, 'aturan_pakai', opt.aturan || ''); setShowDropdownAturan((prev) => ({ ...prev, ['grp-' + grp.id]: false })); }} className="px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-0">
                                                            <div className="text-sm text-gray-900 dark:text-white">{opt.aturan}</div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">Tidak ada data</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-span-1 flex justify-end gap-2">
                                        <button type="button" onClick={() => handleSaveAsTemplate(grp)} disabled={isSavingTemplate} className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 dark:border-gray-600" title="Simpan sebagai template">★</button>
                                        <button type="button" onClick={() => removeRacikanGroup(grp.id)} className="inline-flex items-center justify-center w-8 h-8 rounded bg-red-500 text-white">−</button>
                                    </div>
                                    <div className="col-span-12">
                                        <input type="text" value={grp.keterangan || ''} onChange={(e) => updateRacikanGroup(grp.id, 'keterangan', e.target.value)} className="w-full py-2.5 px-3 rounded-lg border-2 border-dashed border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="Keterangan (opsional)" />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {activeRacikId && (
                        <div className="border rounded-lg">
                            <div className="px-3 py-2 flex items-center justify-between">
                                <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">Bahan Racikan</div>
                                <button type="button" onClick={() => addRacikanItem(activeRacikId)} className="inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-600">Tambah Bahan</button>
                            </div>
                            <div className="p-3 space-y-2">
                                <div className="grid grid-cols-12 gap-2">
                                    <div className="col-span-4 text-[11px]">Nama Bahan</div>
                                    <div className="col-span-1 text-[11px]">P1</div>
                                    <div className="col-span-1 text-[11px]">P2</div>
                                    <div className="col-span-2 text-[11px]">Kandungan (mg)</div>
                                    <div className="col-span-1 text-[11px]">Kapasitas</div>
                                    <div className="col-span-1 text-[11px]">Jml</div>
                                    <div className="col-span-1 text-[11px]">Satuan</div>
                                    <div className="col-span-1"></div>
                                </div>
                                {(racikanGroups.find((g) => g.id === activeRacikId)?.items || []).map((it) => (
                                    <div key={it.id} className="grid grid-cols-12 gap-2 items-start">
                                        <div className="col-span-4 relative dropdown-container">
                                            <input type="text" value={it.nama_brng || ''} onChange={(e) => { updateRacikanItem(activeRacikId, it.id, 'nama_brng', e.target.value); setRacikSearchObat((prev) => ({ ...prev, [it.id]: e.target.value })); setRacikDropdownObat((prev) => ({ ...prev, [it.id]: true })); }} onFocus={() => { setRacikDropdownObat((prev) => ({ ...prev, [it.id]: true })); if (!racikSearchObat[it.id] && kdPoli) fetchObat(); }} className="w-full py-2.5 px-3 rounded-lg border-2 border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="Pilih Bahan" />
                                            {racikDropdownObat[it.id] && (
                                                <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                                    {(obatOptions || [])
                                                        .filter((obat) => {
                                                            const term = (racikSearchObat[it.id] || '').toLowerCase();
                                                            if (!term) return true;
                                                            const nama = (obat.nama_brng || '').toLowerCase();
                                                            const kode = (obat.kode_brng || '').toLowerCase();
                                                            return nama.includes(term) || kode.includes(term);
                                                        })
                                                        .map((obat, idx) => (
                                                            <div key={idx} onClick={() => selectRacikanObat(activeRacikId, it.id, obat)} className="px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-0">
                                                                <div className="text-sm text-gray-900 dark:text-white">{obat.nama_brng}</div>
                                                                <div className="text-xs text-gray-500 dark:text-gray-400">{obat.kode_brng}</div>
                                                            </div>
                                                        ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-span-1">
                                            <input type="number" value={it.p1 || 0} onChange={(e) => updateRacikanItem(activeRacikId, it.id, 'p1', parseFloat(e.target.value) || 0)} className="w-full py-2.5 px-3 rounded-lg border-2 border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                                        </div>
                                        <div className="col-span-1">
                                            <input type="number" value={it.p2 || 0} onChange={(e) => updateRacikanItem(activeRacikId, it.id, 'p2', parseFloat(e.target.value) || 0)} className="w-full py-2.5 px-3 rounded-lg border-2 border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                                        </div>
                                        <div className="col-span-2">
                                            <input type="number" value={it.kandungan || 0} onChange={(e) => updateRacikanItem(activeRacikId, it.id, 'kandungan', parseFloat(e.target.value) || 0)} className="w-full py-2.5 px-3 rounded-lg border-2 border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                                        </div>
                                        <div className="col-span-1">
                                            <input type="number" value={it.kapasitas || 0} onChange={(e) => updateRacikanItem(activeRacikId, it.id, 'kapasitas', parseFloat(e.target.value) || 0)} className="w-full py-2.5 px-3 rounded-lg border-2 border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                                        </div>
                                        <div className="col-span-1">
                                            <input type="number" value={it.jml || 0} onChange={(e) => updateRacikanItem(activeRacikId, it.id, 'jml', parseFloat(e.target.value) || 0)} className="w-full py-2.5 px-3 rounded-lg border-2 border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                                        </div>
                                        <div className="col-span-1">
                                            <input type="text" value={it.satuan || ''} onChange={(e) => updateRacikanItem(activeRacikId, it.id, 'satuan', e.target.value)} className="w-full py-2.5 px-3 rounded-lg border-2 border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                                        </div>
                                        <div className="col-span-1 flex justify-end">
                                            <button type="button" onClick={() => removeRacikanItem(activeRacikId, it.id)} className="inline-flex items-center justify-center w-8 h-8 rounded bg-red-500 text-white">−</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-end gap-2">
                        <button type="submit" disabled={isSubmittingRacikan || racikanGroups.length === 0} className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed">{isSubmittingRacikan ? 'Menyimpan…' : 'Simpan Racikan'}</button>
                    </div>
                </form>
            )}

            {showTemplateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                            <div className="text-lg font-bold text-gray-900 dark:text-white">Pilih Template Racikan</div>
                            <button type="button" onClick={() => setShowTemplateModal(false)} className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600">✕</button>
                        </div>
                        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                            {loadingTemplates ? (
                                <div className="text-center text-sm text-gray-600 dark:text-gray-300">Memuat daftar template…</div>
                            ) : templates.length === 0 ? (
                                <div className="text-center text-sm text-gray-600 dark:text-gray-300">Belum ada template racikan</div>
                            ) : (
                                <>
                                    <input type="text" value={templateQuery} onChange={(e) => setTemplateQuery(e.target.value)} placeholder="Cari template" className="w-full py-2 px-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                                    <div className="border rounded-md overflow-hidden">
                                        <div className="hidden md:grid grid-cols-4 gap-2 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs border-b border-gray-200 dark:border-gray-600">
                                            <div className="px-3 py-2">Nama racikan</div>
                                            <div className="px-3 py-2">Dosis</div>
                                            <div className="px-3 py-2">Aturan Pakai</div>
                                            <div className="px-3 py-2">Keterangan</div>
                                        </div>
                                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {templates
                                                .filter((tpl) => {
                                                    const q = (templateQuery || '').toLowerCase();
                                                    if (!q) return true;
                                                    const fields = [tpl.nama_racik, tpl.jml_dr, tpl.aturan_pakai, tpl.keterangan];
                                                    return fields.some((v) => String(v ?? '').toLowerCase().includes(q));
                                                })
                                                .map((tpl) => (
                                                    <button key={tpl.no_template} onClick={() => loadTemplate(tpl)} className="w-full text-left hover:bg-gray-50 dark:hover:bg-gray-700">
                                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 px-3 py-2">
                                                            <div className="text-sm text-gray-800 dark:text-gray-100">
                                                                <div className="md:hidden text-[11px] text-gray-500 dark:text-gray-400">Nama racikan</div>
                                                                <div className="truncate font-medium">{tpl.nama_racik}</div>
                                                            </div>
                                                            <div className="text-sm text-gray-800 dark:text-gray-100">
                                                                <div className="md:hidden text-[11px] text-gray-500 dark:text-gray-400">Dosis</div>
                                                                <div className="truncate">{tpl.jml_dr}</div>
                                                            </div>
                                                            <div className="text-sm text-gray-800 dark:text-gray-100">
                                                                <div className="md:hidden text-[11px] text-gray-500 dark:text-gray-400">Aturan Pakai</div>
                                                                <div className="truncate">{tpl.aturan_pakai || '-'}</div>
                                                            </div>
                                                            <div className="text-sm text-gray-800 dark:text-gray-100">
                                                                <div className="md:hidden text-[11px] text-gray-500 dark:text-gray-400">Keterangan</div>
                                                                <div className="truncate">{tpl.keterangan || '-'}</div>
                                                            </div>
                                                        </div>
                                                    </button>
                                                ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                            <button type="button" onClick={() => setShowTemplateModal(false)} className="px-4 py-2 text-sm font-medium rounded border border-gray-300 dark:border-gray-600">Tutup</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Kontrol tampil/sembunyi Riwayat Resep */}
            <div className="mt-6 px-4 md:px-6">
                <button
                    type="button"
                    onClick={() => setShowRiwayatResep((v) => !v)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-300/60 dark:border-gray-600/60 bg-white dark:bg-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                    {showRiwayatResep ? (
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
                                d="M5 15l7-7 7 7"
                            />
                        </svg>
                    ) : (
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
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    )}
                    {showRiwayatResep
                        ? "Sembunyikan Riwayat Resep"
                        : "Tampilkan Riwayat Resep"}
                </button>
            </div>

            {/* Tampilan Riwayat Resep */}
            {showRiwayatResep && (
                <div className="mt-6 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
                            <svg
                                className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            Riwayat Resep
                        </h3>
                    </div>

                    {loadingRiwayat ? (
                        <div className="flex items-center justify-center py-8">
                            <svg
                                className="animate-spin h-8 w-8 text-blue-600"
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
                            <span className="ml-2 text-gray-600 dark:text-gray-400">
                                Memuat riwayat resep...
                            </span>
                        </div>
                    ) : riwayatResep.length === 0 ? (
                        <div className="text-center py-8">
                            <svg
                                className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4"
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
                            <p className="text-gray-500 dark:text-gray-400">
                                Belum ada riwayat resep untuk pasien ini
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {riwayatResep.map((resep, index) => (
                                <div
                                    key={index}
                                    className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                                            <div>
                                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                    No. Resep:
                                                </span>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                    {resep.no_resep}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                    Tanggal:
                                                </span>
                                                <p className="text-sm text-gray-900 dark:text-white">
                                                    {new Date(
                                                        resep.tgl_peresepan
                                                    ).toLocaleDateString(
                                                        "id-ID"
                                                    )}{" "}
                                                    {resep.jam_peresepan}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                    Dokter:
                                                </span>
                                                <p className="text-sm text-gray-900 dark:text-white">
                                                    {resep.nama_dokter ||
                                                        "Tidak diketahui"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex gap-2">
                                            <button
                                                onClick={() =>
                                                    handleCopyResep(resep)
                                                }
                                                className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200 flex items-center gap-1"
                                                title="Copy Resep"
                                            >
                                                <svg
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                    />
                                                </svg>
                                                Copy
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handlePenyerahan(resep)
                                                }
                                                disabled={
                                                    !!resep.tgl_penyerahan ||
                                                    penyerahanLoading[
                                                        resep.no_resep
                                                    ]
                                                }
                                                className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 flex items-center gap-1 ${
                                                    resep.tgl_penyerahan
                                                        ? "bg-green-100 text-green-700 cursor-not-allowed"
                                                        : penyerahanLoading[
                                                              resep.no_resep
                                                          ]
                                                        ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                                                        : "bg-green-500 hover:bg-green-600 text-white"
                                                }`}
                                                title={
                                                    resep.tgl_penyerahan
                                                        ? "Sudah diserahkan"
                                                        : "Penyerahan Obat"
                                                }
                                            >
                                                {penyerahanLoading[
                                                    resep.no_resep
                                                ] ? (
                                                    <>
                                                        <svg
                                                            className="animate-spin h-4 w-4"
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
                                                        Memproses...
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg
                                                            className="h-4 w-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                        Penyerahan
                                                    </>
                                                )}
                                            </button>
                                            <button
                                                onClick={() =>
                                                    deleteResep(resep)
                                                }
                                                disabled={
                                                    deletingResep ===
                                                    `${resep.tgl_peresepan}_${resep.jam_peresepan}`
                                                }
                                                className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white rounded-md transition-colors duration-200 flex items-center gap-1"
                                                title="Hapus Resep"
                                            >
                                                {deletingResep ===
                                                `${resep.tgl_peresepan}_${resep.jam_peresepan}` ? (
                                                    <>
                                                        <svg
                                                            className="animate-spin h-4 w-4"
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
                                                        Menghapus...
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg
                                                            className="h-4 w-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                            />
                                                        </svg>
                                                        Hapus
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    {/* Status Penyerahan */}
                                    <div className="mt-2">
                                        {resep.tgl_penyerahan ? (
                                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                                Sudah diserahkan:{" "}
                                                {new Date(
                                                    resep.tgl_penyerahan
                                                ).toLocaleDateString(
                                                    "id-ID"
                                                )}{" "}
                                                {resep.jam_penyerahan}
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                                                Belum diserahkan
                                            </span>
                                        )}
                                    </div>

                                    {resep.detail_obat &&
                                        resep.detail_obat.length > 0 && (
                                            <div>
                                                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Obat yang diresepkan:
                                                </h5>
                                                <div className="overflow-x-auto">
                                                    <table className="min-w-full text-sm">
                                                        <thead className="bg-gray-50 dark:bg-gray-700">
                                                            <tr>
                                                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                                    Obat
                                                                </th>
                                                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                                    Aturan Pakai
                                                                </th>
                                                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                                    Jumlah
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                                                            {resep.detail_obat.map(
                                                                (
                                                                    obat,
                                                                    obatIndex
                                                                ) => (
                                                                    <tr
                                                                        key={
                                                                            obatIndex
                                                                        }
                                                                    >
                                                                        <td className="px-3 py-2 text-sm text-gray-900 dark:text-white">
                                                                            <div>
                                                                                <div className="font-medium">
                                                                                    {obat.nama_brng ||
                                                                                        obat.kode_brng}
                                                                                </div>
                                                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                                    {
                                                                                        obat.kode_brng
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="px-3 py-2 text-sm text-gray-900 dark:text-white">
                                                                            {formatAturanPakai(obat.aturan_pakai)}
                                                                        </td>
                                                                        <td className="px-3 py-2 text-sm text-gray-900 dark:text-white text-center">
                                                                            {
                                                                                obat.jml
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                        </tbody>
                                                    </table>
                        </div>
                    </div>
                                        )}
                                        {Array.isArray(resep.racikan) && resep.racikan.length > 0 && (
                                            <div className="mt-3">
                                                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Detail Racikan</h5>
                                                <div className="space-y-3">
                                                    {resep.racikan.map((grp, gidx) => (
                                                        <div key={gidx} className="border border-gray-200 dark:border-gray-600 rounded-md">
                                                            <div className="px-3 py-2 bg-gray-50 dark:bg-gray-700/50 flex items-center justify-between">
                                                                <div className="text-xs">
                                                                    <div className="font-semibold text-gray-800 dark:text-gray-200">{grp.nama_racik ? grp.nama_racik : `Racikan #${grp.no_racik}`}</div>
                                                                    <div className="text-gray-600 dark:text-gray-400">Metode: {grp.metode || grp.kd_racik || '-'} • Jumlah dosis: {grp.jml_dr}</div>
                                                                    {grp.aturan_pakai && (<div className="text-gray-600 dark:text-gray-400">Aturan pakai: {formatAturanPakai(grp.aturan_pakai)}</div>)}
                                                                    {grp.keterangan && (<div className="text-gray-600 dark:text-gray-400">Keterangan: {grp.keterangan}</div>)}
                                                                </div>
                                                            </div>
                                                            <div className="overflow-x-auto p-3">
                                                                <table className="min-w-full border border-gray-200 dark:border-gray-600 text-xs">
                                                                    <thead className="bg-gray-100 dark:bg-gray-700">
                                                                        <tr>
                                                                            <th className="px-3 py-2 text-left">Kode</th>
                                                                            <th className="px-3 py-2 text-left">Nama</th>
                                                                            <th className="px-3 py-2 text-center">Jml</th>
                                                                            <th className="px-3 py-2 text-center">Kandungan</th>
                                                                            <th className="px-3 py-2 text-left">Satuan</th>
                                                                            <th className="px-3 py-2 text-right">Tarif</th>
                                                                            <th className="px-3 py-2 text-right">Subtotal</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {(grp.details || []).map((d, didx) => (
                                                                            <tr key={didx} className="border-t border-gray-200 dark:border-gray-600">
                                                                                <td className="px-3 py-2">{d.kode_brng}</td>
                                                                                <td className="px-3 py-2">{d.nama_brng}</td>
                                                                                <td className="px-3 py-2 text-center">{d.jml}</td>
                                                                                <td className="px-3 py-2 text-center">{d.kandungan}</td>
                                                                                <td className="px-3 py-2">{d.satuan}</td>
                                                                                <td className="px-3 py-2 text-right">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(d.tarif || 0)}</td>
                                                                                <td className="px-3 py-2 text-right">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(d.subtotal || 0)}</td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                    <tfoot className="bg-gray-100 dark:bg-gray-700">
                                                                        <tr>
                                                                            <td colSpan="6" className="px-3 py-2 text-right font-semibold">Subtotal Racikan:</td>
                                                                            <td className="px-3 py-2 text-right font-semibold">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format((grp.details || []).reduce((s, i) => s + (i.subtotal || 0), 0))}</td>
                                                                        </tr>
                                                                    </tfoot>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Tombol Load More */}
                    {hasMoreResep && (
                        <div className="mt-4 text-center">
                            <button
                                onClick={loadMoreResep}
                                disabled={loadingMore}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors duration-200 flex items-center justify-center mx-auto gap-2"
                            >
                                {loadingMore ? (
                                    <>
                                        <svg
                                            className="animate-spin h-4 w-4"
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
                                        Memuat...
                                    </>
                                ) : (
                                    <>
                                        <svg
                                            className="h-4 w-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                        Muat Lebih Banyak
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Tampilan Data Resep yang Sudah Disimpan */}
            {showSavedResep && savedResep && (
                <div className="mt-6 bg-gray-50 p-4 rounded-lg border">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Data Resep Tersimpan
                        </h3>
                        <button
                            onClick={() => setShowSavedResep(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="bg-white p-4 rounded border">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <strong>No. Resep:</strong>{" "}
                                {savedResep.no_resep}
                            </div>
                            <div>
                                <strong>Tanggal:</strong>{" "}
                                {(() => {
                                    const tz = getAppTimeZone();
                                    return new Date(
                                        savedResep.tgl_peresepan
                                    ).toLocaleDateString("id-ID", {
                                        timeZone: tz,
                                    });
                                })()}
                            </div>
                            <div>
                                <strong>Jam:</strong> {savedResep.jam_peresepan}
                            </div>
                            <div>
                                <strong>No. Rawat:</strong>{" "}
                                {savedResep.no_rawat}
                            </div>
                            <div>
                                <strong>Dokter:</strong>{" "}
                                {savedResep.nama_dokter ||
                                    "Dokter tidak ditemukan"}
                            </div>
                            <div>
                                <strong>Status:</strong> {savedResep.status}
                            </div>
                            <div className="col-span-2">
                                <strong>Penyerahan:</strong>{" "}
                                {savedResep.tgl_penyerahan ? (
                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                                        {new Date(
                                            savedResep.tgl_penyerahan
                                        ).toLocaleDateString("id-ID")}{" "}
                                        {savedResep.jam_penyerahan}
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                        Belum diserahkan
                                    </span>
                                )}
                            </div>
                            {!savedResep.tgl_penyerahan && (
                                <div className="col-span-2 flex justify-end">
                                    <button
                                        onClick={() =>
                                            handlePenyerahan(savedResep)
                                        }
                                        disabled={
                                            penyerahanLoading[
                                                savedResep.no_resep
                                            ]
                                        }
                                        className={`px-4 py-2 text-sm rounded-md transition-colors duration-200 flex items-center gap-2 ${
                                            penyerahanLoading[
                                                savedResep.no_resep
                                            ]
                                                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                                                : "bg-green-600 hover:bg-green-700 text-white"
                                        }`}
                                    >
                                        {penyerahanLoading[
                                            savedResep.no_resep
                                        ] ? (
                                            <>
                                                <svg
                                                    className="animate-spin h-4 w-4"
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
                                                Memproses Penyerahan...
                                            </>
                                        ) : (
                                            <>
                                                <svg
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                Penyerahan Obat
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>

                        <h4 className="font-semibold mb-3">Detail Obat:</h4>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-300">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border border-gray-300 px-3 py-2 text-left">
                                            Kode Obat
                                        </th>
                                        <th className="border border-gray-300 px-3 py-2 text-left">
                                            Nama Obat
                                        </th>
                                        <th className="border border-gray-300 px-3 py-2 text-left">
                                            Aturan Pakai
                                        </th>
                                        <th className="border border-gray-300 px-3 py-2 text-center">
                                            Jumlah
                                        </th>
                                        <th className="border border-gray-300 px-3 py-2 text-right">
                                            Harga
                                        </th>
                                        <th className="border border-gray-300 px-3 py-2 text-right">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {savedResep.detail_obat &&
                                        savedResep.detail_obat.map(
                                            (item, index) => (
                                                <tr
                                                    key={index}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="border border-gray-300 px-3 py-2">
                                                        {item.kode_brng}
                                                    </td>
                                                    <td className="border border-gray-300 px-3 py-2">
                                                        {item.nama_brng || "-"}
                                                    </td>
                                                    <td className="border border-gray-300 px-3 py-2">
                                                        {formatAturanPakai(item.aturan_pakai)}
                                                    </td>
                                                    <td className="border border-gray-300 px-3 py-2 text-center">
                                                        {item.jml} {item.satuan}
                                                    </td>
                                                    <td className="border border-gray-300 px-3 py-2 text-right">
                                                        {new Intl.NumberFormat(
                                                            "id-ID",
                                                            {
                                                                style: "currency",
                                                                currency: "IDR",
                                                            }
                                                        ).format(
                                                            item.harga || 0
                                                        )}
                                                    </td>
                                                    <td className="border border-gray-300 px-3 py-2 text-right">
                                                        {new Intl.NumberFormat(
                                                            "id-ID",
                                                            {
                                                                style: "currency",
                                                                currency: "IDR",
                                                            }
                                                        ).format(
                                                            (item.jml || 0) *
                                                                (item.harga ||
                                                                    0)
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                </tbody>
                                <tfoot className="bg-gray-100">
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="border border-gray-300 px-3 py-2 text-right font-semibold"
                                        >
                                            Total Keseluruhan:
                                        </td>
                                        <td className="border border-gray-300 px-3 py-2 text-right font-semibold">
                                            {savedResep.detail_obat &&
                                                new Intl.NumberFormat("id-ID", {
                                                    style: "currency",
                                                    currency: "IDR",
                                                }).format(
                                                    savedResep.detail_obat.reduce(
                                                        (total, item) =>
                                                            total +
                                                            (item.jml || 0) *
                                                                (item.harga ||
                                                                    0),
                                                        0
                                                    )
                                                )}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        {Array.isArray(savedResep.racikan) && savedResep.racikan.length > 0 && (
                            <div className="mt-6">
                                <div className="text-sm font-medium mb-2">Detail Obat Racikan</div>
                                {savedResep.racikan.map((grp, gidx) => (
                                    <div key={gidx} className="mb-6">
                                        <div className="flex items-center justify-between text-sm bg-gray-50 border p-3 rounded">
                                            <div>
                                                <div className="font-semibold">{grp.nama_racik || `Racikan #${grp.no_racik}`}</div>
                                                <div className="text-gray-600">Metode: {grp.metode || '-'}</div>
                                            </div>
                                            <div className="text-right">
                                                <div>Jumlah Racikan: {grp.jml_dr ?? '-'}</div>
                                                <div>Aturan Pakai: {grp.aturan_pakai || '-'}</div>
                                            </div>
                                        </div>
                                        <div className="overflow-x-auto mt-2">
                                            <table className="w-full border-collapse border border-gray-200 text-sm">
                                                <thead>
                                                    <tr className="bg-gray-100">
                                                        <th className="border px-3 py-2 text-left">Kode</th>
                                                        <th className="border px-3 py-2 text-left">Nama Obat</th>
                                                        <th className="border px-3 py-2 text-left">Satuan</th>
                                                        <th className="border px-3 py-2 text-right">Tarif</th>
                                                        <th className="border px-3 py-2 text-right">Jumlah</th>
                                                        <th className="border px-3 py-2 text-left">Kandungan</th>
                                                        <th className="border px-3 py-2 text-right">Subtotal</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {(grp.details || []).length === 0 ? (
                                                        <tr>
                                                            <td colSpan={7} className="border px-3 py-4 text-center text-gray-500">Tidak ada detail racikan.</td>
                                                        </tr>
                                                    ) : (
                                                        (grp.details || []).map((d, idx) => (
                                                            <tr key={d.kode_brng || idx}>
                                                                <td className="border px-3 py-2 font-mono">{d.kode_brng}</td>
                                                                <td className="border px-3 py-2">{d.nama_brng || '-'}</td>
                                                                <td className="border px-3 py-2">{d.satuan || '-'}</td>
                                                                <td className="border px-3 py-2 text-right">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(d.tarif || 0))}</td>
                                                                <td className="border px-3 py-2 text-right">{d.jml}</td>
                                                                <td className="border px-3 py-2">{d.kandungan ?? '-'}</td>
                                                                <td className="border px-3 py-2 text-right">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(d.subtotal || (Number(d.tarif || 0) * Number(d.jml || 0))))}</td>
                                                            </tr>
                                                        ))
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        </div>
                    </div>
            )}

            {/* Copy Resep Modal */}
            <CopyResep
                isOpen={showCopyModal}
                onClose={handleCloseCopyModal}
                resepData={selectedResepForCopy}
                token={token}
                noRkmMedis={noRkmMedis}
                noRawat={noRawat}
                kdPoli={kdPoli}
                onResepSaved={handleResepSaved}
            />
        </div>
    );
}
