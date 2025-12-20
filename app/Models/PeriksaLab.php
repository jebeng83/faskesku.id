<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PeriksaLab extends Model
{
    use HasFactory;

    protected $table = 'periksa_lab';

    protected $primaryKey = 'no_rawat';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false; // Tabel tidak memiliki created_at dan updated_at

    protected $fillable = [
        'no_rawat',
        'nip',
        'kd_jenis_prw',
        'tgl_periksa',
        'jam',
        'dokter_perujuk',
        'bagian_rs',
        'bhp',
        'tarif_perujuk',
        'tarif_tindakan_dokter',
        'tarif_tindakan_petugas',
        'kso',
        'menejemen',
        'biaya',
        'kd_dokter',
        'status',
        'kategori',
    ];

    protected $casts = [
        'tgl_periksa' => 'datetime',
        'jam' => 'datetime:H:i:s',
    ];

    // Relasi dengan RegPeriksa
    public function regPeriksa()
    {
        return $this->belongsTo(RegPeriksa::class, 'no_rawat', 'no_rawat');
    }

    // Relasi dengan Employee (Petugas Lab)
    public function petugas()
    {
        return $this->belongsTo(Employee::class, 'nip', 'nik');
    }

    // Relasi dengan JnsPerawatanLab
    public function jenisPerawatan()
    {
        return $this->belongsTo(JnsPerawatanLab::class, 'kd_jenis_prw', 'kd_jenis_prw');
    }

    // Relasi dengan DetailPeriksaLab
    public function detailPemeriksaan()
    {
        // Gunakan nilai instance untuk filter saat load pada satu model instance,
        // dan longgarkan filter ke tanggal saja untuk menghindari mismatch jam.
        return $this->hasMany(DetailPeriksaLab::class, 'no_rawat', 'no_rawat')
            ->where('kd_jenis_prw', $this->kd_jenis_prw)
            ->when(! is_null($this->tgl_periksa), function ($q) {
                $q->whereDate('tgl_periksa', \Carbon\Carbon::parse($this->tgl_periksa)->toDateString());
            });
    }

    // Relasi dengan Patient melalui RegPeriksa
    public function patient()
    {
        return $this->hasOneThrough(
            Patient::class,
            RegPeriksa::class,
            'no_rawat', // Foreign key on RegPeriksa table
            'no_rkm_medis', // Foreign key on Patient table
            'no_rawat', // Local key on PeriksaLab table
            'no_rkm_medis' // Local key on RegPeriksa table
        );
    }

    // Scope untuk filter berdasarkan status
    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
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
				->orWhereHas('patient', function ($patientQuery) use ($search) {
					$patientQuery->where('pasien.nm_pasien', 'like', "%{$search}%")
						->orWhere('pasien.no_rkm_medis', 'like', "%{$search}%");
				});
		});
	}

    // Accessor untuk format tanggal
    public function getTglPeriksaFormattedAttribute()
    {
        return Carbon::parse($this->tgl_periksa)->format('d/m/Y');
    }

    // Accessor untuk format jam
    public function getJamFormattedAttribute()
    {
        return Carbon::parse($this->jam)->format('H:i');
    }

    // Accessor untuk status badge
    public function getStatusBadgeAttribute()
    {
        $badges = [
            'Menunggu' => 'warning',
            'Proses' => 'info',
            'Selesai' => 'success',
        ];

        return $badges[$this->status] ?? 'secondary';
    }

    // Method untuk mengecek apakah pemeriksaan sudah selesai
    public function isCompleted()
    {
        return $this->status === 'Selesai';
    }

    // Method untuk mengecek apakah pemeriksaan sedang dalam proses
    public function isInProgress()
    {
        return $this->status === 'Proses';
    }

    // Method untuk mengecek apakah pemeriksaan masih menunggu
    public function isPending()
    {
        return $this->status === 'Menunggu';
    }
}
