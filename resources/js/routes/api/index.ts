import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import pembelian from './pembelian'
import gudangbarang from './gudangbarang'
import opname from './opname'
import riwayatTransaksiGudang92a0ae from './riwayat-transaksi-gudang'
import databarang from './databarang'
/**
* @see \App\Http\Controllers\SettingController::activeSetting
* @see app/Http/Controllers/SettingController.php:307
* @route '/api/active-setting'
*/
export const activeSetting = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: activeSetting.url(options),
    method: 'get',
})

activeSetting.definition = {
    methods: ["get","head"],
    url: '/api/active-setting',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingController::activeSetting
* @see app/Http/Controllers/SettingController.php:307
* @route '/api/active-setting'
*/
activeSetting.url = (options?: RouteQueryOptions) => {
    return activeSetting.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::activeSetting
* @see app/Http/Controllers/SettingController.php:307
* @route '/api/active-setting'
*/
activeSetting.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: activeSetting.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SettingController::activeSetting
* @see app/Http/Controllers/SettingController.php:307
* @route '/api/active-setting'
*/
activeSetting.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: activeSetting.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SetHargaObatController::setHargaObat
* @see app/Http/Controllers/SetHargaObatController.php:92
* @route '/api/set-harga-obat'
*/
export const setHargaObat = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: setHargaObat.url(options),
    method: 'get',
})

setHargaObat.definition = {
    methods: ["get","head"],
    url: '/api/set-harga-obat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SetHargaObatController::setHargaObat
* @see app/Http/Controllers/SetHargaObatController.php:92
* @route '/api/set-harga-obat'
*/
setHargaObat.url = (options?: RouteQueryOptions) => {
    return setHargaObat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SetHargaObatController::setHargaObat
* @see app/Http/Controllers/SetHargaObatController.php:92
* @route '/api/set-harga-obat'
*/
setHargaObat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: setHargaObat.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SetHargaObatController::setHargaObat
* @see app/Http/Controllers/SetHargaObatController.php:92
* @route '/api/set-harga-obat'
*/
setHargaObat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: setHargaObat.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RiwayatTransaksiGudangBarangController::riwayatTransaksiGudang
* @see app/Http/Controllers/RiwayatTransaksiGudangBarangController.php:52
* @route '/api/riwayat-transaksi-gudang'
*/
export const riwayatTransaksiGudang = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: riwayatTransaksiGudang.url(options),
    method: 'get',
})

riwayatTransaksiGudang.definition = {
    methods: ["get","head"],
    url: '/api/riwayat-transaksi-gudang',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RiwayatTransaksiGudangBarangController::riwayatTransaksiGudang
* @see app/Http/Controllers/RiwayatTransaksiGudangBarangController.php:52
* @route '/api/riwayat-transaksi-gudang'
*/
riwayatTransaksiGudang.url = (options?: RouteQueryOptions) => {
    return riwayatTransaksiGudang.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RiwayatTransaksiGudangBarangController::riwayatTransaksiGudang
* @see app/Http/Controllers/RiwayatTransaksiGudangBarangController.php:52
* @route '/api/riwayat-transaksi-gudang'
*/
riwayatTransaksiGudang.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: riwayatTransaksiGudang.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RiwayatTransaksiGudangBarangController::riwayatTransaksiGudang
* @see app/Http/Controllers/RiwayatTransaksiGudangBarangController.php:52
* @route '/api/riwayat-transaksi-gudang'
*/
riwayatTransaksiGudang.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: riwayatTransaksiGudang.url(options),
    method: 'head',
})

const api = {
    activeSetting: Object.assign(activeSetting, activeSetting),
    setHargaObat: Object.assign(setHargaObat, setHargaObat),
    pembelian: Object.assign(pembelian, pembelian),
    gudangbarang: Object.assign(gudangbarang, gudangbarang),
    opname: Object.assign(opname, opname),
    riwayatTransaksiGudang: Object.assign(riwayatTransaksiGudang, riwayatTransaksiGudang92a0ae),
    databarang: Object.assign(databarang, databarang),
}

export default api