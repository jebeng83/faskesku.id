<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JnsPerawatanRadiologi extends Model
{
    use HasFactory;

    protected $table = 'jns_perawatan_radiologi';

    protected $primaryKey = 'kd_jenis_prw';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = [
        'kd_jenis_prw',
        'nm_perawatan',
        'bagian_rs',
        'bhp',
        'tarif_perujuk',
        'tarif_tindakan_dokter',
        'tarif_tindakan_petugas',
        'kso',
        'menejemen',
        'total_byr',
        'kd_pj',
        'status',
        'kelas'
    ];

    protected $casts = [
        'bagian_rs' => 'decimal:2',
        'bhp' => 'decimal:2',
        'tarif_perujuk' => 'decimal:2',
        'tarif_tindakan_dokter' => 'decimal:2',
        'tarif_tindakan_petugas' => 'decimal:2',
        'kso' => 'decimal:2',
        'menejemen' => 'decimal:2',
        'total_byr' => 'decimal:2',
    ];

    // Accessor untuk format mata uang
    public function getTotalByrFormattedAttribute()
    {
        return 'Rp '.number_format($this->total_byr, 0, ',', '.');
    }

    public function getBagianRsFormattedAttribute()
    {
        return 'Rp '.number_format($this->bagian_rs, 0, ',', '.');
    }

    public function getTarifPerujukFormattedAttribute()
    {
        return 'Rp '.number_format($this->tarif_perujuk, 0, ',', '.');
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

    // Relasi dengan penjab
    public function penjab()
    {
        return $this->belongsTo(Penjab::class, 'kd_pj', 'kd_pj');
    }

    /**
     * Generate kode otomatis untuk pemeriksaan radiologi
     * Format: R000001, R000002, dst.
     */
    public static function generateKodeJenisPerawatan()
    {
        // Ambil semua kode yang dimulai dengan 'R'
        $codes = self::where('kd_jenis_prw', 'like', 'R%')
            ->pluck('kd_jenis_prw')
            ->toArray();

        if (empty($codes)) {
            return 'R000001';
        }

        $maxNumber = 0;
        
        // Loop through all codes to find the highest numeric value
        foreach ($codes as $code) {
            // Extract numeric part after 'R', remove any non-numeric characters
            $numericPart = preg_replace('/[^0-9]/', '', substr($code, 1));
            if (!empty($numericPart)) {
                $number = (int) $numericPart;
                if ($number > $maxNumber) {
                    $maxNumber = $number;
                }
            }
        }

        // Increment by 1
        $newNumber = $maxNumber + 1;

        // Format: R + nomor urut (6 digit)
        return 'R' . str_pad($newNumber, 6, '0', STR_PAD_LEFT);
    }
}
