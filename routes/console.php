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
