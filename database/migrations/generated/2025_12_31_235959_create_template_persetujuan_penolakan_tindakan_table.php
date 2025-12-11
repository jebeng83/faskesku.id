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
        if (!Schema::hasTable('template_persetujuan_penolakan_tindakan')) {
            Schema::create('template_persetujuan_penolakan_tindakan', function (Blueprint $table) {
                $table->string('kode_template', 3)->primary();
                $table->string('diagnosa', 200);
                $table->string('tindakan', 200);
                $table->string('indikasi_tindakan', 200);
                $table->string('tata_cara', 400);
                $table->string('tujuan', 200);
                $table->string('risiko', 200);
                $table->string('komplikasi', 200);
                $table->string('prognosis', 200);
                $table->string('alternatif_dan_risikonya', 200);
                $table->string('lain_lain', 200);
                $table->double('biaya');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('template_persetujuan_penolakan_tindakan');
    }
};
