import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
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

const riwayatTransaksiGudang = {
    data: Object.assign(data, data),
}

export default riwayatTransaksiGudang