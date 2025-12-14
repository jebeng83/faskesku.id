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
        if (! Schema::hasTable('ipsrs_detail_hibah')) {
            Schema::create('ipsrs_detail_hibah', function (Blueprint $table) {
                $table->string('no_hibah', 20)->index('no_hibah');
                $table->string('kode_brng', 15)->default('')->index('kode_brng');
                $table->char('kode_sat', 4)->index('kode_sat');
                $table->double('jumlah')->nullable();
                $table->double('h_hibah')->nullable();
                $table->double('subtotalhibah')->nullable();

                $table->primary(['no_hibah', 'kode_brng']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ipsrs_detail_hibah');
    }
};
