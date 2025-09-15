<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Wilayah;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class WilayahController extends Controller
{
    /**
     * Get all provinces
     */
    public function provinces(): JsonResponse
    {
        try {
            $provinces = Wilayah::getProvinces();

            $data = $provinces->map(function ($province) {
                return [
                    'code' => $province->kode,
                    'name' => $province->nama,
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch provinces',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get regencies by province code
     */
    public function regencies(Request $request): JsonResponse
    {
        $provinceCode = $request->route('provinceCode');

        if (!$provinceCode) {
            return response()->json([
                'success' => false,
                'message' => 'Province code is required'
            ], 400);
        }

        try {
            $regencies = Wilayah::getRegencies($provinceCode);

            $data = $regencies->map(function ($regency) {
                return [
                    'code' => $regency->kode,
                    'name' => $regency->nama,
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch regencies',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get districts by regency code
     */
    public function districts(Request $request): JsonResponse
    {
        $regencyCode = $request->route('regencyCode');

        if (!$regencyCode) {
            return response()->json([
                'success' => false,
                'message' => 'Regency code is required'
            ], 400);
        }

        try {
            $districts = Wilayah::getDistricts($regencyCode);

            $data = $districts->map(function ($district) {
                return [
                    'code' => $district->kode,
                    'name' => $district->nama,
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch districts',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get villages by district code
     */
    public function villages(Request $request): JsonResponse
    {
        $districtCode = $request->route('districtCode');

        if (!$districtCode) {
            return response()->json([
                'success' => false,
                'message' => 'District code is required'
            ], 400);
        }

        try {
            $villages = Wilayah::getVillages($districtCode);

            $data = $villages->map(function ($village) {
                return [
                    'code' => $village->kode,
                    'name' => $village->nama,
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch villages',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all villages with optional filter
     */
    public function allVillages(Request $request): JsonResponse
    {
        $filter = $request->get('filter');
        $limit = $request->get('limit', 100);

        try {
            $villages = Wilayah::getAllVillages($filter, $limit);

            $data = $villages->map(function ($village) {
                return [
                    'code' => $village->kode,
                    'name' => $village->nama,
                    'full_address' => $village->getFullAddress(),
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch villages',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Search wilayah by name
     */
    public function search(Request $request): JsonResponse
    {
        $query = $request->get('q');
        $level = $request->get('level'); // province, regency, district, village

        // Allow empty query for village level to get all villages
        if (!$query && $level !== 'village') {
            return response()->json([
                'success' => false,
                'message' => 'Search query is required'
            ], 400);
        }

        try {
            $results = Wilayah::searchByName($query, $level);

            $data = $results->map(function ($wilayah) {
                return [
                    'code' => $wilayah->kode,
                    'name' => $wilayah->nama,
                    'level' => $wilayah->getLevelName(),
                    'full_address' => $wilayah->getFullAddress(),
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to search wilayah',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get wilayah by code
     */
    public function show(Request $request): JsonResponse
    {
        $code = $request->route('code');

        if (!$code) {
            return response()->json([
                'success' => false,
                'message' => 'Wilayah code is required'
            ], 400);
        }

        try {
            $wilayah = Wilayah::getByCode($code);

            if (!$wilayah) {
                return response()->json([
                    'success' => false,
                    'message' => 'Wilayah not found'
                ], 404);
            }

            $data = [
                'code' => $wilayah->kode,
                'name' => $wilayah->nama,
                'level' => $wilayah->getLevelName(),
                'full_address' => $wilayah->getFullAddress(),
                'parent' => $wilayah->getParent() ? [
                    'code' => $wilayah->getParent()->kode,
                    'name' => $wilayah->getParent()->nama,
                    'level' => $wilayah->getParent()->getLevelName(),
                ] : null,
                'children' => $wilayah->getChildren()->map(function ($child) {
                    return [
                        'code' => $child->kode,
                        'name' => $child->nama,
                        'level' => $child->getLevelName(),
                    ];
                }),
            ];

            return response()->json([
                'success' => true,
                'data' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch wilayah',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
