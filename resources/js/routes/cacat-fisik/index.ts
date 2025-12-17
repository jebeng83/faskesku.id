import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Pasien\CacatFisikController::store
 * @see app/Http/Controllers/Pasien/CacatFisikController.php:13
 * @route '/cacat-fisik'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/cacat-fisik',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pasien\CacatFisikController::store
 * @see app/Http/Controllers/Pasien/CacatFisikController.php:13
 * @route '/cacat-fisik'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pasien\CacatFisikController::store
 * @see app/Http/Controllers/Pasien/CacatFisikController.php:13
 * @route '/cacat-fisik'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})
const cacatFisik = {
    store: Object.assign(store, store),
}

export default cacatFisik