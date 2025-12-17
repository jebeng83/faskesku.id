import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\RawatJalan\ObatController::getObatByPoli
* @see app/Http/Controllers/RawatJalan/ObatController.php:17
* @route '/api/obat'
*/
export const getObatByPoli = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getObatByPoli.url(options),
    method: 'get',
})

getObatByPoli.definition = {
    methods: ["get","head"],
    url: '/api/obat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\ObatController::getObatByPoli
* @see app/Http/Controllers/RawatJalan/ObatController.php:17
* @route '/api/obat'
*/
getObatByPoli.url = (options?: RouteQueryOptions) => {
    return getObatByPoli.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ObatController::getObatByPoli
* @see app/Http/Controllers/RawatJalan/ObatController.php:17
* @route '/api/obat'
*/
getObatByPoli.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getObatByPoli.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\ObatController::getObatByPoli
* @see app/Http/Controllers/RawatJalan/ObatController.php:17
* @route '/api/obat'
*/
getObatByPoli.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getObatByPoli.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\ObatController::getDetailObat
* @see app/Http/Controllers/RawatJalan/ObatController.php:97
* @route '/api/obat/{kode_barang}'
*/
export const getDetailObat = (args: { kode_barang: string | number } | [kode_barang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDetailObat.url(args, options),
    method: 'get',
})

getDetailObat.definition = {
    methods: ["get","head"],
    url: '/api/obat/{kode_barang}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\ObatController::getDetailObat
* @see app/Http/Controllers/RawatJalan/ObatController.php:97
* @route '/api/obat/{kode_barang}'
*/
getDetailObat.url = (args: { kode_barang: string | number } | [kode_barang: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kode_barang: args }
    }

    if (Array.isArray(args)) {
        args = {
            kode_barang: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kode_barang: args.kode_barang,
    }

    return getDetailObat.definition.url
            .replace('{kode_barang}', parsedArgs.kode_barang.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ObatController::getDetailObat
* @see app/Http/Controllers/RawatJalan/ObatController.php:97
* @route '/api/obat/{kode_barang}'
*/
getDetailObat.get = (args: { kode_barang: string | number } | [kode_barang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDetailObat.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\ObatController::getDetailObat
* @see app/Http/Controllers/RawatJalan/ObatController.php:97
* @route '/api/obat/{kode_barang}'
*/
getDetailObat.head = (args: { kode_barang: string | number } | [kode_barang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDetailObat.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\ObatController::cekStokObat
* @see app/Http/Controllers/RawatJalan/ObatController.php:158
* @route '/api/obat/cek-stok'
*/
export const cekStokObat = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cekStokObat.url(options),
    method: 'post',
})

cekStokObat.definition = {
    methods: ["post"],
    url: '/api/obat/cek-stok',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\ObatController::cekStokObat
* @see app/Http/Controllers/RawatJalan/ObatController.php:158
* @route '/api/obat/cek-stok'
*/
cekStokObat.url = (options?: RouteQueryOptions) => {
    return cekStokObat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ObatController::cekStokObat
* @see app/Http/Controllers/RawatJalan/ObatController.php:158
* @route '/api/obat/cek-stok'
*/
cekStokObat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cekStokObat.url(options),
    method: 'post',
})

const ObatController = { getObatByPoli, getDetailObat, cekStokObat }

export default ObatController