import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\JurnalController::page
* @see app/Http/Controllers/Akutansi/JurnalController.php:102
* @route '/akutansi/setoran-bank'
*/
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/akutansi/setoran-bank',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::page
* @see app/Http/Controllers/Akutansi/JurnalController.php:102
* @route '/akutansi/setoran-bank'
*/
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::page
* @see app/Http/Controllers/Akutansi/JurnalController.php:102
* @route '/akutansi/setoran-bank'
*/
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::page
* @see app/Http/Controllers/Akutansi/JurnalController.php:102
* @route '/akutansi/setoran-bank'
*/
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})

const setoranBank = {
    page: Object.assign(page, page),
}

export default setoranBank