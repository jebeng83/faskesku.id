import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\AkunBayarController::index
* @see app/Http/Controllers/Akutansi/AkunBayarController.php:23
* @route '/api/akutansi/akun-bayar'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/akun-bayar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\AkunBayarController::index
* @see app/Http/Controllers/Akutansi/AkunBayarController.php:23
* @route '/api/akutansi/akun-bayar'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\AkunBayarController::index
* @see app/Http/Controllers/Akutansi/AkunBayarController.php:23
* @route '/api/akutansi/akun-bayar'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\AkunBayarController::index
* @see app/Http/Controllers/Akutansi/AkunBayarController.php:23
* @route '/api/akutansi/akun-bayar'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\AkunBayarController::store
* @see app/Http/Controllers/Akutansi/AkunBayarController.php:55
* @route '/api/akutansi/akun-bayar'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/akutansi/akun-bayar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\AkunBayarController::store
* @see app/Http/Controllers/Akutansi/AkunBayarController.php:55
* @route '/api/akutansi/akun-bayar'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\AkunBayarController::store
* @see app/Http/Controllers/Akutansi/AkunBayarController.php:55
* @route '/api/akutansi/akun-bayar'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Akutansi\AkunBayarController::update
* @see app/Http/Controllers/Akutansi/AkunBayarController.php:75
* @route '/api/akutansi/akun-bayar/{nama_bayar}'
*/
export const update = (args: { nama_bayar: string | number } | [nama_bayar: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/akutansi/akun-bayar/{nama_bayar}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Akutansi\AkunBayarController::update
* @see app/Http/Controllers/Akutansi/AkunBayarController.php:75
* @route '/api/akutansi/akun-bayar/{nama_bayar}'
*/
update.url = (args: { nama_bayar: string | number } | [nama_bayar: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { nama_bayar: args }
    }

    if (Array.isArray(args)) {
        args = {
            nama_bayar: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        nama_bayar: args.nama_bayar,
    }

    return update.definition.url
            .replace('{nama_bayar}', parsedArgs.nama_bayar.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\AkunBayarController::update
* @see app/Http/Controllers/Akutansi/AkunBayarController.php:75
* @route '/api/akutansi/akun-bayar/{nama_bayar}'
*/
update.put = (args: { nama_bayar: string | number } | [nama_bayar: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Akutansi\AkunBayarController::destroy
* @see app/Http/Controllers/Akutansi/AkunBayarController.php:90
* @route '/api/akutansi/akun-bayar/{nama_bayar}'
*/
export const destroy = (args: { nama_bayar: string | number } | [nama_bayar: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/akutansi/akun-bayar/{nama_bayar}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Akutansi\AkunBayarController::destroy
* @see app/Http/Controllers/Akutansi/AkunBayarController.php:90
* @route '/api/akutansi/akun-bayar/{nama_bayar}'
*/
destroy.url = (args: { nama_bayar: string | number } | [nama_bayar: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { nama_bayar: args }
    }

    if (Array.isArray(args)) {
        args = {
            nama_bayar: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        nama_bayar: args.nama_bayar,
    }

    return destroy.definition.url
            .replace('{nama_bayar}', parsedArgs.nama_bayar.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\AkunBayarController::destroy
* @see app/Http/Controllers/Akutansi/AkunBayarController.php:90
* @route '/api/akutansi/akun-bayar/{nama_bayar}'
*/
destroy.delete = (args: { nama_bayar: string | number } | [nama_bayar: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const akunBayar = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default akunBayar