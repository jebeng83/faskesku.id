import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\API\GenerateNoRawatController::generateNoRawat
* @see app/Http/Controllers/API/GenerateNoRawatController.php:18
* @route '/api/generate-no-rawat'
*/
export const generateNoRawat = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generateNoRawat.url(options),
    method: 'post',
})

generateNoRawat.definition = {
    methods: ["post"],
    url: '/api/generate-no-rawat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\API\GenerateNoRawatController::generateNoRawat
* @see app/Http/Controllers/API/GenerateNoRawatController.php:18
* @route '/api/generate-no-rawat'
*/
generateNoRawat.url = (options?: RouteQueryOptions) => {
    return generateNoRawat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\GenerateNoRawatController::generateNoRawat
* @see app/Http/Controllers/API/GenerateNoRawatController.php:18
* @route '/api/generate-no-rawat'
*/
generateNoRawat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generateNoRawat.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\API\GenerateNoRawatController::reserveNoRawat
* @see app/Http/Controllers/API/GenerateNoRawatController.php:152
* @route '/api/generate-no-rawat/reserve'
*/
export const reserveNoRawat = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reserveNoRawat.url(options),
    method: 'post',
})

reserveNoRawat.definition = {
    methods: ["post"],
    url: '/api/generate-no-rawat/reserve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\API\GenerateNoRawatController::reserveNoRawat
* @see app/Http/Controllers/API/GenerateNoRawatController.php:152
* @route '/api/generate-no-rawat/reserve'
*/
reserveNoRawat.url = (options?: RouteQueryOptions) => {
    return reserveNoRawat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\GenerateNoRawatController::reserveNoRawat
* @see app/Http/Controllers/API/GenerateNoRawatController.php:152
* @route '/api/generate-no-rawat/reserve'
*/
reserveNoRawat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reserveNoRawat.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\API\GenerateNoRawatController::releaseNoRawat
* @see app/Http/Controllers/API/GenerateNoRawatController.php:235
* @route '/api/generate-no-rawat/release'
*/
export const releaseNoRawat = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: releaseNoRawat.url(options),
    method: 'post',
})

releaseNoRawat.definition = {
    methods: ["post"],
    url: '/api/generate-no-rawat/release',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\API\GenerateNoRawatController::releaseNoRawat
* @see app/Http/Controllers/API/GenerateNoRawatController.php:235
* @route '/api/generate-no-rawat/release'
*/
releaseNoRawat.url = (options?: RouteQueryOptions) => {
    return releaseNoRawat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\GenerateNoRawatController::releaseNoRawat
* @see app/Http/Controllers/API/GenerateNoRawatController.php:235
* @route '/api/generate-no-rawat/release'
*/
releaseNoRawat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: releaseNoRawat.url(options),
    method: 'post',
})

const GenerateNoRawatController = { generateNoRawat, reserveNoRawat, releaseNoRawat }

export default GenerateNoRawatController