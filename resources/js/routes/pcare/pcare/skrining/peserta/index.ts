import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
import list from './list'
/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:2921
* @route '/pcare/api/pcare/skrining/peserta/{nomorPeserta}/{start}/{limit}'
*/
export const api = (args: { nomorPeserta: string | number, start: string | number, limit: string | number } | [nomorPeserta: string | number, start: string | number, limit: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: api.url(args, options),
    method: 'get',
})

api.definition = {
    methods: ["get","head"],
    url: '/pcare/api/pcare/skrining/peserta/{nomorPeserta}/{start}/{limit}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:2921
* @route '/pcare/api/pcare/skrining/peserta/{nomorPeserta}/{start}/{limit}'
*/
api.url = (args: { nomorPeserta: string | number, start: string | number, limit: string | number } | [nomorPeserta: string | number, start: string | number, limit: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            nomorPeserta: args[0],
            start: args[1],
            limit: args[2],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        nomorPeserta: args.nomorPeserta,
        start: args.start,
        limit: args.limit,
    }

    return api.definition.url
            .replace('{nomorPeserta}', parsedArgs.nomorPeserta.toString())
            .replace('{start}', parsedArgs.start.toString())
            .replace('{limit}', parsedArgs.limit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:2921
* @route '/pcare/api/pcare/skrining/peserta/{nomorPeserta}/{start}/{limit}'
*/
api.get = (args: { nomorPeserta: string | number, start: string | number, limit: string | number } | [nomorPeserta: string | number, start: string | number, limit: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: api.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:2921
* @route '/pcare/api/pcare/skrining/peserta/{nomorPeserta}/{start}/{limit}'
*/
api.head = (args: { nomorPeserta: string | number, start: string | number, limit: string | number } | [nomorPeserta: string | number, start: string | number, limit: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: api.url(args, options),
    method: 'head',
})

const peserta = {
    list: Object.assign(list, list),
    api: Object.assign(api, api),
}

export default peserta