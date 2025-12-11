import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\API\ReferenceController::index
 * @see app/Http/Controllers/API/ReferenceController.php:11
 * @route '/api/perusahaan-pasien'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/perusahaan-pasien',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\ReferenceController::index
 * @see app/Http/Controllers/API/ReferenceController.php:11
 * @route '/api/perusahaan-pasien'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\ReferenceController::index
 * @see app/Http/Controllers/API/ReferenceController.php:11
 * @route '/api/perusahaan-pasien'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\API\ReferenceController::index
 * @see app/Http/Controllers/API/ReferenceController.php:11
 * @route '/api/perusahaan-pasien'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\PerusahaanPasienController::nextCode
 * @see app/Http/Controllers/API/PerusahaanPasienController.php:12
 * @route '/api/perusahaan-pasien/next-code'
 */
export const nextCode = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: nextCode.url(options),
    method: 'get',
})

nextCode.definition = {
    methods: ["get","head"],
    url: '/api/perusahaan-pasien/next-code',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\PerusahaanPasienController::nextCode
 * @see app/Http/Controllers/API/PerusahaanPasienController.php:12
 * @route '/api/perusahaan-pasien/next-code'
 */
nextCode.url = (options?: RouteQueryOptions) => {
    return nextCode.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PerusahaanPasienController::nextCode
 * @see app/Http/Controllers/API/PerusahaanPasienController.php:12
 * @route '/api/perusahaan-pasien/next-code'
 */
nextCode.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: nextCode.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\API\PerusahaanPasienController::nextCode
 * @see app/Http/Controllers/API/PerusahaanPasienController.php:12
 * @route '/api/perusahaan-pasien/next-code'
 */
nextCode.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: nextCode.url(options),
    method: 'head',
})
const perusahaanPasien = {
    index: Object.assign(index, index),
nextCode: Object.assign(nextCode, nextCode),
}

export default perusahaanPasien