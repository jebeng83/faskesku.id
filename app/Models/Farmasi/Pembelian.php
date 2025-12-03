<?php

namespace App\Models\Farmasi;

use Illuminate\Database\Eloquent\Model;

class Pembelian extends Model
{
    protected $table = 'pembelian';

    protected $primaryKey = 'no_faktur';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = ['no_faktur', 'kode_suplier', 'nip', 'tgl_beli', 'total1', 'potongan', 'total2', 'ppn', 'tagihan', 'kd_bangsal', 'kd_rek'];
}
