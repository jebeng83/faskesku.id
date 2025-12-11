<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TempPanggilNoRawat extends Model
{
    protected $table = 'temppanggilnorawat';

    protected $primaryKey = 'no_rawat';

    public $timestamps = false;

    public $incrementing = false;

    protected $fillable = ['no_rawat'];
}
