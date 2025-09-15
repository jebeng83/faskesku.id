<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Wilayah;
use Illuminate\Support\Facades\DB;

class WilayahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Disable foreign key checks for faster insertion
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Clear existing data
        Wilayah::truncate();

        // Enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Read and parse the SQL file
        $sqlFile = '/Users/hardiko/Downloads/wilayah.sql';

        if (file_exists($sqlFile)) {
            $this->seedFromSqlFile($sqlFile);
        } else {
            $this->seedSampleData();
        }
    }

    /**
     * Seed from SQL file
     */
    private function seedFromSqlFile($sqlFile)
    {
        $sql = file_get_contents($sqlFile);

        // Split SQL into individual INSERT statements
        $statements = array_filter(array_map('trim', explode(';', $sql)));

        $batchSize = 1000;
        $batch = [];

        foreach ($statements as $statement) {
            if (strpos($statement, 'INSERT INTO wilayah') === 0) {
                // Extract values from INSERT statement
                if (preg_match('/VALUES\s*(.+)/i', $statement, $matches)) {
                    $valuesString = $matches[1];

                    // Parse individual value tuples - handle both formats
                    if (preg_match_all("/\('([^']+)',\s*'([^']+)'\)/", $valuesString, $matches, PREG_SET_ORDER)) {
                        foreach ($matches as $match) {
                            $batch[] = [
                                'kode' => $match[1],
                                'nama' => $match[2],
                                'created_at' => now(),
                                'updated_at' => now(),
                            ];

                            if (count($batch) >= $batchSize) {
                                Wilayah::insert($batch);
                                $batch = [];
                            }
                        }
                    }
                    // Handle format with spaces in kode (like '11 01 03')
                    elseif (preg_match_all("/\('([^']+)',\s*'([^']+)'\)/", $valuesString, $matches, PREG_SET_ORDER)) {
                        foreach ($matches as $match) {
                            // Clean kode by removing spaces and replacing with dots
                            $kode = str_replace(' ', '.', $match[1]);

                            $batch[] = [
                                'kode' => $kode,
                                'nama' => $match[2],
                                'created_at' => now(),
                                'updated_at' => now(),
                            ];

                            if (count($batch) >= $batchSize) {
                                Wilayah::insert($batch);
                                $batch = [];
                            }
                        }
                    }
                }
            }
        }

        // Insert remaining batch
        if (!empty($batch)) {
            Wilayah::insert($batch);
        }
    }

    /**
     * Seed sample data if SQL file doesn't exist
     */
    private function seedSampleData()
    {
        $sampleData = [
            // Provinces
            ['kode' => '11', 'nama' => 'Aceh'],
            ['kode' => '12', 'nama' => 'Sumatera Utara'],
            ['kode' => '13', 'nama' => 'Sumatera Barat'],
            ['kode' => '14', 'nama' => 'Riau'],
            ['kode' => '15', 'nama' => 'Jambi'],
            ['kode' => '16', 'nama' => 'Sumatera Selatan'],
            ['kode' => '17', 'nama' => 'Bengkulu'],
            ['kode' => '18', 'nama' => 'Lampung'],
            ['kode' => '19', 'nama' => 'Kepulauan Bangka Belitung'],
            ['kode' => '21', 'nama' => 'Kepulauan Riau'],
            ['kode' => '31', 'nama' => 'DKI Jakarta'],
            ['kode' => '32', 'nama' => 'Jawa Barat'],
            ['kode' => '33', 'nama' => 'Jawa Tengah'],
            ['kode' => '34', 'nama' => 'DI Yogyakarta'],
            ['kode' => '35', 'nama' => 'Jawa Timur'],
            ['kode' => '36', 'nama' => 'Banten'],
            ['kode' => '51', 'nama' => 'Bali'],
            ['kode' => '52', 'nama' => 'Nusa Tenggara Barat'],
            ['kode' => '53', 'nama' => 'Nusa Tenggara Timur'],
            ['kode' => '61', 'nama' => 'Kalimantan Barat'],
            ['kode' => '62', 'nama' => 'Kalimantan Tengah'],
            ['kode' => '63', 'nama' => 'Kalimantan Selatan'],
            ['kode' => '64', 'nama' => 'Kalimantan Timur'],
            ['kode' => '65', 'nama' => 'Kalimantan Utara'],
            ['kode' => '71', 'nama' => 'Sulawesi Utara'],
            ['kode' => '72', 'nama' => 'Sulawesi Tengah'],
            ['kode' => '73', 'nama' => 'Sulawesi Selatan'],
            ['kode' => '74', 'nama' => 'Sulawesi Tenggara'],
            ['kode' => '75', 'nama' => 'Gorontalo'],
            ['kode' => '76', 'nama' => 'Sulawesi Barat'],
            ['kode' => '81', 'nama' => 'Maluku'],
            ['kode' => '82', 'nama' => 'Maluku Utara'],
            ['kode' => '91', 'nama' => 'Papua'],
            ['kode' => '92', 'nama' => 'Papua Barat'],
            ['kode' => '93', 'nama' => 'Papua Selatan'],
            ['kode' => '94', 'nama' => 'Papua Tengah'],
            ['kode' => '95', 'nama' => 'Papua Pegunungan'],
            ['kode' => '96', 'nama' => 'Papua Barat Daya'],

            // Sample Regencies for DKI Jakarta
            ['kode' => '31.01', 'nama' => 'Kepulauan Seribu'],
            ['kode' => '31.02', 'nama' => 'Jakarta Selatan'],
            ['kode' => '31.03', 'nama' => 'Jakarta Timur'],
            ['kode' => '31.04', 'nama' => 'Jakarta Pusat'],
            ['kode' => '31.05', 'nama' => 'Jakarta Barat'],
            ['kode' => '31.06', 'nama' => 'Jakarta Utara'],

            // Sample Districts for Jakarta Selatan
            ['kode' => '31.02.01', 'nama' => 'Kebayoran Baru'],
            ['kode' => '31.02.02', 'nama' => 'Kebayoran Lama'],
            ['kode' => '31.02.03', 'nama' => 'Pancoran'],
            ['kode' => '31.02.04', 'nama' => 'Cilandak'],
            ['kode' => '31.02.05', 'nama' => 'Pasar Minggu'],
            ['kode' => '31.02.06', 'nama' => 'Jagakarsa'],
            ['kode' => '31.02.07', 'nama' => 'Mampang Prapatan'],
            ['kode' => '31.02.08', 'nama' => 'Pasar Rebo'],
            ['kode' => '31.02.09', 'nama' => 'Tebet'],
            ['kode' => '31.02.10', 'nama' => 'Setiabudi'],

            // Sample Villages for Kebayoran Baru
            ['kode' => '31.02.01.1001', 'nama' => 'Kramat Pela'],
            ['kode' => '31.02.01.1002', 'nama' => 'Gandaria Selatan'],
            ['kode' => '31.02.01.1003', 'nama' => 'Gandaria Utara'],
            ['kode' => '31.02.01.1004', 'nama' => 'Cipete Utara'],
            ['kode' => '31.02.01.1005', 'nama' => 'Cipete Selatan'],
            ['kode' => '31.02.01.1006', 'nama' => 'Pulo'],
            ['kode' => '31.02.01.1007', 'nama' => 'Melawai'],
            ['kode' => '31.02.01.1008', 'nama' => 'Petogogan'],
            ['kode' => '31.02.01.1009', 'nama' => 'Rawa Barat'],
            ['kode' => '31.02.01.1010', 'nama' => 'Senayan'],
        ];

        foreach ($sampleData as $data) {
            Wilayah::create([
                'kode' => $data['kode'],
                'nama' => $data['nama'],
            ]);
        }
    }
}
