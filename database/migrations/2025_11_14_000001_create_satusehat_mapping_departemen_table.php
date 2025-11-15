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
        Schema::create('satu_sehat_mapping_departemen', function (Blueprint $table) {
            // Mengikuti kebutuhan: dep_id char(4) sebagai PK, id_organisasi_satusehat varchar(40) unique
            $table->char('dep_id', 4);
            $table->string('id_organisasi_satusehat', 40)->nullable();

            $table->primary('dep_id');
            // optional: jika ingin memastikan tidak ada duplikasi ID organisasi yang sama
            // $table->unique('id_organisasi_satusehat');

            // FK ke tabel departemen
            $table->foreign('dep_id')
                ->references('dep_id')
                ->on('departemen')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('satu_sehat_mapping_departemen');
    }
};
