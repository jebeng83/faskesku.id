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
        if (!Schema::hasTable('satu_sehat_diagnosticreport_radiologi')) {
            Schema::create('satu_sehat_diagnosticreport_radiologi', function (Blueprint $table) {
                $table->string('noorder', 15);
                $table->string('kd_jenis_prw', 15)->index('kd_jenis_prw');
                $table->string('id_diagnosticreport', 40)->nullable();

                $table->primary(['noorder', 'kd_jenis_prw']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('satu_sehat_diagnosticreport_radiologi');
    }
};
