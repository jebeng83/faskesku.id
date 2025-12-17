import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\AkunBayarController::page
 * @see app/Http/Controllers/Akutansi/AkunBayarController.php:17
 * @route '/akutansi/akun-bayar'
 */
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/akutansi/akun-bayar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\AkunBayarController::page
 * @see app/Http/Controllers/Akutansi/AkunBayarController.php:17
 * @route '/akutansi/akun-bayar'
 */
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\AkunBayarController::page
 * @see app/Http/Controllers/Akutansi/AkunBayarController.php:17
 * @route '/akutansi/akun-bayar'
 */
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Akutansi\AkunBayarController::page
 * @see app/Http/Controllers/Akutansi/AkunBayarController.php:17
 * @route '/akutansi/akun-bayar'
 */
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})
const akunBayar = {
    page: Object.assign(page, page),
}

export default akunBayar