import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import ralan8ecbc2 from './ralan'
/**
* @see \App\Http\Controllers\PembayaranController::index
* @see app/Http/Controllers/PembayaranController.php:18
* @route '/pembayaran'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/pembayaran',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PembayaranController::index
* @see app/Http/Controllers/PembayaranController.php:18
* @route '/pembayaran'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PembayaranController::index
* @see app/Http/Controllers/PembayaranController.php:18
* @route '/pembayaran'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PembayaranController::index
* @see app/Http/Controllers/PembayaranController.php:18
* @route '/pembayaran'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PembayaranController::ralan
* @see app/Http/Controllers/PembayaranController.php:23
* @route '/pembayaran/ralan'
*/
export const ralan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ralan.url(options),
    method: 'get',
})

ralan.definition = {
    methods: ["get","head"],
    url: '/pembayaran/ralan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PembayaranController::ralan
* @see app/Http/Controllers/PembayaranController.php:23
* @route '/pembayaran/ralan'
*/
ralan.url = (options?: RouteQueryOptions) => {
    return ralan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PembayaranController::ralan
* @see app/Http/Controllers/PembayaranController.php:23
* @route '/pembayaran/ralan'
*/
ralan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ralan.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PembayaranController::ralan
* @see app/Http/Controllers/PembayaranController.php:23
* @route '/pembayaran/ralan'
*/
ralan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ralan.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PembayaranController::ranap
* @see app/Http/Controllers/PembayaranController.php:331
* @route '/pembayaran/ranap'
*/
export const ranap = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ranap.url(options),
    method: 'get',
})

ranap.definition = {
    methods: ["get","head"],
    url: '/pembayaran/ranap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PembayaranController::ranap
* @see app/Http/Controllers/PembayaranController.php:331
* @route '/pembayaran/ranap'
*/
ranap.url = (options?: RouteQueryOptions) => {
    return ranap.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PembayaranController::ranap
* @see app/Http/Controllers/PembayaranController.php:331
* @route '/pembayaran/ranap'
*/
ranap.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ranap.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PembayaranController::ranap
* @see app/Http/Controllers/PembayaranController.php:331
* @route '/pembayaran/ranap'
*/
ranap.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ranap.url(options),
    method: 'head',
})

const pembayaran = {
    index: Object.assign(index, index),
    ralan: Object.assign(ralan, ralan8ecbc2),
    ranap: Object.assign(ranap, ranap),
}

export default pembayaran