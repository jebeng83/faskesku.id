import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\PasswordBridgingBpjsController::index
* @see app/Http/Controllers/Pcare/PasswordBridgingBpjsController.php:12
* @route '/pcare/setting-passwordbpjs'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/pcare/setting-passwordbpjs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PasswordBridgingBpjsController::index
* @see app/Http/Controllers/Pcare/PasswordBridgingBpjsController.php:12
* @route '/pcare/setting-passwordbpjs'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PasswordBridgingBpjsController::index
* @see app/Http/Controllers/Pcare/PasswordBridgingBpjsController.php:12
* @route '/pcare/setting-passwordbpjs'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PasswordBridgingBpjsController::index
* @see app/Http/Controllers/Pcare/PasswordBridgingBpjsController.php:12
* @route '/pcare/setting-passwordbpjs'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PasswordBridgingBpjsController::store
* @see app/Http/Controllers/Pcare/PasswordBridgingBpjsController.php:28
* @route '/pcare/setting-passwordbpjs'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/pcare/setting-passwordbpjs',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\PasswordBridgingBpjsController::store
* @see app/Http/Controllers/Pcare/PasswordBridgingBpjsController.php:28
* @route '/pcare/setting-passwordbpjs'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PasswordBridgingBpjsController::store
* @see app/Http/Controllers/Pcare/PasswordBridgingBpjsController.php:28
* @route '/pcare/setting-passwordbpjs'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\PasswordBridgingBpjsController::destroy
* @see app/Http/Controllers/Pcare/PasswordBridgingBpjsController.php:59
* @route '/pcare/setting-passwordbpjs'
*/
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/pcare/setting-passwordbpjs',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Pcare\PasswordBridgingBpjsController::destroy
* @see app/Http/Controllers/Pcare/PasswordBridgingBpjsController.php:59
* @route '/pcare/setting-passwordbpjs'
*/
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PasswordBridgingBpjsController::destroy
* @see app/Http/Controllers/Pcare/PasswordBridgingBpjsController.php:59
* @route '/pcare/setting-passwordbpjs'
*/
destroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

const passwordbpjs = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    destroy: Object.assign(destroy, destroy),
}

export default passwordbpjs