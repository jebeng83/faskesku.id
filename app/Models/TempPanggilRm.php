<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TempPanggilRm extends Model
{
    protected $table = 'temppanggilrm';
    protected $primaryKey = 'no_rkm_medis';
    public $timestamps = false;
    public $incrementing = false;

    protected $fillable = ['no_rkm_medis'];
}