import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:2866
* @route '/pcare/api/kelompok/kegiatan'
*/
export const api = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: api.url(options),
    method: 'put',
})

api.definition = {
    methods: ["put"],
    url: '/pcare/api/kelompok/kegiatan',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:2866
* @route '/pcare/api/kelompok/kegiatan'
*/
api.url = (options?: RouteQueryOptions) => {
    return api.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:2866
* @route '/pcare/api/kelompok/kegiatan'
*/
api.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: api.url(options),
    method: 'put',
})

const update = {
    api: Object.assign(api, api),
}

export default update