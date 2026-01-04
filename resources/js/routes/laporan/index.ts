import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import ralan from './ralan'
import ranap from './ranap'
/**
* @see \App\Http\Controllers\KunjunganController::index
* @see app/Http/Controllers/KunjunganController.php:246
* @route '/laporan'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/laporan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KunjunganController::index
* @see app/Http/Controllers/KunjunganController.php:246
* @route '/laporan'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KunjunganController::index
* @see app/Http/Controllers/KunjunganController.php:246
* @route '/laporan'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KunjunganController::index
* @see app/Http/Controllers/KunjunganController.php:246
* @route '/laporan'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
<<<<<<< HEAD
* @see routes/web.php:356
=======
* @see \App\Http\Controllers\KunjunganController::stats
* @see app/Http/Controllers/KunjunganController.php:432
* @route '/laporan/stats'
*/
export const stats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})

stats.definition = {
    methods: ["get","head"],
    url: '/laporan/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KunjunganController::stats
* @see app/Http/Controllers/KunjunganController.php:432
* @route '/laporan/stats'
*/
stats.url = (options?: RouteQueryOptions) => {
    return stats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KunjunganController::stats
* @see app/Http/Controllers/KunjunganController.php:432
* @route '/laporan/stats'
*/
stats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KunjunganController::stats
* @see app/Http/Controllers/KunjunganController.php:432
* @route '/laporan/stats'
*/
stats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stats.url(options),
    method: 'head',
})

/**
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:360
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:365
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:370
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
* @route '/laporan/rl-kemenkes'
*/
export const rlKemenkes = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rlKemenkes.url(options),
    method: 'get',
})

rlKemenkes.definition = {
    methods: ["get","head"],
    url: '/laporan/rl-kemenkes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:370
* @route '/laporan/rl-kemenkes'
*/
rlKemenkes.url = (options?: RouteQueryOptions) => {
    return rlKemenkes.definition.url + queryParams(options)
}

/**
* @see routes/web.php:370
* @route '/laporan/rl-kemenkes'
*/
rlKemenkes.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rlKemenkes.url(options),
    method: 'get',
})

/**
* @see routes/web.php:370
* @route '/laporan/rl-kemenkes'
*/
rlKemenkes.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: rlKemenkes.url(options),
    method: 'head',
})

/**
* @see routes/web.php:374
* @route '/laporan/bor'
*/
export const bor = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bor.url(options),
    method: 'get',
})

bor.definition = {
    methods: ["get","head"],
    url: '/laporan/bor',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:374
* @route '/laporan/bor'
*/
bor.url = (options?: RouteQueryOptions) => {
    return bor.definition.url + queryParams(options)
}

/**
* @see routes/web.php:374
* @route '/laporan/bor'
*/
bor.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bor.url(options),
    method: 'get',
})

/**
* @see routes/web.php:374
* @route '/laporan/bor'
*/
bor.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: bor.url(options),
    method: 'head',
})

const laporan = {
    index: Object.assign(index, index),
    ralan: Object.assign(ralan, ralan),
    ranap: Object.assign(ranap, ranap),
    rlKemenkes: Object.assign(rlKemenkes, rlKemenkes),
    bor: Object.assign(bor, bor),
}

export default laporan