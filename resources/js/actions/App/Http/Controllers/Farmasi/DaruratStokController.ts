import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\DaruratStokController::index
* @see app/Http/Controllers/Farmasi/DaruratStokController.php:10
* @route '/api/inventori/darurat-stok'
*/
const index04e0ff33e185267996310af6fba9489e = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index04e0ff33e185267996310af6fba9489e.url(options),
    method: 'get',
})

index04e0ff33e185267996310af6fba9489e.definition = {
    methods: ["get","head"],
    url: '/api/inventori/darurat-stok',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\DaruratStokController::index
* @see app/Http/Controllers/Farmasi/DaruratStokController.php:10
* @route '/api/inventori/darurat-stok'
*/
index04e0ff33e185267996310af6fba9489e.url = (options?: RouteQueryOptions) => {
    return index04e0ff33e185267996310af6fba9489e.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\DaruratStokController::index
* @see app/Http/Controllers/Farmasi/DaruratStokController.php:10
* @route '/api/inventori/darurat-stok'
*/
index04e0ff33e185267996310af6fba9489e.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index04e0ff33e185267996310af6fba9489e.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Farmasi\DaruratStokController::index
* @see app/Http/Controllers/Farmasi/DaruratStokController.php:10
* @route '/api/inventori/darurat-stok'
*/
index04e0ff33e185267996310af6fba9489e.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index04e0ff33e185267996310af6fba9489e.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\DaruratStokController::index
* @see app/Http/Controllers/Farmasi/DaruratStokController.php:10
* @route '/farmasi/darurat-stok/data'
*/
const indexd98f3d70e12010461c455a82d6021dde = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexd98f3d70e12010461c455a82d6021dde.url(options),
    method: 'get',
})

indexd98f3d70e12010461c455a82d6021dde.definition = {
    methods: ["get","head"],
    url: '/farmasi/darurat-stok/data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\DaruratStokController::index
* @see app/Http/Controllers/Farmasi/DaruratStokController.php:10
* @route '/farmasi/darurat-stok/data'
*/
indexd98f3d70e12010461c455a82d6021dde.url = (options?: RouteQueryOptions) => {
    return indexd98f3d70e12010461c455a82d6021dde.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\DaruratStokController::index
* @see app/Http/Controllers/Farmasi/DaruratStokController.php:10
* @route '/farmasi/darurat-stok/data'
*/
indexd98f3d70e12010461c455a82d6021dde.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexd98f3d70e12010461c455a82d6021dde.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\DaruratStokController::index
* @see app/Http/Controllers/Farmasi/DaruratStokController.php:10
* @route '/farmasi/darurat-stok/data'
*/
indexd98f3d70e12010461c455a82d6021dde.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexd98f3d70e12010461c455a82d6021dde.url(options),
    method: 'head',
})

export const index = {
    '/api/inventori/darurat-stok': index04e0ff33e185267996310af6fba9489e,
    '/farmasi/darurat-stok/data': indexd98f3d70e12010461c455a82d6021dde,
}

const DaruratStokController = { index }

export default DaruratStokController