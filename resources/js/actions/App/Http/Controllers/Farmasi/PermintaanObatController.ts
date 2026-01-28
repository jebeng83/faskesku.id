import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\PermintaanObatController::store
* @see app/Http/Controllers/Farmasi/PermintaanObatController.php:73
* @route '/farmasi/permintaan'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/farmasi/permintaan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Farmasi\PermintaanObatController::store
* @see app/Http/Controllers/Farmasi/PermintaanObatController.php:73
* @route '/farmasi/permintaan'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PermintaanObatController::store
* @see app/Http/Controllers/Farmasi/PermintaanObatController.php:73
* @route '/farmasi/permintaan'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Farmasi\PermintaanObatController::search
* @see app/Http/Controllers/Farmasi/PermintaanObatController.php:15
* @route '/farmasi/permintaan/search'
*/
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/farmasi/permintaan/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\PermintaanObatController::search
* @see app/Http/Controllers/Farmasi/PermintaanObatController.php:15
* @route '/farmasi/permintaan/search'
*/
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PermintaanObatController::search
* @see app/Http/Controllers/Farmasi/PermintaanObatController.php:15
* @route '/farmasi/permintaan/search'
*/
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\PermintaanObatController::search
* @see app/Http/Controllers/Farmasi/PermintaanObatController.php:15
* @route '/farmasi/permintaan/search'
*/
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\PermintaanObatController::approveMutasi
* @see app/Http/Controllers/Farmasi/PermintaanObatController.php:141
* @route '/farmasi/permintaan/{no}/approve-mutasi'
*/
export const approveMutasi = (args: { no: string | number } | [no: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: approveMutasi.url(args, options),
    method: 'patch',
})

approveMutasi.definition = {
    methods: ["patch"],
    url: '/farmasi/permintaan/{no}/approve-mutasi',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\PermintaanObatController::approveMutasi
* @see app/Http/Controllers/Farmasi/PermintaanObatController.php:141
* @route '/farmasi/permintaan/{no}/approve-mutasi'
*/
approveMutasi.url = (args: { no: string | number } | [no: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no: args }
    }

    if (Array.isArray(args)) {
        args = {
            no: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no: args.no,
    }

    return approveMutasi.definition.url
            .replace('{no}', parsedArgs.no.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PermintaanObatController::approveMutasi
* @see app/Http/Controllers/Farmasi/PermintaanObatController.php:141
* @route '/farmasi/permintaan/{no}/approve-mutasi'
*/
approveMutasi.patch = (args: { no: string | number } | [no: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: approveMutasi.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Farmasi\PermintaanObatController::approveStokKeluar
* @see app/Http/Controllers/Farmasi/PermintaanObatController.php:291
* @route '/farmasi/permintaan/{no}/approve-stok-keluar'
*/
export const approveStokKeluar = (args: { no: string | number } | [no: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: approveStokKeluar.url(args, options),
    method: 'patch',
})

approveStokKeluar.definition = {
    methods: ["patch"],
    url: '/farmasi/permintaan/{no}/approve-stok-keluar',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\PermintaanObatController::approveStokKeluar
* @see app/Http/Controllers/Farmasi/PermintaanObatController.php:291
* @route '/farmasi/permintaan/{no}/approve-stok-keluar'
*/
approveStokKeluar.url = (args: { no: string | number } | [no: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no: args }
    }

    if (Array.isArray(args)) {
        args = {
            no: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no: args.no,
    }

    return approveStokKeluar.definition.url
            .replace('{no}', parsedArgs.no.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PermintaanObatController::approveStokKeluar
* @see app/Http/Controllers/Farmasi/PermintaanObatController.php:291
* @route '/farmasi/permintaan/{no}/approve-stok-keluar'
*/
approveStokKeluar.patch = (args: { no: string | number } | [no: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: approveStokKeluar.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Farmasi\PermintaanObatController::reject
* @see app/Http/Controllers/Farmasi/PermintaanObatController.php:373
* @route '/farmasi/permintaan/{no}/reject'
*/
export const reject = (args: { no: string | number } | [no: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: reject.url(args, options),
    method: 'patch',
})

reject.definition = {
    methods: ["patch"],
    url: '/farmasi/permintaan/{no}/reject',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\PermintaanObatController::reject
* @see app/Http/Controllers/Farmasi/PermintaanObatController.php:373
* @route '/farmasi/permintaan/{no}/reject'
*/
reject.url = (args: { no: string | number } | [no: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no: args }
    }

    if (Array.isArray(args)) {
        args = {
            no: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no: args.no,
    }

    return reject.definition.url
            .replace('{no}', parsedArgs.no.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PermintaanObatController::reject
* @see app/Http/Controllers/Farmasi/PermintaanObatController.php:373
* @route '/farmasi/permintaan/{no}/reject'
*/
reject.patch = (args: { no: string | number } | [no: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: reject.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Farmasi\PermintaanObatController::destroy
* @see app/Http/Controllers/Farmasi/PermintaanObatController.php:383
* @route '/farmasi/permintaan/{no}'
*/
export const destroy = (args: { no: string | number } | [no: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/farmasi/permintaan/{no}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Farmasi\PermintaanObatController::destroy
* @see app/Http/Controllers/Farmasi/PermintaanObatController.php:383
* @route '/farmasi/permintaan/{no}'
*/
destroy.url = (args: { no: string | number } | [no: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no: args }
    }

    if (Array.isArray(args)) {
        args = {
            no: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no: args.no,
    }

    return destroy.definition.url
            .replace('{no}', parsedArgs.no.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PermintaanObatController::destroy
* @see app/Http/Controllers/Farmasi/PermintaanObatController.php:383
* @route '/farmasi/permintaan/{no}'
*/
destroy.delete = (args: { no: string | number } | [no: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const PermintaanObatController = { store, search, approveMutasi, approveStokKeluar, reject, destroy }

export default PermintaanObatController