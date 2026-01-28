<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TriaseUgd extends Model
{
    use HasFactory;

    protected $table = 'triase_ugd';

    protected $primaryKey = 'no_rawat';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = [
        'no_rawat',
        'no_rkm_medis',
        'tanggal',
        'jam',
        'kategori',
        'indikator',
        'keputusan',
        'catatan',
    ];

    protected $casts = [
        'tanggal' => 'date',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'no_rkm_medis', 'no_rkm_medis');
    }
}
