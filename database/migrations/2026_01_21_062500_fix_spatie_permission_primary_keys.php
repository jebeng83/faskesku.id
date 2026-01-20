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
            } catch (\Throwable $e) {}
        }
        if (Schema::hasTable('roles')) {
            try {
                DB::statement('ALTER TABLE roles MODIFY id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT');
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

