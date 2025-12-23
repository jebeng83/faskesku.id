import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\PcareController::api
 * @see app/Http/Controllers/Pcare/PcareController.php:502
 * @route '/pcare/api/kunjungan-sehat'
 */
export const api = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: api.url(options),
    method: 'post',
})

api.definition = {
    methods: ["post"],
    url: '/pcare/api/kunjungan-sehat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
 * @see app/Http/Controllers/Pcare/PcareController.php:502
 * @route '/pcare/api/kunjungan-sehat'
 */
api.url = (options?: RouteQueryOptions) => {
    return api.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
 * @see app/Http/Controllers/Pcare/PcareController.php:502
 * @route '/pcare/api/kunjungan-sehat'
 */
api.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: api.url(options),
    method: 'post',
})
const sehat = {
    api: Object.assign(api, api),
}

export default sehat