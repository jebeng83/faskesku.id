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
        Schema::table('satu_sehat_mapping_obat', function (Blueprint $table) {
            if (!Schema::hasColumn('satu_sehat_mapping_obat', 'satusehat_id')) {
                $table->string('satusehat_id', 64)->nullable()->after('kode_brng');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('satu_sehat_mapping_obat', function (Blueprint $table) {
            $table->dropColumn('satusehat_id');
        });
    }
};
