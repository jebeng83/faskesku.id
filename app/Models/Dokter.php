<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Dokter extends Model
{
    use HasFactory;

    protected $table = 'dokter';
    protected $primaryKey = 'kd_dokter';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'kd_dokter',
        'nm_dokter',
        'jk',
        'tmp_lahir',
        'tgl_lahir',
        'gol_drh',
        'agama',
        'almt_tgl',
        'no_telp',
        'stts_nikah',
        'kd_sps',
        'alumni',
        'no_ijn_praktek',
        'status'
    ];
}
