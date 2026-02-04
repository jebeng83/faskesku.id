<?php

namespace App\Models\Farmasi;

use Illuminate\Database\Eloquent\Model;

class TemplateRacikan extends Model
{
    protected $table = 'template_pemeriksaan_dokter_resep_racikan';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'no_template',
        'no_racik',
        'nama_racik',
        'kd_racik',
        'jml_dr',
        'aturan_pakai',
        'keterangan'
    ];

    public function template()
    {
        return $this->belongsTo(TemplatePemeriksaanDokter::class, 'no_template', 'no_template');
    }

    public function detail()
    {
        return $this->hasMany(TemplateRacikanDetail::class, 'no_template', 'no_template')
                    ->where('no_racik', $this->no_racik);
    }

    public function metode()
    {
        return $this->belongsTo(\App\Models\MetodeRacik::class, 'kd_racik', 'kd_racik');
    }
}
