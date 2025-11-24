<?php

namespace App\Models\Akutansi;

use Illuminate\Database\Eloquent\Model;
use App\Models\RegPeriksa;
use App\Models\Penjab;

/**
 * Model untuk tabel detail_piutang_pasien
 * PK komposit: no_rawat + nama_bayar
 */
class DetailPiutangPasien extends Model
{
    protected $table = 'detail_piutang_pasien';
    protected $primaryKey = ['no_rawat', 'nama_bayar'];
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'no_rawat',
        'nama_bayar',
        'kd_pj',
        'totalpiutang',
        'sisapiutang',
        'tgltempo',
    ];

    protected $casts = [
        'totalpiutang' => 'float',
        'sisapiutang' => 'float',
        'tgltempo' => 'date',
    ];

    public function regPeriksa()
    {
        return $this->belongsTo(RegPeriksa::class, 'no_rawat', 'no_rawat');
    }

    public function akunPiutang()
    {
        return $this->belongsTo(AkunPiutang::class, 'nama_bayar', 'nama_bayar');
    }

    public function penjab()
    {
        return $this->belongsTo(Penjab::class, 'kd_pj', 'kd_pj');
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