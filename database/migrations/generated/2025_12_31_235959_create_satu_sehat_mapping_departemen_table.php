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
        if (! Schema::hasTable('satu_sehat_mapping_departemen')) {
            Schema::create('satu_sehat_mapping_departemen', function (Blueprint $table) {
                $table->char('dep_id', 4)->primary();
                $table->string('id_organisasi_satusehat', 40)->nullable()->unique('id_organisasi_satusehat');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('satu_sehat_mapping_departemen');
    }
};
