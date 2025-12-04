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
        if (Schema::hasTable('satu_sehat_diagnosticreport_lab_mb')) {
            Schema::table('satu_sehat_diagnosticreport_lab_mb', function (Blueprint $table) {
                $table->foreign(['noorder'], 'satu_sehat_diagnosticreport_lab_mb_ibfk_1')->references(['noorder'])->on('permintaan_labmb')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['id_template'], 'satu_sehat_diagnosticreport_lab_mb_ibfk_2')->references(['id_template'])->on('template_laboratorium')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_jenis_prw'], 'satu_sehat_diagnosticreport_lab_mb_ibfk_3')->references(['kd_jenis_prw'])->on('jns_perawatan_lab')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('satu_sehat_diagnosticreport_lab_mb')) {
            Schema::table('satu_sehat_diagnosticreport_lab_mb', function (Blueprint $table) {
                $table->dropForeign('satu_sehat_diagnosticreport_lab_mb_ibfk_1');
                $table->dropForeign('satu_sehat_diagnosticreport_lab_mb_ibfk_2');
                $table->dropForeign('satu_sehat_diagnosticreport_lab_mb_ibfk_3');
            });
        }
    }
};
