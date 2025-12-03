<?php

namespace App\Models\Akutansi;

use Illuminate\Database\Eloquent\Model;

class SubRekening extends Model
{
    protected $table = 'subrekening';

    public $timestamps = false;

    public $incrementing = false;

    protected $primaryKey = null; // composite key (kd_rek, kd_rek2)

    protected $fillable = [
        'kd_rek',   // induk
        'kd_rek2',  // anak
    ];
}
