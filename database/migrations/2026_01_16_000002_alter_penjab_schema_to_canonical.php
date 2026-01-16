<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('penjab')) {
            return;
        }

        if (! Schema::hasColumn('penjab', 'alamat_asuransi')) {
            Schema::table('penjab', function (Blueprint $table) {
                $table->string('alamat_asuransi', 130)->nullable();
            });
        }

        if (Schema::hasColumn('penjab', 'alamat_perusahaan')) {
            DB::statement('UPDATE penjab SET alamat_asuransi = COALESCE(alamat_asuransi, alamat_perusahaan)');
        }
    }

    public function down(): void
    {
        if (! Schema::hasTable('penjab')) {
            return;
        }
    }
};

