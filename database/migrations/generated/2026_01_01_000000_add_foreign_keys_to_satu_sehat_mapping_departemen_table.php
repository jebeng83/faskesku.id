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
        if (Schema::hasTable('satu_sehat_mapping_departemen')) {
            Schema::table('satu_sehat_mapping_departemen', function (Blueprint $table) {
                $table->foreign(['dep_id'], 'satu_sehat_mapping_departemen_ibfk_1')->references(['dep_id'])->on('departemen')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('satu_sehat_mapping_departemen')) {
            Schema::table('satu_sehat_mapping_departemen', function (Blueprint $table) {
                $table->dropForeign('satu_sehat_mapping_departemen_ibfk_1');
            });
        }
    }
};
