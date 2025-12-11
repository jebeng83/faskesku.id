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
        if (!Schema::hasTable('set_tahun')) {
            Schema::create('set_tahun', function (Blueprint $table) {
                $table->year('tahun');
                $table->tinyInteger('bulan');
                $table->integer('jmlhr');
                $table->integer('jmllbr');
                $table->integer('normal');

                $table->primary(['tahun', 'bulan']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('set_tahun');
    }
};
