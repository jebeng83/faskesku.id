<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Ensure PHP uses the configured application timezone
        try {
            $tz = config('app.timezone');
            if ($tz) {
                date_default_timezone_set($tz);
            }
        } catch (\Throwable $e) {
            Log::warning('Failed to set PHP timezone: '.$e->getMessage());
        }

        // Sync MySQL session timezone to match app timezone (affects TIMESTAMP/CURRENT_TIMESTAMP)
        try {
            $default = config('database.default');
            $driver = config("database.connections.$default.driver");
            if ($driver === 'mysql') {
                $tzName = config('app.timezone', 'Asia/Jakarta');
                $dt = new \DateTime('now', new \DateTimeZone($tzName));
                $offsetSeconds = $dt->getOffset();
                $sign = $offsetSeconds >= 0 ? '+' : '-';
                $hours = str_pad((string) floor(abs($offsetSeconds) / 3600), 2, '0', STR_PAD_LEFT);
                $minutes = str_pad((string) ((abs($offsetSeconds) % 3600) / 60), 2, '0', STR_PAD_LEFT);
                $offset = "$sign$hours:$minutes"; // e.g., +07:00

                // Use unprepared to avoid issues with binding placeholders in SET statements
                DB::unprepared('SET time_zone = "'.$offset.'"');
            }
        } catch (\Throwable $e) {
            Log::warning('Failed to set MySQL session time_zone: '.$e->getMessage());
        }
    }
}
