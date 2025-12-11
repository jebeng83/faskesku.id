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
        if (!Schema::hasTable('riwayat_penelitian')) {
            Schema::create('riwayat_penelitian', function (Blueprint $table) {
                $table->integer('id');
                $table->string('jenis_penelitian', 30);
                $table->string('peranan', 30);
                $table->string('judul_penelitian', 60);
                $table->string('judul_jurnal', 60);
                $table->year('tahun');
                $table->double('biaya_penelitian')->nullable();
                $table->string('asal_dana', 30);
                $table->string('berkas', 500);

                $table->primary(['id', 'judul_penelitian', 'tahun']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat_penelitian');
    }
};
