import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\PcareController::store
* @see app/Http/Controllers/Pcare/PcareController.php:148
* @route '/api/pcare/kunjungan'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/pcare/kunjungan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::store
* @see app/Http/Controllers/Pcare/PcareController.php:148
* @route '/api/pcare/kunjungan'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::store
* @see app/Http/Controllers/Pcare/PcareController.php:148
* @route '/api/pcare/kunjungan'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const kunjungan = {
    store: Object.assign(store, store),
}

export default kunjungan