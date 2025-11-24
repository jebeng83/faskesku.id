import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\CashFlowController::index
* @see app/Http/Controllers/Akutansi/CashFlowController.php:29
* @route '/api/akutansi/cashflow'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/cashflow',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\CashFlowController::index
* @see app/Http/Controllers/Akutansi/CashFlowController.php:29
* @route '/api/akutansi/cashflow'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\CashFlowController::index
* @see app/Http/Controllers/Akutansi/CashFlowController.php:29
* @route '/api/akutansi/cashflow'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\CashFlowController::index
* @see app/Http/Controllers/Akutansi/CashFlowController.php:29
* @route '/api/akutansi/cashflow'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const cashflow = {
    index: Object.assign(index, index),
}

export default cashflow