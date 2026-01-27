import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import publicMethod from './public'
import resep from './resep'
import pcare from './pcare'
import icare from './icare'
import rawatJalan from './rawat-jalan'
import queue from './queue'
import poli from './poli'
import employees from './employees'
import penjab from './penjab'
import pasien from './pasien'
import permissions from './permissions'
import regPeriksaD17f92 from './reg-periksa'
import kamarInap from './kamar-inap'
import users from './users'
import menus from './menus'
import obat from './obat'
import sdki from './sdki'
import kategoriSdki from './kategori-sdki'
import subkategoriSdki from './subkategori-sdki'
import keluhanSubyektif from './keluhan-subyektif'
import dataObyektif from './data-obyektif'
import odontogram from './odontogram'
import whatsapp from './whatsapp'
import messages from './messages'
import dokter from './dokter'
import alergi from './alergi'
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
import satusehat from './satusehat'
import mobilejkn from './mobilejkn'
import jadwal from './jadwal'
import v1 from './v1'
import poliklinik from './poliklinik'
import bangsal from './bangsal'
import kamar from './kamar'
import akutansi from './akutansi'
import paymentPoint from './payment-point'
import antrianPoli2d4a79 from './antrian-poli'
import menu from './menu'
import tarifTindakan from './tarif-tindakan'
/**
* @see \App\Http\Controllers\PermintaanLabController::regPeriksa
* @see app/Http/Controllers/PermintaanLabController.php:1004
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
* @see app/Http/Controllers/PermintaanLabController.php:1004
* @route '/api/reg-periksa'
*/
regPeriksa.url = (options?: RouteQueryOptions) => {
    return regPeriksa.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::regPeriksa
* @see app/Http/Controllers/PermintaanLabController.php:1004
* @route '/api/reg-periksa'
*/
regPeriksa.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: regPeriksa.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::regPeriksa
* @see app/Http/Controllers/PermintaanLabController.php:1004
* @route '/api/reg-periksa'
*/
regPeriksa.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: regPeriksa.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::labTests
* @see app/Http/Controllers/PermintaanLabController.php:1270
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
* @see app/Http/Controllers/PermintaanLabController.php:1270
* @route '/api/lab-tests'
*/
labTests.url = (options?: RouteQueryOptions) => {
    return labTests.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::labTests
* @see app/Http/Controllers/PermintaanLabController.php:1270
* @route '/api/lab-tests'
*/
labTests.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: labTests.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::labTests
* @see app/Http/Controllers/PermintaanLabController.php:1270
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

/**
* @see routes/web.php:437
* @route '/api/antrian-poli'
*/
export const antrianPoli = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: antrianPoli.url(options),
    method: 'get',
})

antrianPoli.definition = {
    methods: ["get","head"],
    url: '/api/antrian-poli',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:437
* @route '/api/antrian-poli'
*/
antrianPoli.url = (options?: RouteQueryOptions) => {
    return antrianPoli.definition.url + queryParams(options)
}

/**
* @see routes/web.php:437
* @route '/api/antrian-poli'
*/
antrianPoli.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: antrianPoli.url(options),
    method: 'get',
})

/**
* @see routes/web.php:437
* @route '/api/antrian-poli'
*/
antrianPoli.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: antrianPoli.url(options),
    method: 'head',
})

const api = {
    public: Object.assign(publicMethod, publicMethod),
    resep: Object.assign(resep, resep),
    pcare: Object.assign(pcare, pcare),
    icare: Object.assign(icare, icare),
    rawatJalan: Object.assign(rawatJalan, rawatJalan),
    queue: Object.assign(queue, queue),
    poli: Object.assign(poli, poli),
    employees: Object.assign(employees, employees),
    penjab: Object.assign(penjab, penjab),
    pasien: Object.assign(pasien, pasien),
    permissions: Object.assign(permissions, permissions),
    regPeriksa: Object.assign(regPeriksa, regPeriksaD17f92),
    kamarInap: Object.assign(kamarInap, kamarInap),
    users: Object.assign(users, users),
    menus: Object.assign(menus, menus),
    obat: Object.assign(obat, obat),
    sdki: Object.assign(sdki, sdki),
    kategoriSdki: Object.assign(kategoriSdki, kategoriSdki),
    subkategoriSdki: Object.assign(subkategoriSdki, subkategoriSdki),
    keluhanSubyektif: Object.assign(keluhanSubyektif, keluhanSubyektif),
    dataObyektif: Object.assign(dataObyektif, dataObyektif),
    odontogram: Object.assign(odontogram, odontogram),
    whatsapp: Object.assign(whatsapp, whatsapp),
    messages: Object.assign(messages, messages),
    dokter: Object.assign(dokter, dokter),
    alergi: Object.assign(alergi, alergi),
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
    satusehat: Object.assign(satusehat, satusehat),
    mobilejkn: Object.assign(mobilejkn, mobilejkn),
    jadwal: Object.assign(jadwal, jadwal),
    v1: Object.assign(v1, v1),
    poliklinik: Object.assign(poliklinik, poliklinik),
    bangsal: Object.assign(bangsal, bangsal),
    kamar: Object.assign(kamar, kamar),
    akutansi: Object.assign(akutansi, akutansi),
    paymentPoint: Object.assign(paymentPoint, paymentPoint),
    antrianPoli: Object.assign(antrianPoli, antrianPoli2d4a79),
    menu: Object.assign(menu, menu),
    tarifTindakan: Object.assign(tarifTindakan, tarifTindakan),
}

export default api