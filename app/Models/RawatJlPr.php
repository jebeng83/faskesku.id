<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RawatJlPr extends Model
{
    use HasFactory;

    protected $table = 'rawat_jl_pr';

    protected $primaryKey = ['no_rawat', 'kd_jenis_prw', 'nip', 'tgl_perawatan', 'jam_rawat'];

    public $incrementing = false;

    public $timestamps = false;

    protected $fillable = [
        'no_rawat',
        'kd_jenis_prw',
        'nip',
        'tgl_perawatan',
        'jam_rawat',
        'material',
        'bhp',
        'tarif_tindakanpr',
        'kso',
        'menejemen',
        'biaya_rawat',
        'stts_bayar',
    ];

    protected $casts = [
        'tgl_perawatan' => 'date',
        'material' => 'decimal:2',
        'bhp' => 'decimal:2',
        'tarif_tindakanpr' => 'decimal:2',
        'kso' => 'decimal:2',
        'menejemen' => 'decimal:2',
        'biaya_rawat' => 'decimal:2',
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
     * Relasi ke reg_periksa
     */
    public function regPeriksa()
    {
        return $this->belongsTo(RegPeriksa::class, 'no_rawat', 'no_rawat');
    }

    /**
     * Relasi ke jenis perawatan
     */
    public function jenisPerawatan()
    {
        return $this->belongsTo(JnsPerawatan::class, 'kd_jenis_prw', 'kd_jenis_prw');
    }

    /**
     * Relasi ke perawat (employee)
     */
    public function perawat()
    {
        return $this->belongsTo(Employee::class, 'nip', 'nik');
    }

    /**
     * Scope untuk filter berdasarkan tanggal
     */
    public function scopeByTanggal($query, $tanggal)
    {
        return $query->where('tgl_perawatan', $tanggal);
    }

    /**
     * Scope untuk filter berdasarkan status bayar
     */
    public function scopeByStatusBayar($query, $status)
    {
        return $query->where('stts_bayar', $status);
    }

    /**
     * Accessor untuk total biaya
     */
    public function getTotalBiayaAttribute()
    {
        return $this->material + $this->bhp + $this->tarif_tindakanpr + $this->kso + $this->menejemen;
    }
}
