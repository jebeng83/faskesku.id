import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PembayaranController::index
* @see app/Http/Controllers/PembayaranController.php:19
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
* @see app/Http/Controllers/PembayaranController.php:19
* @route '/pembayaran'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PembayaranController::index
* @see app/Http/Controllers/PembayaranController.php:19
* @route '/pembayaran'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PembayaranController::index
* @see app/Http/Controllers/PembayaranController.php:19
* @route '/pembayaran'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PembayaranController::ralan
* @see app/Http/Controllers/PembayaranController.php:24
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
* @see app/Http/Controllers/PembayaranController.php:24
* @route '/pembayaran/ralan'
*/
ralan.url = (options?: RouteQueryOptions) => {
    return ralan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PembayaranController::ralan
* @see app/Http/Controllers/PembayaranController.php:24
* @route '/pembayaran/ralan'
*/
ralan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ralan.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PembayaranController::ralan
* @see app/Http/Controllers/PembayaranController.php:24
* @route '/pembayaran/ralan'
*/
ralan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ralan.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PembayaranController::ralanDetail
* @see app/Http/Controllers/PembayaranController.php:196
* @route '/pembayaran/ralan/{no_rawat}'
*/
export const ralanDetail = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ralanDetail.url(args, options),
    method: 'get',
})

ralanDetail.definition = {
    methods: ["get","head"],
    url: '/pembayaran/ralan/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PembayaranController::ralanDetail
* @see app/Http/Controllers/PembayaranController.php:196
* @route '/pembayaran/ralan/{no_rawat}'
*/
ralanDetail.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return ralanDetail.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PembayaranController::ralanDetail
* @see app/Http/Controllers/PembayaranController.php:196
* @route '/pembayaran/ralan/{no_rawat}'
*/
ralanDetail.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ralanDetail.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PembayaranController::ralanDetail
* @see app/Http/Controllers/PembayaranController.php:196
* @route '/pembayaran/ralan/{no_rawat}'
*/
ralanDetail.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ralanDetail.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PembayaranController::ranap
* @see app/Http/Controllers/PembayaranController.php:348
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
* @see app/Http/Controllers/PembayaranController.php:348
* @route '/pembayaran/ranap'
*/
ranap.url = (options?: RouteQueryOptions) => {
    return ranap.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PembayaranController::ranap
* @see app/Http/Controllers/PembayaranController.php:348
* @route '/pembayaran/ranap'
*/
ranap.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ranap.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PembayaranController::ranap
* @see app/Http/Controllers/PembayaranController.php:348
* @route '/pembayaran/ranap'
*/
ranap.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ranap.url(options),
    method: 'head',
})

const PembayaranController = { index, ralan, ralanDetail, ranap }

export default PembayaranController