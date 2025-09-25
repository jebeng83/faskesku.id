<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailPeriksaLab extends Model
{
    use HasFactory;

    protected $table = 'detail_periksa_lab';
    protected $primaryKey = 'id';

    protected $fillable = [
        'no_rawat',
        'kd_jenis_prw',
        'item_pemeriksaan',
        'nilai',
        'nilai_rujukan',
        'satuan',
        'keterangan'
    ];

    // Relasi dengan PeriksaLab
    public function periksaLab()
    {
        return $this->belongsTo(PeriksaLab::class, 'no_rawat', 'no_rawat');
    }

    // Relasi dengan JnsPerawatanLab
    public function jenisPerawatan()
    {
        return $this->belongsTo(JnsPerawatanLab::class, 'kd_jenis_prw', 'kd_jenis_prw');
    }

    // Relasi dengan TemplateLaboratorium
    public function template()
    {
        return $this->belongsTo(TemplateLaboratorium::class, 'item_pemeriksaan', 'item_pemeriksaan')
                    ->where('kd_jenis_prw', $this->kd_jenis_prw);
    }

    // Scope untuk filter berdasarkan jenis pemeriksaan
    public function scopeByJenisPemeriksaan($query, $kdJenisPrw)
    {
        return $query->where('kd_jenis_prw', $kdJenisPrw);
    }

    // Scope untuk pencarian item pemeriksaan
    public function scopeSearchItem($query, $search)
    {
        return $query->where('item_pemeriksaan', 'like', "%{$search}%");
    }

    // Accessor untuk status hasil
    public function getStatusHasilAttribute()
    {
        if (empty($this->nilai)) {
            return 'Belum Ada Hasil';
        }

        switch ($this->keterangan) {
            case 'Normal':
                return 'Normal';
            case 'Tinggi':
                return 'Tinggi';
            case 'Rendah':
                return 'Rendah';
            case 'Abnormal':
                return 'Abnormal';
            default:
                return 'Perlu Evaluasi';
        }
    }

    // Accessor untuk badge keterangan
    public function getKeteranganBadgeAttribute()
    {
        $badges = [
            'Normal' => 'success',
            'Tinggi' => 'danger',
            'Rendah' => 'warning',
            'Abnormal' => 'danger'
        ];

        return $badges[$this->keterangan] ?? 'secondary';
    }

    // Method untuk mengecek apakah hasil normal
    public function isNormal()
    {
        return $this->keterangan === 'Normal';
    }

    // Method untuk mengecek apakah hasil abnormal
    public function isAbnormal()
    {
        return in_array($this->keterangan, ['Tinggi', 'Rendah', 'Abnormal']);
    }

    // Method untuk format nilai dengan satuan
    public function getNilaiFormattedAttribute()
    {
        if (empty($this->nilai)) {
            return '-';
        }

        return $this->nilai . ($this->satuan ? ' ' . $this->satuan : '');
    }
}