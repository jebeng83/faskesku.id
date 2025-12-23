import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\NotaJalanController::page
 * @see app/Http/Controllers/Akutansi/NotaJalanController.php:23
 * @route '/akutansi/nota-jalan'
 */
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/akutansi/nota-jalan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\NotaJalanController::page
 * @see app/Http/Controllers/Akutansi/NotaJalanController.php:23
 * @route '/akutansi/nota-jalan'
 */
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\NotaJalanController::page
 * @see app/Http/Controllers/Akutansi/NotaJalanController.php:23
 * @route '/akutansi/nota-jalan'
 */
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Akutansi\NotaJalanController::page
 * @see app/Http/Controllers/Akutansi/NotaJalanController.php:23
 * @route '/akutansi/nota-jalan'
 */
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})
const notaJalan = {
    page: Object.assign(page, page),
}

export default notaJalan