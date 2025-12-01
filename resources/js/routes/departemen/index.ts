import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
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

const departemen = {
    store: Object.assign(store, store),
}

export default departemen