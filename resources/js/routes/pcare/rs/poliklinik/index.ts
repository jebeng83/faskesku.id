import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\PcareController::api
 * @see app/Http/Controllers/Pcare/PcareController.php:3037
 * @route '/pcare/api/rs/poliklinik'
 */
export const api = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: api.url(options),
    method: 'get',
})

api.definition = {
    methods: ["get","head"],
    url: '/pcare/api/rs/poliklinik',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
 * @see app/Http/Controllers/Pcare/PcareController.php:3037
 * @route '/pcare/api/rs/poliklinik'
 */
api.url = (options?: RouteQueryOptions) => {
    return api.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
 * @see app/Http/Controllers/Pcare/PcareController.php:3037
 * @route '/pcare/api/rs/poliklinik'
 */
api.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: api.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Pcare\PcareController::api
 * @see app/Http/Controllers/Pcare/PcareController.php:3037
 * @route '/pcare/api/rs/poliklinik'
 */
api.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: api.url(options),
    method: 'head',
})
const poliklinik = {
    api: Object.assign(api, api),
}

export default poliklinik