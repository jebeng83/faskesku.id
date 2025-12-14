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
        if (! Schema::hasTable('set_insentif')) {
            Schema::create('set_insentif', function (Blueprint $table) {
                $table->year('tahun');
                $table->tinyInteger('bulan');
                $table->double('pendapatan');
                $table->double('persen');
                $table->double('total_insentif');

                $table->primary(['tahun', 'bulan']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('set_insentif');
    }
};
