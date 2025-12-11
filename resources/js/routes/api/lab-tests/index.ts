import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\PermintaanLabController::index
* @see app/Http/Controllers/PermintaanLabController.php:1172
* @route '/api/permissions/lab-tests'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/permissions/lab-tests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::index
* @see app/Http/Controllers/PermintaanLabController.php:1172
* @route '/api/permissions/lab-tests'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::index
* @see app/Http/Controllers/PermintaanLabController.php:1172
* @route '/api/permissions/lab-tests'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::index
* @see app/Http/Controllers/PermintaanLabController.php:1172
* @route '/api/permissions/lab-tests'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

