<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (Schema::hasTable('akun_aset_inventaris')) {
            $exists1 = collect(DB::select(
                "SELECT CONSTRAINT_NAME FROM information_schema.KEY_COLUMN_USAGE WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'akun_aset_inventaris' AND CONSTRAINT_NAME = 'akun_aset_inventaris_ibfk_1'"
            ))->isNotEmpty();
            $exists2 = collect(DB::select(
                "SELECT CONSTRAINT_NAME FROM information_schema.KEY_COLUMN_USAGE WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'akun_aset_inventaris' AND CONSTRAINT_NAME = 'akun_aset_inventaris_ibfk_2'"
            ))->isNotEmpty();

            Schema::table('akun_aset_inventaris', function (Blueprint $table) use ($exists1, $exists2) {
                if (! $exists1) {
                    $table->foreign(['kd_rek'], 'akun_aset_inventaris_ibfk_1')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('cascade');
                }
                if (! $exists2) {
                    $table->foreign(['id_jenis'], 'akun_aset_inventaris_ibfk_2')->references(['id_jenis'])->on('inventaris_jenis')->onUpdate('cascade')->onDelete('cascade');
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('akun_aset_inventaris')) {
            Schema::table('akun_aset_inventaris', function (Blueprint $table) {
                $table->dropForeign('akun_aset_inventaris_ibfk_1');
                $table->dropForeign('akun_aset_inventaris_ibfk_2');
            });
        }
    }
};
