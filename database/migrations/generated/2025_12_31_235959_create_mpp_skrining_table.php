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
        if (! Schema::hasTable('mpp_skrining')) {
            Schema::create('mpp_skrining', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->date('tanggal');
                $table->enum('param1', ['Ya', 'Tidak'])->nullable();
                $table->enum('param2', ['Ya', 'Tidak'])->nullable();
                $table->enum('param3', ['Ya', 'Tidak'])->nullable();
                $table->enum('param4', ['Ya', 'Tidak'])->nullable();
                $table->enum('param5', ['Ya', 'Tidak'])->nullable();
                $table->enum('param6', ['Ya', 'Tidak'])->nullable();
                $table->enum('param7', ['Ya', 'Tidak'])->nullable();
                $table->enum('param8', ['Ya', 'Tidak'])->nullable();
                $table->enum('param9', ['Ya', 'Tidak'])->nullable();
                $table->enum('param10', ['Ya', 'Tidak'])->nullable();
                $table->enum('param11', ['Ya', 'Tidak'])->nullable();
                $table->enum('param12', ['Ya', 'Tidak'])->nullable();
                $table->enum('param13', ['Ya', 'Tidak'])->nullable();
                $table->enum('param14', ['Ya', 'Tidak'])->nullable();
                $table->enum('param15', ['Ya', 'Tidak'])->nullable();
                $table->enum('param16', ['Ya', 'Tidak'])->nullable();
                $table->string('nip', 20)->index('nip');

                $table->primary(['no_rawat', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mpp_skrining');
    }
};
