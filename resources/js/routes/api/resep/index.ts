import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\RawatJalan\ResepController::store
 * @see app/Http/Controllers/RawatJalan/ResepController.php:19
 * @route '/api/resep'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/resep',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::store
 * @see app/Http/Controllers/RawatJalan/ResepController.php:19
 * @route '/api/resep'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::store
 * @see app/Http/Controllers/RawatJalan/ResepController.php:19
 * @route '/api/resep'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::get
 * @see app/Http/Controllers/RawatJalan/ResepController.php:153
 * @route '/api/resep/{no_resep}'
 */
export const get = (args: { no_resep: string | number } | [no_resep: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: get.url(args, options),
    method: 'get',
})

get.definition = {
    methods: ["get","head"],
    url: '/api/resep/{no_resep}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::get
 * @see app/Http/Controllers/RawatJalan/ResepController.php:153
 * @route '/api/resep/{no_resep}'
 */
get.url = (args: { no_resep: string | number } | [no_resep: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_resep: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    no_resep: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        no_resep: args.no_resep,
                }

    return get.definition.url
            .replace('{no_resep}', parsedArgs.no_resep.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::get
 * @see app/Http/Controllers/RawatJalan/ResepController.php:153
 * @route '/api/resep/{no_resep}'
 */
get.get = (args: { no_resep: string | number } | [no_resep: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: get.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RawatJalan\ResepController::get
 * @see app/Http/Controllers/RawatJalan/ResepController.php:153
 * @route '/api/resep/{no_resep}'
 */
get.head = (args: { no_resep: string | number } | [no_resep: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: get.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::byRawat
 * @see app/Http/Controllers/RawatJalan/ResepController.php:128
 * @route '/api/resep/rawat/{no_rawat}'
 */
export const byRawat = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byRawat.url(args, options),
    method: 'get',
})

byRawat.definition = {
    methods: ["get","head"],
    url: '/api/resep/rawat/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::byRawat
 * @see app/Http/Controllers/RawatJalan/ResepController.php:128
 * @route '/api/resep/rawat/{no_rawat}'
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
* @see \App\Http\Controllers\RawatJalan\ResepController::byRawat
 * @see app/Http/Controllers/RawatJalan/ResepController.php:128
 * @route '/api/resep/rawat/{no_rawat}'
 */
byRawat.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byRawat.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RawatJalan\ResepController::byRawat
 * @see app/Http/Controllers/RawatJalan/ResepController.php:128
 * @route '/api/resep/rawat/{no_rawat}'
 */
byRawat.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: byRawat.url(args, options),
    method: 'head',
})
const resep = {
    store: Object.assign(store, store),
get: Object.assign(get, get),
byRawat: Object.assign(byRawat, byRawat),
}

export default resep