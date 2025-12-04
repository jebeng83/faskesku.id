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
        if (Schema::hasTable('detailjurnal')) {
            Schema::table('detailjurnal', function (Blueprint $table) {
                $table->foreign(['no_jurnal'], 'detailjurnal_ibfk_1')->references(['no_jurnal'])->on('jurnal')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_rek'], 'detailjurnal_ibfk_2')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('detailjurnal')) {
            Schema::table('detailjurnal', function (Blueprint $table) {
                $table->dropForeign('detailjurnal_ibfk_1');
                $table->dropForeign('detailjurnal_ibfk_2');
            });
        }
    }
};
