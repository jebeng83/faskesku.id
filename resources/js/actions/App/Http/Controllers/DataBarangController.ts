import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DataBarangController::updateHarga
* @see app/Http/Controllers/DataBarangController.php:238
* @route '/api/permissions/databarang/update-harga/{kode_brng}'
*/
const updateHargabab492000bf919c110dae97581f42af7 = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateHargabab492000bf919c110dae97581f42af7.url(args, options),
    method: 'put',
})

updateHargabab492000bf919c110dae97581f42af7.definition = {
    methods: ["put"],
    url: '/api/permissions/databarang/update-harga/{kode_brng}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\DataBarangController::updateHarga
* @see app/Http/Controllers/DataBarangController.php:238
* @route '/api/permissions/databarang/update-harga/{kode_brng}'
*/
updateHargabab492000bf919c110dae97581f42af7.url = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateHargabab492000bf919c110dae97581f42af7.definition.url
            .replace('{kode_brng}', parsedArgs.kode_brng.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataBarangController::updateHarga
* @see app/Http/Controllers/DataBarangController.php:238
* @route '/api/permissions/databarang/update-harga/{kode_brng}'
*/
updateHargabab492000bf919c110dae97581f42af7.put = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateHargabab492000bf919c110dae97581f42af7.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\DataBarangController::updateHarga
* @see app/Http/Controllers/DataBarangController.php:238
* @route '/api/databarang/update-harga/{kode_brng}'
*/
const updateHarga72e6d12923dff8d20f094900edd5617b = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateHarga72e6d12923dff8d20f094900edd5617b.url(args, options),
    method: 'put',
})

updateHarga72e6d12923dff8d20f094900edd5617b.definition = {
    methods: ["put"],
    url: '/api/databarang/update-harga/{kode_brng}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\DataBarangController::updateHarga
* @see app/Http/Controllers/DataBarangController.php:238
* @route '/api/databarang/update-harga/{kode_brng}'
*/
updateHarga72e6d12923dff8d20f094900edd5617b.url = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateHarga72e6d12923dff8d20f094900edd5617b.definition.url
            .replace('{kode_brng}', parsedArgs.kode_brng.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataBarangController::updateHarga
* @see app/Http/Controllers/DataBarangController.php:238
* @route '/api/databarang/update-harga/{kode_brng}'
*/
updateHarga72e6d12923dff8d20f094900edd5617b.put = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateHarga72e6d12923dff8d20f094900edd5617b.url(args, options),
    method: 'put',
})

export const updateHarga = {
    '/api/permissions/databarang/update-harga/{kode_brng}': updateHargabab492000bf919c110dae97581f42af7,
    '/api/databarang/update-harga/{kode_brng}': updateHarga72e6d12923dff8d20f094900edd5617b,
}

/**
* @see \App\Http\Controllers\DataBarangController::updateHargaJual
* @see app/Http/Controllers/DataBarangController.php:291
* @route '/api/permissions/databarang/update-harga-jual/{kode_brng}'
*/
const updateHargaJual5a3ecb67d7ce687976969da5c759189d = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateHargaJual5a3ecb67d7ce687976969da5c759189d.url(args, options),
    method: 'put',
})

updateHargaJual5a3ecb67d7ce687976969da5c759189d.definition = {
    methods: ["put"],
    url: '/api/permissions/databarang/update-harga-jual/{kode_brng}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\DataBarangController::updateHargaJual
* @see app/Http/Controllers/DataBarangController.php:291
* @route '/api/permissions/databarang/update-harga-jual/{kode_brng}'
*/
updateHargaJual5a3ecb67d7ce687976969da5c759189d.url = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateHargaJual5a3ecb67d7ce687976969da5c759189d.definition.url
            .replace('{kode_brng}', parsedArgs.kode_brng.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataBarangController::updateHargaJual
* @see app/Http/Controllers/DataBarangController.php:291
* @route '/api/permissions/databarang/update-harga-jual/{kode_brng}'
*/
updateHargaJual5a3ecb67d7ce687976969da5c759189d.put = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateHargaJual5a3ecb67d7ce687976969da5c759189d.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\DataBarangController::updateHargaJual
* @see app/Http/Controllers/DataBarangController.php:291
* @route '/api/databarang/update-harga-jual/{kode_brng}'
*/
const updateHargaJualc12603860c9e39c5a0f0057c313e959a = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateHargaJualc12603860c9e39c5a0f0057c313e959a.url(args, options),
    method: 'put',
})

updateHargaJualc12603860c9e39c5a0f0057c313e959a.definition = {
    methods: ["put"],
    url: '/api/databarang/update-harga-jual/{kode_brng}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\DataBarangController::updateHargaJual
* @see app/Http/Controllers/DataBarangController.php:291
* @route '/api/databarang/update-harga-jual/{kode_brng}'
*/
updateHargaJualc12603860c9e39c5a0f0057c313e959a.url = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateHargaJualc12603860c9e39c5a0f0057c313e959a.definition.url
            .replace('{kode_brng}', parsedArgs.kode_brng.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataBarangController::updateHargaJual
* @see app/Http/Controllers/DataBarangController.php:291
* @route '/api/databarang/update-harga-jual/{kode_brng}'
*/
updateHargaJualc12603860c9e39c5a0f0057c313e959a.put = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateHargaJualc12603860c9e39c5a0f0057c313e959a.url(args, options),
    method: 'put',
})

export const updateHargaJual = {
    '/api/permissions/databarang/update-harga-jual/{kode_brng}': updateHargaJual5a3ecb67d7ce687976969da5c759189d,
    '/api/databarang/update-harga-jual/{kode_brng}': updateHargaJualc12603860c9e39c5a0f0057c313e959a,
}

const DataBarangController = { updateHarga, updateHargaJual }

export default DataBarangController