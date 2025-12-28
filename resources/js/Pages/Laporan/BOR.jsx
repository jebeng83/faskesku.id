import React from "react";
import { Head } from "@inertiajs/react";
import SidebarLaporan from "@/Layouts/SidebarLaporan";

export default function LaporanBOR() {
    return (
        <SidebarLaporan title="Laporan BOR">
            <Head title="Laporan BOR" />
            <div className="px-2 sm:px-4 lg:px-6">
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2">
                    Laporan BOR
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Halaman ini akan berisi laporan BOR (Bed Occupancy Ratio).
                    Konten detail dapat ditambahkan kemudian.
                </p>
            </div>
        </SidebarLaporan>
    );
}

