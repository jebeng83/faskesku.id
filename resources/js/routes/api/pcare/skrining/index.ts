import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
import peserta13f34f from './peserta'
/**
* @see \App\Http\Controllers\Pcare\PcareController::peserta
* @see app/Http/Controllers/Pcare/PcareController.php:2909
* @route '/api/pcare/skrining/peserta/{nomorPeserta}/{start}/{limit}'
*/
export const peserta = (args: { nomorPeserta: string | number, start: string | number, limit: string | number } | [nomorPeserta: string | number, start: string | number, limit: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: peserta.url(args, options),
    method: 'get',
})

peserta.definition = {
    methods: ["get","head"],
    url: '/api/pcare/skrining/peserta/{nomorPeserta}/{start}/{limit}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::peserta
* @see app/Http/Controllers/Pcare/PcareController.php:2909
* @route '/api/pcare/skrining/peserta/{nomorPeserta}/{start}/{limit}'
*/
peserta.url = (args: { nomorPeserta: string | number, start: string | number, limit: string | number } | [nomorPeserta: string | number, start: string | number, limit: string | number ], options?: RouteQueryOptions) => {
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

    return peserta.definition.url
            .replace('{nomorPeserta}', parsedArgs.nomorPeserta.toString())
            .replace('{start}', parsedArgs.start.toString())
            .replace('{limit}', parsedArgs.limit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::peserta
* @see app/Http/Controllers/Pcare/PcareController.php:2909
* @route '/api/pcare/skrining/peserta/{nomorPeserta}/{start}/{limit}'
*/
peserta.get = (args: { nomorPeserta: string | number, start: string | number, limit: string | number } | [nomorPeserta: string | number, start: string | number, limit: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: peserta.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::peserta
* @see app/Http/Controllers/Pcare/PcareController.php:2909
* @route '/api/pcare/skrining/peserta/{nomorPeserta}/{start}/{limit}'
*/
peserta.head = (args: { nomorPeserta: string | number, start: string | number, limit: string | number } | [nomorPeserta: string | number, start: string | number, limit: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: peserta.url(args, options),
    method: 'head',
})

const skrining = {
    peserta: Object.assign(peserta, peserta13f34f),
}

export default skrining