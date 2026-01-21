<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleHasPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        $admin = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $dokter = Role::firstOrCreate(['name' => 'dokter', 'guard_name' => 'web']);
        $petugas = Role::firstOrCreate(['name' => 'petugas', 'guard_name' => 'web']);

        $allPermIds = Permission::pluck('id')->all();
        $admin->permissions()->syncWithoutDetaching($allPermIds);

        $dokterNames = [
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
        ];
        $dokterPermIds = Permission::whereIn('name', $dokterNames)->pluck('id')->all();
        $dokter->permissions()->syncWithoutDetaching($dokterPermIds);

        $petugasNames = [
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
        ];
        $petugasPermIds = Permission::whereIn('name', $petugasNames)->pluck('id')->all();
        $petugas->permissions()->syncWithoutDetaching($petugasPermIds);

        app('cache')
            ->store(config('permission.cache.store') != 'default' ? config('permission.cache.store') : null)
            ->forget(config('permission.cache.key'));
    }
}

