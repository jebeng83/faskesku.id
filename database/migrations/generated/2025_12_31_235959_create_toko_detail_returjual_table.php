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
        if (! Schema::hasTable('toko_detail_returjual')) {
            Schema::create('toko_detail_returjual', function (Blueprint $table) {
                $table->string('no_retur_jual', 15)->index('no_retur_jual');
                $table->string('nota_jual', 15);
                $table->string('kode_brng', 40)->default('')->index('kode_brng');
                $table->char('kode_sat', 4)->nullable()->index('kode_sat');
                $table->double('h_jual')->nullable();
                $table->double('h_retur')->nullable();
                $table->double('jml_retur')->nullable();
                $table->double('total')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('toko_detail_returjual');
    }
};
