import React, { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import SidebarFarmasi from "@/Layouts/SidebarFarmasi";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/Card";
import Button from "@/Components/ui/Button";
import Input from "@/Components/ui/Input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/Components/ui/Select";
import { Filter, Search, Eye, Pill, Printer, Loader2, Inbox, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import QRCode from "qrcode";

// Custom SelectValue yang menampilkan label berdasarkan value
const CustomSelectValue = ({ placeholder, selectedValue, getLabel, value }) => {
    const currentValue = selectedValue || value;
    const displayValue = currentValue && getLabel ? getLabel(currentValue) : currentValue;
    return (
        <span className="block truncate">
            {displayValue || placeholder}
        </span>
    );
};

/**
 * Daftar Permintaan Resep
 *
 * Catatan:
 * - Backend saat ini belum memiliki endpoint daftar global, jadi halaman ini menyediakan pencarian berdasarkan no_rawat atau no_rkm_medis.
 * - Untuk no_rawat gunakan GET /api/resep/rawat/{no_rawat}
 * - Untuk no_rkm_medis gunakan GET /api/resep/pasien/{no_rkm_medis}?limit=N
 * - Kolom Validasi belum tersedia di model saat ini; yang ditampilkan adalah status penyerahan.
 */
const DaftarPermintaanResep = () => {
    // Helper untuk mendapatkan tanggal hari ini dalam format YYYY-MM-DD
    // Menggunakan timezone Asia/Jakarta (UTC+7)
    const todayStr = () => {
        try {
            return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Jakarta' });
        } catch {
            // Fallback jika toLocaleDateString tidak didukung
            const now = new Date();
            const formatter = new Intl.DateTimeFormat('en-CA', {
                timeZone: 'Asia/Jakarta',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            return formatter.format(now);
        }
    };
    
    

    // Helper untuk mendapatkan label berdasarkan value
    const getJenisLabel = (value) => {
        const map = {
            ralan: "Rawat Jalan",
            ranap: "Rawat Inap",
        };
        return map[value] || value;
    };

    const getStatusTerlayaniLabel = (value) => {
        return value || "Pilih status";
    };

    const [filters, setFilters] = useState({
        jenis: "ralan",
        start_date: todayStr(),
        end_date: todayStr(),
        dokter: "",
        poli: "",
        // mengikuti pola Java: filter status terlayani (Semua/Belum/Sudah)
        status_perawatan: "Belum Terlayani",
        // pencarian bebas
        q: "",
        // parameter tambahan untuk ranap
        kd_bangsal: "",
        kd_depo: "",
        // pencarian langsung
        no_rawat: "",
        no_rkm_medis: "",
        // paginasi sederhana
        limit: 20,
        page: 1,
    });
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [filtersOpen, setFiltersOpen] = useState(false);
    // State untuk informasi pagination dari backend
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 20,
        has_more: false,
    });
    const [selectedResep, setSelectedResep] = useState(null);
    const [showDetail, setShowDetail] = useState(false);
    const [saving, setSaving] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    // Context tambahan untuk modal detail (mis. kd_poli/kd_bangsal dari baris daftar)
    const [detailContext, setDetailContext] = useState({
        kd_poli: "",
        kd_bangsal: "",
        nm_pasien: "",
        no_rkm_medis: "",
    });
    // Cache stok info per item obat (map: kode_brng -> {loading, data, error, expanded})
    const [stokInfoMap, setStokInfoMap] = useState({});

    useEffect(() => {
        // Restore last used filters
        try {
            const saved = localStorage.getItem("permintaanResepFilters");
            const today = todayStr();
            
            if (saved) {
                const parsedFilters = JSON.parse(saved);
                // Selalu gunakan tanggal hari ini untuk start_date dan end_date
                // Ini memastikan filter selalu menggunakan tanggal terkini
                parsedFilters.start_date = today;
                parsedFilters.end_date = today;
                setFilters(parsedFilters);
            } else {
                // Jika tidak ada saved filters, set default dengan tanggal hari ini
                setFilters(prev => ({
                    ...prev,
                    start_date: today,
                    end_date: today
                }));
            }
        } catch {
            // Jika error, set default dengan tanggal hari ini
            const today = todayStr();
            setFilters(prev => ({
                ...prev,
                start_date: today,
                end_date: today
            }));
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(
                "permintaanResepFilters",
                JSON.stringify(filters)
            );
        } catch {}
    }, [filters]);

    const handleFilterChange = (key, value) => {
        setError("");
        // Reset ke halaman 1 jika filter berubah (kecuali jika yang diubah adalah page)
        if (key !== "page") {
            setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
        } else {
            setFilters((prev) => ({ ...prev, [key]: value }));
        }
    };

    const fetchByNoRawat = async () => {
        setLoading(true);
        setError("");
        try {
            const params = new URLSearchParams({
                no_rawat: String(filters.no_rawat || ""),
            });
            const resp = await fetch(`/api/resep/rawat?${params}`);
            const json = await resp.json();
            if (!json.success) {
                throw new Error(json.message || "Gagal memuat data resep");
            }
            // API mengembalikan array resep untuk no_rawat tersebut
            const dataArray = json.data || [];
            setData(dataArray);
            // Set pagination untuk pencarian no_rawat (biasanya hanya 1 atau beberapa resep)
            setPagination({
                total: dataArray.length,
                page: 1,
                limit: dataArray.length || 20,
                has_more: false,
            });
        } catch (e) {
            setError(e.message);
            setData([]);
            setPagination({
                total: 0,
                page: 1,
                limit: filters.limit || 20,
                has_more: false,
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchByNoRkmMedis = async () => {
        setLoading(true);
        setError("");
        try {
            const params = new URLSearchParams({
                limit: String(filters.limit || 20),
                offset: String((filters.page - 1) * (filters.limit || 20)),
            });
            const resp = await fetch(
                `/api/resep/pasien/${encodeURIComponent(
                    filters.no_rkm_medis
                )}?${params}`
            );
            const json = await resp.json();
            if (!json.success) {
                throw new Error(
                    json.message || "Gagal memuat data resep pasien"
                );
            }
            setData(json.data || []);
            // Set pagination dari response backend
            setPagination({
                total: json.total || 0,
                page: filters.page || 1,
                limit: filters.limit || 20,
                has_more: json.has_more || false,
            });
        } catch (e) {
            setError(e.message);
            setData([]);
            setPagination({
                total: 0,
                page: 1,
                limit: filters.limit || 20,
                has_more: false,
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchList = async () => {
        setLoading(true);
        setError("");
        try {
            const params = new URLSearchParams({
                start_date: filters.start_date,
                end_date: filters.end_date,
                jenis: filters.jenis,
                limit: String(filters.limit || 10),
                page: String(filters.page || 1),
            });
            if (filters.dokter) params.set("dokter", filters.dokter);
            if (filters.poli) params.set("poli", filters.poli);
            if (filters.q) params.set("q", filters.q);
            // status_perawatan: kirim hanya jika bukan "Semua"
            if (
                filters.status_perawatan &&
                filters.status_perawatan !== "Semua"
            ) {
                params.set(
                    "status_perawatan",
                    filters.status_perawatan === "Belum Terlayani"
                        ? "Belum"
                        : "Sudah"
                );
            }
            // opsi khusus ranap
            if (filters.kd_bangsal)
                params.set("kd_bangsal", filters.kd_bangsal);
            if (filters.kd_depo) params.set("kd_depo", filters.kd_depo);

            const resp = await fetch(`/api/resep/list?${params.toString()}`);
            const json = await resp.json();
            if (!json.success) {
                throw new Error(json.message || "Gagal memuat daftar resep");
            }
            const responseData = json.data || [];
            setData(responseData);
            // Simpan informasi pagination dari backend
            // Pastikan total selalu di-set, gunakan responseData.length sebagai fallback jika backend tidak mengirim total
            const total = typeof json.total === 'number' ? json.total : (responseData.length > 0 ? responseData.length : 0);
            const page = typeof json.page === 'number' ? json.page : (filters.page || 1);
            const limit = typeof json.limit === 'number' ? json.limit : (filters.limit || 20);
            // has_more: true jika ada data lebih dari limit atau jika backend mengirim has_more = true
            const hasMore = typeof json.has_more === 'boolean' ? json.has_more : (responseData.length >= limit);
            
            setPagination({
                total: total,
                page: page,
                limit: limit,
                has_more: hasMore,
            });
            
            // Debug log untuk melihat data pagination
            console.warn('Pagination data:', { 
                total, 
                page, 
                limit, 
                hasMore, 
                dataLength: responseData.length,
                jsonTotal: json.total,
                jsonHasMore: json.has_more,
                jsonPage: json.page,
                jsonLimit: json.limit
            
            });
        } catch (e) {
            setError(e.message);
            setData([]);
            setPagination({
                total: 0,
                page: 1,
                limit: filters.limit || 20,
                has_more: false,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (filters.no_rawat) {
            fetchByNoRawat();
        } else if (filters.no_rkm_medis) {
            fetchByNoRkmMedis();
        } else {
            fetchList();
        }
    };

    const openDetail = async (noResep, rowContext = {}) => {
        try {
            const resp = await fetch(
                `/api/resep/${encodeURIComponent(noResep)}`
            );
            const json = await resp.json();
            if (json.success) {
                setSelectedResep(json.data);
                setShowDetail(true);
                setDetailContext({
                    kd_poli: rowContext?.kd_poli || "",
                    kd_bangsal: rowContext?.kd_bangsal || "",
                    nm_pasien: rowContext?.nm_pasien || "",
                    no_rkm_medis: rowContext?.no_rkm_medis || "",
                });
                // Reset stok info cache ketika membuka resep baru
                setStokInfoMap({});
            }
        } catch {}
    };

    // Ambil stok info per item obat
    const fetchStokInfo = async (kodeBrng) => {
        // Hindari fetch berulang jika sudah ada dan bukan loading
        setStokInfoMap((prev) => {
            const current = prev[kodeBrng] || {};
            return {
                ...prev,
                [kodeBrng]: {
                    ...current,
                    loading: true,
                    error: "",
                    expanded: true,
                },
            };
        });
        try {
            const params = new URLSearchParams({ kode_brng: kodeBrng });
            if (detailContext?.kd_poli)
                params.set("kd_poli", detailContext.kd_poli);
            const resp = await fetch(
                `/api/resep/stok-info?${params.toString()}`
            );
            const json = await resp.json();
            setStokInfoMap((prev) => ({
                ...prev,
                [kodeBrng]: {
                    loading: false,
                    data: json.success ? json.data : null,
                    error: json.success
                        ? ""
                        : json.message || "Gagal memuat stok",
                    expanded: true,
                },
            }));
        } catch (e) {
            setStokInfoMap((prev) => ({
                ...prev,
                [kodeBrng]: {
                    loading: false,
                    data: null,
                    error: e.message || "Gagal memuat stok",
                    expanded: true,
                },
            }));
        }
    };

    // Toggle tampilan stok per item
    const toggleStokInfo = (kodeBrng) => {
        setStokInfoMap((prev) => {
            const cur = prev[kodeBrng];
            // Jika belum ada data, lakukan fetch pertama kali
            if (!cur) {
                // Optimistic state: set expanded dan loading; fetch async
                return {
                    ...prev,
                    [kodeBrng]: {
                        loading: true,
                        data: null,
                        error: "",
                        expanded: true,
                    },
                };
            }
            return { ...prev, [kodeBrng]: { ...cur, expanded: !cur.expanded } };
        });
        // Jika belum pernah fetch, panggil API
        const cur = stokInfoMap[kodeBrng];
        if (!cur) {
            fetchStokInfo(kodeBrng);
        }
    };

    // Fungsi untuk cetak etiket obat
    const cetakEtiket = async () => {
        if (!selectedResep || !selectedResep.detail_obat || selectedResep.detail_obat.length === 0) {
            alert("Tidak ada obat untuk dicetak etiketnya");
            return;
        }

        // Ambil kop dari tabel setting
        let kopData = {
            nama_instansi: "",
            alamat_instansi: "",
            kabupaten: "",
            propinsi: "",
        };

        try {
            const res = await fetch("/setting/app");
            if (res.ok) {
                const json = await res.json();
                if (json.data && json.data.length > 0) {
                    kopData = json.data[0];
                }
            }
        } catch (e) {
            console.warn("Gagal memuat data setting", e);
        }

        // Ambil data apoteker dari tabel sip_pegawai dengan jnj_jabatan = 'Apt'
        let apotekerData = {
            nik: "",
            nama: "",
            no_sip: "",
        };

        try {
            const apotekerRes = await fetch("/api/sip-pegawai/apoteker");
            if (apotekerRes.ok) {
                const apotekerJson = await apotekerRes.json();
                if (apotekerJson.success && apotekerJson.data) {
                    apotekerData = apotekerJson.data;
                }
            }
        } catch (e) {
            console.warn("Gagal memuat data apoteker", e);
        }

        const printWindow = window.open("", "_blank", "width=800,height=600");
        if (!printWindow) {
            alert("Popup diblokir. Izinkan popup untuk mencetak etiket.");
            return;
        }

        // Ambil data pasien dari berbagai kemungkinan field (termasuk dari detailContext)
        const namaPasien = selectedResep.nm_pasien || 
                          selectedResep.nama_pasien || 
                          selectedResep.pasien?.nm_pasien ||
                          selectedResep.pasien?.nama_pasien ||
                          detailContext.nm_pasien ||
                          "";
        const noResep = selectedResep.no_resep || "-";
        const tglResep = formatDate(selectedResep.tgl_peresepan) || "-";

        // Buat kop dari setting - hanya nama instansi saja
        const kop = kopData.nama_instansi || "ETIKET OBAT";

        // Ambil data apoteker dari API
        const apotekerNik = apotekerData.nik || "";
        const apotekerNama = apotekerData.nama || "";
        const apotekerSipa = apotekerData.no_sip || "";

        // Ukuran etiket: 70mm x 40mm
        const etiketWidth = "70mm";
        const etiketHeight = "40mm";

        let htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Cetak Etiket Obat</title>
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    body {
                        font-family: Arial, sans-serif;
                        padding: 5mm;
                    }
                    .etiket-container {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, ${etiketWidth});
                        gap: 3mm;
                        justify-content: center;
                    }
                    .etiket {
                        width: ${etiketWidth};
                        height: ${etiketHeight};
                        border: 1px solid #000;
                        padding: 2mm;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        background: white;
                        page-break-inside: avoid;
                        box-sizing: border-box;
                        overflow: hidden;
                    }
                    .kop {
                        font-size: 6pt;
                        font-weight: bold;
                        text-align: center;
                        margin-bottom: 1mm;
                        line-height: 1.2;
                    }
                    .apoteker-info {
                        font-size: 6pt;
                        text-align: center;
                        margin-bottom: 0.5mm;
                        line-height: 1.2;
                    }
                    .divider {
                        border-top: 1px solid #000;
                        margin: 0.5mm 0;
                    }
                    .info-resep-header {
                        font-size: 7pt;
                        margin-bottom: 1.5mm;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .no-resep {
                        flex: 1;
                    }
                    .tgl-resep {
                        margin-left: 3mm;
                        white-space: nowrap;
                    }
                    .nama-obat {
                        font-size: 8pt;
                        font-weight: bold;
                        text-align: center;
                        margin: 1mm 0 0.5mm 0;
                        word-wrap: break-word;
                        line-height: 1.3;
                    }
                    .divider-dashed {
                        border-top: 1px dashed #666;
                        margin: 0.5mm 0;
                    }
                    .aturan-pakai {
                        font-size: 8pt;
                        font-weight: bold;
                        text-align: center;
                        margin: 0.5mm 0 1.5mm 0;
                        word-wrap: break-word;
                        line-height: 1.3;
                    }
                    .footer-section {
                        margin-top: auto;
                        padding-top: 1mm;
                    }
                    .info-pasien {
                        font-size: 7pt;
                        margin-bottom: 0.5mm;
                    }
                    .info-obat {
                        font-size: 7pt;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .jml-obat {
                        flex: 1;
                    }
                    .ed-obat {
                        margin-left: 3mm;
                        white-space: nowrap;
                    }
                    @media print {
                        @page {
                            size: ${etiketWidth} ${etiketHeight};
                            margin: 0;
                        }
                        body {
                            margin: 0;
                            padding: 0;
                        }
                        .etiket-container {
                            display: block;
                            gap: 0;
                            padding: 0;
                            margin: 0;
                        }
                        .etiket {
                            width: ${etiketWidth};
                            height: ${etiketHeight};
                            margin: 0;
                            padding: 2mm;
                            border: 1px solid #000;
                            page-break-after: always;
                            page-break-inside: avoid;
                            break-after: page;
                            box-sizing: border-box;
                            overflow: hidden;
                        }
                        .etiket:last-child {
                            page-break-after: always;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="etiket-container">
        `;

        selectedResep.detail_obat.forEach((obat) => {
            const namaObat = obat.nama_brng || "-";
            const aturanPakai = obat.aturan_pakai || "-";
            const jumlahObat = obat.jml || "-";
            const satuanObat = obat.satuan || "";
            // Ambil expire date dari databarang yang sudah di-join melalui resep_dokter
            // Data expire sudah diformat sebagai Y-m-d dari backend
            const expireDate = obat.expire || null;

            htmlContent += `
                    <div class="etiket">
                        <div class="kop">
                            ${kop}
                        </div>
                        <div class="apoteker-info">
                            Apoteker: ${apotekerNama || apotekerNik || ""}<br/>
                            SIPA: ${apotekerSipa || ""}
                        </div>
                        <div class="divider"></div>
                        <div class="info-resep-header">
                            <span class="no-resep">No: ${noResep}</span>
                            <span class="tgl-resep">Tanggal: ${tglResep}</span>
                        </div>
                        <div class="nama-obat">
                            ${namaObat}
                        </div>
                        <div class="divider-dashed"></div>
                        <div class="aturan-pakai">
                            ${aturanPakai || ""}
                        </div>
                        <div class="divider"></div>
                        <div class="footer-section">
                            <div class="info-pasien">
                                nama: ${namaPasien || ""}
                            </div>
                            <div class="info-obat">
                                <span class="jml-obat">Jml: ${jumlahObat} ${satuanObat}</span>
                                <span class="ed-obat">ED: ${expireDate && expireDate !== "0000-00-00" ? formatDate(expireDate) : "-"}</span>
                            </div>
                        </div>
                    </div>
            `;
        });

        htmlContent += `
                </div>
                <script>
                    window.onload = function() {
                        window.print();
                    };
                </script>
            </body>
            </html>
        `;

        printWindow.document.write(htmlContent);
        printWindow.document.close();
    };

    // Fungsi untuk cetak resep
    const cetakResep = async () => {
        if (!selectedResep || !selectedResep.detail_obat || selectedResep.detail_obat.length === 0) {
            alert("Tidak ada obat untuk dicetak resepnya");
            return;
        }

        // Ambil kop dari tabel setting
        let kopData = {
            nama_instansi: "",
            alamat_instansi: "",
            kabupaten: "",
            propinsi: "",
            logo: "",
        };

        try {
            const res = await fetch("/setting/app");
            if (res.ok) {
                const json = await res.json();
                if (json.data && json.data.length > 0) {
                    kopData = json.data[0];
                }
            }
        } catch (e) {
            console.warn("Gagal memuat data setting", e);
        }

        const printWindow = window.open("", "_blank", "width=800,height=600");
        if (!printWindow) {
            alert("Popup diblokir. Izinkan popup untuk mencetak resep.");
            return;
        }

        // Ambil data pasien
        const namaPasien = selectedResep.nm_pasien || 
                          selectedResep.nama_pasien || 
                          selectedResep.pasien?.nm_pasien ||
                          selectedResep.pasien?.nama_pasien ||
                          detailContext.nm_pasien ||
                          "";
        const noRM = selectedResep.no_rkm_medis || 
                    selectedResep.no_rkm || 
                    selectedResep.pasien?.no_rkm_medis ||
                    selectedResep.pasien?.no_rkm ||
                    detailContext.no_rkm_medis ||
                    "";
        const noResep = selectedResep.no_resep || "-";
        const tglResep = formatDate(selectedResep.tgl_peresepan) || "-";
        const jamResep = formatTime(selectedResep.jam_peresepan) || "-";
        const namaDokter = selectedResep.nama_dokter || selectedResep.dokter?.nm_dokter || "-";
        const noRawat = selectedResep.no_rawat || "-";

        // Buat kop surat lengkap
        const kop = kopData.nama_instansi || "RESEP OBAT";
        // Logo diambil dari endpoint jika ada logo_size
        const logoUrl = kopData.logo_size && kopData.logo_size > 0 
            ? `/setting/app/${encodeURIComponent(kop)}/logo?t=${Date.now()}`
            : "";
        const alamat = kopData.alamat_instansi || "";
        const kabupaten = kopData.kabupaten || "";
        const propinsi = kopData.propinsi || "";
        
        // Format alamat lengkap
        let alamatLengkap = "";
        if (alamat) {
            alamatLengkap += alamat;
        }
        if (kabupaten) {
            if (alamatLengkap) alamatLengkap += "<br/>";
            alamatLengkap += kabupaten;
        }
        if (propinsi) {
            if (alamatLengkap && !kabupaten) alamatLengkap += "<br/>";
            if (kabupaten) alamatLengkap += ", ";
            alamatLengkap += propinsi;
        }

        // Generate QR code di frontend menggunakan library qrcode
        let qrCodeSvg = "";
        const qrText = `Dokumen ini ditandatangani secara elektronik oleh ${namaDokter} pada tanggal ${tglResep} Jam ${jamResep} di ${kop}`;
        
        try {
            // Generate QR code sebagai SVG
            qrCodeSvg = await QRCode.toString(qrText, {
                type: 'svg',
                width: 100,
                margin: 1,
                errorCorrectionLevel: 'H'
            });
            console.warn("QR code berhasil di-generate");
        } catch (e) {
            console.error("Gagal generate QR code:", e);
        }
        
        let htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Cetak Resep</title>
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    body {
                        font-family: Arial, sans-serif;
                        font-size: 12pt;
                        padding: 10mm;
                        line-height: 1.6;
                        width: 10.5cm;
                        height: 16.5cm;
                        margin: 0 auto;
                        border: 2px solid #000;
                        position: relative;
                    }
                    .kop-container {
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        margin-bottom: 3px;
                    }
                    .logo {
                        width: 50px;
                        height: 50px;
                        object-fit: contain;
                        margin-right: 8px;
                        flex-shrink: 0;
                    }
                    .kop-wrapper {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                    }
                    .kop {
                        text-align: left;
                        font-weight: bold;
                        font-size: 12pt;
                        margin-bottom: 2px;
                        line-height: 1.2;
                    }
                    .alamat {
                        text-align: left;
                        font-size: 9pt;
                        margin-bottom: 5px;
                        line-height: 1.3;
                    }
                    .divider {
                        border-top: 1px solid #000;
                        margin: 10px 0;
                    }
                    .info-section {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 8px;
                        font-size: 9pt;
                        line-height: 1.3;
                    }
                    .info-left {
                        flex: 1;
                    }
                    .info-left div,
                    .info-right div {
                        margin-bottom: 2px;
                    }
                    .info-right {
                        flex: 1;
                        text-align: right;
                    }
                    .resep-title {
                        text-align: center;
                        font-weight: bold;
                        font-size: 16pt;
                        margin: 5px 0 10px 0;
                    }
                    .resep-item {
                        margin-bottom: 12px;
                        font-size: 9pt;
                        line-height: 1.3;
                    }
                    .resep-line {
                        margin-bottom: 3px;
                    }
                    .resep-r {
                        display: inline-block;
                        width: 30px;
                    }
                    .obat-name {
                        font-weight: bold;
                        font-size: 9pt;
                    }
                    .obat-jumlah {
                        margin-left: 10px;
                        font-size: 9pt;
                    }
                    .aturan-pakai {
                        margin-left: 30px;
                        margin-top: 3px;
                        border-top: 1px dashed #000;
                        padding-top: 3px;
                        font-size: 9pt;
                    }
                    .signature-section {
                        position: absolute;
                        bottom: 10mm;
                        right: 10mm;
                        text-align: center;
                        font-size: 9pt;
                    }
                    .signature-dokter {
                        margin-bottom: 5px;
                        font-weight: bold;
                    }
                    .qrcode-container {
                        margin-top: 5px;
                    }
                    .qrcode-container svg {
                        width: 60px;
                        height: 60px;
                    }
                    @media print {
                        body {
                            padding: 10mm;
                            margin: 0;
                            width: 10.5cm;
                            height: 16.5cm;
                            border: 2px solid #000;
                        }
                        @page {
                            size: 10.5cm 16.5cm;
                            margin: 0;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="kop-container">
                    ${logoUrl ? `<img src="${logoUrl}" alt="Logo" class="logo" />` : ''}
                    <div class="kop-wrapper">
                        <div class="kop">
                            ${kop}
                        </div>
                        <div class="alamat">
                            ${alamatLengkap}
                        </div>
                    </div>
                </div>
                <div class="divider"></div>
                <div class="info-section">
                    <div class="info-left">
                        <div><strong>Nama Pasien:</strong> ${namaPasien || "-"}</div>
                        <div><strong>No. RM:</strong> ${noRM || "-"}</div>
                        <div><strong>No. Rawat:</strong> ${noRawat || "-"}</div>
                    </div>
                    <div class="info-right">
                        <div><strong>No. Resep:</strong> ${noResep}</div>
                        <div><strong>Tanggal:</strong> ${tglResep}</div>
                        <div><strong>Jam:</strong> ${jamResep}</div>
                        <div><strong>Dokter:</strong> ${namaDokter}</div>
                    </div>
                </div>
                <div class="divider"></div>
                <div class="resep-title">RESEP</div>
        `;

        // Tambahkan setiap obat
        selectedResep.detail_obat.forEach((obat) => {
            const namaObat = obat.nama_brng || "-";
            const jumlahObat = obat.jml || "-";
            const satuanObat = obat.satuan || "";
            const aturanPakai = obat.aturan_pakai || "-";

            htmlContent += `
                <div class="resep-item">
                    <div class="resep-line">
                        <span class="resep-r">R/</span>
                        <span class="obat-name">${namaObat}</span>
                        <span class="obat-jumlah">(${jumlahObat} ${satuanObat})</span>
                    </div>
                    <div class="aturan-pakai">
                        ${aturanPakai}
                    </div>
                </div>
            `;
        });

        // Inject QR code SVG langsung ke HTML jika ada
        const qrCodeHtml = qrCodeSvg ? qrCodeSvg : '<div style="width: 60px; height: 60px; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; font-size: 8pt; color: #999;">QR Code</div>';
        
        htmlContent += `
                <div class="signature-section">
                    <div class="qrcode-container">
                        ${qrCodeHtml}
                    </div>
                </div>
                <script>
                    window.onload = function() {
                        window.print();
                    };
                </script>
            </body>
            </html>
        `;

        printWindow.document.write(htmlContent);
        printWindow.document.close();
    };

    // Fungsi untuk menyimpan Validasi (Tgl & Jam Validasi) saat klik "Proses Penyerahan"
    const handleValidasi = async () => {
        if (!selectedResep) return;
        setSaving(true);
        try {
            // Gunakan timezone Asia/Jakarta untuk mendapatkan tanggal dan waktu saat ini
            const now = new Date();
            const dateFormatter = new Intl.DateTimeFormat('en-CA', {
                timeZone: 'Asia/Jakarta',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            const timeFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: 'Asia/Jakarta',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
            const todayISO = dateFormatter.format(now);
            const timeStr = timeFormatter.format(now);

            // Update Validasi (tgl_perawatan & jam) di backend
            const resp = await fetch(
                `/api/resep/${encodeURIComponent(selectedResep.no_resep)}/validasi`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        tgl_validasi: todayISO,
                        jam_validasi: timeStr,
                    }),
                }
            );

            if (!resp.ok) {
                // Jika endpoint tidak ada, hanya update di frontend
                console.warn("Endpoint validasi tidak tersedia, hanya update di frontend");
            } else {
                const json = await resp.json();
                if (!json.success) {
                    throw new Error(json.message || "Gagal menyimpan validasi");
                }
            }

            // Update di frontend (tgl_perawatan & jam untuk validasi)
            const tglValidasiBaru = todayISO;
            const jamValidasiBaru = timeStr;

            setSelectedResep((prev) => ({
                ...prev,
                // Tgl/Jam Validasi: gunakan kolom yang tersedia pada model saat ini (tgl_perawatan & jam)
                tgl_perawatan: tglValidasiBaru,
                jam: jamValidasiBaru,
            }));

            // Sinkronkan juga ke list hasil pencarian
            setData((prev) => {
                if (!Array.isArray(prev)) return prev;
                return prev.map((row) => {
                    if (row.no_resep !== selectedResep.no_resep) return row;
                    return {
                        ...row,
                        // Tgl/Jam Validasi pada list menggunakan tgl_perawatan & jam
                        tgl_perawatan: tglValidasiBaru,
                        jam: jamValidasiBaru,
                    };
                });
            });

            // Buka modal konfirmasi penyerahan setelah validasi berhasil
            setConfirmOpen(true);
        } catch (e) {
            alert(e.message || "Gagal menyimpan validasi");
        } finally {
            setSaving(false);
        }
    };

    // Fungsi untuk menyimpan Penyerahan (Tgl & Jam Penyerahan) saat klik "Ya Serahkan"
    const handlePenyerahan = async () => {
        if (!selectedResep) return;
        setSaving(true);
        try {
            // Siapkan payload untuk mengirim perubahan Embalase/Tuslah (non-racikan) yang diedit
            const buildPenyerahanPayload = (res) => {
                const payload = {
                    embalase_tuslah: {
                        non_racikan: [],
                    },
                };
                const nonR = Array.isArray(res?.detail_obat)
                    ? res.detail_obat
                    : [];
                for (const it of nonR) {
                    payload.embalase_tuslah.non_racikan.push({
                        kode_brng: it.kode_brng,
                        embalase: Number(it.embalase || 0),
                        tuslah: Number(it.tuslah || 0),
                    });
                }
                return payload;
            };

            const payload = buildPenyerahanPayload(selectedResep);
            const resp = await fetch(
                `/api/resep/${encodeURIComponent(
                    selectedResep.no_resep
                )}/penyerahan`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    // Backend telah memproses perubahan embalase/tuslah untuk item non-racikan.
                    // Dukungan untuk racikan akan ditambahkan kemudian.
                    body: JSON.stringify(payload),
                }
            );
            const json = await resp.json();
            if (!json.success) {
                throw new Error(json.message || "Gagal memproses penyerahan");
            }
            
            // Perbarui informasi penyerahan dan status pada modal dan daftar
            // Gunakan timezone Asia/Jakarta untuk mendapatkan tanggal dan waktu saat ini
            const now = new Date();
            const dateFormatter = new Intl.DateTimeFormat('en-CA', {
                timeZone: 'Asia/Jakarta',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            const timeFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: 'Asia/Jakarta',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
            const todayISO = dateFormatter.format(now);
            const timeStr = timeFormatter.format(now);

            const tglPenyerahanBaru = json.data?.tgl_penyerahan || todayISO;
            const jamPenyerahanBaru = json.data?.jam_penyerahan || timeStr;

            setSelectedResep((prev) => ({
                ...prev,
                tgl_penyerahan: tglPenyerahanBaru,
                jam_penyerahan: jamPenyerahanBaru,
                status_perawatan: "Sudah Terlayani",
            }));

            // Sinkronkan juga ke list hasil pencarian agar baris ikut hijau
            setData((prev) => {
                if (!Array.isArray(prev)) return prev;
                return prev.map((row) => {
                    if (row.no_resep !== selectedResep.no_resep) return row;
                    return {
                        ...row,
                        tgl_penyerahan: tglPenyerahanBaru,
                        jam_penyerahan: jamPenyerahanBaru,
                        status_perawatan: "Sudah Terlayani",
                    };
                });
            });
            setConfirmOpen(false);
            alert("Penyerahan obat berhasil diproses.");
        } catch (e) {
            alert(e.message);
        } finally {
            setSaving(false);
        }
    };

    const formatDate = (str) => {
        if (!str || str === "0000-00-00") return "-";
        try {
            const d = new Date(str);
            return `${String(d.getDate()).padStart(2, "0")}/${String(
                d.getMonth() + 1
            ).padStart(2, "0")}/${d.getFullYear()}`;
        } catch {
            return str;
        }
    };

    const formatTime = (str) => {
        if (!str || str === "00:00:00") return "-";
        return str;
    };

    const formatRupiah = (num) => {
        const n = Number(num || 0);
        return n.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        });
    };

    const computeTotals = (res) => {
        if (!res)
            return {
                subtotal: 0,
                tambahan_total: 0,
                ppn: 0,
                total_plus_ppn: 0,
                ppn_rate: 0.11,
            };
        const ppnRate = typeof res.ppn_rate === "number" ? res.ppn_rate : 0.11;

        // Kumpulkan item non-racikan
        const nonRacikan = Array.isArray(res.detail_obat)
            ? res.detail_obat
            : [];
        const subtotalNonRacikan = nonRacikan.reduce((acc, it) => {
            const sub =
                typeof it.subtotal === "number"
                    ? it.subtotal
                    : Number(it.tarif || 0) * Number(it.jml || 0);
            return acc + sub;
        }, 0);
        const tambahanNonRacikan = nonRacikan.reduce((acc, it) => {
            const emb = Number(it.embalase || 0);
            const tus = Number(it.tuslah || 0);
            return acc + emb + tus;
        }, 0);

        // Kumpulkan item racikan (detail dalam setiap grup)
        const racikanGroups = Array.isArray(res.racikan) ? res.racikan : [];
        const { subtotalRacikan, tambahanRacikan } = racikanGroups.reduce(
            (acc, grp) => {
                const details = Array.isArray(grp?.details) ? grp.details : [];
                for (const d of details) {
                    const sub =
                        typeof d.subtotal === "number"
                            ? d.subtotal
                            : Number(d.tarif || 0) * Number(d.jml || 0);
                    const emb = Number(d.embalase || 0);
                    const tus = Number(d.tuslah || 0);
                    acc.subtotalRacikan += sub;
                    acc.tambahanRacikan += emb + tus;
                }
                return acc;
            },
            { subtotalRacikan: 0, tambahanRacikan: 0 }
        );

        const subtotalFallback = subtotalNonRacikan + subtotalRacikan;
        const tambahanFallback = tambahanNonRacikan + tambahanRacikan;
        const ppnFallback = Math.round(subtotalFallback * ppnRate);
        const totalPlusPpnFallback =
            subtotalFallback + tambahanFallback + ppnFallback;

        return {
            subtotal:
                typeof res.subtotal === "number"
                    ? res.subtotal
                    : subtotalFallback,
            tambahan_total:
                typeof res.tambahan_total === "number"
                    ? res.tambahan_total
                    : tambahanFallback,
            ppn: typeof res.ppn === "number" ? res.ppn : ppnFallback,
            total_plus_ppn:
                typeof res.total_plus_ppn === "number"
                    ? res.total_plus_ppn
                    : totalPlusPpnFallback,
            ppn_rate: ppnRate,
        };
    };

    // Edit biaya tambahan per item (non-racikan)
    const updateNonRacikanCharge = (index, key, value) => {
        setSelectedResep((prev) => {
            if (!prev) return prev;
            const list = Array.isArray(prev.detail_obat)
                ? [...prev.detail_obat]
                : [];
            if (!list[index]) return prev;
            const item = { ...list[index] };
            const num = Number(value ?? 0);
            item[key] = Number.isFinite(num) && num >= 0 ? num : 0;
            list[index] = item;
            return { ...prev, detail_obat: list };
        });
    };

    // Edit biaya tambahan per item dalam racikan
    const updateRacikanCharge = (gidx, idx, key, value) => {
        setSelectedResep((prev) => {
            if (!prev) return prev;
            const groups = Array.isArray(prev.racikan)
                ? prev.racikan.map((g) => ({ ...g }))
                : [];
            if (!groups[gidx]) return prev;
            const grp = { ...groups[gidx] };
            const details = Array.isArray(grp.details) ? [...grp.details] : [];
            if (!details[idx]) return prev;
            const item = { ...details[idx] };
            const num = Number(value ?? 0);
            item[key] = Number.isFinite(num) && num >= 0 ? num : 0;
            details[idx] = item;
            grp.details = details;
            groups[gidx] = grp;
            return { ...prev, racikan: groups };
        });
    };

    return (
        <SidebarFarmasi title="Farmasi">
            <Head title="Daftar Permintaan Resep" />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Daftar Permintaan Resep
                        </h1>
                    </div>
                </div>

                {/* Filter Section */}
                <Card className="relative overflow-visible rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                    <CardHeader className="relative z-0 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-600/50">
                        <div
                            className="flex items-center justify-between cursor-pointer select-none"
                            onClick={() => setFiltersOpen((prev) => !prev)}
                            aria-expanded={filtersOpen}
                            aria-controls="filter-content"
                        >
                            <CardTitle className="flex items-center gap-2">
                                <Filter className="h-5 w-5" />
                                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    Filter Pencarian
                                </span>
                            </CardTitle>
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); setFiltersOpen((prev) => !prev); }}
                                className="inline-flex items-center gap-2 px-2 py-1 text-sm rounded-md bg-white/70 dark:bg-gray-700/70 border border-gray-200/50 dark:border-gray-600/50 text-gray-700 dark:text-gray-200 hover:bg-white/90 dark:hover:bg-gray-700"
                                aria-label={filtersOpen ? "Tutup Filter" : "Buka Filter"}
                            >
                                {filtersOpen ? "Tutup" : "Buka"}
                                <ChevronDown className={`h-4 w-4 transition-transform ${filtersOpen ? "rotate-180" : "rotate-0"}`} />
                            </button>
                        </div>
                    </CardHeader>
                    {filtersOpen && (
                    <CardContent id="filter-content" className="p-8 overflow-visible">
                        <div className="grid grid-cols-5 gap-4">
                            <div className="relative z-[9999]" style={{ zIndex: 9999 }}>
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                    Jenis
                                </label>
                                <Select
                                    value={filters.jenis}
                                    onValueChange={(v) =>
                                        handleFilterChange("jenis", v)
                                    }
                                    className="z-[9999]"
                                >
                                    <SelectTrigger className="focus:ring-2 focus:ring-blue-500/50 border-gray-300 dark:border-gray-600">
                                        <CustomSelectValue 
                                            placeholder="Pilih jenis"
                                            getLabel={getJenisLabel}
                                            value={filters.jenis}
                                        />
                                    </SelectTrigger>
                                    <SelectContent className="z-[9999]">
                                        <SelectItem value="ralan">
                                            Rawat Jalan
                                        </SelectItem>
                                        <SelectItem value="ranap">
                                            Rawat Inap
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                    Tgl. Awal
                                </label>
                                <Input
                                    type="date"
                                    value={filters.start_date}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "start_date",
                                            e.target.value
                                        )
                                    }
                                    className="dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                    Tgl. Akhir
                                </label>
                                <Input
                                    type="date"
                                    value={filters.end_date}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "end_date",
                                            e.target.value
                                        )
                                    }
                                    className="dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div className="hidden">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                    No. Rawat
                                </label>
                                <Input
                                    placeholder="YYYY/MM/DD/NNNNN"
                                    value={filters.no_rawat}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "no_rawat",
                                            e.target.value
                                        )
                                    }
                                    className="dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div className="hidden">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                    No. RM (No. Rekam Medis)
                                </label>
                                <Input
                                    placeholder="Contoh: 000123"
                                    value={filters.no_rkm_medis}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "no_rkm_medis",
                                            e.target.value
                                        )
                                    }
                                    className="dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div className="hidden">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                    Dokter (nm_dokter)
                                </label>
                                <Input
                                    placeholder="Cari dokter"
                                    value={filters.dokter}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "dokter",
                                            e.target.value
                                        )
                                    }
                                    className="dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div className="hidden">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                    Poli/Bangsal
                                </label>
                                <Input
                                    placeholder="Cari poli atau bangsal"
                                    value={filters.poli}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "poli",
                                            e.target.value
                                        )
                                    }
                                    className="dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div className="relative z-[9999]" style={{ zIndex: 9999 }}>
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                    Status Terlayani
                                </label>
                                <Select
                                    value={filters.status_perawatan}
                                    onValueChange={(v) =>
                                        handleFilterChange(
                                            "status_perawatan",
                                            v
                                        )
                                    }
                                    className="z-[9999]"
                                >
                                    <SelectTrigger className="focus:ring-2 focus:ring-blue-500/50 border-gray-300 dark:border-gray-600">
                                        <CustomSelectValue 
                                            placeholder="Pilih status"
                                            getLabel={getStatusTerlayaniLabel}
                                            value={filters.status_perawatan}
                                        />
                                    </SelectTrigger>
                                    <SelectContent className="z-[9999]">
                                        <SelectItem value="Semua">
                                            Semua
                                        </SelectItem>
                                        <SelectItem value="Belum Terlayani">
                                            Belum Terlayani
                                        </SelectItem>
                                        <SelectItem value="Sudah Terlayani">
                                            Sudah Terlayani
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                    Pencarian bebas
                                </label>
                                <Input
                                    placeholder="Ketik kata kunci..."
                                    value={filters.q}
                                    onChange={(e) =>
                                        handleFilterChange("q", e.target.value)
                                    }
                                    className="dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            {filters.jenis === "ranap" && (
                                <>
                                    <div className="col-span-5 grid grid-cols-2 gap-4 mt-4">
                                        <div>
                                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                                Kode Bangsal (opsional)
                                            </label>
                                            <Input
                                                placeholder="Misal: B01"
                                                value={filters.kd_bangsal}
                                                onChange={(e) =>
                                                    handleFilterChange(
                                                        "kd_bangsal",
                                                        e.target.value
                                                    )
                                                }
                                                className="dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                                Kode Depo (opsional)
                                            </label>
                                            <Input
                                                placeholder="Misal: D01"
                                                value={filters.kd_depo}
                                                onChange={(e) =>
                                                    handleFilterChange(
                                                        "kd_depo",
                                                        e.target.value
                                                    )
                                                }
                                                className="dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                            
                        </div>
                        <div className="w-full flex gap-2 mt-4 justify-end">
                            <Button
                                onClick={handleSearch}
                                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
                            >
                                <Search className="h-4 w-4" />
                                Cari
                            </Button>
                            <Button
                                variant="outline"
                                className="bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700"
                                onClick={() => {
                                    setFilters({
                                        jenis: "ralan",
                                        start_date: todayStr(),
                                        end_date: todayStr(),
                                        dokter: "",
                                        poli: "",
                                        status_perawatan: "Semua",
                                        q: "",
                                        kd_bangsal: "",
                                        kd_depo: "",
                                        no_rawat: "",
                                        no_rkm_medis: "",
                                        limit: 20,
                                        page: 1,
                                    });
                                    setData([]);
                                    setError("");
                                    setPagination({
                                        total: 0,
                                        page: 1,
                                        limit: 20,
                                        has_more: false,
                                    });
                                }}
                            >
                                Reset
                            </Button>
                        </div>
                        {error && (
                            <div className="mt-3 text-sm text-red-600">
                                {error ||
                                    "Tips: Jika tidak memasukkan No. Rawat/RM, gunakan filter tanggal/dokter/poli lalu klik Cari untuk memuat daftar global."}
                            </div>
                        )}
                    </CardContent>
                    )}
                </Card>

                {/* Data Table */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5"
                >
                    {/* Top border gradient */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                    
                    {/* Card Header - Compact Design */}
                    <div className="relative px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <motion.div
                                    className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md"
                                    whileHover={{ rotate: 90, scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Eye className="w-4 h-4 text-white" />
                                </motion.div>
                                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    Hasil Pencarian
                                </span>
                            </h3>
                            <div className="flex items-center gap-3">
                                <motion.span
                                    className="text-sm text-gray-600 dark:text-gray-400 font-medium"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {pagination.total > 0 ? (
                                        <>
                                            Menampilkan {data.length} dari {pagination.total} data resep
                                            {pagination.page > 1 && ` (Halaman ${pagination.page})`}
                                        </>
                                    ) : (
                                        `${data.length} data resep`
                                    )}
                                </motion.span>
                                <div className="w-14">
                                    <Input
                                        type="number"
                                        min={10}
                                        max={100}
                                        step={10}
                                        value={filters.limit}
                                        onChange={(e) =>
                                            handleFilterChange(
                                                "limit",
                                                Number(e.target.value) || 20
                                            )
                                        }
                                        className="text-xs dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Card Content */}
                    <div className="relative p-6">
                        {loading ? (
                            <motion.div
                                className="flex flex-col items-center justify-center gap-3 py-12"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">Memuat data...</span>
                            </motion.div>
                        ) : (
                            <div className="overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                                                No. Resep
                                            </th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                                                Tgl. Peresepan
                                            </th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                                                No. Rawat
                                            </th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                                                No. RM
                                            </th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                                                Pasien
                                            </th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                                                Dokter Peresep
                                            </th>
                                            {filters.jenis === "ralan" ? (
                                                <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                                                    Poli/Unit
                                                </th>
                                            ) : (
                                                <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                                                    Ruang/Kamar
                                                </th>
                                            )}
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                                                Status Terlayani
                                            </th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                                                Jenis Bayar
                                            </th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                                                Tgl. Validasi
                                            </th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                                                Tgl. Penyerahan
                                            </th>
                                            <th className="px-4 py-3 text-center font-semibold text-gray-700 dark:text-gray-300">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <AnimatePresence>
                                            {data.length === 0 ? (
                                                <motion.tr
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                >
                                                    <td
                                                        colSpan={12}
                                                        className="px-4 py-12 text-center"
                                                    >
                                                        <motion.div
                                                            className="flex flex-col items-center justify-center gap-3"
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                        >
                                                            <Inbox className="w-12 h-12 text-gray-400 dark:text-gray-600" />
                                                            <div className="text-gray-600 dark:text-gray-400">
                                                                <p className="font-semibold mb-1">Belum ada data</p>
                                                                <p className="text-sm">
                                                                    Masukkan No. Rawat atau No. RM lalu klik Cari atau gunakan filter tanggal lalu klik Cari.
                                                                </p>
                                                            </div>
                                                        </motion.div>
                                                    </td>
                                                </motion.tr>
                                            ) : (
                                                data.map((item, idx) => {
                                                    // Cek apakah sudah ada tanggal dan jam penyerahan
                                                    // Pengecekan yang lebih robust untuk berbagai format data
                                                    const tglPenyerahan = item.tgl_penyerahan;
                                                    const jamPenyerahan = item.jam_penyerahan;
                                                    const sudahAdaPenyerahan = 
                                                        tglPenyerahan && 
                                                        jamPenyerahan &&
                                                        tglPenyerahan !== null &&
                                                        jamPenyerahan !== null &&
                                                        tglPenyerahan !== undefined &&
                                                        jamPenyerahan !== undefined &&
                                                        String(tglPenyerahan).trim() !== "" &&
                                                        String(jamPenyerahan).trim() !== "" &&
                                                        String(tglPenyerahan).trim() !== "-" &&
                                                        String(jamPenyerahan).trim() !== "-";
                                                    
                                                    // Tentukan status berdasarkan penyerahan atau status_perawatan
                                                    // Prioritas: jika sudah ada penyerahan, maka status = Sudah Terlayani
                                                    const statusLabel =
                                                        sudahAdaPenyerahan
                                                            ? "Sudah Terlayani"
                                                            : item.status_perawatan ===
                                                              "Sudah"
                                                            ? "Sudah Terlayani"
                                                            : item.status_perawatan ===
                                                              "Belum"
                                                            ? "Belum Terlayani"
                                                            : item.status_perawatan ||
                                                              "Belum Terlayani";
                                                    const sudah =
                                                        statusLabel ===
                                                        "Sudah Terlayani";
                                                    return (
                                                        <motion.tr
                                                            key={item.no_resep}
                                                            className={`border-b border-gray-100/50 dark:border-gray-700/30 transition-all duration-200 group ${
                                                                sudah
                                                                    ? "bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20"
                                                                    : "hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-gray-700/50 dark:hover:to-gray-800/50"
                                                            }`}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            exit={{ opacity: 0, x: 20 }}
                                                            transition={{ delay: idx * 0.02 }}
                                                            whileHover={{ scale: 1.001 }}
                                                        >
                                                            <td className="px-4 py-3">
                                                                <motion.span
                                                                    className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 ring-1 ring-blue-200 dark:ring-blue-800 font-mono text-xs font-bold"
                                                                    whileHover={{ scale: 1.05 }}
                                                                >
                                                                    {item.no_resep}
                                                                </motion.span>
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                <div className="font-medium text-gray-900 dark:text-white">
                                                                    {formatDate(item.tgl_peresepan)}
                                                                </div>
                                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                    {formatTime(item.jam_peresepan)}
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                <span className="font-mono text-sm text-gray-700 dark:text-gray-300">
                                                                    {item.no_rawat}
                                                                </span>
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                <span className="text-gray-700 dark:text-gray-300">
                                                                    {item.no_rkm_medis || "-"}
                                                                </span>
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                <span className="text-gray-900 dark:text-white font-medium">
                                                                    {item.nm_pasien || "-"}
                                                                </span>
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                <span className="text-gray-700 dark:text-gray-300">
                                                                    {item.nm_dokter ||
                                                                        item.nama_dokter ||
                                                                        "-"}
                                                                </span>
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                <span className="text-gray-700 dark:text-gray-300">
                                                                    {filters.jenis ===
                                                                    "ralan"
                                                                        ? item.nm_poli ||
                                                                          "-"
                                                                        : item.nm_bangsal ||
                                                                          "-"}
                                                                </span>
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                <motion.span
                                                                    className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold ${
                                                                        sudah
                                                                            ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 ring-1 ring-green-200 dark:ring-green-800"
                                                                            : "bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/30 dark:to-amber-900/30 text-yellow-700 dark:text-yellow-300 ring-1 ring-yellow-200 dark:ring-yellow-800"
                                                                    }`}
                                                                    whileHover={{ scale: 1.05 }}
                                                                >
                                                                    {statusLabel}
                                                                </motion.span>
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                <span className="text-gray-700 dark:text-gray-300">
                                                                    {item.png_jawab || "-"}
                                                                </span>
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                {item.tgl_perawatan ? (
                                                                    <>
                                                                        <div className="font-medium text-gray-900 dark:text-white">
                                                                            {formatDate(item.tgl_perawatan)}
                                                                        </div>
                                                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                            {formatTime(item.jam)}
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    <span className="text-gray-400 dark:text-gray-600">-</span>
                                                                )}
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                {item.tgl_penyerahan ? (
                                                                    <>
                                                                        <div className="font-medium text-gray-900 dark:text-white">
                                                                            {formatDate(item.tgl_penyerahan)}
                                                                        </div>
                                                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                            {formatTime(item.jam_penyerahan)}
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    <span className="text-gray-400 dark:text-gray-600">-</span>
                                                                )}
                                                            </td>
                                                            <td className="px-4 py-3 text-center">
                                                                <motion.button
                                                                    onClick={() =>
                                                                        openDetail(
                                                                            item.no_resep,
                                                                            item
                                                                        )
                                                                    }
                                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium transition-all duration-200"
                                                                    whileHover={{ scale: 1.05 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                >
                                                                    <Eye className="h-3.5 w-3.5" />
                                                                    Detail
                                                                </motion.button>
                                                            </td>
                                                        </motion.tr>
                                                    );
                                                })
                                            )}
                                        </AnimatePresence>
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {/* Pagination Controls */}
                        {!loading && data.length > 0 && (
                            pagination.total > pagination.limit || 
                            pagination.has_more === true || 
                            pagination.page > 1
                        ) && (
                            <div className="mt-6 flex items-center justify-between border-t border-gray-200/50 dark:border-gray-700/50 pt-4">
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Menampilkan {((pagination.page - 1) * pagination.limit) + 1} - {Math.min(pagination.page * pagination.limit, pagination.total)} dari {pagination.total} data
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            if (pagination.page > 1) {
                                                handleFilterChange("page", pagination.page - 1);
                                                setTimeout(() => handleSearch(), 100);
                                            }
                                        }}
                                        disabled={pagination.page === 1}
                                        className="flex items-center gap-1"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                        Sebelumnya
                                    </Button>
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: Math.min(5, Math.ceil(pagination.total / pagination.limit)) }, (_, i) => {
                                            const totalPages = Math.ceil(pagination.total / pagination.limit);
                                            let pageNum;
                                            if (totalPages <= 5) {
                                                pageNum = i + 1;
                                            } else if (pagination.page <= 3) {
                                                pageNum = i + 1;
                                            } else if (pagination.page >= totalPages - 2) {
                                                pageNum = totalPages - 4 + i;
                                            } else {
                                                pageNum = pagination.page - 2 + i;
                                            }
                                            return (
                                                <Button
                                                    key={pageNum}
                                                    variant={pagination.page === pageNum ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => {
                                                        if (pagination.page !== pageNum) {
                                                            handleFilterChange("page", pageNum);
                                                            setTimeout(() => handleSearch(), 100);
                                                        }
                                                    }}
                                                    className={`min-w-[40px] ${
                                                        pagination.page === pageNum
                                                            ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white"
                                                            : ""
                                                    }`}
                                                >
                                                    {pageNum}
                                                </Button>
                                            );
                                        })}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            if (pagination.has_more) {
                                                handleFilterChange("page", pagination.page + 1);
                                                setTimeout(() => handleSearch(), 100);
                                            }
                                        }}
                                        disabled={!pagination.has_more}
                                        className="flex items-center gap-1"
                                    >
                                        Selanjutnya
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Detail Modal */}
                {showDetail && selectedResep && (
                    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                        <div className="bg-white rounded-lg p-6 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <Pill className="h-4 w-4" /> Detail Resep #
                                    {selectedResep.no_resep}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={cetakEtiket}
                                        className="flex items-center gap-2"
                                    >
                                        <Printer className="h-4 w-4" />
                                        Cetak Etiket
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={cetakResep}
                                        className="flex items-center gap-2"
                                    >
                                        <Printer className="h-4 w-4" />
                                        Cetak Resep
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setShowDetail(false)}
                                    >
                                        Tutup
                                    </Button>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <div className="text-gray-600">
                                        No. Rawat
                                    </div>
                                    <div className="font-mono">
                                        {selectedResep.no_rawat}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-gray-600">Dokter</div>
                                    <div>
                                        {selectedResep.nama_dokter || "-"}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-gray-600">Depo</div>
                                    <div>
                                        {selectedResep?.depo?.nm_bangsal || "-"}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-gray-600">
                                        Tgl/Jam Peresepan
                                    </div>
                                    <div>
                                        {formatDate(
                                            selectedResep.tgl_peresepan
                                        )}{" "}
                                        {formatTime(
                                            selectedResep.jam_peresepan
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-gray-600">
                                        Tgl/Jam Penyerahan
                                    </div>
                                    <div>
                                        {formatDate(
                                            selectedResep.tgl_penyerahan
                                        )}{" "}
                                        {formatTime(
                                            selectedResep.jam_penyerahan
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="text-sm font-medium mb-2">
                                    Detail Obat
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse border border-gray-200 text-sm">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="border px-3 py-2 text-left">
                                                    Kode
                                                </th>
                                                <th className="border px-3 py-2 text-left">
                                                    Nama Obat
                                                </th>
                                                <th className="border px-3 py-2 text-left">
                                                    Satuan
                                                </th>
                                                <th className="border px-3 py-2 text-right">
                                                    Tarif
                                                </th>
                                                <th className="border px-3 py-2 text-right">
                                                    Jumlah
                                                </th>
                                                <th className="border px-3 py-2 text-left">
                                                    Aturan Pakai
                                                </th>
                                                <th className="border px-3 py-2 text-right">
                                                    Embalase
                                                </th>
                                                <th className="border px-3 py-2 text-right">
                                                    Tuslah
                                                </th>
                                                <th className="border px-3 py-2 text-right">
                                                    Total Item
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(selectedResep.detail_obat || [])
                                                .length === 0 ? (
                                                <tr>
                                                    <td
                                                        colSpan={9}
                                                        className="border px-3 py-4 text-center text-gray-500"
                                                    >
                                                        Belum ada item obat pada
                                                        resep ini.
                                                    </td>
                                                </tr>
                                            ) : (
                                                (
                                                    selectedResep.detail_obat ||
                                                    []
                                                ).map((d, idx) => (
                                                    <React.Fragment
                                                        key={d.kode_brng || idx}
                                                    >
                                                        <tr>
                                                            <td className="border px-3 py-2 font-mono">
                                                                {d.kode_brng}
                                                            </td>
                                                            <td className="border px-3 py-2">
                                                                {d.nama_brng ||
                                                                    "-"}
                                                            </td>
                                                            <td className="border px-3 py-2">
                                                                {d.satuan ||
                                                                    "-"}
                                                            </td>
                                                            <td className="border px-3 py-2 text-right">
                                                                {formatRupiah(
                                                                    d.tarif || 0
                                                                )}
                                                            </td>
                                                            <td className="border px-3 py-2 text-right">
                                                                {d.jml}
                                                            </td>
                                                            <td className="border px-3 py-2">
                                                                {d.aturan_pakai ||
                                                                    "-"}
                                                            </td>
                                                            <td className="border px-3 py-2 text-right">
                                                                <Input
                                                                    type="number"
                                                                    min={0}
                                                                    step="1"
                                                                    value={
                                                                        typeof d.embalase ===
                                                                        "number"
                                                                            ? d.embalase
                                                                            : Number(
                                                                                  d.embalase ||
                                                                                      0
                                                                              )
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        updateNonRacikanCharge(
                                                                            idx,
                                                                            "embalase",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="w-28 text-right"
                                                                />
                                                            </td>
                                                            <td className="border px-3 py-2 text-right">
                                                                <Input
                                                                    type="number"
                                                                    min={0}
                                                                    step="1"
                                                                    value={
                                                                        typeof d.tuslah ===
                                                                        "number"
                                                                            ? d.tuslah
                                                                            : Number(
                                                                                  d.tuslah ||
                                                                                      0
                                                                              )
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        updateNonRacikanCharge(
                                                                            idx,
                                                                            "tuslah",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="w-28 text-right"
                                                                />
                                                            </td>
                                                            <td className="border px-3 py-2 text-right">
                                                                {formatRupiah(
                                                                    typeof d.subtotal ===
                                                                        "number"
                                                                        ? d.subtotal
                                                                        : Number(
                                                                              d.tarif ||
                                                                                  0
                                                                          ) *
                                                                              Number(
                                                                                  d.jml ||
                                                                                      0
                                                                              )
                                                                )}
                                                            </td>
                                                        </tr>
                                                        {/* Stok Info (FIFO) per item non-racikan */}
                                                        <tr>
                                                            <td
                                                                colSpan={9}
                                                                className="border px-3 py-2 bg-gray-50"
                                                            >
                                                                <div className="flex items-center justify-between">
                                                                    <div className="text-xs text-gray-600">
                                                                        Validasi
                                                                        stok &
                                                                        batch
                                                                        FIFO
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            onClick={() =>
                                                                                toggleStokInfo(
                                                                                    d.kode_brng
                                                                                )
                                                                            }
                                                                        >
                                                                            {stokInfoMap[
                                                                                d
                                                                                    .kode_brng
                                                                            ]
                                                                                ?.expanded
                                                                                ? "Sembunyikan Stok"
                                                                                : "Tampilkan Stok"}
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                                {stokInfoMap[
                                                                    d.kode_brng
                                                                ]?.expanded && (
                                                                    <div className="mt-2">
                                                                        {stokInfoMap[
                                                                            d
                                                                                .kode_brng
                                                                        ]
                                                                            ?.loading ? (
                                                                            <div className="text-xs text-gray-600">
                                                                                Memuat
                                                                                stok...
                                                                            </div>
                                                                        ) : stokInfoMap[
                                                                              d
                                                                                  .kode_brng
                                                                          ]
                                                                              ?.error ? (
                                                                            <div className="text-xs text-red-600">
                                                                                {
                                                                                    stokInfoMap[
                                                                                        d
                                                                                            .kode_brng
                                                                                    ]
                                                                                        ?.error
                                                                                }
                                                                            </div>
                                                                        ) : (
                                                                            (() => {
                                                                                const info =
                                                                                    stokInfoMap[
                                                                                        d
                                                                                            .kode_brng
                                                                                    ]
                                                                                        ?.data;
                                                                                if (
                                                                                    !info
                                                                                )
                                                                                    return null;
                                                                                const batches =
                                                                                    Array.isArray(
                                                                                        info.batch_detail
                                                                                    )
                                                                                        ? info.batch_detail
                                                                                        : [];
                                                                                const perBangsal =
                                                                                    info.stok_per_bangsal ||
                                                                                    {};
                                                                                return (
                                                                                    <div className="space-y-2">
                                                                                        <div className="text-xs">
                                                                                            Total
                                                                                            stok
                                                                                            tersedia:{" "}
                                                                                            <span className="font-semibold">
                                                                                                {
                                                                                                    info.total_stok
                                                                                                }
                                                                                            </span>
                                                                                        </div>
                                                                                        {/* Stok per bangsal */}
                                                                                        <div className="overflow-x-auto">
                                                                                            <table className="w-full text-xs border border-gray-200">
                                                                                                <thead>
                                                                                                    <tr className="bg-gray-100">
                                                                                                        <th className="border px-2 py-1 text-left">
                                                                                                            Bangsal
                                                                                                        </th>
                                                                                                        <th className="border px-2 py-1 text-right">
                                                                                                            Stok
                                                                                                        </th>
                                                                                                    </tr>
                                                                                                </thead>
                                                                                                <tbody>
                                                                                                    {Object.keys(
                                                                                                        perBangsal
                                                                                                    )
                                                                                                        .length ===
                                                                                                    0 ? (
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                colSpan={
                                                                                                                    2
                                                                                                                }
                                                                                                                className="border px-2 py-1 text-center text-gray-500"
                                                                                                            >
                                                                                                                Tidak
                                                                                                                ada
                                                                                                                data
                                                                                                                bangsal
                                                                                                                terkait.
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    ) : (
                                                                                                        Object.entries(
                                                                                                            perBangsal
                                                                                                        ).map(
                                                                                                            ([
                                                                                                                bangsal,
                                                                                                                stok,
                                                                                                            ]) => (
                                                                                                                <tr
                                                                                                                    key={
                                                                                                                        bangsal
                                                                                                                    }
                                                                                                                >
                                                                                                                    <td className="border px-2 py-1 font-mono">
                                                                                                                        {
                                                                                                                            bangsal
                                                                                                                        }
                                                                                                                    </td>
                                                                                                                    <td className="border px-2 py-1 text-right">
                                                                                                                        {
                                                                                                                            stok
                                                                                                                        }
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            )
                                                                                                        )
                                                                                                    )}
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </div>
                                                                                        {/* Detail batch (FIFO) */}
                                                                                        <div className="overflow-x-auto">
                                                                                            <table className="w-full text-xs border border-gray-200 mt-2">
                                                                                                <thead>
                                                                                                    <tr className="bg-gray-100">
                                                                                                        <th className="border px-2 py-1 text-left">
                                                                                                            Bangsal
                                                                                                        </th>
                                                                                                        <th className="border px-2 py-1 text-left">
                                                                                                            Batch
                                                                                                        </th>
                                                                                                        <th className="border px-2 py-1 text-left">
                                                                                                            Faktur
                                                                                                        </th>
                                                                                                        <th className="border px-2 py-1 text-right">
                                                                                                            Stok
                                                                                                        </th>
                                                                                                    </tr>
                                                                                                </thead>
                                                                                                <tbody>
                                                                                                    {batches.length ===
                                                                                                    0 ? (
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                colSpan={
                                                                                                                    4
                                                                                                                }
                                                                                                                className="border px-2 py-1 text-center text-gray-500"
                                                                                                            >
                                                                                                                Tidak
                                                                                                                ada
                                                                                                                batch
                                                                                                                aktif.
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    ) : (
                                                                                                        batches.map(
                                                                                                            (
                                                                                                                b,
                                                                                                                bi
                                                                                                            ) => (
                                                                                                                <tr
                                                                                                                    key={
                                                                                                                        bi
                                                                                                                    }
                                                                                                                >
                                                                                                                    <td className="border px-2 py-1 font-mono">
                                                                                                                        {
                                                                                                                            b.kd_bangsal
                                                                                                                        }
                                                                                                                    </td>
                                                                                                                    <td className="border px-2 py-1">
                                                                                                                        {b.no_batch ||
                                                                                                                            "-"}
                                                                                                                    </td>
                                                                                                                    <td className="border px-2 py-1">
                                                                                                                        {b.no_faktur ||
                                                                                                                            "-"}
                                                                                                                    </td>
                                                                                                                    <td className="border px-2 py-1 text-right">
                                                                                                                        {
                                                                                                                            b.stok
                                                                                                                        }
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            )
                                                                                                        )
                                                                                                    )}
                                                                                                </tbody>
                                                                                            </table>
                                                                                            <div className="text-[11px] text-gray-500 mt-1">
                                                                                                Pengurangan
                                                                                                stok
                                                                                                saat
                                                                                                penyerahan
                                                                                                menggunakan
                                                                                                urutan
                                                                                                FIFO
                                                                                                berdasarkan
                                                                                                batch.
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                );
                                                                            })()
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    </React.Fragment>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                {/* Racikan */}
                                {Array.isArray(selectedResep.racikan) &&
                                    selectedResep.racikan.length > 0 && (
                                        <div className="mt-6">
                                            <div className="text-sm font-medium mb-2">
                                                Detail Obat Racikan
                                            </div>
                                            {selectedResep.racikan.map(
                                                (grp, gidx) => (
                                                    <div
                                                        key={gidx}
                                                        className="mb-6"
                                                    >
                                                        <div className="flex items-center justify-between text-sm bg-gray-50 border p-3 rounded">
                                                            <div>
                                                                <div className="font-semibold">
                                                                    {grp.nama_racik ||
                                                                        `Racikan #${grp.no_racik}`}
                                                                </div>
                                                                <div className="text-gray-600">
                                                                    Metode:{" "}
                                                                    {grp.metode ||
                                                                        "-"}
                                                                </div>
                                                            </div>
                                                            <div className="text-right">
                                                                <div>
                                                                    Jumlah
                                                                    Racikan:{" "}
                                                                    {grp.jml_dr ??
                                                                        "-"}
                                                                </div>
                                                                <div>
                                                                    Aturan
                                                                    Pakai:{" "}
                                                                    {grp.aturan_pakai ||
                                                                        "-"}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="overflow-x-auto mt-2">
                                                            <table className="w-full border-collapse border border-gray-200 text-sm">
                                                                <thead>
                                                                    <tr className="bg-gray-100">
                                                                        <th className="border px-3 py-2 text-left">
                                                                            Kode
                                                                        </th>
                                                                        <th className="border px-3 py-2 text-left">
                                                                            Nama
                                                                            Obat
                                                                        </th>
                                                                        <th className="border px-3 py-2 text-left">
                                                                            Satuan
                                                                        </th>
                                                                        <th className="border px-3 py-2 text-right">
                                                                            Tarif
                                                                        </th>
                                                                        <th className="border px-3 py-2 text-right">
                                                                            Jumlah
                                                                        </th>
                                                                        <th className="border px-3 py-2 text-left">
                                                                            Kandungan
                                                                        </th>
                                                                        <th className="border px-3 py-2 text-right">
                                                                            Embalase
                                                                        </th>
                                                                        <th className="border px-3 py-2 text-right">
                                                                            Tuslah
                                                                        </th>
                                                                        <th className="border px-3 py-2 text-right">
                                                                            Total
                                                                            Item
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {(
                                                                        grp.details ||
                                                                        []
                                                                    ).length ===
                                                                    0 ? (
                                                                        <tr>
                                                                            <td
                                                                                colSpan={
                                                                                    9
                                                                                }
                                                                                className="border px-3 py-4 text-center text-gray-500"
                                                                            >
                                                                                Tidak
                                                                                ada
                                                                                detail
                                                                                racikan.
                                                                            </td>
                                                                        </tr>
                                                                    ) : (
                                                                        (
                                                                            grp.details ||
                                                                            []
                                                                        ).map(
                                                                            (
                                                                                d,
                                                                                idx
                                                                            ) => (
                                                                                <React.Fragment
                                                                                    key={
                                                                                        d.kode_brng ||
                                                                                        idx
                                                                                    }
                                                                                >
                                                                                    <tr>
                                                                                        <td className="border px-3 py-2 font-mono">
                                                                                            {
                                                                                                d.kode_brng
                                                                                            }
                                                                                        </td>
                                                                                        <td className="border px-3 py-2">
                                                                                            {d.nama_brng ||
                                                                                                "-"}
                                                                                        </td>
                                                                                        <td className="border px-3 py-2">
                                                                                            {d.satuan ||
                                                                                                "-"}
                                                                                        </td>
                                                                                        <td className="border px-3 py-2 text-right">
                                                                                            {formatRupiah(
                                                                                                d.tarif ||
                                                                                                    0
                                                                                            )}
                                                                                        </td>
                                                                                        <td className="border px-3 py-2 text-right">
                                                                                            {
                                                                                                d.jml
                                                                                            }
                                                                                        </td>
                                                                                        <td className="border px-3 py-2">
                                                                                            {d.kandungan ||
                                                                                                "-"}
                                                                                        </td>
                                                                                        <td className="border px-3 py-2 text-right">
                                                                                            <Input
                                                                                                type="number"
                                                                                                min={
                                                                                                    0
                                                                                                }
                                                                                                step="1"
                                                                                                value={
                                                                                                    typeof d.embalase ===
                                                                                                    "number"
                                                                                                        ? d.embalase
                                                                                                        : Number(
                                                                                                              d.embalase ||
                                                                                                                  0
                                                                                                          )
                                                                                                }
                                                                                                onChange={(
                                                                                                    e
                                                                                                ) =>
                                                                                                    updateRacikanCharge(
                                                                                                        gidx,
                                                                                                        idx,
                                                                                                        "embalase",
                                                                                                        e
                                                                                                            .target
                                                                                                            .value
                                                                                                    )
                                                                                                }
                                                                                                className="w-28 text-right"
                                                                                            />
                                                                                        </td>
                                                                                        <td className="border px-3 py-2 text-right">
                                                                                            <Input
                                                                                                type="number"
                                                                                                min={
                                                                                                    0
                                                                                                }
                                                                                                step="1"
                                                                                                value={
                                                                                                    typeof d.tuslah ===
                                                                                                    "number"
                                                                                                        ? d.tuslah
                                                                                                        : Number(
                                                                                                              d.tuslah ||
                                                                                                                  0
                                                                                                          )
                                                                                                }
                                                                                                onChange={(
                                                                                                    e
                                                                                                ) =>
                                                                                                    updateRacikanCharge(
                                                                                                        gidx,
                                                                                                        idx,
                                                                                                        "tuslah",
                                                                                                        e
                                                                                                            .target
                                                                                                            .value
                                                                                                    )
                                                                                                }
                                                                                                className="w-28 text-right"
                                                                                            />
                                                                                        </td>
                                                                                        <td className="border px-3 py-2 text-right">
                                                                                            {formatRupiah(
                                                                                                typeof d.subtotal ===
                                                                                                    "number"
                                                                                                    ? d.subtotal
                                                                                                    : Number(
                                                                                                          d.tarif ||
                                                                                                              0
                                                                                                      ) *
                                                                                                          Number(
                                                                                                              d.jml ||
                                                                                                                  0
                                                                                                          )
                                                                                            )}
                                                                                        </td>
                                                                                    </tr>
                                                                                    {/* Stok Info (FIFO) per item racikan */}
                                                                                    <tr>
                                                                                        <td
                                                                                            colSpan={
                                                                                                9
                                                                                            }
                                                                                            className="border px-3 py-2 bg-gray-50"
                                                                                        >
                                                                                            <div className="flex items-center justify-between">
                                                                                                <div className="text-xs text-gray-600">
                                                                                                    Validasi
                                                                                                    stok
                                                                                                    &
                                                                                                    batch
                                                                                                    FIFO
                                                                                                </div>
                                                                                                <div className="flex items-center gap-2">
                                                                                                    <Button
                                                                                                        variant="outline"
                                                                                                        size="sm"
                                                                                                        onClick={() =>
                                                                                                            toggleStokInfo(
                                                                                                                d.kode_brng
                                                                                                            )
                                                                                                        }
                                                                                                    >
                                                                                                        {stokInfoMap[
                                                                                                            d
                                                                                                                .kode_brng
                                                                                                        ]
                                                                                                            ?.expanded
                                                                                                            ? "Sembunyikan Stok"
                                                                                                            : "Tampilkan Stok"}
                                                                                                    </Button>
                                                                                                </div>
                                                                                            </div>
                                                                                            {stokInfoMap[
                                                                                                d
                                                                                                    .kode_brng
                                                                                            ]
                                                                                                ?.expanded && (
                                                                                                <div className="mt-2">
                                                                                                    {stokInfoMap[
                                                                                                        d
                                                                                                            .kode_brng
                                                                                                    ]
                                                                                                        ?.loading ? (
                                                                                                        <div className="text-xs text-gray-600">
                                                                                                            Memuat
                                                                                                            stok...
                                                                                                        </div>
                                                                                                    ) : stokInfoMap[
                                                                                                          d
                                                                                                              .kode_brng
                                                                                                      ]
                                                                                                          ?.error ? (
                                                                                                        <div className="text-xs text-red-600">
                                                                                                            {
                                                                                                                stokInfoMap[
                                                                                                                    d
                                                                                                                        .kode_brng
                                                                                                                ]
                                                                                                                    ?.error
                                                                                                            }
                                                                                                        </div>
                                                                                                    ) : (
                                                                                                        (() => {
                                                                                                            const info =
                                                                                                                stokInfoMap[
                                                                                                                    d
                                                                                                                        .kode_brng
                                                                                                                ]
                                                                                                                    ?.data;
                                                                                                            if (
                                                                                                                !info
                                                                                                            )
                                                                                                                return null;
                                                                                                            const batches =
                                                                                                                Array.isArray(
                                                                                                                    info.batch_detail
                                                                                                                )
                                                                                                                    ? info.batch_detail
                                                                                                                    : [];
                                                                                                            const perBangsal =
                                                                                                                info.stok_per_bangsal ||
                                                                                                                {};
                                                                                                            return (
                                                                                                                <div className="space-y-2">
                                                                                                                    <div className="text-xs">
                                                                                                                        Total
                                                                                                                        stok
                                                                                                                        tersedia:{" "}
                                                                                                                        <span className="font-semibold">
                                                                                                                            {
                                                                                                                                info.total_stok
                                                                                                                            }
                                                                                                                        </span>
                                                                                                                    </div>
                                                                                                                    {/* Stok per bangsal */}
                                                                                                                    <div className="overflow-x-auto">
                                                                                                                        <table className="w-full text-xs border border-gray-200">
                                                                                                                            <thead>
                                                                                                                                <tr className="bg-gray-100">
                                                                                                                                    <th className="border px-2 py-1 text-left">
                                                                                                                                        Bangsal
                                                                                                                                    </th>
                                                                                                                                    <th className="border px-2 py-1 text-right">
                                                                                                                                        Stok
                                                                                                                                    </th>
                                                                                                                                </tr>
                                                                                                                            </thead>
                                                                                                                            <tbody>
                                                                                                                                {Object.keys(
                                                                                                                                    perBangsal
                                                                                                                                )
                                                                                                                                    .length ===
                                                                                                                                0 ? (
                                                                                                                                    <tr>
                                                                                                                                        <td
                                                                                                                                            colSpan={
                                                                                                                                                2
                                                                                                                                            }
                                                                                                                                            className="border px-2 py-1 text-center text-gray-500"
                                                                                                                                        >
                                                                                                                                            Tidak
                                                                                                                                            ada
                                                                                                                                            data
                                                                                                                                            bangsal
                                                                                                                                            terkait.
                                                                                                                                        </td>
                                                                                                                                    </tr>
                                                                                                                                ) : (
                                                                                                                                    Object.entries(
                                                                                                                                        perBangsal
                                                                                                                                    ).map(
                                                                                                                                        ([
                                                                                                                                            bangsal,
                                                                                                                                            stok,
                                                                                                                                        ]) => (
                                                                                                                                            <tr
                                                                                                                                                key={
                                                                                                                                                    bangsal
                                                                                                                                                }
                                                                                                                                            >
                                                                                                                                                <td className="border px-2 py-1 font-mono">
                                                                                                                                                    {
                                                                                                                                                        bangsal
                                                                                                                                                    }
                                                                                                                                                </td>
                                                                                                                                                <td className="border px-2 py-1 text-right">
                                                                                                                                                    {
                                                                                                                                                        stok
                                                                                                                                                    }
                                                                                                                                                </td>
                                                                                                                                            </tr>
                                                                                                                                        )
                                                                                                                                    )
                                                                                                                                )}
                                                                                                                            </tbody>
                                                                                                                        </table>
                                                                                                                    </div>
                                                                                                                    {/* Detail batch (FIFO) */}
                                                                                                                    <div className="overflow-x-auto">
                                                                                                                        <table className="w-full text-xs border border-gray-200 mt-2">
                                                                                                                            <thead>
                                                                                                                                <tr className="bg-gray-100">
                                                                                                                                    <th className="border px-2 py-1 text-left">
                                                                                                                                        Bangsal
                                                                                                                                    </th>
                                                                                                                                    <th className="border px-2 py-1 text-left">
                                                                                                                                        Batch
                                                                                                                                    </th>
                                                                                                                                    <th className="border px-2 py-1 text-left">
                                                                                                                                        Faktur
                                                                                                                                    </th>
                                                                                                                                    <th className="border px-2 py-1 text-right">
                                                                                                                                        Stok
                                                                                                                                    </th>
                                                                                                                                </tr>
                                                                                                                            </thead>
                                                                                                                            <tbody>
                                                                                                                                {batches.length ===
                                                                                                                                0 ? (
                                                                                                                                    <tr>
                                                                                                                                        <td
                                                                                                                                            colSpan={
                                                                                                                                                4
                                                                                                                                            }
                                                                                                                                            className="border px-2 py-1 text-center text-gray-500"
                                                                                                                                        >
                                                                                                                                            Tidak
                                                                                                                                            ada
                                                                                                                                            batch
                                                                                                                                            aktif.
                                                                                                                                        </td>
                                                                                                                                    </tr>
                                                                                                                                ) : (
                                                                                                                                    batches.map(
                                                                                                                                        (
                                                                                                                                            b,
                                                                                                                                            bi
                                                                                                                                        ) => (
                                                                                                                                            <tr
                                                                                                                                                key={
                                                                                                                                                    bi
                                                                                                                                                }
                                                                                                                                            >
                                                                                                                                                <td className="border px-2 py-1 font-mono">
                                                                                                                                                    {
                                                                                                                                                        b.kd_bangsal
                                                                                                                                                    }
                                                                                                                                                </td>
                                                                                                                                                <td className="border px-2 py-1">
                                                                                                                                                    {b.no_batch ||
                                                                                                                                                        "-"}
                                                                                                                                                </td>
                                                                                                                                                <td className="border px-2 py-1">
                                                                                                                                                    {b.no_faktur ||
                                                                                                                                                        "-"}
                                                                                                                                                </td>
                                                                                                                                                <td className="border px-2 py-1 text-right">
                                                                                                                                                    {
                                                                                                                                                        b.stok
                                                                                                                                                    }
                                                                                                                                                </td>
                                                                                                                                            </tr>
                                                                                                                                        )
                                                                                                                                    )
                                                                                                                                )}
                                                                                                                            </tbody>
                                                                                                                        </table>
                                                                                                                        <div className="text-[11px] text-gray-500 mt-1">
                                                                                                                            Pengurangan
                                                                                                                            stok
                                                                                                                            saat
                                                                                                                            penyerahan
                                                                                                                            menggunakan
                                                                                                                            urutan
                                                                                                                            FIFO
                                                                                                                            berdasarkan
                                                                                                                            batch.
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            );
                                                                                                        })()
                                                                                                    )}
                                                                                                </div>
                                                                                            )}
                                                                                        </td>
                                                                                    </tr>
                                                                                </React.Fragment>
                                                                            )
                                                                        )
                                                                    )}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                {/* Ringkasan total */}
                                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                                    <div className="space-y-1">
                                        <div className="text-gray-600">
                                            Total
                                        </div>
                                        <div className="font-semibold">
                                            {formatRupiah(
                                                computeTotals(selectedResep)
                                                    .subtotal
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-gray-600">
                                            Tambahan (Embalase + Tuslah)
                                        </div>
                                        <div className="font-semibold">
                                            {formatRupiah(
                                                computeTotals(selectedResep)
                                                    .tambahan_total
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-gray-600">
                                            PPN (
                                            {Math.round(
                                                (computeTotals(selectedResep)
                                                    .ppn_rate || 0.11) * 100
                                            )}
                                            %)
                                        </div>
                                        <div className="font-semibold">
                                            {formatRupiah(
                                                computeTotals(selectedResep).ppn
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-1 col-span-2">
                                        <div className="text-gray-600">
                                            Total + PPN
                                        </div>
                                        <div className="text-lg font-bold">
                                            {formatRupiah(
                                                computeTotals(selectedResep)
                                                    .total_plus_ppn
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* Tombol aksi */}
                                <div className="mt-4 flex justify-end gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowDetail(false)}
                                    >
                                        Tutup
                                    </Button>
                                    <Button
                                        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                                        disabled={
                                            saving ||
                                            (selectedResep?.tgl_penyerahan &&
                                                selectedResep?.tgl_penyerahan !==
                                                    "0000-00-00" &&
                                                selectedResep?.tgl_penyerahan !== "")
                                        }
                                        onClick={handleValidasi}
                                    >
                                        {saving
                                            ? "Memproses..."
                                            : "Proses Penyerahan"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* Konfirmasi Penyerahan */}
                {confirmOpen && selectedResep && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
                            <div className="px-6 py-4 border-b">
                                <h4 className="text-base font-semibold">
                                    Konfirmasi Penyerahan Obat
                                </h4>
                            </div>
                            <div className="px-6 py-4 text-sm space-y-3">
                                <p>
                                    Anda akan memproses penyerahan untuk Resep
                                    <span className="font-mono font-semibold">
                                        {" "}
                                        #{selectedResep.no_resep}
                                    </span>
                                    .
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <div className="text-gray-600">
                                            Total
                                        </div>
                                        <div className="font-semibold">
                                            {formatRupiah(
                                                computeTotals(selectedResep)
                                                    .subtotal
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-gray-600">
                                            Tambahan (Embalase + Tuslah)
                                        </div>
                                        <div className="font-semibold">
                                            {formatRupiah(
                                                computeTotals(selectedResep)
                                                    .tambahan_total
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-gray-600">PPN</div>
                                        <div className="font-semibold">
                                            {formatRupiah(
                                                computeTotals(selectedResep).ppn
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="text-gray-600">
                                            Total + PPN
                                        </div>
                                        <div className="text-lg font-bold">
                                            {formatRupiah(
                                                computeTotals(selectedResep)
                                                    .total_plus_ppn
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-xs text-yellow-800">
                                    - Pastikan stok tersedia pada depo terkait.
                                    Penyerahan akan mengurangi stok dengan
                                    metode FIFO.
                                    <br />- Perubahan Embalase/Tuslah per item
                                    yang Anda edit akan ikut dikirim ke server
                                    sebagai bagian dari penyerahan.
                                </div>
                            </div>
                            <div className="px-6 py-4 border-t flex justify-end gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setConfirmOpen(false)}
                                >
                                    Batal
                                </Button>
                                <Button
                                    className="bg-blue-600 hover:bg-blue-700"
                                    onClick={handlePenyerahan}
                                    disabled={saving}
                                >
                                    {saving ? "Memproses..." : "Ya, Serahkan"}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </SidebarFarmasi>
    );
};

export default DaftarPermintaanResep;
