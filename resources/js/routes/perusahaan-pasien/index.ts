import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Pasien\PerusahaanPasienController::store
* @see app/Http/Controllers/Pasien/PerusahaanPasienController.php:13
* @route '/perusahaan-pasien'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/perusahaan-pasien',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pasien\PerusahaanPasienController::store
* @see app/Http/Controllers/Pasien/PerusahaanPasienController.php:13
* @route '/perusahaan-pasien'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pasien\PerusahaanPasienController::store
* @see app/Http/Controllers/Pasien/PerusahaanPasienController.php:13
* @route '/perusahaan-pasien'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const perusahaanPasien = {
    store: Object.assign(store, store),
}

export default perusahaanPasien