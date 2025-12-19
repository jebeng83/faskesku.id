import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\DaruratStokController::index
* @see app/Http/Controllers/Farmasi/DaruratStokController.php:10
* @route '/api/inventori/darurat-stok'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/inventori/darurat-stok',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\DaruratStokController::index
* @see app/Http/Controllers/Farmasi/DaruratStokController.php:10
* @route '/api/inventori/darurat-stok'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\DaruratStokController::index
* @see app/Http/Controllers/Farmasi/DaruratStokController.php:10
* @route '/api/inventori/darurat-stok'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\DaruratStokController::index
* @see app/Http/Controllers/Farmasi/DaruratStokController.php:10
* @route '/api/inventori/darurat-stok'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const DaruratStokController = { index }

export default DaruratStokController