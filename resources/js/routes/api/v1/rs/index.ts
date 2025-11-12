import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\PcareController::dokter
* @see app/Http/Controllers/Pcare/PcareController.php:1182
* @route '/api/v1/rs/dokter'
*/
export const dokter = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dokter.url(options),
    method: 'get',
})

dokter.definition = {
    methods: ["get","head"],
    url: '/api/v1/rs/dokter',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::dokter
* @see app/Http/Controllers/Pcare/PcareController.php:1182
* @route '/api/v1/rs/dokter'
*/
dokter.url = (options?: RouteQueryOptions) => {
    return dokter.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::dokter
* @see app/Http/Controllers/Pcare/PcareController.php:1182
* @route '/api/v1/rs/dokter'
*/
dokter.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dokter.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::dokter
* @see app/Http/Controllers/Pcare/PcareController.php:1182
* @route '/api/v1/rs/dokter'
*/
dokter.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dokter.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::poliklinik
* @see app/Http/Controllers/Pcare/PcareController.php:1162
* @route '/api/v1/rs/poliklinik'
*/
export const poliklinik = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: poliklinik.url(options),
    method: 'get',
})

poliklinik.definition = {
    methods: ["get","head"],
    url: '/api/v1/rs/poliklinik',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::poliklinik
* @see app/Http/Controllers/Pcare/PcareController.php:1162
* @route '/api/v1/rs/poliklinik'
*/
poliklinik.url = (options?: RouteQueryOptions) => {
    return poliklinik.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::poliklinik
* @see app/Http/Controllers/Pcare/PcareController.php:1162
* @route '/api/v1/rs/poliklinik'
*/
poliklinik.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: poliklinik.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::poliklinik
* @see app/Http/Controllers/Pcare/PcareController.php:1162
* @route '/api/v1/rs/poliklinik'
*/
poliklinik.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: poliklinik.url(options),
    method: 'head',
})

const rs = {
    dokter: Object.assign(dokter, dokter),
    poliklinik: Object.assign(poliklinik, poliklinik),
}

export default rs