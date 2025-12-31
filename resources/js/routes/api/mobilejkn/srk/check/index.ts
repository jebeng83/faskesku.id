import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\MobileJknController::test
* @see app/Http/Controllers/Pcare/MobileJknController.php:400
* @route '/api/mobilejkn/srk/check/test'
*/
export const test = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: test.url(options),
    method: 'post',
})

test.definition = {
    methods: ["post"],
    url: '/api/mobilejkn/srk/check/test',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::test
* @see app/Http/Controllers/Pcare/MobileJknController.php:400
* @route '/api/mobilejkn/srk/check/test'
*/
test.url = (options?: RouteQueryOptions) => {
    return test.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::test
* @see app/Http/Controllers/Pcare/MobileJknController.php:400
* @route '/api/mobilejkn/srk/check/test'
*/
test.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: test.url(options),
    method: 'post',
})

const check = {
    test: Object.assign(test, test),
}

export default check