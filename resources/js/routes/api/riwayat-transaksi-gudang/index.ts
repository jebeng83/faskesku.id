import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\RiwayatTransaksiGudangBarangController::bangsal
* @see app/Http/Controllers/RiwayatTransaksiGudangBarangController.php:94
* @route '/api/riwayat-transaksi-gudang/bangsal'
*/
export const bangsal = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bangsal.url(options),
    method: 'get',
})

bangsal.definition = {
    methods: ["get","head"],
    url: '/api/riwayat-transaksi-gudang/bangsal',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RiwayatTransaksiGudangBarangController::bangsal
* @see app/Http/Controllers/RiwayatTransaksiGudangBarangController.php:94
* @route '/api/riwayat-transaksi-gudang/bangsal'
*/
bangsal.url = (options?: RouteQueryOptions) => {
    return bangsal.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RiwayatTransaksiGudangBarangController::bangsal
* @see app/Http/Controllers/RiwayatTransaksiGudangBarangController.php:94
* @route '/api/riwayat-transaksi-gudang/bangsal'
*/
bangsal.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bangsal.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RiwayatTransaksiGudangBarangController::bangsal
* @see app/Http/Controllers/RiwayatTransaksiGudangBarangController.php:94
* @route '/api/riwayat-transaksi-gudang/bangsal'
*/
bangsal.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: bangsal.url(options),
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

const riwayatTransaksiGudang = {
    bangsal: Object.assign(bangsal, bangsal),
    detail: Object.assign(detail, detail),
    export: Object.assign(exportMethod, exportMethod),
}

export default riwayatTransaksiGudang