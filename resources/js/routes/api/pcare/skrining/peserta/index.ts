import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\PcareController::test
* @see app/Http/Controllers/Pcare/PcareController.php:2921
* @route '/api/pcare/skrining/peserta/test/{nomorPeserta}/{start}/{limit}'
*/
export const test = (args: { nomorPeserta: string | number, start: string | number, limit: string | number } | [nomorPeserta: string | number, start: string | number, limit: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: test.url(args, options),
    method: 'get',
})

test.definition = {
    methods: ["get","head"],
    url: '/api/pcare/skrining/peserta/test/{nomorPeserta}/{start}/{limit}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::test
* @see app/Http/Controllers/Pcare/PcareController.php:2921
* @route '/api/pcare/skrining/peserta/test/{nomorPeserta}/{start}/{limit}'
*/
test.url = (args: { nomorPeserta: string | number, start: string | number, limit: string | number } | [nomorPeserta: string | number, start: string | number, limit: string | number ], options?: RouteQueryOptions) => {
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

    return test.definition.url
            .replace('{nomorPeserta}', parsedArgs.nomorPeserta.toString())
            .replace('{start}', parsedArgs.start.toString())
            .replace('{limit}', parsedArgs.limit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::test
* @see app/Http/Controllers/Pcare/PcareController.php:2921
* @route '/api/pcare/skrining/peserta/test/{nomorPeserta}/{start}/{limit}'
*/
test.get = (args: { nomorPeserta: string | number, start: string | number, limit: string | number } | [nomorPeserta: string | number, start: string | number, limit: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: test.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::test
* @see app/Http/Controllers/Pcare/PcareController.php:2921
* @route '/api/pcare/skrining/peserta/test/{nomorPeserta}/{start}/{limit}'
*/
test.head = (args: { nomorPeserta: string | number, start: string | number, limit: string | number } | [nomorPeserta: string | number, start: string | number, limit: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: test.url(args, options),
    method: 'head',
})

/**
* @see [serialized-closure]:2
* @route '/api/pcare/skrining/peserta/{nomorPeserta}'
*/
export const defaultMethod = (args: { nomorPeserta: string | number } | [nomorPeserta: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: defaultMethod.url(args, options),
    method: 'get',
})

defaultMethod.definition = {
    methods: ["get","head"],
    url: '/api/pcare/skrining/peserta/{nomorPeserta}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see [serialized-closure]:2
* @route '/api/pcare/skrining/peserta/{nomorPeserta}'
*/
defaultMethod.url = (args: { nomorPeserta: string | number } | [nomorPeserta: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { nomorPeserta: args }
    }

    if (Array.isArray(args)) {
        args = {
            nomorPeserta: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        nomorPeserta: args.nomorPeserta,
    }

    return defaultMethod.definition.url
            .replace('{nomorPeserta}', parsedArgs.nomorPeserta.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see [serialized-closure]:2
* @route '/api/pcare/skrining/peserta/{nomorPeserta}'
*/
defaultMethod.get = (args: { nomorPeserta: string | number } | [nomorPeserta: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: defaultMethod.url(args, options),
    method: 'get',
})

/**
* @see [serialized-closure]:2
* @route '/api/pcare/skrining/peserta/{nomorPeserta}'
*/
defaultMethod.head = (args: { nomorPeserta: string | number } | [nomorPeserta: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: defaultMethod.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::list
* @see app/Http/Controllers/Pcare/PcareController.php:0
* @route '/api/pcare/skrining/peserta-list/{start}/{limit}'
*/
export const list = (args: { start: string | number, limit: string | number } | [start: string | number, limit: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(args, options),
    method: 'get',
})

list.definition = {
    methods: ["get","head"],
    url: '/api/pcare/skrining/peserta-list/{start}/{limit}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::list
* @see app/Http/Controllers/Pcare/PcareController.php:0
* @route '/api/pcare/skrining/peserta-list/{start}/{limit}'
*/
list.url = (args: { start: string | number, limit: string | number } | [start: string | number, limit: string | number ], options?: RouteQueryOptions) => {
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

    return list.definition.url
            .replace('{start}', parsedArgs.start.toString())
            .replace('{limit}', parsedArgs.limit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::list
* @see app/Http/Controllers/Pcare/PcareController.php:0
* @route '/api/pcare/skrining/peserta-list/{start}/{limit}'
*/
list.get = (args: { start: string | number, limit: string | number } | [start: string | number, limit: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::list
* @see app/Http/Controllers/Pcare/PcareController.php:0
* @route '/api/pcare/skrining/peserta-list/{start}/{limit}'
*/
list.head = (args: { start: string | number, limit: string | number } | [start: string | number, limit: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: list.url(args, options),
    method: 'head',
})

const peserta = {
    test: Object.assign(test, test),
    default: Object.assign(defaultMethod, defaultMethod),
    list: Object.assign(list, list),
}

export default peserta