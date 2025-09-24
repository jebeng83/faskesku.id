<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (Schema::hasTable('dokter')) {
            Schema::table('dokter', function (Blueprint $table) {
                if (!Schema::hasColumn('dokter', 'email')) {
                    $table->string('email', 70)->nullable()->after('no_telp');
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('dokter')) {
            Schema::table('dokter', function (Blueprint $table) {
                if (Schema::hasColumn('dokter', 'email')) {
                    $table->dropColumn('email');
                }
            });
        }
    }
};