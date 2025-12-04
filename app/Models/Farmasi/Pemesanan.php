<?php

namespace App\Models\Farmasi;

use Illuminate\Database\Eloquent\Model;

class Pemesanan extends Model
{
    protected $connection = 'fufufafa';

    protected $table = 'pemesanan';

    protected $primaryKey = 'no_faktur';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = ['no_faktur', 'no_order', 'kode_suplier', 'nip', 'tgl_pesan', 'tgl_faktur', 'tgl_tempo', 'subtotal', 'dis', 'total', 'ppn', 'meterai', 'tagihan', 'kd_bangsal', 'status'];
}
