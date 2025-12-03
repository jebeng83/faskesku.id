<?php

namespace App\Models\Akutansi;

use App\Models\Patient;
use App\Models\RegPeriksa;
use Illuminate\Database\Eloquent\Model;

/**
 * Model untuk tabel piutang_pasien
 */
class PiutangPasien extends Model
{
    protected $table = 'piutang_pasien';

    protected $primaryKey = 'no_rawat';

    public $incrementing = false;

    public $timestamps = false;

    protected $keyType = 'string';

    protected $fillable = [
        'no_rawat',
        'tgl_piutang',
        'no_rkm_medis',
        'status',
        'totalpiutang',
        'uangmuka',
        'sisapiutang',
        'tgltempo',
    ];

    protected $casts = [
        'tgl_piutang' => 'date',
        'tgltempo' => 'date',
        'totalpiutang' => 'float',
        'uangmuka' => 'float',
        'sisapiutang' => 'float',
    ];

    public function regPeriksa()
    {
        return $this->belongsTo(RegPeriksa::class, 'no_rawat', 'no_rawat');
    }

    public function pasien()
    {
        return $this->belongsTo(Patient::class, 'no_rkm_medis', 'no_rkm_medis');
    }
}
