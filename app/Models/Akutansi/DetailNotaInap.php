<?php

namespace App\Models\Akutansi;

use Illuminate\Database\Eloquent\Model;
use App\Models\RegPeriksa;

/**
 * Model untuk tabel detail_nota_inap
 * PK komposit: no_rawat + nama_bayar
 */
class DetailNotaInap extends Model
{
    protected $table = 'detail_nota_inap';
    protected $primaryKey = ['no_rawat', 'nama_bayar'];
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'no_rawat',
        'nama_bayar',
        'besarppn',
        'besar_bayar',
    ];

    protected $casts = [
        'besarppn' => 'float',
        'besar_bayar' => 'float',
    ];

    public function regPeriksa()
    {
        return $this->belongsTo(RegPeriksa::class, 'no_rawat', 'no_rawat');
    }

    public function akunBayar()
    {
        return $this->belongsTo(AkunBayar::class, 'nama_bayar', 'nama_bayar');
    }

    // Override untuk composite key
    public function getKeyName()
    {
        return $this->primaryKey;
    }

    protected function setKeysForSaveQuery($query)
    {
        $keys = $this->getKeyName();
        if (!is_array($keys)) {
            return parent::setKeysForSaveQuery($query);
        }
        foreach ($keys as $keyName) {
            $query->where($keyName, '=', $this->getKeyForSaveQuery($keyName));
        }
        return $query;
    }

    protected function getKeyForSaveQuery($keyName = null)
    {
        if ($keyName === null) {
            $keyName = $this->getKeyName();
        }
        if (isset($this->original[$keyName])) {
            return $this->original[$keyName];
        }
        return $this->getAttribute($keyName);
    }
}