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
        if (!Schema::hasTable('detail_nota_inap')) {
            Schema::create('detail_nota_inap', function (Blueprint $table) {
                $table->string('no_rawat', 17)->nullable()->index('no_rawat');
                $table->string('nama_bayar', 50)->nullable()->index('nama_bayar');
                $table->double('besarppn')->nullable()->index('besarppn');
                $table->double('besar_bayar')->nullable()->index('besar_bayar');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_nota_inap');
    }
};
