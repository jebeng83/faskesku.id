import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\PcareController::store
 * @see app/Http/Controllers/Pcare/PcareController.php:1961
 * @route '/api/pcare/pendaftaran'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/pcare/pendaftaran',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::store
 * @see app/Http/Controllers/Pcare/PcareController.php:1961
 * @route '/api/pcare/pendaftaran'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::store
 * @see app/Http/Controllers/Pcare/PcareController.php:1961
 * @route '/api/pcare/pendaftaran'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::byRawat
 * @see app/Http/Controllers/Pcare/PcareController.php:1918
 * @route '/api/pcare/pendaftaran/rawat/{no_rawat}'
 */
export const byRawat = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byRawat.url(args, options),
    method: 'get',
})

byRawat.definition = {
    methods: ["get","head"],
    url: '/api/pcare/pendaftaran/rawat/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::byRawat
 * @see app/Http/Controllers/Pcare/PcareController.php:1918
 * @route '/api/pcare/pendaftaran/rawat/{no_rawat}'
 */
byRawat.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return byRawat.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::byRawat
 * @see app/Http/Controllers/Pcare/PcareController.php:1918
 * @route '/api/pcare/pendaftaran/rawat/{no_rawat}'
 */
byRawat.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byRawat.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Pcare\PcareController::byRawat
 * @see app/Http/Controllers/Pcare/PcareController.php:1918
 * @route '/api/pcare/pendaftaran/rawat/{no_rawat}'
 */
byRawat.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: byRawat.url(args, options),
    method: 'head',
})
const pendaftaran = {
    store: Object.assign(store, store),
byRawat: Object.assign(byRawat, byRawat),
}

export default pendaftaran