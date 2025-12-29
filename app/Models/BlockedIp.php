<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BlockedIp extends Model
{
    protected $table = 'blocked_ips';

    protected $fillable = [
        'ip_address',
        'reason',
        'codes',
        'hits',
        'blocked_at',
        'expires_at',
    ];

    protected $casts = [
        'codes' => 'array',
        'hits' => 'integer',
        'blocked_at' => 'datetime',
        'expires_at' => 'datetime',
    ];
}

