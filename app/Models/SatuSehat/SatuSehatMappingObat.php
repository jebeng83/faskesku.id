<?php

namespace App\Models\SatuSehat;

use App\Models\DataBarang;
use Illuminate\Database\Eloquent\Model;

class SatuSehatMappingObat extends Model
{
    protected $table = 'satu_sehat_mapping_obat';
    protected $primaryKey = 'kode_brng';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'kode_brng',
        'satusehat_id',
        'obat_code',
        'obat_system',
        'obat_display',
        'form_code',
        'form_system',
        'form_display',
        'numerator_code',
        'numerator_system',
        'denominator_code',
        'denominator_system',
        'route_code',
        'route_system',
        'route_display',
    ];

    public function barang()
    {
        return $this->belongsTo(DataBarang::class, 'kode_brng', 'kode_brng');
    }
}
