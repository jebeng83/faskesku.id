import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\SisaStokController::index
 * @see app/Http/Controllers/Farmasi/SisaStokController.php:10
 * @route '/api/inventori/sisa-stok'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/inventori/sisa-stok',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\SisaStokController::index
 * @see app/Http/Controllers/Farmasi/SisaStokController.php:10
 * @route '/api/inventori/sisa-stok'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SisaStokController::index
 * @see app/Http/Controllers/Farmasi/SisaStokController.php:10
 * @route '/api/inventori/sisa-stok'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Farmasi\SisaStokController::index
 * @see app/Http/Controllers/Farmasi/SisaStokController.php:10
 * @route '/api/inventori/sisa-stok'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})
const SisaStokController = { index }

export default SisaStokController