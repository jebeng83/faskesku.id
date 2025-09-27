import React, { useState } from "react";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
import AppLayout from "@/Layouts/AppLayout";
import ResponsiveTable from "@/Components/ResponsiveTable";
import ActionDropdown from "@/Components/ActionDropdown";
import Pagination from "@/Components/Pagination";
import ConfirmationAlert from "@/Components/ConfirmationAlert";
import Alert from "@/Components/Alert";
import Modal from "@/Components/Modal";
import Button from "@/Components/Button";
import { Input } from "@/Components/ui/Input";

export default function Index({ jenjangJabatan, filters }) {
    const [search, setSearch] = useState(filters?.search || "");
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("create"); // create or edit
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertConfig, setAlertConfig] = useState({
        type: "success",
        title: "",
        message: "",
        autoClose: false,
    });

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        kode: "",
        nama: "",
        tnj: 0,
        indek: 0,
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

    const openCreateModal = () => {
        reset();
        clearErrors();
        setModalMode("create");
        setShowModal(true);
    };

    const openEditModal = (item) => {
        setData({
            kode: item.kode,
            nama: item.nama,
            tnj: item.tnj || 0,
            indek: item.indek || 0,
        });
        clearErrors();
        setModalMode("edit");
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        reset();
        clearErrors();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (modalMode === "create") {
            post(route("jenjang-jabatan.store"), {
                onSuccess: () => {
                    closeModal();
                    setAlertConfig({
                        type: "success",
                        title: "Berhasil!",
                        message: "Jenjang Jabatan berhasil ditambahkan.",
                        autoClose: true,
                        autoCloseDelay: 3000,
                    });
                    setShowAlert(true);
                },
                onError: () => {
                    setAlertConfig({
                        type: "error",
                        title: "Gagal!",
                        message: "Terjadi kesalahan saat menambahkan data.",
                        autoClose: false,
                    });
                    setShowAlert(true);
                }
            });
        } else {
            put(route("jenjang-jabatan.update", data.kode), {
                onSuccess: () => {
                    closeModal();
                    setAlertConfig({
                        type: "success",
                        title: "Berhasil!",
                        message: "Jenjang Jabatan berhasil diperbarui.",
                        autoClose: true,
                        autoCloseDelay: 3000,
                    });
                    setShowAlert(true);
                },
                onError: () => {
                    setAlertConfig({
                        type: "error",
                        title: "Gagal!",
                        message: "Terjadi kesalahan saat memperbarui data.",
                        autoClose: false,
                    });
                    setShowAlert(true);
                }
            });
        }
    };

    const handleDelete = (item) => {
        setItemToDelete(item);
        setShowDeleteConfirmation(true);
    };

    const confirmDelete = () => {
        if (!itemToDelete) return;

        router.delete(route("jenjang-jabatan.destroy", itemToDelete.kode), {
            onSuccess: () => {
                setAlertConfig({
                    type: "success",
                    title: "Berhasil!",
                    message: "Jenjang Jabatan berhasil dihapus.",
                    autoClose: true,
                    autoCloseDelay: 3000,
                });
                setShowAlert(true);
            },
            onError: () => {
                setAlertConfig({
                    type: "error",
                    title: "Gagal!",
                    message: "Terjadi kesalahan saat menghapus data.",
                    autoClose: false,
                });
                setShowAlert(true);
            },
            onFinish: () => {
                setShowDeleteConfirmation(false);
                setItemToDelete(null);
            }
        });
    };

    const cancelDelete = () => {
        setShowDeleteConfirmation(false);
        setItemToDelete(null);
    };

    const columns = [
        {
            key: "kode",
            label: "Kode",
            sortable: true,
        },
        {
            key: "nama",
            label: "Nama Jenjang",
            sortable: true,
        },
        {
            key: "tnj",
            label: "Tunjangan",
            sortable: true,
            render: (value) => `Rp ${Number(value || 0).toLocaleString('id-ID')}`,
        },
        {
            key: "indek",
            label: "Indeks",
            sortable: true,
        },
        {
            key: "actions",
            label: "Aksi",
            render: (_, item) => (
                <ActionDropdown
                    actions={[
                        {
                            label: "Edit",
                            onClick: () => openEditModal(item),
                            icon: "pencil",
                        },
                        {
                            label: "Hapus",
                            onClick: () => handleDelete(item),
                            icon: "trash",
                            className: "text-red-600 hover:text-red-900",
                        },
                    ]}
                />
            ),
        },
    ];

    return (
        <AppLayout>
            <Head title="Jenjang Jabatan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="p-6 lg:p-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
                                        Jenjang Jabatan
                                    </h1>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                        Kelola data jenjang jabatan pegawai
                                    </p>
                                </div>
                                <div className="mt-4 sm:mt-0">
                                    <Button
                                        onClick={openCreateModal}
                                        className="bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                        Tambah Jenjang Jabatan
                                    </Button>
                                </div>
                            </div>

                            {/* Search Form */}
                            <div className="mt-6">
                                <form onSubmit={handleSearch} className="flex gap-4">
                                    <div className="flex-1">
                                        <Input
                                            type="text"
                                            placeholder="Cari berdasarkan kode atau nama..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="w-full"
                                        />
                                    </div>
                                    <Button type="submit" variant="outline">
                                        Cari
                                    </Button>
                                </form>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="p-6 lg:p-8">
                            <ResponsiveTable
                                columns={columns}
                                data={jenjangJabatan?.data || []}
                                keyField="kode"
                            />

                            {/* Pagination */}
                            {jenjangJabatan?.links && (
                                <div className="mt-6">
                                    <Pagination links={jenjangJabatan.links} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Create/Edit Modal */}
            <Modal show={showModal} onClose={closeModal} maxWidth="md">
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                        {modalMode === "create" ? "Tambah" : "Edit"} Jenjang Jabatan
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Kode <span className="text-red-500">*</span>
                            </label>
                            <Input
                                type="text"
                                value={data.kode}
                                onChange={(e) => setData("kode", e.target.value)}
                                disabled={modalMode === "edit"}
                                className="w-full"
                                placeholder="Masukkan kode jenjang jabatan"
                            />
                            {errors.kode && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                    {errors.kode}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Nama Jenjang <span className="text-red-500">*</span>
                            </label>
                            <Input
                                type="text"
                                value={data.nama}
                                onChange={(e) => setData("nama", e.target.value)}
                                className="w-full"
                                placeholder="Masukkan nama jenjang jabatan"
                            />
                            {errors.nama && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                    {errors.nama}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Tunjangan
                            </label>
                            <Input
                                type="number"
                                step="0.01"
                                value={data.tnj}
                                onChange={(e) => setData("tnj", parseFloat(e.target.value) || 0)}
                                className="w-full"
                                placeholder="Masukkan tunjangan"
                            />
                            {errors.tnj && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                    {errors.tnj}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Indeks
                            </label>
                            <Input
                                type="number"
                                value={data.indek}
                                onChange={(e) => setData("indek", parseInt(e.target.value) || 0)}
                                className="w-full"
                                placeholder="Masukkan indeks"
                            />
                            {errors.indek && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                    {errors.indek}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={closeModal}
                                disabled={processing}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                {processing ? "Menyimpan..." : modalMode === "create" ? "Simpan" : "Perbarui"}
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Delete Confirmation */}
            <ConfirmationAlert
                show={showDeleteConfirmation}
                title="Hapus Jenjang Jabatan"
                message={`Apakah Anda yakin ingin menghapus jenjang jabatan "${itemToDelete?.nama}"? Tindakan ini tidak dapat dibatalkan.`}
                confirmText="Hapus"
                cancelText="Batal"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
                type="danger"
            />

            {/* Alert */}
            <Alert
                show={showAlert}
                type={alertConfig.type}
                title={alertConfig.title}
                message={alertConfig.message}
                onClose={() => setShowAlert(false)}
                autoClose={alertConfig.autoClose}
                autoCloseDelay={alertConfig.autoCloseDelay}
            />
        </AppLayout>
    );
}