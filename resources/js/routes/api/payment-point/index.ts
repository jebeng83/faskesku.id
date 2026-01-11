import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\PaymentPointController::index
* @see app/Http/Controllers/Akutansi/PaymentPointController.php:42
* @route '/api/payment-point'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/payment-point',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\PaymentPointController::index
* @see app/Http/Controllers/Akutansi/PaymentPointController.php:42
* @route '/api/payment-point'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\PaymentPointController::index
* @see app/Http/Controllers/Akutansi/PaymentPointController.php:42
* @route '/api/payment-point'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\PaymentPointController::index
* @see app/Http/Controllers/Akutansi/PaymentPointController.php:42
* @route '/api/payment-point'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\PaymentPointController::modalAwal
* @see app/Http/Controllers/Akutansi/PaymentPointController.php:152
* @route '/api/payment-point/modal-awal'
*/
export const modalAwal = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: modalAwal.url(options),
    method: 'post',
})

modalAwal.definition = {
    methods: ["post"],
    url: '/api/payment-point/modal-awal',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\PaymentPointController::modalAwal
* @see app/Http/Controllers/Akutansi/PaymentPointController.php:152
* @route '/api/payment-point/modal-awal'
*/
modalAwal.url = (options?: RouteQueryOptions) => {
    return modalAwal.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\PaymentPointController::modalAwal
* @see app/Http/Controllers/Akutansi/PaymentPointController.php:152
* @route '/api/payment-point/modal-awal'
*/
modalAwal.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: modalAwal.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Akutansi\PaymentPointController::report
* @see app/Http/Controllers/Akutansi/PaymentPointController.php:177
* @route '/api/payment-point/report'
*/
export const report = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: report.url(options),
    method: 'get',
})

report.definition = {
    methods: ["get","head"],
    url: '/api/payment-point/report',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\PaymentPointController::report
* @see app/Http/Controllers/Akutansi/PaymentPointController.php:177
* @route '/api/payment-point/report'
*/
report.url = (options?: RouteQueryOptions) => {
    return report.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\PaymentPointController::report
* @see app/Http/Controllers/Akutansi/PaymentPointController.php:177
* @route '/api/payment-point/report'
*/
report.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: report.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\PaymentPointController::report
* @see app/Http/Controllers/Akutansi/PaymentPointController.php:177
* @route '/api/payment-point/report'
*/
report.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: report.url(options),
    method: 'head',
})

const paymentPoint = {
    index: Object.assign(index, index),
    modalAwal: Object.assign(modalAwal, modalAwal),
    report: Object.assign(report, report),
}

export default paymentPoint