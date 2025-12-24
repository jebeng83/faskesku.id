import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\SirkulasiObatController::index
* @see app/Http/Controllers/Farmasi/SirkulasiObatController.php:11
* @route '/api/inventori/sirkulasi-barang'
*/
const indexf3b28efd4b294efe5b1d82909a0020a1 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexf3b28efd4b294efe5b1d82909a0020a1.url(options),
    method: 'get',
})

indexf3b28efd4b294efe5b1d82909a0020a1.definition = {
    methods: ["get","head"],
    url: '/api/inventori/sirkulasi-barang',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\SirkulasiObatController::index
* @see app/Http/Controllers/Farmasi/SirkulasiObatController.php:11
* @route '/api/inventori/sirkulasi-barang'
*/
indexf3b28efd4b294efe5b1d82909a0020a1.url = (options?: RouteQueryOptions) => {
    return indexf3b28efd4b294efe5b1d82909a0020a1.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SirkulasiObatController::index
* @see app/Http/Controllers/Farmasi/SirkulasiObatController.php:11
* @route '/api/inventori/sirkulasi-barang'
*/
indexf3b28efd4b294efe5b1d82909a0020a1.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexf3b28efd4b294efe5b1d82909a0020a1.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Farmasi\SirkulasiObatController::index
* @see app/Http/Controllers/Farmasi/SirkulasiObatController.php:11
* @route '/api/inventori/sirkulasi-barang'
*/
indexf3b28efd4b294efe5b1d82909a0020a1.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexf3b28efd4b294efe5b1d82909a0020a1.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\SirkulasiObatController::index
* @see app/Http/Controllers/Farmasi/SirkulasiObatController.php:11
* @route '/farmasi/sirkulasi-obat/data'
*/
const index7bc9810087aa52bebc478db43c40735e = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index7bc9810087aa52bebc478db43c40735e.url(options),
    method: 'get',
})

index7bc9810087aa52bebc478db43c40735e.definition = {
    methods: ["get","head"],
    url: '/farmasi/sirkulasi-obat/data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\SirkulasiObatController::index
* @see app/Http/Controllers/Farmasi/SirkulasiObatController.php:11
* @route '/farmasi/sirkulasi-obat/data'
*/
index7bc9810087aa52bebc478db43c40735e.url = (options?: RouteQueryOptions) => {
    return index7bc9810087aa52bebc478db43c40735e.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SirkulasiObatController::index
* @see app/Http/Controllers/Farmasi/SirkulasiObatController.php:11
* @route '/farmasi/sirkulasi-obat/data'
*/
index7bc9810087aa52bebc478db43c40735e.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index7bc9810087aa52bebc478db43c40735e.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\SirkulasiObatController::index
* @see app/Http/Controllers/Farmasi/SirkulasiObatController.php:11
* @route '/farmasi/sirkulasi-obat/data'
*/
index7bc9810087aa52bebc478db43c40735e.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index7bc9810087aa52bebc478db43c40735e.url(options),
    method: 'head',
})

export const index = {
    '/api/inventori/sirkulasi-barang': indexf3b28efd4b294efe5b1d82909a0020a1,
    '/farmasi/sirkulasi-obat/data': index7bc9810087aa52bebc478db43c40735e,
}

const SirkulasiObatController = { index }

export default SirkulasiObatController