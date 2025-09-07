<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;

class Employee extends Model
{
    use HasFactory;
    protected $table = 'pegawai';
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
    ];

    protected $casts = [
        'tgl_lahir' => 'date',
        'mulai_kerja' => 'date',
        'mulai_kontrak' => 'date',
    ];

    /**
     * Get the user associated with the employee.
     */
    public function user()
    {
        return $this->hasOne(User::class, 'nik', 'nik');
    }

    public function __construct(array $attributes = [])
    {
        $this->setRawAttributes([
            'jk' => 'Pria',
            'jbtn' => '-',
            'jnj_jabatan' => '-',
            'kode_kelompok' => '-',
            'kode_resiko' => '-',
            'kode_emergency' => '-',
            'departemen' => '-',
            'bidang' => '-',
            'stts_wp' => '-',
            'stts_kerja' => '-',
            'npwp' => '',
            'pendidikan' => '-',
            'gapok' => '0',
            'tmp_lahir' => '',
            'tgl_lahir' => '0000-00-00',
            'alamat' => '',
            'kota' => '',
            'mulai_kerja' => Carbon::now()->format('Y-m-d'),
            'ms_kerja' => '<1',
            'indexins' => '-',
            'bpd' => 'BPD',
            'rekening' => '',
            'stts_aktif' => 'AKTIF',
            'wajibmasuk' => '0',
            'pengurang' => '0',
            'indek' => '0',
            'mulai_kontrak' => Carbon::now()->format('Y-m-d'),
            'cuti_diambil' => '0',
            'dankes' => '0',
            'photo' => '',
        ], true);
        parent::__construct($attributes);
    }
}
