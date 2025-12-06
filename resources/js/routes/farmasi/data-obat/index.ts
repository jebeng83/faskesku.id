import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
import updateHargaSemuaFd349c from './update-harga-semua'
/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::store
* @see app/Http/Controllers/Farmasi/DataBarangController.php:103
* @route '/farmasi/data-obat'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/farmasi/data-obat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::store
* @see app/Http/Controllers/Farmasi/DataBarangController.php:103
* @route '/farmasi/data-obat'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::store
* @see app/Http/Controllers/Farmasi/DataBarangController.php:103
* @route '/farmasi/data-obat'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::updateHargaSemua
* @see app/Http/Controllers/Farmasi/DataBarangController.php:202
* @route '/farmasi/data-obat/update-harga-semua'
*/
export const updateHargaSemua = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateHargaSemua.url(options),
    method: 'put',
})

updateHargaSemua.definition = {
    methods: ["put"],
    url: '/farmasi/data-obat/update-harga-semua',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::updateHargaSemua
* @see app/Http/Controllers/Farmasi/DataBarangController.php:202
* @route '/farmasi/data-obat/update-harga-semua'
*/
updateHargaSemua.url = (options?: RouteQueryOptions) => {
    return updateHargaSemua.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::updateHargaSemua
* @see app/Http/Controllers/Farmasi/DataBarangController.php:202
* @route '/farmasi/data-obat/update-harga-semua'
*/
updateHargaSemua.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateHargaSemua.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::update
* @see app/Http/Controllers/Farmasi/DataBarangController.php:154
* @route '/farmasi/data-obat/{kode_brng}'
*/
export const update = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/farmasi/data-obat/{kode_brng}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::update
* @see app/Http/Controllers/Farmasi/DataBarangController.php:154
* @route '/farmasi/data-obat/{kode_brng}'
*/
update.url = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{kode_brng}', parsedArgs.kode_brng.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::update
* @see app/Http/Controllers/Farmasi/DataBarangController.php:154
* @route '/farmasi/data-obat/{kode_brng}'
*/
update.put = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::destroy
* @see app/Http/Controllers/Farmasi/DataBarangController.php:189
* @route '/farmasi/data-obat/{kode_brng}'
*/
export const destroy = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/farmasi/data-obat/{kode_brng}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::destroy
* @see app/Http/Controllers/Farmasi/DataBarangController.php:189
* @route '/farmasi/data-obat/{kode_brng}'
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
* @see \App\Http\Controllers\Farmasi\DataBarangController::destroy
* @see app/Http/Controllers/Farmasi/DataBarangController.php:189
* @route '/farmasi/data-obat/{kode_brng}'
*/
destroy.delete = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const dataObat = {
    store: Object.assign(store, store),
    updateHargaSemua: Object.assign(updateHargaSemua, updateHargaSemuaFd349c),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default dataObat