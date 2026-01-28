<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('triase_ugd', function (Blueprint $table) {
            if (! Schema::hasColumn('triase_ugd', 'no_rawat')) {
                $table->string('no_rawat', 17)->nullable()->after('no_rkm_medis');
                $table->unique('no_rawat');
            }
        });
    }

    public function down(): void
    {
        Schema::table('triase_ugd', function (Blueprint $table) {
            if (Schema::hasColumn('triase_ugd', 'no_rawat')) {
                $table->dropUnique('triase_ugd_no_rawat_unique');
                $table->dropColumn('no_rawat');
            }
        });
    }
};

