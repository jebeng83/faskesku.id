import React, { useState } from "react";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
import SidebarRadiologi from "@/Layouts/SidebarRadiologi";

export default function Edit({ title, permintaan, has_hasil }) {
    const [locked] = useState(!!has_hasil);

    const { data, setData, errors, processing } = useForm({
        tgl_sampel: permintaan?.tgl_sampel || "",
        jam_sampel: permintaan?.jam_sampel
            ? permintaan.jam_sampel.toString().substring(0, 5)
            : "",
        dokter_perujuk: permintaan?.dokter_perujuk || "",
        diagnosa_klinis: permintaan?.diagnosa_klinis || "",
        informasi_tambahan: permintaan?.informasi_tambahan || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (locked) return;

        router.post(
            route("radiologi.update", permintaan.noorder),
            {
                ...data,
                _method: "PUT",
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    router.get(route("radiologi.index"));
                },
            }
        );
    };

    return (
        <SidebarRadiologi title={title || "Edit Radiologi"}>
            <Head title={title || "Edit Radiologi"} />

            <div className="py-8">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                                Edit Permintaan Radiologi
                            </h1>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                                No. Order {permintaan?.noorder || "-"}
                            </p>
                        </div>
                        <Link
                            href={route("radiologi.index")}
                            className="inline-flex items-center px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                            Kembali
                        </Link>
                    </div>

                    {locked && (
                        <div className="mb-4 rounded-lg border border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-700 dark:bg-amber-900/20 dark:text-amber-200 px-4 py-3 text-sm">
                            Permintaan ini tidak dapat diubah karena hasil radiologi sudah tersedia.
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm px-6 py-5 space-y-5"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Tanggal Sampel
                                </label>
                                <input
                                    type="date"
                                    value={data.tgl_sampel}
                                    onChange={(e) =>
                                        setData("tgl_sampel", e.target.value)
                                    }
                                    disabled={locked}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-800/60"
                                />
                                {errors.tgl_sampel && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.tgl_sampel}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Jam Sampel
                                </label>
                                <input
                                    type="time"
                                    value={data.jam_sampel}
                                    onChange={(e) =>
                                        setData("jam_sampel", e.target.value)
                                    }
                                    disabled={locked}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-500/70 focus:border-rose-500 disabled:bg-gray-100 dark:disabled:bg-gray-800/60"
                                />
                                {errors.jam_sampel && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.jam_sampel}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Dokter Perujuk
                            </label>
                            <input
                                type="text"
                                value={data.dokter_perujuk}
                                onChange={(e) =>
                                    setData("dokter_perujuk", e.target.value)
                                }
                                disabled={locked}
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-500/70 focus:border-rose-500 disabled:bg-gray-100 dark:disabled:bg-gray-800/60"
                                placeholder="Kode dokter perujuk"
                            />
                            {errors.dokter_perujuk && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.dokter_perujuk}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Diagnosis Klinis
                                </label>
                                <textarea
                                    value={data.diagnosa_klinis}
                                    onChange={(e) =>
                                        setData(
                                            "diagnosa_klinis",
                                            e.target.value
                                        )
                                    }
                                    disabled={locked}
                                    rows={3}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-500/70 focus:border-rose-500 disabled:bg-gray-100 dark:disabled:bg-gray-800/60"
                                />
                                {errors.diagnosa_klinis && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.diagnosa_klinis}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Informasi Tambahan
                                </label>
                                <textarea
                                    value={data.informasi_tambahan}
                                    onChange={(e) =>
                                        setData(
                                            "informasi_tambahan",
                                            e.target.value
                                        )
                                    }
                                    disabled={locked}
                                    rows={3}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-500/70 focus:border-rose-500 disabled:bg-gray-100 dark:disabled:bg-gray-800/60"
                                />
                                {errors.informasi_tambahan && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.informasi_tambahan}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <Link
                                href={route("radiologi.index")}
                                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing || locked}
                                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                Simpan Perubahan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </SidebarRadiologi>
    );
}
