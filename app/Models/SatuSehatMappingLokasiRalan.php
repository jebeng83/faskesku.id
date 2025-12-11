<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SatuSehatMappingLokasiRalan extends Model
{
    protected $table = 'satu_sehat_mapping_lokasi_ralan';

    protected $primaryKey = 'kd_poli';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = [
        'kd_poli',
        'id_organisasi_satusehat',
        'id_lokasi_satusehat',
        'longitude',
        'latitude',
        'altittude',
    ];

    public function poliklinik()
    {
        return $this->belongsTo(Poliklinik::class, 'kd_poli', 'kd_poli');
    }
}
