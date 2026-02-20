import React from "react";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { route } from "ziggy-js";

export default function LayoutHandover({
    title = "Handover Rawat Inap",
    subtitle = "Pantau dan serah terima pasien rawat inap",
    backHref,
    right,
    children,
}) {
    const resolvedBackHref = backHref || route("rawat-inap.index", {}, false);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            <Head title={title} />

            <header className="fixed top-0 left-0 right-0 h-14 z-50 bg-white/80 dark:bg-gray-900/70 backdrop-blur border-b border-gray-200/60 dark:border-gray-800/60">
                <div className="h-full px-4 md:px-6 flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                        <Link
                            href={resolvedBackHref}
                            className="inline-flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Kembali"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div className="min-w-0">
                            <div className="text-sm md:text-base font-bold truncate">
                                {title}
                            </div>
                            {subtitle ? (
                                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    {subtitle}
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                        {right}
                    </div>
                </div>
            </header>

            <main className="pt-16 px-4 md:px-6 pb-6">
                <section className="rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/90 dark:bg-gray-900/70 backdrop-blur shadow-xl shadow-indigo-500/5 min-h-[calc(100vh-6.5rem)]">
                    <div className="p-4 md:p-6">
                        {children}
                    </div>
                </section>
            </main>
        </div>
    );
}
