<?php

namespace App\Helpers;

use App\Services\PremiumModuleService;
use Illuminate\Support\Facades\App;

class PremiumModuleHelper
{
    /**
     * Get premium service instance
     *
     * Octane-friendly: Always resolve fresh instance to avoid memory leaks
     */
    protected static function getPremiumService()
    {
        return App::make(PremiumModuleService::class);
    }

    /**
     * Check if a premium module is active
     */
    public static function isModuleActive($moduleKey)
    {
        return self::getPremiumService()->isModuleActive($moduleKey);
    }

    /**
     * Check if user has access to premium feature
     */
    public static function hasAccess($moduleKey, $feature = null)
    {
        if (! self::isModuleActive($moduleKey)) {
            return false;
        }

        // If specific feature is requested, check if module has that feature
        if ($feature) {
            $module = \App\Models\PremiumModule::where('module_key', $moduleKey)->first();
            if ($module && ! $module->hasFeature($feature)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Get premium module info
     */
    public static function getModuleInfo($moduleKey)
    {
        return \App\Models\PremiumModule::where('module_key', $moduleKey)->first();
    }

    /**
     * Get all active modules
     */
    public static function getActiveModules()
    {
        return self::getPremiumService()->getActiveModules();
    }

    /**
     * Get all available modules
     */
    public static function getAvailableModules()
    {
        return self::getPremiumService()->getAvailableModules();
    }

    /**
     * Check if user can access premium route
     */
    public static function canAccessRoute($moduleKey)
    {
        return self::isModuleActive($moduleKey);
    }

    /**
     * Get premium module status
     */
    public static function getModuleStatus($moduleKey)
    {
        $module = self::getModuleInfo($moduleKey);
        if (! $module) {
            return 'not_found';
        }

        if ($module->isActive()) {
            return 'active';
        }

        if ($module->is_active) {
            return 'expired';
        }

        return 'inactive';
    }

    /**
     * Get premium module features
     */
    public static function getModuleFeatures($moduleKey)
    {
        $module = self::getModuleInfo($moduleKey);

        return $module ? $module->getFeatures() : [];
    }

    /**
     * Check if module has specific feature
     */
    public static function hasFeature($moduleKey, $feature)
    {
        $module = self::getModuleInfo($moduleKey);

        return $module ? $module->hasFeature($feature) : false;
    }

    /**
     * Get premium module permissions
     */
    public static function getModulePermissions($moduleKey)
    {
        $module = self::getModuleInfo($moduleKey);

        return $module ? $module->permissions : [];
    }

    /**
     * Check if user has premium permission
     */
    public static function hasPermission($moduleKey, $permission)
    {
        if (! self::isModuleActive($moduleKey)) {
            return false;
        }

        $permissions = self::getModulePermissions($moduleKey);

        return in_array($permission, $permissions);
    }

    /**
     * Get premium module price
     */
    public static function getModulePrice($moduleKey)
    {
        $module = self::getModuleInfo($moduleKey);

        return $module ? $module->price : 0;
    }

    /**
     * Format price for display
     */
    public static function formatPrice($price)
    {
        return 'Rp '.number_format($price, 0, ',', '.');
    }

    /**
     * Get premium module activation date
     */
    public static function getActivationDate($moduleKey)
    {
        $module = self::getModuleInfo($moduleKey);

        return $module ? $module->activated_at : null;
    }

    /**
     * Get premium module expiration date
     */
    public static function getExpirationDate($moduleKey)
    {
        $module = self::getModuleInfo($moduleKey);

        return $module ? $module->expires_at : null;
    }

    /**
     * Check if module is expired
     */
    public static function isExpired($moduleKey)
    {
        $expirationDate = self::getExpirationDate($moduleKey);
        if (! $expirationDate) {
            return false; // No expiration date means lifetime
        }

        return $expirationDate->isPast();
    }

    /**
     * Get days until expiration
     */
    public static function getDaysUntilExpiration($moduleKey)
    {
        $expirationDate = self::getExpirationDate($moduleKey);
        if (! $expirationDate) {
            return null; // No expiration date means lifetime
        }

        return now()->diffInDays($expirationDate, false);
    }

    /**
     * Get premium module statistics
     */
    public static function getModuleStats()
    {
        $totalModules = \App\Models\PremiumModule::count();
        $activeModules = \App\Models\PremiumModule::active()->count();
        $availableModules = \App\Models\PremiumModule::available()->count();
        $totalRevenue = \App\Models\PremiumModule::where('is_active', true)->sum('price');

        return [
            'total_modules' => $totalModules,
            'active_modules' => $activeModules,
            'available_modules' => $availableModules,
            'total_revenue' => $totalRevenue,
            'activation_rate' => $totalModules > 0 ? round(($activeModules / $totalModules) * 100, 2) : 0,
        ];
    }

    /**
     * Generate premium module purchase URL
     */
    public static function getPurchaseUrl($moduleKey)
    {
        return route('premium-modules.show', ['premium_module' => $moduleKey]);
    }

    /**
     * Generate premium module activation URL
     */
    public static function getActivationUrl($moduleKey)
    {
        return route('premium-modules.activate');
    }

    /**
     * Check if premium module is required for current route
     */
    public static function isRequiredForRoute($routeName)
    {
        // Define which routes require premium modules
        $premiumRoutes = [
            'advanced-reports.*' => 'ADVANCED_REPORTING_MODULE',
            'multi-branch.*' => 'MULTI_BRANCH_MANAGEMENT',
            'inventory.*' => 'INVENTORY_MANAGEMENT_SYSTEM',
            'telemedicine.*' => 'TELEMEDICINE_PLATFORM',
            'financial.*' => 'FINANCIAL_MANAGEMENT_SUITE',
            'ai-diagnostics.*' => 'AI_DIAGNOSTIC_ASSISTANT',
        ];

        foreach ($premiumRoutes as $routePattern => $moduleKey) {
            if (fnmatch($routePattern, $routeName)) {
                return $moduleKey;
            }
        }

        return null;
    }

    /**
     * Get premium module error message
     */
    public static function getErrorMessage($moduleKey)
    {
        $module = self::getModuleInfo($moduleKey);
        $moduleName = $module ? $module->name : 'Premium Module';
        $price = $module ? self::formatPrice($module->price) : 'N/A';

        return "This feature requires the {$moduleName} premium module. Price: {$price}. Please purchase and activate the module to access this feature.";
    }

    /**
     * Log premium module access attempt
     */
    public static function logAccessAttempt($moduleKey, $success = false)
    {
        $logData = [
            'module_key' => $moduleKey,
            'success' => $success,
            'ip' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'user_id' => auth()->id(),
            'url' => request()->fullUrl(),
            'timestamp' => now(),
        ];

        if ($success) {
            \Illuminate\Support\Facades\Log::info('Premium module accessed', $logData);
        } else {
            \Illuminate\Support\Facades\Log::warning('Premium module access denied', $logData);
        }
    }
}
