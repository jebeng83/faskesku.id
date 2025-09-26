<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pegawai extends Model
{
    use HasFactory;

    protected $table = 'pegawai';
    protected $primaryKey = 'nik';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'nik',
        'nama',
        'jk',
        'jbtn',
        'jnj_jabatan',
        'kode_kelompok',
        'kode_resiko',
        'kode_emergency',
        'departemen',
        'bidang',
        'stts_wp',
        'stts_kerja',
        'npwp',
        'pendidikan',
        'gapok',
        'tmp_lahir',
        'tgl_lahir',
        'alamat',
        'kota',
        'mulai_kerja',
        'ms_kerja',
        'indexins',
        'bpd',
        'rekening',
        'stts_aktif',
        'wajibmasuk',
        'pengurang',
        'indek',
        'mulai_kontrak',
        'cuti_diambil',
        'dankes',
        'photo',
        'no_ktp',
        // 'tgl_masuk' dihapus karena tidak ada di tabel
    ];

    protected $casts = [
        'tgl_lahir' => 'date',
        'mulai_kerja' => 'date',
        'mulai_kontrak' => 'date',
        // 'tgl_masuk' => 'date', // dihapus karena tidak ada di tabel
        'gapok' => 'decimal:2',
        'pengurang' => 'decimal:2',
        'dankes' => 'decimal:2',
        'wajibmasuk' => 'integer',
        'cuti_diambil' => 'integer',
        'indek' => 'integer',
    ];

    // Relasi dengan User
    public function user()
    {
        return $this->hasOne(User::class, 'nik', 'nik');
    }

    // Relasi dengan Dokter
    public function dokter()
    {
        return $this->hasOne(Dokter::class, 'kd_dokter', 'nik');
    }

    // Relasi dengan Jenjang Jabatan
    public function jenjangJabatan()
    {
        return $this->belongsTo(JenjangJabatan::class, 'jnj_jabatan', 'kode');
    }

    // Relasi dengan Kelompok Jabatan
    public function kelompokJabatan()
    {
        return $this->belongsTo(KelompokJabatan::class, 'kode_kelompok', 'kode_kelompok');
    }

    // Relasi dengan Resiko Kerja
    public function resikoKerja()
    {
        return $this->belongsTo(ResikoKerja::class, 'kode_resiko', 'kode_resiko');
    }

    // Relasi dengan Emergency Index
    public function emergencyIndex()
    {
        return $this->belongsTo(EmergencyIndex::class, 'kode_emergency', 'kode_emergency');
    }

    // Relasi dengan Departemen
    public function departemenRelation()
    {
        return $this->belongsTo(Departemen::class, 'departemen', 'dep_id');
    }

    // Relasi dengan Bidang
    public function bidangRelation()
    {
        return $this->belongsTo(Bidang::class, 'bidang', 'nama');
    }

    // Relasi dengan Status WP
    public function statusWP()
    {
        return $this->belongsTo(StatusWP::class, 'stts_wp', 'stts');
    }

    // Relasi dengan Status Kerja
    public function statusKerja()
    {
        return $this->belongsTo(StatusKerja::class, 'stts_kerja', 'stts');
    }

    // Relasi dengan Pendidikan
    public function pendidikanRelation()
    {
        return $this->belongsTo(Pendidikan::class, 'pendidikan', 'tingkat');
    }

    // Relasi dengan Bank
    public function bankRelation()
    {
        return $this->belongsTo(Bank::class, 'bpd', 'namabank');
    }

    // Scope untuk pegawai aktif
    public function scopeAktif($query)
    {
        return $query->where('stts_aktif', 'AKTIF');
    }

    // Scope untuk pegawai non-aktif
    public function scopeNonAktif($query)
    {
        return $query->where('stts_aktif', 'NONAKTIF');
    }

    // Scope berdasarkan status kerja
    public function scopeByStatusKerja($query, $status)
    {
        return $query->where('stts_kerja', $status);
    }

    // Scope berdasarkan departemen
    public function scopeByDepartemen($query, $departemen)
    {
        return $query->where('departemen', $departemen);
    }

    // Accessor untuk nama lengkap
    public function getNamaLengkapAttribute()
    {
        return $this->nama;
    }

    // Accessor untuk status aktif
    public function getStatusAktifTextAttribute()
    {
        return $this->stts_aktif === 'AKTIF' ? 'Aktif' : 'Non-Aktif';
    }

    // Accessor untuk jenis kelamin
    public function getJenisKelaminAttribute()
    {
        return $this->jk === 'Pria' ? 'Laki-laki' : 'Perempuan';
    }
}