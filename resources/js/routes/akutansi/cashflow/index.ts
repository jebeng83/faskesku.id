import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\CashFlowController::page
* @see app/Http/Controllers/Akutansi/CashFlowController.php:19
* @route '/akutansi/cashflow'
*/
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/akutansi/cashflow',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\CashFlowController::page
* @see app/Http/Controllers/Akutansi/CashFlowController.php:19
* @route '/akutansi/cashflow'
*/
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\CashFlowController::page
* @see app/Http/Controllers/Akutansi/CashFlowController.php:19
* @route '/akutansi/cashflow'
*/
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\CashFlowController::page
* @see app/Http/Controllers/Akutansi/CashFlowController.php:19
* @route '/akutansi/cashflow'
*/
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})

const cashflow = {
    page: Object.assign(page, page),
}

export default cashflow