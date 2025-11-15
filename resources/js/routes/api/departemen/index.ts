import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\DepartemenController::index
* @see app/Http/Controllers/DepartemenController.php:17
* @route '/api/departemen'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/departemen',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DepartemenController::index
* @see app/Http/Controllers/DepartemenController.php:17
* @route '/api/departemen'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DepartemenController::index
* @see app/Http/Controllers/DepartemenController.php:17
* @route '/api/departemen'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DepartemenController::index
* @see app/Http/Controllers/DepartemenController.php:17
* @route '/api/departemen'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const departemen = {
    index: Object.assign(index, index),
}

export default departemen