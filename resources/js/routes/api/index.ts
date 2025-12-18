import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import wilayah from './wilayah'
import publicMethod from './public'
import employees from './employees'
import penjab from './penjab'
import pasien from './pasien'
import permissions from './permissions'
import regPeriksaD17f92 from './reg-periksa'
import users from './users'
import menus from './menus'
import obat from './obat'
import resep from './resep'
import rawatJalan from './rawat-jalan'
import dokter from './dokter'
import permintaanLab from './permintaan-lab'
import radiologiTests from './radiologi-tests'
import permintaanRadiologi from './permintaan-radiologi'
import opname from './opname'
import pembelian from './pembelian'
import pemesanan from './pemesanan'
import farmasi from './farmasi'
import barang from './barang'
import inventori from './inventori'
import databarang from './databarang'
import gudangbarang from './gudangbarang'
import departemen from './departemen'
import sipPegawai from './sip-pegawai'
import pcare from './pcare'
import satusehat from './satusehat'
import mobilejkn from './mobilejkn'
import jadwal from './jadwal'
import v1 from './v1'
import poliklinik from './poliklinik'
import akutansi from './akutansi'
import menu from './menu'
import tarifTindakan from './tarif-tindakan'
import tarifTindakanRanap from './tarif-tindakan-ranap'
/**
* @see \App\Http\Controllers\PermintaanLabController::regPeriksa
* @see app/Http/Controllers/PermintaanLabController.php:935
* @route '/api/reg-periksa'
*/
export const regPeriksa = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: regPeriksa.url(options),
    method: 'get',
})

regPeriksa.definition = {
    methods: ["get","head"],
    url: '/api/reg-periksa',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::regPeriksa
* @see app/Http/Controllers/PermintaanLabController.php:935
* @route '/api/reg-periksa'
*/
regPeriksa.url = (options?: RouteQueryOptions) => {
    return regPeriksa.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::regPeriksa
* @see app/Http/Controllers/PermintaanLabController.php:935
* @route '/api/reg-periksa'
*/
regPeriksa.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: regPeriksa.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::regPeriksa
* @see app/Http/Controllers/PermintaanLabController.php:935
* @route '/api/reg-periksa'
*/
regPeriksa.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: regPeriksa.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::labTests
* @see app/Http/Controllers/PermintaanLabController.php:1198
* @route '/api/lab-tests'
*/
export const labTests = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: labTests.url(options),
    method: 'get',
})

labTests.definition = {
    methods: ["get","head"],
    url: '/api/lab-tests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::labTests
* @see app/Http/Controllers/PermintaanLabController.php:1198
* @route '/api/lab-tests'
*/
labTests.url = (options?: RouteQueryOptions) => {
    return labTests.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::labTests
* @see app/Http/Controllers/PermintaanLabController.php:1198
* @route '/api/lab-tests'
*/
labTests.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: labTests.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::labTests
* @see app/Http/Controllers/PermintaanLabController.php:1198
* @route '/api/lab-tests'
*/
labTests.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: labTests.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::setHargaObat
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:508
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
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::setHargaObat
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:508
* @route '/api/set-harga-obat'
*/
setHargaObat.url = (options?: RouteQueryOptions) => {
    return setHargaObat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::setHargaObat
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:508
* @route '/api/set-harga-obat'
*/
setHargaObat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: setHargaObat.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::setHargaObat
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:508
* @route '/api/set-harga-obat'
*/
setHargaObat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: setHargaObat.url(options),
    method: 'head',
})

const api = {
    wilayah: Object.assign(wilayah, wilayah),
    public: Object.assign(publicMethod, publicMethod),
    employees: Object.assign(employees, employees),
    penjab: Object.assign(penjab, penjab),
    pasien: Object.assign(pasien, pasien),
    permissions: Object.assign(permissions, permissions),
    regPeriksa: Object.assign(regPeriksa, regPeriksaD17f92),
    users: Object.assign(users, users),
    menus: Object.assign(menus, menus),
    obat: Object.assign(obat, obat),
    resep: Object.assign(resep, resep),
    rawatJalan: Object.assign(rawatJalan, rawatJalan),
    dokter: Object.assign(dokter, dokter),
    labTests: Object.assign(labTests, labTests),
    permintaanLab: Object.assign(permintaanLab, permintaanLab),
    radiologiTests: Object.assign(radiologiTests, radiologiTests),
    permintaanRadiologi: Object.assign(permintaanRadiologi, permintaanRadiologi),
    opname: Object.assign(opname, opname),
    pembelian: Object.assign(pembelian, pembelian),
    pemesanan: Object.assign(pemesanan, pemesanan),
    farmasi: Object.assign(farmasi, farmasi),
    barang: Object.assign(barang, barang),
    inventori: Object.assign(inventori, inventori),
    databarang: Object.assign(databarang, databarang),
    setHargaObat: Object.assign(setHargaObat, setHargaObat),
    gudangbarang: Object.assign(gudangbarang, gudangbarang),
    departemen: Object.assign(departemen, departemen),
    sipPegawai: Object.assign(sipPegawai, sipPegawai),
    pcare: Object.assign(pcare, pcare),
    satusehat: Object.assign(satusehat, satusehat),
    mobilejkn: Object.assign(mobilejkn, mobilejkn),
    jadwal: Object.assign(jadwal, jadwal),
    v1: Object.assign(v1, v1),
    poliklinik: Object.assign(poliklinik, poliklinik),
    akutansi: Object.assign(akutansi, akutansi),
    menu: Object.assign(menu, menu),
    tarifTindakan: Object.assign(tarifTindakan, tarifTindakan),
    tarifTindakanRanap: Object.assign(tarifTindakanRanap, tarifTindakanRanap),
}

export default api