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
        if (! Schema::hasTable('pengkajian_restrain_yang_menyetujui')) {
            Schema::create('pengkajian_restrain_yang_menyetujui', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->string('photo', 500)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengkajian_restrain_yang_menyetujui');
    }
};
