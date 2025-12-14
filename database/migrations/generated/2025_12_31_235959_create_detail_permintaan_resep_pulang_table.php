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
        if (! Schema::hasTable('detail_permintaan_resep_pulang')) {
            Schema::create('detail_permintaan_resep_pulang', function (Blueprint $table) {
                $table->string('no_permintaan', 14)->nullable()->index('no_permintaan');
                $table->string('kode_brng', 15)->nullable()->index('kode_brng');
                $table->double('jml')->nullable();
                $table->string('dosis', 150)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_permintaan_resep_pulang');
    }
};
