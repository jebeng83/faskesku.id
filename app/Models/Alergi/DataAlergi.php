<?php

namespace App\Models\Alergi;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataAlergi extends Model
{
    use HasFactory;

    protected $table = 'data_alergi';

    protected $primaryKey = 'kd_alergi';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = [
        'kd_alergi',
        'nm_alergi',
        'kode_jenis',
    ];

    protected $casts = [
        'kode_jenis' => 'integer',
    ];

    public function jenis()
    {
        return $this->belongsTo(JenisAlergi::class, 'kode_jenis', 'kode_jenis');
    }
}
