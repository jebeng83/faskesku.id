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
        // Tabel untuk jenis perawatan laboratorium
        if (!Schema::hasTable('jns_perawatan_lab')) {
            Schema::create('jns_perawatan_lab', function (Blueprint $table) {
                $table->string('kd_jenis_prw', 15)->primary();
                $table->string('nm_perawatan');
                $table->decimal('bagian_rs', 15, 2)->default(0);
                $table->decimal('bhp', 15, 2)->default(0);
                $table->decimal('tarif_perujuk', 15, 2)->default(0);
                $table->decimal('tarif_tindakan_dokter', 15, 2)->default(0);
                $table->decimal('tarif_tindakan_petugas', 15, 2)->default(0);
                $table->decimal('kso', 15, 2)->default(0);
                $table->decimal('menejemen', 15, 2)->default(0);
                $table->decimal('total_byrdr', 15, 2)->default(0);
                $table->decimal('total_byrpr', 15, 2)->default(0);
                $table->decimal('total_byrdrpr', 15, 2)->default(0);
                $table->enum('status', ['Aktif', 'Nonaktif'])->default('Aktif');
                $table->string('kelas', 10)->default('-');
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jns_perawatan_lab');
    }
};