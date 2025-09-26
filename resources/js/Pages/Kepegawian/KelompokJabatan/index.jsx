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

export default function Index({ kelompokJabatan, filters }) {
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [search, setSearch] = useState(filters.search || "");

    const { data, setData, post, put, processing, errors, reset } = useForm({
        kode_kelompok: "",
        nama_kelompok: "",
        indek: ""
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("kelompok-jabatan.index"), { search }, {
            preserveState: true,
            replace: true
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editMode) {
            put(route("kelompok-jabatan.update", data.kode_kelompok), {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                    setEditMode(false);
                }
            });
        } else {
            post(route("kelompok-jabatan.store"), {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                }
            });
        }
    };

    const handleEdit = (kelompok) => {
        setData({
            kode_kelompok: kelompok.kode_kelompok,
            nama_kelompok: kelompok.nama_kelompok,
            indek: kelompok.indek
        });
        setEditMode(true);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowAlert(true);
    };

    const confirmDelete = () => {
        router.delete(route("kelompok-jabatan.destroy", deleteId), {
            onSuccess: () => {
                setShowAlert(false);
                setDeleteId(null);
            }
        });
    };

    const openCreateModal = () => {
        reset();
        setEditMode(false);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        reset();
        setEditMode(false);
    };

    const columns = [
        {
            key: "kode_kelompok",
            label: "Kode Kelompok",
            render: (item) => (
                <span className="font-medium text-gray-900">
                    {item.kode_kelompok}
                </span>
            )
        },
        {
            key: "nama_kelompok",
            label: "Nama Kelompok",
            render: (item) => (
                <span className="text-gray-700">
                    {item.nama_kelompok}
                </span>
            )
        },
        {
            key: "indek",
            label: "Indek",
            render: (item) => (
                <span className="text-gray-700">
                    {item.indek}
                </span>
            )
        },
        {
            key: "actions",
            label: "Aksi",
            render: (item) => (
                <ActionDropdown>
                    <ActionDropdown.Item onClick={() => handleEdit(item)}>
                        Edit
                    </ActionDropdown.Item>
                    <ActionDropdown.Item 
                        onClick={() => handleDelete(item.kode_kelompok)}
                        className="text-red-600"
                    >
                        Hapus
                    </ActionDropdown.Item>
                </ActionDropdown>
            )
        }
    ];

    return (
        <AppLayout
            title="Kelompok Jabatan"
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Kelompok Jabatan
                </h2>
            }
        >
            <Head title="Kelompok Jabatan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="p-6">
                            {/* Header Actions */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                <div className="flex-1 max-w-md">
                                    <form onSubmit={handleSearch} className="flex gap-2">
                                        <Input
                                            type="text"
                                            placeholder="Cari kelompok jabatan..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="flex-1"
                                        />
                                        <Button type="submit" variant="outline">
                                            Cari
                                        </Button>
                                    </form>
                                </div>
                                <Button onClick={openCreateModal}>
                                    Tambah Kelompok Jabatan
                                </Button>
                            </div>

                            {/* Table */}
                            <ResponsiveTable
                                columns={columns}
                                data={kelompokJabatan.data}
                                emptyMessage="Tidak ada data kelompok jabatan"
                            />

                            {/* Pagination */}
                            <div className="mt-6">
                                <Pagination links={kelompokJabatan.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Form */}
            <Modal show={showModal} onClose={closeModal} maxWidth="md">
                <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        {editMode ? "Edit Kelompok Jabatan" : "Tambah Kelompok Jabatan"}
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Kode Kelompok
                            </label>
                            <Input
                                type="text"
                                value={data.kode_kelompok}
                                onChange={(e) => setData("kode_kelompok", e.target.value)}
                                maxLength={3}
                                disabled={editMode}
                                className={editMode ? "bg-gray-100" : ""}
                            />
                            {errors.kode_kelompok && (
                                <p className="text-red-500 text-xs mt-1">{errors.kode_kelompok}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nama Kelompok
                            </label>
                            <Input
                                type="text"
                                value={data.nama_kelompok}
                                onChange={(e) => setData("nama_kelompok", e.target.value)}
                                maxLength={100}
                            />
                            {errors.nama_kelompok && (
                                <p className="text-red-500 text-xs mt-1">{errors.nama_kelompok}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Indek
                            </label>
                            <Input
                                type="number"
                                value={data.indek}
                                onChange={(e) => setData("indek", e.target.value)}
                            />
                            {errors.indek && (
                                <p className="text-red-500 text-xs mt-1">{errors.indek}</p>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={closeModal}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                            >
                                {processing ? "Menyimpan..." : editMode ? "Update" : "Simpan"}
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Confirmation Alert */}
            <ConfirmationAlert
                show={showAlert}
                onClose={() => setShowAlert(false)}
                onConfirm={confirmDelete}
                title="Hapus Kelompok Jabatan"
                message="Apakah Anda yakin ingin menghapus kelompok jabatan ini? Tindakan ini tidak dapat dibatalkan."
                confirmText="Hapus"
                cancelText="Batal"
            />

            {/* Flash Messages */}
            <Alert />
        </AppLayout>
    );
}