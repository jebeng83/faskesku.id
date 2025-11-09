import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import mobilejkn from './mobilejkn'
/**
* @see \App\Http\Controllers\Pcare\SettingBridgingBpjsController::index
* @see app/Http/Controllers/Pcare/SettingBridgingBpjsController.php:15
* @route '/pcare/setting'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/pcare/setting',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\SettingBridgingBpjsController::index
* @see app/Http/Controllers/Pcare/SettingBridgingBpjsController.php:15
* @route '/pcare/setting'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\SettingBridgingBpjsController::index
* @see app/Http/Controllers/Pcare/SettingBridgingBpjsController.php:15
* @route '/pcare/setting'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\SettingBridgingBpjsController::index
* @see app/Http/Controllers/Pcare/SettingBridgingBpjsController.php:15
* @route '/pcare/setting'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\SettingBridgingBpjsController::store
* @see app/Http/Controllers/Pcare/SettingBridgingBpjsController.php:34
* @route '/pcare/setting'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/pcare/setting',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\SettingBridgingBpjsController::store
* @see app/Http/Controllers/Pcare/SettingBridgingBpjsController.php:34
* @route '/pcare/setting'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\SettingBridgingBpjsController::store
* @see app/Http/Controllers/Pcare/SettingBridgingBpjsController.php:34
* @route '/pcare/setting'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\SettingBridgingBpjsController::destroy
* @see app/Http/Controllers/Pcare/SettingBridgingBpjsController.php:64
* @route '/pcare/setting'
*/
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/pcare/setting',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Pcare\SettingBridgingBpjsController::destroy
* @see app/Http/Controllers/Pcare/SettingBridgingBpjsController.php:64
* @route '/pcare/setting'
*/
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\SettingBridgingBpjsController::destroy
* @see app/Http/Controllers/Pcare/SettingBridgingBpjsController.php:64
* @route '/pcare/setting'
*/
destroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

const setting = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    destroy: Object.assign(destroy, destroy),
    mobilejkn: Object.assign(mobilejkn, mobilejkn),
}

export default setting