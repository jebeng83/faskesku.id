<?php

namespace App\Models;

use App\Models\RawatJalan\RawatJalan;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $table = 'pasien';

    protected $primaryKey = 'no_rkm_medis';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = [
        'no_rkm_medis',
        'nm_pasien',
        'no_ktp',
        'jk',
        'tmp_lahir',
        'tgl_lahir',
        'nm_ibu',
        'alamat',
        'gol_darah',
        'pekerjaan',
        'stts_nikah',
        'agama',
        'tgl_daftar',
        'no_tlp',
        'umur',
        'pnd',
        'keluarga',
        'namakeluarga',
        'kd_pj',
        'no_peserta',
        'kd_kel',
        'kd_kec',
        'kd_kab',
        'pekerjaanpj',
        'alamatpj',
        'kelurahanpj',
        'kecamatanpj',
        'kabupatenpj',
        'perusahaan_pasien',
        'suku_bangsa',
        'bahasa_pasien',
        'cacat_fisik',
        'email',
        'nip',
        'kd_prop',
        'propinsipj',
    ];

    protected $casts = [
        'tgl_lahir' => 'date',
        'tgl_daftar' => 'date',
    ];

    // Accessor untuk format tanggal lahir
    public function getTanggalLahirFormattedAttribute()
    {
        return $this->tgl_lahir ? Carbon::parse($this->tgl_lahir)->format('d/m/Y') : '';
    }

    // Accessor untuk format tanggal daftar
    public function getTanggalDaftarFormattedAttribute()
    {
        return $this->tgl_daftar ? Carbon::parse($this->tgl_daftar)->format('d/m/Y') : '';
    }

    public function kelurahan()
    {
        return $this->belongsTo(Kelurahan::class, 'kd_kel', 'kd_kel');
    }

    public function kecamatan()
    {
        return $this->belongsTo(Kecamatan::class, 'kd_kec', 'kd_kec');
    }

    public function kabupaten()
    {
        return $this->belongsTo(Kabupaten::class, 'kd_kab', 'kd_kab');
    }

    public function propinsi()
    {
        return $this->belongsTo(Propinsi::class, 'kd_prop', 'kd_prop');
    }

    public function penjab()
    {
        return $this->belongsTo(Penjab::class, 'kd_pj', 'kd_pj');
    }

    // Accessor untuk jenis kelamin lengkap
    public function getJenisKelaminLengkapAttribute()
    {
        return $this->jk === 'L' ? 'Laki-laki' : 'Perempuan';
    }

    // Accessor untuk status perkawinan lengkap
    public function getStatusPerkawinanLengkapAttribute()
    {
        $status = [
            'BELUM MENIKAH' => 'Belum Menikah',
            'MENIKAH' => 'Menikah',
            'JANDA' => 'Janda',
            'DUDHA' => 'Duda',
            'JOMBLO' => 'Jomblo',
        ];

        return $status[$this->stts_nikah] ?? $this->stts_nikah;
    }

    // Accessor untuk pendidikan lengkap
    public function getPendidikanLengkapAttribute()
    {
        $pendidikan = [
            'TS' => 'Tidak Sekolah',
            'TK' => 'Taman Kanak-kanak',
            'SD' => 'Sekolah Dasar',
            'SMP' => 'Sekolah Menengah Pertama',
            'SMA' => 'Sekolah Menengah Atas',
            'SLTA/SEDERAJAT' => 'SLTA/Sederajat',
            'D1' => 'Diploma 1',
            'D2' => 'Diploma 2',
            'D3' => 'Diploma 3',
            'D4' => 'Diploma 4',
            'S1' => 'Sarjana',
            'S2' => 'Magister',
            'S3' => 'Doktor',
            '-' => 'Tidak Diketahui',
        ];

        return $pendidikan[$this->pnd] ?? $this->pnd;
    }

    // Accessor untuk alamat lengkap
    public function getAlamatLengkapAttribute()
    {
        return $this->alamat;
    }

    // Accessor untuk alamat penanggung jawab lengkap
    public function getAlamatPjLengkapAttribute()
    {
        $alamat = $this->alamatpj;
        if ($this->kelurahanpj) {
            $alamat .= ', '.$this->kelurahanpj;
        }
        if ($this->kecamatanpj) {
            $alamat .= ', '.$this->kecamatanpj;
        }
        if ($this->kabupatenpj) {
            $alamat .= ', '.$this->kabupatenpj;
        }
        if ($this->propinsipj) {
            $alamat .= ', '.$this->propinsipj;
        }

        return $alamat;
    }

    // Scope untuk pencarian
    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('no_rkm_medis', 'like', "%{$search}%")
                ->orWhere('nm_pasien', 'like', "%{$search}%")
                ->orWhere('no_ktp', 'like', "%{$search}%")
                ->orWhere('no_tlp', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%")
                ->orWhere('no_peserta', 'like', "%{$search}%");
        });
    }

    // Relasi dengan RawatJalan
    public function rawatJalan()
    {
        return $this->hasMany(RawatJalan::class, 'no_rkm_medis', 'no_rkm_medis');
    }

    // Relasi dengan RawatJalan terbaru
    public function rawatJalanTerbaru()
    {
        return $this->hasOne(RawatJalan::class, 'no_rkm_medis', 'no_rkm_medis')
            ->orderBy('tgl_registrasi', 'desc')
            ->orderBy('jam_reg', 'desc');
    }

    // Method untuk menghitung umur otomatis dari tgl_lahir
    public function calculateAge()
    {
        if (! $this->tgl_lahir) {
            return null;
        }

        $birthDate = Carbon::parse($this->tgl_lahir);
        $today = Carbon::now();

        $years = $today->diffInYears($birthDate);
        $months = $today->copy()->subYears($years)->diffInMonths($birthDate);
        $days = $today->copy()->subYears($years)->subMonths($months)->diffInDays($birthDate);

        if ($years > 0) {
            return $years.' Th';
        } elseif ($months > 0) {
            return $months.' Bl';
        } else {
            return $days.' Hr';
        }
    }

    // Generate nomor RM otomatis
    public static function generateNoRM()
    {
        // Urutkan secara numerik untuk mendapatkan angka terbesar yang sebenarnya
        $lastPatient = self::select('no_rkm_medis')
            ->whereRaw("no_rkm_medis REGEXP '^[0-9]+$'") // Prioritaskan angka murni
            ->orderByRaw('CAST(no_rkm_medis AS UNSIGNED) DESC')
            ->first();

        // Jika tidak ada angka murni, coba cari yang campuran tapi ambil angka terbesar
        if (!$lastPatient) {
             $lastPatient = self::select('no_rkm_medis')
                ->orderByRaw('CAST(REGEXP_REPLACE(no_rkm_medis, "[^0-9]+", "") AS UNSIGNED) DESC')
                ->first();
        }

        if ($lastPatient && $lastPatient->no_rkm_medis) {
            // Ambil hanya angka dari string
            $numberStr = preg_replace('/[^0-9]/', '', $lastPatient->no_rkm_medis);
            $lastNumber = (int) $numberStr;
            $newNumber = $lastNumber + 1;
        } else {
            $newNumber = 1;
        }

        // Pad dengan 0 di depan, minimal 6 digit
        return str_pad($newNumber, 6, '0', STR_PAD_LEFT);
    }

    // Static method untuk menghitung umur dari tanggal lahir
    public static function calculateAgeFromDate($tgl_lahir)
    {
        if (! $tgl_lahir) {
            return null;
        }

        try {
            $birthDate = Carbon::parse($tgl_lahir);
            $today = Carbon::now();

            // Pastikan tanggal lahir tidak di masa depan
            if ($birthDate->greaterThan($today)) {
                return '0 Hr';
            }

            // Hitung komposit: tahun, bulan sisa, hari sisa (menggunakan DateInterval untuk integer)
            $interval = $birthDate->diff($today);
            $years = (int) $interval->y;
            $months = (int) $interval->m;
            $days = (int) $interval->d;

            // Bangun string hasil ringkas
            $parts = [];
            if ($years > 0) {
                $parts[] = $years.' Th';
            }
            if ($months > 0) {
                $parts[] = $months.' Bl';
            }
            if ($days > 0 || empty($parts)) {
                // jika semua nol (lahir hari ini), tampilkan 0 Hr
                $parts[] = max(0, $days).' Hr';
            }

            return implode(' ', $parts);
        } catch (\Exception $e) {
            // Jika terjadi error parsing, return null
            return null;
        }
    }
}
