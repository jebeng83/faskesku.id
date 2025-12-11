import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Pasien\SukuBangsaController::store
* @see app/Http/Controllers/Pasien/SukuBangsaController.php:13
* @route '/suku-bangsa'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/suku-bangsa',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pasien\SukuBangsaController::store
* @see app/Http/Controllers/Pasien/SukuBangsaController.php:13
* @route '/suku-bangsa'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pasien\SukuBangsaController::store
* @see app/Http/Controllers/Pasien/SukuBangsaController.php:13
* @route '/suku-bangsa'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const sukuBangsa = {
    store: Object.assign(store, store),
}

export default sukuBangsa