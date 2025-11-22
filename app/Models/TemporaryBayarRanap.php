<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TemporaryBayarRanap extends Model
{
    protected $table = 'temporary_bayar_ranap';
    protected $primaryKey = 'no';
    public $timestamps = false;
    public $incrementing = false;

    protected $fillable = [
        'no',
        'temp1','temp2','temp3','temp4','temp5','temp6','temp7','temp8','temp9',
        'temp10','temp11','temp12','temp13','temp14','temp15','temp16','temp17',
    ];
}