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
        // Create permissions
        $permissions = [
            // Patient Management
            'view-patients',
            'create-patients',
            'edit-patients',
            'delete-patients',
            'patient.view',
            'patient.create',
            'patient.edit',
            'patient.delete',
            'patients.index',

            // Employee Management
            'view-employees',
            'create-employees',
            'edit-employees',
            'delete-employees',
            'employee.view',
            'employee.create',
            'employee.edit',
            'employee.delete',
            'employees.index',

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
            'user.view',
            'user.create',
            'user.edit',
            'user.delete',
            'users.index',

            // Role & Permission Management
            'view-roles',
            'create-roles',
            'edit-roles',
            'delete-roles',
            'view-permissions',
            'create-permissions',
            'edit-permissions',
            'delete-permissions',
            'permission.view',
            'permission.create',
            'permission.edit',
            'permission.delete',
            'permissions.index',

            // Menu Management
            'menu.view',
            'menu.create',
            'menu.edit',
            'menu.delete',
            'menus.index',

            // Registration
            'reg-periksa.view',
            'reg-periksa.create',
            'reg-periksa.edit',
            'reg-periksa.delete',
            'reg-periksa.index',

            // Rawat Jalan
            'rawat-jalan.view',
            'rawat-jalan.create',
            'rawat-jalan.edit',
            'rawat-jalan.delete',

            // Kepegawaian
            'departemen.view',
            'departemen.create',
            'departemen.edit',
            'departemen.delete',
            'jabatan.view',
            'jabatan.create',
            'jabatan.edit',
            'jabatan.delete',
            'bidang.view',
            'bidang.create',
            'bidang.edit',
            'bidang.delete',
            'jenjang-jabatan.view',
            'jenjang-jabatan.create',
            'jenjang-jabatan.edit',
            'jenjang-jabatan.delete',
            'staf.view',
            'staf.create',
            'staf.edit',
            'staf.delete',

            // Farmasi
            'kategori-obat.view',
            'kategori-obat.create',
            'kategori-obat.edit',
            'kategori-obat.delete',
            'golongan-obat.view',
            'golongan-obat.create',
            'golongan-obat.edit',
            'golongan-obat.delete',
            'industri-farmasi.view',
            'industri-farmasi.create',
            'industri-farmasi.edit',
            'industri-farmasi.delete',
            'satuan-barang.view',
            'satuan-barang.create',
            'satuan-barang.edit',
            'satuan-barang.delete',
            'data-barang.view',
            'data-barang.create',
            'data-barang.edit',
            'data-barang.delete',
            'supplier.view',
            'supplier.create',
            'supplier.edit',
            'supplier.delete',
            'pembelian.view',
            'pembelian.create',
            'pembelian.edit',
            'pembelian.delete',
            'penjualan.view',
            'penjualan.create',
            'penjualan.edit',
            'penjualan.delete',
            'stok-opname.view',
            'stok-opname.create',
            'stok-opname.edit',
            'stok-opname.delete',

            // Profile
            'profile.show',
            'profile.edit',
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
        ]);

        $petugasRole = Role::findOrCreate('petugas');
        $petugasRole->givePermissionTo([
            'view-patients',
            'create-patients',
            'edit-patients',
            'view-appointments',
            'create-appointments',
            'edit-appointments',
        ]);
    }
}
