import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import SidebarKasir from "@/Layouts/SidebarKasir";
import { route } from "ziggy-js";

const statCards = {
    ralan: [
    {
        title: "Tagihan Ralan",
        amount: "Rp 128.450.000",
        trend: "+8.2% dibanding kemarin",
        gradient: "from-blue-500 to-indigo-600",
        href: "/pembayaran/ralan",
        label: "Kelola Pembayaran Ralan",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                <path d="M4 6h16M4 12h12M4 18h8" />
            </svg>
        ),
    },
    ],
    ranap: [
    {
        title: "Tagihan Ranap",
        amount: "Rp 212.900.000",
        trend: "+12.4% sejak awal minggu",
        gradient: "from-emerald-500 to-teal-600",
        href: "/pembayaran/ranap",
        label: "Kelola Pembayaran Ranap",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                <path d="M5 11h14" />
                <path d="M12 5v14" />
            </svg>
        ),
    },
    ],
};

const workflowSteps = [
    { title: "Verifikasi Tagihan", desc: "Review data billing otomatis dari modul medis." },
    { title: "Pilih Penjamin", desc: "Pastikan penanggung jawab pembayaran dan plafon masih tersedia." },
    { title: "Input Pembayaran", desc: "Entri metode bayar, nomor bukti, dan nilai pembayaran." },
    { title: "Status & Kwitansi", desc: "Set status lunas dan unduh kwitansi resmi untuk pasien." },
];

export default function PembayaranIndex() {
    const [activeTab, setActiveTab] = useState("ralan"); // 'ralan' | 'ranap'
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [ralanData, setRalanData] = useState({ groups: [], stats: {}, filters: {} });
    const [ranapData, setRanapData] = useState({ summary: [], rows: [] });
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [groupPage, setGroupPage] = useState(1);
    const [groupsPerPage, setGroupsPerPage] = useState(10);

    const buildUrl = (path, params = {}) => {
        try {
            const u = new URL(path, window.location.origin);
            Object.entries(params).forEach(([k, v]) => {
                if (v !== undefined && v !== null) u.searchParams.set(k, String(v));
            });
            return u.pathname + u.search + u.hash;
        } catch {
            const qs = Object.entries(params)
                .filter(([, v]) => v !== undefined && v !== null)
                .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
                .join("&");
            return path + (qs ? `?${qs}` : "");
        }
    };

    const loadRalan = async () => {
        setLoading(true);
        setError(null);
        try {
            const url = buildUrl("/pembayaran/ralan", { json: 1, q: debouncedSearch || undefined });
            const res = await fetch(url, {
                method: "GET",
                headers: { Accept: "application/json" },
                credentials: "same-origin",
            });
            if (!res.ok) {
                const text = await res.text().catch(() => "");
                throw new Error(`Gagal memuat data Ralan (${res.status}): ${text || res.statusText}`);
            }
            const json = await res.json();
            setRalanData({
                groups: json.groups || [],
                stats: json.stats || {},
                filters: json.filters || {},
            });
        } catch (e) {
            setError(e?.message || "Terjadi kesalahan saat memuat data Ralan");
        } finally {
            setLoading(false);
        }
    };

    const loadRanap = async () => {
        setLoading(true);
        setError(null);
        try {
            const url = buildUrl("/pembayaran/ranap", { json: 1 });
            const res = await fetch(url, {
                method: "GET",
                headers: { Accept: "application/json" },
                credentials: "same-origin",
            });
            if (!res.ok) {
                const text = await res.text().catch(() => "");
                throw new Error(`Gagal memuat data Ranap (${res.status}): ${text || res.statusText}`);
            }
            const json = await res.json();
            setRanapData({
                summary: json.summary || [],
                rows: json.rows || [],
            });
        } catch (e) {
            setError(e?.message || "Terjadi kesalahan saat memuat data Ranap");
        } finally {
            setLoading(false);
        }
    };

    // Muat data awal sesuai tab default
    React.useEffect(() => {
        if (activeTab === "ralan") {
            loadRalan();
        } else {
            loadRanap();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab, debouncedSearch]);

    // Debounce pencarian
    React.useEffect(() => {
        const id = setTimeout(() => setDebouncedSearch(search.trim()), 350);
        return () => clearTimeout(id);
    }, [search]);

    React.useEffect(() => {
        setGroupPage(1);
    }, [debouncedSearch, activeTab, ralanData.groups]);

    const groups = ralanData.groups || [];
    const totalGroups = groups.length;
    const totalGroupPages = Math.max(1, Math.ceil(totalGroups / groupsPerPage));
    const startGroupIdx = Math.min((groupPage - 1) * groupsPerPage, totalGroups);
    const endGroupIdx = Math.min(startGroupIdx + groupsPerPage, totalGroups);
    const paginatedGroups = groups.slice(startGroupIdx, endGroupIdx);

    return (
        <AppLayout title="Pembayaran">
            <div className="-mt-6 -mx-6 p-6 space-y-8">
                <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">Modul Pembayaran</p>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">Pembayaran</h1>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
                            Pilih jenis layanan untuk mengelola pembayaran: Rawat Jalan atau Rawat Inap.
                        </p>
                    </div>
                </header>

                {/* Tabs */}
                <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-1 inline-flex">
                    <button
                        onClick={() => setActiveTab("ralan")}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                            activeTab === "ralan"
                                ? "bg-blue-600 text-white"
                                : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                    >
                        Rawat Jalan
                    </button>
                    <button
                        onClick={() => setActiveTab("ranap")}
                        className={`ml-1 px-4 py-2 rounded-lg text-sm font-semibold transition ${
                            activeTab === "ranap"
                                ? "bg-emerald-600 text-white"
                                : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                    >
                        Rawat Inap
                    </button>
                </div>

                {/* Search hanya untuk Ralan */}
                {activeTab === "ralan" && (
                    <div className="flex items-center gap-3">
                        <div className="relative w-full max-w-md">
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari pasien / no. RM / no. rawat…"
                                className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/30"
                            />
                            {debouncedSearch && (
                                <button
                                    onClick={() => setSearch("")}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-sm"
                                    aria-label="Clear"
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Info ringkas per-tab */}
                {activeTab === "ralan" ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <Stat label="Menunggu Pembayaran" value={ralanData.stats?.menunggu_pembayaran ?? 0} />
                        <Stat label="Menunggu Penjamin" value={ralanData.stats?.menunggu_penjamin ?? 0} />
                        <Stat label="Proses Kasir" value={ralanData.stats?.dalam_proses_kasir ?? 0} />
                        <Stat label="Selesai Hari Ini" value={ralanData.stats?.selesai_hari_ini ?? 0} />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {(ranapData.summary || []).map((s) => (
                            <div key={s.label} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
                                <div className="text-xs text-gray-500 dark:text-gray-400">{s.label}</div>
                                <div className="mt-1 text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">{s.value}</div>
                                {s.desc && <div className="text-[11px] text-gray-500 dark:text-gray-400">{s.desc}</div>}
                            </div>
                        ))}
                    </div>
                )}

                {/* Konten per-tab (ringkas) */}
                {loading ? (
                    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 text-center text-sm text-gray-500 dark:text-gray-400">
                        Memuat data…
                    </div>
                ) : error ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 text-red-700 p-4 text-sm dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
                        {error}
                    </div>
                ) : activeTab === "ralan" ? (
                <section className="grid grid-cols-1 gap-6">
                    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Ringkasan Ralan</h2>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                                        {ralanData.filters?.start_date && ralanData.filters?.end_date
                                            ? `Rentang ${ralanData.filters.start_date} s/d ${ralanData.filters.end_date}`
                                            : "Pembayaran rawat jalan terbaru."}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="text-xs text-gray-600 dark:text-gray-400">
                                        Menampilkan <span className="font-mono">{totalGroups === 0 ? 0 : startGroupIdx + 1}</span>–<span className="font-mono">{endGroupIdx}</span> dari <span className="font-mono">{totalGroups}</span> tanggal
                                    </div>
                                    <select
                                        value={groupsPerPage}
                                        onChange={(e) => {
                                            const v = Number(e.target.value) || 10;
                                            setGroupsPerPage(v);
                                            setGroupPage(1);
                                        }}
                                        className="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 py-1 text-xs"
                                    >
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                    </select>
                                    <div className="inline-flex items-center">
                                        <button
                                            onClick={() => setGroupPage((p) => Math.max(1, p - 1))}
                                            disabled={groupPage <= 1}
                                            className={`px-2 py-1 rounded-l-md text-xs border ${groupPage <= 1 ? "text-gray-400 border-gray-200 dark:border-gray-700" : "text-gray-700 border-gray-200 dark:text-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"}`}
                                        >
                                            &larr;
                                        </button>
                                        <span className="px-2 py-1 text-xs border-t border-b border-gray-200 dark:border-gray-700 font-mono">
                                            {groupPage}/{totalGroupPages}
                                        </span>
                                        <button
                                            onClick={() => setGroupPage((p) => Math.min(totalGroupPages, p + 1))}
                                            disabled={groupPage >= totalGroupPages}
                                            className={`px-2 py-1 rounded-r-md text-xs border ${groupPage >= totalGroupPages ? "text-gray-400 border-gray-200 dark:border-gray-700" : "text-gray-700 border-gray-200 dark:text-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"}`}
                                        >
                                            &rarr;
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* Tabel ringkas per tanggal */}
                            <div className="mt-2 space-y-6">
                                {paginatedGroups.map((group) => (
                                    <div key={group.tanggal} className="rounded-xl border border-gray-100 dark:border-gray-800">
                                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                            <div className="text-sm">
                                                <div className="font-semibold text-gray-900 dark:text-white">{group.display_tanggal}</div>
                                                <div className="text-gray-500 dark:text-gray-400">{(group.items || []).length} pasien</div>
                                            </div>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                                                <thead>
                                                    <tr className="text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                                        <th className="py-3 px-4">Jam</th>
                                                        <th className="py-3 px-4">No. Rawat</th>
                                                        <th className="py-3 px-4">Pasien</th>
                                                        <th className="py-3 px-4">Penjamin</th>
                                                        <th className="py-3 px-4">Status Bayar</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                                    {(group.items || []).map((row) => (
                                                        <tr key={row.no_rawat} className="hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                                                            <td className="py-3 px-4">{row.jam_reg}</td>
                                                            <td className="py-3 px-4 font-semibold text-blue-600 dark:text-blue-400">
                                                                <Link href={route("pembayaran.ralan.detail", row.no_rawat)} className="hover:underline">
                                                                    {row.no_rawat}
                                                                </Link>
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                <div className="font-medium text-gray-900 dark:text-white">{row.pasien}</div>
                                                                <div className="text-xs text-gray-500">{row.no_rkm_medis}</div>
                                                            </td>
                                                            <td className="py-3 px-4">{row.penjamin}</td>
                                                            <td className="py-3 px-4">
                                                                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                                                                    row.status_bayar === "Sudah Bayar"
                                                                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/20 dark:text-emerald-200"
                                                                        : row.status_bayar === "Belum Bayar"
                                                                        ? "bg-amber-100 text-amber-700 dark:bg-amber-400/20 dark:text-amber-200"
                                                                        : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                                                                }`}>
                                                                    {row.status_bayar}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    </section>
                ) : (
                    <section className="grid grid-cols-1 gap-6">
                        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Ringkasan Ranap</h2>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">Pembayaran rawat inap terbaru.</p>
                                </div>
                            </div>
                            {/* Rows */}
                            <div className="mt-2 space-y-3">
                                {(ranapData.rows || []).map((row, idx) => (
                                    <div key={idx} className="flex items-center justify-between rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
                                    <div>
                                            <p className="font-semibold text-gray-900 dark:text-white">{row.pasien}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{row.ranjang} • {row.penjamin}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-gray-900 dark:text-white">{row.total}</p>
                                            <p className="text-xs text-emerald-600 dark:text-emerald-400">{row.status}</p>
                                        </div>
                                    </div>
                                ))}
                                </div>
                        </div>
                </section>
                )}
            </div>
        </AppLayout>
    );
}

function Stat({ label, value }) {
    return (
        <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm">
            <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{new Intl.NumberFormat("id-ID").format(value)}</p>
        </div>
    );
}
