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
        if (Schema::hasTable('pengkajian_restrain')) {
            Schema::table('pengkajian_restrain', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'pengkajian_restrain_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'pengkajian_restrain_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('pengkajian_restrain')) {
            Schema::table('pengkajian_restrain', function (Blueprint $table) {
                $table->dropForeign('pengkajian_restrain_ibfk_1');
                $table->dropForeign('pengkajian_restrain_ibfk_2');
            });
        }
    }
};
