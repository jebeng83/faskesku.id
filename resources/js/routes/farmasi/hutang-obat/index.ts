import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\PemesananController::data
* @see app/Http/Controllers/Farmasi/PemesananController.php:12
* @route '/farmasi/hutang-obat/data'
*/
export const data = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})

data.definition = {
    methods: ["get","head"],
    url: '/farmasi/hutang-obat/data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\PemesananController::data
* @see app/Http/Controllers/Farmasi/PemesananController.php:12
* @route '/farmasi/hutang-obat/data'
*/
data.url = (options?: RouteQueryOptions) => {
    return data.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PemesananController::data
* @see app/Http/Controllers/Farmasi/PemesananController.php:12
* @route '/farmasi/hutang-obat/data'
*/
data.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\PemesananController::data
* @see app/Http/Controllers/Farmasi/PemesananController.php:12
* @route '/farmasi/hutang-obat/data'
*/
data.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: data.url(options),
    method: 'head',
})

const hutangObat = {
    data: Object.assign(data, data),
}

export default hutangObat