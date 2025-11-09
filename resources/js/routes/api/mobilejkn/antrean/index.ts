import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\MobileJknController::add
* @see app/Http/Controllers/Pcare/MobileJknController.php:90
* @route '/api/mobilejkn/antrean/add'
*/
export const add = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: add.url(options),
    method: 'post',
})

add.definition = {
    methods: ["post"],
    url: '/api/mobilejkn/antrean/add',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::add
* @see app/Http/Controllers/Pcare/MobileJknController.php:90
* @route '/api/mobilejkn/antrean/add'
*/
add.url = (options?: RouteQueryOptions) => {
    return add.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::add
* @see app/Http/Controllers/Pcare/MobileJknController.php:90
* @route '/api/mobilejkn/antrean/add'
*/
add.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: add.url(options),
    method: 'post',
})

const antrean = {
    add: Object.assign(add, add),
}

export default antrean