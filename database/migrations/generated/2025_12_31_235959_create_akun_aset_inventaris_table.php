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
        if (!Schema::hasTable('akun_aset_inventaris')) {
            Schema::create('akun_aset_inventaris', function (Blueprint $table) {
                $table->string('kd_rek', 15)->nullable()->index('kd_rek');
                $table->char('id_jenis', 10)->primary();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('akun_aset_inventaris');
    }
};
