<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('odontogram') && Schema::hasColumn('odontogram', 'ks_jns_prw') && ! Schema::hasColumn('odontogram', 'kd_jns_prw')) {
            DB::statement("ALTER TABLE `odontogram` CHANGE COLUMN `ks_jns_prw` `kd_jns_prw` VARCHAR(15) NOT NULL");
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('odontogram') && Schema::hasColumn('odontogram', 'kd_jns_prw') && ! Schema::hasColumn('odontogram', 'ks_jns_prw')) {
            DB::statement("ALTER TABLE `odontogram` CHANGE COLUMN `kd_jns_prw` `ks_jns_prw` VARCHAR(15) NOT NULL");
        }
    }
};
