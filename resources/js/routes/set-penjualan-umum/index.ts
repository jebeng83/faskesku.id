import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::update
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:175
* @route '/farmasi/set-penjualan-umum'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/farmasi/set-penjualan-umum',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::update
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:175
* @route '/farmasi/set-penjualan-umum'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::update
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:175
* @route '/farmasi/set-penjualan-umum'
*/
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

const setPenjualanUmum = {
    update: Object.assign(update, update),
}

export default setPenjualanUmum