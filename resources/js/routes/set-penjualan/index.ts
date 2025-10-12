import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::store
 * @see app/Http/Controllers/Farmasi/SetHargaObatController.php:223
 * @route '/farmasi/set-penjualan'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/farmasi/set-penjualan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::store
 * @see app/Http/Controllers/Farmasi/SetHargaObatController.php:223
 * @route '/farmasi/set-penjualan'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::store
 * @see app/Http/Controllers/Farmasi/SetHargaObatController.php:223
 * @route '/farmasi/set-penjualan'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::destroy
 * @see app/Http/Controllers/Farmasi/SetHargaObatController.php:276
 * @route '/farmasi/set-penjualan/{kdjns}'
 */
export const destroy = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/farmasi/set-penjualan/{kdjns}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::destroy
 * @see app/Http/Controllers/Farmasi/SetHargaObatController.php:276
 * @route '/farmasi/set-penjualan/{kdjns}'
 */
destroy.url = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kdjns: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    kdjns: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        kdjns: args.kdjns,
                }

    return destroy.definition.url
            .replace('{kdjns}', parsedArgs.kdjns.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::destroy
 * @see app/Http/Controllers/Farmasi/SetHargaObatController.php:276
 * @route '/farmasi/set-penjualan/{kdjns}'
 */
destroy.delete = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const setPenjualan = {
    store: Object.assign(store, store),
destroy: Object.assign(destroy, destroy),
}

export default setPenjualan