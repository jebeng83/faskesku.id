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
        if (! Schema::hasTable('bridging_sep_internal')) {
            Schema::create('bridging_sep_internal', function (Blueprint $table) {
                $table->string('no_sep', 40)->default('')->index('no_sep');
                $table->string('no_rawat', 17)->nullable()->index('no_rawat');
                $table->date('tglsep')->nullable();
                $table->date('tglrujukan')->nullable();
                $table->string('no_rujukan', 40)->nullable();
                $table->string('kdppkrujukan', 12)->nullable();
                $table->string('nmppkrujukan', 200)->nullable();
                $table->string('kdppkpelayanan', 12)->nullable();
                $table->string('nmppkpelayanan', 200)->nullable();
                $table->enum('jnspelayanan', ['1', '2'])->nullable();
                $table->string('catatan', 100)->nullable();
                $table->string('diagawal', 10)->nullable();
                $table->string('nmdiagnosaawal', 400)->nullable();
                $table->string('kdpolitujuan', 15)->nullable();
                $table->string('nmpolitujuan', 50)->nullable();
                $table->enum('klsrawat', ['1', '2', '3'])->nullable();
                $table->enum('klsnaik', ['', '1', '2', '3', '4', '5', '6', '7', '8']);
                $table->enum('pembiayaan', ['', '1', '2', '3']);
                $table->string('pjnaikkelas', 100);
                $table->enum('lakalantas', ['0', '1', '2', '3'])->nullable();
                $table->string('user', 25)->nullable();
                $table->string('nomr', 15)->nullable();
                $table->string('nama_pasien', 100)->nullable();
                $table->date('tanggal_lahir')->nullable();
                $table->string('peserta', 100)->nullable();
                $table->enum('jkel', ['L', 'P'])->nullable();
                $table->string('no_kartu', 25)->nullable();
                $table->dateTime('tglpulang')->nullable();
                $table->enum('asal_rujukan', ['1. Faskes 1', '2. Faskes 2(RS)']);
                $table->enum('eksekutif', ['0. Tidak', '1.Ya']);
                $table->enum('cob', ['0. Tidak', '1.Ya']);
                $table->string('notelep', 40);
                $table->enum('katarak', ['0. Tidak', '1.Ya']);
                $table->date('tglkkl');
                $table->string('keterangankkl', 100);
                $table->enum('suplesi', ['0. Tidak', '1.Ya']);
                $table->string('no_sep_suplesi', 40);
                $table->string('kdprop', 10);
                $table->string('nmprop', 50);
                $table->string('kdkab', 10);
                $table->string('nmkab', 50);
                $table->string('kdkec', 10);
                $table->string('nmkec', 50);
                $table->string('noskdp', 40);
                $table->string('kddpjp', 10);
                $table->string('nmdpdjp', 100);
                $table->enum('tujuankunjungan', ['0', '1', '2']);
                $table->enum('flagprosedur', ['', '0', '1']);
                $table->enum('penunjang', ['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
                $table->enum('asesmenpelayanan', ['', '1', '2', '3', '4', '5']);
                $table->string('kddpjplayanan', 10);
                $table->string('nmdpjplayanan', 100);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bridging_sep_internal');
    }
};
