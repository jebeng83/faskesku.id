<?php

namespace App\Models\Odontogram;

use Illuminate\Database\Eloquent\Model;
use App\Models\RegPeriksa;
use App\Models\JnsPerawatan;
use App\Models\Penyakit;

class Odontogram extends Model
{
    protected $table = 'odontogram';
    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = false;
    protected $fillable = [
        'no_rawat',
        'no_rkm_medis',
        'tanggal',
        'elemen_gigi',
        'id_kondisi_gigi',
        'kd_penyakit',
        'kd_jns_prw',
        'status',
    ];

    protected $casts = [
        'tanggal' => 'date',
    ];

    public function kondisiGigi()
    {
        return $this->belongsTo(KondisiGigi::class, 'id_kondisi_gigi', 'id');
    }

    public function regPeriksaByRawat()
    {
        return $this->belongsTo(RegPeriksa::class, 'no_rawat', 'no_rawat');
    }

    public function regPeriksaByPasien()
    {
        return $this->belongsTo(RegPeriksa::class, 'no_rkm_medis', 'no_rkm_medis');
    }

    public function penyakit()
    {
        return $this->belongsTo(Penyakit::class, 'kd_penyakit', 'kd_penyakit');
    }

    public function jenisPerawatan()
    {
        return $this->belongsTo(JnsPerawatan::class, 'kd_jns_prw', 'kd_jenis_prw');
    }
}
