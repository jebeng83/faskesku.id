import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\SirkulasiObatController::index
* @see app/Http/Controllers/Farmasi/SirkulasiObatController.php:11
* @route '/api/inventori/sirkulasi-barang'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/inventori/sirkulasi-barang',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\SirkulasiObatController::index
* @see app/Http/Controllers/Farmasi/SirkulasiObatController.php:11
* @route '/api/inventori/sirkulasi-barang'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SirkulasiObatController::index
* @see app/Http/Controllers/Farmasi/SirkulasiObatController.php:11
* @route '/api/inventori/sirkulasi-barang'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\SirkulasiObatController::index
* @see app/Http/Controllers/Farmasi/SirkulasiObatController.php:11
* @route '/api/inventori/sirkulasi-barang'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const SirkulasiObatController = { index }

export default SirkulasiObatController