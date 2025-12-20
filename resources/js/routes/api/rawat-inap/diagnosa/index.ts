import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RawatInapController::index
* @see app/Http/Controllers/RawatInapController.php:297
* @route '/api/rawat-inap/diagnosa'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/rawat-inap/diagnosa',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatInapController::index
* @see app/Http/Controllers/RawatInapController.php:297
* @route '/api/rawat-inap/diagnosa'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::index
* @see app/Http/Controllers/RawatInapController.php:297
* @route '/api/rawat-inap/diagnosa'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatInapController::index
* @see app/Http/Controllers/RawatInapController.php:297
* @route '/api/rawat-inap/diagnosa'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatInapController::store
* @see app/Http/Controllers/RawatInapController.php:335
* @route '/api/rawat-inap/diagnosa'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/rawat-inap/diagnosa',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatInapController::store
* @see app/Http/Controllers/RawatInapController.php:335
* @route '/api/rawat-inap/diagnosa'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::store
* @see app/Http/Controllers/RawatInapController.php:335
* @route '/api/rawat-inap/diagnosa'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const diagnosa = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
}

export default diagnosa