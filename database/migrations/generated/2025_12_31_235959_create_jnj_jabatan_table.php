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
        if (!Schema::hasTable('jnj_jabatan')) {
            Schema::create('jnj_jabatan', function (Blueprint $table) {
                $table->string('kode', 10)->primary();
                $table->string('nama', 50)->index('nama');
                $table->double('tnj')->index('tnj');
                $table->tinyInteger('indek');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jnj_jabatan');
    }
};
