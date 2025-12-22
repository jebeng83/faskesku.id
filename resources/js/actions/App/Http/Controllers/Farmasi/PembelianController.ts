import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\PembelianController::getSupplier
* @see app/Http/Controllers/Farmasi/PembelianController.php:227
* @route '/api/pembelian/supplier'
*/
export const getSupplier = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSupplier.url(options),
    method: 'get',
})

getSupplier.definition = {
    methods: ["get","head"],
    url: '/api/pembelian/supplier',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::getSupplier
* @see app/Http/Controllers/Farmasi/PembelianController.php:227
* @route '/api/pembelian/supplier'
*/
getSupplier.url = (options?: RouteQueryOptions) => {
    return getSupplier.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::getSupplier
* @see app/Http/Controllers/Farmasi/PembelianController.php:227
* @route '/api/pembelian/supplier'
*/
getSupplier.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSupplier.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::getSupplier
* @see app/Http/Controllers/Farmasi/PembelianController.php:227
* @route '/api/pembelian/supplier'
*/
getSupplier.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getSupplier.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::getPetugas
* @see app/Http/Controllers/Farmasi/PembelianController.php:236
* @route '/api/pembelian/petugas'
*/
export const getPetugas = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPetugas.url(options),
    method: 'get',
})

getPetugas.definition = {
    methods: ["get","head"],
    url: '/api/pembelian/petugas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::getPetugas
* @see app/Http/Controllers/Farmasi/PembelianController.php:236
* @route '/api/pembelian/petugas'
*/
getPetugas.url = (options?: RouteQueryOptions) => {
    return getPetugas.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::getPetugas
* @see app/Http/Controllers/Farmasi/PembelianController.php:236
* @route '/api/pembelian/petugas'
*/
getPetugas.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPetugas.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::getPetugas
* @see app/Http/Controllers/Farmasi/PembelianController.php:236
* @route '/api/pembelian/petugas'
*/
getPetugas.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPetugas.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::getLokasi
* @see app/Http/Controllers/Farmasi/PembelianController.php:255
* @route '/api/pembelian/lokasi'
*/
const getLokasi65263a74b31cb9318282fdc634819da4 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getLokasi65263a74b31cb9318282fdc634819da4.url(options),
    method: 'get',
})

getLokasi65263a74b31cb9318282fdc634819da4.definition = {
    methods: ["get","head"],
    url: '/api/pembelian/lokasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::getLokasi
* @see app/Http/Controllers/Farmasi/PembelianController.php:255
* @route '/api/pembelian/lokasi'
*/
getLokasi65263a74b31cb9318282fdc634819da4.url = (options?: RouteQueryOptions) => {
    return getLokasi65263a74b31cb9318282fdc634819da4.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::getLokasi
* @see app/Http/Controllers/Farmasi/PembelianController.php:255
* @route '/api/pembelian/lokasi'
*/
getLokasi65263a74b31cb9318282fdc634819da4.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getLokasi65263a74b31cb9318282fdc634819da4.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::getLokasi
* @see app/Http/Controllers/Farmasi/PembelianController.php:255
* @route '/api/pembelian/lokasi'
*/
getLokasi65263a74b31cb9318282fdc634819da4.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getLokasi65263a74b31cb9318282fdc634819da4.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::getLokasi
* @see app/Http/Controllers/Farmasi/PembelianController.php:255
* @route '/farmasi/pembelian/lokasi'
*/
const getLokasi4d4d49e8d2114820ee465a06833077b2 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getLokasi4d4d49e8d2114820ee465a06833077b2.url(options),
    method: 'get',
})

getLokasi4d4d49e8d2114820ee465a06833077b2.definition = {
    methods: ["get","head"],
    url: '/farmasi/pembelian/lokasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::getLokasi
* @see app/Http/Controllers/Farmasi/PembelianController.php:255
* @route '/farmasi/pembelian/lokasi'
*/
getLokasi4d4d49e8d2114820ee465a06833077b2.url = (options?: RouteQueryOptions) => {
    return getLokasi4d4d49e8d2114820ee465a06833077b2.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::getLokasi
* @see app/Http/Controllers/Farmasi/PembelianController.php:255
* @route '/farmasi/pembelian/lokasi'
*/
getLokasi4d4d49e8d2114820ee465a06833077b2.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getLokasi4d4d49e8d2114820ee465a06833077b2.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::getLokasi
* @see app/Http/Controllers/Farmasi/PembelianController.php:255
* @route '/farmasi/pembelian/lokasi'
*/
getLokasi4d4d49e8d2114820ee465a06833077b2.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getLokasi4d4d49e8d2114820ee465a06833077b2.url(options),
    method: 'head',
})

export const getLokasi = {
    '/api/pembelian/lokasi': getLokasi65263a74b31cb9318282fdc634819da4,
    '/farmasi/pembelian/lokasi': getLokasi4d4d49e8d2114820ee465a06833077b2,
}

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::getAkunBayar
* @see app/Http/Controllers/Farmasi/PembelianController.php:217
* @route '/api/pembelian/akun-bayar'
*/
const getAkunBayarfd25e9c5ce60dcdc38ecdf8637ec4307 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAkunBayarfd25e9c5ce60dcdc38ecdf8637ec4307.url(options),
    method: 'get',
})

getAkunBayarfd25e9c5ce60dcdc38ecdf8637ec4307.definition = {
    methods: ["get","head"],
    url: '/api/pembelian/akun-bayar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::getAkunBayar
* @see app/Http/Controllers/Farmasi/PembelianController.php:217
* @route '/api/pembelian/akun-bayar'
*/
getAkunBayarfd25e9c5ce60dcdc38ecdf8637ec4307.url = (options?: RouteQueryOptions) => {
    return getAkunBayarfd25e9c5ce60dcdc38ecdf8637ec4307.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::getAkunBayar
* @see app/Http/Controllers/Farmasi/PembelianController.php:217
* @route '/api/pembelian/akun-bayar'
*/
getAkunBayarfd25e9c5ce60dcdc38ecdf8637ec4307.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAkunBayarfd25e9c5ce60dcdc38ecdf8637ec4307.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::getAkunBayar
* @see app/Http/Controllers/Farmasi/PembelianController.php:217
* @route '/api/pembelian/akun-bayar'
*/
getAkunBayarfd25e9c5ce60dcdc38ecdf8637ec4307.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getAkunBayarfd25e9c5ce60dcdc38ecdf8637ec4307.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::getAkunBayar
* @see app/Http/Controllers/Farmasi/PembelianController.php:217
* @route '/farmasi/akun-bayar'
*/
const getAkunBayar7767c09a74857cc0f95acf66324c41be = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAkunBayar7767c09a74857cc0f95acf66324c41be.url(options),
    method: 'get',
})

getAkunBayar7767c09a74857cc0f95acf66324c41be.definition = {
    methods: ["get","head"],
    url: '/farmasi/akun-bayar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::getAkunBayar
* @see app/Http/Controllers/Farmasi/PembelianController.php:217
* @route '/farmasi/akun-bayar'
*/
getAkunBayar7767c09a74857cc0f95acf66324c41be.url = (options?: RouteQueryOptions) => {
    return getAkunBayar7767c09a74857cc0f95acf66324c41be.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::getAkunBayar
* @see app/Http/Controllers/Farmasi/PembelianController.php:217
* @route '/farmasi/akun-bayar'
*/
getAkunBayar7767c09a74857cc0f95acf66324c41be.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAkunBayar7767c09a74857cc0f95acf66324c41be.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::getAkunBayar
* @see app/Http/Controllers/Farmasi/PembelianController.php:217
* @route '/farmasi/akun-bayar'
*/
getAkunBayar7767c09a74857cc0f95acf66324c41be.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getAkunBayar7767c09a74857cc0f95acf66324c41be.url(options),
    method: 'head',
})

export const getAkunBayar = {
    '/api/pembelian/akun-bayar': getAkunBayarfd25e9c5ce60dcdc38ecdf8637ec4307,
    '/farmasi/akun-bayar': getAkunBayar7767c09a74857cc0f95acf66324c41be,
}

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::generateNoFaktur
* @see app/Http/Controllers/Farmasi/PembelianController.php:264
* @route '/api/pembelian/generate-no-faktur'
*/
export const generateNoFaktur = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateNoFaktur.url(options),
    method: 'get',
})

generateNoFaktur.definition = {
    methods: ["get","head"],
    url: '/api/pembelian/generate-no-faktur',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::generateNoFaktur
* @see app/Http/Controllers/Farmasi/PembelianController.php:264
* @route '/api/pembelian/generate-no-faktur'
*/
generateNoFaktur.url = (options?: RouteQueryOptions) => {
    return generateNoFaktur.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::generateNoFaktur
* @see app/Http/Controllers/Farmasi/PembelianController.php:264
* @route '/api/pembelian/generate-no-faktur'
*/
generateNoFaktur.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateNoFaktur.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::generateNoFaktur
* @see app/Http/Controllers/Farmasi/PembelianController.php:264
* @route '/api/pembelian/generate-no-faktur'
*/
generateNoFaktur.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: generateNoFaktur.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::store
* @see app/Http/Controllers/Farmasi/PembelianController.php:14
* @route '/api/pembelian/store'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/pembelian/store',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::store
* @see app/Http/Controllers/Farmasi/PembelianController.php:14
* @route '/api/pembelian/store'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::store
* @see app/Http/Controllers/Farmasi/PembelianController.php:14
* @route '/api/pembelian/store'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const PembelianController = { getSupplier, getPetugas, getLokasi, getAkunBayar, generateNoFaktur, store }

export default PembelianController