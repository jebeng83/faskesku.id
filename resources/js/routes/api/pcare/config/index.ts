import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\PcareController::kabupaten
* @see app/Http/Controllers/Pcare/PcareController.php:2091
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
* @see app/Http/Controllers/Pcare/PcareController.php:2091
* @route '/api/pcare/config/kabupaten'
*/
kabupaten.url = (options?: RouteQueryOptions) => {
    return kabupaten.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::kabupaten
* @see app/Http/Controllers/Pcare/PcareController.php:2091
* @route '/api/pcare/config/kabupaten'
*/
kabupaten.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kabupaten.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::kabupaten
* @see app/Http/Controllers/Pcare/PcareController.php:2091
* @route '/api/pcare/config/kabupaten'
*/
kabupaten.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kabupaten.url(options),
    method: 'head',
})

const config = {
    kabupaten: Object.assign(kabupaten, kabupaten),
}

export default config