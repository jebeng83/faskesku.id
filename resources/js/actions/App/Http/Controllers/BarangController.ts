import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\BarangController::search
* @see app/Http/Controllers/BarangController.php:10
* @route '/api/barang/search'
*/
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/api/barang/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BarangController::search
* @see app/Http/Controllers/BarangController.php:10
* @route '/api/barang/search'
*/
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BarangController::search
* @see app/Http/Controllers/BarangController.php:10
* @route '/api/barang/search'
*/
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BarangController::search
* @see app/Http/Controllers/BarangController.php:10
* @route '/api/barang/search'
*/
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})

const BarangController = { search }

export default BarangController