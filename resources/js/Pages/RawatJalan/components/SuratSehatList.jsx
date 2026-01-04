import { useCallback, useEffect, useMemo, useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import SidebarRalan from "@/Layouts/SidebarRalan";
import Pagination from "@/Components/Pagination";
import { PencilSquareIcon, PrinterIcon, PlusIcon } from "@heroicons/react/24/outline";

export default function SuratSehatList({ suratSehat, suratSakit, tab = 'sehat', filters }) {

    const initial = useMemo(
        () => ({
            search: filters?.search || "",
            start_date: filters?.start_date || "",
            end_date: filters?.end_date || "",
        }),
        [filters]
    );

    const [search, setSearch] = useState(initial.search);
    const [startDate, setStartDate] = useState(initial.start_date);
    const [endDate, setEndDate] = useState(initial.end_date);
    const [currentTab, setCurrentTab] = useState(tab);

    const applyFilters = useCallback(
        (next = {}) => {
            router.get(
                route("rawat-jalan.surat-sehat.index"),
                {
                    search,
                    start_date: startDate,
                    end_date: endDate,
                    tab: currentTab,
                    ...next,
                },
                { preserveState: true, preserveScroll: true, replace: true }
            );
        },
        [endDate, search, startDate, currentTab]
    );

    useEffect(() => {
        const t = setTimeout(() => {
            applyFilters();
        }, 400);
        return () => clearTimeout(t);
    }, [applyFilters, search]);

    useEffect(() => {
        applyFilters();
    }, [applyFilters, endDate, startDate]);

    // Handle tab change separately to reset pagination/filters if needed or just switch context
    const handleTabChange = (newTab) => {
        if (newTab === currentTab) return;
        setCurrentTab(newTab);
        setSearch("");
        
        // Ensure dates are set to default if empty when switching tabs
        const defaultDate = new Date().toISOString().split('T')[0];
        if (!startDate) setStartDate(defaultDate);
        if (!endDate) setEndDate(defaultDate);
    };

    const clearFilters = () => {
        setSearch("");
        setStartDate("");
        setEndDate("");
        router.get(route("rawat-jalan.surat-sehat.index"), { tab: currentTab }, { replace: true });
    };

    const renderSuratSehatTable = () => (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200">
                            No Surat
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200">
                            Nama Pasien
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200">
                            No. RM
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200">
                            Tanggal
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200">
                            Hasil Pemeriksaan
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200">
                            Keperluan
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200">
                            Kesimpulan
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-200">
                            Aksi
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
                    {suratSehat?.data?.length ? (
                        suratSehat.data.map((row) => (
                            <tr key={row.no_surat}>
                                <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                                    {row.no_surat}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
                                    {row.nm_pasien || "-"}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                    {row.no_rkm_medis || "-"}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                    {row.tanggalsurat ? row.tanggalsurat.split('-').reverse().join('-') : "-"}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
                                    <div className="space-y-0.5 text-xs">
                                        {row.berat && <div>BB: {row.berat} kg</div>}
                                        {row.tinggi && <div>TB: {row.tinggi} cm</div>}
                                        {row.tensi && <div>TD: {row.tensi} mmHg</div>}
                                        {row.suhu && <div>Suhu: {row.suhu} °C</div>}
                                        {row.butawarna && <div>Buta Warna: {row.butawarna}</div>}
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
                                    {row.keperluan || "-"}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${row.kesimpulan === 'Sehat'
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                        }`}>
                                        {row.kesimpulan || "-"}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-right whitespace-nowrap">
                                    {row.no_rawat ? (
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={route(
                                                    "rawat-jalan.buat-surat",
                                                    { no_rawat: row.no_rawat, template: 'sehat' }
                                                )}
                                                className="inline-flex items-center gap-1 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white px-2.5 py-1.5 text-xs font-semibold transition-colors"
                                                title="Edit Surat"
                                            >
                                                <PencilSquareIcon className="w-4 h-4" />
                                                Edit
                                            </Link>
                                            <Link
                                                href={route(
                                                    "rawat-jalan.buat-surat",
                                                    { no_rawat: row.no_rawat, template: 'sehat', mode: 'print' }
                                                )}
                                                className="inline-flex items-center gap-1 rounded-lg bg-green-600 hover:bg-green-700 text-white px-2.5 py-1.5 text-xs font-semibold transition-colors"
                                                title="Cetak Surat"
                                            >
                                                <PrinterIcon className="w-4 h-4" />
                                                Cetak
                                            </Link>
                                        </div>
                                    ) : (
                                        <span className="text-xs text-gray-400">
                                            -
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={8}
                                className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400"
                            >
                                Tidak ada data.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    const renderSuratSakitTable = () => (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200">
                            No Surat
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200">
                            Nama
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200">
                            No. RM
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200">
                            No Rawat
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200">
                            Tanggal Awal
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200">
                            Tanggal Akhir
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200">
                            Lama Sakit
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-200">
                            Aksi
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
                    {suratSakit?.data?.length ? (
                        suratSakit.data.map((row) => (
                            <tr key={row.no_surat}>
                                <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                                    {row.no_surat}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
                                    {row.nm_pasien || "-"}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                    {row.no_rkm_medis || "-"}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                    {row.no_rawat || "-"}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                    {row.tanggalawal ? row.tanggalawal.split('-').reverse().join('-') : "-"}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                    {row.tanggalakhir ? row.tanggalakhir.split('-').reverse().join('-') : "-"}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
                                    {row.lamasakit || "-"}
                                </td>
                                <td className="px-4 py-3 text-right whitespace-nowrap">
                                    {row.no_rawat ? (
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={route(
                                                    "rawat-jalan.buat-surat",
                                                    { no_rawat: row.no_rawat, template: 'sakit' }
                                                )}
                                                className="inline-flex items-center gap-1 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white px-2.5 py-1.5 text-xs font-semibold transition-colors"
                                                title="Edit Surat"
                                            >
                                                <PencilSquareIcon className="w-4 h-4" />
                                                Edit
                                            </Link>
                                            <Link
                                                href={route(
                                                    "rawat-jalan.buat-surat",
                                                    { no_rawat: row.no_rawat, template: 'sakit', mode: 'print' }
                                                )}
                                                className="inline-flex items-center gap-1 rounded-lg bg-green-600 hover:bg-green-700 text-white px-2.5 py-1.5 text-xs font-semibold transition-colors"
                                                title="Cetak Surat"
                                            >
                                                <PrinterIcon className="w-4 h-4" />
                                                Cetak
                                            </Link>
                                        </div>
                                    ) : (
                                        <span className="text-xs text-gray-400">
                                            -
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={8}
                                className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400"
                            >
                                Tidak ada data.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    return (
        <SidebarRalan>
            <Head title="Surat - Surat" />

            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Surat - Surat
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Kelola data surat sehat dan surat sakit
                        </p>
                    </div>
                    <div className="flex gap-2">
                        {search && (
                            <Link
                                href={route("rawat-jalan.buat-surat", { no_rawat: search, template: currentTab })}
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 text-sm font-medium transition-colors"
                            >
                                <PlusIcon className="w-4 h-4" />
                                Buat Surat
                            </Link>
                        )}
                        <Link
                            href={route("rawat-jalan.index")}
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            Kembali
                        </Link>
                    </div>
                </div>

                <div className="border-b border-gray-200 dark:border-gray-700">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        <button
                            onClick={() => handleTabChange('sehat')}
                            className={`
                                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                                ${currentTab === 'sehat'
                                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}
                            `}
                        >
                            Surat Sehat
                        </button>
                        <button
                            onClick={() => handleTabChange('sakit')}
                            className={`
                                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                                ${currentTab === 'sakit'
                                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}
                            `}
                        >
                            Surat Sakit
                        </button>
                    </nav>
                </div>

                <div className="rounded-xl border border-gray-200/70 dark:border-gray-700/70 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
                    <div className="p-4 sm:p-5 border-b border-gray-200/70 dark:border-gray-700/70 bg-gradient-to-r from-blue-50/70 via-indigo-50/70 to-purple-50/70 dark:from-gray-800/70 dark:via-gray-800/70 dark:to-gray-800/70">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                            <div className="md:col-span-6">
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                    Pencarian
                                </label>
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder={currentTab === 'sehat' ? "No Surat / No Rawat / Keperluan / Kesimpulan" : "No Surat / No Rawat / Nama / Lama Sakit"}
                                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className="md:col-span-3">
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                    Dari Tanggal
                                </label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className="md:col-span-3">
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                    Sampai Tanggal
                                </label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                        </div>
                        <div className="mt-3 flex items-center justify-between">
                            <div />
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="text-xs font-semibold text-gray-700 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 px-3 py-2 hover:bg-white dark:hover:bg-gray-800"
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    {currentTab === 'sehat' && renderSuratSehatTable()}
                    {currentTab === 'sakit' && renderSuratSakitTable()}

                    {currentTab === 'sehat' && suratSehat?.links && (
                        <Pagination
                            links={suratSehat.links}
                            from={suratSehat.from}
                            to={suratSehat.to}
                            total={suratSehat.total}
                        />
                    )}
                    {currentTab === 'sakit' && suratSakit?.links && (
                        <Pagination
                            links={suratSakit.links}
                            from={suratSakit.from}
                            to={suratSakit.to}
                            total={suratSakit.total}
                        />
                    )}
                </div>
            </div>
        </SidebarRalan>
    );
}
