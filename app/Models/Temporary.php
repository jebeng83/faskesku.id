<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Temporary extends Model
{
    protected $table = 'temporary';
    protected $primaryKey = 'no';
    public $timestamps = false;
    public $incrementing = false;

    protected $fillable = [
        'no',
        'temp1','temp2','temp3','temp4','temp5','temp6','temp7','temp8','temp9','temp10',
        'temp11','temp12','temp13','temp14','temp15','temp16','temp17','temp18','temp19','temp20',
        'temp21','temp22','temp23','temp24','temp25','temp26','temp27','temp28','temp29','temp30',
        'temp31','temp32','temp33','temp34','temp35','temp36','temp37',
    ];
}