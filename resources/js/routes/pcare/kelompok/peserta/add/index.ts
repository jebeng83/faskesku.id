import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:784
* @route '/pcare/api/kelompok/peserta'
*/
export const api = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: api.url(options),
    method: 'post',
})

api.definition = {
    methods: ["post"],
    url: '/pcare/api/kelompok/peserta',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:784
* @route '/pcare/api/kelompok/peserta'
*/
api.url = (options?: RouteQueryOptions) => {
    return api.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:784
* @route '/pcare/api/kelompok/peserta'
*/
api.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: api.url(options),
    method: 'post',
})

const add = {
    api: Object.assign(api, api),
}

export default add