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
        if (!Schema::hasTable('set_jam_minimal')) {
            Schema::create('set_jam_minimal', function (Blueprint $table) {
                $table->integer('lamajam');
                $table->enum('hariawal', ['Yes', 'No']);
                $table->double('feeperujuk');
                $table->enum('diagnosaakhir', ['Yes', 'No'])->nullable();
                $table->integer('bayi')->nullable();
                $table->enum('aktifkan_hapus_data_salah', ['Yes', 'No'])->nullable();
                $table->enum('kamar_inap_kasir_ralan', ['Yes', 'No'])->nullable();
                $table->enum('ubah_status_kamar', ['Yes', 'No']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('set_jam_minimal');
    }
};
