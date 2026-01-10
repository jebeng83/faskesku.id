<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('antriloket')) {
            return;
        }
        if (Schema::hasColumn('antriloket', 'nomor') && ! Schema::hasColumn('antriloket', 'antrian')) {
            return;
        }

        Schema::table('antriloket', function (Blueprint $table) {
            if (! Schema::hasColumn('antriloket', 'nomor')) {
                $table->unsignedInteger('nomor')->nullable()->after('antrian');
            }
            if (! Schema::hasColumn('antriloket', 'prefix')) {
                $table->string('prefix', 2)->nullable()->after('nomor');
            }
            if (! Schema::hasColumn('antriloket', 'tanggal')) {
                $table->date('tanggal')->nullable()->after('prefix');
            }
            if (! Schema::hasColumn('antriloket', 'status')) {
                $table->enum('status', ['baru', 'dicetak', 'dipanggil', 'batal'])->default('baru')->after('tanggal');
            }
            if (! Schema::hasColumn('antriloket', 'asal')) {
                $table->enum('asal', ['kiosk', 'loket'])->default('kiosk')->after('status');
            }
            if (! Schema::hasColumn('antriloket', 'kode_tiket')) {
                $table->char('kode_tiket', 8)->nullable()->after('loket');
            }
            if (! Schema::hasColumn('antriloket', 'dibuat_oleh')) {
                $table->string('dibuat_oleh', 20)->nullable()->after('kode_tiket');
            }
            if (! Schema::hasColumn('antriloket', 'dicetak_pada')) {
                $table->timestamp('dicetak_pada')->nullable()->after('dibuat_oleh');
            }
            if (! Schema::hasColumn('antriloket', 'dipanggil_pada')) {
                $table->timestamp('dipanggil_pada')->nullable()->after('dicetak_pada');
            }
            if (! Schema::hasColumn('antriloket', 'dibatalkan_pada')) {
                $table->timestamp('dibatalkan_pada')->nullable()->after('dipanggil_pada');
            }
            $hasCreatedAt = Schema::hasColumn('antriloket', 'created_at');
            $hasUpdatedAt = Schema::hasColumn('antriloket', 'updated_at');
            if (! $hasCreatedAt && ! $hasUpdatedAt) {
                $table->timestamps();
            }
        });

        // Data backfill
        if (Schema::hasColumn('antriloket', 'nomor') && Schema::hasColumn('antriloket', 'antrian')) {
            DB::statement('UPDATE antriloket SET nomor = antrian WHERE nomor IS NULL');
        }
        if (Schema::hasColumn('antriloket', 'tanggal')) {
            DB::statement('UPDATE antriloket SET tanggal = CURRENT_DATE WHERE tanggal IS NULL');
        }

        // Indexes
        Schema::table('antriloket', function (Blueprint $table) {
            // Unique per hari + prefix + nomor
            $table->unique(['tanggal', 'prefix', 'nomor'], 'uq_antriloket_harian');
            // Lookup indexes
            $table->index('status');
            $table->index('asal');
            $table->index('created_at');
            if (Schema::hasColumn('antriloket', 'kode_tiket')) {
                $table->unique('kode_tiket', 'uq_antriloket_kode');
            }
        });
    }

    public function down(): void
    {
        if (! Schema::hasTable('antriloket')) {
            return;
        }
        Schema::table('antriloket', function (Blueprint $table) {
            // Drop indexes first to avoid errors
            try {
                $table->dropUnique('uq_antriloket_harian');
            } catch (\Throwable $e) {
            }
            try {
                $table->dropUnique('uq_antriloket_kode');
            } catch (\Throwable $e) {
            }
            try {
                $table->dropIndex(['status']);
            } catch (\Throwable $e) {
            }
            try {
                $table->dropIndex(['asal']);
            } catch (\Throwable $e) {
            }
            try {
                $table->dropIndex(['created_at']);
            } catch (\Throwable $e) {
            }

            // Drop added columns (keep original: antrian, loket)
            foreach (['nomor', 'prefix', 'tanggal', 'status', 'asal', 'kode_tiket', 'dibuat_oleh', 'dicetak_pada', 'dipanggil_pada', 'dibatalkan_pada', 'created_at', 'updated_at'] as $col) {
                if (Schema::hasColumn('antriloket', $col)) {
                    $table->dropColumn($col);
                }
            }
        });
    }
};
