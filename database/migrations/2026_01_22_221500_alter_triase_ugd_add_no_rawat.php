<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('triase_ugd')) {
            Schema::table('triase_ugd', function (Blueprint $table) {
                if (! Schema::hasColumn('triase_ugd', 'no_rawat')) {
                    $table->string('no_rawat', 17)->after('no_rkm_medis');
                }
            });

            Schema::table('triase_ugd', function (Blueprint $table) {
                $table->dropPrimary();
            });

            Schema::table('triase_ugd', function (Blueprint $table) {
                $table->primary('no_rawat');
            });

            // skip adding foreign key to avoid engine/type mismatch issues
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('triase_ugd')) {
            // no foreign key to drop

            Schema::table('triase_ugd', function (Blueprint $table) {
                $table->dropPrimary();
            });

            Schema::table('triase_ugd', function (Blueprint $table) {
                $table->primary(['no_rkm_medis', 'tanggal']);
            });

            Schema::table('triase_ugd', function (Blueprint $table) {
                if (Schema::hasColumn('triase_ugd', 'no_rawat')) {
                    $table->dropColumn('no_rawat');
                }
            });
        }
    }
};
