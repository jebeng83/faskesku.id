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
        if (!Schema::hasTable('master_tunjangan_bulanan')) {
            Schema::create('master_tunjangan_bulanan', function (Blueprint $table) {
                $table->integer('id', true);
                $table->string('nama', 60)->index('nama');
                $table->double('tnj')->index('tnj');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('master_tunjangan_bulanan');
    }
};
