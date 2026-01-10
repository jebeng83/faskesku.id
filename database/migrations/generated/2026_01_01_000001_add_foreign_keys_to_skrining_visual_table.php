<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('skrining_visual')) {
            Schema::table('skrining_visual', function (Blueprint $table) {
                $table->foreign(['no_rkm_medis'], 'visual_ibfi_1')
                    ->references(['no_rkm_medis'])
                    ->on('pasien')
                    ->onUpdate('cascade');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('skrining_visual')) {
            Schema::table('skrining_visual', function (Blueprint $table) {
                $table->dropForeign('visual_ibfi_1');
            });
        }
    }
};
