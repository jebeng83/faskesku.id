<?php

namespace Tests\Feature;

use App\Http\Controllers\Farmasi\PembelianController;
use App\Models\Farmasi\SetAkun;
use App\Services\Akutansi\JurnalPostingService;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class PembelianScenarioTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp(): void
    {
        parent::setUp();

        DB::statement('CREATE TABLE IF NOT EXISTS set_akun (id INTEGER PRIMARY KEY AUTOINCREMENT, Pemesanan_Obat TEXT, PPN_Masukan TEXT, Kontra_Pemesanan_Obat TEXT, Pengadaan_Obat TEXT, PPN_Keluaran TEXT, Penjualan_Obat TEXT, HPP_Obat_Jual_Bebas TEXT, Persediaan_Obat_Jual_Bebas TEXT, Stok_Keluar_Medis TEXT, Kontra_Stok_Keluar_Medis TEXT, Retur_Ke_Suplayer TEXT, Kontra_Retur_Ke_Suplayer TEXT)');
        DB::statement('CREATE TABLE IF NOT EXISTS tampjurnal (kd_rek TEXT PRIMARY KEY, nm_rek TEXT, debet REAL, kredit REAL)');
        DB::statement('CREATE TABLE IF NOT EXISTS tampjurnal2 (kd_rek TEXT PRIMARY KEY, nm_rek TEXT, debet REAL, kredit REAL)');
        DB::statement('CREATE TABLE IF NOT EXISTS jurnal (no_jurnal TEXT PRIMARY KEY, no_bukti TEXT, tgl_jurnal TEXT, jam_jurnal TEXT, jenis TEXT, keterangan TEXT)');
        DB::statement('CREATE TABLE IF NOT EXISTS detailjurnal (no_jurnal TEXT, kd_rek TEXT, debet REAL, kredit REAL)');
        DB::statement('CREATE TABLE IF NOT EXISTS gudangbarang (kode_brng TEXT, kd_bangsal TEXT, stok REAL, no_batch TEXT, no_faktur TEXT)');
        DB::statement('CREATE TABLE IF NOT EXISTS data_batch (kode_brng TEXT, no_batch TEXT, no_faktur TEXT, h_beli REAL, tgl_kadaluarsa TEXT, sisa REAL)');
        DB::statement('CREATE TABLE IF NOT EXISTS riwayat_barang_medis (kode_brng TEXT, stok_awal REAL, masuk REAL, keluar REAL, stok_akhir REAL, posisi TEXT, tanggal TEXT, jam TEXT, petugas TEXT, kd_bangsal TEXT, status TEXT, no_batch TEXT, no_faktur TEXT, keterangan TEXT)');
        DB::statement('CREATE TABLE IF NOT EXISTS riwayat_transaksi_gudangbarang (id INTEGER PRIMARY KEY AUTOINCREMENT, kode_brng TEXT, kd_bangsal TEXT, no_batch TEXT, no_faktur TEXT, jenis_transaksi TEXT, stok_sebelum REAL, stok_sesudah REAL, selisih REAL, keterangan TEXT, user_id TEXT, sumber_transaksi TEXT, data_sebelum TEXT, data_sesudah TEXT, waktu_transaksi TEXT, created_at TEXT, updated_at TEXT)');
        DB::statement('CREATE TABLE IF NOT EXISTS pembelian (no_faktur TEXT PRIMARY KEY, kode_suplier TEXT, nip TEXT, tgl_beli TEXT, total1 REAL, potongan REAL, total2 REAL, ppn REAL, tagihan REAL, kd_bangsal TEXT, kd_rek TEXT)');
        DB::statement('CREATE TABLE IF NOT EXISTS detailbeli (no_faktur TEXT, kode_brng TEXT, jumlah REAL, h_beli REAL, subtotal REAL, dis REAL, besardis REAL, total REAL, no_batch TEXT, jumlah2 REAL, kadaluarsa TEXT)');
        DB::statement('CREATE TABLE IF NOT EXISTS databarang (kode_brng TEXT PRIMARY KEY, nama_brng TEXT, kode_sat TEXT, kode_satbesar TEXT, dasar REAL, h_beli REAL, ralan REAL, kelas1 REAL, kelas2 REAL, kelas3 REAL, utama REAL, vip REAL, vvip REAL, beliluar REAL, jualbebas REAL, karyawan REAL, isi REAL, kapasitas REAL, status TEXT, letak_barang TEXT)');
        DB::statement('CREATE TABLE IF NOT EXISTS datasuplier (kode_suplier TEXT PRIMARY KEY, nama_suplier TEXT, alamat TEXT, kota TEXT, no_telp TEXT)');
        DB::statement('CREATE TABLE IF NOT EXISTS set_harga_obat (hargadasar TEXT, ppn TEXT, ralan REAL, kelas1 REAL, kelas2 REAL, kelas3 REAL, utama REAL, vip REAL, vvip REAL, beliluar REAL, jualbebas REAL, karyawan REAL)');

        DB::table('datasuplier')->insert(['kode_suplier' => 'S0001', 'nama_suplier' => 'Supplier Test']);
        DB::table('set_harga_obat')->insert(['hargadasar' => 'Harga Diskon', 'ppn' => 'No', 'ralan' => 10, 'kelas1' => 10, 'kelas2' => 12, 'kelas3' => 15, 'utama' => 15, 'vip' => 20, 'vvip' => 25, 'beliluar' => 5, 'jualbebas' => 5, 'karyawan' => 0]);
        DB::table('databarang')->insert([
            'kode_brng' => 'B000000965',
            'nama_brng' => 'Obat 965',
            'kode_sat' => 'TAB',
            'kode_satbesar' => 'UNIT',
            'dasar' => 333,
            'h_beli' => 333,
            'ralan' => 333,
            'kelas1' => 333,
            'kelas2' => 333,
            'kelas3' => 333,
            'utama' => 333,
            'vip' => 333,
            'vvip' => 333,
            'beliluar' => 333,
            'jualbebas' => 333,
            'karyawan' => 333,
            'isi' => 1,
            'kapasitas' => 0,
            'status' => '1',
            'letak_barang' => 'Apotek',
        ]);
    }

    public function test_pembelian_updates_databarang_and_posts_jurnal(): void
    {
        SetAkun::query()->create([
            'Pengadaan_Obat' => '115010',
            'PPN_Masukan' => '135010',
        ]);

        $payload = [
            'no_faktur' => 'PB-'.date('Ymd').'-001',
            'kode_suplier' => 'S0001',
            'nip' => 'PG001',
            'tgl_beli' => date('Y-m-d'),
            'total1' => 350.0,
            'potongan' => 0.0,
            'total2' => 350.0,
            'ppn' => 0.0,
            'tagihan' => 350.0,
            'kd_bangsal' => 'BSL1',
            'kd_rek' => '111000',
            'items' => [[
                'kode_brng' => 'B000000965',
                'jumlah' => 1,
                'harga' => 350.0,
                'subtotal' => 350.0,
                'dis' => 0.0,
                'besardis' => 0.0,
                'total' => 350.0,
                'no_batch' => 'NB965-1',
                'jumlah2' => 1,
                'kadaluarsa' => date('Y-m-d', strtotime('+1 year')),
            ]],
        ];

        $req = Request::create('/api/pembelian/store', 'POST', $payload);
        $controller = new PembelianController;
        $controller->store($req);

        $row = DB::table('databarang')->where('kode_brng', 'B000000965')->first(['h_beli', 'dasar', 'ralan', 'jualbebas']);
        $this->assertSame(350.0, (float) ($row->h_beli ?? 0));
        $this->assertSame(350.0, (float) ($row->dasar ?? 0));

        $svc = new JurnalPostingService();
        $svc->post($payload['no_faktur'], 'Pembelian B000000965', date('Y-m-d'));

        $j = DB::table('jurnal')->orderBy('no_jurnal', 'desc')->first();
        $this->assertNotNull($j);
        $sumDebet = (float) DB::table('detailjurnal')->where('no_jurnal', $j->no_jurnal)->sum('debet');
        $sumKredit = (float) DB::table('detailjurnal')->where('no_jurnal', $j->no_jurnal)->sum('kredit');
        $this->assertSame($sumDebet, $sumKredit);
        $this->assertSame(350.0, $sumDebet);
    }
}
