import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::search
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:718
* @route '/pegawai/search'
*/
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/pegawai/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::search
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:718
* @route '/pegawai/search'
*/
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::search
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:718
* @route '/pegawai/search'
*/
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::search
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:718
* @route '/pegawai/search'
*/
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})

const pegawai = {
    search: Object.assign(search, search),
}

export default pegawai