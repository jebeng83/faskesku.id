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
        if (Schema::getConnection()->getDriverName() === 'sqlite') {
            return;
        }
        Schema::table('alergi_pasien', function (Blueprint $table) {
            // Hapus primary key yang ada
            $table->dropPrimary(['no_rkm_medis']);
        });

        // Hapus duplikat data jika ada (pertahankan yang pertama berdasarkan kombinasi no_rkm_medis dan kd_alergi)
        // Menggunakan subquery untuk menghapus duplikat
        DB::statement('
            DELETE ap1 FROM alergi_pasien ap1
            INNER JOIN alergi_pasien ap2
            WHERE ap1.no_rkm_medis = ap2.no_rkm_medis
            AND ap1.kd_alergi = ap2.kd_alergi
            AND (ap1.kode_jenis > ap2.kode_jenis OR (ap1.kode_jenis = ap2.kode_jenis AND ap1.no_rkm_medis > ap2.no_rkm_medis))
        ');

        // Hapus record yang tidak memiliki kd_alergi atau kode_jenis yang valid
        DB::table('alergi_pasien')
            ->whereNull('kd_alergi')
            ->orWhereNull('kode_jenis')
            ->delete();

        Schema::table('alergi_pasien', function (Blueprint $table) {
            // Buat composite primary key baru
            $table->primary(['no_rkm_medis', 'kd_alergi'], 'alergi_pasien_primary');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::getConnection()->getDriverName() === 'sqlite') {
            return;
        }
        Schema::table('alergi_pasien', function (Blueprint $table) {
            // Hapus composite primary key
            $table->dropPrimary('alergi_pasien_primary');
        });

        // Hapus duplikat berdasarkan no_rkm_medis (pertahankan yang pertama berdasarkan kd_alergi)
        DB::statement('
            DELETE ap1 FROM alergi_pasien ap1
            INNER JOIN alergi_pasien ap2
            WHERE ap1.no_rkm_medis = ap2.no_rkm_medis
            AND ap1.kd_alergi > ap2.kd_alergi
        ');

        Schema::table('alergi_pasien', function (Blueprint $table) {
            // Kembalikan primary key ke no_rkm_medis saja
            $table->primary('no_rkm_medis');
        });
    }
};
