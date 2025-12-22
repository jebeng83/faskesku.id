<?php

namespace Database\Seeders;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SettingSeeder extends Seeder
{
    /**
     * Seed default application settings.
     */
    public function run(): void
    {
        // Tentukan tabel yang memiliki kolom wajib (key, value)
        $hasRequired = function ($tbl) {
            return Schema::hasColumn($tbl, 'key') && Schema::hasColumn($tbl, 'value');
        };

        if (Schema::hasTable('setting') && $hasRequired('setting')) {
            $table = 'setting';
        } elseif (Schema::hasTable('settings') && $hasRequired('settings')) {
            $table = 'settings';
        } else {
            // Jangan memodifikasi tabel `setting` yang strukturnya tidak diketahui.
            // Buat tabel `settings` dengan struktur yang kita butuhkan.
            if (! Schema::hasTable('settings')) {
                Schema::create('settings', function (Blueprint $table) {
                    $table->id();
                    $table->string('key')->unique();
                    $table->text('value')->nullable();
                    $table->string('type')->default('string');
                    $table->string('group')->default('app');
                    $table->string('description')->nullable();
                    $table->timestamps();
                });
            }
            $table = 'settings';
        }

        $now = now();
        $defaults = [
            [
                'key' => 'app.name',
                'value' => 'Faskesku ID',
                'type' => 'string',
                'group' => 'app',
                'description' => 'Nama aplikasi yang ditampilkan di UI',
            ],
            [
                'key' => 'app.timezone',
                'value' => config('app.timezone', 'Asia/Jakarta'),
                'type' => 'string',
                'group' => 'app',
                'description' => 'Zona waktu default aplikasi',
            ],
            [
                'key' => 'ui.theme',
                'value' => 'light',
                'type' => 'string',
                'group' => 'ui',
                'description' => 'Tema tampilan (light/dark)',
            ],
            [
                'key' => 'ui.sidebar.collapsed',
                'value' => 'false',
                'type' => 'boolean',
                'group' => 'ui',
                'description' => 'Apakah sidebar dalam kondisi collapsed',
            ],
            [
                'key' => 'dashboard_highlights',
                'value' => json_encode([
                    [
                        'label' => 'IGD',
                        'text' => 'Flow triase baru mulai 08:00 - pastikan form SOAP terisi lengkap.',
                    ],
                    [
                        'label' => 'Farmasi',
                        'text' => 'Resep favorit & stok kritikal kini tersedia di panel farmasi.',
                    ],
                    [
                        'label' => 'Keuangan',
                        'text' => 'Laporan tarif baru dapat di-export di Pengaturan > Tarif.',
                    ],
                ], JSON_UNESCAPED_UNICODE),
                'type' => 'json',
                'group' => 'dashboard',
                'description' => 'Highlight tim untuk dashboard',
            ],
            [
                'key' => 'dashboard_priorities',
                'value' => json_encode([
                    [
                        'text' => 'Review mapping lokasi baru sebelum dikirim ke SATUSEHAT.',
                    ],
                    [
                        'text' => 'Verifikasi Encounter yang pending validasi.',
                    ],
                    [
                        'text' => 'Lengkapi data dokter (NIK/SIP) yang belum terisi.',
                    ],
                ], JSON_UNESCAPED_UNICODE),
                'type' => 'json',
                'group' => 'dashboard',
                'description' => 'Tindakan prioritas untuk dashboard',
            ],
        ];

        foreach ($defaults as $item) {
            DB::table($table)->updateOrInsert(
                ['key' => $item['key']],
                array_merge($item, [
                    'updated_at' => $now,
                    'created_at' => DB::raw('COALESCE(created_at, NOW())'),
                ])
            );
        }
    }
}
