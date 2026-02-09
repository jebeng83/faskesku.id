<?php

namespace App\Models\SatuSehat;

use App\Models\Alergi\DataAlergi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SatuSehatMappingAlergi extends Model
{
    use HasFactory;

    protected $table = 'satusehat_mapping_alergi';

    protected $fillable = [
        'alergi_kode',
        'nama_alergi',
        'kfa_code',
        'kfa_display',
        'snomed_code',
        'snomed_display',
        'manifestation_code',
        'manifestation_display',
        'category',
        'criticality',
    ];

    protected function serializeDate(\DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }

    public function dataAlergi()
    {
        return $this->belongsTo(DataAlergi::class, 'alergi_kode', 'kd_alergi');
    }
}
