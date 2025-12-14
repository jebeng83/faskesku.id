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
        if (! Schema::hasTable('returpiutang')) {
            Schema::create('returpiutang', function (Blueprint $table) {
                $table->string('no_retur_piutang', 20)->primary();
                $table->date('tgl_retur')->nullable();
                $table->string('nip', 20)->nullable()->index('nip');
                $table->string('no_rkm_medis', 15)->index('no_rkm_medis');
                $table->char('kd_bangsal', 5)->index('kd_bangsal');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('returpiutang');
    }
};
