<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

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
        'diagnosa_klinis'
    ];

    protected $casts = [
        'tgl_permintaan' => 'date',
        'tgl_sampel' => 'date',
        'tgl_hasil' => 'date',
        'jam_permintaan' => 'datetime:H:i:s',
        'jam_sampel' => 'datetime:H:i:s',
        'jam_hasil' => 'datetime:H:i:s'
    ];

    /**
     * Generate auto noorder
     */
    public static function generateNoOrder()
    {
        $date = now()->format('Ymd');
        $lastOrder = self::where('noorder', 'like', 'PL' . $date . '%')
                        ->orderBy('noorder', 'desc')
                        ->first();
        
        if ($lastOrder) {
            $lastNumber = (int) substr($lastOrder->noorder, -4);
            $newNumber = str_pad($lastNumber + 1, 4, '0', STR_PAD_LEFT);
        } else {
            $newNumber = '0001';
        }
        
        return 'PL' . $date . $newNumber;
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
}