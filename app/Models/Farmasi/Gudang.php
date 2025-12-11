<?php

namespace App\Models\Farmasi;

use Illuminate\Database\Eloquent\Model;

class Gudang extends Model
{
    protected $table = 'bangsal';

    protected $primaryKey = 'kd_bangsal';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = ['kd_bangsal', 'nm_bangsal'];
}
