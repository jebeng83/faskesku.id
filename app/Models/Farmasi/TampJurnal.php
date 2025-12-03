<?php

namespace App\Models\Farmasi;

use Illuminate\Database\Eloquent\Model;

class TampJurnal extends Model
{
    protected $connection = 'fufufafa';
    protected $table = 'tampjurnal';

    public $timestamps = false;

    protected $fillable = ['kd_rek', 'nm_rek', 'debet', 'kredit'];
}
