import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\PemesananController::generateNoOrder
* @see app/Http/Controllers/Farmasi/PemesananController.php:72
* @route '/api/pemesanan/generate-no-order'
*/
export const generateNoOrder = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateNoOrder.url(options),
    method: 'get',
})

generateNoOrder.definition = {
    methods: ["get","head"],
    url: '/api/pemesanan/generate-no-order',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\PemesananController::generateNoOrder
* @see app/Http/Controllers/Farmasi/PemesananController.php:72
* @route '/api/pemesanan/generate-no-order'
*/
generateNoOrder.url = (options?: RouteQueryOptions) => {
    return generateNoOrder.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PemesananController::generateNoOrder
* @see app/Http/Controllers/Farmasi/PemesananController.php:72
* @route '/api/pemesanan/generate-no-order'
*/
generateNoOrder.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateNoOrder.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\PemesananController::generateNoOrder
* @see app/Http/Controllers/Farmasi/PemesananController.php:72
* @route '/api/pemesanan/generate-no-order'
*/
generateNoOrder.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: generateNoOrder.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\PemesananController::store
* @see app/Http/Controllers/Farmasi/PemesananController.php:12
* @route '/api/pemesanan/store'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/pemesanan/store',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Farmasi\PemesananController::store
* @see app/Http/Controllers/Farmasi/PemesananController.php:12
* @route '/api/pemesanan/store'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PemesananController::store
* @see app/Http/Controllers/Farmasi/PemesananController.php:12
* @route '/api/pemesanan/store'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const PemesananController = { generateNoOrder, store }

export default PemesananController