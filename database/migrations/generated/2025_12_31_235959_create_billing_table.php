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
        if (! Schema::hasTable('billing')) {
            Schema::create('billing', function (Blueprint $table) {
                $table->integer('noindex')->index('noindex');
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->date('tgl_byr')->nullable()->index('tgl_byr');
                $table->string('no', 50)->index('no');
                $table->string('nm_perawatan', 200)->index('nm_perawatan');
                $table->char('pemisah', 1)->index('pemisah');
                $table->double('biaya')->index('biaya');
                $table->double('jumlah')->index('jumlah');
                $table->double('tambahan')->index('tambahan');
                $table->double('totalbiaya')->index('totalbiaya');
                $table->enum('status', ['Laborat', 'Radiologi', 'Operasi', 'Obat', 'Ranap Dokter', 'Ranap Dokter Paramedis', 'Ranap Paramedis', 'Ralan Dokter', 'Ralan Dokter Paramedis', 'Ralan Paramedis', 'Tambahan', 'Potongan', 'Administrasi', 'Kamar', '-', 'Registrasi', 'Harian', 'Service', 'TtlObat', 'TtlRanap Dokter', 'TtlRanap Paramedis', 'TtlRalan Dokter', 'TtlRalan Paramedis', 'TtlKamar', 'Dokter', 'Perawat', 'TtlTambahan', 'Retur Obat', 'TtlRetur Obat', 'Resep Pulang', 'TtlResep Pulang', 'TtlPotongan', 'TtlLaborat', 'TtlOperasi', 'TtlRadiologi', 'Tagihan'])->nullable()->index('status');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('billing');
    }
};
