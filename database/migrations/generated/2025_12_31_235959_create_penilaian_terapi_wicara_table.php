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
        if (!Schema::hasTable('penilaian_terapi_wicara')) {
            Schema::create('penilaian_terapi_wicara', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('diagnosa_terapi_wicara', 100)->nullable();
                $table->string('diagnosa_medis', 100)->nullable();
                $table->string('anamnesa', 300);
                $table->string('suhu', 5);
                $table->string('rr', 5);
                $table->string('nadi', 5);
                $table->string('td', 8);
                $table->string('perilaku_adaptif_kontak_mata', 50)->nullable();
                $table->string('perilaku_adaptif_atensi', 50)->nullable();
                $table->string('perilaku_adaptif_perilaku', 50)->nullable();
                $table->string('kemampuan_bahasa_bicara_spontan', 50)->nullable();
                $table->string('kemampuan_bahasa_pemahaman_bahasa', 50)->nullable();
                $table->string('kemampuan_bahasa_pengujaran', 50)->nullable();
                $table->string('kemampuan_bahasa_membaca', 50)->nullable();
                $table->string('kemampuan_bahasa_penamaan', 50)->nullable();
                $table->string('organ_wicara_anatomis_lip', 30);
                $table->string('organ_wicara_anatomis_tongue', 30);
                $table->string('organ_wicara_anatomis_hard_palate', 30);
                $table->string('organ_wicara_anatomis_soft_palate', 30);
                $table->string('organ_wicara_anatomis_uvula', 30);
                $table->string('organ_wicara_anatomis_mandibula', 30);
                $table->string('organ_wicara_anatomis_maxila', 30);
                $table->string('organ_wicara_anatomis_dental', 30);
                $table->string('organ_wicara_anatomis_faring', 30);
                $table->string('organ_wicara_fisiologis_lip', 30);
                $table->string('organ_wicara_fisiologis_tongue', 30);
                $table->string('organ_wicara_fisiologis_hard_palate', 30);
                $table->string('organ_wicara_fisiologis_soft_palate', 30);
                $table->string('organ_wicara_fisiologis_uvula', 30);
                $table->string('organ_wicara_fisiologis_mandibula', 30);
                $table->string('organ_wicara_fisiologis_maxilla', 30);
                $table->string('organ_wicara_fisiologis_dental', 30);
                $table->string('organ_wicara_fisiologis_faring', 30);
                $table->string('aktifitas_oral_menghisap', 150);
                $table->string('aktifitas_oral_mengunyah', 150);
                $table->string('aktifitas_oral_meniup', 150);
                $table->string('kemampuan_artikulasi_subtitusi', 150);
                $table->string('kemampuan_artikulasi_omisi', 150);
                $table->string('kemampuan_artikulasi_distorsi', 150);
                $table->string('kemampuan_artikulasi_adisi', 150);
                $table->enum('resonasi', ['Hiponasal', 'Hipernasal', 'Normal']);
                $table->enum('kemampuan_suara_nada', ['Nada', 'Resonansi', 'Rendah', 'Monoton', 'Normal']);
                $table->enum('kemampuan_suara_kualitas', ['Hoarssness', 'Hassness', 'Normal']);
                $table->enum('kemampuan_suara_kenyaringan', ['Nyaring', 'Tidak Nyaring']);
                $table->enum('kemampuan_irama_kelancaran', ['Gagap Primer', 'Gagap Sekunder']);
                $table->string('kemampuan_menelan', 150);
                $table->string('pernafasan', 150);
                $table->string('tingkat_komunikasi_dekoding_pendengaran', 30);
                $table->string('tingkat_komunikasi_dekoding_penglihatan', 30);
                $table->string('tingkat_komunikasi_dekoding_kinesik', 30);
                $table->string('tingkat_komunikasi_enkoding_bicara', 30);
                $table->string('tingkat_komunikasi_enkoding_tulisan', 30);
                $table->string('tingkat_komunikasi_enkoding_mimik', 30);
                $table->string('tingkat_komunikasi_enkoding_gesture', 30);
                $table->string('penunjang_medis', 150);
                $table->string('perencanaan_terapi_tujuan', 150);
                $table->string('perencanaan_terapi_program', 150);
                $table->string('edukasi', 150);
                $table->string('tindak_lanjut', 150);
                $table->string('nip', 20)->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_terapi_wicara');
    }
};
