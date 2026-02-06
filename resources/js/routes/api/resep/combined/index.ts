import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RawatJalan\ResepController::store
* @see app/Http/Controllers/RawatJalan/ResepController.php:303
* @route '/api/resep/combined'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/resep/combined',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::store
* @see app/Http/Controllers/RawatJalan/ResepController.php:303
* @route '/api/resep/combined'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::store
* @see app/Http/Controllers/RawatJalan/ResepController.php:303
* @route '/api/resep/combined'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const combined = {
    store: Object.assign(store, store),
}

export default combined