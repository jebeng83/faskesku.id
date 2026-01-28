<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('asuhan_keperawatan')) {
            if (! Schema::hasColumn('asuhan_keperawatan', 'kd_kamar')) {
                Schema::table('asuhan_keperawatan', function (Blueprint $table) {
                    $table->string('kd_kamar', 15)->nullable()->after('ruangan');
                    $table->index('kd_kamar', 'asuhan_keperawatan_kd_kamar_index');
                });
            }
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('asuhan_keperawatan')) {
            Schema::table('asuhan_keperawatan', function (Blueprint $table) {
                if (Schema::hasColumn('asuhan_keperawatan', 'kd_kamar')) {
                    $table->dropIndex('asuhan_keperawatan_kd_kamar_index');
                    $table->dropColumn('kd_kamar');
                }
            });
        }
    }
};
