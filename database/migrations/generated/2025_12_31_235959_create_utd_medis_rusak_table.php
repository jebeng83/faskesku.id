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
        if (! Schema::hasTable('utd_medis_rusak')) {
            Schema::create('utd_medis_rusak', function (Blueprint $table) {
                $table->string('kode_brng', 15)->default('');
                $table->double('jml')->nullable();
                $table->double('hargabeli')->nullable();
                $table->double('total')->nullable();
                $table->string('nip', 20)->default('')->index('nip');
                $table->dateTime('tanggal')->default('0000-00-00 00:00:00');
                $table->string('keterangan', 60)->nullable();

                $table->primary(['kode_brng', 'nip', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('utd_medis_rusak');
    }
};
