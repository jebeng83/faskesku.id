import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import dataObatF6becc from './data-obat'
import setPenjualanBarang from './set-penjualan-barang'
import setPenjualanUmum from './set-penjualan-umum'
import kategoriObat from './kategori-obat'
import setPenjualan from './set-penjualan'
import golonganObat from './golongan-obat'
import industriFarmasi from './industri-farmasi'
import datasuplier from './datasuplier'
import supplier from './supplier'
import satuanBarang from './satuan-barang'
import metodeRacik from './metode-racik'
import konversiSatuan from './konversi-satuan'
import jenisObat from './jenis-obat'
/**
* @see routes/web.php:190
* @route '/farmasi'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/farmasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:190
* @route '/farmasi'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see routes/web.php:190
* @route '/farmasi'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see routes/web.php:190
* @route '/farmasi'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see routes/web.php:195
* @route '/farmasi/dashboard'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/farmasi/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:195
* @route '/farmasi/dashboard'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see routes/web.php:195
* @route '/farmasi/dashboard'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see routes/web.php:195
* @route '/farmasi/dashboard'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see routes/web.php:199
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
* @see routes/web.php:199
* @route '/farmasi/pembelian-obat'
*/
pembelianObat.url = (options?: RouteQueryOptions) => {
    return pembelianObat.definition.url + queryParams(options)
}

/**
* @see routes/web.php:199
* @route '/farmasi/pembelian-obat'
*/
pembelianObat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pembelianObat.url(options),
    method: 'get',
})

/**
* @see routes/web.php:199
* @route '/farmasi/pembelian-obat'
*/
pembelianObat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pembelianObat.url(options),
    method: 'head',
})

/**
* @see routes/web.php:203
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
* @see routes/web.php:203
* @route '/farmasi/penjualan-obat'
*/
penjualanObat.url = (options?: RouteQueryOptions) => {
    return penjualanObat.definition.url + queryParams(options)
}

/**
* @see routes/web.php:203
* @route '/farmasi/penjualan-obat'
*/
penjualanObat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: penjualanObat.url(options),
    method: 'get',
})

/**
* @see routes/web.php:203
* @route '/farmasi/penjualan-obat'
*/
penjualanObat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: penjualanObat.url(options),
    method: 'head',
})

/**
* @see routes/web.php:207
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
* @see routes/web.php:207
* @route '/farmasi/resep-obat'
*/
resepObat.url = (options?: RouteQueryOptions) => {
    return resepObat.definition.url + queryParams(options)
}

/**
* @see routes/web.php:207
* @route '/farmasi/resep-obat'
*/
resepObat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: resepObat.url(options),
    method: 'get',
})

/**
* @see routes/web.php:207
* @route '/farmasi/resep-obat'
*/
resepObat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: resepObat.url(options),
    method: 'head',
})

/**
* @see routes/web.php:211
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
* @see routes/web.php:211
* @route '/farmasi/riwayat-transaksi-gudang'
*/
riwayatTransaksiGudang.url = (options?: RouteQueryOptions) => {
    return riwayatTransaksiGudang.definition.url + queryParams(options)
}

/**
* @see routes/web.php:211
* @route '/farmasi/riwayat-transaksi-gudang'
*/
riwayatTransaksiGudang.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: riwayatTransaksiGudang.url(options),
    method: 'get',
})

/**
* @see routes/web.php:211
* @route '/farmasi/riwayat-transaksi-gudang'
*/
riwayatTransaksiGudang.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: riwayatTransaksiGudang.url(options),
    method: 'head',
})

/**
* @see routes/web.php:215
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
* @see routes/web.php:215
* @route '/farmasi/stok-obat'
*/
stokObat.url = (options?: RouteQueryOptions) => {
    return stokObat.definition.url + queryParams(options)
}

/**
* @see routes/web.php:215
* @route '/farmasi/stok-obat'
*/
stokObat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stokObat.url(options),
    method: 'get',
})

/**
* @see routes/web.php:215
* @route '/farmasi/stok-obat'
*/
stokObat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stokObat.url(options),
    method: 'head',
})

/**
* @see routes/web.php:219
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
* @see routes/web.php:219
* @route '/farmasi/stok-opname'
*/
stokOpname.url = (options?: RouteQueryOptions) => {
    return stokOpname.definition.url + queryParams(options)
}

/**
* @see routes/web.php:219
* @route '/farmasi/stok-opname'
*/
stokOpname.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stokOpname.url(options),
    method: 'get',
})

/**
* @see routes/web.php:219
* @route '/farmasi/stok-opname'
*/
stokOpname.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stokOpname.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::dataObat
* @see app/Http/Controllers/Farmasi/DataBarangController.php:12
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
* @see \App\Http\Controllers\Farmasi\DataBarangController::dataObat
* @see app/Http/Controllers/Farmasi/DataBarangController.php:12
* @route '/farmasi/data-obat'
*/
dataObat.url = (options?: RouteQueryOptions) => {
    return dataObat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::dataObat
* @see app/Http/Controllers/Farmasi/DataBarangController.php:12
* @route '/farmasi/data-obat'
*/
dataObat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataObat.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::dataObat
* @see app/Http/Controllers/Farmasi/DataBarangController.php:12
* @route '/farmasi/data-obat'
*/
dataObat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dataObat.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::setHargaObat
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:18
* @route '/farmasi/set-harga-obat'
*/
export const setHargaObat = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: setHargaObat.url(options),
    method: 'get',
})

setHargaObat.definition = {
    methods: ["get","head"],
    url: '/farmasi/set-harga-obat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::setHargaObat
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:18
* @route '/farmasi/set-harga-obat'
*/
setHargaObat.url = (options?: RouteQueryOptions) => {
    return setHargaObat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::setHargaObat
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:18
* @route '/farmasi/set-harga-obat'
*/
setHargaObat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: setHargaObat.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::setHargaObat
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:18
* @route '/farmasi/set-harga-obat'
*/
setHargaObat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: setHargaObat.url(options),
    method: 'head',
})

const farmasi = {
    index: Object.assign(index, index),
    dashboard: Object.assign(dashboard, dashboard),
    pembelianObat: Object.assign(pembelianObat, pembelianObat),
    penjualanObat: Object.assign(penjualanObat, penjualanObat),
    resepObat: Object.assign(resepObat, resepObat),
    riwayatTransaksiGudang: Object.assign(riwayatTransaksiGudang, riwayatTransaksiGudang),
    stokObat: Object.assign(stokObat, stokObat),
    stokOpname: Object.assign(stokOpname, stokOpname),
    dataObat: Object.assign(dataObat, dataObatF6becc),
    setPenjualanBarang: Object.assign(setPenjualanBarang, setPenjualanBarang),
    setPenjualanUmum: Object.assign(setPenjualanUmum, setPenjualanUmum),
    kategoriObat: Object.assign(kategoriObat, kategoriObat),
    setPenjualan: Object.assign(setPenjualan, setPenjualan),
    setHargaObat: Object.assign(setHargaObat, setHargaObat),
    golonganObat: Object.assign(golonganObat, golonganObat),
    industriFarmasi: Object.assign(industriFarmasi, industriFarmasi),
    datasuplier: Object.assign(datasuplier, datasuplier),
    supplier: Object.assign(supplier, supplier),
    satuanBarang: Object.assign(satuanBarang, satuanBarang),
    metodeRacik: Object.assign(metodeRacik, metodeRacik),
    konversiSatuan: Object.assign(konversiSatuan, konversiSatuan),
    jenisObat: Object.assign(jenisObat, jenisObat),
}

export default farmasi