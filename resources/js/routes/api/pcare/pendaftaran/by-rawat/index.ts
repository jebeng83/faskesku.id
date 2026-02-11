import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\PcareController::query
* @see app/Http/Controllers/Pcare/PcareController.php:2285
* @route '/api/pcare/pendaftaran/rawat'
*/
export const query = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: query.url(options),
    method: 'get',
})

query.definition = {
    methods: ["get","head"],
    url: '/api/pcare/pendaftaran/rawat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::query
* @see app/Http/Controllers/Pcare/PcareController.php:2285
* @route '/api/pcare/pendaftaran/rawat'
*/
query.url = (options?: RouteQueryOptions) => {
    return query.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::query
* @see app/Http/Controllers/Pcare/PcareController.php:2285
* @route '/api/pcare/pendaftaran/rawat'
*/
query.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: query.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::query
* @see app/Http/Controllers/Pcare/PcareController.php:2285
* @route '/api/pcare/pendaftaran/rawat'
*/
query.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: query.url(options),
    method: 'head',
})

