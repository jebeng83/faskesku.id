import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\SirkulasiObatController::data
* @see app/Http/Controllers/Farmasi/SirkulasiObatController.php:11
* @route '/farmasi/sirkulasi-obat/data'
*/
export const data = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})

data.definition = {
    methods: ["get","head"],
    url: '/farmasi/sirkulasi-obat/data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\SirkulasiObatController::data
* @see app/Http/Controllers/Farmasi/SirkulasiObatController.php:11
* @route '/farmasi/sirkulasi-obat/data'
*/
data.url = (options?: RouteQueryOptions) => {
    return data.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SirkulasiObatController::data
* @see app/Http/Controllers/Farmasi/SirkulasiObatController.php:11
* @route '/farmasi/sirkulasi-obat/data'
*/
data.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\SirkulasiObatController::data
* @see app/Http/Controllers/Farmasi/SirkulasiObatController.php:11
* @route '/farmasi/sirkulasi-obat/data'
*/
data.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: data.url(options),
    method: 'head',
})

const sirkulasiObat = {
    data: Object.assign(data, data),
}

export default sirkulasiObat