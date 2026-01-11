import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import notaJalan from './nota-jalan'
import pengeluaranHarian from './pengeluaran-harian'
import kategoriPengeluaranHarian8f62d6 from './kategori-pengeluaran-harian'
import jurnal from './jurnal'
import tagihan from './tagihan'
import bayarPiutang from './bayar-piutang'
import closingKasir from './closing-kasir'
import rekening from './rekening'
import rekeningtahun from './rekeningtahun'
import cashflow from './cashflow'
import bukuBesar from './buku-besar'
import billing from './billing'
import akunBayar from './akun-bayar'
import akunPiutang from './akun-piutang'
import pemasukanLain from './pemasukan-lain'
import kategoriPemasukanLain from './kategori-pemasukan-lain'
import setoranBank from './setoran-bank'
import detailNotaJalan from './detail-nota-jalan'
import piutangPasien from './piutang-pasien'
import detailPiutangPasien from './detail-piutang-pasien'
import pengaturanRekening from './pengaturan-rekening'
/**
* @see \App\Http\Controllers\Akutansi\KategoriPengeluaranHarianController::kategoriPengeluaranHarian
* @see app/Http/Controllers/Akutansi/KategoriPengeluaranHarianController.php:13
* @route '/api/akutansi/kategori-pengeluaran-harian'
*/
export const kategoriPengeluaranHarian = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kategoriPengeluaranHarian.url(options),
    method: 'get',
})

kategoriPengeluaranHarian.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/kategori-pengeluaran-harian',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\KategoriPengeluaranHarianController::kategoriPengeluaranHarian
* @see app/Http/Controllers/Akutansi/KategoriPengeluaranHarianController.php:13
* @route '/api/akutansi/kategori-pengeluaran-harian'
*/
kategoriPengeluaranHarian.url = (options?: RouteQueryOptions) => {
    return kategoriPengeluaranHarian.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\KategoriPengeluaranHarianController::kategoriPengeluaranHarian
* @see app/Http/Controllers/Akutansi/KategoriPengeluaranHarianController.php:13
* @route '/api/akutansi/kategori-pengeluaran-harian'
*/
kategoriPengeluaranHarian.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kategoriPengeluaranHarian.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\KategoriPengeluaranHarianController::kategoriPengeluaranHarian
* @see app/Http/Controllers/Akutansi/KategoriPengeluaranHarianController.php:13
* @route '/api/akutansi/kategori-pengeluaran-harian'
*/
kategoriPengeluaranHarian.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kategoriPengeluaranHarian.url(options),
    method: 'head',
})

const akutansi = {
    notaJalan: Object.assign(notaJalan, notaJalan),
    pengeluaranHarian: Object.assign(pengeluaranHarian, pengeluaranHarian),
    kategoriPengeluaranHarian: Object.assign(kategoriPengeluaranHarian, kategoriPengeluaranHarian8f62d6),
    jurnal: Object.assign(jurnal, jurnal),
    tagihan: Object.assign(tagihan, tagihan),
    bayarPiutang: Object.assign(bayarPiutang, bayarPiutang),
    closingKasir: Object.assign(closingKasir, closingKasir),
    rekening: Object.assign(rekening, rekening),
    rekeningtahun: Object.assign(rekeningtahun, rekeningtahun),
    cashflow: Object.assign(cashflow, cashflow),
    bukuBesar: Object.assign(bukuBesar, bukuBesar),
    billing: Object.assign(billing, billing),
    akunBayar: Object.assign(akunBayar, akunBayar),
    akunPiutang: Object.assign(akunPiutang, akunPiutang),
    pemasukanLain: Object.assign(pemasukanLain, pemasukanLain),
    kategoriPemasukanLain: Object.assign(kategoriPemasukanLain, kategoriPemasukanLain),
    setoranBank: Object.assign(setoranBank, setoranBank),
    detailNotaJalan: Object.assign(detailNotaJalan, detailNotaJalan),
    piutangPasien: Object.assign(piutangPasien, piutangPasien),
    detailPiutangPasien: Object.assign(detailPiutangPasien, detailPiutangPasien),
    pengaturanRekening: Object.assign(pengaturanRekening, pengaturanRekening),
}

export default akutansi