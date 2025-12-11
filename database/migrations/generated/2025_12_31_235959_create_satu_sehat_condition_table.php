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
        if (!Schema::hasTable('satu_sehat_condition')) {
            Schema::create('satu_sehat_condition', function (Blueprint $table) {
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->string('kd_penyakit', 15)->index('kd_penyakit');
                $table->enum('status', ['Ralan', 'Ranap'])->index('status');
                $table->string('id_condition', 40)->nullable();

                $table->primary(['no_rawat', 'kd_penyakit', 'status']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('satu_sehat_condition');
    }
};
