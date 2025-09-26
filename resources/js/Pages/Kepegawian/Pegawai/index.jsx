import React, { useState, useEffect } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from '@/Components/ui/Card';
import { Button } from '@/Components/ui/Button';
import { Input } from '@/Components/ui/Input';
import { Label } from '@/Components/ui/Label';
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/Components/ui/Select';
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger 
} from '@/Components/ui/Dialog';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/Components/ui/Table';
import { Badge } from '@/Components/ui/Badge';
import { Textarea } from '@/Components/ui/Textarea';
import { 
    Search, 
    Plus, 
    Edit, 
    Trash2, 
    Eye,
    User,
    Calendar,
    MapPin,
    Phone,
    Mail,
    Building,
    CreditCard,
    FileText
} from 'lucide-react';
import { toast } from '@/tools/toast';

export default function PegawaiIndex({ 
    auth, 
    pegawai, 
    filters,
    jenjangJabatan,
    kelompokJabatan,
    resikoKerja,
    emergencyIndex,
    departemen,
    bidang,
    statusWP,
    statusKerja,
    pendidikan,
    bank
}) {
    const [search, setSearch] = useState(filters.search || '');
    const [perPage, setPerPage] = useState(filters.per_page || 10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [editingPegawai, setEditingPegawai] = useState(null);
    const [viewingPegawai, setViewingPegawai] = useState(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        nik: '',
        nama: '',
        jk: '',
        jbtn: '',
        jnj_jabatan: '',
        kode_kelompok: '',
        kode_resiko: '',
        kode_emergency: '',
        departemen: '',
        bidang: '',
        stts_wp: '',
        stts_kerja: '',
        npwp: '',
        pendidikan: '',
        gapok: '',
        tmp_lahir: '',
        tgl_lahir: '',
        alamat: '',
        kota: '',
        mulai_kerja: '',
        ms_kerja: '',
        indexins: '',
        bpd: '',
        rekening: '',
        stts_aktif: 'AKTIF',
        wajibmasuk: 0,
        pengurang: 0,
        indek: 0,
        mulai_kontrak: '',
        cuti_diambil: 0,
        dankes: 0,
        photo: null,
        no_ktp: '',
    });

    useEffect(() => {
        const delayedSearch = setTimeout(() => {
            router.get(route('pegawai.index'), { 
                search, 
                per_page: perPage 
            }, { 
                preserveState: true,
                replace: true 
            });
        }, 300);

        return () => clearTimeout(delayedSearch);
    }, [search, perPage]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (data[key] !== null && data[key] !== '') {
                if (key === 'photo' && data[key] instanceof File) {
                    formData.append(key, data[key]);
                } else {
                    formData.append(key, data[key]);
                }
            }
        });

        if (editingPegawai) {
            formData.append('_method', 'PUT');
            post(route('pegawai.update', editingPegawai.nik), {
                data: formData,
                onSuccess: () => {
                    setIsModalOpen(false);
                    setEditingPegawai(null);
                    reset();
                    toast.success('Data pegawai berhasil diperbarui');
                },
                onError: () => {
                    toast.error('Terjadi kesalahan saat memperbarui data');
                }
            });
        } else {
            post(route('pegawai.store'), {
                data: formData,
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                    toast.success('Data pegawai berhasil ditambahkan');
                },
                onError: () => {
                    toast.error('Terjadi kesalahan saat menambahkan data');
                }
            });
        }
    };

    const handleEdit = (pegawaiData) => {
        setEditingPegawai(pegawaiData);
        setData({
            nik: pegawaiData.nik || '',
            nama: pegawaiData.nama || '',
            jk: pegawaiData.jk || '',
            jbtn: pegawaiData.jbtn || '',
            jnj_jabatan: pegawaiData.jnj_jabatan || '',
            kode_kelompok: pegawaiData.kode_kelompok || '',
            kode_resiko: pegawaiData.kode_resiko || '',
            kode_emergency: pegawaiData.kode_emergency || '',
            departemen: pegawaiData.departemen || '',
            bidang: pegawaiData.bidang || '',
            stts_wp: pegawaiData.stts_wp || '',
            stts_kerja: pegawaiData.stts_kerja || '',
            npwp: pegawaiData.npwp || '',
            pendidikan: pegawaiData.pendidikan || '',
            gapok: pegawaiData.gapok || '',
            tmp_lahir: pegawaiData.tmp_lahir || '',
            tgl_lahir: pegawaiData.tgl_lahir || '',
            alamat: pegawaiData.alamat || '',
            kota: pegawaiData.kota || '',
            mulai_kerja: pegawaiData.mulai_kerja || '',
            ms_kerja: pegawaiData.ms_kerja || '',
            indexins: pegawaiData.indexins || '',
            bpd: pegawaiData.bpd || '',
            rekening: pegawaiData.rekening || '',
            stts_aktif: pegawaiData.stts_aktif || 'AKTIF',
            wajibmasuk: pegawaiData.wajibmasuk || 0,
            pengurang: pegawaiData.pengurang || 0,
            indek: pegawaiData.indek || 0,
            mulai_kontrak: pegawaiData.mulai_kontrak || '',
            cuti_diambil: pegawaiData.cuti_diambil || 0,
            dankes: pegawaiData.dankes || 0,
            photo: null,
            no_ktp: pegawaiData.no_ktp || ''
        });
        setIsModalOpen(true);
    };

    const handleDelete = (nik) => {
        if (confirm('Apakah Anda yakin ingin menghapus data pegawai ini?')) {
            router.delete(route('pegawai.destroy', nik), {
                onSuccess: () => {
                    toast.success('Data pegawai berhasil dihapus');
                },
                onError: () => {
                    toast.error('Terjadi kesalahan saat menghapus data');
                }
            });
        }
    };

    const handleView = (pegawaiData) => {
        setViewingPegawai(pegawaiData);
        setIsViewModalOpen(true);
    };

    const prepareAdd = () => {
        setEditingPegawai(null);
        reset();
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(amount);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('id-ID');
    };

    const getStatusBadge = (status) => {
        const statusColors = {
            'AKTIF': 'bg-green-100 text-green-800',
            'CUTI': 'bg-yellow-100 text-yellow-800',
            'KELUAR': 'bg-red-100 text-red-800',
            'TENAGA LUAR': 'bg-blue-100 text-blue-800'
        };
        
        return (
            <Badge className={statusColors[status] || 'bg-gray-100 text-gray-800'}>
                {status}
            </Badge>
        );
    };

    return (
        <AppLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Data Pegawai
                    </h2>
                </div>
            }
        >
            <Head title="Data Pegawai" />

            <div className="py-12">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Daftar Pegawai
                                </CardTitle>
                                <div className="flex items-center gap-2">
                                    <Button 
                                        variant="success"
                                        className="flex items-center gap-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                                        onClick={() => { 
                                            prepareAdd(); 
                                            setIsModalOpen(true); 
                                        }}
                                    >
                                        <Plus className="h-4 w-4" />
                                        Tambah Pegawai
                                    </Button>
                                </div>
                                <Dialog open={isModalOpen} onOpenChange={(open) => {
                                    setIsModalOpen(open);
                                }}>

                                        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-6 bg-black/60 backdrop-blur-sm">
                                        <DialogHeader>
                                            <DialogTitle>
                                                {editingPegawai ? 'Edit Pegawai' : 'Tambah Pegawai Baru'}
                                            </DialogTitle>
                                        </DialogHeader>
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {/* Personal Information */}
                                                <div className="space-y-4">
                                                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                                                        Informasi Personal
                                                    </h3>
                                                    
                                                    <div>
                                                        <Label htmlFor="nik">NIK *</Label>
                                                        <Input
                                                            id="nik"
                                                            type="text"
                                                            value={data.nik}
                                                            onChange={(e) => setData('nik', e.target.value)}
                                                            className={errors.nik ? 'border-red-500' : ''}
                                                            maxLength={20}
                                                        />
                                                        {errors.nik && <p className="text-red-500 text-sm mt-1">{errors.nik}</p>}
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="nama">Nama Lengkap *</Label>
                                                        <Input
                                                            id="nama"
                                                            type="text"
                                                            value={data.nama}
                                                            onChange={(e) => setData('nama', e.target.value)}
                                                            className={errors.nama ? 'border-red-500' : ''}
                                                            maxLength={50}
                                                        />
                                                        {errors.nama && <p className="text-red-500 text-sm mt-1">{errors.nama}</p>}
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="jk">Jenis Kelamin *</Label>
                                                        <Select value={data.jk} onValueChange={(value) => setData('jk', value)}>
                                                            <SelectTrigger className={errors.jk ? 'border-red-500' : ''}>
                                                                <SelectValue placeholder="Pilih jenis kelamin" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Pria">Pria</SelectItem>
                                                                <SelectItem value="Wanita">Wanita</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        {errors.jk && <p className="text-red-500 text-sm mt-1">{errors.jk}</p>}
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="tmp_lahir">Tempat Lahir *</Label>
                                                        <Input
                                                            id="tmp_lahir"
                                                            type="text"
                                                            value={data.tmp_lahir}
                                                            onChange={(e) => setData('tmp_lahir', e.target.value)}
                                                            className={errors.tmp_lahir ? 'border-red-500' : ''}
                                                            maxLength={20}
                                                        />
                                                        {errors.tmp_lahir && <p className="text-red-500 text-sm mt-1">{errors.tmp_lahir}</p>}
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="tgl_lahir">Tanggal Lahir *</Label>
                                                        <Input
                                                            id="tgl_lahir"
                                                            type="date"
                                                            value={data.tgl_lahir}
                                                            onChange={(e) => setData('tgl_lahir', e.target.value)}
                                                            className={errors.tgl_lahir ? 'border-red-500' : ''}
                                                        />
                                                        {errors.tgl_lahir && <p className="text-red-500 text-sm mt-1">{errors.tgl_lahir}</p>}
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="alamat">Alamat *</Label>
                                                        <Textarea
                                                            id="alamat"
                                                            value={data.alamat}
                                                            onChange={(e) => setData('alamat', e.target.value)}
                                                            className={errors.alamat ? 'border-red-500' : ''}
                                                            maxLength={60}
                                                            rows={3}
                                                        />
                                                        {errors.alamat && <p className="text-red-500 text-sm mt-1">{errors.alamat}</p>}
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="photo">Foto Pegawai</Label>
                                                        <Input
                                                            id="photo"
                                                            type="file"
                                                            accept="image/jpeg,image/jpg,image/png"
                                                            onChange={(e) => setData('photo', e.target.files[0])}
                                                            className={errors.photo ? 'border-red-500' : ''}
                                                        />
                                                        {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo}</p>}
                                                        <p className="text-sm text-gray-500 mt-1">
                                                            Format: JPG, JPEG, PNG. Maksimal 2MB.
                                                        </p>
                                                        {data.photo && (
                                                            <div className="mt-2">
                                                                <img 
                                                                    src={URL.createObjectURL(data.photo)} 
                                                                    alt="Preview" 
                                                                    className="w-20 h-20 object-cover rounded-lg border"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="kota">Kota *</Label>
                                                        <Input
                                                            id="kota"
                                                            type="text"
                                                            value={data.kota}
                                                            onChange={(e) => setData('kota', e.target.value)}
                                                            className={errors.kota ? 'border-red-500' : ''}
                                                            maxLength={20}
                                                        />
                                                        {errors.kota && <p className="text-red-500 text-sm mt-1">{errors.kota}</p>}
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="no_ktp">No. KTP</Label>
                                                        <Input
                                                            id="no_ktp"
                                                            type="text"
                                                            value={data.no_ktp}
                                                            onChange={(e) => setData('no_ktp', e.target.value)}
                                                            maxLength={20}
                                                        />
                                                    </div>

                                                </div>

                                                {/* Employment Information */}
                                                <div className="space-y-4">
                                                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                                                        Informasi Kepegawaian
                                                    </h3>

                                                    <div>
                                                        <Label htmlFor="jbtn">Jabatan *</Label>
                                                        <Input
                                                            id="jbtn"
                                                            type="text"
                                                            value={data.jbtn}
                                                            onChange={(e) => setData('jbtn', e.target.value)}
                                                            className={errors.jbtn ? 'border-red-500' : ''}
                                                            maxLength={25}
                                                        />
                                                        {errors.jbtn && <p className="text-red-500 text-sm mt-1">{errors.jbtn}</p>}
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="jnj_jabatan">Jenjang Jabatan *</Label>
                                                        <Select value={data.jnj_jabatan} onValueChange={(value) => setData('jnj_jabatan', value)}>
                                                            <SelectTrigger className={errors.jnj_jabatan ? 'border-red-500' : ''}>
                                                                <SelectValue placeholder="Pilih jenjang jabatan" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {jenjangJabatan?.map((item) => (
                                                                    <SelectItem key={item.kode} value={item.kode}>
                                                                        {item.nama}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        {errors.jnj_jabatan && <p className="text-red-500 text-sm mt-1">{errors.jnj_jabatan}</p>}
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="kode_kelompok">Kelompok Jabatan *</Label>
                                                        <Select value={data.kode_kelompok} onValueChange={(value) => setData('kode_kelompok', value)}>
                                                            <SelectTrigger className={errors.kode_kelompok ? 'border-red-500' : ''}>
                                                                <SelectValue placeholder="Pilih kelompok jabatan" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {kelompokJabatan?.map((item) => (
                                                                    <SelectItem key={item.kode_kelompok} value={item.kode_kelompok}>
                                                                        {item.nama_kelompok}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        {errors.kode_kelompok && <p className="text-red-500 text-sm mt-1">{errors.kode_kelompok}</p>}
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="departemen">Departemen *</Label>
                                                        <Select value={data.departemen} onValueChange={(value) => setData('departemen', value)}>
                                                            <SelectTrigger className={errors.departemen ? 'border-red-500' : ''}>
                                                                <SelectValue placeholder="Pilih departemen" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {departemen?.map((item) => (
                                                                    <SelectItem key={item.dep_id} value={item.dep_id}>
                                                                        {item.nama}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        {errors.departemen && <p className="text-red-500 text-sm mt-1">{errors.departemen}</p>}
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="bidang">Bidang *</Label>
                                                        <Select value={data.bidang} onValueChange={(value) => setData('bidang', value)}>
                                                            <SelectTrigger className={errors.bidang ? 'border-red-500' : ''}>
                                                                <SelectValue placeholder="Pilih bidang" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {bidang?.map((item) => (
                                                                    <SelectItem key={item.nama} value={item.nama}>
                                                                        {item.nama}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        {errors.bidang && <p className="text-red-500 text-sm mt-1">{errors.bidang}</p>}
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="stts_kerja">Status Kerja *</Label>
                                                        <Select value={data.stts_kerja} onValueChange={(value) => setData('stts_kerja', value)}>
                                                            <SelectTrigger className={errors.stts_kerja ? 'border-red-500' : ''}>
                                                                <SelectValue placeholder="Pilih status kerja" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {statusKerja?.map((item) => (
                                                                    <SelectItem key={item.stts} value={item.stts}>
                                                                        {item.ktg}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        {errors.stts_kerja && <p className="text-red-500 text-sm mt-1">{errors.stts_kerja}</p>}
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="stts_aktif">Status Aktif *</Label>
                                                        <Select value={data.stts_aktif} onValueChange={(value) => setData('stts_aktif', value)}>
                                                            <SelectTrigger className={errors.stts_aktif ? 'border-red-500' : ''}>
                                                                <SelectValue placeholder="Pilih status aktif" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="AKTIF">AKTIF</SelectItem>
                                                                <SelectItem value="NONAKTIF">NONAKTIF</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        {errors.stts_aktif && <p className="text-red-500 text-sm mt-1">{errors.stts_aktif}</p>}
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="mulai_kerja">Tanggal Mulai Kerja *</Label>
                                                        <Input
                                                            id="mulai_kerja"
                                                            type="date"
                                                            value={data.mulai_kerja}
                                                            onChange={(e) => setData('mulai_kerja', e.target.value)}
                                                            className={errors.mulai_kerja ? 'border-red-500' : ''}
                                                        />
                                                        {errors.mulai_kerja && <p className="text-red-500 text-sm mt-1">{errors.mulai_kerja}</p>}
                                                    </div>



                                                    <div>
                                                        <Label htmlFor="ms_kerja">Masa Kerja *</Label>
                                                        <Select value={data.ms_kerja} onValueChange={(value) => setData('ms_kerja', value)}>
                                                            <SelectTrigger className={errors.ms_kerja ? 'border-red-500' : ''}>
                                                                <SelectValue placeholder="Pilih masa kerja" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="<1">{'<1'}</SelectItem>
                                                                <SelectItem value="PT">PT</SelectItem>
                                                                <SelectItem value="FT">FT</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        {errors.ms_kerja && <p className="text-red-500 text-sm mt-1">{errors.ms_kerja}</p>}
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="mulai_kontrak">Tanggal Mulai Kontrak</Label>
                                                        <Input
                                                            id="mulai_kontrak"
                                                            type="date"
                                                            value={data.mulai_kontrak}
                                                            onChange={(e) => setData('mulai_kontrak', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Additional Information */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div>
                                                    <Label htmlFor="pendidikan">Pendidikan *</Label>
                                                    <Select value={data.pendidikan} onValueChange={(value) => setData('pendidikan', value)}>
                                                        <SelectTrigger className={errors.pendidikan ? 'border-red-500' : ''}>
                                                            <SelectValue placeholder="Pilih pendidikan" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {pendidikan?.map((item) => (
                                                                <SelectItem key={item.tingkat} value={item.tingkat}>
                                                                    {item.tingkat}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    {errors.pendidikan && <p className="text-red-500 text-sm mt-1">{errors.pendidikan}</p>}
                                                </div>

                                                <div>
                                                    <Label htmlFor="kode_resiko">Resiko Kerja *</Label>
                                                    <Select value={data.kode_resiko} onValueChange={(value) => setData('kode_resiko', value)}>
                                                        <SelectTrigger className={errors.kode_resiko ? 'border-red-500' : ''}>
                                                            <SelectValue placeholder="Pilih resiko kerja" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {resikoKerja?.map((item) => (
                                                                <SelectItem key={item.kode_resiko} value={item.kode_resiko}>
                                                                    {item.nama_resiko}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    {errors.kode_resiko && <p className="text-red-500 text-sm mt-1">{errors.kode_resiko}</p>}
                                                </div>

                                                <div>
                                                    <Label htmlFor="kode_emergency">Emergency Index *</Label>
                                                    <Select value={data.kode_emergency} onValueChange={(value) => setData('kode_emergency', value)}>
                                                        <SelectTrigger className={errors.kode_emergency ? 'border-red-500' : ''}>
                                                            <SelectValue placeholder="Pilih emergency index" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {emergencyIndex?.map((item) => (
                                                                <SelectItem key={item.kode_emergency} value={item.kode_emergency}>
                                                                    {item.nama_emergency}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    {errors.kode_emergency && <p className="text-red-500 text-sm mt-1">{errors.kode_emergency}</p>}
                                                </div>
                                            </div>

                                            {/* Financial Information */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-4">
                                                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                                                        Informasi Keuangan
                                                    </h3>

                                                    <div>
                                                        <Label htmlFor="gapok">Gaji Pokok *</Label>
                                                        <Input
                                                            id="gapok"
                                                            type="number"
                                                            value={data.gapok}
                                                            onChange={(e) => setData('gapok', e.target.value)}
                                                            className={errors.gapok ? 'border-red-500' : ''}
                                                            min="0"
                                                            step="0.01"
                                                        />
                                                        {errors.gapok && <p className="text-red-500 text-sm mt-1">{errors.gapok}</p>}
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="bpd">Bank *</Label>
                                                        <Select value={data.bpd} onValueChange={(value) => setData('bpd', value)}>
                                                            <SelectTrigger className={errors.bpd ? 'border-red-500' : ''}>
                                                                <SelectValue placeholder="Pilih bank" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {bank?.map((item) => (
                                                                    <SelectItem key={item.namabank} value={item.namabank}>
                                                                        {item.namabank}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        {errors.bpd && <p className="text-red-500 text-sm mt-1">{errors.bpd}</p>}
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="rekening">No. Rekening</Label>
                                                        <Input
                                                            id="rekening"
                                                            type="text"
                                                            value={data.rekening}
                                                            onChange={(e) => setData('rekening', e.target.value)}
                                                            maxLength={25}
                                                        />
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="npwp">NPWP</Label>
                                                        <Input
                                                            id="npwp"
                                                            type="text"
                                                            value={data.npwp}
                                                            onChange={(e) => setData('npwp', e.target.value)}
                                                            maxLength={15}
                                                        />
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="stts_wp">Status WP *</Label>
                                                        <Select value={data.stts_wp} onValueChange={(value) => setData('stts_wp', value)}>
                                                            <SelectTrigger className={errors.stts_wp ? 'border-red-500' : ''}>
                                                                <SelectValue placeholder="Pilih status WP" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {statusWP?.map((item) => (
                                                                    <SelectItem key={item.stts} value={item.stts}>
                                                                        {item.ktg}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        {errors.stts_wp && <p className="text-red-500 text-sm mt-1">{errors.stts_wp}</p>}
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                                                        Informasi Lainnya
                                                    </h3>

                                                    <div>
                                                        <Label htmlFor="wajibmasuk">Wajib Masuk *</Label>
                                                        <Input
                                                            id="wajibmasuk"
                                                            type="number"
                                                            value={data.wajibmasuk}
                                                            onChange={(e) => setData('wajibmasuk', e.target.value)}
                                                            className={errors.wajibmasuk ? 'border-red-500' : ''}
                                                            min="0"
                                                        />
                                                        {errors.wajibmasuk && <p className="text-red-500 text-sm mt-1">{errors.wajibmasuk}</p>}
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="pengurang">Pengurang *</Label>
                                                        <Input
                                                            id="pengurang"
                                                            type="number"
                                                            value={data.pengurang}
                                                            onChange={(e) => setData('pengurang', e.target.value)}
                                                            className={errors.pengurang ? 'border-red-500' : ''}
                                                            min="0"
                                                            step="0.01"
                                                        />
                                                        {errors.pengurang && <p className="text-red-500 text-sm mt-1">{errors.pengurang}</p>}
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="indek">Indek *</Label>
                                                        <Input
                                                            id="indek"
                                                            type="number"
                                                            value={data.indek}
                                                            onChange={(e) => setData('indek', e.target.value)}
                                                            className={errors.indek ? 'border-red-500' : ''}
                                                            min="0"
                                                        />
                                                        {errors.indek && <p className="text-red-500 text-sm mt-1">{errors.indek}</p>}
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="indexins">Index Ins *</Label>
                                                        <Input
                                                            id="indexins"
                                                            type="text"
                                                            value={data.indexins}
                                                            onChange={(e) => setData('indexins', e.target.value)}
                                                            className={errors.indexins ? 'border-red-500' : ''}
                                                            maxLength={4}
                                                        />
                                                        {errors.indexins && <p className="text-red-500 text-sm mt-1">{errors.indexins}</p>}
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="cuti_diambil">Cuti Diambil *</Label>
                                                        <Input
                                                            id="cuti_diambil"
                                                            type="number"
                                                            value={data.cuti_diambil}
                                                            onChange={(e) => setData('cuti_diambil', e.target.value)}
                                                            className={errors.cuti_diambil ? 'border-red-500' : ''}
                                                            min="0"
                                                        />
                                                        {errors.cuti_diambil && <p className="text-red-500 text-sm mt-1">{errors.cuti_diambil}</p>}
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="dankes">Dankes *</Label>
                                                        <Input
                                                            id="dankes"
                                                            type="number"
                                                            value={data.dankes}
                                                            onChange={(e) => setData('dankes', e.target.value)}
                                                            className={errors.dankes ? 'border-red-500' : ''}
                                                            min="0"
                                                            step="0.01"
                                                        />
                                                        {errors.dankes && <p className="text-red-500 text-sm mt-1">{errors.dankes}</p>}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-end space-x-2 pt-4 border-t">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => setIsModalOpen(false)}
                                                >
                                                    Batal
                                                </Button>
                                                <Button type="submit" variant="primary" disabled={processing}>
                                                    {processing ? 'Menyimpan...' : (editingPegawai ? 'Update' : 'Simpan')}
                                                </Button>
                                            </div>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            {/* Search and Filter */}
                            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <Input
                                        type="text"
                                        placeholder="Cari berdasarkan NIK, nama, jabatan, alamat, kota, No. KTP, NPWP, atau pendidikan..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                                <Select value={perPage.toString()} onValueChange={(value) => setPerPage(parseInt(value))}>
                                    <SelectTrigger className="w-32">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10">10 per halaman</SelectItem>
                                        <SelectItem value="25">25 per halaman</SelectItem>
                                        <SelectItem value="50">50 per halaman</SelectItem>
                                        <SelectItem value="100">100 per halaman</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardHeader>

                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Foto</TableHead>
                                            <TableHead>NIK</TableHead>
                                            <TableHead>Nama</TableHead>
                                            <TableHead>Jenis Kelamin</TableHead>
                                            <TableHead>Tempat/Tgl Lahir</TableHead>
                                            <TableHead>Alamat</TableHead>
                                            <TableHead>No. KTP</TableHead>
                                            <TableHead>NPWP</TableHead>
                                            <TableHead>Jabatan</TableHead>
                                            <TableHead>Departemen</TableHead>
                                            <TableHead>Pendidikan</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Gaji Pokok</TableHead>
                                            <TableHead>Bank/Rekening</TableHead>
                                            <TableHead>Mulai Kerja</TableHead>
                                            <TableHead className="text-center">Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {pegawai?.data?.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={18} className="text-center py-8 text-gray-500">
                                                    Tidak ada data pegawai
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            pegawai?.data?.map((item) => (
                                                <TableRow key={item.nik}>
                                                    <TableCell>
                                                        <div className="flex justify-center">
                                                            {item.photo && item.photo.trim() !== '' ? (
                                                                <img 
                                                                    src={`/storage/${item.photo}`} 
                                                                    alt={`Foto ${item.nama}`}
                                                                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                                                                    onError={(e) => {
                                                                        e.target.onerror = null;
                                                                        e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23f00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4" /></svg>';
                                                                    }}
                                                                />
                                                            ) : (
                                                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                                    <User className="h-5 w-5 text-gray-400" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="font-medium">{item.nik}</TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <User className="h-4 w-4 text-gray-400" />
                                                            <div>
                                                                <div className="font-medium">{item.nama}</div>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="text-sm">{item.jk}</div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="text-sm">
                                                            <div>{item.tmp_lahir}</div>
                                                            <div className="text-gray-500">{formatDate(item.tgl_lahir)}</div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="text-sm max-w-32 truncate" title={`${item.alamat}, ${item.kota}`}>
                                                            <div>{item.alamat}</div>
                                                            <div className="text-gray-500">{item.kota}</div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="text-sm">{item.no_ktp || '-'}</div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="text-sm">{item.npwp || '-'}</div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div>
                                                            <div className="font-medium">{item.jbtn}</div>
                                                            <div className="text-sm text-gray-500">
                                                                {item.jenjang_jabatan?.nama || '-'}
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <Building className="h-4 w-4 text-gray-400" />
                                                            <div>
                                                                <div className="font-medium">
                                                                    {item.departemen_relation?.nama || '-'}
                                                                </div>
                                                                <div className="text-sm text-gray-500">
                                                                    {item.bidang_relation?.nama || '-'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="text-sm">
                                                            {item.pendidikan_relation?.tingkat || item.pendidikan || '-'}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        {getStatusBadge(item.stts_aktif)}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <CreditCard className="h-4 w-4 text-gray-400" />
                                                            {formatCurrency(item.gapok)}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="text-sm">
                                                            <div>{item.bpd || '-'}</div>
                                                            <div className="text-gray-500">{item.rekening || '-'}</div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="h-4 w-4 text-gray-400" />
                                                            {formatDate(item.mulai_kerja)}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center justify-center gap-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => handleView(item)}
                                                                className="h-8 w-8 p-0"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => handleEdit(item)}
                                                                className="h-8 w-8 p-0"
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => handleDelete(item.nik)}
                                                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
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
                            {pegawai?.last_page > 1 && (
                                <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
                                    <div className="text-sm text-gray-500">
                                        Menampilkan {pegawai.from} sampai {pegawai.to} dari {pegawai.total} data
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {pegawai.links.map((link, index) => (
                                            <Button
                                                key={index}
                                                variant={link.active ? "primary" : "outline"}
                                                size="sm"
                                                onClick={() => {
                                                    if (link.url) {
                                                        router.get(link.url);
                                                    }
                                                }}
                                                disabled={!link.url}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* View Modal */}
                    <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 rounded-xl shadow-lg">
                            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b px-6 py-4 flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold">Detail Pegawai</h2>
                                    {viewingPegawai && (
                                        <p className="text-sm text-gray-500">{viewingPegawai.nik} • {viewingPegawai.jbtn || '-'}</p>
                                    )}
                                </div>
                                <Button variant="outline" size="sm" onClick={() => setIsViewModalOpen(false)}>Tutup</Button>
                            </div>
                            <div className="px-6 py-6">
                            {viewingPegawai && (
                                <div className="space-y-8">
                                    {/* Photo Section */}
                                    <div className="flex justify-center">
                                        {viewingPegawai.photo && viewingPegawai.photo.trim() !== '' ? (
                                            <img 
                                                src={`/storage/${viewingPegawai.photo}`} 
                                                alt={`Foto ${viewingPegawai.nama}`}
                                                className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-lg"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = '/default-photo.jpg';
                                                }}
                                            />
                                        ) : (
                                            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-200 shadow-lg">
                                                <User className="h-12 w-12 text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Personal Information */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                                                Informasi Personal
                                            </h3>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <User className="h-5 w-5 text-gray-400" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">NIK</p>
                                                        <p className="font-medium">{viewingPegawai.nik}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <User className="h-5 w-5 text-gray-400" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Nama Lengkap</p>
                                                        <p className="font-medium">{viewingPegawai.nama}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <User className="h-5 w-5 text-gray-400" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Jenis Kelamin</p>
                                                        <p className="font-medium">{viewingPegawai.jk}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Calendar className="h-5 w-5 text-gray-400" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Tempat, Tanggal Lahir</p>
                                                        <p className="font-medium">
                                                            {viewingPegawai.tmp_lahir}, {formatDate(viewingPegawai.tgl_lahir)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <MapPin className="h-5 w-5 text-gray-400" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Alamat</p>
                                                        <p className="font-medium">{viewingPegawai.alamat}</p>
                                                        <p className="text-sm text-gray-500">{viewingPegawai.kota}</p>
                                                    </div>
                                                </div>
                                                {viewingPegawai.no_ktp && (
                                                    <div className="flex items-center gap-3">
                                                        <FileText className="h-5 w-5 text-gray-400" />
                                                        <div>
                                                            <p className="text-sm text-gray-500">No. KTP</p>
                                                            <p className="font-medium">{viewingPegawai.no_ktp}</p>
                                                        </div>
                                                    </div>
                                                )}
                                                {viewingPegawai.npwp && (
                                                    <div className="flex items-center gap-3">
                                                        <FileText className="h-5 w-5 text-gray-400" />
                                                        <div>
                                                            <p className="text-sm text-gray-500">NPWP</p>
                                                            <p className="font-medium">{viewingPegawai.npwp}</p>
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-3">
                                                    <FileText className="h-5 w-5 text-gray-400" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Pendidikan</p>
                                                        <p className="font-medium">
                                                            {viewingPegawai.pendidikan_relation?.tingkat || viewingPegawai.pendidikan || '-'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Employment Information */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                                                Informasi Kepegawaian
                                            </h3>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <Building className="h-5 w-5 text-gray-400" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Jabatan</p>
                                                        <p className="font-medium">{viewingPegawai.jbtn}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Building className="h-5 w-5 text-gray-400" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Jenjang Jabatan</p>
                                                        <p className="font-medium">
                                                            {viewingPegawai.jenjang_jabatan?.nama || '-'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Building className="h-5 w-5 text-gray-400" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Departemen</p>
                                                        <p className="font-medium">
                                                            {viewingPegawai.departemen_relation?.nama || '-'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Building className="h-5 w-5 text-gray-400" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Bidang</p>
                                                        <p className="font-medium">
                                                            {viewingPegawai.bidang_relation?.nama || '-'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Calendar className="h-5 w-5 text-gray-400" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Mulai Kerja</p>
                                                        <p className="font-medium">{formatDate(viewingPegawai.mulai_kerja)}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <User className="h-5 w-5 text-gray-400" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Status</p>
                                                        {getStatusBadge(viewingPegawai.stts_aktif)}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Building className="h-5 w-5 text-gray-400" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Kelompok Jabatan</p>
                                                        <p className="font-medium">
                                                            {viewingPegawai.kelompok_jabatan?.nama_kelompok || '-'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Building className="h-5 w-5 text-gray-400" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Resiko Kerja</p>
                                                        <p className="font-medium">
                                                            {viewingPegawai.resiko_kerja?.nama_resiko || '-'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Building className="h-5 w-5 text-gray-400" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Status Kerja</p>
                                                        <p className="font-medium">
                                                            {viewingPegawai.status_kerja?.ktg || '-'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Building className="h-5 w-5 text-gray-400" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Status WP</p>
                                                        <p className="font-medium">
                                                            {viewingPegawai.status_wp?.ktg || '-'}
                                                        </p>
                                                    </div>
                                                </div>
                                                {viewingPegawai.mulai_kontrak && (
                                                    <div className="flex items-center gap-3">
                                                        <Calendar className="h-5 w-5 text-gray-400" />
                                                        <div>
                                                            <p className="text-sm text-gray-500">Mulai Kontrak</p>
                                                            <p className="font-medium">{formatDate(viewingPegawai.mulai_kontrak)}</p>
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-3">
                                                    <Building className="h-5 w-5 text-gray-400" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Wajib Masuk</p>
                                                        <p className="font-medium">{viewingPegawai.wajibmasuk || 0} hari</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Calendar className="h-5 w-5 text-gray-400" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Cuti Diambil</p>
                                                        <p className="font-medium">{viewingPegawai.cuti_diambil || 0} hari</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Financial Information */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                                            Informasi Keuangan
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="flex items-center gap-3">
                                                <CreditCard className="h-5 w-5 text-gray-400" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Gaji Pokok</p>
                                                    <p className="font-medium">{formatCurrency(viewingPegawai.gapok)}</p>
                                                </div>
                                            </div>
                                            {viewingPegawai.kenaikan && (
                                                <div className="flex items-center gap-3">
                                                    <CreditCard className="h-5 w-5 text-gray-400" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Kenaikan</p>
                                                        <p className="font-medium">{formatCurrency(viewingPegawai.kenaikan)}</p>
                                                    </div>
                                                </div>
                                            )}
                                            {viewingPegawai.maksimal && (
                                                <div className="flex items-center gap-3">
                                                    <CreditCard className="h-5 w-5 text-gray-400" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Maksimal</p>
                                                        <p className="font-medium">{formatCurrency(viewingPegawai.maksimal)}</p>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-3">
                                                <Building className="h-5 w-5 text-gray-400" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Bank</p>
                                                    <p className="font-medium">{viewingPegawai.bpd}</p>
                                                </div>
                                            </div>
                                            {viewingPegawai.rekening && (
                                                <div className="flex items-center gap-3">
                                                    <CreditCard className="h-5 w-5 text-gray-400" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">No. Rekening</p>
                                                        <p className="font-medium">{viewingPegawai.rekening}</p>
                                                    </div>
                                                </div>
                                            )}
                                            {viewingPegawai.tingkat && (
                                                <div className="flex items-center gap-3">
                                                    <FileText className="h-5 w-5 text-gray-400" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Tingkat</p>
                                                        <p className="font-medium">{viewingPegawai.tingkat}</p>
                                                    </div>
                                                </div>
                                            )}
                                            {viewingPegawai.indek && (
                                                <div className="flex items-center gap-3">
                                                    <FileText className="h-5 w-5 text-gray-400" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Indeks</p>
                                                        <p className="font-medium">{viewingPegawai.indek}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </AppLayout>
    );
}