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
        if (! Schema::hasTable('tagihan_obat_langsung')) {
            Schema::create('tagihan_obat_langsung', function (Blueprint $table) {
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->double('besar_tagihan');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tagihan_obat_langsung');
    }
};
