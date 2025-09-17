<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JnsPerawatan extends Model
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
        'material' => 'decimal:2',
        'bhp' => 'decimal:2',
        'tarif_tindakandr' => 'decimal:2',
        'tarif_tindakanpr' => 'decimal:2',
        'kso' => 'decimal:2',
        'menejemen' => 'decimal:2',
        'total_byrdr' => 'decimal:2',
        'total_byrpr' => 'decimal:2',
        'total_byrdrpr' => 'decimal:2',
    ];

    // Accessor untuk format mata uang
    public function getTotalByrdrFormattedAttribute()
    {
        return 'Rp ' . number_format($this->total_byrdr, 0, ',', '.');
    }

    public function getTotalByrprFormattedAttribute()
    {
        return 'Rp ' . number_format($this->total_byrpr, 0, ',', '.');
    }

    public function getTotalByrdrprFormattedAttribute()
    {
        return 'Rp ' . number_format($this->total_byrdrpr, 0, ',', '.');
    }

    // Scope untuk status aktif
    public function scopeAktif($query)
    {
        return $query->where('status', '1');
    }

    // Scope untuk pencarian
    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('kd_jenis_prw', 'like', "%{$search}%")
                ->orWhere('nm_perawatan', 'like', "%{$search}%");
        });
    }

    // Relasi dengan poliklinik
    public function poliklinik()
    {
        return $this->belongsTo(Poliklinik::class, 'kd_poli', 'kd_poli');
    }

    // Relasi dengan penjab
    public function penjab()
    {
        return $this->belongsTo(Penjab::class, 'kd_pj', 'kd_pj');
    }
}