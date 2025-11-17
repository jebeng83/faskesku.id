<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (Schema::hasTable('satu_sehat_mapping_departemen')) {
            return;
        }

        Schema::create('satu_sehat_mapping_departemen', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->char('dep_id', 4);
            $table->string('id_organisasi_satusehat', 40)->nullable();

            $table->primary('dep_id');
        });

        if ($this->departemenSupportsForeignKey()) {
            Schema::table('satu_sehat_mapping_departemen', function (Blueprint $table) {
                $table->foreign('dep_id')
                    ->references('dep_id')
                    ->on('departemen')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('satu_sehat_mapping_departemen');
    }

    private function departemenSupportsForeignKey(): bool
    {
        if (! Schema::hasTable('departemen')) {
            return false;
        }

        $connection = Schema::getConnection();

        if ($connection->getDriverName() !== 'mysql') {
            return true;
        }

        $status = DB::select('SHOW TABLE STATUS WHERE Name = ?', ['departemen']);
        $engine = $status[0]->Engine ?? null;

        return strtolower((string) $engine) === 'innodb';
    }
};
