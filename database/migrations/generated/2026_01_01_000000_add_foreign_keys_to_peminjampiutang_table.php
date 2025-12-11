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
        if (Schema::hasTable('peminjampiutang')) {
            Schema::table('peminjampiutang', function (Blueprint $table) {
                $table->foreign(['kd_rek'], 'peminjampiutang_ibfk_1')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('peminjampiutang')) {
            Schema::table('peminjampiutang', function (Blueprint $table) {
                $table->dropForeign('peminjampiutang_ibfk_1');
            });
        }
    }
};
