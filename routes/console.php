<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::command('logs:clean')
    ->dailyAt('23:00')
    ->timezone('Asia/Jakarta')
    ->description('Membersihkan log lama setiap hari jam 23:00');

Artisan::command('menu:missing-permissions', function () {
    $menuPermissions = \App\Models\Menu::whereNotNull('permission_name')
        ->pluck('permission_name')
        ->unique()
        ->values();

    $missing = $menuPermissions->reject(function ($name) {
        return \Spatie\Permission\Models\Permission::where('name', $name)->exists();
    });

    if ($missing->isEmpty()) {
        $this->info('Semua permission menu sudah ada di tabel permissions.');

        return;
    }

    $this->info('Permission menu yang belum ada di tabel permissions:');

    foreach ($missing as $name) {
        $this->line("- {$name}");
    }
})->purpose('Menampilkan daftar permission menu yang belum terdaftar di tabel permissions');
