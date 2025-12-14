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
        if (! Schema::hasTable('skrining_gizi')) {
            Schema::create('skrining_gizi', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->string('skrining_bb', 5)->nullable();
                $table->string('skrining_tb', 5)->nullable();
                $table->string('alergi', 25)->nullable();
                $table->enum('parameter_imt', ['IMT > 20/z score > 2', 'IMT 18,5-20/-2 =< z score =< 2', 'IMT < 18,5/z score < -2'])->nullable();
                $table->string('skor_imt', 5)->nullable();
                $table->enum('parameter_bb', ['BB Hilang < 5%', 'BB Hilang 5 - 10 %', 'BB Hilang > 10 %'])->nullable();
                $table->string('skor_bb', 5)->nullable();
                $table->enum('parameter_penyakit', ['Ada asupan nutrisi > 5 hari', 'Tidak ada asupan nutrisi > 5 hari'])->nullable();
                $table->string('skor_penyakit', 5)->nullable();
                $table->string('skor_total', 5)->nullable();
                $table->string('parameter_total', 200)->nullable();
                $table->string('nip', 20)->nullable()->index('nip');

                $table->primary(['no_rawat', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skrining_gizi');
    }
};
