import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\PoliklinikController::index
* @see app/Http/Controllers/PoliklinikController.php:37
* @route '/api/poliklinik'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/poliklinik',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PoliklinikController::index
* @see app/Http/Controllers/PoliklinikController.php:37
* @route '/api/poliklinik'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PoliklinikController::index
* @see app/Http/Controllers/PoliklinikController.php:37
* @route '/api/poliklinik'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PoliklinikController::index
* @see app/Http/Controllers/PoliklinikController.php:37
* @route '/api/poliklinik'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const poliklinik = {
    index: Object.assign(index, index),
}

export default poliklinik