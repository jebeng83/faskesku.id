<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class WhatsAppCredential extends Model
{
    protected $table = 'whatsapp_credentials';
    protected $fillable = [
        'name',
        'phone_number_id',
        'verify_token',
        'graph_version',
        'graph_base',
        'active',
        'last_rotated_at',
        'token_cipher',
        'app_secret_cipher',
    ];
    protected $hidden = [
        'token_cipher',
        'app_secret_cipher',
    ];
    protected $casts = [
        'active' => 'boolean',
        'last_rotated_at' => 'datetime',
    ];

    public function setTokenAttribute($value): void
    {
        if ($value !== null && $value !== '') {
            $this->attributes['token_cipher'] = Crypt::encryptString($value);
        }
    }

    public function getTokenAttribute(): ?string
    {
        $c = $this->attributes['token_cipher'] ?? null;
        if (! $c) {
            return null;
        }
        try {
            return Crypt::decryptString($c);
        } catch (\Throwable $e) {
            return null;
        }
    }

    public function setAppSecretAttribute($value): void
    {
        if ($value !== null && $value !== '') {
            $this->attributes['app_secret_cipher'] = Crypt::encryptString($value);
        }
    }

    public function getAppSecretAttribute(): ?string
    {
        $c = $this->attributes['app_secret_cipher'] ?? null;
        if (! $c) {
            return null;
        }
        try {
            return Crypt::decryptString($c);
        } catch (\Throwable $e) {
            return null;
        }
    }
}

