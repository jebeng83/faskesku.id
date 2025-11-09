<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Menu;
use Spatie\Permission\Models\Permission;

class PcareMenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure permission exists for access control (optional)
        Permission::findOrCreate('pcare.index', 'web');

        // Create Bridging PCare menu if it doesn't exist
        $parent = Menu::firstOrCreate(
            ['route' => 'pcare.index'],
            [
                'name' => 'Briding Pcare',
                'slug' => 'pcare',
                'icon' => 'fas fa-link',
                'route' => 'pcare.index',
                'url' => route('pcare.index'),
                'sort_order' => 8,
                'is_active' => true,
                'permission_name' => 'pcare.index',
                'description' => 'Bridging ke layanan PCare BPJS',
            ]
        );

        // Child menu: Referensi Poli PCare
        Permission::findOrCreate('pcare.referensi.poli', 'web');
        Menu::firstOrCreate(
            ['route' => 'pcare.referensi.poli'],
            [
                'name' => 'Referensi Poli PCare',
                'slug' => 'pcare-ref-poli',
                'icon' => 'fas fa-hospital',
                'route' => 'pcare.referensi.poli',
                'url' => route('pcare.referensi.poli'),
                'parent_id' => $parent->id,
                'sort_order' => 9,
                'is_active' => true,
                'permission_name' => 'pcare.referensi.poli',
                'description' => 'Daftar poli FKTP dari katalog PCare',
            ]
        );

        // Child menu: Referensi Kesadaran PCare
        Permission::findOrCreate('pcare.referensi.kesadaran', 'web');
        Menu::firstOrCreate(
            ['route' => 'pcare.referensi.kesadaran'],
            [
                'name' => 'Referensi Kesadaran PCare',
                'slug' => 'pcare-ref-kesadaran',
                'icon' => 'fas fa-heartbeat',
                'route' => 'pcare.referensi.kesadaran',
                'url' => route('pcare.referensi.kesadaran'),
                'parent_id' => $parent->id,
                'sort_order' => 10,
                'is_active' => true,
                'permission_name' => 'pcare.referensi.kesadaran',
                'description' => 'Daftar tingkat kesadaran dari katalog PCare',
            ]
        );

        // Child menu: Referensi Provider PCare
        Permission::findOrCreate('pcare.referensi.provider', 'web');
        Menu::firstOrCreate(
            ['route' => 'pcare.referensi.provider'],
            [
                'name' => 'Referensi Provider PCare',
                'slug' => 'pcare-ref-provider',
                'icon' => 'fas fa-hospital',
                'route' => 'pcare.referensi.provider',
                'url' => route('pcare.referensi.provider'),
                'parent_id' => $parent->id,
                'sort_order' => 12,
                'is_active' => true,
                'permission_name' => 'pcare.referensi.provider',
                'description' => 'Daftar provider rayonisasi dari katalog PCare',
            ]
        );

        // Child menu: Referensi DPHO PCare
        Permission::findOrCreate('pcare.referensi.dpho', 'web');
        Menu::firstOrCreate(
            ['route' => 'pcare.referensi.dpho'],
            [
                'name' => 'Referensi DPHO PCare',
                'slug' => 'pcare-ref-dpho',
                'icon' => 'fas fa-pills',
                'route' => 'pcare.referensi.dpho',
                'url' => route('pcare.referensi.dpho'),
                'parent_id' => $parent->id,
                'sort_order' => 11,
                'is_active' => true,
                'permission_name' => 'pcare.referensi.dpho',
                'description' => 'Daftar obat DPHO dari katalog PCare',
            ]
        );

        // Child menu: Referensi Tindakan PCare
        Permission::findOrCreate('pcare.referensi.tindakan', 'web');
        Menu::firstOrCreate(
            ['route' => 'pcare.referensi.tindakan'],
            [
                'name' => 'Referensi Tindakan Pcare',
                'slug' => 'pcare-ref-tindakan',
                'icon' => 'fas fa-notes-medical',
                'route' => 'pcare.referensi.tindakan',
                'url' => route('pcare.referensi.tindakan'),
                'parent_id' => $parent->id,
                'sort_order' => 23,
                'is_active' => true,
                'permission_name' => 'pcare.referensi.tindakan',
                'description' => 'Daftar referensi tindakan dari katalog PCare',
            ]
        );

        // Child menu: Referensi Spesialis PCare
        Permission::findOrCreate('pcare.referensi.spesialis', 'web');
        Menu::firstOrCreate(
            ['route' => 'pcare.referensi.spesialis'],
            [
                'name' => 'Referensi Spesialis PCare',
                'slug' => 'pcare-ref-spesialis',
                'icon' => 'fas fa-user-md',
                'route' => 'pcare.referensi.spesialis',
                'url' => route('pcare.referensi.spesialis'),
                'parent_id' => $parent->id,
                'sort_order' => 13,
                'is_active' => true,
                'permission_name' => 'pcare.referensi.spesialis',
                'description' => 'Daftar spesialis dari katalog PCare',
            ]
        );

        // Child menu: Referensi Sub Spesialis PCare
        Permission::findOrCreate('pcare.referensi.subspesialis', 'web');
        Menu::firstOrCreate(
            ['route' => 'pcare.referensi.subspesialis'],
            [
                'name' => 'Referensi Sub Spesialis PCare',
                'slug' => 'pcare-ref-subspesialis',
                'icon' => 'fas fa-user-nurse',
                'route' => 'pcare.referensi.subspesialis',
                'url' => route('pcare.referensi.subspesialis'),
                'parent_id' => $parent->id,
                'sort_order' => 14,
                'is_active' => true,
                'permission_name' => 'pcare.referensi.subspesialis',
                'description' => 'Daftar sub-spesialis berdasarkan spesialis dari katalog PCare',
            ]
        );

        // Child menu: Referensi Sarana PCare
        Permission::findOrCreate('pcare.referensi.sarana', 'web');
        Menu::firstOrCreate(
            ['route' => 'pcare.referensi.sarana'],
            [
                'name' => 'Referensi Sarana PCare',
                'slug' => 'pcare-ref-sarana',
                'icon' => 'fas fa-warehouse',
                'route' => 'pcare.referensi.sarana',
                'url' => route('pcare.referensi.sarana'),
                'parent_id' => $parent->id,
                'sort_order' => 15,
                'is_active' => true,
                'permission_name' => 'pcare.referensi.sarana',
                'description' => 'Daftar sarana dari katalog PCare',
            ]
        );

        // Child menu: Referensi Khusus PCare
        // Safe permission creation to avoid unique constraint if already exists
        if (!Permission::where('name', 'pcare.referensi.khusus')->where('guard_name', 'web')->exists()) {
            Permission::create(['name' => 'pcare.referensi.khusus', 'guard_name' => 'web']);
        }
        Menu::firstOrCreate(
            ['route' => 'pcare.referensi.khusus'],
            [
                'name' => 'Referensi Khusus PCare',
                'slug' => 'pcare-ref-khusus',
                'icon' => 'fas fa-star',
                'route' => 'pcare.referensi.khusus',
                'url' => route('pcare.referensi.khusus'),
                'parent_id' => $parent->id,
                'sort_order' => 16,
                'is_active' => true,
                'permission_name' => 'pcare.referensi.khusus',
                'description' => 'Daftar referensi khusus dari katalog PCare',
            ]
        );

        // Child menu: Referensi Prognosa PCare
        Permission::findOrCreate('pcare.referensi.prognosa', 'web');
        Menu::firstOrCreate(
            ['route' => 'pcare.referensi.prognosa'],
            [
                'name' => 'Referensi Prognosa PCare',
                'slug' => 'pcare-ref-prognosa',
                'icon' => 'fas fa-clipboard-check',
                'route' => 'pcare.referensi.prognosa',
                'url' => route('pcare.referensi.prognosa'),
                'parent_id' => $parent->id,
                'sort_order' => 20,
                'is_active' => true,
                'permission_name' => 'pcare.referensi.prognosa',
                'description' => 'Daftar prognosa dari katalog PCare',
            ]
        );

        // Child menu: Referensi Alergi PCare
        Permission::findOrCreate('pcare.referensi.alergi', 'web');
        Menu::firstOrCreate(
            ['route' => 'pcare.referensi.alergi'],
            [
                'name' => 'Referensi Alergi PCare',
                'slug' => 'pcare-ref-alergi',
                'icon' => 'fas fa-leaf',
                'route' => 'pcare.referensi.alergi',
                'url' => route('pcare.referensi.alergi'),
                'parent_id' => $parent->id,
                'sort_order' => 19,
                'is_active' => true,
                'permission_name' => 'pcare.referensi.alergi',
                'description' => 'Daftar alergi (Makanan/Udara/Obat) dari katalog PCare',
            ]
        );

        // Child menu: Referensi Status Pulang PCCare
        Permission::findOrCreate('pcare.referensi.statuspulang', 'web');
        Menu::firstOrCreate(
            ['route' => 'pcare.referensi.statuspulang'],
            [
                'name' => 'Referensi Status Pulang PCare',
                'slug' => 'pcare-ref-statuspulang',
                'icon' => 'fas fa-door-open',
                'route' => 'pcare.referensi.statuspulang',
                'url' => route('pcare.referensi.statuspulang'),
                'parent_id' => $parent->id,
                'sort_order' => 18,
                'is_active' => true,
                'permission_name' => 'pcare.referensi.statuspulang',
                'description' => 'Daftar status pulang (rawat inap/jalan) dari katalog PCare',
            ]
        );

        // Child menu: Referensi Faskes Rujukan PCare
        Permission::findOrCreate('pcare.referensi.faskes-rujukan', 'web');
        Menu::firstOrCreate(
            ['route' => 'pcare.referensi.faskes-rujukan'],
            [
                'name' => 'Referensi Faskes Rujukan PCare',
                'slug' => 'pcare-ref-faskes-rujukan',
                'icon' => 'fas fa-hospital',
                'route' => 'pcare.referensi.faskes-rujukan',
                'url' => route('pcare.referensi.faskes-rujukan'),
                'parent_id' => $parent->id,
                'sort_order' => 17,
                'is_active' => true,
                'permission_name' => 'pcare.referensi.faskes-rujukan',
                'description' => 'Daftar faskes rujukan subspesialis dari katalog PCare',
            ]
        );

        // Child menu: Referensi Poli Mobile JKN (ditampilkan di grup PCare)
        Permission::findOrCreate('pcare.referensi.mobilejkn.poli', 'web');
        Menu::firstOrCreate(
            ['route' => 'pcare.referensi.mobilejkn.poli'],
            [
                'name' => 'Referensi Poli Mobile JKN',
                'slug' => 'pcare-ref-mobilejkn-poli',
                'icon' => 'fas fa-notes-medical',
                'route' => 'pcare.referensi.mobilejkn.poli',
                'url' => route('pcare.referensi.mobilejkn.poli'),
                'parent_id' => $parent->id,
                'sort_order' => 21,
                'is_active' => true,
                'permission_name' => 'pcare.referensi.mobilejkn.poli',
                'description' => 'Daftar poli dari katalog BPJS Mobile JKN (berdasarkan tanggal layanan)',
            ]
        );

        // Layanan: Cek Peserta by NIK
        Permission::findOrCreate('pcare.layanan.cekpeserta.nik', 'web');
        Menu::firstOrCreate(
            ['route' => 'pcare.layanan.cek-peserta-nik'],
            [
                'name' => 'Cek Peserta by NIK',
                'slug' => 'pcare-cek-peserta-nik',
                'icon' => 'fas fa-id-card',
                'route' => 'pcare.layanan.cek-peserta-nik',
                'url' => route('pcare.layanan.cek-peserta-nik'),
                'parent_id' => $parent->id,
                'sort_order' => 22,
                'is_active' => true,
                'permission_name' => 'pcare.layanan.cekpeserta.nik',
                'description' => 'Cek data peserta BPJS PCare berdasarkan NIK',
            ]
        );
    }
}