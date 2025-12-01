import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Kepegawaian\ResikoKerjaController::store
* @see app/Http/Controllers/Kepegawaian/ResikoKerjaController.php:51
* @route '/resiko-kerja'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/resiko-kerja',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Kepegawaian\ResikoKerjaController::store
* @see app/Http/Controllers/Kepegawaian/ResikoKerjaController.php:51
* @route '/resiko-kerja'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Kepegawaian\ResikoKerjaController::store
* @see app/Http/Controllers/Kepegawaian/ResikoKerjaController.php:51
* @route '/resiko-kerja'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const ResikoKerjaController = { store }

export default ResikoKerjaController