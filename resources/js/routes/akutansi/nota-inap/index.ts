import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\NotaInapController::page
* @see app/Http/Controllers/Akutansi/NotaInapController.php:15
* @route '/akutansi/nota-inap'
*/
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/akutansi/nota-inap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\NotaInapController::page
* @see app/Http/Controllers/Akutansi/NotaInapController.php:15
* @route '/akutansi/nota-inap'
*/
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\NotaInapController::page
* @see app/Http/Controllers/Akutansi/NotaInapController.php:15
* @route '/akutansi/nota-inap'
*/
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\NotaInapController::page
* @see app/Http/Controllers/Akutansi/NotaInapController.php:15
* @route '/akutansi/nota-inap'
*/
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})

const notaInap = {
    page: Object.assign(page, page),
}

export default notaInap