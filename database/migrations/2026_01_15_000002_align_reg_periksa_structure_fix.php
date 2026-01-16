<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('reg_periksa')) {
            return;
        }

        $primary = DB::select("SHOW INDEX FROM reg_periksa WHERE Key_name = 'PRIMARY'");
        if (empty($primary)) {
            DB::statement("ALTER TABLE reg_periksa ADD PRIMARY KEY (no_rawat)");
        }

        if (! Schema::hasColumn('reg_periksa', 'keputusan')) {
            Schema::table('reg_periksa', function (Blueprint $table) {
                $table->enum('keputusan', ['-','RUJUKAN','PRIORITAS','HIJAU','KUNING','MERAH','HITAM','MJKN','CHECK-IN','ONSITE'])->default('ONSITE');
            });
        } else {
            DB::statement("UPDATE reg_periksa SET keputusan = 'ONSITE' WHERE keputusan IS NULL");
            DB::statement("ALTER TABLE reg_periksa MODIFY COLUMN keputusan ENUM('-','RUJUKAN','PRIORITAS','HIJAU','KUNING','MERAH','HITAM','MJKN','CHECK-IN','ONSITE') NOT NULL DEFAULT 'ONSITE'");
        }

        if (Schema::hasColumn('reg_periksa', 'stts')) {
            DB::statement("ALTER TABLE reg_periksa MODIFY COLUMN stts ENUM('Belum','Sudah','Batal','Berkas Diterima','Dirujuk','Meninggal','Dirawat','Pulang Paksa') NULL");
        } else {
            Schema::table('reg_periksa', function (Blueprint $table) {
                $table->enum('stts', ['Belum','Sudah','Batal','Berkas Diterima','Dirujuk','Meninggal','Dirawat','Pulang Paksa'])->nullable();
            });
        }

        if (Schema::hasColumn('reg_periksa', 'stts_daftar')) {
            DB::statement("ALTER TABLE reg_periksa MODIFY COLUMN stts_daftar ENUM('-','Lama','Baru') NOT NULL");
        } else {
            Schema::table('reg_periksa', function (Blueprint $table) {
                $table->enum('stts_daftar', ['-','Lama','Baru']);
            });
        }

        if (Schema::hasColumn('reg_periksa', 'status_lanjut')) {
            DB::statement("ALTER TABLE reg_periksa MODIFY COLUMN status_lanjut ENUM('Ralan','Ranap') NOT NULL");
        } else {
            Schema::table('reg_periksa', function (Blueprint $table) {
                $table->enum('status_lanjut', ['Ralan','Ranap']);
            });
        }

        if (Schema::hasColumn('reg_periksa', 'kd_pj')) {
            DB::statement("ALTER TABLE reg_periksa MODIFY COLUMN kd_pj CHAR(3) NOT NULL");
        } else {
            Schema::table('reg_periksa', function (Blueprint $table) {
                $table->char('kd_pj', 3);
            });
        }

        if (Schema::hasColumn('reg_periksa', 'umurdaftar')) {
            DB::statement("ALTER TABLE reg_periksa MODIFY COLUMN umurdaftar INT NULL");
        } else {
            Schema::table('reg_periksa', function (Blueprint $table) {
                $table->integer('umurdaftar')->nullable();
            });
        }

        if (Schema::hasColumn('reg_periksa', 'sttsumur')) {
            DB::statement("ALTER TABLE reg_periksa MODIFY COLUMN sttsumur ENUM('Th','Bl','Hr') NULL");
        } else {
            Schema::table('reg_periksa', function (Blueprint $table) {
                $table->enum('sttsumur', ['Th','Bl','Hr'])->nullable();
            });
        }

        if (Schema::hasColumn('reg_periksa', 'status_bayar')) {
            DB::statement("ALTER TABLE reg_periksa MODIFY COLUMN status_bayar ENUM('Sudah Bayar','Belum Bayar') NOT NULL");
        } else {
            Schema::table('reg_periksa', function (Blueprint $table) {
                $table->enum('status_bayar', ['Sudah Bayar','Belum Bayar']);
            });
        }

        if (Schema::hasColumn('reg_periksa', 'status_poli')) {
            DB::statement("ALTER TABLE reg_periksa MODIFY COLUMN status_poli ENUM('Lama','Baru') NOT NULL");
        } else {
            Schema::table('reg_periksa', function (Blueprint $table) {
                $table->enum('status_poli', ['Lama','Baru']);
            });
        }

        $existing = collect(DB::select('SHOW INDEX FROM reg_periksa'))->map(fn ($r) => $r->Key_name)->unique()->all();

        if (! in_array('no_rkm_medis', $existing, true)) {
            DB::statement('ALTER TABLE reg_periksa ADD INDEX no_rkm_medis (no_rkm_medis)');
        }
        if (! in_array('kd_poli', $existing, true)) {
            DB::statement('ALTER TABLE reg_periksa ADD INDEX kd_poli (kd_poli)');
        }
        if (! in_array('kd_pj', $existing, true)) {
            DB::statement('ALTER TABLE reg_periksa ADD INDEX kd_pj (kd_pj)');
        }
        if (! in_array('status_lanjut', $existing, true)) {
            DB::statement('ALTER TABLE reg_periksa ADD INDEX status_lanjut (status_lanjut)');
        }
        if (! in_array('kd_dokter', $existing, true)) {
            DB::statement('ALTER TABLE reg_periksa ADD INDEX kd_dokter (kd_dokter)');
        }
        if (! in_array('status_bayar', $existing, true)) {
            DB::statement('ALTER TABLE reg_periksa ADD INDEX status_bayar (status_bayar)');
        }
        if (! in_array('idx_reg_periksa_tgl', $existing, true)) {
            DB::statement('ALTER TABLE reg_periksa ADD INDEX idx_reg_periksa_tgl (tgl_registrasi)');
        }
        if (! in_array('idx_reg_periksa_rawat_rkm', $existing, true)) {
            DB::statement('ALTER TABLE reg_periksa ADD INDEX idx_reg_periksa_rawat_rkm (no_rawat, no_rkm_medis, kd_poli, kd_pj)');
        }
        if (! in_array('idx_reg_periksa_tgl_kd_dokter', $existing, true)) {
            DB::statement('ALTER TABLE reg_periksa ADD INDEX idx_reg_periksa_tgl_kd_dokter (tgl_registrasi, kd_dokter)');
        }
        if (! in_array('idx_reg_periksa_tgl_kd_poli', $existing, true)) {
            DB::statement('ALTER TABLE reg_periksa ADD INDEX idx_reg_periksa_tgl_kd_poli (tgl_registrasi, kd_poli)');
        }
        if (! in_array('idx_reg_periksa_norm_tgl_jam', $existing, true)) {
            DB::statement('ALTER TABLE reg_periksa ADD INDEX idx_reg_periksa_norm_tgl_jam (no_rkm_medis, tgl_registrasi, jam_reg)');
        }
        if (! in_array('idx_reg_periksa_tgl_jam', $existing, true)) {
            DB::statement('ALTER TABLE reg_periksa ADD INDEX idx_reg_periksa_tgl_jam (tgl_registrasi, jam_reg)');
        }

        // Foreign keys guard: add only if not exist
        if ($this->constraintExists('reg_periksa', 'reg_periksa_ibfk_3') === false && Schema::hasTable('poliklinik')) {
            Schema::table('reg_periksa', function (Blueprint $table) {
                $table->foreign(['kd_poli'], 'reg_periksa_ibfk_3')->references(['kd_poli'])->on('poliklinik')->onUpdate('cascade')->onDelete('cascade');
            });
        }
        if ($this->constraintExists('reg_periksa', 'reg_periksa_ibfk_4') === false && Schema::hasTable('dokter')) {
            Schema::table('reg_periksa', function (Blueprint $table) {
                $table->foreign(['kd_dokter'], 'reg_periksa_ibfk_4')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
            });
        }
        if ($this->constraintExists('reg_periksa', 'reg_periksa_ibfk_6') === false && Schema::hasTable('penjab')) {
            Schema::table('reg_periksa', function (Blueprint $table) {
                $table->foreign(['kd_pj'], 'reg_periksa_ibfk_6')->references(['kd_pj'])->on('penjab')->onUpdate('cascade')->onDelete('restrict');
            });
        }
        if ($this->constraintExists('reg_periksa', 'reg_periksa_ibfk_7') === false && Schema::hasTable('pasien')) {
            Schema::table('reg_periksa', function (Blueprint $table) {
                $table->foreign(['no_rkm_medis'], 'reg_periksa_ibfk_7')->references(['no_rkm_medis'])->on('pasien')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('reg_periksa')) {
            Schema::table('reg_periksa', function (Blueprint $table) {
                $table->dropForeign('reg_periksa_ibfk_3');
                $table->dropForeign('reg_periksa_ibfk_4');
                $table->dropForeign('reg_periksa_ibfk_6');
                $table->dropForeign('reg_periksa_ibfk_7');
                $table->dropIndex('idx_reg_periksa_tgl');
                $table->dropIndex('idx_reg_periksa_rawat_rkm');
                $table->dropIndex('idx_reg_periksa_tgl_kd_dokter');
                $table->dropIndex('idx_reg_periksa_tgl_kd_poli');
                $table->dropIndex('idx_reg_periksa_norm_tgl_jam');
                $table->dropIndex('idx_reg_periksa_tgl_jam');
            });
        }
    }

    private function constraintExists(string $table, string $name): bool
    {
        $sql = "SELECT CONSTRAINT_NAME FROM information_schema.TABLE_CONSTRAINTS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND CONSTRAINT_NAME = ?";
        $rows = DB::select($sql, [$table, $name]);
        return !empty($rows);
    }
};
