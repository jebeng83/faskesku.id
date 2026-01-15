import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::show
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1217
* @route '/surat-sehat'
*/
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/surat-sehat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::show
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1217
* @route '/surat-sehat'
*/
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::show
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1217
* @route '/surat-sehat'
*/
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::show
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1217
* @route '/surat-sehat'
*/
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

const suratSehat = {
    show: Object.assign(show, show),
}

export default suratSehat