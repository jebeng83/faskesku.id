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
        if (! Schema::hasTable('satu_sehat_medicationstatement_racikan')) {
            Schema::create('satu_sehat_medicationstatement_racikan', function (Blueprint $table) {
                $table->string('no_resep', 14);
                $table->string('kode_brng', 15)->index('kode_brng');
                $table->string('no_racik', 2);
                $table->string('id_medicationstatement', 40)->nullable();

                $table->primary(['no_resep', 'kode_brng', 'no_racik']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('satu_sehat_medicationstatement_racikan');
    }
};
