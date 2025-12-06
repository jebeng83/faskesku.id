<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetModalPaymentTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_modal_payment')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_modal_payment')->insert(array (
          0 => 
          array (
            'modal_awal' => 10000000.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}