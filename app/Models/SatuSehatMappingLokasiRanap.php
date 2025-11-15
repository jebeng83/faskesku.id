<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SatuSehatMappingLokasiRanap extends Model
{
    protected $table = 'satu_sehat_mapping_lokasi_ranap';
    protected $primaryKey = 'kd_kamar';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'kd_kamar',
        'id_organisasi_satusehat',
        'id_lokasi_satusehat',
        'longitude',
        'latitude',
        'altittude',
    ];

    public $timestamps = false;
}