import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DataBarangController::index
* @see app/Http/Controllers/DataBarangController.php:18
* @route '/farmasi'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/farmasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DataBarangController::index
* @see app/Http/Controllers/DataBarangController.php:18
* @route '/farmasi'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataBarangController::index
* @see app/Http/Controllers/DataBarangController.php:18
* @route '/farmasi'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DataBarangController::index
* @see app/Http/Controllers/DataBarangController.php:18
* @route '/farmasi'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const DataBarangController = { index }

export default DataBarangController