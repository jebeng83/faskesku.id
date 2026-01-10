<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('suratsakitpihak2')) {
            Schema::table('suratsakitpihak2', function (Blueprint $table) {
                try {
                    $table->unique('no_surat');
                } catch (\Throwable $e) {}
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('suratsakitpihak2')) {
            Schema::table('suratsakitpihak2', function (Blueprint $table) {
                try {
                    $table->dropUnique('suratsakitpihak2_no_surat_unique');
                } catch (\Throwable $e) {}
            });
        }
    }
};

