<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;

class WilayahController extends Controller
{
    private $baseUrl = 'https://wilayah.id/api';

    public function provinces(): JsonResponse
    {
        try {
            $response = Http::timeout(10)->get($this->baseUrl . '/provinces.json');

            if ($response->successful()) {
                return response()->json($response->json());
            }

            return response()->json([
                'error' => 'Failed to fetch provinces',
                'message' => 'Unable to retrieve province data'
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Network error',
                'message' => 'Failed to connect to wilayah.id API'
            ], 500);
        }
    }

    public function regencies(Request $request): JsonResponse
    {
        $provinceCode = $request->route('provinceCode');

        if (!$provinceCode) {
            return response()->json([
                'error' => 'Invalid request',
                'message' => 'Province code is required'
            ], 400);
        }

        try {
            $response = Http::timeout(10)->get($this->baseUrl . "/regencies/{$provinceCode}.json");

            if ($response->successful()) {
                return response()->json($response->json());
            }

            return response()->json([
                'error' => 'Failed to fetch regencies',
                'message' => 'Unable to retrieve regency data for province: ' . $provinceCode
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Network error',
                'message' => 'Failed to connect to wilayah.id API'
            ], 500);
        }
    }

    public function districts(Request $request): JsonResponse
    {
        $regencyCode = $request->route('regencyCode');

        if (!$regencyCode) {
            return response()->json([
                'error' => 'Invalid request',
                'message' => 'Regency code is required'
            ], 400);
        }

        try {
            $response = Http::timeout(10)->get($this->baseUrl . "/districts/{$regencyCode}.json");

            if ($response->successful()) {
                return response()->json($response->json());
            }

            return response()->json([
                'error' => 'Failed to fetch districts',
                'message' => 'Unable to retrieve district data for regency: ' . $regencyCode
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Network error',
                'message' => 'Failed to connect to wilayah.id API'
            ], 500);
        }
    }

    public function villages(Request $request): JsonResponse
    {
        $districtCode = $request->route('districtCode');

        if (!$districtCode) {
            return response()->json([
                'error' => 'Invalid request',
                'message' => 'District code is required'
            ], 400);
        }

        try {
            $response = Http::timeout(10)->get($this->baseUrl . "/villages/{$districtCode}.json");

            if ($response->successful()) {
                return response()->json($response->json());
            }

            return response()->json([
                'error' => 'Failed to fetch villages',
                'message' => 'Unable to retrieve village data for district: ' . $districtCode
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Network error',
                'message' => 'Failed to connect to wilayah.id API'
            ], 500);
        }
    }
}
