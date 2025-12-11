<?php

namespace App\Models\Farmasi;

use Illuminate\Database\Eloquent\Model;

class AkunBayar extends Model
{
    protected $table = 'akun_bayar';

    public $timestamps = false;

    protected $fillable = ['nama_bayar', 'kode_rek', 'ppn'];
}
