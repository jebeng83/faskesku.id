import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\KategoriPemasukanLainController::index
* @see app/Http/Controllers/Akutansi/KategoriPemasukanLainController.php:12
* @route '/api/akutansi/kategori-pemasukan-lain'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/kategori-pemasukan-lain',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\KategoriPemasukanLainController::index
* @see app/Http/Controllers/Akutansi/KategoriPemasukanLainController.php:12
* @route '/api/akutansi/kategori-pemasukan-lain'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\KategoriPemasukanLainController::index
* @see app/Http/Controllers/Akutansi/KategoriPemasukanLainController.php:12
* @route '/api/akutansi/kategori-pemasukan-lain'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\KategoriPemasukanLainController::index
* @see app/Http/Controllers/Akutansi/KategoriPemasukanLainController.php:12
* @route '/api/akutansi/kategori-pemasukan-lain'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\KategoriPemasukanLainController::store
* @see app/Http/Controllers/Akutansi/KategoriPemasukanLainController.php:26
* @route '/api/akutansi/kategori-pemasukan-lain'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/akutansi/kategori-pemasukan-lain',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\KategoriPemasukanLainController::store
* @see app/Http/Controllers/Akutansi/KategoriPemasukanLainController.php:26
* @route '/api/akutansi/kategori-pemasukan-lain'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\KategoriPemasukanLainController::store
* @see app/Http/Controllers/Akutansi/KategoriPemasukanLainController.php:26
* @route '/api/akutansi/kategori-pemasukan-lain'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Akutansi\KategoriPemasukanLainController::generateKode
* @see app/Http/Controllers/Akutansi/KategoriPemasukanLainController.php:69
* @route '/api/akutansi/kategori-pemasukan-lain/generate-kode'
*/
export const generateKode = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateKode.url(options),
    method: 'get',
})

generateKode.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/kategori-pemasukan-lain/generate-kode',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\KategoriPemasukanLainController::generateKode
* @see app/Http/Controllers/Akutansi/KategoriPemasukanLainController.php:69
* @route '/api/akutansi/kategori-pemasukan-lain/generate-kode'
*/
generateKode.url = (options?: RouteQueryOptions) => {
    return generateKode.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\KategoriPemasukanLainController::generateKode
* @see app/Http/Controllers/Akutansi/KategoriPemasukanLainController.php:69
* @route '/api/akutansi/kategori-pemasukan-lain/generate-kode'
*/
generateKode.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateKode.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\KategoriPemasukanLainController::generateKode
* @see app/Http/Controllers/Akutansi/KategoriPemasukanLainController.php:69
* @route '/api/akutansi/kategori-pemasukan-lain/generate-kode'
*/
generateKode.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: generateKode.url(options),
    method: 'head',
})

const KategoriPemasukanLainController = { index, store, generateKode }

export default KategoriPemasukanLainController