<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PermintaanRadiologi extends Model
{
    use HasFactory;

    protected $table = 'permintaan_radiologi';

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
        $lastOrder = self::where('noorder', 'like', 'PR'.$date.'%')
            ->orderBy('noorder', 'desc')
            ->first();

        if ($lastOrder) {
            $lastNumber = (int) substr($lastOrder->noorder, -4);
            $newNumber = str_pad($lastNumber + 1, 4, '0', STR_PAD_LEFT);
        } else {
            $newNumber = '0001';
        }

        return 'PR'.$date.$newNumber;
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
            'no_rawat', // Local key on PermintaanRadiologi table
            'no_rkm_medis' // Local key on RegPeriksa table
        );
    }

    /**
     * Scope untuk filter berdasarkan status
     */
    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Scope untuk filter berdasarkan tanggal permintaan
     */
    public function scopeByTanggalPermintaan($query, $tanggal)
    {
        return $query->whereDate('tgl_permintaan', $tanggal);
    }

    /**
     * Relasi ke PermintaanPemeriksaanRadiologi
     */
    public function detailPermintaan()
    {
        return $this->hasMany(PermintaanPemeriksaanRadiologi::class, 'noorder', 'noorder');
    }

    /**
     * Scope untuk filter berdasarkan dokter
     */
    public function scopeByDokter($query, $kdDokter)
    {
        return $query->where('dokter_perujuk', $kdDokter);
    }

    public function hasHasilTersedia(): bool
    {
        if (! $this->tgl_hasil || $this->tgl_hasil === '0000-00-00') {
            return false;
        }

        $tglHasilStr = is_string($this->tgl_hasil) ? $this->tgl_hasil : (string) $this->tgl_hasil;
        $invalidDates = ['0000-00-00', '0000-00-00 00:00:00', '-0001-11-30', '-0001-11-29', '1970-01-01'];

        foreach ($invalidDates as $invalid) {
            if (str_contains($tglHasilStr, $invalid)) {
                return false;
            }
        }

        if (str_starts_with(trim($tglHasilStr), '-')) {
            return false;
        }

        $noRawat = $this->no_rawat;

        if (! $noRawat) {
            return false;
        }

        $query = \Illuminate\Support\Facades\DB::table('hasil_radiologi')
            ->where('no_rawat', $noRawat);

        if ($this->tgl_permintaan) {
            $query->whereDate('tgl_periksa', '>=', $this->tgl_permintaan);
        }

        $hasResult = $query->exists();

        if (! $hasResult) {
            $query = \Illuminate\Support\Facades\DB::table('periksa_radiologi')
                ->where('no_rawat', $noRawat);

            if ($this->tgl_permintaan) {
                $query->whereDate('tgl_periksa', '>=', $this->tgl_permintaan);
            }

            $hasResult = $query->exists();
        }

        return $hasResult;
    }

    public function getHasHasilTersediaAttribute(): bool
    {
        return $this->hasHasilTersedia();
    }
}
