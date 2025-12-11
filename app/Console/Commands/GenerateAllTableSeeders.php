<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class GenerateAllTableSeeders extends Command
{
    protected $signature = 'db:seed:generate-all {--exclude=} {--path=database/seeders/AutoSeeders} {--chunk=500}';

    protected $description = 'Generate seeder classes for all tables in the current database';

    public function handle(): int
    {
        $excludeInput = (string) $this->option('exclude');
        $exclude = collect(explode(',', $excludeInput))
            ->map(fn ($v) => trim($v))
            ->filter()
            ->map(fn ($v) => Str::lower($v))
            ->values()
            ->all();

        $excludeDefault = [
            'migrations',
            'setting_bridging_bpjs',
            'setting_briding_mobilejkn',
            'setting_briding_mobile_jkn',
        ];
        $exclude = array_unique(array_merge($excludeDefault, $exclude));

        $rows = DB::select('SHOW TABLES');
        if (empty($rows)) {
            $this->error('Tidak ada tabel ditemukan.');
            return 1;
        }

        $first = (array) $rows[0];
        $tableCol = array_keys($first)[0] ?? null;
        if (!$tableCol) {
            $this->error('Gagal membaca daftar tabel.');
            return 1;
        }

        $tables = collect($rows)
            ->map(fn ($r) => (array) $r)
            ->pluck($tableCol)
            ->filter()
            ->values()
            ->all();

        $targetPath = base_path((string) $this->option('path'));
        File::ensureDirectoryExists($targetPath);

        $chunkSize = (int) $this->option('chunk');
        $generated = [];

        foreach ($tables as $table) {
            $tableName = (string) $table;
            if (in_array(Str::lower($tableName), $exclude, true)) {
                $this->line("Lewati: {$tableName}");
                continue;
            }

            $className = Str::studly(Str::singular($tableName)) . 'TableSeeder';
            $ns = 'Database\\Seeders\\AutoSeeders';
            $fqcn = $ns . '\\' . $className;
            $filePath = $targetPath . DIRECTORY_SEPARATOR . $className . '.php';

            $data = DB::table($tableName)->get()->map(fn ($r) => (array) $r)->all();

            $chunks = array_chunk($data, max($chunkSize, 1));
            $body = '';
            foreach ($chunks as $chunk) {
                $export = var_export($chunk, true);
                $body .= "DB::table('{$tableName}')->insert({$export});\n";
            }

            $php = <<<PHP
<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class {$className} extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('{$tableName}')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
{$this->indent($body, 8)}
        Schema::enableForeignKeyConstraints();
    }
}
PHP;

            File::put($filePath, $php);
            $generated[] = $fqcn;
            $this->info("Seeder dibuat: {$fqcn}");
        }

        $aggPath = base_path('database/seeders/SeedAllTablesSeeder.php');
        $aggCalls = implode(",\n            ", array_map(fn ($c) => '\\' . $c . '::class', $generated));
        $agg = <<<PHP
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class SeedAllTablesSeeder extends Seeder
{
    public function run(): void
    {
        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=0');
        \Illuminate\Support\Facades\DB::statement('SET SQL_SAFE_UPDATES=0');
        \Illuminate\Support\Facades\DB::statement('SET UNIQUE_CHECKS=0');
        \Illuminate\Support\Facades\DB::statement('SET AUTOCOMMIT=0');
        \Illuminate\Support\Facades\DB::beginTransaction();

        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        \Illuminate\Support\Facades\DB::commit();

        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=1');
        \Illuminate\Support\Facades\DB::statement('SET SQL_SAFE_UPDATES=1');
        \Illuminate\Support\Facades\DB::statement('SET UNIQUE_CHECKS=1');
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        \Illuminate\Support\Facades\DB::statement('SET AUTOCOMMIT=1');

        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=0');
        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=1');
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=0');
        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=1');
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=0');
        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=1');
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=0');
        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=1');
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=0');
        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=1');
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=0');
        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=1');
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=0');
        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=1');
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=0');
        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=1');
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=0');
        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=1');
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=0');
        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=1');
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        $this->call([
            {$aggCalls}
        ]);
    }
}
PHP;

        File::put($aggPath, $agg);

        $this->info('Seeder aggregator dibuat: Database\\Seeders\\SeedAllTablesSeeder');
        $this->info('Jalankan: php artisan db:seed --class=Database\\Seeders\\SeedAllTablesSeeder');
        return 0;
    }

    private function indent(string $text, int $spaces): string
    {
        $pad = str_repeat(' ', $spaces);
        return collect(explode("\n", rtrim($text)))
            ->map(fn ($line) => $pad . $line)
            ->implode("\n");
    }
}

