import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Kepegawaian\DepartemenController::index
 * @see app/Http/Controllers/Kepegawaian/DepartemenController.php:20
 * @route '/api/departemen'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/departemen',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Kepegawaian\DepartemenController::index
 * @see app/Http/Controllers/Kepegawaian/DepartemenController.php:20
 * @route '/api/departemen'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Kepegawaian\DepartemenController::index
 * @see app/Http/Controllers/Kepegawaian/DepartemenController.php:20
 * @route '/api/departemen'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Kepegawaian\DepartemenController::index
 * @see app/Http/Controllers/Kepegawaian/DepartemenController.php:20
 * @route '/api/departemen'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Kepegawaian\DepartemenController::store
 * @see app/Http/Controllers/Kepegawaian/DepartemenController.php:50
 * @route '/departemen'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/departemen',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Kepegawaian\DepartemenController::store
 * @see app/Http/Controllers/Kepegawaian/DepartemenController.php:50
 * @route '/departemen'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Kepegawaian\DepartemenController::store
 * @see app/Http/Controllers/Kepegawaian/DepartemenController.php:50
 * @route '/departemen'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})
const DepartemenController = { index, store }

export default DepartemenController