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
        if (! Schema::hasTable('master_tindakan')) {
            Schema::create('master_tindakan', function (Blueprint $table) {
                $table->integer('id', true);
                $table->string('nama', 50)->unique('nama');
                $table->double('jm')->index('jm');
                $table->enum('jns', ['Karyawan', 'dr Umum', 'dr Spesialis'])->index('jns');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('master_tindakan');
    }
};
