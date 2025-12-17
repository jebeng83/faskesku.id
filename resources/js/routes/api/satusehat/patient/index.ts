import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::search
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1756
 * @route '/api/satusehat/patient'
 */
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/patient',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::search
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1756
 * @route '/api/satusehat/patient'
 */
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::search
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1756
 * @route '/api/satusehat/patient'
 */
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::search
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1756
 * @route '/api/satusehat/patient'
 */
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})
const patient = {
    search: Object.assign(search, search),
}

export default patient