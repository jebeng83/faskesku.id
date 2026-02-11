import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::query
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:1953
* @route '/api/pcare/kunjungan/preview'
*/
export const query = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: query.url(options),
    method: 'get',
})

query.definition = {
    methods: ["get","head"],
    url: '/api/pcare/kunjungan/preview',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::query
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:1953
* @route '/api/pcare/kunjungan/preview'
*/
query.url = (options?: RouteQueryOptions) => {
    return query.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::query
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:1953
* @route '/api/pcare/kunjungan/preview'
*/
query.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: query.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::query
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:1953
* @route '/api/pcare/kunjungan/preview'
*/
query.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: query.url(options),
    method: 'head',
})

