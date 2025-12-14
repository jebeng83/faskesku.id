import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\API\PenjabController::index
* @see app/Http/Controllers/API/PenjabController.php:13
* @route '/api/penjab'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/penjab',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\PenjabController::index
* @see app/Http/Controllers/API/PenjabController.php:13
* @route '/api/penjab'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PenjabController::index
* @see app/Http/Controllers/API/PenjabController.php:13
* @route '/api/penjab'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\PenjabController::index
* @see app/Http/Controllers/API/PenjabController.php:13
* @route '/api/penjab'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const penjab = {
    index: Object.assign(index, index),
}

export default penjab