import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\KategoriBarangController::index
* @see app/Http/Controllers/Farmasi/KategoriBarangController.php:15
* @route '/farmasi/kategori-obat'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/farmasi/kategori-obat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\KategoriBarangController::index
* @see app/Http/Controllers/Farmasi/KategoriBarangController.php:15
* @route '/farmasi/kategori-obat'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\KategoriBarangController::index
* @see app/Http/Controllers/Farmasi/KategoriBarangController.php:15
* @route '/farmasi/kategori-obat'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\KategoriBarangController::index
* @see app/Http/Controllers/Farmasi/KategoriBarangController.php:15
* @route '/farmasi/kategori-obat'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\KategoriBarangController::store
* @see app/Http/Controllers/Farmasi/KategoriBarangController.php:48
* @route '/farmasi/kategori-obat'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/farmasi/kategori-obat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Farmasi\KategoriBarangController::store
* @see app/Http/Controllers/Farmasi/KategoriBarangController.php:48
* @route '/farmasi/kategori-obat'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\KategoriBarangController::store
* @see app/Http/Controllers/Farmasi/KategoriBarangController.php:48
* @route '/farmasi/kategori-obat'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Farmasi\KategoriBarangController::update
* @see app/Http/Controllers/Farmasi/KategoriBarangController.php:72
* @route '/farmasi/kategori-obat/{kode}'
*/
export const update = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/farmasi/kategori-obat/{kode}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Farmasi\KategoriBarangController::update
* @see app/Http/Controllers/Farmasi/KategoriBarangController.php:72
* @route '/farmasi/kategori-obat/{kode}'
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
* @see \App\Http\Controllers\Farmasi\KategoriBarangController::update
* @see app/Http/Controllers/Farmasi/KategoriBarangController.php:72
* @route '/farmasi/kategori-obat/{kode}'
*/
update.put = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Farmasi\KategoriBarangController::destroy
* @see app/Http/Controllers/Farmasi/KategoriBarangController.php:93
* @route '/farmasi/kategori-obat/{kode}'
*/
export const destroy = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/farmasi/kategori-obat/{kode}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Farmasi\KategoriBarangController::destroy
* @see app/Http/Controllers/Farmasi/KategoriBarangController.php:93
* @route '/farmasi/kategori-obat/{kode}'
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
* @see \App\Http\Controllers\Farmasi\KategoriBarangController::destroy
* @see app/Http/Controllers/Farmasi/KategoriBarangController.php:93
* @route '/farmasi/kategori-obat/{kode}'
*/
destroy.delete = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const kategoriObat = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default kategoriObat