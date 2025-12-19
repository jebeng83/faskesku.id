import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\BillingController::index
* @see app/Http/Controllers/Akutansi/BillingController.php:564
* @route '/api/akutansi/billing-ranap'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/billing-ranap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\BillingController::index
* @see app/Http/Controllers/Akutansi/BillingController.php:564
* @route '/api/akutansi/billing-ranap'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\BillingController::index
* @see app/Http/Controllers/Akutansi/BillingController.php:564
* @route '/api/akutansi/billing-ranap'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\BillingController::index
* @see app/Http/Controllers/Akutansi/BillingController.php:564
* @route '/api/akutansi/billing-ranap'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const billingRanap = {
    index: Object.assign(index, index),
}

export default billingRanap