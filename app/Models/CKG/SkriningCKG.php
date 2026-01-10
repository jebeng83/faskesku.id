<?php

namespace App\Models\CKG;

use App\Models\Kelurahan;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class SkriningCKG extends Model
{
    protected $table = 'skrining_pkg';

    public $timestamps = true;

    protected $primaryKey = 'id_pkg';

    public $incrementing = true;

    protected $keyType = 'int';

    protected $fillable = [
        'nik',
        'nama_lengkap',
        'tanggal_lahir',
        'umur',
        'jenis_kelamin',
        'no_handphone',
        'nik_wali',
        'nama_wali',
        'tanggal_lahir_wali',
        'jenis_kelamin_wali',
        'no_rkm_medis',
        'tanggal_skrining',
        'status_perkawinan',
        'rencana_menikah',
        'status_hamil',
        'status_disabilitas',
        'minat',
        'sedih',
        'cemas',
        'khawatir',
        'frekuensi_olahraga',
        'durasi_olahraga',
        'status_merokok',
        'lama_merokok',
        'jumlah_rokok',
        'paparan_asap',
        'riwayat_hipertensi',
        'riwayat_diabetes',
        'riwayat_hepatitis',
        'riwayat_kuning',
        'riwayat_transfusi',
        'riwayat_tattoo',
        'riwayat_tindik',
        'narkoba_suntik',
        'odhiv',
        'kolesterol',
        'hubungan_intim',
        'riwayat_merokok',
        'demam',
        'napas_pendek',
        'dahak',
        'batuk',
        'spirometri',
        'tinggi_badan',
        'berat_badan',
        'lingkar_perut',
        'tekanan_sistolik',
        'tekanan_diastolik',
        'gds',
        'gdp',
        'kolesterol_lab',
        'trigliserida',
        'pendengaran',
        'penglihatan',
        'hasil_tes_dengar',
        'hasil_tes_lihat',
        'karies',
        'hilang',
        'goyang',
        'status',
        'id_petugas_entri',
        'kunjungan_sehat',
        'keluhan_lain',
        'bab',
        'bak',
        'membersihkan_diri',
        'penggunaan_jamban',
        'makan_minum',
        'berubah_sikap',
        'berpindah',
        'memakai_baju',
        'naik_tangga',
        'mandi',
        'total_skor_barthel',
        'tingkat_ketergantungan',
        'sering_lapar',
        'sering_haus',
        'sering_pipis',
        'sering_mengompol',
        'berat_turun',
        'riwayat_diabetes_ortu',
        'status_disabilitas_anak',
        'gangguan_emosi',
        'hiperaktif',
        'riwayat_keluarga',
        'pembawa_sifat',
        'batuk_lama',
        'berat_turun_tbc',
        'berat_tidak_naik',
        'nafsu_makan_berkurang',
        'kontak_tbc',
        'berat_badan_balita',
        'tinggi_badan_balita',
        'status_gizi_bb_u',
        'status_gizi_pb_u',
        'status_gizi_bb_pb',
        'hasil_imt_u',
        'gangguan_pertumbuhan',
        'hasil_kpsp',
        'status_lingkar_kepala',
        'kd_kel',
        'kode_posyandu',
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
        'tanggal_lahir_wali' => 'date',
        'tanggal_skrining' => 'date',
        'umur' => 'integer',
        'lama_merokok' => 'integer',
        'jumlah_rokok' => 'integer',
        'tekanan_sistolik' => 'integer',
        'tekanan_diastolik' => 'integer',
        'tinggi_badan' => 'decimal:1',
        'berat_badan' => 'decimal:1',
        'lingkar_perut' => 'decimal:1',
        'gds' => 'decimal:1',
        'gdp' => 'decimal:1',
        'kolesterol_lab' => 'decimal:1',
        'trigliserida' => 'decimal:1',
        'total_skor_barthel' => 'integer',
        'berat_badan_balita' => 'decimal:2',
        'tinggi_badan_balita' => 'integer',
        'kd_kel' => 'integer',
        'id_petugas_entri' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'no_rkm_medis', 'no_rkm_medis');
    }

    public function kelurahan()
    {
        return $this->belongsTo(Kelurahan::class, 'kd_kel', 'kd_kel');
    }

    public function petugasEntri()
    {
        return $this->belongsTo(User::class, 'id_petugas_entri', 'id');
    }
}
