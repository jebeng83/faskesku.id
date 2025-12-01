import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getJenisPerawatan
* @see app/Http/Controllers/PermintaanRadiologiController.php:270
* @route '/api/radiologi-tests'
*/
export const getJenisPerawatan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getJenisPerawatan.url(options),
    method: 'get',
})

getJenisPerawatan.definition = {
    methods: ["get","head"],
    url: '/api/radiologi-tests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getJenisPerawatan
* @see app/Http/Controllers/PermintaanRadiologiController.php:270
* @route '/api/radiologi-tests'
*/
getJenisPerawatan.url = (options?: RouteQueryOptions) => {
    return getJenisPerawatan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getJenisPerawatan
* @see app/Http/Controllers/PermintaanRadiologiController.php:270
* @route '/api/radiologi-tests'
*/
getJenisPerawatan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getJenisPerawatan.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getJenisPerawatan
* @see app/Http/Controllers/PermintaanRadiologiController.php:270
* @route '/api/radiologi-tests'
*/
getJenisPerawatan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getJenisPerawatan.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::store
* @see app/Http/Controllers/PermintaanRadiologiController.php:68
* @route '/api/permintaan-radiologi'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/permintaan-radiologi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::store
* @see app/Http/Controllers/PermintaanRadiologiController.php:68
* @route '/api/permintaan-radiologi'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::store
* @see app/Http/Controllers/PermintaanRadiologiController.php:68
* @route '/api/permintaan-radiologi'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getByNoRawat
* @see app/Http/Controllers/PermintaanRadiologiController.php:317
* @route '/api/permintaan-radiologi/rawat/{no_rawat}'
*/
export const getByNoRawat = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getByNoRawat.url(args, options),
    method: 'get',
})

getByNoRawat.definition = {
    methods: ["get","head"],
    url: '/api/permintaan-radiologi/rawat/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getByNoRawat
* @see app/Http/Controllers/PermintaanRadiologiController.php:317
* @route '/api/permintaan-radiologi/rawat/{no_rawat}'
*/
getByNoRawat.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return getByNoRawat.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getByNoRawat
* @see app/Http/Controllers/PermintaanRadiologiController.php:317
* @route '/api/permintaan-radiologi/rawat/{no_rawat}'
*/
getByNoRawat.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getByNoRawat.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getByNoRawat
* @see app/Http/Controllers/PermintaanRadiologiController.php:317
* @route '/api/permintaan-radiologi/rawat/{no_rawat}'
*/
getByNoRawat.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getByNoRawat.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getRiwayat
* @see app/Http/Controllers/PermintaanRadiologiController.php:433
* @route '/api/permintaan-radiologi/riwayat/{no_rawat}'
*/
export const getRiwayat = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRiwayat.url(args, options),
    method: 'get',
})

getRiwayat.definition = {
    methods: ["get","head"],
    url: '/api/permintaan-radiologi/riwayat/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getRiwayat
* @see app/Http/Controllers/PermintaanRadiologiController.php:433
* @route '/api/permintaan-radiologi/riwayat/{no_rawat}'
*/
getRiwayat.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return getRiwayat.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getRiwayat
* @see app/Http/Controllers/PermintaanRadiologiController.php:433
* @route '/api/permintaan-radiologi/riwayat/{no_rawat}'
*/
getRiwayat.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRiwayat.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getRiwayat
* @see app/Http/Controllers/PermintaanRadiologiController.php:433
* @route '/api/permintaan-radiologi/riwayat/{no_rawat}'
*/
getRiwayat.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getRiwayat.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::destroy
* @see app/Http/Controllers/PermintaanRadiologiController.php:232
* @route '/api/permintaan-radiologi/{noorder}'
*/
export const destroy = (args: { noorder: string | number } | [noorder: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/permintaan-radiologi/{noorder}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::destroy
* @see app/Http/Controllers/PermintaanRadiologiController.php:232
* @route '/api/permintaan-radiologi/{noorder}'
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
* @see \App\Http\Controllers\PermintaanRadiologiController::destroy
* @see app/Http/Controllers/PermintaanRadiologiController.php:232
* @route '/api/permintaan-radiologi/{noorder}'
*/
destroy.delete = (args: { noorder: string | number } | [noorder: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const PermintaanRadiologiController = { getJenisPerawatan, store, getByNoRawat, getRiwayat, destroy }

export default PermintaanRadiologiController