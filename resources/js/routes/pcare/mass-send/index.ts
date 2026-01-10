import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:2070
* @route '/pcare/api/mass-send'
*/
export const api = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: api.url(options),
    method: 'post',
})

api.definition = {
    methods: ["post"],
    url: '/pcare/api/mass-send',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:2070
* @route '/pcare/api/mass-send'
*/
api.url = (options?: RouteQueryOptions) => {
    return api.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:2070
* @route '/pcare/api/mass-send'
*/
api.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: api.url(options),
    method: 'post',
})

const massSend = {
    api: Object.assign(api, api),
}

export default massSend