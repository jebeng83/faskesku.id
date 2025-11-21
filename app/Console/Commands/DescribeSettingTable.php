<?php

namespace App\Console\Commands;

/**
 * Console command to describe the legacy `setting` table structure.
 * Uses SHOW COLUMNS to list fields, types, nullability, keys, defaults, extras.
 */
class DescribeSettingTable extends \Illuminate\Console\Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'setting:describe-table {--json : Output as JSON}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Describe structure of legacy `setting` table (columns, types, keys)';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        if (!\Illuminate\Support\Facades\Schema::hasTable('setting')) {
            $this->error('Table `setting` not found.');
            return 1; // FAILURE
        }

        try {
            $columns = \Illuminate\Support\Facades\DB::select('SHOW COLUMNS FROM `setting`');
        } catch (\Throwable $e) {
            $this->error('Failed to describe table: '.$e->getMessage());
            return 1; // FAILURE
        }

        if ($this->option('json')) {
            $this->line(json_encode($columns, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        } else {
            $this->info('Table: setting');
            foreach ($columns as $col) {
                // $col is stdClass with properties: Field, Type, Null, Key, Default, Extra
                $this->line(sprintf(
                    '%-22s %-20s Null:%-3s Key:%-8s Default:%-12s Extra:%s',
                    $col->Field ?? '-',
                    $col->Type ?? '-',
                    $col->Null ?? '-',
                    $col->Key ?? '-',
                    is_null($col->Default) ? 'NULL' : (string) $col->Default,
                    $col->Extra ?? ''
                ));
            }
        }

        return 0; // SUCCESS
    }
}