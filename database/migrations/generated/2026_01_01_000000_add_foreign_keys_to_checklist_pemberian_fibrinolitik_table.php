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
        if (Schema::hasTable('checklist_pemberian_fibrinolitik')) {
            Schema::table('checklist_pemberian_fibrinolitik', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'checklist_pemberian_fibrinolitik_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'checklist_pemberian_fibrinolitik_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('checklist_pemberian_fibrinolitik')) {
            Schema::table('checklist_pemberian_fibrinolitik', function (Blueprint $table) {
                $table->dropForeign('checklist_pemberian_fibrinolitik_ibfk_1');
                $table->dropForeign('checklist_pemberian_fibrinolitik_ibfk_2');
            });
        }
    }
};
