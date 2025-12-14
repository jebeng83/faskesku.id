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
        if (! Schema::hasTable('dokter')) {
            Schema::create('dokter', function (Blueprint $table) {
                $table->string('kd_dokter', 20)->primary();
                $table->string('nm_dokter', 50)->nullable()->index('nm_dokter');
                $table->enum('jk', ['L', 'P'])->nullable()->index('jk');
                $table->string('tmp_lahir', 20)->nullable()->index('tmp_lahir');
                $table->date('tgl_lahir')->nullable()->index('tgl_lahir');
                $table->enum('gol_drh', ['A', 'B', 'O', 'AB', '-'])->nullable()->index('gol_drh');
                $table->string('agama', 12)->nullable()->index('agama');
                $table->string('almt_tgl', 60)->nullable()->index('almt_tgl');
                $table->string('no_telp', 13)->nullable()->index('no_telp');
                $table->string('email', 70);
                $table->enum('stts_nikah', ['BELUM MENIKAH', 'MENIKAH', 'JANDA', 'DUDHA', 'JOMBLO'])->nullable()->index('stts_nikah');
                $table->char('kd_sps', 5)->nullable()->index('kd_sps');
                $table->string('alumni', 60)->nullable()->index('alumni');
                $table->string('no_ijn_praktek', 120)->nullable()->index('no_ijn_praktek');
                $table->enum('status', ['0', '1'])->index('status');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dokter');
    }
};
