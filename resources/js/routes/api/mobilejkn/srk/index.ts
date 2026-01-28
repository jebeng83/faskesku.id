import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
import check4ef2d3 from './check'
/**
* @see \App\Http\Controllers\Pcare\MobileJknController::check
* @see app/Http/Controllers/Pcare/MobileJknController.php:415
* @route '/api/mobilejkn/srk/check'
*/
export const check = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: check.url(options),
    method: 'post',
})

check.definition = {
    methods: ["post"],
    url: '/api/mobilejkn/srk/check',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::check
* @see app/Http/Controllers/Pcare/MobileJknController.php:415
* @route '/api/mobilejkn/srk/check'
*/
check.url = (options?: RouteQueryOptions) => {
    return check.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::check
* @see app/Http/Controllers/Pcare/MobileJknController.php:415
* @route '/api/mobilejkn/srk/check'
*/
check.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: check.url(options),
    method: 'post',
})

const srk = {
    check: Object.assign(check, check4ef2d3),
}

export default srk