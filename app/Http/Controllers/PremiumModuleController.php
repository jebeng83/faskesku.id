<?php

namespace App\Http\Controllers;

use App\Models\PremiumModule;
use App\Services\PremiumModuleService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class PremiumModuleController extends Controller
{
    protected $premiumService;

    public function __construct(PremiumModuleService $premiumService)
    {
        $this->premiumService = $premiumService;
    }

    /**
     * Display a listing of premium modules
     */
    public function index()
    {
        $modules = PremiumModule::all();

        return Inertia::render('PremiumModules/Index', [
            'modules' => $modules,
            'activeModules' => $this->premiumService->getActiveModules(),
            'availableModules' => $this->premiumService->getAvailableModules(),
        ]);
    }

    /**
     * Show the form for creating a new module
     */
    public function create()
    {
        return Inertia::render('PremiumModules/Create');
    }

    /**
     * Store a newly created module
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'version' => 'nullable|string|max:20',
            'features' => 'nullable|array',
            'permissions' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        try {
            $module = $this->premiumService->createModule($request->all());

            return redirect()->route('premium-modules.index')
                ->with('success', 'Premium module created successfully.');
        } catch (\Exception $e) {
            Log::error('Error creating premium module: '.$e->getMessage());

            return back()->with('error', 'Failed to create premium module. Please try again.');
        }
    }

    /**
     * Display the specified module
     */
    public function show(PremiumModule $premiumModule)
    {
        return Inertia::render('PremiumModules/Show', [
            'module' => $premiumModule,
            'isActive' => $this->premiumService->isModuleActive($premiumModule->module_key),
        ]);
    }

    /**
     * Show the form for editing the module
     */
    public function edit(PremiumModule $premiumModule)
    {
        return Inertia::render('PremiumModules/Edit', [
            'module' => $premiumModule,
        ]);
    }

    /**
     * Update the specified module
     */
    public function update(Request $request, PremiumModule $premiumModule)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'version' => 'nullable|string|max:20',
            'features' => 'nullable|array',
            'permissions' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        try {
            $premiumModule->update($request->all());

            // Regenerate checksum after update
            $premiumModule->generateChecksum();

            return redirect()->route('premium-modules.index')
                ->with('success', 'Premium module updated successfully.');
        } catch (\Exception $e) {
            Log::error('Error updating premium module: '.$e->getMessage());

            return back()->with('error', 'Failed to update premium module. Please try again.');
        }
    }

    /**
     * Generate license key for module
     */
    public function generateLicense(PremiumModule $premiumModule)
    {
        try {
            $licenseKey = $this->premiumService->generateSecureLicenseKey($premiumModule->id);

            return response()->json([
                'success' => true,
                'license_key' => $licenseKey,
                'message' => 'License key generated successfully.',
            ]);
        } catch (\Exception $e) {
            Log::error('Error generating license key: '.$e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to generate license key.',
            ], 500);
        }
    }

    /**
     * Activate module with license key
     */
    public function activate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'module_key' => 'required|string',
            'license_key' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid input data.',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $result = $this->premiumService->activateModule(
                $request->module_key,
                $request->license_key
            );

            return response()->json($result);
        } catch (\Exception $e) {
            Log::error('Error activating module: '.$e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to activate module. Please try again.',
            ], 500);
        }
    }

    /**
     * Deactivate module
     */
    public function deactivate(PremiumModule $premiumModule)
    {
        try {
            $this->premiumService->deactivateModule($premiumModule->module_key);

            return response()->json([
                'success' => true,
                'message' => 'Module deactivated successfully.',
            ]);
        } catch (\Exception $e) {
            Log::error('Error deactivating module: '.$e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to deactivate module.',
            ], 500);
        }
    }

    /**
     * Check module status
     */
    public function status(PremiumModule $premiumModule)
    {
        $isActive = $this->premiumService->isModuleActive($premiumModule->module_key);

        return response()->json([
            'success' => true,
            'is_active' => $isActive,
            'module_key' => $premiumModule->module_key,
            'activated_at' => $premiumModule->activated_at,
            'expires_at' => $premiumModule->expires_at,
        ]);
    }

    /**
     * Validate license key
     */
    public function validateLicense(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'license_key' => 'required|string',
            'module_key' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid input data.',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $licenseData = $this->premiumService->validateLicenseKey(
                $request->license_key,
                $request->module_key
            );

            if ($licenseData) {
                return response()->json([
                    'success' => true,
                    'valid' => true,
                    'license_data' => $licenseData,
                ]);
            } else {
                return response()->json([
                    'success' => true,
                    'valid' => false,
                    'message' => 'Invalid license key.',
                ]);
            }
        } catch (\Exception $e) {
            Log::error('Error validating license: '.$e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to validate license key.',
            ], 500);
        }
    }

    /**
     * Remove the specified module
     */
    public function destroy(PremiumModule $premiumModule)
    {
        try {
            // Deactivate first
            $this->premiumService->deactivateModule($premiumModule->module_key);

            // Then delete
            $premiumModule->delete();

            return redirect()->route('premium-modules.index')
                ->with('success', 'Premium module deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Error deleting premium module: '.$e->getMessage());

            return back()->with('error', 'Failed to delete premium module.');
        }
    }
}
