<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PcareRujukSubspesialiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('pcare_rujuk_subspesialis')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('pcare_rujuk_subspesialis')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/11/12/000001',
            'noKunjungan' => NULL,
            'tglDaftar' => '2025-11-12',
            'no_rkm_medis' => '000057',
            'nm_pasien' => 'AGUS BUDIYONO,A. Md.Kep',
            'noKartu' => '0001441909697',
            'kdPoli' => '001',
            'nmPoli' => NULL,
            'keluhan' => 'Pasien melakukan kontrol rutin.',
            'kdSadar' => NULL,
            'nmSadar' => NULL,
            'sistole' => NULL,
            'diastole' => NULL,
            'beratBadan' => NULL,
            'tinggiBadan' => NULL,
            'respRate' => NULL,
            'heartRate' => NULL,
            'lingkarPerut' => '',
            'terapi' => NULL,
            'kdStatusPulang' => NULL,
            'nmStatusPulang' => NULL,
            'tglPulang' => NULL,
            'kdDokter' => '132183',
            'nmDokter' => NULL,
            'kdDiag1' => 'H52.5',
            'nmDiag1' => NULL,
            'kdDiag2' => NULL,
            'nmDiag2' => NULL,
            'kdDiag3' => NULL,
            'nmDiag3' => NULL,
            'tglEstRujuk' => '2025-11-12',
            'kdPPK' => '0154R010',
            'nmPPK' => '',
            'kdSubSpesialis' => NULL,
            'nmSubSpesialis' => NULL,
            'kdSarana' => '1',
            'nmSarana' => NULL,
            'kdTACC' => '0',
            'nmTACC' => NULL,
            'alasanTACC' => NULL,
            'KdAlergiMakanan' => '',
            'NmAlergiMakanan' => '',
            'KdAlergiUdara' => '',
            'NmAlergiUdara' => '',
            'KdAlergiObat' => '',
            'NmAlergiObat' => '',
            'KdPrognosa' => '',
            'NmPrognosa' => '',
            'terapi_non_obat' => '',
            'bmhp' => '',
          ),
          1 => 
          array (
            'no_rawat' => '2025/11/13/000001',
            'noKunjungan' => '112516161125Y001193',
            'tglDaftar' => '2025-11-13',
            'no_rkm_medis' => '000057',
            'nm_pasien' => 'AGUS BUDIYONO,A. Md.Kep',
            'noKartu' => '0001441909697',
            'kdPoli' => 'U0009',
            'nmPoli' => NULL,
            'keluhan' => NULL,
            'kdSadar' => NULL,
            'nmSadar' => NULL,
            'sistole' => NULL,
            'diastole' => NULL,
            'beratBadan' => NULL,
            'tinggiBadan' => NULL,
            'respRate' => NULL,
            'heartRate' => NULL,
            'lingkarPerut' => '',
            'terapi' => NULL,
            'kdStatusPulang' => '4',
            'nmStatusPulang' => NULL,
            'tglPulang' => NULL,
            'kdDokter' => 'D0000002',
            'nmDokter' => NULL,
            'kdDiag1' => 'H52.5',
            'nmDiag1' => NULL,
            'kdDiag2' => NULL,
            'nmDiag2' => NULL,
            'kdDiag3' => NULL,
            'nmDiag3' => NULL,
            'tglEstRujuk' => '2025-11-20',
            'kdPPK' => '11251616',
            'nmPPK' => '',
            'kdSubSpesialis' => '65',
            'nmSubSpesialis' => NULL,
            'kdSarana' => '1',
            'nmSarana' => NULL,
            'kdTACC' => NULL,
            'nmTACC' => NULL,
            'alasanTACC' => NULL,
            'KdAlergiMakanan' => '',
            'NmAlergiMakanan' => '',
            'KdAlergiUdara' => '',
            'NmAlergiUdara' => '',
            'KdAlergiObat' => '',
            'NmAlergiObat' => '',
            'KdPrognosa' => '',
            'NmPrognosa' => '',
            'terapi_non_obat' => '',
            'bmhp' => '',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}