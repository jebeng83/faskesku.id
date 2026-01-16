<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('skrining_visual') || ! Schema::hasTable('pasien')) {
            return;
        }

        $engine = null;
        try {
            $row = DB::selectOne('SELECT ENGINE FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?', ['skrining_visual']);
            $engine = $row->ENGINE ?? null;
        } catch (\Throwable $e) {
        }
        if ($engine !== 'InnoDB') {
            try {
                DB::statement('ALTER TABLE skrining_visual ENGINE=InnoDB');
            } catch (\Throwable $e) {
                return;
            }
        }

        $invalid = 0;
        try {
            $cnt = DB::selectOne('SELECT COUNT(*) AS c FROM skrining_visual sv LEFT JOIN pasien p ON p.no_rkm_medis = sv.no_rkm_medis WHERE p.no_rkm_medis IS NULL');
            $invalid = (int) ($cnt->c ?? 0);
        } catch (\Throwable $e) {
            $invalid = 0;
        }
        if ($invalid > 0) {
            try {
                $indexes = collect(DB::select('SHOW INDEX FROM skrining_visual'))->map(fn ($r) => $r->Key_name)->unique()->all();
                if (! in_array('idx_skrining_visual_no_rkm_medis', $indexes, true)) {
                    DB::statement('ALTER TABLE skrining_visual ADD INDEX idx_skrining_visual_no_rkm_medis (no_rkm_medis)');
                }
            } catch (\Throwable $e) {
            }
            return;
        }

        try {
            $exists = DB::select('SELECT CONSTRAINT_NAME FROM information_schema.TABLE_CONSTRAINTS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND CONSTRAINT_NAME = ?', ['skrining_visual', 'visual_ibfi_1']);
            if (! empty($exists)) {
                return;
            }
        } catch (\Throwable $e) {
        }

        Schema::table('skrining_visual', function (Blueprint $table) {
            $table->foreign(['no_rkm_medis'], 'visual_ibfi_1')
                ->references(['no_rkm_medis'])
                ->on('pasien')
                ->onUpdate('cascade');
        });
    }

    public function down(): void
    {
        if (! Schema::hasTable('skrining_visual')) {
            return;
        }
        try {
            Schema::table('skrining_visual', function (Blueprint $table) {
                $table->dropForeign('visual_ibfi_1');
            });
        } catch (\Throwable $e) {
        }
    }
};
