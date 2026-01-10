import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\RawatJalan\ResepController::publicMethod
* @see app/Http/Controllers/RawatJalan/ResepController.php:1161
* @route '/api/aturan-pakai/public-store'
*/
export const publicMethod = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: publicMethod.url(options),
    method: 'post',
})

publicMethod.definition = {
    methods: ["post"],
    url: '/api/aturan-pakai/public-store',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::publicMethod
* @see app/Http/Controllers/RawatJalan/ResepController.php:1161
* @route '/api/aturan-pakai/public-store'
*/
publicMethod.url = (options?: RouteQueryOptions) => {
    return publicMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::publicMethod
* @see app/Http/Controllers/RawatJalan/ResepController.php:1161
* @route '/api/aturan-pakai/public-store'
*/
publicMethod.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: publicMethod.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::alt
* @see app/Http/Controllers/RawatJalan/ResepController.php:1161
* @route '/api/aturan-pakai/store'
*/
export const alt = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: alt.url(options),
    method: 'post',
})

alt.definition = {
    methods: ["post"],
    url: '/api/aturan-pakai/store',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::alt
* @see app/Http/Controllers/RawatJalan/ResepController.php:1161
* @route '/api/aturan-pakai/store'
*/
alt.url = (options?: RouteQueryOptions) => {
    return alt.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::alt
* @see app/Http/Controllers/RawatJalan/ResepController.php:1161
* @route '/api/aturan-pakai/store'
*/
alt.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: alt.url(options),
    method: 'post',
})

const store = {
    alt: Object.assign(alt, alt),
}

export default store