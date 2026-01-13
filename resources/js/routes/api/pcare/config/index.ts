import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\PcareController::kabupaten
* @see app/Http/Controllers/Pcare/PcareController.php:2093
* @route '/api/pcare/config/kabupaten'
*/
export const kabupaten = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kabupaten.url(options),
    method: 'get',
})

kabupaten.definition = {
    methods: ["get","head"],
    url: '/api/pcare/config/kabupaten',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::kabupaten
* @see app/Http/Controllers/Pcare/PcareController.php:2093
* @route '/api/pcare/config/kabupaten'
*/
kabupaten.url = (options?: RouteQueryOptions) => {
    return kabupaten.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::kabupaten
* @see app/Http/Controllers/Pcare/PcareController.php:2093
* @route '/api/pcare/config/kabupaten'
*/
kabupaten.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kabupaten.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::kabupaten
* @see app/Http/Controllers/Pcare/PcareController.php:2093
* @route '/api/pcare/config/kabupaten'
*/
kabupaten.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kabupaten.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\SettingBridgingBpjsController::kdProvider
* @see app/Http/Controllers/Pcare/SettingBridgingBpjsController.php:72
* @route '/api/pcare/config/kd-provider'
*/
export const kdProvider = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kdProvider.url(options),
    method: 'get',
})

kdProvider.definition = {
    methods: ["get","head"],
    url: '/api/pcare/config/kd-provider',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\SettingBridgingBpjsController::kdProvider
* @see app/Http/Controllers/Pcare/SettingBridgingBpjsController.php:72
* @route '/api/pcare/config/kd-provider'
*/
kdProvider.url = (options?: RouteQueryOptions) => {
    return kdProvider.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\SettingBridgingBpjsController::kdProvider
* @see app/Http/Controllers/Pcare/SettingBridgingBpjsController.php:72
* @route '/api/pcare/config/kd-provider'
*/
kdProvider.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kdProvider.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\SettingBridgingBpjsController::kdProvider
* @see app/Http/Controllers/Pcare/SettingBridgingBpjsController.php:72
* @route '/api/pcare/config/kd-provider'
*/
kdProvider.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kdProvider.url(options),
    method: 'head',
})

const config = {
    kabupaten: Object.assign(kabupaten, kabupaten),
    kdProvider: Object.assign(kdProvider, kdProvider),
}

export default config