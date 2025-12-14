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
        if (! Schema::hasTable('detail_obat_racikan_jual')) {
            Schema::create('detail_obat_racikan_jual', function (Blueprint $table) {
                $table->string('nota_jual', 20);
                $table->string('no_racik', 2);
                $table->string('kode_brng', 15)->index('kode_brng');

                $table->primary(['nota_jual', 'no_racik', 'kode_brng']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_obat_racikan_jual');
    }
};
