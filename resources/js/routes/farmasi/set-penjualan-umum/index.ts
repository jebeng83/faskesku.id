import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::show
 * @see app/Http/Controllers/Farmasi/SetHargaObatController.php:412
 * @route '/farmasi/set-penjualan-umum'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/farmasi/set-penjualan-umum',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::show
 * @see app/Http/Controllers/Farmasi/SetHargaObatController.php:412
 * @route '/farmasi/set-penjualan-umum'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::show
 * @see app/Http/Controllers/Farmasi/SetHargaObatController.php:412
 * @route '/farmasi/set-penjualan-umum'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::show
 * @see app/Http/Controllers/Farmasi/SetHargaObatController.php:412
 * @route '/farmasi/set-penjualan-umum'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})
const setPenjualanUmum = {
    show: Object.assign(show, show),
}

export default setPenjualanUmum