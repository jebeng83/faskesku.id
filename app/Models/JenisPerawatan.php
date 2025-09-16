<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JenisPerawatan extends Model
{
    use HasFactory;

    protected $table = 'jns_perawatan';
    protected $primaryKey = 'kd_jenis_prw';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'kd_jenis_prw',
        'nm_perawatan',
        'kd_kategori',
        'material',
        'bhp',
        'tarif_tindakandr',
        'tarif_tindakanpr',
        'kso',
        'menejemen',
        'total_byrdr',
        'total_byrpr',
        'total_byrdrpr',
        'kd_pj',
        'kd_poli',
        'status'
    ];

    protected $casts = [
        'material' => 'double',
        'bhp' => 'double',
        'tarif_tindakandr' => 'double',
        'tarif_tindakanpr' => 'double',
        'kso' => 'double',
        'menejemen' => 'double',
        'total_byrdr' => 'double',
        'total_byrpr' => 'double',
        'total_byrdrpr' => 'double',
        'status' => 'string'
    ];

    /**
     * Scope untuk filter berdasarkan kategori
     */
    public function scopeByKategori($query, $kategori)
    {
        if ($kategori) {
            return $query->where('kd_kategori', $kategori);
        }
        return $query;
    }

    /**
     * Scope untuk filter berdasarkan status
     */
    public function scopeByStatus($query, $status)
    {
        if ($status !== null && $status !== '') {
            return $query->where('status', $status);
        }
        return $query;
    }

    /**
     * Scope untuk pencarian
     */
    public function scopeSearch($query, $search)
    {
        if ($search) {
            return $query->where(function ($q) use ($search) {
                $q->where('kd_jenis_prw', 'like', "%{$search}%")
                  ->orWhere('nm_perawatan', 'like', "%{$search}%");
            });
        }
        return $query;
    }

    /**
     * Scope untuk filter berdasarkan penjab
     */
    public function scopeByPenjab($query, $kd_pj)
    {
        if ($kd_pj) {
            return $query->where('kd_pj', $kd_pj);
        }
        return $query;
    }

    /**
     * Scope untuk filter berdasarkan poliklinik
     */
    public function scopeByPoliklinik($query, $kd_poli)
    {
        if ($kd_poli) {
            return $query->where('kd_poli', $kd_poli);
        }
        return $query;
    }

    /**
     * Relasi dengan kategori perawatan
     */
    public function kategori()
    {
        return $this->belongsTo(KategoriPerawatan::class, 'kd_kategori', 'kd_kategori');
    }

    /**
     * Relasi dengan penjab
     */
    public function penjab()
    {
        return $this->belongsTo(Penjab::class, 'kd_pj', 'kd_pj');
    }

    /**
     * Relasi dengan poliklinik
     */
    public function poliklinik()
    {
        return $this->belongsTo(Poliklinik::class, 'kd_poli', 'kd_poli');
    }

    /**
     * Accessor untuk format mata uang material
     */
    public function getMaterialFormattedAttribute()
    {
        return 'Rp ' . number_format($this->material, 0, ',', '.');
    }

    /**
     * Accessor untuk format mata uang BHP
     */
    public function getBhpFormattedAttribute()
    {
        return 'Rp ' . number_format($this->bhp, 0, ',', '.');
    }

    /**
     * Accessor untuk format mata uang tarif tindakan dokter
     */
    public function getTarifTindakandrFormattedAttribute()
    {
        return 'Rp ' . number_format($this->tarif_tindakandr, 0, ',', '.');
    }

    /**
     * Accessor untuk format mata uang tarif tindakan perawat
     */
    public function getTarifTindakanprFormattedAttribute()
    {
        return 'Rp ' . number_format($this->tarif_tindakanpr, 0, ',', '.');
    }

    /**
     * Accessor untuk format mata uang KSO
     */
    public function getKsoFormattedAttribute()
    {
        return 'Rp ' . number_format($this->kso, 0, ',', '.');
    }

    /**
     * Accessor untuk format mata uang menejemen
     */
    public function getMenejemenFormattedAttribute()
    {
        return 'Rp ' . number_format($this->menejemen, 0, ',', '.');
    }

    /**
     * Accessor untuk format mata uang total biaya dokter
     */
    public function getTotalByrdrFormattedAttribute()
    {
        return 'Rp ' . number_format($this->total_byrdr, 0, ',', '.');
    }

    /**
     * Accessor untuk format mata uang total biaya perawat
     */
    public function getTotalByrprFormattedAttribute()
    {
        return 'Rp ' . number_format($this->total_byrpr, 0, ',', '.');
    }

    /**
     * Accessor untuk format mata uang total biaya dokter + perawat
     */
    public function getTotalByrdrprFormattedAttribute()
    {
        return 'Rp ' . number_format($this->total_byrdrpr, 0, ',', '.');
    }

    /**
     * Accessor untuk status label
     */
    public function getStatusLabelAttribute()
    {
        return $this->status === '1' ? 'Aktif' : 'Nonaktif';
    }

    /**
     * Generate kode jenis perawatan otomatis
     */
    public static function generateKodeJenisPerawatan()
    {
        $lastRecord = self::orderBy('kd_jenis_prw', 'desc')->first();
        
        if (!$lastRecord) {
            return 'JP001';
        }

        $lastNumber = (int) substr($lastRecord->kd_jenis_prw, 2);
        $newNumber = $lastNumber + 1;
        
        return 'JP' . str_pad($newNumber, 3, '0', STR_PAD_LEFT);
    }
}