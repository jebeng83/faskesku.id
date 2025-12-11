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
        if (!Schema::hasTable('tampjurnal2')) {
            Schema::create('tampjurnal2', function (Blueprint $table) {
                $table->char('kd_rek', 15)->index('kd_rek');
                $table->string('nm_rek', 100)->index('nm_rek');
                $table->double('debet')->index('debet');
                $table->double('kredit')->index('kredit');

                $table->primary(['kd_rek']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tampjurnal2');
    }
};
