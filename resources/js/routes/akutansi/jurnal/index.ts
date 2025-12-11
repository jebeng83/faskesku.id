import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\JurnalController::page
* @see app/Http/Controllers/Akutansi/JurnalController.php:80
* @route '/akutansi/jurnal'
*/
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/akutansi/jurnal',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::page
* @see app/Http/Controllers/Akutansi/JurnalController.php:80
* @route '/akutansi/jurnal'
*/
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::page
* @see app/Http/Controllers/Akutansi/JurnalController.php:80
* @route '/akutansi/jurnal'
*/
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::page
* @see app/Http/Controllers/Akutansi/JurnalController.php:80
* @route '/akutansi/jurnal'
*/
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})

const jurnal = {
    page: Object.assign(page, page),
}

export default jurnal