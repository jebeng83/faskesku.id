import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::store
 * @see app/Http/Controllers/Farmasi/SetHargaObatController.php:296
 * @route '/farmasi/set-penjualan-barang'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/farmasi/set-penjualan-barang',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::store
 * @see app/Http/Controllers/Farmasi/SetHargaObatController.php:296
 * @route '/farmasi/set-penjualan-barang'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::store
 * @see app/Http/Controllers/Farmasi/SetHargaObatController.php:296
 * @route '/farmasi/set-penjualan-barang'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::show
 * @see app/Http/Controllers/Farmasi/SetHargaObatController.php:369
 * @route '/farmasi/set-penjualan-barang/{kode_brng}'
 */
export const show = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/farmasi/set-penjualan-barang/{kode_brng}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::show
 * @see app/Http/Controllers/Farmasi/SetHargaObatController.php:369
 * @route '/farmasi/set-penjualan-barang/{kode_brng}'
 */
show.url = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kode_brng: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    kode_brng: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        kode_brng: args.kode_brng,
                }

    return show.definition.url
            .replace('{kode_brng}', parsedArgs.kode_brng.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::show
 * @see app/Http/Controllers/Farmasi/SetHargaObatController.php:369
 * @route '/farmasi/set-penjualan-barang/{kode_brng}'
 */
show.get = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::show
 * @see app/Http/Controllers/Farmasi/SetHargaObatController.php:369
 * @route '/farmasi/set-penjualan-barang/{kode_brng}'
 */
show.head = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::destroy
 * @see app/Http/Controllers/Farmasi/SetHargaObatController.php:354
 * @route '/farmasi/set-penjualan-barang/{kode_brng}'
 */
export const destroy = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/farmasi/set-penjualan-barang/{kode_brng}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::destroy
 * @see app/Http/Controllers/Farmasi/SetHargaObatController.php:354
 * @route '/farmasi/set-penjualan-barang/{kode_brng}'
 */
destroy.url = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kode_brng: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    kode_brng: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        kode_brng: args.kode_brng,
                }

    return destroy.definition.url
            .replace('{kode_brng}', parsedArgs.kode_brng.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::destroy
 * @see app/Http/Controllers/Farmasi/SetHargaObatController.php:354
 * @route '/farmasi/set-penjualan-barang/{kode_brng}'
 */
destroy.delete = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const setPenjualanBarang = {
    store: Object.assign(store, store),
show: Object.assign(show, show),
destroy: Object.assign(destroy, destroy),
}

export default setPenjualanBarang