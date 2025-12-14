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
        if (! Schema::hasTable('data_HAIs')) {
            Schema::create('data_HAIs', function (Blueprint $table) {
                $table->date('tanggal');
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->integer('ETT')->nullable()->index('ett');
                $table->integer('CVL')->nullable()->index('cvl');
                $table->integer('IVL')->nullable()->index('ivl');
                $table->integer('UC')->nullable()->index('uc');
                $table->integer('VAP')->nullable()->index('vap');
                $table->integer('IAD')->nullable()->index('iad');
                $table->integer('PLEB')->nullable()->index('pleb');
                $table->integer('ISK')->nullable()->index('isk');
                $table->integer('ILO')->index('ilo');
                $table->integer('HAP')->nullable();
                $table->integer('Tinea')->nullable();
                $table->integer('Scabies')->nullable();
                $table->enum('DEKU', ['IYA', 'TIDAK'])->nullable()->index('deku');
                $table->string('SPUTUM', 200)->nullable()->index('sputum');
                $table->string('DARAH', 200)->nullable()->index('darah');
                $table->string('URINE', 200)->nullable()->index('urine');
                $table->string('ANTIBIOTIK', 200)->nullable()->index('antibiotik');
                $table->string('kd_kamar', 15)->nullable()->index('kd_kamar');

                $table->primary(['tanggal', 'no_rawat']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_HAIs');
    }
};
