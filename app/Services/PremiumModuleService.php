<?php

namespace App\Services;

use App\Models\PremiumModule;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class PremiumModuleService
{
    /**
     * Octane-friendly: Don't cache config or server info in constructor
     * Always get fresh values to avoid stale data between requests
     */
    public function __construct()
    {
        // Empty constructor - resolve values dynamically when needed
    }

    /**
     * Get app key dynamically (always fresh)
     */
    private function getAppKey(): string
    {
        return config('app.key');
    }

    /**
     * Generate a unique encryption key based on app key and server info
     * Octane-friendly: Always get fresh server info from request
     */
    private function generateEncryptionKey(): string
    {
        $request = request();
        $serverInfo = [
            'server_name' => $request->server('SERVER_NAME', 'localhost'),
            'document_root' => $request->server('DOCUMENT_ROOT', base_path()),
            'app_key' => $this->getAppKey(),
            'timestamp' => time(),
        ];

        return hash('sha256', json_encode($serverInfo));
    }

    /**
     * Create a new premium module
     */
    public function createModule($data)
    {
        $module = PremiumModule::create([
            'module_key' => $this->generateModuleKey($data['name']),
            'name' => $data['name'],
            'description' => $data['description'],
            'price' => $data['price'],
            'version' => $data['version'] ?? '1.0.0',
            'features' => $data['features'] ?? [],
            'permissions' => $data['permissions'] ?? [],
        ]);

        // Generate initial checksum
        $module->generateChecksum();

        return $module;
    }

    /**
     * Generate a unique module key
     */
    private function generateModuleKey($name)
    {
        $baseKey = Str::slug($name, '_');
        $timestamp = time();
        $random = Str::random(8);

        return strtoupper($baseKey.'_'.$timestamp.'_'.$random);
    }

    /**
     * Generate a secure license key with multiple layers of encryption
     */
    public function generateSecureLicenseKey($moduleId)
    {
        $module = PremiumModule::findOrFail($moduleId);

        // Create license data with multiple security layers
        $licenseData = [
            'module_key' => $module->module_key,
            'module_id' => $module->id,
            'timestamp' => time(),
            'expires_at' => time() + (365 * 24 * 60 * 60), // 1 year
            'random' => bin2hex(random_bytes(32)),
            'app_signature' => $this->generateAppSignature(),
            'server_fingerprint' => $this->generateServerFingerprint(),
            'version' => $module->version,
        ];

        // Layer 1: JSON encode
        $jsonData = json_encode($licenseData);

        // Layer 2: Base64 encode
        $base64Data = base64_encode($jsonData);

        // Layer 3: XOR with encryption key (generate fresh for each license)
        $encryptionKey = $this->generateEncryptionKey();
        $xorData = $this->xorEncrypt($base64Data, $encryptionKey);

        // Layer 4: Laravel encryption
        $encryptedData = Crypt::encryptString($xorData);

        // Layer 5: Add checksum (use fresh app key)
        $checksum = hash('sha256', $encryptedData.$this->getAppKey());
        $finalLicense = $encryptedData.'|'.$checksum;

        // Store in database
        $module->license_key = $finalLicense;
        $module->activation_hash = $this->generateActivationHash($module, $finalLicense);
        $module->save();

        return $finalLicense;
    }

    /**
     * Validate license key with all security checks
     */
    public function validateLicenseKey($licenseKey, $moduleKey = null)
    {
        try {
            // Split license and checksum
            $parts = explode('|', $licenseKey);
            if (count($parts) !== 2) {
                return false;
            }

            [$encryptedData, $checksum] = $parts;

            // Verify checksum (use fresh app key)
            $expectedChecksum = hash('sha256', $encryptedData.$this->getAppKey());
            if (! hash_equals($expectedChecksum, $checksum)) {
                return false;
            }

            // Decrypt data (generate fresh encryption key)
            $xorData = Crypt::decryptString($encryptedData);
            $encryptionKey = $this->generateEncryptionKey();
            $base64Data = $this->xorDecrypt($xorData, $encryptionKey);
            $jsonData = base64_decode($base64Data);
            $licenseData = json_decode($jsonData, true);

            if (! $licenseData) {
                return false;
            }

            // Validate data structure
            $requiredFields = ['module_key', 'module_id', 'timestamp', 'random', 'app_signature', 'server_fingerprint'];
            foreach ($requiredFields as $field) {
                if (! isset($licenseData[$field])) {
                    return false;
                }
            }

            // Validate module key if provided
            if ($moduleKey && $licenseData['module_key'] !== $moduleKey) {
                return false;
            }

            // Validate app signature
            if (! $this->validateAppSignature($licenseData['app_signature'])) {
                return false;
            }

            // Validate server fingerprint (optional - can be disabled for flexibility)
            // if (!$this->validateServerFingerprint($licenseData['server_fingerprint'])) {
            //     return false;
            // }

            // Check expiration
            if (isset($licenseData['expires_at']) && time() > $licenseData['expires_at']) {
                return false;
            }

            // Check if license is too old (max 2 years)
            $maxAge = 2 * 365 * 24 * 60 * 60;
            if (time() - $licenseData['timestamp'] > $maxAge) {
                return false;
            }

            return $licenseData;
        } catch (\Exception $e) {
            Log::error('License validation error: '.$e->getMessage());

            return false;
        }
    }

    /**
     * Activate a module with license key
     */
    public function activateModule($moduleKey, $licenseKey)
    {
        $module = PremiumModule::where('module_key', $moduleKey)->first();

        if (! $module) {
            return ['success' => false, 'message' => 'Module not found'];
        }

        $licenseData = $this->validateLicenseKey($licenseKey, $moduleKey);

        if (! $licenseData) {
            return ['success' => false, 'message' => 'Invalid license key'];
        }

        // Check if already activated
        if ($module->is_active) {
            return ['success' => false, 'message' => 'Module already activated'];
        }

        // Activate module
        $module->is_active = true;
        $module->activated_at = now();
        $module->license_key = $licenseKey;
        $module->purchased_at = now();
        $module->save();

        // Log activation
        Log::info("Premium module activated: {$moduleKey}", [
            'module_id' => $module->id,
            'activated_at' => now(),
            'ip' => request()->ip(),
        ]);

        return ['success' => true, 'message' => 'Module activated successfully'];
    }

    /**
     * Check if module is active and valid
     */
    public function isModuleActive($moduleKey)
    {
        $module = PremiumModule::where('module_key', $moduleKey)->first();

        if (! $module) {
            return false;
        }

        if (! $module->is_active) {
            return false;
        }

        // Validate license if exists
        if ($module->license_key) {
            $licenseData = $this->validateLicenseKey($module->license_key, $moduleKey);
            if (! $licenseData) {
                $module->is_active = false;
                $module->save();

                return false;
            }
        }

        // Check expiration
        if ($module->expires_at && $module->expires_at->isPast()) {
            $module->is_active = false;
            $module->save();

            return false;
        }

        return true;
    }

    /**
     * XOR encryption/decryption
     */
    private function xorEncrypt($data, $key)
    {
        $result = '';
        $keyLength = strlen($key);

        for ($i = 0; $i < strlen($data); $i++) {
            $result .= $data[$i] ^ $key[$i % $keyLength];
        }

        return base64_encode($result);
    }

    private function xorDecrypt($data, $key)
    {
        $data = base64_decode($data);
        $result = '';
        $keyLength = strlen($key);

        for ($i = 0; $i < strlen($data); $i++) {
            $result .= $data[$i] ^ $key[$i % $keyLength];
        }

        return $result;
    }

    /**
     * Generate app signature for license validation
     * Octane-friendly: Always get fresh config values
     */
    private function generateAppSignature(): string
    {
        $data = [
            'app_name' => config('app.name'),
            'app_key' => $this->getAppKey(),
            'app_env' => config('app.env'),
            'timestamp' => time(),
        ];

        return hash('sha256', json_encode($data));
    }

    /**
     * Validate app signature
     */
    private function validateAppSignature($signature)
    {
        $expectedSignature = $this->generateAppSignature();

        return hash_equals($expectedSignature, $signature);
    }

    /**
     * Generate server fingerprint
     * Octane-friendly: Always get fresh server info from request
     */
    private function generateServerFingerprint(): string
    {
        $request = request();
        $serverInfo = [
            'server_name' => $request->server('SERVER_NAME', 'localhost'),
            'document_root' => $request->server('DOCUMENT_ROOT', base_path()),
            'server_software' => $request->server('SERVER_SOFTWARE', 'unknown'),
            'php_version' => PHP_VERSION,
        ];

        return hash('sha256', json_encode($serverInfo));
    }

    /**
     * Validate server fingerprint
     */
    private function validateServerFingerprint($fingerprint)
    {
        $expectedFingerprint = $this->generateServerFingerprint();

        return hash_equals($expectedFingerprint, $fingerprint);
    }

    /**
     * Generate activation hash
     * Octane-friendly: Always get fresh app key
     */
    private function generateActivationHash($module, $licenseKey): string
    {
        $data = $module->module_key.$licenseKey.$this->getAppKey().time();

        return hash('sha256', $data);
    }

    /**
     * Get all available modules
     */
    public function getAvailableModules()
    {
        return PremiumModule::available()->get();
    }

    /**
     * Get all active modules
     */
    public function getActiveModules()
    {
        return PremiumModule::active()->get();
    }

    /**
     * Deactivate module
     */
    public function deactivateModule($moduleKey)
    {
        $module = PremiumModule::where('module_key', $moduleKey)->first();

        if (! $module) {
            return false;
        }

        $module->is_active = false;
        $module->save();

        Log::info("Premium module deactivated: {$moduleKey}");

        return true;
    }
}
