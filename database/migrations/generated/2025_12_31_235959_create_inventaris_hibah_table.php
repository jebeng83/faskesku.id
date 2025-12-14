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
        if (! Schema::hasTable('inventaris_hibah')) {
            Schema::create('inventaris_hibah', function (Blueprint $table) {
                $table->string('no_hibah', 20)->primary();
                $table->char('kode_pemberi', 5)->nullable()->index('kode_pemberi');
                $table->string('nip', 20)->nullable()->index('nip');
                $table->date('tgl_hibah')->nullable();
                $table->double('totalhibah');
                $table->string('kd_rek_aset', 15)->nullable()->index('kd_rek_aset');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventaris_hibah');
    }
};
