<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PcareBpjsLog extends Model
{
    use HasFactory;

    protected $table = 'pcare_bpjs_log';

    protected $fillable = [
        'no_rawat',
        'endpoint',
        'status',
        'http_status',
        'meta_code',
        'meta_message',
        'duration_ms',
        'request_payload',
        'response_body_raw',
        'response_body_json',
        'triggered_by',
        'correlation_id',
    ];

    protected $casts = [
        'request_payload' => 'array',
        'response_body_json' => 'array',
    ];
}

