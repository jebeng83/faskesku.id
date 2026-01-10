import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\SuratController::get
* @see app/Http/Controllers/SuratController.php:14
* @route '/surat/pdf'
*/
export const get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: get.url(options),
    method: 'get',
})

get.definition = {
    methods: ["get","head"],
    url: '/surat/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuratController::get
* @see app/Http/Controllers/SuratController.php:14
* @route '/surat/pdf'
*/
get.url = (options?: RouteQueryOptions) => {
    return get.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuratController::get
* @see app/Http/Controllers/SuratController.php:14
* @route '/surat/pdf'
*/
get.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: get.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SuratController::get
* @see app/Http/Controllers/SuratController.php:14
* @route '/surat/pdf'
*/
get.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: get.url(options),
    method: 'head',
})

const pdf = {
    get: Object.assign(get, get),
}

export default pdf