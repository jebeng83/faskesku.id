import React from "react";
import { Head, Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import SidebarRadiologi from "@/Layouts/SidebarRadiologi";
import { XRay } from "lucide-react";

export default function Show({ title, permintaan, has_hasil }) {
    const details = permintaan?.detail_permintaan || [];

    const getStatusBadge = () => {
        const hasSampel =
            permintaan?.tgl_sampel &&
            permintaan.tgl_sampel !== "0000-00-00";
        const hasHasil = has_hasil;

        let text = "Baru";
        let cls =
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";

        if (hasHasil) {
            text = "Hasil Tersedia";
            cls =
                "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
        } else if (hasSampel) {
            text = "Sampel Diambil";
            cls =
                "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
        }

        return (
            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}>
                {text}
            </span>
        );
    };

    return (
        <SidebarRadiologi title={title || "Detail Radiologi"}>
            <Head title={title || "Detail Radiologi"} />

            <div className="py-8">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-rose-100 dark:bg-rose-900/40 flex items-center justify-center">
                                <XRay className="w-5 h-5 text-rose-600 dark:text-rose-300" />
                            </div>
                            <div>
                                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                                    Detail Permintaan Radiologi
                                </h1>
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                    No. Order {permintaan?.noorder || "-"}
                                </p>
                            </div>
                        </div>
                        <Link
                            href={route("radiologi.index")}
                            className="inline-flex items-center px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                            Kembali
                        </Link>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm">
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div>
                                    <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                                        Informasi Pasien
                                    </h2>
                                </div>
                                <div>{getStatusBadge()}</div>
                            </div>
                            <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div className="space-y-2">
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            Nama Pasien
                                        </div>
                                        <div className="font-medium text-gray-900 dark:text-gray-100">
                                            {permintaan?.reg_periksa?.patient
                                                ?.nm_pasien || "-"}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            No. Rekam Medis
                                        </div>
                                        <div className="text-gray-900 dark:text-gray-100">
                                            {permintaan?.reg_periksa?.patient
                                                ?.no_rkm_medis || "-"}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            No. Rawat
                                        </div>
                                        <div className="text-gray-900 dark:text-gray-100">
                                            {permintaan?.no_rawat || "-"}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            Tanggal Permintaan
                                        </div>
                                        <div className="text-gray-900 dark:text-gray-100">
                                            {permintaan?.tgl_permintaan
                                                ? new Date(
                                                      permintaan.tgl_permintaan
                                                  ).toLocaleDateString("id-ID")
                                                : "-"}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            Dokter Perujuk
                                        </div>
                                        <div className="text-gray-900 dark:text-gray-100">
                                            {permintaan?.dokter?.nm_dokter ||
                                                permintaan?.dokter_perujuk ||
                                                "-"}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            Status
                                        </div>
                                        <div className="text-gray-900 dark:text-gray-100">
                                            {permintaan?.status || "-"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm">
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                                <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                                    Informasi Klinis
                                </h2>
                            </div>
                            <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div className="space-y-2">
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            Diagnosis Klinis
                                        </div>
                                        <div className="text-gray-900 dark:text-gray-100">
                                            {permintaan?.diagnosa_klinis || "-"}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            Informasi Tambahan
                                        </div>
                                        <div className="text-gray-900 dark:text-gray-100">
                                            {permintaan?.informasi_tambahan ||
                                                "-"}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            Tanggal Sampel
                                        </div>
                                        <div className="text-gray-900 dark:text-gray-100">
                                            {permintaan?.tgl_sampel &&
                                            permintaan.tgl_sampel !==
                                                "0000-00-00"
                                                ? new Date(
                                                      permintaan.tgl_sampel
                                                  ).toLocaleDateString("id-ID")
                                                : "-"}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            Tanggal Hasil
                                        </div>
                                        <div className="text-gray-900 dark:text-gray-100">
                                            {permintaan?.tgl_hasil &&
                                            permintaan.tgl_hasil !==
                                                "0000-00-00"
                                                ? new Date(
                                                      permintaan.tgl_hasil
                                                  ).toLocaleDateString("id-ID")
                                                : "-"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm">
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                                <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                                    Pemeriksaan Radiologi
                                </h2>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {details.length} pemeriksaan
                                </div>
                            </div>
                            <div className="px-6 py-4">
                                {details.length === 0 ? (
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        Belum ada detail pemeriksaan radiologi.
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {details.map((detail, idx) => (
                                            <div
                                                key={`${detail.noorder}-${detail.kd_jenis_prw}-${idx}`}
                                                className="flex items-start justify-between border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-3 bg-gray-50 dark:bg-gray-900/60"
                                            >
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                        {detail.jenis_perawatan?.nm_perawatan ||
                                                            detail.kd_jenis_prw ||
                                                            "-"}
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                        Kode:{" "}
                                                        {detail.kd_jenis_prw ||
                                                            "-"}
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <span
                                                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                            detail.stts_bayar ===
                                                            "Sudah"
                                                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                                        }`}
                                                    >
                                                        {detail.stts_bayar ||
                                                            "Belum"}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SidebarRadiologi>
    );
}

