<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // Patient Management
            'view-patients',
            'create-patients',
            'edit-patients',
            'delete-patients',

            // Employee Management
            'view-employees',
            'create-employees',
            'edit-employees',
            'delete-employees',
            'employees.index',
            'employees.view',
            'employees.create',
            'employees.edit',
            'employees.delete',

            // Doctor Management
            'view-doctors',
            'create-doctors',
            'edit-doctors',
            'delete-doctors',

            // Spesialis Management
            'view-spesialis',
            'create-spesialis',
            'edit-spesialis',
            'delete-spesialis',

            // Medical Records
            'view-medical-records',
            'create-medical-records',
            'edit-medical-records',
            'delete-medical-records',

            // Prescriptions
            'view-prescriptions',
            'create-prescriptions',
            'edit-prescriptions',
            'delete-prescriptions',

            // Appointments
            'view-appointments',
            'create-appointments',
            'edit-appointments',
            'delete-appointments',

            // Reports
            'view-reports',
            'generate-reports',
            'export-reports',

            // Settings
            'view-settings',
            'edit-settings',

            // User Management
            'view-users',
            'create-users',
            'edit-users',
            'delete-users',

            // Role & Permission Management
            'view-roles',
            'create-roles',
            'edit-roles',
            'delete-roles',
            'view-permissions',
            'create-permissions',
            'edit-permissions',
            'delete-permissions',

            // Menu specific permissions
            'patient.index',
            'patient.view',
            'patients.index',
            'employee.view',
            'employees.index',
            'employees.view',
            'registration.view',
            'registration.index',
            'registration.cetak',
            'registration.lanjutan',
            'reg-periksa.view',
            'reg-periksa.index',
            'user.view',
            'users.index',
            'permission.view',
            'permissions.index',
            'menu.view',
            'menu.create',
            'menu.edit',
            'menu.delete',
            'menus.index',
            'profile.show',

            // Penjab (Asuransi) permissions
            'view-penjab',
            'create-penjab',
            'edit-penjab',
            'delete-penjab',
            'penjab.index',
            'penjab.view',

            // Poliklinik permissions
            'view-poliklinik',
            'create-poliklinik',
            'edit-poliklinik',
            'delete-poliklinik',
            'poliklinik.index',
            'poliklinik.view',

            // Farmasi module landing permission
            'farmasi.index',
            // Farmasi module detailed permissions (routes)
            'farmasi.dashboard',
            'farmasi.pembelian-obat',
            'farmasi.hutang-obat',
            'farmasi.hutang-obat.data',
            'farmasi.penjualan-obat',
            'farmasi.resep-obat',
            'farmasi.permintaan-resep',
            'farmasi.riwayat-transaksi-gudang',
            'farmasi.riwayat-transaksi-gudang.data',
            'farmasi.riwayat-barang-medis',
            'farmasi.riwayat-barang-medis.data',
            'farmasi.stok-obat',
            'farmasi.stok-opname',
            'farmasi.darurat-stok',
            'farmasi.darurat-stok.data',
            'farmasi.sirkulasi-obat',
            'farmasi.sirkulasi-obat.data',
            'farmasi.cek-stok-obat',
            'farmasi.permintaan-obat',
            'farmasi.sisa-stok',
            'farmasi.sisa-stok.data',
            'farmasi.fast-moving',
            'farmasi.fast-moving.data',
            'farmasi.data-opname',
            'farmasi.cetak.data-opname',
            // Data Obat (CRUD + helpers)
            'farmasi.data-obat',
            'farmasi.data-obat.store',
            'farmasi.data-obat.update',
            'farmasi.data-obat.destroy',
            'farmasi.data-obat.update-harga-semua',
            // Set Penjualan per Barang
            'farmasi.set-penjualan-barang.store',
            'farmasi.set-penjualan-barang.show',
            'farmasi.set-penjualan-barang.destroy',
            // Set Penjualan umum
            'farmasi.set-penjualan-umum.show',
            'farmasi.set-penjualan-umum.update',
            // Set Harga Obat page & actions
            'farmasi.set-harga-obat',
            'farmasi.set-harga-obat.update',
            // Set Lokasi Farmasi
            'farmasi.set-lokasi',
            'farmasi.set-lokasi.update',
            // Set Penjualan per Jenis
            'farmasi.set-penjualan.show',
            'farmasi.set-penjualan.store',
            'farmasi.set-penjualan.destroy',
            // Kategori Obat
            'farmasi.kategori-obat.index',
            'farmasi.kategori-obat.store',
            'farmasi.kategori-obat.update',
            'farmasi.kategori-obat.destroy',
            // Golongan Obat
            'farmasi.golongan-obat.index',
            'farmasi.golongan-obat.store',
            'farmasi.golongan-obat.update',
            'farmasi.golongan-obat.destroy',
            // Industri Farmasi
            'farmasi.industri-farmasi.index',
            'farmasi.industri-farmasi.store',
            'farmasi.industri-farmasi.update',
            'farmasi.industri-farmasi.destroy',
            // Data Suplier
            'farmasi.datasuplier.index',
            'farmasi.datasuplier.store',
            'farmasi.datasuplier.update',
            'farmasi.datasuplier.destroy',
            'farmasi.supplier.index',
            // Satuan Barang
            'farmasi.satuan-barang.index',
            'farmasi.satuan-barang.store',
            'farmasi.satuan-barang.update',
            'farmasi.satuan-barang.destroy',
            // Metode Racik
            'farmasi.metode-racik.index',
            'farmasi.metode-racik.store',
            'farmasi.metode-racik.update',
            'farmasi.metode-racik.destroy',
            // Konversi Satuan
            'farmasi.konversi-satuan.index',
            'farmasi.konversi-satuan.store',
            'farmasi.konversi-satuan.update',
            'farmasi.konversi-satuan.destroy',
            // Jenis Obat
            'farmasi.jenis-obat.index',
            'farmasi.jenis-obat.store',
            'farmasi.jenis-obat.update',
            'farmasi.jenis-obat.destroy',
            // Bridging PCare landing permission
            'pcare.index',
            // SATUSEHAT landing permission
            'satusehat.index',
            'satusehat.kirim',
            'satusehat.mapping-medication',
            'satusehat.mapping-alergi',
            'satusehat.mapping-practitioner',
            'satusehat.patient',
            'satusehat.practitioner',
            'satusehat.location',
            'satusehat.location-farmasi',
            'satusehat.location-ranap',
            'satusehat.organization',

            // Jadwal permissions
            'view-jadwal',
            'create-jadwal',
            'edit-jadwal',
            'delete-jadwal',
            // Menu route permission alias
            'jadwal.index',

            // SIP Pegawai permissions
            'view-sip-pegawai',
            'create-sip-pegawai',
            'edit-sip-pegawai',
            'delete-sip-pegawai',
            'sip-pegawai.index',
            'sip-pegawai.view',
            'sip-pegawai.create',
            'sip-pegawai.edit',
            'sip-pegawai.delete',

            // Module landings and pages
            'dashboard.index',
            'akutansi.index',
            'akutansi.akun-bayar',
            'akutansi.akun-piutang',
            'akutansi.billing',
            'akutansi.billing-rawat-inap',
            'akutansi.nota-inap',
            'akutansi.home',
            'akutansi.buku-besar',
            'akutansi.cash-flow',
            'akutansi.closing-kasir',
            'akutansi.detail-jurnal',
            'akutansi.jurnal',
            'akutansi.jurnal-penutup',
            'akutansi.jurnal-penyesuaian',
            'akutansi.kasir-ralan',
            'akutansi.mutasi-kas',
            'akutansi.mutasi-rekening',
            'akutansi.neraca',
            'akutansi.nota-jalan',
            'akutansi.pemasukan-lain',
            'akutansi.pengaturan-rekening',
            'akutansi.pengeluaran-harian',
            'akutansi.rekap-uang-pershift',
            'akutansi.rekening',
            'akutansi.rekening-tahun',
            'akutansi.setoran-bank',

            'anjungan.cetak-label',
            'anjungan.pasien-mandiri',

            'antrian.antrial-loket',
            'antrian.display-loket',
            'antrian.display-poli',
            'antrian.suara-display',

            'daftar-tarif.index',
            'daftar-tarif.create',
            'daftar-tarif.edit',
            'daftar-tarif.show',

            'doctor.index',

            'kepegawaian.jenjang-jabatan.index',

            'laboratorium.index',
            'laboratorium.create',
            'laboratorium.edit',
            'laboratorium.show',
            'laboratorium.cetak',

            'laporan.home',
            'laporan.frekuensi-penyakit',
            'laporan.kunjungan',
            'laporan.index',

            'master-data.menu-utama',
            'master-data.jadwal',
            'wa-gateway.kredensial',
            'sdki.index',
            'tools.scan-whatsapp',

            'odontogram.index',

            'patients.create',
            'patients.edit',
            'patients.show',

            'pcare.menu',
            'pcare.layanan',
            'pcare.referensi',
            'pcare.monitoring',
            'pcare.monitoring-status',
            'pcare.password-briding-bpjs',
            'pcare.setting-briding-mobile-jkn',
            'pcare.setting-briding-pcare',
            'pcare.mapping-dokter',
            'pcare.mapping-obat',
            'pcare.mapping-poli',

            'pembayaran.index',
            'pembayaran.ralan',
            'pembayaran.ralan-detail',
            'pembayaran.ranap',

            'profile.home',

            'rawat-inap.index',
            'rawat-inap.lanjutan',
            'rawat-inap.canvas',
            'rawat-inap.catatan-observasi',
            'rawat-inap.catatan-keperawatan',
            'rawat-inap.handover',
            'view-bangsal',
            'create-bangsal',
            'edit-bangsal',
            'delete-bangsal',
            'rawat-inap.bangsal',
            'view-kamar',
            'create-kamar',
            'edit-kamar',
            'delete-kamar',
            'rawat-inap.kamar',
            'rawat-jalan.index',
            'rawat-jalan.show',
            'rawat-jalan.edit',
            'rawat-jalan.create',
            'rawat-jalan.lanjutan',
            'rawat-jalan.canvas',
            'rawat-jalan.canvas-surat',
            'rawat-jalan.awal-keperawatan-umum',
            'rawat-jalan.lanjutan',
            'rawat-jalan.berkas-digital.kategori',
            'rawat-jalan.berkas-digital.list',
            'rawat-jalan.berkas-digital.store',
            'rawat-jalan.berkas-digital.delete',
            'penilaian-awal-keperawatan-ralan.store',
            'penilaian-awal-keperawatan-ralan.update',
            'penilaian-awal-keperawatan-ralan.destroy',
            'igd.index',
            'igd.canvas',
            'igd.asuhan-keperawatan.index',
            'igd.asuhan-keperawatan.edit',
            'igd.asuhan-keperawatan.store',
            'igd.asuhan-keperawatan.update',
            'igd.asuhan-keperawatan.destroy',
            'triase-ugd.index',
            'triase-ugd.store',
            'triase-ugd.show',
            'triase-ugd.update',
            'triase-ugd.destroy',

            // --- Missing Permissions Added from Localhost ---
            // Bank & Bidang
            'bank.create', 'bank.delete', 'bank.edit', 'bank.view',
            'bidang.create', 'bidang.delete', 'bidang.edit', 'bidang.view',
            
            // Bridging
            'bridging.bpjs.index', 'bridging.index', 'bridging.satu-sehat.index',

            // Group Access
            'group.farmasi.access', 'group.keuangan.access', 'group.laboratorium.access', 
            'group.laporan.access', 'group.masterdata.access', 'group.pcare.access', 
            'group.pengaturan.access', 'group.radiologi.access', 'group.rawatjalan.access', 
            'group.satusehat.access',

            // Farmasi Master Data (CRUD)
            'golongan-obat.create', 'golongan-obat.delete', 'golongan-obat.edit', 'golongan-obat.view',
            'industri-farmasi.create', 'industri-farmasi.delete', 'industri-farmasi.edit', 'industri-farmasi.view',
            'kategori-obat.create', 'kategori-obat.delete', 'kategori-obat.edit', 'kategori-obat.view',
            'satuan-barang.create', 'satuan-barang.delete', 'satuan-barang.edit', 'satuan-barang.view',
            'stok-opname.create', 'stok-opname.delete', 'stok-opname.edit', 'stok-opname.view',
            'pembelian.create', 'pembelian.delete', 'pembelian.edit', 'pembelian.view',
            'penjualan.create', 'penjualan.delete', 'penjualan.edit', 'penjualan.view',

            // Jabatan
            'jabatan.create', 'jabatan.delete', 'jabatan.edit', 'jabatan.view',
            'jenjang-jabatan.create', 'jenjang-jabatan.delete', 'jenjang-jabatan.edit', 'jenjang-jabatan.view',

            // PCare Referensi & Settings
            'pcare.referensi.diagnosa', 'pcare.referensi.dpho', 'pcare.referensi.faskes-rujukan', 
            'pcare.referensi.kesadaran', 'pcare.referensi.khusus', 'pcare.referensi.mobilejkn.dokter.index', 
            'pcare.referensi.poli', 'pcare.referensi.provider', 'pcare.referensi.sarana', 
            'pcare.referensi.spesialis', 'pcare.referensi.subspesialis',
            'pcare.setting.mobilejkn.index',

            // Profile
            'profile.edit',

            // Rawat Jalan CRUD
            'rawat-jalan.create', 'rawat-jalan.delete', 'rawat-jalan.edit', 'rawat-jalan.view',

            // Data Barang
            'data-barang.create', 'data-barang.delete', 'data-barang.edit', 'data-barang.view',

            // Departemen
            'departemen.create', 'departemen.delete', 'departemen.edit', 'departemen.view',

            // Employee (Menu specific)
            'employee.create', 'employee.delete', 'employee.edit',

            // Patient (Menu specific)
            'patient.create', 'patient.delete', 'patient.edit',

            // Permission (Menu specific)
            'permission.create', 'permission.delete', 'permission.edit',

            // Reg Periksa
            'reg-periksa.create', 'reg-periksa.delete', 'reg-periksa.edit',

            // Setting
            'setting.view',

            // Staf
            'staf.create', 'staf.delete', 'staf.edit', 'staf.view',

            // Supplier
            'supplier.create', 'supplier.delete', 'supplier.edit', 'supplier.view',

            // User (Menu specific)
            'user.create', 'user.delete', 'user.edit',
        ];

        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission);
        }

        // Create roles and assign permissions
        $adminRole = Role::findOrCreate('admin');
        $adminRole->givePermissionTo(Permission::all());

        $dokterRole = Role::findOrCreate('dokter');
        $dokterRole->givePermissionTo([
            'view-patients',
            'create-patients',
            'edit-patients',
            'view-doctors',
            'view-spesialis',
            'view-medical-records',
            'create-medical-records',
            'edit-medical-records',
            'view-prescriptions',
            'create-prescriptions',
            'edit-prescriptions',
            'view-appointments',
            'create-appointments',
            'edit-appointments',
            'view-reports',
            'generate-reports',
            'registration.view',
            'view-penjab',
            'penjab.view',
            'view-poliklinik',
            'poliklinik.view',
        ]);

        $petugasRole = Role::findOrCreate('petugas');
        $petugasRole->givePermissionTo([
            'view-patients',
            'create-patients',
            'edit-patients',
            'view-appointments',
            'create-appointments',
            'edit-appointments',
            'registration.view',
            'view-penjab',
            'penjab.view',
            'view-poliklinik',
            'poliklinik.view',
        ]);
    }
}
