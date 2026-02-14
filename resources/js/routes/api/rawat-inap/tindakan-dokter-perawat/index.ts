import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RawatInapController::store
* @see app/Http/Controllers/RawatInapController.php:963
* @route '/api/rawat-inap/tindakan-dokter-perawat'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/rawat-inap/tindakan-dokter-perawat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatInapController::store
* @see app/Http/Controllers/RawatInapController.php:963
* @route '/api/rawat-inap/tindakan-dokter-perawat'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::store
* @see app/Http/Controllers/RawatInapController.php:963
* @route '/api/rawat-inap/tindakan-dokter-perawat'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const tindakanDokterPerawat = {
    store: Object.assign(store, store),
}

export default tindakanDokterPerawat