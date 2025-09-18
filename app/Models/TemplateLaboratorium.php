<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TemplateLaboratorium extends Model
{
    use HasFactory;

    protected $table = 'template_laboratorium';
    protected $primaryKey = 'id';

    protected $fillable = [
        'kd_jenis_prw',
        'item_pemeriksaan',
        'nilai_rujukan_pria',
        'nilai_rujukan_wanita',
        'satuan',
        'urutan',
        'status'
    ];

    protected $casts = [
        'urutan' => 'integer'
    ];

    // Relasi dengan JnsPerawatanLab
    public function jenisPerawatan()
    {
        return $this->belongsTo(JnsPerawatanLab::class, 'kd_jenis_prw', 'kd_jenis_prw');
    }

    // Relasi dengan DetailPeriksaLab
    public function detailPemeriksaan()
    {
        return $this->hasMany(DetailPeriksaLab::class, 'item_pemeriksaan', 'item_pemeriksaan')
                    ->where('kd_jenis_prw', $this->kd_jenis_prw);
    }

    // Scope untuk status aktif
    public function scopeAktif($query)
    {
        return $query->where('status', 'Aktif');
    }

    // Scope untuk filter berdasarkan jenis pemeriksaan
    public function scopeByJenisPemeriksaan($query, $kdJenisPrw)
    {
        return $query->where('kd_jenis_prw', $kdJenisPrw);
    }

    // Scope untuk pencarian
    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('item_pemeriksaan', 'like', "%{$search}%")
                ->orWhereHas('jenisPerawatan', function ($jenisQuery) use ($search) {
                    $jenisQuery->where('nm_perawatan', 'like', "%{$search}%");
                });
        });
    }

    // Scope untuk urutan
    public function scopeOrdered($query)
    {
        return $query->orderBy('urutan', 'asc');
    }

    // Method untuk mendapatkan nilai rujukan berdasarkan jenis kelamin
    public function getNilaiRujukan($jenisKelamin = null)
    {
        if ($jenisKelamin === 'L' && !empty($this->nilai_rujukan_pria)) {
            return $this->nilai_rujukan_pria;
        } elseif ($jenisKelamin === 'P' && !empty($this->nilai_rujukan_wanita)) {
            return $this->nilai_rujukan_wanita;
        }

        // Jika tidak ada nilai rujukan spesifik, gunakan yang pria sebagai default
        return $this->nilai_rujukan_pria ?: $this->nilai_rujukan_wanita;
    }

    // Accessor untuk format nilai rujukan
    public function getNilaiRujukanFormattedAttribute()
    {
        $pria = $this->nilai_rujukan_pria;
        $wanita = $this->nilai_rujukan_wanita;
        $satuan = $this->satuan ? ' ' . $this->satuan : '';

        if ($pria && $wanita && $pria !== $wanita) {
            return "Pria: {$pria}{$satuan}, Wanita: {$wanita}{$satuan}";
        } elseif ($pria) {
            return $pria . $satuan;
        } elseif ($wanita) {
            return $wanita . $satuan;
        }

        return '-';
    }

    // Method untuk mengecek apakah template aktif
    public function isAktif()
    {
        return $this->status === 'Aktif';
    }

    // Method untuk mengecek apakah ada perbedaan nilai rujukan berdasarkan gender
    public function hasGenderSpecificValues()
    {
        return !empty($this->nilai_rujukan_pria) && 
               !empty($this->nilai_rujukan_wanita) && 
               $this->nilai_rujukan_pria !== $this->nilai_rujukan_wanita;
    }
}