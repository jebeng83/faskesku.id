<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class SeedAllTablesSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        $dir = base_path('database/seeders/AutoSeeders');
        if (is_dir($dir)) {
            $files = collect(File::files($dir))
                ->map(fn ($f) => $f->getFilename())
                ->filter(fn ($n) => Str::endsWith($n, 'TableSeeder.php'))
                ->values();
            foreach ($files as $filename) {
                $class = 'Database\\Seeders\\AutoSeeders\\' . Str::replaceLast('.php', '', $filename);
                $this->call([$class]);
            }
        }
        Schema::enableForeignKeyConstraints();
    }
}

