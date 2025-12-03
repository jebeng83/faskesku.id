<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class FixPembayaranMenuSeeder extends Seeder
{
    public function run(): void
    {
        if (! Schema::hasTable('menus')) {
            return;
        }

        $menusTable = 'menus';

        DB::transaction(function () use ($menusTable) {
            // Ambil semua kandidat menu "Pembayaran"
            $candidates = DB::table($menusTable)
                ->whereRaw('LOWER(name) LIKE ?', ['pembayaran%'])
                ->orWhere(function ($q) {
                    if (Schema::hasColumn('menus', 'slug')) {
                        $q->whereIn('slug', ['pembayaran', 'payment', 'bayar']);
                    }
                })
                ->orWhere(function ($q) {
                    if (Schema::hasColumn('menus', 'url')) {
                        $q->whereIn('url', ['/pembayaran', 'pembayaran', '/payment', 'payment']);
                    }
                })
                ->orderBy('id')
                ->get();

            if ($candidates->isEmpty()) {
                return;
            }

            // Pilih satu sebagai root (yang id paling kecil)
            $root = $candidates->first();
            $rootId = $root->id;

            // Standarisasi nama/slug/route/url root
            $rootUpdate = [];
            if (Schema::hasColumn('menus', 'name') && Str::lower($root->name ?? '') !== 'pembayaran') {
                $rootUpdate['name'] = 'Pembayaran';
            }
            if (Schema::hasColumn('menus', 'slug')) {
                $rootUpdate['slug'] = 'pembayaran';
            }
            if (Schema::hasColumn('menus', 'route')) {
                $rootUpdate['route'] = 'pembayaran.index';
            }
            if (Schema::hasColumn('menus', 'url')) {
                $rootUpdate['url'] = '/pembayaran';
            }
            if (! empty($rootUpdate)) {
                DB::table($menusTable)->where('id', $rootId)->update($rootUpdate);
            }

            // Matikan duplikat lain (jika ada) agar tidak muncul dobel
            $statusColumns = collect(['active', 'is_active', 'status', 'enabled'])
                ->filter(fn ($col) => Schema::hasColumn('menus', $col))
                ->values()
                ->all();

            if ($candidates->count() > 1 && ! empty($statusColumns)) {
                $dupIds = $candidates->pluck('id')->reject(fn ($id) => $id === $rootId)->values();
                if ($dupIds->isNotEmpty()) {
                    $dupUpdate = [];
                    foreach ($statusColumns as $col) {
                        $dupUpdate[$col] = 0;
                    }
                    DB::table($menusTable)->whereIn('id', $dupIds)->update($dupUpdate);
                }
            }

            // Hilangkan dropdown: lepas parent dari seluruh anak Pembayaran
            $parentColumns = collect(['parent_id', 'parent', 'id_parent', 'menu_parent_id'])
                ->filter(fn ($col) => Schema::hasColumn('menus', $col))
                ->values()
                ->all();

            foreach ($parentColumns as $parentCol) {
                DB::table($menusTable)->where($parentCol, $rootId)->update([$parentCol => null]);
            }

            // Nonaktifkan semua anak jika ada kolom status/aktif
            if (! empty($statusColumns)) {
                $childDisable = [];
                foreach ($statusColumns as $col) {
                    $childDisable[$col] = 0;
                }
                // parent_id baku
                if (Schema::hasColumn('menus', 'parent_id')) {
                    DB::table($menusTable)->where('parent_id', $rootId)->update($childDisable);
                }
                // parent varian lain
                foreach ($parentColumns as $parentCol) {
                    DB::table($menusTable)->where($parentCol, $rootId)->update($childDisable);
                }
            }
        });
    }
}
