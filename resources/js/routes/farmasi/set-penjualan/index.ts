import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::show
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:451
* @route '/farmasi/set-penjualan/{kdjns}'
*/
export const show = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/farmasi/set-penjualan/{kdjns}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::show
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:451
* @route '/farmasi/set-penjualan/{kdjns}'
*/
show.url = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kdjns: args }
    }

    if (Array.isArray(args)) {
        args = {
            kdjns: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kdjns: args.kdjns,
    }

    return show.definition.url
            .replace('{kdjns}', parsedArgs.kdjns.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::show
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:451
* @route '/farmasi/set-penjualan/{kdjns}'
*/
show.get = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::show
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:451
* @route '/farmasi/set-penjualan/{kdjns}'
*/
show.head = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

const setPenjualan = {
    show: Object.assign(show, show),
}

export default setPenjualan