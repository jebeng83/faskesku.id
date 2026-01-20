import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\API\KamarInapController::store
* @see app/Http/Controllers/API/KamarInapController.php:12
* @route '/api/kamar-inap'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/kamar-inap',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\API\KamarInapController::store
* @see app/Http/Controllers/API/KamarInapController.php:12
* @route '/api/kamar-inap'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\KamarInapController::store
* @see app/Http/Controllers/API/KamarInapController.php:12
* @route '/api/kamar-inap'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const KamarInapController = { store }

export default KamarInapController