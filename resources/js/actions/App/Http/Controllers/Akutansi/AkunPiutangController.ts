import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\AkunPiutangController::page
 * @see app/Http/Controllers/Akutansi/AkunPiutangController.php:15
 * @route '/akutansi/akun-piutang'
 */
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/akutansi/akun-piutang',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\AkunPiutangController::page
 * @see app/Http/Controllers/Akutansi/AkunPiutangController.php:15
 * @route '/akutansi/akun-piutang'
 */
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\AkunPiutangController::page
 * @see app/Http/Controllers/Akutansi/AkunPiutangController.php:15
 * @route '/akutansi/akun-piutang'
 */
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Akutansi\AkunPiutangController::page
 * @see app/Http/Controllers/Akutansi/AkunPiutangController.php:15
 * @route '/akutansi/akun-piutang'
 */
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\AkunPiutangController::index
 * @see app/Http/Controllers/Akutansi/AkunPiutangController.php:23
 * @route '/api/akutansi/akun-piutang'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/akun-piutang',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\AkunPiutangController::index
 * @see app/Http/Controllers/Akutansi/AkunPiutangController.php:23
 * @route '/api/akutansi/akun-piutang'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\AkunPiutangController::index
 * @see app/Http/Controllers/Akutansi/AkunPiutangController.php:23
 * @route '/api/akutansi/akun-piutang'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Akutansi\AkunPiutangController::index
 * @see app/Http/Controllers/Akutansi/AkunPiutangController.php:23
 * @route '/api/akutansi/akun-piutang'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\AkunPiutangController::store
 * @see app/Http/Controllers/Akutansi/AkunPiutangController.php:70
 * @route '/api/akutansi/akun-piutang'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/akutansi/akun-piutang',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\AkunPiutangController::store
 * @see app/Http/Controllers/Akutansi/AkunPiutangController.php:70
 * @route '/api/akutansi/akun-piutang'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\AkunPiutangController::store
 * @see app/Http/Controllers/Akutansi/AkunPiutangController.php:70
 * @route '/api/akutansi/akun-piutang'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Akutansi\AkunPiutangController::update
 * @see app/Http/Controllers/Akutansi/AkunPiutangController.php:89
 * @route '/api/akutansi/akun-piutang/{nama_bayar}'
 */
export const update = (args: { nama_bayar: string | number } | [nama_bayar: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/akutansi/akun-piutang/{nama_bayar}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Akutansi\AkunPiutangController::update
 * @see app/Http/Controllers/Akutansi/AkunPiutangController.php:89
 * @route '/api/akutansi/akun-piutang/{nama_bayar}'
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
* @see \App\Http\Controllers\Akutansi\AkunPiutangController::update
 * @see app/Http/Controllers/Akutansi/AkunPiutangController.php:89
 * @route '/api/akutansi/akun-piutang/{nama_bayar}'
 */
update.put = (args: { nama_bayar: string | number } | [nama_bayar: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Akutansi\AkunPiutangController::destroy
 * @see app/Http/Controllers/Akutansi/AkunPiutangController.php:109
 * @route '/api/akutansi/akun-piutang/{nama_bayar}'
 */
export const destroy = (args: { nama_bayar: string | number } | [nama_bayar: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/akutansi/akun-piutang/{nama_bayar}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Akutansi\AkunPiutangController::destroy
 * @see app/Http/Controllers/Akutansi/AkunPiutangController.php:109
 * @route '/api/akutansi/akun-piutang/{nama_bayar}'
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
* @see \App\Http\Controllers\Akutansi\AkunPiutangController::destroy
 * @see app/Http/Controllers/Akutansi/AkunPiutangController.php:109
 * @route '/api/akutansi/akun-piutang/{nama_bayar}'
 */
destroy.delete = (args: { nama_bayar: string | number } | [nama_bayar: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const AkunPiutangController = { page, index, store, update, destroy }

export default AkunPiutangController