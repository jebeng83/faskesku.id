import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Kepegawaian\SttsKerjaController::store
* @see app/Http/Controllers/Kepegawaian/SttsKerjaController.php:15
* @route '/stts-kerja'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/stts-kerja',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Kepegawaian\SttsKerjaController::store
* @see app/Http/Controllers/Kepegawaian/SttsKerjaController.php:15
* @route '/stts-kerja'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Kepegawaian\SttsKerjaController::store
* @see app/Http/Controllers/Kepegawaian/SttsKerjaController.php:15
* @route '/stts-kerja'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const sttsKerja = {
    store: Object.assign(store, store),
}

export default sttsKerja