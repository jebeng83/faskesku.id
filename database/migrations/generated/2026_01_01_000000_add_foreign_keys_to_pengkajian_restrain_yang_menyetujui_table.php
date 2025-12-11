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
        if (Schema::hasTable('pengkajian_restrain_yang_menyetujui')) {
            Schema::table('pengkajian_restrain_yang_menyetujui', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'pengkajian_restrain_yang_menyetujui_ibfk_1')->references(['no_rawat'])->on('pengkajian_restrain')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('pengkajian_restrain_yang_menyetujui')) {
            Schema::table('pengkajian_restrain_yang_menyetujui', function (Blueprint $table) {
                $table->dropForeign('pengkajian_restrain_yang_menyetujui_ibfk_1');
            });
        }
    }
};
