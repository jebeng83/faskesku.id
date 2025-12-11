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
        if (!Schema::hasTable('satu_sehat_procedure')) {
            Schema::create('satu_sehat_procedure', function (Blueprint $table) {
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->string('kode', 10)->index('kode');
                $table->enum('status', ['Ralan', 'Ranap'])->index('status');
                $table->string('id_procedure', 40)->nullable();

                $table->primary(['no_rawat', 'kode', 'status']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('satu_sehat_procedure');
    }
};
