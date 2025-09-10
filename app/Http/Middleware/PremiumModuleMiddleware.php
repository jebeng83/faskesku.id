<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Services\PremiumModuleService;
use Illuminate\Support\Facades\Log;

class PremiumModuleMiddleware
{
    protected $premiumService;

    public function __construct(PremiumModuleService $premiumService)
    {
        $this->premiumService = $premiumService;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $moduleKey): Response
    {
        // Check if module is active
        if (!$this->premiumService->isModuleActive($moduleKey)) {
            // Log unauthorized access attempt
            Log::warning("Unauthorized access to premium module: {$moduleKey}", [
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'url' => $request->fullUrl(),
                'user_id' => auth()->id(),
            ]);

            // Return 403 Forbidden with custom message
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Premium module required. Please purchase and activate the module to access this feature.',
                    'module_key' => $moduleKey,
                    'error_code' => 'PREMIUM_MODULE_REQUIRED'
                ], 403);
            }

            // For web requests, redirect to premium modules page
            return redirect()->route('premium-modules.index')
                ->with('error', 'Premium module required. Please purchase and activate the module to access this feature.');
        }

        // Add module info to request for use in controllers
        $request->attributes->set('premium_module', $moduleKey);

        return $next($request);
    }
}
