<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PegawaiSeeder extends Seeder
{
    /**
     * Run the database seeders.
     */
    public function run(): void
    {
        $pegawai = [
            [
                'nik' => 'D001',
                'nama' => 'Dr. Ahmad Fauzi',
                'jk' => 'Pria',
                'jbtn' => 'Dokter Umum',
                'jnj_jabatan' => 'PJBP',
                'kode_kelompok' => 'SKP',
                'kode_resiko' => 'I',
                'kode_emergency' => 'III',
                'departemen' => 'RJ',
                'bidang' => 'Direksi',
                'stts_wp' => 'K/1',
                'stts_kerja' => 'T',
                'npwp' => '123456789012345',
                'pendidikan' => 'S1 PERAWAT',
                'gapok' => 15000000.00,
                'tmp_lahir' => 'Jakarta',
                'tgl_lahir' => '1980-05-15',
                'alamat' => 'Jl. Merdeka No. 123, Jakarta',
                'kota' => 'Jakarta',
                'mulai_kerja' => '2020-01-15',
                'ms_kerja' => 'AKT',
                'indexins' => '-',
                'bpd' => 'T',
                'rekening' => '-',
                'stts_aktif' => 'AKTIF',
                'wajibmasuk' => 1,
                'pengurang' => 0,
                'indek' => 0,
                'mulai_kontrak' => '2020-01-15',
                'cuti_diambil' => 0,
                'dankes' => 500000.00,
                'photo' => null,
                'no_ktp' => '3201234567890123',
            ],
        ];

        foreach ($pegawai as $data) {
            DB::table('pegawai')->updateOrInsert(
                ['nik' => $data['nik']],
                $data
            );
        }
    }
}