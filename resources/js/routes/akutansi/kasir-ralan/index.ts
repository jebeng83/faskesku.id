import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\BillingController::page
* @see app/Http/Controllers/Akutansi/BillingController.php:41
* @route '/akutansi/kasir-ralan'
*/
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/akutansi/kasir-ralan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\BillingController::page
* @see app/Http/Controllers/Akutansi/BillingController.php:41
* @route '/akutansi/kasir-ralan'
*/
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\BillingController::page
* @see app/Http/Controllers/Akutansi/BillingController.php:41
* @route '/akutansi/kasir-ralan'
*/
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\BillingController::page
* @see app/Http/Controllers/Akutansi/BillingController.php:41
* @route '/akutansi/kasir-ralan'
*/
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})

const kasirRalan = {
    page: Object.assign(page, page),
}

export default kasirRalan