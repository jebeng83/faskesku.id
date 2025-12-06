<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PiutangTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('piutang')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('piutang')->insert(array (
          0 => 
          array (
            'nota_piutang' => '2025/05/26/000001',
            'tgl_piutang' => '2025-05-26',
            'nip' => '123124',
            'no_rkm_medis' => '000022',
            'nm_pasien' => 'RUDI SANTOSO',
            'catatan' => '-',
            'jns_jual' => 'Jual Bebas',
            'ppn' => 16009.399999999999636202119290828704833984375,
            'ongkir' => 0.0,
            'uangmuka' => 0.0,
            'sisapiutang' => 161549.39999999999417923390865325927734375,
            'status' => 'UMUM',
            'tgltempo' => '2025-05-26',
            'kd_bangsal' => 'AP',
          ),
          1 => 
          array (
            'nota_piutang' => '2025/07/07/000001',
            'tgl_piutang' => '2025-08-04',
            'nip' => '123124',
            'no_rkm_medis' => '000006',
            'nm_pasien' => 'SAKHA HAMIZAN AQILA',
            'catatan' => '',
            'jns_jual' => 'Jual Bebas',
            'ppn' => 16322.899999999999636202119290828704833984375,
            'ongkir' => 0.0,
            'uangmuka' => 0.0,
            'sisapiutang' => 164712.89999999999417923390865325927734375,
            'status' => 'UMUM',
            'tgltempo' => '2025-08-04',
            'kd_bangsal' => 'AP',
          ),
          2 => 
          array (
            'nota_piutang' => 'PD250513001',
            'tgl_piutang' => '2025-05-13',
            'nip' => '123124',
            'no_rkm_medis' => '000022',
            'nm_pasien' => 'RUDI SANTOSO',
            'catatan' => '-',
            'jns_jual' => 'Jual Bebas',
            'ppn' => 5517.600000000000363797880709171295166015625,
            'ongkir' => 5000.0,
            'uangmuka' => 10000.0,
            'sisapiutang' => 50677.5999999999985448084771633148193359375,
            'status' => 'UMUM',
            'tgltempo' => '2025-05-13',
            'kd_bangsal' => 'AP',
          ),
          3 => 
          array (
            'nota_piutang' => 'PD250603001',
            'tgl_piutang' => '2025-06-03',
            'nip' => '123124',
            'no_rkm_medis' => '000013',
            'nm_pasien' => 'PARAMITA RAMADANI',
            'catatan' => '-',
            'jns_jual' => 'Jual Bebas',
            'ppn' => 13244.0,
            'ongkir' => 0.0,
            'uangmuka' => 0.0,
            'sisapiutang' => 133644.0,
            'status' => 'UMUM',
            'tgltempo' => '2025-06-03',
            'kd_bangsal' => 'AP',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}