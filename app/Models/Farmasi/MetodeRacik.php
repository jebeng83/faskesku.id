<?php

namespace App\Models\Farmasi;

use Illuminate\Database\Eloquent\Model;

class MetodeRacik extends Model
{
    protected $table = 'metode_racik';
    protected $primaryKey = 'kd_racik';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'kd_racik',
        'nm_racik'
    ];
}
