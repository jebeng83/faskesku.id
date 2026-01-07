import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\FastMovingController::data
* @see app/Http/Controllers/Farmasi/FastMovingController.php:11
* @route '/farmasi/obat-fast-moving/data'
*/
export const data = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})

data.definition = {
    methods: ["get","head"],
    url: '/farmasi/obat-fast-moving/data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\FastMovingController::data
* @see app/Http/Controllers/Farmasi/FastMovingController.php:11
* @route '/farmasi/obat-fast-moving/data'
*/
data.url = (options?: RouteQueryOptions) => {
    return data.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\FastMovingController::data
* @see app/Http/Controllers/Farmasi/FastMovingController.php:11
* @route '/farmasi/obat-fast-moving/data'
*/
data.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\FastMovingController::data
* @see app/Http/Controllers/Farmasi/FastMovingController.php:11
* @route '/farmasi/obat-fast-moving/data'
*/
data.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: data.url(options),
    method: 'head',
})

const fastMoving = {
    data: Object.assign(data, data),
}

export default fastMoving