<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class K3rsJenisLukaTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('k3rs_jenis_luka')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('k3rs_jenis_luka')->insert(array (
          0 => 
          array (
            'kode_luka' => 'LK001',
            'jenis_luka' => 'Cidera dangkal dan luka terbuka',
          ),
          1 => 
          array (
            'kode_luka' => 'LK002',
            'jenis_luka' => 'Patah tulang',
          ),
          2 => 
          array (
            'kode_luka' => 'LK003',
            'jenis_luka' => 'Dislokasi, terkilir dan keseleo (sprains and strains)',
          ),
          3 => 
          array (
            'kode_luka' => 'LK004',
            'jenis_luka' => 'Gegar otak dan cidera dalam',
          ),
          4 => 
          array (
            'kode_luka' => 'LK005',
            'jenis_luka' => 'Jenis cidera spesifik lainnya, seperti efek radiasi, efek panas, efek kebisingan dan getaran, efek arus listrik, asphisia, hipotermia,dan sejenisnya',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}