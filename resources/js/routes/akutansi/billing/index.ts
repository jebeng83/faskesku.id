import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\BillingController::page
* @see app/Http/Controllers/Akutansi/BillingController.php:19
* @route '/akutansi/billing'
*/
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/akutansi/billing',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\BillingController::page
* @see app/Http/Controllers/Akutansi/BillingController.php:19
* @route '/akutansi/billing'
*/
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\BillingController::page
* @see app/Http/Controllers/Akutansi/BillingController.php:19
* @route '/akutansi/billing'
*/
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\BillingController::page
* @see app/Http/Controllers/Akutansi/BillingController.php:19
* @route '/akutansi/billing'
*/
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})

const billing = {
    page: Object.assign(page, page),
}

export default billing