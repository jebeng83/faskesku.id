import React, { useMemo, useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    Sparkles,
    BookOpen,
    Search,
    ChevronRight,
    ArrowLeft,
    LogOut,
} from "lucide-react";
import { route } from "ziggy-js";

export default function LayoutDokumentasi({
    title = "Dokumentasi",
    items = [],
    children,
    render,
    initialSelect,
}) {
    const { props } = usePage();
    const instansi =
        props?.settings?.nama_instansi ||
        props?.setting?.nama_instansi ||
        props?.nama_instansi ||
        "Faskesku.id";
    const [query, setQuery] = useState("");
    const [activeId, setActiveId] = useState(items?.[0]?.id ?? null);
    const filtered = useMemo(() => {
        const q = String(query || "").toLowerCase();
        return Array.isArray(items)
            ? items.filter((i) =>
                  String(i?.title || "")
                      .toLowerCase()
                      .includes(q)
              )
            : [];
    }, [items, query]);
    const active = useMemo(() => {
        return Array.isArray(items)
            ? items.find((i) => i?.id === activeId) ?? null
            : null;
    }, [items, activeId]);

    React.useEffect(() => {
        if (!initialSelect || !Array.isArray(items) || items.length === 0)
            return;
        const key = String(initialSelect || "").toLowerCase();
        const found = items.find((i) =>
            String(i?.title || "")
                .toLowerCase()
                .includes(key)
        );
        if (found?.id) setActiveId(found.id);
    }, [initialSelect, items]);

    const TopNavbar = React.memo(function TopNavbar() {
        return (
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur border-b border-slate-200/70 dark:border-gray-800">
                <div className="w-full -mx-6 sm:-mx-6">
                    <div className="h-16 flex items-center justify-between">
                        <Link
                            href="/"
                            className="ml-6 sm:ml-10 md:ml-12 flex items-center font-bold text-slate-800 dark:text-white"
                        >
                            <span
                                className="truncate max-w-[50vw] text-lg sm:text-xl"
                                style={{
                                    fontFamily:
                                        '"Expletus Sans", ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
                                }}
                            >
                                {instansi}
                            </span>
                        </Link>
                        <div className="flex items-center gap-2">
                            <Link
                                href={route("dashboard")}
                                className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600/90 text-white hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                                <ArrowLeft className="w-4 h-4 transition-transform group-hover:scale-110" />
                                <span className="text-sm font-medium">
                                    Kembali
                                </span>
                            </Link>
                            <button
                                onClick={() => {
                                    try {
                                        const form =
                                            document.createElement("form");
                                        form.method = "POST";
                                        form.action = route("logout");
                                        const csrfInput =
                                            document.createElement("input");
                                        csrfInput.type = "hidden";
                                        csrfInput.name = "_token";
                                        csrfInput.value =
                                            document
                                                .querySelector(
                                                    'meta[name="csrf-token"]'
                                                )
                                                .getAttribute("content") || "";
                                        form.appendChild(csrfInput);
                                        document.body.appendChild(form);
                                        form.submit();
                                    } catch (_) {}
                                }}
                                className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/90 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                                <LogOut className="w-4 h-4 transition-transform group-hover:scale-110" />
                                <span className="text-sm font-medium">
                                    Keluar
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        );
    });

    return (
        <>
            <Head title={title} />
            <TopNavbar />
            <div
                id="doc-layout"
                className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 dark:from-[#0B1220] dark:via-[#0F172A] dark:to-[#111827] p-6 pt-24 sm:pt-28 relative z-0"
            >
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.06),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.22),transparent_60%)]"
                />
                <div className="relative z-10 max-w-screen-2xl mx-auto space-y-6">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm">
                                    <Sparkles className="w-4 h-4 text-emerald-600" />
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {title}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-3">
                            <section className="relative overflow-hidden rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/95 dark:bg-gray-900/85 backdrop-blur-xl p-4 shadow-xl shadow-blue-500/5">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500" />
                                <div className="flex items-center gap-2 mb-4">
                                    <BookOpen className="w-4 h-4 text-emerald-700" />
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                        Daftar Menu
                                    </span>
                                </div>
                                <div className="mb-3 flex items-center gap-2">
                                    <div className="flex-1 relative">
                                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input
                                            value={query}
                                            onChange={(e) =>
                                                setQuery(e.target.value)
                                            }
                                            placeholder="Cari menu…"
                                            className="w-full rounded-full border border-gray-200/70 dark:border-gray-800 bg-white/95 dark:bg-gray-900/85 pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                                        />
                                    </div>
                                </div>
                                <div className="max-h-[60vh] overflow-auto pr-1 space-y-1">
                                    {filtered.length === 0 ? (
                                        <div className="text-xs text-gray-600 dark:text-gray-400">
                                            Tidak ada menu
                                        </div>
                                    ) : (
                                        filtered.map((i) => (
                                            <button
                                                key={i.id ?? i.title}
                                                onClick={() =>
                                                    setActiveId(i.id)
                                                }
                                                className={`group w-full text-left px-3 py-2 rounded-lg border transition-all ${
                                                    activeId === i.id
                                                        ? "border-emerald-500/50 bg-emerald-50/60 dark:bg-emerald-900/30"
                                                        : "border-gray-200/70 dark:border-gray-800 hover:bg-gray-50/60 dark:hover:bg-gray-900/60"
                                                }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {i.title}
                                                    </span>
                                                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600" />
                                                </div>
                                                {i.description ? (
                                                    <div className="text-[11px] text-gray-600 dark:text-gray-400 mt-0.5">
                                                        {i.description}
                                                    </div>
                                                ) : null}
                                            </button>
                                        ))
                                    )}
                                </div>
                            </section>
                        </div>
                        <div className="col-span-12 md:col-span-9">
                            <section className="relative overflow-hidden rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/95 dark:bg-gray-900/85 backdrop-blur-xl p-6 shadow-xl shadow-blue-500/5">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                                <div className="flex items-center gap-2 mb-4">
                                    <Sparkles className="w-4 h-4 text-indigo-700" />
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                        Alur Penggunaan
                                    </span>
                                </div>
                                {render ? (
                                    render({ active, activeId })
                                ) : children ? (
                                    <article className="space-y-4 text-[15px] leading-7 text-gray-800 dark:text-gray-200">
                                        {children}
                                    </article>
                                ) : active ? (
                                    <div className="space-y-3">
                                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                            {active.title}
                                        </h2>
                                        {active.description ? (
                                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                                {active.description}
                                            </p>
                                        ) : null}
                                        {Array.isArray(active.steps) &&
                                        active.steps.length > 0 ? (
                                            <ol className="list-decimal pl-6 space-y-2 text-[15px] leading-7 text-gray-800 dark:text-gray-200">
                                                {active.steps.map((s, idx) => (
                                                    <li key={idx}>{s}</li>
                                                ))}
                                            </ol>
                                        ) : (
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                Pilih menu di panel kiri untuk
                                                melihat panduan.
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Pilih menu di panel kiri untuk melihat
                                        panduan.
                                    </div>
                                )}
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
