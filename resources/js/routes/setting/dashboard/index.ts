import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\setting\SettingController::index
* @see app/Http/Controllers/setting/SettingController.php:416
* @route '/setting/dashboard'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/setting/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\setting\SettingController::index
* @see app/Http/Controllers/setting/SettingController.php:416
* @route '/setting/dashboard'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\setting\SettingController::index
* @see app/Http/Controllers/setting/SettingController.php:416
* @route '/setting/dashboard'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\setting\SettingController::index
* @see app/Http/Controllers/setting/SettingController.php:416
* @route '/setting/dashboard'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\setting\SettingController::store
* @see app/Http/Controllers/setting/SettingController.php:427
* @route '/setting/dashboard'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/setting/dashboard',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\setting\SettingController::store
* @see app/Http/Controllers/setting/SettingController.php:427
* @route '/setting/dashboard'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\setting\SettingController::store
* @see app/Http/Controllers/setting/SettingController.php:427
* @route '/setting/dashboard'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const dashboard = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
}

export default dashboard