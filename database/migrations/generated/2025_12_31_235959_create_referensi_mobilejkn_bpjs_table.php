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
        if (! Schema::hasTable('referensi_mobilejkn_bpjs')) {
            Schema::create('referensi_mobilejkn_bpjs', function (Blueprint $table) {
                $table->string('nobooking', 15)->primary();
                $table->string('no_rawat', 17)->nullable();
                $table->string('nomorkartu', 25)->nullable();
                $table->string('nik', 30)->nullable();
                $table->string('nohp', 15)->nullable();
                $table->string('kodepoli', 15)->nullable();
                $table->enum('pasienbaru', ['0', '1']);
                $table->string('norm', 15)->nullable()->index('norm');
                $table->date('tanggalperiksa')->nullable();
                $table->string('kodedokter', 20)->nullable();
                $table->string('jampraktek', 12)->nullable();
                $table->enum('jeniskunjungan', ['1 (Rujukan FKTP)', '2 (Rujukan Internal)', '3 (Kontrol)', '4 (Rujukan Antar RS)'])->nullable();
                $table->string('nomorreferensi', 40);
                $table->string('nomorantrean', 15);
                $table->string('angkaantrean', 5);
                $table->string('estimasidilayani', 15);
                $table->integer('sisakuotajkn');
                $table->integer('kuotajkn');
                $table->integer('sisakuotanonjkn');
                $table->integer('kuotanonjkn');
                $table->enum('status', ['Belum', 'Checkin', 'Batal', 'Gagal']);
                $table->dateTime('validasi');
                $table->enum('statuskirim', ['Belum', 'Sudah']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('referensi_mobilejkn_bpjs');
    }
};
