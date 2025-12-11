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
        if (!Schema::hasTable('tampbeli1')) {
            Schema::create('tampbeli1', function (Blueprint $table) {
                $table->string('kode_brng', 15)->default('')->index('kode_brng');
                $table->string('nama_brng', 100)->nullable();
                $table->string('satuan', 10)->nullable();
                $table->string('satuan_stok', 10)->nullable();
                $table->double('h_beli')->nullable();
                $table->double('jumlah')->nullable();
                $table->double('jumlah_stok')->nullable();
                $table->double('total')->nullable();

                $table->primary(['kode_brng']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tampbeli1');
    }
};
