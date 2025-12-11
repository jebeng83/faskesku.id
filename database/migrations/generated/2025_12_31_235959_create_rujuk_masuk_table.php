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
        if (!Schema::hasTable('rujuk_masuk')) {
            Schema::create('rujuk_masuk', function (Blueprint $table) {
                $table->string('no_rawat', 17)->default('')->index('no_rawat');
                $table->string('perujuk', 60)->nullable()->index('kd_dokter');
                $table->string('alamat', 70)->index('alamat');
                $table->string('no_rujuk', 40);
                $table->double('jm_perujuk')->index('jm_perujuk');
                $table->string('dokter_perujuk', 50)->nullable()->index('dokter_perujuk');
                $table->string('kd_penyakit', 15)->nullable()->index('kd_penyakit');
                $table->enum('kategori_rujuk', ['-', 'Bedah', 'Non-Bedah', 'Kebidanan', 'Anak'])->nullable();
                $table->string('keterangan', 200)->nullable();
                $table->string('no_balasan', 20)->nullable();

                $table->index(['perujuk'], 'perujuk');
                $table->primary(['no_rawat']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rujuk_masuk');
    }
};
