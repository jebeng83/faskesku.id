<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PermissionTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('permissions')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('permissions')->insert(array (
          0 => 
          array (
            'id' => 1,
            'name' => 'view-patients',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:55',
            'updated_at' => '2025-09-19 07:39:55',
          ),
          1 => 
          array (
            'id' => 2,
            'name' => 'create-patients',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:55',
            'updated_at' => '2025-09-19 07:39:55',
          ),
          2 => 
          array (
            'id' => 3,
            'name' => 'edit-patients',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:55',
            'updated_at' => '2025-09-19 07:39:55',
          ),
          3 => 
          array (
            'id' => 4,
            'name' => 'delete-patients',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:55',
            'updated_at' => '2025-09-19 07:39:55',
          ),
          4 => 
          array (
            'id' => 5,
            'name' => 'view-employees',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:55',
            'updated_at' => '2025-09-19 07:39:55',
          ),
          5 => 
          array (
            'id' => 6,
            'name' => 'create-employees',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:55',
            'updated_at' => '2025-09-19 07:39:55',
          ),
          6 => 
          array (
            'id' => 7,
            'name' => 'edit-employees',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:55',
            'updated_at' => '2025-09-19 07:39:55',
          ),
          7 => 
          array (
            'id' => 8,
            'name' => 'delete-employees',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:55',
            'updated_at' => '2025-09-19 07:39:55',
          ),
          8 => 
          array (
            'id' => 9,
            'name' => 'view-medical-records',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:55',
            'updated_at' => '2025-09-19 07:39:55',
          ),
          9 => 
          array (
            'id' => 10,
            'name' => 'create-medical-records',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:55',
            'updated_at' => '2025-09-19 07:39:55',
          ),
          10 => 
          array (
            'id' => 11,
            'name' => 'edit-medical-records',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:55',
            'updated_at' => '2025-09-19 07:39:55',
          ),
          11 => 
          array (
            'id' => 12,
            'name' => 'delete-medical-records',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:55',
            'updated_at' => '2025-09-19 07:39:55',
          ),
          12 => 
          array (
            'id' => 13,
            'name' => 'view-prescriptions',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:55',
            'updated_at' => '2025-09-19 07:39:55',
          ),
          13 => 
          array (
            'id' => 14,
            'name' => 'create-prescriptions',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:55',
            'updated_at' => '2025-09-19 07:39:55',
          ),
          14 => 
          array (
            'id' => 15,
            'name' => 'edit-prescriptions',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:55',
            'updated_at' => '2025-09-19 07:39:55',
          ),
          15 => 
          array (
            'id' => 16,
            'name' => 'delete-prescriptions',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:55',
            'updated_at' => '2025-09-19 07:39:55',
          ),
          16 => 
          array (
            'id' => 17,
            'name' => 'view-appointments',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:55',
            'updated_at' => '2025-09-19 07:39:55',
          ),
          17 => 
          array (
            'id' => 18,
            'name' => 'create-appointments',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:55',
            'updated_at' => '2025-09-19 07:39:55',
          ),
          18 => 
          array (
            'id' => 19,
            'name' => 'edit-appointments',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:55',
            'updated_at' => '2025-09-19 07:39:55',
          ),
          19 => 
          array (
            'id' => 20,
            'name' => 'delete-appointments',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:55',
            'updated_at' => '2025-09-19 07:39:55',
          ),
          20 => 
          array (
            'id' => 21,
            'name' => 'view-reports',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:55',
            'updated_at' => '2025-09-19 07:39:55',
          ),
          21 => 
          array (
            'id' => 22,
            'name' => 'generate-reports',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:55',
            'updated_at' => '2025-09-19 07:39:55',
          ),
          22 => 
          array (
            'id' => 23,
            'name' => 'export-reports',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:56',
            'updated_at' => '2025-09-19 07:39:56',
          ),
          23 => 
          array (
            'id' => 24,
            'name' => 'view-settings',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:56',
            'updated_at' => '2025-09-19 07:39:56',
          ),
          24 => 
          array (
            'id' => 25,
            'name' => 'edit-settings',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:56',
            'updated_at' => '2025-09-19 07:39:56',
          ),
          25 => 
          array (
            'id' => 26,
            'name' => 'view-users',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:56',
            'updated_at' => '2025-09-19 07:39:56',
          ),
          26 => 
          array (
            'id' => 27,
            'name' => 'create-users',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:56',
            'updated_at' => '2025-09-19 07:39:56',
          ),
          27 => 
          array (
            'id' => 28,
            'name' => 'edit-users',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:56',
            'updated_at' => '2025-09-19 07:39:56',
          ),
          28 => 
          array (
            'id' => 29,
            'name' => 'delete-users',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:56',
            'updated_at' => '2025-09-19 07:39:56',
          ),
          29 => 
          array (
            'id' => 30,
            'name' => 'view-roles',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:56',
            'updated_at' => '2025-09-19 07:39:56',
          ),
          30 => 
          array (
            'id' => 31,
            'name' => 'create-roles',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:56',
            'updated_at' => '2025-09-19 07:39:56',
          ),
          31 => 
          array (
            'id' => 32,
            'name' => 'edit-roles',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:56',
            'updated_at' => '2025-09-19 07:39:56',
          ),
          32 => 
          array (
            'id' => 33,
            'name' => 'delete-roles',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:56',
            'updated_at' => '2025-09-19 07:39:56',
          ),
          33 => 
          array (
            'id' => 34,
            'name' => 'view-permissions',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:56',
            'updated_at' => '2025-09-19 07:39:56',
          ),
          34 => 
          array (
            'id' => 35,
            'name' => 'create-permissions',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:56',
            'updated_at' => '2025-09-19 07:39:56',
          ),
          35 => 
          array (
            'id' => 36,
            'name' => 'edit-permissions',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:56',
            'updated_at' => '2025-09-19 07:39:56',
          ),
          36 => 
          array (
            'id' => 37,
            'name' => 'delete-permissions',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:56',
            'updated_at' => '2025-09-19 07:39:56',
          ),
          37 => 
          array (
            'id' => 38,
            'name' => 'patient.view',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:56',
            'updated_at' => '2025-09-19 07:39:56',
          ),
          38 => 
          array (
            'id' => 39,
            'name' => 'employee.view',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:56',
            'updated_at' => '2025-09-19 07:39:56',
          ),
          39 => 
          array (
            'id' => 40,
            'name' => 'reg-periksa.view',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:56',
            'updated_at' => '2025-09-19 07:39:56',
          ),
          40 => 
          array (
            'id' => 41,
            'name' => 'user.view',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:56',
            'updated_at' => '2025-09-19 07:39:56',
          ),
          41 => 
          array (
            'id' => 42,
            'name' => 'permission.view',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:56',
            'updated_at' => '2025-09-19 07:39:56',
          ),
          42 => 
          array (
            'id' => 43,
            'name' => 'menu.view',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:56',
            'updated_at' => '2025-09-19 07:39:56',
          ),
          43 => 
          array (
            'id' => 44,
            'name' => 'menu.create',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:56',
            'updated_at' => '2025-09-19 07:39:56',
          ),
          44 => 
          array (
            'id' => 45,
            'name' => 'menu.edit',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:56',
            'updated_at' => '2025-09-19 07:39:56',
          ),
          45 => 
          array (
            'id' => 46,
            'name' => 'menu.delete',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:56',
            'updated_at' => '2025-09-19 07:39:56',
          ),
          46 => 
          array (
            'id' => 47,
            'name' => 'setting.view',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 10:02:43',
            'updated_at' => '2025-09-19 10:02:43',
          ),
          47 => 
          array (
            'id' => 48,
            'name' => 'patient.create',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:39',
            'updated_at' => '2025-09-26 15:28:39',
          ),
          48 => 
          array (
            'id' => 49,
            'name' => 'patient.edit',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:39',
            'updated_at' => '2025-09-26 15:28:39',
          ),
          49 => 
          array (
            'id' => 50,
            'name' => 'patient.delete',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:39',
            'updated_at' => '2025-09-26 15:28:39',
          ),
          50 => 
          array (
            'id' => 51,
            'name' => 'patients.index',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:39',
            'updated_at' => '2025-09-26 15:28:39',
          ),
          51 => 
          array (
            'id' => 52,
            'name' => 'employee.create',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:39',
            'updated_at' => '2025-09-26 15:28:39',
          ),
          52 => 
          array (
            'id' => 53,
            'name' => 'employee.edit',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:39',
            'updated_at' => '2025-09-26 15:28:39',
          ),
          53 => 
          array (
            'id' => 54,
            'name' => 'employee.delete',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:39',
            'updated_at' => '2025-09-26 15:28:39',
          ),
          54 => 
          array (
            'id' => 55,
            'name' => 'employees.index',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:39',
            'updated_at' => '2025-09-26 15:28:39',
          ),
          55 => 
          array (
            'id' => 56,
            'name' => 'view-doctors',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:39',
            'updated_at' => '2025-09-26 15:28:39',
          ),
          56 => 
          array (
            'id' => 57,
            'name' => 'create-doctors',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:40',
            'updated_at' => '2025-09-26 15:28:40',
          ),
          57 => 
          array (
            'id' => 58,
            'name' => 'edit-doctors',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:40',
            'updated_at' => '2025-09-26 15:28:40',
          ),
          58 => 
          array (
            'id' => 59,
            'name' => 'delete-doctors',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:40',
            'updated_at' => '2025-09-26 15:28:40',
          ),
          59 => 
          array (
            'id' => 60,
            'name' => 'view-spesialis',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:40',
            'updated_at' => '2025-09-26 15:28:40',
          ),
          60 => 
          array (
            'id' => 61,
            'name' => 'create-spesialis',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:40',
            'updated_at' => '2025-09-26 15:28:40',
          ),
          61 => 
          array (
            'id' => 62,
            'name' => 'edit-spesialis',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:40',
            'updated_at' => '2025-09-26 15:28:40',
          ),
          62 => 
          array (
            'id' => 63,
            'name' => 'delete-spesialis',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:40',
            'updated_at' => '2025-09-26 15:28:40',
          ),
          63 => 
          array (
            'id' => 64,
            'name' => 'user.create',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:40',
            'updated_at' => '2025-09-26 15:28:40',
          ),
          64 => 
          array (
            'id' => 65,
            'name' => 'user.edit',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:40',
            'updated_at' => '2025-09-26 15:28:40',
          ),
          65 => 
          array (
            'id' => 66,
            'name' => 'user.delete',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:40',
            'updated_at' => '2025-09-26 15:28:40',
          ),
          66 => 
          array (
            'id' => 67,
            'name' => 'users.index',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:40',
            'updated_at' => '2025-09-26 15:28:40',
          ),
          67 => 
          array (
            'id' => 68,
            'name' => 'permission.create',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:40',
            'updated_at' => '2025-09-26 15:28:40',
          ),
          68 => 
          array (
            'id' => 69,
            'name' => 'permission.edit',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:40',
            'updated_at' => '2025-09-26 15:28:40',
          ),
          69 => 
          array (
            'id' => 70,
            'name' => 'permission.delete',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:40',
            'updated_at' => '2025-09-26 15:28:40',
          ),
          70 => 
          array (
            'id' => 71,
            'name' => 'permissions.index',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:40',
            'updated_at' => '2025-09-26 15:28:40',
          ),
          71 => 
          array (
            'id' => 72,
            'name' => 'menus.index',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:40',
            'updated_at' => '2025-09-26 15:28:40',
          ),
          72 => 
          array (
            'id' => 73,
            'name' => 'reg-periksa.create',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:40',
            'updated_at' => '2025-09-26 15:28:40',
          ),
          73 => 
          array (
            'id' => 74,
            'name' => 'reg-periksa.edit',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:40',
            'updated_at' => '2025-09-26 15:28:40',
          ),
          74 => 
          array (
            'id' => 75,
            'name' => 'reg-periksa.delete',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:40',
            'updated_at' => '2025-09-26 15:28:40',
          ),
          75 => 
          array (
            'id' => 76,
            'name' => 'reg-periksa.index',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:40',
            'updated_at' => '2025-09-26 15:28:40',
          ),
          76 => 
          array (
            'id' => 77,
            'name' => 'rawat-jalan.view',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:40',
            'updated_at' => '2025-09-26 15:28:40',
          ),
          77 => 
          array (
            'id' => 78,
            'name' => 'rawat-jalan.create',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:40',
            'updated_at' => '2025-09-26 15:28:40',
          ),
          78 => 
          array (
            'id' => 79,
            'name' => 'rawat-jalan.edit',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:40',
            'updated_at' => '2025-09-26 15:28:40',
          ),
          79 => 
          array (
            'id' => 80,
            'name' => 'rawat-jalan.delete',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:40',
            'updated_at' => '2025-09-26 15:28:40',
          ),
          80 => 
          array (
            'id' => 81,
            'name' => 'departemen.view',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:40',
            'updated_at' => '2025-09-26 15:28:40',
          ),
          81 => 
          array (
            'id' => 82,
            'name' => 'departemen.create',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:40',
            'updated_at' => '2025-09-26 15:28:40',
          ),
          82 => 
          array (
            'id' => 83,
            'name' => 'departemen.edit',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:40',
            'updated_at' => '2025-09-26 15:28:40',
          ),
          83 => 
          array (
            'id' => 84,
            'name' => 'departemen.delete',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:41',
            'updated_at' => '2025-09-26 15:28:41',
          ),
          84 => 
          array (
            'id' => 85,
            'name' => 'jabatan.view',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:41',
            'updated_at' => '2025-09-26 15:28:41',
          ),
          85 => 
          array (
            'id' => 86,
            'name' => 'jabatan.create',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:41',
            'updated_at' => '2025-09-26 15:28:41',
          ),
          86 => 
          array (
            'id' => 87,
            'name' => 'jabatan.edit',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:41',
            'updated_at' => '2025-09-26 15:28:41',
          ),
          87 => 
          array (
            'id' => 88,
            'name' => 'jabatan.delete',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:41',
            'updated_at' => '2025-09-26 15:28:41',
          ),
          88 => 
          array (
            'id' => 89,
            'name' => 'bidang.view',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:41',
            'updated_at' => '2025-09-26 15:28:41',
          ),
          89 => 
          array (
            'id' => 90,
            'name' => 'bidang.create',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:41',
            'updated_at' => '2025-09-26 15:28:41',
          ),
          90 => 
          array (
            'id' => 91,
            'name' => 'bidang.edit',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:41',
            'updated_at' => '2025-09-26 15:28:41',
          ),
          91 => 
          array (
            'id' => 92,
            'name' => 'bidang.delete',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:41',
            'updated_at' => '2025-09-26 15:28:41',
          ),
          92 => 
          array (
            'id' => 93,
            'name' => 'jenjang-jabatan.view',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:41',
            'updated_at' => '2025-09-26 15:28:41',
          ),
          93 => 
          array (
            'id' => 94,
            'name' => 'jenjang-jabatan.create',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:41',
            'updated_at' => '2025-09-26 15:28:41',
          ),
          94 => 
          array (
            'id' => 95,
            'name' => 'jenjang-jabatan.edit',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:41',
            'updated_at' => '2025-09-26 15:28:41',
          ),
          95 => 
          array (
            'id' => 96,
            'name' => 'jenjang-jabatan.delete',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:41',
            'updated_at' => '2025-09-26 15:28:41',
          ),
          96 => 
          array (
            'id' => 97,
            'name' => 'staf.view',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:41',
            'updated_at' => '2025-09-26 15:28:41',
          ),
          97 => 
          array (
            'id' => 98,
            'name' => 'staf.create',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:41',
            'updated_at' => '2025-09-26 15:28:41',
          ),
          98 => 
          array (
            'id' => 99,
            'name' => 'staf.edit',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:41',
            'updated_at' => '2025-09-26 15:28:41',
          ),
          99 => 
          array (
            'id' => 100,
            'name' => 'staf.delete',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:41',
            'updated_at' => '2025-09-26 15:28:41',
          ),
          100 => 
          array (
            'id' => 101,
            'name' => 'kategori-obat.view',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:41',
            'updated_at' => '2025-09-26 15:28:41',
          ),
          101 => 
          array (
            'id' => 102,
            'name' => 'kategori-obat.create',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:41',
            'updated_at' => '2025-09-26 15:28:41',
          ),
          102 => 
          array (
            'id' => 103,
            'name' => 'kategori-obat.edit',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:41',
            'updated_at' => '2025-09-26 15:28:41',
          ),
          103 => 
          array (
            'id' => 104,
            'name' => 'kategori-obat.delete',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:41',
            'updated_at' => '2025-09-26 15:28:41',
          ),
          104 => 
          array (
            'id' => 105,
            'name' => 'golongan-obat.view',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:41',
            'updated_at' => '2025-09-26 15:28:41',
          ),
          105 => 
          array (
            'id' => 106,
            'name' => 'golongan-obat.create',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:41',
            'updated_at' => '2025-09-26 15:28:41',
          ),
          106 => 
          array (
            'id' => 107,
            'name' => 'golongan-obat.edit',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:41',
            'updated_at' => '2025-09-26 15:28:41',
          ),
          107 => 
          array (
            'id' => 108,
            'name' => 'golongan-obat.delete',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:41',
            'updated_at' => '2025-09-26 15:28:41',
          ),
          108 => 
          array (
            'id' => 109,
            'name' => 'industri-farmasi.view',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:41',
            'updated_at' => '2025-09-26 15:28:41',
          ),
          109 => 
          array (
            'id' => 110,
            'name' => 'industri-farmasi.create',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:41',
            'updated_at' => '2025-09-26 15:28:41',
          ),
          110 => 
          array (
            'id' => 111,
            'name' => 'industri-farmasi.edit',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:41',
            'updated_at' => '2025-09-26 15:28:41',
          ),
          111 => 
          array (
            'id' => 112,
            'name' => 'industri-farmasi.delete',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:41',
            'updated_at' => '2025-09-26 15:28:41',
          ),
          112 => 
          array (
            'id' => 113,
            'name' => 'satuan-barang.view',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:41',
            'updated_at' => '2025-09-26 15:28:41',
          ),
          113 => 
          array (
            'id' => 114,
            'name' => 'satuan-barang.create',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:42',
            'updated_at' => '2025-09-26 15:28:42',
          ),
          114 => 
          array (
            'id' => 115,
            'name' => 'satuan-barang.edit',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:42',
            'updated_at' => '2025-09-26 15:28:42',
          ),
          115 => 
          array (
            'id' => 116,
            'name' => 'satuan-barang.delete',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:42',
            'updated_at' => '2025-09-26 15:28:42',
          ),
          116 => 
          array (
            'id' => 117,
            'name' => 'data-barang.view',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:42',
            'updated_at' => '2025-09-26 15:28:42',
          ),
          117 => 
          array (
            'id' => 118,
            'name' => 'data-barang.create',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:42',
            'updated_at' => '2025-09-26 15:28:42',
          ),
          118 => 
          array (
            'id' => 119,
            'name' => 'data-barang.edit',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:42',
            'updated_at' => '2025-09-26 15:28:42',
          ),
          119 => 
          array (
            'id' => 120,
            'name' => 'data-barang.delete',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:42',
            'updated_at' => '2025-09-26 15:28:42',
          ),
          120 => 
          array (
            'id' => 121,
            'name' => 'supplier.view',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:42',
            'updated_at' => '2025-09-26 15:28:42',
          ),
          121 => 
          array (
            'id' => 122,
            'name' => 'supplier.create',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:42',
            'updated_at' => '2025-09-26 15:28:42',
          ),
          122 => 
          array (
            'id' => 123,
            'name' => 'supplier.edit',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:42',
            'updated_at' => '2025-09-26 15:28:42',
          ),
          123 => 
          array (
            'id' => 124,
            'name' => 'supplier.delete',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:42',
            'updated_at' => '2025-09-26 15:28:42',
          ),
          124 => 
          array (
            'id' => 125,
            'name' => 'pembelian.view',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:42',
            'updated_at' => '2025-09-26 15:28:42',
          ),
          125 => 
          array (
            'id' => 126,
            'name' => 'pembelian.create',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:42',
            'updated_at' => '2025-09-26 15:28:42',
          ),
          126 => 
          array (
            'id' => 127,
            'name' => 'pembelian.edit',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:42',
            'updated_at' => '2025-09-26 15:28:42',
          ),
          127 => 
          array (
            'id' => 128,
            'name' => 'pembelian.delete',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:42',
            'updated_at' => '2025-09-26 15:28:42',
          ),
          128 => 
          array (
            'id' => 129,
            'name' => 'penjualan.view',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:42',
            'updated_at' => '2025-09-26 15:28:42',
          ),
          129 => 
          array (
            'id' => 130,
            'name' => 'penjualan.create',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:42',
            'updated_at' => '2025-09-26 15:28:42',
          ),
          130 => 
          array (
            'id' => 131,
            'name' => 'penjualan.edit',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:42',
            'updated_at' => '2025-09-26 15:28:42',
          ),
          131 => 
          array (
            'id' => 132,
            'name' => 'penjualan.delete',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:42',
            'updated_at' => '2025-09-26 15:28:42',
          ),
          132 => 
          array (
            'id' => 133,
            'name' => 'stok-opname.view',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:42',
            'updated_at' => '2025-09-26 15:28:42',
          ),
          133 => 
          array (
            'id' => 134,
            'name' => 'stok-opname.create',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:42',
            'updated_at' => '2025-09-26 15:28:42',
          ),
          134 => 
          array (
            'id' => 135,
            'name' => 'stok-opname.edit',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:42',
            'updated_at' => '2025-09-26 15:28:42',
          ),
          135 => 
          array (
            'id' => 136,
            'name' => 'stok-opname.delete',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:42',
            'updated_at' => '2025-09-26 15:28:42',
          ),
          136 => 
          array (
            'id' => 137,
            'name' => 'profile.show',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:42',
            'updated_at' => '2025-09-26 15:28:42',
          ),
          137 => 
          array (
            'id' => 138,
            'name' => 'profile.edit',
            'guard_name' => 'web',
            'created_at' => '2025-09-26 15:28:42',
            'updated_at' => '2025-09-26 15:28:42',
          ),
          138 => 
          array (
            'id' => 139,
            'name' => 'patient.index',
            'guard_name' => 'web',
            'created_at' => '2025-09-30 12:39:39',
            'updated_at' => '2025-09-30 12:39:39',
          ),
          139 => 
          array (
            'id' => 140,
            'name' => 'registration.view',
            'guard_name' => 'web',
            'created_at' => '2025-09-30 12:39:39',
            'updated_at' => '2025-09-30 12:39:39',
          ),
          140 => 
          array (
            'id' => 141,
            'name' => 'farmasi.index',
            'guard_name' => 'web',
            'created_at' => '2025-09-30 12:39:39',
            'updated_at' => '2025-09-30 12:39:39',
          ),
          141 => 
          array (
            'id' => 142,
            'name' => 'pcare.index',
            'guard_name' => 'web',
            'created_at' => '2025-10-26 15:24:40',
            'updated_at' => '2025-10-26 15:24:40',
          ),
          142 => 
          array (
            'id' => 143,
            'name' => 'pcare.referensi.diagnosa',
            'guard_name' => 'web',
            'created_at' => '2025-10-26 15:59:56',
            'updated_at' => '2025-10-26 15:59:56',
          ),
          143 => 
          array (
            'id' => 144,
            'name' => 'pcare.referensi.poli',
            'guard_name' => 'web',
            'created_at' => '2025-10-26 18:23:17',
            'updated_at' => '2025-10-26 18:23:17',
          ),
          144 => 
          array (
            'id' => 145,
            'name' => 'pcare.referensi.kesadaran',
            'guard_name' => 'web',
            'created_at' => '2025-10-26 18:40:55',
            'updated_at' => '2025-10-26 18:40:55',
          ),
          145 => 
          array (
            'id' => 146,
            'name' => 'pcare.referensi.dpho',
            'guard_name' => 'web',
            'created_at' => '2025-10-26 18:51:09',
            'updated_at' => '2025-10-26 18:51:09',
          ),
          146 => 
          array (
            'id' => 147,
            'name' => 'pcare.referensi.provider',
            'guard_name' => 'web',
            'created_at' => '2025-10-26 19:00:03',
            'updated_at' => '2025-10-26 19:00:03',
          ),
          147 => 
          array (
            'id' => 148,
            'name' => 'pcare.referensi.spesialis',
            'guard_name' => 'web',
            'created_at' => '2025-10-27 01:00:17',
            'updated_at' => '2025-10-27 01:00:17',
          ),
          148 => 
          array (
            'id' => 149,
            'name' => 'pcare.referensi.subspesialis',
            'guard_name' => 'web',
            'created_at' => '2025-10-27 04:44:14',
            'updated_at' => '2025-10-27 04:44:14',
          ),
          149 => 
          array (
            'id' => 150,
            'name' => 'pcare.referensi.sarana',
            'guard_name' => 'web',
            'created_at' => '2025-10-27 04:44:14',
            'updated_at' => '2025-10-27 04:44:14',
          ),
          150 => 
          array (
            'id' => 151,
            'name' => 'pcare.referensi.khusus',
            'guard_name' => 'web',
            'created_at' => '2025-10-27 04:44:14',
            'updated_at' => '2025-10-27 04:44:14',
          ),
          151 => 
          array (
            'id' => 154,
            'name' => 'pcare.referensi.faskes-rujukan',
            'guard_name' => 'web',
            'created_at' => '2025-10-27 05:00:20',
            'updated_at' => '2025-10-27 05:00:20',
          ),
          152 => 
          array (
            'id' => 155,
            'name' => 'pcare.setting.mobilejkn.index',
            'guard_name' => 'web',
            'created_at' => '2025-10-27 08:07:15',
            'updated_at' => '2025-10-27 08:07:15',
          ),
          153 => 
          array (
            'id' => 156,
            'name' => 'pcare.referensi.mobilejkn.dokter.index',
            'guard_name' => 'web',
            'created_at' => '2025-10-27 09:02:38',
            'updated_at' => '2025-10-27 09:02:38',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}