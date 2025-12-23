import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
import rekening from './rekening'
import home from './home'
import rekeningTahun from './rekening-tahun'
import akunBayar from './akun-bayar'
import akunPiutang from './akun-piutang'
import pengaturanRekening from './pengaturan-rekening'
import jurnal from './jurnal'
import jurnalPenyesuaian from './jurnal-penyesuaian'
import jurnalPenutup from './jurnal-penutup'
import setoranBank from './setoran-bank'
import bukuBesar from './buku-besar'
import neraca from './neraca'
import detailJurnal from './detail-jurnal'
import mutasiRekening from './mutasi-rekening'
import mutasiKas from './mutasi-kas'
import cashflow from './cashflow'
import billing from './billing'
import billingRanap from './billing-ranap'
import notaJalan from './nota-jalan'
import kasirRalan from './kasir-ralan'
/**
* @see \App\Http\Controllers\Akutansi\AkutansiController::invoice
 * @see app/Http/Controllers/Akutansi/AkutansiController.php:17
 * @route '/akutansi/invoice/{no_rawat}'
 */
export const invoice = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: invoice.url(args, options),
    method: 'get',
})

invoice.definition = {
    methods: ["get","head"],
    url: '/akutansi/invoice/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\AkutansiController::invoice
 * @see app/Http/Controllers/Akutansi/AkutansiController.php:17
 * @route '/akutansi/invoice/{no_rawat}'
 */
invoice.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_rawat: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    no_rawat: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        no_rawat: args.no_rawat,
                }

    return invoice.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\AkutansiController::invoice
 * @see app/Http/Controllers/Akutansi/AkutansiController.php:17
 * @route '/akutansi/invoice/{no_rawat}'
 */
invoice.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: invoice.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Akutansi\AkutansiController::invoice
 * @see app/Http/Controllers/Akutansi/AkutansiController.php:17
 * @route '/akutansi/invoice/{no_rawat}'
 */
invoice.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: invoice.url(args, options),
    method: 'head',
})
const akutansi = {
    invoice: Object.assign(invoice, invoice),
rekening: Object.assign(rekening, rekening),
home: Object.assign(home, home),
rekeningTahun: Object.assign(rekeningTahun, rekeningTahun),
akunBayar: Object.assign(akunBayar, akunBayar),
akunPiutang: Object.assign(akunPiutang, akunPiutang),
pengaturanRekening: Object.assign(pengaturanRekening, pengaturanRekening),
jurnal: Object.assign(jurnal, jurnal),
jurnalPenyesuaian: Object.assign(jurnalPenyesuaian, jurnalPenyesuaian),
jurnalPenutup: Object.assign(jurnalPenutup, jurnalPenutup),
setoranBank: Object.assign(setoranBank, setoranBank),
bukuBesar: Object.assign(bukuBesar, bukuBesar),
neraca: Object.assign(neraca, neraca),
detailJurnal: Object.assign(detailJurnal, detailJurnal),
mutasiRekening: Object.assign(mutasiRekening, mutasiRekening),
mutasiKas: Object.assign(mutasiKas, mutasiKas),
cashflow: Object.assign(cashflow, cashflow),
billing: Object.assign(billing, billing),
billingRanap: Object.assign(billingRanap, billingRanap),
notaJalan: Object.assign(notaJalan, notaJalan),
kasirRalan: Object.assign(kasirRalan, kasirRalan),
}

export default akutansi