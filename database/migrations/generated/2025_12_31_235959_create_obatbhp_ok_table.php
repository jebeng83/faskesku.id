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
        if (! Schema::hasTable('obatbhp_ok')) {
            Schema::create('obatbhp_ok', function (Blueprint $table) {
                $table->string('kd_obat', 15)->primary();
                $table->string('nm_obat', 50)->index('nm_obat');
                $table->char('kode_sat', 4)->index('kode_sat');
                $table->double('hargasatuan')->index('hargasatuan');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('obatbhp_ok');
    }
};
