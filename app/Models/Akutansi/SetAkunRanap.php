<?php

namespace App\Models\Akutansi;

use Illuminate\Database\Eloquent\Model;

/**
 * Model wrapper untuk tabel `set_akun_ranap` (COA mapping layanan Rawat Inap).
 * Tabel ini 1 baris, gunakan DB::table() untuk update.
 */
class SetAkunRanap extends Model
{
    protected $table = 'set_akun_ranap';

    public $timestamps = false;

    public $incrementing = false;

    protected $primaryKey = 'id';

    protected $fillable = [
        'Suspen_Piutang_Tindakan_Ranap',
        'Tindakan_Ranap',
        'Beban_Jasa_Medik_Dokter_Tindakan_Ranap',
        'Utang_Jasa_Medik_Dokter_Tindakan_Ranap',
        'Beban_Jasa_Medik_Paramedis_Tindakan_Ranap',
        'Utang_Jasa_Medik_Paramedis_Tindakan_Ranap',
        'Beban_KSO_Tindakan_Ranap',
        'Utang_KSO_Tindakan_Ranap',
        'Beban_Jasa_Sarana_Tindakan_Ranap',
        'Utang_Jasa_Sarana_Tindakan_Ranap',
        'Beban_Jasa_Menejemen_Tindakan_Ranap',
        'Utang_Jasa_Menejemen_Tindakan_Ranap',
        'HPP_BHP_Tindakan_Ranap',
        'Persediaan_BHP_Tindakan_Ranap',

        'Suspen_Piutang_Laborat_Ranap',
        'Laborat_Ranap',
        'Beban_Jasa_Medik_Dokter_Laborat_Ranap',
        'Utang_Jasa_Medik_Dokter_Laborat_Ranap',
        'Beban_Jasa_Medik_Petugas_Laborat_Ranap',
        'Utang_Jasa_Medik_Petugas_Laborat_Ranap',
        'Beban_Kso_Laborat_Ranap',
        'Utang_Kso_Laborat_Ranap',
        'HPP_Persediaan_Laborat_Rawat_inap',
        'Persediaan_BHP_Laborat_Rawat_Inap',
        'Beban_Jasa_Sarana_Laborat_Ranap',
        'Utang_Jasa_Sarana_Laborat_Ranap',
        'Beban_Jasa_Perujuk_Laborat_Ranap',
        'Utang_Jasa_Perujuk_Laborat_Ranap',
        'Beban_Jasa_Menejemen_Laborat_Ranap',
        'Utang_Jasa_Menejemen_Laborat_Ranap',

        'Suspen_Piutang_Radiologi_Ranap',
        'Radiologi_Ranap',
        'Beban_Jasa_Medik_Dokter_Radiologi_Ranap',
        'Utang_Jasa_Medik_Dokter_Radiologi_Ranap',
        'Beban_Jasa_Medik_Petugas_Radiologi_Ranap',
        'Utang_Jasa_Medik_Petugas_Radiologi_Ranap',
        'Beban_Kso_Radiologi_Ranap',
        'Utang_Kso_Radiologi_Ranap',
        'HPP_Persediaan_Radiologi_Rawat_Inap',
        'Persediaan_BHP_Radiologi_Rawat_Inap',
        'Beban_Jasa_Sarana_Radiologi_Ranap',
        'Utang_Jasa_Sarana_Radiologi_Ranap',
        'Beban_Jasa_Perujuk_Radiologi_Ranap',
        'Utang_Jasa_Perujuk_Radiologi_Ranap',
        'Beban_Jasa_Menejemen_Radiologi_Ranap',
        'Utang_Jasa_Menejemen_Radiologi_Ranap',

        'Suspen_Piutang_Obat_Ranap',
        'Obat_Ranap',
        'HPP_Obat_Rawat_Inap',
        'Persediaan_Obat_Rawat_Inap',
        'Registrasi_Ranap',
        'Service_Ranap',
        'Tambahan_Ranap',
        'Potongan_Ranap',
        'Retur_Obat_Ranap',
        'Resep_Pulang_Ranap',
        'Kamar_Inap',

        'Suspen_Piutang_Operasi_Ranap',
        'Operasi_Ranap',
        'Beban_Jasa_Medik_Dokter_Operasi_Ranap',
        'Utang_Jasa_Medik_Dokter_Operasi_Ranap',
        'Beban_Jasa_Medik_Paramedis_Operasi_Ranap',
        'Utang_Jasa_Medik_Paramedis_Operasi_Ranap',
        'HPP_Obat_Operasi_Ranap',
    ];
}
