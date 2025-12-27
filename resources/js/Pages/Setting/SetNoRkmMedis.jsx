import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import SidebarPengaturan from "@/Layouts/SidebarPengaturan";
import { route } from "ziggy-js";

export default function SetNoRkmMedis() {
    const { props } = usePage();
    const current = props.current || "000000";
    const [message, setMessage] = useState(null);

    const { data, setData, post, processing, errors } = useForm({
        no_rkm_medis: current,
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("pcare.setting.no-rm.store"), {
            preserveScroll: true,
            onSuccess: () => {
                setMessage("Pengaturan No. RM berhasil disimpan");
            },
        });
    };

    return (
        <SidebarPengaturan title="Pengaturan No. Rekam Medis">
            <div className="p-4">
                <h1 className="text-lg font-semibold mb-4">
                    Pengaturan No. Rekam Medis
                </h1>
                <p className="text-sm text-gray-600 mb-4">
                    Nilai ini akan digunakan sebagai nomor rekam medis terakhir.
                    Saat menambah pasien baru, sistem akan menambah 1 dari nilai ini.
                </p>
                <form
                    onSubmit={onSubmit}
                    className="max-w-md space-y-4 bg-white dark:bg-gray-900 rounded-lg p-4 shadow"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            No. RM Terakhir
                        </label>
                        <input
                            type="text"
                            value={data.no_rkm_medis}
                            onChange={(e) =>
                                setData("no_rkm_medis", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm"
                        />
                        {errors.no_rkm_medis && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.no_rkm_medis}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg"
                        >
                            Simpan
                        </button>
                        {message && (
                            <span className="text-xs text-green-600">
                                {message}
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-gray-500">
                        Contoh: jika diisi <code>000123</code>, pasien baru
                        berikutnya akan mendapat No. RM <code>000124</code>.
                    </p>
                </form>
            </div>
        </SidebarPengaturan>
    );
}
