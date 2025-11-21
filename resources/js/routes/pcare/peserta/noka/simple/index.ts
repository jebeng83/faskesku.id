import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:304
* @route '/pcare/api/peserta/{noka}'
*/
export const api = (args: { noka: string | number } | [noka: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: api.url(args, options),
    method: 'get',
})

api.definition = {
    methods: ["get","head"],
    url: '/pcare/api/peserta/{noka}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:304
* @route '/pcare/api/peserta/{noka}'
*/
api.url = (args: { noka: string | number } | [noka: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { noka: args }
    }

    if (Array.isArray(args)) {
        args = {
            noka: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        noka: args.noka,
    }

    return api.definition.url
            .replace('{noka}', parsedArgs.noka.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:304
* @route '/pcare/api/peserta/{noka}'
*/
api.get = (args: { noka: string | number } | [noka: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: api.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:304
* @route '/pcare/api/peserta/{noka}'
*/
api.head = (args: { noka: string | number } | [noka: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: api.url(args, options),
    method: 'head',
})

const simple = {
    api: Object.assign(api, api),
}

export default simple