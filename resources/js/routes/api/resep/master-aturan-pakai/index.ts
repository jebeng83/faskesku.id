import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
import storeE72b01 from './store'
/**
* @see \App\Http\Controllers\RawatJalan\ResepController::store
* @see app/Http/Controllers/RawatJalan/ResepController.php:1169
* @route '/api/aturan-pakai'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/aturan-pakai',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::store
* @see app/Http/Controllers/RawatJalan/ResepController.php:1169
* @route '/api/aturan-pakai'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::store
* @see app/Http/Controllers/RawatJalan/ResepController.php:1169
* @route '/api/aturan-pakai'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const masterAturanPakai = {
    store: Object.assign(store, storeE72b01),
}

export default masterAturanPakai