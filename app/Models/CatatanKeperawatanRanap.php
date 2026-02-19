<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CatatanKeperawatanRanap extends Model
{
    use HasFactory;

    protected $table = 'catatan_keperawatan_ranap';
    public $timestamps = false;
    public $incrementing = false;
    protected $primaryKey = ['tanggal', 'jam', 'no_rawat'];
    protected $keyType = 'string';

    protected $fillable = [
        'tanggal',
        'jam',
        'no_rawat',
        'uraian',
        'nip'
    ];

    public function regPeriksa()
    {
        return $this->belongsTo(RegPeriksa::class, 'no_rawat', 'no_rawat');
    }

    public function petugas()
    {
        return $this->belongsTo(Petugas::class, 'nip', 'nip');
    }

    /**
     * Override for composite primary key support.
     */
    protected function setKeysForSaveQuery($query)
    {
        foreach ($this->primaryKey as $key) {
            $query->where($key, '=', $this->getAttribute($key));
        }
        return $query;
    }
}
