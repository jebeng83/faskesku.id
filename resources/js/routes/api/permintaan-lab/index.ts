import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\PermintaanLabController::store
 * @see app/Http/Controllers/PermintaanLabController.php:86
 * @route '/api/permintaan-lab'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/permintaan-lab',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::store
 * @see app/Http/Controllers/PermintaanLabController.php:86
 * @route '/api/permintaan-lab'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::store
 * @see app/Http/Controllers/PermintaanLabController.php:86
 * @route '/api/permintaan-lab'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::byRawat
 * @see app/Http/Controllers/PermintaanLabController.php:318
 * @route '/api/permintaan-lab/rawat/{no_rawat}'
 */
export const byRawat = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byRawat.url(args, options),
    method: 'get',
})

byRawat.definition = {
    methods: ["get","head"],
    url: '/api/permintaan-lab/rawat/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::byRawat
 * @see app/Http/Controllers/PermintaanLabController.php:318
 * @route '/api/permintaan-lab/rawat/{no_rawat}'
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
* @see \App\Http\Controllers\PermintaanLabController::byRawat
 * @see app/Http/Controllers/PermintaanLabController.php:318
 * @route '/api/permintaan-lab/rawat/{no_rawat}'
 */
byRawat.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byRawat.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PermintaanLabController::byRawat
 * @see app/Http/Controllers/PermintaanLabController.php:318
 * @route '/api/permintaan-lab/rawat/{no_rawat}'
 */
byRawat.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: byRawat.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::riwayat
 * @see app/Http/Controllers/PermintaanLabController.php:416
 * @route '/api/permintaan-lab/riwayat/{no_rawat}'
 */
export const riwayat = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: riwayat.url(args, options),
    method: 'get',
})

riwayat.definition = {
    methods: ["get","head"],
    url: '/api/permintaan-lab/riwayat/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::riwayat
 * @see app/Http/Controllers/PermintaanLabController.php:416
 * @route '/api/permintaan-lab/riwayat/{no_rawat}'
 */
riwayat.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return riwayat.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::riwayat
 * @see app/Http/Controllers/PermintaanLabController.php:416
 * @route '/api/permintaan-lab/riwayat/{no_rawat}'
 */
riwayat.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: riwayat.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PermintaanLabController::riwayat
 * @see app/Http/Controllers/PermintaanLabController.php:416
 * @route '/api/permintaan-lab/riwayat/{no_rawat}'
 */
riwayat.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: riwayat.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::destroy
 * @see app/Http/Controllers/PermintaanLabController.php:255
 * @route '/api/permintaan-lab/{noorder}'
 */
export const destroy = (args: { noorder: string | number } | [noorder: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/permintaan-lab/{noorder}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::destroy
 * @see app/Http/Controllers/PermintaanLabController.php:255
 * @route '/api/permintaan-lab/{noorder}'
 */
destroy.url = (args: { noorder: string | number } | [noorder: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { noorder: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    noorder: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        noorder: args.noorder,
                }

    return destroy.definition.url
            .replace('{noorder}', parsedArgs.noorder.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::destroy
 * @see app/Http/Controllers/PermintaanLabController.php:255
 * @route '/api/permintaan-lab/{noorder}'
 */
destroy.delete = (args: { noorder: string | number } | [noorder: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const permintaanLab = {
    store: Object.assign(store, store),
byRawat: Object.assign(byRawat, byRawat),
riwayat: Object.assign(riwayat, riwayat),
destroy: Object.assign(destroy, destroy),
}

export default permintaanLab