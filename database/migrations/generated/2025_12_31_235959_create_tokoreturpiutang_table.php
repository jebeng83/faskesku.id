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
        if (!Schema::hasTable('tokoreturpiutang')) {
            Schema::create('tokoreturpiutang', function (Blueprint $table) {
                $table->string('no_retur_piutang', 15)->primary();
                $table->date('tgl_retur')->nullable();
                $table->string('nip', 20)->nullable()->index('nip');
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
        Schema::dropIfExists('tokoreturpiutang');
    }
};
