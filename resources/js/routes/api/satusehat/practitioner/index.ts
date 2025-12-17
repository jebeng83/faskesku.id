import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::search
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1700
 * @route '/api/satusehat/practitioner'
 */
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/practitioner',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::search
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1700
 * @route '/api/satusehat/practitioner'
 */
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::search
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1700
 * @route '/api/satusehat/practitioner'
 */
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::search
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1700
 * @route '/api/satusehat/practitioner'
 */
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})
const practitioner = {
    search: Object.assign(search, search),
}

export default practitioner