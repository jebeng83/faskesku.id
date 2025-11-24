import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\DetailNotaJalanController::index
* @see app/Http/Controllers/Akutansi/DetailNotaJalanController.php:18
* @route '/api/akutansi/detail-nota-jalan/{no_rawat}'
*/
export const index = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/detail-nota-jalan/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\DetailNotaJalanController::index
* @see app/Http/Controllers/Akutansi/DetailNotaJalanController.php:18
* @route '/api/akutansi/detail-nota-jalan/{no_rawat}'
*/
index.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return index.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\DetailNotaJalanController::index
* @see app/Http/Controllers/Akutansi/DetailNotaJalanController.php:18
* @route '/api/akutansi/detail-nota-jalan/{no_rawat}'
*/
index.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\DetailNotaJalanController::index
* @see app/Http/Controllers/Akutansi/DetailNotaJalanController.php:18
* @route '/api/akutansi/detail-nota-jalan/{no_rawat}'
*/
index.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\DetailNotaJalanController::store
* @see app/Http/Controllers/Akutansi/DetailNotaJalanController.php:44
* @route '/api/akutansi/detail-nota-jalan'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/akutansi/detail-nota-jalan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\DetailNotaJalanController::store
* @see app/Http/Controllers/Akutansi/DetailNotaJalanController.php:44
* @route '/api/akutansi/detail-nota-jalan'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\DetailNotaJalanController::store
* @see app/Http/Controllers/Akutansi/DetailNotaJalanController.php:44
* @route '/api/akutansi/detail-nota-jalan'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Akutansi\DetailNotaJalanController::destroy
* @see app/Http/Controllers/Akutansi/DetailNotaJalanController.php:73
* @route '/api/akutansi/detail-nota-jalan/{no_rawat}/{nama_bayar}'
*/
export const destroy = (args: { no_rawat: string | number, nama_bayar: string | number } | [no_rawat: string | number, nama_bayar: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/akutansi/detail-nota-jalan/{no_rawat}/{nama_bayar}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Akutansi\DetailNotaJalanController::destroy
* @see app/Http/Controllers/Akutansi/DetailNotaJalanController.php:73
* @route '/api/akutansi/detail-nota-jalan/{no_rawat}/{nama_bayar}'
*/
destroy.url = (args: { no_rawat: string | number, nama_bayar: string | number } | [no_rawat: string | number, nama_bayar: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            no_rawat: args[0],
            nama_bayar: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_rawat: args.no_rawat,
        nama_bayar: args.nama_bayar,
    }

    return destroy.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace('{nama_bayar}', parsedArgs.nama_bayar.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\DetailNotaJalanController::destroy
* @see app/Http/Controllers/Akutansi/DetailNotaJalanController.php:73
* @route '/api/akutansi/detail-nota-jalan/{no_rawat}/{nama_bayar}'
*/
destroy.delete = (args: { no_rawat: string | number, nama_bayar: string | number } | [no_rawat: string | number, nama_bayar: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const detailNotaJalan = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    destroy: Object.assign(destroy, destroy),
}

export default detailNotaJalan