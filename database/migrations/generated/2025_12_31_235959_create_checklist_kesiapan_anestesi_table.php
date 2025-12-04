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
        if (!Schema::hasTable('checklist_kesiapan_anestesi')) {
            Schema::create('checklist_kesiapan_anestesi', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->string('nip', 20)->nullable()->index('nip');
                $table->string('kd_dokter', 20)->nullable()->index('kd_dokter');
                $table->string('tindakan', 100);
                $table->string('teknik_anestesi', 30);
                $table->enum('listrik1', ['Ya', 'Tidak'])->nullable();
                $table->enum('listrik2', ['Ya', 'Tidak'])->nullable();
                $table->enum('listrik3', ['Ya', 'Tidak'])->nullable();
                $table->enum('listrik4', ['Ya', 'Tidak'])->nullable();
                $table->enum('gasmedis1', ['Ya', 'Tidak'])->nullable();
                $table->enum('gasmedis2', ['Ya', 'Tidak'])->nullable();
                $table->enum('gasmedis3', ['Ya', 'Tidak'])->nullable();
                $table->enum('gasmedis4', ['Ya', 'Tidak'])->nullable();
                $table->enum('gasmedis5', ['Ya', 'Tidak'])->nullable();
                $table->enum('gasmedis6', ['Ya', 'Tidak'])->nullable();
                $table->enum('mesinanes1', ['Ya', 'Tidak'])->nullable();
                $table->enum('mesinanes2', ['Ya', 'Tidak'])->nullable();
                $table->enum('mesinanes3', ['Ya', 'Tidak'])->nullable();
                $table->enum('mesinanes4', ['Ya', 'Tidak'])->nullable();
                $table->enum('mesinanes5', ['Ya', 'Tidak'])->nullable();
                $table->enum('jalannapas1', ['Ya', 'Tidak'])->nullable();
                $table->enum('jalannapas2', ['Ya', 'Tidak'])->nullable();
                $table->enum('jalannapas3', ['Ya', 'Tidak'])->nullable();
                $table->enum('jalannapas4', ['Ya', 'Tidak'])->nullable();
                $table->enum('jalannapas5', ['Ya', 'Tidak'])->nullable();
                $table->enum('jalannapas6', ['Ya', 'Tidak'])->nullable();
                $table->enum('jalannapas7', ['Ya', 'Tidak'])->nullable();
                $table->enum('jalannapas8', ['Ya', 'Tidak'])->nullable();
                $table->enum('jalannapas9', ['Ya', 'Tidak'])->nullable();
                $table->enum('lainlain1', ['Ya', 'Tidak'])->nullable();
                $table->enum('lainlain2', ['Ya', 'Tidak'])->nullable();
                $table->enum('lainlain3', ['Ya', 'Tidak'])->nullable();
                $table->enum('lainlain4', ['Ya', 'Tidak'])->nullable();
                $table->enum('lainlain5', ['Ya', 'Tidak'])->nullable();
                $table->enum('lainlain6', ['Ya', 'Tidak'])->nullable();
                $table->enum('lainlain7', ['Ya', 'Tidak'])->nullable();
                $table->enum('lainlain8', ['Ya', 'Tidak'])->nullable();
                $table->enum('obatobat1', ['Ya', 'Tidak'])->nullable();
                $table->enum('obatobat2', ['Ya', 'Tidak'])->nullable();
                $table->enum('obatobat3', ['Ya', 'Tidak'])->nullable();
                $table->enum('obatobat4', ['Ya', 'Tidak'])->nullable();
                $table->enum('obatobat5', ['Ya', 'Tidak'])->nullable();
                $table->enum('obatobat6', ['Ya', 'Tidak'])->nullable();
                $table->string('keterangan_lainnya', 1000)->nullable();

                $table->primary(['no_rawat', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('checklist_kesiapan_anestesi');
    }
};
