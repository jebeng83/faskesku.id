import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Kepegawaian\BidangController::store
 * @see app/Http/Controllers/Kepegawaian/BidangController.php:15
 * @route '/bidang'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/bidang',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Kepegawaian\BidangController::store
 * @see app/Http/Controllers/Kepegawaian/BidangController.php:15
 * @route '/bidang'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Kepegawaian\BidangController::store
 * @see app/Http/Controllers/Kepegawaian/BidangController.php:15
 * @route '/bidang'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})
const BidangController = { store }

export default BidangController