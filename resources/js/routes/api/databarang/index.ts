import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\DataBarangController::updateHarga
 * @see app/Http/Controllers/DataBarangController.php:238
 * @route '/api/databarang/update-harga/{kode_brng}'
 */
export const updateHarga = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateHarga.url(args, options),
    method: 'put',
})

updateHarga.definition = {
    methods: ["put"],
    url: '/api/databarang/update-harga/{kode_brng}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\DataBarangController::updateHarga
 * @see app/Http/Controllers/DataBarangController.php:238
 * @route '/api/databarang/update-harga/{kode_brng}'
 */
updateHarga.url = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateHarga.definition.url
            .replace('{kode_brng}', parsedArgs.kode_brng.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataBarangController::updateHarga
 * @see app/Http/Controllers/DataBarangController.php:238
 * @route '/api/databarang/update-harga/{kode_brng}'
 */
updateHarga.put = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateHarga.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\DataBarangController::updateHargaJual
 * @see app/Http/Controllers/DataBarangController.php:291
 * @route '/api/databarang/update-harga-jual/{kode_brng}'
 */
export const updateHargaJual = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateHargaJual.url(args, options),
    method: 'put',
})

updateHargaJual.definition = {
    methods: ["put"],
    url: '/api/databarang/update-harga-jual/{kode_brng}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\DataBarangController::updateHargaJual
 * @see app/Http/Controllers/DataBarangController.php:291
 * @route '/api/databarang/update-harga-jual/{kode_brng}'
 */
updateHargaJual.url = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateHargaJual.definition.url
            .replace('{kode_brng}', parsedArgs.kode_brng.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataBarangController::updateHargaJual
 * @see app/Http/Controllers/DataBarangController.php:291
 * @route '/api/databarang/update-harga-jual/{kode_brng}'
 */
updateHargaJual.put = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateHargaJual.url(args, options),
    method: 'put',
})
const databarang = {
    updateHarga: Object.assign(updateHarga, updateHarga),
updateHargaJual: Object.assign(updateHargaJual, updateHargaJual),
}

export default databarang