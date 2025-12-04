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
        if (Schema::hasTable('referensi_mobilejkn_bpjs_taskid')) {
            Schema::table('referensi_mobilejkn_bpjs_taskid', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'referensi_mobilejkn_bpjs_taskid_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('referensi_mobilejkn_bpjs_taskid')) {
            Schema::table('referensi_mobilejkn_bpjs_taskid', function (Blueprint $table) {
                $table->dropForeign('referensi_mobilejkn_bpjs_taskid_ibfk_1');
            });
        }
    }
};
