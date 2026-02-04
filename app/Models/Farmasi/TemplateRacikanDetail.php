<?php

namespace App\Models\Farmasi;

use App\Models\DataBarang;
use Illuminate\Database\Eloquent\Model;

class TemplateRacikanDetail extends Model
{
    protected $table = 'template_pemeriksaan_dokter_resep_racikan_detail';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'no_template',
        'no_racik',
        'kode_brng',
        'p1',
        'p2',
        'kandungan',
        'jml'
    ];

    public function template()
    {
        return $this->belongsTo(TemplatePemeriksaanDokter::class, 'no_template', 'no_template');
    }

    public function barang()
    {
        return $this->belongsTo(DataBarang::class, 'kode_brng', 'kode_brng');
    }
}
