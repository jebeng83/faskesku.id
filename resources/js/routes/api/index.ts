import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import employees from './employees'
import penjab from './penjab'
import wilayah from './wilayah'
import permissions from './permissions'
import regPeriksaD17f92 from './reg-periksa'
import users from './users'
import menus from './menus'
import obat from './obat'
import resep from './resep'
import dokter from './dokter'
import permintaanLab from './permintaan-lab'
import radiologiTests from './radiologi-tests'
import permintaanRadiologi from './permintaan-radiologi'
import tarifTindakan from './tarif-tindakan'
/**
* @see \App\Http\Controllers\PermintaanLabController::regPeriksa
* @see app/Http/Controllers/PermintaanLabController.php:287
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
* @see app/Http/Controllers/PermintaanLabController.php:287
* @route '/api/reg-periksa'
*/
regPeriksa.url = (options?: RouteQueryOptions) => {
    return regPeriksa.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::regPeriksa
* @see app/Http/Controllers/PermintaanLabController.php:287
* @route '/api/reg-periksa'
*/
regPeriksa.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: regPeriksa.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::regPeriksa
* @see app/Http/Controllers/PermintaanLabController.php:287
* @route '/api/reg-periksa'
*/
regPeriksa.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: regPeriksa.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\GenerateNoRawatController::generateNoRawat
* @see app/Http/Controllers/API/GenerateNoRawatController.php:18
* @route '/api/generate-no-rawat'
*/
export const generateNoRawat = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generateNoRawat.url(options),
    method: 'post',
})

generateNoRawat.definition = {
    methods: ["post"],
    url: '/api/generate-no-rawat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\API\GenerateNoRawatController::generateNoRawat
* @see app/Http/Controllers/API/GenerateNoRawatController.php:18
* @route '/api/generate-no-rawat'
*/
generateNoRawat.url = (options?: RouteQueryOptions) => {
    return generateNoRawat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\GenerateNoRawatController::generateNoRawat
* @see app/Http/Controllers/API/GenerateNoRawatController.php:18
* @route '/api/generate-no-rawat'
*/
generateNoRawat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generateNoRawat.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\API\GenerateNoRawatController::reserveNoRawat
* @see app/Http/Controllers/API/GenerateNoRawatController.php:152
* @route '/api/generate-no-rawat/reserve'
*/
export const reserveNoRawat = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reserveNoRawat.url(options),
    method: 'post',
})

reserveNoRawat.definition = {
    methods: ["post"],
    url: '/api/generate-no-rawat/reserve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\API\GenerateNoRawatController::reserveNoRawat
* @see app/Http/Controllers/API/GenerateNoRawatController.php:152
* @route '/api/generate-no-rawat/reserve'
*/
reserveNoRawat.url = (options?: RouteQueryOptions) => {
    return reserveNoRawat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\GenerateNoRawatController::reserveNoRawat
* @see app/Http/Controllers/API/GenerateNoRawatController.php:152
* @route '/api/generate-no-rawat/reserve'
*/
reserveNoRawat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reserveNoRawat.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\API\GenerateNoRawatController::releaseNoRawat
* @see app/Http/Controllers/API/GenerateNoRawatController.php:235
* @route '/api/generate-no-rawat/release'
*/
export const releaseNoRawat = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: releaseNoRawat.url(options),
    method: 'post',
})

releaseNoRawat.definition = {
    methods: ["post"],
    url: '/api/generate-no-rawat/release',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\API\GenerateNoRawatController::releaseNoRawat
* @see app/Http/Controllers/API/GenerateNoRawatController.php:235
* @route '/api/generate-no-rawat/release'
*/
releaseNoRawat.url = (options?: RouteQueryOptions) => {
    return releaseNoRawat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\GenerateNoRawatController::releaseNoRawat
* @see app/Http/Controllers/API/GenerateNoRawatController.php:235
* @route '/api/generate-no-rawat/release'
*/
releaseNoRawat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: releaseNoRawat.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::labTests
* @see app/Http/Controllers/PermintaanLabController.php:380
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
* @see app/Http/Controllers/PermintaanLabController.php:380
* @route '/api/lab-tests'
*/
labTests.url = (options?: RouteQueryOptions) => {
    return labTests.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::labTests
* @see app/Http/Controllers/PermintaanLabController.php:380
* @route '/api/lab-tests'
*/
labTests.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: labTests.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::labTests
* @see app/Http/Controllers/PermintaanLabController.php:380
* @route '/api/lab-tests'
*/
labTests.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: labTests.url(options),
    method: 'head',
})

const api = {
    employees: Object.assign(employees, employees),
    penjab: Object.assign(penjab, penjab),
    wilayah: Object.assign(wilayah, wilayah),
    permissions: Object.assign(permissions, permissions),
    regPeriksa: Object.assign(regPeriksa, regPeriksaD17f92),
    generateNoRawat: Object.assign(generateNoRawat, generateNoRawat),
    reserveNoRawat: Object.assign(reserveNoRawat, reserveNoRawat),
    releaseNoRawat: Object.assign(releaseNoRawat, releaseNoRawat),
    users: Object.assign(users, users),
    menus: Object.assign(menus, menus),
    obat: Object.assign(obat, obat),
    resep: Object.assign(resep, resep),
    dokter: Object.assign(dokter, dokter),
    labTests: Object.assign(labTests, labTests),
    permintaanLab: Object.assign(permintaanLab, permintaanLab),
    radiologiTests: Object.assign(radiologiTests, radiologiTests),
    permintaanRadiologi: Object.assign(permintaanRadiologi, permintaanRadiologi),
    tarifTindakan: Object.assign(tarifTindakan, tarifTindakan),
}

export default api