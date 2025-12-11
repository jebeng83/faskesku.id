<?php

namespace App\Models\Akutansi;

use App\Models\Patient;
use App\Models\RegPeriksa;
use Illuminate\Database\Eloquent\Model;

class BayarPiutang extends Model
{
    protected $table = 'bayar_piutang';

    protected $primaryKey = ['tgl_bayar', 'no_rkm_medis', 'no_rawat', 'kd_rek', 'kd_rek_kontra'];

    public $incrementing = false;

    public $timestamps = false;

    protected $fillable = [
        'tgl_bayar',
        'no_rkm_medis',
        'besar_cicilan',
        'catatan',
        'no_rawat',
        'kd_rek',
        'kd_rek_kontra',
        'diskon_piutang',
        'kd_rek_diskon_piutang',
        'tidak_terbayar',
        'kd_rek_tidak_terbayar',
    ];

    protected $casts = [
        'tgl_bayar' => 'date',
        'besar_cicilan' => 'float',
        'diskon_piutang' => 'float',
        'tidak_terbayar' => 'float',
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
        if (! is_array($keys)) {
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
     * Relasi ke Patient
     */
    public function patient()
    {
        return $this->belongsTo(Patient::class, 'no_rkm_medis', 'no_rkm_medis');
    }

    /**
     * Relasi ke RegPeriksa
     */
    public function regPeriksa()
    {
        return $this->belongsTo(RegPeriksa::class, 'no_rawat', 'no_rawat');
    }

    /**
     * Relasi ke Rekening (debet)
     */
    public function rekening()
    {
        return $this->belongsTo(Rekening::class, 'kd_rek', 'kd_rek');
    }

    /**
     * Relasi ke Rekening (kredit)
     */
    public function rekeningKontra()
    {
        return $this->belongsTo(Rekening::class, 'kd_rek_kontra', 'kd_rek');
    }

    /**
     * Relasi ke Rekening (diskon)
     */
    public function rekeningDiskon()
    {
        return $this->belongsTo(Rekening::class, 'kd_rek_diskon_piutang', 'kd_rek');
    }

    /**
     * Relasi ke Rekening (tidak terbayar)
     */
    public function rekeningTidakTerbayar()
    {
        return $this->belongsTo(Rekening::class, 'kd_rek_tidak_terbayar', 'kd_rek');
    }

    /**
     * Scope untuk filter berdasarkan tanggal
     */
    public function scopeByTanggal($query, $tanggal)
    {
        return $query->where('tgl_bayar', $tanggal);
    }

    /**
     * Scope untuk filter berdasarkan pasien
     */
    public function scopeByPasien($query, $noRkmMedis)
    {
        return $query->where('no_rkm_medis', $noRkmMedis);
    }

    /**
     * Scope untuk filter berdasarkan no_rawat
     */
    public function scopeByNoRawat($query, $noRawat)
    {
        return $query->where('no_rawat', $noRawat);
    }
}
