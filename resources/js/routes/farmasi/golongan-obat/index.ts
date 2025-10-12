import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\GolonganBarangController::index
 * @see app/Http/Controllers/Farmasi/GolonganBarangController.php:15
 * @route '/farmasi/golongan-obat'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/farmasi/golongan-obat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\GolonganBarangController::index
 * @see app/Http/Controllers/Farmasi/GolonganBarangController.php:15
 * @route '/farmasi/golongan-obat'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\GolonganBarangController::index
 * @see app/Http/Controllers/Farmasi/GolonganBarangController.php:15
 * @route '/farmasi/golongan-obat'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Farmasi\GolonganBarangController::index
 * @see app/Http/Controllers/Farmasi/GolonganBarangController.php:15
 * @route '/farmasi/golongan-obat'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\GolonganBarangController::store
 * @see app/Http/Controllers/Farmasi/GolonganBarangController.php:48
 * @route '/farmasi/golongan-obat'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/farmasi/golongan-obat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Farmasi\GolonganBarangController::store
 * @see app/Http/Controllers/Farmasi/GolonganBarangController.php:48
 * @route '/farmasi/golongan-obat'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\GolonganBarangController::store
 * @see app/Http/Controllers/Farmasi/GolonganBarangController.php:48
 * @route '/farmasi/golongan-obat'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Farmasi\GolonganBarangController::update
 * @see app/Http/Controllers/Farmasi/GolonganBarangController.php:72
 * @route '/farmasi/golongan-obat/{kode}'
 */
export const update = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/farmasi/golongan-obat/{kode}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Farmasi\GolonganBarangController::update
 * @see app/Http/Controllers/Farmasi/GolonganBarangController.php:72
 * @route '/farmasi/golongan-obat/{kode}'
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
* @see \App\Http\Controllers\Farmasi\GolonganBarangController::update
 * @see app/Http/Controllers/Farmasi/GolonganBarangController.php:72
 * @route '/farmasi/golongan-obat/{kode}'
 */
update.put = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Farmasi\GolonganBarangController::destroy
 * @see app/Http/Controllers/Farmasi/GolonganBarangController.php:93
 * @route '/farmasi/golongan-obat/{kode}'
 */
export const destroy = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/farmasi/golongan-obat/{kode}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Farmasi\GolonganBarangController::destroy
 * @see app/Http/Controllers/Farmasi/GolonganBarangController.php:93
 * @route '/farmasi/golongan-obat/{kode}'
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
* @see \App\Http\Controllers\Farmasi\GolonganBarangController::destroy
 * @see app/Http/Controllers/Farmasi/GolonganBarangController.php:93
 * @route '/farmasi/golongan-obat/{kode}'
 */
destroy.delete = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const golonganObat = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default golonganObat