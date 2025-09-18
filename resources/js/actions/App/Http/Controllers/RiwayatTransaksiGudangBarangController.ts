import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RiwayatTransaksiGudangBarangController::api
* @see app/Http/Controllers/RiwayatTransaksiGudangBarangController.php:52
* @route '/api/riwayat-transaksi-gudang'
*/
export const api = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: api.url(options),
    method: 'get',
})

api.definition = {
    methods: ["get","head"],
    url: '/api/riwayat-transaksi-gudang',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RiwayatTransaksiGudangBarangController::api
* @see app/Http/Controllers/RiwayatTransaksiGudangBarangController.php:52
* @route '/api/riwayat-transaksi-gudang'
*/
api.url = (options?: RouteQueryOptions) => {
    return api.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RiwayatTransaksiGudangBarangController::api
* @see app/Http/Controllers/RiwayatTransaksiGudangBarangController.php:52
* @route '/api/riwayat-transaksi-gudang'
*/
api.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: api.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RiwayatTransaksiGudangBarangController::api
* @see app/Http/Controllers/RiwayatTransaksiGudangBarangController.php:52
* @route '/api/riwayat-transaksi-gudang'
*/
api.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: api.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RiwayatTransaksiGudangBarangController::getBangsal
* @see app/Http/Controllers/RiwayatTransaksiGudangBarangController.php:94
* @route '/api/riwayat-transaksi-gudang/bangsal'
*/
export const getBangsal = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getBangsal.url(options),
    method: 'get',
})

getBangsal.definition = {
    methods: ["get","head"],
    url: '/api/riwayat-transaksi-gudang/bangsal',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RiwayatTransaksiGudangBarangController::getBangsal
* @see app/Http/Controllers/RiwayatTransaksiGudangBarangController.php:94
* @route '/api/riwayat-transaksi-gudang/bangsal'
*/
getBangsal.url = (options?: RouteQueryOptions) => {
    return getBangsal.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RiwayatTransaksiGudangBarangController::getBangsal
* @see app/Http/Controllers/RiwayatTransaksiGudangBarangController.php:94
* @route '/api/riwayat-transaksi-gudang/bangsal'
*/
getBangsal.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getBangsal.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RiwayatTransaksiGudangBarangController::getBangsal
* @see app/Http/Controllers/RiwayatTransaksiGudangBarangController.php:94
* @route '/api/riwayat-transaksi-gudang/bangsal'
*/
getBangsal.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getBangsal.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RiwayatTransaksiGudangBarangController::detail
* @see app/Http/Controllers/RiwayatTransaksiGudangBarangController.php:106
* @route '/api/riwayat-transaksi-gudang/{id}'
*/
export const detail = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: detail.url(args, options),
    method: 'get',
})

detail.definition = {
    methods: ["get","head"],
    url: '/api/riwayat-transaksi-gudang/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RiwayatTransaksiGudangBarangController::detail
* @see app/Http/Controllers/RiwayatTransaksiGudangBarangController.php:106
* @route '/api/riwayat-transaksi-gudang/{id}'
*/
detail.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return detail.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RiwayatTransaksiGudangBarangController::detail
* @see app/Http/Controllers/RiwayatTransaksiGudangBarangController.php:106
* @route '/api/riwayat-transaksi-gudang/{id}'
*/
detail.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: detail.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RiwayatTransaksiGudangBarangController::detail
* @see app/Http/Controllers/RiwayatTransaksiGudangBarangController.php:106
* @route '/api/riwayat-transaksi-gudang/{id}'
*/
detail.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: detail.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RiwayatTransaksiGudangBarangController::exportMethod
* @see app/Http/Controllers/RiwayatTransaksiGudangBarangController.php:117
* @route '/api/riwayat-transaksi-gudang/export'
*/
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/api/riwayat-transaksi-gudang/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RiwayatTransaksiGudangBarangController::exportMethod
* @see app/Http/Controllers/RiwayatTransaksiGudangBarangController.php:117
* @route '/api/riwayat-transaksi-gudang/export'
*/
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RiwayatTransaksiGudangBarangController::exportMethod
* @see app/Http/Controllers/RiwayatTransaksiGudangBarangController.php:117
* @route '/api/riwayat-transaksi-gudang/export'
*/
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RiwayatTransaksiGudangBarangController::exportMethod
* @see app/Http/Controllers/RiwayatTransaksiGudangBarangController.php:117
* @route '/api/riwayat-transaksi-gudang/export'
*/
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

const RiwayatTransaksiGudangBarangController = { api, getBangsal, detail, exportMethod, export: exportMethod }

export default RiwayatTransaksiGudangBarangController