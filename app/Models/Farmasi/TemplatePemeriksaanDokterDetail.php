<?php

namespace App\Models\Farmasi;

use Illuminate\Database\Eloquent\Model;

class TemplatePemeriksaanDokterDetail extends Model
{
    protected $table = 'template_pemeriksaan_dokter_detail';
    protected $primaryKey = 'no_template';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'no_template',
        'nm_template',
        'suhu',
        'tensi',
        'nadi',
        'respirasi',
        'spo2',
        'tinggi',
        'berat',
        'gcs',
        'lingkar_perut',
        'created_at',
    ];
}
