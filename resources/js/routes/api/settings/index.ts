import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\SettingsController::active
* @see app/Http/Controllers/SettingsController.php:15
* @route '/api/permissions/settings/active'
*/
export const active = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: active.url(options),
    method: 'get',
})

active.definition = {
    methods: ["get","head"],
    url: '/api/permissions/settings/active',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingsController::active
* @see app/Http/Controllers/SettingsController.php:15
* @route '/api/permissions/settings/active'
*/
active.url = (options?: RouteQueryOptions) => {
    return active.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingsController::active
* @see app/Http/Controllers/SettingsController.php:15
* @route '/api/permissions/settings/active'
*/
active.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: active.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SettingsController::active
* @see app/Http/Controllers/SettingsController.php:15
* @route '/api/permissions/settings/active'
*/
active.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: active.url(options),
    method: 'head',
})

const settings = {
    active: Object.assign(active, active),
}

export default settings