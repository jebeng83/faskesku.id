<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class RiwayatLab extends Model
{
    use HasFactory;

    protected $table = 'riwayat_lab';
    protected $primaryKey = 'id';

    protected $fillable = [
        'no_rawat',
        'no_rkm_medis',
        'kd_jenis_prw',
        'tgl_periksa',
        'hasil_pemeriksaan',
        'dokter_pj',
        'petugas_lab'
    ];

    protected $casts = [
        'tgl_periksa' => 'datetime'
    ];

    // Relasi dengan RegPeriksa
    public function regPeriksa()
    {
        return $this->belongsTo(RegPeriksa::class, 'no_rawat', 'no_rawat');
    }

    // Relasi dengan Patient
    public function patient()
    {
        return $this->belongsTo(Patient::class, 'no_rkm_medis', 'no_rkm_medis');
    }

    // Relasi dengan JnsPerawatanLab
    public function jenisPerawatan()
    {
        return $this->belongsTo(JnsPerawatanLab::class, 'kd_jenis_prw', 'kd_jenis_prw');
    }

    // Scope untuk filter berdasarkan pasien
    public function scopeByPasien($query, $noRkmMedis)
    {
        return $query->where('no_rkm_medis', $noRkmMedis);
    }

    // Scope untuk filter berdasarkan jenis pemeriksaan
    public function scopeByJenisPemeriksaan($query, $kdJenisPrw)
    {
        return $query->where('kd_jenis_prw', $kdJenisPrw);
    }

    // Scope untuk filter berdasarkan tanggal
    public function scopeByDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('tgl_periksa', [$startDate, $endDate]);
    }

    // Scope untuk pencarian
    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('no_rawat', 'like', "%{$search}%")
                ->orWhere('no_rkm_medis', 'like', "%{$search}%")
                ->orWhere('dokter_pj', 'like', "%{$search}%")
                ->orWhere('petugas_lab', 'like', "%{$search}%")
                ->orWhereHas('patient', function ($patientQuery) use ($search) {
                    $patientQuery->where('nm_pasien', 'like', "%{$search}%");
                })
                ->orWhereHas('jenisPerawatan', function ($jenisQuery) use ($search) {
                    $jenisQuery->where('nm_perawatan', 'like', "%{$search}%");
                });
        });
    }

    // Scope untuk urutan terbaru
    public function scopeLatest($query)
    {
        return $query->orderBy('tgl_periksa', 'desc');
    }

    // Accessor untuk format tanggal
    public function getTglPeriksaFormattedAttribute()
    {
        return Carbon::parse($this->tgl_periksa)->format('d/m/Y H:i');
    }

    // Accessor untuk format tanggal singkat
    public function getTglPeriksaShortAttribute()
    {
        return Carbon::parse($this->tgl_periksa)->format('d/m/Y');
    }

    // Method untuk mendapatkan riwayat berdasarkan pasien dan jenis pemeriksaan
    public static function getRiwayatPasien($noRkmMedis, $kdJenisPrw = null, $limit = 10)
    {
        $query = self::byPasien($noRkmMedis)->latest();
        
        if ($kdJenisPrw) {
            $query->byJenisPemeriksaan($kdJenisPrw);
        }
        
        return $query->limit($limit)->get();
    }

    // Method untuk mendapatkan statistik riwayat
    public static function getStatistikRiwayat($noRkmMedis)
    {
        return [
            'total_pemeriksaan' => self::byPasien($noRkmMedis)->count(),
            'pemeriksaan_bulan_ini' => self::byPasien($noRkmMedis)
                ->whereMonth('tgl_periksa', Carbon::now()->month)
                ->whereYear('tgl_periksa', Carbon::now()->year)
                ->count(),
            'pemeriksaan_terakhir' => self::byPasien($noRkmMedis)
                ->latest()
                ->first()?->tgl_periksa_formatted
        ];
    }
}