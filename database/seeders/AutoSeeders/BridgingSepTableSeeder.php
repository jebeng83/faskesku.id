<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BridgingSepTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('bridging_sep')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('bridging_sep')->insert(array (
          0 => 
          array (
            'no_sep' => '20250425000001',
            'no_rawat' => '2025/04/25/000001',
            'tglsep' => '2025-04-25',
            'tglrujukan' => '2025-04-25',
            'no_rujukan' => '121212',
            'kdppkrujukan' => '21212',
            'nmppkrujukan' => '1212',
            'kdppkpelayanan' => '21212',
            'nmppkpelayanan' => '1212',
            'jnspelayanan' => '2',
            'catatan' => '21212',
            'diagawal' => '21212',
            'nmdiagnosaawal' => '121212',
            'kdpolitujuan' => '21212',
            'nmpolitujuan' => '1212',
            'klsrawat' => '3',
            'klsnaik' => '1',
            'pembiayaan' => '3',
            'pjnaikkelas' => '12212',
            'lakalantas' => '3',
            'user' => '21212',
            'nomr' => '12212',
            'nama_pasien' => '12',
            'tanggal_lahir' => '2025-04-25',
            'peserta' => '1212',
            'jkel' => 'L',
            'no_kartu' => '2121212',
            'tglpulang' => '2025-04-25 13:45:09',
            'asal_rujukan' => '1. Faskes 1',
            'eksekutif' => '1.Ya',
            'cob' => '0. Tidak',
            'notelep' => '-',
            'katarak' => '0. Tidak',
            'tglkkl' => '2025-04-25',
            'keterangankkl' => '1212',
            'suplesi' => '0. Tidak',
            'no_sep_suplesi' => '21212',
            'kdprop' => '121212',
            'nmprop' => '121212',
            'kdkab' => '12',
            'nmkab' => '21212',
            'kdkec' => '21212',
            'nmkec' => '21212',
            'noskdp' => '121212',
            'kddpjp' => '1212',
            'nmdpdjp' => '1212',
            'tujuankunjungan' => '2',
            'flagprosedur' => '',
            'penunjang' => '2',
            'asesmenpelayanan' => '2',
            'kddpjplayanan' => '121',
            'nmdpjplayanan' => '221212',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}