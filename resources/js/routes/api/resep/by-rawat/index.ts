import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RawatJalan\ResepController::q
* @see app/Http/Controllers/RawatJalan/ResepController.php:604
* @route '/api/resep/rawat'
*/
export const q = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: q.url(options),
    method: 'get',
})

q.definition = {
    methods: ["get","head"],
    url: '/api/resep/rawat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::q
* @see app/Http/Controllers/RawatJalan/ResepController.php:604
* @route '/api/resep/rawat'
*/
q.url = (options?: RouteQueryOptions) => {
    return q.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::q
* @see app/Http/Controllers/RawatJalan/ResepController.php:604
* @route '/api/resep/rawat'
*/
q.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: q.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::q
* @see app/Http/Controllers/RawatJalan/ResepController.php:604
* @route '/api/resep/rawat'
*/
q.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: q.url(options),
    method: 'head',
})

const byRawat = {
    q: Object.assign(q, q),
}

export default byRawat