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
        if (!Schema::hasTable('resep_dokter')) {
            Schema::create('resep_dokter', function (Blueprint $table) {
                $table->string('no_resep', 14)->nullable()->index('no_resep');
                $table->string('kode_brng', 15)->nullable()->index('kode_brng');
                $table->double('jml')->nullable();
                $table->string('aturan_pakai', 150)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resep_dokter');
    }
};
