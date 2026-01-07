import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\FastMovingController::index
* @see app/Http/Controllers/Farmasi/FastMovingController.php:11
* @route '/farmasi/obat-fast-moving/data'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/farmasi/obat-fast-moving/data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\FastMovingController::index
* @see app/Http/Controllers/Farmasi/FastMovingController.php:11
* @route '/farmasi/obat-fast-moving/data'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\FastMovingController::index
* @see app/Http/Controllers/Farmasi/FastMovingController.php:11
* @route '/farmasi/obat-fast-moving/data'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\FastMovingController::index
* @see app/Http/Controllers/Farmasi/FastMovingController.php:11
* @route '/farmasi/obat-fast-moving/data'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const FastMovingController = { index }

export default FastMovingController