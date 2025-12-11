import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Kepegawaian\BankController::store
* @see app/Http/Controllers/Kepegawaian/BankController.php:15
* @route '/bank'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/bank',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Kepegawaian\BankController::store
* @see app/Http/Controllers/Kepegawaian/BankController.php:15
* @route '/bank'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Kepegawaian\BankController::store
* @see app/Http/Controllers/Kepegawaian/BankController.php:15
* @route '/bank'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const bank = {
    store: Object.assign(store, store),
}

export default bank