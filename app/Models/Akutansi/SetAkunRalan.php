<?php

namespace App\Models\Akutansi;

use Illuminate\Database\Eloquent\Model;

/**
 * Model wrapper untuk tabel `set_akun_ralan` (COA mapping layanan Rawat Jalan).
 * Tabel ini didesain 1 baris, gunakan DB::table() untuk update massal.
 */
class SetAkunRalan extends Model
{
    protected $table = 'set_akun_ralan';
    public $timestamps = false;
    public $incrementing = false;
    protected $primaryKey = 'id';

    protected $fillable = [
        'Suspen_Piutang_Tindakan_Ralan',
        'Tindakan_Ralan',
        'Beban_Jasa_Medik_Dokter_Tindakan_Ralan',
        'Utang_Jasa_Medik_Dokter_Tindakan_Ralan',
        'Beban_Jasa_Medik_Paramedis_Tindakan_Ralan',
        'Utang_Jasa_Medik_Paramedis_Tindakan_Ralan',
        'Beban_KSO_Tindakan_Ralan',
        'Utang_KSO_Tindakan_Ralan',
        'Beban_Jasa_Sarana_Tindakan_Ralan',
        'Utang_Jasa_Sarana_Tindakan_Ralan',
        'HPP_BHP_Tindakan_Ralan',
        'Persediaan_BHP_Tindakan_Ralan',
        'Beban_Jasa_Menejemen_Tindakan_Ralan',
        'Utang_Jasa_Menejemen_Tindakan_Ralan',

        'Suspen_Piutang_Laborat_Ralan',
        'Laborat_Ralan',
        'Beban_Jasa_Medik_Dokter_Laborat_Ralan',
        'Utang_Jasa_Medik_Dokter_Laborat_Ralan',
        'Beban_Jasa_Medik_Petugas_Laborat_Ralan',
        'Utang_Jasa_Medik_Petugas_Laborat_Ralan',
        'Beban_Kso_Laborat_Ralan',
        'Utang_Kso_Laborat_Ralan',
        'HPP_Persediaan_Laborat_Rawat_Jalan',
        'Persediaan_BHP_Laborat_Rawat_Jalan',
        'Beban_Jasa_Sarana_Laborat_Ralan',
        'Utang_Jasa_Sarana_Laborat_Ralan',
        'Beban_Jasa_Perujuk_Laborat_Ralan',
        'Utang_Jasa_Perujuk_Laborat_Ralan',
        'Beban_Jasa_Menejemen_Laborat_Ralan',
        'Utang_Jasa_Menejemen_Laborat_Ralan',

        'Suspen_Piutang_Radiologi_Ralan',
        'Radiologi_Ralan',
        'Beban_Jasa_Medik_Dokter_Radiologi_Ralan',
        'Utang_Jasa_Medik_Dokter_Radiologi_Ralan',
        'Beban_Jasa_Medik_Petugas_Radiologi_Ralan',
        'Utang_Jasa_Medik_Petugas_Radiologi_Ralan',
        'Beban_Kso_Radiologi_Ralan',
        'Utang_Kso_Radiologi_Ralan',
        'HPP_Persediaan_Radiologi_Rawat_Jalan',
        'Persediaan_BHP_Radiologi_Rawat_Jalan',
        'Beban_Jasa_Sarana_Radiologi_Ralan',
        'Utang_Jasa_Sarana_Radiologi_Ralan',
        'Beban_Jasa_Perujuk_Radiologi_Ralan',
        'Utang_Jasa_Perujuk_Radiologi_Ralan',
        'Beban_Jasa_Menejemen_Radiologi_Ralan',
        'Utang_Jasa_Menejemen_Radiologi_Ralan',

        'Suspen_Piutang_Obat_Ralan',
        'Obat_Ralan',
        'HPP_Obat_Rawat_Jalan',
        'Persediaan_Obat_Rawat_Jalan',
        'Registrasi_Ralan',


        'Suspen_Piutang_Operasi_Ralan',
        'Operasi_Ralan',
        'Beban_Jasa_Medik_Dokter_Operasi_Ralan',
        'Utang_Jasa_Medik_Dokter_Operasi_Ralan',
        'Beban_Jasa_Medik_Paramedis_Operasi_Ralan',
        'Utang_Jasa_Medik_Paramedis_Operasi_Ralan',
        'HPP_Obat_Operasi_Ralan',
        'Persediaan_Obat_Kamar_Operasi_Ralan',

        'Tambahan_Ralan',
        'Potongan_Ralan',
    ];
}
