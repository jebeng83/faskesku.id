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
        if (Schema::hasTable('pemberi_hutang_lain')) {
            Schema::table('pemberi_hutang_lain', function (Blueprint $table) {
                $table->foreign(['kd_rek'], 'pemberi_hutang_lain_ibfk_1')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('pemberi_hutang_lain')) {
            Schema::table('pemberi_hutang_lain', function (Blueprint $table) {
                $table->dropForeign('pemberi_hutang_lain_ibfk_1');
            });
        }
    }
};
