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
        if (! Schema::hasTable('sip_pegawai')) {
            Schema::create('sip_pegawai', function (Blueprint $table) {
                $table->string('nik', 20)->index('sip_pegawai_ibfk_1');
                $table->string('jnj_jabatan', 10);
                $table->string('no_sip', 100);
                $table->date('masa_berlaku');
                $table->enum('status', ['0', '1']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sip_pegawai');
    }
};
