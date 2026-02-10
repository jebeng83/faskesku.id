import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:0
* @route '/pcare/api/pcare/skrining/peserta-list/{start}/{limit}'
*/
export const api = (args: { start: string | number, limit: string | number } | [start: string | number, limit: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: api.url(args, options),
    method: 'get',
})

api.definition = {
    methods: ["get","head"],
    url: '/pcare/api/pcare/skrining/peserta-list/{start}/{limit}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:0
* @route '/pcare/api/pcare/skrining/peserta-list/{start}/{limit}'
*/
api.url = (args: { start: string | number, limit: string | number } | [start: string | number, limit: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            start: args[0],
            limit: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        start: args.start,
        limit: args.limit,
    }

    return api.definition.url
            .replace('{start}', parsedArgs.start.toString())
            .replace('{limit}', parsedArgs.limit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:0
* @route '/pcare/api/pcare/skrining/peserta-list/{start}/{limit}'
*/
api.get = (args: { start: string | number, limit: string | number } | [start: string | number, limit: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: api.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:0
* @route '/pcare/api/pcare/skrining/peserta-list/{start}/{limit}'
*/
api.head = (args: { start: string | number, limit: string | number } | [start: string | number, limit: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: api.url(args, options),
    method: 'head',
})

const list = {
    api: Object.assign(api, api),
}

export default list