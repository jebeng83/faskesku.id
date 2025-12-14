<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BankSeeder extends Seeder
{
    public function run()
    {
        $banks = [
            'Bank Mandiri',
            'Bank BRI',
            'Bank BNI',
            'Bank BCA',
            'Bank Jabar',
            'Bank Papua',
        ];

        foreach ($banks as $name) {
            DB::table('bank')->updateOrInsert(['namabank' => $name], ['namabank' => $name]);
        }
    }
}
