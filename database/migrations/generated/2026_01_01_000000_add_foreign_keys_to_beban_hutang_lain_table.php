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
        if (Schema::hasTable('beban_hutang_lain')) {
            Schema::table('beban_hutang_lain', function (Blueprint $table) {
                $table->foreign(['nip'], 'beban_hutang_lain_ibfk_1')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_pemberi_hutang'], 'beban_hutang_lain_ibfk_2')->references(['kode_pemberi_hutang'])->on('pemberi_hutang_lain')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_rek'], 'beban_hutang_lain_ibfk_3')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('beban_hutang_lain')) {
            Schema::table('beban_hutang_lain', function (Blueprint $table) {
                $table->dropForeign('beban_hutang_lain_ibfk_1');
                $table->dropForeign('beban_hutang_lain_ibfk_2');
                $table->dropForeign('beban_hutang_lain_ibfk_3');
            });
        }
    }
};
