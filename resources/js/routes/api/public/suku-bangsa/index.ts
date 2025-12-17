import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\API\ReferenceController::index
 * @see app/Http/Controllers/API/ReferenceController.php:30
 * @route '/api/suku-bangsa'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/suku-bangsa',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\ReferenceController::index
 * @see app/Http/Controllers/API/ReferenceController.php:30
 * @route '/api/suku-bangsa'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\ReferenceController::index
 * @see app/Http/Controllers/API/ReferenceController.php:30
 * @route '/api/suku-bangsa'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\API\ReferenceController::index
 * @see app/Http/Controllers/API/ReferenceController.php:30
 * @route '/api/suku-bangsa'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})
const sukuBangsa = {
    index: Object.assign(index, index),
}

export default sukuBangsa