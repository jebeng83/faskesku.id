import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::update
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:108
* @route '/farmasi/set-harga-obat'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/farmasi/set-harga-obat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::update
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:108
* @route '/farmasi/set-harga-obat'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::update
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:108
* @route '/farmasi/set-harga-obat'
*/
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

const setHargaObat = {
    update: Object.assign(update, update),
}

export default setHargaObat