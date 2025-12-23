import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\PcareController::api
 * @see app/Http/Controllers/Pcare/PcareController.php:1619
 * @route '/pcare/api/bpjs-log/rawat/{no_rawat}'
 */
export const api = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: api.url(args, options),
    method: 'get',
})

api.definition = {
    methods: ["get","head"],
    url: '/pcare/api/bpjs-log/rawat/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
 * @see app/Http/Controllers/Pcare/PcareController.php:1619
 * @route '/pcare/api/bpjs-log/rawat/{no_rawat}'
 */
api.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_rawat: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    no_rawat: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        no_rawat: args.no_rawat,
                }

    return api.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
 * @see app/Http/Controllers/Pcare/PcareController.php:1619
 * @route '/pcare/api/bpjs-log/rawat/{no_rawat}'
 */
api.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: api.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Pcare\PcareController::api
 * @see app/Http/Controllers/Pcare/PcareController.php:1619
 * @route '/pcare/api/bpjs-log/rawat/{no_rawat}'
 */
api.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: api.url(args, options),
    method: 'head',
})
const byrawat = {
    api: Object.assign(api, api),
}

export default byrawat