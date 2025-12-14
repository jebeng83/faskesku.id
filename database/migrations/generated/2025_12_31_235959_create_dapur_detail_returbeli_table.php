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
        if (! Schema::hasTable('dapur_detail_returbeli')) {
            Schema::create('dapur_detail_returbeli', function (Blueprint $table) {
                $table->string('no_retur_beli', 15)->index('no_retur_beli');
                $table->string('no_faktur', 20);
                $table->string('kode_brng', 15)->default('')->index('kode_brng');
                $table->char('kode_sat', 4)->nullable()->index('kode_sat');
                $table->double('h_beli')->nullable();
                $table->double('h_retur')->nullable();
                $table->double('jml_retur')->nullable();
                $table->double('total')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dapur_detail_returbeli');
    }
};
