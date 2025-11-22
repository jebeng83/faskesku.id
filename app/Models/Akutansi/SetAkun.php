<?php

namespace App\Models\Akutansi;

use Illuminate\Database\Eloquent\Model;

/**
 * Model wrapper for table `set_akun` (COA umum/pusat).
 *
 * Catatan: Tabel ini didesain 1 baris (tanpa primary key). Jangan gunakan save() langsung.
 * Untuk update gunakan DB::table('set_akun')->update([...]) dari Controller.
 */
class SetAkun extends Model
{
    protected $table = 'set_akun';
    public $timestamps = false;
    public $incrementing = false;
    protected $primaryKey = 'id'; // placeholder; TIDAK dipakai untuk operasi update

    protected $fillable = [
        'Pengadaan_Obat',
        'Pemesanan_Obat',
        'Kontra_Pemesanan_Obat',
        'Bayar_Pemesanan_Obat',
        'Penjualan_Obat',
        'Piutang_Obat',
        'Kontra_Piutang_Obat',
        'Retur_Ke_Suplayer',
        'Kontra_Retur_Ke_Suplayer',
        'Retur_Dari_pembeli',
        'Kontra_Retur_Dari_Pembeli',
        'Retur_Piutang_Obat',
        'Kontra_Retur_Piutang_Obat',
        'Pengadaan_Ipsrs',
        'Stok_Keluar_Ipsrs',
        'Kontra_Stok_Keluar_Ipsrs',
        'Bayar_Piutang_Pasien',
        'Pengambilan_Utd',
        'Kontra_Pengambilan_Utd',
        'Pengambilan_Penunjang_Utd',
        'Kontra_Pengambilan_Penunjang_Utd',
        'Penyerahan_Darah',
        'Stok_Keluar_Medis',
        'Kontra_Stok_Keluar_Medis',
        'HPP_Obat_Jual_Bebas',
        'Persediaan_Obat_Jual_Bebas',
        'Penerimaan_NonMedis',
        'Kontra_Penerimaan_NonMedis',
        'Bayar_Pemesanan_Non_Medis',
        'Hibah_Obat',
        'Kontra_Hibah_Obat',
        'Penerimaan_Toko',
        'Kontra_Penerimaan_Toko',
        'Pengadaan_Toko',
        'Bayar_Pemesanan_Toko',
        'Penjualan_Toko',
        'HPP_Barang_Toko',
        'Persediaan_Barang_Toko',
        'Piutang_Toko',
        'Kontra_Piutang_Toko',
        'Retur_Beli_Toko',
        'Kontra_Retur_Beli_Toko',
        'Retur_Beli_Non_Medis',
        'Kontra_Retur_Beli_Non_Medis',
        'Retur_Jual_Toko',
        'Kontra_Retur_Jual_Toko',
        'Retur_Piutang_Toko',
        'Kontra_Retur_Piutang_Toko',
        'Kerugian_Klaim_BPJS_RVP',
        'Lebih_Bayar_Klaim_BPJS_RVP',
        'Piutang_BPJS_RVP',
        'Kontra_Penerimaan_AsetInventaris',
        'Kontra_Hibah_Aset',
        'Hibah_Non_Medis',
        'Kontra_Hibah_Non_Medis',
        'Beban_Hutang_Lain',
        'PPN_Masukan',
        'Pengadaan_Dapur',
        'Stok_Keluar_Dapur',
        'Kontra_Stok_Keluar_Dapur',
        'PPN_Keluaran',
        'Diskon_Piutang',
        'Piutang_Tidak_Terbayar',
        'Lebih_Bayar_Piutang',
    ];
}