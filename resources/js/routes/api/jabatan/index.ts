import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\API\EmployeeController::lookup
* @see app/Http/Controllers/API/EmployeeController.php:15
* @route '/api/jabatan/lookup'
*/
export const lookup = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lookup.url(options),
    method: 'get',
})

lookup.definition = {
    methods: ["get","head"],
    url: '/api/jabatan/lookup',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\EmployeeController::lookup
* @see app/Http/Controllers/API/EmployeeController.php:15
* @route '/api/jabatan/lookup'
*/
lookup.url = (options?: RouteQueryOptions) => {
    return lookup.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\EmployeeController::lookup
* @see app/Http/Controllers/API/EmployeeController.php:15
* @route '/api/jabatan/lookup'
*/
lookup.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lookup.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\EmployeeController::lookup
* @see app/Http/Controllers/API/EmployeeController.php:15
* @route '/api/jabatan/lookup'
*/
lookup.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lookup.url(options),
    method: 'head',
})

const jabatan = {
    lookup: Object.assign(lookup, lookup),
}

export default jabatan