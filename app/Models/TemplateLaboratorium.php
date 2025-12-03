<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TemplateLaboratorium extends Model
{
    use HasFactory;

    protected $table = 'template_laboratorium';

    protected $primaryKey = 'id_template';

    public $timestamps = false;

    protected $fillable = [
        'kd_jenis_prw',
        'Pemeriksaan',
        'satuan',
        'nilai_rujukan_ld',
        'nilai_rujukan_la',
        'nilai_rujukan_pd',
        'nilai_rujukan_pa',
        'bagian_rs',
        'bhp',
        'bagian_perujuk',
        'bagian_dokter',
        'bagian_laborat',
        'kso',
        'menejemen',
        'biaya_item',
        'urut',
    ];

    protected $casts = [
        'bagian_rs' => 'decimal:2',
        'bhp' => 'decimal:2',
        'bagian_perujuk' => 'decimal:2',
        'bagian_dokter' => 'decimal:2',
        'bagian_laborat' => 'decimal:2',
        'kso' => 'decimal:2',
        'menejemen' => 'decimal:2',
        'biaya_item' => 'decimal:2',
        'urut' => 'integer',
    ];

    // Relasi dengan JnsPerawatanLab
    public function jenisPerawatan()
    {
        return $this->belongsTo(JnsPerawatanLab::class, 'kd_jenis_prw', 'kd_jenis_prw');
    }

    // Relasi dengan permintaan detail
    public function permintaanDetailPermintaanLab()
    {
        return $this->hasMany(PermintaanDetailPermintaanLab::class, 'id_template', 'id_template');
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
            $q->where('Pemeriksaan', 'like', "%{$search}%")
                ->orWhereHas('jenisPerawatan', function ($jenisQuery) use ($search) {
                    $jenisQuery->where('nm_perawatan', 'like', "%{$search}%");
                });
        });
    }

    // Scope untuk urutan
    public function scopeOrdered($query)
    {
        return $query->orderBy('urut', 'asc');
    }

    // Method untuk mendapatkan nilai rujukan berdasarkan jenis kelamin dan usia
    public function getNilaiRujukan($jenisKelamin = null, $usia = null)
    {
        // ld = laki dewasa, la = laki anak, pd = perempuan dewasa, pa = perempuan anak
        if ($jenisKelamin === 'L') {
            if ($usia && $usia < 18 && ! empty($this->nilai_rujukan_la)) {
                return $this->nilai_rujukan_la;
            } elseif (! empty($this->nilai_rujukan_ld)) {
                return $this->nilai_rujukan_ld;
            }
        } elseif ($jenisKelamin === 'P') {
            if ($usia && $usia < 18 && ! empty($this->nilai_rujukan_pa)) {
                return $this->nilai_rujukan_pa;
            } elseif (! empty($this->nilai_rujukan_pd)) {
                return $this->nilai_rujukan_pd;
            }
        }

        // Default fallback
        return $this->nilai_rujukan_ld ?: $this->nilai_rujukan_pd ?: $this->nilai_rujukan_la ?: $this->nilai_rujukan_pa;
    }

    // Accessor untuk format nilai rujukan
    public function getNilaiRujukanFormattedAttribute()
    {
        $ld = $this->nilai_rujukan_ld;
        $la = $this->nilai_rujukan_la;
        $pd = $this->nilai_rujukan_pd;
        $pa = $this->nilai_rujukan_pa;
        $satuan = $this->satuan ? ' '.$this->satuan : '';

        $rujukan = [];
        if ($ld) {
            $rujukan[] = "Pria Dewasa: {$ld}{$satuan}";
        }
        if ($la) {
            $rujukan[] = "Pria Anak: {$la}{$satuan}";
        }
        if ($pd) {
            $rujukan[] = "Wanita Dewasa: {$pd}{$satuan}";
        }
        if ($pa) {
            $rujukan[] = "Wanita Anak: {$pa}{$satuan}";
        }

        return ! empty($rujukan) ? implode(', ', $rujukan) : '-';
    }

    // Accessor untuk format biaya
    public function getBiayaItemFormattedAttribute()
    {
        return 'Rp '.number_format($this->biaya_item, 0, ',', '.');
    }

    // Method untuk mendapatkan total biaya
    public function getTotalBiaya()
    {
        return $this->bagian_rs + $this->bhp + $this->bagian_perujuk +
               $this->bagian_dokter + $this->bagian_laborat +
               ($this->kso ?? 0) + ($this->menejemen ?? 0);
    }
}
