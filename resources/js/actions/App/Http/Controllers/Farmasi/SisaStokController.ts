import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\SisaStokController::index
* @see app/Http/Controllers/Farmasi/SisaStokController.php:10
* @route '/api/inventori/sisa-stok'
*/
const index3a388aa6bd235ae7eac332fd4d6d4868 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index3a388aa6bd235ae7eac332fd4d6d4868.url(options),
    method: 'get',
})

index3a388aa6bd235ae7eac332fd4d6d4868.definition = {
    methods: ["get","head"],
    url: '/api/inventori/sisa-stok',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\SisaStokController::index
* @see app/Http/Controllers/Farmasi/SisaStokController.php:10
* @route '/api/inventori/sisa-stok'
*/
index3a388aa6bd235ae7eac332fd4d6d4868.url = (options?: RouteQueryOptions) => {
    return index3a388aa6bd235ae7eac332fd4d6d4868.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SisaStokController::index
* @see app/Http/Controllers/Farmasi/SisaStokController.php:10
* @route '/api/inventori/sisa-stok'
*/
index3a388aa6bd235ae7eac332fd4d6d4868.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index3a388aa6bd235ae7eac332fd4d6d4868.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\SisaStokController::index
* @see app/Http/Controllers/Farmasi/SisaStokController.php:10
* @route '/api/inventori/sisa-stok'
*/
index3a388aa6bd235ae7eac332fd4d6d4868.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index3a388aa6bd235ae7eac332fd4d6d4868.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\SisaStokController::index
* @see app/Http/Controllers/Farmasi/SisaStokController.php:10
* @route '/farmasi/sisa-stok/data'
*/
const indexf41d88bafbcf1ea7289b35d3af03df0d = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexf41d88bafbcf1ea7289b35d3af03df0d.url(options),
    method: 'get',
})

indexf41d88bafbcf1ea7289b35d3af03df0d.definition = {
    methods: ["get","head"],
    url: '/farmasi/sisa-stok/data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\SisaStokController::index
* @see app/Http/Controllers/Farmasi/SisaStokController.php:10
* @route '/farmasi/sisa-stok/data'
*/
indexf41d88bafbcf1ea7289b35d3af03df0d.url = (options?: RouteQueryOptions) => {
    return indexf41d88bafbcf1ea7289b35d3af03df0d.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SisaStokController::index
* @see app/Http/Controllers/Farmasi/SisaStokController.php:10
* @route '/farmasi/sisa-stok/data'
*/
indexf41d88bafbcf1ea7289b35d3af03df0d.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexf41d88bafbcf1ea7289b35d3af03df0d.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\SisaStokController::index
* @see app/Http/Controllers/Farmasi/SisaStokController.php:10
* @route '/farmasi/sisa-stok/data'
*/
indexf41d88bafbcf1ea7289b35d3af03df0d.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexf41d88bafbcf1ea7289b35d3af03df0d.url(options),
    method: 'head',
})

export const index = {
    '/api/inventori/sisa-stok': index3a388aa6bd235ae7eac332fd4d6d4868,
    '/farmasi/sisa-stok/data': indexf41d88bafbcf1ea7289b35d3af03df0d,
}

const SisaStokController = { index }

export default SisaStokController