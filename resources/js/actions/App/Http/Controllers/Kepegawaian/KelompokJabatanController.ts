import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Kepegawaian\KelompokJabatanController::store
 * @see app/Http/Controllers/Kepegawaian/KelompokJabatanController.php:51
 * @route '/kelompok-jabatan'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/kelompok-jabatan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Kepegawaian\KelompokJabatanController::store
 * @see app/Http/Controllers/Kepegawaian/KelompokJabatanController.php:51
 * @route '/kelompok-jabatan'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Kepegawaian\KelompokJabatanController::store
 * @see app/Http/Controllers/Kepegawaian/KelompokJabatanController.php:51
 * @route '/kelompok-jabatan'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})
const KelompokJabatanController = { store }

export default KelompokJabatanController