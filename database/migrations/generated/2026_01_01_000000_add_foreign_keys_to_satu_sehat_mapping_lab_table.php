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
        if (Schema::hasTable('satu_sehat_mapping_lab')) {
            Schema::table('satu_sehat_mapping_lab', function (Blueprint $table) {
                $table->foreign(['id_template'], 'satu_sehat_mapping_lab_ibfk_1')->references(['id_template'])->on('template_laboratorium')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('satu_sehat_mapping_lab')) {
            Schema::table('satu_sehat_mapping_lab', function (Blueprint $table) {
                $table->dropForeign('satu_sehat_mapping_lab_ibfk_1');
            });
        }
    }
};
