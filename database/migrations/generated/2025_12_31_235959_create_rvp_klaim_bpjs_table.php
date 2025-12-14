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
        if (! Schema::hasTable('rvp_klaim_bpjs')) {
            Schema::create('rvp_klaim_bpjs', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->date('tanggal_rvp')->nullable();
                $table->string('nip', 20)->nullable()->index('nip');
                $table->double('totalpiutang')->nullable();
                $table->double('uangmuka')->nullable();
                $table->double('sudahdibayar')->nullable();
                $table->double('sisapiutang')->nullable();
                $table->double('tarifinacbg')->nullable();
                $table->double('dibayarbpjs')->nullable();
                $table->double('persenbayar')->nullable();
                $table->double('rugi')->nullable();
                $table->double('lebih')->nullable();
                $table->double('materialralan')->nullable();
                $table->double('bhpralan')->nullable();
                $table->double('tarif_tindakandrralan')->nullable();
                $table->double('tarif_tindakanprralan')->nullable();
                $table->double('ksoralan')->nullable();
                $table->double('menejemenralan')->nullable();
                $table->double('biaya_rawatralan')->nullable();
                $table->double('materialranap')->nullable();
                $table->double('bhpranap')->nullable();
                $table->double('tarif_tindakandrranap')->nullable();
                $table->double('tarif_tindakanprranap')->nullable();
                $table->double('ksoranap')->nullable();
                $table->double('menejemenranap')->nullable();
                $table->double('biaya_rawatranap')->nullable();
                $table->double('bagian_rslabralan')->nullable();
                $table->double('bhplabralan')->nullable();
                $table->double('tarif_perujuklabralan')->nullable();
                $table->double('tarif_tindakan_dokterlabralan')->nullable();
                $table->double('tarif_tindakan_petugaslabralan')->nullable();
                $table->double('ksolabralan')->nullable();
                $table->double('menejemenlabralan')->nullable();
                $table->double('biayalabralan')->nullable();
                $table->double('bagian_rslabranap')->nullable();
                $table->double('bhplabranap')->nullable();
                $table->double('tarif_perujuklabranap')->nullable();
                $table->double('tarif_tindakan_dokterlabranap')->nullable();
                $table->double('tarif_tindakan_petugaslabranap')->nullable();
                $table->double('ksolabranap')->nullable();
                $table->double('menejemenlabranap')->nullable();
                $table->double('biayalabranap')->nullable();
                $table->double('bagian_rsradiologiralan')->nullable();
                $table->double('bhpradiologiralan')->nullable();
                $table->double('tarif_perujukradiologiralan')->nullable();
                $table->double('tarif_tindakan_dokterradiologiralan')->nullable();
                $table->double('tarif_tindakan_petugasradiologiralan')->nullable();
                $table->double('ksoradiologiralan')->nullable();
                $table->double('menejemenradiologiralan')->nullable();
                $table->double('biayaradiologiralan')->nullable();
                $table->double('bagian_rsradiologiranap')->nullable();
                $table->double('bhpradiologiranap')->nullable();
                $table->double('tarif_perujukradiologiranap')->nullable();
                $table->double('tarif_tindakan_dokterradiologiranap')->nullable();
                $table->double('tarif_tindakan_petugasradiologiranap')->nullable();
                $table->double('ksoradiologiranap')->nullable();
                $table->double('menejemenradiologiranap')->nullable();
                $table->double('biayaradiologiranap')->nullable();
                $table->double('jmdokteroperasiralan')->nullable();
                $table->double('jmparamedisoperasiralan')->nullable();
                $table->double('bhpoperasiralan')->nullable();
                $table->double('pendapatanoperasiralan')->nullable();
                $table->double('jmdokteroperasiranap')->nullable();
                $table->double('jmparamedisoperasiranap')->nullable();
                $table->double('bhpoperasiranap')->nullable();
                $table->double('pendapatanoperasiranap')->nullable();
                $table->double('obatlangsung')->nullable();
                $table->double('obatralan')->nullable();
                $table->double('hppobatralan')->nullable();
                $table->double('obatranap')->nullable();
                $table->double('hppobatranap')->nullable();
                $table->double('returobat')->nullable();
                $table->double('tambahanbiaya')->nullable();
                $table->double('potonganbiaya')->nullable();
                $table->double('kamar')->nullable();
                $table->double('reseppulang')->nullable();
                $table->double('harianranap')->nullable();
                $table->double('registrasi')->nullable();
                $table->string('no_sep', 40);
                $table->string('kd_rek', 15)->index('kd_rek');
                $table->string('kd_rek_kontra', 15)->index('kd_rek_kontra');
                $table->double('service');
                $table->double('ppn_obat');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rvp_klaim_bpjs');
    }
};
