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
        if (! Schema::hasTable('pemeliharaan_inventaris')) {
            Schema::create('pemeliharaan_inventaris', function (Blueprint $table) {
                $table->string('no_inventaris', 30);
                $table->date('tanggal');
                $table->string('uraian_kegiatan');
                $table->string('nip', 20)->index('nip');
                $table->enum('pelaksana', ['Teknisi Rumah Sakit', 'Teknisi Rujukan', 'Pihak ke III']);
                $table->double('biaya');
                $table->enum('jenis_pemeliharaan', ['Running Maintenance', 'Shut Down Maintenance', 'Emergency Maintenance']);

                $table->primary(['no_inventaris', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pemeliharaan_inventaris');
    }
};
