import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import SidebarPengaturan from "@/Layouts/SidebarPengaturan";
import ResponsiveTable from "@/Components/ResponsiveTable";
import ActionDropdown from "@/Components/ActionDropdown";
import Pagination from "@/Components/Pagination";
import Alert from "@/Components/Alert";

export default function Index({ jenjangJabatan, filters }) {
    const [search, setSearch] = useState(filters?.search || "");
    const [showAlert, setShowAlert] = useState(false);
    const [alertConfig, setAlertConfig] = useState({
        type: "success",
        title: "",
        message: "",
        autoClose: false,
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route("jenjang-jabatan.index"),
            { search },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const handleDelete = (item) => {
        if (confirm(`Apakah Anda yakin ingin menghapus ${item.kode} - ${item.nama}?`)) {
            router.delete(route("jenjang-jabatan.destroy", item.kode), {
                onSuccess: () => {
                    setAlertConfig({
                        type: "success",
                        title: "Berhasil",
                        message: "Data Jenjang Jabatan berhasil dihapus.",
                        autoClose: true,
                    });
                    setShowAlert(true);
                },
                onError: () => {
                    setAlertConfig({
                        type: "error",
                        title: "Gagal",
                        message: "Gagal menghapus data Jenjang Jabatan.",
                        autoClose: true,
                    });
                    setShowAlert(true);
                },
            });
        }
    };

    const columns = [
        {
            header: "Kode",
            accessor: "kode",
            className: "font-medium",
        },
        {
            header: "Nama",
            accessor: "nama",
        },
        {
            header: "Tunjangan",
            accessor: "tnj",
            render: (value) => {
                return new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                }).format(value || 0);
            },
        },
        {
            header: "Indek",
            accessor: "indek",
        },
        {
            header: "Aksi",
            accessor: "actions",
            render: (_, row) => (
                <ActionDropdown>
                    <Link
                        href={route("jenjang-jabatan.show", row.kode)}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        Lihat
                    </Link>
                    <Link
                        href={route("jenjang-jabatan.edit", row.kode)}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={() => handleDelete(row)}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        Hapus
                    </button>
                </ActionDropdown>
            ),
        },
    ];

    return (
        <SidebarPengaturan title="Kepegawaian">
            <Head title="Jenjang Jabatan" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="bg-white/95 dark:bg-gray-900/60 backdrop-blur-sm overflow-visible shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl mb-6">
                        <div className="p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Jenjang Jabatan
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                                        Kelola data jenjang jabatan pegawai
                                    </p>
                                </div>
                                <Link
                                    href={route("jenjang-jabatan.create")}
                                    className="px-4 h-10 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 transition-colors"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Tambah Baru
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Alert */}
                    {showAlert && (
                        <Alert
                            type={alertConfig.type}
                            title={alertConfig.title}
                            message={alertConfig.message}
                            onClose={() => setShowAlert(false)}
                            autoClose={alertConfig.autoClose}
                        />
                    )}

                    {/* Search and Filter */}
                    <div className="bg-white/95 dark:bg-gray-900/60 backdrop-blur-sm overflow-visible shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl mb-6">
                        <div className="p-6">
                            <form onSubmit={handleSearch} className="flex gap-4">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Cari kode atau nama jenjang jabatan..."
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                >
                                    Cari
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white/95 dark:bg-gray-900/60 backdrop-blur-sm overflow-visible shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl">
                        <div className="p-6">
                            <ResponsiveTable
                                columns={columns}
                                data={jenjangJabatan?.data || []}
                                emptyMessage="Tidak ada data jenjang jabatan"
                            />
                            {jenjangJabatan && (
                                <div className="mt-4">
                                    <Pagination links={jenjangJabatan.links} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </SidebarPengaturan>
    );
}
