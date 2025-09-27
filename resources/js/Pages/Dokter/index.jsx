import React, { useState, useEffect } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/ui/dialog';
import ConfirmationAlert from '@/Components/ConfirmationAlert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Textarea } from '@/Components/ui/textarea';
import { toast } from '@/tools/toast';
import { Search, Plus, Edit, Trash2, Eye, ToggleLeft, ToggleRight, Filter, X, Calendar, Phone, Mail, MapPin, GraduationCap, FileText } from 'lucide-react';

export default function DokterIndex({ 
    auth, 
    dokters, 
    filters, 
    statusOptions, 
    genderOptions, 
    maritalStatusOptions, 
    bloodTypeOptions, 
    religionOptions 
}) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedDokter, setSelectedDokter] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [nextCode, setNextCode] = useState('');

    // Form for create
    const createForm = useForm({
        kd_dokter: '',
        nm_dokter: '',
        jk: '',
        tmp_lahir: '',
        tgl_lahir: '',
        gol_drh: '',
        agama: '',
        almt_tgl: '',
        no_telp: '',
        email: '',
        stts_nikah: '',
        kd_sps: '',
        alumni: '',
        no_ijn_praktek: '',
        status: '1'
    });

    // Form for edit
    const editForm = useForm({
        kd_dokter: '',
        nm_dokter: '',
        jk: '',
        tmp_lahir: '',
        tgl_lahir: '',
        gol_drh: '',
        agama: '',
        almt_tgl: '',
        no_telp: '',
        email: '',
        stts_nikah: '',
        kd_sps: '',
        alumni: '',
        no_ijn_praktek: '',
        status: ''
    });

    // Form for filters
    const filterForm = useForm({
        search: filters.search || '',
        status: filters.status || '',
        jk: filters.jk || '',
        stts_nikah: filters.stts_nikah || ''
    });

    // Get next doctor code when opening create modal
    const fetchNextCode = async () => {
        try {
            const response = await fetch('/dokter/next-code');
            const data = await response.json();
            setNextCode(data.next_code);
            createForm.setData('kd_dokter', data.next_code);
        } catch (error) {
            console.error('Error fetching next code:', error);
        }
    };

    // Handle create
    const handleCreate = () => {
        fetchNextCode();
        setShowCreateModal(true);
    };

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        createForm.post(route('dokter.store'), {
            onSuccess: () => {
                setShowCreateModal(false);
                createForm.reset();
                toast.success('Data dokter berhasil ditambahkan');
            },
            onError: (errors) => {
                console.error('Create errors:', errors);
                if (errors.error) {
                    toast.error(errors.error);
                }
            }
        });
    };

    // Handle edit
    const handleEdit = (dokter) => {
        setSelectedDokter(dokter);
        editForm.setData({
            kd_dokter: dokter.kd_dokter,
            nm_dokter: dokter.nm_dokter,
            jk: dokter.jk,
            tmp_lahir: dokter.tmp_lahir,
            tgl_lahir: dokter.tgl_lahir,
            gol_drh: dokter.gol_drh,
            agama: dokter.agama,
            almt_tgl: dokter.almt_tgl,
            no_telp: dokter.no_telp,
            email: dokter.email || '',
            stts_nikah: dokter.stts_nikah,
            kd_sps: dokter.kd_sps || '',
            alumni: dokter.alumni || '',
            no_ijn_praktek: dokter.no_ijn_praktek || '',
            status: dokter.status
        });
        setShowEditModal(true);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        editForm.put(route('dokter.update', selectedDokter.kd_dokter), {
            onSuccess: () => {
                setShowEditModal(false);
                editForm.reset();
                setSelectedDokter(null);
                toast.success('Data dokter berhasil diperbarui');
            },
            onError: (errors) => {
                console.error('Edit errors:', errors);
                if (errors.error) {
                    toast.error(errors.error);
                }
            }
        });
    };

    // Handle delete
    const handleDelete = (dokter) => {
        setSelectedDokter(dokter);
        setShowDeleteDialog(true);
    };

    const handleDeleteConfirm = () => {
        router.delete(route('dokter.destroy', selectedDokter.kd_dokter), {
            onSuccess: () => {
                setShowDeleteDialog(false);
                setSelectedDokter(null);
                toast.success('Data dokter berhasil dihapus');
            },
            onError: (errors) => {
                console.error('Delete errors:', errors);
                if (errors.error) {
                    toast.error(errors.error);
                }
            }
        });
    };

    // Handle toggle status
    const handleToggleStatus = (dokter) => {
        router.patch(route('dokter.toggle-status', dokter.kd_dokter), {}, {
            onSuccess: () => {
                const statusText = dokter.status === '1' ? 'dinonaktifkan' : 'diaktifkan';
                toast.success(`Status dokter berhasil ${statusText}`);
            },
            onError: (errors) => {
                console.error('Toggle status errors:', errors);
                if (errors.error) {
                    toast.error(errors.error);
                }
            }
        });
    };

    // Handle detail view
    const handleDetail = (dokter) => {
        setSelectedDokter(dokter);
        setShowDetailModal(true);
    };

    // Handle filter
    const handleFilter = (e) => {
        e.preventDefault();
        filterForm.get(route('dokter.index'), {
            preserveState: true,
            preserveScroll: true
        });
    };

    // Clear filters
    const clearFilters = () => {
        filterForm.reset();
        router.get(route('dokter.index'));
    };

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('id-ID');
    };

    // Calculate age
    const calculateAge = (birthDate) => {
        if (!birthDate) return '-';
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age + ' tahun';
    };

    return (
        <AppLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Data Dokter</h2>}
        >
            <Head title="Data Dokter" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle>Data Dokter</CardTitle>
                                    <CardDescription>
                                        Kelola data dokter di sistem
                                    </CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setShowFilters(!showFilters)}
                                    >
                                        <Filter className="h-4 w-4 mr-2" />
                                        Filter
                                    </Button>
                                    <Button onClick={handleCreate}>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Tambah Dokter
                                    </Button>
                                </div>
                            </div>

                            {/* Filters */}
                            {showFilters && (
                                <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                                    <form onSubmit={handleFilter} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div>
                                            <Label htmlFor="search">Pencarian</Label>
                                            <Input
                                                id="search"
                                                placeholder="Cari kode, nama, telepon..."
                                                value={filterForm.data.search}
                                                onChange={(e) => filterForm.setData('search', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="status">Status</Label>
                                            <Select
                                                value={filterForm.data.status}
                                                onValueChange={(value) => filterForm.setData('status', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="">Semua Status</SelectItem>
                                                    {Object.entries(statusOptions).map(([key, value]) => (
                                                        <SelectItem key={key} value={key}>{value}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="jk">Jenis Kelamin</Label>
                                            <Select
                                                value={filterForm.data.jk}
                                                onValueChange={(value) => filterForm.setData('jk', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih jenis kelamin" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="">Semua</SelectItem>
                                                    {Object.entries(genderOptions).map(([key, value]) => (
                                                        <SelectItem key={key} value={key}>{value}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="stts_nikah">Status Nikah</Label>
                                            <Select
                                                value={filterForm.data.stts_nikah}
                                                onValueChange={(value) => filterForm.setData('stts_nikah', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih status nikah" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="">Semua</SelectItem>
                                                    {Object.entries(maritalStatusOptions).map(([key, value]) => (
                                                        <SelectItem key={key} value={key}>{value}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button type="submit" size="sm">
                                                <Search className="h-4 w-4 mr-2" />
                                                Cari
                                            </Button>
                                            <Button type="button" variant="outline" size="sm" onClick={clearFilters}>
                                                <X className="h-4 w-4 mr-2" />
                                                Reset
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </CardHeader>

                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Kode Dokter</TableHead>
                                            <TableHead>Nama Dokter</TableHead>
                                            <TableHead>Jenis Kelamin</TableHead>
                                            <TableHead>Tempat, Tgl Lahir</TableHead>
                                            <TableHead>No. Telepon</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {dokters.data.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                                                    Tidak ada data dokter
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            dokters.data.map((dokter) => (
                                                <TableRow key={dokter.kd_dokter}>
                                                    <TableCell className="font-medium">{dokter.kd_dokter}</TableCell>
                                                    <TableCell>{dokter.nm_dokter}</TableCell>
                                                    <TableCell>
                                                        <Badge variant={dokter.jk === 'L' ? 'default' : 'secondary'}>
                                                            {genderOptions[dokter.jk]}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        {dokter.tmp_lahir}, {formatDate(dokter.tgl_lahir)}
                                                        <div className="text-sm text-gray-500">
                                                            {calculateAge(dokter.tgl_lahir)}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{dokter.no_telp}</TableCell>
                                                    <TableCell>
                                                        <Badge variant={dokter.status === '1' ? 'default' : 'secondary'}>
                                                            {statusOptions[dokter.status]}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => handleDetail(dokter)}
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => handleEdit(dokter)}
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => handleToggleStatus(dokter)}
                                                            >
                                                                {dokter.status === '1' ? (
                                                                    <ToggleRight className="h-4 w-4 text-green-600" />
                                                                ) : (
                                                                    <ToggleLeft className="h-4 w-4 text-gray-400" />
                                                                )}
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => handleDelete(dokter)}
                                                                className="text-red-600 hover:text-red-700"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Pagination */}
                            {dokters.links && (
                                <div className="mt-4 flex justify-between items-center">
                                    <div className="text-sm text-gray-700">
                                        Menampilkan {dokters.from} sampai {dokters.to} dari {dokters.total} data
                                    </div>
                                    <div className="flex gap-2">
                                        {dokters.links.map((link, index) => (
                                            <Button
                                                key={index}
                                                variant={link.active ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => link.url && router.get(link.url)}
                                                disabled={!link.url}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Create Modal */}
            <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Tambah Dokter Baru</DialogTitle>
                        <DialogDescription>
                            Lengkapi form berikut untuk menambah dokter baru
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="kd_dokter">Kode Dokter *</Label>
                                <Input
                                    id="kd_dokter"
                                    value={createForm.data.kd_dokter}
                                    onChange={(e) => createForm.setData('kd_dokter', e.target.value)}
                                    error={createForm.errors.kd_dokter}
                                    readOnly
                                />
                            </div>
                            <div>
                                <Label htmlFor="nm_dokter">Nama Dokter *</Label>
                                <Input
                                    id="nm_dokter"
                                    value={createForm.data.nm_dokter}
                                    onChange={(e) => createForm.setData('nm_dokter', e.target.value)}
                                    error={createForm.errors.nm_dokter}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="jk">Jenis Kelamin *</Label>
                                <Select
                                    value={createForm.data.jk}
                                    onValueChange={(value) => createForm.setData('jk', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih jenis kelamin" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(genderOptions).map(([key, value]) => (
                                            <SelectItem key={key} value={key}>{value}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="tmp_lahir">Tempat Lahir *</Label>
                                <Input
                                    id="tmp_lahir"
                                    value={createForm.data.tmp_lahir}
                                    onChange={(e) => createForm.setData('tmp_lahir', e.target.value)}
                                    error={createForm.errors.tmp_lahir}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="tgl_lahir">Tanggal Lahir *</Label>
                                <Input
                                    id="tgl_lahir"
                                    type="date"
                                    value={createForm.data.tgl_lahir}
                                    onChange={(e) => createForm.setData('tgl_lahir', e.target.value)}
                                    error={createForm.errors.tgl_lahir}
                                />
                            </div>
                            <div>
                                <Label htmlFor="gol_drh">Golongan Darah *</Label>
                                <Select
                                    value={createForm.data.gol_drh}
                                    onValueChange={(value) => createForm.setData('gol_drh', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih golongan darah" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(bloodTypeOptions).map(([key, value]) => (
                                            <SelectItem key={key} value={key}>{value}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="agama">Agama *</Label>
                                <Select
                                    value={createForm.data.agama}
                                    onValueChange={(value) => createForm.setData('agama', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih agama" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(religionOptions).map(([key, value]) => (
                                            <SelectItem key={key} value={key}>{value}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="stts_nikah">Status Pernikahan *</Label>
                                <Select
                                    value={createForm.data.stts_nikah}
                                    onValueChange={(value) => createForm.setData('stts_nikah', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih status pernikahan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(maritalStatusOptions).map(([key, value]) => (
                                            <SelectItem key={key} value={key}>{value}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="almt_tgl">Alamat *</Label>
                            <Textarea
                                id="almt_tgl"
                                value={createForm.data.almt_tgl}
                                onChange={(e) => createForm.setData('almt_tgl', e.target.value)}
                                error={createForm.errors.almt_tgl}
                                rows={3}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="no_telp">No. Telepon *</Label>
                                <Input
                                    id="no_telp"
                                    value={createForm.data.no_telp}
                                    onChange={(e) => createForm.setData('no_telp', e.target.value)}
                                    error={createForm.errors.no_telp}
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={createForm.data.email}
                                    onChange={(e) => createForm.setData('email', e.target.value)}
                                    error={createForm.errors.email}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="kd_sps">Kode Spesialis</Label>
                                <Input
                                    id="kd_sps"
                                    value={createForm.data.kd_sps}
                                    onChange={(e) => createForm.setData('kd_sps', e.target.value)}
                                    error={createForm.errors.kd_sps}
                                />
                            </div>
                            <div>
                                <Label htmlFor="alumni">Alumni</Label>
                                <Input
                                    id="alumni"
                                    value={createForm.data.alumni}
                                    onChange={(e) => createForm.setData('alumni', e.target.value)}
                                    error={createForm.errors.alumni}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="no_ijn_praktek">No. Ijin Praktek</Label>
                                <Input
                                    id="no_ijn_praktek"
                                    value={createForm.data.no_ijn_praktek}
                                    onChange={(e) => createForm.setData('no_ijn_praktek', e.target.value)}
                                    error={createForm.errors.no_ijn_praktek}
                                />
                            </div>
                            <div>
                                <Label htmlFor="status">Status *</Label>
                                <Select
                                    value={createForm.data.status}
                                    onValueChange={(value) => createForm.setData('status', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(statusOptions).map(([key, value]) => (
                                            <SelectItem key={key} value={key}>{value}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setShowCreateModal(false)}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={createForm.processing}>
                                {createForm.processing ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit Modal */}
            <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Dokter</DialogTitle>
                        <DialogDescription>
                            Perbarui data dokter
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEditSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="edit_kd_dokter">Kode Dokter *</Label>
                                <Input
                                    id="edit_kd_dokter"
                                    value={editForm.data.kd_dokter}
                                    onChange={(e) => editForm.setData('kd_dokter', e.target.value)}
                                    error={editForm.errors.kd_dokter}
                                />
                            </div>
                            <div>
                                <Label htmlFor="edit_nm_dokter">Nama Dokter *</Label>
                                <Input
                                    id="edit_nm_dokter"
                                    value={editForm.data.nm_dokter}
                                    onChange={(e) => editForm.setData('nm_dokter', e.target.value)}
                                    error={editForm.errors.nm_dokter}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="edit_jk">Jenis Kelamin *</Label>
                                <Select
                                    value={editForm.data.jk}
                                    onValueChange={(value) => editForm.setData('jk', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih jenis kelamin" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(genderOptions).map(([key, value]) => (
                                            <SelectItem key={key} value={key}>{value}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="edit_tmp_lahir">Tempat Lahir *</Label>
                                <Input
                                    id="edit_tmp_lahir"
                                    value={editForm.data.tmp_lahir}
                                    onChange={(e) => editForm.setData('tmp_lahir', e.target.value)}
                                    error={editForm.errors.tmp_lahir}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="edit_tgl_lahir">Tanggal Lahir *</Label>
                                <Input
                                    id="edit_tgl_lahir"
                                    type="date"
                                    value={editForm.data.tgl_lahir}
                                    onChange={(e) => editForm.setData('tgl_lahir', e.target.value)}
                                    error={editForm.errors.tgl_lahir}
                                />
                            </div>
                            <div>
                                <Label htmlFor="edit_gol_drh">Golongan Darah *</Label>
                                <Select
                                    value={editForm.data.gol_drh}
                                    onValueChange={(value) => editForm.setData('gol_drh', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih golongan darah" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(bloodTypeOptions).map(([key, value]) => (
                                            <SelectItem key={key} value={key}>{value}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="edit_agama">Agama *</Label>
                                <Select
                                    value={editForm.data.agama}
                                    onValueChange={(value) => editForm.setData('agama', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih agama" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(religionOptions).map(([key, value]) => (
                                            <SelectItem key={key} value={key}>{value}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="edit_stts_nikah">Status Pernikahan *</Label>
                                <Select
                                    value={editForm.data.stts_nikah}
                                    onValueChange={(value) => editForm.setData('stts_nikah', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih status pernikahan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(maritalStatusOptions).map(([key, value]) => (
                                            <SelectItem key={key} value={key}>{value}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="edit_almt_tgl">Alamat *</Label>
                            <Textarea
                                id="edit_almt_tgl"
                                value={editForm.data.almt_tgl}
                                onChange={(e) => editForm.setData('almt_tgl', e.target.value)}
                                error={editForm.errors.almt_tgl}
                                rows={3}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="edit_no_telp">No. Telepon *</Label>
                                <Input
                                    id="edit_no_telp"
                                    value={editForm.data.no_telp}
                                    onChange={(e) => editForm.setData('no_telp', e.target.value)}
                                    error={editForm.errors.no_telp}
                                />
                            </div>
                            <div>
                                <Label htmlFor="edit_email">Email</Label>
                                <Input
                                    id="edit_email"
                                    type="email"
                                    value={editForm.data.email}
                                    onChange={(e) => editForm.setData('email', e.target.value)}
                                    error={editForm.errors.email}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="edit_kd_sps">Kode Spesialis</Label>
                                <Input
                                    id="edit_kd_sps"
                                    value={editForm.data.kd_sps}
                                    onChange={(e) => editForm.setData('kd_sps', e.target.value)}
                                    error={editForm.errors.kd_sps}
                                />
                            </div>
                            <div>
                                <Label htmlFor="edit_alumni">Alumni</Label>
                                <Input
                                    id="edit_alumni"
                                    value={editForm.data.alumni}
                                    onChange={(e) => editForm.setData('alumni', e.target.value)}
                                    error={editForm.errors.alumni}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="edit_no_ijn_praktek">No. Ijin Praktek</Label>
                                <Input
                                    id="edit_no_ijn_praktek"
                                    value={editForm.data.no_ijn_praktek}
                                    onChange={(e) => editForm.setData('no_ijn_praktek', e.target.value)}
                                    error={editForm.errors.no_ijn_praktek}
                                />
                            </div>
                            <div>
                                <Label htmlFor="edit_status">Status *</Label>
                                <Select
                                    value={editForm.data.status}
                                    onValueChange={(value) => editForm.setData('status', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(statusOptions).map(([key, value]) => (
                                            <SelectItem key={key} value={key}>{value}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setShowEditModal(false)}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={editForm.processing}>
                                {editForm.processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Detail Modal */}
            <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Detail Dokter</DialogTitle>
                        <DialogDescription>
                            Informasi lengkap dokter
                        </DialogDescription>
                    </DialogHeader>
                    {selectedDokter && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-sm font-medium text-gray-500">Kode Dokter</Label>
                                    <p className="text-sm">{selectedDokter.kd_dokter}</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-gray-500">Nama Dokter</Label>
                                    <p className="text-sm">{selectedDokter.nm_dokter}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-sm font-medium text-gray-500">Jenis Kelamin</Label>
                                    <p className="text-sm">{genderOptions[selectedDokter.jk]}</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-gray-500">Tempat, Tanggal Lahir</Label>
                                    <p className="text-sm">{selectedDokter.tmp_lahir}, {formatDate(selectedDokter.tgl_lahir)}</p>
                                    <p className="text-xs text-gray-500">{calculateAge(selectedDokter.tgl_lahir)}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-sm font-medium text-gray-500">Golongan Darah</Label>
                                    <p className="text-sm">{selectedDokter.gol_drh}</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-gray-500">Agama</Label>
                                    <p className="text-sm">{selectedDokter.agama}</p>
                                </div>
                            </div>

                            <div>
                                <Label className="text-sm font-medium text-gray-500">Alamat</Label>
                                <p className="text-sm">{selectedDokter.almt_tgl}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-sm font-medium text-gray-500">No. Telepon</Label>
                                    <p className="text-sm flex items-center gap-2">
                                        <Phone className="h-4 w-4" />
                                        {selectedDokter.no_telp}
                                    </p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-gray-500">Email</Label>
                                    <p className="text-sm flex items-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        {selectedDokter.email || '-'}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-sm font-medium text-gray-500">Status Pernikahan</Label>
                                    <p className="text-sm">{selectedDokter.stts_nikah}</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-gray-500">Kode Spesialis</Label>
                                    <p className="text-sm">{selectedDokter.kd_sps || '-'}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-sm font-medium text-gray-500">Alumni</Label>
                                    <p className="text-sm flex items-center gap-2">
                                        <GraduationCap className="h-4 w-4" />
                                        {selectedDokter.alumni || '-'}
                                    </p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-gray-500">No. Ijin Praktek</Label>
                                    <p className="text-sm flex items-center gap-2">
                                        <FileText className="h-4 w-4" />
                                        {selectedDokter.no_ijn_praktek || '-'}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <Label className="text-sm font-medium text-gray-500">Status</Label>
                                <div className="mt-1">
                                    <Badge variant={selectedDokter.status === '1' ? 'default' : 'secondary'}>
                                        {statusOptions[selectedDokter.status]}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDetailModal(false)}>
                            Tutup
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <ConfirmationAlert
                isOpen={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
                onConfirm={handleDeleteConfirm}
                title="Konfirmasi Hapus"
                message={`Apakah Anda yakin ingin menghapus dokter ${selectedDokter?.nm_dokter}? Tindakan ini tidak dapat dibatalkan.`}
                confirmText="Hapus"
                cancelText="Batal"
                type="danger"
            />
        </AppLayout>
    );
}