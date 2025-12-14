<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class LayananProgramKfrTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('layanan_program_kfr')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('layanan_program_kfr')->insert([
            0 => [
                'no_rawat_layanan' => '2025/06/23/000001',
                'no_rawat' => '2025/06/23/000001',
                'tanggal' => '2025-06-23 13:25:27',
                'nip' => '123124',
                'program' => 'tes',
            ],
            1 => [
                'no_rawat_layanan' => '2025/07/04/000001',
                'no_rawat' => '2025/07/04/000001',
                'tanggal' => '2025-07-04 09:51:53',
                'nip' => '123124',
                'program' => '1212121',
            ],
            2 => [
                'no_rawat_layanan' => '2025/07/07/000001',
                'no_rawat' => '2025/07/07/000001',
                'tanggal' => '2025-07-07 10:44:24',
                'nip' => '123124',
                'program' => '12122',
            ],
            3 => [
                'no_rawat_layanan' => '2025/08/11/000002',
                'no_rawat' => '2025/08/11/000002',
                'tanggal' => '2025-08-11 15:17:19',
                'nip' => '123124',
                'program' => 'qwqwqw',
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
