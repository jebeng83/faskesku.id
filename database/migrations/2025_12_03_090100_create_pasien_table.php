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
        if (! Schema::hasTable('pasien')) {
            Schema::create('pasien', function (Blueprint $table) {
                $table->string('no_rkm_medis', 15)->primary();
                $table->string('nm_pasien', 100);
                $table->enum('jk', ['L', 'P']);
                $table->date('tgl_lahir')->nullable();
                $table->string('alamat', 200)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pasien');
    }
};
