import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\BukuBesarController::page
* @see app/Http/Controllers/Akutansi/BukuBesarController.php:17
* @route '/akutansi/buku-besar'
*/
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/akutansi/buku-besar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\BukuBesarController::page
* @see app/Http/Controllers/Akutansi/BukuBesarController.php:17
* @route '/akutansi/buku-besar'
*/
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\BukuBesarController::page
* @see app/Http/Controllers/Akutansi/BukuBesarController.php:17
* @route '/akutansi/buku-besar'
*/
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\BukuBesarController::page
* @see app/Http/Controllers/Akutansi/BukuBesarController.php:17
* @route '/akutansi/buku-besar'
*/
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})

const bukuBesar = {
    page: Object.assign(page, page),
}

export default bukuBesar