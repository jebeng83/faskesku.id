<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StatusWP extends Model
{
    use HasFactory;

    protected $table = 'stts_wp';
    
    protected $fillable = [
        'stts',
        'ktg'
    ];

    public $timestamps = false;
}