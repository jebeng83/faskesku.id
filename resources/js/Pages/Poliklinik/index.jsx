import React, { useState, useEffect } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/Select";
import { Badge } from "@/Components/ui/Badge";
import { EyeIcon, PencilIcon, TrashIcon, PowerIcon } from "@heroicons/react/24/outline";

export default function Index({ polikliniks, filters }) {
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [search, setSearch] = useState(filters.search || "");
    const [statusFilter, setStatusFilter] = useState(filters.status || "all");

    const { data, setData, post, put, processing, errors, reset } = useForm({
        kd_poli: "",
        nm_poli: "",
        registrasi: "",
        registrasilama: "",
        status: "1"
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("poliklinik.index"), { 
            search, 
            status: statusFilter !== "all" ? statusFilter : undefined 
        }, {
            preserveState: true,
            replace: true
        });
    };

    const handleStatusFilter = (status) => {
        setStatusFilter(status);
        router.get(route("poliklinik.index"), { 
            search, 
            status: status !== "all" ? status : undefined 
        }, {
            preserveState: true,
            replace: true
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editMode) {
            put(route("poliklinik.update", data.kd_poli), {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                    setEditMode(false);
                }
            });
        } else {
            post(route("poliklinik.store"), {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                }
            });
        }
    };

    const handleEdit = (poliklinik) => {
        setData({
            kd_poli: poliklinik.kd_poli,
            nm_poli: poliklinik.nm_poli,
            registrasi: poliklinik.registrasi,
            registrasilama: poliklinik.registrasilama,
            status: poliklinik.status
        });
        setEditMode(true);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowAlert(true);
    };

    const confirmDelete = () => {
        router.delete(route("poliklinik.destroy", deleteId), {
            onSuccess: () => {
                setShowAlert(false);
                setDeleteId(null);
            }
        });
    };

    const handleToggleStatus = (poliklinik) => {
        router.post(route("poliklinik.toggle-status", poliklinik.kd_poli), {}, {
            preserveScroll: true
        });
    };

    // Function to generate automatic Poliklinik code
    const generatePoliklinikCode = () => {
        if (!polikliniks.data || polikliniks.data.length === 0) {
            return "U0001";
        }

        // Get all existing codes that start with 'U'
        const existingCodes = polikliniks.data
            .map(poli => poli.kd_poli)
            .filter(code => code && code.startsWith('U'))
            .map(code => {
                const numPart = code.substring(1);
                return parseInt(numPart) || 0;
            })
            .sort((a, b) => b - a); // Sort descending

        // Get the highest number and increment
        const nextNumber = existingCodes.length > 0 ? existingCodes[0] + 1 : 1;
        
        // Format with leading zeros (UXXXX format)
        return `U${nextNumber.toString().padStart(4, '0')}`;
    };

    const openCreateModal = () => {
        setEditMode(false);
        const newCode = generatePoliklinikCode();
        console.log('Generated Poliklinik Code:', newCode); // Debug log
        reset({
            kd_poli: newCode,
            nm_poli: "",
            registrasi: "",
            registrasilama: "",
            status: "1"
        });
        console.log('Form data after reset:', { kd_poli: newCode }); // Debug log
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        reset();
        setEditMode(false);
    };

    const getStatusBadge = (status) => {
        return (
            <Badge variant={status === "1" ? "success" : "destructive"}>
                {status === "1" ? "Aktif" : "Nonaktif"}
            </Badge>
        );
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const columns = [
        {
            key: "kd_poli",
            label: "Kode Poliklinik",
            render: (item) => (
                <span className="font-medium text-gray-900">
                    {item.kd_poli}
                </span>
            )
        },
        {
            key: "nm_poli",
            label: "Nama Poliklinik",
            render: (item) => (
                <span className="text-gray-700">
                    {item.nm_poli}
                </span>
            )
        },
        {
            key: "registrasi",
            label: "Biaya Registrasi Baru",
            render: (item) => (
                <span className="text-gray-700 font-medium">
                    {formatCurrency(item.registrasi)}
                </span>
            )
        },
        {
            key: "registrasilama",
            label: "Biaya Registrasi Lama",
            render: (item) => (
                <span className="text-gray-700 font-medium">
                    {formatCurrency(item.registrasilama)}
                </span>
            )
        },
        {
            key: "status",
            label: "Status",
            render: (item) => getStatusBadge(item.status)
        },
        {
            key: "actions",
            label: "Aksi",
            render: (item) => (
                <ActionDropdown>
                    <ActionDropdown.Item 
                        as={Link}
                        href={route("poliklinik.show", item.kd_poli)}
                    >
                        <EyeIcon className="w-4 h-4 mr-2" />
                        Detail
                    </ActionDropdown.Item>
                    <ActionDropdown.Item onClick={() => handleEdit(item)}>
                        <PencilIcon className="w-4 h-4 mr-2" />
                        Edit
                    </ActionDropdown.Item>
                    <ActionDropdown.Item onClick={() => handleToggleStatus(item)}>
                        <PowerIcon className="w-4 h-4 mr-2" />
                        {item.status === "1" ? "Nonaktifkan" : "Aktifkan"}
                    </ActionDropdown.Item>
                    <ActionDropdown.Item 
                        onClick={() => handleDelete(item.kd_poli)}
                        className="text-red-600"
                    >
                        <TrashIcon className="w-4 h-4 mr-2" />
                        Hapus
                    </ActionDropdown.Item>
                </ActionDropdown>
            )
        }
    ];

    return (
        <AppLayout
            title="Data Poliklinik"
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Data Poliklinik
                </h2>
            }
        >
            <Head title="Data Poliklinik" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="p-6">
                            {/* Header Actions */}
                            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
                                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                                    {/* Search Form */}
                                    <form onSubmit={handleSearch} className="flex gap-2 flex-1 max-w-md">
                                        <Input
                                            type="text"
                                            placeholder="Cari poliklinik..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="flex-1"
                                        />
                                        <Button type="submit" variant="outline">
                                            Cari
                                        </Button>
                                    </form>

                                    {/* Status Filter */}
                                    <div className="min-w-[150px]">
                                        <Select value={statusFilter} onValueChange={handleStatusFilter}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Filter Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">Semua Status</SelectItem>
                                                <SelectItem value="1">Aktif</SelectItem>
                                                <SelectItem value="0">Nonaktif</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <Button onClick={openCreateModal}>
                                    Tambah Poliklinik
                                </Button>
                            </div>

                            {/* Table */}
                            <ResponsiveTable
                                columns={columns}
                                data={polikliniks.data}
                                emptyMessage="Tidak ada data poliklinik"
                            />

                            {/* Pagination */}
                            <div className="mt-6">
                                <Pagination links={polikliniks.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Form */}
            <Modal 
                show={showModal} 
                onClose={closeModal} 
                maxWidth="lg"
                title={editMode ? "Edit Poliklinik" : "Tambah Poliklinik"}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Kode Poliklinik <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Input
                                        type="text"
                                        value={data.kd_poli}
                                        onChange={(e) => setData("kd_poli", e.target.value.toUpperCase())}
                                        maxLength={5}
                                        disabled={true}
                                        className="bg-gray-100 cursor-not-allowed"
                                        placeholder="Otomatis: UXXXX"
                                    />
                                    {!editMode && (
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    {editMode ? "Kode tidak dapat diubah" : "Kode dibuat otomatis dengan format UXXXX"}
                                </p>
                                {errors.kd_poli && (
                                    <p className="text-red-500 text-xs mt-1">{errors.kd_poli}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nama Poliklinik <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    type="text"
                                    value={data.nm_poli}
                                    onChange={(e) => setData("nm_poli", e.target.value)}
                                    maxLength={50}
                                    placeholder="Contoh: Poli Umum"
                                />
                                {errors.nm_poli && (
                                    <p className="text-red-500 text-xs mt-1">{errors.nm_poli}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Biaya Registrasi Baru <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    type="number"
                                    value={data.registrasi}
                                    onChange={(e) => setData("registrasi", e.target.value)}
                                    min="0"
                                    step="1000"
                                    placeholder="0"
                                />
                                {errors.registrasi && (
                                    <p className="text-red-500 text-xs mt-1">{errors.registrasi}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Biaya Registrasi Lama <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    type="number"
                                    value={data.registrasilama}
                                    onChange={(e) => setData("registrasilama", e.target.value)}
                                    min="0"
                                    step="1000"
                                    placeholder="0"
                                />
                                {errors.registrasilama && (
                                    <p className="text-red-500 text-xs mt-1">{errors.registrasilama}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status <span className="text-red-500">*</span>
                            </label>
                            <Select value={data.status} onValueChange={(value) => setData("status", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Aktif</SelectItem>
                                    <SelectItem value="0">Nonaktif</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.status && (
                                <p className="text-red-500 text-xs mt-1">{errors.status}</p>
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
            </Modal>

            {/* Confirmation Alert */}
            <ConfirmationAlert
                show={showAlert}
                onClose={() => setShowAlert(false)}
                onConfirm={confirmDelete}
                title="Hapus Poliklinik"
                message="Apakah Anda yakin ingin menghapus poliklinik ini? Tindakan ini tidak dapat dibatalkan dan akan mempengaruhi data terkait."
                confirmText="Hapus"
                cancelText="Batal"
            />

            {/* Flash Messages */}
            <Alert />
        </AppLayout>
    );
}