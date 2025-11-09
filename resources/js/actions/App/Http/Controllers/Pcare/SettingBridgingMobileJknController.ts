import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\SettingBridgingMobileJknController::index
* @see app/Http/Controllers/Pcare/SettingBridgingMobileJknController.php:15
* @route '/pcare/setting-mobilejkn'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/pcare/setting-mobilejkn',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\SettingBridgingMobileJknController::index
* @see app/Http/Controllers/Pcare/SettingBridgingMobileJknController.php:15
* @route '/pcare/setting-mobilejkn'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\SettingBridgingMobileJknController::index
* @see app/Http/Controllers/Pcare/SettingBridgingMobileJknController.php:15
* @route '/pcare/setting-mobilejkn'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\SettingBridgingMobileJknController::index
* @see app/Http/Controllers/Pcare/SettingBridgingMobileJknController.php:15
* @route '/pcare/setting-mobilejkn'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\SettingBridgingMobileJknController::store
* @see app/Http/Controllers/Pcare/SettingBridgingMobileJknController.php:39
* @route '/pcare/setting-mobilejkn'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/pcare/setting-mobilejkn',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\SettingBridgingMobileJknController::store
* @see app/Http/Controllers/Pcare/SettingBridgingMobileJknController.php:39
* @route '/pcare/setting-mobilejkn'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\SettingBridgingMobileJknController::store
* @see app/Http/Controllers/Pcare/SettingBridgingMobileJknController.php:39
* @route '/pcare/setting-mobilejkn'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\SettingBridgingMobileJknController::destroy
* @see app/Http/Controllers/Pcare/SettingBridgingMobileJknController.php:74
* @route '/pcare/setting-mobilejkn'
*/
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/pcare/setting-mobilejkn',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Pcare\SettingBridgingMobileJknController::destroy
* @see app/Http/Controllers/Pcare/SettingBridgingMobileJknController.php:74
* @route '/pcare/setting-mobilejkn'
*/
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\SettingBridgingMobileJknController::destroy
* @see app/Http/Controllers/Pcare/SettingBridgingMobileJknController.php:74
* @route '/pcare/setting-mobilejkn'
*/
destroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

const SettingBridgingMobileJknController = { index, store, destroy }

export default SettingBridgingMobileJknController