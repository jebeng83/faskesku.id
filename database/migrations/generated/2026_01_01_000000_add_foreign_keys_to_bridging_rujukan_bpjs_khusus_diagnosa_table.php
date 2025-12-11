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
        if (Schema::hasTable('bridging_rujukan_bpjs_khusus_diagnosa')) {
            Schema::table('bridging_rujukan_bpjs_khusus_diagnosa', function (Blueprint $table) {
                $table->foreign(['no_rujukan'], 'bridging_rujukan_bpjs_khusus_diagnosa_ibfk_1')->references(['no_rujukan'])->on('bridging_rujukan_bpjs')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('bridging_rujukan_bpjs_khusus_diagnosa')) {
            Schema::table('bridging_rujukan_bpjs_khusus_diagnosa', function (Blueprint $table) {
                $table->dropForeign('bridging_rujukan_bpjs_khusus_diagnosa_ibfk_1');
            });
        }
    }
};
