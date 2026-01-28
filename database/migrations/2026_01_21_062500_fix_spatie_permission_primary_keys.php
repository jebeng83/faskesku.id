<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('permissions')) {
            try {
                DB::statement('ALTER TABLE permissions MODIFY id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT');
                $max = (int) (DB::table('permissions')->max('id') ?? 0);
                $hasZero = DB::table('permissions')->where('id', 0)->exists();
                if ($hasZero) {
                    $next = $max + 1;
                    DB::table('permissions')->where('id', 0)->update(['id' => $next]);
                    $max = $next;
                }
                $nextAuto = $max + 1;
                DB::statement('ALTER TABLE permissions AUTO_INCREMENT = '.$nextAuto);
            } catch (\Throwable $e) {}
        }
        if (Schema::hasTable('roles')) {
            try {
                DB::statement('ALTER TABLE roles MODIFY id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT');
                $maxR = (int) (DB::table('roles')->max('id') ?? 0);
                $hasZeroR = DB::table('roles')->where('id', 0)->exists();
                if ($hasZeroR) {
                    $nextR = $maxR + 1;
                    DB::table('roles')->where('id', 0)->update(['id' => $nextR]);
                    $maxR = $nextR;
                }
                $nextAutoR = $maxR + 1;
                DB::statement('ALTER TABLE roles AUTO_INCREMENT = '.$nextAutoR);
            } catch (\Throwable $e) {}
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('permissions')) {
            try {
                DB::statement('ALTER TABLE permissions MODIFY id BIGINT UNSIGNED NOT NULL');
            } catch (\Throwable $e) {}
        }
        if (Schema::hasTable('roles')) {
            try {
                DB::statement('ALTER TABLE roles MODIFY id BIGINT UNSIGNED NOT NULL');
            } catch (\Throwable $e) {}
        }
    }
};
