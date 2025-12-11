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
        if (Schema::hasTable('inhealth_tindakan_ranap')) {
            Schema::table('inhealth_tindakan_ranap', function (Blueprint $table) {
                $table->foreign(['kd_jenis_prw'], 'inhealth_tindakan_ranap_ibfk_1')->references(['kd_jenis_prw'])->on('jns_perawatan_inap')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('inhealth_tindakan_ranap')) {
            Schema::table('inhealth_tindakan_ranap', function (Blueprint $table) {
                $table->dropForeign('inhealth_tindakan_ranap_ibfk_1');
            });
        }
    }
};
