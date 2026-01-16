<?php

namespace Database\Seeders;

use App\Models\Patient;
use App\Models\Dokter;
use App\Models\RawatJalan\RawatJalan;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class RawatJalanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ambil beberapa pasien untuk dijadikan sample
        $patients = Patient::take(10)->get();

        if ($patients->count() == 0) {
            $this->command->info('Tidak ada data pasien. Jalankan PatientSeeder terlebih dahulu.');

            return;
        }

        $statusOptions = ['Belum', 'Sudah', 'Batal', 'Berkas Diterima', 'Dirujuk', 'Meninggal', 'Dirawat', 'Pulang Paksa'];
        $statusDaftarOptions = ['-', 'Lama', 'Baru'];
        $statusLanjutOptions = ['Ralan', 'Ranap'];
        $statusBayarOptions = ['Sudah Bayar', 'Belum Bayar'];
        $statusPoliOptions = ['Lama', 'Baru'];
        $sttsumurOptions = ['Th', 'Bl', 'Hr'];
        $keputusanOptions = ['-', 'RUJUKAN', 'PRIORITAS', 'HIJAU', 'KUNING', 'MERAH', 'HITAM', 'MJKN', 'CHECK-IN'];

        $dokterOptions = Dokter::whereNotNull('kd_dokter')
            ->where('kd_dokter', '!=', '')
            ->where('kd_dokter', '!=', '-')
            ->pluck('kd_dokter')
            ->all();
        if (empty($dokterOptions)) {
            $dokterOptions = ['D0000002', 'D0000003', 'D0000004', 'D0000005', 'D001'];
        }
        $poliOptions = ['P001', 'P002', 'P003', 'P004', 'P005'];
        $penjaminOptions = ['PJ1', 'PJ2', 'PJ3'];

        // Generate data untuk 30 hari terakhir
        for ($i = 0; $i < 30; $i++) {
            $tanggal = Carbon::now()->subDays($i);

            // Generate 5-15 data per hari
            $jumlahData = rand(5, 15);

            for ($j = 0; $j < $jumlahData; $j++) {
                $patient = $patients->random();
                $jam = Carbon::createFromTime(rand(7, 17), rand(0, 59), 0);

                // Generate no_rawat
                $no_rawat = $tanggal->format('Ymd').str_pad($j + 1, 4, '0', STR_PAD_LEFT);

                RawatJalan::create([
                    'no_reg' => 'REG'.str_pad(rand(1, 999), 3, '0', STR_PAD_LEFT),
                    'no_rawat' => $no_rawat,
                    'tgl_registrasi' => $tanggal->format('Y-m-d'),
                    'jam_reg' => $jam->format('H:i:s'),
                    'kd_dokter' => $dokterOptions[array_rand($dokterOptions)],
                    'no_rkm_medis' => $patient->no_rkm_medis,
                    'kd_poli' => $poliOptions[array_rand($poliOptions)],
                    'p_jawab' => $patient->namakeluarga,
                    'almt_pj' => $patient->alamatpj,
                    'hubunganpj' => $patient->keluarga,
                    'biaya_reg' => rand(50000, 200000),
                    'stts' => $statusOptions[array_rand($statusOptions)],
                    'stts_daftar' => $statusDaftarOptions[array_rand($statusDaftarOptions)],
                    'status_lanjut' => $statusLanjutOptions[array_rand($statusLanjutOptions)],
                    'kd_pj' => $penjaminOptions[array_rand($penjaminOptions)],
                    'umurdaftar' => rand(1, 80),
                    'sttsumur' => $sttsumurOptions[array_rand($sttsumurOptions)],
                    'status_bayar' => $statusBayarOptions[array_rand($statusBayarOptions)],
                    'status_poli' => $statusPoliOptions[array_rand($statusPoliOptions)],
                    'keputusan' => $keputusanOptions[array_rand($keputusanOptions)],
                ]);
            }
        }

        $this->command->info('RawatJalanSeeder berhasil dijalankan!');
    }
}
