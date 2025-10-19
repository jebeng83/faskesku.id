import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SettingsController::active
* @see app/Http/Controllers/SettingsController.php:15
* @route '/api/settings/active'
*/
const active9b7c3136a4eeca153683b0bca155a632 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: active9b7c3136a4eeca153683b0bca155a632.url(options),
    method: 'get',
})

active9b7c3136a4eeca153683b0bca155a632.definition = {
    methods: ["get","head"],
    url: '/api/settings/active',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingsController::active
* @see app/Http/Controllers/SettingsController.php:15
* @route '/api/settings/active'
*/
active9b7c3136a4eeca153683b0bca155a632.url = (options?: RouteQueryOptions) => {
    return active9b7c3136a4eeca153683b0bca155a632.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingsController::active
* @see app/Http/Controllers/SettingsController.php:15
* @route '/api/settings/active'
*/
active9b7c3136a4eeca153683b0bca155a632.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: active9b7c3136a4eeca153683b0bca155a632.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SettingsController::active
* @see app/Http/Controllers/SettingsController.php:15
* @route '/api/settings/active'
*/
active9b7c3136a4eeca153683b0bca155a632.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: active9b7c3136a4eeca153683b0bca155a632.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SettingsController::active
* @see app/Http/Controllers/SettingsController.php:15
* @route '/settings/active'
*/
const active1e19e8cb2c4f7065db00112c242baeb1 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: active1e19e8cb2c4f7065db00112c242baeb1.url(options),
    method: 'get',
})

active1e19e8cb2c4f7065db00112c242baeb1.definition = {
    methods: ["get","head"],
    url: '/settings/active',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingsController::active
* @see app/Http/Controllers/SettingsController.php:15
* @route '/settings/active'
*/
active1e19e8cb2c4f7065db00112c242baeb1.url = (options?: RouteQueryOptions) => {
    return active1e19e8cb2c4f7065db00112c242baeb1.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingsController::active
* @see app/Http/Controllers/SettingsController.php:15
* @route '/settings/active'
*/
active1e19e8cb2c4f7065db00112c242baeb1.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: active1e19e8cb2c4f7065db00112c242baeb1.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SettingsController::active
* @see app/Http/Controllers/SettingsController.php:15
* @route '/settings/active'
*/
active1e19e8cb2c4f7065db00112c242baeb1.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: active1e19e8cb2c4f7065db00112c242baeb1.url(options),
    method: 'head',
})

export const active = {
    '/api/settings/active': active9b7c3136a4eeca153683b0bca155a632,
    '/settings/active': active1e19e8cb2c4f7065db00112c242baeb1,
}

/**
* @see \App\Http\Controllers\SettingsController::index
* @see app/Http/Controllers/SettingsController.php:39
* @route '/settings'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingsController::index
* @see app/Http/Controllers/SettingsController.php:39
* @route '/settings'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingsController::index
* @see app/Http/Controllers/SettingsController.php:39
* @route '/settings'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SettingsController::index
* @see app/Http/Controllers/SettingsController.php:39
* @route '/settings'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SettingsController::update
* @see app/Http/Controllers/SettingsController.php:63
* @route '/settings'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/settings',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SettingsController::update
* @see app/Http/Controllers/SettingsController.php:63
* @route '/settings'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingsController::update
* @see app/Http/Controllers/SettingsController.php:63
* @route '/settings'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

const SettingsController = { active, index, update }

export default SettingsController