import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
import dm65116f from './dm'
import ht10dee4 from './ht'
/**
* @see \App\Http\Controllers\Pcare\PcareController::dm
* @see app/Http/Controllers/Pcare/PcareController.php:3008
* @route '/api/pcare/prolanis/dm/{nomorPeserta}/{start}/{limit}'
*/
export const dm = (args: { nomorPeserta: string | number, start: string | number, limit: string | number } | [nomorPeserta: string | number, start: string | number, limit: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dm.url(args, options),
    method: 'get',
})

dm.definition = {
    methods: ["get","head"],
    url: '/api/pcare/prolanis/dm/{nomorPeserta}/{start}/{limit}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::dm
* @see app/Http/Controllers/Pcare/PcareController.php:3008
* @route '/api/pcare/prolanis/dm/{nomorPeserta}/{start}/{limit}'
*/
dm.url = (args: { nomorPeserta: string | number, start: string | number, limit: string | number } | [nomorPeserta: string | number, start: string | number, limit: string | number ], options?: RouteQueryOptions) => {
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

    return dm.definition.url
            .replace('{nomorPeserta}', parsedArgs.nomorPeserta.toString())
            .replace('{start}', parsedArgs.start.toString())
            .replace('{limit}', parsedArgs.limit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::dm
* @see app/Http/Controllers/Pcare/PcareController.php:3008
* @route '/api/pcare/prolanis/dm/{nomorPeserta}/{start}/{limit}'
*/
dm.get = (args: { nomorPeserta: string | number, start: string | number, limit: string | number } | [nomorPeserta: string | number, start: string | number, limit: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dm.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::dm
* @see app/Http/Controllers/Pcare/PcareController.php:3008
* @route '/api/pcare/prolanis/dm/{nomorPeserta}/{start}/{limit}'
*/
dm.head = (args: { nomorPeserta: string | number, start: string | number, limit: string | number } | [nomorPeserta: string | number, start: string | number, limit: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dm.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::ht
* @see app/Http/Controllers/Pcare/PcareController.php:3104
* @route '/api/pcare/prolanis/ht/{nomorPeserta}/{start}/{limit}'
*/
export const ht = (args: { nomorPeserta: string | number, start: string | number, limit: string | number } | [nomorPeserta: string | number, start: string | number, limit: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ht.url(args, options),
    method: 'get',
})

ht.definition = {
    methods: ["get","head"],
    url: '/api/pcare/prolanis/ht/{nomorPeserta}/{start}/{limit}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::ht
* @see app/Http/Controllers/Pcare/PcareController.php:3104
* @route '/api/pcare/prolanis/ht/{nomorPeserta}/{start}/{limit}'
*/
ht.url = (args: { nomorPeserta: string | number, start: string | number, limit: string | number } | [nomorPeserta: string | number, start: string | number, limit: string | number ], options?: RouteQueryOptions) => {
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

    return ht.definition.url
            .replace('{nomorPeserta}', parsedArgs.nomorPeserta.toString())
            .replace('{start}', parsedArgs.start.toString())
            .replace('{limit}', parsedArgs.limit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::ht
* @see app/Http/Controllers/Pcare/PcareController.php:3104
* @route '/api/pcare/prolanis/ht/{nomorPeserta}/{start}/{limit}'
*/
ht.get = (args: { nomorPeserta: string | number, start: string | number, limit: string | number } | [nomorPeserta: string | number, start: string | number, limit: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ht.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::ht
* @see app/Http/Controllers/Pcare/PcareController.php:3104
* @route '/api/pcare/prolanis/ht/{nomorPeserta}/{start}/{limit}'
*/
ht.head = (args: { nomorPeserta: string | number, start: string | number, limit: string | number } | [nomorPeserta: string | number, start: string | number, limit: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ht.url(args, options),
    method: 'head',
})

const prolanis = {
    dm: Object.assign(dm, dm65116f),
    ht: Object.assign(ht, ht10dee4),
}

export default prolanis