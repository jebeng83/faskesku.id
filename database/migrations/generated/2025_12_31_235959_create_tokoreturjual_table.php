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
        if (! Schema::hasTable('tokoreturjual')) {
            Schema::create('tokoreturjual', function (Blueprint $table) {
                $table->string('no_retur_jual', 15)->primary();
                $table->date('tgl_retur')->nullable();
                $table->char('nip', 20)->nullable()->index('nip');
                $table->string('no_member', 10)->index('no_member');
                $table->string('catatan', 40);
                $table->double('total');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tokoreturjual');
    }
};
