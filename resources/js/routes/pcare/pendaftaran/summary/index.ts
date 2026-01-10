import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:1541
* @route '/pcare/api/pendaftaran/summary'
*/
export const api = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: api.url(options),
    method: 'get',
})

api.definition = {
    methods: ["get","head"],
    url: '/pcare/api/pendaftaran/summary',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:1541
* @route '/pcare/api/pendaftaran/summary'
*/
api.url = (options?: RouteQueryOptions) => {
    return api.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:1541
* @route '/pcare/api/pendaftaran/summary'
*/
api.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: api.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:1541
* @route '/pcare/api/pendaftaran/summary'
*/
api.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: api.url(options),
    method: 'head',
})

const summary = {
    api: Object.assign(api, api),
}

export default summary