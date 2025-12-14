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
        if (! Schema::hasTable('pemantauan_ews_neonatus')) {
            Schema::create('pemantauan_ews_neonatus', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->enum('parameter1', ['<= 29', '30 - 39', '40 - 60', '>= 61'])->nullable();
                $table->string('skor1', 1)->nullable();
                $table->enum('parameter2', ['<= 90', '90 - 93', '>= 94'])->nullable();
                $table->string('skor2', 1)->nullable();
                $table->enum('parameter3', ['Tidak', 'Ya'])->nullable();
                $table->string('skor3', 1)->nullable();
                $table->enum('parameter4', ['<= 80', '81 - 119', '120 - 160', '161 - 180', '>= 181'])->nullable();
                $table->string('skor4', 1)->nullable();
                $table->enum('parameter5', ['Berat', 'Ringan', 'Tidak'])->nullable();
                $table->string('skor5', 1)->nullable();
                $table->enum('parameter6', ['>= 3 Detik', '<= 3 Detik'])->nullable();
                $table->string('skor6', 1)->nullable();
                $table->enum('parameter7', ['<= 36,5', '36,5 - 37,5', '>= 37,5'])->nullable();
                $table->string('skor7', 1)->nullable();
                $table->enum('parameter8', ['Pink', 'Pucat'])->nullable();
                $table->string('skor8', 1)->nullable();
                $table->string('skor_total', 2)->nullable();
                $table->string('parameter_total', 250)->nullable();
                $table->enum('code_blue', ['Ya', 'Tidak']);
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
        Schema::dropIfExists('pemantauan_ews_neonatus');
    }
};
