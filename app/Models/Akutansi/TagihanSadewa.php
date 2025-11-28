<?php

namespace App\Models\Akutansi;

use App\Models\Patient;
use Illuminate\Database\Eloquent\Model;

class TagihanSadewa extends Model
{
    protected $table = 'tagihan_sadewa';

    protected $primaryKey = 'no_nota';

    public $incrementing = false;

    public $timestamps = false;

    protected $fillable = [
        'no_nota',
        'no_rkm_medis',
        'nama_pasien',
        'alamat',
        'tgl_bayar',
        'jenis_bayar',
        'jumlah_tagihan',
        'jumlah_bayar',
        'status',
        'petugas',
    ];

    protected $casts = [
        'tgl_bayar' => 'datetime',
        'jumlah_tagihan' => 'float',
        'jumlah_bayar' => 'float',
    ];

    /**
     * Relasi ke Patient
     */
    public function patient()
    {
        return $this->belongsTo(Patient::class, 'no_rkm_medis', 'no_rkm_medis');
    }

    /**
     * Relasi ke NotaJalan
     */
    public function notaJalan()
    {
        return $this->belongsTo(NotaJalan::class, 'no_nota', 'no_nota');
    }

    /**
     * Scope untuk filter status
     */
    public function scopeStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Scope untuk filter jenis bayar
     */
    public function scopeJenisBayar($query, $jenis)
    {
        return $query->where('jenis_bayar', $jenis);
    }

    /**
     * Check apakah sudah lunas
     */
    public function isLunas(): bool
    {
        return $this->status === 'Sudah' && $this->jumlah_bayar >= $this->jumlah_tagihan;
    }

    /**
     * Check apakah belum bayar
     */
    public function isBelumBayar(): bool
    {
        return $this->status === 'Belum' || $this->jumlah_bayar < $this->jumlah_tagihan;
    }

    /**
     * Hitung sisa tagihan
     */
    public function getSisaTagihanAttribute(): float
    {
        return max(0, $this->jumlah_tagihan - $this->jumlah_bayar);
    }
}
