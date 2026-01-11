import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\KategoriPengeluaranHarianController::index
* @see app/Http/Controllers/Akutansi/KategoriPengeluaranHarianController.php:13
* @route '/api/akutansi/kategori-pengeluaran-harian'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/kategori-pengeluaran-harian',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\KategoriPengeluaranHarianController::index
* @see app/Http/Controllers/Akutansi/KategoriPengeluaranHarianController.php:13
* @route '/api/akutansi/kategori-pengeluaran-harian'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\KategoriPengeluaranHarianController::index
* @see app/Http/Controllers/Akutansi/KategoriPengeluaranHarianController.php:13
* @route '/api/akutansi/kategori-pengeluaran-harian'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\KategoriPengeluaranHarianController::index
* @see app/Http/Controllers/Akutansi/KategoriPengeluaranHarianController.php:13
* @route '/api/akutansi/kategori-pengeluaran-harian'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\KategoriPengeluaranHarianController::nextCode
* @see app/Http/Controllers/Akutansi/KategoriPengeluaranHarianController.php:37
* @route '/api/akutansi/kategori-pengeluaran-harian/next-code'
*/
export const nextCode = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: nextCode.url(options),
    method: 'get',
})

nextCode.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/kategori-pengeluaran-harian/next-code',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\KategoriPengeluaranHarianController::nextCode
* @see app/Http/Controllers/Akutansi/KategoriPengeluaranHarianController.php:37
* @route '/api/akutansi/kategori-pengeluaran-harian/next-code'
*/
nextCode.url = (options?: RouteQueryOptions) => {
    return nextCode.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\KategoriPengeluaranHarianController::nextCode
* @see app/Http/Controllers/Akutansi/KategoriPengeluaranHarianController.php:37
* @route '/api/akutansi/kategori-pengeluaran-harian/next-code'
*/
nextCode.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: nextCode.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\KategoriPengeluaranHarianController::nextCode
* @see app/Http/Controllers/Akutansi/KategoriPengeluaranHarianController.php:37
* @route '/api/akutansi/kategori-pengeluaran-harian/next-code'
*/
nextCode.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: nextCode.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\KategoriPengeluaranHarianController::store
* @see app/Http/Controllers/Akutansi/KategoriPengeluaranHarianController.php:54
* @route '/api/akutansi/kategori-pengeluaran-harian'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/akutansi/kategori-pengeluaran-harian',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\KategoriPengeluaranHarianController::store
* @see app/Http/Controllers/Akutansi/KategoriPengeluaranHarianController.php:54
* @route '/api/akutansi/kategori-pengeluaran-harian'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\KategoriPengeluaranHarianController::store
* @see app/Http/Controllers/Akutansi/KategoriPengeluaranHarianController.php:54
* @route '/api/akutansi/kategori-pengeluaran-harian'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Akutansi\KategoriPengeluaranHarianController::update
* @see app/Http/Controllers/Akutansi/KategoriPengeluaranHarianController.php:72
* @route '/api/akutansi/kategori-pengeluaran-harian/{kode}'
*/
export const update = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/akutansi/kategori-pengeluaran-harian/{kode}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Akutansi\KategoriPengeluaranHarianController::update
* @see app/Http/Controllers/Akutansi/KategoriPengeluaranHarianController.php:72
* @route '/api/akutansi/kategori-pengeluaran-harian/{kode}'
*/
update.url = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kode: args }
    }

    if (Array.isArray(args)) {
        args = {
            kode: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kode: args.kode,
    }

    return update.definition.url
            .replace('{kode}', parsedArgs.kode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\KategoriPengeluaranHarianController::update
* @see app/Http/Controllers/Akutansi/KategoriPengeluaranHarianController.php:72
* @route '/api/akutansi/kategori-pengeluaran-harian/{kode}'
*/
update.put = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Akutansi\KategoriPengeluaranHarianController::destroy
* @see app/Http/Controllers/Akutansi/KategoriPengeluaranHarianController.php:94
* @route '/api/akutansi/kategori-pengeluaran-harian/{kode}'
*/
export const destroy = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/akutansi/kategori-pengeluaran-harian/{kode}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Akutansi\KategoriPengeluaranHarianController::destroy
* @see app/Http/Controllers/Akutansi/KategoriPengeluaranHarianController.php:94
* @route '/api/akutansi/kategori-pengeluaran-harian/{kode}'
*/
destroy.url = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kode: args }
    }

    if (Array.isArray(args)) {
        args = {
            kode: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kode: args.kode,
    }

    return destroy.definition.url
            .replace('{kode}', parsedArgs.kode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\KategoriPengeluaranHarianController::destroy
* @see app/Http/Controllers/Akutansi/KategoriPengeluaranHarianController.php:94
* @route '/api/akutansi/kategori-pengeluaran-harian/{kode}'
*/
destroy.delete = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const KategoriPengeluaranHarianController = { index, nextCode, store, update, destroy }

export default KategoriPengeluaranHarianController