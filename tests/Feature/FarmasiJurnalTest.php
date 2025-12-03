<?php

namespace Tests\Feature;

use App\Http\Controllers\Farmasi\PemesananController;
use App\Http\Controllers\Farmasi\PengeluaranController;
use App\Models\Farmasi\SetAkun;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class FarmasiJurnalTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp(): void
    {
        parent::setUp();
        DB::statement('CREATE TABLE IF NOT EXISTS set_akun (id INTEGER PRIMARY KEY AUTOINCREMENT, Pemesanan_Obat TEXT, PPN_Masukan TEXT, Kontra_Pemesanan_Obat TEXT, Pengadaan_Obat TEXT, PPN_Keluaran TEXT, Penjualan_Obat TEXT, HPP_Obat_Jual_Bebas TEXT, Persediaan_Obat_Jual_Bebas TEXT, Stok_Keluar_Medis TEXT, Kontra_Stok_Keluar_Medis TEXT, Retur_Ke_Suplayer TEXT, Kontra_Retur_Ke_Suplayer TEXT)');
        DB::statement('CREATE TABLE IF NOT EXISTS tampjurnal (kd_rek TEXT PRIMARY KEY, nm_rek TEXT, debet REAL, kredit REAL)');
        DB::statement('CREATE TABLE IF NOT EXISTS gudangbarang (kode_brng TEXT, kd_bangsal TEXT, stok REAL, no_batch TEXT, no_faktur TEXT)');
        DB::statement('CREATE TABLE IF NOT EXISTS data_batch (kode_brng TEXT, no_batch TEXT, no_faktur TEXT, h_beli REAL, tgl_kadaluarsa TEXT, sisa REAL)');
        DB::statement('CREATE TABLE IF NOT EXISTS riwayat_barang_medis (kode_brng TEXT, stok_awal REAL, masuk REAL, keluar REAL, stok_akhir REAL, posisi TEXT, tanggal TEXT, jam TEXT, petugas TEXT, kd_bangsal TEXT, status TEXT, no_batch TEXT, no_faktur TEXT, keterangan TEXT)');
        DB::statement('CREATE TABLE IF NOT EXISTS pemesanan (no_faktur TEXT PRIMARY KEY, no_order TEXT, kode_suplier TEXT, nip TEXT, tgl_pesan TEXT, tgl_faktur TEXT, tgl_tempo TEXT, subtotal REAL, dis REAL, total REAL, ppn REAL, meterai REAL, tagihan REAL, kd_bangsal TEXT, status TEXT)');
        DB::statement('CREATE TABLE IF NOT EXISTS detailpesan (no_faktur TEXT, kode_brng TEXT, kode_sat TEXT, jumlah REAL, h_pesan REAL, subtotal REAL, dis REAL, besardis REAL, total REAL, no_batch TEXT, jumlah2 REAL, kadaluarsa TEXT)');
        DB::statement('CREATE TABLE IF NOT EXISTS pengeluaran_obat_bhp (no_keluar TEXT PRIMARY KEY, tanggal TEXT, nip TEXT, keterangan TEXT, kd_bangsal TEXT)');
        DB::statement('CREATE TABLE IF NOT EXISTS detail_pengeluaran_obat_bhp (no_keluar TEXT, kode_brng TEXT, kode_sat TEXT, no_batch TEXT, jumlah REAL, h_beli REAL, subtotal REAL, no_faktur TEXT)');
    }

    public function test_pemesanan_jurnal_balanced(): void
    {
        SetAkun::query()->create([
            'Pemesanan_Obat' => '115010',
            'PPN_Masukan' => '135010',
            'Kontra_Pemesanan_Obat' => '215010',
        ]);

        $payload = [
            'no_faktur' => 'F-001',
            'kode_suplier' => 'SUP-1',
            'nip' => 'PG001',
            'tgl_pesan' => '2025-01-01',
            'subtotal' => 100000,
            'dis' => 0,
            'total' => 100000,
            'ppn' => 10000,
            'meterai' => 3000,
            'tagihan' => 113000,
            'kd_bangsal' => 'BSL1',
            'items' => [[
                'kode_brng' => 'BRG1',
                'jumlah' => 10,
                'harga' => 10000,
                'no_batch' => 'B-1',
                'jumlah2' => 10,
                'kadaluarsa' => '2026-01-01',
            ]],
        ];

        $request = Request::create('/api/pemesanan/store', 'POST', $payload);
        $controller = new PemesananController;
        $response = $controller->store($request);

        $sumDebet = (float) DB::table('tampjurnal')->sum('debet');
        $sumKredit = (float) DB::table('tampjurnal')->sum('kredit');

        $this->assertSame(113000.0, $sumDebet);
        $this->assertSame(113000.0, $sumKredit);
    }

    public function test_pengeluaran_jurnal_balanced(): void
    {
        SetAkun::query()->create([
            'Kontra_Stok_Keluar_Medis' => '115098',
            'Stok_Keluar_Medis' => '115099',
        ]);

        $payload = [
            'no_keluar' => 'K-001',
            'tanggal' => '2025-01-01',
            'nip' => 'PG001',
            'keterangan' => 'Tes',
            'kd_bangsal' => 'BSL1',
            'items' => [[
                'kode_brng' => 'BRG1',
                'jumlah' => 2,
                'h_beli' => 50000,
            ], [
                'kode_brng' => 'BRG2',
                'jumlah' => 1,
                'h_beli' => 75000,
            ]],
        ];

        $request = Request::create('/api/pengeluaran/store', 'POST', $payload);
        $controller = new PengeluaranController;
        $response = $controller->store($request);

        $sumDebet = (float) DB::table('tampjurnal')->sum('debet');
        $sumKredit = (float) DB::table('tampjurnal')->sum('kredit');

        $this->assertSame(175000.0, $sumDebet);
        $this->assertSame(175000.0, $sumKredit);
    }
}
