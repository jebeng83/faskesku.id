<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PermintaanPemeriksaanRadiologi extends Model
{
    use HasFactory;

    protected $table = 'permintaan_pemeriksaan_radiologi';
    
    // Composite primary key
    protected $primaryKey = ['noorder', 'kd_jenis_prw'];
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'noorder',
        'kd_jenis_prw',
        'stts_bayar'
    ];

    protected $casts = [
        'stts_bayar' => 'string'
    ];

    /**
     * Override getKeyName for composite primary key
     */
    public function getKeyName()
    {
        return $this->primaryKey;
    }

    /**
     * Override getKey for composite primary key
     */
    public function getKey()
    {
        $key = [];
        if (is_array($this->primaryKey)) {
            foreach ($this->primaryKey as $keyName) {
                $key[$keyName] = $this->getAttribute($keyName);
            }
        } else {
            $key = $this->getAttribute($this->primaryKey);
        }
        return $key;
    }

    /**
     * Override setKeysForSaveQuery for composite primary key
     */
    protected function setKeysForSaveQuery($query)
    {
        if (is_array($this->primaryKey)) {
            foreach ($this->primaryKey as $keyName) {
                $query->where($keyName, $this->getAttribute($keyName));
            }
        } else {
            $query->where($this->primaryKey, $this->getAttribute($this->primaryKey));
        }
        return $query;
    }

    /**
     * Relasi ke PermintaanRadiologi
     */
    public function permintaanRadiologi()
    {
        return $this->belongsTo(PermintaanRadiologi::class, 'noorder', 'noorder');
    }

    /**
     * Relasi ke JnsPerawatanRadiologi
     */
    public function jnsPerawatanRadiologi()
    {
        return $this->belongsTo(JnsPerawatanRadiologi::class, 'kd_jenis_prw', 'kd_jenis_prw');
    }

    /**
     * Alias untuk relasi ke JnsPerawatanRadiologi
     */
    public function jenisPerawatan()
    {
        return $this->belongsTo(JnsPerawatanRadiologi::class, 'kd_jenis_prw', 'kd_jenis_prw');
    }

    /**
     * Scope untuk filter berdasarkan status bayar
     */
    public function scopeByStatusBayar($query, $status)
    {
        return $query->where('stts_bayar', $status);
    }

    /**
     * Scope untuk filter berdasarkan noorder
     */
    public function scopeByNoOrder($query, $noorder)
    {
        return $query->where('noorder', $noorder);
    }

    /**
     * Get nama pemeriksaan
     */
    public function getNamaPemeriksaanAttribute()
    {
        if ($this->jnsPerawatanRadiologi) {
            return $this->jnsPerawatanRadiologi->nm_perawatan;
        }
        
        return 'N/A';
    }

    /**
     * Get total biaya
     */
    public function getTotalBiayaAttribute()
    {
        if ($this->jnsPerawatanRadiologi) {
            return $this->jnsPerawatanRadiologi->total_byr;
        }
        
        return 0;
    }
}