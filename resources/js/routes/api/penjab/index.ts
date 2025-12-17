import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\API\PenjabController::nextCode
* @see app/Http/Controllers/API/PenjabController.php:36
* @route '/api/penjab/next-code'
*/
export const nextCode = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: nextCode.url(options),
    method: 'get',
})

nextCode.definition = {
    methods: ["get","head"],
    url: '/api/penjab/next-code',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\PenjabController::nextCode
* @see app/Http/Controllers/API/PenjabController.php:36
* @route '/api/penjab/next-code'
*/
nextCode.url = (options?: RouteQueryOptions) => {
    return nextCode.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PenjabController::nextCode
* @see app/Http/Controllers/API/PenjabController.php:36
* @route '/api/penjab/next-code'
*/
nextCode.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: nextCode.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\PenjabController::nextCode
* @see app/Http/Controllers/API/PenjabController.php:36
* @route '/api/penjab/next-code'
*/
nextCode.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: nextCode.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\PenjabController::store
* @see app/Http/Controllers/API/PenjabController.php:70
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
* @see app/Http/Controllers/API/PenjabController.php:70
* @route '/api/penjab'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PenjabController::store
* @see app/Http/Controllers/API/PenjabController.php:70
* @route '/api/penjab'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const penjab = {
    nextCode: Object.assign(nextCode, nextCode),
    store: Object.assign(store, store),
}

export default penjab