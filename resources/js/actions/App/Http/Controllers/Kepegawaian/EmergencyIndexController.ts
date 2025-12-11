import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Kepegawaian\EmergencyIndexController::store
 * @see app/Http/Controllers/Kepegawaian/EmergencyIndexController.php:15
 * @route '/emergency-index'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/emergency-index',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Kepegawaian\EmergencyIndexController::store
 * @see app/Http/Controllers/Kepegawaian/EmergencyIndexController.php:15
 * @route '/emergency-index'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Kepegawaian\EmergencyIndexController::store
 * @see app/Http/Controllers/Kepegawaian/EmergencyIndexController.php:15
 * @route '/emergency-index'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})
const EmergencyIndexController = { store }

export default EmergencyIndexController