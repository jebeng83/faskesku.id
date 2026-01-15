import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::store
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2136
* @route '/rawat-jalan/validasi-ttd'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/rawat-jalan/validasi-ttd',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::store
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2136
* @route '/rawat-jalan/validasi-ttd'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::store
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2136
* @route '/rawat-jalan/validasi-ttd'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::describe
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2252
* @route '/rawat-jalan/validasi-ttd/describe'
*/
export const describe = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: describe.url(options),
    method: 'get',
})

describe.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/validasi-ttd/describe',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::describe
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2252
* @route '/rawat-jalan/validasi-ttd/describe'
*/
describe.url = (options?: RouteQueryOptions) => {
    return describe.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::describe
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2252
* @route '/rawat-jalan/validasi-ttd/describe'
*/
describe.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: describe.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::describe
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2252
* @route '/rawat-jalan/validasi-ttd/describe'
*/
describe.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: describe.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::find
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2267
* @route '/rawat-jalan/validasi-ttd/find'
*/
export const find = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: find.url(options),
    method: 'get',
})

find.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/validasi-ttd/find',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::find
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2267
* @route '/rawat-jalan/validasi-ttd/find'
*/
find.url = (options?: RouteQueryOptions) => {
    return find.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::find
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2267
* @route '/rawat-jalan/validasi-ttd/find'
*/
find.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: find.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::find
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2267
* @route '/rawat-jalan/validasi-ttd/find'
*/
find.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: find.url(options),
    method: 'head',
})

const validasiTtd = {
    store: Object.assign(store, store),
    describe: Object.assign(describe, describe),
    find: Object.assign(find, find),
}

export default validasiTtd