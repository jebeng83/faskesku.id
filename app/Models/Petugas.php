<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Petugas extends Model
{
    protected $table = 'petugas';
    protected $primaryKey = 'nip';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $appends = [
        'nm_petugas',
    ];

    protected $fillable = [
        'nip', 'nama', 'jk', 'tmp_lahir', 'tgl_lahir', 'gol_darah', 
        'agama', 'stts_nikah', 'alamat', 'kd_jbtn', 'no_telp', 'status'
    ];

    public function getNmPetugasAttribute()
    {
        return $this->attributes['nama'] ?? null;
    }
}
