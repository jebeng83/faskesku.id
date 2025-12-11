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
        if (Schema::hasTable('rawat_jl_pr')) {
            Schema::table('rawat_jl_pr', function (Blueprint $table) {
                $table->foreign(['nip'], 'rawat_jl_pr_ibfk_10')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['no_rawat'], 'rawat_jl_pr_ibfk_8')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_jenis_prw'], 'rawat_jl_pr_ibfk_9')->references(['kd_jenis_prw'])->on('jns_perawatan')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('rawat_jl_pr')) {
            Schema::table('rawat_jl_pr', function (Blueprint $table) {
                $table->dropForeign('rawat_jl_pr_ibfk_10');
                $table->dropForeign('rawat_jl_pr_ibfk_8');
                $table->dropForeign('rawat_jl_pr_ibfk_9');
            });
        }
    }
};
