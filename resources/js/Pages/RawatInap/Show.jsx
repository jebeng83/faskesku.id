import React from "react";
import { Head, Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import SidebarRawatInap from "@/Layouts/SidebarRawatInap";

export default function Show({ title = "Detail Rawat Inap" }) {
  return (
    <SidebarRawatInap title={title}>
      <Head title={title} />
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Halaman detail belum tersedia.</p>
          <div className="mt-4">
            <Link
              href={route("rawat-inap.index")}
              className="inline-flex items-center px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Kembali
            </Link>
          </div>
        </div>
      </div>
    </SidebarRawatInap>
  );
}

