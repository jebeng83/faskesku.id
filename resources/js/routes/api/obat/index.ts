import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\RawatJalan\ObatController::index
* @see app/Http/Controllers/RawatJalan/ObatController.php:17
* @route '/api/obat'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/obat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\ObatController::index
* @see app/Http/Controllers/RawatJalan/ObatController.php:17
* @route '/api/obat'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ObatController::index
* @see app/Http/Controllers/RawatJalan/ObatController.php:17
* @route '/api/obat'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\ObatController::index
* @see app/Http/Controllers/RawatJalan/ObatController.php:17
* @route '/api/obat'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\ObatController::detail
* @see app/Http/Controllers/RawatJalan/ObatController.php:97
* @route '/api/obat/{kode_barang}'
*/
export const detail = (args: { kode_barang: string | number } | [kode_barang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: detail.url(args, options),
    method: 'get',
})

detail.definition = {
    methods: ["get","head"],
    url: '/api/obat/{kode_barang}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\ObatController::detail
* @see app/Http/Controllers/RawatJalan/ObatController.php:97
* @route '/api/obat/{kode_barang}'
*/
detail.url = (args: { kode_barang: string | number } | [kode_barang: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return detail.definition.url
            .replace('{kode_barang}', parsedArgs.kode_barang.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ObatController::detail
* @see app/Http/Controllers/RawatJalan/ObatController.php:97
* @route '/api/obat/{kode_barang}'
*/
detail.get = (args: { kode_barang: string | number } | [kode_barang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: detail.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\ObatController::detail
* @see app/Http/Controllers/RawatJalan/ObatController.php:97
* @route '/api/obat/{kode_barang}'
*/
detail.head = (args: { kode_barang: string | number } | [kode_barang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: detail.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\ObatController::cekStok
* @see app/Http/Controllers/RawatJalan/ObatController.php:158
* @route '/api/obat/cek-stok'
*/
export const cekStok = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cekStok.url(options),
    method: 'post',
})

cekStok.definition = {
    methods: ["post"],
    url: '/api/obat/cek-stok',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\ObatController::cekStok
* @see app/Http/Controllers/RawatJalan/ObatController.php:158
* @route '/api/obat/cek-stok'
*/
cekStok.url = (options?: RouteQueryOptions) => {
    return cekStok.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ObatController::cekStok
* @see app/Http/Controllers/RawatJalan/ObatController.php:158
* @route '/api/obat/cek-stok'
*/
cekStok.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cekStok.url(options),
    method: 'post',
})

const obat = {
    index: Object.assign(index, index),
    detail: Object.assign(detail, detail),
    cekStok: Object.assign(cekStok, cekStok),
}

export default obat