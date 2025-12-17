import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Kepegawaian\PendidikanController::store
 * @see app/Http/Controllers/Kepegawaian/PendidikanController.php:15
 * @route '/pendidikan'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/pendidikan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Kepegawaian\PendidikanController::store
 * @see app/Http/Controllers/Kepegawaian/PendidikanController.php:15
 * @route '/pendidikan'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Kepegawaian\PendidikanController::store
 * @see app/Http/Controllers/Kepegawaian/PendidikanController.php:15
 * @route '/pendidikan'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})
const pendidikan = {
    store: Object.assign(store, store),
}

export default pendidikan