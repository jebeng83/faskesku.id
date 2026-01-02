import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\MobileJknController::test
* @see app/Http/Controllers/Pcare/MobileJknController.php:703
* @route '/api/mobilejkn/antrean/panggil/test'
*/
export const test = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: test.url(options),
    method: 'post',
})

test.definition = {
    methods: ["post"],
    url: '/api/mobilejkn/antrean/panggil/test',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::test
* @see app/Http/Controllers/Pcare/MobileJknController.php:703
* @route '/api/mobilejkn/antrean/panggil/test'
*/
test.url = (options?: RouteQueryOptions) => {
    return test.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::test
* @see app/Http/Controllers/Pcare/MobileJknController.php:703
* @route '/api/mobilejkn/antrean/panggil/test'
*/
test.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: test.url(options),
    method: 'post',
})

const panggil = {
    test: Object.assign(test, test),
}

export default panggil