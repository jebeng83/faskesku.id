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
        if (!Schema::hasTable('kesling_pest_control')) {
            Schema::create('kesling_pest_control', function (Blueprint $table) {
                $table->string('nip', 20);
                $table->dateTime('tanggal');
                $table->text('rincian_kegiatan')->nullable();
                $table->text('rekomendasi')->nullable();

                $table->primary(['nip', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kesling_pest_control');
    }
};
