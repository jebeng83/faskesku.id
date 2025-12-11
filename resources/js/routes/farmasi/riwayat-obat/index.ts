import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\RiwayatObatController::store
* @see app/Http/Controllers/Farmasi/RiwayatObatController.php:11
* @route '/farmasi/riwayat-obat'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/farmasi/riwayat-obat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Farmasi\RiwayatObatController::store
* @see app/Http/Controllers/Farmasi/RiwayatObatController.php:11
* @route '/farmasi/riwayat-obat'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\RiwayatObatController::store
* @see app/Http/Controllers/Farmasi/RiwayatObatController.php:11
* @route '/farmasi/riwayat-obat'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const riwayatObat = {
    store: Object.assign(store, store),
}

export default riwayatObat