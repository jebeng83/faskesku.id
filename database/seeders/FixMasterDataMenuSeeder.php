<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class FixMasterDataMenuSeeder extends Seeder
{
    public function run(): void
    {
        if (! Schema::hasTable('menus')) {
            return;
        }

        $menusTable = 'menus';

        // Cari menu "Master Data" berdasarkan beberapa kemungkinan nilai
        $masterMenu = DB::table($menusTable)
            ->whereRaw('LOWER(name) LIKE ?', ['master%'])
            ->orWhere(function ($q) {
                if (Schema::hasColumn('menus', 'slug')) {
                    $q->whereIn('slug', ['master-data', 'masterdata', 'master']);
                }
            })
            ->orWhere(function ($q) {
                if (Schema::hasColumn('menus', 'url')) {
                    $q->whereIn('url', ['/master-data', 'master-data', '/masterdata', 'masterdata', '/master', 'master']);
                }
            })
            ->orderByDesc('id')
            ->first();

        if (! $masterMenu) {
            // Jika tidak ditemukan, tidak melakukan apa pun agar seeder aman di semua environment.
            return;
        }

        $masterId = $masterMenu->id;

        // Update properti Master Data agar menjadi link langsung
        $update = [];
        if (Schema::hasColumn('menus', 'route')) {
            $update['route'] = 'master-data.index';
        }
        if (Schema::hasColumn('menus', 'url')) {
            $update['url'] = '/master-data';
        }

        if (! empty($update)) {
            DB::table($menusTable)->where('id', $masterId)->update($update);
        }

        // Jika ada child, putuskan parent_id agar tidak muncul sebagai dropdown,
        // atau nonaktifkan apabila kolom parent_id tidak tersedia di skema
        if (Schema::hasColumn('menus', 'parent_id')) {
            DB::table($menusTable)->where('parent_id', $masterId)->update(['parent_id' => null]);
        }

        // Nonaktifkan anak-anaknya bila ada kolom status/aktif
        $statusColumns = collect(['active', 'is_active', 'status', 'enabled'])->filter(fn ($col) => Schema::hasColumn('menus', $col))->values()->all();
        if (! empty($statusColumns)) {
            $updates = [];
            foreach ($statusColumns as $col) {
                // Untuk kolom 'status' seringkali 1/0 atau 'active'/'inactive'. Di sini set ke 0.
                $updates[$col] = 0;
            }
            DB::table($menusTable)->where('parent_id', $masterId)->update($updates);
        }
    }
}
