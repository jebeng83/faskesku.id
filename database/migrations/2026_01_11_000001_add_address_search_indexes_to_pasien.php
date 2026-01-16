<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;

return new class extends Migration {
    public function up(): void
    {
        $driver = Schema::getConnection()->getDriverName();
        if ($driver === 'pgsql') {
            DB::statement('CREATE EXTENSION IF NOT EXISTS pg_trgm');
            DB::statement('CREATE INDEX IF NOT EXISTS pasien_alamat_trgm_idx ON pasien USING GIN (alamat gin_trgm_ops)');
            DB::statement('CREATE INDEX IF NOT EXISTS pasien_alamatpj_trgm_idx ON pasien USING GIN (alamatpj gin_trgm_ops)');
            DB::statement('CREATE INDEX IF NOT EXISTS pasien_kelurahanpj_trgm_idx ON pasien USING GIN (kelurahanpj gin_trgm_ops)');
            DB::statement('CREATE INDEX IF NOT EXISTS pasien_kecamatanpj_trgm_idx ON pasien USING GIN (kecamatanpj gin_trgm_ops)');
            DB::statement('CREATE INDEX IF NOT EXISTS pasien_kabupatenpj_trgm_idx ON pasien USING GIN (kabupatenpj gin_trgm_ops)');
        } else {
            $cols = ['alamat', 'alamatpj', 'kelurahanpj', 'kecamatanpj', 'kabupatenpj'];
            $present = array_values(array_filter($cols, fn ($c) => Schema::hasColumn('pasien', $c)));
            if (! empty($present)) {
                Schema::table('pasien', function (Blueprint $table) use ($present) {
                    $table->fullText($present, 'pasien_ft_alamat_all');
                });
            }
        }
    }

    public function down(): void
    {
        $driver = Schema::getConnection()->getDriverName();
        if ($driver === 'pgsql') {
            DB::statement('DROP INDEX IF EXISTS pasien_alamat_trgm_idx');
            DB::statement('DROP INDEX IF EXISTS pasien_alamatpj_trgm_idx');
            DB::statement('DROP INDEX IF EXISTS pasien_kelurahanpj_trgm_idx');
            DB::statement('DROP INDEX IF EXISTS pasien_kecamatanpj_trgm_idx');
            DB::statement('DROP INDEX IF EXISTS pasien_kabupatenpj_trgm_idx');
        } else {
            Schema::table('pasien', function (Blueprint $table) {
                $table->dropFullText('pasien_ft_alamat_all');
            });
        }
    }
};
