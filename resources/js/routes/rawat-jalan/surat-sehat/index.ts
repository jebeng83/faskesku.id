import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::store
 * @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1141
 * @route '/rawat-jalan/surat-sehat'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/rawat-jalan/surat-sehat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::store
 * @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1141
 * @route '/rawat-jalan/surat-sehat'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::store
 * @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1141
 * @route '/rawat-jalan/surat-sehat'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})
const suratSehat = {
    store: Object.assign(store, store),
}

export default suratSehat