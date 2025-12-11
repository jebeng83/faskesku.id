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
        if (Schema::hasTable('audit_kepatuhan_apd')) {
            Schema::table('audit_kepatuhan_apd', function (Blueprint $table) {
                $table->foreign(['nik'], 'audit_kepatuhan_apd_ibfk_1')->references(['nik'])->on('pegawai')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('audit_kepatuhan_apd')) {
            Schema::table('audit_kepatuhan_apd', function (Blueprint $table) {
                $table->dropForeign('audit_kepatuhan_apd_ibfk_1');
            });
        }
    }
};
