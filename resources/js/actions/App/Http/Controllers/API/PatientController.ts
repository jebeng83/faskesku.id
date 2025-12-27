import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\API\PatientController::nextNoRM
* @see app/Http/Controllers/API/PatientController.php:15
* @route '/api/pasien/next-no-rm'
*/
export const nextNoRM = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: nextNoRM.url(options),
    method: 'get',
})

nextNoRM.definition = {
    methods: ["get","head"],
    url: '/api/pasien/next-no-rm',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\PatientController::nextNoRM
* @see app/Http/Controllers/API/PatientController.php:15
* @route '/api/pasien/next-no-rm'
*/
nextNoRM.url = (options?: RouteQueryOptions) => {
    return nextNoRM.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PatientController::nextNoRM
* @see app/Http/Controllers/API/PatientController.php:15
* @route '/api/pasien/next-no-rm'
*/
nextNoRM.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: nextNoRM.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\PatientController::nextNoRM
* @see app/Http/Controllers/API/PatientController.php:15
* @route '/api/pasien/next-no-rm'
*/
nextNoRM.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: nextNoRM.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\PatientController::existsNoRM
* @see app/Http/Controllers/API/PatientController.php:31
* @route '/api/pasien/exists-no-rm'
*/
export const existsNoRM = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: existsNoRM.url(options),
    method: 'get',
})

existsNoRM.definition = {
    methods: ["get","head"],
    url: '/api/pasien/exists-no-rm',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\PatientController::existsNoRM
* @see app/Http/Controllers/API/PatientController.php:31
* @route '/api/pasien/exists-no-rm'
*/
existsNoRM.url = (options?: RouteQueryOptions) => {
    return existsNoRM.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PatientController::existsNoRM
* @see app/Http/Controllers/API/PatientController.php:31
* @route '/api/pasien/exists-no-rm'
*/
existsNoRM.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: existsNoRM.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\PatientController::existsNoRM
* @see app/Http/Controllers/API/PatientController.php:31
* @route '/api/pasien/exists-no-rm'
*/
existsNoRM.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: existsNoRM.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\PatientController::describe
* @see app/Http/Controllers/API/PatientController.php:52
* @route '/api/pasien/describe'
*/
export const describe = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: describe.url(options),
    method: 'get',
})

describe.definition = {
    methods: ["get","head"],
    url: '/api/pasien/describe',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\PatientController::describe
* @see app/Http/Controllers/API/PatientController.php:52
* @route '/api/pasien/describe'
*/
describe.url = (options?: RouteQueryOptions) => {
    return describe.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PatientController::describe
* @see app/Http/Controllers/API/PatientController.php:52
* @route '/api/pasien/describe'
*/
describe.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: describe.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\PatientController::describe
* @see app/Http/Controllers/API/PatientController.php:52
* @route '/api/pasien/describe'
*/
describe.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: describe.url(options),
    method: 'head',
})

const PatientController = { nextNoRM, existsNoRM, describe }

export default PatientController