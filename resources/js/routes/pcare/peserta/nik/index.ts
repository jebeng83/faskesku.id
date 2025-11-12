import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:760
* @route '/pcare/api/peserta/nik'
*/
export const api = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: api.url(options),
    method: 'get',
})

api.definition = {
    methods: ["get","head"],
    url: '/pcare/api/peserta/nik',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:760
* @route '/pcare/api/peserta/nik'
*/
api.url = (options?: RouteQueryOptions) => {
    return api.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:760
* @route '/pcare/api/peserta/nik'
*/
api.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: api.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:760
* @route '/pcare/api/peserta/nik'
*/
api.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: api.url(options),
    method: 'head',
})

const nik = {
    api: Object.assign(api, api),
}

export default nik