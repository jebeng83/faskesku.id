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

    // Alias untuk scope aktif
    public function scopeActive($query)
    {
        return $this->scopeAktif($query);
    }

    // Scope untuk pencarian
    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('kd_jenis_prw', 'like', "%{$search}%")
                ->orWhere('nm_perawatan', 'like', "%{$search}%");
        });
    }

    // Scope untuk filter berdasarkan poliklinik
    public function scopeByPoliklinik($query, $kdPoli)
    {
        return $query->where('kd_poli', $kdPoli);
    }

    // Scope untuk filter berdasarkan penjamin
    public function scopeByPenjamin($query, $kdPj)
    {
        return $query->where('kd_pj', $kdPj);
    }

    // Scope untuk yang memiliki tarif dokter
    public function scopeHasTarifDokter($query)
    {
        return $query->where('tarif_tindakandr', '>', 0);
    }

    // Scope untuk yang memiliki tarif perawat
    public function scopeHasTarifPerawat($query)
    {
        return $query->where('tarif_tindakanpr', '>', 0);
    }

    // Scope untuk yang memiliki tarif dokter dan perawat
    public function scopeHasTarifDokterPerawat($query)
    {
        return $query->where('tarif_tindakandr', '>', 0)
                    ->where('tarif_tindakanpr', '>', 0);
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

    // Alias untuk relasi penjamin
    public function penjamin()
    {
        return $this->penjab();
    }

    // Relasi dengan kategori perawatan
    public function kategoriPerawatan()
    {
        return $this->belongsTo(KategoriPerawatan::class, 'kd_kategori', 'kd_kategori');
    }

    // Alias untuk relasi kategori
    public function kategori()
    {
        return $this->kategoriPerawatan();
    }

    // Method untuk generate kode otomatis
    public static function generateKodeJenisPerawatan($kdKategori)
    {
        // Ambil semua kode dengan format RJ
        $codes = self::where('kd_jenis_prw', 'like', 'RJ%')
            ->pluck('kd_jenis_prw')
            ->toArray();

        $maxNumber = 0;
        
        // Loop through all codes to find the highest numeric value
        foreach ($codes as $code) {
            // Extract numeric part after 'RJ', remove any non-numeric characters
            $numericPart = preg_replace('/[^0-9]/', '', substr($code, 2));
            if (!empty($numericPart)) {
                $number = (int) $numericPart;
                if ($number > $maxNumber) {
                    $maxNumber = $number;
                }
            }
        }

        // Increment by 1
        $newNumber = $maxNumber + 1;

        // Format: RJ + nomor urut (6 digit)
        return 'RJ' . str_pad($newNumber, 6, '0', STR_PAD_LEFT);
    }
}