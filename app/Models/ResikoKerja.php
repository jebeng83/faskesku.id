<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResikoKerja extends Model
{
    use HasFactory;

    protected $table = 'resiko_kerja';
    
    protected $primaryKey = 'kode_resiko';
    
    public $incrementing = false;
    
    protected $keyType = 'string';

    protected $fillable = [
        'kode_resiko',
        'nama_resiko',
        'indek'
    ];

    protected $casts = [
        'indek' => 'integer'
    ];

    public $timestamps = false;
}