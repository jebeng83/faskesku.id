<?php

namespace App\Models\RawatJalan;

use Illuminate\Database\Eloquent\Model;

class TemplatePemeriksaanDokter extends Model
{
    protected $table = 'template_pemeriksaan_dokter';
    protected $primaryKey = 'no_template';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'no_template',
        'kd_dokter',
        'keluhan',
        'pemeriksaan',
        'penilaian',
        'rencana',
        'instruksi',
        'evaluasi'
    ];
}

