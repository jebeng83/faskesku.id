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
        if (! Schema::hasTable('detailhibah_obat_bhp')) {
            Schema::create('detailhibah_obat_bhp', function (Blueprint $table) {
                $table->string('no_hibah', 20)->index('no_hibah');
                $table->string('kode_brng', 15)->default('')->index('kode_brng');
                $table->char('kode_sat', 4)->nullable()->index('kode_sat');
                $table->double('jumlah')->nullable();
                $table->double('h_hibah')->nullable();
                $table->double('subtotalhibah')->nullable();
                $table->double('h_diakui');
                $table->double('subtotaldiakui');
                $table->string('no_batch', 20);
                $table->double('jumlah2')->nullable();
                $table->date('kadaluarsa')->nullable();

                $table->primary(['no_hibah', 'kode_brng', 'no_batch']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detailhibah_obat_bhp');
    }
};
