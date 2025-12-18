import React, { useState, useEffect } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import SidebarRadiologi from "@/Layouts/SidebarRadiologi";
import ActionDropdown from "@/Components/ActionDropdown";
import Alert from "@/Components/Alert";
import Pagination from "@/Components/Pagination";
import Modal from "@/Components/Modal";
import {
    Search,
    RefreshCw,
    CalendarRange,
    Stethoscope,
    Clock,
} from "lucide-react";

const getTodayDate = () => {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Jakarta",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
    return formatter.format(now);
};

export default function Index({
    title = "Permintaan Radiologi",
    permintaanRadiologi,
    dokters = [],
    filters = {},
    flash,
    errors: pageErrors,
}) {
    const { props } = usePage();

    const defaultStartDate = filters.start_date || getTodayDate();
    const defaultEndDate = filters.end_date || getTodayDate();

    const [search, setSearch] = useState(filters.search || "");
    const [dokter, setDokter] = useState(filters.dokter || "");
    const [activeTab, setActiveTab] = useState(filters.status || "ralan");
    const [startDate, setStartDate] = useState(defaultStartDate);
    const [endDate, setEndDate] = useState(defaultEndDate);

    const [showAlert, setShowAlert] = useState(false);
    const [alertConfig, setAlertConfig] = useState({
        type: "success",
        title: "",
        message: "",
        autoClose: false,
    });
    const [showSampleModal, setShowSampleModal] = useState(false);
    const [sampleDate, setSampleDate] = useState("");
    const [sampleTime, setSampleTime] = useState("");
    const [selectedPermintaan, setSelectedPermintaan] = useState(null);

    useEffect(() => {
        if (flash?.success) {
            setAlertConfig({
                type: "success",
                title: "Berhasil",
                message: flash.success,
                autoClose: true,
            });
            setShowAlert(true);
        }
        if (flash?.error || pageErrors?.error) {
            setAlertConfig({
                type: "error",
                title: "Error",
                message: flash?.error || pageErrors?.error,
                autoClose: false,
            });
            setShowAlert(true);
        }
    }, [flash, pageErrors]);

    const allData = permintaanRadiologi?.data || [];
    const data =
        activeTab === "ralan" || activeTab === "ranap"
            ? allData.filter((item) => item.status === activeTab)
            : allData;

    const handleSearch = () => {
        const statusToUse =
            activeTab === "ralan" || activeTab === "ranap" ? activeTab : "";
        router.get(
            route("radiologi.index"),
            {
                search: search || undefined,
                dokter: dokter || undefined,
                status: statusToUse || undefined,
                start_date: startDate || undefined,
                end_date: endDate || undefined,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const handleReset = () => {
        const today = getTodayDate();
        setSearch("");
        setDokter("");
        setActiveTab("ralan");
        setStartDate(today);
        setEndDate(today);
        router.get(
            route("radiologi.index"),
            {
                status: "ralan",
                start_date: today,
                end_date: today,
            },
            {
                replace: true,
            }
        );
    };

    const openSampleModal = (item) => {
        if (!item) return;

        if (item.has_hasil) {
            setAlertConfig({
                type: "error",
                title: "Tidak Bisa Update Sampel",
                message:
                    "Tidak dapat memperbarui waktu sampel karena hasil radiologi sudah tersedia.",
                autoClose: true,
            });
            setShowAlert(true);
            return;
        }

        setSelectedPermintaan(item);

        const now = new Date();
        const dateFormatter = new Intl.DateTimeFormat("en-CA", {
            timeZone: "Asia/Jakarta",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
        const defaultDate = dateFormatter.format(now);

        const timeFormatter = new Intl.DateTimeFormat("en-US", {
            timeZone: "Asia/Jakarta",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
        const defaultTime = timeFormatter.format(now);

        setSampleDate(
            item.tgl_sampel && item.tgl_sampel !== "0000-00-00"
                ? item.tgl_sampel
                : defaultDate
        );
        setSampleTime(
            item.jam_sampel && item.jam_sampel !== "00:00:00"
                ? item.jam_sampel.toString().substring(0, 5)
                : defaultTime
        );

        setShowSampleModal(true);
    };

    const submitSample = () => {
        if (!selectedPermintaan?.noorder) return;

        if (!sampleDate || !sampleTime) {
            setAlertConfig({
                type: "error",
                title: "Validasi Gagal",
                message: "Tanggal dan jam sampel harus diisi.",
                autoClose: true,
            });
            setShowAlert(true);
            return;
        }

        router.post(
            route("radiologi.update", selectedPermintaan.noorder),
            {
                _method: "PUT",
                tgl_sampel: sampleDate,
                jam_sampel: sampleTime,
            },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (page) => {
                    setShowSampleModal(false);
                    setSelectedPermintaan(null);
                    const message =
                        page?.props?.flash?.success ||
                        "Tanggal dan jam sampel radiologi berhasil diperbarui.";
                    setAlertConfig({
                        type: "success",
                        title: "Berhasil",
                        message,
                        autoClose: true,
                    });
                    setShowAlert(true);
                    setTimeout(() => {
                        handleSearch();
                    }, 500);
                },
                onError: (errs) => {
                    let message =
                        "Terjadi kesalahan saat memperbarui sampel.";
                    if (errs?.error) {
                        const val = errs.error;
                        if (Array.isArray(val))
                            message = val[0] || message;
                        else if (typeof val === "string")
                            message = val;
                        else if (val?.message)
                            message = val.message || message;
                    }
                    setAlertConfig({
                        type: "error",
                        title: "Gagal",
                        message,
                        autoClose: true,
                    });
                    setShowAlert(true);
                },
            }
        );
    };

    const handleDelete = (item) => {
        if (!item?.noorder) return;

        if (item.has_hasil) {
            setAlertConfig({
                type: "error",
                title: "Tidak Bisa Dihapus",
                message:
                    "Tidak dapat menghapus permintaan radiologi karena hasil sudah tersedia.",
                autoClose: true,
            });
            setShowAlert(true);
            return;
        }

        setAlertConfig({
            type: "warning",
            title: "Hapus Permintaan",
            message: `Anda yakin ingin menghapus permintaan ${item.noorder}?`,
            autoClose: false,
            onConfirm: () => {
                router.delete(route("radiologi.destroy", item.noorder), {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: (page) => {
                        const message =
                            page?.props?.flash?.success ||
                            "Permintaan radiologi berhasil dihapus.";
                        setAlertConfig({
                            type: "success",
                            title: "Berhasil",
                            message,
                            autoClose: true,
                        });
                        setShowAlert(true);
                    },
                    onError: (errs) => {
                        let message =
                            "Terjadi kesalahan saat menghapus permintaan.";
                        if (errs?.error) {
                            const val = errs.error;
                            if (Array.isArray(val)) message = val[0] || message;
                            else if (typeof val === "string") message = val;
                            else if (val?.message)
                                message = val.message || message;
                        }
                        setAlertConfig({
                            type: "error",
                            title: "Gagal Menghapus",
                            message,
                            autoClose: true,
                        });
                        setShowAlert(true);
                    },
                });
            },
            showCancel: true,
        });
        setShowAlert(true);
    };

    const getStatusBadge = (item) => {
        const hasSampel = item.has_sampel;
        const hasHasil = item.has_hasil;

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
        <SidebarRadiologi title={title}>
            <Head title={title} />

            {showAlert && (
                <Alert
                    isOpen={showAlert}
                    type={alertConfig.type}
                    title={alertConfig.title}
                    message={alertConfig.message}
                    autoClose={alertConfig.autoClose}
                    onClose={() => setShowAlert(false)}
                    showCancel={alertConfig.showCancel}
                    onConfirm={alertConfig.onConfirm}
                />
            )}

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex flex-col gap-1 bg-gradient-to-r from-rose-50 via-red-50 to-orange-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800">
                            <div>
                                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                                    Data Permintaan Radiologi
                                </h1>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    Kelola permintaan pemeriksaan radiologi rawat jalan dan rawat inap
                                </p>
                            </div>
                        </div>

                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/60">
                            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                <div className="md:col-span-2 lg:col-span-3">
                                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
                                        Pencarian
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={search}
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter")
                                                    handleSearch();
                                            }}
                                            placeholder="Cari pasien, no rawat, atau no order..."
                                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-500/70 focus:border-rose-500"
                                        />
                                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
                                        Dokter Perujuk
                                    </label>
                                    <select
                                        value={dokter}
                                        onChange={(e) => setDokter(e.target.value)}
                                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-500/70 focus:border-rose-500"
                                    >
                                        <option value="">Semua Dokter</option>
                                        {dokters.map((d) => (
                                            <option key={d.kd_dokter} value={d.kd_dokter}>
                                                {d.nm_dokter}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="md:col-span-1 lg:col-span-2 grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
                                            Tanggal Mulai
                                        </label>
                                        <div className="relative">
                                            <CalendarRange className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                            <input
                                                type="date"
                                                value={startDate}
                                                onChange={(e) =>
                                                    setStartDate(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-500/70 focus:border-rose-500"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
                                            Tanggal Akhir
                                        </label>
                                        <div className="relative">
                                            <CalendarRange className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                            <input
                                                type="date"
                                                value={endDate}
                                                onChange={(e) =>
                                                    setEndDate(e.target.value)
                                                }
                                                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-500/70 focus:border-rose-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-wrap items-center gap-2 justify-end">
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
                                >
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Reset
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSearch}
                                    className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 shadow-sm"
                                >
                                    <Search className="w-4 h-4 mr-2" />
                                    Terapkan Filter
                                </button>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/80">
                            <nav className="flex -mb-px px-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setActiveTab("ralan");
                                        router.get(
                                            route("radiologi.index"),
                                            {
                                                search,
                                                dokter,
                                                status: "ralan",
                                                start_date: startDate,
                                                end_date: endDate,
                                            },
                                            {
                                                preserveState: true,
                                                replace: true,
                                            }
                                        );
                                    }}
                                    className={`px-6 py-3 text-sm font-semibold border-b-2 transition-colors ${
                                        activeTab === "ralan"
                                            ? "border-rose-500 text-rose-600 dark:text-rose-400 bg-rose-50/40 dark:bg-gray-900"
                                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                                    }`}
                                >
                                    Rawat Jalan
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setActiveTab("ranap");
                                        router.get(
                                            route("radiologi.index"),
                                            {
                                                search,
                                                dokter,
                                                status: "ranap",
                                                start_date: startDate,
                                                end_date: endDate,
                                            },
                                            {
                                                preserveState: true,
                                                replace: true,
                                            }
                                        );
                                    }}
                                    className={`px-6 py-3 text-sm font-semibold border-b-2 transition-colors ${
                                        activeTab === "ranap"
                                            ? "border-rose-500 text-rose-600 dark:text-rose-400 bg-rose-50/40 dark:bg-gray-900"
                                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                                    }`}
                                >
                                    Rawat Inap
                                </button>
                            </nav>
                        </div>

                        <div className="px-2 sm:px-4 py-4">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-sm">
                                    <thead className="bg-gray-50 dark:bg-gray-900">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">
                                                No. Permintaan
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">
                                                Pasien
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">
                                                Tanggal Permintaan
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">
                                                Tanggal Sampel
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">
                                                Tanggal Hasil
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">
                                                Dokter
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">
                                                Status
                                            </th>
                                            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900">
                                        {data.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan={8}
                                                    className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400"
                                                >
                                                    Tidak ada data permintaan radiologi.
                                                </td>
                                            </tr>
                                        )}
                                        {data.map((item) => (
                                            <tr key={item.noorder}>
                                                <td className="px-4 py-3 whitespace-nowrap align-top">
                                                    <div className="font-medium text-gray-900 dark:text-gray-100">
                                                        {item.noorder}
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                        {item.no_rawat}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap align-top">
                                                    <div className="font-medium text-gray-900 dark:text-gray-100">
                                                        {item.reg_periksa?.patient?.nm_pasien ||
                                                            "-"}
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                        {item.reg_periksa?.patient
                                                            ?.no_rkm_medis || "-"}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap align-top">
                                                    <div className="text-gray-900 dark:text-gray-100">
                                                        {item.tgl_permintaan
                                                            ? new Date(
                                                                  item.tgl_permintaan
                                                              ).toLocaleDateString(
                                                                  "id-ID"
                                                              )
                                                            : "-"}
                                                    </div>
                                                    {item.jam_permintaan &&
                                                        item.jam_permintaan !==
                                                            "00:00:00" && (
                                                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                                {item.jam_permintaan
                                                                    .toString()
                                                                    .substring(
                                                                        0,
                                                                        5
                                                                    )}
                                                            </div>
                                                        )}
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap align-top">
                                                    <div className="text-gray-900 dark:text-gray-100">
                                                        {item.tgl_sampel &&
                                                        item.tgl_sampel !==
                                                            "0000-00-00"
                                                            ? new Date(
                                                                  item.tgl_sampel
                                                              ).toLocaleDateString(
                                                                  "id-ID"
                                                              )
                                                            : "-"}
                                                    </div>
                                                    {item.jam_sampel &&
                                                        item.jam_sampel !==
                                                            "00:00:00" && (
                                                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                                {item.jam_sampel
                                                                    .toString()
                                                                    .substring(
                                                                        0,
                                                                        5
                                                                    )}
                                                            </div>
                                                        )}
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap align-top">
                                                    <div className="text-gray-900 dark:text-gray-100">
                                                        {item.tgl_hasil &&
                                                        item.tgl_hasil !==
                                                            "0000-00-00"
                                                            ? new Date(
                                                                  item.tgl_hasil
                                                              ).toLocaleDateString(
                                                                  "id-ID"
                                                              )
                                                            : "-"}
                                                    </div>
                                                    {item.jam_hasil &&
                                                        item.jam_hasil !==
                                                            "00:00:00" && (
                                                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                                {item.jam_hasil
                                                                    .toString()
                                                                    .substring(
                                                                        0,
                                                                        5
                                                                    )}
                                                            </div>
                                                        )}
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap align-top">
                                                    <div className="text-gray-900 dark:text-gray-100">
                                                        {item.dokter?.nm_dokter ||
                                                            item.dokter_perujuk ||
                                                            "-"}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap align-top">
                                                    {getStatusBadge(item)}
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap text-right align-top">
                                                    <ActionDropdown
                                                        item={item}
                                                        viewRoute="radiologi.show"
                                                        editRoute="radiologi.edit"
                                                        onDelete={() =>
                                                            handleDelete(item)
                                                        }
                                                        customItems={
                                                            <>
                                                                <button
                                                                    onClick={() =>
                                                                        openSampleModal(
                                                                            item
                                                                        )
                                                                    }
                                                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                                                                >
                                                                    <span className="mr-3 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300">
                                                                        <Clock className="w-4 h-4" />
                                                                    </span>
                                                                    Update Sampel
                                                                </button>
                                                            </>
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {permintaanRadiologi && (
                            <Pagination
                                links={permintaanRadiologi.links}
                                from={permintaanRadiologi.from}
                                to={permintaanRadiologi.to}
                                total={permintaanRadiologi.total}
                            />
                        )}
                    </div>
                </div>
            </div>

            <Modal
                show={showSampleModal}
                onClose={() => setShowSampleModal(false)}
                title="Update Waktu Sampel"
            >
                <div className="space-y-6 p-6">
                    {selectedPermintaan && (
                        <div className="p-4 rounded-xl bg-gradient-to-r from-rose-50/60 to-orange-50/60 dark:from-rose-900/20 dark:to-orange-900/20 border border-rose-200/60 dark:border-rose-800/60">
                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                <span className="font-semibold">No. Permintaan:</span>{" "}
                                <span className="font-mono text-sm px-2 py-1 bg-white/80 dark:bg-gray-800/80 rounded-lg border border-gray-200/60 dark:border-gray-700/60">
                                    {selectedPermintaan.noorder}
                                </span>
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                                <span className="font-semibold">Pasien:</span>{" "}
                                {selectedPermintaan.reg_periksa?.patient?.nm_pasien || "-"}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">No. Rawat:</span>{" "}
                                {selectedPermintaan.no_rawat}
                            </p>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Tanggal Sampel
                        </label>
                        <input
                            type="date"
                            value={sampleDate}
                            onChange={(e) => setSampleDate(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300/70 dark:border-gray-600/70 rounded-lg focus:ring-2 focus:ring-rose-500/60 focus:border-rose-500 dark:bg-gray-800/80 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Jam Sampel
                        </label>
                        <input
                            type="time"
                            value={sampleTime}
                            onChange={(e) => setSampleTime(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300/70 dark:border-gray-600/70 rounded-lg focus:ring-2 focus:ring-rose-500/60 focus:border-rose-500 dark:bg-gray-800/80 dark:text-white"
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => setShowSampleModal(false)}
                            className="px-6 py-2.5 bg-white/90 dark:bg-gray-800/90 border border-gray-200/70 dark:border-gray-600/70 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-all duration-200"
                        >
                            Batal
                        </button>
                        <button
                            type="button"
                            onClick={submitSample}
                            className="px-6 py-2.5 bg-gradient-to-r from-rose-600 via-red-600 to-orange-500 hover:from-rose-700 hover:via-red-700 hover:to-orange-600 text-white font-semibold rounded-lg shadow-md shadow-rose-500/30 hover:shadow-lg hover:shadow-rose-500/40 transition-all duration-200"
                        >
                            Simpan
                        </button>
                    </div>
                </div>
            </Modal>
        </SidebarRadiologi>
    );
}
