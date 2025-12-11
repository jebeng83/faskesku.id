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
        if (Schema::hasTable('dapuropname')) {
            Schema::table('dapuropname', function (Blueprint $table) {
                $table->foreign(['kode_brng'], 'dapuropname_ibfk_1')->references(['kode_brng'])->on('dapurbarang')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('dapuropname')) {
            Schema::table('dapuropname', function (Blueprint $table) {
                $table->dropForeign('dapuropname_ibfk_1');
            });
        }
    }
};
