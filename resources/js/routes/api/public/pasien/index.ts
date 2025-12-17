import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\API\PatientController::nextNoRm
 * @see app/Http/Controllers/API/PatientController.php:14
 * @route '/api/pasien/next-no-rm'
 */
export const nextNoRm = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: nextNoRm.url(options),
    method: 'get',
})

nextNoRm.definition = {
    methods: ["get","head"],
    url: '/api/pasien/next-no-rm',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\PatientController::nextNoRm
 * @see app/Http/Controllers/API/PatientController.php:14
 * @route '/api/pasien/next-no-rm'
 */
nextNoRm.url = (options?: RouteQueryOptions) => {
    return nextNoRm.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PatientController::nextNoRm
 * @see app/Http/Controllers/API/PatientController.php:14
 * @route '/api/pasien/next-no-rm'
 */
nextNoRm.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: nextNoRm.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\API\PatientController::nextNoRm
 * @see app/Http/Controllers/API/PatientController.php:14
 * @route '/api/pasien/next-no-rm'
 */
nextNoRm.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: nextNoRm.url(options),
    method: 'head',
})
const pasien = {
    nextNoRm: Object.assign(nextNoRm, nextNoRm),
}

export default pasien