import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\PcareController::test
* @see app/Http/Controllers/Pcare/PcareController.php:3349
* @route '/pcare/api/srk/rekap/test'
*/
export const test = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: test.url(options),
    method: 'get',
})

test.definition = {
    methods: ["get","head"],
    url: '/pcare/api/srk/rekap/test',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::test
* @see app/Http/Controllers/Pcare/PcareController.php:3349
* @route '/pcare/api/srk/rekap/test'
*/
test.url = (options?: RouteQueryOptions) => {
    return test.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::test
* @see app/Http/Controllers/Pcare/PcareController.php:3349
* @route '/pcare/api/srk/rekap/test'
*/
test.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: test.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::test
* @see app/Http/Controllers/Pcare/PcareController.php:3349
* @route '/pcare/api/srk/rekap/test'
*/
test.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: test.url(options),
    method: 'head',
})

const api = {
    test: Object.assign(test, test),
}

export default api