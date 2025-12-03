<?php

namespace App\Models\Farmasi;

use Illuminate\Database\Eloquent\Model;

class MutasiBarang extends Model
{
    protected $table = 'mutasibarang';

    public $timestamps = false;

    protected $fillable = ['kode_brng', 'jml', 'harga', 'kd_bangsaldari', 'kd_bangsalke', 'tanggal', 'keterangan', 'no_batch', 'no_faktur'];
}
