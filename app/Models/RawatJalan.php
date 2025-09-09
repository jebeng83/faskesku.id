<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RawatJalan extends Model
{
    use HasFactory;

    protected $table = 'reg_periksa';
    protected $primaryKey = 'no_rawat';
    public $incrementing = false; // kunci utama bertipe string (bukan auto-increment)
    protected $keyType = 'string';

    protected $fillable = [
        'no_reg',
        'no_rawat',
        'tgl_registrasi',
        'jam_reg',
        'kd_dokter',
        'no_rkm_medis',
        'kd_poli',
        'p_jawab',
        'almt_pj',
        'hubunganpj',
        'biaya_reg',
        'stts',
        'stts_daftar',
        'status_lanjut',
        'kd_pj',
        'umurdaftar',
        'sttsumur',
        'status_bayar',
        'status_poli'
    ];

    protected $casts = [
        'tgl_registrasi' => 'date',
        'jam_reg' => 'datetime:H:i:s',
        'biaya_reg' => 'decimal:2',
        'umurdaftar' => 'integer'
    ];

    // Relasi dengan model Patient
    public function patient()
    {
        return $this->belongsTo(Patient::class, 'no_rkm_medis', 'no_rkm_medis');
    }

    // Scope untuk filter status
    public function scopeStatus($query, $status)
    {
        return $query->where('stts', $status);
    }

    // Scope untuk filter status bayar
    public function scopeStatusBayar($query, $status)
    {
        return $query->where('status_bayar', $status);
    }

    // Scope untuk filter tanggal
    public function scopeTanggal($query, $tanggal)
    {
        return $query->where('tgl_registrasi', $tanggal);
    }

    // Accessor untuk format tanggal
    public function getTglRegistrasiFormattedAttribute()
    {
        return $this->tgl_registrasi ? $this->tgl_registrasi->format('d/m/Y') : '-';
    }

    // Accessor untuk format jam
    public function getJamRegFormattedAttribute()
    {
        return $this->jam_reg ? $this->jam_reg->format('H:i') : '-';
    }

    // Accessor untuk status badge
    public function getStatusBadgeAttribute()
    {
        $badges = [
            'Belum' => 'badge-warning',
            'Sudah' => 'badge-success',
            'Batal' => 'badge-danger',
            'Berkas Diterima' => 'badge-info',
            'Dirujuk' => 'badge-primary',
            'Meninggal' => 'badge-dark',
            'Dirawat' => 'badge-primary',
            'Pulang Paksa' => 'badge-warning'
        ];

        $class = $badges[$this->stts] ?? 'badge-secondary';
        return "<span class='badge {$class}'>{$this->stts}</span>";
    }
}
