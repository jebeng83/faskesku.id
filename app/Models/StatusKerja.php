<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StatusKerja extends Model
{
    protected $table = 'stts_kerja';
    
    protected $fillable = [
        'stts',
        'ktg',
        'indek',
        'hakcuti'
    ];
    
    public $timestamps = false;
}