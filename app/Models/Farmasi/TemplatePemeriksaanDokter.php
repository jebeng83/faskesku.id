<?php

namespace App\Models\Farmasi;

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

    public function racikan()
    {
        return $this->hasMany(TemplateRacikan::class, 'no_template', 'no_template');
    }

    public function resep()
    {
        return $this->hasMany(TemplateResep::class, 'no_template', 'no_template');
    }
}
