import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pasien\BahasaPasienController::store
* @see app/Http/Controllers/Pasien/BahasaPasienController.php:13
* @route '/bahasa-pasien'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/bahasa-pasien',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pasien\BahasaPasienController::store
* @see app/Http/Controllers/Pasien/BahasaPasienController.php:13
* @route '/bahasa-pasien'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pasien\BahasaPasienController::store
* @see app/Http/Controllers/Pasien/BahasaPasienController.php:13
* @route '/bahasa-pasien'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const BahasaPasienController = { store }

export default BahasaPasienController