import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import kategoriObat from './kategori-obat'
/**
* @see [serialized-closure]:2
* @route '/farmasi'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/farmasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see [serialized-closure]:2
* @route '/farmasi'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see [serialized-closure]:2
* @route '/farmasi'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see [serialized-closure]:2
* @route '/farmasi'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see [serialized-closure]:2
* @route '/farmasi/pembelian-obat'
*/
export const pembelianObat = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pembelianObat.url(options),
    method: 'get',
})

pembelianObat.definition = {
    methods: ["get","head"],
    url: '/farmasi/pembelian-obat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see [serialized-closure]:2
* @route '/farmasi/pembelian-obat'
*/
pembelianObat.url = (options?: RouteQueryOptions) => {
    return pembelianObat.definition.url + queryParams(options)
}

/**
* @see [serialized-closure]:2
* @route '/farmasi/pembelian-obat'
*/
pembelianObat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pembelianObat.url(options),
    method: 'get',
})

/**
* @see [serialized-closure]:2
* @route '/farmasi/pembelian-obat'
*/
pembelianObat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pembelianObat.url(options),
    method: 'head',
})

/**
* @see [serialized-closure]:2
* @route '/farmasi/penjualan-obat'
*/
export const penjualanObat = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: penjualanObat.url(options),
    method: 'get',
})

penjualanObat.definition = {
    methods: ["get","head"],
    url: '/farmasi/penjualan-obat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see [serialized-closure]:2
* @route '/farmasi/penjualan-obat'
*/
penjualanObat.url = (options?: RouteQueryOptions) => {
    return penjualanObat.definition.url + queryParams(options)
}

/**
* @see [serialized-closure]:2
* @route '/farmasi/penjualan-obat'
*/
penjualanObat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: penjualanObat.url(options),
    method: 'get',
})

/**
* @see [serialized-closure]:2
* @route '/farmasi/penjualan-obat'
*/
penjualanObat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: penjualanObat.url(options),
    method: 'head',
})

/**
* @see [serialized-closure]:2
* @route '/farmasi/resep-obat'
*/
export const resepObat = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: resepObat.url(options),
    method: 'get',
})

resepObat.definition = {
    methods: ["get","head"],
    url: '/farmasi/resep-obat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see [serialized-closure]:2
* @route '/farmasi/resep-obat'
*/
resepObat.url = (options?: RouteQueryOptions) => {
    return resepObat.definition.url + queryParams(options)
}

/**
* @see [serialized-closure]:2
* @route '/farmasi/resep-obat'
*/
resepObat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: resepObat.url(options),
    method: 'get',
})

/**
* @see [serialized-closure]:2
* @route '/farmasi/resep-obat'
*/
resepObat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: resepObat.url(options),
    method: 'head',
})

/**
* @see [serialized-closure]:2
* @route '/farmasi/riwayat-transaksi-gudang'
*/
export const riwayatTransaksiGudang = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: riwayatTransaksiGudang.url(options),
    method: 'get',
})

riwayatTransaksiGudang.definition = {
    methods: ["get","head"],
    url: '/farmasi/riwayat-transaksi-gudang',
} satisfies RouteDefinition<["get","head"]>

/**
* @see [serialized-closure]:2
* @route '/farmasi/riwayat-transaksi-gudang'
*/
riwayatTransaksiGudang.url = (options?: RouteQueryOptions) => {
    return riwayatTransaksiGudang.definition.url + queryParams(options)
}

/**
* @see [serialized-closure]:2
* @route '/farmasi/riwayat-transaksi-gudang'
*/
riwayatTransaksiGudang.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: riwayatTransaksiGudang.url(options),
    method: 'get',
})

/**
* @see [serialized-closure]:2
* @route '/farmasi/riwayat-transaksi-gudang'
*/
riwayatTransaksiGudang.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: riwayatTransaksiGudang.url(options),
    method: 'head',
})

/**
* @see [serialized-closure]:2
* @route '/farmasi/stok-obat'
*/
export const stokObat = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stokObat.url(options),
    method: 'get',
})

stokObat.definition = {
    methods: ["get","head"],
    url: '/farmasi/stok-obat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see [serialized-closure]:2
* @route '/farmasi/stok-obat'
*/
stokObat.url = (options?: RouteQueryOptions) => {
    return stokObat.definition.url + queryParams(options)
}

/**
* @see [serialized-closure]:2
* @route '/farmasi/stok-obat'
*/
stokObat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stokObat.url(options),
    method: 'get',
})

/**
* @see [serialized-closure]:2
* @route '/farmasi/stok-obat'
*/
stokObat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stokObat.url(options),
    method: 'head',
})

/**
* @see [serialized-closure]:2
* @route '/farmasi/stok-opname'
*/
export const stokOpname = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stokOpname.url(options),
    method: 'get',
})

stokOpname.definition = {
    methods: ["get","head"],
    url: '/farmasi/stok-opname',
} satisfies RouteDefinition<["get","head"]>

/**
* @see [serialized-closure]:2
* @route '/farmasi/stok-opname'
*/
stokOpname.url = (options?: RouteQueryOptions) => {
    return stokOpname.definition.url + queryParams(options)
}

/**
* @see [serialized-closure]:2
* @route '/farmasi/stok-opname'
*/
stokOpname.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stokOpname.url(options),
    method: 'get',
})

/**
* @see [serialized-closure]:2
* @route '/farmasi/stok-opname'
*/
stokOpname.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stokOpname.url(options),
    method: 'head',
})

/**
* @see [serialized-closure]:2
* @route '/farmasi/data-obat'
*/
export const dataObat = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataObat.url(options),
    method: 'get',
})

dataObat.definition = {
    methods: ["get","head"],
    url: '/farmasi/data-obat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see [serialized-closure]:2
* @route '/farmasi/data-obat'
*/
dataObat.url = (options?: RouteQueryOptions) => {
    return dataObat.definition.url + queryParams(options)
}

/**
* @see [serialized-closure]:2
* @route '/farmasi/data-obat'
*/
dataObat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataObat.url(options),
    method: 'get',
})

/**
* @see [serialized-closure]:2
* @route '/farmasi/data-obat'
*/
dataObat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dataObat.url(options),
    method: 'head',
})

const farmasi = {
    dashboard: Object.assign(dashboard, dashboard),
    pembelianObat: Object.assign(pembelianObat, pembelianObat),
    penjualanObat: Object.assign(penjualanObat, penjualanObat),
    resepObat: Object.assign(resepObat, resepObat),
    riwayatTransaksiGudang: Object.assign(riwayatTransaksiGudang, riwayatTransaksiGudang),
    stokObat: Object.assign(stokObat, stokObat),
    stokOpname: Object.assign(stokOpname, stokOpname),
    dataObat: Object.assign(dataObat, dataObat),
    kategoriObat: Object.assign(kategoriObat, kategoriObat),
}

export default farmasi