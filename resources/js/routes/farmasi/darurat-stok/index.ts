import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\DaruratStokController::data
* @see app/Http/Controllers/Farmasi/DaruratStokController.php:10
* @route '/farmasi/darurat-stok/data'
*/
export const data = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})

data.definition = {
    methods: ["get","head"],
    url: '/farmasi/darurat-stok/data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\DaruratStokController::data
* @see app/Http/Controllers/Farmasi/DaruratStokController.php:10
* @route '/farmasi/darurat-stok/data'
*/
data.url = (options?: RouteQueryOptions) => {
    return data.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\DaruratStokController::data
* @see app/Http/Controllers/Farmasi/DaruratStokController.php:10
* @route '/farmasi/darurat-stok/data'
*/
data.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\DaruratStokController::data
* @see app/Http/Controllers/Farmasi/DaruratStokController.php:10
* @route '/farmasi/darurat-stok/data'
*/
data.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: data.url(options),
    method: 'head',
})

const daruratStok = {
    data: Object.assign(data, data),
}

export default daruratStok