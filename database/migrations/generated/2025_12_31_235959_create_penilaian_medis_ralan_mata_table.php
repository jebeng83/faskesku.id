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
        if (! Schema::hasTable('penilaian_medis_ralan_mata')) {
            Schema::create('penilaian_medis_ralan_mata', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->enum('anamnesis', ['Autoanamnesis', 'Alloanamnesis']);
                $table->string('hubungan', 30);
                $table->string('keluhan_utama', 2000)->default('');
                $table->string('rps', 2000);
                $table->string('rpd', 1000)->default('');
                $table->string('rpo', 1000);
                $table->string('alergi', 50)->default('');
                $table->string('status', 50);
                $table->string('td', 8)->default('');
                $table->string('nadi', 5)->default('');
                $table->string('rr', 5);
                $table->string('suhu', 5)->default('');
                $table->string('nyeri', 50);
                $table->string('bb', 5)->default('');
                $table->string('visuskanan', 100);
                $table->string('visuskiri', 100);
                $table->string('cckanan', 100);
                $table->string('cckiri', 100);
                $table->string('palkanan', 100);
                $table->string('palkiri', 100);
                $table->string('conkanan', 100);
                $table->string('conkiri', 100);
                $table->string('corneakanan', 100);
                $table->string('corneakiri', 100);
                $table->string('coakanan', 100);
                $table->string('coakiri', 100);
                $table->string('pupilkanan', 100);
                $table->string('pupilkiri', 100);
                $table->string('lensakanan', 100);
                $table->string('lensakiri', 100);
                $table->string('funduskanan', 100);
                $table->string('funduskiri', 100);
                $table->string('papilkanan', 100);
                $table->string('papilkiri', 100);
                $table->string('retinakanan', 100);
                $table->string('retinakiri', 100);
                $table->string('makulakanan', 100);
                $table->string('makulakiri', 100);
                $table->string('tiokanan', 100);
                $table->string('tiokiri', 100);
                $table->string('mbokanan', 100);
                $table->string('mbokiri', 100);
                $table->text('lab');
                $table->text('rad');
                $table->text('penunjang');
                $table->text('tes');
                $table->text('pemeriksaan');
                $table->string('diagnosis', 500);
                $table->string('diagnosisbdg', 500);
                $table->text('permasalahan');
                $table->text('terapi');
                $table->text('tindakan');
                $table->string('edukasi', 1000);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_medis_ralan_mata');
    }
};
