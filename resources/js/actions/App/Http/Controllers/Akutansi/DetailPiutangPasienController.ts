import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\DetailPiutangPasienController::index
* @see app/Http/Controllers/Akutansi/DetailPiutangPasienController.php:16
* @route '/api/akutansi/detail-piutang-pasien/{no_rawat}'
*/
export const index = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/detail-piutang-pasien/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\DetailPiutangPasienController::index
* @see app/Http/Controllers/Akutansi/DetailPiutangPasienController.php:16
* @route '/api/akutansi/detail-piutang-pasien/{no_rawat}'
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
* @see \App\Http\Controllers\Akutansi\DetailPiutangPasienController::index
* @see app/Http/Controllers/Akutansi/DetailPiutangPasienController.php:16
* @route '/api/akutansi/detail-piutang-pasien/{no_rawat}'
*/
index.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\DetailPiutangPasienController::index
* @see app/Http/Controllers/Akutansi/DetailPiutangPasienController.php:16
* @route '/api/akutansi/detail-piutang-pasien/{no_rawat}'
*/
index.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\DetailPiutangPasienController::store
* @see app/Http/Controllers/Akutansi/DetailPiutangPasienController.php:31
* @route '/api/akutansi/detail-piutang-pasien'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/akutansi/detail-piutang-pasien',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\DetailPiutangPasienController::store
* @see app/Http/Controllers/Akutansi/DetailPiutangPasienController.php:31
* @route '/api/akutansi/detail-piutang-pasien'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\DetailPiutangPasienController::store
* @see app/Http/Controllers/Akutansi/DetailPiutangPasienController.php:31
* @route '/api/akutansi/detail-piutang-pasien'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Akutansi\DetailPiutangPasienController::update
* @see app/Http/Controllers/Akutansi/DetailPiutangPasienController.php:61
* @route '/api/akutansi/detail-piutang-pasien/{no_rawat}/{nama_bayar}'
*/
export const update = (args: { no_rawat: string | number, nama_bayar: string | number } | [no_rawat: string | number, nama_bayar: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/akutansi/detail-piutang-pasien/{no_rawat}/{nama_bayar}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Akutansi\DetailPiutangPasienController::update
* @see app/Http/Controllers/Akutansi/DetailPiutangPasienController.php:61
* @route '/api/akutansi/detail-piutang-pasien/{no_rawat}/{nama_bayar}'
*/
update.url = (args: { no_rawat: string | number, nama_bayar: string | number } | [no_rawat: string | number, nama_bayar: string | number ], options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace('{nama_bayar}', parsedArgs.nama_bayar.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\DetailPiutangPasienController::update
* @see app/Http/Controllers/Akutansi/DetailPiutangPasienController.php:61
* @route '/api/akutansi/detail-piutang-pasien/{no_rawat}/{nama_bayar}'
*/
update.put = (args: { no_rawat: string | number, nama_bayar: string | number } | [no_rawat: string | number, nama_bayar: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Akutansi\DetailPiutangPasienController::destroy
* @see app/Http/Controllers/Akutansi/DetailPiutangPasienController.php:78
* @route '/api/akutansi/detail-piutang-pasien/{no_rawat}/{nama_bayar}'
*/
export const destroy = (args: { no_rawat: string | number, nama_bayar: string | number } | [no_rawat: string | number, nama_bayar: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/akutansi/detail-piutang-pasien/{no_rawat}/{nama_bayar}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Akutansi\DetailPiutangPasienController::destroy
* @see app/Http/Controllers/Akutansi/DetailPiutangPasienController.php:78
* @route '/api/akutansi/detail-piutang-pasien/{no_rawat}/{nama_bayar}'
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
* @see \App\Http\Controllers\Akutansi\DetailPiutangPasienController::destroy
* @see app/Http/Controllers/Akutansi/DetailPiutangPasienController.php:78
* @route '/api/akutansi/detail-piutang-pasien/{no_rawat}/{nama_bayar}'
*/
destroy.delete = (args: { no_rawat: string | number, nama_bayar: string | number } | [no_rawat: string | number, nama_bayar: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const DetailPiutangPasienController = { index, store, update, destroy }

export default DetailPiutangPasienController