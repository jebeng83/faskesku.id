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
        if (Schema::hasTable('surat_masuk')) {
            Schema::table('surat_masuk', function (Blueprint $table) {
                $table->foreign(['kd_lemari'], 'surat_masuk_ibfk_1')->references(['kd'])->on('surat_lemari')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_rak'], 'surat_masuk_ibfk_2')->references(['kd'])->on('surat_rak')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_map'], 'surat_masuk_ibfk_3')->references(['kd'])->on('surat_map')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_ruang'], 'surat_masuk_ibfk_4')->references(['kd'])->on('surat_ruang')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_sifat'], 'surat_masuk_ibfk_5')->references(['kd'])->on('surat_sifat')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_balas'], 'surat_masuk_ibfk_6')->references(['kd'])->on('surat_balas')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_status'], 'surat_masuk_ibfk_7')->references(['kd'])->on('surat_status')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_klasifikasi'], 'surat_masuk_ibfk_8')->references(['kd'])->on('surat_klasifikasi')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('surat_masuk')) {
            Schema::table('surat_masuk', function (Blueprint $table) {
                $table->dropForeign('surat_masuk_ibfk_1');
                $table->dropForeign('surat_masuk_ibfk_2');
                $table->dropForeign('surat_masuk_ibfk_3');
                $table->dropForeign('surat_masuk_ibfk_4');
                $table->dropForeign('surat_masuk_ibfk_5');
                $table->dropForeign('surat_masuk_ibfk_6');
                $table->dropForeign('surat_masuk_ibfk_7');
                $table->dropForeign('surat_masuk_ibfk_8');
            });
        }
    }
};
