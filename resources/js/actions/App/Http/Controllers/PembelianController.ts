import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PembelianController::getSupplier
* @see app/Http/Controllers/PembelianController.php:25
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
* @see \App\Http\Controllers\PembelianController::getSupplier
* @see app/Http/Controllers/PembelianController.php:25
* @route '/api/pembelian/supplier'
*/
getSupplier.url = (options?: RouteQueryOptions) => {
    return getSupplier.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PembelianController::getSupplier
* @see app/Http/Controllers/PembelianController.php:25
* @route '/api/pembelian/supplier'
*/
getSupplier.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSupplier.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PembelianController::getSupplier
* @see app/Http/Controllers/PembelianController.php:25
* @route '/api/pembelian/supplier'
*/
getSupplier.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getSupplier.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PembelianController::getPetugas
* @see app/Http/Controllers/PembelianController.php:48
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
* @see \App\Http\Controllers\PembelianController::getPetugas
* @see app/Http/Controllers/PembelianController.php:48
* @route '/api/pembelian/petugas'
*/
getPetugas.url = (options?: RouteQueryOptions) => {
    return getPetugas.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PembelianController::getPetugas
* @see app/Http/Controllers/PembelianController.php:48
* @route '/api/pembelian/petugas'
*/
getPetugas.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPetugas.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PembelianController::getPetugas
* @see app/Http/Controllers/PembelianController.php:48
* @route '/api/pembelian/petugas'
*/
getPetugas.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPetugas.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PembelianController::getLokasi
* @see app/Http/Controllers/PembelianController.php:78
* @route '/api/pembelian/lokasi'
*/
export const getLokasi = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getLokasi.url(options),
    method: 'get',
})

getLokasi.definition = {
    methods: ["get","head"],
    url: '/api/pembelian/lokasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PembelianController::getLokasi
* @see app/Http/Controllers/PembelianController.php:78
* @route '/api/pembelian/lokasi'
*/
getLokasi.url = (options?: RouteQueryOptions) => {
    return getLokasi.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PembelianController::getLokasi
* @see app/Http/Controllers/PembelianController.php:78
* @route '/api/pembelian/lokasi'
*/
getLokasi.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getLokasi.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PembelianController::getLokasi
* @see app/Http/Controllers/PembelianController.php:78
* @route '/api/pembelian/lokasi'
*/
getLokasi.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getLokasi.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PembelianController::generateNoFaktur
* @see app/Http/Controllers/PembelianController.php:223
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
* @see \App\Http\Controllers\PembelianController::generateNoFaktur
* @see app/Http/Controllers/PembelianController.php:223
* @route '/api/pembelian/generate-no-faktur'
*/
generateNoFaktur.url = (options?: RouteQueryOptions) => {
    return generateNoFaktur.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PembelianController::generateNoFaktur
* @see app/Http/Controllers/PembelianController.php:223
* @route '/api/pembelian/generate-no-faktur'
*/
generateNoFaktur.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateNoFaktur.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PembelianController::generateNoFaktur
* @see app/Http/Controllers/PembelianController.php:223
* @route '/api/pembelian/generate-no-faktur'
*/
generateNoFaktur.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: generateNoFaktur.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PembelianController::store
* @see app/Http/Controllers/PembelianController.php:101
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
* @see \App\Http\Controllers\PembelianController::store
* @see app/Http/Controllers/PembelianController.php:101
* @route '/api/pembelian/store'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PembelianController::store
* @see app/Http/Controllers/PembelianController.php:101
* @route '/api/pembelian/store'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const PembelianController = { getSupplier, getPetugas, getLokasi, generateNoFaktur, store }

export default PembelianController