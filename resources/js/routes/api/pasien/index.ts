import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\API\PatientController::describe
 * @see app/Http/Controllers/API/PatientController.php:13
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
 * @see app/Http/Controllers/API/PatientController.php:13
 * @route '/api/pasien/describe'
 */
describe.url = (options?: RouteQueryOptions) => {
    return describe.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PatientController::describe
 * @see app/Http/Controllers/API/PatientController.php:13
 * @route '/api/pasien/describe'
 */
describe.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: describe.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\API\PatientController::describe
 * @see app/Http/Controllers/API/PatientController.php:13
 * @route '/api/pasien/describe'
 */
describe.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: describe.url(options),
    method: 'head',
})
const pasien = {
    describe: Object.assign(describe, describe),
}

export default pasien