import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
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

const PerusahaanPasienController = { nextCode }

export default PerusahaanPasienController