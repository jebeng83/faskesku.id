import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Alergi\AlergiController::index
* @see app/Http/Controllers/Alergi/AlergiController.php:190
* @route '/api/alergi/pasien'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/alergi/pasien',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Alergi\AlergiController::index
* @see app/Http/Controllers/Alergi/AlergiController.php:190
* @route '/api/alergi/pasien'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Alergi\AlergiController::index
* @see app/Http/Controllers/Alergi/AlergiController.php:190
* @route '/api/alergi/pasien'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Alergi\AlergiController::index
* @see app/Http/Controllers/Alergi/AlergiController.php:190
* @route '/api/alergi/pasien'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const pasien = {
    index: Object.assign(index, index),
}

export default pasien