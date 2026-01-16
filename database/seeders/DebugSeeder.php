<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DebugSeeder extends Seeder
{
    public function run(): void
    {
        echo "--- Debug Seeder: FK prerequisites ---\n";

        foreach ([
            ['table' => 'kecamatan', 'key' => 'kd_kec', 'value' => 1],
            ['table' => 'kelurahan', 'key' => 'kd_kel', 'value' => 1],
            ['table' => 'kabupaten', 'key' => 'kd_kab', 'value' => 1],
            ['table' => 'propinsi', 'key' => 'kd_prop', 'value' => 1],
        ] as $check) {
            $table = $check['table'];
            if (! Schema::hasTable($table)) {
                echo "Table not found: {$table}\n";
                continue;
            }
            $exists = DB::table($table)->where($check['key'], $check['value'])->exists();
            $count = DB::table($table)->count();
            echo "{$table}: count={$count}, has {$check['key']}={$check['value']}=" . ($exists ? 'yes' : 'no') . "\n";
        }

        // Penjab
        if (Schema::hasTable('penjab')) {
            $penjabPJ2 = DB::table('penjab')->where('kd_pj', 'PJ2')->exists();
            echo 'penjab: has PJ2=' . ($penjabPJ2 ? 'yes' : 'no') . "\n";
        }

        // Perusahaan Pasien
        if (Schema::hasTable('perusahaan_pasien')) {
            $ppDash = DB::table('perusahaan_pasien')->where('kode_perusahaan', '-')->exists();
            $pp000 = DB::table('perusahaan_pasien')->where('kode_perusahaan', '00000000')->exists();
            echo 'perusahaan_pasien: has "-"=' . ($ppDash ? 'yes' : 'no') . ', has "00000000"=' . ($pp000 ? 'yes' : 'no') . "\n";
        }
    }
}
