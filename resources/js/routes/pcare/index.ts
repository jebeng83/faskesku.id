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
import prolanis from './prolanis'
import peserta from './peserta'
import kunjungan from './kunjungan'
import pendaftaran from './pendaftaran'
import bpjs from './bpjs'
import resend from './resend'
import massSend from './mass-send'
import setting from './setting'
/**
* @see routes/web.php:2873
* @see routes/web.php:2855
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
* @see routes/web.php:2873
* @see routes/web.php:2855
* @route '/pcare'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see routes/web.php:2873
* @see routes/web.php:2855
* @route '/pcare'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see routes/web.php:2873
* @see routes/web.php:2855
* @route '/pcare'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see routes/web.php:2892
* @see routes/web.php:2874
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
* @see routes/web.php:2892
* @see routes/web.php:2874
* @route '/pcare/monitoring'
*/
monitoring.url = (options?: RouteQueryOptions) => {
    return monitoring.definition.url + queryParams(options)
}

/**
* @see routes/web.php:2892
* @see routes/web.php:2874
* @route '/pcare/monitoring'
*/
monitoring.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: monitoring.url(options),
    method: 'get',
})

/**
* @see routes/web.php:2892
* @see routes/web.php:2874
* @route '/pcare/monitoring'
*/
monitoring.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: monitoring.url(options),
    method: 'head',
})

/**
* @see routes/web.php:2900
* @see routes/web.php:2882
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
* @see routes/web.php:2900
* @see routes/web.php:2882
* @route '/pcare/data-pendaftaran'
*/
dataPendaftaran.url = (options?: RouteQueryOptions) => {
    return dataPendaftaran.definition.url + queryParams(options)
}

/**
* @see routes/web.php:2900
* @see routes/web.php:2882
* @route '/pcare/data-pendaftaran'
*/
dataPendaftaran.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataPendaftaran.url(options),
    method: 'get',
})

/**
* @see routes/web.php:2900
* @see routes/web.php:2882
* @route '/pcare/data-pendaftaran'
*/
dataPendaftaran.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dataPendaftaran.url(options),
    method: 'head',
})

/**
* @see routes/web.php:2904
* @see routes/web.php:2886
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
* @see routes/web.php:2904
* @see routes/web.php:2886
* @route '/pcare/data-kunjungan'
*/
dataKunjungan.url = (options?: RouteQueryOptions) => {
    return dataKunjungan.definition.url + queryParams(options)
}

/**
* @see routes/web.php:2904
* @see routes/web.php:2886
* @route '/pcare/data-kunjungan'
*/
dataKunjungan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataKunjungan.url(options),
    method: 'get',
})

/**
* @see routes/web.php:2904
* @see routes/web.php:2886
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
* @see routes/web.php:3010
* @see routes/web.php:2992
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
* @see routes/web.php:3010
* @see routes/web.php:2992
* @route '/pcare/form-pendaftaran'
*/
formPendaftaran.url = (options?: RouteQueryOptions) => {
    return formPendaftaran.definition.url + queryParams(options)
}

/**
* @see routes/web.php:3010
* @see routes/web.php:2992
* @route '/pcare/form-pendaftaran'
*/
formPendaftaran.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: formPendaftaran.url(options),
    method: 'get',
})

/**
* @see routes/web.php:3010
* @see routes/web.php:2992
* @route '/pcare/form-pendaftaran'
*/
formPendaftaran.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: formPendaftaran.url(options),
    method: 'head',
})

/**
* @see routes/web.php:3028
* @see routes/web.php:3010
* @route '/pcare/prolanis-dm'
*/
export const prolanisDm = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: prolanisDm.url(options),
    method: 'get',
})

prolanisDm.definition = {
    methods: ["get","head"],
    url: '/pcare/prolanis-dm',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:3028
* @see routes/web.php:3010
* @route '/pcare/prolanis-dm'
*/
prolanisDm.url = (options?: RouteQueryOptions) => {
    return prolanisDm.definition.url + queryParams(options)
}

/**
* @see routes/web.php:3028
* @see routes/web.php:3010
* @route '/pcare/prolanis-dm'
*/
prolanisDm.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: prolanisDm.url(options),
    method: 'get',
})

/**
* @see routes/web.php:3028
* @see routes/web.php:3010
* @route '/pcare/prolanis-dm'
*/
prolanisDm.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: prolanisDm.url(options),
    method: 'head',
})

/**
* @see routes/web.php:3036
* @see routes/web.php:3018
* @route '/pcare/prolanis-ht'
*/
export const prolanisHt = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: prolanisHt.url(options),
    method: 'get',
})

prolanisHt.definition = {
    methods: ["get","head"],
    url: '/pcare/prolanis-ht',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:3036
* @see routes/web.php:3018
* @route '/pcare/prolanis-ht'
*/
prolanisHt.url = (options?: RouteQueryOptions) => {
    return prolanisHt.definition.url + queryParams(options)
}

/**
* @see routes/web.php:3036
* @see routes/web.php:3018
* @route '/pcare/prolanis-ht'
*/
prolanisHt.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: prolanisHt.url(options),
    method: 'get',
})

/**
* @see routes/web.php:3036
* @see routes/web.php:3018
* @route '/pcare/prolanis-ht'
*/
prolanisHt.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: prolanisHt.url(options),
    method: 'head',
})

/**
* @see routes/web.php:3052
* @see routes/web.php:3034
* @route '/pcare/srk-per-penyakit'
*/
export const srkPerPenyakit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: srkPerPenyakit.url(options),
    method: 'get',
})

srkPerPenyakit.definition = {
    methods: ["get","head"],
    url: '/pcare/srk-per-penyakit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:3052
* @see routes/web.php:3034
* @route '/pcare/srk-per-penyakit'
*/
srkPerPenyakit.url = (options?: RouteQueryOptions) => {
    return srkPerPenyakit.definition.url + queryParams(options)
}

/**
* @see routes/web.php:3052
* @see routes/web.php:3034
* @route '/pcare/srk-per-penyakit'
*/
srkPerPenyakit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: srkPerPenyakit.url(options),
    method: 'get',
})

/**
* @see routes/web.php:3052
* @see routes/web.php:3034
* @route '/pcare/srk-per-penyakit'
*/
srkPerPenyakit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: srkPerPenyakit.url(options),
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
    prolanisDm: Object.assign(prolanisDm, prolanisDm),
    prolanisHt: Object.assign(prolanisHt, prolanisHt),
    srkPerPenyakit: Object.assign(srkPerPenyakit, srkPerPenyakit),
    kelompok: Object.assign(kelompok, kelompok),
    diagnosa: Object.assign(diagnosa, diagnosa),
    dokter: Object.assign(dokter, dokter),
    poli: Object.assign(poli, poli),
    rs: Object.assign(rs, rs),
    tindakan: Object.assign(tindakan, tindakan),
    srk: Object.assign(srk, srk),
    prolanis: Object.assign(prolanis, prolanis),
    peserta: Object.assign(peserta, peserta),
    kunjungan: Object.assign(kunjungan, kunjungan),
    pendaftaran: Object.assign(pendaftaran, pendaftaran),
    bpjs: Object.assign(bpjs, bpjs),
    resend: Object.assign(resend, resend),
    massSend: Object.assign(massSend, massSend),
    setting: Object.assign(setting, setting),
}

export default pcare
