<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Poliklinik;
use App\Models\Bangsal;
use App\Models\SetLokasi;

class SetDepoRalan extends Model
{
    protected $table = 'set_depo_ralan';
    protected $primaryKey = ['kd_poli', 'kd_bangsal'];
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'kd_poli',
        'kd_bangsal'
    ];

    // Override getKeyName untuk composite key
    public function getKeyName()
    {
        return $this->primaryKey;
    }

    // Override getKey untuk composite key
    public function getKey()
    {
        $key = [];
        foreach ($this->getKeyName() as $keyName) {
            $key[$keyName] = $this->getAttribute($keyName);
        }
        return $key;
    }

    // Override setKeysForSaveQuery untuk composite key
    protected function setKeysForSaveQuery($query)
    {
        foreach ($this->getKeyName() as $keyName) {
            $query->where($keyName, '=', $this->getAttribute($keyName));
        }
        return $query;
    }

    // Relasi ke poliklinik
    public function poliklinik()
    {
        return $this->belongsTo(Poliklinik::class, 'kd_poli', 'kd_poli');
    }

    // Relasi ke bangsal (jika ada model Bangsal)
    public function bangsal()
    {
        return $this->belongsTo(Bangsal::class, 'kd_bangsal', 'kd_bangsal');
    }

    // Scope untuk filter berdasarkan poli
    public function scopeByPoli($query, $kdPoli)
    {
        return $query->where('kd_poli', $kdPoli);
    }

    // Method untuk mendapatkan bangsal berdasarkan poli
    public static function getBangsalByPoli($kdPoli)
    {
        // Cek apakah tabel set_depo_ralan memiliki data
        $hasDepoData = static::exists();
        
        if (!$hasDepoData) {
            // Jika tabel set_depo_ralan kosong, ambil semua kd_bangsal dari set_lokasi
            return SetLokasi::getAllBangsal();
        } else {
            // Jika ada data di set_depo_ralan, ambil berdasarkan kd_poli
            $bangsalList = static::where('kd_poli', $kdPoli)->pluck('kd_bangsal');
            
            // Jika kd_poli tidak ditemukan di set_depo_ralan, return empty collection
            return $bangsalList;
        }
    }

    // Method untuk mendapatkan bangsal pertama berdasarkan poli
    public static function getFirstBangsalByPoli($kdPoli)
    {
        // Cek apakah tabel set_depo_ralan memiliki data
        $hasDepoData = static::exists();
        
        if (!$hasDepoData) {
            // Jika tabel set_depo_ralan kosong, ambil bangsal pertama dari set_lokasi
            return SetLokasi::getFirstBangsal();
        } else {
            // Jika ada data di set_depo_ralan, ambil berdasarkan kd_poli
            return static::where('kd_poli', $kdPoli)->value('kd_bangsal');
        }
    }
}