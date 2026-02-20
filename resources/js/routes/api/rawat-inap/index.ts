import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
import diagnosa from './diagnosa'
import tindakanDokter from './tindakan-dokter'
import tindakanPerawat from './tindakan-perawat'
import tindakanDokterPerawat from './tindakan-dokter-perawat'
/**
* @see \App\Http\Controllers\RawatInapController::jenisTindakan
* @see app/Http/Controllers/RawatInapController.php:742
* @route '/api/rawat-inap/jenis-tindakan'
*/
export const jenisTindakan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: jenisTindakan.url(options),
    method: 'get',
})

jenisTindakan.definition = {
    methods: ["get","head"],
    url: '/api/rawat-inap/jenis-tindakan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatInapController::jenisTindakan
* @see app/Http/Controllers/RawatInapController.php:742
* @route '/api/rawat-inap/jenis-tindakan'
*/
jenisTindakan.url = (options?: RouteQueryOptions) => {
    return jenisTindakan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::jenisTindakan
* @see app/Http/Controllers/RawatInapController.php:742
* @route '/api/rawat-inap/jenis-tindakan'
*/
jenisTindakan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: jenisTindakan.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatInapController::jenisTindakan
* @see app/Http/Controllers/RawatInapController.php:742
* @route '/api/rawat-inap/jenis-tindakan'
*/
jenisTindakan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: jenisTindakan.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatInapController::cekBilling
* @see app/Http/Controllers/RawatInapController.php:794
* @route '/api/rawat-inap/cek-billing/{noRawat}'
*/
export const cekBilling = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cekBilling.url(args, options),
    method: 'get',
})

cekBilling.definition = {
    methods: ["get","head"],
    url: '/api/rawat-inap/cek-billing/{noRawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatInapController::cekBilling
* @see app/Http/Controllers/RawatInapController.php:794
* @route '/api/rawat-inap/cek-billing/{noRawat}'
*/
cekBilling.url = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { noRawat: args }
    }

    if (Array.isArray(args)) {
        args = {
            noRawat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        noRawat: args.noRawat,
    }

    return cekBilling.definition.url
            .replace('{noRawat}', parsedArgs.noRawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::cekBilling
* @see app/Http/Controllers/RawatInapController.php:794
* @route '/api/rawat-inap/cek-billing/{noRawat}'
*/
cekBilling.get = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cekBilling.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatInapController::cekBilling
* @see app/Http/Controllers/RawatInapController.php:794
* @route '/api/rawat-inap/cek-billing/{noRawat}'
*/
cekBilling.head = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cekBilling.url(args, options),
    method: 'head',
})

const rawatInap = {
    jenisTindakan: Object.assign(jenisTindakan, jenisTindakan),
    diagnosa: Object.assign(diagnosa, diagnosa),
    cekBilling: Object.assign(cekBilling, cekBilling),
    tindakanDokter: Object.assign(tindakanDokter, tindakanDokter),
    tindakanPerawat: Object.assign(tindakanPerawat, tindakanPerawat),
    tindakanDokterPerawat: Object.assign(tindakanDokterPerawat, tindakanDokterPerawat),
}

export default rawatInap