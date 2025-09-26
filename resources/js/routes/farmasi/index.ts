import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\DataBarangController::index
* @see app/Http/Controllers/DataBarangController.php:18
* @route '/farmasi'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/farmasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DataBarangController::index
* @see app/Http/Controllers/DataBarangController.php:18
* @route '/farmasi'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataBarangController::index
* @see app/Http/Controllers/DataBarangController.php:18
* @route '/farmasi'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DataBarangController::index
* @see app/Http/Controllers/DataBarangController.php:18
* @route '/farmasi'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see routes/web.php:133
* @route '/farmasi/dashboard'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/farmasi/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:133
* @route '/farmasi/dashboard'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see routes/web.php:133
* @route '/farmasi/dashboard'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see routes/web.php:133
* @route '/farmasi/dashboard'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

const farmasi = {
    index: Object.assign(index, index),
    dashboard: Object.assign(dashboard, dashboard),
}

export default farmasi