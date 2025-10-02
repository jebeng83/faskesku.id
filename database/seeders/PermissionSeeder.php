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

            // Employee Management
            'view-employees',
            'create-employees',
            'edit-employees',
            'delete-employees',

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
            'registration.view',
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
            // Farmasi module landing permission
            'farmasi.index',
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
        ]);
    }
}
