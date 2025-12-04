import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\PembelianController::supplier
* @see app/Http/Controllers/Farmasi/PembelianController.php:150
* @route '/api/pembelian/supplier'
*/
export const supplier = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: supplier.url(options),
    method: 'get',
})

supplier.definition = {
    methods: ["get","head"],
    url: '/api/pembelian/supplier',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::supplier
* @see app/Http/Controllers/Farmasi/PembelianController.php:150
* @route '/api/pembelian/supplier'
*/
supplier.url = (options?: RouteQueryOptions) => {
    return supplier.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::supplier
* @see app/Http/Controllers/Farmasi/PembelianController.php:150
* @route '/api/pembelian/supplier'
*/
supplier.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: supplier.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::supplier
* @see app/Http/Controllers/Farmasi/PembelianController.php:150
* @route '/api/pembelian/supplier'
*/
supplier.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: supplier.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::petugas
* @see app/Http/Controllers/Farmasi/PembelianController.php:159
* @route '/api/pembelian/petugas'
*/
export const petugas = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: petugas.url(options),
    method: 'get',
})

petugas.definition = {
    methods: ["get","head"],
    url: '/api/pembelian/petugas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::petugas
* @see app/Http/Controllers/Farmasi/PembelianController.php:159
* @route '/api/pembelian/petugas'
*/
petugas.url = (options?: RouteQueryOptions) => {
    return petugas.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::petugas
* @see app/Http/Controllers/Farmasi/PembelianController.php:159
* @route '/api/pembelian/petugas'
*/
petugas.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: petugas.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::petugas
* @see app/Http/Controllers/Farmasi/PembelianController.php:159
* @route '/api/pembelian/petugas'
*/
petugas.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: petugas.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::lokasi
* @see app/Http/Controllers/Farmasi/PembelianController.php:178
* @route '/api/pembelian/lokasi'
*/
export const lokasi = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lokasi.url(options),
    method: 'get',
})

lokasi.definition = {
    methods: ["get","head"],
    url: '/api/pembelian/lokasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::lokasi
* @see app/Http/Controllers/Farmasi/PembelianController.php:178
* @route '/api/pembelian/lokasi'
*/
lokasi.url = (options?: RouteQueryOptions) => {
    return lokasi.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::lokasi
* @see app/Http/Controllers/Farmasi/PembelianController.php:178
* @route '/api/pembelian/lokasi'
*/
lokasi.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lokasi.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::lokasi
* @see app/Http/Controllers/Farmasi/PembelianController.php:178
* @route '/api/pembelian/lokasi'
*/
lokasi.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lokasi.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::akunBayar
* @see app/Http/Controllers/Farmasi/PembelianController.php:140
* @route '/api/pembelian/akun-bayar'
*/
export const akunBayar = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: akunBayar.url(options),
    method: 'get',
})

akunBayar.definition = {
    methods: ["get","head"],
    url: '/api/pembelian/akun-bayar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::akunBayar
* @see app/Http/Controllers/Farmasi/PembelianController.php:140
* @route '/api/pembelian/akun-bayar'
*/
akunBayar.url = (options?: RouteQueryOptions) => {
    return akunBayar.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::akunBayar
* @see app/Http/Controllers/Farmasi/PembelianController.php:140
* @route '/api/pembelian/akun-bayar'
*/
akunBayar.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: akunBayar.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::akunBayar
* @see app/Http/Controllers/Farmasi/PembelianController.php:140
* @route '/api/pembelian/akun-bayar'
*/
akunBayar.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: akunBayar.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::generateNoFaktur
* @see app/Http/Controllers/Farmasi/PembelianController.php:187
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
* @see app/Http/Controllers/Farmasi/PembelianController.php:187
* @route '/api/pembelian/generate-no-faktur'
*/
generateNoFaktur.url = (options?: RouteQueryOptions) => {
    return generateNoFaktur.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::generateNoFaktur
* @see app/Http/Controllers/Farmasi/PembelianController.php:187
* @route '/api/pembelian/generate-no-faktur'
*/
generateNoFaktur.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateNoFaktur.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::generateNoFaktur
* @see app/Http/Controllers/Farmasi/PembelianController.php:187
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

const pembelian = {
    supplier: Object.assign(supplier, supplier),
    petugas: Object.assign(petugas, petugas),
    lokasi: Object.assign(lokasi, lokasi),
    akunBayar: Object.assign(akunBayar, akunBayar),
    generateNoFaktur: Object.assign(generateNoFaktur, generateNoFaktur),
    store: Object.assign(store, store),
}

export default pembelian