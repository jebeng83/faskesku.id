<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PermintaanLab extends Model
{
    use HasFactory;

    protected $table = 'permintaan_lab';

    protected $primaryKey = 'noorder';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = [
        'noorder',
        'no_rawat',
        'tgl_permintaan',
        'jam_permintaan',
        'tgl_sampel',
        'jam_sampel',
        'tgl_hasil',
        'jam_hasil',
        'dokter_perujuk',
        'status',
        'informasi_tambahan',
        'diagnosa_klinis',
    ];

    protected $casts = [
        'tgl_permintaan' => 'date',
        'tgl_sampel' => 'date',
        'tgl_hasil' => 'date',
        'jam_permintaan' => 'datetime:H:i:s',
        'jam_sampel' => 'datetime:H:i:s',
        'jam_hasil' => 'datetime:H:i:s',
    ];

    /**
     * Generate auto noorder
     */
    public static function generateNoOrder()
    {
        $date = now()->format('Ymd');
        $lastOrder = self::where('noorder', 'like', 'PL'.$date.'%')
            ->orderBy('noorder', 'desc')
            ->first();

        if ($lastOrder) {
            $lastNumber = (int) substr($lastOrder->noorder, -4);
            $newNumber = str_pad($lastNumber + 1, 4, '0', STR_PAD_LEFT);
        } else {
            $newNumber = '0001';
        }

        return 'PL'.$date.$newNumber;
    }

    /**
     * Boot method to auto-generate noorder
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->noorder)) {
                $model->noorder = self::generateNoOrder();
            }
        });
    }

    /**
     * Relasi ke RegPeriksa
     */
    public function regPeriksa()
    {
        return $this->belongsTo(RegPeriksa::class, 'no_rawat', 'no_rawat');
    }

    /**
     * Relasi ke Dokter
     */
    public function dokter()
    {
        return $this->belongsTo(Dokter::class, 'dokter_perujuk', 'kd_dokter');
    }

    /**
     * Relasi ke Patient melalui RegPeriksa
     */
    public function patient()
    {
        return $this->hasOneThrough(
            Patient::class,
            RegPeriksa::class,
            'no_rawat', // Foreign key on RegPeriksa table
            'no_rkm_medis', // Foreign key on Patient table
            'no_rawat', // Local key on PermintaanLab table
            'no_rkm_medis' // Local key on RegPeriksa table
        );
    }

    /**
     * Scope untuk filter berdasarkan status
     */
    public function scopeByStatus($query, $status)
    {
        if ($status === null || $status === '') return $query;
        $status = strtolower((string) $status);
        return $query->whereRaw('LOWER(status) = ?', [$status]);
    }

    /**
     * Scope untuk filter berdasarkan tanggal permintaan
     */
    public function scopeByTanggalPermintaan($query, $tanggal)
    {
        return $query->whereDate('tgl_permintaan', $tanggal);
    }

    /**
     * Relasi ke PermintaanDetailPermintaanLab
     */
    public function detailPermintaan()
    {
        return $this->hasMany(PermintaanDetailPermintaanLab::class, 'noorder', 'noorder');
    }

    /**
     * Scope untuk filter berdasarkan dokter
     */
    public function scopeByDokter($query, $kdDokter)
    {
        return $query->where('dokter_perujuk', $kdDokter);
    }

    /**
     * Check apakah hasil benar-benar tersedia di detail_periksa_lab
     * Memastikan bahwa ada data hasil yang tersimpan untuk semua template yang diminta
     */
    public function hasHasilTersedia(): bool
    {
        // Jika tgl_hasil tidak valid, pasti belum ada hasil
        if (! $this->tgl_hasil || $this->tgl_hasil === '0000-00-00') {
            return false;
        }

        // Validasi format tanggal invalid lainnya
        $tglHasilStr = is_string($this->tgl_hasil) ? $this->tgl_hasil : (string) $this->tgl_hasil;
        $invalidDates = ['0000-00-00', '-0001-11-30', '-0001-11-29', '1970-01-01'];
        foreach ($invalidDates as $invalid) {
            if (str_contains($tglHasilStr, $invalid)) {
                return false;
            }
        }

        if (str_starts_with(trim($tglHasilStr), '-')) {
            return false;
        }

        // Ambil detail permintaan untuk mendapatkan semua template yang diminta
        // Pastikan relasi sudah dimuat untuk menghindari N+1 query
        if (! $this->relationLoaded('detailPermintaan')) {
            $this->load('detailPermintaan');
        }

        $detailPermintaan = $this->detailPermintaan;

        if ($detailPermintaan->isEmpty()) {
            return false;
        }

        // Optimasi: Query semua detail sekaligus untuk menghindari N+1 query
        $detailKeys = $detailPermintaan->map(function ($detail) {
            return [
                'kd_jenis_prw' => $detail->kd_jenis_prw,
                'id_template' => $detail->id_template,
            ];
        })->unique(function ($item) {
            return $item['kd_jenis_prw'].'-'.$item['id_template'];
        });

        // Query semua hasil sekaligus
        $existingResults = \App\Models\DetailPeriksaLab::where('no_rawat', $this->no_rawat)
            ->whereNotNull('nilai')
            ->where('nilai', '!=', '')
            ->get()
            ->map(function ($result) {
                return [
                    'kd_jenis_prw' => $result->kd_jenis_prw,
                    'id_template' => $result->id_template,
                ];
            })
            ->unique(function ($item) {
                return $item['kd_jenis_prw'].'-'.$item['id_template'];
            });

        // Cek apakah semua detail permintaan memiliki hasil
        foreach ($detailKeys as $key) {
            $hasResult = $existingResults->contains(function ($result) use ($key) {
                return $result['kd_jenis_prw'] === $key['kd_jenis_prw']
                    && $result['id_template'] === $key['id_template'];
            });

            if (! $hasResult) {
                return false;
            }
        }

        return true;
    }

    /**
     * Optimized version untuk menghindari N+1 query
     * Menggunakan pre-loaded DetailPeriksaLab collection
     */
    public function hasHasilTersediaOptimized($detailPeriksaLabCollection): bool
    {
        // Jika tgl_hasil tidak valid, pasti belum ada hasil
        if (! $this->tgl_hasil || $this->tgl_hasil === '0000-00-00') {
            return false;
        }

        // Validasi format tanggal invalid lainnya
        $tglHasilStr = is_string($this->tgl_hasil) ? $this->tgl_hasil : (string) $this->tgl_hasil;
        $invalidDates = ['0000-00-00', '-0001-11-30', '-0001-11-29', '1970-01-01'];
        foreach ($invalidDates as $invalid) {
            if (str_contains($tglHasilStr, $invalid)) {
                return false;
            }
        }

        if (str_starts_with(trim($tglHasilStr), '-')) {
            return false;
        }

        // Pastikan relasi detailPermintaan sudah dimuat (seharusnya sudah dari eager loading)
        // Jangan load lagi untuk menghindari memory issue
        $detailPermintaan = $this->relationLoaded('detailPermintaan') 
            ? $this->detailPermintaan 
            : collect();

        if ($detailPermintaan->isEmpty()) {
            return false;
        }

        // Gunakan pre-loaded collection untuk menghindari query database
        $existingResults = $detailPeriksaLabCollection->map(function ($result) {
            return [
                'kd_jenis_prw' => $result->kd_jenis_prw,
                'id_template' => $result->id_template,
            ];
        })->unique(function ($item) {
            return $item['kd_jenis_prw'].'-'.$item['id_template'];
        });

        // Cek apakah semua detail permintaan memiliki hasil
        foreach ($detailPermintaan as $detail) {
            $hasResult = $existingResults->contains(function ($result) use ($detail) {
                return $result['kd_jenis_prw'] === $detail->kd_jenis_prw
                    && $result['id_template'] === $detail->id_template;
            });

            if (! $hasResult) {
                return false;
            }
        }

        return true;
    }

    /**
     * Accessor untuk status hasil
     */
    public function getHasHasilTersediaAttribute(): bool
    {
        return $this->hasHasilTersedia();
    }
}
