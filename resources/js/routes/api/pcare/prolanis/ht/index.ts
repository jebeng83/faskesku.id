import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see routes/api.php:566
* @route '/api/pcare/prolanis/ht/{nomorPeserta}'
*/
export const defaultMethod = (args: { nomorPeserta: string | number } | [nomorPeserta: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: defaultMethod.url(args, options),
    method: 'get',
})

defaultMethod.definition = {
    methods: ["get","head"],
    url: '/api/pcare/prolanis/ht/{nomorPeserta}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/api.php:566
* @route '/api/pcare/prolanis/ht/{nomorPeserta}'
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
* @see routes/api.php:566
* @route '/api/pcare/prolanis/ht/{nomorPeserta}'
*/
defaultMethod.get = (args: { nomorPeserta: string | number } | [nomorPeserta: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: defaultMethod.url(args, options),
    method: 'get',
})

/**
* @see routes/api.php:566
* @route '/api/pcare/prolanis/ht/{nomorPeserta}'
*/
defaultMethod.head = (args: { nomorPeserta: string | number } | [nomorPeserta: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: defaultMethod.url(args, options),
    method: 'head',
})

const ht = {
    default: Object.assign(defaultMethod, defaultMethod),
}

export default ht