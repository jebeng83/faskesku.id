<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SkriningVisual extends Model
{
    use HasFactory;

    protected $table = 'skrining_visual';

    protected $primaryKey = 'no_rkm_medis';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = [
        'no_rkm_medis',
        'tanggal',
        'jam',
        'hasil_skrining',
        'skrining_resiko_jatuh',
        'skor_resiko_jatuh',
        'keputusan',
    ];

    protected $casts = [
        'tanggal' => 'date',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'no_rkm_medis', 'no_rkm_medis');
    }
}
