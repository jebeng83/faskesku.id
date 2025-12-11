import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Kepegawaian\SttsWpController::store
 * @see app/Http/Controllers/Kepegawaian/SttsWpController.php:15
 * @route '/stts-wp'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/stts-wp',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Kepegawaian\SttsWpController::store
 * @see app/Http/Controllers/Kepegawaian/SttsWpController.php:15
 * @route '/stts-wp'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Kepegawaian\SttsWpController::store
 * @see app/Http/Controllers/Kepegawaian/SttsWpController.php:15
 * @route '/stts-wp'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})
const SttsWpController = { store }

export default SttsWpController