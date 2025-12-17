import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\RiwayatBarangMedisController::data
* @see app/Http/Controllers/Farmasi/RiwayatBarangMedisController.php:17
* @route '/farmasi/riwayat-barang-medis/data'
*/
export const data = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})

data.definition = {
    methods: ["get","head"],
    url: '/farmasi/riwayat-barang-medis/data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\RiwayatBarangMedisController::data
* @see app/Http/Controllers/Farmasi/RiwayatBarangMedisController.php:17
* @route '/farmasi/riwayat-barang-medis/data'
*/
data.url = (options?: RouteQueryOptions) => {
    return data.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\RiwayatBarangMedisController::data
* @see app/Http/Controllers/Farmasi/RiwayatBarangMedisController.php:17
* @route '/farmasi/riwayat-barang-medis/data'
*/
data.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\RiwayatBarangMedisController::data
* @see app/Http/Controllers/Farmasi/RiwayatBarangMedisController.php:17
* @route '/farmasi/riwayat-barang-medis/data'
*/
data.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: data.url(options),
    method: 'head',
})

const riwayatBarangMedis = {
    data: Object.assign(data, data),
}

export default riwayatBarangMedis