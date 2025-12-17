import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\API\WilayahController::search
 * @see app/Http/Controllers/API/WilayahController.php:186
 * @route '/api/wilayah/search'
 */
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/api/wilayah/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\WilayahController::search
 * @see app/Http/Controllers/API/WilayahController.php:186
 * @route '/api/wilayah/search'
 */
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\WilayahController::search
 * @see app/Http/Controllers/API/WilayahController.php:186
 * @route '/api/wilayah/search'
 */
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\API\WilayahController::search
 * @see app/Http/Controllers/API/WilayahController.php:186
 * @route '/api/wilayah/search'
 */
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\WilayahController::allVillages
 * @see app/Http/Controllers/API/WilayahController.php:154
 * @route '/api/wilayah/all-villages'
 */
export const allVillages = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allVillages.url(options),
    method: 'get',
})

allVillages.definition = {
    methods: ["get","head"],
    url: '/api/wilayah/all-villages',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\WilayahController::allVillages
 * @see app/Http/Controllers/API/WilayahController.php:154
 * @route '/api/wilayah/all-villages'
 */
allVillages.url = (options?: RouteQueryOptions) => {
    return allVillages.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\WilayahController::allVillages
 * @see app/Http/Controllers/API/WilayahController.php:154
 * @route '/api/wilayah/all-villages'
 */
allVillages.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allVillages.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\API\WilayahController::allVillages
 * @see app/Http/Controllers/API/WilayahController.php:154
 * @route '/api/wilayah/all-villages'
 */
allVillages.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: allVillages.url(options),
    method: 'head',
})
const wilayah = {
    search: Object.assign(search, search),
allVillages: Object.assign(allVillages, allVillages),
}

export default wilayah