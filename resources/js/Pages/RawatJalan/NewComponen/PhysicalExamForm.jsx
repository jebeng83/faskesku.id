import React, { useState, useEffect } from "react";
import Label from "@/Components/ui/Label";

/**
 * Component untuk form data fisik (pemeriksaan fisik) yang digunakan
 * pada berbagai jenis surat (Sehat, Sakit, dsb).
 * 
 * Menggunakan local state + debounce untuk mencegah jitter/gerak berlebih
 * pada saat user mengetik.
 */
export default function PhysicalExamForm({ data, onChange, _errors = {} }) {
    const [localData, setLocalData] = useState(data);

    // Sinkronisasi data dari props ke local state hanya jika local state belum diisi
    // atau ketika data dari luar berubah secara signifikan (misalnya ganti pasien)
    useEffect(() => {
        setLocalData(data);
    }, [data.no_rawat]); // Trigger refresh jika no_rawat berubah

    // Debounce sinkronisasi ke parent
    useEffect(() => {
        const timer = setTimeout(() => {
            // Hanya update parent jika ada perbedaan nyata
            if (JSON.stringify(localData) !== JSON.stringify(data)) {
                Object.keys(localData).forEach(key => {
                    if (localData[key] !== data[key]) {
                        onChange?.(key, localData[key]);
                    }
                });
            }
        }, 500); // 500ms debounce
        return () => clearTimeout(timer);
    }, [localData]);

    const handleLocalChange = (name) => (e) => {
        const val = e.target.value;
        setLocalData(prev => ({ ...prev, [name]: val }));
    };

    const inputInnerClass = "w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-all placeholder:text-gray-400 text-sm h-9 px-3 border-none";

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-5 p-5 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-sm transition-all duration-300">
            <div className="space-y-1.5 group">
                <Label className="text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider ml-1 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">Berat Badan (kg)</Label>
                <input
                    type="text"
                    value={localData.berat || ""}
                    onChange={handleLocalChange("berat")}
                    placeholder="Contoh: 65"
                    className={inputInnerClass}
                />
            </div>

            <div className="space-y-1.5 group">
                <Label className="text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider ml-1 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">Tinggi Badan (cm)</Label>
                <input
                    type="text"
                    value={localData.tinggi || ""}
                    onChange={handleLocalChange("tinggi")}
                    placeholder="Contoh: 170"
                    className={inputInnerClass}
                />
            </div>

            <div className="space-y-1.5 group">
                <Label className="text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider ml-1 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">Tekanan Darah (mmHg)</Label>
                <input
                    type="text"
                    value={localData.tensi || ""}
                    onChange={handleLocalChange("tensi")}
                    placeholder="Contoh: 120/80"
                    className={inputInnerClass}
                />
            </div>

            <div className="space-y-1.5 group">
                <Label className="text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider ml-1 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">Suhu Tubuh (°C)</Label>
                <input
                    type="text"
                    value={localData.suhu || ""}
                    onChange={handleLocalChange("suhu")}
                    placeholder="Contoh: 36.5"
                    className={inputInnerClass}
                />
            </div>

            <div className="space-y-1.5 lg:col-span-1 group">
                <Label className="text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider ml-1 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">Buta Warna</Label>
                <select
                    value={localData.butawarna || "Tidak"}
                    onChange={handleLocalChange("butawarna")}
                    className={inputInnerClass}
                >
                    <option value="Tidak">Tidak</option>
                    <option value="Ya">Ya</option>
                </select>
            </div>

            <div className="space-y-1.5 lg:col-span-3 group">
                <Label className="text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider ml-1 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">Keperluan</Label>
                <input
                    type="text"
                    value={localData.keperluan || ""}
                    onChange={handleLocalChange("keperluan")}
                    placeholder="Contoh: Melamar Pekerjaan, Sekolah, dll"
                    className={inputInnerClass}
                />
            </div>

            {localData.kesimpulan !== undefined && (
                <div className="space-y-1.5 lg:col-span-4 group pt-2 border-t border-gray-100 dark:border-gray-800">
                    <Label className="text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider ml-1 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">Kesimpulan</Label>
                    <select
                        value={localData.kesimpulan || "Sehat"}
                        onChange={handleLocalChange("kesimpulan")}
                        className={inputInnerClass}
                    >
                        <option value="Sehat">Sehat</option>
                        <option value="Tidak Sehat">Tidak Sehat</option>
                    </select>
                </div>
            )}
        </div>
    );
}
