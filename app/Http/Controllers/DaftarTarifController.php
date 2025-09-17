<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\JnsPerawatan;
use App\Models\JnsPerawatanInap;
use App\Models\JnsPerawatanLab;
use App\Models\JnsPerawatanRadiologi;
use App\Models\Poliklinik;

class DaftarTarifController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search', '');
        $category = $request->get('category', 'rawat-jalan');
        $perPage = $request->get('per_page', 10);

        $data = [];

        switch ($category) {
            case 'rawat-jalan':
                $query = JnsPerawatan::with(['poliklinik', 'penjab'])
                    ->aktif();
                
                if ($search) {
                    $query->search($search);
                }
                
                $data = $query->paginate($perPage);
                break;

            case 'rawat-inap':
                $query = JnsPerawatanInap::with(['bangsal', 'penjab'])
                    ->aktif();
                
                if ($search) {
                    $query->search($search);
                }
                
                $data = $query->paginate($perPage);
                break;

            case 'laboratorium':
                $query = JnsPerawatanLab::with('penjab')
                    ->aktif();
                
                if ($search) {
                    $query->search($search);
                }
                
                $data = $query->paginate($perPage);
                break;

            case 'radiologi':
                $query = JnsPerawatanRadiologi::with('penjab')
                    ->aktif();
                
                if ($search) {
                    $query->search($search);
                }
                
                $data = $query->paginate($perPage);
                break;

            case 'kamar':
                // Untuk kamar, kita bisa menggunakan data dari poliklinik atau bangsal
                $query = Poliklinik::aktif();
                
                if ($search) {
                    $query->where(function ($q) use ($search) {
                        $q->where('kd_poli', 'like', "%{$search}%")
                            ->orWhere('nm_poli', 'like', "%{$search}%");
                    });
                }
                
                $data = $query->paginate($perPage);
                break;
        }

        return Inertia::render('DaftarTarif/Index', [
            'title' => 'Daftar Tarif',
            'data' => $data,
            'category' => $category,
            'search' => $search,
            'filters' => [
                'search' => $search,
                'category' => $category,
                'per_page' => $perPage
            ]
        ]);
    }
}