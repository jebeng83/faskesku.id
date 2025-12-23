import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\API\DokterController::publicMethod
 * @see app/Http/Controllers/API/DokterController.php:14
 * @route '/rawat-jalan/dokter'
 */
export const publicMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicMethod.url(options),
    method: 'get',
})

publicMethod.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/dokter',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\DokterController::publicMethod
 * @see app/Http/Controllers/API/DokterController.php:14
 * @route '/rawat-jalan/dokter'
 */
publicMethod.url = (options?: RouteQueryOptions) => {
    return publicMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\DokterController::publicMethod
 * @see app/Http/Controllers/API/DokterController.php:14
 * @route '/rawat-jalan/dokter'
 */
publicMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicMethod.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\API\DokterController::publicMethod
 * @see app/Http/Controllers/API/DokterController.php:14
 * @route '/rawat-jalan/dokter'
 */
publicMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: publicMethod.url(options),
    method: 'head',
})
const dokter = {
    public: Object.assign(publicMethod, publicMethod),
}

export default dokter