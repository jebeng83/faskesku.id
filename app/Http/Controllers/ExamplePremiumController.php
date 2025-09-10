<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\PremiumModuleHelper;
use Inertia\Inertia;

class ExamplePremiumController extends Controller
{
    /**
     * Example of a premium feature that requires Advanced Reporting Module
     */
    public function advancedReports()
    {
        // This route is protected by PremiumModuleMiddleware
        // The middleware will check if ADVANCED_REPORTING_MODULE is active

        return Inertia::render('PremiumFeatures/AdvancedReports', [
            'moduleInfo' => PremiumModuleHelper::getModuleInfo('ADVANCED_REPORTING_MODULE'),
            'features' => PremiumModuleHelper::getModuleFeatures('ADVANCED_REPORTING_MODULE'),
        ]);
    }

    /**
     * Example of a premium feature that requires Multi Branch Management
     */
    public function multiBranchDashboard()
    {
        // This route is protected by PremiumModuleMiddleware
        // The middleware will check if MULTI_BRANCH_MANAGEMENT is active

        return Inertia::render('PremiumFeatures/MultiBranchDashboard', [
            'moduleInfo' => PremiumModuleHelper::getModuleInfo('MULTI_BRANCH_MANAGEMENT'),
            'branches' => $this->getBranches(), // This would be your actual data
        ]);
    }

    /**
     * Example of a premium feature that requires Inventory Management
     */
    public function inventoryDashboard()
    {
        // This route is protected by PremiumModuleMiddleware
        // The middleware will check if INVENTORY_MANAGEMENT_SYSTEM is active

        return Inertia::render('PremiumFeatures/InventoryDashboard', [
            'moduleInfo' => PremiumModuleHelper::getModuleInfo('INVENTORY_MANAGEMENT_SYSTEM'),
            'inventory' => $this->getInventoryData(), // This would be your actual data
        ]);
    }

    /**
     * Example of a premium feature that requires Telemedicine Platform
     */
    public function telemedicineConsultation()
    {
        // This route is protected by PremiumModuleMiddleware
        // The middleware will check if TELEMEDICINE_PLATFORM is active

        return Inertia::render('PremiumFeatures/TelemedicineConsultation', [
            'moduleInfo' => PremiumModuleHelper::getModuleInfo('TELEMEDICINE_PLATFORM'),
            'consultations' => $this->getConsultations(), // This would be your actual data
        ]);
    }

    /**
     * Example of a premium feature that requires Financial Management Suite
     */
    public function financialDashboard()
    {
        // This route is protected by PremiumModuleMiddleware
        // The middleware will check if FINANCIAL_MANAGEMENT_SUITE is active

        return Inertia::render('PremiumFeatures/FinancialDashboard', [
            'moduleInfo' => PremiumModuleHelper::getModuleInfo('FINANCIAL_MANAGEMENT_SUITE'),
            'financials' => $this->getFinancialData(), // This would be your actual data
        ]);
    }

    /**
     * Example of a premium feature that requires AI Diagnostic Assistant
     */
    public function aiDiagnostics()
    {
        // This route is protected by PremiumModuleMiddleware
        // The middleware will check if AI_DIAGNOSTIC_ASSISTANT is active

        return Inertia::render('PremiumFeatures/AIDiagnostics', [
            'moduleInfo' => PremiumModuleHelper::getModuleInfo('AI_DIAGNOSTIC_ASSISTANT'),
            'diagnostics' => $this->getDiagnosticData(), // This would be your actual data
        ]);
    }

    /**
     * Example of checking premium module access in controller method
     */
    public function someFeature()
    {
        // Check if user has access to specific premium module
        if (!PremiumModuleHelper::hasAccess('ADVANCED_REPORTING_MODULE')) {
            return response()->json([
                'success' => false,
                'message' => PremiumModuleHelper::getErrorMessage('ADVANCED_REPORTING_MODULE'),
                'error_code' => 'PREMIUM_MODULE_REQUIRED'
            ], 403);
        }

        // Check if user has access to specific feature
        if (!PremiumModuleHelper::hasFeature('ADVANCED_REPORTING_MODULE', 'Custom Dashboard Builder')) {
            return response()->json([
                'success' => false,
                'message' => 'This feature requires the Custom Dashboard Builder feature.',
                'error_code' => 'PREMIUM_FEATURE_REQUIRED'
            ], 403);
        }

        // Proceed with premium feature
        return response()->json([
            'success' => true,
            'data' => 'Premium feature data here'
        ]);
    }

    /**
     * Example of checking premium module access with blade directive
     */
    public function bladeExample()
    {
        return view('premium-features.example', [
            'hasAdvancedReports' => PremiumModuleHelper::hasAccess('ADVANCED_REPORTING_MODULE'),
            'hasMultiBranch' => PremiumModuleHelper::hasAccess('MULTI_BRANCH_MANAGEMENT'),
            'hasInventory' => PremiumModuleHelper::hasAccess('INVENTORY_MANAGEMENT_SYSTEM'),
            'hasTelemedicine' => PremiumModuleHelper::hasAccess('TELEMEDICINE_PLATFORM'),
            'hasFinancial' => PremiumModuleHelper::hasAccess('FINANCIAL_MANAGEMENT_SUITE'),
            'hasAI' => PremiumModuleHelper::hasAccess('AI_DIAGNOSTIC_ASSISTANT'),
        ]);
    }

    /**
     * Example of API endpoint with premium module check
     */
    public function apiEndpoint(Request $request)
    {
        // Check if required premium module is active
        $requiredModule = 'ADVANCED_REPORTING_MODULE';

        if (!PremiumModuleHelper::isModuleActive($requiredModule)) {
            PremiumModuleHelper::logAccessAttempt($requiredModule, false);

            return response()->json([
                'success' => false,
                'message' => PremiumModuleHelper::getErrorMessage($requiredModule),
                'error_code' => 'PREMIUM_MODULE_REQUIRED',
                'module_key' => $requiredModule,
                'purchase_url' => PremiumModuleHelper::getPurchaseUrl($requiredModule)
            ], 403);
        }

        // Log successful access
        PremiumModuleHelper::logAccessAttempt($requiredModule, true);

        // Proceed with API logic
        return response()->json([
            'success' => true,
            'data' => 'Premium API data here'
        ]);
    }

    // Private helper methods (these would contain your actual business logic)
    private function getBranches()
    {
        // Your actual branch data logic here
        return [];
    }

    private function getInventoryData()
    {
        // Your actual inventory data logic here
        return [];
    }

    private function getConsultations()
    {
        // Your actual consultation data logic here
        return [];
    }

    private function getFinancialData()
    {
        // Your actual financial data logic here
        return [];
    }

    private function getDiagnosticData()
    {
        // Your actual diagnostic data logic here
        return [];
    }
}
