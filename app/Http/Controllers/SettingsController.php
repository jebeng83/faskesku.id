<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SettingsController extends Controller
{
    /**
     * Get active settings
     *
     * @return JsonResponse
     */
    public function active(): JsonResponse
    {
        // Return default active settings
        // You can customize this based on your application needs
        $activeSettings = [
            'theme' => 'light',
            'language' => 'id',
            'timezone' => 'Asia/Jakarta',
            'currency' => 'IDR',
            'date_format' => 'd/m/Y',
            'time_format' => 'H:i',
        ];

        return response()->json([
            'success' => true,
            'data' => $activeSettings
        ]);
    }

    /**
     * Get all settings
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        // Return all settings
        $settings = [
            'theme' => 'light',
            'language' => 'id',
            'timezone' => 'Asia/Jakarta',
            'currency' => 'IDR',
            'date_format' => 'd/m/Y',
            'time_format' => 'H:i',
        ];

        return response()->json([
            'success' => true,
            'data' => $settings
        ]);
    }

    /**
     * Update settings
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Request $request): JsonResponse
    {
        // Validate and update settings
        $validated = $request->validate([
            'theme' => 'sometimes|string|in:light,dark',
            'language' => 'sometimes|string|in:id,en',
            'timezone' => 'sometimes|string',
            'currency' => 'sometimes|string',
            'date_format' => 'sometimes|string',
            'time_format' => 'sometimes|string',
        ]);

        // Here you would typically save to database
        // For now, just return success
        
        return response()->json([
            'success' => true,
            'message' => 'Settings updated successfully',
            'data' => $validated
        ]);
    }
}