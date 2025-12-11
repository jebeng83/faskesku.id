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
        if (!Schema::hasTable('utd_pengambilan_penunjang')) {
            Schema::create('utd_pengambilan_penunjang', function (Blueprint $table) {
                $table->string('kode_brng', 15)->default('')->index('kode_brng');
                $table->double('jml')->nullable()->index('jml');
                $table->double('harga')->nullable();
                $table->double('total')->nullable()->index('total');
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
        Schema::dropIfExists('utd_pengambilan_penunjang');
    }
};
