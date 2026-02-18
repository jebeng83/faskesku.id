<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CatatanObservasiRanap extends Model
{
    use HasFactory;

    protected $table = 'catatan_observasi_ranap';
    public $timestamps = false;
    public $incrementing = false;
    protected $primaryKey = ['no_rawat', 'tgl_perawatan', 'jam_rawat'];

    protected $fillable = [
        'no_rawat',
        'tgl_perawatan',
        'jam_rawat',
        'gcs',
        'td',
        'hr',
        'rr',
        'suhu',
        'spo2',
        'nip'
    ];

    /**
     * Relationship to registration
     */
    public function regPeriksa()
    {
        return $this->belongsTo(RegPeriksa::class, 'no_rawat', 'no_rawat');
    }

    /**
     * Relationship to staff
     */
    public function petugas()
    {
        return $this->belongsTo(Petugas::class, 'nip', 'nip');
    }

    /**
     * Override for composite primary key support in some cases
     * Though Laravel doesn't fully support composite keys, this helps.
     */
    protected function setKeysForSaveQuery($query)
    {
        foreach ($this->primaryKey as $key) {
            $query->where($key, '=', $this->getAttribute($key));
        }
        return $query;
    }
}
