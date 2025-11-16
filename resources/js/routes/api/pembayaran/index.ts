import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\PembayaranController::akunBayar
* @see app/Http/Controllers/PembayaranController.php:23
* @route '/api/pembayaran/akun-bayar'
*/
export const akunBayar = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: akunBayar.url(options),
    method: 'get',
})

akunBayar.definition = {
    methods: ["get","head"],
    url: '/api/pembayaran/akun-bayar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PembayaranController::akunBayar
* @see app/Http/Controllers/PembayaranController.php:23
* @route '/api/pembayaran/akun-bayar'
*/
akunBayar.url = (options?: RouteQueryOptions) => {
    return akunBayar.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PembayaranController::akunBayar
* @see app/Http/Controllers/PembayaranController.php:23
* @route '/api/pembayaran/akun-bayar'
*/
akunBayar.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: akunBayar.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PembayaranController::akunBayar
* @see app/Http/Controllers/PembayaranController.php:23
* @route '/api/pembayaran/akun-bayar'
*/
akunBayar.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: akunBayar.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PembayaranController::akunPiutang
* @see app/Http/Controllers/PembayaranController.php:51
* @route '/api/pembayaran/akun-piutang'
*/
export const akunPiutang = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: akunPiutang.url(options),
    method: 'get',
})

akunPiutang.definition = {
    methods: ["get","head"],
    url: '/api/pembayaran/akun-piutang',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PembayaranController::akunPiutang
* @see app/Http/Controllers/PembayaranController.php:51
* @route '/api/pembayaran/akun-piutang'
*/
akunPiutang.url = (options?: RouteQueryOptions) => {
    return akunPiutang.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PembayaranController::akunPiutang
* @see app/Http/Controllers/PembayaranController.php:51
* @route '/api/pembayaran/akun-piutang'
*/
akunPiutang.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: akunPiutang.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PembayaranController::akunPiutang
* @see app/Http/Controllers/PembayaranController.php:51
* @route '/api/pembayaran/akun-piutang'
*/
akunPiutang.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: akunPiutang.url(options),
    method: 'head',
})

const pembayaran = {
    akunBayar: Object.assign(akunBayar, akunBayar),
    akunPiutang: Object.assign(akunPiutang, akunPiutang),
}

export default pembayaran