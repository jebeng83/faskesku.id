<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (! Schema::hasTable('set_akun')) {
            Schema::create('set_akun', function (Blueprint $table) {
                $table->string('Pengadaan_Obat', 15)->nullable()->index('pengadaan_obat');
                $table->string('Pemesanan_Obat', 15)->nullable()->index('pemesanan_obat');
                $table->string('Kontra_Pemesanan_Obat', 15)->nullable()->index('kontra_pemesanan_obat');
                $table->string('Bayar_Pemesanan_Obat', 15)->nullable()->index('bayar_pemesanan_obat');
                $table->string('Penjualan_Obat', 15)->nullable()->index('penjualan_obat');
                $table->string('Piutang_Obat', 15)->nullable()->index('piutang_obat');
                $table->string('Kontra_Piutang_Obat', 15)->nullable()->index('kontra_piutang_obat');
                $table->string('Retur_Ke_Suplayer', 15)->nullable()->index('retur_ke_suplayer');
                $table->string('Kontra_Retur_Ke_Suplayer', 15)->nullable()->index('kontra_retur_ke_suplayer');
                $table->string('Retur_Dari_pembeli', 15)->nullable()->index('retur_dari_pembeli');
                $table->string('Kontra_Retur_Dari_Pembeli', 15)->nullable()->index('kontra_retur_dari_pembeli');
                $table->string('Retur_Piutang_Obat', 15)->nullable()->index('retur_piutang_obat');
                $table->string('Kontra_Retur_Piutang_Obat', 15)->nullable()->index('kontra_retur_piutang_obat');
                $table->string('Pengadaan_Ipsrs', 15)->nullable()->index('pengadaan_ipsrs');
                $table->string('Stok_Keluar_Ipsrs', 15)->nullable()->index('stok_keluar_ipsrs');
                $table->string('Kontra_Stok_Keluar_Ipsrs', 15)->nullable()->index('kontra_stok_keluar_ipsrs');
                $table->string('Bayar_Piutang_Pasien', 15)->nullable()->index('bayar_piutang_pasien');
                $table->string('Pengambilan_Utd', 15)->nullable()->index('pengambilan_utd');
                $table->string('Kontra_Pengambilan_Utd', 15)->nullable()->index('kontra_pengambilan_utd');
                $table->string('Pengambilan_Penunjang_Utd', 15)->nullable()->index('pengambilan_penunjang_utd');
                $table->string('Kontra_Pengambilan_Penunjang_Utd', 15)->nullable()->index('kontra_pengambilan_penunjang_utd');
                $table->string('Penyerahan_Darah', 15)->nullable()->index('penyerahan_darah');
                $table->string('Stok_Keluar_Medis', 15)->index('stok_keluar_medis');
                $table->string('Kontra_Stok_Keluar_Medis', 15)->index('kontra_stok_keluar_medis');
                $table->string('HPP_Obat_Jual_Bebas', 15)->nullable()->index('hpp_obat_jual_bebas');
                $table->string('Persediaan_Obat_Jual_Bebas', 15)->nullable()->index('persediaan_obat_jual_bebas');
                $table->string('Penerimaan_NonMedis', 15)->index('penerimaan_nonmedis');
                $table->string('Kontra_Penerimaan_NonMedis', 15)->index('kontra_penerimaan_nonmedis');
                $table->string('Bayar_Pemesanan_Non_Medis', 15)->index('bayar_pemesanan_non_medis');
                $table->string('Hibah_Obat', 15)->index('hibah_obat');
                $table->string('Kontra_Hibah_Obat', 15)->index('kontra_hibah_obat');
                $table->string('Penerimaan_Toko', 15)->nullable()->index('penerimaan_toko');
                $table->string('Kontra_Penerimaan_Toko', 15)->nullable()->index('kontra_penerimaan_toko');
                $table->string('Pengadaan_Toko', 15)->index('pengadaan_toko');
                $table->string('Bayar_Pemesanan_Toko', 15)->nullable()->index('bayar_pemesanan_toko');
                $table->string('Penjualan_Toko', 15)->nullable()->index('penjualan_toko');
                $table->string('HPP_Barang_Toko', 15)->nullable()->index('hpp_barang_toko');
                $table->string('Persediaan_Barang_Toko', 15)->nullable()->index('persediaan_barang_toko');
                $table->string('Piutang_Toko', 15)->nullable()->index('piutang_toko');
                $table->string('Kontra_Piutang_Toko', 15)->nullable()->index('kontra_piutang_toko');
                $table->string('Retur_Beli_Toko', 15)->nullable()->index('retur_beli_toko');
                $table->string('Kontra_Retur_Beli_Toko', 15)->nullable()->index('kontra_retur_beli_toko');
                $table->string('Retur_Beli_Non_Medis', 15)->nullable()->index('retur_beli_non_medis');
                $table->string('Kontra_Retur_Beli_Non_Medis', 15)->nullable()->index('kontra_retur_beli_non_medis');
                $table->string('Retur_Jual_Toko', 15)->nullable()->index('retur_jual_toko');
                $table->string('Kontra_Retur_Jual_Toko', 15)->nullable()->index('kontra_retur_jual_toko');
                $table->string('Retur_Piutang_Toko', 15)->nullable()->index('retur_piutang_toko');
                $table->string('Kontra_Retur_Piutang_Toko', 15)->nullable()->index('kontra_retur_piutang_toko');
                $table->string('Kerugian_Klaim_BPJS_RVP', 15)->index('kerugian_klaim_bpjs');
                $table->string('Lebih_Bayar_Klaim_BPJS_RVP', 15)->index('lebih_bayar_klaim_bpjs');
                $table->string('Piutang_BPJS_RVP', 15)->index('piutang_bpjs_rvp');
                $table->string('Kontra_Penerimaan_AsetInventaris', 15)->index('kontra_penerimaan_asetinventaris');
                $table->string('Kontra_Hibah_Aset', 15)->index('kontra_hibah_aset');
                $table->string('Hibah_Non_Medis', 15)->index('hibah_non_medis');
                $table->string('Kontra_Hibah_Non_Medis', 15)->index('kontra_hibah_non_medis');
                $table->string('Beban_Hutang_Lain', 15)->index('bayar_jm_dokter');
                $table->string('PPN_Masukan', 15)->index('ppn_masukan_obat');
                $table->string('Pengadaan_Dapur', 15)->index('pengadaan_dapur');
                $table->string('Stok_Keluar_Dapur', 15)->index('stok_keluar_dapur');
                $table->string('Kontra_Stok_Keluar_Dapur', 15)->index('kontra_stok_keluar_dapur');
                $table->string('PPN_Keluaran', 15)->index('ppn_keluaran');
                $table->string('Diskon_Piutang', 15)->index('diskon_piutang');
                $table->string('Piutang_Tidak_Terbayar', 15)->index('piutang_tidak_terbayar');
                $table->string('Lebih_Bayar_Piutang', 15)->index('lebih_bayar_piutang');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('set_akun');
    }
};
