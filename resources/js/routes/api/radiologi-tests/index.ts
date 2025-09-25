import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\PermintaanRadiologiController::index
* @see app/Http/Controllers/PermintaanRadiologiController.php:270
* @route '/api/radiologi-tests'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/radiologi-tests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::index
* @see app/Http/Controllers/PermintaanRadiologiController.php:270
* @route '/api/radiologi-tests'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::index
* @see app/Http/Controllers/PermintaanRadiologiController.php:270
* @route '/api/radiologi-tests'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::index
* @see app/Http/Controllers/PermintaanRadiologiController.php:270
* @route '/api/radiologi-tests'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const radiologiTests = {
    index: Object.assign(index, index),
}

export default radiologiTests