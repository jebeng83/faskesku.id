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
        if (!Schema::hasTable('gudangbarang')) {
            Schema::create('gudangbarang', function (Blueprint $table) {
                $table->string('kode_brng', 15)->index('kode_brng');
                $table->char('kd_bangsal', 5)->default('')->index('kd_bangsal');
                $table->double('stok')->index('stok');
                $table->string('no_batch', 20);
                $table->string('no_faktur', 20);

                $table->primary(['kode_brng', 'kd_bangsal', 'no_batch', 'no_faktur']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gudangbarang');
    }
};
