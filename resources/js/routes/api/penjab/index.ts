import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\API\PenjabController::index
 * @see app/Http/Controllers/API/PenjabController.php:13
 * @route '/api/penjab'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/penjab',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\PenjabController::index
 * @see app/Http/Controllers/API/PenjabController.php:13
 * @route '/api/penjab'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PenjabController::index
 * @see app/Http/Controllers/API/PenjabController.php:13
 * @route '/api/penjab'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\API\PenjabController::index
 * @see app/Http/Controllers/API/PenjabController.php:13
 * @route '/api/penjab'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\PenjabController::store
 * @see app/Http/Controllers/API/PenjabController.php:24
 * @route '/api/penjab'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/penjab',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\API\PenjabController::store
 * @see app/Http/Controllers/API/PenjabController.php:24
 * @route '/api/penjab'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PenjabController::store
 * @see app/Http/Controllers/API/PenjabController.php:24
 * @route '/api/penjab'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})
const penjab = {
    index,
store,
}

export default penjab