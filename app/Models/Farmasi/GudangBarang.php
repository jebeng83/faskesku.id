<?php

namespace App\Models\Farmasi;

use Illuminate\Database\Eloquent\Model;

class GudangBarang extends Model
{
    protected $table = 'gudangbarang';

    public $timestamps = false;

    protected $fillable = ['kode_brng', 'kd_bangsal', 'stok', 'no_batch', 'no_faktur'];
}
