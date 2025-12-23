import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\BillingController::page
 * @see app/Http/Controllers/Akutansi/BillingController.php:39
 * @route '/akutansi/billing-ranap'
 */
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/akutansi/billing-ranap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\BillingController::page
 * @see app/Http/Controllers/Akutansi/BillingController.php:39
 * @route '/akutansi/billing-ranap'
 */
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\BillingController::page
 * @see app/Http/Controllers/Akutansi/BillingController.php:39
 * @route '/akutansi/billing-ranap'
 */
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Akutansi\BillingController::page
 * @see app/Http/Controllers/Akutansi/BillingController.php:39
 * @route '/akutansi/billing-ranap'
 */
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})
const billingRanap = {
    page: Object.assign(page, page),
}

export default billingRanap