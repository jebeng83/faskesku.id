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
        if (! Schema::hasTable('riwayat_transaksi_gudangbarang')) {
            Schema::create('riwayat_transaksi_gudangbarang', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('kode_brng', 15);
                $table->string('kd_bangsal', 5);
                $table->string('no_batch', 20)->default('');
                $table->string('no_faktur', 20)->default('');
                $table->enum('jenis_transaksi', ['INSERT', 'UPDATE', 'DELETE'])->index();
                $table->double('stok_sebelum')->nullable();
                $table->double('stok_sesudah')->nullable();
                $table->double('selisih')->nullable();
                $table->string('keterangan')->nullable();
                $table->string('user_id')->nullable();
                $table->string('sumber_transaksi', 50)->nullable()->index();
                $table->json('data_sebelum')->nullable();
                $table->json('data_sesudah')->nullable();
                $table->timestamp('waktu_transaksi')->useCurrent()->index();
                $table->timestamps();

                $table->index(['kode_brng', 'kd_bangsal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat_transaksi_gudangbarang');
    }
};
