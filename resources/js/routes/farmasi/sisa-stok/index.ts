import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\SisaStokController::data
* @see app/Http/Controllers/Farmasi/SisaStokController.php:10
* @route '/farmasi/sisa-stok/data'
*/
export const data = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})

data.definition = {
    methods: ["get","head"],
    url: '/farmasi/sisa-stok/data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\SisaStokController::data
* @see app/Http/Controllers/Farmasi/SisaStokController.php:10
* @route '/farmasi/sisa-stok/data'
*/
data.url = (options?: RouteQueryOptions) => {
    return data.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SisaStokController::data
* @see app/Http/Controllers/Farmasi/SisaStokController.php:10
* @route '/farmasi/sisa-stok/data'
*/
data.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\SisaStokController::data
* @see app/Http/Controllers/Farmasi/SisaStokController.php:10
* @route '/farmasi/sisa-stok/data'
*/
data.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: data.url(options),
    method: 'head',
})

const sisaStok = {
    data: Object.assign(data, data),
}

export default sisaStok