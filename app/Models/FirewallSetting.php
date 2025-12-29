<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FirewallSetting extends Model
{
    protected $table = 'firewall_settings';

    protected $fillable = [
        'enabled',
        'window_seconds',
        'threshold',
        'block_minutes',
    ];

    protected $casts = [
        'enabled' => 'boolean',
        'window_seconds' => 'integer',
        'threshold' => 'integer',
        'block_minutes' => 'integer',
    ];
}

