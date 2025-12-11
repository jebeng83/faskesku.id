<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetAkunBankbriTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_akun_bankbri')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_akun_bankbri')->insert(array (
          0 => 
          array (
            'kd_rek' => '112061',
            'consumer_key' => '¤âdþw:+? TËm]Ñ²ûÏ\'ú)r€ÊxÔjÅÄñ	pÃ¦Ã]E9ß2´',
            'consumer_secret' => 'Ëa»€70«<2õgø­ÚC“AxçÞ±·•	Bð"s',
            'institution_code' => '8J!‚º^·”$´×ÀšR',
            'briva_no' => 'QsüMÆfa!¡,m5Þ]',
            'urlapi' => '®^”\\÷Ã ?ÞÄŸC|ïÖÛ<­Z½Ê7‰Ã‹!aéònû‰v‰ÿsºÙR9`',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}