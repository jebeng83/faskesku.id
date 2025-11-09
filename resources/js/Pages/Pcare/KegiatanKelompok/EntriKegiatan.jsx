import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import AppLayout from "@/Layouts/AppLayout";

const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.04 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 16, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
};

// Lightweight inline icons (no external deps)
const Icon = {
    X: (props) => (
        <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
            {...props}
        >
            <path strokeLinecap="round" d="M5 5l10 10M15 5L5 15" />
        </svg>
    ),
    Search: (props) => (
        <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
            {...props}
        >
            <circle cx="8.5" cy="8.5" r="5.5" />
            <path strokeLinecap="round" d="M12.5 12.5L17 17" />
        </svg>
    ),
    Plus: (props) => (
        <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
            {...props}
        >
            <path strokeLinecap="round" d="M10 4v12M4 10h12" />
        </svg>
    ),
    Check: (props) => (
        <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
            {...props}
        >
            <path strokeLinecap="round" d="M4 10l4 4 8-8" />
        </svg>
    ),
    Info: (props) => (
        <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
            {...props}
        >
            <circle cx="10" cy="10" r="8" />
            <path strokeLinecap="round" d="M10 6.5h.01M9 9.5h2v4H9z" />
        </svg>
    ),
};

// Utility classes to unify look & feel
const ui = {
    label: "block text-[11px] font-medium text-slate-700 mb-1",
    // Input yang lebih tegas: border + ring jelas, background putih, padding lebih nyaman
    input: "w-full rounded-lg border border-slate-300 bg-white text-sm px-3 py-2 shadow-inner focus:border-slate-500 focus:ring-2 focus:ring-slate-300/70 placeholder:text-slate-400",
    inputMuted:
        "w-full rounded-lg border border-slate-300 bg-slate-100 text-sm px-3 py-2 text-slate-700",
    select: "w-full rounded-lg border border-slate-300 bg-white text-sm px-3 py-2 focus:border-slate-500 focus:ring-2 focus:ring-slate-300/70",
    textarea:
        "w-full rounded-lg border border-slate-300 bg-white text-sm px-3 py-2 shadow-inner focus:border-slate-500 focus:ring-2 focus:ring-slate-300/70",
    btnPrimary:
        "inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 disabled:opacity-50",
    btnNeutral:
        "inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-300 hover:bg-slate-50",
    btnSlate:
        "inline-flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400/60 disabled:opacity-50",
    btnDangerSoft:
        "inline-flex items-center rounded-lg bg-rose-50 px-2 py-1 text-[11px] font-medium text-rose-700 ring-1 ring-rose-200 hover:bg-rose-100 disabled:opacity-50",
};

function toDdMmYyyy(from) {
    if (!from) return "";
    if (/^\d{2}-\d{2}-\d{4}$/.test(from)) return from;
    if (/^\d{4}-\d{2}-\d{2}$/.test(from)) {
        const [y, m, d] = from.split("-");
        return `${d}-${m}-${y}`;
    }
    return from;
}

function getCsrfToken() {
    if (typeof document === "undefined") return null;
    const meta = document.head?.querySelector('meta[name="csrf-token"]');
    return meta?.getAttribute("content");
}

export default function EntriKegiatan() {
    const todayDate = useMemo(() => {
        const d = new Date();
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${y}-${m}-${day}`; // input type=date
    }, []);

    const todayMonth = useMemo(() => {
        const d = new Date();
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        return `${y}-${m}`; // input type=month
    }, []);

    // Form state
    const [tglPelaksanaan, setTglPelaksanaan] = useState(todayDate);
    const [kdProgram, setKdProgram] = useState("01"); // 01=DM, 02=Hipertensi
    const [clubId, setClubId] = useState("");
    const [jenisKegiatan, setJenisKegiatan] = useState("Penyuluhan/Edukasi");
    const [cara, setCara] = useState("Tatap Muka");
    const [narasumber, setNarasumber] = useState("Internal");
    const [materi, setMateri] = useState("");
    const [pembicaraNoKartu, setPembicaraNoKartu] = useState("");
    const [namaPembicara, setNamaPembicara] = useState("");
    const [lokasi, setLokasi] = useState("");
    const [biayaHonor, setBiayaHonor] = useState("0");
    const [biayaHonorOptions, setBiayaHonorOptions] = useState([0, 500000]);
    const [biayaKonsumsi, setBiayaKonsumsi] = useState("0");
    const [jmlPeserta, setJmlPeserta] = useState("0");
    const [totalKonsumsi, setTotalKonsumsi] = useState("0");
    const [totalBiaya, setTotalBiaya] = useState("0");
    const [keterangan, setKeterangan] = useState("");

    // Data state
    const [clubOptions, setClubOptions] = useState([]);
    const [loadingClub, setLoadingClub] = useState(false);
    const [errorClub, setErrorClub] = useState("");
    // Saat masuk mode edit, kita ingin memastikan clubId yang ada di riwayat terpilih, jadi gunakan preferredClubId sementara
    const [preferredClubId, setPreferredClubId] = useState("");

    const [bulanRiwayat, setBulanRiwayat] = useState(todayMonth);
    const [loadingRiwayat, setLoadingRiwayat] = useState(false);
    const [errorRiwayat, setErrorRiwayat] = useState("");
    const [riwayatAction, setRiwayatAction] = useState("");
    const [riwayatActionError, setRiwayatActionError] = useState("");
    const [riwayat, setRiwayat] = useState(null);

    const [loadingPembicara, setLoadingPembicara] = useState(false);
    const [errorPembicara, setErrorPembicara] = useState("");

    const [pesertaRows, setPesertaRows] = useState([]);
    // Pagination untuk tabel "Daftar Hadir Peserta"
    const [pesertaPage, setPesertaPage] = useState(1);
    const [pesertaPerPage, setPesertaPerPage] = useState(10);
    const [addingPeserta, setAddingPeserta] = useState(false);
    const [pesertaNoKartu, setPesertaNoKartu] = useState("");
    const [loadingPeserta, setLoadingPeserta] = useState(false);
    const [errorPeserta, setErrorPeserta] = useState("");
    const [pesertaListAction, setPesertaListAction] = useState("");
    const [pesertaListActionError, setPesertaListActionError] = useState("");
    // Pilihan peserta pada modal (checkbox)
    const [selectedNoKartu, setSelectedNoKartu] = useState("");
    // State untuk Add Peserta Kegiatan (POST /kelompok/peserta)
    const [eduIdKegiatan, setEduIdKegiatan] = useState("");
    const [addingPesertaPosting, setAddingPesertaPosting] = useState(false);
    const [addPesertaSuccess, setAddPesertaSuccess] = useState("");
    const [addPesertaError, setAddPesertaError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [submitSuccess, setSubmitSuccess] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [proposeAddInstead, setProposeAddInstead] = useState(false);
    const [deletingEduId, setDeletingEduId] = useState("");
    const [deletingPesertaNoKartu, setDeletingPesertaNoKartu] = useState("");

    // UI states: skeleton loading untuk tabel peserta dan toast notifications
    const [loadingPesertaTable, setLoadingPesertaTable] = useState(false);
    const [toasts, setToasts] = useState([]);
    const showToast = (type, message) => {
        const id = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        setToasts((prev) => [...prev, { id, type, message }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3600);
    };

    // Clamp halaman jika jumlah data berubah atau ukuran halaman berubah
    useEffect(() => {
        const totalPages = Math.max(
            1,
            Math.ceil((pesertaRows?.length || 0) / (pesertaPerPage || 10))
        );
        setPesertaPage((prev) => Math.min(Math.max(1, prev), totalPages));
    }, [pesertaRows, pesertaPerPage]);

    // Helpers
    useEffect(() => {
        // Auto compute totalBiaya
        const toNum = (v) => {
            const n = Number(String(v).replace(/[^0-9.-]/g, ""));
            return isNaN(n) ? 0 : n;
        };
        const total = toNum(biayaHonor) + toNum(totalKonsumsi);
        setTotalBiaya(String(total));
    }, [biayaHonor, totalKonsumsi]);

    // When Cara is Luring, total konsumsi = biaya konsumsi x jumlah peserta. If not, zero.
    useEffect(() => {
        const toNum = (v) => {
            const n = Number(String(v).replace(/[^0-9.-]/g, ""));
            return isNaN(n) ? 0 : n;
        };
        if (cara === "Luring") {
            const total = toNum(biayaKonsumsi) * toNum(jmlPeserta);
            setTotalKonsumsi(String(total));
        } else {
            setTotalKonsumsi("0");
        }
    }, [biayaKonsumsi, jmlPeserta, cara]);

    const fetchClubs = async (program) => {
        setLoadingClub(true);
        setErrorClub("");
        setClubOptions([]);
        setClubId("");
        try {
            const res = await fetch(
                `/pcare/api/kelompok/club/${encodeURIComponent(program)}`
            );
            const json = await res.json();
            if (!res.ok)
                throw new Error(
                    json?.metaData?.message || "Gagal mengambil data club"
                );
            const opts = (json?.response?.list || []).map((i) => ({
                value: i.clubId,
                label: i.nama || i.clubId,
                meta: i,
            }));
            setClubOptions(opts);
            // Jika ada preferredClubId (dari riwayat), prioritaskan itu
            const pref = String(preferredClubId || "").trim();
            if (pref && opts.some((o) => String(o.value) === pref)) {
                setClubId(pref);
            } else if (opts.length) {
                setClubId(opts[0].value);
            }
            setPreferredClubId("");
        } catch (e) {
            setErrorClub(e.message || "Terjadi kesalahan");
        } finally {
            setLoadingClub(false);
        }
    };

    useEffect(() => {
        fetchClubs(kdProgram);
    }, [kdProgram]);

    // Saat Jenis Kelompok berubah, tampilkan ulang pilihan biaya honor dan reset nilai
    useEffect(() => {
        // Opsi tetap 0 dan 500000 sesuai kebutuhan saat ini
        setBiayaHonorOptions([0, 500000]);
        // Reset agar pengguna memilih kembali sesuai kelompok
        setBiayaHonor("");
    }, [kdProgram]);

    const cariPembicara = async () => {
        setErrorPembicara("");
        if (!pembicaraNoKartu) {
            setErrorPembicara("Mohon isi nomor kartu BPJS pembicara");
            return;
        }
        setLoadingPembicara(true);
        try {
            // Versi sederhana sesuai katalog: GET /pcare/api/peserta/{noka}
            const res = await fetch(
                `/pcare/api/peserta/${encodeURIComponent(pembicaraNoKartu)}`
            );
            const json = await res.json();
            if (!res.ok)
                throw new Error(
                    json?.metaData?.message || "Peserta tidak ditemukan"
                );
            const p = json?.response || json?.data || {};
            const nama =
                p?.nama ||
                json?.response?.peserta?.nama ||
                json?.data?.peserta?.nama ||
                "";
            if (nama) setNamaPembicara(nama);
            else
                setErrorPembicara("Nama pembicara tidak tersedia pada respons");
        } catch (e) {
            setErrorPembicara(e.message || "Terjadi kesalahan");
        } finally {
            setLoadingPembicara(false);
        }
    };

    const fetchRiwayat = async () => {
        setErrorRiwayat("");
        setRiwayatAction("");
        setLoadingRiwayat(true);
        setRiwayat(null);
        const ddmmyyyy = (() => {
            // Convert yyyy-MM to dd-mm-yyyy using day 01
            const b = bulanRiwayat;
            if (/^\d{4}-\d{2}$/.test(b)) {
                const [y, m] = b.split("-");
                return `01-${m}-${y}`;
            }
            return toDdMmYyyy(b);
        })();
        try {
            const res = await fetch(
                `/pcare/api/kelompok/kegiatan/${encodeURIComponent(ddmmyyyy)}`
            );
            const json = await res.json();
            if (!res.ok)
                throw new Error(
                    json?.metaData?.message || "Gagal mengambil riwayat"
                );

            // Dedup moderat: gunakan kunci gabungan (tglPelayanan + jenisKegiatan + materi + clubId)
            // agar setiap club Prolanis ditampilkan terpisah per tanggal seperti sebelumnya.
            const list = json?.response?.list || [];
            const groups = new Map();
            for (const it of list) {
                const jenisRaw = (
                    it?.kegiatan?.kdKegiatan ||
                    it?.kegiatan?.nama ||
                    ""
                )
                    .toString()
                    .trim()
                    .toLowerCase();
                const materiRaw = (it?.materi || "")
                    .toString()
                    .trim()
                    .toLowerCase();
                // Ambil identitas club yang konsisten
                const clubIdRaw =
                    it?.clubId ??
                    it?.clubProl?.clubId ??
                    it?.clubProl?.kdClub ??
                    it?.clubProl?.id ??
                    (it?.clubProl?.nama || "").toString().trim();
                const key = `${
                    it?.tglPelayanan || ""
                }__${jenisRaw}__${materiRaw}__${String(clubIdRaw)}`;

                if (!groups.has(key)) {
                    groups.set(key, { rep: it });
                }
            }

            const uniq = Array.from(groups.values()).map(({ rep }) => ({
                ...rep,
            }));

            const normalized = {
                ...json,
                response: { ...(json.response || {}), list: uniq },
            };
            setRiwayat(normalized);
        } catch (e) {
            setErrorRiwayat(e.message || "Terjadi kesalahan");
        } finally {
            setLoadingRiwayat(false);
        }
    };

    // Hapus Kegiatan dari riwayat (DELETE /kelompok/kegiatan/{eduId})
    const hapusKegiatan = async (eduId) => {
        const id = String(eduId || "").trim();
        setRiwayatAction("");
        setRiwayatActionError("");
        if (!id) {
            setRiwayatActionError("eduId tidak tersedia untuk dihapus.");
            return;
        }
        const ok = window.confirm(
            "Yakin ingin menghapus kegiatan ini dari BPJS PCare?"
        );
        if (!ok) return;
        setDeletingEduId(id);
        try {
            const res = await fetch(
                `/pcare/api/kelompok/kegiatan/${encodeURIComponent(id)}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        "X-CSRF-TOKEN": getCsrfToken() || undefined,
                        "X-Requested-With": "XMLHttpRequest",
                    },
                    credentials: "same-origin",
                }
            );
            const json = await res.json().catch(() => ({}));
            if (!res.ok) {
                throw new Error(
                    json?.metaData?.message ||
                        json?.message ||
                        "Gagal menghapus kegiatan"
                );
            }
            setRiwayatAction(
                json?.metaData?.message || "Kegiatan berhasil dihapus"
            );
            showToast(
                "success",
                json?.metaData?.message || "Kegiatan berhasil dihapus"
            );
            // Refresh data riwayat supaya sinkron
            try {
                await fetchRiwayat();
            } catch (_) {}
        } catch (e) {
            setRiwayatActionError(
                e.message || "Terjadi kesalahan saat menghapus kegiatan"
            );
            showToast(
                "error",
                e.message || "Terjadi kesalahan saat menghapus kegiatan"
            );
        } finally {
            setDeletingEduId("");
        }
    };

    const resetForm = () => {
        setTglPelaksanaan(todayDate);
        setKdProgram("01");
        setClubId("");
        setJenisKegiatan("Penyuluhan/Edukasi");
        setCara("Tatap Muka");
        setNarasumber("Internal");
        setMateri("");
        setPembicaraNoKartu("");
        setNamaPembicara("");
        setLokasi("");
        setBiayaHonor("");
        setBiayaKonsumsi("0");
        setJmlPeserta("0");
        setTotalKonsumsi("0");
        setTotalBiaya("0");
        setKeterangan("");
        setPesertaRows([]);
    };

    const tambahData = async () => {
        setSubmitError("");
        setSubmitSuccess("");

        // Validasi minimal
        if (!clubId) {
            setSubmitError("Mohon pilih Club Prolanis terlebih dahulu.");
            return;
        }
        if (!tglPelaksanaan) {
            setSubmitError("Tanggal pelaksanaan wajib diisi.");
            return;
        }
        if (!biayaHonor) {
            setSubmitError("Pilih biaya honor narasumber.");
            return;
        }

        const toDdMmYyyyLocal = (val) => toDdMmYyyy(val || tglPelaksanaan);
        const mapKdKegiatan = (label) => {
            const s = String(label || "").toLowerCase();
            const hasSenam = s.includes("senam");
            const hasPenyuluhan =
                s.includes("penyuluhan") || s.includes("edukasi");
            if (hasSenam && !hasPenyuluhan) return "01"; // Senam
            if (hasPenyuluhan && !hasSenam) return "10"; // Penyuluhan
            if (hasSenam && hasPenyuluhan) return "11"; // Penyuluhan dan Senam
            return "11"; // fallback
        };

        const payload = {
            eduId: isEditing ? eduIdKegiatan || null : null,
            clubId: isNaN(Number(clubId)) ? clubId : Number(clubId),
            tglPelayanan: toDdMmYyyyLocal(tglPelaksanaan),
            kdKegiatan: mapKdKegiatan(jenisKegiatan),
            kdKelompok: kdProgram, // 01=DM, 02=Hipertensi
            materi,
            pembicara: namaPembicara || pembicaraNoKartu || "",
            lokasi,
            keterangan,
            biaya: Number(totalBiaya || 0),
        };

        setSubmitting(true);
        setProposeAddInstead(false);
        try {
            let lastStatus = 0;
            // Perbaikan 405 Method Not Allowed untuk PUT:
            // - Gunakan method spoofing via POST + FormData dengan _method=PUT ketika isEditing=true
            // - Biarkan browser yang menetapkan Content-Type (multipart/form-data) agar Laravel mengenali _method
            const formData = new FormData();
            Object.entries(payload).forEach(([key, val]) => {
                if (typeof val !== "undefined" && val !== null) {
                    formData.append(key, String(val));
                }
            });
            if (isEditing) {
                formData.append("_method", "PUT");
            }

            const res = await fetch("/pcare/api/kelompok/kegiatan", {
                method: "POST",
                headers: {
                    // Jangan set Content-Type manual, biarkan browser mengisi boundary untuk FormData
                    "X-CSRF-TOKEN": getCsrfToken() || undefined,
                    "X-Requested-With": "XMLHttpRequest",
                    Accept: "application/json",
                },
                credentials: "same-origin",
                body: formData,
            });
            lastStatus = res.status;
            const json = await res.json().catch(() => ({}));
            if (!res.ok) {
                // Tampilkan pesan khusus untuk 405 (PCare Method Not Allowed) dan 412 (PCare bukan Administrator)
                if (res.status === 405) {
                    setProposeAddInstead(true);
                    throw new Error(
                        "Metode PUT tidak diizinkan oleh layanan PCare untuk endpoint ini. Coba simpan sebagai data baru (POST), atau hubungi admin BPJS/PCare untuk konfirmasi dukungan update."
                    );
                }
                if (res.status === 412) {
                    throw new Error(
                        json?.metaData?.message ||
                            "Aksi tidak diizinkan oleh PCare (412). Pastikan akun PCare memiliki hak Administrator untuk mengubah/hapus kegiatan/peserta."
                    );
                }
                throw new Error(
                    json?.metaData?.message ||
                        json?.message ||
                        (isEditing
                            ? "Gagal mengubah kegiatan"
                            : "Gagal menambah kegiatan")
                );
            }
            setSubmitSuccess(
                json?.metaData?.message ||
                    (isEditing
                        ? "Kegiatan berhasil diperbarui"
                        : "Kegiatan berhasil ditambahkan")
            );
            // Jika respon berisi eduId, simpan agar bisa digunakan untuk Add Peserta
            const maybeEduId = json?.response?.eduId || json?.eduId || "";
            if (maybeEduId) setEduIdKegiatan(String(maybeEduId));
            // Opsional: reset form setelah sukses
            // resetForm();
        } catch (e) {
            setSubmitError(
                e.message ||
                    (isEditing
                        ? "Terjadi kesalahan saat mengubah kegiatan"
                        : "Terjadi kesalahan saat menambah kegiatan")
            );
        } finally {
            setSubmitting(false);
        }
    };

    const simpanSebagaiBaru = async () => {
        // Bangun payload tanpa eduId dan kirim POST JSON agar dibuat kegiatan baru
        const toDdMmYyyyLocal = (val) => toDdMmYyyy(val || tglPelaksanaan);
        const mapKdKegiatan = (label) => {
            const s = String(label || "").toLowerCase();
            const hasSenam = s.includes("senam");
            const hasPenyuluhan =
                s.includes("penyuluhan") || s.includes("edukasi");
            if (hasSenam && !hasPenyuluhan) return "01";
            if (hasPenyuluhan && !hasSenam) return "10";
            if (hasSenam && hasPenyuluhan) return "11";
            return "11";
        };

        const payloadBaru = {
            clubId: isNaN(Number(clubId)) ? clubId : Number(clubId),
            tglPelayanan: toDdMmYyyyLocal(tglPelaksanaan),
            kdKegiatan: mapKdKegiatan(jenisKegiatan),
            kdKelompok: kdProgram,
            materi,
            pembicara: namaPembicara || pembicaraNoKartu || "",
            lokasi,
            keterangan,
            biaya: Number(totalBiaya || 0),
        };

        setSubmitting(true);
        setSubmitError("");
        setSubmitSuccess("");
        try {
            const res = await fetch("/pcare/api/kelompok/kegiatan", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "X-CSRF-TOKEN": getCsrfToken() || undefined,
                    "X-Requested-With": "XMLHttpRequest",
                    Accept: "application/json",
                },
                credentials: "same-origin",
                body: JSON.stringify(payloadBaru),
            });
            const json = await res.json().catch(() => ({}));
            if (!res.ok) {
                throw new Error(
                    json?.metaData?.message ||
                        json?.message ||
                        "Gagal menambah kegiatan"
                );
            }
            setSubmitSuccess(
                json?.metaData?.message || "Kegiatan berhasil ditambahkan"
            );
            const maybeEduId = json?.response?.eduId || json?.eduId || "";
            if (maybeEduId) setEduIdKegiatan(String(maybeEduId));
            setIsEditing(false);
            setProposeAddInstead(false);
            showToast(
                "success",
                json?.metaData?.message || "Kegiatan baru berhasil dibuat"
            );
        } catch (e) {
            setSubmitError(
                e.message || "Terjadi kesalahan saat menambah kegiatan"
            );
            showToast(
                "error",
                e.message || "Terjadi kesalahan saat menambah kegiatan"
            );
        } finally {
            setSubmitting(false);
        }
    };

    // Masuk ke mode edit dari riwayat
    const masukModeEdit = async (row) => {
        try {
            // eduId
            const edu = String(row?.eduId || row?.id || "").trim();
            if (edu) setEduIdKegiatan(edu);

            // tanggal dd-mm-yyyy -> yyyy-mm-dd
            const tgl = String(row?.tglPelayanan || "").trim();
            if (/^\d{2}-\d{2}-\d{4}$/.test(tgl)) {
                const [d, m, y] = tgl.split("-");
                setTglPelaksanaan(`${y}-${m}-${d}`);
            }

            // jenis kelompok (program) jika tersedia
            const kdKel = String(
                row?.kdKelompok || row?.kelompok?.kdKelompok || ""
            ).trim();
            if (kdKel === "01" || kdKel === "02") setKdProgram(kdKel);

            // club
            const club =
                row?.clubId ??
                row?.clubProl?.clubId ??
                row?.clubProl?.kdClub ??
                row?.clubProl?.id;
            if (typeof club !== "undefined" && club !== null && club !== "") {
                const cid = String(club);
                setPreferredClubId(cid);
                setClubId(cid);
            }

            // jenis kegiatan label
            const kdKeg = String(
                row?.kdKegiatan || row?.kegiatan?.kdKegiatan || ""
            ).trim();
            const mapKdToLabel = (kode) => {
                if (kode === "01") return "Senam";
                if (kode === "10") return "Penyuluhan/Edukasi";
                if (kode === "11") return "Penyuluhan dan Senam";
                return row?.kegiatan?.nama || jenisKegiatan;
            };
            const labelKeg = mapKdToLabel(kdKeg);
            if (labelKeg) setJenisKegiatan(labelKeg);

            setMateri(row?.materi || "");
            setNamaPembicara(row?.pembicara || "");
            setLokasi(row?.lokasi || "");
            if (typeof row?.biaya !== "undefined")
                setBiayaHonor(String(row.biaya));
            setKeterangan(row?.keterangan || "");

            // Ambil peserta untuk eduId
            if (edu) await fetchPesertaByEduId(edu);

            setIsEditing(true);
        } catch (err) {
            console.error("Gagal masuk mode edit:", err);
        }
    };

    const fetchPesertaByEduId = async (eduId) => {
        setErrorPeserta("");
        setPesertaListAction("");
        setPesertaListActionError("");
        setLoadingPesertaTable(true);
        try {
            const res = await fetch(
                `/pcare/api/kelompok/peserta/${encodeURIComponent(eduId)}`
            );
            const json = await res.json();
            if (!res.ok)
                throw new Error(
                    json?.metaData?.message || "Gagal mengambil peserta"
                );
            const list = json?.response?.list || [];
            const normalize = (arr) => {
                // Parser tgl lahir dari format dd-MM-yyyy atau yyyy-MM-dd
                const parseTgl = (v) => {
                    if (!v) return null;
                    if (/^\d{2}-\d{2}-\d{4}$/.test(v)) {
                        const [d, m, y] = v.split("-");
                        return new Date(Number(y), Number(m) - 1, Number(d));
                    }
                    if (/^\d{4}-\d{2}-\d{2}$/.test(v)) {
                        const [y, m, d] = v.split("-");
                        return new Date(Number(y), Number(m) - 1, Number(d));
                    }
                    const dt = new Date(v);
                    return isNaN(dt) ? null : dt;
                };
                // Hitung usia (tahun penuh) dari tgl lahir berdasarkan tanggal hari ini
                const toUsia = (tgl) => {
                    const birth = parseTgl(tgl);
                    if (!birth) return "-";
                    const today = new Date();
                    let age = today.getFullYear() - birth.getFullYear();
                    const m = today.getMonth() - birth.getMonth();
                    if (m < 0 || (m === 0 && today.getDate() < birth.getDate()))
                        age--;
                    return Math.max(0, age);
                };
                // Normalkan status prolanis ke YA/TIDAK, prioritas ambil dari pstProl (getPeserta)
                const toProlanis = (p) => {
                    const raw = (
                        p?.pstProl ??
                        p?.prolanis ??
                        p?.kdProlanis ??
                        p?.kdprolanis ??
                        ""
                    )
                        .toString()
                        .trim()
                        .toUpperCase();
                    if (
                        !raw ||
                        raw === "-" ||
                        raw === "0" ||
                        raw === "FALSE" ||
                        raw === "TIDAK"
                    )
                        return "TIDAK";
                    if (
                        raw.includes("DM") ||
                        raw.includes("HT") ||
                        raw === "YA" ||
                        raw === "TRUE" ||
                        raw === "1"
                    )
                        return "YA";
                    return "TIDAK";
                };
                return arr.map((it) => {
                    const p = it?.peserta || it || {};
                    return {
                        noKartu: p.noKartu || "-",
                        nama: p.nama || "-",
                        sex: p.sex || "-",
                        jnsPeserta: p?.jnsPeserta?.nama || "-",
                        tglLahir: p.tglLahir || "-",
                        usia: toUsia(p.tglLahir),
                        prolanis: toProlanis(p),
                    };
                });
            };
            setPesertaRows(normalize(list));
        } catch (e) {
            setErrorPeserta(
                e.message || "Terjadi kesalahan saat mengambil peserta"
            );
            setPesertaRows([]);
        } finally {
            setLoadingPesertaTable(false);
        }
    };

    // Tambah Peserta ke Kegiatan (POST /kelompok/peserta)
    const tambahPesertaKeBpjs = async () => {
        setAddPesertaError("");
        setAddPesertaSuccess("");

        const eduId = String(eduIdKegiatan || "").trim();
        // Prioritaskan pilihan dari tabel (checkbox). Jika kosong, gunakan input manual.
        const noka = String(selectedNoKartu || pesertaNoKartu || "").trim();
        if (!eduId) {
            setAddPesertaError(
                "Mohon isi atau pilih Edu ID kegiatan terlebih dahulu."
            );
            return;
        }
        if (!noka) {
            setAddPesertaError(
                "Mohon isi No. Kartu BPJS peserta terlebih dahulu."
            );
            return;
        }

        const payload = {
            eduId,
            noKartu: noka,
        };

        setAddingPesertaPosting(true);
        try {
            const res = await fetch("/pcare/api/kelompok/peserta", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": getCsrfToken() || undefined,
                    "X-Requested-With": "XMLHttpRequest",
                },
                credentials: "same-origin",
                body: JSON.stringify(payload),
            });
            const json = await res.json().catch(() => ({}));
            if (!res.ok) {
                throw new Error(
                    json?.metaData?.message ||
                        json?.message ||
                        "Gagal menambah peserta ke kegiatan"
                );
            }
            setAddPesertaSuccess(
                json?.metaData?.message ||
                    "Peserta berhasil ditambahkan ke kegiatan"
            );
            // Refresh daftar peserta untuk eduId terkait agar sinkron dengan data BPJS
            if (eduId) {
                try {
                    await fetchPesertaByEduId(eduId);
                } catch (_) {}
            }
            // Kosongkan input nomor kartu agar siap input berikutnya
            setPesertaNoKartu("");
            setSelectedNoKartu("");
        } catch (e) {
            setAddPesertaError(
                e.message || "Terjadi kesalahan saat menambah peserta"
            );
        } finally {
            setAddingPesertaPosting(false);
        }
    };

    const cariPesertaNoKartu = async () => {
        setErrorPeserta("");
        if (!pesertaNoKartu) {
            setErrorPeserta("Mohon isi nomor kartu peserta");
            return;
        }
        const tgl = toDdMmYyyy(tglPelaksanaan || todayDate);
        setLoadingPeserta(true);
        try {
            const res = await fetch(
                `/pcare/api/peserta/nokartu/${encodeURIComponent(
                    pesertaNoKartu
                )}/tgl/${encodeURIComponent(tgl)}`
            );
            const json = await res.json();
            if (!res.ok)
                throw new Error(
                    json?.metaData?.message || "Peserta tidak ditemukan"
                );
            const p = json?.response?.peserta || json?.data?.peserta || {};
            if (!p?.noKartu) {
                setErrorPeserta("Data peserta tidak lengkap.");
            } else {
                setPesertaRows((rows) => {
                    const exists = rows.some((r) => r.noKartu === p.noKartu);
                    if (exists) return rows;
                    const parseTgl = (v) => {
                        if (!v) return null;
                        if (/^\d{2}-\d{2}-\d{4}$/.test(v)) {
                            const [d, m, y] = v.split("-");
                            return new Date(
                                Number(y),
                                Number(m) - 1,
                                Number(d)
                            );
                        }
                        if (/^\d{4}-\d{2}-\d{2}$/.test(v)) {
                            const [y, m, d] = v.split("-");
                            return new Date(
                                Number(y),
                                Number(m) - 1,
                                Number(d)
                            );
                        }
                        const dt = new Date(v);
                        return isNaN(dt) ? null : dt;
                    };
                    const birth = parseTgl(p?.tglLahir);
                    let usia = "-";
                    if (birth) {
                        const today = new Date();
                        usia = today.getFullYear() - birth.getFullYear();
                        const mm = today.getMonth() - birth.getMonth();
                        if (
                            mm < 0 ||
                            (mm === 0 && today.getDate() < birth.getDate())
                        )
                            usia--;
                        usia = Math.max(0, usia);
                    }
                    const prolanis = (() => {
                        const raw = (
                            p?.pstProl ??
                            p?.prolanis ??
                            p?.kdProlanis ??
                            p?.kdprolanis ??
                            ""
                        )
                            .toString()
                            .trim()
                            .toUpperCase();
                        if (
                            !raw ||
                            raw === "-" ||
                            raw === "0" ||
                            raw === "FALSE" ||
                            raw === "TIDAK"
                        )
                            return "TIDAK";
                        if (
                            raw.includes("DM") ||
                            raw.includes("HT") ||
                            raw === "YA" ||
                            raw === "TRUE" ||
                            raw === "1"
                        )
                            return "YA";
                        return "TIDAK";
                    })();
                    return [
                        ...rows,
                        {
                            noKartu: p.noKartu,
                            nama: p.nama,
                            sex: p.sex,
                            jnsPeserta: p?.jnsPeserta?.nama || "-",
                            tglLahir: p.tglLahir || "-",
                            usia,
                            prolanis,
                        },
                    ];
                });
                // Kosongkan input agar siap untuk nomor berikutnya, tetap biarkan panel terbuka
                setPesertaNoKartu("");
                setSelectedNoKartu(p.noKartu || "");
            }
        } catch (e) {
            setErrorPeserta(e.message || "Terjadi kesalahan");
        } finally {
            setLoadingPeserta(false);
        }
    };

    // Hapus Peserta Kegiatan (DELETE /kelompok/peserta/{eduId}/{noKartu})
    const hapusPesertaKegiatan = async (noKartu) => {
        const noka = String(noKartu || "").trim();
        setPesertaListAction("");
        setPesertaListActionError("");
        if (!noka) return;

        // Jika belum ada eduIdKegiatan (belum pilih kegiatan yang disimpan ke BPJS), lakukan penghapusan lokal saja.
        const eduId = String(eduIdKegiatan || "").trim();
        if (!eduId) {
            setPesertaRows((rows) => rows.filter((r) => r.noKartu !== noka));
            setPesertaListAction("Peserta dihapus dari daftar lokal");
            showToast("info", "Peserta dihapus dari daftar lokal");
            return;
        }

        const ok = window.confirm(
            `Hapus peserta ${noka} dari kegiatan BPJS PCare?`
        );
        if (!ok) return;

        setDeletingPesertaNoKartu(noka);
        try {
            const res = await fetch(
                `/pcare/api/kelompok/peserta/${encodeURIComponent(
                    eduId
                )}/${encodeURIComponent(noka)}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        "X-CSRF-TOKEN": getCsrfToken() || undefined,
                        "X-Requested-With": "XMLHttpRequest",
                    },
                    credentials: "same-origin",
                }
            );
            const json = await res.json().catch(() => ({}));
            if (!res.ok) {
                throw new Error(
                    json?.metaData?.message ||
                        json?.message ||
                        "Gagal menghapus peserta"
                );
            }
            setPesertaListAction(
                json?.metaData?.message || "Peserta berhasil dihapus"
            );
            showToast(
                "success",
                json?.metaData?.message || "Peserta berhasil dihapus"
            );
            // Refresh daftar peserta agar sinkron
            try {
                await fetchPesertaByEduId(eduId);
            } catch (_) {}
        } catch (e) {
            setPesertaListActionError(
                e.message || "Terjadi kesalahan saat menghapus peserta"
            );
            showToast(
                "error",
                e.message || "Terjadi kesalahan saat menghapus peserta"
            );
        } finally {
            setDeletingPesertaNoKartu("");
        }
    };

    return (
        // Full-width within content area (no negative margins so it doesn't get covered by sidebar)
        <div className="w-full max-w-none px-0">
            {/* Header: judul utama */}
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                    Kegiatan Kelompok Pcare
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Catat dan kelola kegiatan Prolanis, sekaligus peserta yang
                    hadir.
                </p>
            </div>

            {/* Toast notifications */}
            <div className="fixed bottom-4 right-4 z-[60] space-y-2">
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        className={`${
                            t.type === "success"
                                ? "border-emerald-200 bg-emerald-50/95 text-emerald-800 ring-emerald-200"
                                : t.type === "error"
                                ? "border-rose-200 bg-rose-50/95 text-rose-800 ring-rose-200"
                                : "border-sky-200 bg-sky-50/95 text-sky-800 ring-sky-200"
                        } pointer-events-auto flex items-start gap-2 rounded-xl border px-3 py-2 text-[13px] shadow-md ring-1`}
                    >
                        <div className="mt-0.5">
                            {t.type === "success" ? (
                                <Icon.Check className="h-4 w-4" />
                            ) : t.type === "error" ? (
                                <Icon.X className="h-4 w-4" />
                            ) : (
                                <Icon.Info className="h-4 w-4" />
                            )}
                        </div>
                        <div className="leading-snug">{t.message}</div>
                    </div>
                ))}
            </div>

            {/* Grid dengan separator jelas antar card */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto_1fr] gap-4 xl:gap-6 items-start">
                {/* Kolom Kiri: Form Entri */}
                <div className="flex flex-col gap-2">
                    <div className="text-base md:text-xl font-semibold text-slate-700">
                        Entry Kegiatan Kelompok
                    </div>
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        className="rounded-2xl border border-slate-300 bg-white p-5 sm:p-6 shadow-md ring-1 ring-slate-300"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {/* Tanggal Pelaksanaan */}
                            <div>
                                <label className={ui.label}>
                                    Tanggal Pelaksanaan
                                </label>
                                <input
                                    type="date"
                                    value={tglPelaksanaan}
                                    onChange={(e) =>
                                        setTglPelaksanaan(e.target.value)
                                    }
                                    className={ui.input}
                                />
                            </div>

                            {/* Jenis Kelompok */}
                            <div>
                                <label className={ui.label}>
                                    Jenis Kelompok
                                </label>
                                <select
                                    value={kdProgram}
                                    onChange={(e) =>
                                        setKdProgram(e.target.value)
                                    }
                                    className={ui.select}
                                >
                                    <option value="01">
                                        01 - Diabetes Melitus
                                    </option>
                                    <option value="02">02 - Hipertensi</option>
                                </select>
                            </div>

                            {/* Club Prolanis */}
                            <div className="md:col-span-2">
                                <label className={ui.label}>
                                    Club Prolanis
                                </label>
                                <div className="flex gap-2">
                                    <select
                                        value={clubId}
                                        onChange={(e) =>
                                            setClubId(e.target.value)
                                        }
                                        className={ui.select}
                                    >
                                        <option value="" disabled>
                                            {loadingClub
                                                ? "Memuat club..."
                                                : "— Pilih Club Prolanis —"}
                                        </option>
                                        {clubOptions.map((o) => (
                                            <option
                                                key={o.value}
                                                value={o.value}
                                            >
                                                {o.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errorClub && (
                                    <div className="mt-1 text-[11px] text-rose-600">
                                        {errorClub}
                                    </div>
                                )}
                            </div>

                            {/* Jenis Kegiatan */}
                            <div>
                                <label className={ui.label}>
                                    Jenis Kegiatan
                                </label>
                                <select
                                    value={jenisKegiatan}
                                    onChange={(e) =>
                                        setJenisKegiatan(e.target.value)
                                    }
                                    className={ui.select}
                                >
                                    <option>Penyuluhan/Edukasi</option>
                                    <option>Senam</option>
                                    <option>Pemeriksaan Kesehatan</option>
                                </select>
                            </div>

                            {/* Cara Penyelenggaraan */}
                            <div>
                                <label className={ui.label}>
                                    Cara penyelenggaraan kegiatan
                                </label>
                                <select
                                    value={cara}
                                    onChange={(e) => setCara(e.target.value)}
                                    className={ui.select}
                                >
                                    <option>Tatap Muka</option>
                                    <option>Daring</option>
                                    <option>Luring</option>
                                </select>
                            </div>

                            {/* Narasumber */}
                            <div>
                                <label className={ui.label}>Narasumber</label>
                                <select
                                    value={narasumber}
                                    onChange={(e) =>
                                        setNarasumber(e.target.value)
                                    }
                                    className={ui.select}
                                >
                                    <option>Internal</option>
                                    <option>Eksternal</option>
                                </select>
                            </div>

                            {/* Materi */}
                            <div>
                                <label className={ui.label}>Materi</label>
                                <input
                                    type="text"
                                    value={materi}
                                    onChange={(e) => setMateri(e.target.value)}
                                    placeholder="Misal: Aktivitas Fisik (Senam)"
                                    className={ui.input}
                                />
                            </div>

                            {/* Pembicara - cari by No Kartu */}
                            <div className="md:col-span-2">
                                <label className={ui.label}>Pembicara</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={pembicaraNoKartu}
                                        onChange={(e) =>
                                            setPembicaraNoKartu(e.target.value)
                                        }
                                        placeholder="No Kartu BPJS"
                                        className={ui.input}
                                    />
                                    <button
                                        onClick={cariPembicara}
                                        disabled={loadingPembicara}
                                        className={ui.btnSlate}
                                    >
                                        {loadingPembicara ? (
                                            "Cari..."
                                        ) : (
                                            <>
                                                <Icon.Search className="h-4 w-4" />
                                                <span>Cari</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                                {errorPembicara && (
                                    <div className="mt-1 text-[11px] text-rose-600">
                                        {errorPembicara}
                                    </div>
                                )}
                            </div>

                            {/* Nama Pembicara */}
                            <div className="md:col-span-2">
                                <label className={ui.label}>
                                    Nama Pembicara
                                </label>
                                <input
                                    type="text"
                                    value={namaPembicara}
                                    onChange={(e) =>
                                        setNamaPembicara(e.target.value)
                                    }
                                    className={ui.input}
                                />
                            </div>

                            {/* Lokasi */}
                            <div className="md:col-span-2">
                                <label className={ui.label}>Lokasi</label>
                                <input
                                    type="text"
                                    value={lokasi}
                                    onChange={(e) => setLokasi(e.target.value)}
                                    className={ui.input}
                                />
                            </div>

                            {/* Biaya */}
                            <div>
                                <label className={ui.label}>
                                    Biaya Honor Narasumber
                                </label>
                                <select
                                    value={biayaHonor}
                                    onChange={(e) =>
                                        setBiayaHonor(e.target.value)
                                    }
                                    className={ui.select}
                                >
                                    <option value="" disabled>
                                        — Pilih Biaya Honor —
                                    </option>
                                    {biayaHonorOptions.map((v) => (
                                        <option key={v} value={String(v)}>
                                            {v === 0
                                                ? "0"
                                                : v.toLocaleString("id-ID")}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Biaya Konsumsi dan Jml Peserta, hanya saat Luring */}
                            {cara === "Luring" ? (
                                <div className="md:col-span-1">
                                    <label className={ui.label}>
                                        Biaya Konsumsi
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            min="0"
                                            value={biayaKonsumsi}
                                            onChange={(e) =>
                                                setBiayaKonsumsi(e.target.value)
                                            }
                                            className={ui.input}
                                        />
                                        <span className="text-[12px] text-slate-600">
                                            X
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <span className="text-[12px] text-slate-600">
                                                Jml Peserta
                                            </span>
                                            <input
                                                type="number"
                                                min="0"
                                                value={jmlPeserta}
                                                onChange={(e) =>
                                                    setJmlPeserta(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-24 rounded-lg border-slate-300 text-sm focus:border-slate-400 focus:ring focus:ring-slate-200/70"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="md:col-span-1">
                                    <label className={ui.label}>
                                        Biaya Konsumsi
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={biayaKonsumsi}
                                        disabled
                                        className={ui.inputMuted}
                                    />
                                </div>
                            )}

                            <div>
                                <label className={ui.label}>
                                    Total Konsumsi
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={totalKonsumsi}
                                    readOnly
                                    className={`${ui.input} bg-slate-50`}
                                />
                            </div>
                            <div>
                                <label className={ui.label}>Total Biaya</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={totalBiaya}
                                    readOnly
                                    className={`${ui.input} bg-slate-50`}
                                />
                            </div>

                            {/* Keterangan */}
                            <div className="md:col-span-2">
                                <label className={ui.label}>Keterangan</label>
                                <textarea
                                    value={keterangan}
                                    onChange={(e) =>
                                        setKeterangan(e.target.value)
                                    }
                                    rows={3}
                                    className={ui.textarea}
                                />
                            </div>
                        </div>

                        {/* Submit result messages */}
                        {submitError && (
                            <div className="mt-3 rounded-md border border-rose-200 bg-rose-50 p-2 text-[12px] text-rose-700">
                                {submitError}
                            </div>
                        )}
                        {proposeAddInstead && (
                            <div className="mt-2 rounded-md border border-sky-200 bg-sky-50 p-2 text-[12px] text-sky-800">
                                <div className="flex items-center justify-between gap-2">
                                    <div>
                                        Update PUT tidak didukung oleh layanan
                                        PCare untuk endpoint ini. Anda dapat
                                        menyimpan sebagai kegiatan baru.
                                    </div>
                                    <button
                                        onClick={simpanSebagaiBaru}
                                        disabled={submitting}
                                        className={ui.btnSlate}
                                    >
                                        <Icon.Plus className="h-4 w-4" />
                                        <span className="ml-1.5">
                                            Simpan sebagai kegiatan baru
                                        </span>
                                    </button>
                                </div>
                            </div>
                        )}
                        {submitSuccess && (
                            <div className="mt-3 rounded-md border border-emerald-200 bg-emerald-50 p-2 text-[12px] text-emerald-700">
                                {submitSuccess}
                            </div>
                        )}

                        <div className="mt-4 flex gap-2">
                            <button
                                onClick={tambahData}
                                disabled={submitting}
                                className={ui.btnPrimary}
                            >
                                {submitting ? (
                                    "Menyimpan..."
                                ) : (
                                    <>
                                        {isEditing ? (
                                            <Icon.Check className="h-4 w-4" />
                                        ) : (
                                            <Icon.Plus className="h-4 w-4" />
                                        )}
                                        <span>
                                            {isEditing
                                                ? "Edit Data"
                                                : "Tambah Data"}
                                        </span>
                                    </>
                                )}
                            </button>
                            <button
                                onClick={() => {
                                    resetForm();
                                    setIsEditing(false);
                                    setEduIdKegiatan("");
                                    setPesertaRows([]);
                                }}
                                className={ui.btnNeutral}
                            >
                                <Icon.X className="h-4 w-4" />
                                <span>Batal</span>
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Garis pembatas vertikal pada layar besar, dan horizontal pada layar kecil */}
                <div
                    className="hidden xl:block w-px bg-slate-300/70 h-full mx-2 rounded-full"
                    aria-hidden="true"
                ></div>
                <div
                    className="block xl:hidden h-px bg-slate-300/70 my-4 rounded-full"
                    aria-hidden="true"
                ></div>

                {/* Kolom Kanan: Riwayat Kegiatan */}
                <div className="flex flex-col gap-2">
                    <div className="text-base md:text-xl font-semibold text-slate-700">
                        Riwayat Kegiatan Kelompok
                    </div>
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        className="rounded-2xl border border-slate-300 bg-white p-5 sm:p-6 shadow-md ring-1 ring-slate-300"
                    >
                        <div className="flex items-end gap-3 mb-4">
                            <div>
                                <label className={ui.label}>Bulan</label>
                                <input
                                    type="month"
                                    value={bulanRiwayat}
                                    onChange={(e) =>
                                        setBulanRiwayat(e.target.value)
                                    }
                                    className={ui.input}
                                />
                            </div>
                            <div>
                                <button
                                    onClick={fetchRiwayat}
                                    disabled={loadingRiwayat}
                                    className={ui.btnSlate}
                                >
                                    {loadingRiwayat ? (
                                        "Cari..."
                                    ) : (
                                        <>
                                            <Icon.Search className="h-4 w-4" />
                                            <span>Cari</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {errorRiwayat && (
                            <div className="mb-3 rounded-md border border-rose-200 bg-rose-50 p-2 text-[12px] text-rose-700">
                                {errorRiwayat}
                            </div>
                        )}
                        {riwayatAction && (
                            <div className="mb-3 rounded-md border border-emerald-200 bg-emerald-50 p-2 text-[12px] text-emerald-700">
                                {riwayatAction}
                            </div>
                        )}
                        {riwayatActionError && (
                            <div className="mb-3 rounded-md border border-rose-200 bg-rose-50 p-2 text-[12px] text-rose-700">
                                {riwayatActionError}
                            </div>
                        )}
                        {riwayat?.metaData && (
                            <div className="mb-2 text-[12px] text-slate-600">
                                Meta: {riwayat.metaData.message} (code{" "}
                                {riwayat.metaData.code})
                            </div>
                        )}

                        <div className="overflow-x-auto rounded-xl ring-1 ring-slate-300 shadow-sm">
                            <table className="min-w-full text-[12px] border-separate border-spacing-0">
                                <thead className="sticky top-0 bg-slate-50/80 backdrop-blur z-10">
                                    <tr className="text-left text-slate-600 border-b border-slate-200/80">
                                        <th className="py-2 pr-3">KEGIATAN</th>
                                        <th className="py-2 pr-3">TGL PEL</th>
                                        <th className="py-2 pr-3">
                                            CLUB PROLANIS
                                        </th>
                                        <th className="py-2 pr-3">MATERI</th>
                                        <th className="py-2 pr-3">HAPUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(riwayat?.response?.list || []).map(
                                        (row, idx) => (
                                            <tr
                                                key={row.eduId || idx}
                                                className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70 cursor-pointer odd:bg-white even:bg-slate-50/40"
                                                onClick={() =>
                                                    masukModeEdit(row)
                                                }
                                            >
                                                <td className="py-2 pr-3">
                                                    {row?.kegiatan?.nama || "-"}
                                                </td>
                                                <td className="py-2 pr-3">
                                                    {row?.tglPelayanan || "-"}
                                                </td>
                                                <td className="py-2 pr-3">
                                                    {row?.__clubsJoined ||
                                                        row?.clubProl?.nama ||
                                                        "-"}
                                                </td>
                                                <td className="py-2 pr-3">
                                                    {row?.materi || "-"}
                                                </td>
                                                <td className="py-2 pr-3">
                                                    <button
                                                        className={
                                                            ui.btnDangerSoft
                                                        }
                                                        title="Hapus"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            hapusKegiatan(
                                                                row?.eduId
                                                            );
                                                        }}
                                                        disabled={
                                                            !row?.eduId ||
                                                            deletingEduId ===
                                                                String(
                                                                    row?.eduId
                                                                )
                                                        }
                                                    >
                                                        {deletingEduId ===
                                                        String(row?.eduId) ? (
                                                            "Hapus..."
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1.5">
                                                                <Icon.X className="h-3.5 w-3.5" />
                                                                <span>
                                                                    Hapus
                                                                </span>
                                                            </span>
                                                        )}
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                    {(!riwayat ||
                                        (riwayat?.response?.list || [])
                                            .length === 0) && (
                                        <tr>
                                            <td
                                                className="py-3 text-center text-slate-400"
                                                colSpan={5}
                                            >
                                                {loadingRiwayat
                                                    ? "Memuat..."
                                                    : "Belum ada riwayat pada bulan ini"}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Daftar Hadir Peserta */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="mt-6 rounded-2xl border border-slate-300 bg-white p-5 sm:p-6 shadow-md ring-1 ring-slate-300"
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className="text-base font-semibold text-slate-800">
                            Daftar Hadir Peserta
                        </div>
                        {eduIdKegiatan ? (
                            <span className="hidden sm:inline-flex items-center rounded-full bg-slate-50 px-2 py-0.5 text-[11px] text-slate-600 ring-1 ring-slate-200">
                                Edu ID: {eduIdKegiatan}
                            </span>
                        ) : null}
                    </div>
                    <button
                        onClick={() => setAddingPeserta(true)}
                        className={ui.btnPrimary}
                    >
                        <Icon.Plus className="h-4 w-4" />
                        <span>Tambah Data Peserta</span>
                    </button>
                </div>

                {pesertaListAction && (
                    <div className="mb-2 rounded-md border border-emerald-200 bg-emerald-50 p-2 text-[12px] text-emerald-700">
                        {pesertaListAction}
                    </div>
                )}
                {pesertaListActionError && (
                    <div className="mb-2 rounded-md border border-rose-200 bg-rose-50 p-2 text-[12px] text-rose-700">
                        {pesertaListActionError}
                    </div>
                )}

                {addingPeserta && (
                    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/40 backdrop-blur-sm p-4 sm:p-6 md:p-8 overflow-y-auto overscroll-contain">
                        <div className="mt-10 w-full max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-2xl max-h-[85vh] flex flex-col">
                            {/* Header */}
                            <div className="flex items-center justify-between border-b px-4 py-3">
                                <div className="text-base font-semibold text-slate-800">
                                    Peserta Kegiatan Kelompok
                                </div>
                                <button
                                    onClick={() => {
                                        setAddingPeserta(false);
                                        setPesertaNoKartu("");
                                        setErrorPeserta("");
                                        setAddPesertaError("");
                                        setAddPesertaSuccess("");
                                        setSelectedNoKartu("");
                                    }}
                                    className="text-slate-500 hover:text-slate-700"
                                    aria-label="Tutup"
                                >
                                    <Icon.X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="px-4 py-3 flex-1 overflow-y-auto min-h-0">
                                <div className="mb-2">
                                    <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] text-slate-700">
                                        Peserta Prolanis
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                                    <div className="md:col-span-2">
                                        <input
                                            type="text"
                                            value={eduIdKegiatan}
                                            onChange={(e) =>
                                                setEduIdKegiatan(e.target.value)
                                            }
                                            placeholder="Edu ID Kegiatan"
                                            className={ui.input}
                                        />
                                    </div>
                                    <div className="md:col-span-3 flex gap-2">
                                        <input
                                            type="text"
                                            value={pesertaNoKartu}
                                            onChange={(e) =>
                                                setPesertaNoKartu(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="No. Kartu BPJS"
                                            className={ui.input}
                                        />
                                        <button
                                            onClick={cariPesertaNoKartu}
                                            disabled={loadingPeserta}
                                            className="inline-flex items-center rounded-lg bg-slate-700 px-3 py-2 text-xs font-medium text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400/60 disabled:opacity-50"
                                        >
                                            {loadingPeserta ? (
                                                "Cari..."
                                            ) : (
                                                <>
                                                    <Icon.Search className="h-3.5 w-3.5" />
                                                    <span className="ml-1.5">
                                                        Cari
                                                    </span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {errorPeserta && (
                                    <div className="mt-2 text-[11px] text-rose-600">
                                        {errorPeserta}
                                    </div>
                                )}
                                {addPesertaError && (
                                    <div className="mt-2 rounded border border-rose-200 bg-rose-50 p-2 text-[12px] text-rose-700">
                                        {addPesertaError}
                                    </div>
                                )}
                                {addPesertaSuccess && (
                                    <div className="mt-2 rounded border border-emerald-200 bg-emerald-50 p-2 text-[12px] text-emerald-700">
                                        {addPesertaSuccess}
                                    </div>
                                )}

                                <div className="mt-3 overflow-x-auto rounded-xl ring-1 ring-slate-200">
                                    <table className="min-w-full text-[12px] border-separate border-spacing-0">
                                        <thead className="sticky top-0 bg-slate-50/80 backdrop-blur z-10">
                                            <tr className="text-left text-slate-600 border-b border-slate-200/80">
                                                <th className="py-2 pr-3">
                                                    NO KARTU
                                                </th>
                                                <th className="py-2 pr-3">
                                                    NAMA PESERTA
                                                </th>
                                                <th className="py-2 pr-3">
                                                    SEX
                                                </th>
                                                <th className="py-2 pr-3">
                                                    TGL LAHIR
                                                </th>
                                                <th className="py-2 pr-3">
                                                    USIA
                                                </th>
                                                <th className="py-2 pr-3 text-center">
                                                    PILIH
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pesertaRows.map((r) => (
                                                <tr
                                                    key={r.noKartu}
                                                    className="border-b border-slate-100 last:border-0 odd:bg-white even:bg-slate-50/40 hover:bg-slate-50/70 cursor-pointer"
                                                >
                                                    <td className="py-2 pr-3">
                                                        {r.noKartu}
                                                    </td>
                                                    <td className="py-2 pr-3">
                                                        {r.nama}
                                                    </td>
                                                    <td className="py-2 pr-3">
                                                        {r.sex}
                                                    </td>
                                                    <td className="py-2 pr-3">
                                                        {r.tglLahir}
                                                    </td>
                                                    <td className="py-2 pr-3">
                                                        {r.usia}
                                                    </td>
                                                    <td className="py-2 pr-3 text-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={
                                                                selectedNoKartu ===
                                                                r.noKartu
                                                            }
                                                            onChange={(e) =>
                                                                setSelectedNoKartu(
                                                                    e.target
                                                                        .checked
                                                                        ? r.noKartu
                                                                        : ""
                                                                )
                                                            }
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                            {pesertaRows.length === 0 && (
                                                <tr>
                                                    <td
                                                        className="py-3 text-center text-slate-400"
                                                        colSpan={6}
                                                    >
                                                        Belum ada peserta dalam
                                                        daftar
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-end gap-2 border-t bg-slate-50 px-4 py-3">
                                <button
                                    onClick={tambahPesertaKeBpjs}
                                    disabled={addingPesertaPosting}
                                    className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 disabled:opacity-50"
                                >
                                    {addingPesertaPosting ? (
                                        "Menyimpan..."
                                    ) : (
                                        <>
                                            <Icon.Check className="h-4 w-4" />
                                            <span className="ml-1.5">
                                                Simpan
                                            </span>
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={() => {
                                        setAddingPeserta(false);
                                        setPesertaNoKartu("");
                                        setErrorPeserta("");
                                        setAddPesertaError("");
                                        setAddPesertaSuccess("");
                                        setSelectedNoKartu("");
                                    }}
                                    className="inline-flex items-center rounded-lg bg-white px-4 py-2 text-xs font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
                                >
                                    Batal
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="overflow-x-auto rounded-xl ring-1 ring-slate-200">
                    <table className="min-w-full text-[12px] border-separate border-spacing-0">
                        <thead className="sticky top-0 bg-slate-50/80 backdrop-blur z-10">
                            <tr className="text-left text-slate-600 border-b border-slate-200/80">
                                <th className="py-2 pr-3">NO. KARTU</th>
                                <th className="py-2 pr-3">NAMA PESERTA</th>
                                <th className="py-2 pr-3">SEX</th>
                                <th className="py-2 pr-3">JNS PESERTA</th>
                                <th className="py-2 pr-3">TGL LAHIR</th>
                                <th className="py-2 pr-3">USIA</th>
                                <th className="py-2 pr-3">PROLANIS</th>
                                <th className="py-2 pr-3">HAPUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loadingPesertaTable && (
                                <>
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <tr
                                            key={`skeleton-${i}`}
                                            className="border-b border-slate-100 last:border-0"
                                        >
                                            <td
                                                className="py-2 pr-3"
                                                colSpan={8}
                                            >
                                                <div className="animate-pulse flex items-center gap-3">
                                                    <div className="h-4 w-28 rounded bg-slate-200" />
                                                    <div className="h-4 w-48 rounded bg-slate-200" />
                                                    <div className="h-4 w-10 rounded bg-slate-200" />
                                                    <div className="h-4 w-32 rounded bg-slate-200" />
                                                    <div className="h-4 w-28 rounded bg-slate-200" />
                                                    <div className="h-4 w-10 rounded bg-slate-200" />
                                                    <div className="h-4 w-20 rounded bg-slate-200" />
                                                    <div className="h-6 w-16 rounded bg-slate-200" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            )}
                            {!loadingPesertaTable &&
                                (() => {
                                    const start =
                                        (pesertaPage - 1) * pesertaPerPage;
                                    const slice = pesertaRows.slice(
                                        start,
                                        start + pesertaPerPage
                                    );
                                    return slice;
                                })().map((r) => (
                                    <tr
                                        key={r.noKartu}
                                        className="border-b border-slate-100 last:border-0 odd:bg-white even:bg-slate-50/40 hover:bg-slate-50/70"
                                    >
                                        <td className="py-2 pr-3">
                                            {r.noKartu}
                                        </td>
                                        <td className="py-2 pr-3">{r.nama}</td>
                                        <td className="py-2 pr-3">{r.sex}</td>
                                        <td className="py-2 pr-3">
                                            {r.jnsPeserta}
                                        </td>
                                        <td className="py-2 pr-3">
                                            {r.tglLahir}
                                        </td>
                                        <td className="py-2 pr-3">{r.usia}</td>
                                        <td className="py-2 pr-3">
                                            {r.prolanis}
                                        </td>
                                        <td className="py-2 pr-3">
                                            <button
                                                onClick={() =>
                                                    hapusPesertaKegiatan(
                                                        r.noKartu
                                                    )
                                                }
                                                className={ui.btnDangerSoft}
                                                disabled={
                                                    deletingPesertaNoKartu ===
                                                    r.noKartu
                                                }
                                            >
                                                {deletingPesertaNoKartu ===
                                                r.noKartu ? (
                                                    "Hapus..."
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5">
                                                        <Icon.X className="h-3.5 w-3.5" />
                                                        <span>Hapus</span>
                                                    </span>
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            {!loadingPesertaTable &&
                                pesertaRows.length === 0 && (
                                    <tr>
                                        <td
                                            className="py-3 text-center text-slate-400"
                                            colSpan={8}
                                        >
                                            Belum ada peserta yang ditambahkan
                                        </td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination controls */}
                <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <div className="text-[12px] text-slate-600">
                        {(() => {
                            const total = pesertaRows.length;
                            const start =
                                total === 0
                                    ? 0
                                    : (pesertaPage - 1) * pesertaPerPage + 1;
                            const end = Math.min(
                                total,
                                pesertaPage * pesertaPerPage
                            );
                            return `Menampilkan ${start}-${end} dari ${total}`;
                        })()}
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-[12px] text-slate-600">
                            Baris per halaman
                        </label>
                        <select
                            value={pesertaPerPage}
                            onChange={(e) => {
                                setPesertaPerPage(Number(e.target.value) || 10);
                                setPesertaPage(1);
                            }}
                            className="rounded-md border border-slate-300 bg-white px-2 py-1 text-[12px]"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                        <button
                            onClick={() => setPesertaPage(1)}
                            disabled={pesertaPage <= 1}
                            className="inline-flex items-center rounded-lg bg-white px-3 py-1 text-[12px] font-medium text-slate-700 ring-1 ring-slate-300 hover:bg-slate-50 disabled:opacity-50"
                        >
                            Awal
                        </button>
                        <button
                            onClick={() =>
                                setPesertaPage((p) => Math.max(1, p - 1))
                            }
                            disabled={pesertaPage <= 1}
                            className="inline-flex items-center rounded-lg bg-white px-3 py-1 text-[12px] font-medium text-slate-700 ring-1 ring-slate-300 hover:bg-slate-50 disabled:opacity-50"
                        >
                            Sebelumnya
                        </button>
                        <div className="text-[12px] text-slate-700">
                            {(() => {
                                const totalPages = Math.max(
                                    1,
                                    Math.ceil(
                                        (pesertaRows?.length || 0) /
                                            (pesertaPerPage || 10)
                                    )
                                );
                                return `Halaman ${pesertaPage} / ${totalPages}`;
                            })()}
                        </div>
                        <button
                            onClick={() => {
                                const totalPages = Math.max(
                                    1,
                                    Math.ceil(
                                        (pesertaRows?.length || 0) /
                                            (pesertaPerPage || 10)
                                    )
                                );
                                setPesertaPage((p) =>
                                    Math.min(totalPages, p + 1)
                                );
                            }}
                            disabled={
                                pesertaPage >=
                                Math.max(
                                    1,
                                    Math.ceil(
                                        (pesertaRows?.length || 0) /
                                            (pesertaPerPage || 10)
                                    )
                                )
                            }
                            className="inline-flex items-center rounded-lg bg-white px-3 py-1 text-[12px] font-medium text-slate-700 ring-1 ring-slate-300 hover:bg-slate-50 disabled:opacity-50"
                        >
                            Berikutnya
                        </button>
                        <button
                            onClick={() => {
                                const totalPages = Math.max(
                                    1,
                                    Math.ceil(
                                        (pesertaRows?.length || 0) /
                                            (pesertaPerPage || 10)
                                    )
                                );
                                setPesertaPage(totalPages);
                            }}
                            disabled={
                                pesertaPage >=
                                Math.max(
                                    1,
                                    Math.ceil(
                                        (pesertaRows?.length || 0) /
                                            (pesertaPerPage || 10)
                                    )
                                )
                            }
                            className="inline-flex items-center rounded-lg bg-white px-3 py-1 text-[12px] font-medium text-slate-700 ring-1 ring-slate-300 hover:bg-slate-50 disabled:opacity-50"
                        >
                            Akhir
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

EntriKegiatan.layout = (page) => (
    <AppLayout title="Entri Kegiatan Kelompok" children={page} />
);
