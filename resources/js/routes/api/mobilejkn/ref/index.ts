import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\MobileJknController::poli
* @see app/Http/Controllers/Pcare/MobileJknController.php:33
* @route '/api/mobilejkn/ref/poli'
*/
export const poli = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: poli.url(options),
    method: 'get',
})

poli.definition = {
    methods: ["get","head"],
    url: '/api/mobilejkn/ref/poli',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::poli
* @see app/Http/Controllers/Pcare/MobileJknController.php:33
* @route '/api/mobilejkn/ref/poli'
*/
poli.url = (options?: RouteQueryOptions) => {
    return poli.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::poli
* @see app/Http/Controllers/Pcare/MobileJknController.php:33
* @route '/api/mobilejkn/ref/poli'
*/
poli.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: poli.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::poli
* @see app/Http/Controllers/Pcare/MobileJknController.php:33
* @route '/api/mobilejkn/ref/poli'
*/
poli.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: poli.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::dokter
* @see app/Http/Controllers/Pcare/MobileJknController.php:239
* @route '/api/mobilejkn/ref/dokter'
*/
export const dokter = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dokter.url(options),
    method: 'get',
})

dokter.definition = {
    methods: ["get","head"],
    url: '/api/mobilejkn/ref/dokter',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::dokter
* @see app/Http/Controllers/Pcare/MobileJknController.php:239
* @route '/api/mobilejkn/ref/dokter'
*/
dokter.url = (options?: RouteQueryOptions) => {
    return dokter.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::dokter
* @see app/Http/Controllers/Pcare/MobileJknController.php:239
* @route '/api/mobilejkn/ref/dokter'
*/
dokter.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dokter.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::dokter
* @see app/Http/Controllers/Pcare/MobileJknController.php:239
* @route '/api/mobilejkn/ref/dokter'
*/
dokter.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dokter.url(options),
    method: 'head',
})

const ref = {
    poli: Object.assign(poli, poli),
    dokter: Object.assign(dokter, dokter),
}

export default ref