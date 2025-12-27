import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SetNoRkmMedisController::index
* @see app/Http/Controllers/SetNoRkmMedisController.php:11
* @route '/pcare/setting/no-rm'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/pcare/setting/no-rm',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SetNoRkmMedisController::index
* @see app/Http/Controllers/SetNoRkmMedisController.php:11
* @route '/pcare/setting/no-rm'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SetNoRkmMedisController::index
* @see app/Http/Controllers/SetNoRkmMedisController.php:11
* @route '/pcare/setting/no-rm'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SetNoRkmMedisController::index
* @see app/Http/Controllers/SetNoRkmMedisController.php:11
* @route '/pcare/setting/no-rm'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SetNoRkmMedisController::store
* @see app/Http/Controllers/SetNoRkmMedisController.php:20
* @route '/pcare/setting/no-rm'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/pcare/setting/no-rm',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SetNoRkmMedisController::store
* @see app/Http/Controllers/SetNoRkmMedisController.php:20
* @route '/pcare/setting/no-rm'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SetNoRkmMedisController::store
* @see app/Http/Controllers/SetNoRkmMedisController.php:20
* @route '/pcare/setting/no-rm'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const SetNoRkmMedisController = { index, store }

export default SetNoRkmMedisController