<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class PremiumModule extends Model
{
    use HasFactory;

    protected $fillable = [
        'module_key',
        'name',
        'description',
        'price',
        'version',
        'is_active',
        'license_key',
        'activation_hash',
        'purchased_at',
        'activated_at',
        'expires_at',
        'features',
        'permissions',
        'checksum',
        'encrypted_data',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'price' => 'decimal:2',
        'purchased_at' => 'datetime',
        'activated_at' => 'datetime',
        'expires_at' => 'datetime',
        'features' => 'array',
        'permissions' => 'array',
    ];

    /**
     * Generate a unique license key for the module
     */
    public function generateLicenseKey()
    {
        $data = [
            'module_key' => $this->module_key,
            'timestamp' => time(),
            'random' => bin2hex(random_bytes(16)),
            'app_id' => config('app.key'),
        ];

        $licenseData = json_encode($data);
        $this->license_key = Crypt::encryptString($licenseData);

        // Generate activation hash
        $this->activation_hash = Hash::make($this->module_key . $this->license_key . config('app.key'));

        return $this->license_key;
    }

    /**
     * Validate license key
     */
    public function validateLicenseKey($licenseKey)
    {
        try {
            $decrypted = Crypt::decryptString($licenseKey);
            $data = json_decode($decrypted, true);

            // Validate data structure
            if (!isset($data['module_key']) || !isset($data['timestamp']) || !isset($data['random'])) {
                return false;
            }

            // Validate module key matches
            if ($data['module_key'] !== $this->module_key) {
                return false;
            }

            // Check if license is not too old (optional - 1 year)
            $maxAge = 365 * 24 * 60 * 60; // 1 year in seconds
            if (time() - $data['timestamp'] > $maxAge) {
                return false;
            }

            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Activate the module
     */
    public function activate($licenseKey)
    {
        if (!$this->validateLicenseKey($licenseKey)) {
            return false;
        }

        $this->is_active = true;
        $this->activated_at = now();
        $this->license_key = $licenseKey;
        $this->save();

        return true;
    }

    /**
     * Check if module is active and not expired
     */
    public function isActive()
    {
        if (!$this->is_active) {
            return false;
        }

        // Check expiration if set
        if ($this->expires_at && $this->expires_at->isPast()) {
            $this->is_active = false;
            $this->save();
            return false;
        }

        return true;
    }

    /**
     * Get module features
     */
    public function getFeatures()
    {
        return $this->features ?? [];
    }

    /**
     * Check if module has specific feature
     */
    public function hasFeature($feature)
    {
        return in_array($feature, $this->getFeatures());
    }

    /**
     * Generate checksum for file integrity
     */
    public function generateChecksum()
    {
        $data = $this->module_key . $this->version . config('app.key');
        $this->checksum = hash('sha256', $data);
        $this->save();

        return $this->checksum;
    }

    /**
     * Validate checksum
     */
    public function validateChecksum()
    {
        if (!$this->checksum) {
            return false;
        }

        $data = $this->module_key . $this->version . config('app.key');
        $expectedChecksum = hash('sha256', $data);

        return hash_equals($this->checksum, $expectedChecksum);
    }

    /**
     * Encrypt additional data
     */
    public function encryptData($data)
    {
        $this->encrypted_data = Crypt::encryptString(json_encode($data));
        $this->save();

        return $this->encrypted_data;
    }

    /**
     * Decrypt additional data
     */
    public function decryptData()
    {
        if (!$this->encrypted_data) {
            return null;
        }

        try {
            $decrypted = Crypt::decryptString($this->encrypted_data);
            return json_decode($decrypted, true);
        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     * Scope for active modules
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true)
            ->where(function ($q) {
                $q->whereNull('expires_at')
                    ->orWhere('expires_at', '>', now());
            });
    }

    /**
     * Scope for available modules (not purchased)
     */
    public function scopeAvailable($query)
    {
        return $query->where('is_active', false);
    }
}
