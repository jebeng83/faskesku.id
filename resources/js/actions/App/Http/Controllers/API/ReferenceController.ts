import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\API\ReferenceController::perusahaanPasien
 * @see app/Http/Controllers/API/ReferenceController.php:11
 * @route '/api/perusahaan-pasien'
 */
export const perusahaanPasien = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: perusahaanPasien.url(options),
    method: 'get',
})

perusahaanPasien.definition = {
    methods: ["get","head"],
    url: '/api/perusahaan-pasien',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\ReferenceController::perusahaanPasien
 * @see app/Http/Controllers/API/ReferenceController.php:11
 * @route '/api/perusahaan-pasien'
 */
perusahaanPasien.url = (options?: RouteQueryOptions) => {
    return perusahaanPasien.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\ReferenceController::perusahaanPasien
 * @see app/Http/Controllers/API/ReferenceController.php:11
 * @route '/api/perusahaan-pasien'
 */
perusahaanPasien.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: perusahaanPasien.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\API\ReferenceController::perusahaanPasien
 * @see app/Http/Controllers/API/ReferenceController.php:11
 * @route '/api/perusahaan-pasien'
 */
perusahaanPasien.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: perusahaanPasien.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\ReferenceController::sukuBangsa
 * @see app/Http/Controllers/API/ReferenceController.php:26
 * @route '/api/suku-bangsa'
 */
export const sukuBangsa = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sukuBangsa.url(options),
    method: 'get',
})

sukuBangsa.definition = {
    methods: ["get","head"],
    url: '/api/suku-bangsa',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\ReferenceController::sukuBangsa
 * @see app/Http/Controllers/API/ReferenceController.php:26
 * @route '/api/suku-bangsa'
 */
sukuBangsa.url = (options?: RouteQueryOptions) => {
    return sukuBangsa.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\ReferenceController::sukuBangsa
 * @see app/Http/Controllers/API/ReferenceController.php:26
 * @route '/api/suku-bangsa'
 */
sukuBangsa.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sukuBangsa.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\API\ReferenceController::sukuBangsa
 * @see app/Http/Controllers/API/ReferenceController.php:26
 * @route '/api/suku-bangsa'
 */
sukuBangsa.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: sukuBangsa.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\ReferenceController::bahasaPasien
 * @see app/Http/Controllers/API/ReferenceController.php:40
 * @route '/api/bahasa-pasien'
 */
export const bahasaPasien = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bahasaPasien.url(options),
    method: 'get',
})

bahasaPasien.definition = {
    methods: ["get","head"],
    url: '/api/bahasa-pasien',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\ReferenceController::bahasaPasien
 * @see app/Http/Controllers/API/ReferenceController.php:40
 * @route '/api/bahasa-pasien'
 */
bahasaPasien.url = (options?: RouteQueryOptions) => {
    return bahasaPasien.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\ReferenceController::bahasaPasien
 * @see app/Http/Controllers/API/ReferenceController.php:40
 * @route '/api/bahasa-pasien'
 */
bahasaPasien.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bahasaPasien.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\API\ReferenceController::bahasaPasien
 * @see app/Http/Controllers/API/ReferenceController.php:40
 * @route '/api/bahasa-pasien'
 */
bahasaPasien.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: bahasaPasien.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\ReferenceController::cacatFisik
 * @see app/Http/Controllers/API/ReferenceController.php:54
 * @route '/api/cacat-fisik'
 */
export const cacatFisik = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cacatFisik.url(options),
    method: 'get',
})

cacatFisik.definition = {
    methods: ["get","head"],
    url: '/api/cacat-fisik',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\ReferenceController::cacatFisik
 * @see app/Http/Controllers/API/ReferenceController.php:54
 * @route '/api/cacat-fisik'
 */
cacatFisik.url = (options?: RouteQueryOptions) => {
    return cacatFisik.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\ReferenceController::cacatFisik
 * @see app/Http/Controllers/API/ReferenceController.php:54
 * @route '/api/cacat-fisik'
 */
cacatFisik.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cacatFisik.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\API\ReferenceController::cacatFisik
 * @see app/Http/Controllers/API/ReferenceController.php:54
 * @route '/api/cacat-fisik'
 */
cacatFisik.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cacatFisik.url(options),
    method: 'head',
})
const ReferenceController = { perusahaanPasien, sukuBangsa, bahasaPasien, cacatFisik }

export default ReferenceController