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
        if (!Schema::hasTable('tampreturjual')) {
            Schema::create('tampreturjual', function (Blueprint $table) {
                $table->string('nota_jual', 20)->default('')->index('nota_jual');
                $table->string('kode_brng', 15)->default('')->index('kode_brng');
                $table->string('nama_brng', 100)->nullable();
                $table->double('jml_jual')->nullable();
                $table->double('h_jual')->nullable();
                $table->double('jml_retur')->nullable();
                $table->double('h_retur')->nullable();
                $table->string('satuan', 10)->nullable();
                $table->double('subtotal')->nullable();
                $table->string('no_batch', 20);
                $table->string('petugas', 20);
                $table->string('no_faktur', 20);

                $table->primary(['nota_jual', 'kode_brng', 'no_batch', 'no_faktur']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tampreturjual');
    }
};
