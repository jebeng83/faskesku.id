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
        if (! Schema::hasTable('hibah_obat_bhp')) {
            Schema::create('hibah_obat_bhp', function (Blueprint $table) {
                $table->string('no_hibah', 20)->primary();
                $table->char('kode_pemberi', 5)->nullable()->index('kode_pemberi');
                $table->string('nip', 20)->nullable()->index('nip');
                $table->date('tgl_hibah')->nullable();
                $table->double('totalhibah');
                $table->double('totalnilai');
                $table->char('kd_bangsal', 5)->index('kd_bangsal');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hibah_obat_bhp');
    }
};
