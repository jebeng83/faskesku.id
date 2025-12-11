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
        if (!Schema::hasTable('set_akun_ranap2')) {
            Schema::create('set_akun_ranap2', function (Blueprint $table) {
                $table->string('Persediaan_Obat_Kamar_Operasi_Ranap', 15)->index('persediaan_obat_kamar_operasi_ranap');
                $table->string('Harian_Ranap', 15)->nullable()->index('harian_ranap');
                $table->string('Uang_Muka_Ranap', 15)->nullable()->index('uang_muka_ranap');
                $table->string('Piutang_Pasien_Ranap', 15)->nullable()->index('piutang_pasien_ranap');
                $table->string('Sisa_Uang_Muka_Ranap', 15)->index('sisa_uang_muka_ranap');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('set_akun_ranap2');
    }
};
