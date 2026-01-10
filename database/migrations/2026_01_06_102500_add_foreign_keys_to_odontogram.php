<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('odontogram')) {
            return;
        }

        // Ensure referenced tables exist
        if (! Schema::hasTable('reg_periksa') || ! Schema::hasTable('penyakit') || ! Schema::hasTable('jns_perawatan')) {
            return;
        }

        // Ensure required columns exist
        foreach ([
            ['odontogram', 'no_rawat'],
            ['odontogram', 'no_rkm_medis'],
            ['odontogram', 'kd_penyakit'],
            ['odontogram', 'kd_jns_prw'],
            ['reg_periksa', 'no_rawat'],
            ['reg_periksa', 'no_rkm_medis'],
            ['penyakit', 'kd_penyakit'],
            ['jns_perawatan', 'kd_jenis_prw'],
        ] as [$t, $c]) {
            if (! Schema::hasColumn($t, $c)) {
                return;
            }
        }

        $schema = DB::getDatabaseName();

        // Align collations between child and parent columns to satisfy FK requirements
        $getCollation = function (string $table, string $column) use ($schema): ?string {
            $sql = "SELECT COLLATION_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME = ?";
            $row = DB::selectOne($sql, [$schema, $table, $column]);
            return $row ? ($row->COLLATION_NAME ?? null) : null;
        };

        $alignCollation = function (string $childTable, string $childColumn, string $parentTable, string $parentColumn, int $length) use ($getCollation) {
            $childColl = $getCollation($childTable, $childColumn);
            $parentColl = $getCollation($parentTable, $parentColumn);
            if ($childColl && $parentColl && $childColl !== $parentColl) {
                $charset = str_starts_with($parentColl, 'utf8') ? 'utf8mb4' : 'latin1';
                DB::statement("ALTER TABLE `$childTable` MODIFY `$childColumn` VARCHAR($length) CHARACTER SET $charset COLLATE $parentColl NOT NULL");
            }
        };

        $alignCollation('odontogram', 'no_rawat', 'reg_periksa', 'no_rawat', 17);
        $alignCollation('odontogram', 'no_rkm_medis', 'reg_periksa', 'no_rkm_medis', 15);
        $alignCollation('odontogram', 'kd_penyakit', 'penyakit', 'kd_penyakit', 15);
        $alignCollation('odontogram', 'kd_jns_prw', 'jns_perawatan', 'kd_jenis_prw', 15);

        $hasIndex = function (string $table, string $column) use ($schema): bool {
            $sql = "SELECT COUNT(1) AS cnt FROM information_schema.STATISTICS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME = ?";
            $row = DB::selectOne($sql, [$schema, $table, $column]);
            return ((int) ($row->cnt ?? 0)) > 0;
        };

        $hasFk = function (string $table, string $constraint) use ($schema): bool {
            $sql = "SELECT COUNT(1) AS cnt FROM information_schema.TABLE_CONSTRAINTS WHERE CONSTRAINT_SCHEMA = ? AND TABLE_NAME = ? AND CONSTRAINT_NAME = ? AND CONSTRAINT_TYPE = 'FOREIGN KEY'";
            $row = DB::selectOne($sql, [$schema, $table, $constraint]);
            return ((int) ($row->cnt ?? 0)) > 0;
        };

        // Create indexes on child table for FK columns if missing
        if (! $hasIndex('odontogram', 'no_rkm_medis')) {
            DB::statement('ALTER TABLE `odontogram` ADD INDEX `idx_odontogram_no_rkm_medis` (`no_rkm_medis`)');
        }
        if (! $hasIndex('odontogram', 'kd_penyakit')) {
            DB::statement('ALTER TABLE `odontogram` ADD INDEX `idx_odontogram_kd_penyakit` (`kd_penyakit`)');
        }
        if (! $hasIndex('odontogram', 'kd_jns_prw')) {
            DB::statement('ALTER TABLE `odontogram` ADD INDEX `idx_odontogram_kd_jns_prw` (`kd_jns_prw`)');
        }

        // Ensure parent table has index on referenced non-PK column (no_rkm_medis)
        if (! $hasIndex('reg_periksa', 'no_rkm_medis')) {
            DB::statement('ALTER TABLE `reg_periksa` ADD INDEX `idx_reg_periksa_no_rkm_medis` (`no_rkm_medis`)');
        }

        // Validate data integrity before adding FKs to avoid migration failure
        $orphanCountNoRawat = DB::selectOne('SELECT COUNT(*) AS cnt FROM `odontogram` o LEFT JOIN `reg_periksa` r ON o.`no_rawat` = r.`no_rawat` WHERE r.`no_rawat` IS NULL')->cnt ?? 0;
        $orphanCountNoRM = DB::selectOne('SELECT COUNT(*) AS cnt FROM `odontogram` o LEFT JOIN `reg_periksa` r ON o.`no_rkm_medis` = r.`no_rkm_medis` WHERE r.`no_rkm_medis` IS NULL')->cnt ?? 0;
        $orphanCountPenyakit = DB::selectOne('SELECT COUNT(*) AS cnt FROM `odontogram` o LEFT JOIN `penyakit` p ON o.`kd_penyakit` = p.`kd_penyakit` WHERE p.`kd_penyakit` IS NULL')->cnt ?? 0;
        $orphanCountJns = DB::selectOne('SELECT COUNT(*) AS cnt FROM `odontogram` o LEFT JOIN `jns_perawatan` j ON o.`kd_jns_prw` = j.`kd_jenis_prw` WHERE j.`kd_jenis_prw` IS NULL')->cnt ?? 0;

        if ($orphanCountNoRawat === 0 && ! $hasFk('odontogram', 'fk_odontogram_no_rawat_reg_periksa')) {
            DB::statement('ALTER TABLE `odontogram` ADD CONSTRAINT `fk_odontogram_no_rawat_reg_periksa` FOREIGN KEY (`no_rawat`) REFERENCES `reg_periksa`(`no_rawat`) ON UPDATE CASCADE ON DELETE CASCADE');
        }

        if ($orphanCountNoRM === 0 && ! $hasFk('odontogram', 'fk_odontogram_no_rkm_medis_reg_periksa')) {
            DB::statement('ALTER TABLE `odontogram` ADD CONSTRAINT `fk_odontogram_no_rkm_medis_reg_periksa` FOREIGN KEY (`no_rkm_medis`) REFERENCES `reg_periksa`(`no_rkm_medis`) ON UPDATE CASCADE ON DELETE RESTRICT');
        }

        if ($orphanCountPenyakit === 0 && ! $hasFk('odontogram', 'fk_odontogram_kd_penyakit_penyakit')) {
            DB::statement('ALTER TABLE `odontogram` ADD CONSTRAINT `fk_odontogram_kd_penyakit_penyakit` FOREIGN KEY (`kd_penyakit`) REFERENCES `penyakit`(`kd_penyakit`) ON UPDATE CASCADE ON DELETE RESTRICT');
        }

        if ($orphanCountJns === 0 && ! $hasFk('odontogram', 'fk_odontogram_kd_jns_prw_jns_perawatan')) {
            DB::statement('ALTER TABLE `odontogram` ADD CONSTRAINT `fk_odontogram_kd_jns_prw_jns_perawatan` FOREIGN KEY (`kd_jns_prw`) REFERENCES `jns_perawatan`(`kd_jenis_prw`) ON UPDATE CASCADE ON DELETE RESTRICT');
        }
    }

    public function down(): void
    {
        if (! Schema::hasTable('odontogram')) {
            return;
        }

        $schema = DB::getDatabaseName();
        $hasFk = function (string $table, string $constraint) use ($schema): bool {
            $sql = "SELECT COUNT(1) AS cnt FROM information_schema.TABLE_CONSTRAINTS WHERE CONSTRAINT_SCHEMA = ? AND TABLE_NAME = ? AND CONSTRAINT_NAME = ? AND CONSTRAINT_TYPE = 'FOREIGN KEY'";
            $row = DB::selectOne($sql, [$schema, $table, $constraint]);
            return ((int) ($row->cnt ?? 0)) > 0;
        };

        foreach ([
            'fk_odontogram_no_rawat_reg_periksa',
            'fk_odontogram_no_rkm_medis_reg_periksa',
            'fk_odontogram_kd_penyakit_penyakit',
            'fk_odontogram_kd_jns_prw_jns_perawatan',
        ] as $fk) {
            if ($hasFk('odontogram', $fk)) {
                DB::statement("ALTER TABLE `odontogram` DROP FOREIGN KEY `$fk`");
            }
        }

        // Drop indexes created by this migration (optional rollback cleanliness)
        $hasIndex = function (string $table, string $index) use ($schema): bool {
            $sql = "SELECT COUNT(1) AS cnt FROM information_schema.STATISTICS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND INDEX_NAME = ?";
            $row = DB::selectOne($sql, [$schema, $table, $index]);
            return ((int) ($row->cnt ?? 0)) > 0;
        };

        foreach ([
            ['odontogram', 'idx_odontogram_no_rkm_medis'],
            ['odontogram', 'idx_odontogram_kd_penyakit'],
            ['odontogram', 'idx_odontogram_kd_jns_prw'],
            ['reg_periksa', 'idx_reg_periksa_no_rkm_medis'],
        ] as [$t, $i]) {
            if ($hasIndex($t, $i)) {
                DB::statement("DROP INDEX `$i` ON `$t`");
            }
        }
    }
};
