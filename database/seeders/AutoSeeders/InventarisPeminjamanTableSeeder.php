<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class InventarisPeminjamanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('inventaris_peminjaman')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('inventaris_peminjaman')->insert(array (
          0 => 
          array (
            'peminjam' => '-',
            'tlp' => '0880',
            'no_inventaris' => 'I000000023/2023',
            'tgl_pinjam' => '2025-06-19',
            'tgl_kembali' => '2025-06-19',
            'nip' => '123124',
            'status_pinjam' => 'Sudah Kembali',
          ),
          1 => 
          array (
            'peminjam' => '-',
            'tlp' => '',
            'no_inventaris' => 'MED/09/06/2022/01',
            'tgl_pinjam' => '2025-02-11',
            'tgl_kembali' => '2025-02-11',
            'nip' => '12/09/1988/001',
            'status_pinjam' => 'Sudah Kembali',
          ),
          2 => 
          array (
            'peminjam' => '-',
            'tlp' => '-',
            'no_inventaris' => 'MED/09/06/2022/02',
            'tgl_pinjam' => '2025-08-05',
            'tgl_kembali' => '2025-08-05',
            'nip' => '12/09/1988/001',
            'status_pinjam' => 'Sudah Kembali',
          ),
          3 => 
          array (
            'peminjam' => '-',
            'tlp' => '',
            'no_inventaris' => 'MED/11/10/0002',
            'tgl_pinjam' => '2025-02-11',
            'tgl_kembali' => '2025-02-11',
            'nip' => '123124',
            'status_pinjam' => 'Sudah Kembali',
          ),
          4 => 
          array (
            'peminjam' => 'AJIK',
            'tlp' => '121212121',
            'no_inventaris' => 'MED/09/06/2022/01',
            'tgl_pinjam' => '2024-01-31',
            'tgl_kembali' => '2024-01-31',
            'nip' => '123124',
            'status_pinjam' => 'Sudah Kembali',
          ),
          5 => 
          array (
            'peminjam' => 'CSSD',
            'tlp' => '899889',
            'no_inventaris' => 'MED/09/06/2022/01',
            'tgl_pinjam' => '2025-03-26',
            'tgl_kembali' => '2025-03-26',
            'nip' => '123124',
            'status_pinjam' => 'Sudah Kembali',
          ),
          6 => 
          array (
            'peminjam' => 'dinas kesehatan, untuk sosialisasi tb',
            'tlp' => '65575',
            'no_inventaris' => 'SAM/ELE/KAN/0004',
            'tgl_pinjam' => '2024-10-11',
            'tgl_kembali' => '2024-10-11',
            'nip' => '123124',
            'status_pinjam' => 'Sudah Kembali',
          ),
          7 => 
          array (
            'peminjam' => 'dinkes, untuk sosialisasi tb',
            'tlp' => '9',
            'no_inventaris' => 'SAM/ELE/KAN/0003',
            'tgl_pinjam' => '2024-11-12',
            'tgl_kembali' => '2024-11-21',
            'nip' => '123124',
            'status_pinjam' => 'Sudah Kembali',
          ),
          8 => 
          array (
            'peminjam' => 'obey',
            'tlp' => '08088',
            'no_inventaris' => 'MED/09/06/2022/01',
            'tgl_pinjam' => '2024-06-05',
            'tgl_kembali' => '2024-06-05',
            'nip' => '123124',
            'status_pinjam' => 'Sudah Kembali',
          ),
          9 => 
          array (
            'peminjam' => 'PAIJO',
            'tlp' => '0',
            'no_inventaris' => 'MED/09/06/2022/03',
            'tgl_pinjam' => '2024-10-31',
            'tgl_kembali' => '2024-10-31',
            'nip' => '123124',
            'status_pinjam' => 'Sudah Kembali',
          ),
          10 => 
          array (
            'peminjam' => 'PAK LURAH',
            'tlp' => '0808',
            'no_inventaris' => 'SAM/ELE/KAN/0002',
            'tgl_pinjam' => '2025-06-30',
            'tgl_kembali' => '2025-06-30',
            'nip' => '123124',
            'status_pinjam' => 'Sudah Kembali',
          ),
          11 => 
          array (
            'peminjam' => 'RAHMA',
            'tlp' => '0030304304',
            'no_inventaris' => 'I000000023/2023',
            'tgl_pinjam' => '2023-09-22',
            'tgl_kembali' => '2023-09-22',
            'nip' => '123124',
            'status_pinjam' => 'Sudah Kembali',
          ),
          12 => 
          array (
            'peminjam' => 'RUANG MAWAR',
            'tlp' => '02002323',
            'no_inventaris' => 'MED/11/10/0001',
            'tgl_pinjam' => '2023-11-10',
            'tgl_kembali' => '2023-11-10',
            'nip' => '123124',
            'status_pinjam' => 'Sudah Kembali',
          ),
          13 => 
          array (
            'peminjam' => 'RUANG OK',
            'tlp' => '001',
            'no_inventaris' => 'MED/09/06/2022/01',
            'tgl_pinjam' => '2022-06-09',
            'tgl_kembali' => '2022-06-09',
            'nip' => '12/09/1988/001',
            'status_pinjam' => 'Sudah Kembali',
          ),
          14 => 
          array (
            'peminjam' => 'RUANG R,',
            'tlp' => '0',
            'no_inventaris' => 'KANTOR/07/0001',
            'tgl_pinjam' => '2025-07-29',
            'tgl_kembali' => '2025-07-29',
            'nip' => '123124',
            'status_pinjam' => 'Sudah Kembali',
          ),
          15 => 
          array (
            'peminjam' => 'TES',
            'tlp' => '0',
            'no_inventaris' => 'I000000023/2023',
            'tgl_pinjam' => '2024-10-31',
            'tgl_kembali' => '2024-10-31',
            'nip' => '123124',
            'status_pinjam' => 'Sudah Kembali',
          ),
          16 => 
          array (
            'peminjam' => 'TES',
            'tlp' => '8686',
            'no_inventaris' => 'INV/2023/12/14/003',
            'tgl_pinjam' => '2024-09-30',
            'tgl_kembali' => '2024-09-30',
            'nip' => '123124',
            'status_pinjam' => 'Sudah Kembali',
          ),
          17 => 
          array (
            'peminjam' => 'tes',
            'tlp' => '01212',
            'no_inventaris' => 'MED/09/06/2022/01',
            'tgl_pinjam' => '2024-09-14',
            'tgl_kembali' => '0000-00-00',
            'nip' => '12/09/1988/001',
            'status_pinjam' => 'Masih Dipinjam',
          ),
          18 => 
          array (
            'peminjam' => 'tes',
            'tlp' => '0',
            'no_inventaris' => 'MED/09/06/2022/01',
            'tgl_pinjam' => '2024-11-26',
            'tgl_kembali' => '2024-11-26',
            'nip' => '123124',
            'status_pinjam' => 'Sudah Kembali',
          ),
          19 => 
          array (
            'peminjam' => 'TES',
            'tlp' => '0088080',
            'no_inventaris' => 'MED/09/06/2022/03',
            'tgl_pinjam' => '2024-08-13',
            'tgl_kembali' => '2024-08-13',
            'nip' => '123124',
            'status_pinjam' => 'Sudah Kembali',
          ),
          20 => 
          array (
            'peminjam' => 'tes',
            'tlp' => '888',
            'no_inventaris' => 'MED/11/10/0003',
            'tgl_pinjam' => '2024-11-21',
            'tgl_kembali' => '0000-00-00',
            'nip' => '123124',
            'status_pinjam' => 'Masih Dipinjam',
          ),
          21 => 
          array (
            'peminjam' => 'ttytyyyty',
            'tlp' => '0998898',
            'no_inventaris' => 'INV/2023/12/14/002',
            'tgl_pinjam' => '2024-04-29',
            'tgl_kembali' => '2024-04-29',
            'nip' => '123124',
            'status_pinjam' => 'Sudah Kembali',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}