import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\BarangController::search
* @see app/Http/Controllers/BarangController.php:10
* @route '/api/permissions/barang/search'
*/
const search870e7b539c54c3556dd73f767a47caac = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search870e7b539c54c3556dd73f767a47caac.url(options),
    method: 'get',
})

search870e7b539c54c3556dd73f767a47caac.definition = {
    methods: ["get","head"],
    url: '/api/permissions/barang/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BarangController::search
* @see app/Http/Controllers/BarangController.php:10
* @route '/api/permissions/barang/search'
*/
search870e7b539c54c3556dd73f767a47caac.url = (options?: RouteQueryOptions) => {
    return search870e7b539c54c3556dd73f767a47caac.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BarangController::search
* @see app/Http/Controllers/BarangController.php:10
* @route '/api/permissions/barang/search'
*/
search870e7b539c54c3556dd73f767a47caac.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search870e7b539c54c3556dd73f767a47caac.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BarangController::search
* @see app/Http/Controllers/BarangController.php:10
* @route '/api/permissions/barang/search'
*/
search870e7b539c54c3556dd73f767a47caac.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search870e7b539c54c3556dd73f767a47caac.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\BarangController::search
* @see app/Http/Controllers/BarangController.php:10
* @route '/api/barang/search'
*/
const searchdd9ec3dca37824cc7ab5e816d1864587 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchdd9ec3dca37824cc7ab5e816d1864587.url(options),
    method: 'get',
})

searchdd9ec3dca37824cc7ab5e816d1864587.definition = {
    methods: ["get","head"],
    url: '/api/barang/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BarangController::search
* @see app/Http/Controllers/BarangController.php:10
* @route '/api/barang/search'
*/
searchdd9ec3dca37824cc7ab5e816d1864587.url = (options?: RouteQueryOptions) => {
    return searchdd9ec3dca37824cc7ab5e816d1864587.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BarangController::search
* @see app/Http/Controllers/BarangController.php:10
* @route '/api/barang/search'
*/
searchdd9ec3dca37824cc7ab5e816d1864587.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchdd9ec3dca37824cc7ab5e816d1864587.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BarangController::search
* @see app/Http/Controllers/BarangController.php:10
* @route '/api/barang/search'
*/
searchdd9ec3dca37824cc7ab5e816d1864587.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: searchdd9ec3dca37824cc7ab5e816d1864587.url(options),
    method: 'head',
})

export const search = {
    '/api/permissions/barang/search': search870e7b539c54c3556dd73f767a47caac,
    '/api/barang/search': searchdd9ec3dca37824cc7ab5e816d1864587,
}

const BarangController = { search }

export default BarangController