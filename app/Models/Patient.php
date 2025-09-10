<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

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
        return $this->tgl_lahir ? $this->tgl_lahir->format('d/m/Y') : '';
    }

    // Accessor untuk format tanggal daftar
    public function getTanggalDaftarFormattedAttribute()
    {
        return $this->tgl_daftar ? $this->tgl_daftar->format('d/m/Y') : '';
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
            'JOMBLO' => 'Jomblo'
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
            '-' => 'Tidak Diketahui'
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
        if ($this->kelurahanpj) $alamat .= ', ' . $this->kelurahanpj;
        if ($this->kecamatanpj) $alamat .= ', ' . $this->kecamatanpj;
        if ($this->kabupatenpj) $alamat .= ', ' . $this->kabupatenpj;
        if ($this->propinsipj) $alamat .= ', ' . $this->propinsipj;
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

    // Generate nomor RM otomatis
    public static function generateNoRM()
    {
        $lastPatient = self::orderBy('no_rkm_medis', 'desc')->first();
        if ($lastPatient) {
            $lastNumber = (int) substr($lastPatient->no_rkm_medis, -6);
            $newNumber = $lastNumber + 1;
        } else {
            $newNumber = 1;
        }
        return str_pad($newNumber, 6, '0', STR_PAD_LEFT);
    }
}
