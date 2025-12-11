import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\RiwayatTransaksiGudangController::index
 * @see app/Http/Controllers/Farmasi/RiwayatTransaksiGudangController.php:12
 * @route '/farmasi/riwayat-transaksi-gudang'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/farmasi/riwayat-transaksi-gudang',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\RiwayatTransaksiGudangController::index
 * @see app/Http/Controllers/Farmasi/RiwayatTransaksiGudangController.php:12
 * @route '/farmasi/riwayat-transaksi-gudang'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\RiwayatTransaksiGudangController::index
 * @see app/Http/Controllers/Farmasi/RiwayatTransaksiGudangController.php:12
 * @route '/farmasi/riwayat-transaksi-gudang'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Farmasi\RiwayatTransaksiGudangController::index
 * @see app/Http/Controllers/Farmasi/RiwayatTransaksiGudangController.php:12
 * @route '/farmasi/riwayat-transaksi-gudang'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\RiwayatTransaksiGudangController::data
 * @see app/Http/Controllers/Farmasi/RiwayatTransaksiGudangController.php:17
 * @route '/farmasi/riwayat-transaksi-gudang/data'
 */
export const data = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})

data.definition = {
    methods: ["get","head"],
    url: '/farmasi/riwayat-transaksi-gudang/data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\RiwayatTransaksiGudangController::data
 * @see app/Http/Controllers/Farmasi/RiwayatTransaksiGudangController.php:17
 * @route '/farmasi/riwayat-transaksi-gudang/data'
 */
data.url = (options?: RouteQueryOptions) => {
    return data.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\RiwayatTransaksiGudangController::data
 * @see app/Http/Controllers/Farmasi/RiwayatTransaksiGudangController.php:17
 * @route '/farmasi/riwayat-transaksi-gudang/data'
 */
data.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Farmasi\RiwayatTransaksiGudangController::data
 * @see app/Http/Controllers/Farmasi/RiwayatTransaksiGudangController.php:17
 * @route '/farmasi/riwayat-transaksi-gudang/data'
 */
data.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: data.url(options),
    method: 'head',
})
const RiwayatTransaksiGudangController = { index, data }

export default RiwayatTransaksiGudangController