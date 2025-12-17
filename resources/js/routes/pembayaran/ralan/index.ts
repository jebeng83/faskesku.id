import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\PembayaranController::detail
* @see app/Http/Controllers/PembayaranController.php:179
* @route '/pembayaran/ralan/{no_rawat}'
*/
export const detail = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: detail.url(args, options),
    method: 'get',
})

detail.definition = {
    methods: ["get","head"],
    url: '/pembayaran/ralan/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PembayaranController::detail
* @see app/Http/Controllers/PembayaranController.php:179
* @route '/pembayaran/ralan/{no_rawat}'
*/
detail.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return detail.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PembayaranController::detail
* @see app/Http/Controllers/PembayaranController.php:179
* @route '/pembayaran/ralan/{no_rawat}'
*/
detail.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: detail.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PembayaranController::detail
* @see app/Http/Controllers/PembayaranController.php:179
* @route '/pembayaran/ralan/{no_rawat}'
*/
detail.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: detail.url(args, options),
    method: 'head',
})

const ralan = {
    detail: Object.assign(detail, detail),
}

export default ralan