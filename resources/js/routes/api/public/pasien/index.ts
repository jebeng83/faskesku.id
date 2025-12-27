import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\API\PatientController::nextNoRm
* @see app/Http/Controllers/API/PatientController.php:15
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
* @see app/Http/Controllers/API/PatientController.php:15
* @route '/api/pasien/next-no-rm'
*/
nextNoRm.url = (options?: RouteQueryOptions) => {
    return nextNoRm.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PatientController::nextNoRm
* @see app/Http/Controllers/API/PatientController.php:15
* @route '/api/pasien/next-no-rm'
*/
nextNoRm.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: nextNoRm.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\PatientController::nextNoRm
* @see app/Http/Controllers/API/PatientController.php:15
* @route '/api/pasien/next-no-rm'
*/
nextNoRm.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: nextNoRm.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\PatientController::existsNoRm
* @see app/Http/Controllers/API/PatientController.php:31
* @route '/api/pasien/exists-no-rm'
*/
export const existsNoRm = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: existsNoRm.url(options),
    method: 'get',
})

existsNoRm.definition = {
    methods: ["get","head"],
    url: '/api/pasien/exists-no-rm',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\PatientController::existsNoRm
* @see app/Http/Controllers/API/PatientController.php:31
* @route '/api/pasien/exists-no-rm'
*/
existsNoRm.url = (options?: RouteQueryOptions) => {
    return existsNoRm.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PatientController::existsNoRm
* @see app/Http/Controllers/API/PatientController.php:31
* @route '/api/pasien/exists-no-rm'
*/
existsNoRm.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: existsNoRm.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\PatientController::existsNoRm
* @see app/Http/Controllers/API/PatientController.php:31
* @route '/api/pasien/exists-no-rm'
*/
existsNoRm.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: existsNoRm.url(options),
    method: 'head',
})

const pasien = {
    nextNoRm: Object.assign(nextNoRm, nextNoRm),
    existsNoRm: Object.assign(existsNoRm, existsNoRm),
}

export default pasien