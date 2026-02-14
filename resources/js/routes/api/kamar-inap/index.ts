import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\API\KamarInapController::store
* @see app/Http/Controllers/API/KamarInapController.php:45
* @route '/api/kamar-inap'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/kamar-inap',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\API\KamarInapController::store
* @see app/Http/Controllers/API/KamarInapController.php:45
* @route '/api/kamar-inap'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\KamarInapController::store
* @see app/Http/Controllers/API/KamarInapController.php:45
* @route '/api/kamar-inap'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\API\KamarInapController::checkout
* @see app/Http/Controllers/API/KamarInapController.php:130
* @route '/api/kamar-inap/checkout'
*/
export const checkout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkout.url(options),
    method: 'post',
})

checkout.definition = {
    methods: ["post"],
    url: '/api/kamar-inap/checkout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\API\KamarInapController::checkout
* @see app/Http/Controllers/API/KamarInapController.php:130
* @route '/api/kamar-inap/checkout'
*/
checkout.url = (options?: RouteQueryOptions) => {
    return checkout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\KamarInapController::checkout
* @see app/Http/Controllers/API/KamarInapController.php:130
* @route '/api/kamar-inap/checkout'
*/
checkout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkout.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\API\KamarInapController::pindah
* @see app/Http/Controllers/API/KamarInapController.php:225
* @route '/api/kamar-inap/pindah'
*/
export const pindah = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pindah.url(options),
    method: 'post',
})

pindah.definition = {
    methods: ["post"],
    url: '/api/kamar-inap/pindah',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\API\KamarInapController::pindah
* @see app/Http/Controllers/API/KamarInapController.php:225
* @route '/api/kamar-inap/pindah'
*/
pindah.url = (options?: RouteQueryOptions) => {
    return pindah.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\KamarInapController::pindah
* @see app/Http/Controllers/API/KamarInapController.php:225
* @route '/api/kamar-inap/pindah'
*/
pindah.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pindah.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\API\KamarInapController::gabung
* @see app/Http/Controllers/API/KamarInapController.php:347
* @route '/api/kamar-inap/gabung'
*/
export const gabung = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: gabung.url(options),
    method: 'post',
})

gabung.definition = {
    methods: ["post"],
    url: '/api/kamar-inap/gabung',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\API\KamarInapController::gabung
* @see app/Http/Controllers/API/KamarInapController.php:347
* @route '/api/kamar-inap/gabung'
*/
gabung.url = (options?: RouteQueryOptions) => {
    return gabung.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\KamarInapController::gabung
* @see app/Http/Controllers/API/KamarInapController.php:347
* @route '/api/kamar-inap/gabung'
*/
gabung.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: gabung.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\API\KamarInapController::hapusDataSalah
* @see app/Http/Controllers/API/KamarInapController.php:431
* @route '/api/kamar-inap/hapus-data-salah'
*/
export const hapusDataSalah = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: hapusDataSalah.url(options),
    method: 'post',
})

hapusDataSalah.definition = {
    methods: ["post"],
    url: '/api/kamar-inap/hapus-data-salah',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\API\KamarInapController::hapusDataSalah
* @see app/Http/Controllers/API/KamarInapController.php:431
* @route '/api/kamar-inap/hapus-data-salah'
*/
hapusDataSalah.url = (options?: RouteQueryOptions) => {
    return hapusDataSalah.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\KamarInapController::hapusDataSalah
* @see app/Http/Controllers/API/KamarInapController.php:431
* @route '/api/kamar-inap/hapus-data-salah'
*/
hapusDataSalah.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: hapusDataSalah.url(options),
    method: 'post',
})

const kamarInap = {
    store: Object.assign(store, store),
    checkout: Object.assign(checkout, checkout),
    pindah: Object.assign(pindah, pindah),
    gabung: Object.assign(gabung, gabung),
    hapusDataSalah: Object.assign(hapusDataSalah, hapusDataSalah),
}

export default kamarInap