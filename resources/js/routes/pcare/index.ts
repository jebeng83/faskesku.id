import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
import mapping from './mapping'
import monitoringBb077c from './monitoring'
import referensi from './referensi'
import layanan from './layanan'
import kelompok from './kelompok'
import diagnosa from './diagnosa'
import dokter from './dokter'
import poli from './poli'
import rs from './rs'
import tindakan from './tindakan'
import srk from './srk'
import peserta from './peserta'
import kunjungan from './kunjungan'
import pendaftaran from './pendaftaran'
import bpjs from './bpjs'
import resend from './resend'
import massSend from './mass-send'
import setting from './setting'
/**
* @see routes/web.php:2823
* @route '/pcare'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/pcare',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:2823
* @route '/pcare'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see routes/web.php:2823
* @route '/pcare'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see routes/web.php:2823
* @route '/pcare'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see routes/web.php:2842
* @route '/pcare/monitoring'
*/
export const monitoring = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: monitoring.url(options),
    method: 'get',
})

monitoring.definition = {
    methods: ["get","head"],
    url: '/pcare/monitoring',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:2842
* @route '/pcare/monitoring'
*/
monitoring.url = (options?: RouteQueryOptions) => {
    return monitoring.definition.url + queryParams(options)
}

/**
* @see routes/web.php:2842
* @route '/pcare/monitoring'
*/
monitoring.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: monitoring.url(options),
    method: 'get',
})

/**
* @see routes/web.php:2842
* @route '/pcare/monitoring'
*/
monitoring.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: monitoring.url(options),
    method: 'head',
})

/**
* @see routes/web.php:2850
* @route '/pcare/data-pendaftaran'
*/
export const dataPendaftaran = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataPendaftaran.url(options),
    method: 'get',
})

dataPendaftaran.definition = {
    methods: ["get","head"],
    url: '/pcare/data-pendaftaran',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:2850
* @route '/pcare/data-pendaftaran'
*/
dataPendaftaran.url = (options?: RouteQueryOptions) => {
    return dataPendaftaran.definition.url + queryParams(options)
}

/**
* @see routes/web.php:2850
* @route '/pcare/data-pendaftaran'
*/
dataPendaftaran.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataPendaftaran.url(options),
    method: 'get',
})

/**
* @see routes/web.php:2850
* @route '/pcare/data-pendaftaran'
*/
dataPendaftaran.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dataPendaftaran.url(options),
    method: 'head',
})

/**
* @see routes/web.php:2854
* @route '/pcare/data-kunjungan'
*/
export const dataKunjungan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataKunjungan.url(options),
    method: 'get',
})

dataKunjungan.definition = {
    methods: ["get","head"],
    url: '/pcare/data-kunjungan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:2854
* @route '/pcare/data-kunjungan'
*/
dataKunjungan.url = (options?: RouteQueryOptions) => {
    return dataKunjungan.definition.url + queryParams(options)
}

/**
* @see routes/web.php:2854
* @route '/pcare/data-kunjungan'
*/
dataKunjungan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataKunjungan.url(options),
    method: 'get',
})

/**
* @see routes/web.php:2854
* @route '/pcare/data-kunjungan'
*/
dataKunjungan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dataKunjungan.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::cetakRujukan
* @see app/Http/Controllers/Pcare/PcareController.php:49
* @route '/pcare/cetak-rujukan/{no_rawat}'
*/
export const cetakRujukan = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cetakRujukan.url(args, options),
    method: 'get',
})

cetakRujukan.definition = {
    methods: ["get","head"],
    url: '/pcare/cetak-rujukan/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::cetakRujukan
* @see app/Http/Controllers/Pcare/PcareController.php:49
* @route '/pcare/cetak-rujukan/{no_rawat}'
*/
cetakRujukan.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return cetakRujukan.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::cetakRujukan
* @see app/Http/Controllers/Pcare/PcareController.php:49
* @route '/pcare/cetak-rujukan/{no_rawat}'
*/
cetakRujukan.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cetakRujukan.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::cetakRujukan
* @see app/Http/Controllers/Pcare/PcareController.php:49
* @route '/pcare/cetak-rujukan/{no_rawat}'
*/
cetakRujukan.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cetakRujukan.url(args, options),
    method: 'head',
})

/**
* @see routes/web.php:2955
* @route '/pcare/form-pendaftaran'
*/
export const formPendaftaran = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: formPendaftaran.url(options),
    method: 'get',
})

formPendaftaran.definition = {
    methods: ["get","head"],
    url: '/pcare/form-pendaftaran',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:2955
* @route '/pcare/form-pendaftaran'
*/
formPendaftaran.url = (options?: RouteQueryOptions) => {
    return formPendaftaran.definition.url + queryParams(options)
}

/**
* @see routes/web.php:2955
* @route '/pcare/form-pendaftaran'
*/
formPendaftaran.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: formPendaftaran.url(options),
    method: 'get',
})

/**
* @see routes/web.php:2955
* @route '/pcare/form-pendaftaran'
*/
formPendaftaran.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: formPendaftaran.url(options),
    method: 'head',
})

const pcare = {
    index: Object.assign(index, index),
    mapping: Object.assign(mapping, mapping),
    monitoring: Object.assign(monitoring, monitoringBb077c),
    dataPendaftaran: Object.assign(dataPendaftaran, dataPendaftaran),
    dataKunjungan: Object.assign(dataKunjungan, dataKunjungan),
    cetakRujukan: Object.assign(cetakRujukan, cetakRujukan),
    referensi: Object.assign(referensi, referensi),
    layanan: Object.assign(layanan, layanan),
    formPendaftaran: Object.assign(formPendaftaran, formPendaftaran),
    kelompok: Object.assign(kelompok, kelompok),
    diagnosa: Object.assign(diagnosa, diagnosa),
    dokter: Object.assign(dokter, dokter),
    poli: Object.assign(poli, poli),
    rs: Object.assign(rs, rs),
    tindakan: Object.assign(tindakan, tindakan),
    srk: Object.assign(srk, srk),
    peserta: Object.assign(peserta, peserta),
    kunjungan: Object.assign(kunjungan, kunjungan),
    pendaftaran: Object.assign(pendaftaran, pendaftaran),
    bpjs: Object.assign(bpjs, bpjs),
    resend: Object.assign(resend, resend),
    massSend: Object.assign(massSend, massSend),
    setting: Object.assign(setting, setting),
}

export default pcare