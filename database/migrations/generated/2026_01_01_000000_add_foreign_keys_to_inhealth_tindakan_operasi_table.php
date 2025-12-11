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
        if (Schema::hasTable('inhealth_tindakan_operasi')) {
            Schema::table('inhealth_tindakan_operasi', function (Blueprint $table) {
                $table->foreign(['kode_paket'], 'inhealth_tindakan_operasi_ibfk_1')->references(['kode_paket'])->on('paket_operasi')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('inhealth_tindakan_operasi')) {
            Schema::table('inhealth_tindakan_operasi', function (Blueprint $table) {
                $table->dropForeign('inhealth_tindakan_operasi_ibfk_1');
            });
        }
    }
};
