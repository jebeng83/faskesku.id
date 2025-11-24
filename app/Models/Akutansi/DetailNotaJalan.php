<?php

namespace App\Models\Akutansi;

use Illuminate\Database\Eloquent\Model;

class DetailNotaJalan extends Model
{
    protected $table = 'detail_nota_jalan';
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
        'besarppn' => 'decimal:2',
        'besar_bayar' => 'decimal:2',
    ];

    /**
     * Override getKeyName untuk composite key
     */
    public function getKeyName()
    {
        return $this->primaryKey;
    }

    /**
     * Override setKeysForSaveQuery untuk composite key
     */
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

    /**
     * Override getKeyForSaveQuery untuk composite key
     */
    protected function getKeyForSaveQuery($keyName = null)
    {
        if (is_null($keyName)) {
            $keyName = $this->getKeyName();
        }

        if (isset($this->original[$keyName])) {
            return $this->original[$keyName];
        }

        return $this->getAttribute($keyName);
    }

    /**
     * Relasi ke reg_periksa
     */
    public function regPeriksa()
    {
        return $this->belongsTo(\App\Models\RegPeriksa::class, 'no_rawat', 'no_rawat');
    }

    /**
     * Relasi ke akun_bayar
     */
    public function akunBayar()
    {
        return $this->belongsTo(AkunBayar::class, 'nama_bayar', 'nama_bayar');
    }
}