<?php

namespace App\Models\Akutansi;

use Illuminate\Database\Eloquent\Model;

class AkunBayar extends Model
{
    protected $table = 'akun_bayar';
    protected $primaryKey = 'nama_bayar';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'nama_bayar',
        'kd_rek',
        'ppn',
    ];

    public function rekening()
    {
        return $this->belongsTo(Rekening::class, 'kd_rek', 'kd_rek');
    }
}