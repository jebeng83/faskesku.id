<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;
use App\Helpers\PremiumModuleHelper;

class PremiumModuleServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Register Blade directives for premium modules
        $this->registerBladeDirectives();
    }

    /**
     * Register Blade directives
     */
    protected function registerBladeDirectives()
    {
        // @premium directive - check if module is active
        Blade::directive('premium', function ($expression) {
            return "<?php if(App\Helpers\PremiumModuleHelper::isModuleActive($expression)): ?>";
        });

        // @endpremium directive
        Blade::directive('endpremium', function () {
            return "<?php endif; ?>";
        });

        // @premiumfeature directive - check if module has specific feature
        Blade::directive('premiumfeature', function ($expression) {
            return "<?php if(App\Helpers\PremiumModuleHelper::hasFeature($expression)): ?>";
        });

        // @endpremiumfeature directive
        Blade::directive('endpremiumfeature', function () {
            return "<?php endif; ?>";
        });

        // @premiumaccess directive - check if user has access to module
        Blade::directive('premiumaccess', function ($expression) {
            return "<?php if(App\Helpers\PremiumModuleHelper::hasAccess($expression)): ?>";
        });

        // @endpremiumaccess directive
        Blade::directive('endpremiumaccess', function () {
            return "<?php endif; ?>";
        });

        // @premiumpermission directive - check if user has specific permission
        Blade::directive('premiumpermission', function ($expression) {
            return "<?php if(App\Helpers\PremiumModuleHelper::hasPermission($expression)): ?>";
        });

        // @endpremiumpermission directive
        Blade::directive('endpremiumpermission', function () {
            return "<?php endif; ?>";
        });

        // @premiumelse directive - else clause for premium modules
        Blade::directive('premiumelse', function () {
            return "<?php else: ?>";
        });

        // @premiumprice directive - format price for display
        Blade::directive('premiumprice', function ($expression) {
            return "<?php echo App\Helpers\PremiumModuleHelper::formatPrice($expression); ?>";
        });

        // @premiummodule directive - get module info
        Blade::directive('premiummodule', function ($expression) {
            return "<?php echo App\Helpers\PremiumModuleHelper::getModuleInfo($expression); ?>";
        });

        // @premiumfeatures directive - get module features
        Blade::directive('premiumfeatures', function ($expression) {
            return "<?php echo App\Helpers\PremiumModuleHelper::getModuleFeatures($expression); ?>";
        });

        // @premiumstatus directive - get module status
        Blade::directive('premiumstatus', function ($expression) {
            return "<?php echo App\Helpers\PremiumModuleHelper::getModuleStatus($expression); ?>";
        });

        // @premiumerror directive - get error message for module
        Blade::directive('premiumerror', function ($expression) {
            return "<?php echo App\Helpers\PremiumModuleHelper::getErrorMessage($expression); ?>";
        });

        // @premiumpurchase directive - get purchase URL
        Blade::directive('premiumpurchase', function ($expression) {
            return "<?php echo App\Helpers\PremiumModuleHelper::getPurchaseUrl($expression); ?>";
        });

        // @premiumactivation directive - get activation URL
        Blade::directive('premiumactivation', function ($expression) {
            return "<?php echo App\Helpers\PremiumModuleHelper::getActivationUrl($expression); ?>";
        });
    }
}
