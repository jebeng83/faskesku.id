import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\JurnalController::page
 * @see app/Http/Controllers/Akutansi/JurnalController.php:96
 * @route '/akutansi/jurnal-penutup'
 */
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/akutansi/jurnal-penutup',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::page
 * @see app/Http/Controllers/Akutansi/JurnalController.php:96
 * @route '/akutansi/jurnal-penutup'
 */
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::page
 * @see app/Http/Controllers/Akutansi/JurnalController.php:96
 * @route '/akutansi/jurnal-penutup'
 */
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Akutansi\JurnalController::page
 * @see app/Http/Controllers/Akutansi/JurnalController.php:96
 * @route '/akutansi/jurnal-penutup'
 */
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})
const jurnalPenutup = {
    page: Object.assign(page, page),
}

export default jurnalPenutup