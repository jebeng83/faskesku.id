import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PermintaanLabController::query
* @see app/Http/Controllers/PermintaanLabController.php:1208
* @route '/api/permintaan-lab/templates'
*/
export const query = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: query.url(options),
    method: 'get',
})

query.definition = {
    methods: ["get","head"],
    url: '/api/permintaan-lab/templates',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::query
* @see app/Http/Controllers/PermintaanLabController.php:1208
* @route '/api/permintaan-lab/templates'
*/
query.url = (options?: RouteQueryOptions) => {
    return query.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::query
* @see app/Http/Controllers/PermintaanLabController.php:1208
* @route '/api/permintaan-lab/templates'
*/
query.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: query.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::query
* @see app/Http/Controllers/PermintaanLabController.php:1208
* @route '/api/permintaan-lab/templates'
*/
query.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: query.url(options),
    method: 'head',
})

const templates = {
    query: Object.assign(query, query),
}

export default templates